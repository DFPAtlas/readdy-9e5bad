import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { SupplierApplicationDraft, FieldError, StageDefinition } from "@/data/supplierApplicationTypes";
import { APPLICATION_STAGES, STAGE_HELP } from "@/data/supplierApplicationDefaults";
import { saveDraft, debouncedSave, isSubmissionLocked } from "@/utils/applicationStorage";
import { validateStage } from "@/utils/applicationValidation";

interface ApplicationLayoutProps {
  draft: SupplierApplicationDraft;
  setDraft: (draft: SupplierApplicationDraft) => void;
  children: React.ReactNode;
}

function formatSaveTime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  if (diffMs < 10000) return "Saved just now";
  if (diffMs < 60000) return "Saved less than a minute ago";
  const mins = Math.floor(diffMs / 60000);
  if (mins === 1) return "Saved 1 minute ago";
  if (mins < 60) return `Saved ${mins} minutes ago`;
  return `Saved ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
}

export default function ApplicationLayout({ draft, setDraft, children }: ApplicationLayoutProps) {
  const navigate = useNavigate();
  const [saveLabel, setSaveLabel] = useState("");
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [mobileStageOpen, setMobileStageOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const stageHeadingRef = useRef<HTMLDivElement>(null);

  const currentStage = draft.metadata.currentStage;
  const stageDef = APPLICATION_STAGES.find((s) => s.number === currentStage);
  const locked = isSubmissionLocked(draft);

  // Update save label
  useEffect(() => {
    if (draft.metadata.lastSavedDate) {
      setSaveLabel(formatSaveTime(draft.metadata.lastSavedDate));
    }
  }, [draft.metadata.lastSavedDate]);

  // Debounced autosave
  useEffect(() => {
    if (!locked) {
      debouncedSave(draft);
    }
  }, [draft, locked]);

  const handleValidate = useCallback((): boolean => {
    const result = validateStage(draft, currentStage);
    setErrors(result.errors);
    if (!result.valid && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
      setTimeout(() => {
        errorSummaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    return result.valid;
  }, [draft, currentStage]);

  const handleNext = useCallback(() => {
    if (!handleValidate()) return;
    const newCompleted = draft.metadata.completedStages.includes(currentStage)
      ? draft.metadata.completedStages
      : [...draft.metadata.completedStages, currentStage];
    setDraft({
      ...draft,
      metadata: {
        ...draft.metadata,
        currentStage: Math.min(currentStage + 1, 10),
        completedStages: newCompleted,
      },
    });
    setErrors([]);
    setTimeout(() => {
      stageHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [handleValidate, draft, setDraft, currentStage]);

  const handlePrev = useCallback(() => {
    setDraft({
      ...draft,
      metadata: { ...draft.metadata, currentStage: Math.max(currentStage - 1, 1) },
    });
    setErrors([]);
    setTimeout(() => {
      stageHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [draft, setDraft, currentStage]);

  const handleGoToStage = useCallback(
    (stage: number) => {
      if (locked) return;
      if (stage === currentStage) return;
      // Allow revisiting completed stages or going to the next one
      const canGo = stage <= currentStage + 1 || draft.metadata.completedStages.includes(stage);
      if (!canGo) return;
      setDraft({ ...draft, metadata: { ...draft.metadata, currentStage: stage } });
      setErrors([]);
      setMobileStageOpen(false);
      setTimeout(() => {
        stageHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    },
    [draft, setDraft, currentStage, locked],
  );

  const handleSaveAndExit = useCallback(() => {
    saveDraft(draft);
    navigate("/suppliers/application-status");
  }, [draft, navigate]);

  const stageVisual = (s: StageDefinition) => {
    const isCurrent = s.number === currentStage;
    const isCompleted = draft.metadata.completedStages.includes(s.number);

    let bg = "bg-foreground-200/10";
    let text = "text-foreground-600";
    let border = "border-foreground-200/10";

    if (isCurrent) {
      bg = "bg-primary-500/15";
      text = "text-primary-400";
      border = "border-primary-400/30";
    } else if (isCompleted) {
      bg = "bg-primary-500/10";
      text = "text-primary-300";
      border = "border-primary-400/20";
    }

    return { isCurrent, isCompleted, bg, text, border };
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      {/* Demonstration notice */}
      <div className="mb-6 rounded-lg border border-[#ff2e88]/20 bg-[#ff2e88]/5 p-3 md:p-4">
        <div className="flex items-start gap-2.5">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff2e88]/10 mt-0.5">
            <i className="ri-information-line text-xs text-[#ff2e88]" />
          </div>
          <p className="text-xs leading-relaxed text-foreground-500">
            This demonstration application is stored only in this browser. It is not transmitted to DataHarbour and does not create a supplier account.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Desktop progress sidebar */}
        <aside className="hidden shrink-0 lg:block lg:w-56">
          <nav className="sticky top-24" aria-label="Application stages">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-500">Your progress</p>
            <ol className="space-y-1">
              {APPLICATION_STAGES.map((s) => {
                const v = stageVisual(s);
                return (
                  <li key={s.number}>
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => handleGoToStage(s.number)}
                      className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs transition cursor-pointer ${v.text} ${s.number === currentStage ? v.bg : "hover:bg-foreground-200/5"}`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold border ${v.border} ${v.bg}`}>
                        {v.isCompleted ? (
                          <i className="ri-check-line text-[10px]" />
                        ) : (
                          s.number
                        )}
                      </span>
                      <span className={s.number === currentStage ? "font-semibold" : ""}>{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Save state */}
            <div className="mt-6 rounded-lg border border-foreground-200/10 bg-background-50 p-3">
              <div className="flex items-center gap-1.5 text-[11px] text-foreground-500">
                <i className="ri-save-line text-xs" />
                <span>{saveLabel || "Not yet saved"}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  saveDraft(draft);
                  setSaveLabel("Saved just now");
                }}
                disabled={locked}
                className="mt-2 w-full whitespace-nowrap rounded-md border border-foreground-200/15 bg-transparent px-3 py-1.5 text-[11px] font-medium text-foreground-400 transition hover:border-foreground-200/30 hover:text-foreground-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Save now
              </button>
              <button
                type="button"
                onClick={() => setShowExitConfirm(true)}
                className="mt-1.5 w-full whitespace-nowrap rounded-md bg-transparent px-3 py-1.5 text-[11px] text-foreground-500 transition hover:text-foreground-300 cursor-pointer"
              >
                Save and exit
              </button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Mobile stage nav */}
          <div className="mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileStageOpen(!mobileStageOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-foreground-200/15 bg-background-100 px-4 py-2.5 text-sm text-foreground-300 cursor-pointer"
            >
              <span>
                Stage {currentStage} of 10: {stageDef?.title}
              </span>
              {mobileStageOpen ? <i className="ri-arrow-up-s-line text-base text-foreground-500" /> : <i className="ri-arrow-down-s-line text-base text-foreground-500" />}
            </button>
            {mobileStageOpen && (
              <div className="mt-2 rounded-lg border border-foreground-200/10 bg-background-100 p-2">
                <ol className="space-y-0.5">
                  {APPLICATION_STAGES.map((s) => {
                    const v = stageVisual(s);
                    return (
                      <li key={s.number}>
                        <button
                          type="button"
                          onClick={() => handleGoToStage(s.number)}
                          className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs transition cursor-pointer ${v.text} hover:bg-foreground-200/5`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold border ${v.border} ${v.bg}`}>
                            {v.isCompleted ? <i className="ri-check-line text-[10px]" /> : s.number}
                          </span>
                          {s.title}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>

          {/* Stage heading */}
          <div ref={stageHeadingRef} className="mb-6">
            <p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-primary-400 uppercase">Stage {currentStage} of 10</p>
            <h2 className="text-xl text-foreground-100 md:text-2xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              {stageDef?.title}
            </h2>
            {STAGE_HELP[currentStage] && (
              <p className="mt-2 text-xs leading-relaxed text-foreground-500">{STAGE_HELP[currentStage]}</p>
            )}
          </div>

          {/* Error summary */}
          {errors.length > 0 && (
            <div
              ref={errorSummaryRef}
              tabIndex={-1}
              className="mb-6 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-4 outline-none"
              role="alert"
              aria-label={`${errors.length} error${errors.length > 1 ? "s" : ""} found`}
            >
              <p className="mb-3 text-xs font-semibold text-[#ff2e88]">
                {errors.length} issue{errors.length > 1 ? "s" : ""} need{errors.length === 1 ? "s" : ""} attention before you can continue:
              </p>
              <ul className="space-y-1.5">
                {errors.map((e, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(`field-${e.field}`);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "center" });
                          el.focus();
                        }
                      }}
                      className="flex items-start gap-2 text-xs text-foreground-500 transition hover:text-foreground-300 cursor-pointer"
                    >
                      <i className="ri-error-warning-line mt-0.5 shrink-0 text-[#ff2e88]" />
                      <span>{e.message}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stage content */}
          <div className="min-h-[400px]">{children}</div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-foreground-200/10 pt-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStage === 1 || locked}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <i className="ri-arrow-left-line" />
                Previous
              </button>
              {!locked && (
                <button
                  type="button"
                  onClick={() => {
                    saveDraft(draft);
                    setSaveLabel("Saved just now");
                  }}
                  className="hidden whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 sm:inline-flex cursor-pointer"
                >
                  Save draft
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {currentStage < 10 && !locked && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
                >
                  Continue
                  <i className="ri-arrow-right-line" />
                </button>
              )}
              {currentStage === 10 && !locked && (
                <button
                  type="button"
                  onClick={() => {
                    if (handleValidate()) {
                      const newCompleted = draft.metadata.completedStages.includes(10)
                        ? draft.metadata.completedStages
                        : [...draft.metadata.completedStages, 10];
                      const updated = {
                        ...draft,
                        metadata: {
                          ...draft.metadata,
                          completedStages: newCompleted,
                        },
                      };
                      saveDraft(updated);
                      navigate("/suppliers/apply/review");
                    }
                  }}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
                >
                  Review application
                  <i className="ri-arrow-right-line" />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Save and exit dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowExitConfirm(false)} aria-hidden="true" />
          <div
            className="relative z-10 w-full max-w-xs rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-dialog-title"
          >
            <h3 id="exit-dialog-title" className="text-sm font-semibold text-foreground-200">Save and exit?</h3>
            <p className="mt-2 text-xs leading-relaxed text-foreground-500">
              Your progress will be saved to this browser. You can return later and continue where you left off.
            </p>
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAndExit}
                className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-3 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
              >
                Save and exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}