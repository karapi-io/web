import { motion, AnimatePresence } from "framer-motion";
import { FileText, Link, AlertCircle, Loader2, Download, ExternalLink, Copy, Check } from "lucide-react";
import { useState, useMemo } from "react";

interface OutputPreviewProps {
    isLoading: boolean;
    error: string | null;
    response: {
        type: "binary" | "html" | "json";
        mimeType?: string;
        encoding?: string;
        data?: string;
        url?: string;
        html?: string;
        json?: any;
    } | null;
}

// Convert comma-separated number string to base64 data URL
function convertBinaryData(data: string, mimeType: string = "application/pdf"): string {
    const numbers = data.split(",").map(n => parseInt(n.trim(), 10));
    const bytes = new Uint8Array(numbers);
    const blob = new Blob([bytes], { type: mimeType });
    return URL.createObjectURL(blob);
}

// Convert HTML string data to iframe-ready content
function convertHtmlData(data: string): string {
    return data;
}

export function OutputPreview({ isLoading, error, response }: OutputPreviewProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        if (response?.type === "json" && response.json?.url) {
            await navigator.clipboard.writeText(response.json.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="h-full flex flex-col bg-muted/30 relative">
            {/* Status Bar */}
            <div className="absolute top-4 right-4 z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated border border-border shadow-sm text-xs font-medium">
                    <div className={`w-2 h-2 rounded-full ${isLoading ? "bg-warning animate-pulse" :
                        error ? "bg-destructive" :
                            response ? "bg-success" :
                                "bg-muted-foreground"
                        }`} />
                    <span className="text-muted-foreground">
                        {isLoading ? "Processing..." :
                            error ? "Error" :
                                response ? `${response.type.toUpperCase()} Ready` :
                                    "Awaiting request"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-6">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <LoadingState key="loading" />
                    ) : error ? (
                        <ErrorState key="error" message={error} />
                    ) : response ? (
                        <ResponseView key="response" response={response} copied={copied} onCopy={handleCopyLink} />
                    ) : (
                        <EmptyState key="empty" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function LoadingState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-6"
        >
            <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-[-4px] rounded-2xl border border-primary/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            </div>
            <div className="text-center">
                <p className="font-semibold text-foreground mb-1">Generating Invoice</p>
                <p className="text-sm text-muted-foreground">Processing your request...</p>
            </div>
            {/* Progress bar */}
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}

function ErrorState({ message }: { message: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md w-full"
        >
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="text-destructive" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Request Failed</h3>
                <p className="text-sm text-muted-foreground break-words">{message}</p>
            </div>
        </motion.div>
    );
}

function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-center"
        >
            <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border/50 relative"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <FileText size={32} className="text-muted-foreground/50" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/20 animate-pulse" />
            </motion.div>
            <div>
                <p className="font-medium text-foreground">Output Preview</p>
                <p className="text-sm text-muted-foreground/70">Generate an invoice to see the result</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 animate-pulse" />
                <span>Waiting for request</span>
            </div>
        </motion.div>
    );
}

function ResponseView({
    response,
    copied,
    onCopy
}: {
    response: NonNullable<OutputPreviewProps["response"]>;
    copied: boolean;
    onCopy: () => void;
}) {
    // Convert binary data to blob URL
    const binaryUrl = useMemo(() => {
        if (response.type === "binary" && response.data) {
            return convertBinaryData(response.data, response.mimeType);
        }
        return response.url;
    }, [response]);

    // Convert HTML data
    const htmlContent = useMemo(() => {
        if (response.type === "html" && response.data) {
            return convertHtmlData(response.data);
        }
        return response.html;
    }, [response]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full flex flex-col"
        >
            {response.type === "binary" && binaryUrl && (
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex-1 rounded-xl border border-border overflow-hidden bg-surface-elevated shadow-lg">
                        <iframe src={binaryUrl} className="w-full h-full" title="PDF Preview" />
                    </div>
                    <div className="flex justify-center">
                        <a
                            href={binaryUrl}
                            download="invoice.pdf"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                        >
                            <Download size={16} />
                            Download PDF
                        </a>
                    </div>
                </div>
            )}

            {response.type === "html" && htmlContent && (
                <div className="flex-1 rounded-xl border border-border overflow-hidden bg-surface-elevated shadow-lg">
                    <iframe srcDoc={htmlContent} className="w-full h-full bg-white" title="HTML Preview" />
                </div>
            )}

            {response.type === "json" && response.json && (
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center">
                        <Link size={32} className="text-success" />
                    </div>
                    <div className="text-center max-w-md">
                        <h3 className="font-semibold text-foreground mb-2">Invoice Link Generated</h3>
                        <p className="text-sm text-muted-foreground mb-4">Your invoice is hosted and ready to share</p>

                        <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                            <code className="flex-1 text-sm font-mono text-foreground truncate">
                                {response.json.url || JSON.stringify(response.json)}
                            </code>
                            <button
                                onClick={onCopy}
                                className="p-2 rounded-md hover:bg-surface-elevated transition-colors"
                            >
                                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-muted-foreground" />}
                            </button>
                        </div>

                        {response.json.url && (
                            <a
                                href={response.json.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
                            >
                                Open in new tab <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
