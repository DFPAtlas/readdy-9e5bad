// ── DataHarbour Administration Demonstration Data ──
// All data is fictional demonstration information only.
// No real organisations, users, approvals, payments or incidents exist.

import { generateRefId } from '@/data/authTypes';

// ── Admin Session ──
export interface AdminSession {
  userId: string;
  displayName: string;
  role: AdminRole;
  createdAt: string;
}

export type AdminRole =
  | 'super_administrator_demo'
  | 'marketplace_operations'
  | 'supplier_review'
  | 'compliance_review'
  | 'security_review'
  | 'billing_operations'
  | 'support'
  | 'content_editor'
  | 'read_only';

export const ADMIN_ROLES: { value: AdminRole; label: string; description: string }[] = [
  { value: 'super_administrator_demo', label: 'Super Administrator — demonstration', description: 'Full access to all administration functions' },
  { value: 'marketplace_operations', label: 'Marketplace Operations', description: 'Manage packages, supplier applications and marketplace content' },
  { value: 'supplier_review', label: 'Supplier Review', description: 'Review supplier applications and supplier organisations' },
  { value: 'compliance_review', label: 'Compliance Review', description: 'Review access requests, compliance cases and rights requests' },
  { value: 'security_review', label: 'Security Review', description: 'Review security reports and security controls' },
  { value: 'billing_operations', label: 'Billing Operations', description: 'Manage billing, invoices and payment records' },
  { value: 'support', label: 'Support', description: 'Manage support cases and buyer/supplier enquiries' },
  { value: 'content_editor', label: 'Content Editor', description: 'Manage content, legal documents and announcements' },
  { value: 'read_only', label: 'Read Only', description: 'View-only access to administration records' },
];

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super_administrator_demo: 'Super Administrator — demo',
  marketplace_operations: 'Marketplace Operations',
  supplier_review: 'Supplier Review',
  compliance_review: 'Compliance Review',
  security_review: 'Security Review',
  billing_operations: 'Billing Operations',
  support: 'Support',
  content_editor: 'Content Editor',
  read_only: 'Read Only',
};

// ── Permissions ──
export type AdminPermission = 'view' | 'create' | 'update' | 'approve' | 'publish' | 'export' | 'settings';

export const PERMISSION_MATRIX: Record<AdminRole, AdminPermission[]> = {
  super_administrator_demo: ['view', 'create', 'update', 'approve', 'publish', 'export', 'settings'],
  marketplace_operations: ['view', 'create', 'update', 'approve', 'publish', 'export'],
  supplier_review: ['view', 'update', 'approve', 'export'],
  compliance_review: ['view', 'update', 'approve', 'export'],
  security_review: ['view', 'update', 'approve'],
  billing_operations: ['view', 'update', 'export'],
  support: ['view', 'create', 'update', 'export'],
  content_editor: ['view', 'create', 'update', 'publish'],
  read_only: ['view'],
};

// ── Organisation ──
export type AdminOrgStatus =
  | 'draft'
  | 'ready_for_review'
  | 'verification_demo'
  | 'approved_demo'
  | 'approved_conditions_demo'
  | 'suspended_demo'
  | 'declined_demo'
  | 'closed_demo';

export const ADMIN_ORG_STATUS_LABELS: Record<AdminOrgStatus, string> = {
  draft: 'Draft',
  ready_for_review: 'Ready for future review',
  verification_demo: 'Verification — demonstration',
  approved_demo: 'Approved — demonstration',
  approved_conditions_demo: 'Approved with conditions — demonstration',
  suspended_demo: 'Suspended — demonstration',
  declined_demo: 'Declined — demonstration',
  closed_demo: 'Closed — demonstration',
};

export const ADMIN_ORG_STATUS_COLORS: Record<AdminOrgStatus, string> = {
  draft: 'bg-foreground-100 text-foreground-700',
  ready_for_review: 'bg-secondary-100 text-secondary-900',
  verification_demo: 'bg-accent-100 text-accent-900',
  approved_demo: 'bg-accent-100 text-accent-900',
  approved_conditions_demo: 'bg-accent-100 text-accent-900',
  suspended_demo: 'bg-foreground-200 text-foreground-700',
  declined_demo: 'bg-foreground-200 text-foreground-700',
  closed_demo: 'bg-foreground-100 text-foreground-600',
};

export interface AdminOrganisation {
  id: string;
  reference: string;
  name: string;
  tradingName: string;
  type: 'buyer' | 'supplier';
  orgType: string;
  country: string;
  registrationNumber: string;
  website: string;
  industry: string;
  size: string;
  city: string;
  businessEmail: string;
  status: AdminOrgStatus;
  onboardingComplete: boolean;
  verificationNotes: string;
  conditions: string[];
  contacts: AdminOrgContact[];
  users: AdminOrgUser[];
  licences: AdminOrgLicence[];
  complianceStatus: string;
  billingStatus: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
}

export interface AdminOrgContact {
  name: string;
  role: string;
  email: string;
}

export interface AdminOrgUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'deactivated_demo';
  lastActive: string | null;
}

export interface AdminOrgLicence {
  packageName: string;
  supplier: string;
  status: string;
  startDate: string;
  endDate: string;
}

// ── Supplier Application ──
export type AdminApplicationStatus =
  | 'draft'
  | 'submitted_demo'
  | 'awaiting_info'
  | 'under_review_demo'
  | 'accepted_demo'
  | 'accepted_conditions_demo'
  | 'declined_demo'
  | 'paused_demo';

export const APP_STATUS_LABELS: Record<AdminApplicationStatus, string> = {
  draft: 'Draft',
  submitted_demo: 'Submitted — demonstration',
  awaiting_info: 'Awaiting information',
  under_review_demo: 'Under review — demonstration',
  accepted_demo: 'Accepted — demonstration',
  accepted_conditions_demo: 'Accepted with conditions — demonstration',
  declined_demo: 'Declined — demonstration',
  paused_demo: 'Paused — demonstration',
};

export interface AdminSupplierApplication {
  id: string;
  reference: string;
  organisationName: string;
  organisationRef: string;
  representativeName: string;
  representativeEmail: string;
  productName: string;
  productCategory: string;
  provenanceSummary: string;
  rightsSummary: string;
  deliverySummary: string;
  commercialSummary: string;
  status: AdminApplicationStatus;
  priority: 'low' | 'medium' | 'high';
  reviewer: string;
  missingInfo: string[];
  conditions: string[];
  submittedAt: string;
  updatedAt: string;
  notes: AdminNote[];
  history: AdminHistoryEvent[];
}

// ── Package Review ──
export type AdminPackageStatus =
  | 'draft'
  | 'under_review_demo'
  | 'changes_requested_demo'
  | 'approved_demo'
  | 'approved_conditions_demo'
  | 'declined_demo'
  | 'published_demo'
  | 'paused_demo'
  | 'archived_demo';

export const PACKAGE_STATUS_LABELS: Record<AdminPackageStatus, string> = {
  draft: 'Draft',
  under_review_demo: 'Under review — demonstration',
  changes_requested_demo: 'Changes requested — demonstration',
  approved_demo: 'Approved — demonstration',
  approved_conditions_demo: 'Approved with conditions — demonstration',
  declined_demo: 'Declined — demonstration',
  published_demo: 'Published — demonstration',
  paused_demo: 'Paused — demonstration',
  archived_demo: 'Archived — demonstration',
};

