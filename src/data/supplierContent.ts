export interface SupplierProductType {
  id: string;
  name: string;
  description: string;
  typicalFormat: string;
  possibleBuyerUse: string;
  updateModel: string;
  evidenceRequired: string;
  accessControlExpectation: string;
}

export interface SupplierBenefit {
  title: string;
  description: string;
  status: "Available" | "Planned";
}

export interface SupplierRequirement {
  title: string;
  description: string;
}

export interface SupplierProcessStep {
  step: number;
  title: string;
  description: string;
  whoIsResponsible: string;
  possibleOutcomes: string[];
  limitation: string;
}

export interface SupplierCommercialModel {
  id: string;
  name: string;
  description: string;
  whenItFits: string;
  billingBasis: string;
  supplierResponsibility: string;
  buyerExpectation: string;
  contactSalesRequired: boolean;
}

export interface SupplierDeliveryOption {
  id: string;
  name: string;
  description: string;
  updateFrequency: string;
  secureTransfer: string;
  schemaDocumentation: string;
  versioning: string;
  usageTracking: string;
  linkRoute: string | null;
}

export interface SupplierFaq {
  question: string;
  answer: string;
}

export interface SupplierPreviewCard {
  title: string;
  description: string;
  icon: string;
}

export interface SupplierChecklistItem {
  label: string;
}

export interface PackageGuidelineSection {
  id: string;
  title: string;
  anchor: string;
  description: string;
  goodExample: string;
  poorExample: string;
  whyPoorIsBad: string;
}

export interface SupplierProcessOutcome {
  title: string;
  description: string;
}

export const supplierBenefits: SupplierBenefit[] = [
  {
    title: "Verified organisational buyers",
    description: "Every buyer is verified as a genuine organisation with a declared business purpose. You are not selling to anonymous consumers or unverifiable entities — you are engaging with organisations that have been reviewed.",
    status: "Available",
  },
  {
    title: "Structured marketplace listings",
    description: "Present your data products using a consistent, detailed structure. Buyers see provenance, coverage, quality, delivery, pricing, permitted uses and restrictions — all in one place. This reduces repetitive buyer questions and sets clear expectations.",
    status: "Available",
  },
  {
    title: "Clear provenance and restrictions",
    description: "Document where your data comes from, how it has been handled and what buyers may and may not do with it. Transparent provenance builds buyer trust and supports the buyer's own compliance obligations.",
    status: "Available",
  },
  {
    title: "Controlled access, not open distribution",
    description: "You define the access level for each product — from verified-buyer access through to supplier-approval or enterprise-agreement requirements. DataHarbour adds a governance layer that helps ensure access is appropriate, not indiscriminate.",
    status: "Available",
  },
  {
    title: "Commercial flexibility",
    description: "Choose from subscription, usage-based, per-record, project or enterprise pricing models. Set your own commercial terms within the marketplace framework. DataHarbour does not dictate your pricing.",
    status: "Available",
  },
  {
    title: "Version management and update records",
    description: "Maintain versioned product listings so buyers can see what has changed. Update records support buyer confidence and demonstrate your commitment to product quality and transparency.",
    status: "Available",
  },
  {
    title: "Structured access enquiries",
    description: "Receive access requests that include the buyer's declared business purpose, organisation details and intended-use information. This helps you assess whether the request aligns with your product's permitted uses before you grant access.",
    status: "Planned",
  },
  {
    title: "Centralised licensing and reporting",
    description: "In later platform phases, suppliers will access dashboards for licence management, access tracking, usage reporting and commercial reconciliation. These tools are planned and will be built after the core marketplace is operational.",
    status: "Planned",
  },
];

export const suitableSupplierCards = [
  {
    title: "Established data providers",
    description: "Organisations with an existing data product, a track record of responsible data provision and the ability to document provenance, rights and quality controls.",
    suitable: true,
  },
  {
    title: "Research and insight companies",
    description: "Firms producing market research, consumer insight, industry analysis or trend intelligence that can be offered as governed data products to verified organisational buyers.",
    suitable: true,
  },
  {
    title: "Public-record intelligence specialists",
    description: "Companies that aggregate, clean and structure public-registry data — such as Companies House, Land Registry or Electoral Register records — into analysable, value-added products.",
    suitable: true,
  },
  {
    title: "Location and geospatial providers",
    description: "Organisations offering location-intelligence, geospatial or catchment-analysis products derived from legitimate data sources, with documented collection and refresh processes.",
    suitable: true,
  },
  {
    title: "Business verification providers",
    description: "Specialists in business identity, status, risk and verification data that help buyers validate organisations they are considering working with.",
    suitable: true,
  },
  {
    title: "Market research organisations",
    description: "Providers of survey data, panel data, consumer-trend data or market-sizing intelligence supported by documented methodology and sampling information.",
    suitable: true,
  },
  {
    title: "API and data-feed businesses",
    description: "Companies whose core product is a data API or scheduled data feed, delivering structured information that buyers integrate into their own systems or workflows.",
    suitable: true,
  },
  {
    title: "Industry intelligence publishers",
    description: "Publishers of industry benchmarks, performance data, sector reports and other intelligence products that support informed commercial decision-making.",
    suitable: true,
  },
  {
    title: "Aggregated audience and trend providers",
    description: "Organisations offering aggregated audience segments, behavioural-trend data or modelled intelligence that helps buyers understand markets without identifying individuals.",
    suitable: true,
  },
  {
    title: "Proprietary dataset licensors",
    description: "Organisations that hold unique, licensable proprietary datasets and are willing to document their provenance, rights and limitations for the marketplace.",
    suitable: true,
  },
];

export const notSuitableItems = [
  "Unverified scraped personal information collected without consent or transparent notice.",
  "Stolen, leaked or unlawfully obtained data from any source.",
  "Uncontrolled people-search databases that enable searching for or profiling specific individuals without a lawful purpose.",
  "Products where the supplier cannot clearly demonstrate the legal and contractual right to offer the data.",
  "Data offered for purposes of harassment, discrimination, stalking or unlawful surveillance.",
  "Products that rely on deceptive collection methods, hidden tracking or misleading consent mechanisms.",
  "Data that cannot be meaningfully described, maintained or supported with documentation.",
  "Products designed or packaged to bypass legal, regulatory or contractual data-use restrictions.",
];

