import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { OnboardingStage } from "@/data/authTypes";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStage: OnboardingStage;
  title: string;
  description?: string;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  backDisabled?: boolean;
  hideContinue?: boolean;
}

const STAGES: { key: OnboardingStage; label: string }[] = [
  { key: 'organisation', label: 'Organisation' },
  { key: 'intended_use', label: 'Intended Use' },
  { key: 'team', label: 'Team' },
  { key: 'review', label: 'Review' },
  { key: 'complete', label: 'Complete' },
];

export default function OnboardingLayout({
  children,
  currentStage,
  title,
  description,
  onBack,
  onContinue,
  continueLabel = 'Continue',
  continueDisabled = false,
  backDisabled = false,
  hideContinue = false,
}: OnboardingLayoutProps) {
  const navigate = useNavigate();
  const currentIdx = STAGES.findIndex((s) => s.key === currentStage);

  return (
    <div className="min-h-screen bg-background-50">
      {/* Top bar */}
      <div className="border-b border-foreground-200/10 bg-background-100/50 px-4 py-3 md:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#ff2e88]/60 bg-black/30">
              <i className="ri-flashlight-fill text-xs text-[#ff2e88]" />
            </div>
            <span
              className="text-sm tracking-[0.2em] text-foreground-100"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              DataHarbour
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/account-demo')}
            className="whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-1.5 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
          >
            Save &amp; Exit
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="border-b border-foreground-200/10 bg-background-50 px-4 py-3 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Desktop progress */}
          <div className="hidden items-center gap-0 md:flex">
            {STAGES.map((s, i) => {
              const isCompleted = i < currentIdx;
              const isCurrent = i === currentIdx;
              const isFuture = i > currentIdx;

              return (
                <div key={s.key} className="flex items-center">
                  {i > 0 && (
                    <div
                      className={`h-px w-6 md:w-8 ${
                        isCompleted || isCurrent ? 'bg-primary-500' : 'bg-foreground-200/20'
                      }`}
                    />
                  )}
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ${
                        isCompleted
                          ? 'bg-primary-500 text-background-950'
                          : isCurrent
                            ? 'border-2 border-primary-500 text-primary-500'
                            : 'bg-background-200/50 text-foreground-500'
                      }`}
                    >
                      {isCompleted ? <i className="ri-check-line" /> : i + 1}
                    </div>
                    <span
                      className={`text-[11px] whitespace-nowrap ${
                        isCurrent ? 'font-medium text-foreground-100' : isCompleted ? 'text-foreground-300' : 'text-foreground-500'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile progress — show current / total */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="text-xs font-medium text-foreground-200">
              Step {currentIdx + 1} of {STAGES.length}
            </span>
            <span className="text-xs text-foreground-400">— {STAGES[currentIdx].label}</span>
            <div className="ml-auto flex gap-1">
              {STAGES.map((s, i) => (
                <div
                  key={s.key}
                  className={`h-1 w-6 rounded-full ${
                    i <= currentIdx ? 'bg-primary-500' : 'bg-foreground-200/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          <h1
            className="mb-1 text-3xl text-foreground-50 md:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            tabIndex={-1}
          >
            {title}
          </h1>
          {description && (
            <p className="mb-6 text-sm leading-relaxed text-foreground-400">{description}</p>
          )}

          {children}

          {/* Navigation */}
          {!hideContinue && (
            <div className="mt-8 flex items-center gap-3 border-t border-foreground-200/10 pt-6">
              <button
                type="button"
                onClick={onBack || (() => navigate('/account-demo'))}
                disabled={backDisabled}
                className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 disabled:opacity-30 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onContinue}
                disabled={continueDisabled}
                className="ml-auto whitespace-nowrap rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 disabled:opacity-50 cursor-pointer"
              >
                {continueLabel}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Demo notice */}
      <div className="border-t border-foreground-200/10 bg-background-100 px-4 py-3 text-center">
        <p className="text-xs text-foreground-500">
          <i className="ri-information-line mr-1 align-middle" />
          Onboarding information is saved locally in this browser only.
        </p>
      </div>
    </div>
  );
}