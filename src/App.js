import React from 'react';

// --- Helper Components & Icons ---
// In a real app, these would be in separate files and you'd use a library like lucide-react.
const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const TargetIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
);

const FileTextIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

const GlobeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const TrendingUpIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
);

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen">
        <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-xl font-semibold text-slate-300">Our AI is analyzing your business...</p>
        <p className="text-slate-400">This may take up to 30 seconds.</p>
    </div>
);


// --- Main App Component ---
function App() {
    // Manages the current view: 'form', 'loading', or 'report'
    const [view, setView] = React.useState('form');
    // Stores the generated report data from the AI
    const [reportData, setReportData] = React.useState(null);
    // Stores the business name to personalize the report header
    const [businessName, setBusinessName] = React.useState('');
    // Stores any potential error messages
    const [error, setError] = React.useState(null);

    // --- MOCK API CALL ---
    // This function simulates fetching a report from a backend.
    const generateReport = async (formData) => {
        setView('loading');
        setError(null);
        setBusinessName(formData.businessName);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            // In a real app, you would fetch from your API endpoint.
            // For now, we use mock data.
            const mockReport = {
                executiveSummary: `Based on our analysis for ${formData.businessName}, a ${formData.businessType} in ${formData.location}, there is a significant opportunity to capture more local customers by optimizing your Google Business Profile and creating targeted website content. Your primary goal of '${formData.mainGoal}' is achievable with a focused 90-day strategy.`,
                businessOverview: {
                    strengths: ["Clear primary service offering.", "Defined ideal customer profile.", "Specific business goal identified."],
                    weaknesses: ["No website or GMB URL provided for analysis.", "Online visibility is likely low without these assets."],
                    opportunities: ["Dominate local search for 'plumber in Philadelphia'.", "Build trust with customer testimonials and project photos.", "Create helpful blog content to attract homeowners."]
                },
                keywordStrategy: {
                    primaryKeywords: ["plumber Philadelphia", "emergency plumber Philly", "plumbing services PA"],
                    secondaryKeywords: ["leak repair", "drain cleaning", "water heater installation"],
                    longTailKeywords: ["best plumber for old homes in Philadelphia", "24/7 emergency plumbing repair near me", "cost to install new toilet Philly"]
                },
                gmbOptimization: {
                    currentIssues: ["Profile may be incomplete or not claimed.", "Missing services, photos, and regular posts."],
                    recommendations: ["Fully complete every section of your GMB profile.", "Add high-quality photos of your team and work.", "Post weekly updates with offers or completed jobs.", "Actively solicit and respond to all customer reviews."],
                    priorityActions: ["Verify GMB ownership.", "Add at least 10 high-quality photos this week."]
                },
                websiteOptimization: {
                    technicalIssues: ["Ensure mobile-friendliness.", "Improve page load speed.", "Implement local business schema markup."],
                    contentRecommendations: ["Create a dedicated service page for each primary service.", "Add a clear call-to-action on every page.", "Feature customer testimonials prominently."],
                    localSeoElements: ["Embed a Google Map of your service area.", "Display your Name, Address, and Phone Number (NAP) consistently on all pages."]
                },
                contentStrategy: {
                    blogTopics: ["5 Signs You Need to Call a Plumber Immediately", "DIY vs. Professional Drain Cleaning: What's Best?", "How to Choose the Right Water Heater for Your Home"],
                    localContent: ["Highlighting a recent plumbing job in the 'Fishtown' neighborhood.", "Partnering with a local hardware store for a promotion."]
                },
                actionPlan: {
                    month1: ["Complete GMB & Website Foundation.", "Start soliciting reviews from past customers.", "Write and publish first blog post."],
                    month2: ["Publish 2 new blog posts.", "Add 2 new service pages to the website.", "Launch a Google Post campaign."],
                    month3: ["Analyze results from Month 1 & 2.", "Create a local content piece (e.g., a neighborhood project feature).", "Refresh GMB photos."]
                }
            };
            setReportData(mockReport);
            setView('report');

        } catch (err) {
            console.error("Failed to generate report:", err);
            setError("We couldn't generate your report at this time. Please try again later.");
            setView('form'); // Go back to the form
        }
    };

    // Function to reset the app and start over
    const handleStartOver = () => {
        setView('form');
        setReportData(null);
        setBusinessName('');
        setError(null);
    };

    // Render different views based on the current state
    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans">
            <div className="container mx-auto px-4 py-8 md:py-16">
                {view === 'form' && <SeoForm onSubmit={generateReport} error={error} />}
                {view === 'loading' && <LoadingSpinner />}
                {view === 'report' && <ReportPage reportData={reportData} businessName={businessName} onStartOver={handleStartOver} />}
            </div>
        </div>
    );
}

