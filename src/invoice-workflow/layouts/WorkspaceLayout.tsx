import { useState, useRef, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Bell, Search, Sparkles, Menu, X, FolderGit2, MessageSquare, Briefcase, Compass, Store, Cpu, Home, LayoutGrid, Layers, GitBranch, User, Building2, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../hook/useAuth";
import DashboardSidebar from "../components/DashboardSidebar";

interface WorkspaceLayoutProps {
    children?: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
    const { userEmail, logout } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Get username from email or use default
    const currentUsername = userEmail ? userEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-') : 'pashant-karapi';
    const location = useLocation();
    const isStudioRoute = location.pathname.includes("/studio");

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 workspace-font ${isDrawerOpen ? "overflow-hidden" : ""}`}>
            <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/70">
                    <div className="px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsDrawerOpen(true)}
                                className="group p-2.5 rounded-xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 text-slate-500 hover:text-purple-600 hover:border-purple-200 hover:shadow-md hover:shadow-purple-100 transition-all duration-200"
                                title="Toggle sidebar"
                            >
                                <Menu size={18} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <div className="text-body font-semibold text-slate-900 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                Workspaces
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 relative group">
                            <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-slate-500">
                                <Search size={16} />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-52 lg:w-60 bg-transparent text-body text-slate-600 focus:outline-none placeholder:text-caption placeholder:text-slate-400"
                                />
                            </div>
                            <Link
                                to="/new-project"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-body font-semibold hover:bg-purple-700 transition"
                            >
                                <Sparkles size={14} />
                                Create
                            </Link>
                            <button className="p-2 rounded-lg border border-slate-200/80 text-slate-600 hover:bg-slate-50">
                                <Bell size={16} />
                            </button>
                            
                            {/* User Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-caption font-bold shadow-sm hover:bg-slate-800 transition-colors"
                                >
                                    {(userEmail ?? "K").slice(0, 1).toUpperCase()}
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-3 border-b border-slate-100 bg-slate-50">
                                            <p className="text-body-sm font-semibold text-slate-900 truncate">{userEmail ?? "User"}</p>
                                            <p className="text-helper text-slate-500 mt-0.5">Personal Account</p>
                                        </div>
                                        
                                        <div className="py-1.5">
                                            <Link
                                                to={`/${currentUsername}`}
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2 text-body text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <User size={16} />
                                                Profile
                                            </Link>
                                            <Link
                                                to={`/${currentUsername}/invoice-projects`}
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2 text-body text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <FolderGit2 size={16} />
                                                Invoice Projects
                                            </Link>
                                            <Link
                                                to="/organisations"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2 text-body text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <Building2 size={16} />
                                                Organisations
                                            </Link>
                                            <Link
                                                to="/spaces"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2 text-body text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <LayoutGrid size={16} />
                                                Spaces
                                            </Link>
                                        </div>

                                        <div className="border-t border-slate-100 py-1.5">
                                            <Link
                                                to="/settings"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2 text-body text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <Settings size={16} />
                                                Settings
                                            </Link>
                                        </div>

                                        <div className="border-t border-slate-100 py-1.5">
                                            <button
                                                onClick={() => {
                                                    setIsDropdownOpen(false);
                                                    logout();
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-[14px] text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 min-w-0">
                    <div className="flex">
                        {!isStudioRoute && (
                            <div className="hidden lg:block w-72 border-r border-slate-200/70 bg-white/90 backdrop-blur h-[calc(100vh-72px)] sticky top-[72px]">
                                <div className="p-6 h-full overflow-y-auto scrollbar-thin">
                                    <DashboardSidebar />
                                </div>
                            </div>
                        )}
                        <main className="flex-1 px-0">
                            {children ?? <Outlet />}
                        </main>
                    </div>
                </div>
            </div>

            {isDrawerOpen && (
                <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
                    <div
                        className="absolute inset-0 bg-slate-900/20"
                        onClick={() => setIsDrawerOpen(false)}
                    ></div>
                    <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl border-r border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white flex items-center justify-center shadow-md shadow-purple-200">
                                    <Layers size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-900">KarAPI</span>
                            </div>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="px-5 py-5 space-y-6 overflow-y-auto flex-1 scrollbar-thin">
                            <div className="space-y-1">
                                {[
                                    { label: "Home", icon: Home, color: "text-purple-600" },
                                    { label: "Issues", icon: GitBranch, color: "text-blue-600" },
                                    { label: "Pull requests", icon: FolderGit2, color: "text-emerald-600" },
                                    { label: "Repositories", icon: LayoutGrid, color: "text-amber-600" },
                                    { label: "Projects", icon: Briefcase, color: "text-indigo-600" },
                                    { label: "Discussions", icon: MessageSquare, color: "text-pink-600" },
                                    { label: "Codespaces", icon: Cpu, color: "text-cyan-600" },
                                    { label: "Copilot", icon: Sparkles, color: "text-purple-600" }
                                ].map(({ label, icon: Icon, color }) => (
                                    <button
                                        key={label}
                                        className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all duration-200"
                                    >
                                        <Icon size={18} className={`${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className="border-t border-slate-200/50"></div>

                            <div className="space-y-1">
                                {[
                                    { label: "Explore", icon: Compass, color: "text-teal-600" },
                                    { label: "Marketplace", icon: Store, color: "text-rose-600" }
                                ].map(({ label, icon: Icon, color }) => (
                                    <button
                                        key={label}
                                        className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all duration-200"
                                    >
                                        <Icon size={18} className={`${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className="border-t border-slate-200/50"></div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top workspaces</p>
                                    <button className="text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors">New</button>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-500 focus-within:border-purple-300 focus-within:shadow-sm transition-all duration-200">
                                    <Search size={16} className="text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Find a workspace..."
                                        className="w-full bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="space-y-1.5 text-sm">
                                    {["vellvette-lifestyle/po-tracker", "karapi-io/web", "prashant9428/Vault", "prashant9428/auto-release"].map((item, index) => {
                                        const colors = ["bg-purple-400", "bg-blue-400", "bg-emerald-400", "bg-amber-400"];
                                        return (
                                            <button key={item} className="group w-full text-left flex items-center gap-2.5 px-2 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-200">
                                                <span className={`w-2 h-2 rounded-full ${colors[index % colors.length]}`}></span>
                                                <span className="font-medium">{item}</span>
                                            </button>
                                        );
                                    })}
                                    <button className="w-full text-left px-2 py-2 text-xs font-semibold text-slate-500 hover:text-purple-600 transition-colors">
                                        Show more →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
