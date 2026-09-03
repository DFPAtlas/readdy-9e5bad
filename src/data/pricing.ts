export interface PricingFaqItem {
  question: string;
  answer: string;
}

export interface PricingFeature {
  name: string;
  included: boolean;
  planned?: boolean;
  note?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  audience: string;
  description: string;
  monthlyDisplay: string | null;
  annualDisplay: string | null;
  billingNote: string;
  featured: boolean;
  featuredLabel?: string;
  features: PricingFeature[];
  limitations: string[];
  ctaLabel: string;
  ctaRoute: string;
  status: "Demonstration pricing" | "Planned" | "Contact sales" | "Subject to agreement";
}

export interface ProductPricingModel {
  id: string;
  name: string;
  whatIsCharged: string;
  typicalUse: string;
  billingFrequency: string;
  commonVariables: string;
  questionsToAsk: string;
  exampleDisplay: string;
}

export interface UsageTier {
  min: number;
  max: number | null;
  unitPrice: number;
  label: string;
}

export interface UsageTierConfig {
  basis: string;
  unit: string;
  tiers: UsageTier[];
  supportLevels: { id: string; label: string; multiplier: number }[];
  currencies: string[];
  vatRate: number;
}

export interface CommercialScenario {
  id: string;
  title: string;
  need: string;
  pricingLayers: string[];
  subjectToReview: string[];
  whyVaries: string;
}

export interface EnterpriseCapability {
  name: string;
  description: string;
  status: "Available" | "Planned" | "Contact sales";
}

export interface SupplierCommercialOption {
  id: string;
  name: string;
  description: string;
  status: "Available" | "Planned" | "Subject to agreement";
}

export interface BillingGlossaryTerm {
  term: string;
  definition: string;
}

export interface EnquiryType {
  value: string;
  label: string;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "discover",
    name: "Discover",
    audience: "Small organisations and teams exploring the marketplace",
    description:
      "Browse the public catalogue, compare packages, view samples and documentation. A free starting point for organisations evaluating governed data products.",
    monthlyDisplay: "£0",
    annualDisplay: null,
    billingNote: "Free demonstration tier",
    featured: false,
    features: [
      { name: "Browse public catalogue", included: true },
      { name: "Save packages locally", included: true, planned: true },
      { name: "Compare up to 3 packages", included: true },
      { name: "View public samples", included: true },
      { name: "Read documentation", included: true },
      { name: "Submit general enquiries", included: true },
      { name: "Live product access", included: false },
      { name: "API keys", included: false },
      { name: "Team administration", included: false },
      { name: "Compliance workspace", included: false },
      { name: "Access-request tracking", included: false },
      { name: "Billing centre", included: false },
      { name: "Standard support", included: false },
    ],
    limitations: [
      "No live product access",
      "No API keys",
      "No team administration",
      "No compliance workspace",
      "Product charges remain separate",
    ],
    ctaLabel: "Browse Marketplace",
    ctaRoute: "/marketplace",
    status: "Demonstration pricing",
  },
  {
    id: "professional",
    name: "Professional",
    audience: "Verified organisations buying individual products",
    description:
      "Organisation workspace with team access, licence tracking, billing centre and standard support. Designed for teams purchasing governed data products with controlled access.",
    monthlyDisplay: "£249",
    annualDisplay: "£2,390",
    billingNote: "Demonstration pricing — excludes product charges",
    featured: true,
    featuredLabel: "Suggested for growing teams",
    features: [
      { name: "Browse public catalogue", included: true },
      { name: "Organisation workspace", included: true, planned: true },
      { name: "Up to 5 team members", included: true, planned: true },
      { name: "Save and compare packages", included: true, planned: true },
      { name: "View public samples", included: true },
      { name: "Access-request tracking", included: true, planned: true },
      { name: "Licence and delivery records", included: true, planned: true },
      { name: "Basic API-usage view", included: true, planned: true },
      { name: "Billing and renewal centre", included: true, planned: true },
      { name: "Standard support", included: true, planned: true },
      { name: "Advanced role controls", included: false },
      { name: "Procurement support", included: false },
      { name: "Custom API arrangements", included: false },
      { name: "Enhanced support", included: false },
      { name: "Clean-room analysis", included: false },
    ],
    limitations: [
      "Data products charged separately",
      "Some products require further review",
      "Usage limits may apply",
      "Enterprise features excluded",
    ],
    ctaLabel: "Discuss Professional Access",
    ctaRoute: "/contact?type=pricing&topic=professional",
    status: "Demonstration pricing",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Larger organisations with procurement, governance or integration needs",
    description:
      "Multi-team access, advanced role controls, procurement support, centralised compliance records, custom API arrangements and dedicated support. Designed for organisations scaling governed data usage.",
    monthlyDisplay: null,
    annualDisplay: null,
    billingNote: "",
    featured: false,
    features: [
      { name: "Browse public catalogue", included: true },
      { name: "Organisation workspace", included: true, planned: true },
      { name: "Larger team access", included: true },
      { name: "Multiple departments or workspaces", included: true },
      { name: "Save and compare packages", included: true, planned: true },
      { name: "View public samples", included: true },
      { name: "Access-request tracking", included: true, planned: true },
      { name: "Licence and delivery records", included: true, planned: true },
      { name: "API-usage view", included: true, planned: true },
      { name: "Billing and renewal centre", included: true, planned: true },
      { name: "Advanced role controls", included: true, planned: true },
      { name: "Procurement support", included: true },
      { name: "Centralised compliance records", included: true, planned: true },
      { name: "Custom API and feed arrangements", included: true },
      { name: "Enhanced support", included: true },
      { name: "Contract and renewal coordination", included: true },
      { name: "Usage reporting", included: true, planned: true },
      { name: "Optional clean-room or bespoke analysis", included: true },
    ],
    limitations: [
      "Data products charged separately",
      "Some products require further review",
      "Pricing subject to agreement",
    ],
    ctaLabel: "Contact Enterprise Sales",
    ctaRoute: "/contact?type=enterprise&topic=pricing",
    status: "Contact sales",
  },
];

