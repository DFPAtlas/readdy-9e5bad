// ─── Supplier Application Data Model ────────────────────────────────

export type LocalAppStatus = "draft" | "ready_for_review" | "demonstration_submitted" | "revised_draft";
export type YesNoOption = "yes" | "no" | "needs_discussion";
export type OrganisationType =
  | "limited_company"
  | "plc"
  | "partnership"
  | "llp"
  | "sole_trader"
  | "charity"
  | "public_body"
  | "research_institution"
  | "other";
export type DataRelationship = "owner" | "originator" | "authorised_reseller" | "processor" | "other";
export type ProductType =
  | "api"
  | "scheduled_feed"
  | "secure_download"
  | "dataset"
  | "dashboard"
  | "research_report"
  | "audience_segment"
  | "aggregated_intelligence"
  | "verification_product"
  | "clean_room_analysis"
  | "bespoke_analysis"
  | "other";
export type ProductStatus =
  | "in_development"
  | "existing_internal"
  | "existing_commercial"
  | "existing_other_marketplace"
  | "existing_direct";
export type ExclusivityOption = "none" | "limited" | "discussion_required";
export type SourceCategory =
  | "first_party"
  | "public"
  | "licensed_third_party"
  | "derived"
  | "modelled"
  | "aggregated"
  | "mixed";
export type RefreshFrequency =
  | "real_time"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "annually"
  | "ad_hoc"
  | "one_off"
  | "other";
export type OwnershipPosition =
  | "owner"
  | "exclusive_licensee"
  | "non_exclusive_licensee"
  | "authorised_distributor"
  | "other";
export type CertificationStatus = "none" | "in_progress" | "obtained" | "expired";
export type DeliveryFormat =
  | "api_rest"
  | "api_graphql"
  | "secure_download"
  | "sftp"
  | "email_feed"
  | "dashboard"
  | "report_pdf"
  | "clean_room"
  | "other";
export type PricingModel =
  | "subscription"
  | "per_record"
  | "per_request"
  | "usage_based"
  | "package_licence"
  | "project_based"
  | "enterprise"
  | "revenue_share"
  | "fixed_distribution"
  | "bespoke";
export type DocumentType =
  | "organisation_evidence"
  | "rights_licence_evidence"
  | "provenance_document"
  | "data_dictionary"
  | "sample_schema"
  | "quality_policy"
  | "security_overview"
  | "incident_response_summary"
  | "insurance_evidence"
  | "certification_evidence"
  | "other";
export type ConfidentialityClassification = "none" | "confidential" | "strictly_confidential";

// ─── Repeatable sub-records ─────────────────────────────────────────

export interface SourceItem {
  id: string;
  name: string;
  sourceCategory: SourceCategory;
  provider: string;
  rightsSummary: string;
  geography: string;
  refresh: RefreshFrequency;
  transformation: string;
  restrictions: string;
  evidence: string;
}

export interface QualityCheckItem {
  id: string;
  name: string;
  frequency: string;
  method: string;
  failureAction: string;
  owner: string;
}

export interface DocumentMetadataItem {
  id: string;
  documentType: DocumentType;
  displayFilename: string;
  description: string;
  documentDate: string;
  expiryDate: string;
  classification: ConfidentialityClassification;
  readyToProvide: boolean;
}

export interface CertificationItem {
  id: string;
  name: string;
  status: CertificationStatus;
  expiryDate: string;
}

// ─── Stage group types ──────────────────────────────────────────────

export interface EligibilityGroup {
  registeredOrganisation: YesNoOption;
  authorisedRepresentative: YesNoOption;
  canExplainOrigin: YesNoOption;
  canDemonstrateRights: YesNoOption;
  canDocumentQuality: YesNoOption;
  canSupportSecurity: YesNoOption;
  notStolenOrLeaked: YesNoOption;
  legitimateBusinessUse: YesNoOption;
}

export interface OrganisationGroup {
  legalName: string;
  tradingName: string;
  organisationType: OrganisationType | "";
  registrationCountry: string;
  registrationNumber: string;
  registeredCity: string;
  website: string;
  mainActivity: string;
  yearEstablished: string;
  employeeRange: string;
  existingDataProducts: string;
  dataRelationship: DataRelationship | "";
  generalEmail: string;
  generalPhone: string;
}