export const acceptedProductTypes: SupplierProductType[] = [
  {
    id: "api",
    name: "APIs",
    description: "Programmatic data-access endpoints that allow buyers to query, retrieve or integrate data into their own systems in real time or on demand.",
    typicalFormat: "REST or GraphQL APIs with JSON or XML responses. Typically authenticated via API keys or OAuth tokens.",
    possibleBuyerUse: "Integration into internal dashboards, CRMs, risk engines, verification workflows or analytical tools.",
    updateModel: "Real-time or near-real-time refresh from underlying data sources. Updates reflected in API responses as source data changes.",
    evidenceRequired: "API documentation, authentication model, rate-limit policy, uptime and error-handling information, schema reference.",
    accessControlExpectation: "API-key access with usage monitoring. Higher-sensitivity data may require additional verification or compliance review.",
  },
  {
    id: "feed",
    name: "Scheduled feeds",
    description: "Data delivered on a regular schedule — daily, weekly, monthly — through secure file transfer, cloud-storage delivery or automated download links.",
    typicalFormat: "CSV, JSON, Parquet or other structured formats delivered via SFTP, secure download links or cloud-storage integration.",
    possibleBuyerUse: "Regular updates to internal databases, analytical models, reporting pipelines or enrichment workflows.",
    updateModel: "Scheduled batch delivery. Refresh frequency defined by supplier — typically daily, weekly or monthly.",
    evidenceRequired: "Schema documentation, sample file, delivery schedule, secure-transfer mechanism, file-integrity verification approach.",
    accessControlExpectation: "Authenticated download with time-limited links. File-level access tied to licence terms and buyer identity.",
  },
  {
    id: "download",
    name: "Secure downloadable datasets",
    description: "Complete or filtered datasets available for authenticated download, typically for periodic use rather than continuous streaming.",
    typicalFormat: "CSV, JSON, Excel or database-export formats packaged as compressed archives delivered through authenticated download.",
    possibleBuyerUse: "One-off or periodic analysis, model training, research projects or enrichment of internal datasets.",
    updateModel: "Periodic full or incremental updates. Supplier publishes new versions on a defined schedule.",
    evidenceRequired: "Complete schema, field-level definitions, record counts or coverage estimates, sample data, changelog or version history.",
    accessControlExpectation: "Download gated behind buyer verification and licence acceptance. Time-limited download links.",
  },
  {
    id: "report",
    name: "Research reports",
    description: "Structured reports, white papers or analytical outputs produced by research organisations, insight companies or industry analysts.",
    typicalFormat: "PDF reports with supplementary data tables in CSV or Excel. May include interactive dashboards or slide decks.",
    possibleBuyerUse: "Market understanding, strategic planning, investment decisions, board reporting or client advisory work.",
    updateModel: "Periodic publication — quarterly, bi-annual or annual. Ad hoc reports may be commissioned through bespoke arrangements.",
    evidenceRequired: "Methodology description, sample size, data-collection period, geographic scope, any modelling assumptions, author credentials.",
    accessControlExpectation: "Download or view access gated behind buyer verification. Reports may carry redistribution restrictions.",
  },
  {
    id: "market-intel",
    name: "Aggregated market intelligence",
    description: "Statistical summaries, trend data, benchmarks or modelled insights derived from aggregated data sources and presented at market or segment level.",
    typicalFormat: "Dashboards, data tables, charts or API endpoints delivering aggregated metrics rather than individual records.",
    possibleBuyerUse: "Market sizing, trend analysis, competitive benchmarking, opportunity assessment or strategic planning.",
    updateModel: "Periodic refresh based on underlying data updates. Monthly or quarterly updates typical for aggregated products.",
    evidenceRequired: "Aggregation methodology, underlying data sources, statistical treatments applied, known limitations of the aggregation approach.",
    accessControlExpectation: "Verified-buyer access with licence terms. Aggregated products typically require less restrictive access controls than record-level data.",
  },
  {
    id: "audience",
    name: "Audience segments",
    description: "Aggregated audience profiles or segments derived from survey data, panel data or modelled consumer intelligence, delivered at segment level without individual identification.",
    typicalFormat: "Segment profiles with demographic, behavioural or attitudinal descriptors. Delivered as reports, data tables or API endpoints.",
    possibleBuyerUse: "Audience understanding, campaign planning, media-buying strategy, product development or market-positioning work.",
    updateModel: "Periodic refresh aligned to survey waves, panel updates or model recalibration cycles.",
    evidenceRequired: "Segment-definition methodology, underlying data sources, sample sizes per segment, modelling assumptions, refresh schedule.",
    accessControlExpectation: "Verified-buyer access. Segments must not enable re-identification of individuals. Supplier to confirm no personal data at segment level.",
  },
  {
    id: "business-intel",
    name: "Business and public-record intelligence",
    description: "Structured information about companies, directors, filings, registrations and other publicly recorded business data — cleaned, linked and enriched.",
    typicalFormat: "API endpoints, bulk datasets or searchable interfaces returning structured company records with linked entities.",
    possibleBuyerUse: "Supplier due diligence, client onboarding, risk assessment, market mapping or regulatory compliance checks.",
    updateModel: "Aligned to source-registry update cycles. Daily or weekly refresh typical for Companies House-aligned products.",
    evidenceRequired: "Source registries used, extraction method, refresh frequency, linking methodology, any enrichment sources and their provenance.",
    accessControlExpectation: "Verified-buyer access at minimum. Compliance review may be required for use in regulated processes.",
  },
  {
    id: "location",
    name: "Location intelligence",
    description: "Geospatial data, catchment analysis, footfall estimates, demographic-by-area data or other location-linked intelligence products.",
    typicalFormat: "Geospatial files (GeoJSON, Shapefile), API endpoints with location parameters, or tabular data with geographic identifiers.",
    possibleBuyerUse: "Site selection, catchment analysis, network planning, logistics optimisation or local-market assessment.",
    updateModel: "Varies by product. Census-derived data updated on census cycles. Commercial location data may be updated quarterly or annually.",
    evidenceRequired: "Geographic coverage, spatial resolution, source of location data, methodology for any modelled or estimated values, refresh schedule.",
    accessControlExpectation: "Verified-buyer access. Products that could identify individuals by location may require compliance review.",
  },
  {
    id: "verification",
    name: "Verification products",
    description: "Products designed to validate or verify information — business identity, address, director details, sanctions status or other checkable attributes.",
    typicalFormat: "API endpoints returning match results, confidence scores and source references. May include batch-verification capabilities.",
    possibleBuyerUse: "KYC and KYB checks, supplier onboarding, client due diligence, sanctions screening or regulatory compliance.",
    updateModel: "Aligned to source-registry or sanctions-list update cycles. Daily refresh typical for sanctions-screening products.",
    evidenceRequired: "Data sources used, matching methodology, confidence-scoring approach, false-positive and false-negative rates, source-update lag.",
    accessControlExpectation: "Verified-buyer access. Compliance review typically required. Supplier approval may be required for sensitive verification use cases.",
  },
  {
    id: "risk",
    name: "Risk and fraud-support signals",
    description: "Indicators, scores or datasets designed to help buyers assess commercial, credit or fraud risk — offered as decision-support tools, not automated decisions.",
    typicalFormat: "API endpoints returning risk indicators, scores with explanation or structured risk-factor datasets.",
    possibleBuyerUse: "Credit-risk assessment, fraud screening, counter-party risk evaluation or insurance underwriting support.",
    updateModel: "Varies by signal type. Real-time for transaction-monitoring signals, daily or weekly for credit or company-risk indicators.",
    evidenceRequired: "Risk-model methodology, data sources, validation approach, performance characteristics, known limitations, model-refresh cycle.",
    accessControlExpectation: "Verified-buyer access plus compliance review. High-risk purposes require enhanced review and human-oversight commitments.",
  },
  {
    id: "dashboard",
    name: "Dashboards",
    description: "Interactive visual-analysis environments delivering data through a web interface, enabling exploration, filtering and visualisation without requiring the buyer to host data.",
    typicalFormat: "Web-based dashboards with filtering, export and visualisation capabilities. May be standalone or embedded in buyer environments.",
    possibleBuyerUse: "Market monitoring, performance tracking, opportunity screening or stakeholder reporting.",
    updateModel: "Underlying data refreshed on a defined schedule. Dashboard reflects latest available data version.",
    evidenceRequired: "Underlying data provenance, dashboard methodology, data-export capabilities and restrictions, user-access controls.",
    accessControlExpectation: "Verified-buyer access with named-user licensing. Dashboard access tied to individual accounts within the buyer organisation.",
  },
  {
    id: "clean-room",
    name: "Clean-room analysis",
    description: "Controlled environments where buyers can analyse supplier data alongside their own data without either party directly accessing the other's raw data.",
    typicalFormat: "Secure analytical environments with query, aggregation and export controls. Results reviewed before release.",
    possibleBuyerUse: "Audience overlap analysis, campaign measurement, enrichment validation or collaborative research where data must not be directly exchanged.",
    updateModel: "Analysis environment refreshed as supplier data is updated. Query results valid at point of execution.",
    evidenceRequired: "Clean-room architecture, data-ingress and egress controls, query-restriction policies, output-review process.",
    accessControlExpectation: "Enterprise agreement typically required. Output review before release. Strict controls on what results may be exported.",
  },
];