export interface AdminPackageReview {
  id: string;
  slug: string;
  name: string;
  supplierName: string;
  supplierRef: string;
  category: string;
  accessLevel: string;
  version: string;
  status: AdminPackageStatus;
  coverageCompleteness: string;
  schemaCompleteness: string;
  provenanceCompleteness: string;
  qualityCompleteness: string;
  restrictionsCompleteness: string;
  deliveryCompleteness: string;
  pricingCompleteness: string;
  conditions: string[];
  reviewer: string;
  submittedAt: string;
  updatedAt: string;
  publishedAt: string | null;
  notes: AdminNote[];
  history: AdminHistoryEvent[];
}

// ── Admin Access Request ──
export type AdminAccessRequestStatus =
  | 'submitted_demo'
  | 'awaiting_info_demo'
  | 'supplier_review_demo'
  | 'compliance_review_demo'
  | 'approved_demo'
  | 'approved_conditions_demo'
  | 'declined_demo'
  | 'withdrawn'
  | 'suspended_demo'
  | 'expired_demo';

export const AR_STATUS_LABELS: Record<AdminAccessRequestStatus, string> = {
  submitted_demo: 'Submitted — demonstration',
  awaiting_info_demo: 'Awaiting information — demonstration',
  supplier_review_demo: 'Supplier review — demonstration',
  compliance_review_demo: 'Compliance review — demonstration',
  approved_demo: 'Approved — demonstration',
  approved_conditions_demo: 'Approved with conditions — demonstration',
  declined_demo: 'Declined — demonstration',
  withdrawn: 'Withdrawn',
  suspended_demo: 'Suspended — demonstration',
  expired_demo: 'Expired — demonstration',
};

export interface AdminAccessRequest {
  id: string;
  reference: string;
  buyerOrg: string;
  buyerRef: string;
  packageName: string;
  supplierName: string;
  purpose: string;
  status: AdminAccessRequestStatus;
  riskFlags: string[];
  reviewer: string;
  conditions: string[];
  supplierResponse: string;
  complianceReviewNotes: string;
  createdAt: string;
  updatedAt: string;
  notes: AdminNote[];
  history: AdminHistoryEvent[];
}

// ── Compliance Case ──
export type ComplianceCaseType =
  | 'intended_use_review'
  | 'provenance_concern'
  | 'retention_concern'
  | 'sharing_concern'
  | 'reidentification_risk'
  | 'high_impact_decision'
  | 'marketing_concern'
  | 'security_concern'
  | 'complaint'
  | 'other';

export type ComplianceCaseStatus =
  | 'open'
  | 'info_required'
  | 'under_review_demo'
  | 'remediation_demo'
  | 'closed_demo'
  | 'escalated_demo';

export const COMPLIANCE_CASE_TYPE_LABELS: Record<ComplianceCaseType, string> = {
  intended_use_review: 'Intended-use review',
  provenance_concern: 'Provenance concern',
  retention_concern: 'Retention concern',
  sharing_concern: 'Sharing concern',
  reidentification_risk: 'Re-identification risk',
  high_impact_decision: 'High-impact decision use',
  marketing_concern: 'Marketing-use concern',
  security_concern: 'Security-control concern',
  complaint: 'Complaint',
  other: 'Other',
};

export const COMPLIANCE_CASE_STATUS_LABELS: Record<ComplianceCaseStatus, string> = {
  open: 'Open',
  info_required: 'Information required',
  under_review_demo: 'Under review — demonstration',
  remediation_demo: 'Remediation — demonstration',
  closed_demo: 'Closed — demonstration',
  escalated_demo: 'Escalated — demonstration',
};

export interface AdminComplianceCase {
  id: string;
  reference: string;
  caseType: ComplianceCaseType;
  linkedOrg: string;
  linkedPackage: string;
  linkedRequest: string;
  summary: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  owner: string;
  status: ComplianceCaseStatus;
  dueDate: string;
  notes: AdminNote[];
  history: AdminHistoryEvent[];
  createdAt: string;
  updatedAt: string;
}

// ── Data Subject Request ──
export type DsrStage = 'received_demo' | 'identity_check' | 'scope_clarification' | 'org_coordination' | 'response_prep' | 'closed_demo';

export const DSR_STAGE_LABELS: Record<DsrStage, string> = {
  received_demo: 'Received — demonstration',
  identity_check: 'Identity information required',
  scope_clarification: 'Scope clarification',
  org_coordination: 'Organisation coordination',
  response_prep: 'Response preparation',
  closed_demo: 'Closed — demonstration',
};

export interface AdminDataSubjectRequest {
  id: string;
  reference: string;
  requestType: 'access' | 'rectification' | 'erasure' | 'restriction' | 'portability' | 'objection';
  contactChannel: string;
  linkedOrg: string;
  linkedPackage: string;
  identityCheckStatus: string;
  owner: string;
  stage: DsrStage;
  createdAt: string;
  updatedAt: string;
  notes: AdminNote[];
}

// ── Security Report ──
export type SecurityReportStatus = 'new_demo' | 'triage_demo' | 'investigation_demo' | 'mitigation_demo' | 'monitoring_demo' | 'closed_demo';

export const SECURITY_STATUS_LABELS: Record<SecurityReportStatus, string> = {
  new_demo: 'New — demonstration',
  triage_demo: 'Triage — demonstration',
  investigation_demo: 'Investigation — demonstration',
  mitigation_demo: 'Mitigation — demonstration',
  monitoring_demo: 'Monitoring — demonstration',
  closed_demo: 'Closed — demonstration',
};

export interface AdminSecurityReport {
  id: string;
  reference: string;
  issueType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedFeature: string;
  discoveryDate: string;
  ongoing: boolean;
  contactPreference: string;
  owner: string;
  status: SecurityReportStatus;
  summary: string;
  createdAt: string;
  updatedAt: string;
  notes: AdminNote[];
}

// ── Support Case ──
export type SupportCaseStatus = 'open' | 'in_progress' | 'awaiting_response' | 'resolved_demo' | 'closed_demo';

export interface AdminSupportCase {
  id: string;
  reference: string;
  category: 'buyer' | 'supplier' | 'technical' | 'billing' | 'compliance' | 'general';
  subject: string;
  description: string;
  linkedOrg: string;
  linkedPackage: string;
  linkedRequest: string;
  owner: string;
  status: SupportCaseStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  notes: AdminNote[];
  draftResponses: AdminDraftResponse[];
}

export interface AdminDraftResponse {
  id: string;
  body: string;
  createdAt: string;
  isDraft: boolean;
}

// ── Contract ──
export type ContractType = 'buyer_agreement' | 'supplier_agreement' | 'product_licence' | 'enterprise_agreement' | 'data_processing' | 'commercial_schedule';

