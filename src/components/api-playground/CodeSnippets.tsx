import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface CodeSnippetsProps {
    apiKey: string;
    payload: string;
    endpoint: string;
}

type TabType = "curl" | "node" | "python";

export function CodeSnippets({ apiKey, payload, endpoint }: CodeSnippetsProps) {
    const [activeTab, setActiveTab] = useState<TabType>("curl");
    const [copied, setCopied] = useState(false);

    const tabs: { id: TabType; label: string }[] = [
        { id: "curl", label: "cURL" },
        { id: "node", label: "Node.js" },
        { id: "python", label: "Python" },
    ];

    const getSnippet = (): string => {
        const key = apiKey || "YOUR_API_KEY";
        const safePayload = payload || "{}";

        if (activeTab === "curl") {
            return `curl -X POST "${endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${key}" \\
  -d '${safePayload.replace(/'/g, "'\\''")}'`;
        }

        if (activeTab === "node") {
            return `const response = await fetch("${endpoint}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "${key}"
  },
  body: JSON.stringify(${safePayload})
});

// For binary (PDF)
const blob = await response.blob();
const url = URL.createObjectURL(blob);

// For HTML
const html = await response.text();

// For link
const { url } = await response.json();`;
        }

        return `import requests

response = requests.post(
    "${endpoint}",
    headers={
        "Content-Type": "application/json",
        "x-api-key": "${key}"
    },
    json=${safePayload}
)

# For binary (PDF)
with open("invoice.pdf", "wb") as f:
    f.write(response.content)

# For HTML
html = response.text

# For link
data = response.json()`;
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(getSnippet());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full bg-code-bg overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center border-b border-border/20 bg-secondary/20">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-4 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${activeTab === tab.id
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeCodeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}

                {/* Copy Button */}
                <div className="ml-auto pr-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy}
                        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
                    >
                        {copied ? (
                            <Check size={16} className="text-success" />
                        ) : (
                            <Copy size={16} />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Code */}
            <div className="flex-1 overflow-auto scrollbar-thin p-4">
                <pre className="text-sm font-mono text-code-foreground leading-relaxed whitespace-pre-wrap">
                    {getSnippet()}
                </pre>
            </div>
        </div>
    );
}
