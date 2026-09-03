// ============================================================
// DataHarbour Contact & Enquiry System — Type Definitions
// ============================================================

export type EnquiryType =
  | "buyer"
  | "supplier"
  | "enterprise"
  | "technical"
  | "compliance"
  | "security"
  | "general"
  | "data-subject";

export type EnquiryTopic =
  | "eligibility"
  | "product-suitability"
  | "provenance"
  | "package-guidelines"
  | "application-support"
  | "commercial-model"
  | "technical-delivery"
  | "general-question"
  | "partnership"
  | "media"
  | "careers"
  | "website-feedback"
  | "enterprise-membership"
  | "multi-product-licensing"
  | "api-volume"
  | "procurement"
  | "bespoke-research"
  | "clean-room-analysis"
  | "commercial-partnership"
  | "permitted-use"
  | "prohibited-use"
  | "buyer-supplier-standards"
  | "retention"
  | "sharing"
  | "high-risk-use"
  | "complaint"
  | "api-concept"
  | "auth-concept"
  | "webhooks"
  | "data-feeds"
  | "schema"
  | "secure-download"
  | "documentation"
  | "exposed-credential"
  | "access-control"
  | "data-exposure"
  | "vulnerability"
  | "suspicious-message"
  | "impersonation"
  | "access-request"
  | "correction"
  | "deletion"
  | "restriction"
  | "objection"
  | "portability"
  | "source-question"
  | "dsr-complaint"
  | "other";

export type ContactMethod = "email" | "phone" | "either";

export type ProcurementStage =
  | "exploring"
  | "evaluating"
  | "procurement-active"
  | "urgent"
  | "";

export type SecurityIssueType =
  | "exposed-credential"
  | "access-control"
  | "data-exposure"
  | "vulnerability"
  | "suspicious-message"
  | "impersonation"
  | "other";

export type DisclosurePreference = "coordinated" | "immediate" | "no-preference";

export type DsrRequestType =
  | "access"
  | "correction"
  | "deletion"
  | "restriction"
  | "objection"
  | "portability"
  | "source-question"
  | "dsr-complaint";

export type SubmissionStatus = "draft" | "submitted";

export interface ContactContext {
  type?: EnquiryType;
  topic?: string;
  package?: string;
  solution?: string;
  resource?: string;
  supplier?: string;
  source?: string;
}

export interface ContactFormConfig {
  route: string;
  label: string;
  description: string;
  audience: string;
  typicalTopics: string[];
  prepareInfo: string;
  iconName: string;
  referencePrefix: string;
  allowedTypes: EnquiryType[];
}

export interface ContactFaq {
  question: string;
  answer: string;
}

export interface ContactSubmissionReference {
  localId: string;
  enquiryType: EnquiryType;
  demonstrationReference: string;
  createdDate: string;
  submittedDate: string;
  localStatus: SubmissionStatus;
  summary: string;
}

// ---- Buyer ---- //
export interface BuyerEnquiryDraft {
  fullName: string;
  email: string;
  organisation: string;
  jobTitle: string;
  website: string;
  packageInterest: string;
  dataCategory: string;
  intendedUse: string;
  requiredGeography: string;
  preferredDelivery: string;
  estimatedVolume: string;
  desiredTiming: string;
  existingAccount: string;
  procurementRequirements: string;
  message: string;
  preferredContact: ContactMethod;
  marketingConsent: boolean;
  privacyAck: boolean;
}

// ---- Supplier ---- //
export interface SupplierEnquiryDraft {
  fullName: string;
  email: string;
  organisation: string;
  jobTitle: string;
  website: string;
  enquiryTopic: string;
  proposedProductType: string;
  productSummary: string;
  applicationReference: string;
  detailedQuestion: string;
  message: string;
  preferredContact: ContactMethod;
  marketingConsent: boolean;
  privacyAck: boolean;
}

