import { useState, useEffect } from 'react';
import { ArrowRight, Zap, Shield, FileText, X, Check, Gift, Code, QrCode, Minus, Plus, LayoutTemplate, Braces, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/Seo';
// --- DATA: TEMPLATES ---
const TEMPLATES = [
    {
        id: 'corporate',
        title: 'Corporate 🏢',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-1.webp',
        tags: ['MNCs', 'Consulting', 'B2B'],
        desc: 'Embrace the sleek and trending design of this template, ideal for businesses that want a clean, contemporary invoice look.'
    },
    {
        id: 'retail',
        title: 'Retail 🛍️',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-10.webp',
        tags: ['Supermarket', 'POS', 'Fast Moving'],
        desc: 'Optimized for high-volume line items. Compact layout ensures you fit more products on a single page.'
    },
    {
        id: 'minimal',
        title: 'Minimal ✨',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-7.webp',
        tags: ['Freelancers', 'Designers', 'Clean'],
        desc: 'Less is more. A distraction-free layout that puts the focus entirely on the work delivered.'
    },
    {
        id: 'agency',
        title: 'Agency 🎨',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-14.webp',
        tags: ['Creative', 'Social Media', 'Bold'],
        desc: 'Stand out with vibrant headers and a layout that screams creativity. Perfect for digital agencies.'
    },
    {
        id: 'modern',
        title: 'SaaS 🚀',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-13.webp',
        tags: ['Tech', 'Startups', 'Subscriptions'],
        desc: 'High contrast, bold typography, and clear hierarchy. The preferred choice for modern tech companies.'
    }
];

// --- DATA: FAQs ---
const FAQS = [
    {
        q: "Is this API really free?",
        a: "Yes! The Developer plan is completely free for up to 100 invoices/month. It includes access to all standard templates. We only charge for high-volume usage or white-label features."
    },
    {
        q: "Do you store my customer data?",
        a: "No. We are a privacy-first, stateless API. We process your JSON, generate the PDF, send it back to you, and immediately wipe the data from our memory. We store nothing."
    },
    {
        q: "Is it compliant with Indian GST?",
        a: "Absolutely. Our engine is built for Indian businesses. Just pass `gst: true` in your payload, and we automatically handle IGST/CGST/SGST splits, HSN summaries, and Amount in Words."
    },
    {
        q: "Can I use my own logo and branding?",
        a: "Yes. You can pass a `logo` URL and `color` hex code in the API request to override the default branding. The Enterprise plan also allows you to remove our 'Powered by' watermark."
    },
    {
        q: "What is the response time?",
        a: "Our average latency is under 500ms for a standard single-page invoice. We use a highly optimized Chromium instance running on edge locations close to you."
    }
];

// --- COMPONENT: TYPEWRITER TEXT ---
const TypewriterText = () => {
    const phrases = ["Modern Indian Tech 🇮🇳.", "Freelancers 💻.", "SaaS Startups 🚀.", "Agencies 🎨."];
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];
            setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
            setTypingSpeed(isDeleting ? 50 : 150);
            if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 2000);
            else if (isDeleting && text === '') { setIsDeleting(false); setLoopNum(loopNum + 1); }
        };
        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, phrases]);

    return <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{text}<span className="animate-pulse text-blue-400">|</span></span>;
};

// --- COMPONENT: THUMBNAIL CARD ---
const TemplateThumbnail = ({ template, onClick }: { template: any, onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            className="w-[240px] h-[340px] bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden relative hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:border-transparent relative z-0 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-blue-400 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-m-[2px]"
        >
            <div className="h-[290px] w-full bg-slate-50/50 overflow-hidden relative flex items-center justify-center rounded-t-xl">
                <img src={template.img} alt={template.title} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500 drop-shadow-sm" />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors flex items-center justify-center">
                    <div className="bg-white/95 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-1">
                        Preview ✨
                    </div>
                </div>
            </div>
            <div className="h-[50px] bg-white border-t border-slate-100 flex items-center justify-between px-4 rounded-b-xl">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider truncate">{template.title}</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <Gift size={10} /> FREE
                </span>
            </div>
        </div>
    );
};

