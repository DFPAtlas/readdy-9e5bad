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

interface MarketplaceFilterSidebarProps {
  filters: FilterState;
  activeCount: number;
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
      <div className="space-y-1">
        {items.map((item) => {
          const isChecked = selected.includes(item);
          return (
            <label
              key={item}
              className="flex items-center gap-2 py-0.5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(groupKey, item)}
                className="h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30"
              />
              <span className="text-xs text-foreground-400 transition hover:text-foreground-200">
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function MarketplaceFilterSidebar({
  filters,
  activeCount,
  onToggleArray,
  onClearAll,
}: MarketplaceFilterSidebarProps) {
  return (
    <aside className="shrink-0 w-56 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-wide text-foreground-200 uppercase">Filters</h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-[11px] text-foreground-400 transition hover:text-foreground-200 cursor-pointer whitespace-nowrap"
          >
            Clear all
          </button>
        )}
      </div>

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
    </aside>
  );
}