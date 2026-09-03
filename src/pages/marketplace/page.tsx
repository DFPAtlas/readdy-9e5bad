import { useState, useCallback } from "react";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { useSupabasePackages } from "@/hooks/useSupabasePackages";
import { useMarketplaceFilters } from "@/hooks/useMarketplaceFilters";
import { useSavedPackages } from "@/hooks/useSavedPackages";
import { useComparePackages } from "@/hooks/useComparePackages";
import MarketplaceHero from "./components/MarketplaceHero";
import MarketplaceFilterSidebar from "./components/MarketplaceFilterSidebar";
import MarketplaceFilterDrawer from "./components/MarketplaceFilterDrawer";
import ActiveFilterChips from "./components/ActiveFilterChips";
import MarketplaceToolbar from "./components/MarketplaceToolbar";
import DataPackageCard from "./components/DataPackageCard";
import DataPackageListItem from "./components/DataPackageListItem";
import ComparisonBar from "./components/ComparisonBar";
import MarketplaceEmptyState from "./components/MarketplaceEmptyState";
import MarketplaceSkeleton from "./components/MarketplaceSkeleton";

export default function Marketplace() {
  const { packages: marketplacePackages, loading, error } = useSupabasePackages();

  const {
    filters,
    activeFilterCount,
    setFilter,
    toggleArrayFilter,
    removeSingleFilter,
    clearAllFilters,
    viewMode,
    setViewMode,
    sortOption,
    setSortOption,
    sorted,
    totalCount,
    resultCount,
  } = useMarketplaceFilters(marketplacePackages);

  const { savedIds, isSaved, toggleSave } = useSavedPackages();
  const {
    compareIds,
    isComparing,
    toggleCompare,
    removeCompare,
    clearCompare,
    isAtLimit,
  } = useComparePackages();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleSearch = useCallback(
    (value: string) => {
      setFilter("search", value);
    },
    [setFilter],
  );

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="min-h-screen bg-background-50">
      <PublicHeader />

      {/* Hero with search */}
      <MarketplaceHero searchValue={filters.search} onSearch={handleSearch} />

      {/* Summary bar */}
      <div className="border-b border-foreground-200/10 bg-background-50">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-400">
            {loading ? (
              <span>Loading packages...</span>
            ) : error ? (
              <span className="text-red-400">Failed to load packages</span>
            ) : (
              <>
                <span>
                  <strong className="text-foreground-200">{resultCount}</strong> packages matching
                </span>
                {hasActiveFilters && (
                  <span>
                    <strong className="text-foreground-200">{activeFilterCount}</strong> active filter{activeFilterCount !== 1 ? "s" : ""}
                  </span>
                )}
                {compareIds.length > 0 && (
                  <span>
                    <strong className="text-accent-400">{compareIds.length}</strong> selected for comparison
                  </span>
                )}
                {savedIds.length > 0 && (
                  <span>
                    <strong className="text-accent-400">{savedIds.length}</strong> saved
                  </span>
                )}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-foreground-500 transition hover:text-foreground-200 cursor-pointer underline underline-offset-2"
                  >
                    Clear all filters
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Demo notice */}
      <div className="bg-background-100 border-b border-foreground-200/10">
        <div className="mx-auto max-w-7xl px-4 py-2.5 md:px-6">
          <p className="text-center text-[11px] text-foreground-500">
            <i className="ri-information-line mr-1 align-middle" />
            Demonstration listings are shown to illustrate the planned DataHarbour marketplace. Access to live products will depend on supplier terms, buyer verification and applicable compliance review.
          </p>
        </div>
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="border-b border-foreground-200/10 bg-background-50">
          <div className="mx-auto max-w-7xl px-4 py-2.5 md:px-6">
            <ActiveFilterChips
              filters={filters}
              onRemove={removeSingleFilter}
              onClearAll={clearAllFilters}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10" id="marketplace-results">
        {/* Toolbar */}
        <div className="mb-6">
          <MarketplaceToolbar
            resultCount={resultCount}
            totalCount={totalCount}
            viewMode={viewMode}
            sortOption={sortOption}
            onViewModeChange={setViewMode}
            onSortChange={setSortOption}
            activeFilterCount={activeFilterCount}
            onOpenFilters={() => setFilterDrawerOpen(true)}
          />
        </div>

        {/* Error state */}
        {error && (
          <div className="rounded-lg border border-red-400/20 bg-red-400/5 p-8 text-center">
            <p className="mb-3 text-sm text-red-400">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-primary-500/90 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content area: sidebar + results */}
        {!error && (
          <div className="flex gap-8">
            {/* Desktop filter sidebar */}
            <div className="hidden lg:block">
              <MarketplaceFilterSidebar
                filters={filters}
                activeCount={activeFilterCount}
                onToggleArray={toggleArrayFilter}
                onClearAll={clearAllFilters}
              />
            </div>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <MarketplaceSkeleton count={6} viewMode={viewMode} />
              ) : sorted.length === 0 ? (
                <MarketplaceEmptyState
                  hasFilters={hasActiveFilters}
                  onClearFilters={clearAllFilters}
                />
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {sorted.map((pkg) => (
                    <DataPackageCard
                      key={pkg.id}
                      pkg={pkg}
                      isSaved={isSaved(pkg.id)}
                      isComparing={isComparing(pkg.id)}
                      isCompareAtLimit={isAtLimit}
                      onToggleSave={toggleSave}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sorted.map((pkg) => (
                    <DataPackageListItem
                      key={pkg.id}
                      pkg={pkg}
                      isSaved={isSaved(pkg.id)}
                      isComparing={isComparing(pkg.id)}
                      isCompareAtLimit={isAtLimit}
                      onToggleSave={toggleSave}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Comparison bar */}
      <ComparisonBar
        compareIds={compareIds}
        packages={marketplacePackages}
        onRemove={removeCompare}
        onClear={clearCompare}
      />

      {/* Mobile filter drawer */}
      <MarketplaceFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
        onToggleArray={toggleArrayFilter}
        onClearAll={clearAllFilters}
      />

      <PublicFooter />
    </div>
  );
}