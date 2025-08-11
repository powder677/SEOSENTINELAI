// api/generate-report.js
// This is a Node.js/Express API endpoint that generates SEO audit reports using Claude

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting - 5 requests per IP per hour
const reportLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many audit requests from this IP. Please try again in an hour.'
  }
});

// Apply rate limiting to the report generation endpoint
app.use('/api/generate-report', reportLimiter);

// Claude API integration
async function generateAuditReport(formData) {
  const prompt = `You are an expert local SEO consultant with 20+ years of experience. Generate a comprehensive, personalized local SEO audit report for the following business.

BUSINESS INFORMATION:
- Business Name: ${formData.businessName}
- Business Type: ${formData.businessType || 'General Business'}
- Street Address: ${formData.streetAddress}
- Location: ${formData.location}
- Email: ${formData.email}
- Biggest Challenge: ${formData.biggestChallenge || 'getting_more_leads'}

IMPORTANT INSTRUCTIONS:
- Create realistic, specific scores and insights based on the business type and location
- Make recommendations actionable and relevant to their industry
- Include competitive analysis for their local market
- Use professional, consultative tone
- All scores should be between 35-85% to show room for improvement
- Make the content feel personalized and valuable

Respond with a JSON object in the following format:

{
  "business_name": "Business Name",
  "grade": "B-",
  "summary_statement": "Brief 1-2 sentence summary of their current local SEO status",
  "local_seo_score": "67",
  "visibility_score": "72",
  "reputation_score": "58",
  "profile_analysis": "Detailed analysis of their Google Business Profile and local presence (3-4 paragraphs)",
  "optimization_plan": "Specific, actionable recommendations for improvement (3-4 paragraphs with bullet points)",
  "extra_insights": "Additional insights about their market, competitors, or opportunities (2-3 paragraphs)",
  "competitors": [
    {"name": "Competitor 1", "score": 78},
    {"name": "Competitor 2", "score": 65},
    {"name": "Competitor 3", "score": 82}
  ]
}

DO NOT OUTPUT ANYTHING OTHER THAN VALID JSON. Your entire response must be a single, valid JSON object.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API request failed: ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.content[0].text;
    
    // Clean up potential markdown formatting
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    // Parse the JSON response
    const auditData = JSON.parse(responseText);
    
    // Validate required fields
    const requiredFields = ['business_name', 'grade', 'summary_statement', 'local_seo_score', 'visibility_score', 'reputation_score'];
    for (const field of requiredFields) {
      if (!auditData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return auditData;
    
  } catch (error) {
    console.error('Error generating audit report:', error);
    throw new Error(`Failed to generate audit report: ${error.message}`);
  }
}

// API endpoint for generating reports
app.post('/api/generate-report', async (req, res) => {
  try {
    // Validate required fields
    const { businessName, streetAddress, location, email } = req.body;
    
    if (!businessName || !streetAddress || !location || !email) {
      return res.status(400).json({
        error: 'Missing required fields. Please provide business name, street address, location, and email.'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address.'
      });
    }

    console.log(`Generating audit report for: ${businessName} in ${location}`);

    // Generate the audit report
    const auditReport = await generateAuditReport(req.body);

    // Log successful generation (without sensitive data)
    console.log(`Successfully generated audit report for: ${businessName}`);

    // Return the audit report
    res.json(auditReport);

  } catch (error) {
    console.error('API Error:', error);
    
    // Return appropriate error response
    if (error.message.includes('Claude API')) {
      res.status(503).json({
        error: 'Our audit system is temporarily unavailable. Please try again in a few minutes.'
      });
    } else if (error.message.includes('JSON')) {
      res.status(500).json({
        error: 'There was an issue processing your audit. Please try again.'
      });
    } else {
      res.status(500).json({
        error: 'An unexpected error occurred. Our team has been notified.'
      });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'SEO Audit Generator'
  });
});

// Handle 404s for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error. Please try again later.' 
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`SEO Audit API server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});

module.exports = app;
