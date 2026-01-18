import type { SchemaField } from "../../../types/api";

// V1 API Schema
export const V1_SCHEMA: SchemaField[] = [
    {
        field: "template",
        type: "string",
        required: true,
        description: "Template identifier. Available: service , ecom , vintage, evergreen are available for free tier, you can browse more in the templates section."
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
                required: false,
                description: "Unique invoice identifier (e.g., 'INV-1021'). if not provided, a random one will be generated."
            },
            {
                field: "date",
                type: "string",
                required: true,
                description: "Invoice date (ISO format: YYYY-MM-DD)"
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
                description: "State where goods/services are supplied. Required for GST invoices only Required if GST registered"
            },
            {
                field: "taxRate",
                type: "number",
                required: true,
                default: "18",
                description: "Tax rate is required for GST calculations (in percentage) but is not required for non-GST invoices. If item-specific tax rates are provided, they will override this value. Use 18 as the default if you are not sure."

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
                conditional: true,
                description: "State name. Required if GST missing."
            },
            {
                field: "gst",
                type: "string",
                required: false,
                conditional: true,
                description: "15-digit GSTIN number. Required if isGstRegistered is true and Required if GST registered OR state missing"
            },
            {
                field: "mobile",
                type: "string",
                required: true,
                description: "Contact phone number. 10-digit Indian mobile number"
            },
            {
                field: "email",
                type: "string",
                required: true,
                description: "Valid email address."
            },
            {
                field: "isGstRegistered",
                type: "boolean",
                required: true,
                description: "Set true to enable GST fields and calculations."
            },
            {
                field: "signatory",
                type: "string",
                required: false,
                description: "Name to show in signature area."
            },
            {
                field: "logo",
                type: "string",
                required: false,
                description: "Logo URL"
            },
            {
                field: "useInitialAsLogo",
                type: "boolean",
                required: false,
                default: "false",
                description: "Generate logo from seller name initials. if you don't provide a logo URL & this is set to false then logo will be omitted."
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
                required: true,
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
                required: true,
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