export const CONTRACT_TYPE_LABELS: Record<ContractType, string> = {
  buyer_agreement: 'Buyer agreement',
  supplier_agreement: 'Supplier agreement',
  product_licence: 'Product licence',
  enterprise_agreement: 'Enterprise agreement',
  data_processing: 'Data processing terms',
  commercial_schedule: 'Commercial schedule',
};

export interface AdminContract {
  id: string;
  reference: string;
  type: ContractType;
  version: string;
  parties: string[];
  status: 'active_demo' | 'expired_demo' | 'pending_demo' | 'terminated_demo';
  startDate: string;
  endDate: string;
  renewalDate: string;
  linkedProducts: string[];
  documentMetadata: string;
  createdAt: string;
  updatedAt: string;
}

// ── Admin Invoice ──
export interface AdminInvoice {
  id: string;
  number: string;
  orgName: string;
  orgRef: string;
  type: 'membership' | 'product' | 'usage' | 'supplier_payout';
  date: string;
  dueDate: string;
  periodStart: string;
  periodEnd: string;
  description: string;
  subtotal: number;
  vat: number;
  total: number;
  currency: string;
  status: 'draft_demo' | 'open_demo' | 'paid_demo' | 'overdue_demo' | 'void_demo';
  notes: string;
}

// ── Admin Delivery ──
export interface AdminDelivery {
  id: string;
  reference: string;
  buyerOrg: string;
  supplierName: string;
  packageName: string;
  format: string;
  version: string;
  status: 'planned' | 'preparing_demo' | 'ready_demo' | 'downloaded_demo' | 'failed_demo' | 'expired_demo';
  createdDate: string;
  expiryDate: string;
  checksum: string;
  issueReported: boolean;
}

// ── Admin API Usage ──
export interface AdminApiUsageRecord {
  id: string;
  orgName: string;
  orgRef: string;
  packageName: string;
  keyMask: string;
  endpoint: string;
  environment: string;
  requestCount: number;
  rateLimitEvents: number;
  status: 'normal' | 'elevated' | 'rate_limited';
  periodStart: string;
  periodEnd: string;
}

// ── Audit Event ──
export type AuditEventAction =
  | 'org_status_change'
  | 'application_decision'
  | 'package_review'
  | 'access_request_decision'
  | 'compliance_case_update'
  | 'rights_request_update'
  | 'security_case_update'
  | 'billing_status_change'
  | 'role_change'
  | 'settings_change';

export interface AdminAuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: AuditEventAction;
  entity: string;
  entityRef: string;
  previousValue: string;
  newValue: string;
  reason: string;
  environment: string;
  isDemo: boolean;
}

// ── Content Item ──
export interface AdminContentItem {
  id: string;
  section: string;
  title: string;
  contentType: string;
  status: 'published_demo' | 'draft' | 'archived_demo';
  lastEdited: string;
  editor: string;
  preview: string;
}

// ── Admin User ──
export interface AdminUser {
  id: string;
  displayName: string;
  email: string;
  role: AdminRole;
  status: 'active' | 'deactivated_demo';
  lastActive: string | null;
  createdAt: string;
}

// ── System Settings ──
export interface AdminSystemSettings {
  marketplaceMaxCompare: number;
  accessReviewDays: number;
  supplierReviewDays: number;
  referenceFormat: string;
  cookieConsentVersion: string;
  legalDocumentVersions: Record<string, string>;
  fileSizeLimitMb: number;
  rateLimitPerMinute: number;
  featureFlags: Record<string, boolean>;
  maintenanceBanner: string;
}

// ── Shared ──
export interface AdminNote {
  id: string;
  author: string;
  body: string;
  isInternal: boolean;
  createdAt: string;
}

export interface AdminHistoryEvent {
  id: string;
  action: string;
  detail: string;
  actor: string;
  createdAt: string;
  isDemo: boolean;
}

// ── Dashboard ──
export interface AdminDashboardSummary {
  totalOrgs: number;
  totalBuyers: number;
  totalSuppliers: number;
  appsAwaitingReview: number;
  packagesAwaitingReview: number;
  accessRequestsAwaiting: number;
  openComplianceCases: number;
  openRightsRequests: number;
  securityReports: number;
  billingExceptions: number;
  deliveryIssues: number;
}

export interface AdminPriorityItem {
  type: string;
  reference: string;
  title: string;
  age: string;
  priority: string;
  owner: string;
  route: string;
}

