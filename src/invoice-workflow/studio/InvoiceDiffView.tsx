import type { InvoiceData, InvoiceSnapshot, FieldDefinition } from "./types";
import { demoSchema } from "./mockData";

interface InvoiceDiffViewProps {
  current: InvoiceData;
  snapshot: InvoiceSnapshot;
}

type DiffType = "added" | "removed" | "changed" | "unchanged";

interface FieldDiff {
  field: FieldDefinition;
  type: DiffType;
  before?: any;
  after?: any;
}

export function InvoiceDiffView({ current, snapshot }: InvoiceDiffViewProps) {
  const diffs: FieldDiff[] = demoSchema.fields.map((field) => {
    const before = snapshot.data[field.id];
    const after = current[field.id];

    let type: DiffType = "unchanged";
    if (before === undefined && after !== undefined) type = "added";
    else if (before !== undefined && after === undefined) type = "removed";
    else if (JSON.stringify(before) !== JSON.stringify(after)) type = "changed";

    return { field, type, before, after };
  });

  const formatValue = (value: any) => {
    if (value === undefined || value === null || value === "") return "—";
    if (typeof value === "number") return value.toString();
    if (typeof value === "string" && value.includes("\n")) {
      return (
        <span className="whitespace-pre-line break-words text-body">
          {value}
        </span>
      );
    }
    return String(value);
  };

  const badgeForType = (type: DiffType) => {
    switch (type) {
      case "added":
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-caption font-semibold">
            Added
          </span>
        );
      case "removed":
        return (
          <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-caption font-semibold">
            Removed
          </span>
        );
      case "changed":
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-caption font-semibold">
            Changed
          </span>
        );
      default:
        return null;
    }
  };

  const changedOnly = diffs.filter((d) => d.type !== "unchanged");

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-helper text-slate-500">Review</p>
          <p className="text-card-title font-semibold text-slate-900">
            Snapshot vs current
          </p>
        </div>
        <div className="text-right">
          <p className="text-caption text-slate-500">Snapshot</p>
          <p className="text-body font-medium text-slate-800">
            {snapshot.label}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-slate-50/60">
        <p className="text-caption text-slate-600">
          Showing {changedOnly.length} changed fields out of {diffs.length}.
        </p>
        <div className="flex items-center gap-2 text-caption text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Added
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Changed
          <span className="w-2 h-2 rounded-full bg-red-500" /> Removed
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-4 space-y-3">
        {changedOnly.length === 0 && (
          <div className="border border-dashed border-emerald-200 rounded-xl px-4 py-6 text-center bg-emerald-50/40">
            <p className="text-section-title font-semibold text-emerald-700 mb-1">
              No changes detected
            </p>
            <p className="text-caption text-emerald-800">
              The current invoice matches the snapshot used for this review.
            </p>
          </div>
        )}

        {changedOnly.map((diff) => (
          <div
            key={diff.field.id}
            className="border border-slate-200 rounded-xl px-4 py-3 bg-white flex flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-body font-semibold text-slate-900">
                {diff.field.label}
              </p>
              {badgeForType(diff.type)}
            </div>
            <div className="grid grid-cols-2 gap-4 text-body-sm">
              <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                <p className="text-caption text-slate-500 mb-1">Before</p>
                <div className="text-slate-800">{formatValue(diff.before)}</div>
              </div>
              <div className="rounded-lg bg-violet-50/60 border border-violet-200 px-3 py-2">
                <p className="text-caption text-slate-500 mb-1">After</p>
                <div className="text-slate-900 font-medium">
                  {formatValue(diff.after)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

