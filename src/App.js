import React, { useState, useEffect } from 'react';

// --- Helper Components & Icons ---
const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const LockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);
const MapPinIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);
const EyeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
);
const TrendingUpIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
);
const CameraIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
);
const AlertTriangleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);
const CalendarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

// --- Loading Spinner Component ---
const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[60vh]">
        <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-xl font-semibold text-slate-300">Auditing your local market...</p>
        <p className="text-slate-400">This may take up to 30 seconds.</p>
    </div>
);

// --- Main App Component ---
function App() {
    const [view, setView] = useState('form'); // 'form', 'loading', 'audit', 'report'
    const [reportData, setReportData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);

    // This function now calls a real API endpoint
    const generateReport = async (data) => {
        setView('loading');
        setError(null);
        setFormData(data);

        try {
            // Use the fetch API to send a POST request to your backend.
            // Replace '/api/generate-report' with your actual API endpoint.
            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Check if the request was successful
            if (!response.ok) {
                // Try to get a meaningful error message from the response body
                const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
                throw new Error(errorData.message || `Server responded with status: ${response.status}`);
            }

            // Parse the JSON response from the API
            const report = await response.json();
            
            setReportData(report);
            setView('audit'); // Go to the audit page first

        } catch (err) {
            console.error("Failed to generate report:", err);
            setError(err.message || "Failed to analyze local competition. This can happen during high traffic. Please try again.");
            setView('form');
        }
    };

    const handleGetFullPlan = () => {
        // In a real app, this would likely redirect to a payment/signup flow
        // For this demo, we'll just show the full report
        setView('report');
    };

    const handleStartOver = () => {
        setView('form');
        setReportData(null);
        setFormData(null);
        setError(null);
    };

    const renderView = () => {
        switch (view) {
            case 'loading':
                return <LoadingSpinner />;
            case 'audit':
                return <AuditPage reportData={reportData} businessName={formData.businessName} onGetFullPlan={handleGetFullPlan} />;
            case 'report':
                return <ReportPage reportData={reportData} businessName={formData.businessName} onStartOver={handleStartOver} />;
            case 'form':
            default:
                return <LocalSeoForm onSubmit={generateReport} error={error} />;
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans">
            <div className="container mx-auto px-4 py-8 md:py-16">
                {renderView()}
            </div>
        </div>
    );
}

// --- Form Component ---
function LocalSeoForm({ onSubmit, error }) {
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: 'Barber Shop',
        location: '',
        primaryService: '',
        mainGoal: 'Get More Walk-ins'
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
        <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">SEO Sentinel AI</h1>
                <p className="text-xl md:text-2xl text-slate-300">We help business owners dominate Google & Apple maps in their area.</p>
                <p className="text-lg text-slate-400 mt-2">Get more customers without a website.</p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="pt-4 md:pt-0">
                        <MapPinIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-lg font-bold text-blue-400">1. Free Audit</p>
                        <p className="text-sm text-slate-400 mt-1">We analyze your local market.</p>
                    </div>
                    <div className="pt-4 md:pt-0">
                        <AlertTriangleIcon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-lg font-bold text-yellow-400">2. Find Gaps</p>
                        <p className="text-sm text-slate-400 mt-1">See what your competitors are missing.</p>
                    </div>
                    <div className="pt-4 md:pt-0">
                        <TrendingUpIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <p className="text-lg font-bold text-green-400">3. We Handle It</p>
                        <p className="text-sm text-slate-400 mt-1">$30/month to dominate your area.</p>
                    </div>
                </div>
            </div>
            
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
                        <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g., Tony's Barber Shop" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="businessType" className="block text-sm font-medium text-slate-300 mb-2">Type of Business</label>
                        <select id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required>
                            <option value="Barber Shop">Barber Shop</option>
                            <option value="Hair Salon">Hair Salon</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Coffee Shop">Coffee Shop</option>
                            <option value="Auto Repair">Auto Repair</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="HVAC">HVAC</option>
                            <option value="Roofer">Roofer</option>
                            <option value="Landscaper">Landscaper</option>
                            <option value="Dentist">Dentist</option>
                            <option value="Law Firm">Law Firm</option>
                            <option value="Gym">Gym</option>
                            <option value="Pet Groomer">Pet Groomer</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">Business Location (City, State)</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Philadelphia, PA" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                </div>
                <div>
                     <label htmlFor="primaryService" className="block text-sm font-medium text-slate-300 mb-2">What's Your Main Service?</label>
                     <input type="text" id="primaryService" name="primaryService" value={formData.primaryService} onChange={handleChange} placeholder="e.g., Men's haircuts and beard trims" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                </div>
                <div>
                    <label htmlFor="mainGoal" className="block text-sm font-medium text-slate-300 mb-2">What's Your Main Goal?</label>
                    <select id="mainGoal" name="mainGoal" value={formData.mainGoal} onChange={handleChange} className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required>
                        <option value="Get More Walk-ins">Get More Walk-ins</option>
                        <option value="Increase Phone Calls">Increase Phone Calls</option>
                        <option value="Beat My Competition">Beat My Competition</option>
                        <option value="Show Up First on Maps">Show Up First on Maps</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30">
                    Get My FREE Business Audit
                </button>
            </form>
        </div>
    );
}

