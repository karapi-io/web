export type InvoiceStage = "draft" | "review" | "locked";
export type ProjectVisibility = "public" | "private";
export type CreatedVia = "manual" | "api";
export type ApprovalStatus = "pending" | "approved" | "changes_requested";
export type CommentStatus = "open" | "resolved";

export interface Collaborator {
    id: string;
    name: string;
    role: "owner" | "editor" | "reviewer";
    avatarUrl?: string;
}

export interface ApprovalLevel {
    id: string;
    label: string;
    requiredApprovals: number;
    status: ApprovalStatus;
    reviewers: Collaborator[];
}

export interface InvoiceBranch {
    id: string;
    name: string;
    status: "active" | "archived";
    createdBy: string;
}

export interface InvoiceProject {
    id: string;
    name: string;
    clientName: string;
    updatedAt: string;
    stage: InvoiceStage;
    visibility: ProjectVisibility;
    createdVia: CreatedVia;
    template: string;
    totalAmount: string;
    reviewId?: string;
    branches: InvoiceBranch[];
    collaborators: Collaborator[];
    approvalLevels: ApprovalLevel[];
}

export interface ReviewComment {
    id: string;
    author: string;
    message: string;
    lineRef: string;
    status: CommentStatus;
    createdAt: string;
}

export interface InvoiceReview {
    id: string;
    projectId: string;
    visibility: ProjectVisibility;
    reviewers: Collaborator[];
    approvals: ApprovalLevel[];
    comments: ReviewComment[];
    reviewLink: string;
}
