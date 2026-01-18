import { motion } from "framer-motion";
import { ChevronRight, Copy, Check, ExternalLink, ArrowRight, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Zap, Key, Code, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { SchemaField, Template, OutputFormat } from "../../types/api";
import type { DocSection } from "./Sidebar";
import SEO from "../Seo";

interface DocumentationProps {
    endpoint: string;
    outputFormats: OutputFormat[];
    templates: Template[];
    schema: SchemaField[];
    apiKeyUrl: string;
    versionId: string;
    activeSection?: DocSection;
    onSectionChange?: (section: DocSection) => void;
}

const sectionOrder: DocSection[] = [
    "getting-started",
    "authentication",
    "gst-invoice-api",
    "bill-of-supply",
    "templates",
    "responses"
];

const sectionMeta: Record<DocSection, { title: string; description: string }> = {
    "getting-started": { title: "Getting Started with KarAPI", description: "Quick start guide to generate your first invoice" },
    "authentication": { title: "Authentication", description: "Learn how to authenticate API requests" },
    "gst-invoice-api": { title: "GST Invoice API", description: "Complete schema reference for tax invoices" },
    "bill-of-supply": { title: "Bill of Supply", description: "Structure for non-GST registered businesses" },
    "templates": { title: "Templates", description: "Browse available invoice templates" },
    "responses": { title: "Responses", description: "API response formats and error codes" },
};

export function Documentation({
    endpoint,
    outputFormats,
    templates,
    schema,
    apiKeyUrl,
    versionId,
    activeSection = "getting-started",
    onSectionChange
}: DocumentationProps) {
    // const [copied, setCopied] = useState(false);

    const currentIndex = sectionOrder.indexOf(activeSection);
    const prevSection = currentIndex > 0 ? sectionOrder[currentIndex - 1] : null;
    const nextSection = currentIndex < sectionOrder.length - 1 ? sectionOrder[currentIndex + 1] : null;

    // const handleCopyEndpoint = async () => {
    //     await navigator.clipboard.writeText(endpoint);
    //     setCopied(true);
    //     setTimeout(() => setCopied(false), 2000);
    // };

    // const handleCopy = async (text: string) => {
    //     await navigator.clipboard.writeText(text);
    //     setCopied(true);
    //     setTimeout(() => setCopied(false), 2000);
    // };

    const renderSection = () => {
        switch (activeSection) {
            case "getting-started":
                return <GettingStartedSection endpoint={endpoint} apiKeyUrl={apiKeyUrl} />;
            case "authentication":
                return <AuthenticationSection apiKeyUrl={apiKeyUrl} />;
            case "gst-invoice-api":
                return <GstPayloadSection schema={schema} />;
            case "bill-of-supply":
                return <BillOfSupplySection />;
            case "templates":
                return <TemplatesSection templates={templates} />;
            case "responses":
                return <ResponsesSection outputFormats={outputFormats} />;
            default:
                return <GettingStartedSection endpoint={endpoint} apiKeyUrl={apiKeyUrl} />;
        }
    };

    return (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="max-w-4xl mx-auto p-8 lg:p-12">
                {/* Header */}
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <h1 className="text-4xl font-bold text-foreground">
                            {sectionMeta[activeSection].title}
                        </h1>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
                            {versionId}
                        </span>
                    </div>
                </motion.div>

                {/* Dynamic Section Content */}
                <motion.div
                    key={activeSection + "-content"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                >
                    {renderSection()}
                </motion.div>

                {/* Next/Prev Navigation */}
                <div className="mt-16 pt-8 border-t border-border">
                    <div className="flex items-stretch gap-4">
                        {/* Previous */}
                        {prevSection ? (
                            <button
                                onClick={() => onSectionChange?.(prevSection)}
                                className="flex-1 group p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-muted/50 transition-all text-left"
                            >
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                    <ArrowLeft size={12} />
                                    <span>Previous</span>
                                </div>
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {sectionMeta[prevSection].title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                    {sectionMeta[prevSection].description}
                                </p>
                            </button>
                        ) : (
                            <div className="flex-1" />
                        )}

                        {/* Next */}
                        {nextSection ? (
                            <button
                                onClick={() => onSectionChange?.(nextSection)}
                                className="flex-1 group p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-muted/50 transition-all text-right"
                            >
                                <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-1">
                                    <span>Next</span>
                                    <ArrowRight size={12} />
                                </div>
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {sectionMeta[nextSection].title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                    {sectionMeta[nextSection].description}
                                </p>
                            </button>
                        ) : (
                            <div className="flex-1" />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 pt-8 border-t border-border text-center"
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

// ============= Section Components =============

function GettingStartedSection({ endpoint, apiKeyUrl }: { endpoint: string; apiKeyUrl: string }) {
    return (

        <div className="space-y-8">
            <SEO
                title="Getting Started with KarAPI (v1) – GST Invoice API Documentation"
                description="Start using KarAPI in minutes. Learn how to get your API key, send your first request, and generate GST-compliant invoices as PDF, HTML, or hosted links."
                keywords="getting started with gst invoice api, karapi docs, gst invoice api quickstart, generate gst invoice programmatically, invoice api india, pdf invoice api"
                url="https://karapi.io/api-docs/v1/getting-started"
                image="https://karapi.io/karapi-logo.png"
            />


            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Generate professional GST-compliant invoices programmatically using KarAPI.
                Start integrating in under 2 minutes with our simple REST API.
            </p>

            <div className="bg-muted/40 rounded-xl p-5 border border-border/40">
                <h3 className="font-semibold text-foreground mb-2">What is KarAPI?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    KarAPI is a developer-first API for generating GST-compliant invoices in India.
                    It handles GST calculations, formatting, PDF rendering, QR codes, and templates —
                    so you don’t have to build a PDF engine from scratch.
                </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                    What you can generate
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <li>✅ GST Invoices (CGST, SGST, IGST)</li>
                    <li>✅ Bill of Supply</li>
                    <li>✅ PDF invoices</li>
                    <li>✅ HTML | Binary output</li>
                    <li>✅ Hosted invoice links</li>
                    <li>✅ QR payment invoices</li>
                </ul>
            </div>


            {/* Steps */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                <p className="text-muted-foreground mb-4">
                    Follow these quick steps to get started:
                </p>

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

            <div className="bg-warning/5 border border-warning/20 rounded-xl p-5">
                <h4 className="font-medium text-foreground mb-1">Authentication Required</h4>
                <p className="text-sm text-muted-foreground">
                    All API requests must include your API key in the <code className="font-mono">x-api-key</code> header.
                    Learn more about authentication →
                    <Link to="/api-docs/v1/authentication" className="text-primary hover:underline ml-1">
                        Authentication Docs
                    </Link>
                </p>
            </div>


            {/* Quick Example */}
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-primary" />
                    Quick Example
                </h3>
                <div className="bg-code-bg rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-border/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-warning" />
                            <span className="text-xs text-muted-foreground font-medium">cURL Request</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">bash</span>
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
            </div>

            <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                    What the response looks like
                </h3>

                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>📄 PDF binary (for download or email)</li>
                    <li>🌐 Hosted invoice URL</li>
                    <li>🧾 JSON metadata</li>
                </ul>
            </div>


            {/* CTA */}
            <div className="flex items-center gap-4">
                <Link
                    to="/playground"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    Try in Playground <ArrowRight size={14} />
                </Link>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
                <h4 className="font-medium text-foreground mb-1">Error Handling</h4>
                <p className="text-sm text-muted-foreground">
                    If something goes wrong, KarAPI returns structured error responses with a
                    message, code, and request ID.
                    Learn more →
                    <Link to="/api-docs/v1/errors" className="text-primary hover:underline ml-1">
                        Error Documentation
                    </Link>
                </p>
            </div>
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    Next steps
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                    <Link to="/api-docs/v1/authentication" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                        🔐 Authentication
                        <p className="text-xs text-muted-foreground mt-1">How API keys work</p>
                    </Link>

                    <Link to="/api-docs/v1/gst-invoice-api" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                        🧾 GST Invoice API
                        <p className="text-xs text-muted-foreground mt-1">Full endpoint reference</p>
                    </Link>

                    <Link to="/api-docs/v1/bill-of-supply-api" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                        📄 Bill of Supply API
                        <p className="text-xs text-muted-foreground mt-1">Non-GST invoices</p>
                    </Link>

                    <Link to="/api-docs/v1/examples/nodejs" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                        💻 Node.js Examples
                        <p className="text-xs text-muted-foreground mt-1">Copy-paste ready code</p>
                    </Link>
                </div>
            </div>

        </div>
    );
}

function AuthenticationSection({ apiKeyUrl }: { apiKeyUrl: string }) {
    console.log("apiKeyUrl:", apiKeyUrl);
    const [copied, setCopied] = useState(false);

    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-10">
            <SEO
                title="Authentication – KarAPI (v1) | GST Invoice API Documentation"
                description="Learn how to authenticate requests to KarAPI using API keys. Understand required headers, security best practices, and see example requests."
                keywords="karapi authentication, gst invoice api authentication, api key authentication, x-api-key header, secure invoice api, karapi docs"
                url="https://karapi.io/api-docs/v1/authentication"
                image="https://karapi.io/karapi-logo.png"
            />

            {/* Intro */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                All API requests to KarAPI must be authenticated using an API key. This key
                identifies your application and allows us to securely process your requests.
            </p>

            {/* How to get API Key */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                    How to get your API key
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Create a free KarAPI account</li>
                    <li>Generate a new API key</li>
                    <li>Copy and store it securely</li>
                </ol>

                <div className="mt-4">
                    <a
                        href="/get-api-key"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                    >
                        Get your free API key <ArrowRight size={14} />
                    </a>
                </div>
            </div>

            {/* Required Header */}
            <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                    Required Header
                </h3>

                <div className="bg-code-bg rounded-lg p-4 mb-4 flex items-center justify-between">
                    <code className="text-sm font-mono text-code-foreground">
                        <span className="text-success">x-api-key</span>: your_api_key_here
                    </code>
                    <button
                        onClick={() => handleCopy("x-api-key: your_api_key_here")}
                        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                        {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    </button>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                        Don't have an API key?
                    </span>
                    <a
                        href="/get-api-key"
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                    >
                        Get your free API key <ArrowRight size={14} />
                    </a>
                </div>
            </div>

            {/* Example Request */}
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-primary" />
                    Example Request with Authentication
                </h3>

                <div className="bg-code-bg rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-border/30 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-medium">
                            JavaScript (fetch)
                        </span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-code-foreground overflow-x-auto">
                        {`const response = await fetch('https://api.karapi.io/invoice/v1/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY'  // Required
  },
  body: JSON.stringify({
    template: 'corporate',
    invoice: { /* your data */ }
  })
});`}
                    </pre>
                </div>
            </div>

            {/* Where to use API Key */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                    Where should I use my API key?
                </h3>
                <p className="text-sm text-muted-foreground max-w-2xl">
                    Your API key should only be used in server-side applications such as Node.js,
                    backend services, or serverless functions. Do not expose your API key in
                    frontend JavaScript, mobile apps, or public repositories.
                </p>
            </div>

            {/* Authentication Errors */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                    Authentication errors
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>401 Unauthorized</strong> – Missing or invalid API key</li>
                    <li><strong>403 Forbidden</strong> – API key does not have access</li>
                    <li><strong>429 Too Many Requests</strong> – Rate limit exceeded</li>
                </ul>

                <p className="text-sm text-muted-foreground mt-3">
                    Learn more about error responses →
                    <Link to="/api-docs/v1/errors" className="text-primary hover:underline ml-1">
                        Error documentation
                    </Link>
                </p>
            </div>

            {/* Security Best Practices */}
            <div className="bg-warning/5 border border-warning/20 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-warning" />
                    Security Best Practices
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                        Never expose your API key in client-side code
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                        Store your API key using environment variables
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                        Rotate your API key periodically
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                        Use server-side requests for production apps
                    </li>
                </ul>
            </div>

            {/* Next Steps */}
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    What to explore next
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                    <Link to="/api-docs/v1/gst-invoice-api" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                        🧾 GST Invoice API
                        <p className="text-xs text-muted-foreground mt-1">
                            Full endpoint reference
                        </p>
                    </Link>

                    <Link to="/api-docs/v1/bill-of-supply-api" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                        📄 Bill of Supply API
                        <p className="text-xs text-muted-foreground mt-1">
                            Non-GST invoices
                        </p>
                    </Link>

                    <Link to="/api-docs/v1/examples/nodejs" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                        💻 Node.js Examples
                        <p className="text-xs text-muted-foreground mt-1">
                            Copy-paste ready code
                        </p>
                    </Link>

                    <Link to="/playground" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                        ⚡ Try Playground
                        <p className="text-xs text-muted-foreground mt-1">
                            Test requests live
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}


function GstPayloadSection({ schema }: { schema: SchemaField[] }) {
    const [activeTab, setActiveTab] = useState<"curl" | "node" | "python" | "php" | "go">("curl");

    const endpoint = "https://api.karapi.io/v1/invoices/generate";

    const payload = `{
  "template": "service",
  "output": "binary",
  "invoice": {
    "invoiceNumber": "INV-2026-001",
    "date": "2026-01-17",
    "dueDate": "2026-02-17",
    "placeOfSupply": "Maharashtra",
    "taxRate": 18,

    "seller": {
      "name": "Your Company Pvt Ltd",
      "address": "123 Business Park, Mumbai",
      "mobile": "9876543210",
      "email": "billing@yourcompany.com",
      "isGstRegistered": true,
      "gst": "27AABCT1234F1ZH",
      "state": "Maharashtra",
      "signatory": "Authorized Signatory",
      "useInitialAsLogo": true
    },

    "client": {
      "name": "Client Company Ltd",
      "address": "456 Corporate Tower, Delhi",
      "state": "Maharashtra",
      "mobile": "9123456789",
      "gst": "07AADCC5678G1ZK"
    },

    "items": [
      {
        "description": "Software Development Services",
        "hsn": "998314",
        "quantity": 1,
        "rate": 50000,
        "taxRate": 18
      }
    ],

    "bank": {
      "name": "HDFC Bank",
      "account": "1234567890",
      "ifsc": "HDFC0000123"
    },

    "upiId": "yourname@upi",
    "notes": "Payment due within 15 days"
  }
}`;

    const curlExample = `curl -X POST ${endpoint} \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '${payload}'`;

    const nodeExample = `const res = await fetch("${endpoint}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify(payload)
});

const data = await res.json();
console.log(data);`;

    const pythonExample = `import requests

url = "${endpoint}"
headers = {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_API_KEY"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;

    const phpExample = `<?php
$ch = curl_init("${endpoint}");

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "x-api-key: YOUR_API_KEY"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
echo $response;
?>`;

    const goExample = `package main

import (
  "bytes"
  "net/http"
)

func main() {
  payload := []byte(\`{...payload}\`)

  req, _ := http.NewRequest("POST", "${endpoint}", bytes.NewBuffer(payload))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("x-api-key", "YOUR_API_KEY")

  client := &http.Client{}
  res, _ := client.Do(req)
  defer res.Body.Close()
}`;

    const activeCode =
        activeTab === "curl" ? curlExample :
            activeTab === "node" ? nodeExample :
                activeTab === "python" ? pythonExample :
                    activeTab === "php" ? phpExample :
                        goExample;

    return (
        <>
            <SEO
                title="GST Invoice API – Generate Indian GST Invoices Programmatically | KarAPI"
                description="Generate GST-compliant invoices for India using KarAPI. Create invoices in PDF, HTML, or URL format via a simple JSON API. Supports GST validation, tax calculations, and multiple output formats."
                keywords="gst invoice api, indian gst api, generate gst invoice, invoice json api, gst billing api, india gst invoice generator, karapi gst api, invoice generation api"
                url="https://karapi.io/api-docs/v1/gst-invoice-api"
                image="https://karapi.io/karapi-logo.png"
            />


            <main className="space-y-12">
                <header className="space-y-3 max-w-3xl">
                    <p className="text-lg text-muted-foreground">
                        Generate GST-compliant invoices programmatically using KarAPI. This documentation explains the full
                        JSON payload structure, required and conditional fields, authentication method, and example requests.
                    </p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Payload Schema Reference</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Fields marked as <b>Conditional</b> are required only when the seller is GST-registered.
                    </p>

                    <div className="space-y-4">
                        {schema.map((field, index) => (
                            <SchemaSection key={field.field} field={field} index={index} />
                        ))}
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">API Endpoint</h2>
                    <p className="text-muted-foreground">
                        Send a POST request to the following endpoint with your API key in the <code>x-api-key</code> header.
                    </p>

                    <div className="flex items-center justify-between bg-muted/40 px-4 py-2 rounded border">
                        <code>{endpoint}</code>
                        <button
                            onClick={() => navigator.clipboard.writeText(endpoint)}
                            className="text-xs px-2 py-1 rounded border hover:bg-muted"
                        >
                            Copy
                        </button>
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <ChevronRight size={20} className="text-primary" />
                        Example GST Invoice Payload
                    </h2>

                    <div className="bg-code-bg rounded-xl overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-border/30 flex justify-between">
                            <span className="text-xs text-muted-foreground font-medium">JSON</span>
                            <button
                                onClick={() => navigator.clipboard.writeText(payload)}
                                className="text-xs px-2 py-1 rounded border hover:bg-muted text-white"
                            >
                                Copy
                            </button>
                        </div>

                        <pre className="p-4 text-sm font-mono overflow-x-auto max-h-[400px] text-white">
                            {payload}
                        </pre>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Code Examples</h2>

                    <div className="flex flex-wrap gap-2">
                        {["curl", "node", "python", "php", "go"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-3 py-1.5 text-xs rounded capitalize ${activeTab === tab
                                    ? "bg-primary text-white"
                                    : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="bg-code-bg rounded-xl overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-border/30 flex justify-between">
                            <span className="text-xs text-muted-foreground font-medium">
                                {activeTab.toUpperCase()}
                            </span>
                            <button
                                onClick={() => navigator.clipboard.writeText(activeCode)}
                                className="text-xs px-2 py-1 rounded border hover:bg-muted text-white"
                            >
                                Copy
                            </button>
                        </div>

                        <pre className="p-4 text-sm font-mono overflow-x-auto text-white">
                            {activeCode}
                        </pre>
                    </div>
                </section>

                {/* Next Steps */}
                <div className="mt-10">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        What to explore next
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link to="/api-docs/v1/responses" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                            🧾 Responses
                            <p className="text-xs text-muted-foreground mt-1">
                                Full endpoint reference
                            </p>
                        </Link>

                        <Link to="/api-docs/v1/bill-of-supply-api" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                            📄 Bill of Supply API
                            <p className="text-xs text-muted-foreground mt-1">
                                Non-GST invoices
                            </p>
                        </Link>

                        <Link to="/playground" className="p-4 rounded-lg border hover:bg-muted/40 transition">
                            ⚡ Try Playground
                            <p className="text-xs text-muted-foreground mt-1">
                                Test requests live
                            </p>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}



function BillOfSupplySection() {
    return (
        <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                A Bill of Supply is issued by businesses not registered under GST or for exempt/nil-rated supplies.
                It has a simpler structure than a Tax Invoice.
            </p>

            {/* When to use */}
            <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">When to use Bill of Supply</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                        Supplier is registered under Composition Scheme
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                        Supply of exempt goods or services
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                        Supply of nil-rated goods
                    </li>
                </ul>
            </div>

            {/* Key Differences */}
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-primary" />
                    Key Differences from Tax Invoice
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-destructive mb-2">Not Required</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• GSTIN of recipient</li>
                            <li>• GST rate breakdown</li>
                            <li>• HSN/SAC codes</li>
                            <li>• Tax amount columns</li>
                        </ul>
                    </div>
                    <div className="bg-success/5 border border-success/20 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-success mb-2">Still Required</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Invoice number & date</li>
                            <li>• Seller details</li>
                            <li>• Buyer name & address</li>
                            <li>• Item descriptions & amounts</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Example Payload */}
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-primary" />
                    Example Payload
                </h3>
                <div className="bg-code-bg rounded-xl overflow-hidden">
                    <pre className="p-4 text-sm font-mono text-code-foreground overflow-x-auto">
                        {`{
  "template": "service",
  "output": "binary",
  "invoice": {
    "invoiceNumber": "BOS-2026-001",
    "date": "2026-01-17",
    "type": "bill-of-supply"
  },
  "seller": {
    "name": "Service Provider",
    "address": "Mumbai, Maharashtra",
    "registrationNote": "Composition Dealer"
  },
  "client": {
    "name": "Customer Name",
    "address": "Customer Address"
  },
  "items": [
    {
      "description": "Consulting Service",
      "quantity": 1,
      "rate": 5000
    }
  ]
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
}

function TemplatesSection({ templates }: { templates: Template[] }) {
    return (
        <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Choose from our professionally designed invoice templates. Each template is optimized for different business styles.
            </p>

            {/* Template Grid */}
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
                                <code className="mt-2 inline-block text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">
                                    template: "{template.id}"
                                </code>
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

            {/* Browse All */}
            <div className="text-center">
                <Link
                    to="/templates"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                    Browse all templates <ExternalLink size={14} />
                </Link>
            </div>
        </div>
    );
}

function ResponsesSection({ outputFormats }: { outputFormats: OutputFormat[] }) {
    return (
        <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                The API supports multiple output formats and returns structured responses for both success and error cases.
            </p>

            {/* Output Formats */}
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ChevronRight size={20} className="text-primary" />
                    Output Formats
                </h3>
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
                                {format.id === "binary" && (
                                    <span className="text-xs text-muted-foreground">(Default)</span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">{format.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Success Response */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    Success Response (200 OK)
                </h3>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
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
            <div>
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
        </div>
    );
}

// ============= Helper Components =============

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
                                        <span
                                            className={`text-[10px] px-1.5 py-0.5 rounded ${child.conditional
                                                ? "bg-yellow-100 text-yellow-700"
                                                : child.required
                                                    ? "bg-destructive/10 text-destructive"
                                                    : "bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {child.conditional
                                                ? "Conditional"
                                                : child.required
                                                    ? "Required"
                                                    : "Optional"}
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