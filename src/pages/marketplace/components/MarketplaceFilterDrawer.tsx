import { useEffect, useRef, useCallback } from "react";
import type { FilterState } from "@/hooks/useMarketplaceFilters";
import {
  packageCategories,
  deliveryFormats,
  geographicCoverages,
  refreshFrequencies,
  accessLevels,
  pricingModels,
  supplierStatuses,
} from "@/data/marketplacePackages";

interface MarketplaceFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onToggleArray: <K extends Exclude<keyof FilterState, "search">>(key: K, item: string) => void;
  onClearAll: () => void;
}

interface FilterGroupProps {
  title: string;
  items: string[];
  selected: string[];
  groupKey: Exclude<keyof FilterState, "search">;
  onToggle: <K extends Exclude<keyof FilterState, "search">>(key: K, item: string) => void;
}

function FilterGroup({ title, items, selected, groupKey, onToggle }: FilterGroupProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-[11px] font-semibold tracking-wide text-foreground-200 uppercase">
        {title}
      </legend>
      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = selected.includes(item);
          return (
            <label
              key={item}
              className="flex items-center gap-2.5 py-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(groupKey, item)}
                className="h-4 w-4 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30"
              />
              <span className="text-sm text-foreground-300 transition hover:text-foreground-100">
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function MarketplaceFilterDrawer({
  open,
  onClose,
  filters,
  onToggleArray,
  onClearAll,
}: MarketplaceFilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activeCount =
    filters.categories.length +
    filters.deliveryFormats.length +
    filters.geographicCoverage.length +
    filters.refreshFrequency.length +
    filters.accessLevel.length +
    filters.pricingModel.length +
    filters.supplierStatus.length;

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className="absolute right-0 top-0 h-full w-80 max-w-[calc(100vw-2rem)] bg-background-100 border-l border-foreground-200/10 overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-foreground-200/10 bg-background-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-foreground-200">Filters</h2>
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-medium text-background-950">
                {activeCount}
              </span>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-400 hover:text-foreground-100 cursor-pointer"
            aria-label="Close filters"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 px-5 py-5">
          <FilterGroup
            title="Category"
            items={packageCategories}
            selected={filters.categories}
            groupKey="categories"
            onToggle={onToggleArray}
          />

          <FilterGroup
            title="Delivery Format"
            items={deliveryFormats}
            selected={filters.deliveryFormats}
            groupKey="deliveryFormats"
            onToggle={onToggleArray}
          />

          <FilterGroup
            title="Geographic Coverage"
            items={geographicCoverages}
            selected={filters.geographicCoverage}
            groupKey="geographicCoverage"
            onToggle={onToggleArray}
          />

          <FilterGroup
            title="Refresh Frequency"
            items={refreshFrequencies}
            selected={filters.refreshFrequency}
            groupKey="refreshFrequency"
            onToggle={onToggleArray}
          />

          <FilterGroup
            title="Access Level"
            items={accessLevels}
            selected={filters.accessLevel}
            groupKey="accessLevel"
            onToggle={onToggleArray}
          />

          <FilterGroup
            title="Pricing Model"
            items={pricingModels}
            selected={filters.pricingModel}
            groupKey="pricingModel"
            onToggle={onToggleArray}
          />

          <FilterGroup
            title="Supplier Status"
            items={supplierStatuses}
            selected={filters.supplierStatus}
            groupKey="supplierStatus"
            onToggle={onToggleArray}
          />
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-foreground-200/10 bg-background-100 px-5 py-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClearAll}
              className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2.5 text-sm text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}