import { MessageSquare, CheckCircle2 } from "lucide-react";
import type { ReviewComment } from "../../invoice-workflow/types/invoiceWorkflow";

interface ReviewCommentsProps {
    comments: ReviewComment[];
}

export default function ReviewComments({ comments }: ReviewCommentsProps) {
    return (
        <div className="space-y-3">
            {comments.map((comment) => (
                <div key={comment.id} className="border border-slate-200 rounded-xl p-4 bg-white">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${comment.status === "resolved" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                                {comment.status === "resolved" ? <CheckCircle2 size={16} /> : <MessageSquare size={16} />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{comment.author}</p>
                                <p className="text-xs text-slate-500">{comment.lineRef}</p>
                            </div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${comment.status === "resolved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                            {comment.status === "resolved" ? "Resolved" : "Open"}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-3">{comment.message}</p>
                    <p className="text-[10px] text-slate-400 mt-2">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}
