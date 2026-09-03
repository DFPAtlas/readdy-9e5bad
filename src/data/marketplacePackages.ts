export type PackageCategory =
  | "Identity and Contact Intelligence"
  | "Business and Public Records"
  | "Demographic Intelligence"
  | "Consumer and Purchasing Signals"
  | "Financial and Risk Intelligence"
  | "Location Intelligence"
  | "Market Research"
  | "Audience Intelligence"
  | "Inferred and Predictive Intelligence"
  | "Verification Products"
  | "Aggregated Reports"
  | "APIs and Data Feeds";

export type DeliveryFormat =
  | "API"
  | "CSV"
  | "JSON"
  | "Secure Download"
  | "Scheduled Feed"
  | "Dashboard"
  | "Report"
  | "Clean-room Analysis";

export type GeographicCoverage =
  | "United Kingdom"
  | "England"
  | "Scotland"
  | "Wales"
  | "Northern Ireland"
  | "Europe"
  | "Global"
  | "Regional or Local";

export type RefreshFrequency =
  | "Real Time"
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Quarterly"
  | "Annual"
  | "One-off Study";

export type AccessLevel =
  | "Open Catalogue"
  | "Verified Buyer"
  | "Compliance Review"
  | "Supplier Approval"
  | "Enterprise Agreement";

export type PricingModel =
  | "Subscription"
  | "Per Request"
  | "Per Record"
  | "Package Licence"
  | "Usage Based"
  | "Project Based"
  | "Contact Sales";

export type SupplierStatus =
  | "Verified Supplier"
  | "Provenance Reviewed"
  | "New Supplier"
  | "Demonstration Supplier";

export type SensitivityClassification =
  | "General Business"
  | "Aggregated"
  | "Location"
  | "Derived Signal"
  | "Restricted";

export interface DataField {
  fieldName: string;
  type: string;
  description: string;
  example: string;
  required: boolean;
  sensitivity: SensitivityClassification;
}

export interface QualityCheck {
  name: string;
  score: number;
  description: string;
}

export interface ProvenanceDetails {
  sourceTypes: string[];
  collectionMethod: string;
  transformationSummary: string;
  reviewStatus: string;
  reviewDate: string;
  limitations: string;
}

export interface VersionHistoryEntry {
  version: string;
  releaseDate: string;
  changeSummary: string;
  schemaImpact: "None" | "Minor" | "Moderate" | "Major";
  status: "Current" | "Previous" | "Superseded";
}

export interface DeliveryMethodDetail {
  method: DeliveryFormat;
  suitableUse: string;
  updateBehaviour: string;
  authExpectation: string;
  deliveryFrequency: string;
  format: string;
  supportLevel: string;
}

export interface MarketplacePackage {
  id: string;
  slug: string;
  name: string;
  supplier: string;
  supplierStatus: SupplierStatus;
  isDemo: boolean;
  shortDescription: string;
  longDescription: string;
  fullDescription: string;
  overviewPoints: string[];
  intendedUsers: string;
  exampleApplications: string[];
  whatItDoesNotProvide: string;
  category: PackageCategory;
  tags: string[];
  geographicCoverage: GeographicCoverage;
  refreshFrequency: RefreshFrequency;
  deliveryFormats: DeliveryFormat[];
  accessLevel: AccessLevel;
  pricingModel: PricingModel;
  priceDisplay: string;
  provenanceStatus: "Full" | "Partial" | "Reviewed" | "Self-declared";
  updatedAt: string;
  createdAt: string;
  featured: boolean;
  viewCountDemo: number;
  permittedUseSummary: string;
  restrictionSummary: string;
  sampleAvailable: boolean;
  schemaAvailable: boolean;
  dataFields: DataField[];
  recordCoverage: string;
  coverageNotes: string;
  historicalDepth: string;
  qualityChecks: QualityCheck[];
  sourceTypes: string[];
  collectionMethodSummary: string;
  provenanceDetails: ProvenanceDetails;
  permittedUses: string[];
  prohibitedUses: string[];
  retentionGuidance: string;
  sharingRestrictions: string;
  securityRequirements: string;
  licenceType: string;
  minimumTerm: string;
  billingFrequency: string;
  usageAllowanceDisplay: string;
  overageDisplay: string;
  sampleSchema: DataField[];
  sampleResponse: Record<string, unknown>[];
  version: string;
  versionHistory: VersionHistoryEntry[];
  supportLevel: string;
  onboardingTimeDisplay: string;
  supplierDescription: string;
  supplierJoinedDate: string;
  relatedPackageSlugs: string[];
  deliveryMethodDetails: DeliveryMethodDetail[];
}

