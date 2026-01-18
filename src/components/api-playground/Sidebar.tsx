import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Play, BookOpen, Zap, ExternalLink, LayoutGrid, ChevronDown, Check, ChevronRight, FileText, Key, Code, AlertTriangle, Palette } from "lucide-react";
import type { ApiVersion } from "../../types/api";

export type DocSection = "getting-started" | "authentication" | "gst-invoice-api" | "bill-of-supply" | "templates" | "responses";

interface SidebarProps {
    viewMode: "playground" | "docs";
    setViewMode: (mode: "playground" | "docs") => void;
    currentVersionId: string;
    availableVersions: ApiVersion[];
    onVersionChange: (versionId: string) => void;
    apiKeyUrl: string;
    activeDocSection?: DocSection;
    onDocSectionChange?: (section: DocSection) => void;
    useRouteNavigation?: boolean;
    onPlaygroundClick?: () => void;
}

const docSections: { id: DocSection; label: string; icon: React.ReactNode }[] = [
    { id: "getting-started", label: "Getting Started", icon: <Zap size={14} /> },
    { id: "authentication", label: "Authentication", icon: <Key size={14} /> },
    { id: "gst-invoice-api", label: "GST Invoice API", icon: <Code size={14} /> },
    { id: "bill-of-supply", label: "Bill of Supply", icon: <FileText size={14} /> },
    { id: "templates", label: "Templates", icon: <Palette size={14} /> },
    { id: "responses", label: "Responses", icon: <AlertTriangle size={14} /> },
];

export function Sidebar({
    viewMode,
    setViewMode,
    currentVersionId,
    availableVersions,
    onVersionChange,
    activeDocSection = "getting-started",
    onDocSectionChange,
    useRouteNavigation = false,
    onPlaygroundClick
}: SidebarProps) {
    const navigate = useNavigate();
    const [isVersionOpen, setIsVersionOpen] = useState(false);
    const [isDocsExpanded, setIsDocsExpanded] = useState(viewMode === "docs");
    const selectedVersion = availableVersions.find(v => v.id === currentVersionId) || availableVersions[0];

    const handleDocsClick = () => {
        if (viewMode !== "docs") {
            if (useRouteNavigation) {
                navigate(`/api-docs/${currentVersionId}/getting-started`);
            } else {
                setViewMode("docs");
                setIsDocsExpanded(true);
            }
        } else {
            setIsDocsExpanded(!isDocsExpanded);
        }
    };

    const handleDocSectionClick = (section: DocSection) => {
        if (useRouteNavigation) {
            navigate(`/api-docs/${currentVersionId}/${section}`);
        } else {
            setViewMode("docs");
            onDocSectionChange?.(section);
        }
    };

    return (
        <div className="w-64 flex flex-col border-r border-border bg-sidebar">
            {/* Logo & Version */}
            <div className="p-6 border-b border-border">


                {/* Version Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsVersionOpen(!isVersionOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Version:</span>
                            <span className="font-medium text-foreground">{selectedVersion?.label}</span>
                            {selectedVersion?.status === "stable" && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium uppercase">
                                    Stable
                                </span>
                            )}
                            {selectedVersion?.status === "beta" && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-medium uppercase">
                                    Beta
                                </span>
                            )}
                            {selectedVersion?.status === "deprecated" && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium uppercase">
                                    Deprecated
                                </span>
                            )}
                        </div>
                        <motion.div
                            animate={{ rotate: isVersionOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-muted-foreground"
                        >
                            <ChevronDown size={14} />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {isVersionOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 right-0 mt-1 p-1 rounded-lg border border-border bg-card shadow-lg z-10"
                            >
                                {availableVersions.map((version) => (
                                    <button
                                        key={version.id}
                                        onClick={() => {
                                            onVersionChange(version.id);
                                            setIsVersionOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${currentVersionId === version.id
                                            ? "bg-primary/10 text-foreground"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{version.label}</span>
                                            {version.status === "stable" && (
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium uppercase">
                                                    Stable
                                                </span>
                                            )}
                                            {version.status === "beta" && (
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-medium uppercase">
                                                    Beta
                                                </span>
                                            )}
                                            {version.status === "deprecated" && (
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium uppercase">
                                                    Deprecated
                                                </span>
                                            )}
                                        </div>
                                        {currentVersionId === version.id && (
                                            <Check size={14} className="text-primary" />
                                        )}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin">
                {/* Main Nav */}
                <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3">
                        Platform
                    </p>
                    <div className="space-y-1">
                        <NavButton
                            active={viewMode === "playground"}
                            onClick={() => {
                                if (useRouteNavigation && onPlaygroundClick) {
                                    onPlaygroundClick();
                                } else {
                                    setViewMode("playground");
                                }
                            }}
                            icon={<Play size={16} />}
                            label="Playground"
                        />

                        {/* Documentation with expandable sub-items */}
                        <div>
                            <button
                                onClick={handleDocsClick}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${viewMode === "docs"
                                    ? "bg-surface-elevated text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                            >
                                {viewMode === "docs" && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={viewMode === "docs" ? "text-primary" : ""}>
                                    <BookOpen size={16} />
                                </span>
                                <span className="flex-1 text-left">Documentation</span>
                                <motion.div
                                    animate={{ rotate: isDocsExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-muted-foreground"
                                >
                                    <ChevronRight size={14} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isDocsExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-4 mt-1 space-y-0.5 border-l border-border pl-3">
                                            {docSections.map((section) => (
                                                <button
                                                    key={section.id}
                                                    onClick={() => handleDocSectionClick(section.id)}
                                                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${activeDocSection === section.id && viewMode === "docs"
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                        }`}
                                                >
                                                    {section.icon}
                                                    {section.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3">
                        Resources
                    </p>
                    <div className="space-y-1">
                        <Link
                            to="/templates"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted group"
                        >
                            <LayoutGrid size={16} />
                            <span>Browse Templates</span>
                            <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <a
                            href="/get-api-key"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted group"
                        >
                            <Zap size={16} />
                            <span>Get API Key</span>
                            <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
                <div className="px-3 py-2 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">
                        {selectedVersion?.label}.0.0 • <a href="mailto:support@karapi.io" className="hover:text-foreground transition-colors">support@karapi.io</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

function NavButton({
    active,
    onClick,
    icon,
    label
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${active
                ? "bg-surface-elevated text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
        >
            {active && (
                <motion.div
                    layoutId="activeNavPlayground"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className={active ? "text-primary" : ""}>{icon}</span>
            {label}
        </button>
    );
}
