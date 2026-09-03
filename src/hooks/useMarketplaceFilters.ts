import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { MarketplacePackage, PackageCategory, DeliveryFormat, GeographicCoverage, RefreshFrequency, AccessLevel, PricingModel, SupplierStatus } from "@/data/marketplacePackages";

export interface FilterState {
  search: string;
  categories: PackageCategory[];
  deliveryFormats: DeliveryFormat[];
  geographicCoverage: GeographicCoverage[];
  refreshFrequency: RefreshFrequency[];
  accessLevel: AccessLevel[];
  pricingModel: PricingModel[];
  supplierStatus: SupplierStatus[];
}

export type SortOption =
  | "relevance"
  | "newest"
  | "recently-updated"
  | "name-asc"
  | "supplier-asc"
  | "most-viewed";

const defaultFilters: FilterState = {
  search: "",
  categories: [],
  deliveryFormats: [],
  geographicCoverage: [],
  refreshFrequency: [],
  accessLevel: [],
  pricingModel: [],
  supplierStatus: [],
};

function parseArrayParam(param: string | null): string[] {
  if (!param) return [];
  return param.split(",").filter(Boolean);
}

function readFiltersFromParams(params: URLSearchParams): FilterState {
  return {
    search: params.get("q") || "",
    categories: parseArrayParam(params.get("category")) as PackageCategory[],
    deliveryFormats: parseArrayParam(params.get("delivery")) as DeliveryFormat[],
    geographicCoverage: parseArrayParam(params.get("geo")) as GeographicCoverage[],
    refreshFrequency: parseArrayParam(params.get("refresh")) as RefreshFrequency[],
    accessLevel: parseArrayParam(params.get("access")) as AccessLevel[],
    pricingModel: parseArrayParam(params.get("pricing")) as PricingModel[],
    supplierStatus: parseArrayParam(params.get("supplier")) as SupplierStatus[],
  };
}

export function useMarketplaceFilters(packages: MarketplacePackage[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<SortOption>("recently-updated");

  const filters: FilterState = useMemo(() => readFiltersFromParams(searchParams), [searchParams]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count += 1;
    count += filters.categories.length;
    count += filters.deliveryFormats.length;
    count += filters.geographicCoverage.length;
    count += filters.refreshFrequency.length;
    count += filters.accessLevel.length;
    count += filters.pricingModel.length;
    count += filters.supplierStatus.length;
    return count;
  }, [filters]);

  const setFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (key === "search") {
          const v = value as string;
          if (v.trim()) {
            next.set("q", v.trim());
          } else {
            next.delete("q");
          }
        } else {
          const arr = value as string[];
          if (arr.length > 0) {
            next.set(key, arr.join(","));
          } else {
            next.delete(key);
          }
        }
        return next;
      });
    },
    [setSearchParams],
  );

  const toggleArrayFilter = useCallback(
    <K extends Exclude<keyof FilterState, "search">>(key: K, item: FilterState[K][number]) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const current = parseArrayParam(prev.get(key));
        const exists = current.includes(item as string);
        const updated = exists
          ? current.filter((v) => v !== (item as string))
          : [...current, item as string];
        if (updated.length > 0) {
          next.set(key, updated.join(","));
        } else {
          next.delete(key);
        }
        return next;
      });
    },
    [setSearchParams],
  );

  const removeSingleFilter = useCallback(
    (key: keyof FilterState, value: string) => {
      if (key === "search") {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.delete("q");
          return next;
        });
        return;
      }
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const current = parseArrayParam(prev.get(key));
        const updated = current.filter((v) => v !== value);
        if (updated.length > 0) {
          next.set(key, updated.join(","));
        } else {
          next.delete(key);
        }
        return next;
      });
    },
    [setSearchParams],
  );

  const clearAllFilters = useCallback(() => {
    setSearchParams({});
    setSortOption("recently-updated");
  }, [setSearchParams]);

  const filtered = useMemo(() => {
    let result = [...packages];

    // Search
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase().trim();
      result = result.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(query) ||
          pkg.supplier.toLowerCase().includes(query) ||
          pkg.shortDescription.toLowerCase().includes(query) ||
          pkg.category.toLowerCase().includes(query) ||
          pkg.tags.some((t) => t.toLowerCase().includes(query)) ||
          pkg.geographicCoverage.toLowerCase().includes(query) ||
          pkg.deliveryFormats.some((d) => d.toLowerCase().includes(query)),
      );
    }

    // Category (OR within group)
    if (filters.categories.length > 0) {
      result = result.filter((pkg) => filters.categories.includes(pkg.category));
    }
    if (filters.deliveryFormats.length > 0) {
      result = result.filter((pkg) =>
        pkg.deliveryFormats.some((d) => filters.deliveryFormats.includes(d)),
      );
    }
    if (filters.geographicCoverage.length > 0) {
      result = result.filter((pkg) =>
        filters.geographicCoverage.includes(pkg.geographicCoverage),
      );
    }
    if (filters.refreshFrequency.length > 0) {
      result = result.filter((pkg) =>
        filters.refreshFrequency.includes(pkg.refreshFrequency),
      );
    }
    if (filters.accessLevel.length > 0) {
      result = result.filter((pkg) => filters.accessLevel.includes(pkg.accessLevel));
    }
    if (filters.pricingModel.length > 0) {
      result = result.filter((pkg) => filters.pricingModel.includes(pkg.pricingModel));
    }
    if (filters.supplierStatus.length > 0) {
      result = result.filter((pkg) =>
        filters.supplierStatus.includes(pkg.supplierStatus),
      );
    }

    return result;
  }, [packages, filters]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sortOption) {
      case "newest":
        return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "recently-updated":
        return copy.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      case "name-asc":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case "supplier-asc":
        return copy.sort((a, b) => a.supplier.localeCompare(b.supplier));
      case "most-viewed":
        return copy.sort((a, b) => b.viewCountDemo - a.viewCountDemo);
      case "relevance":
      default:
        // Relevance = featured first, then recently updated
        return copy.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
    }
  }, [filtered, sortOption]);

  return {
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
    filtered,
    sorted,
    totalCount: packages.length,
    resultCount: sorted.length,
  };
}