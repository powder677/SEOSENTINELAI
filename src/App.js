import React from 'react';

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

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[60vh]">
        <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-xl font-semibold text-slate-300">Analyzing your local competition...</p>
        <p className="text-slate-400">This may take up to 30 seconds.</p>
    </div>
);

// --- Main App Component ---
function App() {
    const [view, setView] = React.useState('form'); // 'form', 'loading', 'teaser', 'report'
    const [reportData, setReportData] = React.useState(null);
    const [formData, setFormData] = React.useState(null);
    const [error, setError] = React.useState(null);

    const generateReport = async (data) => {
        setView('loading');
        setError(null);
        setFormData(data);

        try {
            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // If the server responds with an error, capture it
                const errorData = await response.json();
                throw new Error(errorData.error || 'An unknown error occurred.');
            }

            const report = await response.json();
            setReportData(report);
            setView('teaser'); // Go to the teaser page first
            
        } catch (err) {
            console.error("Failed to generate report:", err);
            setError(err.message || "Failed to analyze local competition. This can happen during high traffic. Please try again.");
            setView('form');
        }
    };

    const handleUnlockReport = () => {
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
            case 'teaser':
                return <TeaserPage reportData={reportData} businessName={formData.businessName} onUnlock={handleUnlockReport} />;
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
    const [formData, setFormData] = React.useState({
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
                <p className="text-lg text-slate-400 mt-2">Boost your foot traffic without a website.</p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="pt-4 md:pt-0">
                        <MapPinIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-lg font-bold text-blue-400">1. Provide Info</p>
                        <p className="text-sm text-slate-400 mt-1">Tell us about your business.</p>
                    </div>
                    <div className="pt-4 md:pt-0">
                        <EyeIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-lg font-bold text-blue-400">2. AI Analysis</p>
                        <p className="text-sm text-slate-400 mt-1">We analyze your competitors' weaknesses.</p>
                    </div>
                    <div className="pt-4 md:pt-0">
                        <TrendingUpIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-lg font-bold text-blue-400">3. Get Your Plan</p>
                        <p className="text-sm text-slate-400 mt-1">Unlock a plan to outrank them.</p>
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
                    Analyze My Local Market FREE
                </button>
            </form>
        </div>
    );
}

// --- Teaser Page Component ---
function TeaserPage({ reportData, businessName, onUnlock }) {
    if (!reportData) return <div className="text-center py-20">Analysis failed. Please start over.</div>;

    const competitorCount = reportData.competitorAnalysis?.topCompetitors?.length || 0;
    const gapCount = reportData.competitorAnalysis?.opportunityGaps?.length || 0;
    const categoryCount = reportData.gmbOptimization?.missingCategories?.length || 0;
    const photoIdeasCount = reportData.gmbOptimization?.photoStrategy?.length || 0;

    return (
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Analysis Complete for:</h1>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mt-2 mb-8">{businessName}</h2>
            
            <p className="text-lg text-slate-300 mb-10">We've analyzed your local market and found multiple opportunities to dominate your competition on Google Maps. Your full, step-by-step plan is ready.</p>

            <div className="grid md:grid-cols-2 gap-6 text-left mb-10">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <CheckCircleIcon className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-xl font-bold text-white">{competitorCount} Competitor Profiles Analyzed</h3>
                    <p className="text-slate-400 mt-1">We've identified the key weaknesses of your top local rivals.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <CheckCircleIcon className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-xl font-bold text-white">{gapCount} Major Opportunity Gaps Found</h3>
                    <p className="text-slate-400 mt-1">Your competitors are making mistakes you can easily exploit.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <CheckCircleIcon className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-xl font-bold text-white">{categoryCount} Untapped GMB Categories</h3>
                    <p className="text-slate-400 mt-1">Get found by more customers searching for services you offer.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <CheckCircleIcon className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-xl font-bold text-white">{photoIdeasCount}+ High-Impact Photo Ideas</h3>
                    <p className="text-slate-400 mt-1">A detailed photo strategy to make your profile stand out.</p>
                </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border-2 border-green-500 shadow-2xl shadow-green-500/20">
                <LockIcon className="h-10 w-10 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-white">Get Your 4-Week Domination Plan</h3>
                <p className="text-slate-300 mt-4 max-w-xl mx-auto">This report is the first step. Get the full plan and put your growth on autopilot with our monthly service.</p>
                <div className="my-6">
                    <span className="text-5xl font-extrabold text-white">$30</span>
                    <span className="text-xl text-slate-400">/mo</span>
                </div>
                <button onClick={onUnlock} className="w-full max-w-md mx-auto bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30">
                    Start My Domination Plan
                </button>
                <div className="mt-6 border-t border-slate-700/50 pt-4">
                     <p className="text-slate-300">✨ Add full review & comment response management for <span className="font-bold text-white">+$10/mo</span>.</p>
                </div>
            </div>
        </div>
    );
}


// --- Report Page Component ---
function ReportPage({ reportData, businessName, onStartOver }) {
    if (!reportData) return <div className="text-center py-20">No report data available. Please start over.</div>;

    const { 
        executiveSummary, 
        competitorAnalysis, 
        gmbOptimization,
        localDominationPlan,
    } = reportData;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Your Full Local Domination Plan for:</h1>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mt-2">{businessName}</h2>
            </div>

            {/* Executive Summary */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 mb-12 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Executive Summary</h3>
                <p className="text-slate-300 text-lg leading-relaxed">{executiveSummary}</p>
            </div>

            {/* Competitor Analysis */}
            {competitorAnalysis && (
                <ReportSection icon={<EyeIcon className="h-8 w-8 text-red-400" />} title="Your Local Competition Analysis">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-red-400 mb-4">Top Local Competitors</h4>
                            <div className="space-y-4">
                                {competitorAnalysis.topCompetitors?.map((c, i) => (
                                    <div key={i} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                        <h5 className="font-bold text-slate-200">{c.name}</h5>
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                            <span>Photos: <span className="font-bold text-yellow-400">{c.estimatedPhotos}+</span></span>
                                            <span>Reviews: <span className="font-bold text-blue-400">{c.estimatedReviews}+</span></span>
                                        </div>
                                        <p className="mt-2 text-sm text-red-300"><strong>Weakness:</strong> {c.weakness}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-green-400 mb-4">Gaps You Can Exploit</h4>
                            <ul className="space-y-3">
                                {competitorAnalysis.opportunityGaps?.map((gap, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                        <span className="text-slate-300">{gap}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ReportSection>
            )}

            {/* GMB Optimization */}
            {gmbOptimization && (
                <ReportSection icon={<MapPinIcon className="h-8 w-8 text-blue-400" />} title="Google Business Profile Domination">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-red-400 mb-4">Missing GMB Categories</h4>
                            <div className="flex flex-wrap gap-2">
                                {gmbOptimization.missingCategories?.map((cat, i) => (
                                    <span key={i} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">{cat}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-400 mb-4">Your Photo Strategy</h4>
                            <ul className="space-y-2">
                                {gmbOptimization.photoStrategy?.map((photo, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CameraIcon className="h-4 w-4 text-purple-400 flex-shrink-0 mt-1" />
                                        <span className="text-slate-300 text-sm">{photo}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                             <h4 className="font-bold text-green-400 mb-4">Your Review Strategy</h4>
                             <ul className="space-y-3">
                                {gmbOptimization.reviewStrategy?.map((rev, i) => (
                                     <li key={i} className="flex items-start gap-3">
                                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                        <span className="text-slate-300">{rev}</span>
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                </ReportSection>
            )}

            {/* 4-Week Domination Plan */}
            {localDominationPlan && (
                <ReportSection icon={<TrendingUpIcon className="h-8 w-8 text-green-400" />} title="Your 4-Week Local Domination Plan">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(localDominationPlan).map(([week, tasks]) => (
                             <div key={week} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 h-full">
                                <h4 className="font-bold text-blue-400 mb-4 capitalize">Week {week.replace('week', '')}</h4>
                                <ul className="space-y-2">
                                    {tasks.map((task, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-slate-300 text-sm">{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </ReportSection>
            )}
            
            <div className="mt-20 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Dominate Your Local Area?</h2>
                 <p className="text-slate-300 mt-4 max-w-3xl mx-auto">Don't have time to do this yourself? Let SEO Sentinel AI handle everything. We'll optimize your GMB, manage your photos, respond to reviews, and keep you ahead of the competition.</p>

                 <div className="mt-10 flex justify-center">
                     <div className="bg-slate-800 p-8 rounded-2xl border-2 border-green-500 relative max-w-md w-full shadow-2xl shadow-green-500/10">
                         <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
                         <h3 className="text-2xl font-bold text-white mb-4">Local Domination Package</h3>
                         <div className="my-6">
                             <span className="text-5xl font-extrabold text-white">$30</span>
                             <span className="text-xl text-slate-400">/mo</span>
                         </div>
                         <ul className="space-y-4 text-left my-8">
                            <li className="flex items-center gap-3">
                                <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                                <span className="text-slate-300">Complete GMB & Apple Maps Setup</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                                <span className="text-slate-300">Weekly Photo & Post Management</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                                <span className="text-slate-300">Monthly Competitor Monitoring</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                                <span className="text-slate-300 font-bold text-green-300">Optional: Full Review & Comment Response for +$10/mo</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                                <span className="text-slate-300">Cancel Anytime</span>
                            </li>
                         </ul>
                          <button className="w-full bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30">
                             Start Dominating Today
                         </button>
                     </div>
                 </div>
            </div>


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
            <div>{children}</div>
        </div>
    );
}

export default App;
