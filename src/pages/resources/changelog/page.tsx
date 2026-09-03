import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { changelogEntries, changelogTypes } from "@/data/resources";

const typeColors: Record<string, string> = {
  Added: "bg-green-500/15 text-green-400",
  Changed: "bg-primary-400/15 text-primary-400",
  Deprecated: "bg-amber-400/15 text-amber-400",
  Fixed: "bg-accent-400/15 text-accent-400",
  "Security notice": "bg-red-400/15 text-red-400",
  Documentation: "bg-foreground-200/15 text-foreground-300",
};

export default function Changelog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredEntries = useMemo(() => {
    return changelogEntries.filter((entry) => {
      const q = searchQuery.toLowerCase().trim();
      if (q && !entry.description.toLowerCase().includes(q) && !entry.version.toLowerCase().includes(q)) return false;
      if (typeFilter && entry.type !== typeFilter) return false;
      return true;
    });
  }, [searchQuery, typeFilter]);

  return (
    <>
      <PublicHeader />

      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/resources")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Resources</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Changelog</li>
          </ol>
        </div>
      </nav>

      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Changelog</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Demonstration release notes
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground-400">
              A fictional changelog showing how release notes would be published. All entries are illustrative and do not describe real platform releases or incidents.
            </p>
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3">
              <p className="text-xs text-foreground-400">This is a demonstration changelog. All versions, dates and descriptions are fictional.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1 max-w-md">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-500 text-sm" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search changelog..."
                  className="w-full rounded-lg border border-foreground-200/20 bg-background-50 py-2.5 pl-9 pr-3 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20"
                  aria-label="Search changelog entries"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setTypeFilter("")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition cursor-pointer ${!typeFilter ? "bg-primary-500 text-background-950" : "border border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40"}`}
                >
                  All types
                </button>
                {changelogTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTypeFilter(t)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition cursor-pointer ${typeFilter === t ? "bg-primary-500 text-background-950" : "border border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-foreground-400">No entries match your search.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredEntries.map((entry, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-28 text-right">
                      <p className="text-xs font-medium text-foreground-400">{entry.version}</p>
                      <p className="text-[11px] text-foreground-600">{entry.date}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[entry.type] || "bg-foreground-200/10 text-foreground-400"}`}>
                          {entry.type}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-300">{entry.description}</p>
                      {entry.relatedSlug && (
                        <button
                          type="button"
                          onClick={() => navigate(`/resources/${entry.relatedSlug}`)}
                          className="mt-1.5 inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 cursor-pointer"
                        >
                          View related <i className="ri-arrow-right-line" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}