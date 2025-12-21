import { FileText, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="w-full bg-[#0F172A] border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition">
                            <FileText size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            KarAPI <span className="text-blue-400 font-medium">| GSTSnap</span>
                        </span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        <Link to="/gst-invoice-generator" className="text-sm font-medium text-slate-300 hover:text-white transition hidden md:block">
                            Free Generator
                        </Link>
                        <Link
                            to='/api-docs'
                            className="flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-50 transition shadow-lg shadow-white/10"
                        >
                            <Code size={18} /> API Docs
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}