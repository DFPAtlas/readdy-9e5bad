// ── DataHarbour Demonstration Auth Storage ──
// Manages non-sensitive local demonstration metadata only.
// Never stores passwords, reset tokens, API keys or security answers.

import type {
  DemoAuthUser,
  DemoSession,
  OrganisationOnboardingDraft,
  IntendedUseDraft,
  TeamMember,
  TermsAcceptance,
  OnboardingStage,
} from '@/data/authTypes';
import { createDefaultOrganisationDraft, createDefaultIntendedUseDraft } from '@/data/authTypes';

const STORAGE_VERSION = 'dh_demo_v2';

// ── Key Generators ──
function key(name: string): string {
  return `${STORAGE_VERSION}_${name}`;
}

// ── Safe JSON helpers ──
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
    // Storage full or unavailable — silently fail
  }
}

// ── User ──
export function getDemoUsers(): DemoAuthUser[] {
  return safeGet<DemoAuthUser[]>(key('users'), []);
}

export function saveDemoUser(user: DemoAuthUser): void {
  const users = getDemoUsers();
  const idx = users.findIndex((u) => u.workEmail.toLowerCase() === user.workEmail.toLowerCase());
  if (idx >= 0) {
    users[idx] = user;
  } else {
    users.push(user);
  }
  safeSet(key('users'), users);
}

export function findDemoUserByEmail(email: string): DemoAuthUser | null {
  const users = getDemoUsers();
  return users.find((u) => u.workEmail.toLowerCase() === email.toLowerCase()) ?? null;
}

export function clearDemoUsers(): void {
  localStorage.removeItem(key('users'));
}

// ── Session ──
export function getDemoSession(): DemoSession | null {
  return safeGet<DemoSession | null>(key('session'), null);
}

export function saveDemoSession(session: DemoSession): void {
  safeSet(key('session'), session);
}

export function clearDemoSession(): void {
  localStorage.removeItem(key('session'));
}

export function hasDemoSession(): boolean {
  return getDemoSession() !== null;
}

export function getCurrentDemoUser(): DemoAuthUser | null {
  const session = getDemoSession();
  if (!session) return null;
  const users = getDemoUsers();
  return users.find((u) => u.id === session.userId) ?? null;
}

// ── Organisation Onboarding ──
export function getOrganisationDraft(): OrganisationOnboardingDraft {
  return safeGet<OrganisationOnboardingDraft>(key('org_draft'), createDefaultOrganisationDraft());
}

export function saveOrganisationDraft(draft: OrganisationOnboardingDraft): void {
  safeSet(key('org_draft'), draft);
}

export function clearOrganisationDraft(): void {
  localStorage.removeItem(key('org_draft'));
}

// ── Onboarding Stage ──
export function getOnboardingStage(): OnboardingStage {
  return safeGet<OnboardingStage>(key('onboarding_stage'), 'organisation');
}

export function saveOnboardingStage(stage: OnboardingStage): void {
  safeSet(key('onboarding_stage'), stage);
}

export function clearOnboardingStage(): void {
  localStorage.removeItem(key('onboarding_stage'));
}

// ── Intended Use ──
export function getIntendedUseDraft(): IntendedUseDraft {
  return safeGet<IntendedUseDraft>(key('intended_use'), createDefaultIntendedUseDraft());
}

export function saveIntendedUseDraft(draft: IntendedUseDraft): void {
  safeSet(key('intended_use'), draft);
}

export function clearIntendedUseDraft(): void {
  localStorage.removeItem(key('intended_use'));
}

// ── Team ──
export function getTeamMembers(): TeamMember[] {
  return safeGet<TeamMember[]>(key('team'), []);
}

export function saveTeamMembers(members: TeamMember[]): void {
  safeSet(key('team'), members);
}

export function clearTeamMembers(): void {
  localStorage.removeItem(key('team'));
}

// ── Terms Acceptance ──
export function getTermsAcceptances(): TermsAcceptance[] {
  return safeGet<TermsAcceptance[]>(key('terms_acceptances'), []);
}

export function saveTermsAcceptance(acceptance: TermsAcceptance): void {
  const existing = getTermsAcceptances();
  const idx = existing.findIndex((t) => t.documentSlug === acceptance.documentSlug);
  if (idx >= 0) {
    existing[idx] = acceptance;
  } else {
    existing.push(acceptance);
  }
  safeSet(key('terms_acceptances'), existing);
}

export function clearTermsAcceptances(): void {
  localStorage.removeItem(key('terms_acceptances'));
}

// ── Onboarding Completion ──
export interface OnboardingCompletion {
  organisationRef: string;
  completedAt: string;
  accountType: string;
  organisationName: string;
}

export function getOnboardingCompletion(): OnboardingCompletion | null {
  return safeGet<OnboardingCompletion | null>(key('onboarding_complete'), null);
}

export function saveOnboardingCompletion(completion: OnboardingCompletion): void {
  safeSet(key('onboarding_complete'), completion);
}

export function clearOnboardingCompletion(): void {
  localStorage.removeItem(key('onboarding_complete'));
}

// ── Bulk Clear ──
export function clearAllAccountData(): void {
  clearDemoSession();
  clearDemoUsers();
  clearOrganisationDraft();
  clearIntendedUseDraft();
  clearTeamMembers();
  clearTermsAcceptances();
  clearOnboardingStage();
  clearOnboardingCompletion();
}

// ── Safe Return URL ──
const ALLOWED_RETURN_PATHS = [
  '/marketplace',
  '/solutions',
  '/compliance',
  '/suppliers',
  '/resources',
  '/pricing',
  '/contact',
  '/legal',
  '/account-demo',
  '/onboarding',
];

export function parseSafeReturn(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    if (decoded.startsWith('http:') || decoded.startsWith('https:') || decoded.startsWith('//') || decoded.startsWith('javascript:')) {
      return null;
    }
    const url = new URL(decoded, 'https://dataharbour.example');
    const path = url.pathname;
    const allowed = ALLOWED_RETURN_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
    if (!allowed) return null;
    return path + url.search;
  } catch {
    return null;
  }
}