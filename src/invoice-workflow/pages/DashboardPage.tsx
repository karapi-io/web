import { Link } from "react-router-dom";
import { FolderPlus, LayoutGrid, Plus, Sparkles, Users, ChevronRight, Search, Building2, Code2, Zap, Wallet, TrendingUp, Lock, Eye, FileText, DollarSign, Clock, CheckCircle2, AlertCircle, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { dashboardOrganizations, dashboardSpaces } from "../data/dashboard";
import { invoiceProjects } from "../data/invoiceProjects";
import { useAuth } from "../../hook/useAuth";

export default function DashboardPage() {
    const { userEmail } = useAuth();
    const currentUsername = userEmail ? userEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-') : 'pashant-karapi';
    return (
        <div className="min-h-screen bg-transparent">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-helper text-slate-500 font-semibold flex items-center gap-2 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse shadow-sm shadow-violet-400"></span>
                            Invoice Workspaces
                        </p>
                        <h1 className="text-page-title text-slate-900 mt-1 md:text-[24px]">Dashboard</h1>
                        <p className="text-body text-slate-600 mt-3 max-w-2xl">
                            Build invoices manually or via API, then move them through review and approvals like GitHub pull requests.
                        </p>
                    </div>
                    <Link
                        to="/new-project"
                        className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-body font-semibold hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all duration-200 hover:-translate-y-0.5 border border-slate-900"
                    >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                        New Workspace
                    </Link>
                </div>

                {/* Workspace Health Metrics */}
                <div className="mt-10 grid gap-4 md:grid-cols-4">
                    {[
                        { 
                            label: "Total Revenue", 
                            value: "₹12,45,890", 
                            change: "+12.5%", 
                            trend: "up", 
                            icon: DollarSign, 
                            iconBg: "bg-emerald-100",
                            iconColor: "text-emerald-700"
                        },
                        { 
                            label: "Active Projects", 
                            value: "24", 
                            change: "+3 this week", 
                            trend: "up", 
                            icon: Activity, 
                            iconBg: "bg-blue-100",
                            iconColor: "text-blue-700"
                        },
                        { 
                            label: "Pending Approvals", 
                            value: "8", 
                            change: "2 urgent", 
                            trend: "neutral", 
                            icon: Clock, 
                            iconBg: "bg-amber-100",
                            iconColor: "text-amber-700"
                        },
                        { 
                            label: "Completed", 
                            value: "156", 
                            change: "+18 this month", 
                            trend: "up", 
                            icon: CheckCircle2, 
                            iconBg: "bg-violet-100",
                            iconColor: "text-violet-700"
                        }
                    ].map((metric) => {
                        const Icon = metric.icon;
                        const TrendIcon = metric.trend === "up" ? ArrowUpRight : metric.trend === "down" ? ArrowDownRight : AlertCircle;
                        return (
                            <div key={metric.label} className="group bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                                <div className="flex items-start justify-between">
                                    <div className={`w-10 h-10 rounded-xl ${metric.iconBg} ${metric.iconColor} flex items-center justify-center`}>
                                        <Icon size={18} strokeWidth={2} />
                                    </div>
                                    {metric.trend !== "neutral" && (
                                        <span className={`flex items-center gap-0.5 text-helper font-semibold ${metric.trend === "up" ? "text-emerald-700" : "text-red-700"}`}>
                                            <TrendIcon size={12} />
                                            {metric.change}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <p className="text-section-title font-bold text-slate-900">{metric.value}</p>
                                    <p className="text-body-sm text-slate-600 mt-1 font-medium">{metric.label}</p>
                                    {metric.trend === "neutral" && (
                                        <p className="text-helper font-semibold text-amber-700 mt-2">{metric.change}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 space-y-8">
                    {/* Activity Feed */}
                    <div className="bg-white border border-slate-200/60 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-section-title font-semibold text-slate-900">Recent Activity</h2>
                            <button className="text-body-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">View all →</button>
                        </div>
                        <div className="space-y-2">
                            {[
                                { action: "Invoice #INV-2024-089 moved to", status: "Review", user: "Prashant Kumar", time: "2 min ago", color: "bg-amber-50 text-amber-700", icon: Eye },
                                { action: "Invoice #INV-2024-088 was", status: "Approved", user: "John Smith", time: "15 min ago", color: "bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
                                { action: "New workspace created:", status: "Q4-2024 Reports", user: "Sarah Johnson", time: "1 hour ago", color: "bg-violet-50 text-violet-700", icon: Sparkles },
                                { action: "Invoice #INV-2024-087 was", status: "Locked", user: "Mike Davis", time: "2 hours ago", color: "bg-slate-100 text-slate-700", icon: Lock }
                            ].map((activity, index) => {
                                const ActivityIcon = activity.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50/80 transition-colors group cursor-pointer border border-transparent hover:border-slate-200">
                                        <div className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                                            <ActivityIcon size={15} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[14px] text-slate-700 leading-snug">
                                                {activity.action} <span className="font-semibold text-slate-900">{activity.status}</span>
                                            </p>
                                            <p className="text-[12px] text-slate-500 mt-1">{activity.user} · {activity.time}</p>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                    <Building2 size={16} className="text-purple-600" />
                                    Your Organizations
                                </p>
                                <p className="text-xs text-slate-500 mt-1">Collaborate with your team on shared workspaces</p>
                            </div>
                            <button className="text-sm font-semibold text-purple-700 border border-purple-200 bg-purple-50/60 rounded-xl px-4 py-2 hover:bg-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-200 hover:-translate-y-0.5">
                                <Plus size={14} className="inline mr-1" />
                                Create Org
                            </button>
                        </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {dashboardOrganizations.map((org, index) => {
                                const gradients = [
                                    "from-purple-500 to-purple-700",
                                    "from-blue-500 to-indigo-700"
                                ];
                                return (
                                    <button key={org.id} className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all duration-200 hover:-translate-y-1">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} text-white flex items-center justify-center text-base font-semibold shadow-md`}>
                                                {org.name.slice(0, 1)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">{org.name}</p>
                                                <p className="text-xs text-slate-500">{org.members} members • {org.workspaces} workspaces</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                <LayoutGrid size={16} className="text-blue-600" />
                                Spaces
                            </p>
                            <button className="text-sm font-semibold text-purple-700 border border-purple-200 bg-purple-50/60 rounded-xl px-4 py-2 hover:bg-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-200 hover:-translate-y-0.5">
                                <Plus size={14} className="inline mr-1" />
                                New Space
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Organize your workspaces by category</p>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            {dashboardSpaces.map((space) => {
                                const iconMap = {
                                    Finance: { icon: Wallet, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600" },
                                    Operations: { icon: Zap, color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-600" },
                                    Development: { icon: Code2, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-600" }
                                } as const;
                                const iconData = iconMap[space.name as keyof typeof iconMap] ?? { icon: LayoutGrid, color: "from-slate-500 to-slate-600", bg: "bg-slate-50", text: "text-slate-600" };
                                const Icon = iconData.icon;
                                return (
                                    <button key={space.id} className="group rounded-2xl border border-slate-200 bg-white p-4 text-left hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100 transition-all duration-200 hover:-translate-y-1">
                                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${iconData.color} flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200`}>
                                            <Icon size={20} />
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-sm font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">{space.name}</p>
                                            <span className={`text-xs font-semibold ${iconData.text} ${iconData.bg} rounded-full px-2.5 py-1`}>{space.workspaces}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">{space.description}</p>
                                    </button>
                                );
                            })}
                            <button className="group rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-sm font-semibold text-slate-500 hover:bg-white hover:text-purple-600 hover:border-purple-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col items-center justify-center gap-2">
                                <Plus size={20} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
                                Create new space
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-slate-50 to-purple-50/30 border border-slate-200 rounded-3xl p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-4 py-2.5 text-slate-500 focus-within:border-purple-300 focus-within:shadow-md transition-all duration-200">
                                <Search size={16} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search workspaces or clients"
                                    className="w-56 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <button className="px-3 py-1.5 rounded-full bg-purple-600 text-white shadow-md shadow-purple-200 hover:bg-purple-700 transition-all duration-200">All</button>
                                <button className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md transition-all duration-200">Draft</button>
                                <button className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md transition-all duration-200">In Review</button>
                                <button className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md transition-all duration-200">Locked</button>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <button className="px-3 py-1.5 rounded-full bg-purple-600 text-white shadow-md shadow-purple-200 hover:bg-purple-700 transition-all duration-200">Grid</button>
                                <button className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md transition-all duration-200">List</button>
                                <select className="rounded-full border-2 border-slate-200 bg-white px-3 py-1.5 hover:border-purple-300 focus:border-purple-400 focus:outline-none transition-all duration-200 cursor-pointer">
                                    <option>Newest first</option>
                                </select>
                            </div>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 mt-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Showing {invoiceProjects.length} of {invoiceProjects.length} workspaces
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {invoiceProjects.map((project) => {
                            const stageConfig = {
                                draft: { icon: FileText, color: "bg-slate-100 text-slate-700", label: "Editable draft" },
                                review: { icon: Eye, color: "bg-amber-100 text-amber-700", label: "In review" },
                                locked: { icon: Lock, color: "bg-emerald-100 text-emerald-700", label: "Locked" }
                            };
                            const stage = stageConfig[project.stage];
                            const StageIcon = stage.icon;

                            return (
                                <div key={project.id} className="group bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:shadow-purple-100 hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Project</p>
                                        <span className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ${stage.color}`}>
                                            <StageIcon size={10} />
                                            {stage.label}
                                        </span>
                                    </div>
                                    <p className="text-base font-semibold text-slate-900 mt-3 group-hover:text-purple-700 transition-colors">{project.name}</p>
                                    <p className="text-sm text-slate-500">{project.clientName}</p>
                                    <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold">
                                        <span className={`px-3 py-1 rounded-full ${project.createdVia === "api" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                                            {project.createdVia === "api" ? "API" : "Manual"}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full ${project.visibility === "public" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                                            {project.visibility === "public" ? "Public" : "Private"}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">{project.template}</span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <TrendingUp size={12} className="text-slate-400" />
                                            {new Date(project.updatedAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-sm font-bold text-slate-900">{project.totalAmount}</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <Link
                                            to={`/${currentUsername}/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="flex items-center justify-between text-sm font-semibold text-purple-600 hover:text-purple-700 transition-all group-hover:translate-x-1 duration-200"
                                        >
                                            <span>Open invoice</span>
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                <Sparkles size={16} className="text-purple-600" />
                                Quick actions
                            </p>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                            {[
                                { label: "Create workspace", icon: FolderPlus, gradient: "from-purple-500 to-purple-600", bg: "bg-purple-50", hoverBg: "hover:bg-purple-100" },
                                { label: "Browse templates", icon: LayoutGrid, gradient: "from-blue-500 to-indigo-600", bg: "bg-blue-50", hoverBg: "hover:bg-blue-100" },
                                { label: "Invite collaborators", icon: Users, gradient: "from-pink-500 to-rose-600", bg: "bg-pink-50", hoverBg: "hover:bg-pink-100" }
                            ].map(({ label, icon: Icon, gradient, bg, hoverBg }) => (
                                <button
                                    key={label}
                                    className={`group flex items-center gap-3 rounded-2xl border border-slate-200 ${bg} px-4 py-3.5 text-sm font-semibold text-slate-700 hover:border-purple-200 ${hoverBg} hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
                                >
                                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                                        <Icon size={16} />
                                    </div>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