export const supplierProcessSteps: SupplierProcessStep[] = [
  {
    step: 1,
    title: "Begin a supplier application",
    description: "Complete the supplier application form with your organisation details, the product or products you wish to propose and your initial evidence summary. The application introduction page explains what to prepare before you start.",
    whoIsResponsible: "Supplier — your authorised representative leads the application.",
    possibleOutcomes: ["Application received and queued for initial review."],
    limitation: "Submitting an application does not guarantee acceptance. All applications are reviewed against DataHarbour's supplier standards.",
  },
  {
    step: 2,
    title: "Provide organisation details",
    description: "Supply your registered company name, registration number (where applicable), registered address and the identity and authority of the person submitting the application. DataHarbour verifies this information against public registries.",
    whoIsResponsible: "Supplier provides; DataHarbour verifies.",
    possibleOutcomes: ["Organisation verified.", "Further evidence of identity or status requested.", "Application declined if organisation cannot be verified."],
    limitation: "Verification confirms organisational existence and status. It does not assess financial standing or commercial viability.",
  },
  {
    step: 3,
    title: "Describe the proposed product",
    description: "Provide a clear, accurate description of the data product you wish to list — including its category, coverage, data fields, refresh frequency, delivery format and target buyer profile. This forms the basis of the marketplace listing.",
    whoIsResponsible: "Supplier's product team with support from DataHarbour guidance.",
    possibleOutcomes: ["Product description accepted.", "Clarification or additional detail requested.", "Product not accepted if it falls outside accepted product types or marketplace scope."],
    limitation: "Acceptance of a product description does not constitute final approval. Full listing requires completion of all review stages.",
  },
  {
    step: 4,
    title: "Submit rights and provenance evidence",
    description: "Document the legal and contractual basis on which you are entitled to offer the data product, the original sources, collection or acquisition methods, transformations applied and known limitations. This is the most important evidence stage.",
    whoIsResponsible: "Supplier, supported by legal or compliance function if needed.",
    possibleOutcomes: ["Provenance and rights evidence accepted.", "Additional documentation or clarification requested.", "Product declined if rights or provenance cannot be adequately demonstrated."],
    limitation: "DataHarbour reviews the evidence provided but does not independently verify every source, contract or processing step. The supplier warrants its own declarations.",
  },
  {
    step: 5,
    title: "Complete quality and security review",
    description: "Document your quality-control processes, refresh procedures, data-dictionary information and security arrangements for delivering the product. Provide a safe sample if available. DataHarbour reviews for consistency with the product description and provenance documentation.",
    whoIsResponsible: "Supplier with DataHarbour quality-review team.",
    possibleOutcomes: ["Quality and security documentation accepted.", "Improvement actions recommended.", "Listing delayed pending resolution of quality or security concerns."],
    limitation: "Quality review is based on documentation and samples. It does not guarantee that every future delivery will meet the documented standard.",
  },
  {
    step: 6,
    title: "Agree commercial and licence terms",
    description: "Define your pricing model, billing approach, licence type, permitted uses, prohibited uses, retention limits and any other commercial or contractual conditions. DataHarbour provides the marketplace framework; you set your commercial terms within it.",
    whoIsResponsible: "Supplier with DataHarbour commercial team support.",
    possibleOutcomes: ["Commercial terms agreed.", "Terms require adjustment.", "No agreement reached — product not listed."],
    limitation: "Commercial terms are agreed between supplier and DataHarbour. DataHarbour does not negotiate on behalf of individual buyers.",
  },
  {
    step: 7,
    title: "Build and review the package listing",
    description: "Your product listing is built on the marketplace using the information, evidence and terms you have provided. You review the listing for accuracy and completeness before it is published. DataHarbour reviews the listing for consistency with agreed terms.",
    whoIsResponsible: "Supplier reviews; DataHarbour publishes after approval.",
    possibleOutcomes: ["Listing approved for publication.", "Revisions requested before publication.", "Listing not approved."],
    limitation: "The listing reflects the information provided by the supplier. DataHarbour reviews for consistency but does not independently verify every claim in the listing.",
  },
  {
    step: 8,
    title: "Publish after DataHarbour approval",
    description: "Once all stages are complete and DataHarbour has approved the listing, your product is published in the marketplace catalogue. Verified buyers can discover your product, review its details and submit access requests.",
    whoIsResponsible: "DataHarbour publishes; supplier maintains the listing.",
    possibleOutcomes: ["Product published in marketplace catalogue."],
    limitation: "Publication means the product is visible to verified buyers. It does not guarantee that any particular buyer will request access or that all access requests will be approved.",
  },
  {
    step: 9,
    title: "Maintain versions, updates and restrictions",
    description: "Keep your product listing current. Update provenance documentation when sources change. Publish new versions with changelogs. Adjust restrictions if your product's terms evolve. Notify DataHarbour and affected buyers of material changes.",
    whoIsResponsible: "Supplier with DataHarbour oversight.",
    possibleOutcomes: ["Listing maintained and current.", "Listing flagged for review if outdated.", "Listing suspended if supplier fails to maintain accuracy."],
    limitation: "Maintenance depends on suppliers notifying DataHarbour of changes. There may be a lag between a change and its publication on the marketplace.",
  },
  {
    step: 10,
    title: "Respond to access and compliance questions",
    description: "Respond to buyer access requests, answer questions about your product's provenance or permitted uses and cooperate with any compliance review initiated by DataHarbour. Timely, professional responses support buyer confidence and marketplace integrity.",
    whoIsResponsible: "Supplier with DataHarbour support.",
    possibleOutcomes: ["Access requests processed.", "Questions resolved.", "Escalation if supplier is unresponsive."],
    limitation: "DataHarbour facilitates access requests and provides governance support, but the supplier remains responsible for deciding whether to approve individual buyers.",
  },
];

export const supplierProcessOutcomes: SupplierProcessOutcome[] = [
  {
    title: "More information required",
    description: "The application or a specific stage requires additional documentation or clarification before it can proceed. This is not a rejection — it is a request for the information needed to complete the review.",
  },
  {
    title: "Accepted for package preparation",
    description: "The supplier and proposed product have passed initial review and may proceed to building the marketplace listing. This is a significant milestone but does not yet constitute final approval to publish.",
  },
  {
    title: "Accepted with conditions",
    description: "The supplier or product is accepted subject to specific conditions — for example, additional documentation within a defined timeframe, restricted initial access levels or enhanced monitoring during an introductory period.",
  },
  {
    title: "Declined",
    description: "The application does not meet DataHarbour's supplier standards. Reasons are provided. A supplier may reapply if the reasons for decline can be addressed, but resubmission does not guarantee a different outcome.",
  },
  {
    title: "Paused",
    description: "The review process is temporarily paused, typically because an external event or dependency needs to be resolved — for example, a pending rights agreement or organisational change at the supplier.",
  },
  {
    title: "Suspended after publication",
    description: "A published listing may be suspended if the supplier fails to maintain standards, if significant provenance concerns arise, or if the supplier is unresponsive to compliance or access questions. Suspension is a protective measure.",
  },
];

