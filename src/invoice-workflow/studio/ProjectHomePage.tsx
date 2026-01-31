import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  GitBranch,
  Plus,
  Filter,
  Search,
  ArrowRight,
  Lock,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { demoReviews } from "./mockData";
import type { ReviewRequest } from "./types";

type ProjectTab = "overview" | "invoices" | "reviews" | "settings";

interface MockInvoiceRow {
  id: string;
  name: string;
  number: string;
  branch: string;
  status: "draft" | "review" | "locked";
  total: string;
  updatedAt: string;
}

const mockBranches = [
  { id: "draft", label: "draft", description: "Working copies" },
  { id: "review", label: "review", description: "Under review" },
  { id: "prod", label: "prod", description: "Locked, final invoices" },
];

const mockInvoices: MockInvoiceRow[] = [
  {
    id: "inv-2026-089",
    name: "Q4‑2024‑retainer",
    number: "INV‑2026‑089",
    branch: "draft",
    status: "draft",
    total: "₹59,000",
    updatedAt: "2 hours ago",
  },
  {
    id: "inv-2026-088",
    name: "November usage",
    number: "INV‑2026‑088",
    branch: "review",
    status: "review",
    total: "₹41,200",
    updatedAt: "1 day ago",
  },
  {
    id: "inv-2026-087",
    name: "October usage",
    number: "INV‑2026‑087",
    branch: "prod",
    status: "locked",
    total: "₹38,900",
    updatedAt: "3 days ago",
  },
];

