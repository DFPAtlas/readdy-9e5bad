import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { provenanceGlossaryTerms } from "@/data/resources";

export default function ProvenanceGlossary() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredTerms = useMemo(() => {
    if (!query.trim()) return provenanceGlossaryTerms;
    const q = query.toLowerCase().trim();
    return provenanceGlossaryTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <PublicHeader />

      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/resources")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Resources</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Provenance Glossary</li>
          </ol>
        </div>
      </nav>

      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Provenance Glossary</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Key terms for governed data
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground-400">
              Understand the terminology used across DataHarbour — from provenance and licensing to data-minimisation and audit trails. These are general explanations and not legal advice.
            </p>
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3">
              <p className="text-xs text-foreground-400">Glossary entries are general explanations. They do not constitute legal advice. Please refer to product licences and the Compliance Centre for specific obligations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl">
            {/* Search */}
            <div className="relative mb-8">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-500 text-sm" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search glossary terms..."
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 py-2.5 pl-9 pr-3 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20"
                aria-label="Search glossary terms"
              />
            </div>

            {filteredTerms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-foreground-400">No terms match your search.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTerms.map((term) => (
                  <div key={term.term} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
                    <p className="text-sm font-semibold text-foreground-200">{term.term}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-500">{term.definition}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-foreground-200/10">
              <h3 className="text-sm font-semibold text-foreground-300 mb-4">Related resources</h3>
              <div className="flex flex-wrap gap-3">
                {["permitted-use", "compliance"].map((slug) => (
                  <button key={slug} type="button" onClick={() => navigate(slug === "compliance" ? "/compliance" : `/resources/${slug}`)} className="rounded-lg border border-foreground-200/10 bg-background-50 px-4 py-2.5 text-sm text-foreground-300 transition hover:border-primary-400/30 hover:text-foreground-100 cursor-pointer">
                    {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    <i className="ri-arrow-right-line ml-1.5 text-xs text-foreground-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}