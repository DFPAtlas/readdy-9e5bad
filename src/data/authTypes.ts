// ── DataHarbour Auth & Onboarding Types ──
// Demonstration-only types. No real authentication, passwords or credentials are stored.
// Production versions must be enforced server-side and through database policies.

export type PublicAccountType = 'buyer' | 'supplier';

export type OrganisationRole =
  | 'organisation_owner'
  | 'administrator'
  | 'compliance_lead'
  | 'technical_lead'
  | 'billing_contact'
  | 'analyst_member'
  | 'read_only_member';

export type EmailVerificationStatus = 'unverified_demo' | 'demo_verified';

export type OrganisationVerificationStatus =
  | 'not_started'
  | 'draft'
  | 'ready_for_review'
  | 'demo_complete';

export type OnboardingStage = 'organisation' | 'intended_use' | 'team' | 'review' | 'complete';

export type InvitationStatus = 'valid' | 'expired' | 'accepted' | 'invalid';

// ── Demo User (non-sensitive metadata only) ──
export interface DemoAuthUser {
  id: string;
  fullName: string;
  workEmail: string;
  jobTitle: string;
  accountType: PublicAccountType;
  organisationName: string;
  country: string;
  emailStatus: EmailVerificationStatus;
  emailVerifiedAt: string | null;
  marketingConsent: boolean;
  createdAt: string;
  lastSignIn: string;
}

// ── Demo Session ──
export interface DemoSession {
  userId: string;
  createdAt: string;
  returnTo: string | null;
}

// ── Organisation Onboarding Draft ──
export interface OrganisationOnboardingDraft {
  organisationId?: string;
  legalName: string;
  tradingName: string;
  organisationType: string;
  countryOfRegistration: string;
  companyNumber: string;
  website: string;
  businessActivity: string;
  industry: string;
  organisationSize: string;
  registeredCity: string;
  businessEmail: string;
  authorisedRepConfirmed: boolean;
  ownerRole: OrganisationRole;
}

// ── Intended Use Draft ──
export interface IntendedUseDraft {
  // Buyer-specific
  primaryPurpose: string;
  dataCategories: string[];
  useCases: string[];
  geographicScope: string;
  deliveryFormats: string[];
  estimatedVolume: string;
  estimatedUsers: string;
  personalDataInvolved: boolean | null;
  significantDecisions: boolean | null;
  retentionApproach: string;
  sharingExpectations: string;
  complianceContact: string;
  securitySummary: string;
  // Supplier-specific
  proposedProductCategories: string;
  proposedFormats: string[];
  provenanceReadiness: string;
  rightsEvidenceReadiness: string;
  supplierSecurityContact: string;
  supplierAppRef: string;
  intendedBuyerTypes: string;
}

// ── Team Member ──
export interface TeamMember {
  id: string;
  fullName: string;
  workEmail: string;
  role: OrganisationRole;
  department: string;
  accessLevel: string;
  primaryContactType: string;
}

// ── Terms Acceptance ──
export interface TermsAcceptance {
  documentSlug: string;
  displayVersion: string;
  acceptedAt: string;
  required: boolean;
  accountType: string;
}

// ── Invitation Preview ──
export interface InvitationPreview {
  id: string;
  organisationName: string;
  invitedEmail: string;
  proposedRole: OrganisationRole;
  inviterName: string;
  expiryDate: string;
  status: InvitationStatus;
}

// ── Organisation Types ──
export const ORGANISATION_TYPES = [
  { value: 'limited_company', label: 'Limited company' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'sole_trader', label: 'Sole trader' },
  { value: 'charity_nonprofit', label: 'Charity or non-profit' },
  { value: 'public_body', label: 'Public body' },
  { value: 'research', label: 'Research organisation' },
  { value: 'other', label: 'Other' },
] as const;

export const ORGANISATION_SIZES = [
  { value: '1-9', label: '1–9 employees' },
  { value: '10-49', label: '10–49 employees' },
  { value: '50-249', label: '50–249 employees' },
  { value: '250-999', label: '250–999 employees' },
  { value: '1000+', label: '1,000+ employees' },
] as const;

