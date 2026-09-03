import type { MarketplacePackage } from "@/data/marketplacePackages";
import { useNavigate } from "react-router-dom";

interface PackageProvenanceProps {
  pkg: MarketplacePackage;
}

export default function PackageProvenance({ pkg }: PackageProvenanceProps) {
  const navigate = useNavigate();
  const d = pkg.provenanceDetails;

  const steps = [
    { label: "Source", desc: d.sourceTypes.slice(0, 2).join(", ") + (d.sourceTypes.length > 2 ? "..." : ""), icon: "ri-database-2-line" },
    { label: "Validation", desc: "Quality checks applied", icon: "ri-check-double-line" },
    { label: "Transformation", desc: "Standardised and enriched", icon: "ri-shuffle-line" },
    { label: "Package", desc: "Ready for delivery", icon: "ri-archive-line" },
    { label: "Controlled Delivery", desc: "Access-governed release", icon: "ri-shield-check-line" },
  ];

  return (
    <section id="provenance" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Provenance
      </h2>

      {/* Journey */}
      <div className="mb-6 overflow-hidden rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
        <h3 className="mb-4 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Data Journey</h3>
        <div className="flex flex-wrap items-start gap-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center rounded-lg border border-foreground-200/10 bg-background-200/40 px-4 py-3 min-w-[110px]">
                <i className={`${step.icon} mb-1.5 text-base text-accent-400`} aria-hidden="true" />
                <span className="text-[11px] font-medium text-foreground-200">{step.label}</span>
                <span className="mt-0.5 text-[10px] text-foreground-500 text-center leading-tight">{step.desc}</span>
              </div>
              {i < steps.length - 1 && (
                <i className="ri-arrow-right-line text-foreground-500 flex-shrink-0" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
          <h3 className="mb-3 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Source and Collection</h3>
          <p className="mb-3 text-xs text-foreground-400 leading-relaxed">{d.collectionMethod}</p>
          <div className="flex flex-wrap gap-1.5">
            {d.sourceTypes.map((s) => (
              <span key={s} className="rounded-full bg-background-200/60 px-2.5 py-0.5 text-[10px] text-foreground-400">{s}</span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
          <h3 className="mb-3 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Transformation and Review</h3>
          <p className="mb-3 text-xs text-foreground-400 leading-relaxed">{d.transformationSummary}</p>
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span className="text-foreground-500">Review Status:</span>
            <span className="font-medium text-foreground-200">{d.reviewStatus}</span>
            <span className="text-foreground-500">·</span>
            <span className="text-foreground-500">Reviewed: {new Date(d.reviewDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </div>

      {/* Limitations */}
      {d.limitations && (
        <div className="mt-5 rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-200 uppercase">
            <i className="ri-information-line text-foreground-400" aria-hidden="true" />
            Known Limitations
          </h3>
          <p className="text-xs text-foreground-400 leading-relaxed">{d.limitations}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate("/compliance")}
        className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
      >
        <i className="ri-external-link-line" aria-hidden="true" />
        Learn about our compliance framework
      </button>
    </section>
  );
}