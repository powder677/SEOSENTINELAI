import React from 'react';
// Explicitly destructuring hooks from the React object to address potential build issues.
const { useState, useEffect, useMemo } = React;

// --- HELPER ICONS ---
// A collection of SVG icons used throughout the application for a consistent look and feel.

const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <title>Check Circle Icon</title>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const XIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const BotIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);

const TargetIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

const UploadCloudIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
);


// --- STATIC DATA (Moved outside components to prevent re-creation on render) ---
const loadingSteps = [
    "Scanning Google for your Business Profile...",
    "Analyzing Name, Address, Phone (NAP) consistency...",
    "Auditing online reviews & competitor ratings...",
    "Checking local keyword rankings in your area...",
    "Assessing website authority & mobile experience...",
    "Compiling your personalized growth plan..."
];

const headerNavLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Blog', id: 'blog' },
    { name: 'FAQ', id: 'faq' },
];

const features = [
    { icon: <BotIcon className="h-12 w-12 mx-auto text-blue-400 mb-4" />, title: "AI-Powered Automation", description: "Our AI monitors your local SEO 24/7, automatically making improvements and alerting you to issues before they hurt your rankings." },
    { icon: <TargetIcon className="h-12 w-12 mx-auto text-blue-400 mb-4" />, title: "Local-First Focus", description: "Built specifically for local businesses. We optimize for 'near me' searches and local map rankings, not generic SEO metrics." }
];

const blogPosts = [
    { title: "Why Your Salon Suite Needs Its Own Google Business Profile", description: "You've invested in your own salon suite... But do you have your own Google Business Profile? If not, you're missing out on the biggest opportunity to attract new clients.", link: "#" },
    { title: "5 Google My Business Mistakes Costing Salon Suite Owners Clients", description: "After analyzing hundreds of salon suite owners' profiles, we've identified five critical mistakes that are costing stylists thousands of dollars in lost revenue.", link: "#" },
    { title: "How Salon Suite Owners Can Outrank Traditional Salons on Google", description: "Think you can't compete with established salons that have been around for decades? Think again. Salon suite owners actually have several advantages in local search.", link: "#" }
];

const faqs = [
    { q: "Why can't customers find me if I'm in a shared salon space?", a: "When you're in a shared salon space, your business address is often the same as other professionals in the building. Without proper optimization, Google may not display your listing for searches, and customers could end up calling or visiting another business instead. Our service ensures your Google Business Profile is set up to stand out, even in shared or suite-style spaces, so people can find you directly." },
    { q: "Can I get reviews for my business if I share the same address as other salon pros?", a: "Yes! Google allows multiple businesses at the same address, as long as each has its own unique name, phone number, and category. We help you set up your profile correctly so reviews go to your listing, not your neighbor's." },
    { q: "Will this help me show up for searches outside my immediate city?", a: "Yes. While Google prioritizes nearby results, our optimization strategies help expand your visibility to surrounding towns and neighborhoods where your ideal clients may live. This means you can get booked by people who are willing to travel for your services." },
];

