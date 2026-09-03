import type { FilterState, SortOption } from "@/hooks/useMarketplaceFilters";

interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({ filters, onRemove, onClearAll }: ActiveFilterChipsProps) {
  const chips: { key: keyof FilterState; value: string; label: string }[] = [];

  if (filters.search.trim()) {
    chips.push({ key: "search", value: filters.search, label: `"${filters.search}"` });
  }
  for (const cat of filters.categories) {
    chips.push({ key: "categories", value: cat, label: cat });
  }
  for (const d of filters.deliveryFormats) {
    chips.push({ key: "deliveryFormats", value: d, label: d });
  }
  for (const g of filters.geographicCoverage) {
    chips.push({ key: "geographicCoverage", value: g, label: g });
  }
  for (const r of filters.refreshFrequency) {
    chips.push({ key: "refreshFrequency", value: r, label: r });
  }
  for (const a of filters.accessLevel) {
    chips.push({ key: "accessLevel", value: a, label: a });
  }
  for (const p of filters.pricingModel) {
    chips.push({ key: "pricingModel", value: p, label: p });
  }
  for (const s of filters.supplierStatus) {
    chips.push({ key: "supplierStatus", value: s, label: s });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={`${chip.key}-${chip.value}`}
          className="inline-flex items-center gap-1 rounded-full border border-foreground-200/20 bg-background-100 px-2.5 py-1 text-[11px] text-foreground-300"
        >
          <span className="max-w-[160px] truncate">{chip.label}</span>
          <button
            type="button"
            onClick={() => onRemove(chip.key, chip.value)}
            className="flex h-4 w-4 items-center justify-center rounded-full text-foreground-400 hover:text-foreground-100 cursor-pointer"
            aria-label={`Remove filter: ${chip.label}`}
          >
            <i className="ri-close-line text-xs" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="whitespace-nowrap text-[11px] text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
}