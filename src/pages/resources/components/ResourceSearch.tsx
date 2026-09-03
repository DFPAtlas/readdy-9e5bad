import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { resourceCategories, featuredGuides } from "@/data/resources";

const searchableContent: { text: string; route: string; type: string; audience: string }[] = [
  ...resourceCategories.map((c) => ({ text: `${c.title} ${c.description} ${c.audience}`, route: `/resources/${c.slug}`, type: "Category", audience: c.audience })),
  ...featuredGuides.map((g) => ({ text: `${g.title} ${g.description} ${g.audience}`, route: `/resources/${g.slug}`, type: "Guide", audience: g.audience })),
];

export default function ResourceSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return searchableContent
      .filter((item) => item.text.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query]);

  const handleFocus = useCallback(() => {
    if (query.trim()) setShowResults(true);
  }, [query]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setShowResults(false), 200);
  }, []);

  const handleSelect = useCallback(
    (route: string) => {
      setQuery("");
      setShowResults(false);
      navigate(route);
    },
    [navigate],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setShowResults(false);
  }, []);

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl text-foreground-50 mb-6 text-center" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Search resources
          </h2>
          <div className="relative">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-500" aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Search guides, APIs, schemas, glossary&hellip;"
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 py-3 pl-10 pr-10 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20"
                aria-label="Search resources"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-500 hover:text-foreground-300 cursor-pointer"
                  aria-label="Clear search"
                >
                  <i className="ri-close-circle-fill" />
                </button>
              )}
            </div>

            {showResults && query.trim() && (
              <div className="absolute z-40 mt-2 w-full rounded-lg border border-foreground-200/10 bg-background-50 shadow-lg">
                {results.length > 0 ? (
                  <>
                    <div className="px-4 py-2 text-xs text-foreground-500 border-b border-foreground-200/10">
                      {results.length} result{results.length !== 1 ? "s" : ""}
                    </div>
                    <ul className="max-h-80 overflow-y-auto py-1">
                      {results.map((item, i) => (
                        <li key={i}>
                          <button
                            type="button"
                            onClick={() => handleSelect(item.route)}
                            className="w-full px-4 py-2.5 text-left text-sm text-foreground-300 transition hover:bg-background-100 hover:text-foreground-100 cursor-pointer"
                          >
                            <span className="block text-foreground-200">{highlightMatch(item.text.split(" ").slice(0, 8).join(" "), query)}</span>
                            <span className="block mt-0.5 text-xs text-foreground-500">
                              {item.type} &middot; {item.audience}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-foreground-400">No resources found for &ldquo;{query}&rdquo;</p>
                    <p className="mt-2 text-xs text-foreground-500">Try a different search term or browse by category below.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function highlightMatch(text: string, query: string): string {
  const q = query.toLowerCase().trim();
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return `${before}<mark class="bg-primary-400/20 text-primary-300 rounded-sm px-0.5">${match}</mark>${after}`;
}