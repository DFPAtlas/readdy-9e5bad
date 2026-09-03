import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import type { SupplierApplicationDraft } from "@/data/supplierApplicationTypes";
import { APPLICATION_STAGES, generateLocalRef } from "@/data/supplierApplicationDefaults";
import { loadDraft, saveDraft, deleteDraft, createRevisedDraft, isSubmissionLocked } from "@/utils/applicationStorage";
import { validateAllStages, isApplicationComplete } from "@/utils/applicationValidation";
import {
  PRODUCT_TYPE_LABELS,
  ORGANISATION_TYPE_LABELS,
  SOURCE_CATEGORY_LABELS,
  REFRESH_LABELS,
  DOCUMENT_TYPE_LABELS,
  DELIVERY_FORMAT_LABELS,
  PRICING_MODEL_LABELS,
  LOCAL_STATUS_LABELS,
} from "@/data/supplierApplicationTypes";

function sectionCls(expanded: boolean) {
  return `rounded-lg border ${expanded ? "border-foreground-200/15" : "border-foreground-200/10"} bg-background-100 overflow-hidden`;
}

function toggleBtnCls() {
  return "flex w-full items-center justify-between px-5 py-3.5 text-left transition cursor-pointer hover:bg-background-200/50";
}

function badge(text: string, variant: "ok" | "warn" | "err") {
  const colors = {
    ok: "bg-primary-500/10 text-primary-400 border-primary-400/20",
    warn: "bg-amber-500/10 text-amber-400 border-amber-400/20",
    err: "bg-[#ff2e88]/10 text-[#ff2e88] border-[#ff2e88]/20",
  };
  return (
    <span className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium ${colors[variant]}`}>
      {text}
    </span>
  );
}

export default function ApplicationReview() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SupplierApplicationDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1]));
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    const loaded = loadDraft();
    if (!loaded) {
      navigate("/suppliers/apply");
      return;
    }
    // Redirect to first incomplete stage
    const results = validateAllStages(loaded);
    const firstIncomplete = results.find((r) => !r.valid);
    if (firstIncomplete && !isSubmissionLocked(loaded)) {
      // Allow access but show warning
    }
    setDraft(loaded);
    setLoading(false);
  }, [navigate]);

  const toggleSection = useCallback((stage: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(stage)) next.delete(stage);
      else next.add(stage);
      return next;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!draft || submitting) return;
    setSubmitting(true);

    const results = validateAllStages(draft);
    const allValid = results.every((r) => r.valid);
    if (!allValid) {
      setSubmitting(false);
      return;
    }

    const ref = generateLocalRef();
    const now = new Date().toISOString();
    const submitted: SupplierApplicationDraft = {
      ...draft,
      metadata: {
        ...draft.metadata,
        localStatus: "demonstration_submitted",
        demonstrationReference: ref,
        submissionDate: now,
        lastSavedDate: now,
      },
    };
    saveDraft(submitted);
    setShowSubmitConfirm(false);
    navigate("/suppliers/apply/confirmation");
  }, [draft, submitting, navigate]);

  const handleDelete = useCallback(() => {
    deleteDraft();
    navigate("/suppliers/apply");
  }, [navigate]);

  const handleCreateRevised = useCallback(() => {
    if (!draft) return;
    const revised = createRevisedDraft(draft);
    saveDraft(revised);
    navigate("/suppliers/apply");
  }, [draft, navigate]);

  const handleEditStage = useCallback(
    (stage: number) => {
      if (!draft) return;
      const updated = { ...draft, metadata: { ...draft.metadata, currentStage: stage } };
      saveDraft(updated);
      navigate("/suppliers/apply");
    },
    [draft, navigate],
  );

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (loading || !draft) {
    return (
      <>
        <PublicHeader />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-foreground-500">Loading application...</p>
        </div>
      </>
    );
  }

  const locked = isSubmissionLocked(draft);
  const validationResults = validateAllStages(draft);
  const allComplete = isApplicationComplete(draft);
  const warnings = validationResults.filter((r) => !r.valid).length;

  const o = draft.organisation;
  const p = draft.product;
  const r = draft.representative;

  return (
    <>
      <PublicHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/suppliers")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Suppliers</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li><button type="button" onClick={() => navigate("/suppliers/apply")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Apply</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Review</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-primary-400 uppercase">Application Review</p>
          <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Review your application
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-foreground-500">
            Review all sections before creating your demonstration submission. Nothing is transmitted to DataHarbour.
          </p>
        </div>

        {/* Status summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-foreground-200/10 bg-background-100 p-4">
            <p className="text-[11px] font-medium text-foreground-500 uppercase tracking-wide">Completion</p>
            <p className="mt-1 text-sm font-semibold text-foreground-200">
              {allComplete ? "All stages complete" : `${warnings} stage${warnings !== 1 ? "s" : ""} need attention`}
            </p>
          </div>
          <div className="rounded-lg border border-foreground-200/10 bg-background-100 p-4">
            <p className="text-[11px] font-medium text-foreground-500 uppercase tracking-wide">Status</p>
            <p className="mt-1 text-sm font-semibold text-foreground-200">{LOCAL_STATUS_LABELS[draft.metadata.localStatus]}</p>
          </div>
          <div className="rounded-lg border border-foreground-200/10 bg-background-100 p-4">
            <p className="text-[11px] font-medium text-foreground-500 uppercase tracking-wide">Storage</p>
            <p className="mt-1 text-sm font-semibold text-foreground-200">This browser only</p>
          </div>
        </div>

        {/* Warning message for incomplete */}
        {!allComplete && !locked && (
          <div className="mb-8 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-start gap-2.5">
              <i className="ri-error-warning-line mt-0.5 shrink-0 text-amber-400" />
              <div>
                <p className="text-sm font-semibold text-amber-400">Incomplete application</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground-500">
                  {warnings} stage{warnings !== 1 ? "s" : ""} {warnings === 1 ? "has" : "have"} missing or incomplete information. Edit each incomplete stage before submission.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Review sections */}
        <div className="space-y-3">
          {/* Stage 1: Eligibility */}
          <div className={sectionCls(expandedSections.has(1))}>
            <button type="button" onClick={() => toggleSection(1)} className={toggleBtnCls()} aria-expanded={expandedSections.has(1)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 1: Eligibility</span>
                {validationResults[0]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(1) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(1) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <dl className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(draft.eligibility).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-2 text-xs">
                      <dt className="text-foreground-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</dt>
                      <dd className="text-foreground-300 font-medium text-right">{val}</dd>
                    </div>
                  ))}
                </dl>
                {!locked && <button type="button" onClick={() => handleEditStage(1)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 2: Organisation */}
          <div className={sectionCls(expandedSections.has(2))}>
            <button type="button" onClick={() => toggleSection(2)} className={toggleBtnCls()} aria-expanded={expandedSections.has(2)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 2: Organisation</span>
                {validationResults[1]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(2) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(2) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-sm font-medium text-foreground-200">{o.legalName || "—"}</p>
                <p className="mt-0.5 text-xs text-foreground-500">{o.organisationType ? ORGANISATION_TYPE_LABELS[o.organisationType as keyof typeof ORGANISATION_TYPE_LABELS] || o.organisationType : ""} {o.registrationCountry ? `— ${o.registrationCountry}` : ""}</p>
                {!locked && <button type="button" onClick={() => handleEditStage(2)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 3: Representative */}
          <div className={sectionCls(expandedSections.has(3))}>
            <button type="button" onClick={() => toggleSection(3)} className={toggleBtnCls()} aria-expanded={expandedSections.has(3)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 3: Representative</span>
                {validationResults[2]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(3) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(3) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-sm font-medium text-foreground-200">{r.fullName || "—"}</p>
                <p className="mt-0.5 text-xs text-foreground-500">{r.jobTitle} {r.workEmail ? `— ${r.workEmail}` : ""}</p>
                {!locked && <button type="button" onClick={() => handleEditStage(3)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 4: Product */}
          <div className={sectionCls(expandedSections.has(4))}>
            <button type="button" onClick={() => toggleSection(4)} className={toggleBtnCls()} aria-expanded={expandedSections.has(4)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 4: Product</span>
                {validationResults[3]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(4) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(4) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-sm font-medium text-foreground-200">{p.productName || "—"}</p>
                <p className="mt-0.5 text-xs text-foreground-500">{p.productType ? PRODUCT_TYPE_LABELS[p.productType as keyof typeof PRODUCT_TYPE_LABELS] || p.productType : ""} {p.primaryCategory ? `— ${p.primaryCategory}` : ""}</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground-400 line-clamp-2">{p.shortDescription}</p>
                {!locked && <button type="button" onClick={() => handleEditStage(4)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 5: Provenance */}
          <div className={sectionCls(expandedSections.has(5))}>
            <button type="button" onClick={() => toggleSection(5)} className={toggleBtnCls()} aria-expanded={expandedSections.has(5)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 5: Sources &amp; Provenance</span>
                {validationResults[4]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(5) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(5) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-xs text-foreground-500">
                  {draft.provenance.sourceCategories.length > 0
                    ? draft.provenance.sourceCategories.map((c) => SOURCE_CATEGORY_LABELS[c]).join(", ")
                    : "No categories selected"}
                </p>
                <p className="mt-1 text-xs text-foreground-500">{draft.provenance.sources.length} source{draft.provenance.sources.length !== 1 ? "s" : ""} recorded</p>
                {!locked && <button type="button" onClick={() => handleEditStage(5)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 6: Rights */}
          <div className={sectionCls(expandedSections.has(6))}>
            <button type="button" onClick={() => toggleSection(6)} className={toggleBtnCls()} aria-expanded={expandedSections.has(6)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 6: Rights &amp; Licensing</span>
                {validationResults[5]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(6) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(6) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-xs text-foreground-500">Position: {draft.rights.ownershipPosition || "—"}</p>
                {!locked && <button type="button" onClick={() => handleEditStage(6)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 7: Quality */}
          <div className={sectionCls(expandedSections.has(7))}>
            <button type="button" onClick={() => toggleSection(7)} className={toggleBtnCls()} aria-expanded={expandedSections.has(7)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 7: Quality &amp; Refresh</span>
                {validationResults[6]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(7) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(7) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-xs text-foreground-500">Refresh: {draft.quality.refreshFrequency ? REFRESH_LABELS[draft.quality.refreshFrequency as keyof typeof REFRESH_LABELS] : "—"}</p>
                <p className="mt-1 text-xs text-foreground-500">{draft.quality.qualityChecks.length} quality check{draft.quality.qualityChecks.length !== 1 ? "s" : ""} recorded</p>
                {!locked && <button type="button" onClick={() => handleEditStage(7)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 8: Security */}
          <div className={sectionCls(expandedSections.has(8))}>
            <button type="button" onClick={() => toggleSection(8)} className={toggleBtnCls()} aria-expanded={expandedSections.has(8)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 8: Security &amp; Incidents</span>
                {validationResults[7]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(8) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(8) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-xs text-foreground-500">{draft.security.certifications.length} certification{draft.security.certifications.length !== 1 ? "s" : ""} listed</p>
                {!locked && <button type="button" onClick={() => handleEditStage(8)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 9: Delivery */}
          <div className={sectionCls(expandedSections.has(9))}>
            <button type="button" onClick={() => toggleSection(9)} className={toggleBtnCls()} aria-expanded={expandedSections.has(9)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 9: Delivery &amp; Commercial</span>
                {validationResults[8]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(9) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(9) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-xs text-foreground-500">
                  {draft.deliveryCommercial.deliveryFormats.length > 0
                    ? draft.deliveryCommercial.deliveryFormats.map((f) => DELIVERY_FORMAT_LABELS[f]).join(", ")
                    : "No formats selected"}
                </p>
                <p className="mt-1 text-xs text-foreground-500">
                  {draft.deliveryCommercial.preferredPricingModels.length > 0
                    ? draft.deliveryCommercial.preferredPricingModels.map((p) => PRICING_MODEL_LABELS[p]).join(", ")
                    : "No pricing models selected"}
                </p>
                {!locked && <button type="button" onClick={() => handleEditStage(9)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>

          {/* Stage 10: Documents */}
          <div className={sectionCls(expandedSections.has(10))}>
            <button type="button" onClick={() => toggleSection(10)} className={toggleBtnCls()} aria-expanded={expandedSections.has(10)}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground-200">Stage 10: Documents &amp; Declarations</span>
                {validationResults[9]?.valid ? badge("Complete", "ok") : badge("Incomplete", "err")}
              </div>
              {expandedSections.has(10) ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {expandedSections.has(10) && (
              <div className="border-t border-foreground-200/10 px-5 py-4">
                <p className="text-xs text-foreground-500">{draft.supportingDocuments.documents.length} document{draft.supportingDocuments.documents.length !== 1 ? "s" : ""} recorded</p>
                <p className="mt-1 text-xs text-foreground-500">
                  {Object.keys(draft.declarations).filter((k) => draft.declarations[k as keyof typeof draft.declarations]).length} of 9 declarations confirmed
                </p>
                {!locked && <button type="button" onClick={() => handleEditStage(10)} className="mt-3 text-xs text-primary-400 underline hover:text-primary-300 cursor-pointer">Edit stage</button>}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-foreground-200/10 pt-6">
          <button type="button" onClick={() => navigate("/suppliers/apply")} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
            <i className="ri-arrow-left-line mr-1.5" /> Back to application
          </button>
          <button type="button" onClick={handlePrint} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
            <i className="ri-printer-line mr-1.5" /> Print
          </button>
          {!locked && (
            <>
              <button type="button" onClick={() => setShowDeleteConfirm(true)} className="ml-auto whitespace-nowrap rounded-lg border border-[#ff2e88]/20 bg-transparent px-4 py-2.5 text-xs font-medium text-[#ff2e88] transition hover:border-[#ff2e88]/40 cursor-pointer">
                <i className="ri-delete-bin-line mr-1.5" /> Delete draft
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!allComplete) {
                    const firstIncomplete = validationResults.find((r) => !r.valid);
                    if (firstIncomplete) {
                      handleEditStage(firstIncomplete.stage);
                      return;
                    }
                  }
                  setShowSubmitConfirm(true);
                }}
                disabled={!allComplete}
                className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-xs font-medium transition cursor-pointer ${
                  allComplete
                    ? "bg-primary-500 text-background-950 hover:bg-primary-400"
                    : "bg-foreground-200/10 text-foreground-600 cursor-not-allowed"
                }`}
              >
                Create demonstration submission
              </button>
            </>
          )}
          {locked && (
            <button type="button" onClick={handleCreateRevised} className="ml-auto whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
              Create revised draft
            </button>
          )}
        </div>

        {/* Before-submission notices */}
        {!locked && allComplete && (
          <div className="mt-6 rounded-lg border border-foreground-200/10 bg-background-100 p-5">
            <h3 className="text-sm font-semibold text-foreground-200 mb-3">Before you submit</h3>
            <ul className="space-y-2 text-xs text-foreground-500">
              <li className="flex items-start gap-2"><i className="ri-check-line mt-0.5 text-primary-400" /> All 10 stages complete.</li>
              <li className="flex items-start gap-2"><i className="ri-check-line mt-0.5 text-primary-400" /> All 9 declarations confirmed.</li>
              <li className="flex items-start gap-2"><i className="ri-information-line mt-0.5 text-foreground-400" /> Submission creates a local demonstration record only. Nothing is transmitted to DataHarbour.</li>
              <li className="flex items-start gap-2"><i className="ri-information-line mt-0.5 text-foreground-400" /> All applications are subject to human review in a live environment. This demonstration does not trigger any review process.</li>
              <li className="flex items-start gap-2"><i className="ri-information-line mt-0.5 text-foreground-400" /> No acceptance, publication, buyer access or revenue is guaranteed.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-xs rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="alertdialog" aria-modal="true">
            <p className="text-sm font-semibold text-foreground-200 mb-2">Delete application draft?</p>
            <p className="text-xs text-foreground-500">This permanently removes your application draft from this browser. This action cannot be undone.</p>
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setShowDeleteConfirm(false)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleDelete} className="flex-1 whitespace-nowrap rounded-lg bg-[#ff2e88] px-3 py-2 text-xs font-medium text-white cursor-pointer">Delete draft</button>
            </div>
          </div>
        </div>
      )}

      {/* Submit confirmation */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSubmitConfirm(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-sm rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="alertdialog" aria-modal="true">
            <p className="text-sm font-semibold text-foreground-200 mb-2">Create demonstration submission?</p>
            <p className="text-xs text-foreground-500">This will lock your application and generate a local demonstration reference. Nothing will be transmitted to DataHarbour.</p>
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setShowSubmitConfirm(false)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={handleSubmit} disabled={submitting} className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-3 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 disabled:opacity-50 cursor-pointer">
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}