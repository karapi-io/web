import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Zap, Key, FileText, Menu, X, ExternalLink, GitBranch
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import navbarIcon from '../../public/Karapi-side-bar-icon.svg';
import { useAuth } from '../hook/useAuth';

export default function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, userEmail, logout } = useAuth();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    // Helper to check active state
    const isActive = (path: string) => location.pathname === path;
    const isActivePrefix = (path: string) => location.pathname.startsWith(path);

    return (
        <>
            <nav
                className={`w-full border-b sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/90 backdrop-blur-md border-slate-200 shadow-sm"
                    : "bg-white/50 backdrop-blur-sm border-transparent"
                    }`}
            >
                <div className="w-full px-6 md:px-12 lg:px-20">
                    <div className="flex justify-between h-20 items-center">

                        {/* --- 1. LEFT: Logo --- */}
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
                                <img
                                    src={navbarIcon}
                                    alt="KarAPI Logo"
                                    className="h-9 w-auto object-contain"
                                />
                                <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center">
                                    Kar
                                    <span className="text-slate-400 font-normal ml-0.5">{`{`}</span>
                                    <span className="text-blue-600">API</span>
                                    <span className="text-slate-400 font-normal">{`}`}</span>
                                </span>
                            </Link>

                            {/* --- 2. MIDDLE: Product Navigation (Desktop) --- */}
                            <div className="hidden lg:flex items-center gap-1 ml-4 border-l border-slate-200 pl-6 h-8">
                                <Link
                                    to="/gst-invoice-generator"
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${isActive('/gst-invoice-generator')
                                        ? "bg-slate-100 text-slate-900"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                        }`}
                                >
                                    <FileText size={16} className={isActive('/gst-invoice-generator') ? "text-slate-900" : "text-slate-400"} />
                                    Free Generator
                                </Link>
                                <Link
                                    to="/"
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${location.pathname === '/'
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                        }`}
                                >
                                    <GitBranch size={16} className={location.pathname === '/' ? "text-blue-600" : "text-slate-400"} />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/playground"
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${isActive('/playground')
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                        }`}
                                >
                                    <Zap size={16} className={isActive('/playground') ? "text-blue-600 fill-blue-600/20" : "text-amber-500"} />
                                    API Playground
                                </Link>
                            </div>
                        </div>

                        {/* --- 3. RIGHT: Actions (Desktop) --- */}
                        <div className="hidden md:flex items-center gap-4">

                            {/* Docs Link */}
                            <Link
                                to='/api-docs'
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActivePrefix('/api-docs') ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                                    }`}
                            >
                                Docs
                            </Link>

                            {isAuthenticated ? (
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Login
                                </Link>
                            )}

                            {/* Divider */}
                            <div className="h-5 w-px bg-slate-200"></div>

                            {/* CTA Button */}
                            <Link
                                to='/get-api-key'
                                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-slate-900 rounded-lg hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                <Key size={16} className="text-slate-300 group-hover:text-white transition-colors" />
                                Get API Key
                            </Link>
                        </div>

                        {/* --- 4. MOBILE: Hamburger Menu --- */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE MENU DROPDOWN --- */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-b border-slate-200 bg-white sticky top-20 z-40 overflow-hidden shadow-xl"
                    >
                        <div className="px-6 py-6 space-y-4">
                            <div className="space-y-1">
                                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tools</p>
                                <Link
                                    to="/gst-invoice-generator"
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${isActive('/gst-invoice-generator') ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <FileText size={18} className="text-slate-500" />
                                    </div>
                                    <span className="font-medium">Free Generator</span>
                                </Link>
                                <Link
                                    to="/"
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${location.pathname === '/' ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <GitBranch size={18} className="text-blue-600" />
                                    </div>
                                    <span className="font-medium">Dashboard</span>
                                </Link>
                                <Link
                                    to="/playground"
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${isActive('/playground') ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <Zap size={18} className="text-amber-500 fill-amber-500" />
                                    </div>
                                    <span className="font-medium">API Playground</span>
                                </Link>
                            </div>

                            <div className="border-t border-slate-100 my-2"></div>

                            <div className="space-y-1">
                                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Resources</p>
                                <Link
                                    to="/api-docs"
                                    className="flex items-center justify-between px-3 py-2 text-slate-600 hover:text-slate-900 font-medium"
                                >
                                    Documentation <ExternalLink size={14} className="opacity-50" />
                                </Link>
                            </div>

                            <div className="pt-4">
                                {isAuthenticated && userEmail ? (
                                    <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-3">
                                        Signed in as <span className="font-semibold">{userEmail}</span>
                                    </div>
                                ) : null}
                                <Link
                                    to='/get-api-key'
                                    className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 shadow-lg"
                                >
                                    <Key size={18} />
                                    Get Your API Key
                                </Link>
                                {isAuthenticated ? (
                                    <button
                                        onClick={logout}
                                        className="mt-3 w-full px-5 py-3 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="mt-3 flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}