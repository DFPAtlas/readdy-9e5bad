import type {
  SupplierApplicationDraft,
  FieldError,
  StageValidationState,
} from "@/data/supplierApplicationTypes";

// ─── Helpers ────────────────────────────────────────────────────────

function err(field: string, message: string, stage: number): FieldError {
  return { field, message, stage };
}

function isEmpty(v: unknown): boolean {
  if (typeof v === "string") return v.trim().length === 0;
  if (Array.isArray(v)) return v.length === 0;
  return v === null || v === undefined;
}

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function validUrl(v: string): boolean {
  if (isEmpty(v)) return true;
  return /^https?:\/\/.+/.test(v.trim());
}

function validPhone(v: string): boolean {
  if (isEmpty(v)) return true;
  return /^[\d\s\-\+\(\)]{7,20}$/.test(v.trim());
}

function maxLen(v: string, max: number): boolean {
  return v.trim().length <= max;
}

// ─── Per-stage validators ───────────────────────────────────────────

function validateStage1(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const e = draft.eligibility;
  const stage = 1;

  if (e.registeredOrganisation === "no") {
    errors.push(err("registeredOrganisation", "You must represent a registered organisation or established business to apply.", stage));
  }
  if (e.notStolenOrLeaked === "no" || e.notStolenOrLeaked === "needs_discussion") {
    errors.push(err("notStolenOrLeaked", "If you knowingly propose stolen or unlawfully obtained data, your application cannot proceed.", stage));
  }
  if (e.legitimateBusinessUse === "no") {
    errors.push(err("legitimateBusinessUse", "The product must be intended for legitimate business use.", stage));
  }

  return errors;
}

function validateStage2(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const o = draft.organisation;
  const stage = 2;

  if (isEmpty(o.legalName)) errors.push(err("legalName", "Legal organisation name is required.", stage));
  if (isEmpty(o.organisationType)) errors.push(err("organisationType", "Organisation type is required.", stage));
  if (isEmpty(o.registrationCountry)) errors.push(err("registrationCountry", "Country of registration is required.", stage));
  if (!validUrl(o.website) && !isEmpty(o.website)) errors.push(err("website", "Enter a valid website URL starting with http:// or https://.", stage));
  if (!isEmpty(o.website) && !validUrl(o.website)) errors.push(err("website", "Enter a valid website URL.", stage));
  if (isEmpty(o.mainActivity)) errors.push(err("mainActivity", "Main business activity is required.", stage));
  if (isEmpty(o.dataRelationship)) errors.push(err("dataRelationship", "Relationship to the data is required.", stage));
  if (!isEmpty(o.generalEmail) && !validEmail(o.generalEmail)) errors.push(err("generalEmail", "Enter a valid email address.", stage));
  if (!isEmpty(o.generalPhone) && !validPhone(o.generalPhone)) errors.push(err("generalPhone", "Enter a valid phone number.", stage));
  if (!isEmpty(o.yearEstablished)) {
    const y = parseInt(o.yearEstablished, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(y) || y < 1800 || y > currentYear) {
      errors.push(err("yearEstablished", `Enter a valid year between 1800 and ${currentYear}.`, stage));
    }
  }

  return errors;
}

