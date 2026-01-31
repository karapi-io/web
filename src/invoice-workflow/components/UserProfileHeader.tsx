import { Link, useParams, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

interface UserProfileHeaderProps {
    projectCount?: number;
}

export default function UserProfileHeader({ projectCount = 0 }: UserProfileHeaderProps) {
    const { username } = useParams<{ username: string }>();
    const location = useLocation();
    
    // Determine active tab based on URL
    const isProjectsPage = location.pathname.includes('/invoice-projects');

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-1">
                    <Link
                        to={`/${username}`}
                        className={`flex items-center gap-2 px-4 py-4 text-body font-semibold border-b-2 transition-colors ${
                            !isProjectsPage
                                ? "border-violet-600 text-slate-900"
                                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Overview
                    </Link>
                    <Link
                        to={`/${username}/invoice-projects`}
                        className={`flex items-center gap-2 px-4 py-4 text-body font-semibold border-b-2 transition-colors ${
                            isProjectsPage
                                ? "border-violet-600 text-slate-900"
                                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                        }`}
                    >
                        <FileText className="w-4 h-4" />
                        Invoice Projects
                        {projectCount > 0 && (
                            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-caption font-medium">
                                {projectCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}
