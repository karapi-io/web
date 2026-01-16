import type { SchemaField } from "../../../types/api";

// V1 API Schema
export const V1_SCHEMA: SchemaField[] = [
    {
        field: "template",
        type: "string",
        required: true,
        description: "Template identifier. Available: 'modern-gst' (Tax Invoice) or 'service' (Bill of Supply)."
    },
    {
        field: "output",
        type: "string",
        required: false,
        default: "binary",
        description: "Response format. Options: 'binary' (PDF blob), 'html' (raw HTML string), 'link' (hosted URL)."
    },
    {
        field: "invoice",
        type: "object",
        required: true,
        description: "Main invoice data container with all billing information.",
        children: [
            {
                field: "invoiceNumber",
                type: "string",
                required: true,
                description: "Unique invoice identifier (e.g., 'INV-1021')."
            },
            {
                field: "date",
                type: "string",
                required: true,
                description: "Invoice date in YYYY-MM-DD format."
            },
            {
                field: "dueDate",
                type: "string",
                required: false,
                description: "Payment due date in YYYY-MM-DD format."
            },
            {
                field: "currency",
                type: "string",
                required: false,
                default: "INR",
                description: "Currency code (ISO 4217). Currently supports INR."
            },
            {
                field: "placeOfSupply",
                type: "string",
                required: false,
                description: "State where goods/services are supplied. Required for GST invoices."
            },
            {
                field: "taxRate",
                type: "number",
                required: false,
                default: "18",
                description: "Default tax rate percentage for items without explicit taxRate."
            }
        ]
    },
    {
        field: "invoice.seller",
        type: "object",
        required: true,
        description: "Seller/Business details for the invoice header.",
        children: [
            {
                field: "name",
                type: "string",
                required: true,
                description: "Business or seller name."
            },
            {
                field: "address",
                type: "string",
                required: true,
                description: "Full business address."
            },
            {
                field: "state",
                type: "string",
                required: false,
                description: "State name. Required for GST calculations."
            },
            {
                field: "gst",
                type: "string",
                required: false,
                description: "15-digit GSTIN number. Required if isGstRegistered is true."
            },
            {
                field: "mobile",
                type: "string",
                required: false,
                description: "Contact phone number."
            },
            {
                field: "email",
                type: "string",
                required: false,
                description: "Contact email address."
            },
            {
                field: "isGstRegistered",
                type: "boolean",
                required: false,
                default: "false",
                description: "Set true to enable GST fields and calculations."
            },
            {
                field: "signatory",
                type: "string",
                required: false,
                description: "Name to show in signature area."
            },
            {
                field: "useInitialAsLogo",
                type: "boolean",
                required: false,
                default: "false",
                description: "Generate logo from seller name initials."
            }
        ]
    },
    {
        field: "invoice.client",
        type: "object",
        required: true,
        description: "Client/Buyer details for billing.",
        children: [
            {
                field: "name",
                type: "string",
                required: true,
                description: "Client or company name."
            },
            {
                field: "address",
                type: "string",
                required: true,
                description: "Full billing address."
            },
            {
                field: "state",
                type: "string",
                required: false,
                description: "State for determining CGST/SGST vs IGST."
            },
            {
                field: "gst",
                type: "string",
                required: false,
                description: "Client's GSTIN if B2B transaction."
            },
            {
                field: "mobile",
                type: "string",
                required: false,
                description: "Client phone number."
            }
        ]
    },
    {
        field: "invoice.items",
        type: "array",
        required: true,
        description: "Line items array. Each item represents a product or service.",
        children: [
            {
                field: "description",
                type: "string",
                required: true,
                description: "Item name or description."
            },
            {
                field: "rate",
                type: "number",
                required: true,
                description: "Unit price in specified currency."
            },
            {
                field: "quantity",
                type: "number",
                required: true,
                description: "Quantity of items."
            },
            {
                field: "hsn",
                type: "string",
                required: false,
                description: "HSN/SAC code for GST classification."
            },
            {
                field: "taxRate",
                type: "number",
                required: false,
                description: "Item-specific tax rate. Overrides invoice.taxRate."
            }
        ]
    },
    {
        field: "invoice.bank",
        type: "object",
        required: false,
        description: "Bank details for payment via NEFT/RTGS.",
        children: [
            {
                field: "name",
                type: "string",
                required: true,
                description: "Bank name."
            },
            {
                field: "account",
                type: "string",
                required: true,
                description: "Account number."
            },
            {
                field: "ifsc",
                type: "string",
                required: true,
                description: "IFSC code."
            },
            {
                field: "branch",
                type: "string",
                required: false,
                description: "Branch name."
            }
        ]
    },
    {
        field: "invoice.upiId",
        type: "string",
        required: false,
        description: "UPI ID for generating payment QR code."
    },
    {
        field: "invoice.notes",
        type: "string",
        required: false,
        description: "Additional notes or terms to display on invoice."
    }
];
