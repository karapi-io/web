import { motion } from "framer-motion";
import { ChevronRight, Copy, Check, ExternalLink, ArrowRight, CheckCircle2, XCircle, AlertTriangle, Zap, Key, Code, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { SchemaField, Template, OutputFormat } from "../../types/api";

interface DocumentationProps {
    endpoint: string;
    outputFormats: OutputFormat[];
    templates: Template[];
    schema: SchemaField[];
    apiKeyUrl: string;
    versionId: string;
}

export function Documentation({
    endpoint,
    outputFormats,
    templates,
    schema,
    apiKeyUrl,
    versionId
}: DocumentationProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyEndpoint = async () => {
        await navigator.clipboard.writeText(endpoint);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="max-w-4xl mx-auto p-8 lg:p-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <h1 className="text-4xl font-bold text-foreground">
                            Invoice Generation API
                        </h1>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
                            {versionId}
                        </span>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        Generate professional GST-compliant invoices programmatically.
                        Support for Tax Invoices, Bill of Supply, and more.
                    </p>
                </motion.div>

                {/* Getting Started */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mb-12"
                >
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <ChevronRight size={20} className="text-primary" />
                        Getting Started
                    </h2>

                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 mb-6">
                        <p className="text-muted-foreground mb-4">
                            Start generating invoices in under 2 minutes. Follow these quick steps:
                        </p>

                        {/* Steps */}
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    1
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Key size={16} className="text-primary" />
                                        <h3 className="font-medium text-foreground">Get your API Key</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Sign up for free and get your API key from the dashboard.{" "}
                                        <a href={apiKeyUrl} className="text-primary hover:underline">Get API Key →</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    2
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Code size={16} className="text-primary" />
                                        <h3 className="font-medium text-foreground">Make your first request</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Send a POST request with your invoice data. See the example below.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    3
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileText size={16} className="text-primary" />
                                        <h3 className="font-medium text-foreground">Get your invoice</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Receive your invoice as PDF, HTML, or a hosted link. That's it!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Example */}
                    <div className="bg-code-bg rounded-xl overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-border/30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-warning" />
                                <span className="text-xs text-muted-foreground font-medium">Quick Example</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono">cURL</span>
                        </div>
                        <pre className="p-4 text-sm font-mono text-code-foreground overflow-x-auto">
                            {`curl -X POST ${endpoint} \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "template": "corporate",
    "invoice": {
      "invoiceNumber": "INV-001",
      "date": "2026-01-14",
      "seller": { "name": "Your Company" },
      "client": { "name": "Client Name" },
      "items": [{ "description": "Service", "rate": 1000, "quantity": 1 }]
    }
  }'`}
                        </pre>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 flex items-center gap-4">
                        <Link
                            to="/?template=corporate"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                            Try in Playground <ArrowRight size={14} />
                        </Link>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            View full documentation ↓
                        </a>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <ChevronRight size={20} className="text-primary" />
                        Endpoint
                    </h2>
                    <div className="bg-muted rounded-xl p-4 flex items-center gap-4 group">
                        <span className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase">
                            POST
                        </span>
                        <code className="flex-1 font-mono text-sm text-foreground">{endpoint}</code>
                        <button
                            onClick={handleCopyEndpoint}
                            className="p-2 rounded-lg hover:bg-surface-elevated transition-colors text-muted-foreground hover:text-foreground"
                        >
                            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                        </button>
                    </div>
                </motion.section>

                {/* Authentication */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mb-12"
                >
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <ChevronRight size={20} className="text-primary" />
                        Authentication
                    </h2>
                    <div className="bg-muted/50 rounded-xl p-6 border border-border">
                        <p className="text-muted-foreground mb-4">
                            All requests must include your API key in the headers:
                        </p>
                        <div className="bg-code-bg rounded-lg p-4 mb-4">
                            <code className="text-sm font-mono text-code-foreground">
                                <span className="text-success">x-api-key</span>: your_api_key_here
                            </code>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-border">
                            <span className="text-sm text-muted-foreground">Don't have an API key?</span>
                            <a
                                href={apiKeyUrl}
                                className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                            >
                                Get your free API key <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </motion.section>

                {/* Output Formats */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <ChevronRight size={20} className="text-primary" />
                        Output Formats
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {outputFormats.map((format) => (
                            <div
                                key={format.id}
                                className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <code className="px-2 py-1 rounded bg-primary/10 text-primary text-sm font-mono font-medium">
                                        {format.id}
                                    </code>
                                    <span className="text-xs text-muted-foreground">
                                        {format.id === "binary" && "(Default)"}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{format.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Templates Reference */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <ChevronRight size={20} className="text-primary" />
                            Available Templates
                        </h2>
                        <Link
                            to="/templates"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                            View All <ExternalLink size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {templates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * index }}
                                className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors group"
                            >
                                <div className="flex gap-4 p-4">
                                    {/* Mini Preview */}
                                    <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                        <img
                                            src={template.img}
                                            alt={template.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-foreground mb-1">{template.title}</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{template.description}</p>
                                    </div>
                                </div>

                                <div className="px-4 pb-4">
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {template.tags.map((tag) => (
                                            <code key={tag} className="text-[10px] px-2 py-1 rounded bg-muted text-muted-foreground">
                                                {tag}
                                            </code>
                                        ))}
                                    </div>

                                    <Link
                                        to={`/?template=${template.id}`}
                                        className="w-full py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                                    >
                                        Try in Playground <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Schema Reference */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                        <ChevronRight size={20} className="text-primary" />
                        Request Schema
                    </h2>

                    <div className="space-y-4">
                        {schema.map((field, index) => (
                            <SchemaSection key={field.field} field={field} index={index} />
                        ))}
                    </div>
                </motion.section>

                {/* Response Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mb-12"
                >
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                        <ChevronRight size={20} className="text-primary" />
                        Response
                    </h2>

                    {/* Success Response */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-success" />
                            Success Response
                        </h3>
                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-3">
                                <span className="px-2 py-1 rounded bg-success/10 text-success text-xs font-bold">200</span>
                                <span className="text-sm text-muted-foreground">OK</span>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Response varies based on the <code className="text-primary">output</code> parameter:
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                        <code className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-mono">binary</code>
                                        <div>
                                            <p className="text-sm text-foreground font-medium">PDF File</p>
                                            <p className="text-xs text-muted-foreground">Returns binary PDF data with <code>Content-Type: application/pdf</code></p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                        <code className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-mono">html</code>
                                        <div>
                                            <p className="text-sm text-foreground font-medium">HTML String</p>
                                            <p className="text-xs text-muted-foreground">Returns rendered HTML with <code>Content-Type: text/html</code></p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                        <code className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-mono">link</code>
                                        <div>
                                            <p className="text-sm text-foreground font-medium">JSON with URL</p>
                                            <p className="text-xs text-muted-foreground">Returns hosted invoice URL</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 bg-code-bg rounded-lg p-4">
                                    <p className="text-xs text-muted-foreground mb-2">Example response for <code className="text-primary">output: "link"</code></p>
                                    <pre className="text-sm font-mono text-code-foreground">
                                        {`{
  "success": true,
  "url": "https://cdn.karapi.io/invoices/inv_abc123.pdf",
  "invoiceId": "inv_abc123",
  "expiresAt": "2026-02-14T00:00:00Z"
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Codes */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <XCircle size={16} className="text-destructive" />
                            Error Codes
                        </h3>
                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Code</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <ErrorCodeRow code={400} status="Bad Request" description="Invalid request payload. Check required fields and data types." />
                                    <ErrorCodeRow code={401} status="Unauthorized" description="Missing or invalid API key. Ensure x-api-key header is set." />
                                    <ErrorCodeRow code={403} status="Forbidden" description="API key doesn't have permission for this operation." />
                                    <ErrorCodeRow code={404} status="Not Found" description="Invalid template ID or resource not found." />
                                    <ErrorCodeRow code={422} status="Unprocessable Entity" description="Validation failed. Check invoice data for errors." />
                                    <ErrorCodeRow code={429} status="Too Many Requests" description="Rate limit exceeded. Please slow down requests." />
                                    <ErrorCodeRow code={500} status="Internal Server Error" description="Server error. Please try again or contact support." />
                                    <ErrorCodeRow code={503} status="Service Unavailable" description="Service temporarily unavailable. Please try again later." />
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Error Response Format */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-warning" />
                            Error Response Format
                        </h3>
                        <div className="bg-code-bg rounded-xl p-4">
                            <pre className="text-sm font-mono text-code-foreground">
                                {`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invoice number is required",
    "field": "invoice.invoiceNumber",
    "details": {
      "expected": "string",
      "received": "undefined"
    }
  }
}`}
                            </pre>
                        </div>
                    </div>
                </motion.section>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 pt-8 border-t border-border text-center"
                >
                    <p className="text-sm text-muted-foreground">
                        Need help? Contact us at{" "}
                        <a href="mailto:support@karapi.io" className="text-primary hover:underline">
                            support@karapi.io
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

function SchemaSection({ field, index }: { field: SchemaField; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = field.children && field.children.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="bg-card rounded-xl border border-border overflow-hidden"
        >
            {/* Field Header */}
            <div
                className={`p-4 flex items-start gap-4 ${hasChildren ? "cursor-pointer hover:bg-muted/50" : ""}`}
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <code className="text-sm font-mono font-medium text-foreground">{field.field}</code>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                            {field.type}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${field.required
                            ? "bg-destructive/10 text-destructive"
                            : "bg-muted text-muted-foreground"
                            }`}>
                            {field.required ? "Required" : "Optional"}
                        </span>
                        {field.default && (
                            <span className="text-xs text-muted-foreground">
                                Default: <code className="text-primary">{field.default}</code>
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{field.description}</p>
                </div>

                {hasChildren && (
                    <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        className="text-muted-foreground mt-1"
                    >
                        <ChevronRight size={18} />
                    </motion.div>
                )}
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border bg-muted/30"
                >
                    <div className="p-4 pl-8 space-y-3">
                        {field.children!.map((child) => (
                            <div key={child.field} className="flex items-start gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <code className="text-xs font-mono text-foreground">{child.field}</code>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                                            {child.type}
                                        </span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${child.required
                                            ? "bg-destructive/10 text-destructive"
                                            : "bg-muted text-muted-foreground"
                                            }`}>
                                            {child.required ? "Required" : "Optional"}
                                        </span>
                                        {child.default && (
                                            <span className="text-[10px] text-muted-foreground">
                                                Default: <code className="text-primary">{child.default}</code>
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">{child.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

function ErrorCodeRow({ code, status, description }: { code: number; status: string; description: string }) {
    const getCodeColor = (code: number) => {
        if (code >= 500) return "bg-destructive/10 text-destructive";
        if (code >= 400) return "bg-warning/10 text-warning";
        return "bg-muted text-muted-foreground";
    };

    return (
        <tr className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs font-bold font-mono ${getCodeColor(code)}`}>
                    {code}
                </span>
            </td>
            <td className="px-4 py-3 text-sm font-medium text-foreground">{status}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{description}</td>
        </tr>
    );
}
