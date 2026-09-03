import type {
  SupplierApplicationDraft,
  StageDefinition,
  EligibilityGroup,
  OrganisationGroup,
  RepresentativeGroup,
  ProductGroup,
  ProvenanceGroup,
  RightsGroup,
  QualityGroup,
  SecurityGroup,
  DeliveryCommercialGroup,
  SupportingDocumentsGroup,
  DeclarationsGroup,
  SourceItem,
  QualityCheckItem,
  DocumentMetadataItem,
  CertificationItem,
  LocalAppStatus,
} from "./supplierApplicationTypes";

// ─── Stage definitions ──────────────────────────────────────────────

export const APPLICATION_STAGES: StageDefinition[] = [
  { number: 1, slug: "eligibility", title: "Eligibility", description: "Confirm you meet the basic supplier requirements." },
  { number: 2, slug: "organisation", title: "Organisation", description: "Tell us about your organisation." },
  { number: 3, slug: "representative", title: "Representative", description: "Who is authorised to submit this application?" },
  { number: 4, slug: "product", title: "Product", description: "Describe the data product you propose." },
  { number: 5, slug: "provenance", title: "Sources & Provenance", description: "Explain where the data comes from." },
  { number: 6, slug: "rights", title: "Rights & Licensing", description: "Describe your rights and licensing position." },
  { number: 7, slug: "quality", title: "Quality & Refresh", description: "How is quality maintained and data refreshed?" },
  { number: 8, slug: "security", title: "Security & Incidents", description: "Describe security controls and incident handling." },
  { number: 9, slug: "delivery", title: "Delivery & Commercial", description: "Delivery methods and commercial preferences." },
  { number: 10, slug: "documents", title: "Documents & Declarations", description: "Supporting documents and final declarations." },
];

// ─── Helper generators ──────────────────────────────────────────────

export function createEmptySource(): SourceItem {
  return {
    id: `src_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    sourceCategory: "mixed",
    provider: "",
    rightsSummary: "",
    geography: "",
    refresh: "ad_hoc",
    transformation: "",
    restrictions: "",
    evidence: "",
  };
}

export function createEmptyQualityCheck(): QualityCheckItem {
  return {
    id: `qc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    frequency: "",
    method: "",
    failureAction: "",
    owner: "",
  };
}

export function createEmptyDocument(): DocumentMetadataItem {
  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    documentType: "other",
    displayFilename: "",
    description: "",
    documentDate: "",
    expiryDate: "",
    classification: "none",
    readyToProvide: false,
  };
}

