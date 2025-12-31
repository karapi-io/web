import { Twitter, Linkedin, Github, Mail } from 'lucide-react'; // Removed FileText
import { Link } from 'react-router-dom';
import navbarIcon from '../../public/Karapi-side-bar-icon.svg'; // Import your logo

export default function Footer() {
    return (
        <footer className="w-full bg-[#0F172A] text-slate-400 py-16 px-6 md:px-12 lg:px-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">

                {/* BRAND COLUMN */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2.5 text-white font-bold text-2xl mb-4 group hover:opacity-90 transition-opacity">
                        {/* 1. FIXED: Use your actual Logo Image instead of a generic icon */}
                        <img
                            src={navbarIcon}
                            alt="KarAPI Logo"
                            className="h-8 w-auto object-contain"
                        />
                        <span>KarAPI</span>
                    </Link>

                    <p className="text-sm leading-relaxed mb-6">
                        The developer-first invoicing engine for modern Indian businesses. Built for speed, privacy, and scale.
                    </p>

                    <div className="flex gap-4">
                        <a href="https://x.com/karapi_io" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="https://github.com/your-repo" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="https://linkedin.com/company/karapi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* PRODUCT LINKS */}
                <div>
                    <h4 className="text-white font-bold mb-6">Product</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/gst-invoice-generator" className="hover:text-blue-400 transition-colors">Free Generator</Link></li>
                        {/* Added scroll links or page links if you have them */}
                        <li><Link to="/api-docs" className="hover:text-blue-400 transition-colors">API Docs</Link></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                    </ul>
                </div>

                {/* RESOURCES */}
                <div>
                    <h4 className="text-white font-bold mb-6">Resources</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            System Status
                        </a></li>
                    </ul>
                </div>

                {/* LEGAL */}
                <div>
                    <h4 className="text-white font-bold mb-6">Legal</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms-and-conditions" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        <li><Link to="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</Link></li>
                        <li><a href="mailto:support@karapi.io" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Mail size={16} /> Contact Support</a></li>
                    </ul>
                </div>
            </div>

            {/* COPYRIGHT STRIP */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
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