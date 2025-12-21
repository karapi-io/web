import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import {
    Search, Filter, MessageSquare, CheckCircle2, Clock,
    ChevronRight, X, Send, User, Bot, Plus, Tag
} from 'lucide-react';

// ==========================================
// 1. MOCK DATABASE (Your "Public Threads")
// ==========================================
// As you solve issues via email, add them here to show off your support!
const THREADS = [
    {
        id: 1,
        title: "How do I change the currency symbol to USD ($)?",
        author: "Alex_Dev",
        date: "2 hours ago",
        status: "closed", // open, closed
        type: "question", // bug, feature, question
        replies: 2,
        messages: [
            { sender: "user", text: "Hi! Great tool. My client is in the US. How do I change the currency from ₹ to $?" },
            { sender: "dev", text: "Hey Alex! Currently, it defaults to ₹ based on the browser locale, but we are adding a multi-currency dropdown in the next update (v1.2) next week!" },
            { sender: "user", text: "Awesome, looking forward to it. Thanks!" }
        ]
    },
    {
        id: 2,
        title: "Logo looks blurry on the PDF",
        author: "SarahDesign",
        date: "1 day ago",
        status: "closed",
        type: "bug",
        replies: 3,
        messages: [
            { sender: "user", text: "I uploaded a high-res PNG but it looks pixelated in the final PDF." },
            { sender: "dev", text: "Thanks for reporting, Sarah. This was an issue with the HTML2Canvas scale factor. We just pushed a fix!" },
            { sender: "dev", text: "Try generating it again now. It renders at 3x resolution." },
            { sender: "user", text: "Perfect! Crystal clear now. 🚀" }
        ]
    },
    {
        id: 3,
        title: "Feature Request: Save invoices to cloud",
        author: "Rahul123",
        date: "3 days ago",
        status: "open",
        type: "feature",
        replies: 1,
        messages: [
            { sender: "user", text: "It's annoying to re-type details. Can we have a login to save data?" },
            { sender: "dev", text: "Hi Rahul! We are strictly 'No-Login' for privacy right now. However, we just added 'Auto-Save' to local storage, so your browser remembers your last invoice automatically!" }
        ]
    },
    {
        id: 4,
        title: "Is this really free for commercial use?",
        author: "StartUpGuy",
        date: "1 week ago",
        status: "closed",
        type: "question",
        replies: 1,
        messages: [
            { sender: "user", text: "Can I use these invoices for my actual pvt ltd company?" },
            { sender: "dev", text: "Absolutely. The templates are standard GST compliant formats. You are free to use them commercially." }
        ]
    }
];

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${status === 'closed'
        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
        : 'bg-blue-100 text-blue-700 border border-blue-200'
        }`}>
        {status === 'closed' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
        {status}
    </span>
);

const TypeBadge = ({ type }: { type: string }) => {
    const colors = {
        bug: 'bg-red-50 text-red-600 border-red-100',
        feature: 'bg-purple-50 text-purple-600 border-purple-100',
        question: 'bg-amber-50 text-amber-600 border-amber-100'
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${colors[type as keyof typeof colors]}`}>
            {type}
        </span>
    );
};

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('all'); // all, open, closed
    const [selectedThread, setSelectedThread] = useState<any>(null);
    const [isAsking, setIsAsking] = useState(false);

    // --- FILTER LOGIC ---
    const filteredThreads = THREADS.filter(t => activeTab === 'all' || t.status === activeTab);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">

            {/* --- HERO --- */}
            <div className="bg-[#0F172A] text-white py-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Community Support</h1>
                    <p className="text-slate-400">Search existing solutions or start a new discussion.</p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-xl mx-auto relative group">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <input
                            type="text"
                            placeholder="Search bugs, features, questions..."
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all relative z-10"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={18} />
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 pb-20">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                    {/* --- LEFT: THREAD LIST --- */}
                    <div className={`w-full md:w-5/12 border-r border-slate-200 flex flex-col ${selectedThread ? 'hidden md:flex' : 'flex'}`}>
                        {/* Toolbar */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                                {['all', 'open', 'closed'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${activeTab === tab ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setIsAsking(true)} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                <Plus size={18} />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredThreads.map(thread => (
                                <div
                                    key={thread.id}
                                    onClick={() => setSelectedThread(thread)}
                                    className={`p-5 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 group ${selectedThread?.id === thread.id ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <TypeBadge type={thread.type} />
                                        <span className="text-[10px] text-slate-400 font-medium">{thread.date}</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-800 mb-2 leading-snug group-hover:text-blue-600">{thread.title}</h4>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600">{thread.author[0]}</div>
                                            <span className="text-xs text-slate-500">{thread.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <StatusBadge status={thread.status} />
                                            <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT: CHAT / DETAIL VIEW --- */}
                    <div className={`w-full md:w-7/12 bg-slate-50/50 flex flex-col ${!selectedThread ? 'hidden md:flex' : 'flex'}`}>
                        {selectedThread ? (
                            <>
                                {/* Header */}
                                <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setSelectedThread(null)} className="md:hidden p-2 -ml-2 text-slate-500"><ChevronRight className="rotate-180" /></button>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm md:text-base line-clamp-1">{selectedThread.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-slate-500">#{selectedThread.id} opened by {selectedThread.author}</span>
                                                <StatusBadge status={selectedThread.status} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Area */}
                                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                                    {selectedThread.messages.map((msg: any, i: number) => (
                                        <div key={i} className={`flex gap-4 ${msg.sender === 'dev' ? 'flex-row-reverse' : ''}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.sender === 'dev' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}>
                                                {msg.sender === 'dev' ? <Bot size={16} /> : <User size={16} />}
                                            </div>
                                            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${msg.sender === 'dev'
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                                                }`}>
                                                {msg.sender === 'dev' && <div className="text-[10px] font-bold text-blue-200 mb-1 uppercase tracking-wider">Developer Response</div>}
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}

                                    {selectedThread.status === 'closed' && (
                                        <div className="flex justify-center py-4">
                                            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                                                <CheckCircle2 size={14} /> This topic has been resolved.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <MessageSquare size={32} className="text-slate-300" />
                                </div>
                                <h3 className="text-slate-900 font-bold text-lg">Select a discussion</h3>
                                <p className="text-sm max-w-xs mt-2">Browse the list on the left to see existing bugs, feature requests, and solutions.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- "ASK QUESTION" MODAL (Simulated Submission) --- */}
            {isAsking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
                        <button onClick={() => setIsAsking(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20} /></button>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">Start a Discussion</h2>
                        <p className="text-slate-500 text-sm mb-6">Your message will be sent to the developer. Useful threads will be published publicly.</p>

                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            // Here you would hook up Web3Forms again
                            alert("Message sent! It will appear on the board once approved.");
                            setIsAsking(false);
                        }}>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Topic Type</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option>Question ❓</option>
                                    <option>Bug Report 🪲</option>
                                    <option>Feature Request 💡</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., PDF download failing..." required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Details</label>
                                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" placeholder="Describe the issue or idea..." required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <Send size={16} /> Submit to Review
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}