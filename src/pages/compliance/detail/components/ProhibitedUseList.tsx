import { useState, useMemo } from "react";
import type { ProhibitedUseGroup } from "@/data/compliancePages";

interface Props {
  groups: ProhibitedUseGroup[];
}

export default function ProhibitedUseList({ groups }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return groups;
    const q = search.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((item) => item.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, search]);

  return (
    <section className="bg-background-100" id="prohibited-list" aria-labelledby="pro-list-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="pro-list-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Prohibited uses
        </h2>
        <p className="mb-2 text-sm text-foreground-400 max-w-2xl">
          The following uses are prohibited across all DataHarbour products. This list is grouped by category for clarity.
        </p>
        <p className="mb-6 text-xs text-foreground-500 italic">
          This list is not exhaustive. DataHarbour may determine that other uses are incompatible with the marketplace&apos;s trust and governance framework.
        </p>

        {/* Search */}
        <div className="mb-6 flex max-w-md items-center gap-2 rounded-lg border border-foreground-200/20 bg-background-50/60 px-3 py-2">
          <i className="ri-search-line shrink-0 text-sm text-foreground-500" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prohibited uses..."
            className="w-full bg-transparent text-sm text-foreground-200 placeholder:text-foreground-600 outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="shrink-0 text-foreground-500 hover:text-foreground-300 cursor-pointer"
              aria-label="Clear search"
            >
              <i className="ri-close-line text-sm" />
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-foreground-200/10 bg-background-50/60 px-5 py-10 text-center">
            <p className="text-sm text-foreground-500">No prohibited uses match your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 text-sm font-semibold text-foreground-100">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border border-foreground-200/10 bg-background-50/60 px-4 py-3 text-sm text-foreground-300"
                    >
                      <i className="ri-forbid-line mt-0.5 shrink-0 text-xs text-[#ff2e88]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}