function validateStage3(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const r = draft.representative;
  const stage = 3;

  if (isEmpty(r.fullName)) errors.push(err("fullName", "Full name is required.", stage));
  if (isEmpty(r.jobTitle)) errors.push(err("jobTitle", "Job title is required.", stage));
  if (isEmpty(r.workEmail)) {
    errors.push(err("workEmail", "Work email is required.", stage));
  } else if (!validEmail(r.workEmail)) {
    errors.push(err("workEmail", "Enter a valid email address.", stage));
  }
  if (!r.authorityToSubmit) errors.push(err("authorityToSubmit", "You must confirm you are authorised to submit this application.", stage));
  if (!r.sameAsPrimaryCompliance && isEmpty(r.complianceContactName)) {
    errors.push(err("complianceContactName", "Compliance contact name is required, or select 'Same as primary contact'.", stage));
  }
  if (!r.sameAsPrimaryCompliance && !isEmpty(r.complianceContactEmail) && !validEmail(r.complianceContactEmail)) {
    errors.push(err("complianceContactEmail", "Enter a valid email for the compliance contact.", stage));
  }
  if (!r.sameAsPrimaryTechnical && isEmpty(r.technicalContactName)) {
    errors.push(err("technicalContactName", "Technical contact name is required, or select 'Same as primary contact'.", stage));
  }
  if (!r.sameAsPrimaryTechnical && !isEmpty(r.technicalContactEmail) && !validEmail(r.technicalContactEmail)) {
    errors.push(err("technicalContactEmail", "Enter a valid email for the technical contact.", stage));
  }
  if (!r.sameAsPrimaryCommercial && isEmpty(r.commercialContactName)) {
    errors.push(err("commercialContactName", "Commercial contact name is required, or select 'Same as primary contact'.", stage));
  }
  if (!r.sameAsPrimaryCommercial && !isEmpty(r.commercialContactEmail) && !validEmail(r.commercialContactEmail)) {
    errors.push(err("commercialContactEmail", "Enter a valid email for the commercial contact.", stage));
  }

  return errors;
}

function validateStage4(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const p = draft.product;
  const stage = 4;

  if (isEmpty(p.productName)) errors.push(err("productName", "Product name is required.", stage));
  if (isEmpty(p.productType)) errors.push(err("productType", "Product type is required.", stage));
  if (isEmpty(p.primaryCategory)) errors.push(err("primaryCategory", "Primary category is required.", stage));
  if (isEmpty(p.shortDescription)) errors.push(err("shortDescription", "Short description is required.", stage));
  if (!maxLen(p.shortDescription, 300)) errors.push(err("shortDescription", "Short description must be 300 characters or fewer.", stage));
  if (isEmpty(p.fullDescription)) errors.push(err("fullDescription", "Full description is required.", stage));
  if (!maxLen(p.fullDescription, 2000)) errors.push(err("fullDescription", "Full description must be 2,000 characters or fewer.", stage));
  if (isEmpty(p.businessProblem)) errors.push(err("businessProblem", "Business problem addressed is required.", stage));
  if (isEmpty(p.geographicCoverage)) errors.push(err("geographicCoverage", "Geographic coverage is required.", stage));

  return errors;
}

function validateStage5(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const p = draft.provenance;
  const stage = 5;

  if (p.sourceCategories.length === 0) errors.push(err("sourceCategories", "Select at least one source category.", stage));
  if (isEmpty(p.collectionMethod)) errors.push(err("collectionMethod", "Collection or acquisition method is required.", stage));
  if (isEmpty(p.geographicOrigin)) errors.push(err("geographicOrigin", "Geographic origin is required.", stage));
  if (isEmpty(p.refreshFrequency)) errors.push(err("refreshFrequency", "Refresh frequency is required.", stage));
  if (p.sources.length === 0) errors.push(err("sources", "Add at least one data source.", stage));

  p.sources.forEach((src, i) => {
    if (isEmpty(src.name)) errors.push(err(`sources[${i}].name`, `Source ${i + 1}: Name is required.`, stage));
    if (isEmpty(src.provider)) errors.push(err(`sources[${i}].provider`, `Source ${i + 1}: Provider is required.`, stage));
    if (isEmpty(src.geography)) errors.push(err(`sources[${i}].geography`, `Source ${i + 1}: Geography is required.`, stage));
  });

  return errors;
}

function validateStage6(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const r = draft.rights;
  const stage = 6;

  if (isEmpty(r.ownershipPosition)) errors.push(err("ownershipPosition", "Ownership or licence position is required.", stage));
  if (isEmpty(r.permittedPurposes)) errors.push(err("permittedPurposes", "Permitted purposes are required.", stage));
  if (isEmpty(r.prohibitedPurposes)) errors.push(err("prohibitedPurposes", "Prohibited purposes are required.", stage));

  return errors;
}

