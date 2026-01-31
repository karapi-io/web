import { CheckCircle2, Clock3, AlertTriangle } from "lucide-react";
import type { ApprovalLevel } from "../../invoice-workflow/types/invoiceWorkflow";
import type { ReactElement } from "react";

const statusStyles: Record<ApprovalLevel["status"], { label: string; className: string; icon: ReactElement }> = {
    pending: {
        label: "Pending",
        className: "bg-amber-50 text-amber-700",
        icon: <Clock3 size={14} className="text-amber-600" />
    },
    approved: {
        label: "Approved",
        className: "bg-emerald-50 text-emerald-700",
        icon: <CheckCircle2 size={14} className="text-emerald-600" />
    },
    changes_requested: {
        label: "Changes",
        className: "bg-red-50 text-red-700",
        icon: <AlertTriangle size={14} className="text-red-600" />
    }
};

interface ApprovalLevelsProps {
    levels: ApprovalLevel[];
}

export default function ApprovalLevels({ levels }: ApprovalLevelsProps) {
    return (
        <div className="space-y-3">
            {levels.map((level) => {
                const status = statusStyles[level.status];
                return (
                    <div key={level.id} className="border border-slate-200 rounded-xl p-4 bg-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{level.label}</p>
                                <p className="text-xs text-slate-500">Requires {level.requiredApprovals} approval(s)</p>
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 ${status.className}`}>
                                {status.icon}
                                {status.label}
                            </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {level.reviewers.map((reviewer) => (
                                <span key={reviewer.id} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                                    {reviewer.name}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
