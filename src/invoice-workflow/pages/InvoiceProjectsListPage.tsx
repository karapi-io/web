import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Plus, Filter, Calendar, Building2, LayoutGrid, FileText, Search } from "lucide-react";
import { invoiceProjects } from "../data/invoiceProjects";
import { dashboardSpaces } from "../data/dashboard";
import UserProfileHeader from "../components/UserProfileHeader";

export default function InvoiceProjectsListPage() {
    const { username } = useParams<{ username: string }>();
    const [selectedSpace, setSelectedSpace] = useState<string>("all");
    const [selectedTemplate, setSelectedTemplate] = useState<string>("all");
    const [selectedCompany, setSelectedCompany] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const templates = ["Ecommerce", "Service", "Vintage", "Evergreen"];
    const companies = ["Acme Corp", "Tech Solutions", "Design Studio", "Startup Inc"];

    const totalItems = invoiceProjects.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProjects = invoiceProjects.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation Tabs */}
            <UserProfileHeader projectCount={totalItems} />
            
            {/* Page Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-page-title text-slate-900">Invoice Projects</h1>
                            <p className="text-body text-slate-600 mt-1">
                                {totalItems} projects • Page {currentPage} of {totalPages}
                            </p>
                        </div>
                        <Link
                            to="/new-project"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-body font-semibold hover:bg-slate-800 transition-colors"
                        >
                            <Plus size={16} />
                            New Project
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Filters & Actions Bar */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md rounded-lg border border-slate-200 bg-white px-3 py-2">
                            <Search size={16} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>

                        {/* Space Filter */}
                        <div className="flex items-center gap-2">
                            <LayoutGrid size={16} className="text-slate-500" />
                            <select
                                value={selectedSpace}
                                onChange={(e) => setSelectedSpace(e.target.value)}
                                className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-violet-300"
                            >
                                <option value="all">All Spaces</option>
                                {dashboardSpaces.map((space) => (
                                    <option key={space.id} value={space.id}>{space.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Template Filter */}
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-slate-500" />
                            <select
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-violet-300"
                            >
                                <option value="all">All Templates</option>
                                {templates.map((template) => (
                                    <option key={template} value={template}>{template}</option>
                                ))}
                            </select>
                        </div>

                        {/* Company Filter */}
                        <div className="flex items-center gap-2">
                            <Building2 size={16} className="text-slate-500" />
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-violet-300"
                            >
                                <option value="all">All Companies</option>
                                {companies.map((company) => (
                                    <option key={company} value={company}>{company}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date Filter */}
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <Calendar size={16} />
                            Date range
                        </button>

                        {/* More Filters */}
                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <Filter size={16} />
                            More filters
                        </button>
                    </div>

                    {/* Active Filters Display */}
                    {(selectedSpace !== "all" || selectedTemplate !== "all" || selectedCompany !== "all") && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                            <span className="text-xs text-slate-600">Active filters:</span>
                            {selectedSpace !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-violet-100 text-violet-700 text-xs font-medium">
                                    Space: {dashboardSpaces.find(s => s.id === selectedSpace)?.name}
                                    <button onClick={() => setSelectedSpace("all")} className="hover:text-violet-900">×</button>
                                </span>
                            )}
                            {selectedTemplate !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                                    Template: {selectedTemplate}
                                    <button onClick={() => setSelectedTemplate("all")} className="hover:text-blue-900">×</button>
                                </span>
                            )}
                            {selectedCompany !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium">
                                    Company: {selectedCompany}
                                    <button onClick={() => setSelectedCompany("all")} className="hover:text-emerald-900">×</button>
                                </span>
                            )}
                            <button 
                                onClick={() => {
                                    setSelectedSpace("all");
                                    setSelectedTemplate("all");
                                    setSelectedCompany("all");
                                }}
                                className="text-xs text-slate-600 hover:text-slate-900 underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Projects List */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    {currentProjects.map((project, index) => (
                        <Link
                            key={project.id}
                            to={`/${username}/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`group flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors ${
                                index !== currentProjects.length - 1 ? "border-b border-slate-200" : ""
                            }`}
                        >
                            {/* Project Icon & Name */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                    <h3 className="font-semibold text-violet-600 group-hover:text-violet-700 group-hover:underline truncate">
                                        {project.name}
                                    </h3>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${
                                        project.stage === "draft" 
                                            ? "bg-slate-50 text-slate-700 border-slate-200"
                                            : project.stage === "review"
                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    }`}>
                                        {project.stage}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-600">
                                    <span className="flex items-center gap-1.5">
                                        <Building2 size={12} />
                                        {project.clientName}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FileText size={12} />
                                        {project.template}
                                    </span>
                                    <span className={`px-1.5 py-0.5 rounded ${
                                        project.visibility === "public" 
                                            ? "bg-blue-100 text-blue-700" 
                                            : "bg-slate-100 text-slate-700"
                                    }`}>
                                        {project.visibility === "public" ? "Public" : "Private"}
                                    </span>
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="flex-shrink-0 text-right">
                                <p className="text-sm font-bold text-slate-900">{project.totalAmount}</p>
                                <p className="text-xs text-slate-500">Total</p>
                            </div>

                            {/* Updated Date */}
                            <div className="flex-shrink-0 text-right min-w-[100px]">
                                <p className="text-xs text-slate-600">
                                    Updated {new Date(project.updatedAt).toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-slate-600">
                            Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} projects
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                                            currentPage === page
                                                ? "bg-violet-600 text-white"
                                                : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