export const productPricingModels: ProductPricingModel[] = [
  {
    id: "subscription",
    name: "Subscription",
    whatIsCharged: "Recurring access to a product for a defined period.",
    typicalUse: "Ongoing access to regularly refreshed datasets, APIs or feeds.",
    billingFrequency: "Monthly or annual.",
    commonVariables: "Record count, update frequency, concurrent users, support tier.",
    questionsToAsk: "What is included in the base allowance? Are overage charges applicable?",
    exampleDisplay: "Illustrative: £500/month for quarterly-refreshed UK business dataset with up to 5 users.",
  },
  {
    id: "per-api-request",
    name: "Per API request",
    whatIsCharged: "Each API call or query made against the product endpoint.",
    typicalUse: "On-demand data enrichment, verification or lookup services.",
    billingFrequency: "Monthly in arrears or pre-paid credit.",
    commonVariables: "Request type (simple or complex), response size, caching eligibility.",
    questionsToAsk: "Are there tiered rates? Is there a monthly minimum? Are failed requests counted?",
    exampleDisplay: "Illustrative: £0.05 per standard lookup, tiered after 10,000 monthly requests.",
  },
  {
    id: "per-record",
    name: "Per record",
    whatIsCharged: "Each record, row or entity accessed or delivered.",
    typicalUse: "Bulk data acquisition, lead lists or record-level intelligence.",
    billingFrequency: "Per delivery or monthly.",
    commonVariables: "Record type, attribute count, refresh rights, onward-use scope.",
    questionsToAsk: "What defines a record? Are partial or empty records counted? Is there a minimum order?",
    exampleDisplay: "Illustrative: £0.12 per verified business record, minimum 5,000 records.",
  },
  {
    id: "usage-based",
    name: "Usage based",
    whatIsCharged: "Measured consumption — requests, compute, volume or derived output.",
    typicalUse: "Platforms, analytics workloads or variable-demand services.",
    billingFrequency: "Monthly in arrears.",
    commonVariables: "Measurement unit, tier structure, commit levels, burst allowances.",
    questionsToAsk: "How is usage measured and reported? Are there commit discounts?",
    exampleDisplay: "Illustrative: £0.008 per compute unit, first 1,000 units included per month.",
  },
  {
    id: "package-licence",
    name: "Package licence",
    whatIsCharged: "A defined dataset or product package for a fixed term.",
    typicalUse: "Specific research datasets, market reports or reference data.",
    billingFrequency: "One-off or annual renewal.",
    commonVariables: "Licence term, user count, geographic scope, derived-output rights.",
    questionsToAsk: "Can the licence be renewed? Are updates included? What happens after expiry?",
    exampleDisplay: "Illustrative: £3,500 for 12-month UK property risk dataset licence, single department.",
  },
  {
    id: "scheduled-feed",
    name: "Scheduled-feed licence",
    whatIsCharged: "Regularly delivered data via SFTP, cloud storage or feed endpoint.",
    typicalUse: "Periodic bulk data ingestion for internal systems.",
    billingFrequency: "Monthly, quarterly or annual.",
    commonVariables: "Frequency, volume per delivery, format, delivery method.",
    questionsToAsk: "What is the delivery schedule? Is historical backfill available?",
    exampleDisplay: "Illustrative: £800/month for weekly business-change feed, up to 50,000 records per delivery.",
  },
  {
    id: "report-purchase",
    name: "Report purchase",
    whatIsCharged: "A single research report, analysis or intelligence document.",
    typicalUse: "Market research, industry analysis or one-off insight reports.",
    billingFrequency: "One-off purchase.",
    commonVariables: "Report scope, update frequency, redistribution rights.",
    questionsToAsk: "Will the report be updated? Are extracts shareable internally?",
    exampleDisplay: "Illustrative: £950 for UK retail footfall analysis report, single-organisation licence.",
  },
  {
    id: "project-based",
    name: "Project based",
    whatIsCharged: "A defined project scope with deliverables and timeline.",
    typicalUse: "Bespoke analysis, modelling or custom data preparation.",
    billingFrequency: "Milestone or project completion.",
    commonVariables: "Scope, duration, deliverables, team involvement.",
    questionsToAsk: "How is scope managed? What happens if requirements change?",
    exampleDisplay: "Illustrative: £12,000 for 6-week customer segmentation project with delivered dataset and methodology report.",
  },
  {
    id: "audience-segment",
    name: "Audience segment",
    whatIsCharged: "A defined audience or segment for activation or analysis.",
    typicalUse: "Marketing, advertising or audience intelligence.",
    billingFrequency: "Per segment or campaign.",
    commonVariables: "Segment size, attributes, activation channels, duration.",
    questionsToAsk: "How is the segment defined and measured? Are there usage restrictions?",
    exampleDisplay: "Illustrative: £0.15 per matched profile, minimum segment 10,000 profiles.",
  },
  {
    id: "enterprise-agreement",
    name: "Enterprise agreement",
    whatIsCharged: "Multi-product, multi-year negotiated agreement.",
    typicalUse: "Organisations with ongoing, cross-department data needs.",
    billingFrequency: "Annual or multi-year, invoiced.",
    commonVariables: "Products, volume, users, support, custom terms.",
    questionsToAsk: "What is the minimum commitment? How are additional products added?",
    exampleDisplay: "Contact sales — pricing reflects product mix, volume and term.",
  },
  {
    id: "bespoke-analysis",
    name: "Bespoke analysis",
    whatIsCharged: "Custom research or analytical work scoped to requirements.",
    typicalUse: "Specialised modelling, data science or insight projects.",
    billingFrequency: "Project or milestone based.",
    commonVariables: "Scope, methodology, data sources, deliverables, timeline.",
    questionsToAsk: "Who owns the outputs? Can methodology be shared?",
    exampleDisplay: "Contact sales — pricing reflects scope, complexity and required expertise.",
  },
  {
    id: "clean-room",
    name: "Clean-room analysis",
    whatIsCharged: "Secure environment for analysing combined datasets without raw data exposure.",
    typicalUse: "Cross-organisation analysis, privacy-safe matching or joint insight projects.",
    billingFrequency: "Per project or subscription.",
    commonVariables: "Environment duration, compute usage, participant count, output approval.",
    questionsToAsk: "How are outputs reviewed before release? What compute is included?",
    exampleDisplay: "Contact sales — pricing depends on environment scope, duration and compute requirements.",
  },
];

