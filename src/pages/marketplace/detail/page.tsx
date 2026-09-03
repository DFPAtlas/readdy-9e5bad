import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { usePackageDetail, usePackagesBySlugs } from "@/hooks/usePackageDetail";
import { useSavedPackages } from "@/hooks/useSavedPackages";
import { useComparePackages } from "@/hooks/useComparePackages";
import PackageBreadcrumb from "./components/PackageBreadcrumb";
import PackageTrustRow from "./components/PackageTrustRow";
import PackageSectionNav from "./components/PackageSectionNav";
import PackageFactsGrid from "./components/PackageFactsGrid";
import PackageCoverage from "./components/PackageCoverage";
import PackageDataDictionary from "./components/PackageDataDictionary";
import PackageSamplePreview from "./components/PackageSamplePreview";
import PackageProvenance from "./components/PackageProvenance";
import PackageQuality from "./components/PackageQuality";
import PackageUsageRules from "./components/PackageUsageRules";
import PackageDeliveryMethods from "./components/PackageDeliveryMethods";
import PackagePricingCard from "./components/PackagePricingCard";
import AccessEnquiryModal from "./components/AccessEnquiryModal";
import SupplierProfileCard from "./components/SupplierProfileCard";
import PackageVersionHistory from "./components/PackageVersionHistory";
import RelatedPackages from "./components/RelatedPackages";
import SharePackageButton from "./components/SharePackageButton";
import PackageBadge from "../components/PackageBadge";

const sectionNavItems = [
  { id: "overview", label: "Overview", icon: "ri-eye-line" },
  { id: "coverage", label: "Coverage", icon: "ri-earth-line" },
  { id: "data-fields", label: "Data Fields", icon: "ri-table-line" },
  { id: "sample", label: "Sample", icon: "ri-code-s-slash-line" },
  { id: "provenance", label: "Provenance", icon: "ri-shield-check-line" },
  { id: "quality", label: "Quality", icon: "ri-bar-chart-line" },
  { id: "usage", label: "Usage", icon: "ri-file-list-3-line" },
  { id: "delivery", label: "Delivery", icon: "ri-download-line" },
  { id: "supplier", label: "Supplier", icon: "ri-building-line" },
  { id: "versions", label: "Versions", icon: "ri-git-branch-line" },
  { id: "related", label: "Related", icon: "ri-links-line" },
];

