import type {
  TemplateSchema,
  InvoiceData,
  InvoiceSnapshot,
  ReviewRequest,
  ReviewComment,
} from "./types";

export const demoSchema: TemplateSchema = {
  id: "modern-saas",
  name: "Modern SaaS Invoice",
  version: 1,
  sections: [
    {
      id: "header",
      label: "Invoice header",
      description: "Basic information about the document and client.",
    },
    {
      id: "amounts",
      label: "Amounts",
      description: "Currency, tax and totals.",
    },
    {
      id: "meta",
      label: "Meta",
      description: "Extra information shown at the bottom of the invoice.",
    },
  ],
  fields: [
    {
      id: "client_name",
      label: "Client name",
      type: "text",
      sectionId: "header",
      required: true,
      placeholder: "Acme Corp",
    },
    {
      id: "client_email",
      label: "Client email",
      type: "text",
      sectionId: "header",
      placeholder: "billing@acme.com",
    },
    {
      id: "invoice_number",
      label: "Invoice number",
      type: "text",
      sectionId: "header",
      required: true,
      helperText: "Visible to client and used for reconciliation.",
    },
    {
      id: "invoice_date",
      label: "Invoice date",
      type: "date",
      sectionId: "header",
      required: true,
    },
    {
      id: "due_date",
      label: "Due date",
      type: "date",
      sectionId: "header",
      required: true,
    },
    {
      id: "currency",
      label: "Currency",
      type: "select",
      sectionId: "amounts",
      required: true,
      options: [
        { value: "INR", label: "INR ₹" },
        { value: "USD", label: "USD $" },
        { value: "EUR", label: "EUR €" },
      ],
    },
    {
      id: "tax_rate",
      label: "Tax rate (%)",
      type: "number",
      sectionId: "amounts",
      required: true,
    },
    {
      id: "subtotal",
      label: "Subtotal",
      type: "money",
      sectionId: "amounts",
      readOnly: true,
      helperText: "Calculated from line items (mocked for now).",
    },
    {
      id: "total",
      label: "Total amount",
      type: "money",
      sectionId: "amounts",
      readOnly: true,
    },
    {
      id: "notes",
      label: "Notes / Description",
      type: "textarea",
      sectionId: "meta",
      placeholder: "Thank you for your business.",
    },
    {
      id: "payment_terms",
      label: "Payment terms",
      type: "textarea",
      sectionId: "meta",
      placeholder: "Payment due within 15 days via bank transfer or UPI.",
    },
  ],
};

export const demoInvoiceData: InvoiceData = {
  client_name: "Acme Corp",
  client_email: "billing@acme.com",
  invoice_number: "INV-2026-089",
  invoice_date: "2026-01-24",
  due_date: "2026-02-10",
  currency: "INR",
  tax_rate: 18,
  subtotal: 50000,
  total: 59000,
  notes: "Q4 retainer for kar{API} workspace.\nIncludes API usage and support.",
  payment_terms: "Payment due within 15 days via NEFT/RTGS or UPI.\nLate fee of 1.5% per month applies after due date.",
};

export const demoSnapshot: InvoiceSnapshot = {
  id: "snap_1",
  label: "Review request #1",
  createdAt: "2026-01-20T10:15:00Z",
  createdBy: "prashant@karapi.io",
  data: {
    ...demoInvoiceData,
    notes:
      "Q4 retainer for kar{API} workspace.\n\nIncludes API usage and basic support only.",
    tax_rate: 12,
    total: 56000,
  },
};

export const demoReview: ReviewRequest = {
  id: "review_12",
  title: "Review Q4‑2024 invoice",
  status: "open",
  sourceBranch: "draft",
  targetBranch: "review/main",
  reviewers: ["cfo@acme.com", "controller@acme.com"],
  createdAt: "2026-01-21T09:00:00Z",
  createdBy: "prashant@karapi.io",
  snapshotId: demoSnapshot.id,
};

export const demoReviewComments: ReviewComment[] = [
  {
    id: "c1",
    author: "cfo@acme.com",
    createdAt: "2026-01-21T10:05:00Z",
    fieldId: "tax_rate",
    message: "Can we confirm GST should be 18% here instead of 12%?",
  },
  {
    id: "c2",
    author: "controller@acme.com",
    createdAt: "2026-01-21T10:15:00Z",
    fieldId: "notes",
    message:
      "Please mention that this covers API usage + L2 support, not implementation.",
  },
];

export const demoReviews: ReviewRequest[] = [demoReview];


