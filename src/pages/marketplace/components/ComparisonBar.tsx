import { useNavigate } from "react-router-dom";
import type { MarketplacePackage } from "@/data/marketplacePackages";

interface ComparisonBarProps {
  compareIds: string[];
  packages: MarketplacePackage[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function ComparisonBar({ compareIds, packages, onRemove, onClear }: ComparisonBarProps) {
  const navigate = useNavigate();

  if (compareIds.length === 0) return null;

  const comparePackages = compareIds
    .map((id) => packages.find((p) => p.id === id))
    .filter((p): p is MarketplacePackage => !!p);

  return (
    <div className="sticky bottom-4 z-40 mx-auto max-w-7xl px-4 md:px-6">
      <div className="rounded-lg border border-accent-400/30 bg-background-100/95 backdrop-blur-md px-4 py-3 shadow-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-foreground-300 whitespace-nowrap">
              Compare ({compareIds.length}/4):
            </span>
            {comparePackages.map((pkg) => (
              <span
                key={pkg.id}
                className="inline-flex items-center gap-1 rounded-full border border-foreground-200/20 bg-background-200/60 px-2.5 py-1 text-[11px] text-foreground-300"
              >
                <span className="max-w-[120px] truncate">{pkg.name}</span>
                <button
                  type="button"
                  onClick={() => onRemove(pkg.id)}
                  className="flex h-4 w-4 items-center justify-center rounded-full text-foreground-400 hover:text-foreground-100 cursor-pointer"
                  aria-label={`Remove ${pkg.name} from comparison`}
                >
                  <i className="ri-close-line text-xs" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClear}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => {
                const slugs = compareIds
                  .map((id) => packages.find((p) => p.id === id)?.slug)
                  .filter(Boolean) as string[];
                navigate(`/marketplace/compare?packages=${slugs.join(",")}`);
              }}
              disabled={compareIds.length < 2}
              className="whitespace-nowrap rounded-lg bg-accent-500 px-4 py-1.5 text-xs font-medium text-background-950 transition hover:bg-accent-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Compare {compareIds.length >= 2 ? `(${compareIds.length})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}