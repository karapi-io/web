import React, { useState } from 'react';
import { Terminal, Hammer, ArrowLeft, Bell, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';

const ApiDocs: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [notified, setNotified] = useState<boolean>(false);

    const handleNotify = (e: React.FormEvent) => {
        e.preventDefault();
        // Product Owner Logic: Later, push this email to your Mailchimp/Database
        console.log("Newsletter Signup:", email);
        setNotified(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">

            {/* 2. Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-12">

                {/* Main Card */}
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden text-center transition-all">

                    {/* Header / Graphic Area */}
                    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 p-12 flex flex-col items-center justify-center text-white relative overflow-hidden">

                        {/* Background Pattern Effect */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute right-[-20px] top-[-20px] transform rotate-12">
                                <Terminal size={160} />
                            </div>
                            <div className="absolute left-[-20px] bottom-[-20px] transform -rotate-12">
                                <Code2 size={160} />
                            </div>
                        </div>

                        <div className="relative z-10 bg-white/10 p-5 rounded-2xl backdrop-blur-md mb-6 animate-pulse border border-white/20">
                            <Hammer size={40} className="text-blue-300" />
                        </div>

                        <h1 className="relative z-10 text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                            API Documentation
                        </h1>
                        <p className="relative z-10 text-blue-200 font-medium tracking-wide uppercase text-xs">
                            Developer Hub & Reference
                        </p>
                    </div>

                    {/* Content Body */}
                    <div className="p-8 md:p-14">
                        <div className="max-w-md mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Future-proofing your workflow.
                            </h2>
                            <p className="text-gray-600 mb-10 leading-relaxed">
                                We are engineering a robust <strong>REST API</strong> that allows you to generate professional PDFs programmatically. Documentation is currently in progress.
                            </p>

                            {/* Notification Form (Lead Capture) */}
                            {!notified ? (
                                <form onSubmit={handleNotify} className="flex flex-col gap-3 mb-10">
                                    <div className="group relative">
                                        <input
                                            type="email"
                                            required
                                            placeholder="developer@example.com"
                                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 group-hover:bg-white"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                                    >
                                        <Bell size={18} />
                                        Get Early Access
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-emerald-50 text-emerald-700 px-6 py-5 rounded-2xl mb-10 border border-emerald-100 flex flex-col items-center gap-2 animate-in zoom-in duration-300">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">✓</div>
                                    <p className="font-medium">You're on the list! We'll notify you soon.</p>
                                </div>
                            )}

                            {/* "Go Back" Action */}
                            <div className="border-t border-gray-100 pt-8">
                                <Link
                                    to="/"
                                    className="inline-flex items-center text-gray-400 hover:text-blue-600 font-medium transition-colors group"
                                >
                                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Return to Homepage
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="mt-10 text-gray-400 text-sm font-medium">
                    Technical Preview Expected: <span className="text-gray-600 underline decoration-blue-500/30">Q1 2026</span>
                </p>
            </main>

            {/* 3. Global Footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default ApiDocs;