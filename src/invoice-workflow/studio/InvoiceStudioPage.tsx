import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { GitBranch, Sparkles, Split, ListFilter } from "lucide-react";
import { demoInvoiceData, demoSnapshot, demoReview, demoReviewComments } from "./mockData";
import type { InvoiceData, ReviewRequest, ReviewComment } from "./types";
import { InvoiceForm } from "./InvoiceForm";
import { InvoicePreview } from "./InvoicePreview";
import { InvoiceDiffView } from "./InvoiceDiffView";

type StudioTab = "editor" | "diff";

export default function InvoiceStudioPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<StudioTab>("editor");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(demoInvoiceData);

  const initialMode = searchParams.get("mode") === "review" ? "review" : "draft";
  const [stage, setStage] = useState<"draft" | "review">(initialMode);

  const activeReview: ReviewRequest | null = stage === "review" ? demoReview : null;
  const reviewComments: ReviewComment[] = stage === "review" ? demoReviewComments : [];

  const isDraftStage = stage === "draft";
  const canShowDiff = stage === "review";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/40">
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Breadcrumb + status */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <nav className="text-caption text-slate-500 mb-1">
              <span className="text-slate-400">Workspace /</span>{" "}
              <span className="text-slate-500">
                {username ?? "pashant-karapi"}
              </span>{" "}
              <span className="text-slate-400">/</span>{" "}
              <span className="text-slate-500">Q4‑2024‑retainer</span>
            </nav>
            <div className="flex items-center gap-2">
              <h1 className="text-page-title text-slate-900">Invoice editor</h1>
              {isDraftStage ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-caption font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Draft
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-caption font-semibold text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  In review
                </span>
              )}
            </div>
            <p className="text-body text-slate-600 mt-2">
              Edit invoice data on the left. Preview and review changes on the
              right before locking.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-caption font-semibold text-slate-700 hover:bg-slate-50">
              <ListFilter size={14} />
              View history
            </button>
            {isDraftStage ? (
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-caption font-semibold text-white hover:bg-slate-800"
                onClick={() => {
                  setStage("review");
                  setTab("diff");
                }}
              >
                <Sparkles size={14} />
                Send for review
              </button>
            ) : (
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-caption font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  setStage("draft");
                  setTab("editor");
                }}
              >
                <GitBranch size={14} />
                Back to draft
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-caption shadow-sm">
          <button
            onClick={() => setTab("editor")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
              tab === "editor"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Split size={14} />
            Editor & preview
          </button>
          {canShowDiff && (
            <button
              onClick={() => setTab("diff")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
                tab === "diff"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <GitBranch size={14} />
              Review diff
            </button>
          )}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Left column */}
          {!canShowDiff || tab === "editor" ? (
            <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
          ) : (
            <InvoiceDiffView current={invoiceData} snapshot={demoSnapshot} />
          )}

          {/* Right column */}
          {!canShowDiff || tab === "editor" ? (
            <InvoicePreview data={invoiceData} />
          ) : (
            <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <p className="text-helper text-slate-500">Preview</p>
                  <p className="text-card-title font-semibold text-slate-900">
                    Current invoice
                  </p>
                </div>
                <Link
                  to={`/${username ?? "pashant-karapi"}/invoice-projects`}
                  className="text-caption font-semibold text-violet-600 hover:text-violet-700"
                >
                  Back to list →
                </Link>
              </div>
              <div className="flex-1">
                <InvoicePreview data={invoiceData} />
              </div>
              {activeReview && (
                <div className="mt-4 border-t border-slate-200 pt-3 space-y-2">
                  <p className="text-caption font-semibold text-slate-900">
                    Review #{activeReview.id.replace("review_", "")} ·{" "}
                    <span className="text-amber-700">Open</span>
                  </p>
                  <p className="text-body text-slate-700">
                    {activeReview.title} –{" "}
                    <span className="font-mono">
                      {activeReview.sourceBranch} → {activeReview.targetBranch}
                    </span>
                  </p>
                  <p className="text-caption text-slate-500">
                    Reviewers:{" "}
                    {activeReview.reviewers.join(", ")}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Review comments (visible in review stage) */}
        {stage === "review" && (
          <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <p className="text-section-title font-semibold text-slate-900">
              Review comments
            </p>
            {reviewComments.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <p className="text-caption text-slate-500 mb-1">
                  {c.author} • {new Date(c.createdAt).toLocaleString()}
                </p>
                <p className="text-body text-slate-800 whitespace-pre-line">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