export const supplierCommercialModels: SupplierCommercialModel[] = [
  {
    id: "subscription",
    name: "Subscription",
    description: "Buyers pay a recurring fee — typically monthly or annually — for ongoing access to the data product. Subscription pricing provides predictable revenue and encourages long-term buyer relationships.",
    whenItFits: "Products with regularly refreshed data where buyers need ongoing access — APIs, scheduled feeds, continuously updated datasets.",
    billingBasis: "Recurring — monthly, quarterly or annually. May be tiered by usage volume, data scope or user count.",
    supplierResponsibility: "Maintain data quality and refresh schedule throughout the subscription period. Provide notice of pricing or product changes.",
    buyerExpectation: "Continuous access for the subscription term. Clear notice of renewal and any pricing changes. Data updated on the advertised schedule.",
    contactSalesRequired: false,
  },
  {
    id: "per-record",
    name: "Per-record or per-request",
    description: "Buyers pay based on the volume of data they consume — per API call, per record retrieved or per verification completed. This model aligns cost directly with usage.",
    whenItFits: "On-demand APIs, verification products, lookup services where each request delivers discrete value and usage varies significantly between buyers.",
    billingBasis: "Volume-based — per request, per record, per thousand records. May include minimum monthly commitment or pre-paid credit bundles.",
    supplierResponsibility: "Provide transparent usage metering. Notify buyers of rate limits and overage charges. Maintain API performance and availability.",
    buyerExpectation: "Pay only for what is used. Clear visibility of current usage. Predictable per-unit pricing. No surprise charges.",
    contactSalesRequired: false,
  },
  {
    id: "usage-based",
    name: "Usage-based",
    description: "Similar to per-record but typically measured in broader usage metrics — data volume transferred, compute time used, number of active queries or number of users accessing the product.",
    whenItFits: "Products where usage varies significantly month to month and where per-record pricing would be too granular — dashboards, clean-room environments, large-batch processing.",
    billingBasis: "Usage metrics — data volume, compute hours, active users. Tiered pricing with volume discounts at higher usage levels.",
    supplierResponsibility: "Provide clear usage definitions and metering transparency. Alert buyers approaching usage thresholds.",
    buyerExpectation: "Flexibility to scale usage up or down. Cost reflects actual consumption. No lock-in to fixed volumes that do not match need.",
    contactSalesRequired: false,
  },
  {
    id: "package-licence",
    name: "Package licence",
    description: "Buyers pay a one-off or periodic fee for a defined package of data — a specific dataset, a report or a fixed-scope delivery. The licence defines what the buyer may do with that specific data package.",
    whenItFits: "Research reports, one-off datasets, annual publications or products where the data scope is fixed and ongoing refresh is not required.",
    billingBasis: "One-off fee per package, or periodic fee per edition. May include multi-user or enterprise-wide licence tiers.",
    supplierResponsibility: "Deliver the defined data package as described. Document any updates or corrections. Honour the licence scope.",
    buyerExpectation: "Receive the specific data package as described. Understand what the licence permits and for how long.",
    contactSalesRequired: false,
  },
  {
    id: "project",
    name: "Project-based",
    description: "Pricing is agreed for a specific project — defined scope, duration, deliverables and buyer team. This suits bespoke or semi-bespoke engagements where standard pricing models do not fit.",
    whenItFits: "Custom research, bespoke analysis, data-matching projects, proof-of-concept engagements or short-term intensive data use.",
    billingBasis: "Fixed project fee or milestone-based payments. Scope and deliverables defined in a project agreement.",
    supplierResponsibility: "Deliver to the agreed scope, timeline and quality. Communicate scope changes and their commercial implications promptly.",
    buyerExpectation: "Defined deliverables, timeline and cost. No surprise charges outside agreed scope changes.",
    contactSalesRequired: true,
  },
  {
    id: "enterprise",
    name: "Enterprise agreement",
    description: "A comprehensive agreement covering multiple products, multiple buyer teams, custom delivery arrangements and negotiated commercial terms. Suitable for large-scale, long-term data partnerships.",
    whenItFits: "Buyers who need several products, custom integration, dedicated support or commercial terms that go beyond standard pricing tiers.",
    billingBasis: "Negotiated — may combine elements of subscription, usage and fixed fees. Annual or multi-year agreement terms.",
    supplierResponsibility: "Deliver across all agreed products and services. Provide dedicated relationship management and support.",
    buyerExpectation: "Comprehensive access with commercial predictability. Dedicated support. Terms negotiated to match the scale of the engagement.",
    contactSalesRequired: true,
  },
  {
    id: "revenue-share",
    name: "Revenue share",
    description: "Supplier and DataHarbour agree a revenue-sharing arrangement where the supplier receives a percentage of the revenue generated by their product through the marketplace.",
    whenItFits: "Products where DataHarbour handles billing, collection and buyer management, and the supplier prefers a variable-revenue model over a fixed fee.",
    billingBasis: "Percentage of product revenue. Terms agreed during supplier onboarding. Commercial terms agreed during onboarding.",
    supplierResponsibility: "Maintain product quality and respond to buyer access requests. Review revenue reports provided by DataHarbour.",
    buyerExpectation: "Transparent pricing. Buyer pays DataHarbour; supplier compensated through the agreed revenue-share arrangement.",
    contactSalesRequired: true,
  },
  {
    id: "distribution",
    name: "Fixed distribution agreement",
    description: "A fixed-fee agreement where the supplier licenses their product to DataHarbour for distribution through the marketplace. DataHarbour sets buyer pricing within agreed parameters.",
    whenItFits: "Suppliers who prefer a guaranteed fixed payment over variable revenue and who want DataHarbour to manage buyer relationships and pricing.",
    billingBasis: "Fixed fee paid by DataHarbour to supplier on an agreed schedule. Commercial terms agreed during onboarding.",
    supplierResponsibility: "Maintain product quality and provide updates as agreed. Support DataHarbour with product expertise.",
    buyerExpectation: "Marketplace-standard pricing and access process. Buyer deals with DataHarbour, not directly with the supplier for commercial matters.",
    contactSalesRequired: true,
  },
  {
    id: "bespoke",
    name: "Bespoke research or analysis",
    description: "Buyers commission the supplier to conduct specific research or analysis beyond standard product offerings. Pricing, scope and deliverables are agreed per engagement.",
    whenItFits: "Buyers with unique research questions, custom data requirements or analysis needs that cannot be met by standard products.",
    billingBasis: "Per engagement. Scope, deliverables, timeline and fee agreed before work begins.",
    supplierResponsibility: "Deliver to the agreed scope and quality. Maintain confidentiality of the buyer's research questions and data.",
    buyerExpectation: "Tailored deliverables that address the specific research question. Clear scope, timeline and cost from the outset.",
    contactSalesRequired: true,
  },
];

export const supplierDeliveryOptions: SupplierDeliveryOption[] = [
  {
    id: "api",
    name: "API",
    description: "Programmatic access via REST or GraphQL endpoints. Buyers integrate the API into their own applications, workflows or analytical pipelines.",
    updateFrequency: "Real-time or near-real-time. API responses reflect the latest available data at the point of query.",
    secureTransfer: "TLS-encrypted connections. API-key or OAuth authentication. Rate limiting to prevent abuse.",
    schemaDocumentation: "API reference documentation required. Endpoint descriptions, request and response formats, error codes and authentication method.",
    versioning: "API versioning expected. Breaking changes communicated with notice. Deprecation schedule for old versions.",
    usageTracking: "Per-key usage monitoring. Call-volume tracking for billing and abuse detection.",
    linkRoute: null,
  },
  {
    id: "csv",
    name: "CSV",
    description: "Comma-separated values — the most common tabular-data format. Widely compatible with spreadsheet applications, databases and analytical tools.",
    updateFrequency: "Supplier-defined schedule — daily, weekly, monthly or ad hoc. Full or incremental delivery.",
    secureTransfer: "Secure download links with authentication and expiry. SFTP for large or frequent deliveries.",
    schemaDocumentation: "Column-level data dictionary required. Field names, data types, allowed values, null handling and any coded-value lookups.",
    versioning: "File naming with version or date indicator. Changelog documenting column additions, removals or definition changes.",
    usageTracking: "Download-count tracking for access monitoring.",
    linkRoute: null,
  },
  {
    id: "json",
    name: "JSON",
    description: "JavaScript Object Notation — a structured, machine-readable format ideal for nested or hierarchical data. Common in API responses and data feeds.",
    updateFrequency: "Supplier-defined schedule or real-time via API. Schema-stable between versions.",
    secureTransfer: "TLS for API delivery. Secure download for file delivery. Authentication required for all access methods.",
    schemaDocumentation: "JSON Schema or equivalent documentation. Field-level descriptions, data types, nesting structure and optional vs required fields.",
    versioning: "Schema versioning with backward-compatibility expectations. Breaking changes communicated in advance.",
    usageTracking: "Delivery-count tracking for file delivery. Call-volume tracking for API delivery.",
    linkRoute: null,
  },
  {
    id: "secure-download",
    name: "Secure download",
    description: "Authenticated, time-limited download links delivering data files through a web interface. Suitable for periodic, batch-oriented data access.",
    updateFrequency: "Supplier-defined batch schedule. New versions published on a regular cycle.",
    secureTransfer: "HTTPS download with authentication. Time-limited links. Optional checksum verification for file integrity.",
    schemaDocumentation: "Data dictionary or schema reference provided alongside the download. Version-specific documentation.",
    versioning: "Clear version identification. Changelog for each new version. Old versions archived or removed on a defined schedule.",
    usageTracking: "Download logging — who downloaded what version and when.",
    linkRoute: null,
  },
  {
    id: "scheduled-feed",
    name: "Scheduled feed",
    description: "Automated, recurring data delivery to a buyer-designated destination — SFTP server, cloud storage bucket or email.",
    updateFrequency: "Fixed schedule — daily, weekly, monthly. Automated delivery with monitoring for failed transfers.",
    secureTransfer: "SFTP with key-based authentication. Cloud-storage integration with least-privilege access. PGP encryption where required.",
    schemaDocumentation: "Feed specification document. File format, schema, delivery schedule, failure-notification process.",
    versioning: "Feed version identifier in file metadata or naming. Advance notice of schema changes that may break buyer processing.",
    usageTracking: "Delivery-success logging. Failure alerting. Buyer confirmation of receipt for critical feeds.",
    linkRoute: null,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Interactive web-based data-exploration and visualisation environment. Buyers analyse data through the supplier's interface without downloading raw data.",
    updateFrequency: "Underlying data refreshed on supplier's schedule. Dashboard reflects current data version.",
    secureTransfer: "HTTPS access with named-user authentication. Session management with inactivity timeout.",
    schemaDocumentation: "Dashboard user guide. Data-source information. Export capabilities and restrictions.",
    versioning: "Dashboard version with release notes. Feature changes communicated to users.",
    usageTracking: "User-login tracking. Feature-usage analytics. Export logging.",
    linkRoute: null,
  },
  {
    id: "report",
    name: "Report",
    description: "Published document — PDF, slide deck or interactive report — delivering analysis, insight or data in a human-readable format.",
    updateFrequency: "Publication schedule — quarterly, bi-annual, annual or ad hoc.",
    secureTransfer: "Secure download or authenticated web access. Watermarking or digital rights management where appropriate.",
    schemaDocumentation: "Methodology statement. Data sources, collection period, sample information and any analytical caveats.",
    versioning: "Edition or publication-date identification. Corrections or updates published as revised editions.",
    usageTracking: "Download logging. Named-user access tracking for web-based reports.",
    linkRoute: null,
  },
  {
    id: "clean-room",
    name: "Clean-room analysis",
    description: "Secure environment where buyers can query supplier data alongside their own data. Neither party sees the other's raw data. Results are reviewed before release.",
    updateFrequency: "Analysis environment refreshed as supplier data is updated. Results valid at query-execution time.",
    secureTransfer: "Isolated environment with controlled data ingress and egress. No direct data transfer between parties.",
    schemaDocumentation: "Environment documentation. Available data tables and fields. Query capabilities and restrictions. Output-review process.",
    versioning: "Environment version with data-version identifier. Schema changes communicated before deployment.",
    usageTracking: "Query logging. Output-review records. Environment-access logging.",
    linkRoute: null,
  },
];

