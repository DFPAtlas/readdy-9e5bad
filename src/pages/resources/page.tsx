import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import ResourcesHero from "@/pages/resources/components/ResourcesHero";
import ResourceSearch from "@/pages/resources/components/ResourceSearch";
import ResourceCategoryGrid from "@/pages/resources/components/ResourceCategoryGrid";
import QuickStartJourney from "@/pages/resources/components/QuickStartJourney";
import FeaturedGuides from "@/pages/resources/components/FeaturedGuides";
import AudiencePaths from "@/pages/resources/components/AudiencePaths";
import DocumentationStatusPanel from "@/pages/resources/components/DocumentationStatusPanel";
import { useNavigate } from "react-router-dom";
import { resourceFaqs } from "@/data/resources";
import FaqAccordion from "@/components/base/FaqAccordion";

export default function ResourcesHub() {
  const navigate = useNavigate();

  return (
    <>
      <PublicHeader />
      <ResourcesHero />
      <ResourceSearch />
      <ResourceCategoryGrid />
      <QuickStartJourney />
      <FeaturedGuides />
      <AudiencePaths />
      <DocumentationStatusPanel />

      {/* FAQ */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Frequently asked questions
            </h2>
          </div>
          <FaqAccordion items={resourceFaqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18 text-center">
          <h2 className="text-2xl text-foreground-50 mb-6" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Ready to explore the marketplace?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Browse marketplace
              <i className="ri-arrow-right-line" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact?type=technical")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 cursor-pointer"
            >
              Contact technical support
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}