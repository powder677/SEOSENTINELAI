// Located at: /api/generate-report.js

// This is a Vercel Serverless Function. It runs securely on the backend.
export default async function handler(req, res) {
  // 1. --- Security and Method Check ---
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2. --- Get Data and API Keys ---
  const formData = req.body;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY; // <-- NEW: Get Maps API Key

  if (!geminiApiKey || !mapsApiKey) {
    console.error("CRITICAL: API environment variables are not set.");
    return res.status(500).json({ error: "Server configuration error. API keys are missing." });
  }

  // 3. --- NEW: Fetch Competitor Data ---
  let competitorData = null;
  try {
    // Step 3a: Geocode user's location to get lat/lng
    const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formData.location)}&key=${mapsApiKey}`);
    const geoData = await geoResponse.json();
    if (geoData.status !== 'OK' || !geoData.results[0]) {
      throw new Error('Could not geocode the provided location.');
    }
    const { lat, lng } = geoData.results[0].geometry.location;

    // Step 3b: Find nearby competitors using Places API
    const placesResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=${encodeURIComponent(formData.businessType)}&key=${mapsApiKey}`);
    const placesData = await placesResponse.json();
    if (placesData.status !== 'OK') {
      throw new Error('Could not fetch nearby places.');
    }
    
    // Step 3c: Get detailed info for the top 3 competitors
    const topCompetitors = placesData.results.slice(0, 3);
    const competitorDetailsPromises = topCompetitors.map(async (competitor) => {
        const detailsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${competitor.place_id}&fields=name,rating,user_ratings_total,types,photos&key=${mapsApiKey}`);
        const detailsData = await detailsResponse.json();
        if (detailsData.status === 'OK') {
            return {
                name: detailsData.result.name,
                rating: detailsData.result.rating || 'N/A',
                review_count: detailsData.result.user_ratings_total || 0,
                categories: detailsData.result.types || [],
                photo_count: detailsData.result.photos ? detailsData.result.photos.length : 0,
            };
        }
        return null;
    });

    competitorData = (await Promise.all(competitorDetailsPromises)).filter(c => c !== null);

  } catch (error) {
    console.warn("Could not fetch competitor data:", error.message);
    // If this block fails, we'll proceed without competitor data. The prompt will handle this.
    competitorData = null; 
  }


  // 4. --- Construct the Enhanced AI Prompt ---
  const competitorPromptSection = competitorData && competitorData.length > 0
    ? `
    A competitive analysis was performed. Here is the data for the top 3 local competitors:
    ${JSON.stringify(competitorData, null, 2)}

    Based on this competitor data, add a "competitive_analysis" object to your JSON response. This object should contain a title, the list of competitors, and a list of 3-4 specific, actionable insights comparing the user's business to these competitors. Focus on gaps in categories, photo counts, and review scores.
    `
    : `
    No competitor data was available. The "competitive_analysis" key in the JSON output should be omitted.
    `;

  const prompt = `
    Analyze the following local business and generate a comprehensive Local SEO Action Plan. The business details are:
    - Business Name: ${formData.businessName}
    - Business Type: ${formData.businessType}
    - Location: ${formData.location}
    - Website: ${formData.websiteUrl || 'Not provided'}
    - GMB URL: ${formData.gmbUrl || 'Not provided'}

    ${competitorPromptSection}

    Return the output ONLY as a valid JSON object. Do not include any text before or after the JSON.
    The JSON object must have these keys: "overall_score", "overall_explanation", "gmb_optimization", "local_keyword_strategy", "content_plan", and "competitive_analysis" (if data was available).

    The structure should be:
    {
      "overall_score": "A string grade like 'B+' or 'C-'.",
      "overall_explanation": "A string explaining the score in one sentence.",
      "gmb_optimization": { /* ... same as before ... */ },
      "local_keyword_strategy": { /* ... same as before ... */ },
      "content_plan": { /* ... same as before ... */ },
      "competitive_analysis": {
        "title": "A string for the section title (e.g., 'Competitive Landscape').",
        "competitors": [
          { "name": "String", "rating": "Number or N/A", "review_count": "Number" }
        ],
        "insights": [
          { "insight_type": "A string (e.g., 'Category Opportunity')", "detail": "A string with the actionable insight." }
        ]
      }
    }
  `;

  // 5. --- Call the Gemini API ---
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

  try {
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
    
    // 6. --- Robust JSON Parsing & Response ---
    const rawText = responseData.candidates[0].content.parts[0].text;
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    let reportJson = JSON.parse(cleanedText);
    res.status(200).json(reportJson);

  } catch (error) {
    console.error('Full error details:', error.message);
    res.status(500).json({ error: error.message || 'An unknown server error occurred.' });
  }
}
