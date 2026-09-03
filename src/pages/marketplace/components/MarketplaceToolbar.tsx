import type { SortOption } from "@/hooks/useMarketplaceFilters";

interface MarketplaceToolbarProps {
  resultCount: number;
  totalCount: number;
  viewMode: "grid" | "list";
  sortOption: SortOption;
  onViewModeChange: (mode: "grid" | "list") => void;
  onSortChange: (sort: SortOption) => void;
  activeFilterCount: number;
  onOpenFilters: () => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "recently-updated", label: "Recently Updated" },
  { value: "newest", label: "Newest" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "supplier-asc", label: "Supplier A–Z" },
  { value: "most-viewed", label: "Most Viewed" },
];

export default function MarketplaceToolbar({
  resultCount,
  totalCount,
  viewMode,
  sortOption,
  onViewModeChange,
  onSortChange,
  activeFilterCount,
  onOpenFilters,
}: MarketplaceToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Results count */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-foreground-400">
          <strong className="text-foreground-200">{resultCount}</strong> of {totalCount} packages
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Mobile filter button */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-xs text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 lg:hidden cursor-pointer"
        >
          <i className="ri-equalizer-line" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-medium text-background-950">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="marketplace-sort" className="text-xs text-foreground-500 whitespace-nowrap">Sort by</label>
          <select
            id="marketplace-sort"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-lg border border-foreground-200/20 bg-background-50 px-2.5 py-2 text-xs text-foreground-300 outline-none focus:border-primary-400/50 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* View toggle */}
        <div className="flex rounded-lg border border-foreground-200/20 overflow-hidden">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`flex h-8 w-8 items-center justify-center transition cursor-pointer ${
              viewMode === "grid"
                ? "bg-foreground-200/10 text-foreground-100"
                : "text-foreground-400 hover:text-foreground-200"
            }`}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <i className="ri-layout-grid-line text-sm" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`flex h-8 w-8 items-center justify-center transition cursor-pointer ${
              viewMode === "list"
                ? "bg-foreground-200/10 text-foreground-100"
                : "text-foreground-400 hover:text-foreground-200"
            }`}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
          >
            <i className="ri-list-check text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}