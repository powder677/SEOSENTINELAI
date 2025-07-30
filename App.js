import React, { useState } from 'react';

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

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
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
    const [view, setView] = useState('form'); 
    // Stores the generated report data from the AI
    const [reportData, setReportData] = useState(null);
    // Stores the business name to personalize the report header
    const [businessName, setBusinessName] = useState('');
    // Stores any potential error messages
    const [error, setError] = useState(null);

    // --- REAL API CALL TO OUR BACKEND ---
    const generateReport = async (formData) => {
        setView('loading');
        setError(null); // Clear previous errors
        setBusinessName(formData.businessName);

        try {
            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // If the server responds with an error, capture it
                const errorData = await response.json();
                throw new Error(errorData.error || 'An unknown error occurred.');
            }

            const report = await response.json();
            setReportData(report);
            setView('report');

        } catch (err) {
            console.error("Failed to generate report:", err);
            setError(err.message);
            setView('form'); // Go back to the form to allow the user to try again
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
    const [formData, setFormData] = useState({
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

// --- Report Page Component ---
function ReportPage({ reportData, businessName, onStartOver }) {
    if (!reportData) return <p>No report data available.</p>;

    const { overall_score, overall_explanation, gmb_optimization, local_keyword_strategy, content_plan } = reportData;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Your FREE Custom Local SEO Action Plan for:</h1>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mt-2">{businessName}</h2>
            </div>

            {/* Executive Summary */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 mb-12 text-center">
                <p className="text-slate-400 text-lg">Your Current Online Visibility Score</p>
                <p className="text-7xl font-black text-blue-400 my-2">{overall_score}</p>
                <p className="text-slate-300 max-w-2xl mx-auto">{overall_explanation}</p>
                <p className="mt-4 font-semibold text-green-400 bg-green-500/10 px-4 py-2 rounded-md inline-block">This report contains your custom 3-step plan to attract more local customers. Below are the exact steps you can take.</p>
            </div>

            {/* Main Report Sections */}
            <div className="space-y-12">
                <ReportSection icon={<CheckCircleIcon className="h-8 w-8 text-blue-400" />} title={gmb_optimization.title}>
                    <ul className="space-y-4">
                        {gmb_optimization.recommendations.map((item, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-100">{item.point}</h4>
                                    <p className="text-slate-400">{item.action}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ReportSection>

                <ReportSection icon={<TargetIcon className="h-8 w-8 text-blue-400" />} title={local_keyword_strategy.title}>
                    <div className="grid md:grid-cols-1 gap-4">
                         {local_keyword_strategy.keywords.map((item, index) => (
                             <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                 <h4 className="font-bold text-blue-400">{item.keyword}</h4>
                                 <p className="text-slate-400 text-sm">{item.reason}</p>
                             </div>
                         ))}
                    </div>
                </ReportSection>

                <ReportSection icon={<FileTextIcon className="h-8 w-8 text-blue-400" />} title={content_plan.title}>
                     <div className="space-y-6">
                         {content_plan.posts.map((item, index) => (
                             <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 relative">
                                <span className="absolute -top-3 -left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">Week {item.week}</span>
                                 <h4 className="font-bold text-slate-100 mt-2">{item.topic}</h4>
                                 <p className="text-slate-400 italic">"{item.details}"</p>
                             </div>
                         ))}
                    </div>
                </ReportSection>
            </div>

            {/* --- UPDATED Single Plan Section --- */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Put Your Growth on Autopilot?</h2>
                <p className="text-slate-300 mt-4 max-w-3xl mx-auto">Don't have time to implement this plan yourself? Let SEO Sentinel AI handle everything. We'll optimize your profile, create and publish your posts, and track your performance every single month.</p>

                <div className="mt-10 flex justify-center">
                    <div className="bg-slate-800 p-8 rounded-2xl border-2 border-green-500 relative max-w-md w-full flex flex-col">
                        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-green-500 text-white font-bold text-sm px-4 py-1 rounded-full">MOST POPULAR</div>
                        <div className="flex-grow">
                            <h3 className="text-2xl font-bold text-white">Growth Plan</h3>
                            <p className="text-5xl font-black text-white my-4">$47<span className="text-lg font-medium text-slate-400">/month</span></p>
                            <ul className="space-y-3 text-left my-8">
                                <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" /><span>Full GMB Profile Optimization</span></li>
                                <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" /><span>4 AI-Crafted GMB Posts per Month</span></li>
                                <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" /><span>Keyword Performance Tracking</span></li>
                                <li className="flex items-center gap-3"><CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" /><span>Monthly Performance Report</span></li>
                            </ul>
                        </div>
                         <a href="https://buy.stripe.com/3cI9AS0xL6M07FZ36lbbG0g" target="_blank" rel="noopener noreferrer" className="mt-auto inline-block w-full bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 transform hover:-translate-y-1">
                            Activate Growth Plan
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="text-center mt-12">
                <button onClick={onStartOver} className="text-slate-400 hover:text-white hover:underline transition">
                    Or, start a new analysis
                </button>
            </div>
        </div>
    );
}

// Helper component to create consistent section styling in the report
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


export default App;
