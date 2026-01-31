import { Copy, ExternalLink, Link as LinkIcon } from "lucide-react";

interface ShareLinkCardProps {
    label: string;
    url: string;
    visibility: "public" | "private";
}

export default function ShareLinkCard({ label, url, visibility }: ShareLinkCardProps) {
    return (
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <LinkIcon size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">{label}</p>
                        <p className="text-xs text-slate-500">
                            {visibility === "public" ? "Public review link" : "Private review link"}
                        </p>
                    </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${visibility === "public" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"}`}>
                    {visibility}
                </span>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 font-mono truncate">
                    {url}
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition">
                        <Copy size={14} />
                        Copy
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                        <ExternalLink size={14} />
                        Open
                    </button>
                </div>
            </div>
        </div>
    );
}
