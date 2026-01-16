import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, BookOpen, Zap, ExternalLink, LayoutGrid, ChevronDown, Check } from "lucide-react";
import type { ApiVersion } from "../../types/api";

interface SidebarProps {
    viewMode: "playground" | "docs";
    setViewMode: (mode: "playground" | "docs") => void;
    currentVersionId: string;
    availableVersions: ApiVersion[];
    onVersionChange: (versionId: string) => void;
    apiKeyUrl: string;
}

export function Sidebar({
    viewMode,
    setViewMode,
    currentVersionId,
    availableVersions,
    onVersionChange,
    apiKeyUrl
}: SidebarProps) {
    const [isVersionOpen, setIsVersionOpen] = useState(false);
    const selectedVersion = availableVersions.find(v => v.id === currentVersionId) || availableVersions[0];

    return (
        <div className="w-64 flex flex-col border-r border-border bg-sidebar">
            {/* Logo & Version */}
            <div className="p-6 border-b border-border">
                {/* <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                        <span className="text-primary-foreground font-bold text-lg">K</span>
                    </div>
                    <div>
                        <span className="font-bold text-lg tracking-tight text-foreground">
                            Kar<span className="text-primary">{`{API}`}</span>
                        </span>
                        <p className="text-xs text-muted-foreground">Invoice API</p>
                    </div>
                </div> */}

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
                            onClick={() => setViewMode("playground")}
                            icon={<Play size={16} />}
                            label="Playground"
                        />
                        <NavButton
                            active={viewMode === "docs"}
                            onClick={() => setViewMode("docs")}
                            icon={<BookOpen size={16} />}
                            label="Documentation"
                        />
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
                            href={apiKeyUrl}
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
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className={active ? "text-primary" : ""}>{icon}</span>
            {label}
        </button>
    );
}
