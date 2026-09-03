// ── DataHarbour Access Request Types ──
// All data is fictional demonstration information only.
// No real verification, approval, messages or delivery exists.

export type AccessRequestFormStatus =
  | 'draft'
  | 'ready_for_review'
  | 'submitted_demo'
  | 'awaiting_info_demo'
  | 'supplier_review_demo'
  | 'compliance_review_demo'
  | 'approved_demo'
  | 'approved_conditions_demo'
  | 'declined_demo'
  | 'withdrawn'
  | 'expired_demo'
  | 'suspended_demo';

export type WorkflowStage =
  | 'product'
  | 'business_purpose'
  | 'users_systems'
  | 'data_scope'
  | 'delivery'
  | 'retention'
  | 'sharing'
  | 'risk'
  | 'security_documents'
  | 'declarations'
  | 'review';

export const WORKFLOW_STAGES: WorkflowStage[] = [
  'product',
  'business_purpose',
  'users_systems',
  'data_scope',
  'delivery',
  'retention',
  'sharing',
  'risk',
  'security_documents',
  'declarations',
  'review',
];

export const STAGE_LABELS: Record<WorkflowStage, string> = {
  product: 'Product',
  business_purpose: 'Business purpose',
  users_systems: 'Users and systems',
  data_scope: 'Data scope and volume',
  delivery: 'Delivery and integration',
  retention: 'Retention and deletion',
  sharing: 'Sharing and onward use',
  risk: 'Risk and governance',
  security_documents: 'Security and documents',
  declarations: 'Declarations',
  review: 'Review',
};

export const STAGE_NUMBERS: Record<WorkflowStage, number> = {
  product: 1,
  business_purpose: 2,
  users_systems: 3,
  data_scope: 4,
  delivery: 5,
  retention: 6,
  sharing: 7,
  risk: 8,
  security_documents: 9,
  declarations: 10,
  review: 11,
};

export const FORM_STATUS_LABELS: Record<AccessRequestFormStatus, string> = {
  draft: 'Draft',
  ready_for_review: 'Ready for review',
  submitted_demo: 'Submitted — demonstration',
  awaiting_info_demo: 'Awaiting information — demonstration',
  supplier_review_demo: 'Supplier review — demonstration',
  compliance_review_demo: 'Compliance review — demonstration',
  approved_demo: 'Approved — demonstration',
  approved_conditions_demo: 'Approved with conditions — demonstration',
  declined_demo: 'Declined — demonstration',
  withdrawn: 'Withdrawn',
  expired_demo: 'Expired — demonstration',
  suspended_demo: 'Suspended — demonstration',
};

export const FORM_STATUS_COLORS: Record<AccessRequestFormStatus, string> = {
  draft: 'bg-foreground-100 text-foreground-700',
  ready_for_review: 'bg-secondary-100 text-secondary-900',
  submitted_demo: 'bg-accent-100 text-accent-900',
  awaiting_info_demo: 'bg-accent-100 text-accent-900',
  supplier_review_demo: 'bg-secondary-100 text-secondary-900',
  compliance_review_demo: 'bg-secondary-100 text-secondary-900',
  approved_demo: 'bg-accent-100 text-accent-900',
  approved_conditions_demo: 'bg-accent-100 text-accent-900',
  declined_demo: 'bg-foreground-200 text-foreground-700',
  withdrawn: 'bg-foreground-100 text-foreground-600',
  expired_demo: 'bg-foreground-100 text-foreground-600',
  suspended_demo: 'bg-foreground-200 text-foreground-700',
};

// ── User Groups ──
export interface AccessRequestUserGroup {
  id: string;
  name: string;
  department: string;
  numberOfUsers: number;
  userType: 'employee' | 'contractor' | 'third_party';
  workflowRole: string;
  accessLevel: string;
  trainingRequired: string;
}

