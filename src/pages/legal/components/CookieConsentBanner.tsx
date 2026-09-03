import { useState, useEffect, useCallback } from "react";
import { getDefaultConsent, saveConsent, getStoredConsent, hasValidConsent, CONSENT_VERSION } from "@/data/legalDocuments";
import type { CookieConsent } from "@/data/legalDocuments";
import CookieSettingsPanel from "./CookieSettingsPanel";

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!hasValidConsent()) {
      const timer = setTimeout(() => setShowBanner(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const consent: CookieConsent = {
      version: CONSENT_VERSION,
      consentedAt: new Date().toISOString(),
      categories: { necessary: true, preferences: true, analytics: true, marketing: true },
    };
    saveConsent(consent);
    setShowBanner(false);
  }, []);

  const handleRejectNonEssential = useCallback(() => {
    const consent: CookieConsent = {
      version: CONSENT_VERSION,
      consentedAt: new Date().toISOString(),
      categories: { necessary: true, preferences: false, analytics: false, marketing: false },
    };
    saveConsent(consent);
    setShowBanner(false);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const handleCloseSettings = useCallback((saved: boolean) => {
    setShowSettings(false);
    if (saved) {
      setShowBanner(false);
    }
  }, []);

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up border-t border-foreground-200/20 bg-background-100 p-4 shadow-lg md:p-6" role="dialog" aria-label="Cookie consent" aria-modal="false">
          <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <div className="flex-1">
              <h2 className="mb-1 text-sm font-semibold text-foreground-100">Cookie Preferences</h2>
              <p className="text-[12px] leading-relaxed text-foreground-400">
                DataHarbour uses cookies and local storage for essential functionality, preferences and to understand how the site is used. Optional analytics and marketing storage is off by default. You can manage your preferences at any time.
              </p>
              <div className="mt-2 flex items-center gap-3 text-[11px] text-foreground-500">
                <button type="button" onClick={() => {}} className="underline transition hover:text-foreground-300 cursor-pointer" onClickCapture={(e) => { e.preventDefault(); window.location.href = "/cookies"; }}>Cookie Policy</button>
                <span>&middot;</span>
                <button type="button" onClick={() => {}} className="underline transition hover:text-foreground-300 cursor-pointer" onClickCapture={(e) => { e.preventDefault(); window.location.href = "/privacy"; }}>Privacy Policy</button>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 md:flex-col md:items-stretch">
              <button type="button" onClick={handleAcceptAll} className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-xs font-medium text-background-50 transition hover:bg-primary-400 cursor-pointer">Accept All</button>
              <button type="button" onClick={handleRejectNonEssential} className="whitespace-nowrap rounded-md border border-foreground-300/30 bg-background-50 px-4 py-2 text-xs text-foreground-400 transition hover:text-foreground-300 hover:border-foreground-300/50 cursor-pointer">Reject Non-Essential</button>
              <button type="button" onClick={handleOpenSettings} className="whitespace-nowrap rounded-md border border-foreground-300/30 bg-background-50 px-4 py-2 text-xs text-foreground-400 transition hover:text-foreground-300 hover:border-foreground-300/50 cursor-pointer">Customise</button>
            </div>
          </div>
        </div>
      )}
      {showSettings && <CookieSettingsPanel onClose={handleCloseSettings} />}
    </>
  );
}