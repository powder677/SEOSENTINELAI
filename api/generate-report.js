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
    console.error("CRITICAL: GEMINI_API_KEY environment variable is not set.");
    return res.status(500).json({ error: "Server configuration error. The API key is missing." });
  }

  // 4. --- Construct the Prompt for the AI ---
  // This is the same logic you had, but now running on the server.
  const prompt = `
    Analyze the following local business and generate a comprehensive Local SEO Action Plan. The business details are:
    
    - Business Name: ${formData.businessName}
    - Business Type: ${formData.businessType}
    - Location: ${formData.location}
    - Website: ${formData.website || 'Not provided'}
    - GMB URL: ${formData.gmbUrl || 'Not provided'}
    - Primary Service: ${formData.primaryService}
    - Ideal Customer: ${formData.idealCustomer}
    - Main Goal: ${formData.mainGoal}

    Based on this information, perform the following analysis and return the output ONLY as a valid JSON object with the specified structure. Do not include any introductory text, backticks, or "json" markers. Just return the raw JSON:

    {
      "executiveSummary": "Brief overview of the business and top 3 priority recommendations",
      "businessOverview": {
        "strengths": ["strength1", "strength2", "strength3"],
        "weaknesses": ["weakness1", "weakness2", "weakness3"],
        "opportunities": ["opportunity1", "opportunity2", "opportunity3"]
      },
      "keywordStrategy": {
        "primaryKeywords": ["keyword1", "keyword2", "keyword3"],
        "secondaryKeywords": ["keyword1", "keyword2", "keyword3"],
        "longTailKeywords": ["longtail1", "longtail2", "longtail3"]
      },
      "gmbOptimization": {
        "currentIssues": ["issue1", "issue2", "issue3"],
        "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
        "priorityActions": ["action1", "action2", "action3"]
      },
      "websiteOptimization": {
        "technicalIssues": ["issue1", "issue2", "issue3"],
        "contentRecommendations": ["recommendation1", "recommendation2", "recommendation3"],
        "localSeoElements": ["element1", "element2", "element3"]
      },
      "citationStrategy": {
        "priorityDirectories": ["directory1", "directory2", "directory3"],
        "industrySpecific": ["platform1", "platform2", "platform3"],
        "consistencyChecks": ["check1", "check2", "check3"]
      },
      "contentStrategy": {
        "blogTopics": ["topic1", "topic2", "topic3"],
        "localContent": ["content1", "content2", "content3"],
        "seasonalOpportunities": ["opportunity1", "opportunity2", "opportunity3"]
      },
      "actionPlan": {
        "month1": ["task1", "task2", "task3"],
        "month2": ["task1", "task2", "task3"],
        "month3": ["task1", "task2", "task3"]
      },
      "kpiMetrics": {
        "trackingRecommendations": ["metric1", "metric2", "metric3"],
        "toolsToUse": ["tool1", "tool2", "tool3"],
        "reportingSchedule": "Monthly comprehensive review with weekly ranking checks"
      }
    }

    Ensure all recommendations are specific to the business type, location, and goals provided. Make the analysis actionable and practical for immediate implementation.
  `;

  try {
    // 5. --- Call the Gemini API ---
    // FIXED: Updated to use the correct Gemini API endpoint
    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: "application/json"
          },
        }),
      }
    );

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.text();
        console.error("Gemini API Error:", errorBody);
        throw new Error(`The AI service returned an error. Status: ${apiResponse.status}. Details: ${errorBody}`);
    }

    const responseData = await apiResponse.json();

    // --- ROBUST JSON PARSING ---
    // Get the raw text from the AI response.
    const rawText = responseData.candidates[0].content.parts[0].text;

    // Clean the text: remove backticks, "json" markers, and trim whitespace.
    const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    let reportJson;
    try {
        // Try to parse the cleaned text.
        reportJson = JSON.parse(cleanedText);
    } catch (parseError) {
        console.error("Failed to parse JSON response from AI.");
        console.error("Raw AI Response:", rawText); // Log the problematic response
        throw new Error("The AI returned a response in an unexpected format.");
    }

    // 6. --- Send the Result Back to the Frontend ---
    res.status(200).json(reportJson);

  } catch (error) {
    console.error('Full error details:', error.message);
    // Send a more specific error message to the frontend.
    res.status(500).json({ error: error.message || 'An unknown server error occurred.' });
  }
}
