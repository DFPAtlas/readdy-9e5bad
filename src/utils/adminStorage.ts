// ── DataHarbour Administration Storage ──
// Manages non-sensitive admin demonstration data in localStorage.
// Never stores credentials, secrets or real personal information.

import type { AdminSession, AdminAuditEvent, AdminSystemSettings } from '@/data/adminData';
import { demoAuditEvents, demoDefaultSettings } from '@/data/adminData';

const STORAGE_VERSION = 'dh_admin_v1';

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
    // Storage unavailable
  }
}

// ── Admin Session ──
export function getAdminSession(): AdminSession | null {
  return safeGet<AdminSession | null>(key('session'), null);
}

export function saveAdminSession(session: AdminSession): void {
  safeSet(key('session'), session);
}

export function clearAdminSession(): void {
  localStorage.removeItem(key('session'));
}

export function hasAdminSession(): boolean {
  return getAdminSession() !== null;
}

// ── Audit Events ──
export function getAuditEvents(): AdminAuditEvent[] {
  return safeGet<AdminAuditEvent[]>(key('audit_events'), demoAuditEvents);
}

export function addAuditEvent(event: AdminAuditEvent): void {
  const events = getAuditEvents();
  events.unshift(event);
  safeSet(key('audit_events'), events);
}

// ── System Settings ──
export function getSystemSettings(): AdminSystemSettings {
  return safeGet<AdminSystemSettings>(key('settings'), demoDefaultSettings);
}

export function saveSystemSettings(settings: AdminSystemSettings): void {
  safeSet(key('settings'), settings);
}

// ── Clear Admin Data ──
export function clearAdminData(): void {
  localStorage.removeItem(key('session'));
  localStorage.removeItem(key('audit_events'));
  localStorage.removeItem(key('settings'));
}