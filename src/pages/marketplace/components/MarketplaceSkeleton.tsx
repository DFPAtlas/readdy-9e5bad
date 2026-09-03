interface MarketplaceSkeletonProps {
  count?: number;
  viewMode?: "grid" | "list";
}

export default function MarketplaceSkeleton({ count = 6, viewMode = "grid" }: MarketplaceSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-4 w-48 rounded bg-foreground-200/10" />
                <div className="h-3 w-72 rounded bg-foreground-200/10" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 rounded-full bg-foreground-200/10" />
                  <div className="h-5 w-20 rounded-full bg-foreground-200/10" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-foreground-200/10" />
                <div className="h-8 w-8 rounded-lg bg-foreground-200/10" />
                <div className="h-8 w-24 rounded-lg bg-foreground-200/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
          <div className="mb-3 h-5 w-24 rounded-full bg-foreground-200/10" />
          <div className="mb-2 h-5 w-40 rounded bg-foreground-200/10" />
          <div className="mb-4 h-3 w-full rounded bg-foreground-200/10" />
          <div className="mb-4 space-y-2 border-t border-foreground-200/10 pt-4">
            <div className="h-3 w-full rounded bg-foreground-200/10" />
            <div className="h-3 w-3/4 rounded bg-foreground-200/10" />
            <div className="h-3 w-1/2 rounded bg-foreground-200/10" />
          </div>
          <div className="mb-4 h-5 w-28 rounded-md bg-foreground-200/10" />
          <div className="flex items-center gap-2">
            <div className="h-9 flex-1 rounded-lg bg-foreground-200/10" />
            <div className="h-8 w-8 rounded-lg bg-foreground-200/10" />
          </div>
        </div>
      ))}
    </div>
  );
}