export const usageCalculatorConfigs: Record<string, UsageTierConfig> = {
  api: {
    basis: "API requests",
    unit: "requests",
    tiers: [
      { min: 0, max: 10000, unitPrice: 0.06, label: "First 10,000 requests" },
      { min: 10000, max: 50000, unitPrice: 0.04, label: "Next 40,000 requests" },
      { min: 50000, max: null, unitPrice: 0.025, label: "Usage above 50,000 requests" },
    ],
    supportLevels: [
      { id: "standard", label: "Standard support (included)", multiplier: 0 },
      { id: "enhanced", label: "Enhanced support (+15%)", multiplier: 0.15 },
      { id: "premium", label: "Premium support (+25%)", multiplier: 0.25 },
    ],
    currencies: ["GBP"],
    vatRate: 0.2,
  },
  records: {
    basis: "Records",
    unit: "records",
    tiers: [
      { min: 0, max: 25000, unitPrice: 0.15, label: "First 25,000 records" },
      { min: 25000, max: 100000, unitPrice: 0.10, label: "Next 75,000 records" },
      { min: 100000, max: null, unitPrice: 0.07, label: "Usage above 100,000 records" },
    ],
    supportLevels: [
      { id: "standard", label: "Standard support (included)", multiplier: 0 },
      { id: "enhanced", label: "Enhanced support (+15%)", multiplier: 0.15 },
      { id: "premium", label: "Premium support (+25%)", multiplier: 0.25 },
    ],
    currencies: ["GBP"],
    vatRate: 0.2,
  },
  feed: {
    basis: "Monthly feed",
    unit: "deliveries",
    tiers: [
      { min: 0, max: 1, unitPrice: 600, label: "Single monthly feed" },
      { min: 1, max: 4, unitPrice: 450, label: "Weekly feed (2-4 per month)" },
      { min: 4, max: null, unitPrice: 350, label: "Daily feed (5+ per month)" },
    ],
    supportLevels: [
      { id: "standard", label: "Standard support (included)", multiplier: 0 },
      { id: "enhanced", label: "Enhanced support (+15%)", multiplier: 0.15 },
      { id: "premium", label: "Premium support (+25%)", multiplier: 0.25 },
    ],
    currencies: ["GBP"],
    vatRate: 0.2,
  },
  fixed: {
    basis: "Fixed package",
    unit: "package",
    tiers: [
      { min: 0, max: 1, unitPrice: 3500, label: "Annual package licence" },
      { min: 1, max: null, unitPrice: 2800, label: "Additional packages" },
    ],
    supportLevels: [
      { id: "standard", label: "Standard support (included)", multiplier: 0 },
      { id: "enhanced", label: "Enhanced support (+15%)", multiplier: 0.15 },
      { id: "premium", label: "Premium support (+25%)", multiplier: 0.25 },
    ],
    currencies: ["GBP"],
    vatRate: 0.2,
  },
};

