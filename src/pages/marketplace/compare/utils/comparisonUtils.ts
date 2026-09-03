import type { MarketplacePackage } from "@/data/marketplacePackages";

// ── NORMALISATION ──────────────────────────────────────────

export function normaliseComparisonValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) {
    return [...value].sort().join(" | ");
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "";
    }
  }
  return String(value).trim().toLowerCase();
}

export function areComparisonValuesEqual(a: unknown, b: unknown): boolean {
  return normaliseComparisonValue(a) === normaliseComparisonValue(b);
}

// ── ROW DEFINITIONS ────────────────────────────────────────

export interface ComparisonRowDef {
  label: string;
  accessor: (pkg: MarketplacePackage) => unknown;
  formatter: (pkg: MarketplacePackage) => string;
  tooltip?: string;
  important?: boolean;
}

export interface ComparisonSectionDef {
  id: string;
  title: string;
  rows: ComparisonRowDef[];
}

function joinArr(pkg: MarketplacePackage, key: keyof MarketplacePackage): string {
  const v = pkg[key];
  if (!Array.isArray(v)) return "—";
  return (v as string[]).join(", ");
}

function yno(val: boolean): string {
  return val ? "Yes" : "No";
}

function orNA(val: string | undefined | null): string {
  if (!val) return "Not specified";
  return val;
}