// --- Form Component ---
function SeoForm({ onSubmit, error }) {
    const [formData, setFormData] = React.useState({
        businessName: '',
        businessType: '',
        location: '',
        websiteUrl: '',
        gmbUrl: '',
        primaryService: '',
        idealCustomer: '',
        mainGoal: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">SEO Sentinel AI</h1>
                <p className="text-xl md:text-2xl text-slate-300">Get Your FREE, Instant Local SEO Action Plan</p>
            </div>

            {/* --- "How It Works" Section --- */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700">
                    <div className="pt-4 md:pt-0">
                        <p className="text-lg font-bold text-blue-400">1. Provide Info</p>
                        <p className="text-sm text-slate-400 mt-1">Tell us about your business below.</p>
                    </div>
                    <div className="pt-4 md:pt-0">
                        <p className="text-lg font-bold text-blue-400">2. AI Analysis</p>
                        <p className="text-sm text-slate-400 mt-1">Our AI analyzes your online presence instantly.</p>
                    </div>
                    <div className="pt-4 md:pt-0">
                        <p className="text-lg font-bold text-blue-400">3. Get Free Plan</p>
                        <p className="text-sm text-slate-400 mt-1">Receive a custom action plan to get more customers.</p>
                    </div>
                </div>
            </div>
            
            {/* --- ERROR MESSAGE DISPLAY --- */}
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6 text-center">
                    <p className="font-bold">Oops! Something went wrong.</p>
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-slate-300 mb-2">Business Name</label>
                        <input type="text" id="businessName" name="businessName" onChange={handleChange} placeholder="e.g., Philly's Best Plumbing" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="businessType" className="block text-sm font-medium text-slate-300 mb-2">Type of Business</label>
                        <select id="businessType" name="businessType" onChange={handleChange} className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required>
                            <option value="">Select type...</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="HVAC">HVAC</option>
                            <option value="Roofer">Roofer</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Retail Store">Retail Store</option>
                            <option value="Dentist">Dentist</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">Business Location (City, State)</label>
                    <input type="text" id="location" name="location" onChange={handleChange} placeholder="e.g., Philadelphia, PA" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="websiteUrl" className="block text-sm font-medium text-slate-300 mb-2">Website URL (Optional)</label>
                        <input type="url" id="websiteUrl" name="websiteUrl" onChange={handleChange} placeholder="https://www.yourwebsite.com" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                    </div>
                    <div>
                        <label htmlFor="gmbUrl" className="block text-sm font-medium text-slate-300 mb-2">Google Business Profile URL (Optional)</label>
                        <input type="url" id="gmbUrl" name="gmbUrl" onChange={handleChange} placeholder="https://maps.app.goo.gl/..." className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                    </div>
                </div>
                <div>
                     <label htmlFor="primaryService" className="block text-sm font-medium text-slate-300 mb-2">Describe Your Primary Service/Product</label>
                     <textarea id="primaryService" name="primaryService" rows="3" onChange={handleChange} placeholder="e.g., We specialize in emergency residential plumbing repairs and new fixture installations." className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required></textarea>
                </div>
                 <div>
                     <label htmlFor="idealCustomer" className="block text-sm font-medium text-slate-300 mb-2">Who is Your Ideal Customer?</label>
                     <input type="text" id="idealCustomer" name="idealCustomer" onChange={handleChange} placeholder="e.g., Homeowners in the Philadelphia area, aged 35-65." className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                </div>
                <div>
                    <label htmlFor="mainGoal" className="block text-sm font-medium text-slate-300 mb-2">What is Your Main Business Goal?</label>
                      <select id="mainGoal" name="mainGoal" onChange={handleChange} className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required>
                            <option value="">Select goal...</option>
                            <option value="Get More Phone Calls">Get More Phone Calls</option>
                            <option value="Get More Website Visits">Get More Website Visits</option>
                            <option value="Increase Foot Traffic">Increase Foot Traffic</option>
                            <option value="Book More Appointments">Book More Appointments</option>
                        </select>
                </div>

                <button type="submit" className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30">
                    Generate My Free Report
                </button>
            </form>
        </div>
    );
}

// --- Report Section Wrapper ---
function ReportSection({ icon, title, children }) {
    return (
        <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-4 mb-6">
                {icon}
                <h3 className="text-2xl font-bold text-slate-100">{title}</h3>
            </div>
            <div>{children}</div>
        </div>
    );
}


// --- Report Page Component ---
function ReportPage({ reportData, businessName, onStartOver }) {
    if (!reportData) return <div className="text-center py-20">No report data available. Please start over.</div>;

    const { 
        executiveSummary, 
        businessOverview, 
        keywordStrategy, 
        gmbOptimization, 
        websiteOptimization,
        contentStrategy,
        actionPlan,
    } = reportData;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Your FREE Custom Local SEO Action Plan for:</h1>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mt-2">{businessName}</h2>
            </div>

            {/* Executive Summary */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 mb-12 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Executive Summary</h3>
                <p className="text-slate-300 text-lg leading-relaxed">{executiveSummary}</p>
            </div>

            {/* Business Overview */}
            {businessOverview && (
                <ReportSection icon={<TrendingUpIcon className="h-8 w-8 text-blue-400" />} title="Business Analysis">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-bold text-green-400 mb-3">Strengths</h4>
                            <ul className="space-y-2">
                                {businessOverview.strengths?.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                                        <span className="text-slate-300 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-yellow-400 mb-3">Areas to Improve</h4>
                            <ul className="space-y-2 list-disc list-inside text-slate-300 text-sm">
                                {businessOverview.weaknesses?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-blue-400 mb-3">Opportunities</h4>
                            <ul className="space-y-2 list-disc list-inside text-slate-300 text-sm">
                                {businessOverview.opportunities?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ReportSection>
            )}

            {/* Main Report Sections */}
            <div className="space-y-8 mt-8">
                {/* Keyword Strategy */}
                {keywordStrategy && (
                    <ReportSection icon={<TargetIcon className="h-8 w-8 text-blue-400" />} title="Keyword Strategy">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-bold text-blue-400 mb-3">Primary Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {keywordStrategy.primaryKeywords?.map((keyword, index) => (
                                        <span key={index} className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-green-400 mb-3">Secondary Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {keywordStrategy.secondaryKeywords?.map((keyword, index) => (
                                        <span key={index} className="inline-block bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-purple-400 mb-3">Long-tail Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {keywordStrategy.longTailKeywords?.map((keyword, index) => (
                                        <span key={index} className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ReportSection>
                )}

                {/* GMB Optimization */}
                {gmbOptimization && (
                    <ReportSection icon={<CheckCircleIcon className="h-8 w-8 text-blue-400" />} title="Google Business Profile Optimization">
                        <div className="space-y-6">
                            {gmbOptimization.recommendations && (
                                <div>
                                    <h4 className="font-bold text-blue-400 mb-3">Recommendations</h4>
                                    <ul className="space-y-3">
                                        {gmbOptimization.recommendations?.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                                <span className="text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </ReportSection>
                )}

                {/* Website Optimization */}
                {websiteOptimization && (
                    <ReportSection icon={<GlobeIcon className="h-8 w-8 text-blue-400" />} title="Website Optimization">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-yellow-400 mb-3">Technical Improvements</h4>
                                <ul className="space-y-2 list-disc list-inside text-slate-300">
                                    {websiteOptimization.technicalIssues?.map((issue, index) => (
                                        <li key={index}>{issue}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-400 mb-3">Content Recommendations</h4>
                                <ul className="space-y-2 list-disc list-inside text-slate-300">
                                    {websiteOptimization.contentRecommendations?.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ReportSection>
                )}

                {/* Content Strategy */}
                {contentStrategy && (
                    <ReportSection icon={<FileTextIcon className="h-8 w-8 text-blue-400" />} title="Content Strategy">
                         <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-blue-400 mb-3">Blog Content Ideas</h4>
                                <div className="space-y-3">
                                    {contentStrategy.blogTopics.map((topic, index) => (
                                        <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                            <p className="text-slate-300">{topic}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-green-400 mb-3">Local Content Opportunities</h4>
                                <ul className="space-y-2 list-disc list-inside text-slate-300">
                                    {contentStrategy.localContent.map((content, index) => (
                                        <li key={index}>{content}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ReportSection>
                )}

                {/* Action Plan */}
                {actionPlan && (
                    <ReportSection icon={<TrendingUpIcon className="h-8 w-8 text-blue-400" />} title="90-Day Action Plan">
                        <div className="grid md:grid-cols-3 gap-6">
                            {actionPlan.month1 && (
                                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                                    <h4 className="font-bold text-blue-400 mb-4">Month 1 - Foundation</h4>
                                    <ul className="space-y-2">
                                        {actionPlan.month1.map((task, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                                                <span className="text-slate-300 text-sm">{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {actionPlan.month2 && (
                                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                                    <h4 className="font-bold text-green-400 mb-4">Month 2 - Growth</h4>
                                    <ul className="space-y-2">
                                        {actionPlan.month2.map((task, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                                                <span className="text-slate-300 text-sm">{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {actionPlan.month3 && (
                                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                                    <h4 className="font-bold text-purple-400 mb-4">Month 3 - Optimization</h4>
                                    <ul className="space-y-2">
                                        {actionPlan.month3.map((task, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                                                <span className="text-slate-300 text-sm">{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </ReportSection>
                )}
            </div>

            {/* --- Call to Action / Pricing Section --- */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Put Your Growth on Autopilot?</h2>
                <p className="text-slate-300 mt-4 max-w-3xl mx-auto">Don't have time to implement this plan yourself? Let SEO Sentinel AI handle everything. We'll optimize your profile, create and publish your posts, and track your performance every single month.</p>

                <div className="mt-10 flex justify-center">
                    <div className="bg-slate-800 p-8 rounded-2xl border-2 border-green-500 relative max-w-md w-full shadow-2xl shadow-green-500/10">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
                        <h3 className="text-2xl font-bold text-white mb-4">AI-Powered SEO Management</h3>
                        <div className="my-6">
                            <span className="text-5xl font-extrabold text-white">$299</span>
                            <span className="text-xl text-slate-400">/mo</span>
                        </div>
                        <ul className="space-y-4 text-left my-8">
                           <li className="flex items-center gap-3">
                               <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                               <span className="text-slate-300">Complete GMB & Website Optimization</span>
                           </li>
                           <li className="flex items-center gap-3">
                               <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                               <span className="text-slate-300">Weekly AI-Generated Local Content</span>
                           </li>
                           <li className="flex items-center gap-3">
                               <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                               <span className="text-slate-300">Monthly Performance Reporting</span>
                           </li>
                            <li className="flex items-center gap-3">
                               <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                               <span className="text-slate-300">Cancel Anytime</span>
                           </li>
                        </ul>
                         <button className="w-full bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30">
                            Start Growing Now
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Start Over Button --- */}
            <div className="text-center mt-16">
                <button 
                    onClick={onStartOver} 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold"
                >
                    &laquo; Start a New Report
                </button>
            </div>

        </div>
    );
}

export default App;

