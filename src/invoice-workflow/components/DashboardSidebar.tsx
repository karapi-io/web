import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, ChevronDown, Search, Code2, Sparkles, Layers, Wallet, Zap, FileText, Receipt, ScrollText, Plus, Check } from "lucide-react";
import {
    dashboardAccount,
    dashboardSpaces,
    dashboardTemplates,
    dashboardWorkspaces
} from "../data/dashboard";

export default function DashboardSidebar() {
    const navigate = useNavigate();
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(dashboardAccount.handle);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Mock accounts data
    const accounts = [
        { handle: "pashant-karapi", personalLabel: "Personal Account", isActive: true },
        { handle: "acme-corp", personalLabel: "Organization", isActive: false },
        { handle: "freelance-pro", personalLabel: "Business Account", isActive: false },
        { handle: "startup-ventures", personalLabel: "Organization", isActive: false }
    ];

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowAccountDropdown(false);
            }
        };

        if (showAccountDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAccountDropdown]);

    const spaceIconsMap: Record<string, { icon: any; color: string }> = {
        Finance: { icon: Wallet, color: "bg-blue-100 text-blue-600" },
        Operations: { icon: Zap, color: "bg-amber-100 text-amber-600" },
        Development: { icon: Code2, color: "bg-emerald-100 text-emerald-600" }
    };

    const templateIcons = [FileText, Receipt, ScrollText, Sparkles];
    const templateColors = ["bg-purple-100 text-purple-600", "bg-pink-100 text-pink-600", "bg-indigo-100 text-indigo-600"];

    return (
        <aside className="space-y-6">
            {/* Modern Account Switcher */}
            <div className="relative" ref={dropdownRef}>
                {/* Main Account Card */}
                <button 
                    onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200 group"
                >
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <span className="text-white text-base font-bold">{currentAccount.slice(0, 1).toUpperCase()}</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>

                        {/* Account Info */}
                        <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                                {currentAccount}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {accounts.find(a => a.handle === currentAccount)?.personalLabel}
                            </p>
                        </div>

                        {/* Chevron */}
                        <ChevronDown 
                            size={18} 
                            className={`text-slate-400 group-hover:text-violet-600 transition-all duration-200 ${
                                showAccountDropdown ? "rotate-180" : ""
                            }`} 
                        />
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-around">
                        <div className="text-center">
                            <p className="text-lg font-bold text-slate-900">24</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Projects</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-emerald-600">18</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Active</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-amber-600">6</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Review</p>
                        </div>
                    </div>
                </button>

                {/* Dropdown Menu */}
                {showAccountDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Header */}
                        <div className="px-3 py-2 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Your Accounts</p>
                        </div>

                        {/* Account List */}
                        <div className="p-1.5">
                            {accounts.map((account) => (
                                <button
                                    key={account.handle}
                                    onClick={() => {
                                        setCurrentAccount(account.handle);
                                        setShowAccountDropdown(false);
                                        navigate(`/${account.handle}`);
                                    }}
                                    className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 ${
                                        currentAccount === account.handle
                                            ? "bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200"
                                            : "hover:bg-slate-50 border border-transparent"
                                    }`}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shadow-sm ${
                                            currentAccount === account.handle
                                                ? "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 text-white"
                                                : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600"
                                        }`}>
                                            {account.handle.slice(0, 1).toUpperCase()}
                                        </div>
                                        {account.isActive && (
                                            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
                                        )}
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <p className={`text-xs font-semibold truncate ${
                                            currentAccount === account.handle ? "text-violet-700" : "text-slate-900"
                                        }`}>
                                            {account.handle}
                                        </p>
                                        <p className="text-[10px] text-slate-500 truncate">{account.personalLabel}</p>
                                    </div>
                                    {currentAccount === account.handle && (
                                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center">
                                            <Check size={10} className="text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-slate-200 p-1.5">
                            <button className="w-full flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-semibold text-violet-600 hover:bg-violet-50 transition-all duration-200 group">
                                <div className="w-4 h-4 rounded bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                                    <Plus size={10} className="text-violet-600" />
                                </div>
                                Add account
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-body font-semibold text-slate-900">Top projects</p>
                    <button className="text-caption font-semibold text-purple-600 hover:text-purple-700">New</button>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">
                    <Search size={14} />
                    <input
                        type="text"
                        placeholder="Search invoice projects..."
                        className="w-full bg-transparent text-body text-slate-600 focus:outline-none placeholder:text-caption placeholder:text-slate-400"
                    />
                </div>
                <div className="mt-3 space-y-2 text-body text-slate-700">
                    {dashboardWorkspaces.map((workspace) => (
                        <button key={workspace} className="w-full text-left flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-50 hover:text-slate-900">
                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                            {workspace}
                        </button>
                    ))}
                    <button className="w-full text-left text-caption font-semibold text-slate-500 hover:text-purple-600 transition">
                        Show more
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-body font-semibold text-slate-900">Spaces</p>
                    <button className="text-caption font-semibold text-purple-600 hover:text-purple-700">New</button>
                </div>
                <div className="mt-3 space-y-2 text-body text-slate-600">
                    {dashboardSpaces.map((space) => {
                        const spaceData = spaceIconsMap[space.name] ?? { icon: Layers, color: "bg-slate-100 text-slate-600" };
                        const Icon = spaceData.icon;
                        return (
                            <button key={space.id} className="w-full text-left rounded-lg px-2 py-1 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-lg ${spaceData.color} flex items-center justify-center`}>
                                    <Icon size={14} />
                                </span>
                                {space.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-body font-semibold text-slate-900">Templates Used</p>
                    <button className="text-caption font-semibold text-purple-600 hover:text-purple-700">New</button>
                </div>
                <div className="mt-3 space-y-2 text-body text-slate-600">
                    {dashboardTemplates.map((template, index) => {
                        const Icon = templateIcons[index % templateIcons.length];
                        const colorClass = templateColors[index % templateColors.length];
                        return (
                            <button key={template} className="w-full text-left rounded-lg px-2 py-1 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-lg ${colorClass} flex items-center justify-center`}>
                                    <Icon size={14} />
                                </span>
                                {template}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-700">
                    <Building2 size={16} />
                    <p className="text-body font-semibold">Organizations</p>
                </div>
                <p className="text-caption text-slate-500 mt-2">Switch or create organizations from the dashboard.</p>
            </div>
        </aside>
    );
}
