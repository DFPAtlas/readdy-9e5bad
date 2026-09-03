import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/base/SectionHeading";

export default function MarketplaceIntro() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Data Marketplace"
          heading="Find the intelligence your organisation needs."
          supporting="Explore structured data products for market research, customer enrichment, business verification, fraud prevention, audience planning, location analysis and commercial decision-making."
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Browse Data Packages
            </button>
            <button
              type="button"
              onClick={() => navigate("/compliance")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              See How Access Works
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </SectionHeading>
      </div>
    </section>
  );
}