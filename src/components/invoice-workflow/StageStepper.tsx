import { CheckCircle2, Circle, Lock, MessageSquare } from "lucide-react";
import type { InvoiceStage } from "../../invoice-workflow/types/invoiceWorkflow";
import type { ReactElement } from "react";

const stageOrder: InvoiceStage[] = ["draft", "review", "locked"];
const stageLabels: Record<InvoiceStage, string> = {
    draft: "Draft",
    review: "Review",
    locked: "Locked"
};

const stageIcons: Record<InvoiceStage, ReactElement> = {
    draft: <Circle size={16} className="text-slate-400" />,
    review: <MessageSquare size={16} className="text-blue-600" />,
    locked: <Lock size={16} className="text-emerald-600" />
};

interface StageStepperProps {
    currentStage: InvoiceStage;
}

const getStageState = (stage: InvoiceStage, currentStage: InvoiceStage) => {
    const stageIndex = stageOrder.indexOf(stage);
    const currentIndex = stageOrder.indexOf(currentStage);
    if (stageIndex < currentIndex) return "complete";
    if (stageIndex === currentIndex) return "active";
    return "upcoming";
};

export default function StageStepper({ currentStage }: StageStepperProps) {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            {stageOrder.map((stage, index) => {
                const state = getStageState(stage, currentStage);
                return (
                    <div key={stage} className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border ${state === "complete"
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                    : state === "active"
                                        ? "bg-blue-50 border-blue-200 text-blue-600"
                                        : "bg-slate-50 border-slate-200 text-slate-400"
                                    }`}
                            >
                                {state === "complete" ? <CheckCircle2 size={16} className="text-emerald-600" /> : stageIcons[stage]}
                            </div>
                            <div>
                                <p className={`text-sm font-semibold ${state === "upcoming" ? "text-slate-400" : "text-slate-900"}`}>
                                    {stageLabels[stage]}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                    {stage === "draft" && "Prepare invoice"}
                                    {stage === "review" && "Collect approvals"}
                                    {stage === "locked" && "Ready for payment"}
                                </p>
                            </div>
                        </div>
                        {index < stageOrder.length - 1 && (
                            <div className="hidden md:block w-10 h-px bg-slate-200"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
