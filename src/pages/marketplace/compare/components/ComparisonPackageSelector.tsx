import { useState, useCallback, useEffect, useRef } from "react";
import type { MarketplacePackage } from "@/data/marketplacePackages";
import { marketplacePackages } from "@/data/marketplacePackages";
import PackageBadge from "@/pages/marketplace/components/PackageBadge";

interface ComparisonPackageSelectorProps {
  isOpen: boolean;
  compareIds: string[];
  mode: "add" | { replaceId: string };
  onAdd: (id: string) => void;
  onReplace: (replaceId: string, newId: string) => void;
  onClose: () => void;
}

export default function ComparisonPackageSelector({
  isOpen,
  compareIds,
  mode,
  onAdd,
  onReplace,
  onClose,
}: ComparisonPackageSelectorProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setCategoryFilter("");
      setTimeout(() => inputRef.current?.focus(), 100);
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  const available = marketplacePackages.filter((p) => {
    // In add mode, exclude already-compared. In replace mode, exclude all except the one being replaced.
    if (typeof mode === "object") {
      if (compareIds.includes(p.id) && p.id !== mode.replaceId) return false;
    } else {
      if (compareIds.includes(p.id)) return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      const haystack = [
        p.name,
        p.supplier,
        p.shortDescription,
        p.category,
        ...p.tags,
        p.geographicCoverage,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (categoryFilter && p.category !== categoryFilter) return false;

    return true;
  });

  const categories = [...new Set(marketplacePackages.map((p) => p.category))].sort();

  const title =
    typeof mode === "object" ? "Replace Package" : compareIds.length >= 4 ? "Comparison full" : "Add Package";
  const actionLabel = typeof mode === "object" ? "Replace" : "Add";
  const subtitle =
    typeof mode === "object"
      ? "Choose a replacement package."
      : compareIds.length >= 4
        ? "You have reached the four-package limit. Remove a package first."
        : `Add a package to compare — ${4 - compareIds.length} slot${compareIds.length < 3 ? "s" : ""} remaining.`;

  const handleSelect = useCallback(
    (id: string) => {
      if (typeof mode === "object") {
        onReplace(mode.replaceId, id);
      } else {
        onAdd(id);
      }
      onClose();
    },
    [mode, onAdd, onReplace, onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-lg rounded-lg border border-foreground-200/10 bg-background-100 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-foreground-400 hover:text-foreground-100 cursor-pointer"
          aria-label="Close"
        >
          <i className="ri-close-line text-lg" aria-hidden="true" />
        </button>

        <h3
          className="mb-1 text-lg text-foreground-50"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {title}
        </h3>
        <p className="mb-5 text-xs text-foreground-400">{subtitle}</p>

        {/* Search */}
        <div className="relative mb-3">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-500 pointer-events-none" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, supplier, category or geography..."
            className="w-full rounded-lg border border-foreground-200/10 bg-background-200/40 py-2 pl-9 pr-4 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-foreground-200/30 focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground-200 cursor-pointer"
              aria-label="Clear search"
            >
              <i className="ri-close-circle-line text-sm" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCategoryFilter("")}
            className={`rounded-full px-3 py-1 text-[11px] font-medium transition cursor-pointer ${
              !categoryFilter
                ? "bg-foreground-200/20 text-foreground-200"
                : "bg-background-200/60 text-foreground-400 hover:text-foreground-200"
            }`}
          >
            All
          </button>
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat === categoryFilter ? "" : cat)}
              className={`rounded-full px-3 py-1 text-[11px] transition cursor-pointer ${
                categoryFilter === cat
                  ? "bg-foreground-200/20 text-foreground-200"
                  : "bg-background-200/60 text-foreground-400 hover:text-foreground-200"
              }`}
            >
              {cat.length > 30 ? cat.slice(0, 28) + "…" : cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2">
          {available.length === 0 ? (
            <div className="py-8 text-center">
              <i className="ri-search-line text-2xl text-foreground-500 block mb-2" aria-hidden="true" />
              <p className="text-sm text-foreground-400">No matching packages found</p>
              <p className="mt-1 text-[11px] text-foreground-500">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            available.map((pkg) => {
              const isDisabled =
                typeof mode !== "object" && compareIds.length >= 4 && !compareIds.includes(pkg.id);
              return (
                <div
                  key={pkg.id}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition ${
                    isDisabled
                      ? "border-foreground-200/5 bg-background-200/20 opacity-50 cursor-not-allowed"
                      : "border-foreground-200/10 bg-background-200/30 hover:border-foreground-200/20 cursor-pointer"
                  }`}
                  onClick={() => !isDisabled && handleSelect(pkg.id)}
                  role="button"
                  tabIndex={isDisabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      handleSelect(pkg.id);
                    }
                  }}
                  aria-disabled={isDisabled}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground-200 truncate">{pkg.name}</span>
                      {pkg.isDemo && <PackageBadge label="Demo" variant="demo" />}
                    </div>
                    <p className="mt-0.5 text-[11px] text-foreground-400">{pkg.supplier}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-foreground-500">
                      <span>{pkg.category}</span>
                      <span>·</span>
                      <span>{pkg.geographicCoverage}</span>
                      <span>·</span>
                      <span>{pkg.deliveryFormats.slice(0, 2).join(", ")}</span>
                    </div>
                  </div>
                  <span
                    className={`mt-1 whitespace-nowrap rounded px-2.5 py-1 text-[11px] font-medium transition ${
                      isDisabled
                        ? "bg-background-200/60 text-foreground-500"
                        : "bg-accent-500/20 text-accent-400 group-hover:bg-accent-500/30"
                    }`}
                  >
                    {actionLabel}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}