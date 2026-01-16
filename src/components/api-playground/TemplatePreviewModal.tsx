import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import type { Template } from "../../types/api";

interface TemplatePreviewModalProps {
    templateId: string | null;
    onClose: () => void;
    onSelect: (templateId: string) => void;
    selectedTemplateId: string;
    templates: Template[];
}

export function TemplatePreviewModal({
    templateId,
    onClose,
    onSelect,
    selectedTemplateId,
    templates,
}: TemplatePreviewModalProps) {
    const template = templates.find((t) => t.id === templateId);

    if (!template) return null;

    const isSelected = selectedTemplateId === templateId;

    return (
        <AnimatePresence>
            {templateId && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[90vh] overflow-hidden"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                            {/* Preview Image */}
                            <div className="md:w-1/2 bg-gradient-to-br from-muted/50 to-muted p-6 flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="relative"
                                >
                                    <img
                                        src={template.img}
                                        alt={`${template.name} invoice template preview`}
                                        className="max-h-[60vh] w-auto rounded-lg shadow-2xl"
                                    />
                                    {template.badge && (
                                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                                            {template.badge}
                                        </span>
                                    )}
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <X size={20} />
                                </button>

                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-foreground mb-2">{template.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed">{template.description}</p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Best For</p>
                                    <div className="flex flex-wrap gap-2">
                                        {template.tags.map((tag) => (
                                            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-sm text-muted-foreground">
                                                <Check size={14} className="text-primary" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex-1 mb-6">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Template Features</p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" />Professional layout optimized for print & digital</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" />Automatic tax calculations & breakdowns</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" />Custom branding with logo support</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" />QR code for easy payment</li>
                                    </ul>
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors">Cancel</button>
                                    <button
                                        onClick={() => { onSelect(template.id); onClose(); }}
                                        disabled={isSelected}
                                        className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${isSelected ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                                    >
                                        {isSelected ? (<><Check size={18} /> Selected</>) : (<>Use Template <ArrowRight size={18} /></>)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