export interface RepresentativeGroup {
  fullName: string;
  jobTitle: string;
  workEmail: string;
  workPhone: string;
  department: string;
  authorityToSubmit: boolean;
  isPrimaryContact: boolean;
  isComplianceContact: boolean;
  isTechnicalContact: boolean;
  isCommercialContact: boolean;
  complianceContactName: string;
  complianceContactEmail: string;
  technicalContactName: string;
  technicalContactEmail: string;
  commercialContactName: string;
  commercialContactEmail: string;
  sameAsPrimaryCompliance: boolean;
  sameAsPrimaryTechnical: boolean;
  sameAsPrimaryCommercial: boolean;
}

export interface ProductGroup {
  productName: string;
  productType: ProductType | "";
  primaryCategory: string;
  secondaryCategory: string;
  shortDescription: string;
  fullDescription: string;
  businessProblem: string;
  intendedBuyers: string;
  typicalUseCases: string;
  geographicCoverage: string;
  coverageNotes: string;
  estimatedCoverage: string;
  historicalDepth: string;
  productStatus: ProductStatus | "";
  existingAvailability: string;
  exclusivity: ExclusivityOption;
  knownLimitations: string;
  restrictedUses: string;
}

export interface ProvenanceGroup {
  sourceCategories: SourceCategory[];
  sourceDescription: string;
  collectionMethod: string;
  geographicOrigin: string;
  historicalPeriod: string;
  refreshFrequency: RefreshFrequency | "";
  transformationProcess: string;
  subSuppliers: string;
  publicReferences: string;
  knownGaps: string;
  availableEvidence: string;
  sourceChangeProcess: string;
  dataSubjectExplanation: string;
  sources: SourceItem[];
}

export interface RightsGroup {
  ownershipPosition: OwnershipPosition | "";
  canDistributeMarketplace: boolean;
  canProvideSamples: boolean;
  canSupportDelivery: boolean;
  upstreamRestrictions: string;
  geographicRestrictions: string;
  industryRestrictions: string;
  buyerRestrictions: string;
  permittedPurposes: string;
  prohibitedPurposes: string;
  retentionLimits: string;
  onwardSharingRestrictions: string;
  derivedOutputRestrictions: string;
  reIdentificationRestrictions: string;
  terminationRequirements: string;
  evidenceAvailable: string;
  licenceExpiryDate: string;
  supplierApprovalPerBuyer: boolean;
}

export interface QualityGroup {
  refreshFrequency: RefreshFrequency | "";
  updateMethod: string;
  typicalLatency: string;
  completenessMethod: string;
  duplicateHandling: string;
  missingValueTreatment: string;
  errorCorrectionProcess: string;
  coverageMeasurement: string;
  qualityMonitoring: string;
  schemaChangeProcess: string;
  versioningProcess: string;
  deprecationNotice: string;
  knownLimitations: string;
  buyerNotification: string;
  sampleAvailable: boolean;
  dataDictionaryAvailable: boolean;
  testEnvironmentAvailable: boolean;
  serviceTargets: string;
  qualityChecks: QualityCheckItem[];
}

export interface SecurityGroup {
  encryptionTransit: string;
  encryptionRest: string;
  accessControl: string;
  mfaEnabled: boolean;
  loggingMonitoring: string;
  secureDevelopment: string;
  vulnerabilityManagement: string;
  backupRecovery: string;
  businessContinuity: string;
  staffConfidentiality: string;
  subprocessorManagement: string;
  secureTransfer: string;
  keySecretManagement: string;
  dataDeletion: string;
  incidentResponse: string;
  securityContact: string;
  notificationProcess: string;
  certifications: CertificationItem[];
  incidentNotificationScenario: string;
}

export interface DeliveryCommercialGroup {
  deliveryFormats: DeliveryFormat[];
  apiStyle: string;
  apiAuth: string;
  secureDownloadMethod: string;
  feedFrequency: string;
  fileFormats: string;
  typicalVolume: string;
  schemaDocsAvailable: boolean;
  sandboxAvailable: boolean;
  integrationSupport: string;
  onboardingRequirements: string;
  deliveryRegions: string;
  usageMeasurement: string;
  supportHours: string;
  maintenanceCommunication: string;
  preferredPricingModels: PricingModel[];
  indicativePriceRange: string;
  minimumTerm: string;
  setupFee: string;
  usageAllowance: string;
  overageApproach: string;
  enterprisePricing: string;
  bespokeAvailable: boolean;
  currency: string;
  taxRegistered: boolean;
  commercialDiscussionRequired: boolean;
}

export interface SupportingDocumentsGroup {
  documents: DocumentMetadataItem[];
}

export interface DeclarationsGroup {
  infoAccurate: boolean;
  authorityToDiscuss: boolean;
  noStolenData: boolean;
  restrictionsDisclosed: boolean;
  willReportChanges: boolean;
  noGuaranteedAcceptance: boolean;
  mayRequestMoreInfo: boolean;
  finalTermsSeparate: boolean;
  demoDataBrowserOnly: boolean;
}

