export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "money"
  | "date"
  | "select";

export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  sectionId: string;
  required?: boolean;
  readOnly?: boolean;
  readOnlyIfApi?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
}

export interface SectionDefinition {
  id: string;
  label: string;
  description?: string;
}

export interface TemplateSchema {
  id: string;
  name: string;
  version: number;
  sections: SectionDefinition[];
  fields: FieldDefinition[];
}

export type InvoiceData = Record<string, any>;

export interface InvoiceSnapshot {
  id: string;
  label: string;
  createdAt: string;
  createdBy: string;
  data: InvoiceData;
}

export interface ReviewComment {
  id: string;
  author: string;
  createdAt: string;
  fieldId?: string;
  message: string;
}

export interface ReviewRequest {
  id: string;
  title: string;
  status: "open" | "merged" | "closed";
  sourceBranch: string;
  targetBranch: string;
  reviewers: string[];
  createdAt: string;
  createdBy: string;
  snapshotId: string;
}