// ── Systems ──
export interface AccessRequestSystem {
  id: string;
  name: string;
  systemType: string;
  environment: 'development' | 'test' | 'production';
  hostingRegion: string;
  purpose: string;
  directUsers: string;
  combinedDataSources: string;
  profilingOrScoring: boolean;
  outputsAffectIndividuals: boolean;
}

// ── Documents (metadata only, no file storage) ──
export type DocumentType =
  | 'internal_policy'
  | 'security_overview'
  | 'dpia_assessment'
  | 'architecture_diagram'
  | 'data_flow'
  | 'retention_schedule'
  | 'processor_list'
  | 'other';

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  internal_policy: 'Internal policy',
  security_overview: 'Security overview',
  dpia_assessment: 'DPIA or assessment',
  architecture_diagram: 'Architecture diagram',
  data_flow: 'Data-flow description',
  retention_schedule: 'Retention schedule',
  processor_list: 'Processor list',
  other: 'Other',
};

export interface AccessRequestDocument {
  id: string;
  docType: DocumentType;
  displayFilename: string;
  description: string;
  date: string;
  optionalExpiry: string;
  readiness: 'ready' | 'in_progress' | 'planned';
  confidentiality: 'internal' | 'confidential' | 'restricted';
}

// ── Conditions ──
export interface AccessRequestCondition {
  id: string;
  category: 'purpose' | 'user' | 'geography' | 'retention' | 'sharing' | 'human_review' | 'usage' | 'security' | 'renewal';
  description: string;
  isDemo: boolean;
}

// ── Messages ──
export interface AccessRequestMessage {
  id: string;
  direction: 'buyer' | 'supplier_demo' | 'compliance_demo';
  sender: string;
  body: string;
  createdAt: string;
  isDemo: boolean;
  notSent?: boolean; // for buyer messages marked "Not sent"
}

// ── History ──
export interface AccessRequestHistoryEvent {
  id: string;
  action: string;
  detail: string;
  actor: string;
  createdAt: string;
  isDemo: boolean;
}

// ── Purpose Options ──
export const BUSINESS_PURPOSE_OPTIONS = [
  'Market analysis',
  'Business verification support',
  'Customer-data enrichment',
  'Fraud-prevention support',
  'Location planning',
  'Commercial-risk analysis',
  'Product development',
  'Research',
  'Internal reporting',
  'Other',
];

export const INDUSTRY_OPTIONS = [
  'Financial services',
  'Insurance',
  'Legal',
  'Property and real estate',
  'Retail',
  'Technology',
  'Healthcare',
  'Public sector',
  'Education',
  'Manufacturing',
  'Transport and logistics',
  'Energy and utilities',
  'Professional services',
  'Charity and non-profit',
  'Media and marketing',
  'Other',
];

export const ORG_SIZE_OPTIONS = ['1–9', '10–49', '50–249', '250–999', '1,000+'];

// ── Full Access Request Draft ──
export interface AccessRequestDraft {
  id: string;
  reference: string;
  packageSlug: string;
  packageName: string;
  supplierName: string;

  // Stage 1: Product
  productAcknowledged: boolean;

  // Stage 2: Business Purpose
  requestTitle: string;
  primaryPurpose: string;
  detailedIntendedUse: string;
  businessProblem: string;
  expectedOutput: string;
  whyThisPackage: string;
  alternativesConsidered: string;
  legalReviewStatus: 'yes' | 'no' | 'not_sure';
  department: string;
  plannedStartDate: string;
  expectedDuration: string;
  purposeMayChange: boolean;

  // Stage 3: Users and Systems
  userGroups: AccessRequestUserGroup[];
  systems: AccessRequestSystem[];

  // Stage 4: Data Scope
  dataGeography: string;
  dateRange: string;
  requiredFields: string;
  initialVolume: string;
  monthlyVolume: string;
  peakVolume: string;
  refreshNeed: string;
  historicalDepth: string;
  filteringSegmentation: string;
  sampleSandboxRequired: boolean;
  fullPackageNecessary: boolean;
  dataMinimisationExplanation: string;