export default function ProjectHomePage() {
  const { username, projectSlug } = useParams<{
    username: string;
    projectSlug: string;
  }>();

  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");
  const [branch, setBranch] = useState<string>("draft");

  const projectName = projectSlug ?? "q4-2024-retainer";

  const filteredInvoices = mockInvoices.filter(
    (row) => row.branch === branch || branch === "all"
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-7 space-y-6">
        {/* Top project header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-caption font-semibold text-slate-700">
                  Invoice project
                </span>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <h1 className="text-page-title text-slate-900">
                {projectName}
              </h1>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-caption font-semibold text-slate-700">
                Private
              </span>
            </div>
            <p className="text-body text-slate-600 mt-1.5">
              Draft, review and lock invoices for this client retainer – stages
              behave like branches in GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-caption font-semibold text-slate-700 hover:bg-slate-50">
              <Filter size={14} />
              Branch rules
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-caption font-semibold text-white hover:bg-slate-800">
              <Plus size={14} />
              New invoice
            </button>
          </div>
        </div>

        {/* Branch selector + search row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-body text-slate-700">
            <GitBranch size={16} className="text-slate-500" />
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="bg-transparent text-body text-slate-800 focus:outline-none"
            >
              {mockBranches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
              <option value="all">All branches</option>
            </select>
            <span className="hidden md:inline text-caption text-slate-500">
              {mockBranches.find((b) => b.id === branch)?.description ??
                "Show invoices from all branches."}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-500">
              <Search size={14} />
              <input
                type="text"
                placeholder="Go to invoice…"
                className="w-40 md:w-56 bg-transparent text-body text-slate-700 placeholder:text-caption placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav className="flex items-center gap-2 text-caption">
            {[
              { id: "overview", label: "Overview" },
              { id: "invoices", label: "Invoices" },
              { id: "reviews", label: "Reviews" },
              { id: "settings", label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProjectTab)}
                className={`relative px-3 py-2 text-caption font-semibold border-b-2 ${
                  activeTab === tab.id
                    ? "border-violet-600 text-slate-900"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Metrics + activity */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="card-elevated rounded-2xl p-4">
                <p className="text-caption text-slate-500 mb-1">
                  Draft invoices
                </p>
                <p className="text-section-title font-bold text-slate-900">
                  3
                </p>
                <p className="text-caption text-slate-500 mt-1">
                  Work in progress on <span className="font-semibold">draft</span>.
                </p>
              </div>
              <div className="card-elevated rounded-2xl p-4">
                <p className="text-caption text-slate-500 mb-1">
                  In review
                </p>
                <p className="text-section-title font-bold text-amber-700">
                  1
                </p>
                <p className="text-caption text-slate-500 mt-1">
                  Waiting for approval before merge.
                </p>
              </div>
              <div className="card-elevated rounded-2xl p-4">
                <p className="text-caption text-slate-500 mb-1">
                  Locked in prod
                </p>
                <p className="text-section-title font-bold text-emerald-700">
                  8
                </p>
                <p className="text-caption text-slate-500 mt-1">
                  Final invoices on <span className="font-semibold">prod</span>.
                </p>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-section-title font-semibold text-slate-900">
                  Recent branch activity
                </p>
                <button className="text-caption font-semibold text-slate-600 hover:text-slate-900">
                  View full history →
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center">
                    <GitBranch size={16} className="text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body text-slate-800">
                      <span className="font-semibold">
                        draft
                      </span>{" "}
                      branched off into{" "}
                      <span className="font-semibold">review</span> for Q4
                      invoice.
                    </p>
                    <p className="text-caption text-slate-500 mt-1">
                      2 hours ago • by {username ?? "prashant-karapi"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body text-slate-800">
                      Invoice <span className="font-semibold">
                        INV‑2026‑087
                      </span>{" "}
                      was approved and merged into{" "}
                      <span className="font-semibold">prod</span>.
                    </p>
                    <p className="text-caption text-slate-500 mt-1">
                      1 day ago • by Finance team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-section-title font-semibold text-slate-900">
                Invoices on <span className="font-mono">{branch}</span>
              </p>
              <p className="text-caption text-slate-500">
                Showing {filteredInvoices.length} of {mockInvoices.length} total
                invoices.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-6 px-4 py-2 border-b border-slate-200 bg-slate-50 text-caption font-semibold text-slate-500">
                <div className="col-span-2">Invoice</div>
                <div>Branch</div>
                <div>Status</div>
                <div className="text-right">Total</div>
                <div className="text-right">Actions</div>
              </div>
              {filteredInvoices.map((row, idx) => (
                <div
                  key={row.id}
                  className={`grid grid-cols-6 px-4 py-3 text-body text-slate-800 ${
                    idx !== filteredInvoices.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" />
                      <div>
                        <p className="font-semibold text-slate-900">
                          {row.name}
                        </p>
                        <p className="text-caption text-slate-500">
                          {row.number} • {row.updatedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-caption text-slate-700">
                      <GitBranch size={12} />
                      {row.branch}
                    </span>
                  </div>
                  <div>
                    {row.status === "locked" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-caption text-white">
                        <Lock size={12} />
                        Locked
                      </span>
                    ) : row.status === "review" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-caption text-amber-700">
                        <Clock size={12} />
                        In review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-caption text-emerald-700">
                        <CheckCircle2 size={12} />
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="text-right font-semibold">{row.total}</div>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/${username ?? "pashant-karapi"}/studio-demo`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-caption font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-caption font-semibold text-violet-600 hover:bg-violet-50">
                      Compare
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-section-title font-semibold text-slate-900">
                Reviews
              </p>
              <button className="text-caption font-semibold text-slate-600 hover:text-slate-900">
                New review request
              </button>
            </div>
            {demoReviews.length === 0 ? (
              <p className="text-body text-slate-600">
                No review requests yet. Once you send an invoice for review,
                it will appear here with its status.
              </p>
            ) : (
              <div className="space-y-3">
                {demoReviews.map((review: ReviewRequest) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <GitBranch size={14} className="text-violet-600" />
                        <p className="text-body font-semibold text-slate-900">
                          {review.title}
                        </p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-caption font-semibold text-amber-700">
                        Open
                      </span>
                    </div>
                    <p className="text-caption text-slate-600">
                      {review.sourceBranch} → {review.targetBranch} •{" "}
                      Reviewers: {review.reviewers.join(", ")}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-caption text-slate-500">
                        Created by {review.createdBy} on{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      <Link
                        to={`/${username ?? "pashant-karapi"}/studio-demo?mode=review`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-caption font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Open review
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <p className="text-section-title font-semibold text-slate-900">
              Project settings
            </p>
            <p className="text-body text-slate-600">
              Here you will configure default templates, allowed branches, API
              usage and retention rules for this invoice project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

