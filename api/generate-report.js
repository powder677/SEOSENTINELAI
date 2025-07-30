// Located at: /api/generate-report.js

// This is a Vercel Serverless Function. It runs securely on the backend.
// It now integrates with Google Places API before calling Gemini.

export default async function handler(req, res) {
  // 1. --- Security and Method Check ---
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2. --- Get Data from Frontend ---
  const formData = req.body;

  // 3. --- Get Secure API Keys from Environment Variables ---
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const placesApiKey = process.env.GOOGLE_PLACES_API_KEY; // <-- NEW

  if (!geminiApiKey || !placesApiKey) {
    console.error("CRITICAL: API key environment variables are not set.");
    return res.status(500).json({ error: "Server configuration error. API keys are missing." });
  }

  try {
    // --- 4. Get Competitor Data via Google Places API ---
    // This block is entirely new. It gathers real-world data to feed the AI.
    let competitorDataForPrompt = "No competitor data could be retrieved.";

    // To do a nearby search, we first need lat/lng from the provided location string.
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formData.location)}&key=${placesApiKey}`;
    const geocodeResponse = await fetch(geocodeUrl).then(res => res.json());

    if (geocodeResponse.status !== 'OK' || !geocodeResponse.results[0]) {
        throw new Error('Could not geocode the provided location.');
    }
    const { lat, lng } = geocodeResponse.results[0].geometry.location;

    // --- Step 4a: Find the client's own GMB listing to get accurate stats ---
    const clientSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(formData.businessName + " " + formData.location)}&key=${placesApiKey}`;
    const clientSearch = await fetch(clientSearchUrl).then(res => res.json());
    
    let clientGmbData = { photoCount: 0, reviewCount: 0, categories: [formData.businessType] };
    if (clientSearch.status === 'OK' && clientSearch.results[0]) {
        const clientPlaceId = clientSearch.results[0].place_id;
        const clientDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${clientPlaceId}&fields=photo,user_ratings_total,types&key=${placesApiKey}`;
        const clientDetails = await fetch(clientDetailsUrl).then(res => res.json());
        if (clientDetails.status === 'OK') {
            clientGmbData = {
                photoCount: clientDetails.result.photos ? clientDetails.result.photos.length : 0,
                reviewCount: clientDetails.result.user_ratings_total || 0,
                categories: clientDetails.result.types || [formData.businessType],
            };
        }
    }

    // --- Step 4b: Find up to 3 nearby competitors ---
    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=${encodeURIComponent(formData.businessType)}&key=${placesApiKey}`;
    const nearbyResponse = await fetch(nearbyUrl).then(res => res.json());

    if (nearbyResponse.status === 'OK' && nearbyResponse.results.length > 0) {
        // Filter out the client's own business from the competitor list, just in case it appears.
        const competitors = nearbyResponse.results
            .filter(place => place.name.toLowerCase() !== formData.businessName.toLowerCase())
            .slice(0, 3);

        const competitorProfiles = await Promise.all(competitors.map(async (comp) => {
            // We need to make a details call for each competitor to get their photo count.
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${comp.place_id}&fields=name,rating,user_ratings_total,types,photo&key=${placesApiKey}`;
            const detailsRes = await fetch(detailsUrl).then(res => res.json());
            const details = detailsRes.result;
            return {
                name: details.name,
                rating: details.rating || 'N/A',
                reviews: details.user_ratings_total || 0,
                photoCount: details.photos ? details.photos.length : 0,
                primaryCategory: details.types ? details.types[0].replace(/_/g, ' ') : 'N/A',
            };
        }));

        // --- Step 4c: Compute Opportunity Insights ---
        const avgCompetitorReviews = competitorProfiles.reduce((sum, p) => sum + p.reviews, 0) / competitorProfiles.length;
        const avgCompetitorPhotos = competitorProfiles.reduce((sum, p) => sum + p.photoCount, 0) / competitorProfiles.length;

        const insights = {
            reviewGap: {
                client: clientGmbData.reviewCount,
                competitor_average: Math.round(avgCompetitorReviews),
                insight: clientGmbData.reviewCount > avgCompetitorReviews ? "You have more reviews than average." : "You have fewer reviews than your competitors."
            },
            photoGap: {
                client: clientGmbData.photoCount,
                competitor_average: Math.round(avgCompetitorPhotos),
                insight: clientGmbData.photoCount > avgCompetitorPhotos ? "You have more photos than average." : "Your competitors have more photos, a key trust signal."
            }
        };

        // Format this data cleanly for the prompt
        competitorDataForPrompt = `
            Here is the competitive landscape analysis:
            - Client's Profile: ${JSON.stringify(clientGmbData)}
            - Top Competitors: ${JSON.stringify(competitorProfiles)}
            - Key Opportunity Gaps: ${JSON.stringify(insights)}
        `;
    }


    // 5. --- Construct the Enhanced Prompt for the AI ---
    // The prompt is now much more powerful because it includes real-world data.
    const prompt = `
      Analyze the following local business and generate a comprehensive Local SEO Action Plan.
      The business details are:
      - Business Name: ${formData.businessName}
      - Business Type: ${formData.businessType}
      - Location: ${formData.location}
      - Website: ${formData.websiteUrl || 'Not provided'}
      - GMB URL: ${formData.gmbUrl || 'Not provided'}
      - Primary Service: ${formData.primaryService}
      - Ideal Customer: ${formData.idealCustomer}
      - Main Goal: ${formData.mainGoal}

      ${competitorDataForPrompt}

      Based on ALL of this information, including the competitor data, perform the following analysis and return the output ONLY as a valid JSON object.
      Do not include any introductory text, backticks, or "json" markers.
      The JSON object must have these exact keys: "overall_score", "overall_explanation", "gmb_optimization", "competitor_analysis", "local_keyword_strategy", "content_plan".

      The structure must be:
      {
        "overall_score": "A string grade like 'B+' or 'C-'.",
        "overall_explanation": "A string explaining the score in one sentence, considering the competitive landscape.",
        "gmb_optimization": {
          "title": "GMB Profile Optimization",
          "recommendations": [
            { "point": "A string for the specific area (e.g., 'Profile Completeness')", "action": "A string with the recommended action." }
          ]
        },
        "competitor_analysis": {
          "title": "Competitor Snapshot & Opportunities",
          "summary": "A one-sentence summary of the competitive landscape based on the data provided.",
          "insights": [
            { "insight": "A string describing the opportunity (e.g., 'Close the Review Gap')", "action": "A string with the recommended action based on the insight and data." },
            { "insight": "A string describing another opportunity (e.g., 'Visual Dominance')", "action": "A string with another recommended action." }
          ]
        },
        "local_keyword_strategy": {
          "title": "Local Keyword Strategy",
          "keywords": [
            { "keyword": "A string for the keyword phrase.", "reason": "A string explaining why this keyword is valuable." }
          ]
        },
        "content_plan": {
          "title": "4-Week GMB Content Plan",
          "posts": [
            { "week": 1, "topic": "A string for the post topic.", "details": "A string with the post details." }
          ]
        }
      }
    `;

    // 6. --- Call the Gemini API ---
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.text();
        console.error("Gemini API Error:", errorBody);
        throw new Error(`The AI service returned an error. Status: ${apiResponse.status}`);
    }

    const responseData = await apiResponse.json();
    
    const rawText = responseData.candidates[0].content.parts[0].text;
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    let reportJson;
    try {
        reportJson = JSON.parse(cleanedText);
    } catch (parseError) {
        console.error("Failed to parse JSON response from AI.");
        console.error("Raw AI Response:", rawText);
        throw new Error("The AI returned a response in an unexpected format.");
    }

    // 7. --- Send the Final Result Back to the Frontend ---
    res.status(200).json(reportJson);

  } catch (error) {
    console.error('Full error details:', error.message);
    res.status(500).json({ error: error.message || 'An unknown server error occurred.' });
  }
}
