import { useNavigate } from "react-router-dom";
import type { MarketplacePackage } from "@/data/marketplacePackages";
import DataPackageCard from "@/pages/marketplace/components/DataPackageCard";

interface ComparisonEmptyStateProps {
  packages: MarketplacePackage[];
  savedIds: string[];
  compareIds: string[];
  isCompareAtLimit: boolean;
  isSaved: (id: string) => boolean;
  isComparing: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onOpenSelector: () => void;
}

export default function ComparisonEmptyState({
  packages,
  savedIds,
  compareIds,
  isCompareAtLimit,
  isSaved,
  isComparing,
  onToggleSave,
  onToggleCompare,
  onOpenSelector,
}: ComparisonEmptyStateProps) {
  const navigate = useNavigate();
  const hasOne = compareIds.length === 1;

  return (
    <div className="mx-auto max-w-3xl py-12 text-center">
      <div className="mb-5 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-background-100 border border-foreground-200/10">
        <i className="ri-scales-3-line text-2xl text-foreground-400" aria-hidden="true" />
      </div>
      <h2
        className="mb-3 text-2xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        {hasOne ? "Add another package to compare" : "No packages selected for comparison"}
      </h2>
      <p className="mx-auto mb-3 max-w-md text-sm leading-relaxed text-foreground-400">
        {hasOne
          ? "You have one package selected. Add at least one more to view a side-by-side comparison of coverage, delivery, pricing, provenance and usage conditions."
          : "Select two to four packages from the marketplace to compare coverage, delivery, pricing, provenance and usage conditions side by side."}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/marketplace")}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          <i className="ri-store-2-line" aria-hidden="true" />
          Browse Marketplace
        </button>
        <button
          type="button"
          onClick={onOpenSelector}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-sm text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
        >
          <i className="ri-add-line" aria-hidden="true" />
          Add Package
        </button>
      </div>

      {/* Suggested packages */}
      {!hasOne && packages.length > 0 && (
        <div className="mt-10 text-left">
          <p className="mb-4 text-xs font-medium text-foreground-500">
            Popular demonstration packages you can compare:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {packages.slice(0, 4).map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-start gap-3 rounded-lg border border-foreground-200/10 bg-background-100/40 p-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground-200 truncate">{pkg.name}</p>
                  <p className="mt-0.5 text-[11px] text-foreground-400">{pkg.supplier} — {pkg.category}</p>
                  <p className="mt-0.5 text-[10px] text-foreground-500">{pkg.geographicCoverage} · {pkg.deliveryFormats.slice(0, 2).join(", ")}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleCompare(pkg.id)}
                  disabled={isCompareAtLimit}
                  className="whitespace-nowrap rounded-lg bg-accent-500/20 px-3 py-1.5 text-[11px] font-medium text-accent-400 transition hover:bg-accent-500/30 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isComparing(pkg.id) ? "Added" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}