  // Stage 5: Delivery
  preferredDeliveryFormat: string;
  backupDeliveryFormat: string;
  integrationMethod: string;
  authExpectation: string;
  environment: string;
  technicalContact: string;
  schemaSandboxNeed: string;
  deliveryFrequency: string;
  onboardingSupport: string;
  usageMonitoringContact: string;
  maintenanceConstraints: string;
  dataLocationRequirement: string;

  // Stage 6: Retention
  proposedRetentionPeriod: string;
  retentionReason: string;
  reviewFrequency: string;
  deletionMethod: string;
  backupTreatment: string;
  archiveUse: string;
  legalHoldPossibility: boolean;
  derivedOutputRetention: string;
  retentionOwner: string;
  endOfLicenceProcess: string;
  supplierLimitsOverrideLonger: boolean;

  // Stage 7: Sharing
  internalDepartments: string;
  externalOrganisations: string;
  contractorsGroupCompanies: string;
  countriesInvolved: string;
  rawDataSharing: boolean;
  derivedOutputSharing: boolean;
  publicationIntent: boolean;
  resaleOrSublicensing: boolean;
  modelTrainingUse: boolean;
  recipientControls: string;
  sharingJustification: string;

  // Stage 8: Risk
  involvesPersonalData: boolean;
  involvesSensitiveAttributes: boolean;
  involvesChildrenOrVulnerable: boolean;
  involvesLocationMovementData: boolean;
  involvesLargeScaleProfiling: boolean;
  involvesDatasetMatching: boolean;
  involvesReidentificationRisk: boolean;
  involvesAutomatedDecisions: boolean;
  involvesEmploymentHousingCreditInsurance: boolean;
  involvesFraudRiskScoring: boolean;
  involvesMarketingActivation: boolean;
  involvesMonitoringSurveillance: boolean;
  involvesInternationalAccess: boolean;
  involvesSignificantEffects: boolean;
  safeguards: string;
  complianceOwner: string;
  dpiaStatus: string;
  humanReviewProcess: string;
  fairnessControls: string;
  complaintRoute: string;
  accuracyChallengeProcess: string;
  purposeChangeReview: string;
  auditRecordApproach: string;

  // Stage 9: Security
  hasMfa: boolean;
  hasRbac: boolean;
  hasEncryptionTransit: boolean;
  hasEncryptionRest: boolean;
  hasLogging: boolean;
  hasKeyManagement: boolean;
  hasSecureDevelopment: boolean;
  hasVulnerabilityManagement: boolean;
  hasIncidentResponse: boolean;
  hasBackupRecovery: boolean;
  hasStaffConfidentiality: boolean;
  hasDeletionProcess: boolean;
  hasProcessorControls: boolean;
  securityNotes: string;
  documents: AccessRequestDocument[];

  // Stage 10: Declarations
  declarationAccurate: boolean;
  declarationAuthorised: boolean;
  declarationGenuinePurpose: boolean;
  declarationRestrictionsReviewed: boolean;
  declarationApprovedPurposeOnly: boolean;
  declarationAuthorisedUsers: boolean;
  declarationSecurityControls: boolean;
  declarationReportChanges: boolean;
  declarationNoHarassmentOrDiscrimination: boolean;
  declarationNoReidentification: boolean;
  declarationNoGuaranteeOfApproval: boolean;
  declarationMoreInfoMayBeRequested: boolean;
  declarationBrowserOnly: boolean;
  buyerTermsAccepted: boolean;
  acceptableUseAccepted: boolean;
  privacyAccepted: boolean;

  // Meta
  status: AccessRequestFormStatus;
  currentStage: WorkflowStage;
  conditions: AccessRequestCondition[];
  messages: AccessRequestMessage[];
  history: AccessRequestHistoryEvent[];
  originalRequestId: string | null; // for revised drafts
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  resolvedAt: string | null;
  lastSavedAt: string | null;
}

