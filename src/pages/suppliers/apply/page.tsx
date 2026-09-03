import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import type { SupplierApplicationDraft } from "@/data/supplierApplicationTypes";
import { createEmptyDraft, generateLocalRef } from "@/data/supplierApplicationDefaults";
import { loadDraft, saveDraft, deleteDraft, createRevisedDraft, hasExistingDraft, isSubmissionLocked, canEditStatus } from "@/utils/applicationStorage";
import { validateAllStages } from "@/utils/applicationValidation";
import ApplicationLayout from "./components/ApplicationLayout";
import Stage1Eligibility from "./components/stages/Stage1Eligibility";
import Stage2Organisation from "./components/stages/Stage2Organisation";
import Stage3Representative from "./components/stages/Stage3Representative";
import Stage4Product from "./components/stages/Stage4Product";
import Stage5Provenance from "./components/stages/Stage5Provenance";
import Stage6Rights from "./components/stages/Stage6Rights";
import Stage7Quality from "./components/stages/Stage7Quality";
import Stage8Security from "./components/stages/Stage8Security";
import Stage9DeliveryCommercial from "./components/stages/Stage9DeliveryCommercial";
import Stage10Documents from "./components/stages/Stage10Documents";

export default function SupplierApplyPage() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SupplierApplicationDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNewConfirm, setShowNewConfirm] = useState(false);

  // Load existing draft or initialize
  useEffect(() => {
    const existing = loadDraft();
    if (existing && canEditStatus(existing.metadata.localStatus)) {
      setDraft(existing);
      setShowIntro(false);
    } else if (existing && existing.metadata.localStatus === "demonstration_submitted") {
      // Submitted — redirect to status
      setDraft(existing);
      setShowIntro(true);
    } else {
      // No draft or malformed — show intro
      setShowIntro(true);
    }
    setLoading(false);
  }, []);

  const handleStartNew = useCallback(() => {
    const fresh = createEmptyDraft();
    saveDraft(fresh);
    setDraft(fresh);
    setShowIntro(false);
    setShowNewConfirm(false);
    window.scrollTo(0, 0);
  }, []);

  const handleResumeExisting = useCallback(() => {
    const existing = loadDraft();
    if (existing && canEditStatus(existing.metadata.localStatus)) {
      setDraft(existing);
      setShowIntro(false);
      window.scrollTo(0, 0);
    }
  }, []);

  const handleDeleteAndStart = useCallback(() => {
    deleteDraft();
    const fresh = createEmptyDraft();
    saveDraft(fresh);
    setDraft(fresh);
    setShowIntro(false);
    setShowDeleteConfirm(false);
    window.scrollTo(0, 0);
  }, []);

  const handleViewStatus = useCallback(() => {
    navigate("/suppliers/application-status");
  }, [navigate]);

  if (loading) {
    return (
      <>
        <PublicHeader />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-foreground-500">Loading application...</p>
        </div>
        <PublicFooter />
      </>
    );
  }

  // Intro screen
  if (showIntro || !draft) {
    const existing = loadDraft();
    const hasDraft = existing !== null && canEditStatus(existing.metadata.localStatus);
    const hasSubmitted = existing !== null && existing.metadata.localStatus === "demonstration_submitted";

    return (
      <>
        <PublicHeader />

        {/* Breadcrumb */}
        <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
          <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs">
              <li><button type="button" onClick={() => navigate("/suppliers")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Suppliers</button></li>
              <li className="text-foreground-600" aria-hidden="true">/</li>
              <li className="text-foreground-300">Apply</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-background-50">
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 md:px-6 md:pb-16 md:pt-18">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Supplier Application</p>
              <h1 className="text-3xl text-foreground-50 md:text-4xl lg:text-5xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                Apply to become a DataHarbour supplier
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-foreground-400 md:text-base">
                The application is completed in 10 stages. Your progress is saved automatically in this browser.
                Nothing is transmitted to DataHarbour until a live backend is connected.
              </p>
            </div>
          </div>
        </section>

        {/* Existing draft / submitted notice */}
        <section className="bg-background-100">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <div className="mx-auto max-w-3xl">
              {hasSubmitted && existing && (
                <div className="rounded-xl border border-primary-400/20 bg-primary-500/5 p-6 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10 border border-primary-400/20">
                      <i className="ri-check-line text-xl text-primary-400" />
                    </div>
                  </div>
                  <h2 className="text-xl text-foreground-100" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                    You have a submitted application
                  </h2>
                  <p className="mt-2 text-sm text-foreground-500">
                    Reference: <span className="font-mono text-foreground-300">{existing.metadata.demonstrationReference}</span>
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    <button type="button" onClick={handleViewStatus} className="whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
                      View application status
                    </button>
                    <button type="button" onClick={() => {
                      const revised = createRevisedDraft(existing);
                      saveDraft(revised);
                      setDraft(revised);
                      setShowIntro(false);
                      window.scrollTo(0, 0);
                    }} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
                      Create revised draft
                    </button>
                  </div>
                </div>
              )}

              {hasDraft && existing && !hasSubmitted && (
                <div className="rounded-xl border border-foreground-200/10 bg-background-50 p-6 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground-200/10">
                      <i className="ri-file-edit-line text-xl text-foreground-400" />
                    </div>
                  </div>
                  <h2 className="text-xl text-foreground-100" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                    You have an existing draft
                  </h2>
                  <p className="mt-2 text-sm text-foreground-500">
                    Last saved: {new Date(existing.metadata.lastSavedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="mt-1 text-xs text-foreground-500">
                    Stage {existing.metadata.currentStage} of 10 — {existing.metadata.completedStages.length} completed
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    <button type="button" onClick={handleResumeExisting} className="whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
                      Resume application
                    </button>
                    <button type="button" onClick={() => setShowNewConfirm(true)} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
                      Start a new application
                    </button>
                  </div>
                </div>
              )}

              {!hasDraft && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleStartNew}
                    className="whitespace-nowrap rounded-lg bg-primary-500 px-8 py-3.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
                  >
                    Begin application
                  </button>
                  <p className="mt-4 text-xs text-foreground-500">
                    Your progress will be saved automatically in this browser.
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-center gap-4">
                <button type="button" onClick={() => navigate("/suppliers/standards")} className="text-xs text-foreground-500 underline transition hover:text-foreground-300 cursor-pointer">Review supplier standards</button>
                <button type="button" onClick={() => navigate("/suppliers/package-guidelines")} className="text-xs text-foreground-500 underline transition hover:text-foreground-300 cursor-pointer">Package guidelines</button>
              </div>
            </div>
          </div>
        </section>

        {/* Process overview */}
        <section className="bg-background-50">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl text-foreground-50 mb-2" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                Application stages
              </h2>
              <p className="mb-8 text-sm text-foreground-500">Your application has 10 stages covering everything DataHarbour needs to review a supplier.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { num: 1, title: "Eligibility", desc: "Confirm basic supplier requirements." },
                  { num: 2, title: "Organisation", desc: "Tell us about your organisation." },
                  { num: 3, title: "Representative", desc: "Authorised contact details." },
                  { num: 4, title: "Product", desc: "Describe your data product." },
                  { num: 5, title: "Sources & Provenance", desc: "Where the data comes from." },
                  { num: 6, title: "Rights & Licensing", desc: "Your legal position." },
                  { num: 7, title: "Quality & Refresh", desc: "Data quality and updates." },
                  { num: 8, title: "Security & Incidents", desc: "Security controls in place." },
                  { num: 9, title: "Delivery & Commercial", desc: "How you deliver and charge." },
                  { num: 10, title: "Documents & Declarations", desc: "Supporting evidence." },
                ].map((s) => (
                  <div key={s.num} className="flex gap-3 rounded-lg border border-foreground-200/10 bg-background-100 p-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500/10">
                      <span className="text-xs font-semibold text-primary-400">{s.num}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground-200">{s.title}</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-foreground-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notice */}
        <section className="bg-background-100">
          <div className="mx-auto max-w-7xl px-4 pb-14 md:px-6 md:pb-18">
            <div className="mx-auto max-w-3xl rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff2e88]/10 mt-0.5">
                  <i className="ri-shield-user-line text-sm text-[#ff2e88]" />
                </div>
                <p className="text-xs leading-relaxed text-foreground-500">
                  This demonstration application is stored only in this browser. It is not transmitted to DataHarbour and does not create a supplier account. In a live environment, every application would be reviewed by a person against published supplier standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New application confirmation */}
        {showNewConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNewConfirm(false)} aria-hidden="true" />
            <div className="relative z-10 w-full max-w-xs rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="alertdialog" aria-modal="true">
              <p className="text-sm font-semibold text-foreground-200 mb-2">Start a new application?</p>
              <p className="text-xs text-foreground-500">This will replace your existing draft. This action cannot be undone.</p>
              <div className="mt-5 flex gap-2.5">
                <button type="button" onClick={() => setShowNewConfirm(false)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
                <button type="button" onClick={handleDeleteAndStart} className="flex-1 whitespace-nowrap rounded-lg bg-[#ff2e88] px-3 py-2 text-xs font-medium text-white cursor-pointer">Start new</button>
              </div>
            </div>
          </div>
        )}

        <PublicFooter />
      </>
    );
  }

  // Application workflow
  const stage = draft.metadata.currentStage;
  const locked = isSubmissionLocked(draft);

  const renderStage = () => {
    if (locked) {
      return (
        <div className="rounded-lg border border-foreground-200/10 bg-background-100 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/10">
              <i className="ri-lock-line text-2xl text-primary-400" />
            </div>
          </div>
          <p className="text-sm font-semibold text-foreground-200 mb-2">Application submitted</p>
          <p className="text-xs text-foreground-500 mb-5">This application has been submitted. Create a revised draft to make changes.</p>
          <button
            type="button"
            onClick={() => {
              const revised = createRevisedDraft(draft);
              saveDraft(revised);
              setDraft(revised);
            }}
            className="whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            Create revised draft
          </button>
        </div>
      );
    }

    switch (stage) {
      case 1: return <Stage1Eligibility draft={draft} setDraft={setDraft} />;
      case 2: return <Stage2Organisation draft={draft} setDraft={setDraft} />;
      case 3: return <Stage3Representative draft={draft} setDraft={setDraft} />;
      case 4: return <Stage4Product draft={draft} setDraft={setDraft} />;
      case 5: return <Stage5Provenance draft={draft} setDraft={setDraft} />;
      case 6: return <Stage6Rights draft={draft} setDraft={setDraft} />;
      case 7: return <Stage7Quality draft={draft} setDraft={setDraft} />;
      case 8: return <Stage8Security draft={draft} setDraft={setDraft} />;
      case 9: return <Stage9DeliveryCommercial draft={draft} setDraft={setDraft} />;
      case 10: return <Stage10Documents draft={draft} setDraft={setDraft} />;
      default: return <Stage1Eligibility draft={draft} setDraft={setDraft} />;
    }
  };

  return (
    <>
      <PublicHeader />

      {/* Breadcrumb */}
      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/suppliers")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Suppliers</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Apply</li>
          </ol>
        </div>
      </nav>

      <ApplicationLayout draft={draft} setDraft={setDraft}>
        {renderStage()}
      </ApplicationLayout>

      <PublicFooter />
    </>
  );
}