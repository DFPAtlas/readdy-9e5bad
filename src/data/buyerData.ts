// ── DataHarbour Buyer Portal Demonstration Types ──
// All data is fictional demonstration information only.
// No real accounts, access, payments, API keys or deliveries exist.

import type { MarketplacePackage } from '@/data/marketplacePackages';

// ── Access Request ──
export type AccessRequestStatus =
  | 'draft'
  | 'submitted_demo'
  | 'awaiting_info'
  | 'compliance_review_demo'
  | 'supplier_review_demo'
  | 'approved_demo'
  | 'approved_conditions_demo'
  | 'declined_demo'
  | 'withdrawn'
  | 'expired_demo'
  | 'suspended_demo';

export type DeliveryPreference = 'api' | 'scheduled_feed' | 'secure_download' | 'dashboard_report' | 'clean_room' | 'sftp';

export interface BuyerAccessRequest {
  id: string;
  reference: string;
  packageSlug: string;
  packageName: string;
  supplierName: string;
  intendedUseSummary: string;
  deliveryPreference: DeliveryPreference;
  estimatedVolume: string;
  estimatedUsers: string;
  retentionPlan: string;
  sharingExpectations: string;
  status: AccessRequestStatus;
  conditions: string[];
  messages: AccessRequestMessage[];
  activityLog: AccessRequestActivity[];
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  resolvedAt: string | null;
}

export interface AccessRequestMessage {
  id: string;
  direction: 'buyer' | 'supplier_demo' | 'compliance_demo';
  sender: string;
  body: string;
  createdAt: string;
  isDemo: boolean;
}

export interface AccessRequestActivity {
  id: string;
  action: string;
  detail: string;
  actor: string;
  createdAt: string;
  isDemo: boolean;
}

// ── Subscription & Licence ──
export type SubscriptionStatus =
  | 'planned'
  | 'demo_active'
  | 'renewal_due_demo'
  | 'expired_demo'
  | 'suspended_demo';

export interface BuyerSubscription {
  id: string;
  reference: string;
  type: 'membership' | 'data_product' | 'package_licence' | 'enterprise_agreement';
  name: string;
  packageSlug: string | null;
  supplierName: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  renewalDate: string;
  billingModel: string;
  billingAmount: string;
  billingCycle: string;
  allowance: string;
  usagePercentage: number;
  conditions: SubscriptionCondition[];
}

export interface SubscriptionCondition {
  permittedPurpose: string;
  prohibitedUses: string[];
  geography: string;
  usersOrTeams: string;
  retention: string;
  sharing: string;
  delivery: string;
  usageLimits: string;
  renewalTerms: string;
  suspensionConditions: string;
}

// ── Delivery ──
export type DeliveryStatus =
  | 'planned'
  | 'preparing_demo'
  | 'ready_demo'
  | 'downloaded_demo'
  | 'expired_demo'
  | 'failed_demo';

export interface BuyerDelivery {
  id: string;
  reference: string;
  packageName: string;
  packageSlug: string;
  deliveryType: string;
  format: string;
  version: string;
  fileName: string;
  fileSize: string;
  recordCount: number;
  checksum: string;
  createdDate: string;
  expiryDate: string;
  status: DeliveryStatus;
  manifest: DeliveryManifestEntry[];
  restrictions: string[];
  activityLog: DeliveryActivity[];
}

export interface DeliveryManifestEntry {
  field: string;
  type: string;
  description: string;
}

export interface DeliveryActivity {
  id: string;
  action: string;
  detail: string;
  createdAt: string;
}

// ── API Key ──
export type ApiKeyStatus = 'active' | 'revoked' | 'expired_demo';
export type ApiKeyEnvironment = 'sandbox_demo' | 'production_demo';

export interface BuyerApiKey {
  id: string;
  displayName: string;
  maskedValue: string;
  environment: ApiKeyEnvironment;
  packageScope: string;
  permissions: string[];
  createdAt: string;
  lastUsed: string | null;
  expiresAt: string | null;
  status: ApiKeyStatus;
}

// ── Usage ──
export interface BuyerUsageEvent {
  id: string;
  date: string;
  packageName: string;
  packageSlug: string;
  apiKeyName: string;
  unit: 'api_request' | 'record' | 'file' | 'data_volume' | 'clean_room_job';
  count: number;
  environment: string;
  endpoint: string;
  status: 'success' | 'error' | 'rate_limited';
}

export interface BuyerUsageSummary {
  totalApiRequests: number;
  totalRecords: number;
  totalFiles: number;
  totalDataVolumeGb: number;
  totalCleanRoomJobs: number;
  rateLimitEvents: number;
  activePackages: number;
  periodStart: string;
  periodEnd: string;
}

// ── Billing ──
export type InvoiceStatus = 'draft_demo' | 'open_demo' | 'paid_demo' | 'overdue_demo' | 'void_demo';