// ── Default factories ──
let idCounter = Date.now();
export function generateLocalId(): string {
  idCounter += 1;
  return `loc_${idCounter.toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function generateRequestRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DH-DEMO-AR-${result}`;
}

export function createDefaultDraft(packageSlug: string, packageName: string, supplierName: string): AccessRequestDraft {
  const now = new Date().toISOString();
  return {
    id: generateLocalId(),
    reference: '',
    packageSlug,
    packageName,
    supplierName,
    productAcknowledged: false,
    requestTitle: '',
    primaryPurpose: '',
    detailedIntendedUse: '',
    businessProblem: '',
    expectedOutput: '',
    whyThisPackage: '',
    alternativesConsidered: '',
    legalReviewStatus: 'no',
    department: '',
    plannedStartDate: '',
    expectedDuration: '',
    purposeMayChange: false,
    userGroups: [],
    systems: [],
    dataGeography: '',
    dateRange: '',
    requiredFields: '',
    initialVolume: '',
    monthlyVolume: '',
    peakVolume: '',
    refreshNeed: '',
    historicalDepth: '',
    filteringSegmentation: '',
    sampleSandboxRequired: false,
    fullPackageNecessary: true,
    dataMinimisationExplanation: '',
    preferredDeliveryFormat: '',
    backupDeliveryFormat: '',
    integrationMethod: '',
    authExpectation: '',
    environment: 'production',
    technicalContact: '',
    schemaSandboxNeed: '',
    deliveryFrequency: '',
    onboardingSupport: '',
    usageMonitoringContact: '',
    maintenanceConstraints: '',
    dataLocationRequirement: '',
    proposedRetentionPeriod: '',
    retentionReason: '',
    reviewFrequency: '',
    deletionMethod: '',
    backupTreatment: '',
    archiveUse: '',
    legalHoldPossibility: false,
    derivedOutputRetention: '',
    retentionOwner: '',
    endOfLicenceProcess: '',
    supplierLimitsOverrideLonger: false,
    internalDepartments: '',
    externalOrganisations: '',
    contractorsGroupCompanies: '',
    countriesInvolved: '',
    rawDataSharing: false,
    derivedOutputSharing: false,
    publicationIntent: false,
    resaleOrSublicensing: false,
    modelTrainingUse: false,
    recipientControls: '',
    sharingJustification: '',
    involvesPersonalData: false,
    involvesSensitiveAttributes: false,
    involvesChildrenOrVulnerable: false,
    involvesLocationMovementData: false,
    involvesLargeScaleProfiling: false,
    involvesDatasetMatching: false,
    involvesReidentificationRisk: false,
    involvesAutomatedDecisions: false,
    involvesEmploymentHousingCreditInsurance: false,
    involvesFraudRiskScoring: false,
    involvesMarketingActivation: false,
    involvesMonitoringSurveillance: false,
    involvesInternationalAccess: false,
    involvesSignificantEffects: false,
    safeguards: '',
    complianceOwner: '',
    dpiaStatus: '',
    humanReviewProcess: '',
    fairnessControls: '',
    complaintRoute: '',
    accuracyChallengeProcess: '',
    purposeChangeReview: '',
    auditRecordApproach: '',
    hasMfa: false,
    hasRbac: false,
    hasEncryptionTransit: false,
    hasEncryptionRest: false,
    hasLogging: false,
    hasKeyManagement: false,
    hasSecureDevelopment: false,
    hasVulnerabilityManagement: false,
    hasIncidentResponse: false,
    hasBackupRecovery: false,
    hasStaffConfidentiality: false,
    hasDeletionProcess: false,
    hasProcessorControls: false,
    securityNotes: '',
    documents: [],
    declarationAccurate: false,
    declarationAuthorised: false,
    declarationGenuinePurpose: false,
    declarationRestrictionsReviewed: false,
    declarationApprovedPurposeOnly: false,
    declarationAuthorisedUsers: false,
    declarationSecurityControls: false,
    declarationReportChanges: false,
    declarationNoHarassmentOrDiscrimination: false,
    declarationNoReidentification: false,
    declarationNoGuaranteeOfApproval: false,
    declarationMoreInfoMayBeRequested: false,
    declarationBrowserOnly: false,
    buyerTermsAccepted: false,
    acceptableUseAccepted: false,
    privacyAccepted: false,
    status: 'draft',
    currentStage: 'product',
    conditions: [],
    messages: [],
    history: [{
      id: generateLocalId(),
      action: 'Draft created',
      detail: 'Buyer started a new access request draft',
      actor: 'Current user',
      createdAt: now,
      isDemo: true,
    }],
    originalRequestId: null,
    createdAt: now,
    updatedAt: now,
    submittedAt: null,
    resolvedAt: null,
    lastSavedAt: null,
  };
}