export function createEmptyCertification(): CertificationItem {
  return {
    id: `cert_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    status: "none",
    expiryDate: "",
  };
}

// ─── Default empty groups ───────────────────────────────────────────

export function createEmptyEligibility(): EligibilityGroup {
  return {
    registeredOrganisation: "yes",
    authorisedRepresentative: "yes",
    canExplainOrigin: "yes",
    canDemonstrateRights: "yes",
    canDocumentQuality: "yes",
    canSupportSecurity: "yes",
    notStolenOrLeaked: "yes",
    legitimateBusinessUse: "yes",
  };
}

export function createEmptyOrganisation(): OrganisationGroup {
  return {
    legalName: "",
    tradingName: "",
    organisationType: "",
    registrationCountry: "",
    registrationNumber: "",
    registeredCity: "",
    website: "",
    mainActivity: "",
    yearEstablished: "",
    employeeRange: "",
    existingDataProducts: "",
    dataRelationship: "",
    generalEmail: "",
    generalPhone: "",
  };
}

export function createEmptyRepresentative(): RepresentativeGroup {
  return {
    fullName: "",
    jobTitle: "",
    workEmail: "",
    workPhone: "",
    department: "",
    authorityToSubmit: false,
    isPrimaryContact: true,
    isComplianceContact: false,
    isTechnicalContact: false,
    isCommercialContact: false,
    complianceContactName: "",
    complianceContactEmail: "",
    technicalContactName: "",
    technicalContactEmail: "",
    commercialContactName: "",
    commercialContactEmail: "",
    sameAsPrimaryCompliance: true,
    sameAsPrimaryTechnical: true,
    sameAsPrimaryCommercial: true,
  };
}

export function createEmptyProduct(): ProductGroup {
  return {
    productName: "",
    productType: "",
    primaryCategory: "",
    secondaryCategory: "",
    shortDescription: "",
    fullDescription: "",
    businessProblem: "",
    intendedBuyers: "",
    typicalUseCases: "",
    geographicCoverage: "",
    coverageNotes: "",
    estimatedCoverage: "",
    historicalDepth: "",
    productStatus: "",
    existingAvailability: "",
    exclusivity: "none",
    knownLimitations: "",
    restrictedUses: "",
  };
}

export function createEmptyProvenance(): ProvenanceGroup {
  return {
    sourceCategories: [],
    sourceDescription: "",
    collectionMethod: "",
    geographicOrigin: "",
    historicalPeriod: "",
    refreshFrequency: "",
    transformationProcess: "",
    subSuppliers: "",
    publicReferences: "",
    knownGaps: "",
    availableEvidence: "",
    sourceChangeProcess: "",
    dataSubjectExplanation: "",
    sources: [],
  };
}

export function createEmptyRights(): RightsGroup {
  return {
    ownershipPosition: "",
    canDistributeMarketplace: false,
    canProvideSamples: false,
    canSupportDelivery: false,
    upstreamRestrictions: "",
    geographicRestrictions: "",
    industryRestrictions: "",
    buyerRestrictions: "",
    permittedPurposes: "",
    prohibitedPurposes: "",
    retentionLimits: "",
    onwardSharingRestrictions: "",
    derivedOutputRestrictions: "",
    reIdentificationRestrictions: "",
    terminationRequirements: "",
    evidenceAvailable: "",
    licenceExpiryDate: "",
    supplierApprovalPerBuyer: false,
  };
}

export function createEmptyQuality(): QualityGroup {
  return {
    refreshFrequency: "",
    updateMethod: "",
    typicalLatency: "",
    completenessMethod: "",
    duplicateHandling: "",
    missingValueTreatment: "",
    errorCorrectionProcess: "",
    coverageMeasurement: "",
    qualityMonitoring: "",
    schemaChangeProcess: "",
    versioningProcess: "",
    deprecationNotice: "",
    knownLimitations: "",
    buyerNotification: "",
    sampleAvailable: false,
    dataDictionaryAvailable: false,
    testEnvironmentAvailable: false,
    serviceTargets: "",
    qualityChecks: [],
  };
}

export function createEmptySecurity(): SecurityGroup {
  return {
    encryptionTransit: "",
    encryptionRest: "",
    accessControl: "",
    mfaEnabled: false,
    loggingMonitoring: "",
    secureDevelopment: "",
    vulnerabilityManagement: "",
    backupRecovery: "",
    businessContinuity: "",
    staffConfidentiality: "",
    subprocessorManagement: "",
    secureTransfer: "",
    keySecretManagement: "",
    dataDeletion: "",
    incidentResponse: "",
    securityContact: "",
    notificationProcess: "",
    certifications: [],
    incidentNotificationScenario: "",
  };
}

export function createEmptyDeliveryCommercial(): DeliveryCommercialGroup {
  return {
    deliveryFormats: [],
    apiStyle: "",
    apiAuth: "",
    secureDownloadMethod: "",
    feedFrequency: "",
    fileFormats: "",
    typicalVolume: "",
    schemaDocsAvailable: false,
    sandboxAvailable: false,
    integrationSupport: "",
    onboardingRequirements: "",
    deliveryRegions: "",
    usageMeasurement: "",
    supportHours: "",
    maintenanceCommunication: "",
    preferredPricingModels: [],
    indicativePriceRange: "",
    minimumTerm: "",
    setupFee: "",
    usageAllowance: "",
    overageApproach: "",
    enterprisePricing: "",
    bespokeAvailable: false,
    currency: "GBP",
    taxRegistered: false,
    commercialDiscussionRequired: false,
  };
}

export function createEmptyDocuments(): SupportingDocumentsGroup {
  return {
    documents: [],
  };
}

export function createEmptyDeclarations(): DeclarationsGroup {
  return {
    infoAccurate: false,
    authorityToDiscuss: false,
    noStolenData: false,
    restrictionsDisclosed: false,
    willReportChanges: false,
    noGuaranteedAcceptance: false,
    mayRequestMoreInfo: false,
    finalTermsSeparate: false,
    demoDataBrowserOnly: false,
  };
}

// ─── Full empty draft factory ───────────────────────────────────────

export function createEmptyDraft(): SupplierApplicationDraft {
  const now = new Date().toISOString();
  return {
    metadata: {
      localAppId: `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      schemaVersion: 1,
      currentStage: 1,
      completedStages: [],
      createdDate: now,
      lastSavedDate: now,
      localStatus: "draft",
      demonstrationReference: "",
      submissionDate: "",
    },
    eligibility: createEmptyEligibility(),
    organisation: createEmptyOrganisation(),
    representative: createEmptyRepresentative(),
    product: createEmptyProduct(),
    provenance: createEmptyProvenance(),
    rights: createEmptyRights(),
    quality: createEmptyQuality(),
    security: createEmptySecurity(),
    deliveryCommercial: createEmptyDeliveryCommercial(),
    supportingDocuments: createEmptyDocuments(),
    declarations: createEmptyDeclarations(),
  };
}

