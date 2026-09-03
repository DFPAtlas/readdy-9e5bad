interface MarketplaceEmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export default function MarketplaceEmptyState({ hasFilters, onClearFilters }: MarketplaceEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-background-100 border border-foreground-200/10">
        <i className="ri-database-2-line text-2xl text-foreground-400" />
      </div>
      {hasFilters ? (
        <>
          <h3 className="mb-2 text-lg font-medium text-foreground-300" style={{ fontFamily: "'Instrument Serif', serif" }}>
            No matching packages found
          </h3>
          <p className="mb-6 max-w-sm text-sm text-foreground-500">
            Try adjusting your search terms or removing some filters to broaden your results.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-sm text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
          >
            <i className="ri-close-line" />
            Clear all filters
          </button>
        </>
      ) : (
        <>
          <h3 className="mb-2 text-lg font-medium text-foreground-300" style={{ fontFamily: "'Instrument Serif', serif" }}>
            No packages available yet
          </h3>
          <p className="mb-6 max-w-sm text-sm text-foreground-500">
            The marketplace catalogue is being prepared. Check back soon for governed data products.
          </p>
        </>
      )}
    </div>
  );
}