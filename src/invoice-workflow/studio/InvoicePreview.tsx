import { demoSchema } from "./mockData";
import type { InvoiceData } from "./types";

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const currency = data.currency ?? "INR";

  const formatMoney = (value: number | undefined) => {
    if (typeof value !== "number") return "—";
    const prefix = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₹";
    return `${prefix}${value.toLocaleString("en-IN")}`;
  };

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-helper text-slate-500">Preview</p>
          <p className="text-card-title font-semibold text-slate-900">
            {demoSchema.name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-caption text-slate-500">Template</p>
          <p className="text-body font-medium text-slate-800">
            {demoSchema.id}@v{demoSchema.version}
          </p>
        </div>
      </div>

      <div className="flex-1 bg-slate-50/80 px-4 py-5 overflow-auto">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-6 text-slate-900">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-helper text-slate-500 mb-1">Bill to</p>
              <p className="text-card-title font-semibold">
                {data.client_name || "Client name"}
              </p>
              {data.client_email && (
                <p className="text-caption text-slate-500 mt-1">
                  {data.client_email}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-helper text-slate-500 mb-1">Invoice</p>
              <p className="text-card-title font-semibold">
                {data.invoice_number || "INV-XXXX"}
              </p>
              <p className="text-caption text-slate-500 mt-1">
                Date:{" "}
                <span className="font-medium text-slate-800">
                  {data.invoice_date || "—"}
                </span>
              </p>
              <p className="text-caption text-slate-500">
                Due:{" "}
                <span className="font-medium text-slate-800">
                  {data.due_date || "—"}
                </span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-dashed border-slate-200" />

          {/* Amounts */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-caption text-slate-500 mb-1">Currency</p>
              <p className="text-body font-medium text-slate-900">
                {data.currency || "INR"}
              </p>
            </div>
            <div>
              <p className="text-caption text-slate-500 mb-1">
                Tax rate (GST)
              </p>
              <p className="text-body font-medium text-slate-900">
                {typeof data.tax_rate === "number" ? `${data.tax_rate}%` : "—"}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-4 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-caption text-slate-500">Subtotal</p>
              <p className="text-body font-medium">
                {formatMoney(data.subtotal as number | undefined)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-caption text-slate-500">
                Tax ({data.tax_rate ?? "—"}%)
              </p>
              <p className="text-body font-medium">
                {formatMoney(
                  typeof data.subtotal === "number" &&
                    typeof data.tax_rate === "number"
                    ? (data.subtotal * data.tax_rate) / 100
                    : undefined
                )}
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-200">
              <p className="text-caption font-semibold text-slate-900">
                Total
              </p>
              <p className="text-section-title font-bold text-slate-900">
                {formatMoney(data.total as number | undefined)}
              </p>
            </div>
          </div>

          {/* Notes */}
          {(data.notes || data.payment_terms) && (
            <div className="mt-4 space-y-3">
              {data.notes && (
                <div>
                  <p className="text-caption font-semibold text-slate-900 mb-1">
                    Notes
                  </p>
                  <p className="text-body text-slate-700 whitespace-pre-line">
                    {data.notes}
                  </p>
                </div>
              )}
              {data.payment_terms && (
                <div>
                  <p className="text-caption font-semibold text-slate-900 mb-1">
                    Payment terms
                  </p>
                  <p className="text-body text-slate-700 whitespace-pre-line">
                    {data.payment_terms}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