function validateStage7(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const q = draft.quality;
  const stage = 7;

  if (isEmpty(q.refreshFrequency)) errors.push(err("refreshFrequency", "Refresh frequency is required.", stage));
  if (isEmpty(q.updateMethod)) errors.push(err("updateMethod", "Update method is required.", stage));
  if (isEmpty(q.completenessMethod)) errors.push(err("completenessMethod", "Completeness and validation method is required.", stage));

  return errors;
}

function validateStage8(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const s = draft.security;
  const stage = 8;

  if (isEmpty(s.encryptionTransit)) errors.push(err("encryptionTransit", "Encryption in transit is required.", stage));
  if (isEmpty(s.accessControl)) errors.push(err("accessControl", "Access control description is required.", stage));
  if (isEmpty(s.incidentResponse)) errors.push(err("incidentResponse", "Incident response description is required.", stage));
  if (isEmpty(s.incidentNotificationScenario)) errors.push(err("incidentNotificationScenario", "Describe how you would notify DataHarbour of an incident.", stage));

  return errors;
}

function validateStage9(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const d = draft.deliveryCommercial;
  const stage = 9;

  if (d.deliveryFormats.length === 0) errors.push(err("deliveryFormats", "Select at least one delivery format.", stage));
  if (d.preferredPricingModels.length === 0) errors.push(err("preferredPricingModels", "Select at least one preferred pricing model.", stage));
  if (isEmpty(d.supportHours)) errors.push(err("supportHours", "Support hours are required.", stage));

  return errors;
}

function validateStage10(draft: SupplierApplicationDraft): FieldError[] {
  const errors: FieldError[] = [];
  const decl = draft.declarations;
  const stage = 10;

  const requiredDeclarations: { field: keyof typeof decl; label: string }[] = [
    { field: "infoAccurate", label: "Information is accurate to your knowledge" },
    { field: "authorityToDiscuss", label: "Organisation has authority to discuss the product" },
    { field: "noStolenData", label: "No stolen, leaked or unlawfully obtained data is proposed" },
    { field: "restrictionsDisclosed", label: "Restrictions and limitations are disclosed" },
    { field: "willReportChanges", label: "Material changes will be reported" },
    { field: "noGuaranteedAcceptance", label: "Submission does not guarantee acceptance" },
    { field: "mayRequestMoreInfo", label: "DataHarbour may request more information" },
    { field: "finalTermsSeparate", label: "Final terms require separate agreement" },
    { field: "demoDataBrowserOnly", label: "Demonstration data remains in this browser only" },
  ];

  requiredDeclarations.forEach(({ field, label }) => {
    if (!decl[field]) {
      errors.push(err(field, `You must confirm: "${label}"`, stage));
    }
  });

  return errors;
}

// ─── Validator map ──────────────────────────────────────────────────

const STAGE_VALIDATORS: Record<number, (draft: SupplierApplicationDraft) => FieldError[]> = {
  1: validateStage1,
  2: validateStage2,
  3: validateStage3,
  4: validateStage4,
  5: validateStage5,
  6: validateStage6,
  7: validateStage7,
  8: validateStage8,
  9: validateStage9,
  10: validateStage10,
};

// ─── Public API ─────────────────────────────────────────────────────

export function validateStage(draft: SupplierApplicationDraft, stage: number): StageValidationState {
  const validator = STAGE_VALIDATORS[stage];
  if (!validator) return { stage, valid: true, errors: [] };
  const errors = validator(draft);
  return { stage, valid: errors.length === 0, errors };
}

export function validateAllStages(draft: SupplierApplicationDraft): StageValidationState[] {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => validateStage(draft, s));
}

export function getFirstIncompleteStage(draft: SupplierApplicationDraft): number {
  const results = validateAllStages(draft);
  const incomplete = results.find((r) => !r.valid);
  return incomplete ? incomplete.stage : 10;
}

export function isApplicationComplete(draft: SupplierApplicationDraft): boolean {
  const results = validateAllStages(draft);
  return results.every((r) => r.valid);
}