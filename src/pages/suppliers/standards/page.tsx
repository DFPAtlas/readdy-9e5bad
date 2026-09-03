import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { supplierStandardsRequirements, supplierStandardsChecklist } from "@/data/supplierContent";

export default function SupplierStandards() {
  const navigate = useNavigate();
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
            <li className="text-foreground-300">Supplier Standards</li>
          </ol>
        </div>
      </nav>

      {/* Legal notice */}
      <div className="mx-auto max-w-7xl px-4 pt-4 md:px-6 md:pt-6">
        <div className="rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3 flex items-start gap-3">
          <i className="ri-information-line mt-0.5 shrink-0 text-sm text-[#ff2e88]" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-foreground-400">
            This information explains DataHarbour&apos;s planned supplier standards and is not legal advice. Final policies, contracts and operational procedures must be reviewed before the service launches.
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 md:px-6 md:pb-16 md:pt-18">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Supplier Standards</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl lg:text-5xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              What it takes to list a product on DataHarbour
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-foreground-400 md:text-base">
              These standards apply to every organisation that wishes to supply data products through the DataHarbour marketplace. They exist to protect buyers, data subjects and the integrity of the marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <h2 className="text-2xl text-foreground-50 mb-10" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Supplier requirements
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supplierStandardsRequirements.map((req) => (
              <div
                key={req.title}
                className="rounded-lg border border-foreground-200/10 bg-background-50 p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/10">
                    <i className="ri-check-line text-xs text-primary-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-200">{req.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-foreground-500">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                  Supplier readiness checklist
                </h2>
                <p className="mt-2 text-sm text-foreground-500">
                  Use this checklist to prepare before starting your application. This is a preparation tool — ticking items does not constitute contractual acceptance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-4 py-2 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 cursor-pointer print:hidden"
              >
                <i className="ri-printer-line" />
                Print checklist
              </button>
            </div>
            <div className="rounded-lg border border-foreground-200/10 bg-background-100 p-6 md:p-8">
              <ul className="space-y-4">
                {supplierStandardsChecklist.map((item, i) => (
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
                {checkedItems.size} of {supplierStandardsChecklist.length} items checked
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 pb-14 md:px-6 md:pb-18">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate("/compliance/supplier-standards")}
              className="flex-1 rounded-lg border border-foreground-200/10 bg-background-50 p-5 text-left transition hover:border-foreground-200/20 cursor-pointer"
            >
              <span className="text-sm font-semibold text-foreground-200">Compliance: Supplier Standards</span>
              <p className="mt-1 text-xs text-foreground-500">Read the compliance-centre view of supplier expectations.</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary-400">
                View page <i className="ri-arrow-right-line" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/suppliers/apply")}
              className="flex-1 rounded-lg border border-primary-500/20 bg-primary-500/5 p-5 text-left transition hover:border-primary-500/30 cursor-pointer"
            >
              <span className="text-sm font-semibold text-foreground-200">Start a supplier application</span>
              <p className="mt-1 text-xs text-foreground-500">Begin the application process when you are ready.</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary-400">
                Apply now <i className="ri-arrow-right-line" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}