import { useState, useCallback } from "react";
import type { MarketplacePackage } from "@/data/marketplacePackages";
import type { ComparisonSectionDef } from "../utils/comparisonUtils";
import { areComparisonValuesEqual } from "../utils/comparisonUtils";
import ComparisonRow from "./ComparisonRow";

interface ComparisonSectionProps {
  section: ComparisonSectionDef;
  packages: MarketplacePackage[];
  highlightDiffs: boolean;
  hideIdentical: boolean;
  defaultExpanded?: boolean;
}

export default function ComparisonSection({
  section,
  packages,
  highlightDiffs,
  hideIdentical,
  defaultExpanded = true,
}: ComparisonSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggle = useCallback(() => setExpanded((v) => !v), []);

  // Determine which rows have differences
  const visibleRows = section.rows.filter((row) => {
    if (!hideIdentical) return true;
    const values = packages.map((p) => row.accessor(p));
    const first = values[0];
    return !values.every((v) => areComparisonValuesEqual(v, first));
  });

  const allSame = visibleRows.length === 0 && hideIdentical;

  return (
    <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 overflow-hidden">
      {/* Section header */}
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition hover:bg-background-200/30 cursor-pointer"
        aria-expanded={expanded}
      >
        <h2 className="text-sm font-semibold text-foreground-100">{section.title}</h2>
        <div className="flex items-center gap-2">
          {hideIdentical && allSame && (
            <span className="text-[10px] text-foreground-500 whitespace-nowrap">No differences</span>
          )}
          <i
            className={`text-sm text-foreground-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            {expanded ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}
          </i>
        </div>
      </button>

      {/* Section body */}
      {expanded && (
        <div className="border-t border-foreground-200/10">
          {allSame ? (
            <div className="px-5 py-4 text-center text-[11px] text-foreground-500">
              <i className="ri-check-line mr-1" aria-hidden="true" />
              All values are identical across selected packages.
            </div>
          ) : (
            <div className="divide-y divide-foreground-200/10">
              {visibleRows.map((row, i) => {
                const values = packages.map((p) => row.accessor(p));
                const hasDiff = !values.every((v) => areComparisonValuesEqual(v, values[0]));
                const displayValues = packages.map((p) => row.formatter(p));

                return (
                  <ComparisonRow
                    key={`${section.id}-${i}`}
                    label={row.label}
                    displayValues={displayValues}
                    hasDiff={hasDiff}
                    highlightDiffs={highlightDiffs}
                    important={row.important}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}