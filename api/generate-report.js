// Located at: /api/generate-report.js
// Modified to use fewer form fields, adopt a more aggressive/urgent tone,
// and return a new JSON structure for the frontend.

export default async function handler(req, res) {
    // 1. --- Security and Method Check ---
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // 2. --- Get Data from Frontend ---
    // Using only the 5 specified form fields.
    const {
        businessName,
        businessType,
        streetAddress,
        location,
        biggestChallenge
    } = req.body;
    console.log('Form data received:', { businessName, businessType, streetAddress, location, biggestChallenge }); // DEBUG

    // 3. --- Get Secure API Keys from Environment Variables ---
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const placesApiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!geminiApiKey || !placesApiKey) {
        console.error("CRITICAL: API key environment variables are not set.");
        return res.status(500).json({
            error: "Server configuration error. API keys are missing."
        });
    }

    try {
        // --- 4. Get Competitor Data via Google Places API ---
        let competitorDataForPrompt = "No competitor data could be retrieved. The AI should infer a realistic competitive landscape.";
        let clientGmbData = null;
        let businessFound = false;

        // --- Step 4a: Find the client's own GMB listing ---
        // Combine street address and location for a more precise query.
        const fullAddress = `${businessName}, ${streetAddress}, ${location}`;
        const clientSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(fullAddress)}&key=${placesApiKey}`;
        console.log('Client search URL:', clientSearchUrl); // DEBUG

        const clientSearch = await fetch(clientSearchUrl).then(res => res.json());
        console.log('Client search response:', clientSearch); // DEBUG

        if (clientSearch.status === 'OK' && clientSearch.results[0]) {
            businessFound = true;
            const clientPlaceId = clientSearch.results[0].place_id;
            const clientDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${clientPlaceId}&fields=photo,rating,user_ratings_total,types&key=${placesApiKey}`;
            const clientDetails = await fetch(clientDetailsUrl).then(res => res.json());
            console.log('Client details response:', clientDetails); // DEBUG

            if (clientDetails.status === 'OK' && clientDetails.result) {
                clientGmbData = {
                    rating: clientDetails.result.rating || 0,
                    reviewCount: clientDetails.result.user_ratings_total || 0,
                    photoCount: clientDetails.result.photos ? clientDetails.result.photos.length : 0,
                    categories: clientDetails.result.types || [businessType],
                };
            }
        }
        console.log('Client GMB data:', clientGmbData); // DEBUG
        console.log('Business Found:', businessFound); // DEBUG

        // --- Step 4b: Find competitors (only if the client's business was found) ---
        if (businessFound && clientGmbData) {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${placesApiKey}`;
            const geocodeResponse = await fetch(geocodeUrl).then(res => res.json());

            if (geocodeResponse.status === 'OK' && geocodeResponse.results[0]) {
                const { lat, lng } = geocodeResponse.results[0].geometry.location;
                
                // Use a relevant category for the search, falling back to the user-provided type.
                const searchCategory = clientGmbData.categories[0] || businessType;
                const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=${encodeURIComponent(searchCategory)}&type=${encodeURIComponent(searchCategory.replace(/_/g, ' '))}&key=${placesApiKey}`;
                console.log('Nearby search URL:', nearbyUrl); // DEBUG

                const nearbyResponse = await fetch(nearbyUrl).then(res => res.json());
                if (nearbyResponse.status === 'OK' && nearbyResponse.results.length > 0) {
                    const competitors = nearbyResponse.results
                        .filter(place =>
                            place.name.toLowerCase() !== businessName.toLowerCase() &&
                            place.business_status === 'OPERATIONAL' &&
                            place.user_ratings_total > 5 // Filter for established competitors
                        )
                        .sort((a, b) => b.user_ratings_total - a.user_ratings_total)
                        .slice(0, 3);

                    if (competitors.length > 0) {
                        const competitorProfiles = competitors.map(comp => ({
                            name: comp.name,
                            rating: comp.rating || 0,
                            reviews: comp.user_ratings_total || 0,
                        }));
                        
                        // Format this data cleanly for the prompt
                        competitorDataForPrompt = `
                          Here is the competitive landscape analysis:
                          - Client's Profile: ${JSON.stringify(clientGmbData)}
                          - Top Competitors: ${JSON.stringify(competitorProfiles)}
                        `;
                    }
                }
            }
        }

        // 5. --- Construct the Enhanced Prompt for the AI ---
        const prompt = `
          You are a world-class, aggressive Local SEO strategist. Your goal is to create a powerful, data-driven audit that creates a strong sense of urgency for a local business owner. Be direct, find problems, and clearly connect them to lost revenue. Do not be generic or soft. Use strong, persuasive language and emojis.

          Business Details:
          - Business Name: ${businessName}
          - Business Type: ${businessType}
          - Address: ${streetAddress}, ${location}
          - Biggest Challenge: "${biggestChallenge}"

          Your Task:
          Analyze the provided data and generate a JSON report. You MUST infer missing data to create a complete and impactful picture.
          - If the business was not found on Google, this is a CRITICAL issue. Your report must reflect this severity. Create a realistic but urgent scenario of how much business they are losing.
          - If the business was found, critically analyze its stats against inferred competitor averages. Find weaknesses.
          - Estimate a realistic "Average Job Value" for this business type. This is crucial for the revenue impact calculation. For example, a plumber might be $300, a salon $80, a roofer $5000.
          - Base your analysis on these 5 core local SEO pillars. Score each from 0-100 internally to determine the overall letter grade:
            1.  Profile Completeness Score (0-100): Is every field filled out? Special hours, services, attributes?
            2.  Photo Quantity & Quality Score (0-100): Do they have at least 20 high-quality, recent photos?
            3.  Review Score & Recency Score (0-100): What's the average rating and how many recent (last 3 months) reviews do they have?
            4.  Consistent Posting Score (0-100): Are they using Google Posts weekly?
            5.  Local Keyword Optimization Score (0-100): Is the business name, description, and services optimized for local search terms?

          Data for Analysis:
          - Business Found on Google Places API: ${businessFound}
          ${competitorDataForPrompt}

          Generate a JSON object using this exact structure. Do not include any preamble, markdown, or code block syntax.

          {
            "business_found": ${businessFound},
            "overall_score": "A single letter grade (A, B, C, D, or F) based on your internal scoring of the 5 pillars.",
            "overall_explanation": "A punchy, one-sentence explanation for the score that creates urgency. Connect it to their biggest challenge.",
            "profile_analysis": {
              "title": "Your Profile Analysis",
              "issues": [
                { "problem": "A specific, critical problem found (e.g., 'Missing Key Business Information').", "impact": "The direct negative impact of this problem (e.g., 'Customers can't see your services, so they call a competitor who lists them.')." }
              ]
            },
            "competitor_comparison": {
              "title": "How You Stack Up",
              "your_stats": { "rating": ${clientGmbData?.rating || 0}, "reviews": ${clientGmbData?.reviewCount || 0}, "photos": ${clientGmbData?.photoCount || 0} },
              "competitor_averages": { "rating": "A realistic number (e.g., 4.8).", "reviews": "A realistic number (e.g., 150).", "advantage_areas": ["A list of 1-2 areas where competitors are winning, e.g., 'More Reviews', 'Better Photos'."] }
            },
            "optimization_plan": {
              "title": "Your 3-Step Optimization Plan",
              "priority_fixes": [
                { "fix": "A high-impact, actionable fix (e.g., 'Add 10 Real Job Photos').", "why": "Why this fix is critical (e.g., 'Builds trust and shows the quality of your work instantly.').", "timeline": "Estimated time to complete (e.g., '1 Hour')." }
              ]
            },
            "revenue_impact": {
              "title": "Estimated Revenue Impact",
              "monthly_lost_leads": "An estimated number of leads lost per month due to these issues.",
              "avg_job_value": "Your inferred average job value for this business type."
            }
          }
        `;

        // 6. --- Call the Gemini API ---
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                }
            })
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.text();
            console.error("Gemini API Error:", errorBody);
            throw new Error(`The AI service returned an error. Status: ${apiResponse.status}`);
        }

        const responseData = await apiResponse.json();
        
        // The response should be clean JSON because of responseMimeType
        const rawText = responseData.candidates[0].content.parts[0].text;
        
        let reportJson;
        try {
            reportJson = JSON.parse(rawText);
        } catch (parseError) {
            console.error("Failed to parse JSON response from AI.");
            console.error("Raw AI Response:", rawText);
            throw new Error("The AI returned a response in an unexpected format.");
        }

        // 7. --- Send the Final Result Back to the Frontend ---
        res.status(200).json(reportJson);

    } catch (error) {
        console.error('Full error details:', error.message);
        res.status(500).json({
            error: error.message || 'An unknown server error occurred.'
        });
    }
}