// ---- Enterprise ---- //
export interface EnterpriseEnquiryDraft {
  fullName: string;
  email: string;
  organisation: string;
  jobTitle: string;
  orgSize: string;
  orgCountry: string;
  enquiryType: string;
  expectedUsers: string;
  productsOfInterest: string;
  estimatedUsage: string;
  procurementStage: string;
  securityReviewRequired: string;
  preferredTiming: string;
  message: string;
  preferredContact: ContactMethod;
  marketingConsent: boolean;
  privacyAck: boolean;
}

// ---- Technical ---- //
export interface TechnicalEnquiryDraft {
  fullName: string;
  email: string;
  organisation: string;
  technicalArea: string;
  relatedResource: string;
  demoPackage: string;
  environment: string;
  issueCategory: string;
  shortTitle: string;
  description: string;
  stepsTried: string;
  expectedBehaviour: string;
  observedBehaviour: string;
  runtimeInfo: string;
  errorCode: string;
  urgency: string;
  preferredContact: ContactMethod;
  marketingConsent: boolean;
  privacyAck: boolean;
}

// ---- Compliance ---- //
export interface ComplianceEnquiryDraft {
  fullName: string;
  email: string;
  organisation: string;
  role: string;
  topic: string;
  relatedContext: string;
  intendedUseSummary: string;
  question: string;
  existingAccess: string;
  localReference: string;
  preferredContact: ContactMethod;
  marketingConsent: boolean;
  privacyAck: boolean;
}

// ---- Security ---- //
export interface SecurityEnquiryDraft {
  reporterName: string;
  reporterEmail: string;
  organisation: string;
  issueType: string;
  affectedPage: string;
  description: string;
  discoveryDate: string;
  potentialImpact: string;
  isOngoing: string;
  sensitiveInvolved: string;
  safeReproduction: string;
  disclosurePreference: string;
  marketingConsent: boolean;
  privacyAck: boolean;
}

// ---- General ---- //
export interface GeneralContactDraft {
  fullName: string;
  email: string;
  organisation: string;
  topic: string;
  subject: string;
  message: string;
  preferredContact: ContactMethod;
  marketingConsent: boolean;
  privacyAck: boolean;
}

// ---- Data Subject ---- //
export interface DataSubjectRequestDraft {
  fullName: string;
  email: string;
  requestType: string;
  relationship: string;
  relevantOrg: string;
  description: string;
  preferredContact: ContactMethod;
  identityVerificationAck: boolean;
  actingForOther: string;
  authorityExplanation: string;
  marketingConsent: boolean;
  privacyAck: boolean;
}

// ---- Union of all drafts ---- //
export type ContactDraft =
  | { enquiryType: "buyer"; data: BuyerEnquiryDraft }
  | { enquiryType: "supplier"; data: SupplierEnquiryDraft }
  | { enquiryType: "enterprise"; data: EnterpriseEnquiryDraft }
  | { enquiryType: "technical"; data: TechnicalEnquiryDraft }
  | { enquiryType: "compliance"; data: ComplianceEnquiryDraft }
  | { enquiryType: "security"; data: SecurityEnquiryDraft }
  | { enquiryType: "general"; data: GeneralContactDraft }
  | { enquiryType: "data-subject"; data: DataSubjectRequestDraft };

// ---- Stored submission ---- //
export interface StoredSubmission {
  enquiryType: EnquiryType;
  reference: string;
  submittedDate: string;
  summary: string;
  data: Record<string, unknown>;
}

