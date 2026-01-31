import { useState } from "react";
import { ArrowLeft, Layers, LayoutTemplate, Plus, FileText, Building2, Sparkles, GitBranch, Check, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewWorkspacePage() {
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [branches, setBranches] = useState<string[]>(["main"]);
    const [newBranch, setNewBranch] = useState("");

    const templates = [
        { name: "Modern SaaS", icon: Sparkles, color: "from-violet-500 to-purple-600", description: "Clean and professional" },
        { name: "Corporate", icon: Building2, color: "from-blue-500 to-indigo-600", description: "Traditional business style" },
        { name: "Minimal", icon: FileText, color: "from-slate-500 to-slate-600", description: "Simple and elegant" },
        { name: "Retail", icon: Zap, color: "from-amber-500 to-orange-600", description: "Vibrant and eye-catching" },
        { name: "Agency", icon: LayoutTemplate, color: "from-emerald-500 to-teal-600", description: "Creative and bold" }
    ];

    const addBranch = () => {
        if (newBranch.trim() && !branches.includes(newBranch.trim())) {
            setBranches([...branches, newBranch.trim()]);
            setNewBranch("");
        }
    };

    const removeBranch = (branch: string) => {
        if (branch !== "main") {
            setBranches(branches.filter(b => b !== branch));
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-6 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to workspaces
                </button>

                <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-8 py-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                                <Layers size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-violet-100 font-bold mb-1">Create New Project</p>
                                <h1 className="text-3xl font-bold text-white">Start a new invoice workspace</h1>
                                <p className="text-sm text-violet-100 mt-1">Build invoices manually or via API with full workflow control</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">

                        <div className="grid gap-8">
                            {/* Basic Information */}
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
                                    Basic Information
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Workspace name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Q2 Retainer - Atlas Co"
                                            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Client / Company <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Client name"
                                            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Configuration */}
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
                                    Configuration
                                </h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Invoice type</label>
                                        <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all">
                                            <option>GST Invoice</option>
                                            <option>Bill of Supply</option>
                                            <option>Proforma Invoice</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Visibility</label>
                                        <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all">
                                            <option>Private (team only)</option>
                                            <option>Public (shareable link)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Created via</label>
                                        <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all">
                                            <option>Manual</option>
                                            <option>API</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Template Selection */}
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
                                    Choose Template
                                </h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {templates.map((template) => {
                                        const Icon = template.icon;
                                        const isSelected = selectedTemplate === template.name;
                                        return (
                                            <button
                                                key={template.name}
                                                onClick={() => setSelectedTemplate(template.name)}
                                                className={`group relative text-left p-4 rounded-2xl border-2 transition-all ${
                                                    isSelected
                                                        ? "border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/20"
                                                        : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-md"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-3 right-3 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                                                        <Check size={14} className="text-white" />
                                                    </div>
                                                )}
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-3 shadow-lg`}>
                                                    <Icon size={20} className="text-white" />
                                                </div>
                                                <h3 className={`font-bold text-sm mb-1 ${isSelected ? "text-violet-900" : "text-slate-900"}`}>
                                                    {template.name}
                                                </h3>
                                                <p className="text-xs text-slate-500">{template.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Branch Setup */}
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
                                    Branch Setup
                                </h2>
                                <div className="bg-gradient-to-br from-slate-50 to-violet-50/30 border-2 border-slate-200 rounded-2xl p-6">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                                            <GitBranch size={18} className="text-violet-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Git-style workflow</p>
                                            <p className="text-xs text-slate-600 mt-1">Create a main branch and optional review branches for team collaboration.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {branches.map((branch, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="flex-1 flex items-center gap-3 bg-white border-2 border-slate-200 rounded-xl px-4 py-3">
                                                    <GitBranch size={16} className="text-slate-400" />
                                                    <input
                                                        type="text"
                                                        value={branch}
                                                        readOnly={branch === "main"}
                                                        className="flex-1 bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
                                                    />
                                                    {branch === "main" && (
                                                        <span className="px-2 py-1 rounded-md bg-violet-100 text-violet-700 text-xs font-semibold">
                                                            Default
                                                        </span>
                                                    )}
                                                </div>
                                                {branch !== "main" && (
                                                    <button
                                                        onClick={() => removeBranch(branch)}
                                                        className="p-3 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <span className="text-lg">×</span>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={newBranch}
                                                onChange={(e) => setNewBranch(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && addBranch()}
                                                placeholder="Enter branch name..."
                                                className="flex-1 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
                                            />
                                            <button
                                                onClick={addBranch}
                                                className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-all shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 flex items-center gap-2"
                                            >
                                                <Plus size={18} />
                                                Add Branch
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-slate-200">
                                <button 
                                    onClick={() => navigate(-1)}
                                    className="px-6 py-3 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                                >
                                    Cancel
                                </button>
                                <button className="group px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-sm font-bold hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                                    <Sparkles size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                                    Create Workspace
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
