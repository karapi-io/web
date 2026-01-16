import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Key, ArrowRight } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { InvoiceTypeSelector } from "./InvoiceTypeSelector";
import { CodeEditor } from "./CodeEditor";
import { OutputPreview } from "./OutputPreview";
import { CodeSnippets } from "./CodeSnippets";
import { Documentation } from "./Documentation";
import { useApiVersion } from "../../hook/useApiVersion";
import type { OutputType, InvoiceType } from "../../types/api";

export function ApiPlayground() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState<"playground" | "docs">("playground");
    const [invoiceType, setInvoiceType] = useState<InvoiceType>("tax-invoice");
    const [outputType, setOutputType] = useState<OutputType>("binary");
    const [apiKey, setApiKey] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);

    // Use version-aware hook
    const {
        currentVersionId,
        switchVersion,
        availableVersions,
        templates,
        templatePayloads,
        billOfSupplyPayload,
        outputFormats,
        schema,
        endpoint,
        apiKeyUrl,
        config,
    } = useApiVersion("v1");

    const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || "corporate");
    const [payloadStr, setPayloadStr] = useState(
        JSON.stringify(templatePayloads[templates[0]?.id || "corporate"], null, 2)
    );

    // Get the appropriate payload based on invoice type and template
    const getPayloadForCurrentState = (templateId: string, type: InvoiceType, output: OutputType) => {
        if (type === "bill-of-supply") {
            return { ...billOfSupplyPayload, template: templateId, output };
        }
        const basePayload = templatePayloads[templateId] || templatePayloads[templates[0]?.id];
        return { ...basePayload, template: templateId, output };
    };

    // Handle URL template parameter
    useEffect(() => {
        const templateId = searchParams.get("template");
        if (templateId && templatePayloads[templateId]) {
            setSelectedTemplateId(templateId);
            const payload = getPayloadForCurrentState(templateId, invoiceType, outputType);
            setPayloadStr(JSON.stringify(payload, null, 2));
            setViewMode("playground");
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, setSearchParams, templatePayloads]);

    // Reset state when version changes
    useEffect(() => {
        if (templates.length > 0) {
            setSelectedTemplateId(templates[0].id);
            const payload = getPayloadForCurrentState(templates[0].id, invoiceType, outputType);
            setPayloadStr(JSON.stringify(payload, null, 2));
        }
    }, [currentVersionId]);

    // Handle invoice type change
    const handleInvoiceTypeChange = (type: InvoiceType) => {
        setInvoiceType(type);
        const payload = getPayloadForCurrentState(selectedTemplateId, type, outputType);
        setPayloadStr(JSON.stringify(payload, null, 2));
    };

    const handleTemplateChange = (templateId: string) => {
        setSelectedTemplateId(templateId);
        const payload = getPayloadForCurrentState(templateId, invoiceType, outputType);
        setPayloadStr(JSON.stringify(payload, null, 2));
    };

    const handleOutputChange = (type: OutputType) => {
        setOutputType(type);
        try {
            const obj = JSON.parse(payloadStr);
            obj.output = type;
            setPayloadStr(JSON.stringify(obj, null, 2));
        } catch { }
    };

    const handleReset = () => {
        const payload = getPayloadForCurrentState(selectedTemplateId, invoiceType, outputType);
        setPayloadStr(JSON.stringify(payload, null, 2));
    };

    const handleSend = async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        try {
            const parsed = JSON.parse(payloadStr);
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": apiKey || "DEMO_KEY" },
                body: JSON.stringify(parsed),
            });

            if (!res.ok) throw new Error(await res.text() || res.statusText);

            // API always returns JSON with type, mimeType, encoding, and data fields
            const json = await res.json();

            if (json.type === "binary") {
                setResponse({
                    type: "binary",
                    mimeType: json.mimeType,
                    encoding: json.encoding,
                    data: json.data,
                });
            } else if (json.type === "html") {
                setResponse({
                    type: "html",
                    data: json.html,
                });
            } else {
                setResponse({ type: "json", json: await res.json() });
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar
                viewMode={viewMode}
                setViewMode={setViewMode}
                currentVersionId={currentVersionId}
                availableVersions={availableVersions}
                onVersionChange={switchVersion}
                apiKeyUrl={apiKeyUrl}
            />

            <div className="flex-1 flex overflow-hidden">
                {viewMode === "docs" ? (
                    <Documentation
                        endpoint={endpoint}
                        outputFormats={outputFormats}
                        templates={templates}
                        schema={schema}
                        apiKeyUrl={apiKeyUrl}
                        versionId={currentVersionId}
                    />
                ) : (
                    <>
                        {/* Left: Config Panel */}
                        <div className="w-[420px] flex flex-col border-r border-border bg-background">
                            <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-6">
                                {/* Header */}
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-2xl font-bold text-foreground">API Playground</h1>
                                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase">
                                            {config.status === "stable" ? "Live" : config.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Test the invoice generation API in real-time</p>
                                </div>

                                {/* API Key */}
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                                        API Key
                                    </label>
                                    <div className="relative">
                                        <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="password"
                                            placeholder="Enter your API key"
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="text-xs text-muted-foreground">Don't have a key?</span>
                                        <a
                                            href={apiKeyUrl}
                                            className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
                                        >
                                            Get free API key <ArrowRight size={12} />
                                        </a>
                                    </div>
                                </div>

                                {/* Invoice Type & Template Selector */}
                                <InvoiceTypeSelector
                                    selectedType={invoiceType}
                                    onTypeChange={handleInvoiceTypeChange}
                                    selectedTemplateId={selectedTemplateId}
                                    onTemplateChange={handleTemplateChange}
                                    templates={templates}
                                />

                                {/* Output Format */}
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                                        Output Format
                                    </label>
                                    <div className="flex gap-2 p-1 bg-muted rounded-lg">
                                        {outputFormats.map((f) => (
                                            <button
                                                key={f.id}
                                                onClick={() => handleOutputChange(f.id)}
                                                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${outputType === f.id
                                                    ? "bg-surface-elevated text-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground"
                                                    }`}
                                            >
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Payload */}
                                <div className="flex-1 min-h-[300px]">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                                        Request Payload
                                    </label>
                                    <CodeEditor value={payloadStr} onChange={setPayloadStr} onReset={handleReset} />
                                </div>
                            </div>

                            {/* Send Button */}
                            <div className="p-4 border-t border-border">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Play size={18} fill="currentColor" /> Send Request
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>

                        {/* Right: Output */}
                        <div className="flex-1 flex flex-col min-w-0">
                            <div className="flex-1 min-h-0">
                                <OutputPreview isLoading={isLoading} error={error} response={response} />
                            </div>
                            <div className="h-[280px] border-t border-border">
                                <CodeSnippets apiKey={apiKey} payload={payloadStr} endpoint={endpoint} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
