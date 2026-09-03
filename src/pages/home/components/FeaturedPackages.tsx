import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/base/SectionHeading";
import { usePackagesBySlugs } from "@/hooks/usePackageDetail";
import { useSavedPackages } from "@/hooks/useSavedPackages";
import { useComparePackages } from "@/hooks/useComparePackages";
import DataPackageCard from "@/pages/marketplace/components/DataPackageCard";

const featuredSlugs = [
  "uk-business-registry-enrichment-api",
  "regional-retail-footfall-index",
  "uk-planning-development-activity-feed",
  "address-validation-premises-classification-api",
  "sme-commercial-risk-signals",
  "consumer-lifestyle-audience-segments",
];

export default function FeaturedPackages() {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSavedPackages();
  const { isComparing, toggleCompare, isAtLimit } = useComparePackages();
  const { packages: featuredPackages, loading } = usePackagesBySlugs(featuredSlugs);

  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          heading="Featured Data Packages"
          supporting="Browse a selection of structured data products available through DataHarbour. All packages are fictional demonstration listings."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
                  <div className="mb-3 h-5 w-32 rounded bg-background-200/60" />
                  <div className="mb-2 h-16 rounded bg-background-200/60" />
                  <div className="mb-4 space-y-2">
                    <div className="h-3 w-full rounded bg-background-200/60" />
                    <div className="h-3 w-3/4 rounded bg-background-200/60" />
                  </div>
                  <div className="h-9 w-full rounded bg-background-200/60" />
                </div>
              ))
            : featuredPackages.map((pkg) => (
                <DataPackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isSaved={isSaved(pkg.id)}
                  isComparing={isComparing(pkg.id)}
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
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
          >
            View All Data Packages
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}