// ---- Form config map ---- //
export const CONTACT_FORM_CONFIGS: Record<EnquiryType, ContactFormConfig> = {
  buyer: {
    route: "/contact/buyer",
    label: "Buyer and product enquiry",
    description: "Ask about marketplace products, licensing, delivery or access requirements.",
    audience: "Buyers exploring governed data products",
    typicalTopics: ["Product access", "Licensing", "Delivery formats", "Pricing", "Use-case fit"],
    prepareInfo: "Product name, organisation details and intended business use.",
    iconName: "ri-shopping-bag-3-line",
    referencePrefix: "DH-DEMO-BUY",
    allowedTypes: ["buyer"],
  },
  supplier: {
    route: "/contact/supplier",
    label: "Supplier enquiry",
    description: "Ask about product suitability, standards, guidelines or the application process.",
    audience: "Prospective and current suppliers",
    typicalTopics: ["Product suitability", "Standards", "Package guidelines", "Application support", "Commercial models"],
    prepareInfo: "Organisation details, product type and your question.",
    iconName: "ri-store-2-line",
    referencePrefix: "DH-DEMO-SUP",
    allowedTypes: ["supplier"],
  },
  enterprise: {
    route: "/contact/enterprise",
    label: "Enterprise and commercial",
    description: "Multi-product licensing, procurement, bespoke analysis or commercial arrangements.",
    audience: "Procurement, data strategy and enterprise teams",
    typicalTopics: ["Multi-product licensing", "API or feed volume", "Bespoke research", "Clean-room analysis", "Procurement"],
    prepareInfo: "Organisation size, products of interest and procurement stage.",
    iconName: "ri-building-2-line",
    referencePrefix: "DH-DEMO-ENT",
    allowedTypes: ["enterprise"],
  },
  technical: {
    route: "/contact/technical-support",
    label: "Technical support",
    description: "API, feed, webhook, schema or integration questions for technical teams.",
    audience: "Developers, data engineers and integration teams",
    typicalTopics: ["API concepts", "Authentication", "Webhooks", "Data feeds", "Schema", "Documentation"],
    prepareInfo: "Technical area, description of the issue and steps already tried.",
    iconName: "ri-code-box-line",
    referencePrefix: "DH-DEMO-TEC",
    allowedTypes: ["technical"],
  },
  compliance: {
    route: "/contact/compliance",
    label: "Compliance enquiry",
    description: "Permitted use, provenance, buyer or supplier standards, retention or complaints.",
    audience: "Compliance, legal and governance teams",
    typicalTopics: ["Permitted use", "Provenance", "Buyer or supplier standards", "Retention", "Complaints"],
    prepareInfo: "Your role, relevant package (if any) and your question.",
    iconName: "ri-shield-check-line",
    referencePrefix: "DH-DEMO-COM",
    allowedTypes: ["compliance"],
  },
  security: {
    route: "/contact/security",
    label: "Security report",
    description: "Report a security concern, vulnerability or suspicious activity confidentially.",
    audience: "Security researchers and anyone identifying a security concern",
    typicalTopics: ["Vulnerability", "Access control", "Data exposure", "Suspicious message"],
    prepareInfo: "Description of the issue, affected area and preferred disclosure method.",
    iconName: "ri-shield-flash-line",
    referencePrefix: "DH-DEMO-SEC",
    allowedTypes: ["security"],
  },
  general: {
    route: "/contact/general",
    label: "General contact",
    description: "Partnerships, media, careers, website feedback or anything not covered above.",
    audience: "Anyone with a general enquiry",
    typicalTopics: ["Partnerships", "Media", "Careers", "Website feedback", "Other"],
    prepareInfo: "Your name, email and a clear subject line.",
    iconName: "ri-chat-3-line",
    referencePrefix: "DH-DEMO-GEN",
    allowedTypes: ["general"],
  },
  "data-subject": {
    route: "/data-subject-request",
    label: "Data-subject request",
    description: "Exercise data-subject rights: access, correction, deletion, restriction or objection.",
    audience: "Individuals exercising data-subject rights",
    typicalTopics: ["Access request", "Correction", "Deletion", "Restriction", "Objection", "Portability"],
    prepareInfo: "Your identity details and the specific request you wish to make.",
    iconName: "ri-user-settings-line",
    referencePrefix: "DH-DEMO-DSR",
    allowedTypes: ["data-subject"],
  },
};

