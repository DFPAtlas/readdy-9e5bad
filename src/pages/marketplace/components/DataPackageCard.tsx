import { useNavigate } from "react-router-dom";
import type { MarketplacePackage } from "@/data/marketplacePackages";
import PackageBadge from "./PackageBadge";
import SavePackageButton from "./SavePackageButton";
import ComparePackageButton from "./ComparePackageButton";

interface DataPackageCardProps {
  pkg: MarketplacePackage;
  isSaved: boolean;
  isComparing: boolean;
  isCompareAtLimit: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export default function DataPackageCard({
  pkg,
  isSaved,
  isComparing,
  isCompareAtLimit,
  onToggleSave,
  onToggleCompare,
}: DataPackageCardProps) {
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
    <div className="flex flex-col rounded-lg border border-foreground-200/10 bg-background-100/60 p-5 backdrop-blur-sm transition hover:border-foreground-200/20">
      {/* Top badges row */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <PackageBadge label={pkg.category} />
        {pkg.isDemo && <PackageBadge label="Demo" variant="demo" icon="ri-information-line" />}
      </div>

      {/* Name */}
      <h3 className="mb-1.5 text-base font-semibold text-foreground-50">{pkg.name}</h3>

      {/* Supplier */}
      <p className="mb-2 text-xs text-foreground-400">
        by{" "}
        <span className="text-foreground-300">{pkg.supplier}</span>
        <PackageBadge label={pkg.supplierStatus} variant={supplierVariant} icon="ri-shield-check-line" />
      </p>

      {/* Description */}
      <p className="mb-4 flex-1 text-xs leading-relaxed text-foreground-400 line-clamp-3">
        {pkg.shortDescription}
      </p>

      {/* Meta rows */}
      <div className="mb-4 space-y-1.5 border-t border-foreground-200/10 pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500">Coverage</span>
          <span className="text-foreground-300">{pkg.geographicCoverage}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500">Refresh</span>
          <span className="text-foreground-300">{pkg.refreshFrequency}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500">Delivery</span>
          <span className="text-foreground-300">{pkg.deliveryFormats.slice(0, 2).join(", ")}{pkg.deliveryFormats.length > 2 ? ` +${pkg.deliveryFormats.length - 2}` : ""}</span>
        </div>
      </div>

      {/* Access & Pricing */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <PackageBadge label={pkg.accessLevel} variant={accessVariant} icon="ri-lock-line" />
        <span className="text-[10px] text-foreground-500">{pkg.priceDisplay}</span>
      </div>

      {/* Tags */}
      {pkg.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {pkg.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-block rounded bg-background-200/60 px-2 py-0.5 text-[10px] text-foreground-400">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row: updated + provenance */}
      <div className="mb-4 flex items-center justify-between text-[10px] text-foreground-500">
        <span>Updated {new Date(pkg.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        {pkg.provenanceStatus === "Full" && (
          <span className="inline-flex items-center gap-1 text-accent-400">
            <i className="ri-check-double-line" />
            Full provenance
          </span>
        )}
        {pkg.provenanceStatus === "Reviewed" && (
          <span className="inline-flex items-center gap-1 text-accent-400">
            <i className="ri-check-line" />
            Reviewed
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(`/marketplace/${pkg.slug}`)}
          className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          View Package
        </button>
        <SavePackageButton packageId={pkg.id} isSaved={isSaved} onToggle={onToggleSave} />
      </div>

      {/* Compare */}
      <div className="mt-3 border-t border-foreground-200/10 pt-3">
        <ComparePackageButton
          packageId={pkg.id}
          isComparing={isComparing}
          isAtLimit={isCompareAtLimit}
          onToggle={onToggleCompare}
        />
      </div>
    </div>
  );
}