export default function PackageDetail() {
  const { packageSlug } = useParams<{ packageSlug: string }>();
  const navigate = useNavigate();
  const [accessModalOpen, setAccessModalOpen] = useState(false);

  const { pkg, loading, error } = usePackageDetail(packageSlug);
  const { isSaved, toggleSave } = useSavedPackages();
  const { isComparing, toggleCompare, isAtLimit, compareIds, removeCompare, clearCompare } = useComparePackages();

  const relatedSlugs = pkg?.relatedPackageSlugs || [];
  const { packages: relatedPackages } = usePackagesBySlugs(relatedSlugs);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [packageSlug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background-50">
        <PublicHeader />
        <main className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-48 rounded bg-background-200/60" />
            <div className="h-10 w-3/4 rounded bg-background-200/60" />
            <div className="h-5 w-1/2 rounded bg-background-200/60" />
            <div className="h-64 w-full rounded bg-background-200/60" />
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background-50">
        <PublicHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
          <div className="mb-6 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-red-400/10 border border-red-400/20">
            <i className="ri-error-warning-line text-2xl text-red-400" />
          </div>
          <h1
            className="mb-4 text-3xl text-foreground-50 md:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Failed to load package
          </h1>
          <p className="mx-auto mb-8 max-w-md text-sm text-foreground-400">{error}</p>
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            <i className="ri-arrow-left-line" />
            Back to Marketplace
          </button>
        </main>
        <PublicFooter />
      </div>
    );
  }

  // Not found
  if (!pkg) {
    return (
      <div className="min-h-screen bg-background-50">
        <PublicHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
          <div className="mb-6 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-background-100 border border-foreground-200/10">
            <i className="ri-question-line text-2xl text-foreground-400" />
          </div>
          <h1
            className="mb-4 text-3xl text-foreground-50 md:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Package not found
          </h1>
          <p className="mx-auto mb-8 max-w-md text-sm text-foreground-400">
            The data package you are looking for does not exist or may have been removed from the catalogue.
          </p>
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            <i className="ri-arrow-left-line" />
            Back to Marketplace
          </button>
        </main>
        <PublicFooter />
      </div>
    );
  }

  const saved = isSaved(pkg.id);
  const comparing = isComparing(pkg.id);

  return (
    <div className="min-h-screen bg-background-50">
      <PublicHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        {/* Breadcrumb */}
        <PackageBreadcrumb category={pkg.category} packageName={pkg.name} />

        {/* Demonstration Notice */}
        <div className="mb-6 rounded-lg border border-foreground-200/10 bg-background-100/60 px-4 py-3 text-[11px] text-foreground-400 leading-relaxed">
          <i className="ri-information-line mr-1.5 text-accent-400" aria-hidden="true" />
          This is a fictional demonstration listing used to show the planned DataHarbour marketplace. Live product access will depend on supplier terms, organisation verification and applicable compliance review.
        </div>

        {/* Package Header */}
        <div className="mb-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <PackageBadge label={pkg.category} />
            {pkg.isDemo && <PackageBadge label="Demonstration" variant="demo" icon="ri-information-line" />}
            {pkg.featured && <PackageBadge label="Featured" variant="supplier" icon="ri-star-fill" />}
          </div>

          <h1
            className="mb-3 text-3xl text-foreground-50 md:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            {pkg.name}
          </h1>

          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="text-sm text-foreground-400">
              by <span className="text-foreground-200 font-medium">{pkg.supplier}</span>
            </span>
            <PackageBadge
              label={pkg.supplierStatus}
              variant={pkg.supplierStatus === "Verified Supplier" ? "supplier" : pkg.supplierStatus === "Demonstration Supplier" ? "demo" : "default"}
              icon="ri-shield-check-line"
            />
            <span className="text-[11px] text-foreground-500">
              Updated {new Date(pkg.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {pkg.version && (
              <span className="text-[11px] text-foreground-500">v{pkg.version}</span>
            )}
          </div>

          <p className="mb-4 max-w-3xl text-sm leading-relaxed text-foreground-400">{pkg.shortDescription}</p>

          {/* Action buttons row */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setAccessModalOpen(true)}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              <i className="ri-key-2-line" aria-hidden="true" />
              Request Access
            </button>
            <a
              href={`/contact?type=supplier&package=${pkg.slug}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              Contact Sales
            </a>
            <button
              type="button"
              onClick={() => toggleSave(pkg.id)}
              className={`flex h-[42px] w-[42px] items-center justify-center rounded-lg border transition cursor-pointer ${
                saved
                  ? "border-accent-400/40 bg-accent-500/20 text-accent-400"
                  : "border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40"
              }`}
              aria-label={saved ? "Remove from saved" : "Save package"}
              aria-pressed={saved}
            >
              <i className={`text-sm ${saved ? "ri-bookmark-fill" : "ri-bookmark-line"}`} aria-hidden="true" />
            </button>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={comparing}
                onChange={() => toggleCompare(pkg.id)}
                disabled={!comparing && isAtLimit}
                className="h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              />
              <span className="text-xs text-foreground-400 whitespace-nowrap">
                {comparing ? "Added to compare" : "Add to compare"}
              </span>
              {!comparing && isAtLimit && (
                <span className="text-[10px] text-foreground-500">(max 4)</span>
              )}
            </label>
            <SharePackageButton packageSlug={pkg.slug} packageName={pkg.name} />
          </div>

          {/* Trust row */}
          <PackageTrustRow pkg={pkg} />
        </div>

        {/* Comparison mini bar */}
        {compareIds.length > 0 && (
          <div className="mb-8 rounded-lg border border-accent-400/20 bg-background-100/60 px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-foreground-400 whitespace-nowrap">Comparing ({compareIds.length}/4):</span>
              {compareIds.map((id) => {
                const cp = id === pkg.id ? pkg : relatedPackages.find((pp) => pp.id === id);
                if (!cp) return null;
                return (
                  <span key={id} className="inline-flex items-center gap-1 rounded-full border border-foreground-200/20 bg-background-200/60 px-2.5 py-0.5 text-[11px] text-foreground-300">
                    <span className="max-w-[100px] truncate">{cp.name}</span>
                    <button
                      type="button"
                      onClick={() => removeCompare(id)}
                      className="flex h-4 w-4 items-center justify-center rounded-full text-foreground-400 hover:text-foreground-100 cursor-pointer"
                      aria-label={`Remove ${cp.name}`}
                    >
                      <i className="ri-close-line text-xs" />
                    </button>
                  </span>
                );
              })}
              <button type="button" onClick={clearCompare} className="text-[11px] text-foreground-500 hover:text-foreground-300 cursor-pointer">Clear</button>
              {compareIds.length >= 2 && (
                <button
                  type="button"
                  onClick={() => {
                    const slugs = compareIds
                      .map((cid) => {
                        if (cid === pkg.id) return pkg.slug;
                        return relatedPackages.find((pp) => pp.id === cid)?.slug;
                      })
                      .filter(Boolean) as string[];
                    navigate(`/marketplace/compare?packages=${slugs.join(",")}`);
                  }}
                  className="ml-auto whitespace-nowrap rounded-lg bg-accent-500 px-3 py-1 text-[11px] font-medium text-background-950 transition hover:bg-accent-400 cursor-pointer"
                >
                  Compare
                </button>
              )}
            </div>
          </div>
        )}

        {/* Section Navigation */}
        <PackageSectionNav sections={sectionNavItems} />

        {/* Main content + sidebar */}
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Overview */}
            <section id="overview" className="mb-10 scroll-mt-28">
              <h2
                className="mb-5 text-xl text-foreground-50"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Overview
              </h2>

              <p className="mb-5 text-sm leading-relaxed text-foreground-400">
                {pkg.fullDescription || pkg.longDescription}
              </p>

              {pkg.overviewPoints && pkg.overviewPoints.length > 0 && (
                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {pkg.overviewPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
                      <i className="ri-check-line mt-0.5 flex-shrink-0 text-accent-400" aria-hidden="true" />
                      <span className="text-xs text-foreground-300 leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-200 uppercase">
                    <i className="ri-user-line text-accent-400" aria-hidden="true" />
                    Intended Users
                  </h3>
                  <p className="text-xs text-foreground-400 leading-relaxed">{pkg.intendedUsers}</p>
                </div>
                <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-200 uppercase">
                    <i className="ri-briefcase-line text-accent-400" aria-hidden="true" />
                    Example Applications
                  </h3>
                  <ul className="space-y-1.5">
                    {(pkg.exampleApplications || []).map((app, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0 text-[10px] text-foreground-500" aria-hidden="true" />
                        <span className="text-xs text-foreground-400">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {pkg.whatItDoesNotProvide && (
                <div className="mt-5 rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground-200 uppercase">
                    <i className="ri-information-line text-foreground-400" aria-hidden="true" />
                    What This Package Does Not Provide
                  </h3>
                  <p className="text-xs text-foreground-400 leading-relaxed">{pkg.whatItDoesNotProvide}</p>
                </div>
              )}
            </section>

            <PackageCoverage pkg={pkg} />
            <PackageFactsGrid pkg={pkg} />
            <PackageDataDictionary fields={pkg.dataFields || []} />
            <PackageSamplePreview
              schema={pkg.sampleSchema || []}
              sampleData={pkg.sampleResponse || []}
              schemaAvailable={pkg.schemaAvailable}
              sampleAvailable={pkg.sampleAvailable}
            />
            <PackageProvenance pkg={pkg} />
            <PackageQuality checks={pkg.qualityChecks || []} />
            <PackageUsageRules pkg={pkg} />
            <PackageDeliveryMethods methods={pkg.deliveryMethodDetails || []} />
            <SupplierProfileCard pkg={pkg} totalPackages={1} />
            <PackageVersionHistory currentVersion={pkg.version || "Current"} history={pkg.versionHistory || []} />
            <RelatedPackages
              packages={relatedPackages}
              isSaved={isSaved}
              isComparing={isComparing}
              isCompareAtLimit={isAtLimit}
              onToggleSave={toggleSave}
              onToggleCompare={toggleCompare}
            />

            <div className="border-t border-foreground-200/10 pt-8">
              <button
                type="button"
                onClick={() => navigate("/marketplace")}
                className="inline-flex items-center gap-2 text-sm text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
              >
                <i className="ri-arrow-left-line" aria-hidden="true" />
                Back to Marketplace
              </button>
            </div>
          </div>

          <aside className="w-full lg:w-[340px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-[100px]">
              <PackagePricingCard
                pkg={pkg}
                onRequestAccess={() => setAccessModalOpen(true)}
                isSaved={saved}
                isComparing={comparing}
                isCompareAtLimit={isAtLimit}
                onToggleSave={toggleSave}
                onToggleCompare={toggleCompare}
              />
            </div>
          </aside>
        </div>
      </main>

      <AccessEnquiryModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
        packageName={pkg.name}
        packageSlug={pkg.slug}
      />

      <PublicFooter />
    </div>
  );
}