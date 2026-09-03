import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EnquiryType } from "@/data/contactTypes";
import { ENQUIRY_TYPE_LABELS, CONTACT_FORM_CONFIGS } from "@/data/contactTypes";

interface ContactConfirmationProps {
  enquiryType: EnquiryType;
  reference: string;
  submittedDate: string;
  summary: string;
}

export default function ContactConfirmation({
  enquiryType,
  reference,
  submittedDate,
  summary,
}: ContactConfirmationProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const config = CONTACT_FORM_CONFIGS[enquiryType];

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
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

        <div className="mx-auto max-w-xl rounded-xl border border-accent-300/20 bg-background-100 p-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-100/60">
            <i className="ri-checkbox-circle-line text-2xl text-accent-600" aria-hidden="true" />
          </div>

          <h1 className="mb-1 text-xl text-foreground-50 md:text-2xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Demonstration submission created
          </h1>
          <p className="mb-1 text-xs text-foreground-500">{ENQUIRY_TYPE_LABELS[enquiryType]}</p>

          {/* Reference */}
          <div className="my-5 rounded-lg border border-foreground-200/10 bg-background-50 px-4 py-3">
            <p className="mb-1 text-[10px] uppercase tracking-wide text-foreground-500">Local Reference</p>
            <p className="font-mono text-lg text-foreground-200">{reference}</p>
            <p className="mt-1 text-[10px] text-foreground-600">
              {new Date(submittedDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Summary */}
          <p className="mb-5 text-xs leading-relaxed text-foreground-500">{summary}</p>

          {/* No-transmission notice */}
          <div className="mb-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3">
            <p className="text-xs leading-relaxed text-foreground-500">
              <strong className="text-foreground-300">This reference exists only in this browser.</strong> DataHarbour has not received this enquiry. No message was sent, and no team has been assigned.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={handleCopyRef}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-xs font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              <i className={`${copied ? "ri-check-line" : "ri-file-copy-line"} text-sm`} />
              {copied ? "Copied" : "Copy Reference"}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-xs font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              <i className="ri-printer-line text-sm" />
              Print Summary
            </button>
            <button
              type="button"
              onClick={() => navigate(config.route)}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-xs font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              <i className="ri-add-line text-sm" />
              Submit another
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Return to Contact
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}