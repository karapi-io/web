import type { Template, OutputFormat } from "../../../types/api";

// V1 Template Definitions with Preview Images
export const V1_TEMPLATES: Template[] = [
    {
        id: 'service',
        title: 'Service 🏢',
        name: 'service',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-1.webp',
        tags: ['MNCs', 'Consulting', 'B2B'],
        description: 'Embrace the sleek and trending design of this template, ideal for businesses that want a clean, contemporary invoice look.',
        badge: 'Popular',
    },
    {
        id: 'ecom',
        title: 'Ecommerce 🛍️',
        name: 'ecom',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-10.webp',
        tags: ['Supermarket', 'POS', 'Fast Moving'],
        description: 'Optimized for high-volume line items. Compact layout ensures you fit more products on a single page.',
        badge: 'Fast',
    },
    {
        id: 'vintage',
        title: 'Vintage 🎨',
        name: 'Vintage',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-7.webp',
        tags: ['Freelancers', 'Designers', 'Clean'],
        description: 'Less is more. A distraction-free layout that puts the focus entirely on the work delivered.',
        badge: 'Simple',
    },
    {
        id: 'Evergreen',
        title: 'Evergreen 🎨',
        name: 'evergreen',
        img: 'https://getswipe.azureedge.net/getswipe/images/templates/small/temp-14.webp',
        tags: ['Creative', 'Social Media', 'Bold'],
        description: 'Stand out with vibrant headers and a layout that screams creativity. Perfect for digital agencies.',
        badge: 'Creative',
    },
];

// V1 Sample Payloads for each template
export const V1_TEMPLATE_PAYLOADS: Record<string, object> = {
    'service': {
        template: "service",
        invoice: {
            invoiceNumber: "INV-1021",
            date: "2026-01-06",
            dueDate: "2026-01-15",
            placeOfSupply: "Maharashtra",
            currency: "INR",
            seller: {
                name: "Acme Corporation",
                gst: "29ABCDE1234F1Z5",
                state: "Karnataka",
                address: "601 Tech Park, Whitefield, Bangalore - 560066",
                mobile: "9876543210",
                email: "billing@acme.io",
                isGstRegistered: true,
                signatory: "CFO",
                useInitialAsLogo: true
            },
            client: {
                name: "Enterprise Solutions Ltd",
                address: "BKC, Mumbai, Maharashtra",
                state: "Maharashtra",
                mobile: "9123456789",
                gst: "26ABCDE5678F1Z2"
            },
            items: [
                {
                    description: "Enterprise License – Q1",
                    hsn: "9983",
                    rate: 500000,
                    quantity: 1,
                    taxRate: 18
                }
            ],
            taxRate: 18,
            bank: {
                name: "HDFC Bank",
                account: "1234567890",
                ifsc: "HDFC0000123",
                branch: "Bangalore"
            },
            notes: "Payment due within 30 days"
        },
        output: "binary"
    },
    'ecom': {
        template: "ecom",
        invoice: {
            invoiceNumber: "RET-5001",
            date: "2026-01-06",
            currency: "INR",
            seller: {
                name: "QuickMart Retail",
                address: "MG Road, Bangalore",
                mobile: "9876543210",
                email: "pos@quickmart.in",
                isGstRegistered: true,
                gst: "29XXXXX1234X1Z5"
            },
            client: {
                name: "Walk-in Customer",
                mobile: "9000000000"
            },
            items: [
                { description: "Milk 1L", rate: 60, quantity: 2, hsn: "0401", taxRate: 5 },
                { description: "Bread", rate: 45, quantity: 1, hsn: "1905", taxRate: 5 },
                { description: "Eggs (12pc)", rate: 90, quantity: 1, hsn: "0407", taxRate: 0 }
            ],
            notes: "Thank you for shopping!"
        },
        output: "binary"
    },
    'vintage': {
        template: "vintage",
        invoice: {
            invoiceNumber: "INV-2001",
            date: "2026-01-06",
            dueDate: "2026-01-15",
            currency: "INR",
            seller: {
                name: "Prashant Pathak",
                address: "Hyderabad, India",
                mobile: "9876543210",
                email: "hello@prashant.design",
                isGstRegistered: false,
                useInitialAsLogo: true
            },
            client: {
                name: "Startup Inc",
                address: "Mumbai, India",
                mobile: "9123456789"
            },
            items: [
                { description: "Brand Identity Design", rate: 75000, quantity: 1 },
                { description: "Website UI/UX", rate: 120000, quantity: 1 }
            ],
            bank: {
                name: "ICICI Bank",
                account: "9876543210",
                ifsc: "ICIC0000456"
            },
            notes: "Thank you for your business"
        },
        output: "binary"
    },
    'evergreen': {
        template: "evergreen",
        invoice: {
            invoiceNumber: "AGN-3001",
            date: "2026-01-06",
            dueDate: "2026-01-20",
            currency: "USD",
            seller: {
                name: "Pixel Perfect Agency",
                address: "Creative Hub, San Francisco, CA",
                mobile: "+1-555-0123",
                email: "hello@pixelperfect.agency",
                isGstRegistered: false,
                useInitialAsLogo: true
            },
            client: {
                name: "TechBrand Co",
                address: "Austin, TX",
                email: "finance@techbrand.co"
            },
            items: [
                { description: "Social Media Campaign (30 days)", rate: 5000, quantity: 1 },
                { description: "Video Production (3 videos)", rate: 3000, quantity: 3 },
                { description: "Influencer Outreach", rate: 2500, quantity: 1 }
            ],
            notes: "Net 15 payment terms"
        },
        output: "binary"
    },
};

// V1 Bill of Supply payload (non-GST)
export const V1_BILL_OF_SUPPLY_PAYLOAD = {
    template: "service",
    invoice: {
        invoiceNumber: "INV-2001",
        date: "2026-01-06",
        dueDate: "2026-01-15",
        currency: "INR",
        seller: {
            name: "Prashant Pathak",
            address: "Hyderabad, India",
            mobile: "9876543210",
            email: "support@karapi.io",
            isGstRegistered: false,
            useInitialAsLogo: true
        },
        client: {
            name: "Freelance Client",
            address: "Mumbai, India",
            mobile: "9123456789"
        },
        items: [
            {
                description: "Website Development",
                rate: 50000,
                quantity: 1
            },
            {
                description: "Hosting",
                rate: 2000,
                quantity: 3
            }
        ],
        bank: {
            name: "ICICI Bank",
            account: "9876543210",
            ifsc: "ICIC0000456"
        },
        notes: "Thank you for your business"
    },
    output: "binary"
};

// V1 Output format options
export const V1_OUTPUT_FORMATS: OutputFormat[] = [
    { id: "binary", label: "PDF", description: "Download as PDF file" },
    { id: "html", label: "HTML", description: "Raw HTML output" },
    { id: "link", label: "Link", description: "Get hosted URL" }
];
