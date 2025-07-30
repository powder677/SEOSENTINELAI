// Located at: /api/generate-report.js
// Enhanced debug version to troubleshoot competitor data issues

export default async function handler(req, res) {
  // 1. --- Security and Method Check ---
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2. --- Get Data from Frontend ---
  const formData = req.body;
  console.log('Form data received:', formData); // DEBUG

  // 3. --- Get Secure API Keys from Environment Variables ---
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const placesApiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!geminiApiKey || !placesApiKey) {
    console.error("CRITICAL: API key environment variables are not set.");
    return res.status(500).json({ error: "Server configuration error. API keys are missing." });
  }

  try {
    // --- 4. Get Competitor Data via Google Places API ---
    let competitorDataForPrompt = "No competitor data could be retrieved.";
    let debugInfo = { geocoding: null, clientSearch: null, nearbySearch: null, competitors: [] }; // DEBUG

    // To do a nearby search, we first need lat/lng from the provided location string.
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formData.location)}&key=${placesApiKey}`;
    console.log('Geocoding URL:', geocodeUrl); // DEBUG
    
    const geocodeResponse = await fetch(geocodeUrl).then(res => res.json());
    debugInfo.geocoding = geocodeResponse; // DEBUG
    console.log('Geocoding response:', geocodeResponse); // DEBUG

    if (geocodeResponse.status !== 'OK' || !geocodeResponse.results[0]) {
        console.error('Geocoding failed:', geocodeResponse); // DEBUG
        throw new Error(`Could not geocode the provided location. Status: ${geocodeResponse.status}`);
    }
    const { lat, lng } = geocodeResponse.results[0].geometry.location;
    console.log('Coordinates found:', lat, lng); // DEBUG

    // --- Step 4a: Find the client's own GMB listing to get accurate stats ---
    const clientSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(formData.businessName + " " + formData.location)}&key=${placesApiKey}`;
    console.log('Client search URL:', clientSearchUrl); // DEBUG
    
    const clientSearch = await fetch(clientSearchUrl).then(res => res.json());
    debugInfo.clientSearch = clientSearch; // DEBUG
    console.log('Client search response:', clientSearch); // DEBUG
    
    let clientGmbData = { photoCount: 0, reviewCount: 0, categories: [formData.businessType] };
    if (clientSearch.status === 'OK' && clientSearch.results[0]) {
        const clientPlaceId = clientSearch.results[0].place_id;
        const clientDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${clientPlaceId}&fields=photo,user_ratings_total,types&key=${placesApiKey}`;
        const clientDetails = await fetch(clientDetailsUrl).then(res => res.json());
        console.log('Client details response:', clientDetails); // DEBUG
        
        if (clientDetails.status === 'OK') {
            clientGmbData = {
                photoCount: clientDetails.result.photos ? clientDetails.result.photos.length : 0,
                reviewCount: clientDetails.result.user_ratings_total || 0,
                categories: clientDetails.result.types || [formData.businessType],
            };
        }
    }
    console.log('Client GMB data:', clientGmbData); // DEBUG

    // --- Step 4b: Find up to 3 nearby competitors ---
    // Try multiple search approaches
    const searchTerms = [
        formData.businessType,
        'barber shop',
        'hair salon',
        'barbershop'
    ];

    let allCompetitors = [];
    
    for (const searchTerm of searchTerms) {
        const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=8000&keyword=${encodeURIComponent(searchTerm)}&key=${placesApiKey}`;
        console.log(`Nearby search URL for "${searchTerm}":`, nearbyUrl); // DEBUG
        
        const nearbyResponse = await fetch(nearbyUrl).then(res => res.json());
        console.log(`Nearby search response for "${searchTerm}":`, nearbyResponse); // DEBUG
        
        if (nearbyResponse.status === 'OK' && nearbyResponse.results.length > 0) {
            // Filter out the client's own business and add to competitors
            const newCompetitors = nearbyResponse.results
                .filter(place => 
                    place.name.toLowerCase() !== formData.businessName.toLowerCase() &&
                    !allCompetitors.some(existing => existing.place_id === place.place_id)
                );
            allCompetitors.push(...newCompetitors);
        }
        
        // Break if we have enough competitors
        if (allCompetitors.length >= 5) break;
    }

    debugInfo.nearbySearch = { totalFound: allCompetitors.length }; // DEBUG
    console.log(`Total unique competitors found: ${allCompetitors.length}`); // DEBUG

    if (allCompetitors.length > 0) {
        // Take top 3 competitors
        const competitors = allCompetitors.slice(0, 3);
        debugInfo.competitors = competitors.map(c => ({ name: c.name, place_id: c.place_id })); // DEBUG

        const competitorProfiles = await Promise.all(competitors.map(async (comp) => {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${comp.place_id}&fields=name,rating,user_ratings_total,types,photo&key=${placesApiKey}`;
            console.log(`Getting details for ${comp.name}:`, detailsUrl); // DEBUG
            
            const detailsRes = await fetch(detailsUrl).then(res => res.json());
            console.log(`Details for ${comp.name}:`, detailsRes); // DEBUG
            
            const details = detailsRes.result;
            return {
                name: details.name,
                rating: details.rating || 'N/A',
                reviews: details.user_ratings_total || 0,
                photoCount: details.photos ? details.photos.length : 0,
                primaryCategory: details.types ? details.types[0].replace(/_/g, ' ') : 'N/A',
            };
        }));

        console.log('Competitor profiles:', competitorProfiles); // DEBUG

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

    console.log('Final competitor data for prompt:', competitorDataForPrompt); // DEBUG
    console.log('Debug info summary:', debugInfo); // DEBUG

    // 5. --- Construct the Enhanced Prompt for the AI ---
    const prompt = `
      You are a Local SEO marketing strategist creating a premium $97 audit report. The business owner is busy and skeptical — your goal is to impress them with real insights that show they are missing traffic and customers.

      Analyze this business and its local competitors. Identify where this business is falling short in visibility, trust, or engagement. Suggest specific, emotional, and high-impact actions they should take. Write in persuasive, clear language — no fluff or filler.

      Include emoji icons, strong phrases like "🚨 Missed Opportunity" or "📸 Photo Deficit", and highlight contrast with competitors. Use urgency but stay professional.

      Based on the following data, return a JSON object (no preamble or code blocks):

      - Business Name: ${formData.businessName}
      - Business Type: ${formData.businessType}
      - Location: ${formData.location}
      - Website: ${formData.websiteUrl || 'Not provided'}
      - GMB URL: ${formData.gmbUrl || 'Not provided'}
      - Primary Service: ${formData.primaryService}
      - Ideal Customer: ${formData.idealCustomer}
      - Main Goal: ${formData.mainGoal}

      ${competitorDataForPrompt}

      Use this exact JSON structure:
      {
        "overall_score": "A string grade like 'B+' or 'C-'.",
        "overall_explanation": "Explain the score in one punchy sentence, based on data and urgency.",
        "gmb_optimization": {
          "title": "GMB Profile Optimization",
          "recommendations": [
            { "point": "Area of improvement", "action": "Specific action" }
          ]
        },
        "competitor_analysis": {
          "title": "Competitor Snapshot & Opportunities",
          "summary": "Punchy summary of what's working for competitors",
          "insights": [
            { "insight": "Opportunity from comparison", "action": "Action to fix or compete" },
            { "insight": "Second major gap", "action": "Action for it" }
          ]
        },
        "local_keyword_strategy": {
          "title": "Local Keyword Strategy",
          "keywords": [
            { "keyword": "Keyword Phrase", "reason": "Why this keyword matters" }
          ]
        },
        "content_plan": {
          "title": "4-Week GMB Content Plan",
          "posts": [
            { "week": 1, "topic": "Topic", "details": "Post details" },
            { "week": 2, "topic": "Topic", "details": "Post details" },
            { "week": 3, "topic": "Topic", "details": "Post details" },
            { "week": 4, "topic": "Topic", "details": "Post details" }
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
        
        // Add debug information to the response (remove this in production)
        reportJson.debug_info = debugInfo;
        
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
