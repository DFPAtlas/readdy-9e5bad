// ============================================================
// DataHarbour ContactFormShell — Reusable form wrapper
// ============================================================

import { type ReactNode, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EnquiryType } from "@/data/contactTypes";
import { ENQUIRY_TYPE_LABELS } from "@/data/contactTypes";

interface ContactFormShellProps {
  enquiryType: EnquiryType;
  title: string;
  description: string;
  guidance?: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  children: ReactNode;
  isValid?: boolean;
  isReview?: boolean;
  onGoToReview?: () => void;
}

export default function ContactFormShell({
  enquiryType,
  title,
  description,
  guidance,
  onSubmit,
  onCancel,
  children,
  isValid,
  isReview,
  onGoToReview,
}: ContactFormShellProps) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/contact");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (submitting) return;
    setSubmitting(true);
    onSubmit(e);
  };

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-foreground-500" aria-label="Breadcrumb">
          <a href="/" className="hover:text-foreground-300 transition">Home</a>
          <i className="ri-arrow-right-s-line text-[10px]" aria-hidden="true" />
          <a href="/contact" className="hover:text-foreground-300 transition">Contact</a>
          <i className="ri-arrow-right-s-line text-[10px]" aria-hidden="true" />
          <span className="text-foreground-300">{ENQUIRY_TYPE_LABELS[enquiryType]}</span>
        </nav>

        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <h1 className="text-2xl text-foreground-50 md:text-3xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground-400">
            {description}
          </p>

          {/* Demonstration notice */}
          <div className="mt-5 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3 flex items-start gap-3">
            <i className="ri-information-line mt-0.5 shrink-0 text-sm text-[#ff2e88]" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-foreground-500">
              This is a <strong className="text-foreground-300">demonstration form</strong>. Information is stored only in this browser and is not transmitted to DataHarbour.
            </p>
          </div>

          {/* Guidance */}
          {guidance && (
            <div className="mt-4 rounded-lg border border-foreground-200/10 bg-background-100 px-4 py-3">
              {guidance}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="mt-6 rounded-xl border border-foreground-200/10 bg-background-100 p-5 md:p-7">
            {children}

            {/* Actions */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2.5 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                {onGoToReview && (
                  <button
                    type="button"
                    onClick={onGoToReview}
                    disabled={!isValid}
                    className="whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-xs font-medium text-foreground-200 transition hover:border-foreground-200/40 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Review
                  </button>
                )}
                {isReview ? (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit demonstration enquiry
                        <i className="ri-check-line" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit demonstration enquiry
                        <i className="ri-check-line" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}