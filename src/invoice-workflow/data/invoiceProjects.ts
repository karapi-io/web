import type { InvoiceProject, InvoiceReview } from "../types/invoiceWorkflow";

export const invoiceProjects: InvoiceProject[] = [
    {
        id: "proj_karapi_001",
        name: "April Retainer - Acme",
        clientName: "Acme Cloud Pvt Ltd",
        updatedAt: "2026-01-22T10:18:00Z",
        stage: "draft",
        visibility: "private",
        createdVia: "manual",
        template: "Modern SaaS",
        totalAmount: "₹ 1,24,000",
        reviewId: "rev_1001",
        branches: [
            { id: "branch_main", name: "main", status: "active", createdBy: "Aarav" },
            { id: "branch_q1", name: "q1-discount", status: "archived", createdBy: "Neha" }
        ],
        collaborators: [
            { id: "col_owner", name: "Aarav Sharma", role: "owner" },
            { id: "col_fin", name: "Neha Patel", role: "editor" }
        ],
        approvalLevels: [
            { id: "lvl_1", label: "Finance Review", requiredApprovals: 1, status: "pending", reviewers: [{ id: "col_fin", name: "Neha Patel", role: "reviewer" }] },
            { id: "lvl_2", label: "Director Signoff", requiredApprovals: 1, status: "pending", reviewers: [{ id: "col_dir", name: "Rahul Verma", role: "reviewer" }] }
        ]
    },
    {
        id: "proj_karapi_002",
        name: "Q1 Support Invoice",
        clientName: "Nimbus Labs",
        updatedAt: "2026-01-20T14:52:00Z",
        stage: "review",
        visibility: "public",
        createdVia: "api",
        template: "Corporate",
        totalAmount: "₹ 86,450",
        reviewId: "rev_1002",
        branches: [
            { id: "branch_main", name: "main", status: "active", createdBy: "Zoya" },
            { id: "branch_revision", name: "client-revision", status: "active", createdBy: "Karan" }
        ],
        collaborators: [
            { id: "col_owner2", name: "Zoya Khan", role: "owner" },
            { id: "col_review", name: "Karan Iyer", role: "reviewer" }
        ],
        approvalLevels: [
            { id: "lvl_1", label: "Client Review", requiredApprovals: 1, status: "changes_requested", reviewers: [{ id: "col_review", name: "Karan Iyer", role: "reviewer" }] }
        ]
    },
    {
        id: "proj_karapi_003",
        name: "Enterprise Renewal",
        clientName: "Vector Telecom",
        updatedAt: "2026-01-18T09:05:00Z",
        stage: "locked",
        visibility: "private",
        createdVia: "api",
        template: "Service",
        totalAmount: "₹ 4,95,000",
        reviewId: "rev_1003",
        branches: [
            { id: "branch_main", name: "main", status: "active", createdBy: "Simran" }
        ],
        collaborators: [
            { id: "col_owner3", name: "Simran Gupta", role: "owner" },
            { id: "col_fin2", name: "Arjun Rao", role: "reviewer" }
        ],
        approvalLevels: [
            { id: "lvl_1", label: "Finance Review", requiredApprovals: 2, status: "approved", reviewers: [{ id: "col_fin2", name: "Arjun Rao", role: "reviewer" }] }
        ]
    }
];

export const invoiceReviews: InvoiceReview[] = [
    {
        id: "rev_1001",
        projectId: "proj_karapi_001",
        visibility: "private",
        reviewers: [
            { id: "col_fin", name: "Neha Patel", role: "reviewer" },
            { id: "col_dir", name: "Rahul Verma", role: "reviewer" }
        ],
        approvals: [
            { id: "lvl_1", label: "Finance Review", requiredApprovals: 1, status: "pending", reviewers: [{ id: "col_fin", name: "Neha Patel", role: "reviewer" }] },
            { id: "lvl_2", label: "Director Signoff", requiredApprovals: 1, status: "pending", reviewers: [{ id: "col_dir", name: "Rahul Verma", role: "reviewer" }] }
        ],
        comments: [
            { id: "c_001", author: "Neha Patel", message: "Update GSTIN on seller details.", lineRef: "Seller → GSTIN", status: "open", createdAt: "2026-01-22T09:12:00Z" },
            { id: "c_002", author: "Rahul Verma", message: "Add PO number in notes.", lineRef: "Notes", status: "open", createdAt: "2026-01-22T09:15:00Z" }
        ],
        reviewLink: "https://karapi.io/review/rev_1001"
    },
    {
        id: "rev_1002",
        projectId: "proj_karapi_002",
        visibility: "public",
        reviewers: [
            { id: "col_review", name: "Karan Iyer", role: "reviewer" }
        ],
        approvals: [
            { id: "lvl_1", label: "Client Review", requiredApprovals: 1, status: "changes_requested", reviewers: [{ id: "col_review", name: "Karan Iyer", role: "reviewer" }] }
        ],
        comments: [
            { id: "c_003", author: "Karan Iyer", message: "Line 2 quantity should be 3 units.", lineRef: "Items → Line 2", status: "open", createdAt: "2026-01-20T14:30:00Z" },
            { id: "c_004", author: "Karan Iyer", message: "Logo alignment looks off on page 1.", lineRef: "Header", status: "resolved", createdAt: "2026-01-20T14:32:00Z" }
        ],
        reviewLink: "https://karapi.io/review/rev_1002"
    },
    {
        id: "rev_1003",
        projectId: "proj_karapi_003",
        visibility: "private",
        reviewers: [
            { id: "col_fin2", name: "Arjun Rao", role: "reviewer" }
        ],
        approvals: [
            { id: "lvl_1", label: "Finance Review", requiredApprovals: 2, status: "approved", reviewers: [{ id: "col_fin2", name: "Arjun Rao", role: "reviewer" }] }
        ],
        comments: [
            { id: "c_005", author: "Arjun Rao", message: "All good from finance side.", lineRef: "Summary", status: "resolved", createdAt: "2026-01-18T09:12:00Z" }
        ],
        reviewLink: "https://karapi.io/review/rev_1003"
    }
];

export const getInvoiceProject = (id: string) =>
    invoiceProjects.find((project) => project.id === id);

export const getInvoiceReview = (id: string) =>
    invoiceReviews.find((review) => review.id === id);
