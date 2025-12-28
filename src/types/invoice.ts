// src/types/invoice.ts

export interface LineItem {
    id: string;
    description: string;
    hsn: string;
    quantity: number;
    rate: number;
}

export interface InvoiceData {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    placeOfSupply: string;

    logo: string;
    sellerName: string;
    sellerAddress: string;
    sellerGst: string;
    sellerMobile: string;
    sellerEmail: string;
    isSellerGstRegistered: boolean;

    clientName: string;
    clientAddress: string;
    clientGst: string;
    clientMobile: string;

    items: LineItem[];
    currency: string;
    taxRate: number;

    bankName: string;
    bankAccount: string;
    bankIfsc: string;
    bankBranch: string;

    notes: string;
    terms: string;
    signatory: string;
}

export interface TemplateProps {
    data: InvoiceData;
    subtotal: number;
    taxAmount: number;
    total: number;
    isIGST: boolean;
}

// src/types/invoice.ts
export interface InvoiceData {
    // ... existing fields ...
    logoStyle?: { zoom: number; fit: 'contain' | 'cover' }; // You added this earlier
    upiId?: string; // <--- ADD THIS
}