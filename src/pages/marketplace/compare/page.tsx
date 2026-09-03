import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { marketplacePackages } from "@/data/marketplacePackages";
import { getPackageDetail, getPackagesBySlugs } from "@/data/packageDetailData";
import { useSavedPackages } from "@/hooks/useSavedPackages";
import { useComparePackages } from "@/hooks/useComparePackages";
import { comparisonSections, parseCompareSlugs, buildCompareUrl } from "./utils/comparisonUtils";
import ComparisonPageHeader from "./components/ComparisonPageHeader";
import ComparisonEmptyState from "./components/ComparisonEmptyState";
import ComparisonPackageHeader from "./components/ComparisonPackageHeader";
import ComparisonPackageSelector from "./components/ComparisonPackageSelector";
import ComparisonToolbar from "./components/ComparisonToolbar";
import ComparisonSection from "./components/ComparisonSection";
import ComparisonSummary from "./components/ComparisonSummary";
import ComparisonConsiderations from "./components/ComparisonConsiderations";
import MobileComparisonSwitcher from "./components/MobileComparisonSwitcher";
import ClearComparisonDialog from "./components/ClearComparisonDialog";
import AccessEnquiryModal from "@/pages/marketplace/detail/components/AccessEnquiryModal";
import PackageBadge from "@/pages/marketplace/components/PackageBadge";
import type { MarketplacePackage } from "@/data/marketplacePackages";

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Comparison state
  const {
    compareIds,
    isComparing,
    toggleCompare,
    removeCompare,
    clearCompare,
    isAtLimit,
    maxCompare,
  } = useComparePackages();

  // Saved state
  const { savedIds, isSaved, toggleSave } = useSavedPackages();

  // UI state
  const [highlightDiffs, setHighlightDiffs] = useState(true);
  const [hideIdentical, setHideIdentical] = useState(false);
  const [allExpanded, setAllExpanded] = useState(true);
  const [selectorMode, setSelectorMode] = useState<"add" | { replaceId: string }>("add");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [enquirySlug, setEnquirySlug] = useState<string | null>(null);
  const [mobilePair, setMobilePair] = useState<[number, number]>([0, 1]);

  // Previous URL ref for sync
  const prevUrlRef = useRef<string>("");

  // ── Resolve packages from URL slugs ──────────────────────
  const slugsFromUrl = useMemo(() => parseCompareSlugs(searchParams), [searchParams]);
  const resolvedFromUrl = useMemo(
    () => getPackagesBySlugs(slugsFromUrl).slice(0, maxCompare),
    [slugsFromUrl, maxCompare],
  );
  const resolvedIds = useMemo(() => resolvedFromUrl.map((p) => p.id), [resolvedFromUrl]);

  // Sync sessionStorage compare state with URL-derived packages
  useEffect(() => {
    if (slugsFromUrl.length === 0) return;
    const urlIds = resolvedFromUrl.map((p) => p.id);
    // Only sync if they differ
    const currentIds = [...compareIds].sort().join(",");
    const urlIdsStr = [...urlIds].sort().join(",");
    if (currentIds !== urlIdsStr) {
      // Remove any that shouldn't be there, add any that should
      urlIds.forEach((id) => {
        if (!compareIds.includes(id)) toggleCompare(id);
      });
    }
    // We intentionally don't run on compareIds changes to avoid loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugsFromUrl.join(",")]);

  // When compareIds change (from sessionStorage or toggle), update URL
  const prevCompareIdsRef = useRef<string[]>(compareIds);
  useEffect(() => {
    const prev = prevCompareIdsRef.current;
    prevCompareIdsRef.current = compareIds;
    if (prev.join(",") === compareIds.join(",")) return;

    const slugs = compareIds
      .map((id) => marketplacePackages.find((p) => p.id === id)?.slug)
      .filter(Boolean) as string[];
    const newUrl = buildCompareUrl(slugs);
    if (newUrl !== prevUrlRef.current) {
      prevUrlRef.current = newUrl;
      setSearchParams(slugs.length > 0 ? { packages: slugs.join(",") } : {}, { replace: true });
    }
  }, [compareIds, setSearchParams]);

  // ── Determine which packages to display ──────────────────
  // Priority: URL slugs → sessionStorage IDs → empty
  const displayPackages: MarketplacePackage[] = useMemo(() => {
    if (slugsFromUrl.length > 0) {
      return resolvedFromUrl;
    }
    if (compareIds.length > 0) {
      return compareIds
        .map((id) => getPackagesBySlugs([marketplacePackages.find((p) => p.id === id)?.slug || ""]))
        .filter((p): p is MarketplacePackage[] => p.length > 0)
        .flat()
        .slice(0, maxCompare);
    }
    return [];
  }, [slugsFromUrl, compareIds, resolvedFromUrl, maxCompare]);

  const displayIds = useMemo(() => displayPackages.map((p) => p.id), [displayPackages]);

  // ── Handlers ────────────────────────────────────────────
  const handleRemove = useCallback(
    (id: string) => {
      removeCompare(id);
    },
    [removeCompare],
  );

  const handleClear = useCallback(() => {
    setClearDialogOpen(true);
  }, []);

  const confirmClear = useCallback(() => {
    clearCompare();
    setClearDialogOpen(false);
    setSearchParams({}, { replace: true });
  }, [clearCompare, setSearchParams]);

  const handleOpenAddSelector = useCallback(() => {
    setSelectorMode("add");
    setSelectorOpen(true);
  }, []);

  const handleOpenReplaceSelector = useCallback((replaceId: string) => {
    setSelectorMode({ replaceId });
    setSelectorOpen(true);
  }, []);

  const handleAdd = useCallback(
    (id: string) => {
      toggleCompare(id);
    },
    [toggleCompare],
  );

  const handleReplace = useCallback(
    (oldId: string, newId: string) => {
      removeCompare(oldId);
      // Small delay to let removal take effect before adding
      setTimeout(() => toggleCompare(newId), 50);
    },
    [removeCompare, toggleCompare],
  );

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleToggleHighlight = useCallback(() => setHighlightDiffs((v) => !v), []);
  const handleToggleHideIdentical = useCallback(() => setHideIdentical((v) => !v), []);
  const handleExpandAll = useCallback(() => setAllExpanded(true), []);
  const handleCollapseAll = useCallback(() => setAllExpanded(false), []);
  const handleResetView = useCallback(() => {
    setHighlightDiffs(true);
    setHideIdentical(false);
    setAllExpanded(true);
  }, []);

  const handleOpenEnquiry = useCallback((slug: string) => {
    setEnquirySlug(slug);
  }, []);

  // Update mobile pair when packages change
  useEffect(() => {
    setMobilePair([0, Math.min(1, displayPackages.length - 1)]);
  }, [displayPackages.length]);

  // ── Current URL for sharing ─────────────────────────────
  const currentUrl = useMemo(() => buildCompareUrl(displayPackages.map((p) => p.slug)), [displayPackages]);

  // ── Render states ───────────────────────────────────────
  const noPackages = displayPackages.length === 0;
  const isSingle = displayPackages.length === 1;

  return (
    <div className="min-h-screen bg-background-50 print:bg-white">
      <PublicHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14 print:px-2 print:py-4">
        {/* Header */}
        <ComparisonPageHeader
          packageCount={displayPackages.length}
          currentUrl={currentUrl}
          onClear={handleClear}
          onPrint={handlePrint}
        />

        {/* Demo notice */}
        <div className="mb-8 rounded-lg border border-foreground-200/10 bg-background-100/60 px-5 py-3.5">
          <p className="text-[11px] leading-relaxed text-foreground-400">
            <i className="ri-information-line mr-1.5 text-accent-400" aria-hidden="true" />
            These fictional demonstration listings illustrate the planned DataHarbour marketplace.
            A comparison does not constitute legal approval, compliance advice or product access.
          </p>
        </div>

        {/* Empty / Single states */}
        {noPackages || isSingle ? (
          <ComparisonEmptyState
            packages={marketplacePackages.filter((p) => !displayIds.includes(p.id)).slice(0, 4)}
            savedIds={savedIds}
            compareIds={displayIds}
            isCompareAtLimit={isAtLimit}
            isSaved={isSaved}
            isComparing={isComparing}
            onToggleSave={toggleSave}
            onToggleCompare={toggleCompare}
            onOpenSelector={handleOpenAddSelector}
          />
        ) : (
          <>
            {/* Package header cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {displayPackages.map((pkg) => (
                <ComparisonPackageHeader
                  key={pkg.id}
                  pkg={pkg}
                  isSaved={isSaved(pkg.id)}
                  isComparing={isComparing(pkg.id)}
                  onToggleSave={toggleSave}
                  onRemove={handleRemove}
                  onReplace={handleOpenReplaceSelector}
                />
              ))}
            </div>

            {/* Toolbar */}
            <ComparisonToolbar
              highlightDiffs={highlightDiffs}
              hideIdentical={hideIdentical}
              allExpanded={allExpanded}
              onToggleHighlight={handleToggleHighlight}
              onToggleHideIdentical={handleToggleHideIdentical}
              onExpandAll={handleExpandAll}
              onCollapseAll={handleCollapseAll}
              onReset={handleResetView}
              onPrint={handlePrint}
            />

            {/* Mobile pair switcher (only visible on mobile when > 2 packages) */}
            {displayPackages.length > 2 && (
              <div className="lg:hidden">
                <MobileComparisonSwitcher
                  packages={displayPackages}
                  activePair={mobilePair}
                  onSwitchPair={setMobilePair}
                />
              </div>
            )}

            {/* Comparison sections */}
            <div className="space-y-3">
              {comparisonSections.map((section) => (
                <ComparisonSection
                  key={section.id}
                  section={section}
                  packages={displayPackages}
                  highlightDiffs={highlightDiffs}
                  hideIdentical={hideIdentical}
                  defaultExpanded={allExpanded}
                />
              ))}
            </div>

            {/* Quick observations */}
            <div className="mt-6">
              <ComparisonSummary packages={displayPackages} />
            </div>

            {/* Important considerations */}
            <div className="mt-4">
              <ComparisonConsiderations />
            </div>

            {/* Bottom actions per package */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {displayPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex flex-col gap-2 rounded-lg border border-foreground-200/10 bg-background-100/40 p-4"
                >
                  <p className="text-[11px] font-medium text-foreground-300 truncate">{pkg.name}</p>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => navigate(`/marketplace/${pkg.slug}`)}
                      className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-3 py-2 text-[11px] font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
                    >
                      <i className="ri-eye-line" aria-hidden="true" />
                      View Package
                    </button>
                    {pkg.accessLevel === "Contact Sales" || pkg.pricingModel === "Contact Sales" ? (
                      <a
                        href={`/contact?type=supplier&package=${pkg.slug}`}
                        className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-[11px] text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
                      >
                        <i className="ri-mail-line" aria-hidden="true" />
                        Contact Sales
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenEnquiry(pkg.slug)}
                        className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-[11px] text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
                      >
                        <i className="ri-mail-send-line" aria-hidden="true" />
                        Request Access (Demo)
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(pkg.id)}
                      className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-[11px] text-foreground-500 transition hover:text-[#ff2e88] cursor-pointer"
                    >
                      <i className="ri-delete-bin-line" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <PublicFooter />

      {/* Package selector modal */}
      <ComparisonPackageSelector
        isOpen={selectorOpen}
        compareIds={compareIds}
        mode={selectorMode}
        onAdd={handleAdd}
        onReplace={handleReplace}
        onClose={() => setSelectorOpen(false)}
      />

      {/* Clear confirmation dialog */}
      <ClearComparisonDialog
        isOpen={clearDialogOpen}
        onConfirm={confirmClear}
        onCancel={() => setClearDialogOpen(false)}
        packageCount={displayPackages.length}
      />

      {/* Access enquiry modal (reused from detail page) */}
      {enquirySlug && (
        <AccessEnquiryModal
          isOpen
          onClose={() => setEnquirySlug(null)}
          packageName={displayPackages.find((p) => p.slug === enquirySlug)?.name || ""}
          packageSlug={enquirySlug}
        />
      )}
    </div>
  );
}