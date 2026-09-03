import type { MarketplacePackage } from "@/data/marketplacePackages";
import { getComparisonObservations } from "../utils/comparisonUtils";

interface ComparisonSummaryProps {
  packages: MarketplacePackage[];
}

export default function ComparisonSummary({ packages }: ComparisonSummaryProps) {
  const observations = getComparisonObservations(packages);

  if (observations.length === 0) return null;

  return (
    <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground-100">Quick Observations</h3>
      <p className="mb-3 text-[11px] text-foreground-500">
        Factual, neutral observations from the selected packages. These observations are not recommendations
        and do not indicate which package is suitable for your needs.
      </p>
      <ul className="space-y-2">
        {observations.map((obs, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-foreground-400">
            <i className="ri-information-line mt-0.5 flex-shrink-0 text-accent-400" aria-hidden="true" />
            <span>{obs.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}