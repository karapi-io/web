import { UserPlus } from "lucide-react";
import type { Collaborator } from "../../invoice-workflow/types/invoiceWorkflow";

interface CollaboratorsPanelProps {
    collaborators: Collaborator[];
}

export default function CollaboratorsPanel({ collaborators }: CollaboratorsPanelProps) {
    return (
        <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-sm font-semibold text-slate-900">Collaborators</p>
                    <p className="text-xs text-slate-500">Invite reviewers and editors</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition">
                    <UserPlus size={14} />
                    Invite
                </button>
            </div>
            <div className="space-y-2">
                {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                        <div>
                            <p className="text-sm font-medium text-slate-800">{collaborator.name}</p>
                            <p className="text-xs text-slate-500">{collaborator.role}</p>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                            {collaborator.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