// ── Validation ──
export interface StageValidationResult {
  valid: boolean;
  errors: { field: string; message: string }[];
  warnings: { field: string; message: string }[];
}

function err(field: string, message: string): { field: string; message: string } {
  return { field, message };
}

export function validateProductStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  if (!draft.packageSlug) errors.push(err('package', 'A package must be selected'));
  if (!draft.productAcknowledged) errors.push(err('productAcknowledged', 'You must acknowledge that you have reviewed the package description, provenance and restrictions'));
  return { valid: errors.length === 0, errors, warnings: [] };
}

export function validateBusinessPurposeStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  const warnings: { field: string; message: string }[] = [];
  if (!draft.requestTitle.trim()) errors.push(err('requestTitle', 'Request title is required'));
  if (!draft.primaryPurpose) errors.push(err('primaryPurpose', 'Primary business purpose is required'));
  if (!draft.detailedIntendedUse.trim() || draft.detailedIntendedUse.length < 50) errors.push(err('detailedIntendedUse', 'Provide a meaningful intended-use explanation (at least 50 characters)'));
  if (!draft.businessProblem.trim()) errors.push(err('businessProblem', 'Business problem description is required'));
  if (!draft.expectedOutput.trim()) errors.push(err('expectedOutput', 'Expected operational output is required'));
  if (!draft.whyThisPackage.trim()) errors.push(err('whyThisPackage', 'Please explain why this package is required'));
  if (!draft.department.trim()) errors.push(err('department', 'Department or project is required'));
  return { valid: errors.length === 0, errors, warnings };
}

export function validateUsersSystemsStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  if (draft.userGroups.length === 0) errors.push(err('userGroups', 'At least one user group is required'));
  if (draft.systems.length === 0) errors.push(err('systems', 'At least one system is required'));
  for (let i = 0; i < draft.userGroups.length; i += 1) {
    const ug = draft.userGroups[i];
    if (!ug.name.trim()) errors.push(err(`userGroup_${i}_name`, `User group ${i + 1}: name is required`));
    if (!ug.workflowRole.trim()) errors.push(err(`userGroup_${i}_role`, `User group ${i + 1}: workflow role is required`));
  }
  for (let i = 0; i < draft.systems.length; i += 1) {
    const s = draft.systems[i];
    if (!s.name.trim()) errors.push(err(`system_${i}_name`, `System ${i + 1}: name is required`));
    if (!s.purpose.trim()) errors.push(err(`system_${i}_purpose`, `System ${i + 1}: purpose is required`));
  }
  return { valid: errors.length === 0, errors, warnings: [] };
}

export function validateDataScopeStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  if (!draft.initialVolume.trim()) errors.push(err('initialVolume', 'Initial volume is required'));
  if (!draft.dataMinimisationExplanation.trim()) errors.push(err('dataMinimisationExplanation', 'Explanation of why the scope is proportionate is required'));
  return { valid: errors.length === 0, errors, warnings: [] };
}

