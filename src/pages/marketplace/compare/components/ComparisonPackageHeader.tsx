import { useNavigate } from "react-router-dom";
import type { MarketplacePackage } from "@/data/marketplacePackages";
import PackageBadge from "@/pages/marketplace/components/PackageBadge";
import SavePackageButton from "@/pages/marketplace/components/SavePackageButton";

interface ComparisonPackageHeaderProps {
  pkg: MarketplacePackage;
  isSaved: boolean;
  isComparing: boolean;
  onToggleSave: (id: string) => void;
  onRemove: (id: string) => void;
  onReplace: (id: string) => void;
}

export default function ComparisonPackageHeader({
  pkg,
  isSaved,
  onToggleSave,
  onRemove,
  onReplace,
}: ComparisonPackageHeaderProps) {
  const navigate = useNavigate();

  const supplierVariant =
    pkg.supplierStatus === "Verified Supplier"
      ? "supplier"
      : pkg.supplierStatus === "Demonstration Supplier"
        ? "demo"
        : "default";

  return (
    <div className="flex flex-col rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
      {/* Badges */}
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <PackageBadge label={pkg.category} />
        {pkg.isDemo && <PackageBadge label="Demo" variant="demo" icon="ri-information-line" />}
      </div>

      {/* Name */}
      <h3 className="mb-1 text-sm font-semibold text-foreground-50 leading-snug">{pkg.name}</h3>

      {/* Supplier */}
      <p className="mb-2 text-[11px] text-foreground-400">
        {pkg.supplier}
        <PackageBadge label={pkg.supplierStatus} variant={supplierVariant} icon="ri-shield-check-line" />
      </p>

      {/* Description */}
      <p className="mb-3 flex-1 text-[11px] leading-relaxed text-foreground-500 line-clamp-2">
        {pkg.shortDescription}
      </p>

      {/* Actions */}
      <div className="mt-auto space-y-2">
        <button
          type="button"
          onClick={() => navigate(`/marketplace/${pkg.slug}`)}
          className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-3 py-2 text-[11px] font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          <i className="ri-eye-line" aria-hidden="true" />
          View Package
        </button>
        <div className="flex items-center gap-1">
          <SavePackageButton packageId={pkg.id} isSaved={isSaved} onToggle={onToggleSave} />
          <button
            type="button"
            onClick={() => onReplace(pkg.id)}
            className="flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-foreground-200/20 px-2 py-1.5 text-[11px] text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
            aria-label={`Replace ${pkg.name}`}
          >
            <i className="ri-swap-line" aria-hidden="true" />
            Replace
          </button>
          <button
            type="button"
            onClick={() => onRemove(pkg.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground-200/20 text-foreground-400 transition hover:border-[#ff2e88]/30 hover:text-[#ff2e88] cursor-pointer"
            aria-label={`Remove ${pkg.name} from comparison`}
          >
            <i className="ri-close-line text-sm" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}