// --- LOADING SPINNER COMPONENT ---
const LoadingState = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prevStep => {
                if (prevStep < loadingSteps.length - 1) {
                    return prevStep + 1;
                }
                clearInterval(interval);
                return prevStep;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once.

    return (
        <div className="flex flex-col items-center justify-center space-y-4 min-h-[60vh] bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <title>Loading Spinner</title>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-2xl font-bold text-white">Building Your Local Dominance Report...</h3>
            <p className="text-slate-400">This may take up to 30 seconds as we analyze real-time local data.</p>
            <div className="mt-4 w-full max-w-md text-left">
                {loadingSteps.map((step, index) => (
                    <div key={index} className={`flex items-center gap-3 p-2 transition-all duration-500 ${currentStep >= index ? 'opacity-100' : 'opacity-40'}`}>
                        {currentStep > index ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                        ) : currentStep === index ? (
                            <div className="w-5 h-5 flex-shrink-0"><div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mt-1.5 ml-1.5"></div></div>
                        ) : (
                            <div className="w-5 h-5 flex-shrink-0"><div className="w-2 h-2 bg-slate-600 rounded-full mt-1.5 ml-1.5"></div></div>
                        )}
                        <span className={`${currentStep === index ? 'text-blue-400 font-semibold' : currentStep > index ? 'text-green-400' : 'text-slate-500'}`}>{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- HEADER & NAVIGATION ---
function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold text-blue-400">SEO Sentinel</div>
                    <nav className="hidden md:flex items-center gap-6">
                        {headerNavLinks.map(link => (
                            <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-slate-300 hover:text-blue-400 transition-colors">{link.name}</button>
                        ))}
                    </nav>
                    <div className="hidden md:block">
                        <button onClick={() => scrollToSection('gmb-check')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            Get Free Audit
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
                            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <nav className="flex flex-col gap-4 items-center">
                             {headerNavLinks.map(link => (
                                 <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-slate-300 hover:text-blue-400 transition-colors py-2">{link.name}</button>
                             ))}
                            <button onClick={() => scrollToSection('gmb-check')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors mt-2">
                                Get Free Audit
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

// --- DETAILED AUDIT REPORT COMPONENT ---
function DetailedAuditReport({ reportData, onGetFullPlan }) {
    if (!reportData) return <div className="text-center py-20">Analysis failed. Please start over.</div>;

    if (!reportData.business_found) {
        return (
            <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-red-400">🚨 Houston, We Have a Problem</h1>
                    <div className="bg-red-500/20 border-2 border-red-500 rounded-2xl p-8 mt-8">
                        <h2 className="text-3xl font-bold text-white mb-4">Overall Score: {reportData.overall_score}</h2>
                        <p className="text-xl text-red-300">{reportData.overall_explanation}</p>
                    </div>
                </div>

                {/* Visibility Issues */}
                <div className="bg-slate-800/50 border border-red-500/50 rounded-2xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-red-400 mb-6">{reportData.visibility_analysis?.title || 'Visibility Analysis'}</h3>
                    <div className="space-y-4">
                        {Array.isArray(reportData.visibility_analysis?.issues) && reportData.visibility_analysis.issues.length > 0 ? (
                            reportData.visibility_analysis.issues.map((issue, idx) => (
                                <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                    <h4 className="font-bold text-red-300 text-lg">{issue.problem}</h4>
                                    <p className="text-slate-300">{issue.impact}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                                        issue.urgency === 'CRITICAL' ? 'bg-red-600 text-white' :
                                        issue.urgency === 'HIGH' ? 'bg-orange-600 text-white' : 'bg-yellow-600 text-black'
                                    }`}>
                                        {issue.urgency} PRIORITY
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400">No critical visibility issues were identified.</p>
                        )}
                    </div>
                </div>

                {/* Competitor Reality Check */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">{reportData.competitor_reality_check?.title || 'Competitor Reality Check'}</h3>
                    <p className="text-slate-300 mb-6">{reportData.competitor_reality_check?.summary}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                        {Array.isArray(reportData.competitor_reality_check?.top_competitors) && reportData.competitor_reality_check.top_competitors.length > 0 ? (
                            reportData.competitor_reality_check.top_competitors.map((comp, idx) => (
                                <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                    <h4 className="font-bold text-green-400">{comp.name}</h4>
                                    <p className="text-sm text-slate-300">⭐ {comp.rating} ({comp.reviews} reviews)</p>
                                    <p className="text-xs text-green-300 mt-2">{comp.advantage}</p>
                                </div>
                            ))
                        ) : (
                             <p className="text-slate-400 col-span-3">Could not retrieve specific competitor data, but they are likely getting the customers you're missing.</p>
                        )}
                    </div>
                </div>

                {/* Action Plan */}
                <div className="bg-slate-800/50 border border-green-500/50 rounded-2xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-green-400 mb-6">{reportData.immediate_action_plan?.title || 'Immediate Action Plan'}</h3>
                    <div className="space-y-4">
                        {Array.isArray(reportData.immediate_action_plan?.priority_actions) && reportData.immediate_action_plan.priority_actions.length > 0 ? (
                            reportData.immediate_action_plan.priority_actions.map((action, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-green-400">{action.action}</h4>
                                        <p className="text-slate-300 text-sm">{action.impact}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            {action.timeframe}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400">No specific actions were identified, but the first step is always creating a Google Business Profile.</p>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-green-800 to-green-900 border-2 border-green-500 rounded-2xl p-8 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to Stop Losing Customers?</h3>
                    <p className="text-green-300 mb-6">We'll set up your Google Business Profile and get you visible in 48 hours.</p>
                    <button onClick={onGetFullPlan} className="bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform duration-300 transform hover:-translate-y-1">
                        🚀 Get Me Visible - $30/mo
                    </button>
                    <p className="text-xs text-green-200 mt-4">30-day money-back guarantee</p>
                </div>
            </div>
        );
    }

    // Handle case where business WAS found but has issues
    const score = String(reportData.overall_score || '');
    const advantageAreas = reportData.competitor_comparison?.competitor_averages?.advantage_areas;
    
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Your Business Visibility Report</h1>
                <div className={`inline-block px-6 py-3 rounded-2xl border-2 mt-4 ${
                    score.startsWith('A') ? 'bg-green-500/20 border-green-500 text-green-400' :
                    score.startsWith('B') ? 'bg-blue-500/20 border-blue-500 text-blue-400' :
                    score.startsWith('C') ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' :
                    'bg-red-500/20 border-red-500 text-red-400'
                }`}>
                    <span className="text-3xl font-bold">Grade: {reportData.overall_score}</span>
                </div>
                <p className="text-xl text-slate-300 mt-4">{reportData.overall_explanation}</p>
            </div>

            {/* Profile Analysis */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">{reportData.profile_analysis?.title || 'Profile Analysis'}</h3>
                <div className="space-y-4">
                    {Array.isArray(reportData.profile_analysis?.issues) && reportData.profile_analysis.issues.length > 0 ? (
                        reportData.profile_analysis.issues.map((issue, idx) => (
                            <div key={idx} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-orange-400">{issue.problem}</h4>
                                <p className="text-slate-300">{issue.impact}</p>
                            </div>
                        ))
                    ) : (
                         <p className="text-slate-400">No major profile issues found. Great job!</p>
                    )}
                </div>
            </div>

            {/* Competitor Comparison - only show if we have competitor data */}
            {reportData.competitor_comparison && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-blue-400 mb-6">{reportData.competitor_comparison.title}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <h4 className="font-bold text-blue-400 mb-3">Your Current Stats</h4>
                            <ul className="text-slate-300 space-y-1">
                                <li>⭐ Rating: {reportData.competitor_comparison.your_stats?.rating}/5</li>
                                <li>📝 Reviews: {reportData.competitor_comparison.your_stats?.reviews}</li>
                                <li>📸 Photos: {reportData.competitor_comparison.your_stats?.photos}</li>
                            </ul>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <h4 className="font-bold text-green-400 mb-3">Competitor Averages</h4>
                            <ul className="text-slate-300 space-y-1">
                                <li>⭐ Rating: {reportData.competitor_comparison.competitor_averages?.rating}/5</li>
                                <li>📝 Reviews: {reportData.competitor_comparison.competitor_averages?.reviews}</li>
                                <li>🏆 They have: {Array.isArray(advantageAreas) ? advantageAreas.join(', ') : ''}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Optimization Plan */}
            <div className="bg-slate-800/50 border border-green-500/50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-green-400 mb-6">{reportData.optimization_plan?.title || 'Optimization Plan'}</h3>
                <div className="space-y-4">
                    {Array.isArray(reportData.optimization_plan?.priority_fixes) && reportData.optimization_plan.priority_fixes.length > 0 ? (
                        reportData.optimization_plan.priority_fixes.map((fix, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                    {idx + 1}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-green-400">{fix.fix}</h4>
                                    <p className="text-slate-300 text-sm">{fix.why}</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {fix.timeline}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-400">No priority fixes were identified at this time.</p>
                    )}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-green-800 to-green-900 border-2 border-green-500 rounded-2xl p-8 text-center">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Fix These Issues?</h3>
                <p className="text-green-300 mb-6">We'll optimize everything for you, so you can focus on your business.</p>
                <button onClick={onGetFullPlan} className="bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform duration-300 transform hover:-translate-y-1">
                    🔧 Fix My Visibility - $30/mo
                </button>
                <p className="text-xs text-green-200 mt-4">30-day money-back guarantee</p>
            </div>
        </div>
    );
}


// --- FORM COMPONENT ---
function LocalSeoForm({ onSubmit, error }) {
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: 'Plumber',
        streetAddress: '',
        location: '', // City, State
        biggestChallenge: 'getting_more_leads',
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
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Are You Invisible to Local Customers?</h1>
                <p className="text-xl md:text-2xl text-slate-300">Get a free, AI-powered report that reveals exactly why your competitors are outranking you on Google Maps and Search.</p>
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
                        <label htmlFor="businessName" className="block text-sm font-medium text-slate-300 mb-2">Business Name *</label>
                        <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g., Tony's Plumbing" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="businessType" className="block text-sm font-medium text-slate-300 mb-2">Type of Business *</label>
                        <select id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required>
                             <option value="Plumber">Plumber</option>
                             <option value="Electrician">Electrician</option>
                             <option value="HVAC">HVAC</option>
                             <option value="Roofer">Roofer</option>
                             <option value="Landscaper">Landscaper</option>
                             <option value="Dentist">Dentist</option>
                             <option value="Restaurant">Restaurant</option>
                             <option value="Barber Shop">Barber Shop</option>
                             <option value="Hair Salon">Hair Salon</option>
                             <option value="Auto Repair">Auto Repair</option>
                             <option value="Law Firm">Law Firm</option>
                             <option value="Gym">Gym</option>
                             <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="streetAddress" className="block text-sm font-medium text-slate-300 mb-2">Street Address *</label>
                        <input type="text" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="e.g., 123 Main St" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">City, State *</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Philadelphia, PA" className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="biggestChallenge" className="block text-sm font-medium text-slate-300 mb-2">What's your biggest marketing challenge right now? *</label>
                    <select id="biggestChallenge" name="biggestChallenge" value={formData.biggestChallenge} onChange={handleChange} className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required>
                        <option value="getting_more_leads">Getting more leads/phone calls</option>
                        <option value="getting_reviews">Getting more positive reviews</option>
                        <option value="beating_competitors">Beating my local competitors</option>
                        <option value="not_enough_time">I don't have time for marketing</option>
                        <option value="other">Something else</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30">
                    Generate My Free Report
                </button>
            </form>
        </div>
    );
}

// --- ONBOARDING PAGE COMPONENT (ENHANCED) ---

const serviceOptions = {
    'Home Services': {
        'Plumber': ['Emergency Plumbing', 'Leak Repairs', 'Drain Cleaning', 'Water Heater Service', 'Pipe Installation', 'Bathroom Remodeling', 'Kitchen Plumbing', 'Sewer Line Service'],
        'Electrician': ['Emergency Electrical', 'Wiring and Rewiring', 'Panel Upgrades', 'Lighting Installation', 'Outlet & Switch Services', 'EV Charger Installation', 'Inspections'],
        'HVAC Contractor': ['AC Repair', 'AC Installation', 'Heating Repair', 'Heating Installation', 'Maintenance', 'Ductwork'],
        'Roofer': ['Roof Repair', 'Roof Replacement', 'Inspections', 'Gutter Services', 'Emergency Tarping'],
        'Landscaper/Lawn Care': ['Lawn Mowing', 'Fertilization', 'Weed Control', 'Landscape Design', 'Tree & Shrub Care', 'Irrigation'],
        'House Cleaner': ['Standard Cleaning', 'Deep Cleaning', 'Move-in/Move-out', 'Window Cleaning', 'Carpet Cleaning'],
        'Handyman': ['General Repairs', 'Drywall', 'Fixture Installation', 'Assembly', 'Minor Plumbing/Electrical'],
        'Painter': ['Interior Painting', 'Exterior Painting', 'Cabinet Painting', 'Deck Staining'],
        'Carpenter': ['Custom Cabinets', 'Trim & Molding', 'Deck Building', 'Framing'],
        'Pool Service': ['Weekly Maintenance', 'Pool Opening/Closing', 'Equipment Repair', 'Green Pool Cleanup'],
    },
    'Health & Wellness': {
        'Dentist': ['General Checkups & Cleanings', 'Fillings', 'Crowns & Bridges', 'Root Canals', 'Extractions', 'Teeth Whitening', 'Veneers', 'Implants', 'Orthodontics', 'Emergency Dental Care'],
        'Chiropractor': ['Spinal Adjustments', 'Pain Management', 'Injury Rehab', 'Wellness Care', 'Massage Therapy'],
        'Physical Therapist': ['Post-Surgery Rehab', 'Sports Injury', 'Chronic Pain', 'Balance Therapy'],
        'Massage Therapist': ['Swedish', 'Deep Tissue', 'Sports Massage', 'Hot Stone', 'Prenatal'],
        'Optometrist': ['Eye Exams', 'Contact Lens Fittings', 'Glaucoma Testing', 'Dry Eye Treatment'],
        'Medical Practice': ['Primary Care', 'Pediatrics', 'Urgent Care', 'Annual Physicals'],
        'Veterinarian': ['Wellness Exams', 'Vaccinations', 'Dental Care', 'Surgery', 'Emergency Services'],
        'Mental Health Counselor': ['Individual Therapy', 'Couples Counseling', 'Family Therapy', 'Anxiety/Depression'],
    },
    'Automotive': {
        'Auto Repair Shop': ['Oil Changes', 'Brake Service', 'Transmission Repair', 'Engine Diagnostics', 'AC/Heating Repair', 'Tire Installation', 'Battery Replacement', 'Exhaust System', 'Electrical System', 'Inspections'],
        'Auto Detailing': ['Interior Detail', 'Exterior Detail', 'Ceramic Coating', 'Paint Correction'],
        'Tire Shop': ['New Tires', 'Tire Rotation', 'Alignment', 'Tire Repair'],
        'Oil Change': ['Conventional', 'Synthetic Blend', 'Full Synthetic', 'Fluid Checks'],
        'Body Shop': ['Collision Repair', 'Dent Removal', 'Painting', 'Frame Straightening'],
    },
    'Food & Beverage': {
        'Restaurant': ['Dine-In', 'Takeout', 'Delivery', 'Catering', 'Private Events', 'Happy Hour', 'Brunch', 'Lunch Specials', 'Dinner Menu', 'Bar Service'],
        'Coffee Shop': ['Espresso Drinks', 'Brewed Coffee', 'Pastries', 'Sandwiches'],
        'Bakery': ['Cakes', 'Cupcakes', 'Cookies', 'Bread', 'Pastries'],
        'Food Truck': ['Street Vending', 'Catering', 'Private Events'],
        'Catering': ['Weddings', 'Corporate Events', 'Private Parties'],
        'Bar/Pub': ['Craft Beer', 'Cocktails', 'Wine', 'Bar Food', 'Happy Hour'],
    },
    'Professional Services': {
        'Law Firm': ['Personal Injury', 'Family Law', 'Criminal Defense', 'Real Estate Law', 'Business Law'],
        'Accounting Firm': ['Tax Preparation', 'Bookkeeping', 'Payroll', 'Audit Services'],
        'Real Estate Agent': ['Buyer Representation', 'Seller Representation', 'Rentals', 'Consulting'],
        'Insurance Agency': ['Auto', 'Home', 'Life', 'Business Insurance'],
        'Marketing Agency': ['SEO', 'Social Media', 'Web Design', 'PPC Ads'],
        'IT Services': ['Managed IT', 'Cybersecurity', 'Cloud Services', 'Data Backup'],
        'Consulting': ['Business', 'Financial', 'Marketing', 'IT'],
    },
    'Fitness & Recreation': {
        'Gym/Fitness Center': ['Memberships', 'Personal Training', 'Group Classes', 'Yoga', 'Spin'],
        'Yoga Studio': ['Vinyasa', 'Hatha', 'Hot Yoga', 'Workshops'],
        'Martial Arts': ['Karate', 'Judo', 'Brazilian Jiu-Jitsu', 'Taekwondo'],
        'Dance Studio': ['Ballet', 'Jazz', 'Hip Hop', 'Tap'],
        'Sports Training': ['Personal Training', 'Group Training', 'Skill-Specific Coaching'],
    },
    'Beauty & Personal Care': {
        'Hair Salon': ["Women's Haircut", "Men's Haircut", "Children's Haircut", 'Hair Color (Full)', 'Highlights/Lowlights', 'Balayage', 'Ombre', 'Hair Treatments', 'Blowouts/Styling', 'Updos', 'Hair Extensions', 'Perms/Relaxers'],
        'Barber Shop': ['Haircut', 'Beard Trim', 'Hot Towel Shave', 'Fades', 'Designs'],
        'Nail Technician': ['Manicure', 'Pedicure', 'Gel/Shellac', 'Acrylics', 'Nail Art'],
        'Spa/Esthetics': ['Facials', 'Waxing', 'Massage', 'Lash Extensions', 'Brow Services', 'Body Treatments'],
        'Pet Grooming': ['Full Groom', 'Bath & Brush', 'Nail Trim', 'De-shedding'],
    },
    'Retail': {
        'Clothing Store': [],
        'Jewelry Store': [],
        'Dry Cleaner': [],
        'Florist': [],
    }
};

const FileInput = ({ label, name, multiple, maxFiles, fileList, onChange, helpText }) => {
    const fileCount = fileList ? fileList.length : 0;
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">{label} *</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <UploadCloudIcon className="mx-auto h-12 w-12 text-slate-500" />
                    <div className="flex text-sm text-slate-400">
                        <label htmlFor={name} className="relative cursor-pointer bg-slate-800 rounded-md font-medium text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 focus-within:ring-blue-500">
                            <span>Upload files</span>
                            <input id={name} name={name} type="file" className="sr-only" multiple={multiple} onChange={onChange} accept="image/*,application/pdf" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">{helpText}</p>
                </div>
            </div>
             {fileCount > 0 && (
                <p className="mt-2 text-sm text-green-400">{fileCount} / {maxFiles} file(s) selected.</p>
            )}
        </div>
    );
};

const TimePicker = ({ value, onChange }) => {
    const times = useMemo(() => {
        const options = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hour = i.toString().padStart(2, '0');
                const minute = j.toString().padStart(2, '0');
                options.push(`${hour}:${minute}`);
            }
        }
        return options;
    }, []);

    return (
        <select value={value} onChange={onChange} className="w-full p-2 rounded-md bg-slate-700 border border-slate-600 text-sm">
            <option value="">--:--</option>
            {times.map(time => <option key={time} value={time}>{time}</option>)}
        </select>
    );
};

const BusinessHours = ({ hours, setHours }) => {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    const handleTimeChange = (day, type, value) => {
        setHours(prev => ({
            ...prev,
            [day]: { ...prev[day], [type]: value, closed: false }
        }));
    };
    
    const toggleClosed = (day) => {
        setHours(prev => ({
            ...prev,
            [day]: { ...prev[day], closed: !prev[day].closed }
        }));
    };

    const copyToAll = (dayToCopy) => {
        const sourceHours = hours[dayToCopy];
        const newHours = { ...hours };
        days.forEach(day => {
            newHours[day] = { ...sourceHours };
        });
        setHours(newHours);
    };

    return (
        <div className="space-y-3">
            {days.map(day => (
                <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                    <span className="font-semibold capitalize text-slate-300">{day}</span>
                    <div className="flex items-center gap-2">
                        <TimePicker value={hours[day].open} onChange={(e) => handleTimeChange(day, 'open', e.target.value)} />
                        <span>to</span>
                        <TimePicker value={hours[day].close} onChange={(e) => handleTimeChange(day, 'close', e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                         <input type="checkbox" checked={hours[day].closed} onChange={() => toggleClosed(day)} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-blue-600"/>
                         <label className="text-sm">Closed</label>
                    </div>
                    <button type="button" onClick={() => copyToAll(day)} className="text-xs text-blue-400 hover:underline text-left md:text-right">Copy to all</button>
                </div>
            ))}
        </div>
    );
};


function OnboardingPage({ initialData, onStartOver }) {
    const [page, setPage] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1
        businessName: initialData?.businessName || '',
        ownerName: '',
        email: '',
        phone: '',
        streetAddress: initialData?.streetAddress || '',
        location: initialData?.location || '', // city, state
        // Step 2
        businessType: 'Home Services.Plumber',
        services: [],
        customServices: '',
        // Step 3
        yearsInBusiness: '',
        numEmployees: '',
        serviceRadius: '',
        businessHours: {
            mon: { open: '09:00', close: '17:00', closed: false },
            tue: { open: '09:00', close: '17:00', closed: false },
            wed: { open: '09:00', close: '17:00', closed: false },
            thu: { open: '09:00', close: '17:00', closed: false },
            fri: { open: '09:00', close: '17:00', closed: false },
            sat: { open: '', close: '', closed: true },
            sun: { open: '', close: '', closed: true },
        },
        appointmentOnly: false,
        emergencyServices: false,
        // Step 4
        hasGoogleProfile: '',
        websiteUrl: '',
        socialMedia: [],
        currentAdvertising: [],
        // Step 5
        primaryGoal: '',
        marketingBudget: '',
        targetAge: [],
        competitors: '',
        differentiators: '',
        biggestChallenge: initialData?.biggestChallenge || '',
        // Step 6
        logo: null,
        interiorPhotos: [],
        exteriorPhotos: [],
        workSamples: [],
        teamPhotos: [],
        menuUpload: null,
        bookingLink: '',
        promotions: '',
        // Step 7
        manageMessages: false,
        confirmInfo: false,
        authorize: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            const arrayFields = ['socialMedia', 'currentAdvertising', 'services', 'targetAge'];
            if (arrayFields.includes(name)) {
                 setFormData(prev => ({
                    ...prev,
                    [name]: checked ? [...prev[name], value] : prev[name].filter(item => item !== value)
                }));
            } else {
                 setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const maxFiles = {
            logo: 1,
            interiorPhotos: 5,
            exteriorPhotos: 3,
            workSamples: 8,
            teamPhotos: 5,
            menuUpload: 1,
        }[name];

        if (files.length > maxFiles) {
            alert(`You can only upload a maximum of ${maxFiles} file(s).`);
            e.target.value = ''; // Clear the input
            return;
        }

        setFormData(prev => ({ ...prev, [name]: files }));
    };
    
    const setBusinessHours = (hours) => {
        setFormData(prev => ({...prev, businessHours: hours}));
    };

    const nextPage = () => setPage(p => p + 1);
    const prevPage = () => setPage(p => p - 1);

const handleSubmit = async (e) => {
        e.preventDefault();
        if (page !== 7) return; // Only submit on the last page
        setIsSubmitting(true);
        
        const dataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof FileList) {
                for (let i = 0; i < value.length; i++) {
                    dataToSend.append(`${key}_${i}`, value[i]);
                }
            } else if (Array.isArray(value)) {
                dataToSend.append(key, value.join(', '));
            } else if (typeof value === 'object' && value !== null) {
                dataToSend.append(key, JSON.stringify(value));
            } else {
                dataToSend.append(key, value);
            }
        });

        try {
            // Submit form data to a backend service (optional - for lead tracking)
            const response = await fetch('/api/submit-onboarding', {
                method: 'POST',
                body: dataToSend,
            });

            if (response.ok) {
                // Redirect to appropriate Stripe payment link
                const stripeLink = formData.manageMessages 
                    ? 'https://buy.stripe.com/7sY6oG5S5b2g8K36ixbbG0h' 
                    : 'https://buy.stripe.com/28EcN43JX5HW1hBgXbbbG0i';
                
                window.location.href = stripeLink;
            } else {
                throw new Error("Form submission failed");
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
            setIsSubmitting(false);
        }
    }; // <- This closing brace was missing!
    
    const getCurrentServices = () => {
    
    const getCurrentServices = () => {
        const [category, type] = formData.businessType.split('.');
        if (category && type && serviceOptions[category] && serviceOptions[category][type]) {
            return serviceOptions[category][type];
        }
        return [];
    };
    
    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto text-left py-12 animate-fade-in bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">☑️ You have confirmed that the above information is accurate.</h2>
                <h2 className="text-2xl font-bold text-white mb-6">☑️ You have authorized SEO Sentinel to request management access to your Google Business Profile.</h2>
                
                <h3 className="text-xl font-semibold text-blue-400 mb-3">📬 What’s Next?</h3>
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                    <li>Keep an eye on your inbox – Google will send you a request to approve our access.</li>
                    <li>We’ll begin setup within 24 hours and send your weekly post preview, review prompt, and optimization plan.</li>
                    <li>You’ll also receive a QR code to make it easy to collect customer reviews.</li>
                </ul>
                <p className="text-slate-400 mt-6">If you need to update your info or have any questions, reply to this email or contact us at <a href="mailto:JasonPulzar@SeosentinelAI.com" className="text-blue-400 hover:underline">JasonPulzar@SeosentinelAI.com</a></p>
                
                <button onClick={onStartOver} className="mt-8 text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold">
                    &laquo; Back to Home
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium text-slate-400">
                        <span>Step {page} of 7</span>
                        <span>Onboarding</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5 mt-2">
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(page / 7) * 100}%` }}></div>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                    {page === 1 && (
                        <div className="space-y-4 animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-4">Basic Business Info</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Business Name *</label><input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="Your Company LLC" required /></div>
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Owner Name *</label><input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="Jane Doe" required /></div>
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="you@example.com" required /></div>
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Phone *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="(555) 123-4567" required /></div>
                            </div>
                            <div><label className="block text-sm font-medium text-slate-300 mb-1">Street Address *</label><input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="123 Main St" required /></div>
                            <div><label className="block text-sm font-medium text-slate-300 mb-1">City, State *</label><input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="Anytown, USA" required /></div>
                        </div>
                    )}

                    {page === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-4">Business Type & Services</h2>
                            <div>
                                <label htmlFor="businessType" className="block text-sm font-medium text-slate-300 mb-1">Business Type *</label>
                                <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600">
                                    {Object.entries(serviceOptions).map(([category, types]) => (
                                        <optgroup label={category} key={category}>
                                            {Object.keys(types).map(type => (
                                                <option key={`${category}.${type}`} value={`${category}.${type}`}>{type}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>
                            {getCurrentServices().length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Services Offered (select all that apply)</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 border border-slate-700 rounded-md">
                                        {getCurrentServices().map(service => (
                                            <div key={service} className="flex items-center">
                                                <input type="checkbox" id={service} name="services" value={service} checked={formData.services.includes(service)} onChange={handleChange} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-blue-600" />
                                                <label htmlFor={service} className="ml-2 text-slate-300 text-sm">{service}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                             <div>
                                <label htmlFor="customServices" className="block text-sm font-medium text-slate-300 mb-1">Custom Services</label>
                                <textarea name="customServices" value={formData.customServices} onChange={handleChange} rows="3" className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="List any services not mentioned above, separated by commas."></textarea>
                            </div>
                        </div>
                    )}

                    {page === 3 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-4">Business Operations</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Years in Business *</label><select name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" required><option value="">Select...</option><option>Under 1 year</option><option>1-2 years</option><option>3-5 years</option><option>6-10 years</option><option>10+ years</option></select></div>
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Number of Employees *</label><select name="numEmployees" value={formData.numEmployees} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" required><option value="">Select...</option><option>Just me</option><option>2-5</option><option>6-10</option><option>11-20</option><option>21+</option></select></div>
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Service Area Radius *</label><select name="serviceRadius" value={formData.serviceRadius} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" required><option value="">Select...</option><option>Within 5 miles</option><option>10 miles</option><option>25 miles</option><option>50 miles</option><option>Statewide</option></select></div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Business Hours *</label>
                                <BusinessHours hours={formData.businessHours} setHours={setBusinessHours} />
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2"><input type="checkbox" name="appointmentOnly" checked={formData.appointmentOnly} onChange={handleChange} className="h-4 w-4 rounded" /><label className="text-sm">Appointment Only?</label></div>
                                <div className="flex items-center gap-2"><input type="checkbox" name="emergencyServices" checked={formData.emergencyServices} onChange={handleChange} className="h-4 w-4 rounded" /><label className="text-sm">Emergency Services?</label></div>
                            </div>
                        </div>
                    )}
                    
                    {page === 4 && (
                        <div className="space-y-6 animate-fade-in">
                             <h2 className="text-2xl font-bold text-white mb-4">Current Online Presence</h2>
                             <div><label className="block text-sm font-medium text-slate-300 mb-1">Do you have a Google Business Profile? *</label><select name="hasGoogleProfile" value={formData.hasGoogleProfile} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" required><option value="">Select...</option><option>Yes</option><option>No</option><option>Not Sure</option></select></div>
                             <div><label className="block text-sm font-medium text-slate-300 mb-1">Website URL (optional)</label><input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="https://yourwebsite.com" /></div>
                             <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Social Media Accounts</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'].map(social => <div key={social}><input type="checkbox" name="socialMedia" value={social} onChange={handleChange} checked={formData.socialMedia.includes(social)} /> <label className="ml-2">{social}</label></div>)}
                                </div>
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Current Advertising</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {['Google Ads', 'Facebook Ads', 'Yellow Pages', 'Local newspapers', 'None'].map(ad => <div key={ad}><input type="checkbox" name="currentAdvertising" value={ad} onChange={handleChange} checked={formData.currentAdvertising.includes(ad)} /> <label className="ml-2">{ad}</label></div>)}
                                </div>
                             </div>
                        </div>
                    )}
                    
                    {page === 5 && (
                         <div className="space-y-6 animate-fade-in">
                             <h2 className="text-2xl font-bold text-white mb-4">Goals & Competition</h2>
                             <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Primary Business Goal *</label><select name="primaryGoal" value={formData.primaryGoal} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" required><option value="">Select...</option><option>More customers</option><option>Higher prices</option><option>Better reviews</option><option>Brand awareness</option><option>Expand location</option></select></div>
                                <div><label className="block text-sm font-medium text-slate-300 mb-1">Monthly Marketing Budget *</label><select name="marketingBudget" value={formData.marketingBudget} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" required><option value="">Select...</option><option>Under $100</option><option>$100-$300</option><option>$300-$500</option><option>$500-$1000</option><option>$1000+</option></select></div>
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Target Customer Age *</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {['18-25', '26-35', '36-45', '46-55', '55+', 'All ages'].map(age => (
                                        <div key={age} className="flex items-center">
                                            <input type="checkbox" id={`age-${age}`} name="targetAge" value={age} checked={formData.targetAge.includes(age)} onChange={handleChange} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-blue-600" />
                                            <label htmlFor={`age-${age}`} className="ml-2 text-sm">{age}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div><label className="block text-sm font-medium text-slate-300 mb-1">Main Competitors</label><input type="text" name="competitors" value={formData.competitors} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="e.g., Competitor A, Competitor B" /></div>
                             <div><label className="block text-sm font-medium text-slate-300 mb-1">What makes you different?</label><textarea name="differentiators" value={formData.differentiators} onChange={handleChange} rows="3" className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" maxLength="300"></textarea></div>
                             <div><label className="block text-sm font-medium text-slate-300 mb-1">Biggest Marketing Challenge *</label><select name="biggestChallenge" value={formData.biggestChallenge} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" required><option value="">Select...</option><option>Getting more leads</option><option>Getting reviews</option><option>Beating competitors</option><option>Not enough time</option><option>Managing reviews</option><option>Competing on price</option><option>Standing out</option></select></div>
                         </div>
                    )}
                    
                    {page === 6 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-4">Media & Branding</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FileInput label="Business Logo" name="logo" maxFiles={1} fileList={formData.logo} onChange={handleFileChange} helpText="PNG, JPG, GIF up to 5MB" />
                                <FileInput label="Menu/Price List" name="menuUpload" maxFiles={1} fileList={formData.menuUpload} onChange={handleFileChange} helpText="PDF or Image file" />
                                <FileInput label="Interior Photos" name="interiorPhotos" multiple maxFiles={5} fileList={formData.interiorPhotos} onChange={handleFileChange} helpText="Up to 5 images" />
                                <FileInput label="Exterior/Storefront Photos" name="exteriorPhotos" multiple maxFiles={3} fileList={formData.exteriorPhotos} onChange={handleFileChange} helpText="Up to 3 images" />
                                <FileInput label="Work Samples/Portfolio" name="workSamples" multiple maxFiles={8} fileList={formData.workSamples} onChange={handleFileChange} helpText="Up to 8 images" />
                                <FileInput label="Team Photos" name="teamPhotos" multiple maxFiles={5} fileList={formData.teamPhotos} onChange={handleFileChange} helpText="Up to 5 images" />
                            </div>
                            <div><label className="block text-sm font-medium text-slate-300 mb-1">Booking Link URL</label><input type="url" name="bookingLink" value={formData.bookingLink} onChange={handleChange} className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="https://yourbookingsite.com" /></div>
                            <div><label className="block text-sm font-medium text-slate-300 mb-1">Special Promotions</label><textarea name="promotions" value={formData.promotions} onChange={handleChange} rows="3" className="w-full p-2 rounded-md bg-slate-800 border border-slate-600" placeholder="e.g., 10% off for new clients"></textarea></div>
                        </div>
                    )}

                    {page === 7 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-2xl font-bold text-white">Review & Authorization</h2>
                            <div className="text-slate-300 text-sm space-y-4 bg-slate-900/50 p-4 rounded-md">
                                <div><h3 className="font-bold text-blue-400">Business Information</h3><p>{formData.businessName}, {formData.ownerName}, {formData.email}, {formData.phone}, {formData.streetAddress}, {formData.location}</p></div>
                                <div><h3 className="font-bold text-blue-400">Services & Operations</h3><p>Type: {formData.businessType.split('.')[1]}. Services: {formData.services.join(', ') || 'N/A'}. Custom: {formData.customServices || 'N/A'}</p></div>
                                <div><h3 className="font-bold text-blue-400">Online Presence</h3><p>Website: {formData.websiteUrl || 'N/A'}. Social: {formData.socialMedia.join(', ') || 'N/A'}</p></div>
                                <div><h3 className="font-bold text-blue-400">Goals & Marketing</h3><p>Goal: {formData.primaryGoal}. Budget: {formData.marketingBudget}. Challenge: {formData.biggestChallenge}</p></div>
                                <div><h3 className="font-bold text-blue-400">Media Assets</h3><p>Logo: {formData.logo ? 'Uploaded' : 'No'}. Photos: {(formData.interiorPhotos?.length || 0) + (formData.exteriorPhotos?.length || 0) + (formData.workSamples?.length || 0) + (formData.teamPhotos?.length || 0)} files. Menu: {formData.menuUpload ? 'Uploaded' : 'No'}</p></div>
                            </div>
                            <div className="flex items-start p-4 bg-slate-900/50 rounded-md">
                                <input type="checkbox" id="manageMessages" name="manageMessages" checked={formData.manageMessages} onChange={handleChange} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-blue-600 focus:ring-blue-500 mt-1 flex-shrink-0" />
                                <label htmlFor="manageMessages" className="ml-3">
                                    <span className="font-bold text-white">Add Message Management - $10/mo</span>
                                    <span className="block text-sm text-slate-400">Let our AI handle responding to your Google Business messages to capture leads faster.</span>
                                </label>
                            </div>
                            <div className="flex items-start"><input type="checkbox" id="confirmInfo" name="confirmInfo" checked={formData.confirmInfo} onChange={handleChange} className="h-4 w-4 mt-1" required /><label htmlFor="confirmInfo" className="ml-2">I confirm the above information is correct.</label></div>
                            <div className="flex items-start"><input type="checkbox" id="authorize" name="authorize" checked={formData.authorize} onChange={handleChange} className="h-4 w-4 mt-1" required /><label htmlFor="authorize" className="ml-2">I authorize SEO Sentinel to request management access to my Google Business Profile.</label></div>
                        </div>
                    )}

                    <div className="flex justify-between mt-8">
                        {page > 1 && <button type="button" onClick={prevPage} className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg">Back</button>}
                        {page < 7 && <button type="button" onClick={nextPage} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg ml-auto">Next</button>}
                        {page === 7 && (
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg ml-auto disabled:bg-green-800 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : `Proceed to Payment ($${formData.manageMessages ? 40 : 30}/mo)`}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}


// --- HERO AND AUDIT FORM SECTION ---
function HeroAndAuditSection() {
    const [view, setView] = useState('form'); // 'form', 'loading', 'audit', 'report'
    const [reportData, setReportData] = useState(null);
    const [initialFormData, setInitialFormData] = useState(null);
    const [error, setError] = useState(null);

    const generateReport = async (data) => {
        setView('loading');
        setError(null);
        setInitialFormData(data);
        
        // First, submit the lead data to a service like Formspree for tracking.
        try {
            await fetch('https://formspree.io/f/xrblozqr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formName: "Free SEO Audit Lead",
                    ...data
                }),
            });
        } catch (formspreeError) {
            console.error("Could not submit lead to Formspree:", formspreeError);
            // This is a non-critical error, so we can continue even if it fails.
        }

        // Now, call the Vercel serverless function to generate the report.
        try {
            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // Try to get a meaningful error message from the Vercel function's response.
                const errorResult = await response.json().catch(() => ({ error: 'Failed to parse error response from server.' }));
                throw new Error(errorResult.error || `The server responded with a status of ${response.status}.`);
            }

            const result = await response.json();
            
            setReportData(result);
            setView('audit');

        } catch (err) {
            console.error("Failed to generate report:", err);
            setError(err.message || "An unknown error occurred while generating the report. Please try again.");
            setView('form');
        }
    };

    const handleGetFullPlan = () => setView('report');
    const handleStartOver = () => {
        setView('form');
        setReportData(null);
        setInitialFormData(null);
        setError(null);
    };

    const renderView = () => {
        switch (view) {
            case 'loading':
                return <LoadingState />;
            case 'audit':
                return <DetailedAuditReport reportData={reportData} onGetFullPlan={handleGetFullPlan} />;
            case 'report':
                return <OnboardingPage 
                    initialData={initialFormData} 
                    onStartOver={handleStartOver} 
                />;
            case 'form':
            default:
                return <LocalSeoForm onSubmit={generateReport} error={error} />;
        }
    };

    return (
        <section id="gmb-check" className="py-16 md:py-24">
             <div className="container mx-auto px-4">
                 {renderView()}
            </div>
        </section>
    );
}


// --- STATIC CONTENT SECTIONS ---

function FeaturesSection() {
    return (
        <section id="features" className="py-16 md:py-24 bg-slate-900/70">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Why Choose SEO Sentinel?</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center">
                            {feature.icon}
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PricingSection() {
    return (
        <section id="pricing" className="py-16 md:py-24 bg-slate-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Simple, Affordable Pricing</h2>
                <div className="max-w-md mx-auto bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-2xl shadow-blue-500/10">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white">Standard Plan</h3>
                        <p className="text-5xl font-bold text-blue-400 my-4">$30<span className="text-xl text-slate-400">/mo</span></p>
                        <p className="text-slate-400">Cancel anytime. No hidden fees.</p>
                    </div>
                    <ul className="space-y-3 my-8 text-slate-300">
                        <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-400" /> Automated GMB optimization</li>
                        <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-400" /> Local keyword monitoring</li>
                        <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-400" /> Review management alerts</li>
                        <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-400" /> Monthly progress reports</li>
                        <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-400" /> Priority customer support</li>
                        <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-400" /> No contracts or setup fees</li>
                    </ul>
                     <div className="text-center">
                        <a href="https://buy.stripe.com/28EcN43JX5HW1hBgXbbbG0i" className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">Get Started</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function BlogSection() {
    return (
        <section id="blog" className="py-16 md:py-24 bg-slate-900/70">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Latest Local SEO Tips for Salon Suite Owners</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {blogPosts.map((post, index) => (
                        <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 group transition-all duration-300 hover:border-blue-500 hover:-translate-y-1">
                            <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                            <p className="text-slate-400 mb-4 text-sm">{post.description}</p>
                            <a href={post.link} className="font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">Read More &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    return (
        <section id="faq" className="py-16 md:py-24 bg-slate-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 cursor-pointer group">
                            <summary className="font-semibold text-lg text-white flex justify-between items-center list-none">
                                {faq.q}
                                <span className="text-blue-400 transform transition-transform duration-300 group-open:rotate-45">+</span>
                            </summary>
                            <p className="text-slate-400 mt-4">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-slate-400 mb-8">
                    <div>
                        <h3 className="font-bold text-white mb-3">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={() => scrollToSection('features')} className="hover:text-white">Features</button></li>
                            <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white">Pricing</button></li>
                            <li><button onClick={() => scrollToSection('gmb-check')} className="hover:text-white">Free Audit</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={() => scrollToSection('blog')} className="hover:text-white">Blog</button></li>
                            <li><button onClick={() => scrollToSection('faq')} className="hover:text-white">FAQ</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-3">Connect</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="mailto:support@seosentinelai.com" className="hover:text-white">Email Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-slate-500 text-sm pt-8 border-t border-slate-800">
                    <p>&copy; {new Date().getFullYear()} SEO Sentinel. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

// --- MAIN APP COMPONENT ---
function App() {
    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans">
            <Header />
            <main>
                <HeroAndAuditSection />
                <FeaturesSection />
                <PricingSection />
                <BlogSection />
                <FAQSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
