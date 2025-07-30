import React, { useState, useEffect } from 'react';

// --- Helper Components & Icons ---
const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
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
const ToolIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
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

    const generateReport = async (data) => {
        setView('loading');
        setError(null);
        setFormData(data);
        try {
            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
                throw new Error(errorData.message || `Server responded with status: ${response.status}`);
            }
            const report = await response.json();
            setReportData(report);
            setView('audit');
        } catch (err) {
            console.error("Failed to generate report:", err);
            setError(err.message || "Failed to analyze local competition. This can happen during high traffic. Please try again.");
            setView('form');
        }
    };

    const handleGetFullPlan = () => {
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
                return <OnboardingPage reportData={reportData} businessName={formData.businessName} onStartOver={handleStartOver} />;
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
                        <ToolIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <p className="text-lg font-bold text-green-400">3. We Fix It</p>
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
    
    return (
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
                <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">✅ Business Audit Complete</h1>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mt-2 mb-4">{businessName}</h2>
                <p className="text-lg text-slate-300">We found <span className="font-bold text-yellow-400">{gapCount} major opportunities</span> your competitors are missing.</p>
            </div>

            {/* Show a few key insights from the report as a teaser */}
            <div className="grid md:grid-cols-2 gap-6 text-left mb-10">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <TrendingUpIcon className="h-8 w-8 text-blue-400" />
                        <h3 className="text-xl font-bold text-white">Your Local SEO Score</h3>
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">{reportData.overall_score || 'B-'}</div>
                    <p className="text-slate-400">{reportData.overall_explanation || 'Multiple opportunities found to outrank competitors'}</p>
                </div>

                {reportData.competitor_analysis?.insights?.length > 0 && (
                     <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                            <EyeIcon className="h-8 w-8 text-red-400" />
                            <h3 className="text-xl font-bold text-white">Top Competitor Weakness</h3>
                        </div>
                        <p className="text-slate-300 font-semibold mb-2">{reportData.competitor_analysis.insights[0].insight}</p>
                        <p className="text-slate-400 text-sm">{reportData.competitor_analysis.insights[0].action}</p>
                    </div>
                )}
            </div>
            
            {/* Main CTA to see the full plan */}
            <div className="bg-slate-800 p-8 rounded-2xl border-2 border-green-500 shadow-2xl shadow-green-500/20">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Want Our Experts to Fix These Issues?</h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Click below to see your personalized 30-day action plan. We'll show you exactly how we'll get you more customers.</p>
                
                <button onClick={onGetFullPlan} className="w-full max-w-md mx-auto bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30">
                    Yes, Show Me the Plan 🔧
                </button>
            </div>
        </div>
    );
}


// --- Onboarding Page Component (The New Final Page) ---
function OnboardingPage({ businessName, onStartOver }) {
    const [includeAddon, setIncludeAddon] = useState(false);
    const [onboardingData, setOnboardingData] = useState({ name: '', email: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOnboardingData(prev => ({...prev, [name]: value}));
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        // In a real app, you would integrate with a payment provider like Stripe
        // and then send the onboardingData to your backend.
        alert(`Checkout initiated for ${onboardingData.email} with add-on: ${includeAddon}. Total: $${30 + (includeAddon ? 10 : 0)}`);
    };

    const deliverables = [
        { week: 1, icon: "📸", action: "Photo Strategy Launch", description: "We’ll send you 5 custom photo prompts to capture + upload, or we can use AI-enhanced images." },
        { week: 2, icon: "✍️", action: "4 GMB Posts Written & Scheduled", description: "We’ll write and queue up your GMB posts — including one based on a review/testimonial." },
        { week: 3, icon: "⭐", action: "Review System Kickoff", description: "You'll get a printable + digital “Review Request Card” for staff to hand out, plus SMS/email copy." },
        { week: 4, icon: "📊", action: "Competitor Positioning Report", description: "See your new ranking and how you compare. We’ll tweak the strategy if needed." },
    ];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white">🚀 Ready to Fix This in the Next 30 Days?</h1>
                <p className="text-xl text-slate-300 mt-4">Here's exactly what you'll get when you activate your Local SEO Optimization Plan for <span className="text-blue-400 font-bold">{businessName}</span>:</p>
            </div>

            {/* Deliverables Section */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 mb-10">
                <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">📦 Month 1: Deliverables</h2>
                <div className="space-y-6">
                    {deliverables.map(item => (
                        <div key={item.week} className="flex items-start gap-4">
                            <div className="text-3xl mt-1">{item.icon}</div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-100">{item.action}</h3>
                                <p className="text-slate-400">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-700">
                    <h3 className="text-xl font-bold text-center text-blue-400 mb-4">🔁 Every Month After:</h3>
                    <div className="grid grid-cols-2 gap-4 text-center text-slate-300">
                        <p>4 new GMB posts</p>
                        <p>Monthly competitor tracking</p>
                        <p>Photo content review</p>
                        <p>Review system feedback</p>
                    </div>
                </div>
            </div>
            
            {/* Onboarding & Checkout Form */}
            <div className="bg-slate-800 p-8 rounded-2xl border-2 border-green-500 shadow-2xl shadow-green-500/20">
                 <h2 className="text-2xl font-bold text-center text-white mb-6">🛠️ Let's Get Started</h2>
                 <form onSubmit={handleCheckout} className="max-w-lg mx-auto space-y-6">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                        <input type="text" id="name" name="name" value={onboardingData.name} onChange={handleInputChange} placeholder="e.g., Jane Doe" className="w-full p-3 rounded-md bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" required />
                     </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Best Email for Updates</label>
                        <input type="email" id="email" name="email" value={onboardingData.email} onChange={handleInputChange} placeholder="you@example.com" className="w-full p-3 rounded-md bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" required />
                     </div>

                     <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id="addon"
                                name="addon"
                                type="checkbox"
                                checked={includeAddon}
                                onChange={(e) => setIncludeAddon(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-green-500 focus:ring-green-500"
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="addon" className="font-medium text-slate-200">
                                Add Review Response Management for +$10/mo
                            </label>
                            <p className="text-slate-400">We'll professionally respond to all new reviews on your GMB profile.</p>
                        </div>
                    </div>

                    <div className="text-center pt-4">
                         <button type="submit" className="w-full bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30">
                            Start My 30-Day Optimization – ${30 + (includeAddon ? 10 : 0)}/month
                        </button>
                    </div>
                 </form>
                 <div className="text-center mt-6">
                     <p className="text-xs text-slate-500">You’ll receive a short onboarding form for your GMB link after payment. Posts & photo guidance begin arriving within 48 hours.</p>
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

export default App;
