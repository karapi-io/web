import { ArrowLeft, CheckCircle2, Lock, Settings } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getInvoiceProject, getInvoiceReview } from "../data/invoiceProjects";
import StageStepper from "../../components/invoice-workflow/StageStepper";
import ShareLinkCard from "../../components/invoice-workflow/ShareLinkCard";
import CollaboratorsPanel from "../../components/invoice-workflow/CollaboratorsPanel";
import ApprovalLevels from "../../components/invoice-workflow/ApprovalLevels";
import BranchSelector from "../../components/invoice-workflow/BranchSelector";
import { useAuth } from "../../hook/useAuth";

export default function InvoiceWorkspacePage() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { userEmail } = useAuth();
    const currentUsername = username || (userEmail ? userEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-') : 'pashant-karapi');
    
    // For now, mock project data - in real app, fetch by projectName
    const project = getInvoiceProject("1"); // TODO: fetch by projectName
    const review = project?.reviewId ? getInvoiceReview(project.reviewId) : undefined;

    if (!project) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm text-slate-500">Project not found.</p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-blue-600 text-sm font-semibold"
                    >
                        Back to projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <Link 
                    to={`/${currentUsername}/invoice-projects`}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft size={14} />
                    Back to projects
                </Link>

                <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Invoice Workspace</p>
                        <h1 className="text-3xl font-bold text-slate-900 mt-2">{project.name}</h1>
                        <p className="text-sm text-slate-500 mt-1">{project.clientName}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${project.visibility === "public" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"}`}>
                            {project.visibility}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            {project.createdVia === "api" ? "Created via API" : "Created manually"}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            Template: {project.template}
                        </span>
                    </div>
                </div>

                <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <StageStepper currentStage={project.stage} />
                </div>

                <div className="mt-8 grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Settings size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Draft workspace</p>
                                    <p className="text-xs text-slate-500">Edit invoice fields, line items, and branding.</p>
                                </div>
                            </div>
                            <div className="border border-dashed border-slate-200 rounded-xl p-5 bg-slate-50">
                                <p className="text-sm text-slate-600">
                                    This is a placeholder for the manual editor or API-triggered invoice data preview.
                                </p>
                                <p className="text-xs text-slate-500 mt-2">
                                    Integrate generator data once the Lambda backend is connected.
                                </p>
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <CheckCircle2 size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Review settings</p>
                                    <p className="text-xs text-slate-500">Invite reviewers and collect approvals.</p>
                                </div>
                            </div>

                            {review ? (
                                <div className="space-y-4">
                                    <ShareLinkCard label="Invoice review link" url={review.reviewLink} visibility={review.visibility} />
                                    <ApprovalLevels levels={project.approvalLevels} />
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500">No review configuration yet.</p>
                            )}
                        </div>

                        {project.stage === "locked" && (
                            <div className="border border-emerald-200 rounded-2xl p-6 bg-emerald-50">
                                <div className="flex items-center gap-3">
                                    <Lock size={18} className="text-emerald-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-emerald-900">Invoice locked</p>
                                        <p className="text-xs text-emerald-700">This invoice is ready for payment and cannot be edited.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <BranchSelector branches={project.branches} activeBranchId={project.branches[0]?.id ?? ""} />
                        <CollaboratorsPanel collaborators={project.collaborators} />
                        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
                            <p className="text-sm font-semibold text-slate-900 mb-2">Next actions</p>
                            <div className="space-y-3">
                                <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">
                                    Move to review
                                </button>
                                <button className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                                    Lock invoice
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-3">Actions are UI-only in this frontend build.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
