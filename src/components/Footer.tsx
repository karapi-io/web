import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import navbarIcon from '../../public/Karapi-side-bar-icon.svg';

export default function Footer() {
    return (
        <footer className="w-full bg-[#0F172A] text-slate-400 py-12 px-6 md:px-12 lg:px-20 border-t border-slate-800">
            {/* Added 'text-center md:text-left' to center everything on mobile only */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12 text-center md:text-left">

                {/* BRAND COLUMN */}
                <div className="col-span-1 flex flex-col items-center md:items-start">
                    <Link to="/" className="flex items-center gap-2.5 text-white font-bold text-2xl mb-4">
                        <img
                            src={navbarIcon}
                            alt="KarAPI Logo"
                            className="h-8 w-auto object-contain"
                        />
                        <span>KarAPI</span>
                    </Link>

                    <p className="text-sm leading-relaxed mb-6 text-slate-400 max-w-xs mx-auto md:mx-0">
                        The developer-first invoicing engine for modern Indian businesses. Built for speed, privacy, and scale.
                    </p>

                    {/* Centered Social Icons on Mobile */}
                    <div className="flex gap-4 justify-center md:justify-start">
                        <a href="https://x.com/karapi_io" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="https://github.com/your-repo" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="https://linkedin.com/company/karapi" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* PRODUCT LINKS */}
                <div>
                    <h4 className="text-white font-bold mb-4 md:mb-6">Product</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><Link to="/gst-invoice-generator" className="hover:text-blue-400 transition-colors">Free Generator</Link></li>
                        <li><Link to="/api-docs" className="hover:text-blue-400 transition-colors">API Docs</Link></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                    </ul>
                </div>

                {/* RESOURCES */}
                <div>
                    <h4 className="text-white font-bold mb-4 md:mb-6">Resources</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><Link to="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center justify-center md:justify-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            System Status
                        </a></li>
                    </ul>
                </div>

                {/* LEGAL */}
                <div>
                    <h4 className="text-white font-bold mb-4 md:mb-6">Legal</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms-and-conditions" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        <li><Link to="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</Link></li>
                        <li><a href="mailto:support@karapi.io" className="hover:text-blue-400 transition-colors flex items-center justify-center md:justify-start gap-2"><Mail size={16} /> Contact Support</a></li>
                    </ul>
                </div>
            </div>

            {/* COPYRIGHT STRIP */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>© 2025 KarAPI. All rights reserved.</p>
                <div className="flex items-center gap-1">
                    <span>Made with</span>
                    <span className="text-red-500">❤️</span>
                    <span>in India 🇮🇳</span>
                </div>
            </div>
        </footer>
    );
}