// --- Audit Page Component (The "Teaser") ---
function AuditPage({ reportData, businessName, onGetFullPlan }) {
    if (!reportData) return <div className="text-center py-20">Analysis failed. Please start over.</div>;

    const competitorCount = reportData.competitor_analysis?.insights?.length || 0;
    const gapCount = Math.min(competitorCount, 3);
    const photoIdeasCount = (reportData.local_keyword_strategy?.keywords?.length || 0) + 8;

    return (
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
                <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">✅ Business Audit Complete</h1>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mt-2 mb-4">{businessName}</h2>
                <p className="text-lg text-slate-300">We found <span className="font-bold text-yellow-400">{gapCount} major opportunities</span> your competitors are missing</p>
            </div>

            {/* Limited data preview to prove value */}
            <div className="grid md:grid-cols-2 gap-6 text-left mb-10">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <TrendingUpIcon className="h-8 w-8 text-blue-400" />
                        <h3 className="text-xl font-bold text-white">Your Local SEO Score</h3>
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">{reportData.overall_score || 'B-'}</div>
                    <p className="text-slate-400">{reportData.overall_explanation || 'Multiple opportunities found to outrank competitors'}</p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <EyeIcon className="h-8 w-8 text-red-400" />
                        <h3 className="text-xl font-bold text-white">Limited Competitive Analysis</h3>
                    </div>
                    <p className="text-slate-300 mb-2">Showing <span className="font-bold text-yellow-400">1 of {Math.max(competitorCount, 3)}</span> competitors analyzed</p>
                    <p className="text-slate-400 text-sm">{reportData.competitor_analysis?.summary ? reportData.competitor_analysis.summary.substring(0, 80) + '...' : 'Your competitors have significant weaknesses.'} <span className="text-blue-400">Unlock full analysis →</span></p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <CameraIcon className="h-8 w-8 text-purple-400" />
                        <h3 className="text-xl font-bold text-white">Photo Strategy Preview</h3>
                    </div>
                    <p className="text-slate-300 mb-2"><span className="font-bold text-yellow-400">2</span> high-impact photo ideas shown</p>
                    <p className="text-slate-400 text-sm">See all {photoIdeasCount}+ recommendations →</p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <CalendarIcon className="h-8 w-8 text-green-400" />
                        <h3 className="text-xl font-bold text-white">Sample Content Plan</h3>
                    </div>
                    <p className="text-slate-300 mb-2">Week 1 preview shown</p>
                    <p className="text-slate-400 text-sm">Get full 4-week calendar monthly →</p>
                </div>
            </div>

            {/* Show one actual insight as proof */}
            {reportData.competitor_analysis?.insights?.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-xl mb-8 text-left">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">🔍 Sample Opportunity Found:</h3>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                        <p className="text-slate-200 font-semibold">{reportData.competitor_analysis.insights[0].insight}</p>
                        <p className="text-slate-400 mt-2">{reportData.competitor_analysis.insights[0].action}</p>
                    </div>
                    <p className="text-slate-400 text-sm mt-3">This is just 1 of {gapCount}+ opportunities we found...</p>
                </div>
            )}

            {/* Main CTA for the monthly service */}
            <div className="bg-slate-800 p-8 rounded-2xl border-2 border-green-500 shadow-2xl shadow-green-500/20">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Dominate Your Market?</h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Let us handle everything while you focus on your business. We'll optimize your profile, manage your posts, track competitors, and keep you ahead of the pack.</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6 text-left text-sm max-w-xl mx-auto">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0" /><span className="text-slate-300">Weekly GMB posts written & scheduled</span></div>
                        <div className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0" /><span className="text-slate-300">Professional photo recommendations</span></div>
                        <div className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0" /><span className="text-slate-300">Monthly competitor monitoring</span></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0" /><span className="text-slate-300">Complete optimization roadmap</span></div>
                        <div className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0" /><span className="text-slate-300">Full 4-week content calendar monthly</span></div>
                        <div className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0" /><span className="text-slate-300">Cancel anytime</span></div>
                    </div>
                </div>

                <div className="my-6">
                    <span className="text-5xl font-extrabold text-white">$30</span>
                    <span className="text-xl text-slate-400">/month</span>
                </div>
                <button onClick={onGetFullPlan} className="w-full max-w-md mx-auto bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30">
                    Start My Domination Plan
                </button>
                 <div className="mt-6 border-t border-slate-700/50 pt-4 max-w-md mx-auto">
                      <p className="text-slate-300">✨ Add full review & comment response management for <span className="font-bold text-white">+$10/mo</span></p>
                 </div>
            </div>
        </div>
    );
}