function fmtDate(iso: string): string {
  if (!iso) return "Not specified";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export const comparisonSections: ComparisonSectionDef[] = [
  {
    id: "overview",
    title: "Product Overview",
    rows: [
      { label: "Package Name", accessor: (p) => p.name, formatter: (p) => p.name, important: true },
      { label: "Supplier", accessor: (p) => p.supplier, formatter: (p) => p.supplier, important: true },
      { label: "Category", accessor: (p) => p.category, formatter: (p) => p.category },
      { label: "Short Description", accessor: (p) => p.shortDescription, formatter: (p) => p.shortDescription },
      { label: "Intended Users", accessor: (p) => p.intendedUsers || "", formatter: (p) => orNA(p.intendedUsers) },
      { label: "Demonstration", accessor: (p) => p.isDemo, formatter: (p) => p.isDemo ? "Demonstration listing" : "Live product" },
      { label: "Version", accessor: (p) => p.version || "", formatter: (p) => orNA(p.version) },
      { label: "Last Updated", accessor: (p) => p.updatedAt, formatter: (p) => fmtDate(p.updatedAt) },
    ],
  },
  {
    id: "coverage",
    title: "Coverage",
    rows: [
      { label: "Geographic Coverage", accessor: (p) => p.geographicCoverage, formatter: (p) => p.geographicCoverage, important: true },
      { label: "Record / Entity Coverage", accessor: (p) => p.recordCoverage || "", formatter: (p) => orNA(p.recordCoverage) },
      { label: "Coverage Notes", accessor: (p) => p.coverageNotes || "", formatter: (p) => orNA(p.coverageNotes) },
      { label: "Historical Depth", accessor: (p) => p.historicalDepth || "", formatter: (p) => orNA(p.historicalDepth) },
      { label: "Refresh Frequency", accessor: (p) => p.refreshFrequency, formatter: (p) => p.refreshFrequency },
      { label: "Exclusions / Limitations", accessor: (p) => p.whatItDoesNotProvide || "", formatter: (p) => orNA(p.whatItDoesNotProvide) },
    ],
  },
  {
    id: "delivery",
    title: "Delivery and Integration",
    rows: [
      { label: "Delivery Formats", accessor: (p) => p.deliveryFormats, formatter: (p) => joinArr(p, "deliveryFormats"), important: true },
      { label: "API Available", accessor: (p) => p.deliveryFormats.includes("API"), formatter: (p) => yno(p.deliveryFormats.includes("API")) },
      { label: "Scheduled Feed", accessor: (p) => p.deliveryFormats.includes("Scheduled Feed"), formatter: (p) => yno(p.deliveryFormats.includes("Scheduled Feed")) },
      { label: "Secure Download", accessor: (p) => p.deliveryFormats.includes("Secure Download"), formatter: (p) => yno(p.deliveryFormats.includes("Secure Download")) },
      { label: "Onboarding Time", accessor: (p) => p.onboardingTimeDisplay || "", formatter: (p) => orNA(p.onboardingTimeDisplay) },
      { label: "Support Level", accessor: (p) => p.supportLevel || "", formatter: (p) => orNA(p.supportLevel) },
      { label: "Sample Available", accessor: (p) => p.sampleAvailable, formatter: (p) => yno(p.sampleAvailable) },
      { label: "Schema Available", accessor: (p) => p.schemaAvailable, formatter: (p) => yno(p.schemaAvailable) },
    ],
  },
  {
    id: "provenance",
    title: "Provenance and Quality",
    rows: [
      { label: "Provenance Status", accessor: (p) => p.provenanceStatus, formatter: (p) => p.provenanceStatus, important: true },
      { label: "Source Types", accessor: (p) => p.sourceTypes || [], formatter: (p) => orNA(p.sourceTypes?.join(", ")) },
      { label: "Collection Summary", accessor: (p) => p.collectionMethodSummary || "", formatter: (p) => orNA(p.collectionMethodSummary) },
      { label: "Latest Review", accessor: (p) => p.provenanceDetails?.reviewDate || "", formatter: (p) => fmtDate(p.provenanceDetails?.reviewDate || "") },
      { label: "Quality — Completeness", accessor: (p) => p.qualityChecks?.[0]?.score, formatter: (p) => p.qualityChecks?.[0] ? `${p.qualityChecks[0].score}/100` : "Not scored" },
      { label: "Quality — Freshness", accessor: (p) => p.qualityChecks?.[1]?.score, formatter: (p) => p.qualityChecks?.[1] ? `${p.qualityChecks[1].score}/100` : "Not scored" },
      { label: "Quality — Consistency", accessor: (p) => p.qualityChecks?.[2]?.score, formatter: (p) => p.qualityChecks?.[2] ? `${p.qualityChecks[2].score}/100` : "Not scored" },
      { label: "Known Limitations", accessor: (p) => p.provenanceDetails?.limitations || "", formatter: (p) => orNA(p.provenanceDetails?.limitations) },
    ],
  },
  {
    id: "access",
    title: "Access and Governance",
    rows: [
      { label: "Access Level", accessor: (p) => p.accessLevel, formatter: (p) => p.accessLevel, important: true },
      { label: "Buyer Verification Required", accessor: (p) => p.accessLevel !== "Open Catalogue", formatter: (p) => p.accessLevel !== "Open Catalogue" ? "Required" : "Not required" },
      { label: "Compliance Review Required", accessor: (p) => ["Compliance Review", "Supplier Approval", "Enterprise Agreement"].includes(p.accessLevel), formatter: (p) => ["Compliance Review", "Supplier Approval", "Enterprise Agreement"].includes(p.accessLevel) ? "Required" : "Not required" },
      { label: "Approved-Purpose Requirement", accessor: (p) => p.accessLevel !== "Open Catalogue", formatter: (p) => p.accessLevel !== "Open Catalogue" ? "Required — declared business purpose" : "Not required" },
      { label: "Security Requirements", accessor: (p) => p.securityRequirements || "", formatter: (p) => orNA(p.securityRequirements) },
    ],
  },
  {
    id: "permitted-use",
    title: "Permitted Use",
    rows: [
      { label: "Permitted Use Summary", accessor: (p) => p.permittedUseSummary, formatter: (p) => p.permittedUseSummary, important: true },
      { label: "Permitted Uses", accessor: (p) => p.permittedUses || [], formatter: (p) => (p.permittedUses || []).join("; ") },
      { label: "Prohibited Uses", accessor: (p) => p.prohibitedUses || [], formatter: (p) => (p.prohibitedUses || []).join("; ") },
      { label: "Retention Guidance", accessor: (p) => p.retentionGuidance || "", formatter: (p) => orNA(p.retentionGuidance) },
      { label: "Sharing Restrictions", accessor: (p) => p.sharingRestrictions || "", formatter: (p) => orNA(p.sharingRestrictions) },
      { label: "Re-identification Prohibited", accessor: (p) => p.restrictionSummary, formatter: (p) => p.restrictionSummary?.includes("re-identif") || p.restrictionSummary?.includes("Re-identif") ? "Prohibited" : "Review restrictions" },
    ],
  },
  {
    id: "pricing",
    title: "Pricing and Licence",
    rows: [
      { label: "Price", accessor: (p) => p.priceDisplay, formatter: (p) => p.priceDisplay, important: true },
      { label: "Pricing Model", accessor: (p) => p.pricingModel, formatter: (p) => p.pricingModel },
      { label: "Billing Frequency", accessor: (p) => p.billingFrequency || "", formatter: (p) => orNA(p.billingFrequency) },
      { label: "Licence Type", accessor: (p) => p.licenceType || "", formatter: (p) => orNA(p.licenceType) },
      { label: "Minimum Term", accessor: (p) => p.minimumTerm || "", formatter: (p) => orNA(p.minimumTerm) },
      { label: "Included Usage", accessor: (p) => p.usageAllowanceDisplay || "", formatter: (p) => orNA(p.usageAllowanceDisplay) },
      { label: "Overage", accessor: (p) => p.overageDisplay || "", formatter: (p) => orNA(p.overageDisplay) },
    ],
  },
  {
    id: "supplier",
    title: "Supplier",
    rows: [
      { label: "Supplier Name", accessor: (p) => p.supplier, formatter: (p) => p.supplier, important: true },
      { label: "Supplier Status", accessor: (p) => p.supplierStatus, formatter: (p) => p.supplierStatus },
      { label: "Supplier Description", accessor: (p) => p.supplierDescription || "", formatter: (p) => orNA(p.supplierDescription) },
      { label: "Joined Date", accessor: (p) => p.supplierJoinedDate || "", formatter: (p) => fmtDate(p.supplierJoinedDate || "") },
      { label: "Support Level", accessor: (p) => p.supportLevel || "", formatter: (p) => orNA(p.supportLevel) },
      { label: "Provenance Review Status", accessor: (p) => p.provenanceStatus, formatter: (p) => p.provenanceStatus },
    ],
  },
];

// ── NEUTRAL OBSERVATIONS ───────────────────────────────────

interface Observation {
  text: string;
  matches: number;
  total: number;
  packageNames: string[];
}

export function getComparisonObservations(packages: MarketplacePackage[]): Observation[] {
  if (packages.length < 2) return [];
  const obs: Observation[] = [];

  function addObs(text: string, matchingPackages: MarketplacePackage[]) {
    obs.push({
      text,
      matches: matchingPackages.length,
      total: packages.length,
      packageNames: matchingPackages.map((p) => p.name),
    });
  }

  // UK coverage
  const ukPkgs = packages.filter((p) => p.geographicCoverage === "United Kingdom");
  if (ukPkgs.length > 0 && ukPkgs.length < packages.length) {
    addObs(`${ukPkgs.length} of ${packages.length} packages cover the United Kingdom`, ukPkgs);
  } else if (ukPkgs.length === packages.length) {
    addObs("All selected packages cover the United Kingdom", ukPkgs);
  }

  // API delivery
  const apiPkgs = packages.filter((p) => p.deliveryFormats.includes("API"));
  if (apiPkgs.length > 0) {
    addObs(`${apiPkgs.length} of ${packages.length} packages offer API delivery`, apiPkgs);
  }

  // Compliance review required
  const compliancePkgs = packages.filter((p) =>
    ["Compliance Review", "Supplier Approval", "Enterprise Agreement"].includes(p.accessLevel)
  );
  if (compliancePkgs.length > 0) {
    addObs(`${compliancePkgs.length} of ${packages.length} packages require compliance review`, compliancePkgs);
  }

  // Subscription pricing
  const subPkgs = packages.filter((p) => p.pricingModel === "Subscription");
  if (subPkgs.length > 0) {
    addObs(`${subPkgs.length} of ${packages.length} packages use subscription pricing`, subPkgs);
  }

  // Per-request pricing
  const perReqPkgs = packages.filter((p) => p.pricingModel === "Per Request");
  if (perReqPkgs.length > 0) {
    addObs(`${perReqPkgs.length} of ${packages.length} packages use per-request pricing`, perReqPkgs);
  }

  // Sample available
  const samplePkgs = packages.filter((p) => p.sampleAvailable);
  if (samplePkgs.length > 0) {
    addObs(`${samplePkgs.length} of ${packages.length} packages provide samples`, samplePkgs);
  }

  // Full provenance
  const fullProvPkgs = packages.filter((p) => p.provenanceStatus === "Full");
  if (fullProvPkgs.length > 0) {
    addObs(`${fullProvPkgs.length} of ${packages.length} packages declare full provenance`, fullProvPkgs);
  }

  // Real-time refresh
  const realtimePkgs = packages.filter((p) => p.refreshFrequency === "Real Time");
  if (realtimePkgs.length > 0) {
    addObs(`${realtimePkgs.length} of ${packages.length} packages refresh in real time`, realtimePkgs);
  }

  // Open catalogue
  const openPkgs = packages.filter((p) => p.accessLevel === "Open Catalogue");
  if (openPkgs.length > 0) {
    addObs(`${openPkgs.length} of ${packages.length} packages are available to open catalogue`, openPkgs);
  }

  return obs;
}

// ── URL UTILS ──────────────────────────────────────────────

export function buildCompareUrl(slugs: string[]): string {
  if (slugs.length === 0) return "/marketplace/compare";
  return `/marketplace/compare?packages=${slugs.join(",")}`;
}

export function parseCompareSlugs(searchParams: URLSearchParams): string[] {
  const raw = searchParams.get("packages");
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}