import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { solutions, solutionFinderMapping } from "@/data/solutions";
import { marketplacePackages } from "@/data/marketplacePackages";
import { useSavedPackages } from "@/hooks/useSavedPackages";
import { useComparePackages } from "@/hooks/useComparePackages";
import SolutionsHero from "./components/SolutionsHero";
import SolutionFinder from "./components/SolutionFinder";
import SolutionCard from "./components/SolutionCard";
import BusinessNeedsOverview from "./components/BusinessNeedsOverview";
import DataProductTypeGrid from "./components/DataProductTypeGrid";
import IndustryExampleCard from "./components/IndustryExampleCard";
import SolutionsCompliancePanel from "./components/SolutionsCompliancePanel";
import SolutionsFaq from "./components/SolutionsFaq";
import DataPackageCard from "@/pages/marketplace/components/DataPackageCard";

export default function Solutions() {
  const navigate = useNavigate();
  const { savedIds: savedPackageIds, toggleSave } = useSavedPackages();
  const { compareIds: comparedPackageIds, toggleCompare, isAtLimit } = useComparePackages();
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Get featured packages for display
  const featuredPackageSlugs = useMemo(() => {
    const slugs = new Set<string>();
    solutions.forEach((s) => s.featuredPackageSlugs.forEach((slug) => slugs.add(slug)));
    return marketplacePackages
      .filter((p) => slugs.has(p.slug))
      .slice(0, 6);
  }, []);

  // Section navigation effect for finder
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const finderSelect = params.get("finder");
    if (finderSelect) {
      const slug = solutionFinderMapping[finderSelect];
      if (slug) {
        setHighlightedSlug(slug);
        const el = cardRefs.current[slug];
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus({ preventScroll: true });
          }, 300);
        }
      }
    }
  }, []);

  return (
    <>
      <SolutionsHero />
      <SolutionFinder />

      {/* Solution Card Grid */}
      <section className="bg-background-100" aria-labelledby="solutions-grid-heading">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <h2
            id="solutions-grid-heading"
            className="mb-8 text-2xl text-foreground-50 md:text-3xl text-center"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Explore solutions by business need
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <SolutionCard
                key={solution.slug}
                solution={solution}
                isHighlighted={highlightedSlug === solution.slug}
                cardRef={(el) => { cardRefs.current[solution.slug] = el; }}
              />
            ))}
          </div>
        </div>
      </section>

      <BusinessNeedsOverview />
      <DataProductTypeGrid />
      <IndustryExampleCard />
      <SolutionsCompliancePanel />

      {/* Featured Packages */}
      {featuredPackageSlugs.length > 0 && (
        <section className="bg-background-100" aria-labelledby="feat-pkgs-heading">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-foreground-500 uppercase">Featured demonstration packages</p>
              <h2
                id="feat-pkgs-heading"
                className="mb-2 text-2xl text-foreground-50 md:text-3xl"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Illustrative data products
              </h2>
              <p className="text-sm text-foreground-400">
                These demonstration packages illustrate the types of governed data products available. All listings are fictional.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPackageSlugs.map((pkg) => (
                <DataPackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isSaved={savedPackageIds.includes(pkg.id)}
                  isComparing={comparedPackageIds.includes(pkg.id)}
                  isCompareAtLimit={isAtLimit}
                  onToggleSave={toggleSave}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => navigate("/marketplace")}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
              >
                Browse all marketplace packages
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      )}

      <SolutionsFaq />

      {/* Final CTA */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18 text-center">
          <h2
            className="mb-2 text-2xl text-foreground-50 md:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Start with the problem you need to solve
          </h2>
          <p className="mb-8 text-sm text-foreground-400 max-w-lg mx-auto">
            Explore the marketplace, identify relevant data products and begin the governed-access process.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Browse Marketplace
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </button>
            <a
              href="/contact?type=buyer&topic=solution"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
            >
              Discuss a Data Requirement
              <i className="ri-mail-line" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}