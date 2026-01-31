import { ArrowLeft, CheckCircle2, MessageSquare, ShieldAlert, UserCircle } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getInvoiceProject, getInvoiceReview } from "../data/invoiceProjects";
import ReviewComments from "../../components/invoice-workflow/ReviewComments";
import ApprovalLevels from "../../components/invoice-workflow/ApprovalLevels";
import { useAuth } from "../../hook/useAuth";

export default function InvoiceReviewPage() {
    const { username, projectName, reviewId } = useParams();
    const navigate = useNavigate();
    const { userEmail } = useAuth();
    const currentUsername = username || (userEmail ? userEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-') : 'pashant-karapi');
    
    // For now, mock project data - in real app, fetch by projectName
    const project = getInvoiceProject("1"); // TODO: fetch by projectName
    const review = reviewId ? getInvoiceReview(reviewId) : undefined;

    if (!project || !review) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm text-slate-500">Review not found.</p>
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
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Link 
                        to={`/${currentUsername}/${projectName || project.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                    >
                        <ArrowLeft size={14} />
                        Back to workspace
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <UserCircle size={14} />
                        {review.visibility === "public"
                            ? "Public review — anyone with link can comment"
                            : "Private review — only invited reviewers"}
                    </div>
                </div>

                <div className="mt-6">
                    <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
                    <p className="text-sm text-slate-500 mt-1">{project.clientName}</p>
                </div>

                <div className="mt-8 grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <MessageSquare size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Invoice preview</p>
                                    <p className="text-xs text-slate-500">PDF preview and annotations</p>
                                </div>
                            </div>
                            <div className="border border-dashed border-slate-200 rounded-xl bg-slate-50 h-[420px] flex items-center justify-center text-sm text-slate-500">
                                PDF preview placeholder
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Review comments</p>
                                    <p className="text-xs text-slate-500">Line-by-line feedback</p>
                                </div>
                                <button className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                                    Add comment
                                </button>
                            </div>
                            <ReviewComments comments={review.comments} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm p-5">
                            <p className="text-sm font-semibold text-slate-900 mb-2">Approval status</p>
                            <ApprovalLevels levels={review.approvals} />
                        </div>
                        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm p-5 space-y-3">
                            <p className="text-sm font-semibold text-slate-900">Reviewer actions</p>
                            <button className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                                <CheckCircle2 size={16} />
                                Approve invoice
                            </button>
                            <button className="w-full px-4 py-2 rounded-lg border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-2">
                                <ShieldAlert size={16} />
                                Request changes
                            </button>
                            <p className="text-xs text-slate-500">Actions are UI-only in this frontend build.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