export function validateDeliveryStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  if (!draft.preferredDeliveryFormat) errors.push(err('preferredDeliveryFormat', 'Preferred delivery format is required'));
  if (!draft.technicalContact.trim()) errors.push(err('technicalContact', 'Technical contact is required'));
  return { valid: errors.length === 0, errors, warnings: [] };
}

export function validateRetentionStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  if (!draft.proposedRetentionPeriod.trim()) errors.push(err('proposedRetentionPeriod', 'Proposed retention period is required'));
  if (!draft.retentionReason.trim()) errors.push(err('retentionReason', 'Retention reason is required'));
  if (!draft.deletionMethod.trim()) errors.push(err('deletionMethod', 'Deletion method is required'));
  if (!draft.retentionOwner.trim()) errors.push(err('retentionOwner', 'Responsible owner is required'));
  return { valid: errors.length === 0, errors, warnings: [] };
}

export function validateSharingStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  const warnings: { field: string; message: string }[] = [];
  // Block prohibited sharing
  if (draft.resaleOrSublicensing) {
    warnings.push(err('resaleOrSublicensing', 'Resale or sublicensing may not be permitted. Review the package licence terms.'));
  }
  if (!draft.sharingJustification.trim()) errors.push(err('sharingJustification', 'Sharing justification is required'));
  return { valid: errors.length === 0, errors, warnings };
}

export function validateRiskStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  const warnings: { field: string; message: string }[] = [];
  // Block re-identification
  if (draft.involvesReidentificationRisk) {
    errors.push(err('involvesReidentificationRisk', 'Intent to re-identify individuals is a prohibited use. You cannot proceed with this purpose.'));
  }
  if (draft.involvesMonitoringSurveillance && draft.involvesPersonalData) {
    warnings.push(err('involvesMonitoringSurveillance', 'Monitoring or surveillance involving personal data requires additional safeguards and may be subject to compliance review.'));
  }
  // Require safeguards for Yes answers
  const yesFlags = [
    draft.involvesPersonalData,
    draft.involvesSensitiveAttributes,
    draft.involvesChildrenOrVulnerable,
    draft.involvesLocationMovementData,
    draft.involvesLargeScaleProfiling,
    draft.involvesDatasetMatching,
    draft.involvesAutomatedDecisions,
    draft.involvesEmploymentHousingCreditInsurance,
    draft.involvesFraudRiskScoring,
    draft.involvesMarketingActivation,
    draft.involvesInternationalAccess,
    draft.involvesSignificantEffects,
  ];
  if (yesFlags.some(Boolean) && !draft.safeguards.trim()) {
    errors.push(err('safeguards', 'Safeguards must be described when risk factors are identified'));
  }
  if (!draft.complianceOwner.trim()) errors.push(err('complianceOwner', 'Internal compliance owner is required'));
  return { valid: errors.length === 0, errors, warnings };
}

export function validateSecurityStage(draft: AccessRequestDraft): StageValidationResult {
  const warnings: { field: string; message: string }[] = [];
  const requiredControls = [draft.hasMfa, draft.hasRbac, draft.hasEncryptionTransit, draft.hasEncryptionRest, draft.hasLogging];
  if (!requiredControls.every(Boolean)) {
    warnings.push(err('securityControls', 'Some core security controls are not confirmed. This may delay access.'));
  }
  return { valid: true, errors: [], warnings };
}