// ─── Stage completion helpers ───────────────────────────────────────

export function isStageComplete(
  stage: number,
  _draft: SupplierApplicationDraft
): boolean {
  // Stages are marked complete when explicitly validated and advanced from.
  // This is managed via completedStages in metadata.
  return false;
}

// ─── Stage to group key mapping ─────────────────────────────────────

export const STAGE_GROUP_MAP: Record<number, keyof SupplierApplicationDraft> = {
  1: "eligibility",
  2: "organisation",
  3: "representative",
  4: "product",
  5: "provenance",
  6: "rights",
  7: "quality",
  8: "security",
  9: "deliveryCommercial",
  10: "supportingDocuments",
};

// ─── Application intro data (from supplierContent) ──────────────────

export const APPLICATION_INTRO_DATA = {
  stages: [
    { step: 1, title: "Check eligibility", description: "Confirm your organisation and product meet the basic criteria." },
    { step: 2, title: "Complete application stages", description: "Work through 10 stages covering organisation, product, provenance, rights, quality, security and commercial details." },
    { step: 3, title: "Review and submit", description: "Check all your answers, confirm declarations and create a demonstration submission." },
    { step: 4, title: "Await review", description: "In a live environment, DataHarbour would review your application against published supplier standards." },
    { step: 5, title: "Package preparation", description: "Accepted suppliers would work with DataHarbour to prepare marketplace listings." },
  ],
  eligibilityChecklist: [
    "You represent a registered organisation or established business.",
    "You have an authorised representative who can submit the application.",
    "You can explain where your data comes from.",
    "You can demonstrate rights to supply or license the data.",
    "You can document quality, refresh and known limitations.",
    "You can support security and incident enquiries.",
    "You confirm the product does not contain stolen, leaked or unlawfully obtained data.",
    "You intend legitimate business use of the DataHarbour marketplace.",
  ],
  documentsToPrepare: [
    "Certificate of incorporation or business registration.",
    "Evidence of rights or licence to supply the data product.",
    "Provenance documentation describing sources and collection.",
    "Sample data dictionary or schema.",
    "Quality-control policy or documentation.",
    "Security overview describing key controls.",
    "Incident-response summary.",
  ],
  outcomes: [
    { title: "More information required", description: "DataHarbour may request additional evidence, clarification or documentation before continuing review." },
    { title: "Accepted for package preparation", description: "The application meets standards and can proceed to building the marketplace listing." },
    { title: "Accepted with conditions", description: "The application is accepted subject to specific conditions, restrictions or additional requirements." },
    { title: "Declined", description: "The application does not currently meet DataHarbour supplier standards. The decision will explain the reasons." },
    { title: "Paused", description: "Review is temporarily paused, for example pending changes from the applicant or resolution of an outstanding question." },
    { title: "Suspended after publication", description: "A previously accepted supplier may be suspended if ongoing standards are not maintained." },
  ],
};

// ─── Contextual help per stage ─────────────────────────────────────

export const STAGE_HELP: Record<number, string> = {
  1: "This stage confirms you meet the basic eligibility criteria for DataHarbour suppliers. A 'No' to some questions may not prevent you from proceeding, but certain answers — such as knowingly proposing stolen data — will block progression.",
  2: "Provide details about your organisation. All information is stored only in this browser for this demonstration. No live company checks are performed.",
  3: "The authorised representative must have the authority to submit this application on behalf of the organisation. Additional contacts are helpful but optional.",
  4: "Describe the data product you are proposing for the DataHarbour marketplace. Be as specific as possible — this helps reviewers understand your product.",
  5: "Explain where your data comes from. At least one source must be added. DataHarbour needs to understand the provenance chain before any product can be listed.",
  6: "Describe your legal position regarding the data. Do not enter confidential contract text in this demonstration. Explain your rights and any restrictions.",
  7: "Explain how data quality is maintained and how often the product is refreshed. Buyers need confidence in the reliability of marketplace products.",
  8: "Describe the security controls you have in place or are planning. Be honest about what is currently operational versus planned. Do not make false certification claims.",
  9: "Explain how the product will be delivered and your commercial preferences. Commercial terms are non-binding and subject to separate agreement.",
  10: "Record the supporting documents you can provide. Actual file uploads are not available in this demonstration. Complete all declarations before submission.",
};

export function generateLocalRef(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DH-DEMO-SUP-${rand}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}