export const commercialScenarios: CommercialScenario[] = [
  {
    id: "small-research",
    title: "Small research team",
    need: "A university research group needs one market-intelligence report for a funded project.",
    pricingLayers: [
      "Discover membership: £0",
      "Single report purchase: illustrative £950",
      "No ongoing subscription required",
    ],
    subjectToReview: [
      "Academic-use verification",
      "Redistribution restrictions",
      "Attribution requirements",
    ],
    whyVaries: "Report pricing depends on scope, update recency and whether a site licence is needed.",
  },
  {
    id: "growing-saas",
    title: "Growing SaaS company",
    need: "A B2B SaaS company needs ongoing API-based company verification for customer onboarding.",
    pricingLayers: [
      "Professional membership: illustrative £249/month",
      "API usage: illustrative £0.05 per verification, tiered after 10,000 monthly",
      "Estimated 25,000 verifications/month: ~£850 in API charges",
    ],
    subjectToReview: [
      "Intended-use declaration",
      "Data-retention commitment",
      "Buyer verification",
    ],
    whyVaries: "API pricing depends on request type, caching, volume commitment and whether response data is stored.",
  },
  {
    id: "multi-site-retailer",
    title: "Multi-site retailer",
    need: "A national retailer needs weekly location-intelligence feeds for 200+ sites plus larger team access.",
    pricingLayers: [
      "Professional or Enterprise membership: illustrative £249-Contact sales/month",
      "Weekly location feed: illustrative £800/month",
      "Larger team and department workspace: Enterprise add-on",
    ],
    subjectToReview: [
      "Location-intelligence use restrictions",
      "Site-count verification",
      "Refresh and update terms",
    ],
    whyVaries: "Feed pricing depends on geography, attribute depth, delivery format and whether historical data is included.",
  },
  {
    id: "enterprise-risk",
    title: "Enterprise risk team",
    need: "A financial-services risk team needs several governed products, centralised compliance records and negotiated support.",
    pricingLayers: [
      "Enterprise membership: Contact sales",
      "Multiple product licences: individually priced per product",
      "Central compliance records: included in Enterprise",
      "Enhanced support and custom API: Enterprise add-on",
    ],
    subjectToReview: [
      "Procurement and security review",
      "Regulatory-use compliance",
      "Multi-year agreement terms",
    ],
    whyVaries: "Enterprise pricing reflects product mix, user count, volume, support needs and contract duration.",
  },
];

