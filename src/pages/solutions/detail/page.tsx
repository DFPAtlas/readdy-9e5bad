import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { solutions } from "@/data/solutions";
import { marketplacePackages } from "@/data/marketplacePackages";
import { useSavedPackages } from "@/hooks/useSavedPackages";
import { useComparePackages } from "@/hooks/useComparePackages";
import SolutionBreadcrumb from "./components/SolutionBreadcrumb";
import SolutionHero from "./components/SolutionHero";
import SolutionChallengeGrid from "./components/SolutionChallengeGrid";
import SolutionOutcomeGrid from "./components/SolutionOutcomeGrid";
import SolutionWorkflow from "./components/SolutionWorkflow";
import TypicalUsers from "./components/TypicalUsers";
import SolutionUseCaseCard from "./components/SolutionUseCaseCard";
import SolutionComplianceSection from "./components/SolutionComplianceSection";
import SolutionLimitations from "./components/SolutionLimitations";
import RelatedSolutions from "./components/RelatedSolutions";
import SolutionFaq from "./components/SolutionFaq";
import SolutionEnquiry from "./components/SolutionEnquiry";
import DataPackageCard from "@/pages/marketplace/components/DataPackageCard";

export default function SolutionDetail() {
  const { solutionSlug } = useParams<{ solutionSlug: string }>();
  const navigate = useNavigate();
  const { savedIds: savedPackageIds, toggleSave } = useSavedPackages();
  const { compareIds: comparedPackageIds, toggleCompare, isAtLimit } = useComparePackages();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const solution = useMemo(
    () => solutions.find((s) => s.slug === solutionSlug),
    [solutionSlug],
  );

  const featuredPackages = useMemo(() => {
    if (!solution) return [];
    return marketplacePackages
      .filter((p) => solution.featuredPackageSlugs.includes(p.slug))
      .slice(0, 6);
  }, [solution]);

  // Not found state
  if (!solution) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background-200/60">
          <i className="ri-question-line text-2xl text-foreground-400" aria-hidden="true" />
        </div>
        <h1
          className="mb-2 text-2xl text-foreground-50"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Solution not found
        </h1>
        <p className="mb-6 text-sm text-foreground-400">
          We couldn&apos;t find a solution matching this reference. It may have been removed or the link may be incorrect.
        </p>
        <button
          type="button"
          onClick={() => navigate("/solutions")}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-5 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          <i className="ri-arrow-left-line" aria-hidden="true" />
          Back to Solutions
        </button>
      </div>
    );
  }

  return (
    <>
      <SolutionBreadcrumb solution={solution} />
      <SolutionHero solution={solution} />

      <SolutionChallengeGrid challenges={solution.businessChallenges} />
      <SolutionOutcomeGrid outcomes={solution.supportedOutcomes} />
      <SolutionWorkflow steps={solution.workflowSteps} />
      <TypicalUsers users={solution.typicalUsers} />
      <SolutionUseCaseCard useCases={solution.useCases} />

      {/* Relevant Data Categories */}
      <section className="bg-background-100" id="categories" aria-labelledby="cats-heading">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <h2
            id="cats-heading"
            className="mb-2 text-2xl text-foreground-50 md:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Relevant data categories
          </h2>
          <p className="mb-6 text-sm text-foreground-400">Data-product categories most relevant to this solution area.</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.relevantCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => navigate(`/marketplace?categories=${encodeURIComponent(cat)}`)}
                className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5 text-left transition hover:border-foreground-200/20 cursor-pointer"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-accent-500/10">
                  <i className={`${cat.includes("Business") ? "ri-building-line" : cat.includes("Demographic") ? "ri-bar-chart-grouped-line" : cat.includes("Location") ? "ri-map-pin-line" : cat.includes("Financial") ? "ri-bank-line" : cat.includes("Market") ? "ri-line-chart-line" : cat.includes("Audience") ? "ri-user-heart-line" : cat.includes("Verification") ? "ri-shield-check-line" : cat.includes("API") ? "ri-code-s-slash-line" : "ri-stack-line"} text-base text-accent-400`} aria-hidden="true" />
                </div>
                <h4 className="mb-1 text-sm font-medium text-foreground-200">{cat}</h4>
                <p className="text-[11px] text-foreground-500">View relevant packages in the marketplace</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Packages */}
      {featuredPackages.length > 0 && (
        <section className="bg-background-50" id="packages" aria-labelledby="pkgs-heading">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
            <h2
              id="pkgs-heading"
              className="mb-2 text-2xl text-foreground-50 md:text-3xl"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Relevant demonstration packages
            </h2>
            <p className="mb-8 text-sm text-foreground-400">
              Illustrative data products that may support this solution area. All listings are fictional demonstrations.
            </p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPackages.map((pkg) => (
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
                onClick={() => navigate(`/marketplace?categories=${encodeURIComponent(solution.relevantCategories.join(","))}`)}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
              >
                View all relevant packages
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      )}

      <SolutionComplianceSection considerations={solution.complianceConsiderations} />
      <SolutionLimitations limitations={solution.limitations} />
      <RelatedSolutions relatedSlugs={solution.relatedSolutionSlugs} currentSlug={solution.slug} />
      <SolutionFaq faqs={solution.faqs} />

      {/* Enquiry CTA */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18 text-center">
          <h2
            className="mb-2 text-2xl text-foreground-50 md:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Discuss your {solution.name.toLowerCase()} requirements
          </h2>
          <p className="mb-8 text-sm text-foreground-400 max-w-lg mx-auto">
            Submit a demonstration enquiry to explore how governed data products may support your business challenge. No live request will be processed.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              <i className="ri-mail-send-line" aria-hidden="true" />
              Submit Enquiry
            </button>
            <a
              href={`/contact?type=buyer&topic=solution&solution=${solution.slug}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
            >
              <i className="ri-mail-line" aria-hidden="true" />
              Contact DataHarbour
            </a>
          </div>
        </div>
      </section>

      <SolutionEnquiry
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        solutionName={solution.name}
        solutionSlug={solution.slug}
      />
    </>
  );
}