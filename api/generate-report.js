// Located at: /api/generate-report.js

// This is a Vercel Serverless Function. It runs securely on the backend.
export default async function handler(req, res) {
  // 1. --- Security and Method Check ---
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2. --- Get Data from Frontend ---
  // The form data sent from the React app is in the request body.
  const formData = req.body;

  // 3. --- Get Secure API Key ---
  // IMPORTANT: The API key is stored in Vercel Environment Variables, not in the code.
  // You will need to add this variable in your Vercel project settings.
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    console.error("Gemini API key is not configured.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  // 4. --- Construct the Prompt for the AI ---
  // This is the same logic you had, but now running on the server.
  const prompt = `
    Analyze the following local business and generate a comprehensive Local SEO Action Plan. The business details are:
    - Business Name: ${formData.businessName}
    - Business Type: ${formData.businessType}
    - Location: ${formData.location}
    - Website: ${formData.websiteUrl || 'Not provided'}
    - GMB URL: ${formData.gmbUrl || 'Not provided'}
    - Primary Service: ${formData.primaryService}
    - Ideal Customer: ${formData.idealCustomer}
    - Main Goal: ${formData.mainGoal}

    Based on this information, perform the following analysis and return the output ONLY as a valid JSON object with the specified structure. Do not include any introductory text, backticks, or "json" markers. The JSON object should have these exact keys: "overall_score", "overall_explanation", "gmb_optimization", "local_keyword_strategy", "content_plan".

    The structure should be:
    {
      "overall_score": "A string grade like 'B+' or 'C-'.",
      "overall_explanation": "A string explaining the score in one sentence.",
      "gmb_optimization": {
        "title": "A string for the section title.",
        "recommendations": [
          { "point": "A string for the specific area (e.g., 'Profile Completeness')", "action": "A string with the recommended action." }
        ]
      },
      "local_keyword_strategy": {
        "title": "A string for the section title.",
        "keywords": [
          { "keyword": "A string for the keyword phrase.", "reason": "A string explaining why this keyword is valuable." }
        ]
      },
      "content_plan": {
        "title": "A string for the section title.",
        "posts": [
          { "week": "An integer for the week number.", "topic": "A string for the post topic.", "details": "A string with the post details." }
        ]
      }
    }
  `;

  // 5. --- Call the Gemini API ---
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;

  try {
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.text();
        console.error("Gemini API Error:", errorBody);
        throw new Error(`API call failed with status: ${apiResponse.status}`);
    }

    const responseData = await apiResponse.json();
    
    // Extract the JSON string from the response
    const jsonString = responseData.candidates[0].content.parts[0].text;
    
    // Parse it into a JavaScript object
    const reportJson = JSON.parse(jsonString);

    // 6. --- Send the Result Back to the Frontend ---
    res.status(200).json(reportJson);

  } catch (error) {
    console.error('Error calling Gemini API or parsing response:', error);
    res.status(500).json({ error: 'Failed to generate report.' });
  }
}
