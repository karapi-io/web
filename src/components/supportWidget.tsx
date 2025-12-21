import React, { useState } from 'react';
import { MessageSquare, X, Send, Loader2, Minus, ChevronLeft, Bot } from 'lucide-react';

// --- Types & Interfaces ---

// Strict Union Types for the State Machine
type ViewState = 'menu' | 'email_form' | 'community_msg' | 'generator_msg' | 'success';
type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

interface ChatMessageProps {
    children: React.ReactNode;
    isBot?: boolean;
}

interface OptionButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const SupportWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // State Machine for the UI View
    const [view, setView] = useState<ViewState>('menu');

    // Form State
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<LoadingStatus>('idle');

    const toggleOpen = () => {
        if (isOpen) {
            // Reset view to menu shortly after closing for better UX next time
            setTimeout(() => setView('menu'), 300);
        }
        setIsOpen(!isOpen);
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // --- SIMULATED BACKEND CALL ---
        setTimeout(() => {
            console.log("Payload:", { email, message });
            setStatus('success');

            // Auto-reset logic
            setTimeout(() => {
                setEmail('');
                setMessage('');
                setStatus('idle');
                setView('menu');
                setIsOpen(false);
            }, 3000);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">

            {/* --- CHAT WINDOW --- */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">

                    {/* 1. Header */}
                    <div className="bg-blue-600 p-4 flex justify-between items-center text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm leading-tight">AI Support Assistant</h4>
                                <p className="text-[11px] text-blue-100 opacity-90">Usually replies instantly</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {view !== 'menu' && view !== 'success' && (
                                <button
                                    onClick={() => setView('menu')}
                                    className="text-white/80 hover:bg-blue-500/50 rounded p-1 transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                            )}
                            <button
                                onClick={toggleOpen}
                                className="text-white/80 hover:bg-blue-500/50 rounded p-1 transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                        </div>
                    </div>

                    {/* 2. Chat Area (Scrollable) */}
                    <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col gap-4">

                        {/* Initial Greeting */}
                        <ChatMessage isBot>
                            Hello! 👋 I'm your virtual assistant. How can I help you today?
                        </ChatMessage>

                        {/* --- VIEW: MAIN MENU --- */}
                        {view === 'menu' && (
                            <div className="flex flex-col gap-2 animate-in fade-in duration-500 delay-150">
                                <OptionButton onClick={() => setView('community_msg')}>
                                    🐛 I found a bug / Issue
                                </OptionButton>
                                <OptionButton onClick={() => setView('generator_msg')}>
                                    🚀 Try Free Invoice Generator
                                </OptionButton>
                                <OptionButton onClick={() => setView('email_form')}>
                                    📧 Contact Support
                                </OptionButton>
                            </div>
                        )}

                        {/* --- VIEW: COMMUNITY REDIRECT --- */}
                        {view === 'community_msg' && (
                            <>
                                <UserMessage>I found a bug or have an issue.</UserMessage>
                                <ChatMessage isBot>
                                    Thanks for letting us know! We track all bugs in our community space.
                                    <br /><br />
                                    Please post it there so our devs can track it faster.
                                </ChatMessage>
                                <a
                                    href="/community"
                                    className="bg-blue-600 text-white text-center py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors mx-8 shadow-md block"
                                >
                                    Go to Community Page →
                                </a>
                            </>
                        )}

                        {/* --- VIEW: GENERATOR REDIRECT --- */}
                        {view === 'generator_msg' && (
                            <>
                                <UserMessage>I want to try the Free Generator.</UserMessage>
                                <ChatMessage isBot>
                                    Awesome choice! Our invoice generator is free and instant.
                                </ChatMessage>
                                <a
                                    href="/invoice-generator"
                                    className="bg-green-600 text-white text-center py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors mx-8 shadow-md block"
                                >
                                    Open Free Generator →
                                </a>
                            </>
                        )}

                        {/* --- VIEW: EMAIL FORM --- */}
                        {view === 'email_form' && (
                            <>
                                <UserMessage>I need to contact support.</UserMessage>
                                <ChatMessage isBot>
                                    Sure! Please fill out the details below and we'll email you back.
                                </ChatMessage>

                                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-2 animate-in fade-in slide-in-from-bottom-2">
                                    <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                                        <input
                                            type="email"
                                            required
                                            placeholder="Your Email"
                                            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <textarea
                                            required
                                            rows={3}
                                            placeholder="How can we help?"
                                            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex justify-center items-center gap-2 transition-all disabled:opacity-70"
                                        >
                                            {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                            {status === 'loading' ? 'Sending...' : 'Send Email'}
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}

                        {/* --- VIEW: SUCCESS --- */}
                        {view === 'success' && (
                            <div className="mt-auto mb-auto text-center animate-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    ✓
                                </div>
                                <h3 className="font-bold text-gray-800">Message Sent!</h3>
                                <p className="text-sm text-gray-500 mt-1">We'll get back to <span className="font-medium">{email}</span> shortly.</p>
                            </div>
                        )}

                    </div>

                    {/* 3. Footer */}
                    <div className="p-3 bg-white border-t border-gray-100 text-center">
                        <span className="text-[10px] text-gray-400 font-medium">Powered by YourAI</span>
                    </div>

                </div>
            )}

            {/* --- LAUNCHER BUTTON --- */}
            <button
                onClick={toggleOpen}
                className={`w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                aria-label="Toggle Support Chat"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} fill="currentColor" />}
            </button>
        </div>
    );
};

// --- Helper Components ---

const ChatMessage: React.FC<ChatMessageProps> = ({ children, isBot }) => (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2`}>
        <div
            className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${isBot
                ? 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                : 'bg-blue-600 text-white rounded-tr-none'
                }`}
        >
            {children}
        </div>
    </div>
);

const UserMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none text-sm shadow-sm max-w-[85%]">
            {children}
        </div>
    </div>
);

const OptionButton: React.FC<OptionButtonProps> = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl text-sm text-gray-700 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
    >
        {children}
    </button>
);

export default SupportWidget;