export interface BuyerInvoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  periodStart: string;
  periodEnd: string;
  description: string;
  items: BuyerInvoiceItem[];
  subtotal: number;
  vat: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
}

export interface BuyerInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// ── Team ──
export interface BuyerTeamMember {
  id: string;
  fullName: string;
  workEmail: string;
  role: string;
  department: string;
  accessLevel: string;
  lastActiveDate: string | null;
  packageAccess: string[];
  status: 'active' | 'deactivated_demo';
}

// ── Compliance ──
export type ComplianceItemStatus = 'complete_demo' | 'action_needed' | 'planned_review' | 'expired_demo' | 'not_started';

export interface BuyerComplianceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: ComplianceItemStatus;
  lastReviewed: string | null;
  nextReviewDue: string | null;
  actionLabel: string | null;
  actionRoute: string | null;
}

// ── Notification ──
export type NotificationCategory = 'access_requests' | 'deliveries' | 'usage' | 'billing' | 'compliance' | 'team' | 'product_updates' | 'security_notices';

export interface BuyerNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  read: boolean;
  linkedRoute: string | null;
  createdAt: string;
}

// ── Activity ──
export type ActivityType = 'saved_package' | 'comparison' | 'access_draft' | 'team_change' | 'invoice_view' | 'delivery_download' | 'settings_change';

export interface BuyerActivityEvent {
  id: string;
  type: ActivityType;
  description: string;
  detail: string;
  createdAt: string;
}

// ── Dashboard Summary ──
export interface BuyerDashboardSummary {
  savedPackages: number;
  activeComparisons: number;
  accessRequests: number;
  demoLicences: number;
  plannedDeliveries: number;
  apiUsageThisMonth: number;
  openBillingItems: number;
  complianceActions: number;
}

// ── Named Comparison ──
export interface NamedComparison {
  id: string;
  name: string;
  packageSlugs: string[];
  createdAt: string;
  updatedAt: string;
}

// ── Options ──
export const ACCESS_REQUEST_STATUS_LABELS: Record<AccessRequestStatus, string> = {
  draft: 'Draft',
  submitted_demo: 'Submitted — demonstration',
  awaiting_info: 'Awaiting information',
  compliance_review_demo: 'Compliance review — demonstration',
  supplier_review_demo: 'Supplier review — demonstration',
  approved_demo: 'Approved — demonstration',
  approved_conditions_demo: 'Approved with conditions — demonstration',
  declined_demo: 'Declined — demonstration',
  withdrawn: 'Withdrawn',
  expired_demo: 'Expired — demonstration',
  suspended_demo: 'Suspended — demonstration',
};

export const ACCESS_REQUEST_STATUS_COLORS: Record<AccessRequestStatus, string> = {
  draft: 'bg-foreground-100 text-foreground-700',
  submitted_demo: 'bg-secondary-100 text-secondary-900',
  awaiting_info: 'bg-accent-100 text-accent-900',
  compliance_review_demo: 'bg-secondary-100 text-secondary-900',
  supplier_review_demo: 'bg-secondary-100 text-secondary-900',
  approved_demo: 'bg-accent-100 text-accent-900',
  approved_conditions_demo: 'bg-accent-100 text-accent-900',
  declined_demo: 'bg-foreground-200 text-foreground-700',
  withdrawn: 'bg-foreground-100 text-foreground-600',
  expired_demo: 'bg-foreground-100 text-foreground-600',
  suspended_demo: 'bg-foreground-200 text-foreground-700',
};

export const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, string> = {
  planned: 'Planned',
  demo_active: 'Active — demonstration',
  renewal_due_demo: 'Renewal due — demonstration',
  expired_demo: 'Expired — demonstration',
  suspended_demo: 'Suspended — demonstration',
};

export const DELIVERY_STATUS_LABELS: Record<DeliveryStatus, string> = {
  planned: 'Planned',
  preparing_demo: 'Preparing — demonstration',
  ready_demo: 'Ready — demonstration',
  downloaded_demo: 'Downloaded — demonstration',
  expired_demo: 'Expired — demonstration',
  failed_demo: 'Failed — demonstration',
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft_demo: 'Draft — demonstration',
  open_demo: 'Open — demonstration',
  paid_demo: 'Paid — demonstration',
  overdue_demo: 'Overdue — demonstration',
  void_demo: 'Void — demonstration',
};

export const NOTIFICATION_CATEGORY_LABELS: Record<NotificationCategory, string> = {
  access_requests: 'Access Requests',
  deliveries: 'Deliveries',
  usage: 'Usage',
  billing: 'Billing',
  compliance: 'Compliance',
  team: 'Team',
  product_updates: 'Product Updates',
  security_notices: 'Security Notices',
};