export const CONTACT_FAQ_ITEMS: ContactFaq[] = [
  {
    question: "Which form should I use?",
    answer: "Use the Route Finder on this page, or select the card that best matches your enquiry. Buyer enquiries for product questions; Supplier for supplier-related questions; Enterprise for procurement and commercial arrangements; Technical Support for API, feed or integration questions; Compliance for provenance, permitted-use or standards questions; Security to report vulnerabilities; Data-Subject Request to exercise individual rights; General for anything else.",
  },
  {
    question: "Can I request package access here?",
    answer: "The buyer enquiry form lets you register interest in a product, but it does not grant access. Verified organisation onboarding, access requests and licence agreement will be handled in a future platform phase.",
  },
  {
    question: "Can I attach documents?",
    answer: "Document upload is not available in this demonstration phase. Secure file upload will be added in a later backend phase.",
  },
  {
    question: "Are these forms live?",
    answer: "No. All forms in this build are frontend demonstrations. Information you enter is stored only in this browser and is not transmitted to DataHarbour. Each submission creates a local reference for your records.",
  },
  {
    question: "How do I report a security concern?",
    answer: "Use the Security Report form. Provide a clear description, affected area, potential impact and your preferred disclosure method. Never include real credentials, malware or stolen data. The demonstration form is not monitored.",
  },
  {
    question: "How do I make a data-subject request?",
    answer: "Use the Data-Subject Request page. Choose your request type (access, correction, deletion, restriction, objection, portability or complaint) and provide the relevant details. In a future phase, verified identity and routing to the correct data controller will be supported.",
  },
  {
    question: "Does submitting create an account?",
    answer: "No. These demonstration forms do not create a DataHarbour account. Organisation accounts, verification and access will be available in a later phase.",
  },
];

export const ROUTE_FINDER_OPTIONS = [
  { answer: "Finding or licensing a product", mapsTo: "buyer" as EnquiryType },
  { answer: "Becoming a supplier", mapsTo: "supplier" as EnquiryType },
  { answer: "Enterprise pricing or procurement", mapsTo: "enterprise" as EnquiryType },
  { answer: "API, feed or integration question", mapsTo: "technical" as EnquiryType },
  { answer: "Responsible-use or provenance question", mapsTo: "compliance" as EnquiryType },
  { answer: "Reporting a security concern", mapsTo: "security" as EnquiryType },
  { answer: "Exercising data-subject rights", mapsTo: "data-subject" as EnquiryType },
  { answer: "Something else", mapsTo: "general" as EnquiryType },
];

export const BEFORE_CONTACT_ITEMS = [
  { icon: "ri-key-2-line", text: "Do not include passwords or API secrets." },
  { icon: "ri-user-line", text: "Do not submit unnecessary personal data." },
  { icon: "ri-database-2-line", text: "Do not send live dataset samples." },
  { icon: "ri-file-text-line", text: "Do not include confidential contract text." },
  { icon: "ri-shield-flash-line", text: "Use the Security Report form for vulnerabilities." },
  { icon: "ri-user-settings-line", text: "Use the Data-Subject Request page for rights requests." },
  { icon: "ri-information-line", text: "General contact does not grant product access." },
];

export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  buyer: "Buyer and product enquiry",
  supplier: "Supplier enquiry",
  enterprise: "Enterprise and commercial",
  technical: "Technical support",
  compliance: "Compliance enquiry",
  security: "Security report",
  general: "General contact",
  "data-subject": "Data-subject request",
};

// ---- Buyer defaults ---- //
export const BUYER_ENQUIRY_DEFAULTS: BuyerEnquiryDraft = {
  fullName: "",
  email: "",
  organisation: "",
  jobTitle: "",
  website: "",
  packageInterest: "",
  dataCategory: "",
  intendedUse: "",
  requiredGeography: "",
  preferredDelivery: "",
  estimatedVolume: "",
  desiredTiming: "",
  existingAccount: "",
  procurementRequirements: "",
  message: "",
  preferredContact: "email",
  marketingConsent: false,
  privacyAck: false,
};

