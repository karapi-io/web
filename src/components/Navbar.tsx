import { Code, Zap } from 'lucide-react'; // Added Zap icon for the "Playground"
import { Link } from 'react-router-dom';
import navbarIcon from '../../public/Karapi-side-bar-icon.svg';

export default function Navbar() {
    return (
        <nav className="w-full border-b border-slate-200/60 sticky top-0 z-50 backdrop-blur-md bg-white/80 supports-[backdrop-filter]:bg-white/60">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo Section (Kept your Brackets Style) */}
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

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">

                        {/* 1. CHANGED: "Free Generator" -> "Playground" */}
                        <Link
                            to="/gst-invoice-generator"
                            className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-blue-600 transition hidden md:flex"
                        >
                            <Zap size={16} className="text-amber-500 fill-amber-500" /> {/* Added a small icon */}
                            Playground
                        </Link>

                        {/* 2. CHANGED: "API Docs" -> Gradient Border Button */}
                        {/* This creates a gradient ring around the button */}
                        <Link
                            to='/api-docs'
                            className="group relative inline-flex items-center justify-center p-[2px] overflow-hidden text-sm font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-blue-600 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            {/* The inner white/dark container */}
                            <span className="relative flex items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-slate-900 text-white rounded-[10px] group-hover:bg-opacity-90">
                                <Code size={18} className="text-blue-400" />
                                <span>Read the Docs</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}