// --- Report Page Component (Full Plan) ---
function ReportPage({ reportData, businessName, onStartOver }) {
    if (!reportData) return <div className="text-center py-20">No report data available. Please start over.</div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Your Complete Domination Plan</h1>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mt-2">{businessName}</h2>
                <p className="text-slate-300 mt-4">Here's everything we'll do to put you ahead of your competitors.</p>
            </div>

            {/* GMB Optimization */}
            {reportData.gmb_optimization && (
                <ReportSection icon={<MapPinIcon className="h-8 w-8 text-blue-400" />} title={reportData.gmb_optimization.title}>
                    <div className="grid gap-6">
                        {reportData.gmb_optimization.recommendations?.map((rec, i) => (
                            <div key={i} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-blue-400 mb-2">{rec.point}</h4>
                                <p className="text-slate-300">{rec.action}</p>
                            </div>
                        ))}
                    </div>
                </ReportSection>
            )}

            {/* Competitor Analysis */}
            {reportData.competitor_analysis && (
                <ReportSection icon={<EyeIcon className="h-8 w-8 text-red-400" />} title={reportData.competitor_analysis.title}>
                    <div className="mb-6">
                        <p className="text-slate-300 text-lg">{reportData.competitor_analysis.summary}</p>
                    </div>
                    <div className="grid gap-4">
                        {reportData.competitor_analysis.insights?.map((insight, i) => (
                            <div key={i} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-green-400 mb-2">{insight.insight}</h4>
                                <p className="text-slate-300">{insight.action}</p>
                            </div>
                        ))}
                    </div>
                </ReportSection>
            )}

            {/* Local Keyword Strategy */}
            {reportData.local_keyword_strategy && (
                <ReportSection icon={<TrendingUpIcon className="h-8 w-8 text-green-400" />} title={reportData.local_keyword_strategy.title}>
                    <div className="grid md:grid-cols-2 gap-4">
                        {reportData.local_keyword_strategy.keywords?.map((kw, i) => (
                            <div key={i} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-green-400 mb-2">"{kw.keyword}"</h4>
                                <p className="text-slate-300 text-sm">{kw.reason}</p>
                            </div>
                        ))}
                    </div>
                </ReportSection>
            )}

            {/* Content Plan */}
            {reportData.content_plan && (
                <ReportSection icon={<CalendarIcon className="h-8 w-8 text-purple-400" />} title={reportData.content_plan.title}>
                    <div className="grid md:grid-cols-2 gap-6">
                        {reportData.content_plan.posts?.map((post, i) => (
                            <div key={i} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                                <h4 className="font-bold text-purple-400 mb-3">Week {post.week}</h4>
                                <h5 className="font-semibold text-slate-200 mb-2">{post.topic}</h5>
                                <p className="text-slate-300 text-sm">{post.details}</p>
                            </div>
                        ))}
                    </div>
                </ReportSection>
            )}

            <div className="text-center mt-16">
                <button 
                    onClick={onStartOver} 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold"
                >
                    &laquo; Analyze Another Business
                </button>
            </div>
        </div>
    );
}

// Helper component for Report Sections
function ReportSection({ icon, title, children }) {
    return (
        <div className="bg-slate-800/30 p-6 md:p-8 rounded-2xl border border-slate-700 mb-8">
            <div className="flex items-center gap-4 mb-6">
                {icon}
                <h3 className="text-2xl font-bold text-slate-100">{title}</h3>
            </div>
            {children}
        </div>
    );
}

export default App;