export const SUPPLIER_ENQUIRY_DEFAULTS: SupplierEnquiryDraft = {
  fullName: "",
  email: "",
  organisation: "",
  jobTitle: "",
  website: "",
  enquiryTopic: "",
  proposedProductType: "",
  productSummary: "",
  applicationReference: "",
  detailedQuestion: "",
  message: "",
  preferredContact: "email",
  marketingConsent: false,
  privacyAck: false,
};

export const ENTERPRISE_ENQUIRY_DEFAULTS: EnterpriseEnquiryDraft = {
  fullName: "",
  email: "",
  organisation: "",
  jobTitle: "",
  orgSize: "",
  orgCountry: "",
  enquiryType: "",
  expectedUsers: "",
  productsOfInterest: "",
  estimatedUsage: "",
  procurementStage: "",
  securityReviewRequired: "",
  preferredTiming: "",
  message: "",
  preferredContact: "email",
  marketingConsent: false,
  privacyAck: false,
};

export const TECHNICAL_ENQUIRY_DEFAULTS: TechnicalEnquiryDraft = {
  fullName: "",
  email: "",
  organisation: "",
  technicalArea: "",
  relatedResource: "",
  demoPackage: "",
  environment: "",
  issueCategory: "",
  shortTitle: "",
  description: "",
  stepsTried: "",
  expectedBehaviour: "",
  observedBehaviour: "",
  runtimeInfo: "",
  errorCode: "",
  urgency: "",
  preferredContact: "email",
  marketingConsent: false,
  privacyAck: false,
};

export const COMPLIANCE_ENQUIRY_DEFAULTS: ComplianceEnquiryDraft = {
  fullName: "",
  email: "",
  organisation: "",
  role: "",
  topic: "",
  relatedContext: "",
  intendedUseSummary: "",
  question: "",
  existingAccess: "",
  localReference: "",
  preferredContact: "email",
  marketingConsent: false,
  privacyAck: false,
};

export const SECURITY_ENQUIRY_DEFAULTS: SecurityEnquiryDraft = {
  reporterName: "",
  reporterEmail: "",
  organisation: "",
  issueType: "",
  affectedPage: "",
  description: "",
  discoveryDate: "",
  potentialImpact: "",
  isOngoing: "",
  sensitiveInvolved: "",
  safeReproduction: "",
  disclosurePreference: "",
  marketingConsent: false,
  privacyAck: false,
};

export const GENERAL_CONTACT_DEFAULTS: GeneralContactDraft = {
  fullName: "",
  email: "",
  organisation: "",
  topic: "",
  subject: "",
  message: "",
  preferredContact: "email",
  marketingConsent: false,
  privacyAck: false,
};

export const DATA_SUBJECT_REQUEST_DEFAULTS: DataSubjectRequestDraft = {
  fullName: "",
  email: "",
  requestType: "",
  relationship: "",
  relevantOrg: "",
  description: "",
  preferredContact: "email",
  identityVerificationAck: false,
  actingForOther: "no",
  authorityExplanation: "",
  marketingConsent: false,
  privacyAck: false,
};

export const DSR_REQUEST_TYPE_OPTIONS = [
  { value: "access", label: "Access — request a copy of data held about you" },
  { value: "correction", label: "Correction — request inaccurate data be corrected" },
  { value: "deletion", label: "Deletion — request your data be deleted" },
  { value: "restriction", label: "Restriction — request processing be restricted" },
  { value: "objection", label: "Objection — object to certain processing" },
  { value: "portability", label: "Portability — request data in a portable format" },
  { value: "source-question", label: "Source question — ask where data originated" },
  { value: "dsr-complaint", label: "Complaint — raise a data-protection concern" },
];

