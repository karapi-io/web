import { Link, useParams } from "react-router-dom";
import { FileText, MapPin, Mail, Link as LinkIcon } from "lucide-react";
import { invoiceProjects } from "../data/invoiceProjects";
import UserProfileHeader from "../components/UserProfileHeader";

export default function UserProfilePage() {
    const { username } = useParams<{ username: string }>();

    // Mock user data
    const user = {
        name: "Prashant Pathak",
        username: username || "pashant-karapi",
        email: "prashant@karapi.io",
        location: "Mumbai, India",
        website: "karapi.io",
        bio: "Finance automation enthusiast. Building the GitHub of invoices.",
        avatar: "/karapi-logo.png",
        stats: {
            projects: 24,
            approved: 156,
            pending: 8
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation Tabs */}
            <UserProfileHeader projectCount={invoiceProjects.length} />
            
            {/* User Profile Header */}
            <div className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="flex items-start gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-2 border-slate-200 overflow-hidden bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-violet-600">{user.name.slice(0, 1)}</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-page-title text-slate-900 mb-1">{user.name}</h1>
                                        <p className="text-slate-600 text-body mb-3">@{user.username}</p>
                                        <p className="text-slate-700 text-body max-w-2xl mb-4">{user.bio}</p>
                                        
                                        <div className="flex flex-wrap gap-4 text-body text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={16} />
                                                {user.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={16} />
                                                {user.email}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <LinkIcon size={16} />
                                                <a href={`https://${user.website}`} className="text-violet-600 hover:underline">{user.website}</a>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/settings/profile"
                                        className="px-4 py-2 rounded-lg border border-slate-300 text-body font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        Edit profile
                                    </Link>
                                </div>

                                {/* Stats */}
                                <div className="flex gap-6 mt-6 pt-6 border-t border-slate-200">
                                    <div>
                                        <p className="text-section-title font-bold text-slate-900">{user.stats.projects}</p>
                                        <p className="text-caption text-slate-600">Active Projects</p>
                                    </div>
                                    <div>
                                        <p className="text-section-title font-bold text-emerald-600">{user.stats.approved}</p>
                                        <p className="text-caption text-slate-600">Approved</p>
                                    </div>
                                    <div>
                                        <p className="text-section-title font-bold text-amber-600">{user.stats.pending}</p>
                                        <p className="text-caption text-slate-600">Pending Review</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="space-y-6">
                        {/* Pinned Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-section-title font-semibold text-slate-900">Pinned</h2>
                                <button className="text-body text-violet-600 hover:text-violet-700 font-medium">
                                    Customize your pins
                                </button>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                {invoiceProjects.slice(0, 6).map((project) => (
                                    <Link
                                        key={project.id}
                                        to={`/${username}/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-violet-300 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-slate-600" />
                                                <h3 className="font-semibold text-violet-600 group-hover:text-violet-700">
                                                    {project.name}
                                                </h3>
                                            </div>
                                            <span className="text-caption px-2 py-1 rounded bg-slate-100 text-slate-600">
                                                {project.visibility}
                                            </span>
                                        </div>
                                        <p className="text-body text-slate-600 mb-3 line-clamp-2">
                                            {project.clientName} • {project.template} template
                                        </p>
                                        <div className="flex items-center gap-3 text-caption text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <span className={`w-2 h-2 rounded-full ${
                                                    project.stage === "draft" 
                                                        ? "bg-slate-400"
                                                        : project.stage === "review"
                                                        ? "bg-amber-400"
                                                        : "bg-emerald-400"
                                                }`}></span>
                                                {project.stage}
                                            </span>
                                            <span>{project.totalAmount}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Activity Calendar - Contribution Graph */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-section-title font-semibold text-slate-900">
                                    152 invoice activities in the last year
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button className="text-body text-slate-600 hover:text-slate-900">
                                        Contribution settings
                                    </button>
                                    <select className="text-body border border-slate-200 rounded-lg px-3 py-1 text-slate-700">
                                        <option>2026</option>
                                        <option>2025</option>
                                        <option>2024</option>
                                    </select>
                                </div>
                            </div>

                            {/* Contribution Graph */}
                            <div className="overflow-x-auto">
                                <div className="inline-block min-w-full">
                                    {/* Month labels */}
                                    <div className="flex gap-1 mb-2 ml-12 text-xs text-slate-600">
                                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                                            <div key={month} className="w-[52px] text-left">{month}</div>
                                        ))}
                                    </div>
                                    
                                    {/* Graph grid */}
                                    <div className="flex gap-1">
                                        {/* Day labels */}
                                        <div className="flex flex-col gap-1 text-xs text-slate-600 pr-2 justify-around">
                                            <div>Mon</div>
                                            <div>Wed</div>
                                            <div>Fri</div>
                                        </div>
                                        
                                        {/* Weeks */}
                                        <div className="flex gap-1">
                                            {Array.from({ length: 52 }).map((_, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-col gap-1">
                                                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                                                        const random = Math.random();
                                                        const level = random > 0.8 ? 4 : random > 0.6 ? 3 : random > 0.4 ? 2 : random > 0.2 ? 1 : 0;
                                                        const colors = [
                                                            "bg-slate-100",
                                                            "bg-emerald-200",
                                                            "bg-emerald-400", 
                                                            "bg-emerald-600",
                                                            "bg-emerald-700"
                                                        ];
                                                        return (
                                                            <div
                                                                key={dayIndex}
                                                                className={`w-3 h-3 rounded-sm ${colors[level]} hover:ring-2 hover:ring-slate-400 cursor-pointer transition-all`}
                                                                title={`${level} invoices on this day`}
                                                            ></div>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="flex items-center gap-2 mt-4 text-xs text-slate-600">
                                        <span>Less</span>
                                        <div className="flex gap-1">
                                            <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
                                            <div className="w-3 h-3 rounded-sm bg-emerald-200"></div>
                                            <div className="w-3 h-3 rounded-sm bg-emerald-400"></div>
                                            <div className="w-3 h-3 rounded-sm bg-emerald-600"></div>
                                            <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
                                        </div>
                                        <span>More</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6">
                            <h2 className="text-section-title font-semibold text-slate-900 mb-4">Recent activity</h2>
                            <div className="space-y-4">
                                {[
                                    { action: "Created invoice", project: "Q4-2024-Report", time: "2 hours ago", type: "created" },
                                    { action: "Approved", project: "Client-Invoice-089", time: "5 hours ago", type: "approved" },
                                    { action: "Moved to review", project: "Monthly-Statement", time: "1 day ago", type: "review" },
                                    { action: "Locked invoice", project: "Final-Payment", time: "2 days ago", type: "locked" }
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            activity.type === "created" ? "bg-violet-100" :
                                            activity.type === "approved" ? "bg-emerald-100" :
                                            activity.type === "review" ? "bg-amber-100" :
                                            "bg-slate-100"
                                        }`}>
                                            <FileText className={`w-4 h-4 ${
                                                activity.type === "created" ? "text-violet-600" :
                                                activity.type === "approved" ? "text-emerald-600" :
                                                activity.type === "review" ? "text-amber-600" :
                                                "text-slate-600"
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-body text-slate-700">
                                                <span className="font-semibold">{activity.action}</span> in{" "}
                                                <span className="text-violet-600 font-medium">{activity.project}</span>
                                            </p>
                                            <p className="text-caption text-slate-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}