export function validateDeclarationsStage(draft: AccessRequestDraft): StageValidationResult {
  const errors: { field: string; message: string }[] = [];
  const requiredDeclarations: [boolean, string, string][] = [
    [draft.declarationAccurate, 'declarationAccurate', 'You must confirm the information is accurate'],
    [draft.declarationAuthorised, 'declarationAuthorised', 'You must confirm you are authorised'],
    [draft.declarationGenuinePurpose, 'declarationGenuinePurpose', 'You must confirm the purpose is genuine'],
    [draft.declarationRestrictionsReviewed, 'declarationRestrictionsReviewed', 'You must confirm package restrictions were reviewed'],
    [draft.declarationApprovedPurposeOnly, 'declarationApprovedPurposeOnly', 'You must confirm data will only be used for an approved purpose'],
    [draft.declarationAuthorisedUsers, 'declarationAuthorisedUsers', 'You must confirm access will be limited to authorised users'],
    [draft.declarationSecurityControls, 'declarationSecurityControls', 'You must confirm security and deletion controls will be maintained'],
    [draft.declarationReportChanges, 'declarationReportChanges', 'You must confirm material changes will be reported'],
    [draft.declarationNoHarassmentOrDiscrimination, 'declarationNoHarassmentOrDiscrimination', 'You must confirm no harassment, discrimination, unlawful surveillance or unauthorised people searching is intended'],
    [draft.declarationNoReidentification, 'declarationNoReidentification', 'You must confirm no re-identification is intended'],
    [draft.declarationNoGuaranteeOfApproval, 'declarationNoGuaranteeOfApproval', 'You must acknowledge submission does not guarantee approval'],
    [draft.declarationMoreInfoMayBeRequested, 'declarationMoreInfoMayBeRequested', 'You must acknowledge more information may be requested'],
    [draft.declarationBrowserOnly, 'declarationBrowserOnly', 'You must acknowledge data remains only in this browser'],
  ];
  for (const [value, field, msg] of requiredDeclarations) {
    if (!value) errors.push(err(field, msg));
  }
  if (!draft.buyerTermsAccepted) errors.push(err('buyerTermsAccepted', 'You must accept the Buyer Terms'));
  if (!draft.acceptableUseAccepted) errors.push(err('acceptableUseAccepted', 'You must accept the Acceptable Use Policy'));
  if (!draft.privacyAccepted) errors.push(err('privacyAccepted', 'You must accept the Privacy Policy'));
  return { valid: errors.length === 0, errors, warnings: [] };
}

export function validateStage(draft: AccessRequestDraft, stage: WorkflowStage): StageValidationResult {
  switch (stage) {
    case 'product': return validateProductStage(draft);
    case 'business_purpose': return validateBusinessPurposeStage(draft);
    case 'users_systems': return validateUsersSystemsStage(draft);
    case 'data_scope': return validateDataScopeStage(draft);
    case 'delivery': return validateDeliveryStage(draft);
    case 'retention': return validateRetentionStage(draft);
    case 'sharing': return validateSharingStage(draft);
    case 'risk': return validateRiskStage(draft);
    case 'security_documents': return validateSecurityStage(draft);
    case 'declarations': return validateDeclarationsStage(draft);
    case 'review': return { valid: true, errors: [], warnings: [] };
  }
}

export function validateAllStages(draft: AccessRequestDraft): StageValidationResult {
  const allErrors: { field: string; message: string }[] = [];
  const allWarnings: { field: string; message: string }[] = [];
  for (const stage of WORKFLOW_STAGES.slice(0, -1)) { // skip review
    const result = validateStage(draft, stage);
    allErrors.push(...result.errors);
    allWarnings.push(...result.warnings);
  }
  return { valid: allErrors.length === 0, errors: allErrors, warnings: allWarnings };
}

export function getStageCompletionCount(draft: AccessRequestDraft): number {
  let count = 0;
  for (const stage of WORKFLOW_STAGES.slice(0, -1)) {
    const result = validateStage(draft, stage);
    if (result.valid) count += 1;
  }
  return count;
}

export function getStageErrorCounts(draft: AccessRequestDraft): Record<WorkflowStage, number> {
  const counts: Record<string, number> = {};
  for (const stage of WORKFLOW_STAGES.slice(0, -1)) {
    const result = validateStage(draft, stage);
    counts[stage] = result.errors.length;
  }
  return counts as Record<WorkflowStage, number>;
}