export const supplierFaqs: SupplierFaq[] = [
  {
    question: "Who can apply to become a DataHarbour supplier?",
    answer: "DataHarbour welcomes applications from established organisations that can demonstrate verifiable identity, clear rights to the data they wish to offer, documented provenance and a commitment to quality and responsible data stewardship. This includes data providers, research companies, public-record intelligence specialists, location-data providers, business-verification services, market-research organisations, API businesses and holders of licensable proprietary datasets. Organisations offering unverified scraped personal data, unlawfully obtained data, uncontrolled people-search databases or products without clear rights documentation are not suitable for DataHarbour and will not be accepted.",
  },
  {
    question: "What types of data products does DataHarbour accept?",
    answer: "DataHarbour accepts APIs, scheduled feeds, secure downloadable datasets, research reports, aggregated market intelligence, audience segments, business and public-record intelligence, location intelligence, verification products, risk and fraud-support signals, dashboards and clean-room analysis environments. Each product type has specific expectations around format, provenance documentation, update model and access controls. A product that does not clearly fit one of these types may still be considered if it meets DataHarbour's supplier standards. The full list of accepted product types with expectations for each is available on the Supplier Hub.",
  },
  {
    question: "Can I supply products that contain personal data?",
    answer: "DataHarbour does not categorically exclude products that contain or are derived from personal data, but such products are subject to heightened scrutiny. Suppliers must demonstrate a clear lawful basis for processing and offering the personal data, must document their data-protection arrangements and must be prepared to support data-subject rights requests. Products that consist primarily of personal data collected without clear consent or lawful basis, or products designed for unrestricted people-searching, will not be accepted. The Compliance Centre's data-subject-rights page explains the planned rights-request process.",
  },
  {
    question: "What provenance evidence do I need to provide?",
    answer: "You must document the original source or sources of your data, the method by which it was collected or acquired, the legal and contractual basis on which you hold the right to offer it, any transformations or aggregations applied, the refresh process and frequency, quality-control procedures, known limitations and, where relevant, any sub-supplier relationships. This documentation is reviewed by DataHarbour as part of the supplier-standards process. The provenance page in the Compliance Centre provides detailed guidance on what is expected. You do not need to reveal commercially sensitive processing details, but you must provide enough information for a buyer to make an informed assessment of the product's fitness for their purpose.",
  },
  {
    question: "How long does the supplier review process take?",
    answer: "DataHarbour is currently a demonstration platform, and live supplier review timelines have not yet been established. In the planned operational platform, the review timeline will depend on the completeness of the application, the complexity of the product and the volume of applications in progress. DataHarbour's goal is to make the process as efficient as possible without compromising the thoroughness of the review. Suppliers can help by preparing their evidence thoroughly before submitting an application.",
  },
  {
    question: "How are commercial terms agreed?",
    answer: "Commercial terms — including pricing model, billing approach, licence type and any special conditions — are agreed between the supplier and DataHarbour during the onboarding process. DataHarbour provides the marketplace framework, the buyer-verification process and the governance layer. Within that framework, suppliers set their own commercial terms. DataHarbour does not dictate pricing, but it may decline to list a product whose pricing is unclear, misleading or inconsistent with the marketplace's standards. Specific commercial terms, including any commission or revenue-share arrangements, are discussed during onboarding.",
  },
  {
    question: "Can I choose which buyers get access to my product?",
    answer: "Yes, to an extent. You define the access level for your product. If you set the access level to 'Supplier Approval', you will review and approve or decline each buyer access request individually. If you set a lower access level — such as 'Verified Buyer' — access decisions are made by DataHarbour based on the buyer meeting the product's stated requirements. You may also define buyer eligibility criteria, such as requiring buyers to be from specific sectors or geographies. However, you may not discriminate unlawfully in your access decisions, and DataHarbour may review access patterns for fairness and consistency.",
  },
  {
    question: "Can DataHarbour reject a buyer's proposed use of my product even if I would approve it?",
    answer: "Yes. DataHarbour may decline or condition a buyer's access request even if you, as the supplier, would approve it. This may happen if the proposed use falls outside DataHarbour's prohibited-use policy, if the buyer does not meet DataHarbour's buyer standards or if the proposed use raises governance concerns that the supplier's terms do not adequately address. DataHarbour's governance role is independent of the supplier's commercial decisions. This protects the integrity of the marketplace and the interests of data subjects.",
  },
  {
    question: "How are package updates and version changes handled?",
    answer: "Suppliers are expected to maintain their product listings, publish new versions with changelogs and notify DataHarbour — and through DataHarbour, affected buyers — of material changes. A material change includes a change to data sources, coverage, refresh frequency, pricing, permitted uses, restrictions or delivery methods. Buyers should be given reasonable notice of changes that may affect their use of the product. DataHarbour provides the versioning framework; the supplier is responsible for keeping version information current and accurate.",
  },
  {
    question: "What happens if there is a security incident affecting my product?",
    answer: "Suppliers must notify DataHarbour without undue delay if a security incident, data breach or significant service disruption occurs that may affect the confidentiality, integrity or availability of their listed data products. The notification should describe the nature of the incident, the products and buyers affected, the steps being taken to contain and resolve the issue and the expected timeline for resolution. DataHarbour will work with the supplier to assess the impact on buyers and to determine what communication or action is required. Failure to report a significant incident may result in suspension or delisting.",
  },
  {
    question: "Is supplier reporting and analytics live in the current platform?",
    answer: "No. The supplier workspace — including dashboards for access requests, licence management, delivery tracking, usage reporting and commercial reconciliation — is planned functionality and is not yet operational in the demonstration platform. The Supplier Hub includes a visual preview of the planned workspace. These tools will be built after the core marketplace, buyer-verification and access-request workflows are operational. Suppliers will be informed as each tool becomes available.",
  },
  {
    question: "Does submitting an application guarantee that my product will be listed?",
    answer: "No. Every application is reviewed against DataHarbour's supplier standards. Products that do not meet the standards — for reasons including unverifiable organisation identity, insufficient provenance documentation, unclear rights, inaccurate product descriptions or failure to meet quality and security expectations — will not be listed. DataHarbour's role as a governed marketplace depends on maintaining high standards. A decision to decline is not necessarily final — if the supplier can address the reasons for decline, they may reapply. However, resubmission does not guarantee a different outcome.",
  },
];

export const supplierWorkspacePreviewCards: SupplierPreviewCard[] = [
  {
    title: "Package drafts",
    description: "Create and save package listings in draft. Work on product descriptions, provenance documentation and pricing before submitting for review.",
    icon: "ri-draft-line",
  },
  {
    title: "Review status",
    description: "Track where each product is in the review process — from application submitted through to published. See what stage requires your attention.",
    icon: "ri-task-line",
  },
  {
    title: "Access requests",
    description: "View, assess and respond to buyer access requests. See the buyer's declared purpose and organisation details before making an approval decision.",
    icon: "ri-user-shared-line",
  },
  {
    title: "Deliveries",
    description: "Manage data deliveries, monitor download or API usage, and track that buyers are receiving data on the agreed schedule.",
    icon: "ri-send-plane-line",
  },
  {
    title: "Version updates",
    description: "Publish new product versions, upload changelogs and notify affected buyers of material changes to data or terms.",
    icon: "ri-git-branch-line",
  },
  {
    title: "Compliance documents",
    description: "Store and update your provenance documentation, rights evidence, quality-control records and security information in one place.",
    icon: "ri-shield-check-line",
  },
  {
    title: "Usage and commercial reporting",
    description: "View usage metrics, access statistics and commercial reports. Understand how your products are being used and by which types of buyer.",
    icon: "ri-bar-chart-line",
  },
];