export const TECH_AREA_OPTIONS = [
  { value: "", label: "Select area..." },
  { value: "api-concept", label: "API concept" },
  { value: "auth-concept", label: "Authentication concept" },
  { value: "webhooks", label: "Webhooks" },
  { value: "data-feeds", label: "Data feeds" },
  { value: "schema", label: "Schema" },
  { value: "secure-download", label: "Secure download" },
  { value: "documentation", label: "Documentation" },
  { value: "other", label: "Other" },
];

export const SECURITY_ISSUE_TYPE_OPTIONS = [
  { value: "", label: "Select issue type..." },
  { value: "exposed-credential", label: "Exposed credential" },
  { value: "access-control", label: "Access-control concern" },
  { value: "data-exposure", label: "Data exposure concern" },
  { value: "vulnerability", label: "Vulnerability" },
  { value: "suspicious-message", label: "Suspicious message" },
  { value: "impersonation", label: "Impersonation" },
  { value: "other", label: "Other" },
];

export const DISCLOSURE_PREFERENCE_OPTIONS = [
  { value: "", label: "Select preference..." },
  { value: "coordinated", label: "Coordinated disclosure" },
  { value: "immediate", label: "Immediate disclosure" },
  { value: "no-preference", label: "No preference" },
];

export const PROCUREMENT_STAGE_OPTIONS = [
  { value: "", label: "Select stage..." },
  { value: "exploring", label: "Exploring" },
  { value: "evaluating", label: "Evaluating providers" },
  { value: "procurement-active", label: "Procurement active" },
  { value: "urgent", label: "Urgent requirement" },
];

export const ENTERPRISE_ENQUIRY_TYPE_OPTIONS = [
  { value: "", label: "Select enquiry type..." },
  { value: "enterprise-membership", label: "Enterprise membership" },
  { value: "multi-product-licensing", label: "Multi-product licensing" },
  { value: "api-volume", label: "API or feed volume" },
  { value: "procurement", label: "Procurement" },
  { value: "bespoke-research", label: "Bespoke research" },
  { value: "clean-room-analysis", label: "Clean-room analysis" },
  { value: "commercial-partnership", label: "Commercial partnership" },
  { value: "other", label: "Other" },
];

export const SUPPLIER_ENQUIRY_TOPIC_OPTIONS = [
  { value: "", label: "Select topic..." },
  { value: "eligibility", label: "Eligibility" },
  { value: "product-suitability", label: "Product suitability" },
  { value: "provenance", label: "Provenance" },
  { value: "package-guidelines", label: "Package guidelines" },
  { value: "application-support", label: "Application support" },
  { value: "commercial-model", label: "Commercial model" },
  { value: "technical-delivery", label: "Technical delivery" },
  { value: "other", label: "Other" },
];

export const COMPLIANCE_TOPIC_OPTIONS = [
  { value: "", label: "Select topic..." },
  { value: "permitted-use", label: "Permitted use" },
  { value: "prohibited-use", label: "Prohibited use" },
  { value: "provenance", label: "Provenance" },
  { value: "buyer-supplier-standards", label: "Buyer or supplier standards" },
  { value: "retention", label: "Retention" },
  { value: "sharing", label: "Sharing" },
  { value: "high-risk-use", label: "High-risk use" },
  { value: "complaint", label: "Complaint" },
  { value: "other", label: "Other" },
];

export const GENERAL_TOPIC_OPTIONS = [
  { value: "", label: "Select topic..." },
  { value: "general-question", label: "General question" },
  { value: "partnership", label: "Partnership" },
  { value: "media", label: "Media" },
  { value: "careers", label: "Careers" },
  { value: "website-feedback", label: "Website feedback" },
  { value: "other", label: "Other" },
];

export const VALID_QUERY_TYPES: EnquiryType[] = ["buyer", "supplier", "enterprise", "technical", "compliance", "security", "general", "data-subject"];