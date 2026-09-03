import { useState, useMemo } from "react";
import type { ComplianceFaq } from "@/data/compliancePages";

interface Props {
  faqs: ComplianceFaq[];
}

const categoryKeywords: Record<string, string[]> = {
  "Governance": ["compliance", "guarantee", "status", "operational"],
  "Buyers": ["buyer", "access", "purpose", "reviewed"],
  "Suppliers": ["supplier", "listing", "delist"],
  "Data": ["data", "product", "marketing", "provenance"],
  "Rights": ["subject", "request", "rights"],
  "High-risk": ["risk", "fraud", "detection", "identity"],
};

function getCategories(faq: ComplianceFaq): string[] {
  const text = `${faq.question} ${faq.answer}`.toLowerCase();
  return Object.entries(categoryKeywords)
    .filter(([, keywords]) => keywords.some((kw) => text.includes(kw)))
    .map(([cat]) => cat);
}

export default function ComplianceFaqSection({ faqs }: Props) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    faqs.forEach((f) => getCategories(f).forEach((c) => cats.add(c)));
    return Array.from(cats).sort();
  }, [faqs]);

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const text = `${faq.question} ${faq.answer}`.toLowerCase();
      const matchesSearch = !search || text.includes(search.toLowerCase());
      const faqCats = getCategories(faq);
      const matchesFilters = activeFilters.length === 0 || activeFilters.some((f) => faqCats.includes(f));
      return matchesSearch && matchesFilters;
    });
  }, [faqs, search, activeFilters]);

  const toggleFilter = (cat: string) => {
    setActiveFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <section className="bg-background-100" id="faqs" aria-labelledby="faqs-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="faqs-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Frequently asked questions
        </h2>
        <p className="mb-8 text-sm text-foreground-400 max-w-2xl">
          Answers to common questions about DataHarbour&apos;s governance and compliance framework. Use the search and filters to find what you need.
        </p>

        {/* Search */}
        <div className="mb-4 flex max-w-md items-center gap-2 rounded-lg border border-foreground-200/20 bg-background-50/60 px-3 py-2">
          <i className="ri-search-line shrink-0 text-sm text-foreground-500" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
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

        {/* Category filters */}
        {allCategories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleFilter(cat)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs transition cursor-pointer ${
                  activeFilters.includes(cat)
                    ? "border-accent-500/30 bg-accent-500/10 text-accent-400"
                    : "border-foreground-200/20 text-foreground-500 hover:border-foreground-200/40 hover:text-foreground-300"
                }`}
              >
                {cat}
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveFilters([])}
                className="whitespace-nowrap rounded-full border border-foreground-200/20 px-3 py-1 text-xs text-foreground-500 hover:text-foreground-300 cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* FAQ accordion */}
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-foreground-200/10 bg-background-50/60 px-5 py-10 text-center">
            <p className="text-sm text-foreground-500">No FAQs match your search or filters.</p>
            <button
              type="button"
              onClick={() => { setSearch(""); setActiveFilters([]); }}
              className="mt-2 text-xs text-accent-400 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-foreground-200/10 bg-background-50/60"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-2 px-5 py-3.5 text-sm font-medium text-foreground-200 list-none">
                  {faq.question}
                  <i className="ri-add-line shrink-0 text-foreground-500 transition group-open:hidden" aria-hidden="true" />
                  <i className="ri-subtract-line shrink-0 text-foreground-500 transition hidden group-open:block" aria-hidden="true" />
                </summary>
                <div className="px-5 pb-4 text-xs leading-relaxed text-foreground-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}