export const supplierStandardsRequirements: SupplierRequirement[] = [
  {
    title: "Organisation eligibility",
    description: "Suppliers must be verifiable organisations — registered companies, partnerships, public bodies, charities or other recognised legal entities. The organisation must be verifiable through public registries or equivalent documentation. The individual submitting the application must be authorised to act on behalf of the organisation. Shelf companies, dissolved entities and organisations with no verifiable trading presence are not eligible.",
  },
  {
    title: "Rights to the data",
    description: "Suppliers must hold the necessary legal and contractual rights to offer the data product through the marketplace. This means they must own the data, hold a valid licence to distribute it or have otherwise lawfully obtained the right to make it available. Where rights are limited by geography, industry, use or duration, those limitations must be clearly disclosed. Suppliers warrant their rights as part of their listing agreement.",
  },
  {
    title: "Documented provenance",
    description: "Every product must include provenance documentation covering the original data sources, the collection or acquisition method, the legal and contractual basis for offering the data, any transformations or aggregations applied, the refresh process and frequency, quality-control procedures, known limitations and, where relevant, any sub-supplier or third-party data relationships. Incomplete or misleading provenance documentation is grounds for delisting.",
  },
  {
    title: "Product accuracy",
    description: "Product listings must be accurate, current and not misleading. This covers the product name, category, description, data fields, coverage claims, refresh frequency, delivery methods, pricing and any quality indicators. Overstating coverage, understating limitations or making claims that cannot be substantiated is a breach of supplier standards.",
  },
  {
    title: "Quality processes",
    description: "Suppliers must have documented processes for maintaining data quality. This includes validation rules, consistency checks, duplicate handling, completeness monitoring and cross-reference verification where applicable. Quality-control documentation should be available to buyers on request or as part of the product listing. Suppliers must notify DataHarbour and affected buyers if quality drops below documented thresholds.",
  },
  {
    title: "Security arrangements",
    description: "Suppliers must maintain security controls appropriate to the data they hold and distribute. This includes access controls, encryption in transit and at rest, vulnerability management, incident-response procedures and secure delivery mechanisms. Suppliers must provide summary security information as part of the listing process and must notify DataHarbour of any security incident that may affect listed products.",
  },
  {
    title: "Incident response",
    description: "Suppliers must have a documented incident-response plan and must notify DataHarbour without undue delay if a security incident, data breach or significant service disruption occurs. The notification should describe the incident, the products and buyers affected, the containment and resolution steps and the expected timeline. Failure to report significant incidents may result in suspension.",
  },
  {
    title: "Data-subject support",
    description: "Where a data product contains or is derived from personal data, the supplier must have arrangements in place to support data-subject rights requests. This includes responding to access, correction, deletion or objection requests. The supplier's responsibilities for handling such requests should be clearly documented.",
  },
  {
    title: "Buyer-use restrictions",
    description: "Suppliers must clearly state the permitted and prohibited uses for each product. Restrictions must be reasonable, clearly communicated and consistently applied. Suppliers may not impose restrictions that are disproportionate, discriminatory or designed to circumvent DataHarbour's governance model.",
  },
  {
    title: "Version management",
    description: "Suppliers must maintain clear version control for their data products. Each version must be identifiable, and differences between versions must be documented. Buyers must be able to determine which version they are accessing and what has changed. Material changes must be communicated to DataHarbour and affected buyers with reasonable notice.",
  },
  {
    title: "Review cooperation",
    description: "Suppliers must cooperate with any audit, review or investigation initiated by DataHarbour. This includes providing evidence, responding to questions within a reasonable timeframe, implementing agreed remedial actions and cooperating with complaint resolution. Failure to cooperate — or a pattern of unresolved issues — may result in suspension or delisting.",
  },
  {
    title: "Suspension and delisting",
    description: "DataHarbour may suspend or delist a product or supplier account if standards are not maintained. Grounds include inaccurate listings, failure to maintain provenance documentation, unresolved quality or security concerns, unresponsiveness to access or compliance questions, breach of terms or conduct that undermines marketplace trust. Suspension is a protective measure, not a penalty. Delisting is permanent removal from the marketplace.",
  },
];

export const supplierStandardsChecklist: SupplierChecklistItem[] = [
  { label: "Organisation details ready — legal name, registration number (if applicable), registered address." },
  { label: "Authorised representative identified — the person submitting the application with authority to act for the organisation." },
  { label: "Product owner identified — the person within your organisation responsible for the product's content, quality and updates." },
  { label: "Source and rights documented — evidence of where the data comes from and the legal basis for offering it." },
  { label: "Collection or acquisition method explained — how the underlying data was gathered or obtained." },
  { label: "Schema available — field-level data dictionary describing each data element, its type and meaning." },
  { label: "Sample prepared safely — a representative sample that does not expose sensitive, personal or commercially confidential data." },
  { label: "Refresh process documented — how and how often the data is updated, and who is responsible." },
  { label: "Quality checks documented — the processes used to maintain data quality, identify errors and handle corrections." },
  { label: "Restrictions defined — permitted uses, prohibited uses, retention limits and any other access conditions." },
  { label: "Security information ready — summary of how data is protected in storage and during delivery." },
  { label: "Incident contact nominated — the person or team to contact in the event of a security or data incident." },
  { label: "Supporting documents available — any additional evidence that supports your application, organised and ready to submit." },
];

