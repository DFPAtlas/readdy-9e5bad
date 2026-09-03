// ── DataHarbour Buyer Portal Storage ──
// Manages non-sensitive buyer demonstration data in localStorage.
// Never stores credentials, full API secrets or personal financial details.

import type { BuyerNotification, NamedComparison } from '@/data/buyerData';

const STORAGE_VERSION = 'dh_buyer_v1';

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

// ── Notifications ──
export function getBuyerNotifications(): BuyerNotification[] {
  return safeGet<BuyerNotification[]>(key('notifications'), []);
}

export function saveBuyerNotifications(notifications: BuyerNotification[]): void {
  safeSet(key('notifications'), notifications);
}

export function markNotificationRead(notificationId: string): void {
  const notifications = getBuyerNotifications();
  const idx = notifications.findIndex((n) => n.id === notificationId);
  if (idx >= 0) {
    notifications[idx] = { ...notifications[idx], read: true };
    saveBuyerNotifications(notifications);
  }
}

export function markNotificationUnread(notificationId: string): void {
  const notifications = getBuyerNotifications();
  const idx = notifications.findIndex((n) => n.id === notificationId);
  if (idx >= 0) {
    notifications[idx] = { ...notifications[idx], read: false };
    saveBuyerNotifications(notifications);
  }
}

export function clearReadNotifications(): void {
  const notifications = getBuyerNotifications();
  saveBuyerNotifications(notifications.filter((n) => !n.read));
}

export function getUnreadNotificationCount(): number {
  return getBuyerNotifications().filter((n) => !n.read).length;
}

// ── Named Comparisons ──
export function getNamedComparisons(): NamedComparison[] {
  return safeGet<NamedComparison[]>(key('named_comparisons'), []);
}

export function saveNamedComparison(comparison: NamedComparison): void {
  const existing = getNamedComparisons();
  const idx = existing.findIndex((c) => c.id === comparison.id);
  if (idx >= 0) {
    existing[idx] = { ...comparison, updatedAt: new Date().toISOString() };
  } else {
    existing.push(comparison);
  }
  safeSet(key('named_comparisons'), existing);
}

export function deleteNamedComparison(id: string): void {
  const existing = getNamedComparisons();
  saveNamedComparisons(existing.filter((c) => c.id !== id));
}

export function saveNamedComparisons(comparisons: NamedComparison[]): void {
  safeSet(key('named_comparisons'), comparisons);
}

// ── Buyer Portal Preferences ──
export interface BuyerPreferences {
  dateFormat: string;
  numberFormat: string;
  defaultView: string;
  notificationEmail: boolean;
  notificationDashboard: boolean;
  notificationUsageAlert: boolean;
  notificationBillingAlert: boolean;
  notificationComplianceReminder: boolean;
  notificationProductUpdates: boolean;
}

export function getBuyerPreferences(): BuyerPreferences {
  return safeGet<BuyerPreferences>(key('preferences'), {
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'UK',
    defaultView: 'dashboard',
    notificationEmail: false,
    notificationDashboard: true,
    notificationUsageAlert: true,
    notificationBillingAlert: true,
    notificationComplianceReminder: true,
    notificationProductUpdates: false,
  });
}

export function saveBuyerPreferences(prefs: BuyerPreferences): void {
  safeSet(key('preferences'), prefs);
}

// ── Clear Buyer Portal Data ──
export function clearBuyerPortalData(): void {
  localStorage.removeItem(key('notifications'));
  localStorage.removeItem(key('named_comparisons'));
  localStorage.removeItem(key('preferences'));
}