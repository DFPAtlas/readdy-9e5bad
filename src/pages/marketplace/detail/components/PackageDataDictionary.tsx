import { useState } from "react";
import type { DataField } from "@/data/marketplacePackages";
import PackageBadge from "@/pages/marketplace/components/PackageBadge";

interface PackageDataDictionaryProps {
  fields: DataField[];
}

const sensitivityVariant: Record<string, "default" | "demo" | "supplier" | "access" | "provenance"> = {
  "General Business": "default",
  "Aggregated": "default",
  "Location": "provenance",
  "Derived Signal": "demo",
  "Restricted": "access",
};

export default function PackageDataDictionary({ fields }: PackageDataDictionaryProps) {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? fields.filter(
        (f) =>
          f.fieldName.toLowerCase().includes(search.toLowerCase()) ||
          f.description.toLowerCase().includes(search.toLowerCase()) ||
          f.type.toLowerCase().includes(search.toLowerCase()),
      )
    : fields;

  if (fields.length === 0) return null;

  return (
    <section id="data-fields" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Data Fields and Schema
      </h2>

      {fields.length > 6 && (
        <div className="relative mb-4">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-xs text-foreground-500" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fields..."
            className="w-full rounded-lg border border-foreground-200/10 bg-background-100/60 py-2 pl-9 pr-3 text-xs text-foreground-200 placeholder:text-foreground-500 focus:border-foreground-200/30 focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-500 hover:text-foreground-300 cursor-pointer"
              aria-label="Clear search"
            >
              <i className="ri-close-line text-xs" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden sm:block overflow-hidden rounded-lg border border-foreground-200/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-foreground-200/10 bg-background-100/60">
              <th className="px-4 py-3 text-left text-[10px] font-semibold tracking-wide text-foreground-200 uppercase">Field</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold tracking-wide text-foreground-200 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold tracking-wide text-foreground-200 uppercase">Description</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold tracking-wide text-foreground-200 uppercase">Example</th>
              <th className="px-4 py-3 text-center text-[10px] font-semibold tracking-wide text-foreground-200 uppercase w-16">Req.</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold tracking-wide text-foreground-200 uppercase">Sensitivity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground-200/10">
            {filtered.map((f) => (
              <tr key={f.fieldName} className="hover:bg-background-100/40 transition">
                <td className="px-4 py-2.5 text-xs font-medium text-foreground-200">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(f.fieldName).catch(() => {});
                    }}
                    className="hover:text-accent-400 transition cursor-pointer text-left"
                    title={`Copy "${f.fieldName}"`}
                  >
                    {f.fieldName}
                  </button>
                </td>
                <td className="px-4 py-2.5 text-[11px] text-foreground-500 font-mono">{f.type}</td>
                <td className="px-4 py-2.5 text-[11px] text-foreground-400">{f.description}</td>
                <td className="px-4 py-2.5 text-[11px] text-foreground-500 font-mono max-w-[160px] truncate">{f.example}</td>
                <td className="px-4 py-2.5 text-center text-[11px]">
                  {f.required ? (
                    <span className="text-foreground-200 font-medium">Yes</span>
                  ) : (
                    <span className="text-foreground-500">No</span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  <PackageBadge label={f.sensitivity} variant={sensitivityVariant[f.sensitivity] ?? "default"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {filtered.map((f) => (
          <div key={f.fieldName} className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(f.fieldName).catch(() => {});
                }}
                className="text-xs font-medium text-foreground-200 hover:text-accent-400 transition cursor-pointer text-left"
              >
                {f.fieldName}
              </button>
              <PackageBadge label={f.sensitivity} variant={sensitivityVariant[f.sensitivity] ?? "default"} />
            </div>
            <div className="mb-2 flex items-center gap-2 text-[11px]">
              <span className="text-foreground-500 font-mono">{f.type}</span>
              <span className="text-foreground-500">·</span>
              <span className={f.required ? "text-foreground-200" : "text-foreground-500"}>
                {f.required ? "Required" : "Optional"}
              </span>
            </div>
            <p className="text-[11px] text-foreground-400 leading-relaxed">{f.description}</p>
            <p className="mt-1.5 text-[11px] text-foreground-500 font-mono truncate">e.g. {f.example}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-foreground-500">No fields match your search.</p>
      )}
    </section>
  );
}