export const enterpriseCapabilities: EnterpriseCapability[] = [
  { name: "Multi-team access", description: "Separate workspaces for departments, regions or business units.", status: "Planned" },
  { name: "Procurement and security review", description: "Dedicated review pathway for vendor onboarding and security assessment.", status: "Contact sales" },
  { name: "Custom licences", description: "Bespoke terms for multi-product, multi-year or unusual use cases.", status: "Contact sales" },
  { name: "Large-volume API or feed pricing", description: "Negotiated rates for high-volume consumption.", status: "Contact sales" },
  { name: "Data integration support", description: "Technical assistance for connecting DataHarbour products to internal systems.", status: "Planned" },
  { name: "Custom retention or delivery", description: "Extended retention or custom delivery schedules where supplier terms permit.", status: "Contact sales" },
  { name: "Clean-room analysis", description: "Secure environment for privacy-safe cross-organisation analysis.", status: "Planned" },
  { name: "Dedicated support", description: "Named contacts, priority response and regular review meetings.", status: "Contact sales" },
  { name: "Contract reporting", description: "Consolidated usage, licence and renewal reporting across products.", status: "Planned" },
  { name: "Renewal coordination", description: "Proactive management of expiring licences and renewal terms.", status: "Planned" },
  { name: "Bespoke research", description: "Commissioned analysis, modelling or insight projects.", status: "Contact sales" },
];

export const supplierCommercialOptions: SupplierCommercialOption[] = [
  { id: "revenue-share", name: "Revenue share", description: "DataHarbour retains an agreed percentage of product revenue. Payment schedules, rates and deductions require contract terms.", status: "Subject to agreement" },
  { id: "fixed-distribution", name: "Fixed distribution agreement", description: "Products are licensed to DataHarbour for distribution at agreed pricing with fixed periodic supplier payments.", status: "Subject to agreement" },
  { id: "direct-licence", name: "Direct supplier licence with platform service fee", description: "Supplier licenses directly to the buyer; DataHarbour charges a platform service fee for marketplace, governance and delivery services.", status: "Subject to agreement" },
  { id: "project-fee", name: "Project fee", description: "Supplier delivers a defined project or report; payment is scoped, agreed and processed through the platform.", status: "Subject to agreement" },
  { id: "usage-based-supplier", name: "Usage-based supplier payment", description: "Supplier is paid based on measured consumption with reporting and settlement schedules agreed during onboarding.", status: "Planned" },
  { id: "enterprise-negotiation", name: "Enterprise negotiation", description: "Complex or high-value supplier arrangements are negotiated directly with DataHarbour commercial teams.", status: "Contact sales" },
  { id: "bespoke-research-arrangement", name: "Bespoke research arrangement", description: "Custom research, analysis or modelling projects are scoped, priced and contracted separately.", status: "Subject to agreement" },
];

export const billingPrinciples: string[] = [
  "Charges are shown before purchase or contract.",
  "Product and membership charges are separated.",
  "Taxes are shown where applicable.",
  "Usage is measured using defined units.",
  "Renewal dates are recorded.",
  "Material price changes are communicated before renewal.",
  "Access may end when licences expire.",
  "Cancellation does not override existing usage or retention duties.",
  "Failed payments may suspend paid services.",
  "Refund eligibility depends on applicable terms.",
  "Enterprise agreements may use invoices.",
  "Supplier payouts require separate terms.",
];

export const billingGlossaryTerms: BillingGlossaryTerm[] = [
  { term: "Minimum commitment", definition: "The smallest duration or spend a buyer agrees to when purchasing a product or plan. May be one month, one year or multi-year depending on the product and agreement." },
  { term: "Included allowance", definition: "The volume of usage, requests or records included in the base price before additional charges apply. Clearly stated in product descriptions and order summaries." },
  { term: "Overage", definition: "Usage that exceeds the included allowance and is charged at an agreed rate. Overage rates and measurement methods are set in product terms." },
  { term: "Setup fee", definition: "A one-off charge for initial configuration, integration or onboarding. Not all products require a setup fee; where applicable it is disclosed before agreement." },
  { term: "Renewal", definition: "The continuation of a licence or subscription after the initial term. Renewal pricing, notice periods and terms are agreed at the start of each term." },
  { term: "Cancellation notice", definition: "The period of advance notice required to end a subscription or recurring licence. Notice periods vary by product and agreement type." },
  { term: "Licence expiry", definition: "The date after which access to a data product ends unless renewed. Buyers should plan for data extraction or transition before expiry where retention is not permanent." },
];

