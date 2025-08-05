import React from 'react';
// Explicitly destructuring hooks from the React object to address potential build issues.
const { useState, useEffect } = React;

// --- HELPER ICONS ---
// A collection of SVG icons used throughout the application for a consistent look and feel.

const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

const BarChartIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);

// --- NEW REPORT CARD ICONS ---
const FileTextIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);
const CameraIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
);
const StarIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const CalendarIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const ShieldIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const ReportCardIcon = ({ icon, className }) => {
    const icons = {
        FileTextIcon: FileTextIcon,
        CameraIcon: CameraIcon,
        StarIcon: StarIcon,
        CalendarIcon: CalendarIcon,
        SearchIcon: SearchIcon,
        ShieldIcon: ShieldIcon,
    };
    const IconComponent = icons[icon];
    return IconComponent ? <IconComponent className={className} /> : null;
};


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
    { icon: <BarChartIcon className="h-12 w-12 mx-auto text-blue-400 mb-4" />, title: "Simple Dashboard", description: "No confusing charts or technical jargon. See exactly how many customers found you this month and what we're doing to get you more." },
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

const onboardingDeliverables = [
    { icon: "🗺️", action: "Fix Your Foundation (NAP & Citations)", description: "We'll correct all inconsistent business info across the web and build new citations, a critical step for ranking on Google Maps." },
    { icon: "✍️", action: "Content That Ranks (GMB Posts)", description: "You get 4 professionally written, keyword-optimized Google Business Posts scheduled for you. You don't have to write a thing." },
    { icon: "⭐", action: "Automate Your Reputation (Reviews)", description: "We'll set up a simple system for you to consistently get new reviews, a huge factor in customer trust and local ranking." },
    { icon: "📊", action: "Outsmart Your Competition (Reporting)", description: "Receive a simple, jargon-free report showing your progress, keyword rankings, and how you stack up against the competition." },
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

// --- NEW DETAILED AUDIT REPORT COMPONENT ---
function DetailedAuditReport({ reportData, onGetFullPlan }) {
    if (!reportData || !reportData.reportCard) {
        return <div className="text-center py-20">Analysis failed or returned invalid data. Please start over.</div>;
    }

    const getGradeColor = (grade) => {
        if (!grade) return 'text-slate-400';
        if (grade.startsWith('A')) return 'text-green-400';
        if (grade.startsWith('B')) return 'text-blue-400';
        if (grade.startsWith('C')) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Local SEO Report Card for <span className="text-blue-400">{reportData.businessName}</span></h1>
                <p className="text-2xl text-slate-300 mt-4">Overall Grade: <span className={`font-bold ${getGradeColor(reportData.overallScore)}`}>{reportData.overallScore}</span></p>
            </div>

            {/* Report Card Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {reportData.reportCard.map((metric) => (
                    <div key={metric.metric} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <ReportCardIcon icon={metric.icon} className="h-8 w-8 text-blue-400" />
                                <h3 className="text-lg font-bold text-white">{metric.metric}</h3>
                            </div>
                            <span className={`text-3xl font-bold ${getGradeColor(metric.grade)}`}>{metric.grade}</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">{metric.details}</p>
                        <div className="bg-slate-900/50 p-3 rounded-lg text-center mb-4 mt-auto">
                            <p className="text-xs text-slate-400 italic">"{metric.impactStat}"</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-200 mb-2">Action Steps:</h4>
                            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                                {metric.actionSteps.map((step, i) => <li key={i}>{step}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Plan Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12">
                <h2 className="text-3xl font-bold text-center text-white mb-6">{reportData.actionPlan.title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reportData.actionPlan.weeks.map((week) => (
                        <div key={week.week} className="bg-slate-900/50 p-4 rounded-lg">
                            <p className="text-sm font-bold text-blue-400 mb-2">Week {week.week}: {week.focus}</p>
                            <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                                {week.tasks.map((task, i) => <li key={i}>{task}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* CTA */}
            <div className="bg-gradient-to-br from-green-800 to-green-900 border-2 border-green-500 rounded-2xl p-8 text-center">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Your "A" Grade?</h3>
                <p className="text-green-300 mb-6">We'll implement this entire action plan for you, so you can focus on your business.</p>
                <button onClick={onGetFullPlan} className="bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform duration-300 transform hover:-translate-y-1">
                    🚀 Start My Growth Plan - $30/mo
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


// --- ONBOARDING PAGE COMPONENT ---
function OnboardingPage({ businessName, onStartOver }) {
    const [includeAddon, setIncludeAddon] = useState(false);
    const [onboardingData, setOnboardingData] = useState({ name: '', email: '' });
    const basePrice = 30;
    const addonPrice = 10;

    // NOTE: These are placeholder Stripe links. Replace with your actual links.
    const baseCheckoutUrl = "https://buy.stripe.com/test_28o3dIe9OaUe5W0bII";
    const addonCheckoutUrl = "https://buy.stripe.com/test_7sI6tUa1Cgco2FUfZ1";

    const checkoutUrl = includeAddon ? addonCheckoutUrl : baseCheckoutUrl;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOnboardingData(prev => ({...prev, [name]: value}));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        const submissionData = {
             name: onboardingData.name,
             email: onboardingData.email,
             plan: includeAddon ? 'Standard + Review Management' : 'Standard',
             price: `${basePrice + (includeAddon ? addonPrice : 0)}/mo`,
             businessName: businessName,
             submittedAt: new Date().toISOString(),
         };

        try {
            // This sends the lead data to a form backend before redirecting to checkout.
            await fetch('https://formspree.io/f/mnnvldep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            // We can still proceed to checkout even if the form submission fails.
        }
        
        // Redirect to Stripe checkout
        window.location.href = checkoutUrl;
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white">✅ Yes! I Want More Local Customers.</h1>
                <p className="text-xl text-slate-300 mt-4">Here's your monthly "Done-For-You" local growth engine for <span className="text-blue-400 font-bold">{businessName}</span>:</p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 mb-10">
                <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">📦 Your Monthly Local Growth Engine</h2>
                <div className="space-y-6">
                    {onboardingDeliverables.map(item => (
                        <div key={item.action} className="flex items-start gap-4">
                            <div className="text-3xl mt-1">{item.icon}</div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-100">{item.action}</h3>
                                <p className="text-slate-400">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-2xl border-2 border-green-500 shadow-2xl shadow-green-500/20">
                 <h2 className="text-2xl font-bold text-center text-white mb-6">🛠️ Activate Your Plan</h2>
                 <form onSubmit={handleCheckout} className="max-w-lg mx-auto space-y-6">
                      <div>
                           <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                           <input type="text" id="name" name="name" value={onboardingData.name} onChange={handleInputChange} placeholder="e.g., Jane Doe" className="w-full p-3 rounded-md bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input type="email" id="email" name="email" value={onboardingData.email} onChange={handleInputChange} placeholder="e.g., jane.doe@example.com" className="w-full p-3 rounded-md bg-slate-900 border border-slate-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" required />
                      </div>
                      <div className="relative flex items-start bg-slate-900/50 p-4 rounded-lg">
                           <div className="flex h-6 items-center">
                               <input id="addon" name="addon" type="checkbox" checked={includeAddon} onChange={(e) => setIncludeAddon(e.target.checked)} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-green-500 focus:ring-green-500" />
                           </div>
                           <div className="ml-3 text-sm leading-6">
                               <label htmlFor="addon" className="font-medium text-slate-200">Add "Done-For-You" Review Responses (+${addonPrice}/mo)</label>
                               <p className="text-slate-400">We'll professionally respond to every new review on your GMB — so you never miss a chance to build trust.</p>
                           </div>
                      </div>

                      <div className="text-center pt-4">
                           <p className="font-bold text-white text-lg mb-2">🔐 Start Your 30-Day Risk-Free Trial — Just ${basePrice + (includeAddon ? addonPrice : 0)}/mo</p>
                           <button type="submit" className="w-full bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30">
                                   👉 Activate My Growth Plan
                           </button>
                      </div>
                 </form>
                 <div className="text-center mt-6">
                      <p className="text-xs text-slate-500">You'll be taken to a secure checkout. After payment, we'll send a quick onboarding form to link your GMB. Your first optimizations will begin within 48 hours.</p>
                 </div>
            </div>

            <div className="text-center mt-16">
                <button onClick={onStartOver} className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold">
                    &laquo; Analyze Another Business
                </button>
            </div>
        </div>
    );
}


// --- HERO AND AUDIT FORM SECTION ---
function HeroAndAuditSection() {
    const [view, setView] = useState('form'); // 'form', 'loading', 'audit', 'report'
    const [reportData, setReportData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);

    const generateReport = async (data) => {
        setView('loading');
        setError(null);
        setFormData(data);
        
        // First, submit the lead data to a service like Formspree for tracking.
        try {
            await fetch('https://formspree.io/f/mnnvldep', {
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
        setFormData(null);
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
                    businessName={formData?.businessName} 
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
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
    const scrollToAudit = () => {
        document.getElementById('gmb-check')?.scrollIntoView({ behavior: 'smooth' });
    };

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
                    <button onClick={scrollToAudit} className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold py-3 px-10 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
                        Start with a Free Audit
                    </button>
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

