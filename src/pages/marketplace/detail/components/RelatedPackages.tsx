import type { MarketplacePackage } from "@/data/marketplacePackages";
import DataPackageCard from "@/pages/marketplace/components/DataPackageCard";

interface RelatedPackagesProps {
  packages: MarketplacePackage[];
  isSaved: (id: string) => boolean;
  isComparing: (id: string) => boolean;
  isCompareAtLimit: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export default function RelatedPackages({
  packages,
  isSaved,
  isComparing,
  isCompareAtLimit,
  onToggleSave,
  onToggleCompare,
}: RelatedPackagesProps) {
  if (packages.length === 0) return null;

  return (
    <section id="related" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Related Packages
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <DataPackageCard
            key={pkg.id}
            pkg={pkg}
            isSaved={isSaved(pkg.id)}
            isComparing={isComparing(pkg.id)}
            isCompareAtLimit={isCompareAtLimit}
            onToggleSave={onToggleSave}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </section>
  );
}