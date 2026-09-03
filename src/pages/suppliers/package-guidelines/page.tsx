import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { packageGuidelineSections, packageReadinessChecklist } from "@/data/supplierContent";

export default function PackageGuidelines() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(packageGuidelineSections[0].anchor);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (i: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <>
      <PublicHeader />

      {/* Breadcrumb */}
      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li>
              <button type="button" onClick={() => navigate("/suppliers")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">
                Suppliers
              </button>
            </li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Package Guidelines</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 md:px-6 md:pb-16 md:pt-18">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Package Guidelines</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl lg:text-5xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              How to prepare a strong marketplace listing
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-foreground-400 md:text-base">
              A well-prepared listing helps buyers understand your product quickly and accurately. These guidelines cover every section of a DataHarbour package listing, with examples of what works and what does not.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => navigate("/marketplace")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 cursor-pointer"
              >
                Browse demonstration listings
                <i className="ri-arrow-right-line" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/suppliers/standards")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
              >
                Review supplier standards
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines sections */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Side nav — desktop */}
            <nav className="hidden lg:block w-56 shrink-0" aria-label="Guideline sections">
              <div className="sticky top-24 space-y-1">
                {packageGuidelineSections.map((section) => (
                  <button
                    key={section.anchor}
                    type="button"
                    onClick={() => {
                      setActiveSection(section.anchor);
                      const el = document.getElementById(section.anchor);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition cursor-pointer ${
                      activeSection === section.anchor
                        ? "bg-primary-500/10 text-primary-400 font-medium"
                        : "text-foreground-500 hover:text-foreground-300 hover:bg-foreground-200/5"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </nav>

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-14">
              {packageGuidelineSections.map((section) => (
                <div key={section.anchor} id={section.anchor}>
                  <h2 className="text-xl text-foreground-100 mb-1" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                    {section.title}
                  </h2>
                  <p className="mb-5 text-sm leading-relaxed text-foreground-500">{section.description}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Good example */}
                    <div className="rounded-lg border border-[#00cc88]/20 bg-[#00cc88]/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00cc88]/10">
                          <i className="ri-check-line text-xs text-[#00cc88]" />
                        </div>
                        <span className="text-xs font-semibold text-[#00cc88]">Good example</span>
                      </div>
                      <p className="text-xs leading-relaxed text-foreground-400">{section.goodExample}</p>
                    </div>

                    {/* Poor example */}
                    <div className="rounded-lg border border-[#ff2e88]/20 bg-[#ff2e88]/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff2e88]/10">
                          <i className="ri-close-line text-xs text-[#ff2e88]" />
                        </div>
                        <span className="text-xs font-semibold text-[#ff2e88]">Poor example</span>
                      </div>
                      <p className="text-xs leading-relaxed text-foreground-400">{section.poorExample}</p>
                      <div className="mt-3 pt-3 border-t border-[#ff2e88]/10">
                        <span className="text-[10px] font-semibold text-[#ff2e88]/80 uppercase tracking-wider">Why this doesn&apos;t work</span>
                        <p className="mt-1 text-xs leading-relaxed text-foreground-500">{section.whyPoorIsBad}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Readiness checklist */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl text-foreground-50 mb-2" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Package readiness checklist
            </h2>
            <p className="mb-8 text-sm text-foreground-500">
              Before submitting a product for review, check that your listing meets these expectations. This is a self-assessment tool, not a contractual requirement.
            </p>
            <div className="rounded-lg border border-foreground-200/10 bg-background-100 p-6 md:p-8">
              <ul className="space-y-4">
                {packageReadinessChecklist.map((item, i) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleCheck(i)}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-foreground-300/30 mt-0.5 transition hover:border-foreground-200 bg-transparent cursor-pointer"
                      aria-label={item.label}
                    >
                      {checkedItems.has(i) && <i className="ri-check-line text-xs text-primary-400" />}
                    </button>
                    <span className="text-xs leading-relaxed text-foreground-400">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-xs text-foreground-500">
                {checkedItems.size} of {packageReadinessChecklist.length} items checked
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Link to standards */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 pb-14 md:px-6 md:pb-18">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-foreground-400 mb-4">
              Ready to apply? Review the full supplier standards before starting your application.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/suppliers/standards")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 cursor-pointer"
              >
                Supplier Standards
                <i className="ri-arrow-right-line" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/suppliers/apply")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
              >
                Start application
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}