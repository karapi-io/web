import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDisplayDate(value: string): string {
    if (!value) return "";
    const d = new Date(value + "T12:00:00");
    if (Number.isNaN(d.getTime())) return value;
    const day = d.getDate();
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
}

function parseYYYYMMDD(value: string): { y: number; m: number; d: number } | null {
    if (!value || value.length < 10) return null;
    const y = parseInt(value.slice(0, 4), 10);
    const m = parseInt(value.slice(5, 7), 10) - 1;
    const d = parseInt(value.slice(8, 10), 10);
    if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return null;
    return { y, m, d };
}

function toYYYYMMDD(y: number, m: number, d: number): string {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
}

function getDaysInMonth(y: number, m: number): Date[] {
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    const startPad = first.getDay();
    const days: Date[] = [];
    for (let i = 0; i < startPad; i++) {
        const d = new Date(y, m, 1 - (startPad - i));
        days.push(d);
    }
    for (let d = 1; d <= last.getDate(); d++) {
        days.push(new Date(y, m, d));
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
        days.push(new Date(y, m + 1, i));
    }
    return days;
}

export interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    min?: string;
    max?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
}

export function DatePicker({
    value,
    onChange,
    label,
    min,
    max,
    placeholder = "Select date",
    className,
    inputClassName,
}: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [viewDate, setViewDate] = useState(() => {
        const p = parseYYYYMMDD(value);
        if (p) return new Date(p.y, p.m, 1);
        return new Date();
    });
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const p = parseYYYYMMDD(value);
        if (p) setViewDate(new Date(p.y, p.m, 1));
    }, [value]);

    const parsed = parseYYYYMMDD(value);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const insideRoot = rootRef.current?.contains(target);
            const insideDropdown = dropdownRef.current?.contains(target);
            if (!insideRoot && !insideDropdown) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    useEffect(() => {
        if (open && triggerRef.current && typeof document !== "undefined") {
            const rect = triggerRef.current.getBoundingClientRect();
            const gap = 8;
            setPosition({
                top: rect.bottom + gap,
                left: rect.left,
            });
        }
    }, [open]);

    const minParsed = min ? parseYYYYMMDD(min) : null;
    const maxParsed = max ? parseYYYYMMDD(max) : null;

    const isDisabled = (d: Date) => {
        if (minParsed) {
            if (d.getFullYear() < minParsed.y) return true;
            if (d.getFullYear() === minParsed.y && d.getMonth() < minParsed.m) return true;
            if (d.getFullYear() === minParsed.y && d.getMonth() === minParsed.m && d.getDate() < minParsed.d) return true;
        }
        if (maxParsed) {
            if (d.getFullYear() > maxParsed.y) return true;
            if (d.getFullYear() === maxParsed.y && d.getMonth() > maxParsed.m) return true;
            if (d.getFullYear() === maxParsed.y && d.getMonth() === maxParsed.m && d.getDate() > maxParsed.d) return true;
        }
        return false;
    };

    const isCurrentMonth = (d: Date, y: number, m: number) => d.getFullYear() === y && d.getMonth() === m;
    const isSelected = (d: Date) => {
        if (!parsed) return false;
        return d.getFullYear() === parsed.y && d.getMonth() === parsed.m && d.getDate() === parsed.d;
    };

    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    const days = getDaysInMonth(y, m);

    const selectDay = (d: Date) => {
        if (isDisabled(d)) return;
        onChange(toYYYYMMDD(d.getFullYear(), d.getMonth(), d.getDate()));
        setOpen(false);
    };

    return (
        <div className={cn("group relative", className)} ref={rootRef}>
            {label && (
                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider group-focus-within:text-blue-500 transition-colors">
                    {label}
                </label>
            )}
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={cn(
                    "w-full flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg p-2.5 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm text-left",
                    inputClassName
                )}
            >
                <span className={value ? "" : "text-slate-400"}>{value ? formatDisplayDate(value) : placeholder}</span>
                <CalendarIcon size={16} className="text-slate-400 shrink-0" />
            </button>

            {open &&
                typeof document !== "undefined" &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        className="fixed z-[9999] min-w-[280px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-visible"
                        style={{
                            top: position.top,
                            left: position.left,
                        }}
                    >
                        <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-slate-50/80">
                            <button
                                type="button"
                                onClick={() => setViewDate(new Date(y, m - 1, 1))}
                                className="p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-600 transition-colors"
                                aria-label="Previous month"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <span className="text-sm font-semibold text-slate-800">
                                {MONTHS[m]} {y}
                            </span>
                            <button
                                type="button"
                                onClick={() => setViewDate(new Date(y, m + 1, 1))}
                                className="p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-600 transition-colors"
                                aria-label="Next month"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                        <div className="p-3">
                            <div className="grid grid-cols-7 gap-0.5 mb-2">
                                {WEEKDAYS.map((wd) => (
                                    <div key={wd} className="text-[10px] font-bold text-slate-400 uppercase text-center py-1">
                                        {wd}
                                    </div>
                                ))}
                                {days.map((d, i) => {
                                    const current = isCurrentMonth(d, y, m);
                                    const disabled = isDisabled(d);
                                    const selected = isSelected(d);
                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => selectDay(d)}
                                            disabled={disabled}
                                            className={cn(
                                                "h-8 w-8 rounded-lg text-sm transition-colors",
                                                !current && "text-slate-300",
                                                current && !selected && !disabled && "text-slate-800 hover:bg-blue-50",
                                                selected && "bg-blue-600 text-white hover:bg-blue-700",
                                                disabled && "opacity-40 cursor-not-allowed"
                                            )}
                                        >
                                            {d.getDate()}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}
