import type { MarketplacePackage } from "@/data/marketplacePackages";

interface PackageUsageRulesProps {
  pkg: MarketplacePackage;
}

export default function PackageUsageRules({ pkg }: PackageUsageRulesProps) {
  return (
    <section id="usage" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Permitted and Prohibited Use
      </h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Permitted */}
        <div className="rounded-lg border border-accent-400/10 bg-accent-500/5 p-5">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wide text-accent-400 uppercase">
            <i className="ri-check-line" aria-hidden="true" />
            Permitted Uses
          </h3>
          <ul className="space-y-2.5">
            {(pkg.permittedUses.length > 0 ? pkg.permittedUses : [pkg.permittedUseSummary]).map((use, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <i className="ri-check-line mt-0.5 flex-shrink-0 text-[10px] text-accent-400" aria-hidden="true" />
                <span className="text-xs text-foreground-300 leading-relaxed">{use}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prohibited */}
        <div className="rounded-lg border border-[#ff2e88]/10 bg-[#ff2e88]/5 p-5">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff2e88] uppercase">
            <i className="ri-forbid-line" aria-hidden="true" />
            Prohibited Uses
          </h3>
          <ul className="space-y-2.5">
            {(pkg.prohibitedUses.length > 0 ? pkg.prohibitedUses : [pkg.restrictionSummary]).map((use, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <i className="ri-close-line mt-0.5 flex-shrink-0 text-[10px] text-[#ff2e88]" aria-hidden="true" />
                <span className="text-xs text-foreground-300 leading-relaxed">{use}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compliance info */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
          <h4 className="mb-1.5 text-[11px] font-semibold text-foreground-200">Retention</h4>
          <p className="text-[11px] text-foreground-400 leading-relaxed">{pkg.retentionGuidance}</p>
        </div>
        <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
          <h4 className="mb-1.5 text-[11px] font-semibold text-foreground-200">Sharing</h4>
          <p className="text-[11px] text-foreground-400 leading-relaxed">{pkg.sharingRestrictions}</p>
        </div>
        <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
          <h4 className="mb-1.5 text-[11px] font-semibold text-foreground-200">Security</h4>
          <p className="text-[11px] text-foreground-400 leading-relaxed">{pkg.securityRequirements}</p>
        </div>
      </div>
    </section>
  );
}