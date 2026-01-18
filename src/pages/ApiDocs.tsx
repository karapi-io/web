import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Sidebar, type DocSection } from "../components/api-playground/Sidebar";
import { Documentation } from "../components/api-playground/Documentation";
import { useApiVersion } from "../hook/useApiVersion";

const validSections: DocSection[] = [
    "getting-started",
    "authentication",
    "gst-payload",
    "bill-of-supply",
    "templates",
    "responses"
];

export default function ApiDocs() {
    const { version = "v1", section = "getting-started" } = useParams<{ version: string; section: string }>();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {
        currentVersionId,
        switchVersion,
        availableVersions,
        templates,
        outputFormats,
        schema,
        endpoint,
        apiKeyUrl,
        config,
    } = useApiVersion(version);

    // Validate section and redirect if invalid
    const activeSection = validSections.includes(section as DocSection)
        ? (section as DocSection)
        : "getting-started";

    useEffect(() => {
        if (!validSections.includes(section as DocSection)) {
            navigate(`/api-docs/${version}/getting-started`, { replace: true });
        }
    }, [section, version, navigate]);

    // Sync version from URL
    useEffect(() => {
        if (version !== currentVersionId) {
            switchVersion(version);
        }
    }, [version, currentVersionId, switchVersion]);

    const handleSectionChange = (newSection: DocSection) => {
        navigate(`/api-docs/${currentVersionId}/${newSection}`);
    };

    const handleVersionChange = (newVersion: string) => {
        navigate(`/api-docs/${newVersion}/${activeSection}`);
    };

    const handleViewModeChange = (mode: "playground" | "docs") => {
        if (mode === "playground") {
            navigate("/playground");
        }
    };

    const handlePlaygroundClick = () => {
        navigate("/playground");
    };

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [activeSection, currentVersionId]);

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
                        <h1 className="font-bold text-lg leading-none tracking-tight">Documentation</h1>
                        <span className="text-[10px] text-muted-foreground font-medium">{currentVersionId}</span>
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
                                    viewMode="docs"
                                    setViewMode={handleViewModeChange}
                                    currentVersionId={currentVersionId}
                                    availableVersions={availableVersions}
                                    onVersionChange={handleVersionChange}
                                    apiKeyUrl={apiKeyUrl}
                                    activeDocSection={activeSection}
                                    onDocSectionChange={handleSectionChange}
                                    useRouteNavigation={true}
                                    onPlaygroundClick={handlePlaygroundClick}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-full shadow-xl shadow-black/5 z-20">
                <Sidebar
                    viewMode="docs"
                    setViewMode={handleViewModeChange}
                    currentVersionId={currentVersionId}
                    availableVersions={availableVersions}
                    onVersionChange={handleVersionChange}
                    apiKeyUrl={apiKeyUrl}
                    activeDocSection={activeSection}
                    onDocSectionChange={handleSectionChange}
                    useRouteNavigation={true}
                    onPlaygroundClick={handlePlaygroundClick}
                />
            </div>

            {/* Documentation Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                <Documentation
                    endpoint={endpoint}
                    outputFormats={outputFormats}
                    templates={templates}
                    schema={schema}
                    apiKeyUrl={apiKeyUrl}
                    versionId={currentVersionId}
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                />
            </div>
        </div>
    );
}
