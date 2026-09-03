import type { MarketplacePackage } from "@/data/marketplacePackages";

interface PackageCoverageProps {
  pkg: MarketplacePackage;
}

export default function PackageCoverage({ pkg }: PackageCoverageProps) {
  return (
    <section id="coverage" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Coverage
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-200 uppercase">
            <i className="ri-earth-line text-accent-400" aria-hidden="true" />
            Geographic Coverage
          </h3>
          <p className="mb-3 text-sm text-foreground-300">{pkg.geographicCoverage}</p>
          <p className="text-xs text-foreground-400 leading-relaxed">{pkg.coverageNotes}</p>
        </div>

        <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-200 uppercase">
            <i className="ri-database-2-line text-accent-400" aria-hidden="true" />
            Record Coverage
          </h3>
          <p className="mb-3 text-sm text-foreground-300">{pkg.recordCoverage}</p>
          <div className="space-y-2 border-t border-foreground-200/10 pt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground-500">Historical Depth</span>
              <span className="text-foreground-300">{pkg.historicalDepth}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground-500">Refresh Frequency</span>
              <span className="text-foreground-300">{pkg.refreshFrequency}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}