export const packageGuidelineSections: PackageGuidelineSection[] = [
  {
    id: "naming",
    title: "Package naming",
    anchor: "naming",
    description: "Choose a clear, descriptive name that tells buyers what the product is and what it covers. Avoid marketing superlatives, unsupported claims and vague language. The name should be specific enough that a buyer can understand the product's scope without reading the full description.",
    goodExample: "UK Business Registry Enrichment API",
    poorExample: "Best Complete Data — Every Company and Person",
    whyPoorIsBad: "This name is unclear (what data? what format?), unsupported ('best' and 'complete' are impossible to verify), misleading ('every company and person' is almost certainly untrue) and uses marketing language that undermines trust rather than building it.",
  },
  {
    id: "short-description",
    title: "Clear short description",
    anchor: "short-description",
    description: "Write a concise, factual one- or two-sentence summary. It should state what the product is, what it covers and its primary use. Buyers scan short descriptions to decide whether to explore further — make every word count.",
    goodExample: "A REST API providing current and historical UK company registration data, director information and filing history from Companies House, refreshed daily, for business verification and due diligence.",
    poorExample: "The ultimate data solution for all your business intelligence needs. Unlock the power of data-driven decisions with our market-leading platform.",
    whyPoorIsBad: "This description contains no specific information about what the product actually is — no format, no coverage, no refresh information, no data source. It uses marketing filler that tells a buyer nothing useful.",
  },
  {
    id: "full-overview",
    title: "Full product overview",
    anchor: "full-overview",
    description: "Provide a detailed description covering what the product contains, how the data is structured, what it can be used for, who the intended users are and what the product does not do. This is the buyer's primary source of information for assessing fit.",
    goodExample: "A detailed product overview paragraph describing the data sources, record types, refresh schedule, typical use cases, geographic coverage, record counts or coverage estimates, and clearly stating what the product does and does not include.",
    poorExample: "Our data is the most comprehensive available. It covers everything you need for business intelligence and more. Trusted by leading organisations worldwide.",
    whyPoorIsBad: "No specific data contents, no scope, no limitations, unverifiable claims ('most comprehensive', 'trusted by leading organisations'). Buyers cannot assess whether this product meets their needs from this description.",
  },
  {
    id: "category",
    title: "Category and tags",
    anchor: "category",
    description: "Assign the most appropriate marketplace category and add relevant tags. Tags should help buyers find the product when searching or filtering. Use consistent, descriptive tags rather than marketing terms.",
    goodExample: "Category: Business & Public Record Intelligence. Tags: companies-house, uk-business, company-registration, director-data, verification, due-diligence, api.",
    poorExample: "Category: Other. Tags: data, business, best, premium, top-quality.",
    whyPoorIsBad: "The wrong category makes the product hard to find. Generic tags like 'data' and 'business' add no discovery value. Marketing tags like 'best' and 'premium' are not search terms a buyer would use.",
  },
  {
    id: "geography",
    title: "Geographic coverage",
    anchor: "geography",
    description: "State clearly and specifically which geographic areas the product covers. If coverage is partial, state which areas are included and which are excluded. Do not use vague terms like 'nationwide' without specifying the nation.",
    goodExample: "United Kingdom (England, Scotland, Wales, Northern Ireland). Coverage: all active companies registered at Companies House. Note: dissolved companies retained for 6 years post-dissolution.",
    poorExample: "Global coverage. Available everywhere.",
    whyPoorIsBad: "'Global' is almost certainly inaccurate for a specialised dataset. 'Available everywhere' confuses geographic coverage with access availability. Buyers need specific geography to determine if the product covers their area of interest.",
  },
  {
    id: "record-coverage",
    title: "Record or audience coverage",
    anchor: "record-coverage",
    description: "Describe the scope of records or entities covered. Include approximate counts if available, and be clear about what is included and excluded. If the product covers a subset of a larger dataset, explain the subset criteria.",
    goodExample: "Approximately 5.1 million active UK companies, 8.9 million directors, and all filing history events from 2016 onwards. Covers all company types registered at Companies House.",
    poorExample: "Millions of records covering everything you could possibly need. The biggest dataset available.",
    whyPoorIsBad: "'Millions' is too vague. 'Everything you could possibly need' is unsupported and meaningless. 'The biggest' is an unverifiable claim that invites challenge rather than confidence.",
  },
  {
    id: "refresh",
    title: "Refresh schedule",
    anchor: "refresh",
    description: "State how often the data is refreshed, the typical lag between source update and product update, and whether the refresh is full or incremental. If the schedule varies, explain the variation.",
    goodExample: "Daily refresh at 04:00 UTC. Data reflects Companies House updates processed in the preceding 24 hours. Typical lag: 24–48 hours from Companies House filing to product update.",
    poorExample: "Regular updates. Always fresh data.",
    whyPoorIsBad: "'Regular' tells the buyer nothing about frequency. 'Always fresh' is unsupported — no data product is updated instantaneously from all sources. Buyers relying on data for time-sensitive decisions need specific timing.",
  },
  {
    id: "delivery",
    title: "Delivery formats",
    anchor: "delivery",
    description: "List the delivery formats available, with brief descriptions of each. If multiple formats are available, explain the differences. If a format has limitations, state them.",
    goodExample: "REST API (JSON responses), bulk CSV download (weekly full export), daily incremental CSV feed (SFTP delivery). API documentation and CSV schema reference available.",
    poorExample: "We deliver however you want. All formats supported. Just ask.",
    whyPoorIsBad: "No specific formats listed. 'However you want' is a promise the supplier may not be able to keep. Buyers need to know whether the product integrates with their systems before they request access.",
  },
  {
    id: "data-dictionary",
    title: "Data dictionary",
    anchor: "data-dictionary",
    description: "Provide a complete field-level data dictionary. Each field should have a name, data type, description, example value, whether it can be null and any coded-value lookups. Buyers need this to assess data fit before requesting access.",
    goodExample: "Field: company_number | Type: string(8) | Description: Companies House company number, zero-padded | Example: '01234567' | Nullable: No",
    poorExample: "We have all the standard fields. Contact us for details.",
    whyPoorIsBad: "'Standard fields' is meaningless — there is no universal standard for data fields. Making buyers contact you for basic schema information adds friction and suggests the supplier may not have documented their data properly.",
  },
  {
    id: "sample",
    title: "Safe sample data",
    anchor: "sample",
    description: "Provide a representative sample that buyers can review to understand data structure, quality and coverage. The sample must not contain personal data, commercially sensitive information or anything that would breach your own obligations.",
    goodExample: "A CSV file with 100 anonymised company records showing all available fields. Personal director details redacted. Available for download from the product detail page.",
    poorExample: "No sample available. Trust us, the data is excellent.",
    whyPoorIsBad: "Refusing to provide a sample prevents buyers from assessing data quality before committing. 'Trust us' is not a substitute for evidence. A well-prepared sample is one of the strongest selling tools a supplier has.",
  },
  {
    id: "provenance-summary",
    title: "Provenance summary",
    anchor: "provenance-summary",
    description: "Summarise the product's provenance — where the data comes from, how it was collected or acquired, what transformations have been applied and any known limitations. Link to the full provenance documentation.",
    goodExample: "Source: Companies House public register, accessed via Companies House API. Extraction: daily full pull of active company records. Transformation: standardisation of address formats, director-name normalisation. Limitations: dissolved companies retained for 6 years only; some historical filing data unavailable for companies dissolved before 2010.",
    poorExample: "Our data comes from reliable public sources. We process it to the highest standards.",
    whyPoorIsBad: "'Reliable public sources' is too vague. 'Highest standards' is unverifiable. Buyers need specific provenance information to assess whether they can rely on the data for regulated or high-stakes purposes.",
  },
  {
    id: "quality-info",
    title: "Quality information",
    anchor: "quality-info",
    description: "Describe the quality-control processes applied to the product. Include validation rules, consistency checks, duplicate handling, completeness monitoring and any quality metrics you track. Be honest about limitations.",
    goodExample: "Daily validation checks: company-number format validation, address-postcode matching, director-appointment date consistency. Completeness: all active companies included; coverage verified against monthly Companies House snapshot. Known limitation: approximately 2% of address records have incomplete postcode data.",
    poorExample: "100% accurate data. Zero errors. Perfect quality guaranteed.",
    whyPoorIsBad: "'100% accurate' is almost certainly false — no real-world dataset is perfect. Claims of perfection invite scrutiny and, when inevitably disproven, destroy trust. Honest quality information, including known limitations, builds credibility.",
  },
  {
    id: "permitted-uses",
    title: "Permitted uses",
    anchor: "permitted-uses",
    description: "List clearly what buyers may do with the product. Be specific — 'business use' is too vague. Distinguish between use cases that are permitted, permitted with conditions and not permitted.",
    goodExample: "Permitted: business verification and due diligence, supplier onboarding, regulatory compliance checks, internal risk assessment. Permitted with conditions: client-facing reporting (must not republish raw data). Not permitted: direct marketing using personal director data, credit scoring of individuals.",
    poorExample: "Use for any legitimate business purpose.",
    whyPoorIsBad: "'Any legitimate business purpose' is dangerously broad and gives the supplier no protection against undesirable uses. It also gives the buyer no clarity about what is and is not allowed. Specific permitted uses protect both parties.",
  },
  {
    id: "prohibited-uses",
    title: "Prohibited uses",
    anchor: "prohibited-uses",
    description: "List what buyers must not do with the product. These should be specific and enforceable. Reference DataHarbour's general prohibited-use policy and add product-specific prohibitions.",
    goodExample: "Prohibited: resale or sublicensing of raw data, people-searching using director data, credit scoring of individuals, unauthorised marketing, publication of bulk company data in a competing service.",
    poorExample: "Don't do anything illegal. Standard terms apply.",
    whyPoorIsBad: "'Don't do anything illegal' is too vague to be enforceable and does not cover uses that may be legal but still undesirable. 'Standard terms' without specifying what they are leaves both supplier and buyer unprotected.",
  },
  {
    id: "retention",
    title: "Retention guidance",
    anchor: "retention",
    description: "State how long buyers may retain the data and what must happen when the retention period ends. If retention varies by licence type, explain the variations.",
    goodExample: "Data may be retained for the duration of the subscription period plus 30 days for deletion. Archived copies of reports incorporating aggregate data may be retained for audit purposes. Raw data must be securely deleted within 30 days of subscription end.",
    poorExample: "Keep it as long as you need it.",
    whyPoorIsBad: "Indefinite retention is inconsistent with data-minimisation principles and may breach the supplier's own obligations. Clear retention guidance protects the supplier, the buyer and data subjects.",
  },
  {
    id: "sharing",
    title: "Sharing restrictions",
    anchor: "sharing",
    description: "State whether and how the buyer may share the data with affiliates, contractors, clients or other third parties. Be specific about what sharing is permitted and under what conditions.",
    goodExample: "Data may be shared with the buyer's professional advisers (auditors, legal counsel) for the purpose of the buyer's use. Data may be incorporated into client deliverables in aggregated or derived form only — raw data must not be passed to clients. Sharing with affiliates requires an enterprise licence.",
    poorExample: "Internal use only.",
    whyPoorIsBad: "'Internal use only' does not address common legitimate scenarios such as sharing with auditors or incorporating data into client deliverables. Overly restrictive or unclear sharing terms create compliance risk for both parties.",
  },
  {
    id: "pricing-model",
    title: "Pricing model",
    anchor: "pricing-model",
    description: "State the pricing model clearly — subscription, per-record, usage-based, one-off or enterprise. Include the price or price range. If pricing is custom, state what factors determine the price.",
    goodExample: "Subscription: GBP 500/month for up to 10,000 API calls. Additional calls at GBP 0.05/call. Annual subscription: GBP 5,000/year (17% discount). Enterprise: contact sales for volume pricing.",
    poorExample: "Competitive pricing. Contact us for a quote.",
    whyPoorIsBad: "'Competitive pricing' tells the buyer nothing. Requiring contact for basic pricing adds unnecessary friction. Buyers need pricing information to determine whether a product fits their budget before they invest time in evaluation.",
  },
  {
    id: "licence",
    title: "Licence information",
    anchor: "licence",
    description: "State the licence type, the licence term, renewal conditions and any key licence obligations. If the licence is standard (for example, based on DataHarbour's standard supplier licence terms), state that.",
    goodExample: "DataHarbour Standard Data Licence. Term: 12 months, auto-renewing unless cancelled 30 days before expiry. Key obligations: data must not be resold, must be deleted on expiry, must only be used for declared purpose. Full licence terms available on the product detail page.",
    poorExample: "Standard licence. Terms apply.",
    whyPoorIsBad: "'Standard licence' without specifying what it is gives the buyer no information. Licence terms are a critical part of the buyer's compliance assessment. Making them hard to find or understand undermines the marketplace's transparency goals.",
  },
  {
    id: "version-history",
    title: "Version history",
    anchor: "version-history",
    description: "Maintain and publish a version history showing what changed, when and why. Each version should be identifiable. Buyers should be able to see the product's evolution and understand the impact of updates.",
    goodExample: "v2.3 (15 July 2026): Added SIC code classification field. v2.2 (1 June 2026): Extended dissolution coverage from 3 to 6 years. v2.1 (10 April 2026): Improved address standardisation; approximately 5% of addresses now have fuller postcode data.",
    poorExample: "We update regularly. Your data is always current.",
    whyPoorIsBad: "'We update regularly' tells the buyer nothing about what changed or whether the change affects their use. Without a version history, buyers cannot track data evolution or troubleshoot issues that may be related to a version change.",
  },
  {
    id: "support",
    title: "Support expectations",
    anchor: "support",
    description: "State what support you provide, how buyers can contact you, your response-time expectations and any limitations on support. Be realistic — do not promise 24/7 support if you cannot deliver it.",
    goodExample: "Email support (support@example.com) with response within 1 UK business day. API status page at status.example.com. Critical incident response within 4 hours during UK business hours (09:00–17:00 GMT, Monday–Friday).",
    poorExample: "World-class support. We are always here to help.",
    whyPoorIsBad: "'World-class' is an unverifiable marketing claim. 'Always here' suggests 24/7 availability that the supplier may not provide. Specific, honest support information sets realistic expectations and avoids disappointment.",
  },
  {
    id: "limitations",
    title: "Known limitations",
    anchor: "limitations",
    description: "Document any known limitations that could materially affect a buyer's use of the product. This includes coverage gaps, accuracy caveats, refresh lag, data-suppression rules, minimum thresholds and any other factors a reasonable buyer would want to know.",
    goodExample: "Known limitations: dissolved companies retained for 6 years only; companies dissolved before 2010 may have incomplete filing history; approximately 2% of address records have incomplete postcode data; director data does not include residential addresses; company-name changes may have a 2–3 day lag from Companies House update.",
    poorExample: "Minor limitations apply. Nothing that affects normal use.",
    whyPoorIsBad: "Downplaying limitations prevents buyers from making informed assessments and creates liability when limitations are inevitably discovered. Transparent disclosure of limitations is a hallmark of a responsible supplier and builds long-term buyer trust.",
  },
];

