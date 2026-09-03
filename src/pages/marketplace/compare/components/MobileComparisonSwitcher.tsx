import type { MarketplacePackage } from "@/data/marketplacePackages";

interface MobileComparisonSwitcherProps {
  packages: MarketplacePackage[];
  activePair: [number, number];
  onSwitchPair: (pair: [number, number]) => void;
}

export default function MobileComparisonSwitcher({
  packages,
  activePair,
  onSwitchPair,
}: MobileComparisonSwitcherProps) {
  if (packages.length <= 2) return null;

  return (
    <div className="mb-4 rounded-lg border border-foreground-200/10 bg-background-100/60 px-3 py-2.5">
      <p className="mb-2 text-[10px] font-medium text-foreground-500 uppercase tracking-wider">Viewing Pair</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {packages.map((pkg, idx) => {
          const isActive = idx === activePair[0] || idx === activePair[1];
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => {
                // Find the right pair that includes this package
                if (idx === activePair[0] || idx === activePair[1]) return;
                if (idx < activePair[0]) {
                  onSwitchPair([idx, activePair[0]]);
                } else if (idx > activePair[1]) {
                  onSwitchPair([activePair[1], idx]);
                } else if (idx < activePair[1]) {
                  onSwitchPair([idx, activePair[1]]);
                } else {
                  onSwitchPair([activePair[0], idx]);
                }
              }}
              className={`rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-accent-500/20 text-accent-400"
                  : "bg-background-200/60 text-foreground-400 hover:text-foreground-200"
              }`}
              aria-pressed={isActive}
            >
              {isActive && (
                <i className="ri-check-line mr-1" aria-hidden="true" />
              )}
              {pkg.name.length > 18 ? pkg.name.slice(0, 16) + "…" : pkg.name}
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 text-[10px] text-foreground-500">
        Showing packages {activePair[0] + 1} and {activePair[1] + 1} of {packages.length}
      </p>
    </div>
  );
}