// --- COMPONENT: CODE TERMINAL ---
const CodeTerminal = () => {
    const [activeTab, setActiveTab] = useState<'json' | 'buffer'>('json');

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#1E293B] rounded-xl shadow-2xl border border-slate-700 overflow-hidden text-left">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-slate-700">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex bg-slate-800 rounded-lg p-1 text-[10px] font-bold text-slate-400">
                    <button onClick={() => setActiveTab('json')} className={`px-3 py-1 rounded-md transition-all ${activeTab === 'json' ? 'bg-blue-600 text-white shadow-sm' : 'hover:text-slate-200'}`}>input.json</button>
                    <button onClick={() => setActiveTab('buffer')} className={`px-3 py-1 rounded-md transition-all ${activeTab === 'buffer' ? 'bg-blue-600 text-white shadow-sm' : 'hover:text-slate-200'}`}>output.pdf</button>
                </div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                {activeTab === 'json' ? (
                    <div className="text-blue-300">
                        <span className="text-purple-400">const</span> payload = {'{'} <br />
                        &nbsp;&nbsp;<span className="text-sky-300">"template"</span>: <span className="text-orange-300">"modern"</span>,<br />
                        &nbsp;&nbsp;<span className="text-sky-300">"white_label"</span>: <span className="text-emerald-400">true</span>,<br />
                        &nbsp;&nbsp;<span className="text-sky-300">"branding"</span>: {'{'}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">"logo"</span>: <span className="text-orange-300">"https://cdn.yourapp.com/logo.png"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">"qr_data"</span>: <span className="text-orange-300">"upi://pay?pa=merchant@okicici"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">"domain"</span>: <span className="text-orange-300">"invoice.yourcompany.com"</span><br />
                        &nbsp;&nbsp;{'}'},<br />
                        &nbsp;&nbsp;<span className="text-sky-300">"gst_verification"</span>: <span className="text-emerald-400">true</span>,<br />
                        &nbsp;&nbsp;<span className="text-sky-300">"items"</span>: [...] <span className="text-slate-500">// Your line items here</span><br />
                        {'}'};
                    </div>
                ) : (
                    <div className="text-slate-300">
                        <span className="text-slate-500">// 1. Send Request</span><br />
                        <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> axios.post(<span className="text-orange-300">"/generate"</span>, payload, {'{'}<br />
                        &nbsp;&nbsp;<span className="text-sky-300">responseType</span>: <span className="text-orange-300">'arraybuffer'</span> <span className="text-slate-500">// 👈 Receive binary data directly</span><br />
                        {'}'});<br /><br />
                        <span className="text-slate-500">// 2. Handle Buffer</span><br />
                        <span className="text-purple-400">const</span> pdfBuffer = Buffer.from(response.data);<br /><br />
                        <span className="text-slate-500">// 3. Save or Stream</span><br />
                        fs.writeFileSync(<span className="text-orange-300">"invoice-101.pdf"</span>, pdfBuffer);<br />
                        <span className="text-emerald-400">console</span>.log(<span className="text-orange-300">"✅ Invoice saved successfully!"</span>);
                    </div>
                )}
            </div>
        </div>
    );
};

// --- COMPONENT: FAQ ITEM ---
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>{question}</span>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-600 leading-relaxed text-base pr-8">{answer}</p>
            </div>
        </div>
    );
}