export const packageReadinessChecklist: SupplierChecklistItem[] = [
  { label: "Package name is clear, descriptive and free of marketing superlatives." },
  { label: "Short description is factual, specific and tells the buyer what the product is in one or two sentences." },
  { label: "Full product overview describes data contents, structure, coverage and typical use cases in detail." },
  { label: "Product is assigned to the most appropriate marketplace category with relevant, searchable tags." },
  { label: "Geographic coverage is stated specifically — which areas are included and which are excluded." },
  { label: "Record or entity coverage is described with approximate counts or estimates where available." },
  { label: "Refresh schedule is specified — frequency, method and typical lag from source update." },
  { label: "All available delivery formats are listed with brief descriptions of each." },
  { label: "A complete field-level data dictionary is available for buyer review." },
  { label: "A representative, anonymised sample is available that does not expose sensitive data." },
  { label: "Provenance summary is complete and links to the full provenance documentation." },
  { label: "Quality-control processes are documented, and known limitations are honestly disclosed." },
  { label: "Permitted uses are listed clearly and specifically." },
  { label: "Prohibited uses are listed and cover all material risks." },
  { label: "Retention guidance is provided — how long data may be kept and the deletion expectation." },
  { label: "Sharing restrictions are clear — who may access the data and under what conditions." },
  { label: "Pricing model and price are stated clearly. If custom, the determining factors are explained." },
  { label: "Licence type, term and key obligations are stated." },
  { label: "Version history is maintained and published." },
  { label: "Support expectations are specified — contact method, response time and any limitations." },
];

export const applicationIntroSteps = [
  {
    step: 1,
    title: "Prepare your information",
    description: "Gather your organisation details, product documentation, provenance evidence and quality-control information before starting the application. The application form will ask for this information in stages, and having it ready will make the process smoother.",
  },
  {
    step: 2,
    title: "Complete the application form",
    description: "Work through the multi-stage application form, providing organisation information, product details, provenance documentation, quality and security information, and commercial preferences. You can save your progress and return later.",
  },
  {
    step: 3,
    title: "DataHarbour reviews your application",
    description: "The DataHarbour supplier-assessment team reviews your application against the supplier standards. You may be asked for additional information or clarification. This review is thorough and may take time — it is not an automated approval process.",
  },
  {
    step: 4,
    title: "Build and review your listing",
    description: "If your application is accepted, you will work with DataHarbour to build your marketplace listing. You review the listing for accuracy before it is published.",
  },
  {
    step: 5,
    title: "Publish and maintain",
    description: "Once approved, your product is published in the marketplace. You maintain the listing — updating versions, responding to access requests and keeping provenance documentation current.",
  },
];

export const applicationEligibilityChecklist: SupplierChecklistItem[] = [
  { label: "My organisation is a verifiable legal entity (registered company, partnership, public body or charity)." },
  { label: "I am authorised to submit this application on behalf of my organisation." },
  { label: "My organisation holds the legal and contractual rights to offer the proposed data product." },
  { label: "I have a documented product — or a clear product concept — that fits one of DataHarbour's accepted product types." },
  { label: "I can explain where the data comes from, how it was collected or acquired and what transformations have been applied." },
  { label: "I am willing to document permitted uses, prohibited uses and any licence or retention conditions." },
  { label: "I understand that acceptance is not guaranteed and that all applications are reviewed against DataHarbour's supplier standards." },
];

export const applicationDocumentsToPrepare: SupplierChecklistItem[] = [
  { label: "Organisation registration document or equivalent proof of legal entity status." },
  { label: "Evidence of the authorised representative's authority to act for the organisation." },
  { label: "Product description document covering data sources, fields, coverage, refresh and delivery." },
  { label: "Provenance documentation — sources, collection method, rights basis, transformations and limitations." },
  { label: "Data dictionary or schema reference for the proposed product." },
  { label: "Safe, anonymised sample data (if available)." },
  { label: "Quality-control process documentation." },
  { label: "Summary of security arrangements for data storage and delivery." },
];

export const applicationOutcomes: SupplierProcessOutcome[] = [
  {
    title: "Application received",
    description: "Your application has been received and queued for initial review. DataHarbour will confirm receipt and provide an indication of the review timeline. This is an administrative acknowledgement, not an assessment of your application's merits.",
  },
  {
    title: "More information required",
    description: "DataHarbour needs additional documentation or clarification before the review can proceed. You will be told specifically what is needed and given a timeframe to respond. This is a normal part of the process and not a negative assessment.",
  },
  {
    title: "Accepted for listing preparation",
    description: "Your application has passed initial review and you may proceed to building your marketplace listing with DataHarbour's support. This is a significant milestone, but final publication still requires listing approval.",
  },
  {
    title: "Accepted with conditions",
    description: "Your application is accepted subject to specific conditions — for example, providing additional documentation within a defined period or accepting restricted initial access levels. Conditions will be clearly explained.",
  },
  {
    title: "Declined",
    description: "Your application does not currently meet DataHarbour's supplier standards. The reasons will be explained. You may reapply if the reasons can be addressed, but resubmission does not guarantee acceptance.",
  },
];