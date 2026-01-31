import { demoSchema } from "./mockData";
import type { InvoiceData, FieldDefinition } from "./types";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (next: InvoiceData) => void;
  readOnly?: boolean;
}

export function InvoiceForm({ data, onChange, readOnly }: InvoiceFormProps) {
  const handleFieldChange = (field: FieldDefinition, value: any) => {
    const next: InvoiceData = { ...data, [field.id]: value };
    onChange(next);
  };

  const renderInput = (field: FieldDefinition) => {
    const value = data[field.id] ?? "";
    const disabled = readOnly || field.readOnly;

    const common =
      "w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-body text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            rows={3}
            className={common}
            placeholder={field.placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        );
      case "select":
        return (
          <select
            className={common}
            disabled={disabled}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          >
            <option value="">Select…</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "number":
      case "money":
        return (
          <input
            type="number"
            className={common}
            placeholder={field.placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) =>
              handleFieldChange(
                field,
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
        );
      case "date":
        return (
          <input
            type="date"
            className={common}
            disabled={disabled}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        );
      default:
        return (
          <input
            type="text"
            className={common}
            placeholder={field.placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-helper text-slate-500">Editor</p>
          <p className="text-card-title font-semibold text-slate-900">
            Invoice data
          </p>
        </div>
        {readOnly && (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-caption font-semibold text-slate-700">
            Read‑only
          </span>
        )}
      </div>

      <div className="flex-1 overflow-auto space-y-8 pr-1">
        {demoSchema.sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-section-title font-semibold text-slate-900 mb-1">
              {section.label}
            </h3>
            {section.description && (
              <p className="text-caption text-slate-500 mb-3">
                {section.description}
              </p>
            )}

            <div className="grid gap-4">
              {demoSchema.fields
                .filter((f) => f.sectionId === section.id)
                .map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <label className="text-body font-medium text-slate-800">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-0.5">*</span>
                        )}
                      </label>
                      {field.readOnly && (
                        <span className="text-caption font-semibold text-slate-500">
                          Calculated
                        </span>
                      )}
                    </div>
                    {renderInput(field)}
                    {field.helperText && (
                      <p className="text-caption text-slate-500">
                        {field.helperText}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

