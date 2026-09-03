import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import type { LegalDocument } from "@/data/legalDocuments";
import { REVIEW_NOTICE } from "@/data/legalDocuments";

interface LegalDocumentLayoutProps {
  document: LegalDocument;
  children: ReactNode;
}

function LegalReviewNotice() {
  return (
    <div className="mb-8 rounded-lg border border-accent-300/40 bg-accent-100/50 px-5 py-4">
      <p className="flex items-start gap-2 text-xs leading-relaxed text-accent-800">
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
          <i className="ri-information-line text-sm" />
        </span>
        <span>{REVIEW_NOTICE}</span>
      </p>
    </div>
  );
}

export default function LegalDocumentLayout({ document, children }: LegalDocumentLayoutProps) {
  const navigate = useNavigate();

  const statusBadgeClass = (() => {
    switch (document.status) {
      case "Draft for legal review": return "bg-accent-100 text-accent-800";
      case "Planned terms": return "bg-secondary-100 text-secondary-800";
      case "Under review": return "bg-accent-100/80 text-accent-700";
      default: return "bg-accent-100 text-accent-800";
    }
  })();

  return (
    <div className="min-h-screen bg-background-50">
      <PublicHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <nav className="mb-8 text-xs text-foreground-500" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate("/legal")} className="transition hover:text-foreground-300 cursor-pointer">Legal Centre</button>
          <span className="mx-2">/</span>
          <span className="text-foreground-400">{document.shortTitle}</span>
        </nav>

        <h1 className="mb-3 text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
          {document.title}
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-foreground-400">{document.summary}</p>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusBadgeClass}`}>{document.status}</span>
          <span className="text-[11px] text-foreground-500">Version {document.version}</span>
          <span className="text-[11px] text-foreground-500">Effective: {document.effectiveDateDisplay}</span>
          <span className="text-[11px] text-foreground-500">Last reviewed: {document.lastReviewedDisplay}</span>
          <span className="text-[11px] text-foreground-500">For: {document.audience}</span>
        </div>

        {document.requiresProfessionalReview && <LegalReviewNotice />}

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-foreground-300/30 px-3 py-1.5 text-[11px] text-foreground-500 transition hover:text-foreground-300 hover:border-foreground-300/50 cursor-pointer"
          >
            <i className="ri-printer-line text-xs" />
            Print
          </button>
          <button
            type="button"
            onClick={() => { navigator.clipboard.writeText(window.location.href); }}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-foreground-300/30 px-3 py-1.5 text-[11px] text-foreground-500 transition hover:text-foreground-300 hover:border-foreground-300/50 cursor-pointer"
          >
            <i className="ri-link text-xs" />
            Copy Link
          </button>
        </div>

        <div className="print:hidden mb-10 rounded-lg border border-foreground-200/10 bg-background-100 px-5 py-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-300">On This Page</h2>
          <ul className="space-y-1.5">
            {document.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-[11px] text-foreground-500 transition hover:text-foreground-300">{section.heading}</a>
              </li>
            ))}
          </ul>
        </div>

        <article className="space-y-10">
          {document.sections.map((section, idx) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="mb-4 text-lg font-medium text-foreground-100" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {idx + 1}. {section.heading}
              </h2>
              {section.paragraphs.filter(Boolean).map((para: string, pi: number) => (
                <p key={pi} className="mb-3 text-sm leading-relaxed text-foreground-400">{para}</p>
              ))}
              {section.subSections && section.subSections.map((sub) => (
                <div key={sub.heading} className="mb-4 ml-0 mt-3 rounded-lg border border-foreground-200/10 bg-background-100 px-4 py-3">
                  <h3 className="mb-1 text-sm font-medium text-foreground-200">{sub.heading}</h3>
                  {sub.paragraphs.map((sp: string, spi: number) => (
                    <p key={spi} className="text-[13px] leading-relaxed text-foreground-500">{sp}</p>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </article>

        {children}

        {document.relatedDocumentSlugs.length > 0 && (
          <div className="mt-12 border-t border-foreground-200/10 pt-10">
            <h2 className="mb-4 text-sm font-semibold text-foreground-200" style={{ fontFamily: "'Instrument Serif', serif" }}>Related Documents</h2>
            <div className="flex flex-wrap gap-2">
              {document.relatedDocumentSlugs.map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => navigate(`/${slug === "acceptable-use" ? "acceptable-use" : slug === "buyer-terms" ? "buyer-terms" : slug === "supplier-terms" ? "supplier-terms" : slug === "marketplace-terms" ? "marketplace-terms" : slug === "data-processing-terms" ? "data-processing-terms" : slug === "data-retention-policy" ? "data-retention-policy" : slug === "security-statement" ? "security-statement" : slug === "subprocessors" ? "subprocessors" : slug === "complaints" ? "complaints" : slug === "cookies" ? "cookies" : "privacy"}`)}
                  className="whitespace-nowrap rounded-md border border-foreground-200/10 bg-background-100 px-3 py-1.5 text-[11px] text-foreground-500 transition hover:text-foreground-300 hover:border-foreground-300/30 cursor-pointer"
                >
                  {slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-lg border border-foreground-200/10 bg-background-100 px-5 py-4">
          <p className="text-xs text-foreground-500">
            Questions about this document?{" "}
            <button type="button" onClick={() => navigate("/contact/general")} className="text-accent-500 transition hover:text-accent-400 cursor-pointer underline">Contact DataHarbour</button>
            {" "}or visit the{" "}
            <button type="button" onClick={() => navigate("/legal")} className="text-accent-500 transition hover:text-accent-400 cursor-pointer underline">Legal Centre</button>.
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}