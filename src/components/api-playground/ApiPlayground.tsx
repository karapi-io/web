import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play, Key, ArrowRight, Menu, X, FileJson,
    Eye, EyeOff, Sparkles, Zap,
    PanelLeftClose, PanelLeftOpen, ChevronDown, ChevronUp, Code2,
    Braces
} from "lucide-react";
import { Sidebar, type DocSection } from "./Sidebar";
import { InvoiceTypeSelector } from "./InvoiceTypeSelector";
import { CodeEditor } from "./CodeEditor";
import { OutputPreview } from "./OutputPreview";
import { CodeSnippets } from "./CodeSnippets";
import { Documentation } from "./Documentation";
import { useApiVersion } from "../../hook/useApiVersion";
import type { OutputType, InvoiceType } from "../../types/api";

export function ApiPlayground() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState<"playground" | "docs">("playground");
    const [activeDocSection, setActiveDocSection] = useState<DocSection>("getting-started");
    const [invoiceType, setInvoiceType] = useState<InvoiceType>("tax-invoice");
    const [outputType, setOutputType] = useState<OutputType>("binary");
    const [apiKey, setApiKey] = useState("");
    const [showApiKey, setShowApiKey] = useState(false);

    // Layout States
    const [isConfigOpen, setIsConfigOpen] = useState(true);
    const [isSnippetsOpen, setIsSnippetsOpen] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);

    // Mobile specific states
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileTab, setActiveMobileTab] = useState<"request" | "response">("request");

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

    // Handler to navigate to docs with proper URL
    const handleViewModeChange = (mode: "playground" | "docs") => {
        if (mode === "docs") {
            navigate(`/api-docs/${currentVersionId}/${activeDocSection}`);
        } else {
            setViewMode(mode);
        }
    };

    const handleDocSectionChange = (section: DocSection) => {
        navigate(`/api-docs/${currentVersionId}/${section}`);
    };

    const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || "service");
    const [payloadStr, setPayloadStr] = useState(
        JSON.stringify(templatePayloads[templates[0]?.id || "service"], null, 2)
    );

    // Logic to update payload
    const getPayloadForCurrentState = (templateId: string, type: InvoiceType, output: OutputType) => {
        if (type === "bill-of-supply") {
            return { ...billOfSupplyPayload, template: templateId, output };
        }
        const basePayload = templatePayloads[templateId] || templatePayloads[templates[0]?.id];
        return { ...basePayload, template: templateId, output };
    };

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

    useEffect(() => {
        if (templates.length > 0) {
            setSelectedTemplateId(templates[0].id);
            const payload = getPayloadForCurrentState(templates[0].id, invoiceType, outputType);
            setPayloadStr(JSON.stringify(payload, null, 2));
        }
    }, [currentVersionId]);

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

    const handleFormat = () => {
        try {
            const obj = JSON.parse(payloadStr);
            setPayloadStr(JSON.stringify(obj, null, 2));
        } catch (e) { }
    };

    const handleSend = async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        if (window.innerWidth < 1024) {
            setActiveMobileTab("response");
        }

        try {
            const parsed = JSON.parse(payloadStr);
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": apiKey || "DEMO_KEY" },
                body: JSON.stringify(parsed),
            });

            if (!res.ok) throw new Error(await res.text() || res.statusText);

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

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [viewMode, currentVersionId]);

    return (
        <div className="flex flex-col lg:flex-row h-[100dvh] bg-gradient-to-br from-background via-background to-muted/20 text-foreground overflow-hidden">

            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
                <div className="flex items-center gap-3">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 hover:bg-primary/10 rounded-full transition-colors text-primary"
                    >
                        <Menu size={20} />
                    </motion.button>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-lg leading-none tracking-tight">Api Playground</h1>
                        <span className="text-[10px] text-muted-foreground font-medium">v{currentVersionId}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                            {config.status === "stable" ? "Live" : config.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-background border-r border-border shadow-2xl z-50 lg:hidden"
                        >
                            <div className="flex justify-end p-4 border-b border-border/50">
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-muted/50 rounded-full">
                                    <X size={20} className="text-muted-foreground" />
                                </button>
                            </div>
                            <div className="h-full overflow-y-auto pb-20">
                                <Sidebar
                                    viewMode={viewMode}
                                    setViewMode={handleViewModeChange}
                                    currentVersionId={currentVersionId}
                                    availableVersions={availableVersions}
                                    onVersionChange={switchVersion}
                                    apiKeyUrl={apiKeyUrl}
                                    activeDocSection={activeDocSection}
                                    onDocSectionChange={handleDocSectionChange}
                                    useRouteNavigation={true}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-full shadow-xl shadow-black/5 z-20">
                <Sidebar
                    viewMode={viewMode}
                    setViewMode={handleViewModeChange}
                    currentVersionId={currentVersionId}
                    availableVersions={availableVersions}
                    onVersionChange={switchVersion}
                    apiKeyUrl={apiKeyUrl}
                    activeDocSection={activeDocSection}
                    onDocSectionChange={handleDocSectionChange}
                    useRouteNavigation={true}
                />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {viewMode === "docs" ? (
                    <Documentation
                        endpoint={endpoint}
                        outputFormats={outputFormats}
                        templates={templates}
                        schema={schema}
                        apiKeyUrl={apiKeyUrl}
                        versionId={currentVersionId}
                        activeSection={activeDocSection}
                        onSectionChange={setActiveDocSection}
                    />
                ) : (
                    <>
                        {/* Mobile Sliding Tabs */}
                        <div className="lg:hidden px-4 py-3 bg-background border-b border-border/50 z-20 shrink-0">
                            <div className="flex p-1 bg-muted/40 rounded-xl relative">
                                <div className="absolute inset-0 p-1 pointer-events-none">
                                    <motion.div
                                        layoutId="active-tab-bg"
                                        className={`h-full w-1/2 bg-background rounded-lg shadow-sm border border-border/50 ${activeMobileTab === "response" ? "translate-x-full" : ""}`}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                </div>
                                <button
                                    onClick={() => setActiveMobileTab("request")}
                                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-colors ${activeMobileTab === "request" ? "text-foreground" : "text-muted-foreground"}`}
                                >
                                    <FileJson size={16} className={activeMobileTab === "request" ? "text-primary" : ""} /> Request
                                </button>
                                <button
                                    onClick={() => setActiveMobileTab("response")}
                                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-colors ${activeMobileTab === "response" ? "text-foreground" : "text-muted-foreground"}`}
                                >
                                    <Eye size={16} className={activeMobileTab === "response" ? "text-primary" : ""} /> Response
                                </button>
                            </div>
                        </div>

                        {/* Config Panel */}
                        <AnimatePresence initial={false}>
                            {(isConfigOpen || window.innerWidth < 1024) && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`
                    flex-col border-r border-border bg-background/50 transition-all duration-300
                    ${activeMobileTab === "request" ? "flex flex-1 w-full h-full overflow-hidden" : "hidden lg:flex"}
                    lg:w-[350px] lg:flex-none lg:h-auto
                  `}
                                >
                                    {/* Config Content */}
                                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin p-4 lg:p-5 space-y-6 min-w-[280px] pb-4 flex flex-col">

                                        {/* Desktop Header */}
                                        <div className="hidden lg:block space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <Zap size={20} className="text-primary fill-primary/20" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between w-full">
                                                        <h1 className="text-lg font-bold text-foreground tracking-tight truncate">API Playground</h1>
                                                        <span className="text-sm text-muted-foreground">Test the invoice generation API in real-time</span>
                                                        <button
                                                            onClick={() => setIsConfigOpen(false)}
                                                            className="lg:hidden xl:hidden hover:bg-muted p-1 rounded"
                                                        >
                                                            <PanelLeftClose size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[10px] px-1.5 py-px rounded-full bg-emerald-500/10 text-emerald-600 font-bold uppercase border border-emerald-500/20">
                                                            {config.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* API Key Section */}
                                        <div>
                                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                                                API Key
                                            </label>
                                            <div className="relative">
                                                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                <input
                                                    type={showApiKey ? "text" : "password"}
                                                    placeholder="Enter your API key"
                                                    value={apiKey}
                                                    onChange={(e) => setApiKey(e.target.value)}
                                                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowApiKey(!showApiKey)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                                                >
                                                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-1 mt-2">
                                                <span className="text-xs text-muted-foreground">Don't have a key?</span>
                                                <Link to="/get-api-key" className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5">
                                                    Get free API key <ArrowRight size={12} />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            <div className="p-px border-b border-border/50" />

                                            {/* Invoice Type Selector */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                    Type
                                                </label>
                                                <InvoiceTypeSelector
                                                    selectedType={invoiceType}
                                                    onTypeChange={handleInvoiceTypeChange}
                                                    selectedTemplateId={selectedTemplateId}
                                                    onTemplateChange={handleTemplateChange}
                                                    templates={templates}
                                                />
                                            </div>

                                            {/* Output Format */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                    Format
                                                </label>
                                                <div className="flex gap-1.5 p-1 bg-muted/40 border border-border/40 rounded-xl overflow-x-auto">
                                                    {outputFormats.map((f) => (
                                                        <button
                                                            key={f.id}
                                                            onClick={() => handleOutputChange(f.id)}
                                                            className={`relative flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary ${outputType === f.id
                                                                ? "text-primary bg-background shadow-sm border border-border/50"
                                                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                                                }`}
                                                        >
                                                            {outputType === f.id && (
                                                                <motion.div
                                                                    layoutId="activeOutput"
                                                                    className="absolute inset-0 rounded-lg ring-1 ring-primary/20 pointer-events-none"
                                                                />
                                                            )}
                                                            {f.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payload Editor */}
                                        <div className="h-[60vh] lg:h-auto lg:flex-1 lg:min-h-[600px] xl:min-h-[700px] flex flex-col">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                    <FileJson size={12} /> Payload
                                                </label>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={handleFormat}
                                                        title="Format JSON"
                                                        className="text-[10px] px-2 py-0.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground transition-colors flex items-center gap-1"
                                                    >
                                                        <Braces size={10} /> Prettify
                                                    </button>
                                                    <button
                                                        onClick={handleReset}
                                                        title="Reset to default"
                                                        className="text-[10px] px-2 py-0.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex-1 rounded-xl overflow-hidden border border-border shadow-inner bg-zinc-950/5 dark:bg-zinc-900/50">
                                                <CodeEditor value={payloadStr} onChange={setPayloadStr} onReset={handleReset} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Send Button */}
                                    <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md z-10 shrink-0">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSend}
                                            disabled={isLoading}
                                            className="relative w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles size={16} className="fill-primary-foreground/20" />
                                                        Generate
                                                        <Play size={16} fill="currentColor" className="ml-0.5" />
                                                    </>
                                                )}
                                            </span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Output Panel */}
                        <motion.div
                            layout
                            className={`flex-1 flex flex-col min-w-0 bg-muted/20 relative transition-all duration-300 ${activeMobileTab === "response" ? "flex" : "hidden lg:flex"
                                }`}
                        >
                            <div className="hidden lg:block absolute top-4 left-4 z-20">
                                <button
                                    onClick={() => setIsConfigOpen(!isConfigOpen)}
                                    className="p-2 bg-background/80 backdrop-blur border border-border rounded-lg shadow-sm hover:bg-accent text-muted-foreground transition-all hover:text-foreground"
                                    title={isConfigOpen ? "Close settings" : "Open settings"}
                                >
                                    {isConfigOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                                </button>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-2 flex flex-col items-center justify-center">
                                <div className="w-full h-full flex flex-col bg-background/50 rounded-2xl border border-border/50 shadow-sm overflow-hidden backdrop-blur-sm">
                                    <div className="flex-1 relative">
                                        <OutputPreview isLoading={isLoading} error={error} response={response} />
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                animate={{ height: isSnippetsOpen ? 300 : 48 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="bg-background border-t border-border overflow-hidden flex flex-col shadow-lg"
                            >
                                <button
                                    onClick={() => setIsSnippetsOpen(!isSnippetsOpen)}
                                    className="w-full flex items-center justify-between px-6 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer bg-background z-10"
                                >
                                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <Code2 size={16} className="text-primary" />
                                        Integration Code
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        {isSnippetsOpen ? "Collapse" : "Expand"}
                                        {isSnippetsOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                                    </div>
                                </button>

                                <div className="flex-1 overflow-hidden relative">
                                    <div className="absolute inset-0 overflow-y-auto">
                                        <CodeSnippets apiKey={apiKey} payload={payloadStr} endpoint={endpoint} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}