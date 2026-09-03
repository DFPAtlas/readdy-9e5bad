import { useState, useEffect, useRef, FormEvent } from "react";

interface SolutionEnquiryProps {
  isOpen: boolean;
  onClose: () => void;
  solutionName: string;
  solutionSlug: string;
}

interface DemoEnquiry {
  reference: string;
  name: string;
  email: string;
  organisation: string;
  solutionArea: string;
  businessChallenge: string;
  preferredContact: string;
  submittedAt: string;
}

export default function SolutionEnquiry({ isOpen, onClose, solutionName, solutionSlug }: SolutionEnquiryProps) {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [blocked, setBlocked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setErrors({});
      setBlocked(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  const validate = (form: HTMLFormElement): boolean => {
    const errs: Record<string, string> = {};
    const fd = new FormData(form);
    const name = (fd.get("name") as string || "").trim();
    const email = (fd.get("email") as string || "").trim();
    const businessChallenge = (fd.get("businessChallenge") as string || "").trim();

    if (!name) errs.name = "Full name is required";
    if (!email) errs.email = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address";
    if (!businessChallenge) errs.businessChallenge = "Please describe your business challenge";
    else if (businessChallenge.length < 15) errs.businessChallenge = "Please provide at least 15 characters";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const phoneAlt = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value?.trim() || "";
    if (phoneAlt) {
      setBlocked(true);
      return;
    }

    if (!validate(form)) return;

    const fd = new FormData(form);
    const ref = `DH-SOL-${Date.now().toString(36).toUpperCase()}`;
    setReference(ref);

    const enquiry: DemoEnquiry = {
      reference: ref,
      name: (fd.get("name") as string || "").trim(),
      email: (fd.get("email") as string || "").trim(),
      organisation: (fd.get("organisation") as string || "").trim(),
      solutionArea: solutionName,
      businessChallenge: (fd.get("businessChallenge") as string || "").trim(),
      preferredContact: (fd.get("preferredContact") as string || "").trim(),
      submittedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("dh_demo_solution_enquiries") || "[]");
    existing.push(enquiry);
    localStorage.setItem("dh_demo_solution_enquiries", JSON.stringify(existing));

    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Solution enquiry form"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg rounded-lg border border-foreground-200/10 bg-background-100 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-foreground-400 hover:text-foreground-100 cursor-pointer"
          aria-label="Close"
        >
          <i className="ri-close-line text-lg" aria-hidden="true" />
        </button>

        {blocked ? (
          <div className="py-6 text-center">
            <div className="mb-4 flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-accent-500/10">
              <i className="ri-check-line text-2xl text-accent-400" aria-hidden="true" />
            </div>
            <h3
              className="mb-2 text-lg text-foreground-50"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Enquiry received
            </h3>
            <p className="text-sm text-foreground-400">Thank you for your interest.</p>
          </div>
        ) : submitted ? (
          <div className="py-4 text-center">
            <div className="mb-4 flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-accent-500/10">
              <i className="ri-checkbox-circle-line text-2xl text-accent-400" aria-hidden="true" />
            </div>
            <h3
              className="mb-2 text-lg text-foreground-50"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Demonstration Enquiry Submitted
            </h3>
            <p className="mb-1 text-xs text-foreground-500">Reference: {reference}</p>
            <p className="mb-4 text-sm text-foreground-400 leading-relaxed">
              This is a <strong className="text-foreground-200">demonstration submission only</strong>. No live enquiry has been sent. Organisation verification and live access requests will be available in a future platform phase.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`/contact/buyer?solution=${encodeURIComponent(solutionSlug)}`}
                className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
              >
                Buyer Enquiry Form
              </a>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-foreground-400 hover:text-foreground-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/10">
                <i className="ri-mail-send-line text-lg text-accent-400" aria-hidden="true" />
              </div>
              <h3
                className="mb-1 text-lg text-foreground-50"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Solution Enquiry: {solutionName}
              </h3>
              <p className="text-xs text-foreground-400">
                Tell us about your business challenge. This is a demonstration — no live enquiry will be processed.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
                <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" readOnly />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="sol-name" className="block mb-1 text-[11px] font-medium text-foreground-300">
                    Full Name <span className="text-[#ff2e88]">*</span>
                  </label>
                  <input
                    id="sol-name"
                    name="name"
                    type="text"
                    className={`w-full rounded-lg border ${errors.name ? "border-[#ff2e88]/40" : "border-foreground-200/10"} bg-background-200/40 px-3 py-2 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-foreground-200/30 focus:outline-none`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1 text-[10px] text-[#ff2e88]">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="sol-email" className="block mb-1 text-[11px] font-medium text-foreground-300">
                    Work Email <span className="text-[#ff2e88]">*</span>
                  </label>
                  <input
                    id="sol-email"
                    name="email"
                    type="email"
                    className={`w-full rounded-lg border ${errors.email ? "border-[#ff2e88]/40" : "border-foreground-200/10"} bg-background-200/40 px-3 py-2 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-foreground-200/30 focus:outline-none`}
                    placeholder="you@organisation.com"
                  />
                  {errors.email && <p className="mt-1 text-[10px] text-[#ff2e88]">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="sol-org" className="block mb-1 text-[11px] font-medium text-foreground-300">Organisation</label>
                  <input
                    id="sol-org"
                    name="organisation"
                    type="text"
                    className="w-full rounded-lg border border-foreground-200/10 bg-background-200/40 px-3 py-2 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-foreground-200/30 focus:outline-none"
                    placeholder="Your organisation name"
                  />
                </div>

                <div>
                  <label htmlFor="sol-challenge" className="block mb-1 text-[11px] font-medium text-foreground-300">
                    Business Challenge <span className="text-[#ff2e88]">*</span>
                  </label>
                  <textarea
                    id="sol-challenge"
                    name="businessChallenge"
                    rows={3}
                    maxLength={500}
                    className={`w-full rounded-lg border ${errors.businessChallenge ? "border-[#ff2e88]/40" : "border-foreground-200/10"} bg-background-200/40 px-3 py-2 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-foreground-200/30 focus:outline-none resize-y`}
                    placeholder="Describe the business challenge you are seeking to address..."
                  />
                  {errors.businessChallenge && <p className="mt-1 text-[10px] text-[#ff2e88]">{errors.businessChallenge}</p>}
                </div>

                <div>
                  <label htmlFor="sol-contact" className="block mb-1 text-[11px] font-medium text-foreground-300">Preferred Contact Method</label>
                  <select
                    id="sol-contact"
                    name="preferredContact"
                    className="w-full rounded-lg border border-foreground-200/10 bg-background-200/40 px-3 py-2 text-sm text-foreground-200 focus:border-foreground-200/30 focus:outline-none cursor-pointer"
                  >
                    <option value="">Select...</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="video">Video call</option>
                    <option value="no-preference">No preference</option>
                  </select>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
                  <span className="text-[11px] text-foreground-400 leading-relaxed">
                    I understand this is a demonstration enquiry only. No live request is being submitted.
                  </span>
                </label>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
                >
                  Submit Enquiry
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2.5 text-sm text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}