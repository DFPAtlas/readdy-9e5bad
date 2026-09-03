import { useNavigate } from "react-router-dom";
import type { MarketplacePackage } from "@/data/marketplacePackages";
import PackageBadge from "./PackageBadge";
import SavePackageButton from "./SavePackageButton";
import ComparePackageButton from "./ComparePackageButton";

interface DataPackageListItemProps {
  pkg: MarketplacePackage;
  isSaved: boolean;
  isComparing: boolean;
  isCompareAtLimit: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export default function DataPackageListItem({
  pkg,
  isSaved,
  isComparing,
  isCompareAtLimit,
  onToggleSave,
  onToggleCompare,
}: DataPackageListItemProps) {
  const navigate = useNavigate();

  const supplierVariant = pkg.supplierStatus === "Verified Supplier"
    ? "supplier"
    : pkg.supplierStatus === "Demonstration Supplier"
    ? "demo"
    : "default";

  const accessVariant = pkg.accessLevel === "Compliance Review" || pkg.accessLevel === "Supplier Approval"
    ? "access"
    : "default";

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-foreground-200/10 bg-background-100/60 p-5 backdrop-blur-sm transition hover:border-foreground-200/20 sm:flex-row sm:items-start sm:justify-between">
      {/* Left: info */}
      <div className="flex-1 min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <PackageBadge label={pkg.category} />
          {pkg.isDemo && <PackageBadge label="Demo" variant="demo" icon="ri-information-line" />}
          {pkg.featured && <PackageBadge label="Featured" variant="supplier" icon="ri-star-fill" />}
        </div>

        <button
          type="button"
          onClick={() => navigate(`/marketplace/${pkg.slug}`)}
          className="mb-1 text-left text-base font-semibold text-foreground-50 transition hover:text-primary-400 cursor-pointer"
        >
          {pkg.name}
        </button>

        <p className="mb-1.5 text-xs text-foreground-400">
          by <span className="text-foreground-300">{pkg.supplier}</span>
          {" "}
          <PackageBadge label={pkg.supplierStatus} variant={supplierVariant} icon="ri-shield-check-line" />
        </p>

        <p className="mb-3 max-w-2xl text-xs leading-relaxed text-foreground-400">
          {pkg.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {pkg.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="inline-block rounded bg-background-200/60 px-2 py-0.5 text-[10px] text-foreground-400">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: meta + actions */}
      <div className="flex flex-col items-start gap-3 sm:items-end sm:shrink-0">
        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <span className="inline-flex items-center gap-1 text-[10px] text-foreground-500">
            <i className="ri-map-pin-line" />
            {pkg.geographicCoverage}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-foreground-500">
            <i className="ri-refresh-line" />
            {pkg.refreshFrequency}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-foreground-500">
            <i className="ri-file-list-3-line" />
            {pkg.deliveryFormats.join(", ")}
          </span>
        </div>

        <PackageBadge label={pkg.accessLevel} variant={accessVariant} icon="ri-lock-line" />
        <span className="text-[10px] text-foreground-500">{pkg.priceDisplay}</span>
        <span className="text-[10px] text-foreground-500">
          Updated {new Date(pkg.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/marketplace/${pkg.slug}`)}
            className="whitespace-nowrap rounded-lg bg-primary-500/90 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            View Package
          </button>
          <SavePackageButton packageId={pkg.id} isSaved={isSaved} onToggle={onToggleSave} />
          <div className="pl-2 border-l border-foreground-200/10">
            <ComparePackageButton
              packageId={pkg.id}
              isComparing={isComparing}
              isAtLimit={isCompareAtLimit}
              onToggle={onToggleCompare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}