export function generateBuyerRef(prefix: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DH-DEMO-${prefix}-${result}`;
}

// ── Mock Data ──
export const demoAccessRequests: BuyerAccessRequest[] = [
  {
    id: 'ar-1',
    reference: 'DH-DEMO-AR-7K4M9P',
    packageSlug: 'uk-business-registry-enrichment-api',
    packageName: 'UK Business Registry Enrichment API',
    supplierName: 'Axiom Registry Intelligence',
    intendedUseSummary: 'Customer due diligence and KYC verification for new business banking clients under FCA regulatory obligations.',
    deliveryPreference: 'api',
    estimatedVolume: 'Medium — approximately 5,000 lookups per month',
    estimatedUsers: '8–12 compliance analysts',
    retentionPlan: 'Query results retained for 7 years per regulatory record-keeping requirements',
    sharingExpectations: 'Internal use only within the compliance and risk departments',
    status: 'approved_demo',
    conditions: ['Annual compliance review required', 'Package usage must remain within declared purpose', 'No onward sharing without supplier consent'],
    messages: [
      { id: 'm-1', direction: 'compliance_demo', sender: 'Compliance Review', body: 'Your intended use aligns with the permitted-use framework. The package is approved subject to the conditions listed below.', createdAt: '2026-07-08T14:30:00Z', isDemo: true },
    ],
    activityLog: [
      { id: 'a-1', action: 'Access request submitted', detail: 'Buyer submitted declared-purpose access request', actor: 'Sarah Chen', createdAt: '2026-07-01T09:15:00Z', isDemo: true },
      { id: 'a-2', action: 'Compliance review completed', detail: 'Intended use verified against permitted-use framework', actor: 'Compliance Review', createdAt: '2026-07-08T14:30:00Z', isDemo: true },
      { id: 'a-3', action: 'Access approved', detail: 'Approved with conditions — annual review required', actor: 'Compliance Review', createdAt: '2026-07-08T14:32:00Z', isDemo: true },
    ],
    createdAt: '2026-07-01T09:15:00Z',
    updatedAt: '2026-07-08T14:32:00Z',
    submittedAt: '2026-07-01T09:15:00Z',
    resolvedAt: '2026-07-08T14:32:00Z',
  },
  {
    id: 'ar-2',
    reference: 'DH-DEMO-AR-2X8N3L',
    packageSlug: 'sme-commercial-risk-signals',
    packageName: 'SME Commercial Risk Signals',
    supplierName: 'Axiom Registry Intelligence',
    intendedUseSummary: 'Trade credit risk assessment for SME supplier onboarding programme.',
    deliveryPreference: 'api',
    estimatedVolume: 'Low — approximately 200 profiles per month',
    estimatedUsers: '3–4 procurement analysts',
    retentionPlan: 'Risk assessment results retained for duration of supplier relationship plus 2 years',
    sharingExpectations: 'Internal procurement and risk teams only',
    status: 'compliance_review_demo',
    conditions: [],
    messages: [
      { id: 'm-2', direction: 'compliance_demo', sender: 'Compliance Review', body: 'We are reviewing your intended use against the sensitive financial-risk data framework. Additional information may be requested.', createdAt: '2026-07-14T10:45:00Z', isDemo: true },
    ],
    activityLog: [
      { id: 'a-4', action: 'Access request submitted', detail: 'Buyer submitted declared-purpose access request', actor: 'Sarah Chen', createdAt: '2026-07-12T16:20:00Z', isDemo: true },
      { id: 'a-5', action: 'Compliance review started', detail: 'Request routed to compliance review', actor: 'System', createdAt: '2026-07-14T10:45:00Z', isDemo: true },
    ],
    createdAt: '2026-07-12T16:20:00Z',
    updatedAt: '2026-07-14T10:45:00Z',
    submittedAt: '2026-07-12T16:20:00Z',
    resolvedAt: null,
  },
  {
    id: 'ar-3',
    reference: 'DH-DEMO-AR-5Y1W6R',
    packageSlug: 'address-validation-premises-classification-api',
    packageName: 'Address Validation and Premises Classification API',
    supplierName: 'GeoRef Data Services',
    intendedUseSummary: 'Address validation and geocoding for insurance underwriting and risk-location assessment.',
    deliveryPreference: 'api',
    estimatedVolume: 'High — approximately 50,000 validations per month',
    estimatedUsers: '15–20 underwriters and data quality analysts',
    retentionPlan: 'Validated address data retained for policy lifecycle plus 6 years',
    sharingExpectations: 'Internal use within underwriting department',
    status: 'draft',
    conditions: [],
    messages: [],
    activityLog: [
      { id: 'a-6', action: 'Draft created', detail: 'Buyer started access request draft', actor: 'Sarah Chen', createdAt: '2026-07-16T11:00:00Z', isDemo: true },
    ],
    createdAt: '2026-07-16T11:00:00Z',
    updatedAt: '2026-07-16T11:00:00Z',
    submittedAt: null,
    resolvedAt: null,
  },
  {
    id: 'ar-4',
    reference: 'DH-DEMO-AR-9M3K7Q',
    packageSlug: 'regional-retail-footfall-index',
    packageName: 'Regional Retail Footfall Index',
    supplierName: 'PlaceMetrics Labs',
    intendedUseSummary: 'Retail site-selection analysis and catchment-area modelling for new store locations.',
    deliveryPreference: 'dashboard',
    estimatedVolume: 'Medium — weekly dashboard access for 5 users',
    estimatedUsers: '5 location-planning analysts',
    retentionPlan: 'Dashboard exports retained for duration of active subscription',
    sharingExpectations: 'Internal strategy and property teams',
    status: 'approved_conditions_demo',
    conditions: ['Quarterly usage audit', 'Footfall data must not be used for individual-level targeting'],
    messages: [
      { id: 'm-3', direction: 'supplier_demo', sender: 'PlaceMetrics Labs', body: 'Your use case aligns with our standard licence. We have added a quarterly audit condition as standard practice.', createdAt: '2026-06-20T09:00:00Z', isDemo: true },
    ],
    activityLog: [
      { id: 'a-7', action: 'Access request submitted', detail: 'Buyer submitted declared-purpose access request', actor: 'Sarah Chen', createdAt: '2026-06-10T08:30:00Z', isDemo: true },
      { id: 'a-8', action: 'Supplier review completed', detail: 'Supplier approved with conditions', actor: 'PlaceMetrics Labs', createdAt: '2026-06-20T09:00:00Z', isDemo: true },
    ],
    createdAt: '2026-06-10T08:30:00Z',
    updatedAt: '2026-06-20T09:00:00Z',
    submittedAt: '2026-06-10T08:30:00Z',
    resolvedAt: '2026-06-20T09:00:00Z',
  },
];

export const demoSubscriptions: BuyerSubscription[] = [
  {
    id: 'sub-1',
    reference: 'DH-DEMO-SUB-A3K9M2',
    type: 'membership',
    name: 'Buyer Organisation Membership',
    packageSlug: null,
    supplierName: 'DataHarbour',
    status: 'demo_active',
    startDate: '2026-07-01',
    endDate: '2027-06-30',
    renewalDate: '2027-06-15',
    billingModel: 'Annual membership',
    billingAmount: '£2,400',
    billingCycle: 'Annual',
    allowance: 'Unlimited marketplace browsing, up to 5 active access requests, 3 comparison sets',
    usagePercentage: 60,
    conditions: [{
      permittedPurpose: 'Marketplace discovery and access-request submission',
      prohibitedUses: ['Resale of marketplace data', 'Unauthorised sharing of access credentials'],
      geography: 'United Kingdom',
      usersOrTeams: 'Up to 10 named users',
      retention: 'Account data retained for duration of membership',
      sharing: 'Internal organisation use only',
      delivery: 'API, dashboard, and secure download as per individual package licences',
      usageLimits: '5 active access requests, 3 comparison sets',
      renewalTerms: 'Annual renewal with 30-day notice',
      suspensionConditions: 'Non-payment, breach of acceptable use policy, or compliance failure',
    }],
  },
  {
    id: 'sub-2',
    reference: 'DH-DEMO-SUB-M7X4P1',
    type: 'package_licence',
    name: 'UK Business Registry Enrichment API — Licence',
    packageSlug: 'uk-business-registry-enrichment-api',
    supplierName: 'Axiom Registry Intelligence',
    status: 'demo_active',
    startDate: '2026-07-09',
    endDate: '2027-07-08',
    renewalDate: '2027-06-08',
    billingModel: 'Per request',
    billingAmount: 'From £0.04 per lookup',
    billingCycle: 'Monthly in arrears',
    allowance: 'Up to 5,000 lookups per month at base rate; overage at £0.035 per lookup',
    usagePercentage: 42,
    conditions: [{
      permittedPurpose: 'Customer due diligence and KYC verification',
      prohibitedUses: ['Unsolicited direct marketing', 'Consumer profiling without lawful basis', 'Resale as standalone consumer-identity product'],
      geography: 'United Kingdom',
      usersOrTeams: 'Compliance and risk departments only',
      retention: 'Query results retained for 7 years per regulatory requirements',
      sharing: 'No onward sharing without supplier consent',
      delivery: 'REST API with API-key authentication',
      usageLimits: '5,000 lookups per month base allowance',
      renewalTerms: 'Annual licence with 60-day renewal notice',
      suspensionConditions: 'Breach of permitted use, non-payment, or compliance failure',
    }],
  },
  {
    id: 'sub-3',
    reference: 'DH-DEMO-SUB-R2N8K5',
    type: 'package_licence',
    name: 'Regional Retail Footfall Index — Licence',
    packageSlug: 'regional-retail-footfall-index',
    supplierName: 'PlaceMetrics Labs',
    status: 'demo_active',
    startDate: '2026-06-21',
    endDate: '2027-06-20',
    renewalDate: '2027-05-20',
    billingModel: 'Subscription',
    billingAmount: '£950 per month',
    billingCycle: 'Monthly',
    allowance: 'Weekly dashboard access, CSV exports, 5 named users',
    usagePercentage: 78,
    conditions: [{
      permittedPurpose: 'Retail site-selection analysis and catchment modelling',
      prohibitedUses: ['Identifying or re-identifying individuals', 'Tracking specific devices', 'Combining with data to single out data subjects'],
      geography: 'United Kingdom',
      usersOrTeams: 'Location-planning team (5 named users)',
      retention: 'Dashboard exports retained for duration of active subscription',
      sharing: 'Internal strategy and property teams only',
      delivery: 'Interactive dashboard with CSV export and API access',
      usageLimits: '5 named users, weekly data refresh',
      renewalTerms: 'Annual subscription with 90-day notice',
      suspensionConditions: 'Quarterly usage audit failure, non-payment, or licence breach',
    }],
  },
];

export const demoDeliveries: BuyerDelivery[] = [
  {
    id: 'del-1',
    reference: 'DH-DEMO-DEL-P8M2X9',
    packageName: 'UK Business Registry Enrichment API',
    packageSlug: 'uk-business-registry-enrichment-api',
    deliveryType: 'API access',
    format: 'JSON via REST API',
    version: 'v2.4.1',
    fileName: 'N/A — API access only',
    fileSize: 'N/A',
    recordCount: 0,
    checksum: 'N/A',
    createdDate: '2026-07-09',
    expiryDate: '2027-07-08',
    status: 'ready_demo',
    manifest: [],
    restrictions: ['API-key authentication required', 'Rate limit: 100 requests per minute', 'Usage logs retained for audit'],
    activityLog: [
      { id: 'da-1', action: 'API access activated', detail: 'Licence activated following compliance approval', createdAt: '2026-07-09T09:00:00Z' },
    ],
  },
  {
    id: 'del-2',
    reference: 'DH-DEMO-DEL-L4K7N3',
    packageName: 'Regional Retail Footfall Index',
    packageSlug: 'regional-retail-footfall-index',
    deliveryType: 'Dashboard access',
    format: 'Interactive web dashboard with CSV export',
    version: 'Q3 2026 Refresh',
    fileName: 'N/A — dashboard access',
    fileSize: 'N/A',
    recordCount: 0,
    checksum: 'N/A',
    createdDate: '2026-06-21',
    expiryDate: '2027-06-20',
    status: 'ready_demo',
    manifest: [],
    restrictions: ['5 named user accounts', 'Dashboard access via SSO', 'CSV exports logged'],
    activityLog: [
      { id: 'da-2', action: 'Dashboard access granted', detail: 'User accounts provisioned for location-planning team', createdAt: '2026-06-21T11:00:00Z' },
    ],
  },
  {
    id: 'del-3',
    reference: 'DH-DEMO-DEL-T6V1W4',
    packageName: 'Local Area Demographic Trends',
    packageSlug: 'local-area-demographic-trends',
    deliveryType: 'Secure file download',
    format: 'CSV with metadata',
    version: '2026 Q2 Refresh',
    fileName: 'DH_DEMO_LADT_2026Q2.csv',
    fileSize: '48.3 MB',
    recordCount: 285000,
    checksum: 'sha256:d3m0-a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    createdDate: '2026-07-05',
    expiryDate: '2027-01-05',
    status: 'ready_demo',
    manifest: [
      { field: 'area_code', type: 'string', description: 'ONS output area code' },
      { field: 'population_estimate', type: 'integer', description: 'Mid-year population estimate' },
      { field: 'household_count', type: 'integer', description: 'Estimated number of households' },
      { field: 'median_age', type: 'decimal', description: 'Median age of residents' },
    ],
    restrictions: ['Data must not be shared outside the licensed organisation', 'Delete within 30 days of licence expiry', 'Use restricted to declared purpose'],
    activityLog: [
      { id: 'da-3', action: 'Delivery prepared', detail: 'Dataset compiled and checksum verified', createdAt: '2026-07-05T08:00:00Z' },
    ],
  },
];

export const demoApiKeys: BuyerApiKey[] = [
  {
    id: 'ak-1',
    displayName: 'Compliance Team — UK BRI API',
    maskedValue: 'dh_demo_sk_live_****_****_****_a1b2c3',
    environment: 'production_demo',
    packageScope: 'uk-business-registry-enrichment-api',
    permissions: ['read', 'batch_lookup'],
    createdAt: '2026-07-09',
    lastUsed: '2026-07-16T15:42:00Z',
    expiresAt: '2027-07-08',
    status: 'active',
  },
  {
    id: 'ak-2',
    displayName: 'Development Sandbox — General',
    maskedValue: 'dh_demo_sk_sandbox_****_****_****_x9y8z7',
    environment: 'sandbox_demo',
    packageScope: 'All packages',
    permissions: ['read'],
    createdAt: '2026-07-01',
    lastUsed: '2026-07-15T10:30:00Z',
    expiresAt: '2026-12-31',
    status: 'active',
  },
];

export const demoUsageEvents: BuyerUsageEvent[] = [
  { id: 'ue-1', date: '2026-07-16', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 847, environment: 'production_demo', endpoint: '/v2/company/lookup', status: 'success' },
  { id: 'ue-2', date: '2026-07-16', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 12, environment: 'production_demo', endpoint: '/v2/company/lookup', status: 'rate_limited' },
  { id: 'ue-3', date: '2026-07-15', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 1203, environment: 'production_demo', endpoint: '/v2/company/lookup', status: 'success' },
  { id: 'ue-4', date: '2026-07-15', packageName: 'Regional Retail Footfall Index', packageSlug: 'regional-retail-footfall-index', apiKeyName: 'Development Sandbox — General', unit: 'data_volume', count: 14, environment: 'sandbox_demo', endpoint: '/v1/footfall/export', status: 'success' },
  { id: 'ue-5', date: '2026-07-14', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 651, environment: 'production_demo', endpoint: '/v2/company/batch', status: 'success' },
  { id: 'ue-6', date: '2026-07-14', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'record', count: 2450, environment: 'production_demo', endpoint: '/v2/company/batch', status: 'success' },
  { id: 'ue-7', date: '2026-07-13', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 432, environment: 'production_demo', endpoint: '/v2/company/lookup', status: 'success' },
  { id: 'ue-8', date: '2026-07-12', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 1089, environment: 'production_demo', endpoint: '/v2/company/lookup', status: 'success' },
  { id: 'ue-9', date: '2026-07-11', packageName: 'Regional Retail Footfall Index', packageSlug: 'regional-retail-footfall-index', apiKeyName: 'Development Sandbox — General', unit: 'file', count: 3, environment: 'sandbox_demo', endpoint: '/v1/dashboard/export', status: 'success' },
  { id: 'ue-10', date: '2026-07-10', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 756, environment: 'production_demo', endpoint: '/v2/company/lookup', status: 'success' },
  { id: 'ue-11', date: '2026-07-10', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 23, environment: 'production_demo', endpoint: '/v2/company/lookup', status: 'error' },
  { id: 'ue-12', date: '2026-07-09', packageName: 'UK Business Registry Enrichment API', packageSlug: 'uk-business-registry-enrichment-api', apiKeyName: 'Compliance Team — UK BRI API', unit: 'api_request', count: 312, environment: 'production_demo', endpoint: '/v2/company/lookup', status: 'success' },
];

export const demoInvoices: BuyerInvoice[] = [
  {
    id: 'inv-1',
    number: 'DH-DEMO-INV-2026-0001',
    date: '2026-07-01',
    dueDate: '2026-07-31',
    periodStart: '2026-07-01',
    periodEnd: '2026-07-31',
    description: 'Buyer Organisation Membership — Annual fee 2026/2027',
    items: [
      { description: 'Buyer Organisation Membership — Annual', quantity: 1, unitPrice: 2400, total: 2400 },
    ],
    subtotal: 2400,
    vat: 480,
    total: 2880,
    currency: 'GBP',
    status: 'paid_demo',
  },
  {
    id: 'inv-2',
    number: 'DH-DEMO-INV-2026-0002',
    date: '2026-07-15',
    dueDate: '2026-08-14',
    periodStart: '2026-07-01',
    periodEnd: '2026-07-31',
    description: 'UK Business Registry Enrichment API — July 2026 usage',
    items: [
      { description: 'API lookups — base allowance (up to 5,000)', quantity: 1, unitPrice: 0, total: 0 },
      { description: 'API lookups — Overage beyond 5,000', quantity: 0, unitPrice: 0.035, total: 0 },
    ],
    subtotal: 0,
    vat: 0,
    total: 0,
    currency: 'GBP',
    status: 'open_demo',
  },
  {
    id: 'inv-3',
    number: 'DH-DEMO-INV-2026-0003',
    date: '2026-06-01',
    dueDate: '2026-06-30',
    periodStart: '2026-06-01',
    periodEnd: '2026-06-30',
    description: 'Regional Retail Footfall Index — June 2026 subscription',
    items: [
      { description: 'Regional Retail Footfall Index — Monthly subscription', quantity: 1, unitPrice: 950, total: 950 },
    ],
    subtotal: 950,
    vat: 190,
    total: 1140,
    currency: 'GBP',
    status: 'paid_demo',
  },
];

export const demoTeamMembers: BuyerTeamMember[] = [
  { id: 'tm-1', fullName: 'Sarah Chen', workEmail: 'sarah.chen@acmecorp.example', role: 'Organisation owner', department: 'Data Strategy', accessLevel: 'Full access', lastActiveDate: '2026-07-16T15:30:00Z', packageAccess: ['UK Business Registry Enrichment API', 'Regional Retail Footfall Index'], status: 'active' },
  { id: 'tm-2', fullName: 'James Okonkwo', workEmail: 'james.okonkwo@acmecorp.example', role: 'Compliance lead', department: 'Legal & Compliance', accessLevel: 'Administrative', lastActiveDate: '2026-07-15T11:20:00Z', packageAccess: ['UK Business Registry Enrichment API'], status: 'active' },
  { id: 'tm-3', fullName: 'Emma Richardson', workEmail: 'emma.richardson@acmecorp.example', role: 'Technical lead', department: 'Engineering', accessLevel: 'Technical', lastActiveDate: '2026-07-16T09:45:00Z', packageAccess: ['UK Business Registry Enrichment API', 'Regional Retail Footfall Index'], status: 'active' },
  { id: 'tm-4', fullName: 'David Park', workEmail: 'david.park@acmecorp.example', role: 'Analyst or standard member', department: 'Risk Analysis', accessLevel: 'Standard', lastActiveDate: '2026-07-14T16:00:00Z', packageAccess: ['UK Business Registry Enrichment API'], status: 'active' },
  { id: 'tm-5', fullName: 'Priya Sharma', workEmail: 'priya.sharma@acmecorp.example', role: 'Billing contact', department: 'Finance', accessLevel: 'Administrative', lastActiveDate: '2026-07-12T10:15:00Z', packageAccess: [], status: 'active' },
];

export const demoComplianceItems: BuyerComplianceItem[] = [
  { id: 'ci-1', category: 'Intended Use', title: 'Annual intended-use review', description: 'Review and confirm that declared purposes remain accurate for all active licences.', status: 'action_needed', lastReviewed: '2026-07-01', nextReviewDue: '2026-07-31', actionLabel: 'Start review', actionRoute: '/app/buyer/compliance' },
  { id: 'ci-2', category: 'Retention', title: 'Data retention schedule confirmation', description: 'Confirm that retained query results comply with stated retention periods.', status: 'complete_demo', lastReviewed: '2026-07-01', nextReviewDue: '2027-01-01', actionLabel: null, actionRoute: null },
  { id: 'ci-3', category: 'Team Access', title: 'Team access review', description: 'Review team-member access levels and remove inactive or unnecessary accounts.', status: 'action_needed', lastReviewed: '2026-06-15', nextReviewDue: '2026-08-15', actionLabel: 'Review team', actionRoute: '/app/buyer/team' },
  { id: 'ci-4', category: 'Licence', title: 'Licence acknowledgement — SME Risk Signals', description: 'Acknowledge the licence conditions for SME Commercial Risk Signals once access is approved.', status: 'not_started', lastReviewed: null, nextReviewDue: null, actionLabel: null, actionRoute: null },
  { id: 'ci-5', category: 'Security', title: 'Security contact confirmation', description: 'Confirm that the named security contact is current and reachable.', status: 'planned_review', lastReviewed: '2026-06-01', nextReviewDue: '2026-09-01', actionLabel: null, actionRoute: null },
  { id: 'ci-6', category: 'Policy', title: 'Acceptable Use Policy re-acknowledgement', description: 'Acknowledge the updated Acceptable Use Policy (Draft 1.1).', status: 'action_needed', lastReviewed: null, nextReviewDue: '2026-08-01', actionLabel: 'Review policy', actionRoute: '/acceptable-use' },
];

export const demoNotifications: BuyerNotification[] = [
  { id: 'n-1', category: 'access_requests', title: 'Access approved: UK Business Registry Enrichment API', body: 'Your access request has been approved with conditions. The API key is now available in API Keys.', read: false, linkedRoute: '/app/buyer/api-keys', createdAt: '2026-07-08T14:32:00Z' },
  { id: 'n-2', category: 'compliance', title: 'Compliance review in progress: SME Commercial Risk Signals', body: 'Your access request is under compliance review. Additional information may be requested.', read: false, linkedRoute: '/app/buyer/access-requests', createdAt: '2026-07-14T10:45:00Z' },
  { id: 'n-3', category: 'billing', title: 'New invoice available: July 2026 membership', body: 'Invoice DH-DEMO-INV-2026-0001 for your annual membership is now available.', read: true, linkedRoute: '/app/buyer/billing', createdAt: '2026-07-01T00:00:00Z' },
  { id: 'n-4', category: 'deliveries', title: 'Delivery ready: Local Area Demographic Trends', body: 'The Q2 2026 refresh of Local Area Demographic Trends is ready for download.', read: false, linkedRoute: '/app/buyer/deliveries', createdAt: '2026-07-05T08:00:00Z' },
  { id: 'n-5', category: 'compliance', title: 'Annual intended-use review due', body: 'Your annual intended-use review is due by 31 July 2026. Please confirm your declared purposes.', read: false, linkedRoute: '/app/buyer/compliance', createdAt: '2026-07-15T09:00:00Z' },
  { id: 'n-6', category: 'team', title: 'Team access review reminder', body: 'A quarterly team-access review is due. Review member access levels and remove inactive accounts.', read: true, linkedRoute: '/app/buyer/team', createdAt: '2026-07-10T08:00:00Z' },
  { id: 'n-7', category: 'security_notices', title: 'Security statement updated', body: 'The DataHarbour security statement has been updated. Please review the latest version.', read: true, linkedRoute: '/security-statement', createdAt: '2026-07-03T14:00:00Z' },
  { id: 'n-8', category: 'product_updates', title: 'New package available: Consumer Sentiment Dashboard', body: 'Clarus Consumer Analytics has published a new Market Sentiment Research Dashboard.', read: true, linkedRoute: '/marketplace/market-sentiment-research-dashboard', createdAt: '2026-07-13T10:00:00Z' },
];

export const demoActivityFeed: BuyerActivityEvent[] = [
  { id: 'af-1', type: 'access_draft', description: 'Draft access request created', detail: 'Started access request for Address Validation API', createdAt: '2026-07-16T11:00:00Z' },
  { id: 'af-2', type: 'invoice_view', description: 'Invoice viewed', detail: 'Viewed invoice DH-DEMO-INV-2026-0002', createdAt: '2026-07-15T16:45:00Z' },
  { id: 'af-3', type: 'comparison', description: 'Comparison updated', detail: 'Updated comparison "Risk Data Evaluation"', createdAt: '2026-07-15T14:20:00Z' },
  { id: 'af-4', type: 'saved_package', description: 'Package saved', detail: 'Saved "UK Property Transaction Intelligence"', createdAt: '2026-07-14T11:30:00Z' },
  { id: 'af-5', type: 'team_change', description: 'Team member added', detail: 'Added David Park as Analyst member', createdAt: '2026-07-13T09:15:00Z' },
  { id: 'af-6', type: 'delivery_download', description: 'Delivery downloaded', detail: 'Downloaded Local Area Demographic Trends Q2 2026', createdAt: '2026-07-10T14:00:00Z' },
  { id: 'af-7', type: 'saved_package', description: 'Package saved', detail: 'Saved "SME Commercial Risk Signals"', createdAt: '2026-07-09T10:00:00Z' },
];

export const demoNamedComparisons: NamedComparison[] = [
  { id: 'nc-1', name: 'Risk Data Evaluation', packageSlugs: ['uk-business-registry-enrichment-api', 'sme-commercial-risk-signals'], createdAt: '2026-07-10T08:30:00Z', updatedAt: '2026-07-15T14:20:00Z' },
  { id: 'nc-2', name: 'Location Intelligence Comparison', packageSlugs: ['regional-retail-footfall-index', 'uk-planning-development-activity-feed', 'uk-high-street-vacancy-intelligence'], createdAt: '2026-07-05T13:00:00Z', updatedAt: '2026-07-05T13:00:00Z' },
];

export function computeDashboardSummary(): BuyerDashboardSummary {
  const savedCount = (() => {
    try {
      const raw = localStorage.getItem('dataharbour_saved_packages');
      return raw ? JSON.parse(raw).length : 0;
    } catch { return 0; }
  })();
  const compareCount = demoNamedComparisons.length;
  const accessReqCount = demoAccessRequests.length;
  const licenceCount = demoSubscriptions.filter(s => s.type !== 'membership').length;
  const deliveryCount = demoDeliveries.filter(d => d.status === 'ready_demo' || d.status === 'preparing_demo').length;
  const totalApiUsage = demoUsageEvents
    .filter(e => e.unit === 'api_request')
    .reduce((sum, e) => sum + e.count, 0);
  const openBilling = demoInvoices.filter(i => i.status === 'open_demo' || i.status === 'overdue_demo').length;
  const compActions = demoComplianceItems.filter(c => c.status === 'action_needed').length;
  return {
    savedPackages: savedCount,
    activeComparisons: compareCount,
    accessRequests: accessReqCount,
    demoLicences: licenceCount,
    plannedDeliveries: deliveryCount,
    apiUsageThisMonth: totalApiUsage,
    openBillingItems: openBilling,
    complianceActions: compActions,
  };
}