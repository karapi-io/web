// Common API Types
export type OutputType = "binary" | "html" | "link";
export type InvoiceType = "tax-invoice" | "bill-of-supply";

// Schema Field Definition
export interface SchemaField {
    field: string;
    type: string;
    required: boolean;
    default?: string;
    description: string;
    children?: SchemaField[];
}

// Template Definition
export interface Template {
    id: string;
    title: string;
    name: string;
    img: string;
    tags: string[];
    description: string;
    badge?: string;
}

// Output Format Option
export interface OutputFormat {
    id: OutputType;
    label: string;
    description: string;
}

// API Response Types
export interface ApiResponse {
    type: "binary" | "html" | "json";
    url?: string;
    html?: string;
    json?: any;
}

// Version Status
export type ApiVersionStatus = "stable" | "beta" | "deprecated";

// Version Config
export interface ApiVersion {
    id: string;
    label: string;
    description: string;
    status: ApiVersionStatus;
    endpoint: string;
    apiKeyUrl: string;
}
