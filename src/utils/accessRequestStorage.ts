// ── DataHarbour Access Request Storage ──
// Manages non-sensitive access request drafts in localStorage.
// Never stores file contents, credentials or personal financial details.

import type { AccessRequestDraft, AccessRequestFormStatus, WorkflowStage } from '@/data/accessRequestTypes';
import { createDefaultDraft, generateRequestRef, generateLocalId, WORKFLOW_STAGES } from '@/data/accessRequestTypes';

const STORAGE_VERSION = 'dh_ar_v1';

function key(name: string): string {
  return `${STORAGE_VERSION}_${name}`;
}

function safeGet<T>(storageKey: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function safeSet(storageKey: string, value: unknown): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

// ── All Drafts ──
export function getAllDrafts(): AccessRequestDraft[] {
  return safeGet<AccessRequestDraft[]>(key('drafts'), []);
}

function saveAllDrafts(drafts: AccessRequestDraft[]): void {
  safeSet(key('drafts'), drafts);
}

// ── Single Draft CRUD ──
export function getDraft(id: string): AccessRequestDraft | null {
  return getAllDrafts().find((d) => d.id === id) ?? null;
}

export function createDraft(packageSlug: string, packageName: string, supplierName: string): AccessRequestDraft {
  const draft = createDefaultDraft(packageSlug, packageName, supplierName);
  const drafts = getAllDrafts();
  drafts.push(draft);
  saveAllDrafts(drafts);
  return draft;
}

export function saveDraft(draft: AccessRequestDraft): void {
  const drafts = getAllDrafts();
  const idx = drafts.findIndex((d) => d.id === draft.id);
  const updated = { ...draft, updatedAt: new Date().toISOString(), lastSavedAt: new Date().toISOString() };
  if (idx >= 0) {
    drafts[idx] = updated;
  } else {
    drafts.push(updated);
  }
  saveAllDrafts(drafts);
}

export function deleteDraft(id: string): void {
  const drafts = getAllDrafts();
  saveAllDrafts(drafts.filter((d) => d.id !== id));
}

export function updateDraftStage(draftId: string, stage: WorkflowStage): AccessRequestDraft | null {
  const draft = getDraft(draftId);
  if (!draft) return null;
  draft.currentStage = stage;
  saveDraft(draft);
  return draft;
}

export function updateDraftStatus(draftId: string, status: AccessRequestFormStatus): AccessRequestDraft | null {
  const draft = getDraft(draftId);
  if (!draft) return null;
  draft.status = status;
  saveDraft(draft);
  return draft;
}

export function submitDraft(draftId: string): AccessRequestDraft | null {
  const draft = getDraft(draftId);
  if (!draft) return null;
  const now = new Date().toISOString();
  draft.reference = generateRequestRef();
  draft.status = 'submitted_demo';
  draft.submittedAt = now;
  draft.updatedAt = now;
  draft.history.push({
    id: generateLocalId(),
    action: 'Access request submitted',
    detail: 'Buyer submitted declared-purpose access request for demonstration',
    actor: 'Current user',
    createdAt: now,
    isDemo: true,
  });
  saveDraft(draft);
  return draft;
}

export function withdrawDraft(draftId: string, reason: string): AccessRequestDraft | null {
  const draft = getDraft(draftId);
  if (!draft) return null;
  const now = new Date().toISOString();
  draft.status = 'withdrawn';
  draft.updatedAt = now;
  draft.resolvedAt = now;
  draft.history.push({
    id: generateLocalId(),
    action: 'Request withdrawn',
    detail: `Withdrawn. Reason: ${reason}`,
    actor: 'Current user',
    createdAt: now,
    isDemo: true,
  });
  saveDraft(draft);
  return draft;
}

export function duplicateDraft(originalId: string): AccessRequestDraft | null {
  const original = getDraft(originalId);
  if (!original) return null;
  const now = new Date().toISOString();
  const dup: AccessRequestDraft = {
    ...original,
    id: generateLocalId(),
    reference: '',
    status: 'draft',
    currentStage: 'product',
    submittedAt: null,
    resolvedAt: null,
    originalRequestId: null,
    conditions: [],
    messages: [],
    history: [{
      id: generateLocalId(),
      action: 'Draft duplicated',
      detail: `Created as a copy of ${original.reference || original.id}`,
      actor: 'Current user',
      createdAt: now,
      isDemo: true,
    }],
    createdAt: now,
    updatedAt: now,
    lastSavedAt: null,
  };
  const drafts = getAllDrafts();
  drafts.push(dup);
  saveAllDrafts(drafts);
  return dup;
}

export function createRevisedDraft(originalId: string): AccessRequestDraft | null {
  const original = getDraft(originalId);
  if (!original) return null;
  const now = new Date().toISOString();
  const revised: AccessRequestDraft = {
    ...original,
    id: generateLocalId(),
    reference: '',
    status: 'draft',
    currentStage: 'product',
    submittedAt: null,
    resolvedAt: null,
    originalRequestId: original.id,
    conditions: [],
    messages: [],
    history: [{
      id: generateLocalId(),
      action: 'Revised draft created',
      detail: `Created as a revision of ${original.reference || original.id}`,
      actor: 'Current user',
      createdAt: now,
      isDemo: true,
    }],
    createdAt: now,
    updatedAt: now,
    lastSavedAt: null,
  };
  const drafts = getAllDrafts();
  drafts.push(revised);
  saveAllDrafts(drafts);
  return revised;
}

// ── Drafts for current organisation ──
// In production this would filter by org ID; for demo we return all
export function getOrganisationDrafts(): AccessRequestDraft[] {
  return getAllDrafts();
}

// ── Clear ──
export function clearAllAccessRequestData(): void {
  localStorage.removeItem(key('drafts'));
}

// ── Debounced autosave helpers ──
let saveTimer: ReturnType<typeof setTimeout> | null = null;

export function debouncedSaveDraft(draft: AccessRequestDraft, delayMs = 800): void {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveDraft(draft);
    saveTimer = null;
  }, delayMs);
}

// ── Stage helpers ──
export function getStageIndex(stage: WorkflowStage): number {
  return WORKFLOW_STAGES.indexOf(stage);
}

export function getNextStage(current: WorkflowStage): WorkflowStage | null {
  const idx = WORKFLOW_STAGES.indexOf(current);
  if (idx < 0 || idx >= WORKFLOW_STAGES.length - 1) return null;
  return WORKFLOW_STAGES[idx + 1];
}

export function getPrevStage(current: WorkflowStage): WorkflowStage | null {
  const idx = WORKFLOW_STAGES.indexOf(current);
  if (idx <= 0) return null;
  return WORKFLOW_STAGES[idx - 1];
}

export function canAccessStage(draft: AccessRequestDraft, targetStage: WorkflowStage): boolean {
  const targetIdx = WORKFLOW_STAGES.indexOf(targetStage);
  const currentIdx = WORKFLOW_STAGES.indexOf(draft.currentStage);
  // Can always go back, and can go forward one stage or to review when on last stage
  if (targetIdx <= currentIdx) return true;
  if (targetIdx === currentIdx + 1) return true;
  if (targetStage === 'review' && currentIdx === WORKFLOW_STAGES.length - 2) return true;
  return false;
}

// ── Duplicate submission check ──
export function hasDraftForPackage(packageSlug: string): boolean {
  return getAllDrafts().some((d) => d.packageSlug === packageSlug && d.status !== 'withdrawn' && d.status !== 'expired_demo');
}