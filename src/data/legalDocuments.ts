export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  subSections?: { heading: string; paragraphs: string[] }[];
}

export interface LegalDefinition {
  term: string;
  definition: string;
}

export interface LegalDocument {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  status: "Draft for legal review" | "Public guidance" | "Planned terms" | "Under review";
  version: string;
  effectiveDateDisplay: string;
  lastReviewedDisplay: string;
  audience: string;
  sections: LegalSection[];
  definitions?: LegalDefinition[];
  relatedDocumentSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  requiresProfessionalReview: boolean;
}

export interface SubprocessorEntry {
  provider: string;
  purpose: string;
  dataCategories: string;
  processingLocation: string;
  transferMechanism: string;
  status: "Current" | "Planned" | "Under review";
  lastUpdated: string;
}

export interface CookieDefinition {
  name: string;
  provider: string;
  category: "Strictly necessary" | "Preferences" | "Analytics" | "Marketing";
  purpose: string;
  duration: string;
  type: string;
  status: "Active" | "Planned";
}

export interface CookieConsent {
  version: number;
  consentedAt: string;
  categories: {
    necessary: boolean;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

export interface PolicyVersion {
  version: string;
  date: string;
  summary: string;
}

export const REVIEW_NOTICE = "These documents are draft website content for the planned DataHarbour service. They must be reviewed and approved by an appropriately qualified UK legal and data-protection professional before launch.";

export const LEGAL_PLACEHOLDER_NAME = "[LEGAL ENTITY NAME]";
export const LEGAL_PLACEHOLDER_NUMBER = "[COMPANY NUMBER]";
export const LEGAL_PLACEHOLDER_OFFICE = "[REGISTERED OFFICE]";
export const LEGAL_PLACEHOLDER_PRIVACY_EMAIL = "[PRIVACY CONTACT EMAIL]";
export const LEGAL_PLACEHOLDER_SECURITY_EMAIL = "[SECURITY CONTACT EMAIL]";
export const LEGAL_PLACEHOLDER_DATE = "[EFFECTIVE DATE]";

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "dh_consent";

export function getDefaultConsent(): CookieConsent {
  return {
    version: CONSENT_VERSION,
    consentedAt: new Date().toISOString(),
    categories: {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    },
  };
}

export function hasValidConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return false;
    const consent: CookieConsent = JSON.parse(raw);
    return consent.version === CONSENT_VERSION;
  } catch {
    return false;
  }
}

export function getStoredConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const consent: CookieConsent = JSON.parse(raw);
    if (consent.version !== CONSENT_VERSION) return null;
    return consent;
  } catch {
    return null;
  }
}

export function saveConsent(consent: CookieConsent): void {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
}

import { legalDocuments } from "./legalDocumentContent";

export const DOCUMENT_BY_SLUG: Record<string, LegalDocument> = {};
legalDocuments.forEach((d) => { DOCUMENT_BY_SLUG[d.slug] = d; });

export { legalDocuments } from "./legalDocumentContent";
export { cookieDefinitions } from "./legalDocumentContent";
export { subprocessorEntries } from "./legalDocumentContent";
export { policyVersions } from "./legalDocumentContent";