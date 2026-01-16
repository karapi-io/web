import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCcw } from "lucide-react";

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    onReset: () => void;
}

export function CodeEditor({ value = "", onChange, onReset }: CodeEditorProps) {
    const [copied, setCopied] = useState(false);
    const [lineCount, setLineCount] = useState(1);

    useEffect(() => {
        setLineCount(value.split("\n").length);
    }, [value]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group h-full flex flex-col rounded-xl border border-border overflow-hidden bg-code-bg">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-secondary/50">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                        <div className="w-3 h-3 rounded-full bg-warning/60" />
                        <div className="w-3 h-3 rounded-full bg-success/60" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono ml-2">request.json</span>
                </div>
                <div className="flex items-center gap-1">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onReset}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
                        title="Reset to default"
                    >
                        <RotateCcw size={14} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    </motion.button>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex overflow-hidden">
                {/* Line numbers */}
                <div className="py-4 px-3 text-right select-none border-r border-border/30 bg-secondary/30">
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i} className="text-xs text-muted-foreground/50 font-mono leading-6">
                            {i + 1}
                        </div>
                    ))}
                </div>

                {/* Code area */}
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 p-4 bg-transparent text-code-foreground font-mono text-sm leading-6 resize-none outline-none scrollbar-thin"
                    spellCheck={false}
                    style={{ tabSize: 2 }}
                />
            </div>
        </div>
    );
}