// ── Helper ──
export function generateAdminRef(prefix: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DH-DEMO-${prefix}-${result}`;
}

// ═══════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════

export const demoOrganisations: AdminOrganisation[] = [
  {
    id: 'org-1', reference: 'DH-DEMO-ORG-A1B2C3', name: 'Acme Corporation', tradingName: 'Acme Corp', type: 'buyer',
    orgType: 'Limited company', country: 'United Kingdom', registrationNumber: '09123456', website: 'https://acmecorp.example',
    industry: 'Financial services', size: '250-999', city: 'London', businessEmail: 'hello@acmecorp.example',
    status: 'approved_demo', onboardingComplete: true, verificationNotes: 'Organisation details captured locally — verification is not connected.',
    conditions: ['Annual review required'], contacts: [{ name: 'Sarah Chen', role: 'Organisation owner', email: 'sarah.chen@acmecorp.example' }],
    users: [
      { id: 'u-1', name: 'Sarah Chen', email: 'sarah.chen@acmecorp.example', role: 'Organisation owner', status: 'active', lastActive: '2026-07-16T15:30:00Z' },
      { id: 'u-2', name: 'James Okonkwo', email: 'james.okonkwo@acmecorp.example', role: 'Compliance lead', status: 'active', lastActive: '2026-07-15T11:20:00Z' },
    ],
    licences: [{ packageName: 'UK Business Registry Enrichment API', supplier: 'Axiom Registry Intelligence', status: 'Active', startDate: '2026-07-09', endDate: '2027-07-08' }],
    complianceStatus: 'Action needed', billingStatus: 'Good standing', createdAt: '2026-06-15T10:00:00Z', updatedAt: '2026-07-16T15:30:00Z', lastActivity: '2026-07-16T15:30:00Z',
  },
  {
    id: 'org-2', reference: 'DH-DEMO-ORG-D4E5F6', name: 'Brighton Property Analytics Ltd', tradingName: 'BPA', type: 'buyer',
    orgType: 'Limited company', country: 'United Kingdom', registrationNumber: '11234567', website: 'https://bpa.example',
    industry: 'Real estate and property', size: '10-49', city: 'Brighton', businessEmail: 'info@bpa.example',
    status: 'verification_demo', onboardingComplete: true, verificationNotes: 'Pending verification demonstration.',
    conditions: [], contacts: [{ name: 'Michael Davies', role: 'Organisation owner', email: 'michael@bpa.example' }],
    users: [{ id: 'u-3', name: 'Michael Davies', email: 'michael@bpa.example', role: 'Organisation owner', status: 'active', lastActive: '2026-07-14T09:00:00Z' }],
    licences: [], complianceStatus: 'Not started', billingStatus: 'Pending', createdAt: '2026-07-01T08:00:00Z', updatedAt: '2026-07-14T09:00:00Z', lastActivity: '2026-07-14T09:00:00Z',
  },
  {
    id: 'org-3', reference: 'DH-DEMO-ORG-G7H8I9', name: 'Axiom Registry Intelligence', tradingName: 'Axiom', type: 'supplier',
    orgType: 'Limited company', country: 'United Kingdom', registrationNumber: '08234567', website: 'https://axiomregistry.example',
    industry: 'Technology', size: '50-249', city: 'Edinburgh', businessEmail: 'contact@axiomregistry.example',
    status: 'approved_demo', onboardingComplete: true, verificationNotes: 'Approved supplier — demonstration.',
    conditions: ['Quarterly quality review'], contacts: [{ name: 'Eleanor Frost', role: 'Organisation owner', email: 'eleanor@axiomregistry.example' }],
    users: [{ id: 'u-4', name: 'Eleanor Frost', email: 'eleanor@axiomregistry.example', role: 'Organisation owner', status: 'active', lastActive: '2026-07-15T12:00:00Z' }],
    licences: [], complianceStatus: 'Complete', billingStatus: 'Good standing', createdAt: '2026-05-20T10:00:00Z', updatedAt: '2026-07-15T12:00:00Z', lastActivity: '2026-07-15T12:00:00Z',
  },
  {
    id: 'org-4', reference: 'DH-DEMO-ORG-J1K2L3', name: 'GeoRef Data Services', tradingName: 'GeoRef', type: 'supplier',
    orgType: 'Limited company', country: 'United Kingdom', registrationNumber: '10345678', website: 'https://georef.example',
    industry: 'Technology', size: '10-49', city: 'Manchester', businessEmail: 'hello@georef.example',
    status: 'ready_for_review', onboardingComplete: true, verificationNotes: 'Awaiting initial verification review.',
    conditions: [], contacts: [{ name: 'Oliver Grant', role: 'Organisation owner', email: 'oliver@georef.example' }],
    users: [{ id: 'u-5', name: 'Oliver Grant', email: 'oliver@georef.example', role: 'Organisation owner', status: 'active', lastActive: '2026-07-13T14:00:00Z' }],
    licences: [], complianceStatus: 'Not started', billingStatus: 'Pending', createdAt: '2026-07-05T11:00:00Z', updatedAt: '2026-07-13T14:00:00Z', lastActivity: '2026-07-13T14:00:00Z',
  },
  {
    id: 'org-5', reference: 'DH-DEMO-ORG-M4N5O6', name: 'PlaceMetrics Labs', tradingName: 'PlaceMetrics', type: 'supplier',
    orgType: 'Limited company', country: 'United Kingdom', registrationNumber: '12456789', website: 'https://placemetrics.example',
    industry: 'Technology', size: '10-49', city: 'Bristol', businessEmail: 'team@placemetrics.example',
    status: 'approved_demo', onboardingComplete: true, verificationNotes: 'Approved supplier — demonstration.',
    conditions: [], contacts: [{ name: 'Rachel Hughes', role: 'Organisation owner', email: 'rachel@placemetrics.example' }],
    users: [{ id: 'u-6', name: 'Rachel Hughes', email: 'rachel@placemetrics.example', role: 'Organisation owner', status: 'active', lastActive: '2026-07-12T16:00:00Z' }],
    licences: [], complianceStatus: 'Complete', billingStatus: 'Good standing', createdAt: '2026-06-01T09:00:00Z', updatedAt: '2026-07-12T16:00:00Z', lastActivity: '2026-07-12T16:00:00Z',
  },
];

export const demoSupplierApplications: AdminSupplierApplication[] = [
  {
    id: 'sa-1', reference: 'DH-DEMO-SA-P2Q9R4', organisationName: 'GeoRef Data Services', organisationRef: 'DH-DEMO-ORG-J1K2L3',
    representativeName: 'Oliver Grant', representativeEmail: 'oliver@georef.example',
    productName: 'Address Validation and Premises Classification API', productCategory: 'Location intelligence',
    provenanceSummary: 'UK Ordnance Survey and Royal Mail PAF-derived data with quarterly refresh cycle.',
    rightsSummary: 'Crown copyright and database rights licensing through OS Partner scheme.',
    deliverySummary: 'REST API with JSON response format. Batch endpoint available. Rate-limited at 500 calls per minute.',
    commercialSummary: 'Per-request pricing from £0.008 per validation. Volume discounts available above 50,000 monthly.',
    status: 'submitted_demo', priority: 'medium', reviewer: 'A. Reviewer',
    missingInfo: ['Rights evidence documentation metadata', 'Data-flow diagram'],
    conditions: [],
    submittedAt: '2026-07-10T14:30:00Z', updatedAt: '2026-07-13T14:00:00Z',
    notes: [{ id: 'n-sa-1', author: 'A. Reviewer', body: 'Initial review started. Rights evidence and data flow diagram requested.', isInternal: true, createdAt: '2026-07-13T14:00:00Z' }],
    history: [
      { id: 'h-sa-1', action: 'Application submitted', detail: 'Supplier submitted application for review', actor: 'Oliver Grant', createdAt: '2026-07-10T14:30:00Z', isDemo: true },
      { id: 'h-sa-2', action: 'Review started', detail: 'Assigned to A. Reviewer for initial assessment', actor: 'System', createdAt: '2026-07-13T14:00:00Z', isDemo: true },
    ],
  },
  {
    id: 'sa-2', reference: 'DH-DEMO-SA-K8M5T2', organisationName: 'Clarus Consumer Analytics', organisationRef: 'DH-DEMO-ORG-X9Y0Z1',
    representativeName: 'Clara Wilson', representativeEmail: 'clara@clarus.example',
    productName: 'Market Sentiment Research Dashboard', productCategory: 'Market intelligence',
    provenanceSummary: 'Aggregated consumer survey data from nationally representative panels. Quarterly refresh.',
    rightsSummary: 'Proprietary data collection with explicit consent framework.',
    deliverySummary: 'Interactive web dashboard with CSV export and API access.',
    commercialSummary: 'Monthly subscription at £750 per seat. Enterprise licensing available.',
    status: 'under_review_demo', priority: 'low', reviewer: 'A. Reviewer',
    missingInfo: [],
    conditions: [],
    submittedAt: '2026-07-05T09:00:00Z', updatedAt: '2026-07-12T10:00:00Z',
    notes: [{ id: 'n-sa-2', author: 'A. Reviewer', body: 'Product description and survey methodology reviewed. Panel representativeness documentation satisfactory.', isInternal: true, createdAt: '2026-07-12T10:00:00Z' }],
    history: [
      { id: 'h-sa-3', action: 'Application submitted', detail: 'Supplier submitted application for review', actor: 'Clara Wilson', createdAt: '2026-07-05T09:00:00Z', isDemo: true },
      { id: 'h-sa-4', action: 'Review started', detail: 'Application entered review queue', actor: 'System', createdAt: '2026-07-12T10:00:00Z', isDemo: true },
    ],
  },
];

export const demoPackageReviews: AdminPackageReview[] = [
  {
    id: 'pr-1', slug: 'uk-business-registry-enrichment-api', name: 'UK Business Registry Enrichment API',
    supplierName: 'Axiom Registry Intelligence', supplierRef: 'DH-DEMO-ORG-G7H8I9',
    category: 'Company intelligence', accessLevel: 'Standard', version: 'v2.4.1',
    status: 'published_demo', coverageCompleteness: 'Complete', schemaCompleteness: 'Complete',
    provenanceCompleteness: 'Complete', qualityCompleteness: 'Complete', restrictionsCompleteness: 'Complete',
    deliveryCompleteness: 'Complete', pricingCompleteness: 'Complete',
    conditions: ['Quarterly quality review required'],
    reviewer: 'M. Operations', submittedAt: '2026-05-22T10:00:00Z', updatedAt: '2026-06-10T16:00:00Z', publishedAt: '2026-06-10T16:00:00Z',
    notes: [], history: [
      { id: 'h-pr-1', action: 'Package submitted for review', detail: 'Initial package listing submitted', actor: 'Eleanor Frost', createdAt: '2026-05-22T10:00:00Z', isDemo: true },
      { id: 'h-pr-2', action: 'Published', detail: 'Package approved and published to marketplace', actor: 'M. Operations', createdAt: '2026-06-10T16:00:00Z', isDemo: true },
    ],
  },
  {
    id: 'pr-2', slug: 'local-area-demographic-trends', name: 'Local Area Demographic Trends',
    supplierName: 'GeoRef Data Services', supplierRef: 'DH-DEMO-ORG-J1K2L3',
    category: 'Demographics', accessLevel: 'Standard', version: '2026 Q2 Refresh',
    status: 'under_review_demo', coverageCompleteness: 'Complete', schemaCompleteness: 'Incomplete',
    provenanceCompleteness: 'Incomplete', qualityCompleteness: 'Complete', restrictionsCompleteness: 'Complete',
    deliveryCompleteness: 'Incomplete', pricingCompleteness: 'Complete',
    conditions: [],
    reviewer: 'M. Operations', submittedAt: '2026-07-08T09:00:00Z', updatedAt: '2026-07-15T11:00:00Z', publishedAt: null,
    notes: [{ id: 'n-pr-2', author: 'M. Operations', body: 'Schema documentation and delivery format details need to be completed before publication.', isInternal: true, createdAt: '2026-07-15T11:00:00Z' }],
    history: [
      { id: 'h-pr-3', action: 'Package submitted for review', detail: 'Package listing submitted for moderation', actor: 'Oliver Grant', createdAt: '2026-07-08T09:00:00Z', isDemo: true },
      { id: 'h-pr-4', action: 'Review started', detail: 'Under review — schema and provenance sections incomplete', actor: 'M. Operations', createdAt: '2026-07-15T11:00:00Z', isDemo: true },
    ],
  },
  {
    id: 'pr-3', slug: 'sme-commercial-risk-signals', name: 'SME Commercial Risk Signals',
    supplierName: 'Axiom Registry Intelligence', supplierRef: 'DH-DEMO-ORG-G7H8I9',
    category: 'Financial risk', accessLevel: 'Controlled', version: 'v1.2.0',
    status: 'published_demo', coverageCompleteness: 'Complete', schemaCompleteness: 'Complete',
    provenanceCompleteness: 'Complete', qualityCompleteness: 'Complete', restrictionsCompleteness: 'Complete',
    deliveryCompleteness: 'Complete', pricingCompleteness: 'Complete',
    conditions: ['Controlled access — compliance review required for each access request', 'Annual licence review'],
    reviewer: 'M. Operations', submittedAt: '2026-06-01T12:00:00Z', updatedAt: '2026-06-20T15:00:00Z', publishedAt: '2026-06-20T15:00:00Z',
    notes: [], history: [
      { id: 'h-pr-5', action: 'Package submitted for review', detail: 'Controlled-access package listing submitted', actor: 'Eleanor Frost', createdAt: '2026-06-01T12:00:00Z', isDemo: true },
      { id: 'h-pr-6', action: 'Published', detail: 'Approved with controlled-access conditions', actor: 'M. Operations', createdAt: '2026-06-20T15:00:00Z', isDemo: true },
    ],
  },
];

export const demoAdminAccessRequests: AdminAccessRequest[] = [
  {
    id: 'aar-1', reference: 'DH-DEMO-AR-7K4M9P', buyerOrg: 'Acme Corporation', buyerRef: 'DH-DEMO-ORG-A1B2C3',
    packageName: 'UK Business Registry Enrichment API', supplierName: 'Axiom Registry Intelligence',
    purpose: 'Customer due diligence and KYC verification for new business banking clients under FCA regulatory obligations.',
    status: 'approved_demo', riskFlags: [], reviewer: 'C. Compliance',
    conditions: ['Annual compliance review required', 'No onward sharing without supplier consent'],
    supplierResponse: 'Approved — use case aligns with standard licence.',
    complianceReviewNotes: 'Intended use verified against permitted-use framework. FCA regulatory basis noted.',
    createdAt: '2026-07-01T09:15:00Z', updatedAt: '2026-07-08T14:32:00Z',
    notes: [], history: [
      { id: 'h-ar-1', action: 'Submitted', detail: 'Buyer submitted access request', actor: 'Sarah Chen', createdAt: '2026-07-01T09:15:00Z', isDemo: true },
      { id: 'h-ar-2', action: 'Approved', detail: 'Approved with conditions by compliance review', actor: 'C. Compliance', createdAt: '2026-07-08T14:32:00Z', isDemo: true },
    ],
  },
  {
    id: 'aar-2', reference: 'DH-DEMO-AR-2X8N3L', buyerOrg: 'Acme Corporation', buyerRef: 'DH-DEMO-ORG-A1B2C3',
    packageName: 'SME Commercial Risk Signals', supplierName: 'Axiom Registry Intelligence',
    purpose: 'Trade credit risk assessment for SME supplier onboarding programme.',
    status: 'compliance_review_demo', riskFlags: ['Financial risk scoring', 'Sensitive data'],
    reviewer: 'C. Compliance',
    conditions: [], supplierResponse: '', complianceReviewNotes: 'Under compliance review — sensitive financial-risk data framework applies.',
    createdAt: '2026-07-12T16:20:00Z', updatedAt: '2026-07-14T10:45:00Z',
    notes: [], history: [
      { id: 'h-ar-3', action: 'Submitted', detail: 'Buyer submitted access request', actor: 'Sarah Chen', createdAt: '2026-07-12T16:20:00Z', isDemo: true },
      { id: 'h-ar-4', action: 'Compliance review started', detail: 'Routed to compliance review — sensitive data framework', actor: 'System', createdAt: '2026-07-14T10:45:00Z', isDemo: true },
    ],
  },
  {
    id: 'aar-3', reference: 'DH-DEMO-AR-5Y1W6R', buyerOrg: 'Acme Corporation', buyerRef: 'DH-DEMO-ORG-A1B2C3',
    packageName: 'Address Validation and Premises Classification API', supplierName: 'GeoRef Data Services',
    purpose: 'Address validation and geocoding for insurance underwriting.',
    status: 'submitted_demo', riskFlags: [],
    reviewer: '', conditions: [], supplierResponse: '', complianceReviewNotes: '',
    createdAt: '2026-07-16T11:00:00Z', updatedAt: '2026-07-16T11:00:00Z',
    notes: [], history: [
      { id: 'h-ar-5', action: 'Submitted', detail: 'Buyer submitted access request', actor: 'Sarah Chen', createdAt: '2026-07-16T11:00:00Z', isDemo: true },
    ],
  },
];

export const demoComplianceCases: AdminComplianceCase[] = [
  {
    id: 'cc-1', reference: 'DH-DEMO-CC-A3K9M2', caseType: 'intended_use_review',
    linkedOrg: 'Acme Corporation', linkedPackage: 'UK Business Registry Enrichment API', linkedRequest: 'DH-DEMO-AR-7K4M9P',
    summary: 'Annual intended-use review due for KYC verification licence. Confirm purpose remains valid.',
    priority: 'medium', owner: 'C. Compliance', status: 'open',
    dueDate: '2026-07-31', notes: [], history: [
      { id: 'h-cc-1', action: 'Case opened', detail: 'Annual intended-use review triggered', actor: 'System', createdAt: '2026-07-01T00:00:00Z', isDemo: true },
    ],
    createdAt: '2026-07-01T00:00:00Z', updatedAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 'cc-2', reference: 'DH-DEMO-CC-M7X4P1', caseType: 'retention_concern',
    linkedOrg: 'Brighton Property Analytics Ltd', linkedPackage: 'Local Area Demographic Trends', linkedRequest: '',
    summary: 'Retention period for demographic data exports exceeds package licence terms. Review required.',
    priority: 'high', owner: 'C. Compliance', status: 'under_review_demo',
    dueDate: '2026-08-15', notes: [
      { id: 'n-cc-2', author: 'C. Compliance', body: 'Buyer contacted — retention schedule under review. Awaiting updated retention plan.', isInternal: true, createdAt: '2026-07-14T10:00:00Z' },
    ],
    history: [
      { id: 'h-cc-2', action: 'Case opened', detail: 'Retention concern flagged during quarterly audit', actor: 'System', createdAt: '2026-07-10T08:00:00Z', isDemo: true },
      { id: 'h-cc-3', action: 'Under review', detail: 'Assigned to C. Compliance for investigation', actor: 'System', createdAt: '2026-07-14T10:00:00Z', isDemo: true },
    ],
    createdAt: '2026-07-10T08:00:00Z', updatedAt: '2026-07-14T10:00:00Z',
  },
];

export const demoDataSubjectRequests: AdminDataSubjectRequest[] = [
  {
    id: 'dsr-1', reference: 'DH-DEMO-DSR-N7K2P9', requestType: 'access', contactChannel: 'Online form',
    linkedOrg: 'Acme Corporation', linkedPackage: '', identityCheckStatus: 'Demonstration — pending',
    owner: 'C. Compliance', stage: 'identity_check',
    createdAt: '2026-07-13T12:00:00Z', updatedAt: '2026-07-15T09:00:00Z',
    notes: [{ id: 'n-dsr-1', author: 'C. Compliance', body: 'Identity verification information requested from the data subject.', isInternal: true, createdAt: '2026-07-15T09:00:00Z' }],
  },
  {
    id: 'dsr-2', reference: 'DH-DEMO-DSR-T3V8W1', requestType: 'erasure', contactChannel: 'Email',
    linkedOrg: 'Brighton Property Analytics Ltd', linkedPackage: 'Local Area Demographic Trends', identityCheckStatus: 'Demonstration — verified',
    owner: 'C. Compliance', stage: 'scope_clarification',
    createdAt: '2026-07-08T14:00:00Z', updatedAt: '2026-07-14T11:00:00Z',
    notes: [{ id: 'n-dsr-2', author: 'C. Compliance', body: 'Erasure request scope being clarified with the buyer organisation.', isInternal: true, createdAt: '2026-07-14T11:00:00Z' }],
  },
];

export const demoSecurityReports: AdminSecurityReport[] = [
  {
    id: 'sr-1', reference: 'DH-DEMO-SR-Q5N9M2', issueType: 'Access-control concern', severity: 'medium',
    affectedFeature: 'Buyer portal — API key management', discoveryDate: '2026-07-12', ongoing: false,
    contactPreference: 'Email', owner: 'S. Security', status: 'mitigation_demo',
    summary: 'Report received regarding API key scope visibility between team members. Mitigation applied — key masking now enforced at display layer.',
    createdAt: '2026-07-12T15:00:00Z', updatedAt: '2026-07-15T16:00:00Z',
    notes: [{ id: 'n-sr-1', author: 'S. Security', body: 'Mitigation deployed. Monitoring for 30 days before closure.', isInternal: true, createdAt: '2026-07-15T16:00:00Z' }],
  },
  {
    id: 'sr-2', reference: 'DH-DEMO-SR-L8K3P7', issueType: 'Rate-limiting bypass', severity: 'low',
    affectedFeature: 'Marketplace API', discoveryDate: '2026-07-16', ongoing: true,
    contactPreference: 'Contact form', owner: 'S. Security', status: 'investigation_demo',
    summary: 'Potential rate-limiting bypass identified in batch endpoint. Under investigation — no exploitation confirmed.',
    createdAt: '2026-07-16T08:00:00Z', updatedAt: '2026-07-16T10:00:00Z',
    notes: [],
  },
];

export const demoSupportCases: AdminSupportCase[] = [
  {
    id: 'sc-1', reference: 'DH-DEMO-SC-M4P9N2', category: 'buyer', subject: 'Unable to download delivery file',
    description: 'Buyer reports that the Local Area Demographic Trends delivery file returns a checksum mismatch when downloaded.',
    linkedOrg: 'Acme Corporation', linkedPackage: 'Local Area Demographic Trends', linkedRequest: '',
    owner: 'S. Support', status: 'in_progress', priority: 'medium',
    createdAt: '2026-07-14T14:30:00Z', updatedAt: '2026-07-15T11:00:00Z',
    notes: [{ id: 'n-sc-1', author: 'S. Support', body: 'Investigating checksum mismatch. Suspect CDN caching issue.', isInternal: true, createdAt: '2026-07-15T11:00:00Z' }],
    draftResponses: [{ id: 'dr-sc-1', body: 'Thank you for reporting this. We are investigating the checksum mismatch and will update you within 24 hours.', createdAt: '2026-07-15T11:05:00Z', isDraft: true }],
  },
  {
    id: 'sc-2', reference: 'DH-DEMO-SC-R7T3K8', category: 'supplier', subject: 'Package schema not displaying correctly',
    description: 'Supplier reports that the data dictionary for the Address Validation API is not rendering all field descriptions.',
    linkedOrg: 'GeoRef Data Services', linkedPackage: 'address-validation-premises-classification-api', linkedRequest: '',
    owner: 'S. Support', status: 'open', priority: 'low',
    createdAt: '2026-07-16T09:15:00Z', updatedAt: '2026-07-16T09:15:00Z',
    notes: [], draftResponses: [],
  },
];

export const demoContracts: AdminContract[] = [
  {
    id: 'ct-1', reference: 'DH-DEMO-CT-A3K9M2', type: 'buyer_agreement', version: 'Draft 1.0',
    parties: ['Acme Corporation', 'DataHarbour'], status: 'active_demo',
    startDate: '2026-07-01', endDate: '2027-06-30', renewalDate: '2027-06-15',
    linkedProducts: [], documentMetadata: 'Buyer Organisation Agreement — demonstration.',
    createdAt: '2026-07-01T00:00:00Z', updatedAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 'ct-2', reference: 'DH-DEMO-CT-M7X4P1', type: 'product_licence', version: '1.0',
    parties: ['Acme Corporation', 'Axiom Registry Intelligence'], status: 'active_demo',
    startDate: '2026-07-09', endDate: '2027-07-08', renewalDate: '2027-06-08',
    linkedProducts: ['UK Business Registry Enrichment API'], documentMetadata: 'Product licence — UK BRI API. Standard terms.',
    createdAt: '2026-07-09T00:00:00Z', updatedAt: '2026-07-09T00:00:00Z',
  },
  {
    id: 'ct-3', reference: 'DH-DEMO-CT-R2N8K5', type: 'supplier_agreement', version: 'Draft 1.0',
    parties: ['Axiom Registry Intelligence', 'DataHarbour'], status: 'active_demo',
    startDate: '2026-05-22', endDate: '2027-05-21', renewalDate: '2027-05-07',
    linkedProducts: ['UK Business Registry Enrichment API', 'SME Commercial Risk Signals'], documentMetadata: 'Supplier Agreement — demonstration.',
    createdAt: '2026-05-22T00:00:00Z', updatedAt: '2026-05-22T00:00:00Z',
  },
];

export const demoAdminInvoices: AdminInvoice[] = [
  { id: 'ai-1', number: 'DH-DEMO-INV-2026-0001', orgName: 'Acme Corporation', orgRef: 'DH-DEMO-ORG-A1B2C3', type: 'membership', date: '2026-07-01', dueDate: '2026-07-31', periodStart: '2026-07-01', periodEnd: '2026-07-31', description: 'Buyer Organisation Membership — Annual fee 2026/2027', subtotal: 2400, vat: 480, total: 2880, currency: 'GBP', status: 'paid_demo', notes: '' },
  { id: 'ai-2', number: 'DH-DEMO-INV-2026-0002', orgName: 'Acme Corporation', orgRef: 'DH-DEMO-ORG-A1B2C3', type: 'product', date: '2026-07-15', dueDate: '2026-08-14', periodStart: '2026-07-01', periodEnd: '2026-07-31', description: 'UK Business Registry Enrichment API — July 2026 usage', subtotal: 210, vat: 42, total: 252, currency: 'GBP', status: 'open_demo', notes: '' },
  { id: 'ai-3', number: 'DH-DEMO-INV-2026-0003', orgName: 'Acme Corporation', orgRef: 'DH-DEMO-ORG-A1B2C3', type: 'product', date: '2026-06-01', dueDate: '2026-06-30', periodStart: '2026-06-01', periodEnd: '2026-06-30', description: 'Regional Retail Footfall Index — June 2026', subtotal: 950, vat: 190, total: 1140, currency: 'GBP', status: 'paid_demo', notes: '' },
  { id: 'ai-4', number: 'DH-DEMO-INV-2026-0004', orgName: 'Brighton Property Analytics Ltd', orgRef: 'DH-DEMO-ORG-D4E5F6', type: 'membership', date: '2026-07-05', dueDate: '2026-08-04', periodStart: '2026-07-05', periodEnd: '2026-08-04', description: 'Buyer Organisation Membership — First month', subtotal: 200, vat: 40, total: 240, currency: 'GBP', status: 'overdue_demo', notes: 'Payment overdue by 12 days.' },
];

export const demoAdminDeliveries: AdminDelivery[] = [
  { id: 'ad-1', reference: 'DH-DEMO-DEL-P8M2X9', buyerOrg: 'Acme Corporation', supplierName: 'Axiom Registry Intelligence', packageName: 'UK Business Registry Enrichment API', format: 'REST API', version: 'v2.4.1', status: 'ready_demo', createdDate: '2026-07-09', expiryDate: '2027-07-08', checksum: 'N/A — API', issueReported: false },
  { id: 'ad-2', reference: 'DH-DEMO-DEL-T6V1W4', buyerOrg: 'Acme Corporation', supplierName: 'GeoRef Data Services', packageName: 'Local Area Demographic Trends', format: 'CSV download', version: '2026 Q2 Refresh', status: 'ready_demo', createdDate: '2026-07-05', expiryDate: '2027-01-05', checksum: 'sha256:d3m0-a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6', issueReported: false },
  { id: 'ad-3', reference: 'DH-DEMO-DEL-L4K7N3', buyerOrg: 'Acme Corporation', supplierName: 'PlaceMetrics Labs', packageName: 'Regional Retail Footfall Index', format: 'Dashboard', version: 'Q3 2026 Refresh', status: 'ready_demo', createdDate: '2026-06-21', expiryDate: '2027-06-20', checksum: 'N/A — dashboard', issueReported: false },
];

export const demoAdminApiUsage: AdminApiUsageRecord[] = [
  { id: 'au-1', orgName: 'Acme Corporation', orgRef: 'DH-DEMO-ORG-A1B2C3', packageName: 'UK Business Registry Enrichment API', keyMask: 'dh_demo_sk_live_****_a1b2c3', endpoint: '/v2/company/lookup', environment: 'production_demo', requestCount: 5313, rateLimitEvents: 12, status: 'normal', periodStart: '2026-07-01', periodEnd: '2026-07-16' },
  { id: 'au-2', orgName: 'Acme Corporation', orgRef: 'DH-DEMO-ORG-A1B2C3', packageName: 'Regional Retail Footfall Index', keyMask: 'dh_demo_sk_sandbox_****_x9y8z7', endpoint: '/v1/footfall/export', environment: 'sandbox_demo', requestCount: 17, rateLimitEvents: 0, status: 'normal', periodStart: '2026-07-01', periodEnd: '2026-07-16' },
];

export const demoAuditEvents: AdminAuditEvent[] = [
  { id: 'ae-1', timestamp: '2026-07-16T11:00:00Z', actor: 'C. Compliance', action: 'compliance_case_update', entity: 'Compliance case', entityRef: 'DH-DEMO-CC-M7X4P1', previousValue: 'Open', newValue: 'Under review — demonstration', reason: 'Investigation started', environment: 'demonstration', isDemo: true },
  { id: 'ae-2', timestamp: '2026-07-15T16:00:00Z', actor: 'S. Security', action: 'security_case_update', entity: 'Security report', entityRef: 'DH-DEMO-SR-Q5N9M2', previousValue: 'Investigation — demo', newValue: 'Mitigation — demo', reason: 'Mitigation deployed', environment: 'demonstration', isDemo: true },
  { id: 'ae-3', timestamp: '2026-07-08T14:32:00Z', actor: 'C. Compliance', action: 'access_request_decision', entity: 'Access request', entityRef: 'DH-DEMO-AR-7K4M9P', previousValue: 'Compliance review — demo', newValue: 'Approved — demo', reason: 'Intended use verified', environment: 'demonstration', isDemo: true },
  { id: 'ae-4', timestamp: '2026-07-01T00:00:00Z', actor: 'System', action: 'org_status_change', entity: 'Organisation', entityRef: 'DH-DEMO-ORG-A1B2C3', previousValue: 'Verification — demo', newValue: 'Approved — demo', reason: 'Onboarding completed', environment: 'demonstration', isDemo: true },
  { id: 'ae-5', timestamp: '2026-06-20T15:00:00Z', actor: 'M. Operations', action: 'package_review', entity: 'Package', entityRef: 'sme-commercial-risk-signals', previousValue: 'Under review — demo', newValue: 'Published — demo', reason: 'Controlled-access conditions met', environment: 'demonstration', isDemo: true },
  { id: 'ae-6', timestamp: '2026-06-10T16:00:00Z', actor: 'M. Operations', action: 'package_review', entity: 'Package', entityRef: 'uk-business-registry-enrichment-api', previousValue: 'Under review — demo', newValue: 'Published — demo', reason: 'All sections complete', environment: 'demonstration', isDemo: true },
];

export const demoContentItems: AdminContentItem[] = [
  { id: 'ci-1', section: 'Homepage', title: 'Hero section — headline and CTA', contentType: 'Hero', status: 'published_demo', lastEdited: '2026-07-01', editor: 'Content Editor', preview: 'DataHarbour — The UK Data Trust and Intelligence Marketplace' },
  { id: 'ci-2', section: 'Compliance', title: 'Compliance hub — permitted-use framework', contentType: 'Page', status: 'published_demo', lastEdited: '2026-06-15', editor: 'Content Editor', preview: 'Permitted use framework overview' },
  { id: 'ci-3', section: 'Suppliers', title: 'Supplier application guidance', contentType: 'Page', status: 'draft', lastEdited: '2026-07-14', editor: 'Content Editor', preview: 'Updated supplier onboarding guidance — pending review' },
  { id: 'ci-4', section: 'Legal', title: 'Privacy Policy — Draft 1.1', contentType: 'Legal', status: 'draft', lastEdited: '2026-07-12', editor: 'Content Editor', preview: 'Updated privacy policy reflecting expanded data categories' },
  { id: 'ci-5', section: 'Global', title: 'Announcement banner', contentType: 'Banner', status: 'draft', lastEdited: '2026-07-16', editor: 'Content Editor', preview: 'New supplier: Clarus Consumer Analytics — Market Sentiment Research Dashboard now available' },
];

export const demoAdminUsers: AdminUser[] = [
  { id: 'au-1', displayName: 'Alex Hartley', email: 'alex.hartley@dataharbour-admin.example', role: 'super_administrator_demo', status: 'active', lastActive: '2026-07-16T16:45:00Z', createdAt: '2026-05-01T09:00:00Z' },
  { id: 'au-2', displayName: 'Maya Okonkwo', email: 'maya.okonkwo@dataharbour-admin.example', role: 'marketplace_operations', status: 'active', lastActive: '2026-07-16T14:30:00Z', createdAt: '2026-05-10T10:00:00Z' },
  { id: 'au-3', displayName: 'Chris Davies', email: 'chris.davies@dataharbour-admin.example', role: 'compliance_review', status: 'active', lastActive: '2026-07-15T17:00:00Z', createdAt: '2026-06-01T09:00:00Z' },
  { id: 'au-4', displayName: 'Sam Reynolds', email: 'sam.reynolds@dataharbour-admin.example', role: 'security_review', status: 'active', lastActive: '2026-07-16T10:15:00Z', createdAt: '2026-06-15T09:00:00Z' },
  { id: 'au-5', displayName: 'Jordan Taylor', email: 'jordan.taylor@dataharbour-admin.example', role: 'billing_operations', status: 'active', lastActive: '2026-07-14T11:00:00Z', createdAt: '2026-07-01T09:00:00Z' },
];

export const demoDefaultSettings: AdminSystemSettings = {
  marketplaceMaxCompare: 4,
  accessReviewDays: 14,
  supplierReviewDays: 21,
  referenceFormat: 'DH-DEMO-{TYPE}-{RANDOM}',
  cookieConsentVersion: '1.0',
  legalDocumentVersions: { 'privacy': 'Draft 1.1', 'marketplace-terms': 'Draft 1.0', 'acceptable-use': 'Draft 1.0', 'buyer-terms': 'Draft 1.0' },
  fileSizeLimitMb: 500,
  rateLimitPerMinute: 100,
  featureFlags: { 'supplier_self_service': true, 'advanced_comparisons': false, 'clean_room_preview': false },
  maintenanceBanner: '',
};

export function computeAdminDashboard(): { summary: AdminDashboardSummary; priorityQueue: AdminPriorityItem[] } {
  const summary: AdminDashboardSummary = {
    totalOrgs: demoOrganisations.length,
    totalBuyers: demoOrganisations.filter(o => o.type === 'buyer').length,
    totalSuppliers: demoOrganisations.filter(o => o.type === 'supplier').length,
    appsAwaitingReview: demoSupplierApplications.filter(a => a.status === 'submitted_demo' || a.status === 'under_review_demo').length,
    packagesAwaitingReview: demoPackageReviews.filter(p => p.status === 'under_review_demo' || p.status === 'changes_requested_demo').length,
    accessRequestsAwaiting: demoAdminAccessRequests.filter(r => r.status === 'submitted_demo' || r.status === 'compliance_review_demo').length,
    openComplianceCases: demoComplianceCases.filter(c => c.status !== 'closed_demo').length,
    openRightsRequests: demoDataSubjectRequests.filter(d => d.stage !== 'closed_demo').length,
    securityReports: demoSecurityReports.filter(s => s.status !== 'closed_demo').length,
    billingExceptions: demoAdminInvoices.filter(i => i.status === 'overdue_demo').length,
    deliveryIssues: demoAdminDeliveries.filter(d => d.issueReported).length,
  };

  const priorityQueue: AdminPriorityItem[] = [
    { type: 'Compliance', reference: 'DH-DEMO-CC-M7X4P1', title: 'Retention concern — Brighton Property Analytics', age: '7 days', priority: 'High', owner: 'C. Compliance', route: '/admin/compliance' },
    { type: 'Billing', reference: 'DH-DEMO-INV-2026-0004', title: 'Overdue invoice — Brighton Property Analytics', age: '12 days', priority: 'High', owner: 'J. Taylor', route: '/admin/billing' },
    { type: 'Access Request', reference: 'DH-DEMO-AR-2X8N3L', title: 'SME Risk Signals — compliance review', age: '3 days', priority: 'Medium', owner: 'C. Compliance', route: '/admin/access-requests' },
    { type: 'Supplier App', reference: 'DH-DEMO-SA-P2Q9R4', title: 'GeoRef Data Services — missing information', age: '4 days', priority: 'Medium', owner: 'A. Reviewer', route: '/admin/supplier-applications' },
    { type: 'Security', reference: 'DH-DEMO-SR-L8K3P7', title: 'Rate-limiting bypass investigation', age: '1 day', priority: 'Low', owner: 'S. Security', route: '/admin/security-reports' },
  ];

  return { summary, priorityQueue };
}