export const INDUSTRIES = [
  { value: 'financial_services', label: 'Financial services' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'legal', label: 'Legal' },
  { value: 'real_estate', label: 'Real estate and property' },
  { value: 'consulting', label: 'Consulting and professional services' },
  { value: 'technology', label: 'Technology' },
  { value: 'public_sector', label: 'Public sector and government' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'retail', label: 'Retail and e-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'education', label: 'Education' },
  { value: 'charity', label: 'Charity and non-profit' },
  { value: 'media', label: 'Media and publishing' },
  { value: 'energy', label: 'Energy and utilities' },
  { value: 'transport', label: 'Transport and logistics' },
  { value: 'other', label: 'Other' },
] as const;

export const ORG_ROLES: { value: OrganisationRole; label: string; description: string }[] = [
  { value: 'organisation_owner', label: 'Organisation owner', description: 'Full administrative control over the organisation account' },
  { value: 'administrator', label: 'Administrator', description: 'Manages account settings, billing and team members' },
  { value: 'compliance_lead', label: 'Compliance lead', description: 'Reviews access requests, usage and compliance obligations' },
  { value: 'technical_lead', label: 'Technical lead', description: 'Manages API keys, integrations and technical delivery' },
  { value: 'billing_contact', label: 'Billing contact', description: 'Receives invoices and manages payment details' },
  { value: 'analyst_member', label: 'Analyst or standard member', description: 'Accesses approved data products and runs analyses' },
  { value: 'read_only_member', label: 'Read-only member', description: 'Views organisation activity and reports without modification rights' },
];

export const DATA_CATEGORIES = [
  { value: 'company_registry', label: 'Company registry and filings' },
  { value: 'property_land', label: 'Property and land data' },
  { value: 'people_directory', label: 'People and director data' },
  { value: 'financial_risk', label: 'Financial and risk data' },
  { value: 'market_intelligence', label: 'Market intelligence' },
  { value: 'geospatial', label: 'Geospatial and location data' },
  { value: 'regulatory', label: 'Regulatory and compliance data' },
  { value: 'demographic', label: 'Demographic and socioeconomic data' },
  { value: 'supply_chain', label: 'Supply chain and trade data' },
  { value: 'environmental', label: 'Environmental and climate data' },
] as const;

export const DELIVERY_FORMATS = [
  { value: 'api_rest', label: 'REST API' },
  { value: 'scheduled_feed', label: 'Scheduled data feed' },
  { value: 'secure_download', label: 'Secure file download' },
  { value: 'dashboard_report', label: 'Dashboard or report' },
  { value: 'clean_room', label: 'Clean-room environment' },
  { value: 'sftp', label: 'SFTP delivery' },
] as const;

export const USE_CASES = [
  { value: 'identity_verification', label: 'Identity and KYC verification' },
  { value: 'risk_assessment', label: 'Risk assessment and underwriting' },
  { value: 'market_analysis', label: 'Market analysis and research' },
  { value: 'compliance_screening', label: 'Compliance and sanctions screening' },
  { value: 'due_diligence', label: 'Due diligence and background checks' },
  { value: 'portfolio_management', label: 'Portfolio and asset management' },
  { value: 'location_planning', label: 'Location and site planning' },
  { value: 'customer_insight', label: 'Customer and audience insight' },
  { value: 'fraud_detection', label: 'Fraud detection and prevention' },
  { value: 'regulatory_reporting', label: 'Regulatory reporting' },
] as const;

export const REQUIRED_TERMS: { slug: string; title: string; version: string }[] = [
  { slug: 'marketplace-terms', title: 'Marketplace Terms', version: 'Draft 1.0' },
  { slug: 'privacy', title: 'Privacy Policy', version: 'Draft 1.0' },
  { slug: 'acceptable-use', title: 'Acceptable Use Policy', version: 'Draft 1.0' },
];

export const BUYER_VOLUME_OPTIONS = [
  { value: 'low', label: 'Low — occasional or ad-hoc queries' },
  { value: 'medium', label: 'Medium — regular operational use' },
  { value: 'high', label: 'High — high-volume or embedded use' },
  { value: 'unsure', label: 'Not sure yet' },
] as const;

export const PROCUREMENT_STAGES = [
  { value: 'exploring', label: 'Exploring options' },
  { value: 'evaluating', label: 'Evaluating specific solutions' },
  { value: 'procurement', label: 'In procurement process' },
  { value: 'ready', label: 'Ready to start' },
] as const;

// ── Default factories ──
export function createDefaultOrganisationDraft(): OrganisationOnboardingDraft {
  return {
    legalName: '',
    tradingName: '',
    organisationType: '',
    countryOfRegistration: 'United Kingdom',
    companyNumber: '',
    website: '',
    businessActivity: '',
    industry: '',
    organisationSize: '',
    registeredCity: '',
    businessEmail: '',
    authorisedRepConfirmed: false,
    ownerRole: 'organisation_owner',
  };
}

export function createDefaultIntendedUseDraft(): IntendedUseDraft {
  return {
    primaryPurpose: '',
    dataCategories: [],
    useCases: [],
    geographicScope: 'United Kingdom',
    deliveryFormats: [],
    estimatedVolume: '',
    estimatedUsers: '',
    personalDataInvolved: null,
    significantDecisions: null,
    retentionApproach: '',
    sharingExpectations: '',
    complianceContact: '',
    securitySummary: '',
    proposedProductCategories: '',
    proposedFormats: [],
    provenanceReadiness: '',
    rightsEvidenceReadiness: '',
    supplierSecurityContact: '',
    supplierAppRef: '',
    intendedBuyerTypes: '',
  };
}

export function generateRefId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}