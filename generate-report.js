// Located at: /api/generate-report.js

// This is a Vercel Serverless Function. It runs securely on the backend.
export default async function handler(req, res) {
  // 1. --- Security and Method Check ---
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2. --- Get Data from Frontend ---
  const formData = req.body;

  // 3. --- Get Secure API Key ---
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error("CRITICAL: GEMINI_API_KEY environment variable is not set.");
    return res.status(500).json({ error: "Server configuration error. The API key is missing." });
  }

  // 4. --- Construct the Prompt for the AI ---
  // This prompt is well-structured and asks for a specific JSON output.
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
  // THE FIX: The model name is updated from 'gemini-pro' to the current 'gemini-1.5-flash-latest'.
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

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
        throw new Error(`The AI service returned an error. Status: ${apiResponse.status}`);
    }

    const responseData = await apiResponse.json();
    
    // --- ROBUST JSON PARSING ---
    // This section is well-written to handle potential inconsistencies from the AI.
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

    // 6. --- Send the Result Back to the Frontend ---
    res.status(200).json(reportJson);

  } catch (error) {
    console.error('Full error details:', error.message);
    res.status(500).json({ error: error.message || 'An unknown server error occurred.' });
  }
}