export const marketplacePackages: MarketplacePackage[] = [
  {
    id: "pkg-001",
    slug: "uk-business-registry-enrichment-api",
    name: "UK Business Registry Enrichment API",
    supplier: "Axiom Registry Intelligence",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "Enrich UK company records with structured registry data, filing history, officer appointments, SIC classifications and registered-address verification through a single API endpoint.",
    longDescription:
      "The UK Business Registry Enrichment API provides programmatic access to consolidated Companies House filings, officer appointments, persons-with-significant-control records, SIC code classifications and registered-address verification for over five million active UK companies. Designed for compliance, customer due diligence and business-verification workflows, this package returns structured JSON responses with full provenance annotations. Each record includes the source filing date, registry document reference and a confidence indicator based on recency and completeness of the underlying filing. The API supports batch lookups of up to 1,000 company numbers per request and includes a webhook-notification service for newly filed changes on monitored entities.",
    category: "Business and Public Records",
    tags: ["Companies House", "Due Diligence", "KYC", "Business Verification", "Registry"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Daily",
    deliveryFormats: ["API", "JSON"],
    accessLevel: "Verified Buyer",
    pricingModel: "Per Request",
    priceDisplay: "From £0.04 per lookup",
    provenanceStatus: "Full",
    updatedAt: "2026-07-14",
    createdAt: "2025-09-03",
    featured: true,
    viewCountDemo: 1847,
    permittedUseSummary:
      "Permitted for business verification, customer due diligence, anti-money-laundering checks and credit-risk assessment by organisations holding a valid UK regulatory requirement or legitimate interest.",
    restrictionSummary:
      "Not permitted for unsolicited direct marketing, consumer profiling without a recognised lawful basis, or resale as a standalone consumer-identity product.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-002",
    slug: "regional-retail-footfall-index",
    name: "Regional Retail Footfall Index",
    supplier: "PlaceMetrics Labs",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "Aggregated regional footfall and venue-visit trends derived from anonymised mobile location signals, presented as indexed time series for market planning and site selection.",
    longDescription:
      "The Regional Retail Footfall Index delivers anonymised, aggregated footfall estimates for over 1,200 UK retail centres, high streets and retail parks. Built from privacy-safe mobile location signals that are aggregated to a minimum statistical threshold, the index provides weekly trend data with year-on-year comparisons, seasonal adjustment and sector-level breakdowns covering fashion, grocery, food service, leisure and comparison goods. Each index point is accompanied by a confidence band and a minimum sample-size disclosure. The package includes an interactive dashboard, a CSV download of the full time series and an API for embedding selected metrics into internal location-planning tools.",
    category: "Location Intelligence",
    tags: ["Footfall", "Retail", "Site Selection", "Catchment Analysis", "High Street"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Weekly",
    deliveryFormats: ["Dashboard", "CSV", "API"],
    accessLevel: "Verified Buyer",
    pricingModel: "Subscription",
    priceDisplay: "From £950 per month",
    provenanceStatus: "Reviewed",
    updatedAt: "2026-07-10",
    createdAt: "2025-11-18",
    featured: true,
    viewCountDemo: 1322,
    permittedUseSummary:
      "Permitted for market analysis, site-selection modelling, retail-network planning and aggregated trend reporting by verified commercial organisations.",
    restrictionSummary:
      "Not permitted for identifying or re-identifying individuals, tracking specific devices or combining with other datasets in a way that would enable singling-out of data subjects.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-003",
    slug: "sme-commercial-risk-signals",
    name: "SME Commercial Risk Signals",
    supplier: "Axiom Registry Intelligence",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "Structured risk indicators for UK SMEs combining registry filings, gazette notices, payment defaults and county-court judgments into a consolidated risk profile.",
    longDescription:
      "SME Commercial Risk Signals aggregates publicly available risk indicators from Companies House filings, the London and Edinburgh Gazettes, county-court judgment registers and insolvency-service records into a single structured profile per entity. Each signal is timestamped, sourced and weighted according to recency and materiality. The package covers dissolution warnings, proposal-to-strike-off notices, meeting-of-creditors filings, charge satisfactions, late-filing flags and significant balance-sheet changes where available. Designed for B2B credit teams, trade-credit insurers and procurement risk functions, the data is delivered as a daily-updated API feed with optional push notifications for monitored portfolios.",
    category: "Financial and Risk Intelligence",
    tags: ["Credit Risk", "SME", "Insolvency", "Trade Credit", "CCJ"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Daily",
    deliveryFormats: ["API", "CSV", "Scheduled Feed"],
    accessLevel: "Compliance Review",
    pricingModel: "Per Request",
    priceDisplay: "From £0.12 per profile",
    provenanceStatus: "Full",
    updatedAt: "2026-07-12",
    createdAt: "2025-10-22",
    featured: false,
    viewCountDemo: 987,
    permittedUseSummary:
      "Permitted for B2B credit-risk assessment, supplier onboarding, trade-credit insurance underwriting and procurement due diligence by organisations with a legitimate commercial interest.",
    restrictionSummary:
      "Not permitted for consumer credit scoring, individual director profiling unrelated to a legitimate business transaction or automated sole-trader decisions without human review.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-004",
    slug: "uk-planning-development-activity-feed",
    name: "UK Planning and Development Activity Feed",
    supplier: "LandSight Analytics",
    supplierStatus: "Provenance Reviewed",
    isDemo: true,
    shortDescription:
      "A national feed of planning applications, decisions, appeals and development activity across all UK local planning authorities, enriched with site-boundary geometry and application-stage tracking.",
    longDescription:
      "The UK Planning and Development Activity Feed consolidates planning-application data from over 400 local planning authorities across England, Scotland and Wales into a single standardised feed. Each record includes the application reference, proposal description, applicant name where published, decision status, application type, development category, site-boundary polygon geometry and key milestone dates. The feed is updated daily and includes change-detection logic that highlights material amendments, appeal lodgements and decision notices since the last refresh. Designed for property developers, land agents, infrastructure planners and market-analytics teams, the data supports site sourcing, pipeline tracking and competitive-landscape analysis.",
    category: "Location Intelligence",
    tags: ["Planning", "Property Development", "Land Use", "Local Authority", "GIS"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Daily",
    deliveryFormats: ["API", "CSV", "Scheduled Feed"],
    accessLevel: "Verified Buyer",
    pricingModel: "Subscription",
    priceDisplay: "From £650 per month",
    provenanceStatus: "Reviewed",
    updatedAt: "2026-07-15",
    createdAt: "2026-01-14",
    featured: true,
    viewCountDemo: 756,
    permittedUseSummary:
      "Permitted for property-market analysis, development-pipeline tracking, land-sourcing research and infrastructure planning by commercial organisations and public-sector bodies.",
    restrictionSummary:
      "Not permitted for direct marketing to individual applicants, public-facing publication of unredacted applicant personal data or use as a standalone consumer-profiling dataset.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-005",
    slug: "consumer-lifestyle-audience-segments",
    name: "Consumer Lifestyle Audience Segments",
    supplier: "Clarus Consumer Analytics",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "Pre-built consumer lifestyle and interest segments derived from aggregated survey data, purchase-panel inputs and modelled household characteristics for responsible campaign planning.",
    longDescription:
      "Consumer Lifestyle Audience Segments provides over 80 pre-built audience segments across lifestyle, interest, lifestage and value categories. Built from nationally representative survey panels, anonymised purchase-panel data and modelled household-level characteristics, each segment includes estimated UK reach, a demographic profile summary, suggested category affinities and a confidence score. Segments are designed for responsible campaign planning, media-buying strategy and market-sizing exercises and are delivered through a self-service audience-planning dashboard with CSV export and API access for programmatic activation. All underlying personal data has been removed; segments represent statistical aggregates only.",
    category: "Audience Intelligence",
    tags: ["Audience Planning", "Consumer Segments", "Campaign", "Demographics", "Lifestyle"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Quarterly",
    deliveryFormats: ["Dashboard", "API", "CSV"],
    accessLevel: "Verified Buyer",
    pricingModel: "Subscription",
    priceDisplay: "From £1,200 per month",
    provenanceStatus: "Reviewed",
    updatedAt: "2026-06-28",
    createdAt: "2025-08-11",
    featured: false,
    viewCountDemo: 1145,
    permittedUseSummary:
      "Permitted for campaign planning, media-strategy development, market-sizing analysis and aggregated consumer-trend reporting by verified organisations holding a legitimate commercial interest.",
    restrictionSummary:
      "Not permitted for individual-level targeting without a valid lawful basis, sensitive-category profiling or combining with personal data in a way that enables re-identification of survey respondents.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-006",
    slug: "local-area-demographic-trends",
    name: "Local Area Demographic Trends",
    supplier: "CensusPlus Analytics",
    supplierStatus: "Provenance Reviewed",
    isDemo: true,
    shortDescription:
      "Census-aligned demographic estimates and projections for UK output areas, wards and local authorities, covering population, households, age structure, tenure and socio-economic classification.",
    longDescription:
      "Local Area Demographic Trends provides mid-year population estimates, household projections and socio-demographic breakdowns at output-area, ward and local-authority level across the UK. Drawing on ONS, NRS and NISRA official statistics supplemented by modelled small-area estimates between census years, the dataset covers population by five-year age band, household composition, housing tenure, economic-activity status, NS-SEC classification and occupancy rating. Data is delivered as a quarterly-refreshed CSV package with accompanying metadata, confidence intervals where modelled and a geospatial lookup enabling integration with GIS and location-planning tools. Designed for public-sector service planning, retail-network strategy and social-research organisations.",
    category: "Demographic Intelligence",
    tags: ["Demographics", "Census", "Population", "Local Authority", "GIS"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Quarterly",
    deliveryFormats: ["CSV", "Secure Download"],
    accessLevel: "Open Catalogue",
    pricingModel: "Package Licence",
    priceDisplay: "From £480 per dataset",
    provenanceStatus: "Full",
    updatedAt: "2026-07-01",
    createdAt: "2025-06-15",
    featured: false,
    viewCountDemo: 634,
    permittedUseSummary:
      "Permitted for service planning, academic research, market analysis, public-policy development and commercial location-strategy work by any organisation or individual.",
    restrictionSummary:
      "Data is provided at small-area aggregate level only. Not suitable for individual-level identification. Users must comply with ONS secondary-use terms where applicable.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-007",
    slug: "hospitality-location-opportunity-report",
    name: "Hospitality Location Opportunity Report",
    supplier: "PlaceMetrics Labs",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "A data-rich location-opportunity report for hospitality operators combining footfall, competitor density, catchment demographics, transport accessibility and commercial-property availability.",
    longDescription:
      "The Hospitality Location Opportunity Report is a bespoke research product that combines multiple data layers into a single actionable location-assessment document. For a defined search area, the report compiles and analyses: anonymised footfall volumes by daypart and day-of-week, existing competitor density by cuisine or service type, catchment-area demographic profiles, public-transport accessibility scores, nearby commercial-property listings and average rateable values, and a composite opportunity score with supporting commentary. Reports are produced on demand by the PlaceMetrics analytics team with a typical turnaround of five working days and include a one-hour consultant briefing call. Designed for restaurant groups, hotel developers, pub companies and leisure operators evaluating new locations.",
    category: "Market Research",
    tags: ["Hospitality", "Site Selection", "Footfall", "Catchment", "Competitor Analysis"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "One-off Study",
    deliveryFormats: ["Report", "Secure Download"],
    accessLevel: "Verified Buyer",
    pricingModel: "Project Based",
    priceDisplay: "From £1,850 per report",
    provenanceStatus: "Reviewed",
    updatedAt: "2026-07-08",
    createdAt: "2026-02-20",
    featured: false,
    viewCountDemo: 421,
    permittedUseSummary:
      "Permitted for internal location-assessment, investment-committee review and commercial property-negotiation support by the purchasing organisation.",
    restrictionSummary:
      "Report is licensed to a single legal entity. Redistribution, publication or use by affiliated entities without an extended licence is not permitted.",
    sampleAvailable: false,
    schemaAvailable: false,
  },
  {
    id: "pkg-008",
    slug: "b2b-company-technology-signals",
    name: "B2B Company Technology Signals",
    supplier: "TechGraph Intelligence",
    supplierStatus: "Provenance Reviewed",
    isDemo: true,
    shortDescription:
      "Inferred technology-adoption signals for UK businesses based on public web presence, job listings, security-certificate data and technology-partner announcements.",
    longDescription:
      "B2B Company Technology Signals builds inferred technology-stack profiles for over 800,000 UK businesses by analysing publicly available web-presence data, active job listings referencing specific technologies or platforms, SSL-certificate issuer chains, DNS record patterns, technology-partner press releases and case studies. Each signal includes the technology category, the specific product or platform detected, a confidence score, the date of the most-recent supporting evidence and the evidence type. The package is designed for B2B marketing, account-based sales intelligence, technology-channel partner identification and competitive-landscape analysis. Data is delivered as a monthly-refreshed CSV export with an optional API for CRM and marketing-automation integration.",
    category: "Inferred and Predictive Intelligence",
    tags: ["Technographics", "B2B", "Sales Intelligence", "Technology Stack", "ABM"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Monthly",
    deliveryFormats: ["CSV", "API"],
    accessLevel: "Verified Buyer",
    pricingModel: "Subscription",
    priceDisplay: "From £780 per month",
    provenanceStatus: "Self-declared",
    updatedAt: "2026-07-05",
    createdAt: "2025-12-01",
    featured: false,
    viewCountDemo: 892,
    permittedUseSummary:
      "Permitted for B2B marketing, sales-prospecting, partner-ecosystem mapping and competitive analysis by verified commercial organisations.",
    restrictionSummary:
      "Signals are inferred from public sources and must not be presented as verified fact without independent confirmation. Not permitted for individual-person profiling or consumer-credit assessment.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-009",
    slug: "address-validation-premises-classification-api",
    name: "Address Validation and Premises Classification API",
    supplier: "GeoRef Data Services",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "Real-time UK address validation against multiple authoritative sources with premises-type classification, geocoding, UPRN matching and deliverability scoring.",
    longDescription:
      "The Address Validation and Premises Classification API validates and enriches UK address records against Ordnance Survey AddressBase, Royal Mail PAF, the Valuation Office Agency rating list and local-authority street gazetteers. For each validated address, the API returns the Unique Property Reference Number, a premises-type classification including sub-type, full geocoding at coordinate and what3words resolution, a deliverability score based on Royal Mail DQI indicators, council-tax band or rateable value where available and a match-confidence indicator. Batch validation supports up to 10,000 addresses per request. Designed for insurance underwriting, logistics planning, retail network analysis and customer-data quality management.",
    category: "Verification Products",
    tags: ["Address Validation", "Geocoding", "UPRN", "Premises Classification", "PAF"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Monthly",
    deliveryFormats: ["API", "JSON"],
    accessLevel: "Verified Buyer",
    pricingModel: "Per Request",
    priceDisplay: "From £0.02 per address",
    provenanceStatus: "Full",
    updatedAt: "2026-07-11",
    createdAt: "2025-07-22",
    featured: true,
    viewCountDemo: 1567,
    permittedUseSummary:
      "Permitted for address validation, data-quality improvement, geocoding, insurance risk-location assessment and logistics planning by verified organisations.",
    restrictionSummary:
      "Not permitted for building consumer profiles from address-level attributes without a recognised lawful basis or for resale as a standalone consumer-address enrichment file.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-010",
    slug: "uk-high-street-vacancy-intelligence",
    name: "UK High Street Vacancy Intelligence",
    supplier: "PlaceMetrics Labs",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "A tracked dataset of high-street and retail-centre vacancy rates, churn indicators and commercial-property availability across UK town centres, updated quarterly.",
    longDescription:
      "UK High Street Vacancy Intelligence tracks commercial-property occupancy and vacancy across over 700 UK town centres and high streets. Combining local-authority business-rates data, commercial-property listings, observed street-level surveys and planning-application change-of-use data, the dataset provides quarterly vacancy rates by centre, sector-mix analysis, average void duration, new-occupier entry rates and a composite high-street vitality score. Each metric includes a year-on-year comparison and a regional-benchmark position. Delivered as an interactive dashboard with CSV export and a quarterly summary report, the package is designed for local authorities, BIDs, property investors, retail strategy teams and placemaking consultants.",
    category: "Location Intelligence",
    tags: ["High Street", "Vacancy", "Retail", "Town Centre", "Property"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Quarterly",
    deliveryFormats: ["Dashboard", "CSV", "Report"],
    accessLevel: "Open Catalogue",
    pricingModel: "Subscription",
    priceDisplay: "From £420 per quarter",
    provenanceStatus: "Reviewed",
    updatedAt: "2026-07-02",
    createdAt: "2025-11-05",
    featured: false,
    viewCountDemo: 543,
    permittedUseSummary:
      "Permitted for placemaking analysis, property-investment research, local-authority planning evidence and retail-strategy development.",
    restrictionSummary:
      "Not permitted for use as the sole evidence base in compulsory-purchase-order proceedings without supplementary independent survey verification.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-011",
    slug: "market-sentiment-research-dashboard",
    name: "Market Sentiment Research Dashboard",
    supplier: "Clarus Consumer Analytics",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "A continuous consumer-sentiment tracking dashboard covering economic confidence, purchase intentions, category sentiment and brand perception across UK consumer panels.",
    longDescription:
      "The Market Sentiment Research Dashboard provides continuous tracking of UK consumer sentiment through a nationally representative online panel of 5,000 respondents surveyed weekly. The dashboard covers headline economic-confidence indices, major-purchase intention scores by category, brand-perception net-promoter metrics for over 200 tracked brands, topical sentiment modules that can be commissioned on demand and demographic cross-tabulations for all tracked metrics. Data is refreshed weekly and presented through an interactive dashboard with trend visualisation, statistical-significance flags and the ability to download underlying aggregated data as CSV. Designed for brand teams, market-research functions, investor-relations teams and corporate-strategy groups.",
    category: "Market Research",
    tags: ["Sentiment", "Consumer Confidence", "Brand Tracking", "Survey", "Panel"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Weekly",
    deliveryFormats: ["Dashboard", "CSV"],
    accessLevel: "Verified Buyer",
    pricingModel: "Subscription",
    priceDisplay: "From £1,500 per month",
    provenanceStatus: "Reviewed",
    updatedAt: "2026-07-13",
    createdAt: "2026-03-10",
    featured: false,
    viewCountDemo: 678,
    permittedUseSummary:
      "Permitted for brand tracking, market-research analysis, investor-relations communications and corporate-strategy development by verified organisations.",
    restrictionSummary:
      "Underlying individual survey responses are not included. Dashboard data is aggregated to a minimum cell size of 50 respondents. Not permitted for individual-level targeting.",
    sampleAvailable: false,
    schemaAvailable: true,
  },
  {
    id: "pkg-012",
    slug: "transport-accessibility-catchment-dataset",
    name: "Transport Accessibility and Catchment Dataset",
    supplier: "GeoRef Data Services",
    supplierStatus: "Provenance Reviewed",
    isDemo: true,
    shortDescription:
      "Multimodal transport-accessibility scores and drive-time catchments for every UK postcode, covering public transport, cycling, walking and private-vehicle travel-time isochrones.",
    longDescription:
      "The Transport Accessibility and Catchment Dataset computes multimodal accessibility scores and travel-time catchments for every UK postcode. Using DfT-sourced public-transport timetable data, Ordnance Survey road-network and path-network geometry and ONS workplace-zone statistics, the dataset provides: public-transport travel-time isochrones at 15-, 30-, 45- and 60-minute intervals, drive-time catchments for peak and off-peak periods, cycling and walking accessibility scores, a composite Public Transport Accessibility Level modelled from DfT guidance and population-within-catchment estimates derived from the latest mid-year population estimates. Delivered as a one-off CSV or GeoJSON export with accompanying metadata, the dataset is designed for site-selection analysis, service-planning exercises, transport-modelling projects and environmental-impact assessments.",
    category: "Location Intelligence",
    tags: ["Transport", "Accessibility", "Catchment", "PTAL", "GIS"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Annual",
    deliveryFormats: ["CSV", "Secure Download"],
    accessLevel: "Open Catalogue",
    pricingModel: "Package Licence",
    priceDisplay: "From £720 per dataset",
    provenanceStatus: "Full",
    updatedAt: "2026-06-20",
    createdAt: "2025-10-08",
    featured: false,
    viewCountDemo: 389,
    permittedUseSummary:
      "Permitted for site-selection modelling, service-accessibility analysis, transport-impact assessments and academic research by any organisation or individual.",
    restrictionSummary:
      "Travel-time calculations are modelled estimates and may not reflect real-world conditions on any specific day. Not suitable for emergency-service response-time planning without local validation.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
  {
    id: "pkg-013",
    slug: "consumer-identity-verification-signals",
    name: "Consumer Identity Verification Signals",
    supplier: "TrustCheck Data Services",
    supplierStatus: "Verified Supplier",
    isDemo: true,
    shortDescription:
      "Multi-source identity-verification signals for UK consumers combining electoral-register matching, mortality screening, address-link verification and known-fraud-flag checking.",
    longDescription:
      "Consumer Identity Verification Signals provides a structured, multi-source identity-verification service designed for regulated customer-onboarding, fraud-prevention and identity-assurance workflows. For each submitted identity, the service checks against the full electoral register, the General Register Office mortality database, the Royal Mail redirection file, known-fraud and impersonation-flag registers, and telephone-number-to-address matching where subscriber consent permits. Each verification returns a pass-or-refer result for each check, a composite identity-assurance score, the date range of electoral-register matches, mortality-screening status and an overall recommendation with supporting evidence references. The package is delivered as a real-time API designed for integration into customer-onboarding platforms, with a maximum response time of 500 milliseconds under normal load.",
    category: "Verification Products",
    tags: ["Identity Verification", "Fraud Prevention", "KYC", "Electoral Register", "Onboarding"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Real Time",
    deliveryFormats: ["API"],
    accessLevel: "Compliance Review",
    pricingModel: "Per Request",
    priceDisplay: "From £0.18 per check",
    provenanceStatus: "Full",
    updatedAt: "2026-07-16",
    createdAt: "2026-04-02",
    featured: false,
    viewCountDemo: 1103,
    permittedUseSummary:
      "Permitted for regulated customer due diligence, fraud-prevention screening and identity-assurance purposes by organisations holding a valid legal basis under UK GDPR and AML regulations.",
    restrictionSummary:
      "Requires documented lawful basis per verification. Not permitted for speculative background checking, employment screening without candidate consent or consumer-profiling unrelated to a specific transaction.",
    sampleAvailable: false,
    schemaAvailable: true,
  },
  {
    id: "pkg-014",
    slug: "uk-property-transaction-intelligence",
    name: "UK Property Transaction Intelligence",
    supplier: "LandSight Analytics",
    supplierStatus: "Provenance Reviewed",
    isDemo: true,
    shortDescription:
      "HM Land Registry and Registers of Scotland price-paid data enriched with property attributes, market-segment classification and local-market trend analysis.",
    longDescription:
      "UK Property Transaction Intelligence enriches HM Land Registry and Registers of Scotland price-paid data with property attributes derived from Energy Performance Certificates, council-tax banding, VOA rating assessments and Ordnance Survey building-geometry data. Each transaction record includes the sale price, date of transfer, property type, tenure, new-build flag, floor area where available from EPC data, EPC energy-efficiency rating, council-tax band, local-authority district, lower-super-output-area code and a market-segment classification. Quarterly local-market trend summaries are included as a companion dataset. Delivered as a monthly-refreshed CSV export with a companion API for on-demand property-level lookups, the package is designed for property-market analysts, lenders, surveyors and investment-research teams.",
    category: "Business and Public Records",
    tags: ["Property", "Land Registry", "Price Paid", "Housing Market", "EPC"],
    geographicCoverage: "United Kingdom",
    refreshFrequency: "Monthly",
    deliveryFormats: ["CSV", "API", "Secure Download"],
    accessLevel: "Verified Buyer",
    pricingModel: "Subscription",
    priceDisplay: "From £520 per month",
    provenanceStatus: "Full",
    updatedAt: "2026-07-07",
    createdAt: "2025-12-15",
    featured: false,
    viewCountDemo: 812,
    permittedUseSummary:
      "Permitted for property-market analysis, automated valuation modelling, lending-risk assessment and investment research by verified commercial organisations.",
    restrictionSummary:
      "Transaction data reflects sold price only and must not be presented as current market value without appropriate adjustment and disclaimer. Not permitted for direct marketing to named property owners.",
    sampleAvailable: true,
    schemaAvailable: true,
  },
];

export const packageCategories: PackageCategory[] = [
  "Identity and Contact Intelligence",
  "Business and Public Records",
  "Demographic Intelligence",
  "Consumer and Purchasing Signals",
  "Financial and Risk Intelligence",
  "Location Intelligence",
  "Market Research",
  "Audience Intelligence",
  "Inferred and Predictive Intelligence",
  "Verification Products",
  "Aggregated Reports",
  "APIs and Data Feeds",
];

export const deliveryFormats: DeliveryFormat[] = [
  "API",
  "CSV",
  "JSON",
  "Secure Download",
  "Scheduled Feed",
  "Dashboard",
  "Report",
  "Clean-room Analysis",
];

export const geographicCoverages: GeographicCoverage[] = [
  "United Kingdom",
  "England",
  "Scotland",
  "Wales",
  "Northern Ireland",
  "Europe",
  "Global",
  "Regional or Local",
];

export const refreshFrequencies: RefreshFrequency[] = [
  "Real Time",
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Annual",
  "One-off Study",
];

export const accessLevels: AccessLevel[] = [
  "Open Catalogue",
  "Verified Buyer",
  "Compliance Review",
  "Supplier Approval",
  "Enterprise Agreement",
];

export const pricingModels: PricingModel[] = [
  "Subscription",
  "Per Request",
  "Per Record",
  "Package Licence",
  "Usage Based",
  "Project Based",
  "Contact Sales",
];

export const supplierStatuses: SupplierStatus[] = [
  "Verified Supplier",
  "Provenance Reviewed",
  "New Supplier",
  "Demonstration Supplier",
];