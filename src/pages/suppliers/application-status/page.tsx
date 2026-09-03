import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import type { SupplierApplicationDraft } from "@/data/supplierApplicationTypes";
import { LOCAL_STATUS_LABELS } from "@/data/supplierApplicationTypes";
import { loadDraft, saveDraft, deleteDraft, createRevisedDraft, loadDraftMeta, hasExistingDraft } from "@/utils/applicationStorage";
import { formatDate } from "@/data/supplierApplicationDefaults";
import { validateAllStages } from "@/utils/applicationValidation";

export default function ApplicationStatus() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SupplierApplicationDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasDraft, setHasDraft] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const loaded = loadDraft();
    setDraft(loaded);
    setHasDraft(!!loaded);
    setLoading(false);
  }, []);

  const handleResume = useCallback(() => {
    if (!draft) return;
    // Navigate to first incomplete stage
    const results = validateAllStages(draft);
    const firstIncomplete = results.find((r) => !r.valid);
    const targetStage = firstIncomplete ? firstIncomplete.stage : Math.min(draft.metadata.completedStages.length + 1, 10);
    const updated = { ...draft, metadata: { ...draft.metadata, currentStage: targetStage } };
    saveDraft(updated);
    navigate("/suppliers/apply");
  }, [draft, navigate]);

  const handleStartNew = useCallback(() => {
    deleteDraft();
    navigate("/suppliers/apply");
  }, [navigate]);

  const handleCreateRevised = useCallback(() => {
    if (!draft) return;
    const revised = createRevisedDraft(draft);
    saveDraft(revised);
    navigate("/suppliers/apply");
  }, [draft, navigate]);

  const handleViewSubmission = useCallback(() => {
    navigate("/suppliers/apply/confirmation");
  }, [navigate]);

  if (loading) {
    return (
      <>
        <PublicHeader />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-foreground-500">Loading...</p>
        </div>
      </>
    );
  }

  // No application
  if (!hasDraft || !draft) {
    return (
      <>
        <PublicHeader />
        <section className="bg-background-50">
          <div className="mx-auto max-w-7xl px-4 pb-14 pt-20 md:px-6 md:pt-24 md:pb-18">
            <div className="mx-auto max-w-lg text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground-200/10 border border-foreground-200/15">
                  <i className="ri-file-search-line text-3xl text-foreground-500" />
                </div>
              </div>
              <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                No application found
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-foreground-500">
                There is no supplier application saved in this browser. Start a new application to begin.
              </p>
              <div className="mt-8">
                <button type="button" onClick={() => navigate("/suppliers/apply")} className="whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
                  Start a new application
                </button>
              </div>
            </div>
          </div>
        </section>
        <PublicFooter />
      </>
    );
  }

  const m = draft.metadata;
  const o = draft.organisation;
  const p = draft.product;
  const results = validateAllStages(draft);
  const completeCount = results.filter((r) => r.valid).length;
  const isSubmitted = m.localStatus === "demonstration_submitted";
  const isDraft = m.localStatus === "draft" || m.localStatus === "ready_for_review" || m.localStatus === "revised_draft";

  let statusVariant = "bg-foreground-200/10 text-foreground-400";
  if (m.localStatus === "demonstration_submitted") statusVariant = "bg-primary-500/10 text-primary-400";

  return (
    <>
      <PublicHeader />

      {/* Breadcrumb */}
      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/suppliers")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Suppliers</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Application Status</li>
          </ol>
        </div>
      </nav>

      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 md:px-6 md:pt-18 md:pb-18">
          <div className="mx-auto max-w-2xl">
            <p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-primary-400 uppercase">Supplier Application</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Application status
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground-500">
              Review the status of your demonstration application. All information is stored in this browser only.
            </p>

            {/* Status card */}
            <div className="mt-8 rounded-xl border border-foreground-200/10 bg-background-100 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <h2 className="text-sm font-semibold text-foreground-200">
                  {isSubmitted && m.demonstrationReference ? m.demonstrationReference : "Application draft"}
                </h2>
                <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium ${statusVariant}`}>
                  {LOCAL_STATUS_LABELS[m.localStatus]}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Organisation</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">{o.legalName || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Product</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">{p.productName || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Completion</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">{completeCount} of 10 stages</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Created</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">{formatDate(m.createdDate)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Last saved</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">{formatDate(m.lastSavedDate)}</p>
                </div>
                {isSubmitted && m.submissionDate && (
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Submitted</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground-200">{formatDate(m.submissionDate)}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Storage</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">This browser only</p>
                </div>
                {m.localAppId && (
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Local ID</p>
                    <p className="mt-0.5 text-xs font-mono text-foreground-400 truncate">{m.localAppId}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Notice */}
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 p-4">
              <div className="flex items-start gap-2.5">
                <i className="ri-information-line mt-0.5 shrink-0 text-xs text-[#ff2e88]" />
                <p className="text-xs leading-relaxed text-foreground-500">
                  {isSubmitted
                    ? "This demonstration submission exists only in this browser. DataHarbour has not received this application and no review is in progress."
                    : "This draft is stored only in this browser. DataHarbour has not received any information and no review process has been started."}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {isDraft && (
                <button type="button" onClick={handleResume} className="whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
                  Resume application
                </button>
              )}
              {isSubmitted && (
                <>
                  <button type="button" onClick={handleViewSubmission} className="whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
                    View submission
                  </button>
                  <button type="button" onClick={handleCreateRevised} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
                    Create revised draft
                  </button>
                </>
              )}
              {isDraft && (
                <button type="button" onClick={() => setShowDeleteConfirm(true)} className="whitespace-nowrap rounded-lg border border-[#ff2e88]/20 bg-transparent px-5 py-2.5 text-xs font-medium text-[#ff2e88] transition hover:border-[#ff2e88]/40 cursor-pointer">
                  Delete draft
                </button>
              )}
              <button type="button" onClick={() => navigate("/suppliers")} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
                Suppliers
              </button>
              <button type="button" onClick={() => navigate("/contact?type=supplier")} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
                Contact supplier team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-xs rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="alertdialog" aria-modal="true">
            <p className="text-sm font-semibold text-foreground-200 mb-2">Delete application draft?</p>
            <p className="text-xs text-foreground-500">This permanently removes your draft from this browser. This action cannot be undone.</p>
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setShowDeleteConfirm(false)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleStartNew} className="flex-1 whitespace-nowrap rounded-lg bg-[#ff2e88] px-3 py-2 text-xs font-medium text-white cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </>
  );
}