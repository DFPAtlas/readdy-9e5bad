import { useState, useCallback } from "react";
import { getStoredConsent, saveConsent, getDefaultConsent, CONSENT_VERSION } from "@/data/legalDocuments";
import type { CookieConsent } from "@/data/legalDocuments";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";

const categoryInfo: { key: keyof CookieConsent["categories"]; label: string; description: string; alwaysOn?: boolean }[] = [
  { key: "necessary", label: "Strictly Necessary", description: "Essential for the website to function. These cannot be disabled. Includes session management, security and consent storage.", alwaysOn: true },
  { key: "preferences", label: "Preferences", description: "Enable the website to remember choices such as saved packages, comparison lists and draft content." },
  { key: "analytics", label: "Analytics", description: "Help us understand how visitors use the website. Currently no analytics storage is deployed." },
  { key: "marketing", label: "Marketing", description: "May be used to deliver relevant content. Currently no marketing storage is deployed." },
];

export default function CookieSettingsPage() {
  const [consent, setConsent] = useState<CookieConsent>(() => getStoredConsent() || getDefaultConsent());
  const [saved, setSaved] = useState(false);

  const toggle = useCallback((key: keyof CookieConsent["categories"]) => {
    if (key === "necessary") return;
    setConsent((prev: CookieConsent) => ({
      ...prev,
      categories: { ...prev.categories, [key]: !prev.categories[key] },
    }));
  }, []);

  const handleSave = useCallback(() => {
    saveConsent({ ...consent, version: CONSENT_VERSION, consentedAt: new Date().toISOString() });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [consent]);

  const handleAcceptAll = useCallback(() => {
    const all: CookieConsent = { version: CONSENT_VERSION, consentedAt: new Date().toISOString(), categories: { necessary: true, preferences: true, analytics: true, marketing: true } };
    saveConsent(all);
    setConsent(all);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, []);

  const handleRejectNonEssential = useCallback(() => {
    const min: CookieConsent = { version: CONSENT_VERSION, consentedAt: new Date().toISOString(), categories: { necessary: true, preferences: false, analytics: false, marketing: false } };
    saveConsent(min);
    setConsent(min);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-background-50">
      <PublicHeader />
      <main className="mx-auto max-w-lg px-4 py-12 md:px-6 md:py-16">
        <h1 className="mb-4 text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Cookie Settings</h1>
        <p className="mb-6 text-sm leading-relaxed text-foreground-400">Manage your cookie and local storage preferences for the DataHarbour website. Changes take effect immediately.</p>

        {saved && (
          <div className="mb-5 rounded-md bg-accent-100/60 px-4 py-3 text-[12px] text-accent-800" role="alert">Preferences saved.</div>
        )}

        <div className="mb-6 space-y-4">
          {categoryInfo.map((cat) => (
            <div key={cat.key} className="flex items-start gap-3 rounded-lg border border-foreground-200/10 bg-background-100 p-4">
              <div className="flex-1">
                <span className="text-[14px] font-medium text-foreground-200">{cat.label}</span>
                <p className="mt-1 text-[12px] leading-relaxed text-foreground-500">{cat.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={consent.categories[cat.key]}
                aria-label={`Toggle ${cat.label}`}
                disabled={cat.alwaysOn}
                onClick={() => toggle(cat.key)}
                className={`mt-1 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition ${cat.alwaysOn ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${consent.categories[cat.key] ? "bg-primary-500" : "bg-foreground-700/30"}`}
              >
                <span className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${consent.categories[cat.key] ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={handleSave} className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-xs font-medium text-background-50 transition hover:bg-primary-400 cursor-pointer">Save Preferences</button>
          <button type="button" onClick={handleAcceptAll} className="whitespace-nowrap rounded-md border border-foreground-300/30 bg-background-50 px-4 py-2 text-xs text-foreground-400 transition hover:text-foreground-300 cursor-pointer">Accept All</button>
          <button type="button" onClick={handleRejectNonEssential} className="whitespace-nowrap rounded-md border border-foreground-300/30 bg-background-50 px-4 py-2 text-xs text-foreground-400 transition hover:text-foreground-300 cursor-pointer">Reject Non-Essential</button>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}