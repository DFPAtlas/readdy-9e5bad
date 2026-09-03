// ============================================================
// DataHarbour Contact Storage — localStorage persistence
// ============================================================

import type {
  ContactDraft,
  StoredSubmission,
  EnquiryType,
  BuyerEnquiryDraft,
  SupplierEnquiryDraft,
  EnterpriseEnquiryDraft,
  TechnicalEnquiryDraft,
  ComplianceEnquiryDraft,
  SecurityEnquiryDraft,
  GeneralContactDraft,
  DataSubjectRequestDraft,
} from "@/data/contactTypes";
import {
  BUYER_ENQUIRY_DEFAULTS,
  SUPPLIER_ENQUIRY_DEFAULTS,
  ENTERPRISE_ENQUIRY_DEFAULTS,
  TECHNICAL_ENQUIRY_DEFAULTS,
  COMPLIANCE_ENQUIRY_DEFAULTS,
  SECURITY_ENQUIRY_DEFAULTS,
  GENERAL_CONTACT_DEFAULTS,
  DATA_SUBJECT_REQUEST_DEFAULTS,
} from "@/data/contactTypes";

const DRAFT_KEY = "dataharbour_contact_draft_v1";
const SUBMISSIONS_KEY = "dataharbour_contact_submissions_v1";

export function getEmptyDraft(type: EnquiryType): ContactDraft {
  switch (type) {
    case "buyer":
      return { enquiryType: "buyer", data: { ...BUYER_ENQUIRY_DEFAULTS } };
    case "supplier":
      return { enquiryType: "supplier", data: { ...SUPPLIER_ENQUIRY_DEFAULTS } };
    case "enterprise":
      return { enquiryType: "enterprise", data: { ...ENTERPRISE_ENQUIRY_DEFAULTS } };
    case "technical":
      return { enquiryType: "technical", data: { ...TECHNICAL_ENQUIRY_DEFAULTS } };
    case "compliance":
      return { enquiryType: "compliance", data: { ...COMPLIANCE_ENQUIRY_DEFAULTS } };
    case "security":
      return { enquiryType: "security", data: { ...SECURITY_ENQUIRY_DEFAULTS } };
    case "general":
      return { enquiryType: "general", data: { ...GENERAL_CONTACT_DEFAULTS } };
    case "data-subject":
      return { enquiryType: "data-subject", data: { ...DATA_SUBJECT_REQUEST_DEFAULTS } };
  }
}

export function saveDraft(draft: ContactDraft): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // localStorage may be full or unavailable
  }
}

export function loadDraft(): ContactDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.enquiryType || !parsed.data) return null;
    return parsed as ContactDraft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export function getAllSubmissions(): StoredSubmission[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as StoredSubmission[];
  } catch {
    return [];
  }
}

export function saveSubmission(submission: StoredSubmission): void {
  try {
    const existing = getAllSubmissions();
    existing.push(submission);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }
}

export function deleteSubmission(reference: string): void {
  try {
    const existing = getAllSubmissions();
    const filtered = existing.filter((s) => s.reference !== reference);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));
  } catch {
    // ignore
  }
}

export function generateReference(prefix: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${id}`;
}

export function buildSummary(draft: ContactDraft, reference: string): StoredSubmission {
  const { enquiryType, data } = draft;
  let summary = "";

  switch (enquiryType) {
    case "buyer": {
      const d = data as BuyerEnquiryDraft;
      summary = `${d.fullName} — ${d.organisation || "No organisation"} — ${d.packageInterest || "No package specified"}`;
      break;
    }
    case "supplier": {
      const d = data as SupplierEnquiryDraft;
      summary = `${d.fullName} — ${d.organisation || "No organisation"} — ${d.enquiryTopic || "General"}`;
      break;
    }
    case "enterprise": {
      const d = data as EnterpriseEnquiryDraft;
      summary = `${d.fullName} — ${d.organisation || "No organisation"} — ${d.enquiryType || "General"} (${d.orgSize || "Unknown size"})`;
      break;
    }
    case "technical": {
      const d = data as TechnicalEnquiryDraft;
      summary = `${d.fullName} — ${d.shortTitle || "No title"} — ${d.technicalArea || "General"}`;
      break;
    }
    case "compliance": {
      const d = data as ComplianceEnquiryDraft;
      summary = `${d.fullName} — ${d.topic || "General"} — ${d.organisation || "No organisation"}`;
      break;
    }
    case "security": {
      const d = data as SecurityEnquiryDraft;
      summary = `${d.reporterName || "Anonymous"} — ${d.issueType || "General"} — ${d.affectedPage || "No page specified"}`;
      break;
    }
    case "general": {
      const d = data as GeneralContactDraft;
      summary = `${d.fullName} — ${d.subject || "No subject"} — ${d.topic || "General"}`;
      break;
    }
    case "data-subject": {
      const d = data as DataSubjectRequestDraft;
      summary = `${d.fullName} — ${d.requestType || "General"} — ${d.relevantOrg || "No organisation specified"}`;
      break;
    }
  }

  return {
    enquiryType,
    reference,
    submittedDate: new Date().toISOString(),
    summary,
    data: data as unknown as Record<string, unknown>,
  };
}