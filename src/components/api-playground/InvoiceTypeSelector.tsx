import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Receipt, FileText, ExternalLink, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { TemplatePreviewModal } from "./TemplatePreviewModal";
import type { Template, InvoiceType } from "../../types/api";

interface InvoiceTypeSelectorProps {
    selectedType: InvoiceType;
    onTypeChange: (type: InvoiceType) => void;
    selectedTemplateId: string;
    onTemplateChange: (templateId: string) => void;
    templates: Template[];
}

const invoiceTypes = [
    {
        id: "tax-invoice" as InvoiceType,
        name: "Tax Invoice (GST)",
        description: "For GST registered businesses with HSN codes, tax splits, and compliance",
        icon: Receipt,
    },
    {
        id: "bill-of-supply" as InvoiceType,
        name: "Bill of Supply",
        description: "For non-GST registered or exempt businesses",
        icon: FileText,
    },
];

export function InvoiceTypeSelector({
    selectedType,
    onTypeChange,
    selectedTemplateId,
    onTemplateChange,
    templates,
}: InvoiceTypeSelectorProps) {
    const [isTemplateOpen, setIsTemplateOpen] = useState(false);
    const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

    return (
        <>
            <div className="space-y-4">
                {/* Invoice Type */}
                <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                        Invoice Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {invoiceTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => onTypeChange(type.id)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${selectedType === type.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-muted-foreground/30"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <type.icon
                                        size={18}
                                        className={selectedType === type.id ? "text-primary" : "text-muted-foreground"}
                                    />
                                    {selectedType === type.id && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="ml-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                                        >
                                            <Check size={12} className="text-primary-foreground" />
                                        </motion.div>
                                    )}
                                </div>
                                <p className="text-sm font-medium text-foreground">{type.name}</p>
                                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                                    {type.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Template Selector */}
                <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                        Template Style
                    </label>

                    {/* Dropdown Trigger */}
                    <button
                        onClick={() => setIsTemplateOpen(!isTemplateOpen)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${isTemplateOpen ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                            }`}
                    >
                        <div className="w-12 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                            <img
                                src={selectedTemplate?.img}
                                alt={selectedTemplate?.name}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{selectedTemplate?.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                                {selectedTemplate?.description}
                            </p>
                            <div className="flex gap-1 mt-1.5">
                                {selectedTemplate?.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: isTemplateOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-muted-foreground"
                        >
                            <ChevronDown size={18} />
                        </motion.div>
                    </button>

                    {/* Dropdown Content */}
                    <AnimatePresence>
                        {isTemplateOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-2 p-2 rounded-xl border border-border bg-card space-y-1 max-h-[320px] overflow-y-auto scrollbar-thin">
                                    {templates.map((template) => (
                                        <div
                                            key={template.id}
                                            className={`p-3 rounded-lg transition-all flex items-start gap-3 group ${selectedTemplateId === template.id
                                                ? "bg-primary/10"
                                                : "hover:bg-muted"
                                                }`}
                                        >
                                            {/* Clickable thumbnail for preview */}
                                            <button
                                                onClick={() => setPreviewTemplateId(template.id)}
                                                className="w-10 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted relative group/thumb"
                                            >
                                                <img
                                                    src={template.img}
                                                    alt={template.name}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Eye size={14} className="text-foreground" />
                                                </div>
                                            </button>

                                            {/* Template info - clickable to select */}
                                            <button
                                                onClick={() => {
                                                    onTemplateChange(template.id);
                                                    setIsTemplateOpen(false);
                                                }}
                                                className="flex-1 min-w-0 text-left"
                                            >
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <p className="text-sm font-medium text-foreground">{template.title}</p>
                                                    {selectedTemplateId === template.id && (
                                                        <Check size={14} className="text-primary" />
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                                                    {template.description}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <div className="flex gap-1">
                                                        {template.tags.slice(0, 2).map((tag) => (
                                                            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </button>

                                            {/* Preview button */}
                                            <button
                                                onClick={() => setPreviewTemplateId(template.id)}
                                                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 transition-colors opacity-0 group-hover:opacity-100"
                                                title="Preview template"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* View All Link */}
                                    <Link
                                        to="/templates"
                                        className="flex items-center justify-center gap-2 w-full p-3 rounded-lg text-sm text-primary hover:bg-primary/5 transition-colors mt-2 border-t border-border"
                                    >
                                        <ExternalLink size={14} />
                                        View All Templates with Previews
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Preview Modal */}
            <TemplatePreviewModal
                templateId={previewTemplateId}
                onClose={() => setPreviewTemplateId(null)}
                onSelect={(id) => {
                    onTemplateChange(id);
                    setIsTemplateOpen(false);
                }}
                selectedTemplateId={selectedTemplateId}
                templates={templates}
            />
        </>
    );
}