export const enquiryTypes: EnquiryType[] = [
  { value: "professional-membership", label: "Professional membership" },
  { value: "enterprise-membership", label: "Enterprise membership" },
  { value: "product-pricing", label: "Product pricing" },
  { value: "api-feed-pricing", label: "API or feed pricing" },
  { value: "bespoke-research", label: "Bespoke research" },
  { value: "supplier-commercial", label: "Supplier commercial question" },
  { value: "other", label: "Other" },
];

export const teamSizeRanges = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-1000", label: "201-1,000" },
  { value: "1000-plus", label: "1,000+" },
];

export const procurementTimingOptions = [
  { value: "immediate", label: "Immediate — within 30 days" },
  { value: "short-term", label: "Short term — 1 to 3 months" },
  { value: "medium-term", label: "Medium term — 3 to 6 months" },
  { value: "exploratory", label: "Exploratory — researching options" },
];

export const pricingFaqs: PricingFaqItem[] = [
  {
    question: "Does membership include marketplace data?",
    answer: "No. Organisation membership supports account, team and platform features. Individual data-product charges are separate and set per product. A membership does not automatically include access to any marketplace data product.",
  },
  {
    question: "Are all products subscription based?",
    answer: "No. DataHarbour is designed to support multiple commercial models, including subscriptions, per-API-request pricing, per-record pricing, one-off report purchases, project-based work, usage-based charging and enterprise agreements. The appropriate model depends on the product type, delivery method and supplier preference.",
  },
  {
    question: "How is API usage charged?",
    answer: "API products typically use tiered per-request pricing. An illustrative example: £0.06 per request for the first 10,000 monthly requests, £0.04 for the next 40,000, and £0.025 above 50,000. Actual rates, tier structures, minimums and measurement definitions are set per product. Use the illustrative calculator on this page for a demonstration estimate.",
  },
  {
    question: "Are prices inclusive of VAT?",
    answer: "Displayed demonstration prices may be shown excluding VAT unless stated otherwise. VAT will be applied at the applicable rate where required. The illustrative calculator on this page includes a VAT display toggle for estimation purposes only.",
  },
  {
    question: "Can products have minimum terms?",
    answer: "Some products may include minimum commitment periods, particularly annual licences, enterprise agreements and custom projects. Minimum terms are stated in product descriptions and order summaries before agreement.",
  },
  {
    question: "Are samples free?",
    answer: "Where suppliers provide public samples, they are available for review at no charge through the marketplace. Samples are typically anonymised, truncated or representative extracts designed to help buyers evaluate a product before purchase. Access to full products requires a commercial agreement.",
  },
  {
    question: "Is enterprise pricing negotiable?",
    answer: "Yes. Enterprise pricing is discussed directly with DataHarbour. Pricing reflects product mix, volume, user count, support requirements and contract duration. Use the enterprise enquiry form or contact the team to start a discussion.",
  },
  {
    question: "Can a supplier choose its pricing model?",
    answer: "Suppliers propose commercial models during onboarding. DataHarbour reviews these proposals alongside product type, delivery, rights, quality and market expectations. Final commercial terms are agreed during supplier onboarding and may be refined over time.",
  },
  {
    question: "Does supplier acceptance guarantee revenue?",
    answer: "No. Acceptance as a DataHarbour supplier does not guarantee sales, buyer interest or revenue. DataHarbour provides the marketplace, governance and delivery infrastructure. Buyer demand, product suitability and commercial terms determine purchase outcomes.",
  },
  {
    question: "Can access continue after a licence ends?",
    answer: "Generally no. Access to data products ends when the applicable licence, subscription or agreement expires unless renewal is arranged. Buyers should plan data extraction or transition before expiry where retention is not permanent. Some products may include post-term data-deletion requirements.",
  },
  {
    question: "Are the displayed prices final?",
    answer: "No. All prices, allowances and commercial examples on this page are illustrative demonstration figures. Final pricing, taxes, supplier charges, minimum commitments and contract terms may differ and will be confirmed before any agreement.",
  },
  {
    question: "When will live billing be available?",
    answer: "Live billing, payment processing and subscription management are planned for a future platform phase. The pricing page currently demonstrates the intended commercial structure. Contact the DataHarbour team to discuss timing and current availability.",
  },
];