// ─── Application metadata ───────────────────────────────────────────

export interface ApplicationMetadata {
  localAppId: string;
  schemaVersion: number;
  currentStage: number;
  completedStages: number[];
  createdDate: string;
  lastSavedDate: string;
  localStatus: LocalAppStatus;
  demonstrationReference: string;
  submissionDate: string;
}

// ─── Full draft ─────────────────────────────────────────────────────

export interface SupplierApplicationDraft {
  metadata: ApplicationMetadata;
  eligibility: EligibilityGroup;
  organisation: OrganisationGroup;
  representative: RepresentativeGroup;
  product: ProductGroup;
  provenance: ProvenanceGroup;
  rights: RightsGroup;
  quality: QualityGroup;
  security: SecurityGroup;
  deliveryCommercial: DeliveryCommercialGroup;
  supportingDocuments: SupportingDocumentsGroup;
  declarations: DeclarationsGroup;
}

// ─── Stage definition ───────────────────────────────────────────────

export interface StageDefinition {
  number: number;
  slug: string;
  title: string;
  description: string;
}

// ─── Validation types ───────────────────────────────────────────────

export interface FieldError {
  field: string;
  message: string;
  stage: number;
}

export interface StageValidationState {
  stage: number;
  valid: boolean;
  errors: FieldError[];
}

// ─── Product type display names ─────────────────────────────────────

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  api: "API",
  scheduled_feed: "Scheduled feed",
  secure_download: "Secure download",
  dataset: "Dataset",
  dashboard: "Dashboard",
  research_report: "Research report",
  audience_segment: "Audience segment",
  aggregated_intelligence: "Aggregated intelligence",
  verification_product: "Verification product",
  clean_room_analysis: "Clean-room analysis",
  bespoke_analysis: "Bespoke analysis",
  other: "Other",
};

export const ORGANISATION_TYPE_LABELS: Record<OrganisationType, string> = {
  limited_company: "Limited company",
  plc: "Public limited company (PLC)",
  partnership: "Partnership",
  llp: "Limited liability partnership (LLP)",
  sole_trader: "Sole trader",
  charity: "Charity",
  public_body: "Public body",
  research_institution: "Research institution",
  other: "Other",
};

export const YES_NO_LABELS: Record<YesNoOption, string> = {
  yes: "Yes",
  no: "No",
  needs_discussion: "Needs discussion",
};

export const SOURCE_CATEGORY_LABELS: Record<SourceCategory, string> = {
  first_party: "First-party (collected directly)",
  public: "Public records / open data",
  licensed_third_party: "Licensed third-party",
  derived: "Derived / calculated",
  modelled: "Modelled / inferred",
  aggregated: "Aggregated",
  mixed: "Mixed sources",
};

export const REFRESH_LABELS: Record<RefreshFrequency, string> = {
  real_time: "Real-time",
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
  ad_hoc: "Ad hoc",
  one_off: "One-off",
  other: "Other",
};

export const LOCAL_STATUS_LABELS: Record<LocalAppStatus, string> = {
  draft: "Draft",
  ready_for_review: "Ready for review",
  demonstration_submitted: "Demonstration submitted",
  revised_draft: "Revised draft",
};

export const DELIVERY_FORMAT_LABELS: Record<DeliveryFormat, string> = {
  api_rest: "REST API",
  api_graphql: "GraphQL API",
  secure_download: "Secure download",
  sftp: "SFTP",
  email_feed: "Email feed",
  dashboard: "Dashboard",
  report_pdf: "Report (PDF)",
  clean_room: "Clean room",
  other: "Other",
};

export const PRICING_MODEL_LABELS: Record<PricingModel, string> = {
  subscription: "Subscription",
  per_record: "Per record",
  per_request: "Per request",
  usage_based: "Usage based",
  package_licence: "Package licence",
  project_based: "Project based",
  enterprise: "Enterprise agreement",
  revenue_share: "Revenue share",
  fixed_distribution: "Fixed distribution",
  bespoke: "Bespoke",
};

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  organisation_evidence: "Organisation evidence",
  rights_licence_evidence: "Rights or licence evidence",
  provenance_document: "Provenance document",
  data_dictionary: "Data dictionary",
  sample_schema: "Sample schema",
  quality_policy: "Quality policy",
  security_overview: "Security overview",
  incident_response_summary: "Incident-response summary",
  insurance_evidence: "Insurance evidence",
  certification_evidence: "Certification evidence",
  other: "Other",
};