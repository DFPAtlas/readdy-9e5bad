import { useState, useEffect, useRef, useCallback } from "react";
import { getStoredConsent, saveConsent, getDefaultConsent, CONSENT_VERSION } from "@/data/legalDocuments";
import type { CookieConsent } from "@/data/legalDocuments";

interface CookieSettingsPanelProps {
  onClose: (saved: boolean) => void;
}

const categoryInfo: { key: keyof CookieConsent["categories"]; label: string; description: string; alwaysOn?: boolean }[] = [
  { key: "necessary", label: "Strictly Necessary", description: "Essential for the website to function. These cannot be disabled. Includes session management, security and consent storage.", alwaysOn: true },
  { key: "preferences", label: "Preferences", description: "Enable the website to remember choices such as saved packages, comparison lists and draft content." },
  { key: "analytics", label: "Analytics", description: "Help us understand how visitors use the website. Currently no analytics storage is deployed in this demonstration phase." },
  { key: "marketing", label: "Marketing", description: "May be used to deliver relevant content. Currently no marketing storage is deployed in this demonstration phase." },
];

export default function CookieSettingsPanel({ onClose }: CookieSettingsPanelProps) {
  const [consent, setConsent] = useState<CookieConsent>(() => getStoredConsent() || getDefaultConsent());
  const [saved, setSaved] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);

  useEffect(() => {
    openerRef.current = document.activeElement;
    firstFocusableRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(false);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      (openerRef.current as HTMLElement)?.focus();
    };
  }, [onClose]);

  const toggle = useCallback((key: keyof CookieConsent["categories"]) => {
    if (key === "necessary") return;
    setConsent((prev: CookieConsent) => ({
      ...prev,
      categories: { ...prev.categories, [key]: !prev.categories[key] },
    }));
  }, []);

  const handleSave = useCallback(() => {
    const updated: CookieConsent = { ...consent, version: CONSENT_VERSION, consentedAt: new Date().toISOString() };
    saveConsent(updated);
    setSaved(true);
    setAnnouncement("Preferences saved.");
    setTimeout(() => onClose(true), 600);
  }, [consent, onClose]);

  const handleAcceptAll = useCallback(() => {
    const all: CookieConsent = { version: CONSENT_VERSION, consentedAt: new Date().toISOString(), categories: { necessary: true, preferences: true, analytics: true, marketing: true } };
    saveConsent(all);
    setAnnouncement("All cookies accepted.");
    setTimeout(() => onClose(true), 400);
  }, [onClose]);

  const handleRejectNonEssential = useCallback(() => {
    const minimal: CookieConsent = { version: CONSENT_VERSION, consentedAt: new Date().toISOString(), categories: { necessary: true, preferences: false, analytics: false, marketing: false } };
    saveConsent(minimal);
    setAnnouncement("Non-essential cookies rejected.");
    setTimeout(() => onClose(true), 400);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => onClose(false)} aria-hidden="true" />
      <div
        ref={panelRef}
        className="fixed inset-x-4 bottom-4 z-[61] mx-auto max-w-lg rounded-xl border border-foreground-200/20 bg-background-100 p-6 shadow-2xl md:inset-x-auto md:bottom-1/2 md:right-1/2 md:translate-x-1/2 md:translate-y-1/2"
        role="dialog"
        aria-label="Cookie settings"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground-100">Cookie Settings</h2>
          <button
            ref={lastFocusableRef}
            type="button"
            onClick={() => onClose(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-background-200 cursor-pointer"
            aria-label="Close settings"
          >
            <i className="ri-close-line text-foreground-400" />
          </button>
        </div>

        <p className="mb-5 text-[12px] leading-relaxed text-foreground-400">
          Manage your cookie and local storage preferences. Your choices are stored in this browser.
        </p>

        <div className="mb-5 space-y-4" role="group" aria-label="Cookie categories">
          {categoryInfo.map((cat) => (
            <div key={cat.key} className="flex items-start gap-3 rounded-lg border border-foreground-200/10 bg-background-50 p-3">
              <div className="flex-1">
                <span className="text-[13px] font-medium text-foreground-200">{cat.label}</span>
                <p className="mt-0.5 text-[11px] leading-relaxed text-foreground-500">{cat.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={consent.categories[cat.key]}
                aria-label={`Toggle ${cat.label}`}
                disabled={cat.alwaysOn}
                onClick={() => toggle(cat.key)}
                className={`mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition ${cat.alwaysOn ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${consent.categories[cat.key] ? "bg-primary-500" : "bg-foreground-700/30"}`}
              >
                <span className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${consent.categories[cat.key] ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button ref={firstFocusableRef} type="button" onClick={handleSave} className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-xs font-medium text-background-50 transition hover:bg-primary-400 cursor-pointer">Save Preferences</button>
          <button type="button" onClick={handleAcceptAll} className="whitespace-nowrap rounded-md border border-foreground-300/30 bg-background-50 px-4 py-2 text-xs text-foreground-400 transition hover:text-foreground-300 cursor-pointer">Accept All</button>
          <button type="button" onClick={handleRejectNonEssential} className="whitespace-nowrap rounded-md border border-foreground-300/30 bg-background-50 px-4 py-2 text-xs text-foreground-400 transition hover:text-foreground-300 cursor-pointer">Reject Non-Essential</button>
        </div>

        <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
      </div>
    </>
  );
}