// --- COMPONENT: MODAL ---
const TemplateModal = ({ template, onClose }: { template: any, onClose: () => void }) => {
    if (!template) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col md:flex-row overflow-hidden relative animate-in zoom-in-95 duration-300 border border-slate-200" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-slate-100 rounded-full text-slate-500 transition-colors z-20 backdrop-blur-md"><X size={20} /></button>
                <div className="w-full md:w-2/5 flex flex-col justify-between border-r border-slate-100 bg-white relative z-10">
                    <div className="p-6 lg:p-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">{template.title}</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6">{template.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-6">{template.tags.map((tag: string) => (<span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-200 shadow-sm">{tag}</span>))}</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200/60 shadow-sm"><Check size={18} className="text-emerald-500 fill-emerald-500" /> <span>100% GST Compliant & Ready</span></div>
                    </div>
                    <div className="p-6 lg:p-8 border-t border-slate-100 bg-slate-50/50">
                        <Link to="/gst-invoice-generator" className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group">Use This Template 🚀 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></Link>
                    </div>
                </div>
                <div className="w-full md:w-3/5 bg-slate-100/80 p-4 lg:p-8 flex items-center justify-center overflow-y-auto relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 to-slate-100">
                    <img src={template.img} alt={template.title} className="w-auto h-auto max-w-full max-h-[85vh] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white ring-1 ring-slate-900/5" />
                </div>
            </div>
        </div>
    );
};

// --- MAIN LANDING PAGE ---
export default function LandingPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 w-full overflow-x-hidden">
            <SEO
                title="Free GST Invoice Generator & Invoicing API"
                description="Generate GST-compliant invoices for free in India. No login required. Upload logo, add QR, choose templates, and download PDF instantly. Automate invoicing at scale with karAPI."
                keywords="free gst invoice generator, gst invoice pdf, india gst invoice tool, gst invoice api, automated invoicing india"
                url="https://karapi.io/"
                image="https://karapi.io/karapi-logo.png"
            />
            <TemplateModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />

            {/* --- HERO SECTION --- */}
            <section className="w-full bg-[#0F172A] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

                <div className="w-full px-6 md:px-12 lg:px-28 pt-8 lg:pt-16 pb-24 relative z-10 grid lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
                    {/* LEFT: Text Content */}
                    <div className="space-y-8 flex flex-col justify-center z-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-300 text-xs font-bold uppercase tracking-widest w-fit shadow-lg shadow-blue-900/10"><span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]"></span>2025 GST Compliant</div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-sm">Invoicing for <br /><TypewriterText /></h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
                            Create GST invoices manually for free.
                            <br />
                            Configure once and automate invoicing at scale with <span className="font-semibold text-slate-300">karAPI</span>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link to="/gst-invoice-generator" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition shadow-xl shadow-blue-900/25 group">Generate Free GST Invoice <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></Link>
                            <Link to="/api-docs" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white border border-slate-700 hover:bg-white/5 hover:border-slate-600 transition flex gap-3"><Code size={20} className="text-blue-400" />   Automate with API →</Link>
                        </div>
                    </div>
                    {/* RIGHT: Visual */}
                    <div className="relative hidden lg:flex justify-center perspective-1000 animate-slide-in-right z-10">
                        <div className="relative w-[400px] mx-auto">
                            <div className="relative transform hover:-translate-y-2 transition-transform duration-500 z-10">
                                <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden"><img src="https://getswipe.azureedge.net/getswipe/images/templates/small/temp-1.webp" alt="Modern Invoice Template" className="w-full h-auto rounded-lg shadow-inner opacity-95 bg-white" /></div>
                                {/* Floating Elements */}
                                <div className="absolute -top-16 -left-16 w-[300px] bg-[#1E293B] p-4 rounded-xl shadow-2xl border border-slate-600 shadow-blue-900/20 transform -rotate-2 opacity-95 z-30 animate-[float_7s_ease-in-out_infinite]">
                                    <div className="flex gap-1.5 mb-3 border-b border-slate-800 pb-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="ml-auto text-[10px] text-slate-500 font-mono">POST /generate</span></div>
                                    <div className="font-mono text-[10px] text-slate-300 leading-relaxed"><div><span className="text-purple-400">const</span> <span className="text-blue-400">pdf</span> = <span className="text-yellow-300">await</span> api.create({'{'}</div><div className="pl-4"><span className="text-blue-300">template</span>: <span className="text-orange-300">"modern"</span>,</div><div className="pl-4"><span className="text-blue-300">gst</span>: <span className="text-orange-300">true</span>,</div><div className="pl-4"><span className="text-blue-300">items</span>: [...]</div><div>{'}'});</div><div className="mt-1 text-emerald-500 text-[9px]">// ⚡️ Created in 120ms</div></div>
                                </div>
                                <div className="absolute top-12 -right-20 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-[float_4s_ease-in-out_infinite] z-20"><div className="bg-red-100 p-1.5 rounded-lg text-red-600"><FileText size={18} /></div><div><div className="text-[8px] font-bold text-slate-400 leading-none uppercase">Format</div><div className="text-xs font-bold text-slate-800 leading-tight">PDF Ready</div></div></div>
                                <div className="absolute bottom-16 -left-12 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-[float_5s_ease-in-out_infinite_reverse] z-20"><div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600"><Check size={18} strokeWidth={3} /></div><div><div className="text-[8px] font-bold text-slate-400 leading-none uppercase">Status</div><div className="text-xs font-bold text-slate-800 leading-tight">GST Verified</div></div></div>
                                <div className="absolute bottom-24 -right-16 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-[float_6s_ease-in-out_infinite] z-20"><div className="bg-blue-100 p-1.5 rounded-lg text-blue-600"><QrCode size={18} /></div><div><div className="text-[8px] font-bold text-slate-400 leading-none uppercase">Payment</div><div className="text-xs font-bold text-slate-800 leading-tight">QR Active</div></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES GRID (FREE TOOL) --- */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-20 border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <div className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Free Tools</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">More than just an API. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">The Ultimate Free Generator.</span></h2>
                        <p className="text-slate-500 text-lg mb-6">
                            A professional-grade manual GST invoice generator for freelancers and small teams.
                            When you need bulk invoicing, automation, or custom templates, switch to <span className="font-semibold">karAPI</span>.
                        </p>
                        <Link to="/gst-invoice-generator" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition shadow-lg hover:-translate-y-1">Try Generator Now <ArrowRight size={16} /></Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                            <div className="bg-white group-hover:bg-blue-50 border border-slate-200 group-hover:border-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-sm">
                                <QrCode className="text-slate-400 group-hover:text-blue-500 transition-colors" size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Smart Payments</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Auto-generate <span className="font-bold text-slate-700">UPI QR Codes</span>. Just enter your VPA and get paid instantly.</p>
                        </div>
                        <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                            <div className="bg-white group-hover:bg-emerald-50 border border-slate-200 group-hover:border-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-sm">
                                <Shield className="text-slate-400 group-hover:text-emerald-500 transition-colors" size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">100% Private</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">No login required. Your data is processed locally in your browser and <span className="font-bold text-slate-700">never stored</span>.</p>
                        </div>
                        <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
                            <div className="bg-white group-hover:bg-amber-50 border border-slate-200 group-hover:border-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-sm">
                                <FileText className="text-slate-400 group-hover:text-amber-500 transition-colors" size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">GST Intelligence</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Automatic calculation of <span className="font-bold text-slate-700">CGST, SGST, IGST</span> & HSN Summaries for Indian businesses.</p>
                        </div>
                        <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-200 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
                            <div className="bg-white group-hover:bg-purple-50 border border-slate-200 group-hover:border-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-sm">
                                <Zap className="text-slate-400 group-hover:text-purple-500 transition-colors" size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Rich Features</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Includes <span className="font-bold text-slate-700">Logo Cropper</span>, Vector PDF download, and Amount in Words automation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TEMPLATES GRID --- */}
            <section className="w-full bg-slate-50 py-24 border-b border-slate-200 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Templates for Every Business ✨</h2>
                    <p className="text-slate-600 text-lg">Professional designs. Ready in seconds.</p>
                </div>
                <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap justify-center gap-8">
                    {TEMPLATES.map((tmpl, idx) => (<TemplateThumbnail key={idx} template={tmpl} onClick={() => setSelectedTemplate(tmpl)} />))}
                </div>
            </section>

            {/* --- NEW: COMPARISON SECTION --- */}
            <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20 border-t border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-extrabold">
                            Free Generator vs <span className="text-blue-600">karAPI</span>
                        </h3>
                        <p className="text-slate-500 mt-2">Scale from manual creation to full automation.</p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="p-4 font-bold text-slate-700 w-1/3">Feature</th>
                                        <th className="p-4 text-center font-bold text-slate-500 w-1/3">Free Tool</th>
                                        {/* Highlighted Header */}
                                        <th className="p-4 text-center font-bold text-blue-700 bg-blue-50/80 w-1/3">
                                            karAPI
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        ["GST Compliant PDFs", "✅", "✅"],
                                        ["Logo & Branding", "Upload every time", "Configure once"],
                                        ["QR Code", "Manual", "Automated"],
                                        ["Templates", "4 Free Templates", "Premium + Custom"],
                                        ["Custom Templates", "❌", "✅ (on request)"],
                                        ["Bulk Invoicing", "❌", "✅"],
                                        ["Invoice Generation", "Manual", "Automated"],
                                        ["API Access", "❌", "✅"],
                                        ["PDF Delivery", "Download only", "URL or Binary Buffer"],
                                    ].map(([feature, free, api]) => (
                                        <tr key={feature} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 font-medium text-slate-700">{feature}</td>
                                            <td className="p-4 text-center text-slate-500">{free}</td>
                                            {/* Highlighted Cell */}
                                            <td className="p-4 text-center font-semibold text-slate-900 bg-blue-50/30">
                                                {api}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Call to Action Row */}
                                    <tr className="bg-slate-50/50">
                                        <td className="p-4"></td>
                                        <td className="p-4 text-center">
                                            <Link to="/gst-invoice-generator" className="inline-block text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                                                Start Free
                                            </Link>
                                        </td>
                                        <td className="p-4 text-center bg-blue-50/30">
                                            <Link to="/api-docs" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all hover:-translate-y-0.5">
                                                Get API Key
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- INTEGRATION STEPS --- */}
            <section className="w-full bg-slate-50 py-24 px-6 md:px-12 lg:px-20 border-b border-slate-100">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Integration</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Three steps to <span className="text-blue-600">automation.</span></h2>
                        <p className="text-slate-500 text-lg mb-8">Stop building PDF renderers from scratch. Integrate in minutes.</p>
                        <div className="space-y-6">
                            <div className="flex gap-4 group"><div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:border-blue-400 group-hover:text-blue-500 transition-all"><LayoutTemplate size={20} /></div><div><h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">1. Pick a Template</h4><p className="text-slate-500 text-sm mt-1">Choose from our gallery.<br /><code className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500 mt-1 inline-block">template: 'corporate'</code></p></div></div>
                            <div className="flex gap-4 group"><div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-purple-600 shadow-sm group-hover:border-purple-400 group-hover:text-purple-500 transition-all"><Braces size={20} /></div><div><h4 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">2. Send JSON Data</h4><p className="text-slate-500 text-sm mt-1">Pass customer & item details.<br /><code className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500 mt-1 inline-block">POST /v1/generate</code></p></div></div>
                            <div className="flex gap-4 group"><div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:border-emerald-400 group-hover:text-emerald-500 transition-all"><Download size={20} /></div><div><h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">3. Get PDF</h4><p className="text-slate-500 text-sm mt-1">Receive binary or URL.<br /><code className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500 mt-1 inline-block">response.url</code></p></div></div>
                        </div>
                    </div>
                    <div className="relative"><div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10"></div><CodeTerminal /></div>
                </div>
            </section>

            {/* --- STATS STRIP --- */}
            <section className="w-full bg-white border-b border-slate-100 shadow-sm relative z-20">
                <div className="w-full px-6 md:px-12 lg:px-20 py-12 flex flex-wrap justify-center md:justify-between gap-8 text-slate-500 font-bold uppercase tracking-widest text-sm">
                    <span className="flex items-center gap-2"><span className="text-xl">👩‍💻</span> Used by 500+ Developers</span><span className="hidden md:block text-slate-300">•</span>
                    <span className="flex items-center gap-2"><span className="text-xl">🧾</span> 10k+ Invoices Generated</span><span className="hidden md:block text-slate-300">•</span>
                    <span className="flex items-center gap-2"><span className="text-xl">⚡️</span> 99.99% API Uptime</span>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Support</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-2">
                        {FAQS.map((faq, idx) => (
                            <FAQItem key={idx} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}