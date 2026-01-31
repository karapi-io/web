import { GitBranch } from "lucide-react";
import type { InvoiceBranch } from "../../invoice-workflow/types/invoiceWorkflow";

interface BranchSelectorProps {
    branches: InvoiceBranch[];
    activeBranchId: string;
}

export default function BranchSelector({ branches, activeBranchId }: BranchSelectorProps) {
    return (
        <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="flex items-center gap-2 mb-3">
                <GitBranch size={16} className="text-slate-500" />
                <div>
                    <p className="text-sm font-semibold text-slate-900">Invoice Branch</p>
                    <p className="text-xs text-slate-500">Create variants for review</p>
                </div>
            </div>
            <div className="space-y-2">
                {branches.map((branch) => (
                    <div
                        key={branch.id}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 border ${branch.id === activeBranchId ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"
                            }`}
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-800">{branch.name}</p>
                            <p className="text-[11px] text-slate-500">Created by {branch.createdBy}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${branch.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                            }`}>
                            {branch.status}
                        </span>
                    </div>
                ))}
            </div>
            <button className="mt-3 w-full py-2 rounded-lg border border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
                Create new branch
            </button>
        </div>
    );
}
