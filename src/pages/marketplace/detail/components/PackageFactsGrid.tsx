import type { MarketplacePackage } from "@/data/marketplacePackages";

interface PackageFactsGridProps {
  pkg: MarketplacePackage;
}

interface FactRow {
  label: string;
  value: string;
}

export default function PackageFactsGrid({ pkg }: PackageFactsGridProps) {
  const facts: FactRow[] = [
    { label: "Category", value: pkg.category },
    { label: "Geography", value: pkg.geographicCoverage },
    { label: "Refresh Frequency", value: pkg.refreshFrequency },
    { label: "Delivery Formats", value: pkg.deliveryFormats.join(", ") },
    { label: "Access Level", value: pkg.accessLevel },
    { label: "Pricing Model", value: pkg.pricingModel },
    { label: "Licence Type", value: pkg.licenceType || "See pricing details" },
    { label: "Minimum Term", value: pkg.minimumTerm || "See pricing details" },
    { label: "Historical Depth", value: pkg.historicalDepth || pkg.createdAt.split("-")[0] + " onwards" },
    { label: "Support Level", value: pkg.supportLevel || "Business-hours support" },
    { label: "Version", value: pkg.version || "Current" },
    { label: "Sample Available", value: pkg.sampleAvailable ? "Yes" : "No" },
  ];

  return (
    <section id="facts" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        At a Glance
      </h2>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-foreground-200/10 bg-foreground-200/10 sm:grid-cols-3 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-background-100/60 p-4">
            <dt className="mb-1 text-[10px] font-medium tracking-wide text-foreground-500 uppercase">{fact.label}</dt>
            <dd className="text-xs text-foreground-200 leading-relaxed">{fact.value}</dd>
          </div>
        ))}
      </div>
    </section>
  );
}