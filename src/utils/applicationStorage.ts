import type { SupplierApplicationDraft, LocalAppStatus } from "@/data/supplierApplicationTypes";
import { createEmptyDraft } from "@/data/supplierApplicationDefaults";

const STORAGE_KEY = "dataharbour_supplier_application_v1";
const STATUS_KEY = "dataharbour_supplier_application_status_v1";

export interface SavedDraftMeta {
  localAppId: string;
  lastSavedDate: string;
  localStatus: LocalAppStatus;
  demonstrationReference: string;
  currentStage: number;
}

// ─── Save ───────────────────────────────────────────────────────────

export function saveDraft(draft: SupplierApplicationDraft): void {
  try {
    const updated: SupplierApplicationDraft = {
      ...draft,
      metadata: {
        ...draft.metadata,
        lastSavedDate: new Date().toISOString(),
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    saveMeta(updated);
  } catch {
    // localStorage may be full or unavailable — swallow gracefully
  }
}

function saveMeta(draft: SupplierApplicationDraft): void {
  const meta: SavedDraftMeta = {
    localAppId: draft.metadata.localAppId,
    lastSavedDate: draft.metadata.lastSavedDate,
    localStatus: draft.metadata.localStatus,
    demonstrationReference: draft.metadata.demonstrationReference,
    currentStage: draft.metadata.currentStage,
  };
  try {
    localStorage.setItem(STATUS_KEY, JSON.stringify(meta));
  } catch {
    // swallow
  }
}

// ─── Load ───────────────────────────────────────────────────────────

export function loadDraft(): SupplierApplicationDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.metadata || !parsed.metadata.schemaVersion) return null;
    return parsed as SupplierApplicationDraft;
  } catch {
    return null;
  }
}

export function loadDraftMeta(): SavedDraftMeta | null {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedDraftMeta;
  } catch {
    return null;
  }
}

// ─── Delete ─────────────────────────────────────────────────────────

export function deleteDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STATUS_KEY);
  } catch {
    // swallow
  }
}

// ─── Check for existing draft ───────────────────────────────────────

export function hasExistingDraft(): boolean {
  return loadDraft() !== null;
}

// ─── Update metadata only ───────────────────────────────────────────

export function updateDraftMeta(draft: SupplierApplicationDraft, updates: Partial<SupplierApplicationDraft["metadata"]>): SupplierApplicationDraft {
  return {
    ...draft,
    metadata: {
      ...draft.metadata,
      ...updates,
      lastSavedDate: new Date().toISOString(),
    },
  };
}

// ─── Debounced autosave ─────────────────────────────────────────────

let saveTimer: ReturnType<typeof setTimeout> | null = null;

export function debouncedSave(draft: SupplierApplicationDraft, delayMs = 2000): void {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveDraft(draft);
  }, delayMs);
}

// ─── Locked status check ────────────────────────────────────────────

export function isSubmissionLocked(draft: SupplierApplicationDraft): boolean {
  return draft.metadata.localStatus === "demonstration_submitted";
}

export function canEditStatus(status: LocalAppStatus): boolean {
  return status === "draft" || status === "ready_for_review" || status === "revised_draft";
}

// ─── Create revised draft ───────────────────────────────────────────

export function createRevisedDraft(original: SupplierApplicationDraft): SupplierApplicationDraft {
  const now = new Date().toISOString();
  return {
    ...original,
    metadata: {
      ...original.metadata,
      localAppId: `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      currentStage: 1,
      completedStages: [],
      createdDate: now,
      lastSavedDate: now,
      localStatus: "revised_draft",
      demonstrationReference: "",
      submissionDate: "",
    },
    declarations: {
      infoAccurate: false,
      authorityToDiscuss: false,
      noStolenData: false,
      restrictionsDisclosed: false,
      willReportChanges: false,
      noGuaranteedAcceptance: false,
      mayRequestMoreInfo: false,
      finalTermsSeparate: false,
      demoDataBrowserOnly: false,
    },
  };
}