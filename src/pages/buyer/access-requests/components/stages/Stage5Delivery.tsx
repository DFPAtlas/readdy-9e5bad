import { useState, useEffect } from 'react';
import { marketplacePackages } from '@/data/marketplacePackages';
import { validateDeliveryStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

interface Stage5DeliveryProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Stage5Delivery({ draft, onUpdate, onNext, onPrev }: Stage5DeliveryProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const pkg = marketplacePackages.find((p) => p.slug === draft.packageSlug);
  const availableFormats = pkg?.deliveryFormats || [];

  function handleContinue() {
    const result = validateDeliveryStage(draft);
    setErrors(result.errors);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function errorFor(f: string) { return errors.find((e) => e.field === f); }
  function update(f: string, v: string) { onUpdate({ ...draft, [f]: v }); }
  const ic = (f: string) => `w-full px-3 py-2 text-sm rounded-lg border outline-none bg-background-50 text-foreground-950 ${errorFor(f) ? 'border-accent-400' : 'border-background-200/70 focus:border-primary-400'}`;

  return (
    <div>
      <div className="space-y-4 mb-6">
        <F label="Preferred delivery format" required error={errorFor('preferredDeliveryFormat')}>
          <select value={draft.preferredDeliveryFormat} onChange={(e) => update('preferredDeliveryFormat', e.target.value)} className={`${ic('preferredDeliveryFormat')} cursor-pointer`}>
            <option value="">— Select format —</option>
            {availableFormats.map((f) => (<option key={f} value={f}>{f}</option>))}
          </select>
        </F>
        <F label="Backup delivery format">
          <select value={draft.backupDeliveryFormat} onChange={(e) => update('backupDeliveryFormat', e.target.value)} className={`${ic('backupDeliveryFormat')} cursor-pointer`}>
            <option value="">— Select backup —</option>
            {availableFormats.map((f) => (<option key={f} value={f}>{f}</option>))}
          </select>
        </F>
        <F label="Integration method"><input type="text" value={draft.integrationMethod} onChange={(e) => update('integrationMethod', e.target.value)} placeholder="E.g. REST API, SFTP, dashboard login" className={ic('integrationMethod')} /></F>
        <F label="Authentication expectation"><input type="text" value={draft.authExpectation} onChange={(e) => update('authExpectation', e.target.value)} placeholder="E.g. API key, OAuth 2.0, SSO" className={ic('authExpectation')} /></F>
        <F label="Environment"><input type="text" value={draft.environment} onChange={(e) => update('environment', e.target.value)} placeholder="E.g. Production, Staging" className={ic('environment')} /></F>
        <F label="Technical contact" required error={errorFor('technicalContact')}><input type="text" value={draft.technicalContact} onChange={(e) => update('technicalContact', e.target.value)} placeholder="Name and email of technical contact" className={ic('technicalContact')} /></F>
        <F label="Schema or sandbox need"><input type="text" value={draft.schemaSandboxNeed} onChange={(e) => update('schemaSandboxNeed', e.target.value)} placeholder="E.g. Sandbox API key, schema documentation" className={ic('schemaSandboxNeed')} /></F>
        <F label="Delivery frequency"><input type="text" value={draft.deliveryFrequency} onChange={(e) => update('deliveryFrequency', e.target.value)} placeholder="E.g. On demand, daily, weekly" className={ic('deliveryFrequency')} /></F>
        <F label="Onboarding support"><input type="text" value={draft.onboardingSupport} onChange={(e) => update('onboardingSupport', e.target.value)} placeholder="What onboarding support is required?" className={ic('onboardingSupport')} /></F>
        <F label="Usage-monitoring contact"><input type="text" value={draft.usageMonitoringContact} onChange={(e) => update('usageMonitoringContact', e.target.value)} placeholder="Who will monitor usage?" className={ic('usageMonitoringContact')} /></F>
        <F label="Maintenance constraints"><input type="text" value={draft.maintenanceConstraints} onChange={(e) => update('maintenanceConstraints', e.target.value)} placeholder="E.g. Maintenance windows, SLA requirements" className={ic('maintenanceConstraints')} /></F>
        <F label="Data-location requirement"><input type="text" value={draft.dataLocationRequirement} onChange={(e) => update('dataLocationRequirement', e.target.value)} placeholder="E.g. UK only, EEA" className={ic('dataLocationRequirement')} /></F>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-accent-50 border border-accent-200/60" role="alert">
          <p className="text-sm font-semibold text-accent-900 mb-1">Please fix the following:</p>
          <ul className="space-y-0.5">{errors.map((e) => (<li key={e.field} className="text-xs text-accent-800">{e.message}</li>))}</ul>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-background-100">
        <button onClick={onPrev} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap"><i className="ri-arrow-left-line"></i> Previous</button>
        <button onClick={handleContinue} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">Continue <i className="ri-arrow-right-line"></i></button>
      </div>
    </div>
  );
}

function F({ label, required, error, hint, children }: { label: string; required?: boolean; error?: { message: string }; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground-700 mb-1">{label}{required && <span className="text-accent-600 ml-0.5">*</span>}</label>
      {children}
      {hint && <p className="text-[11px] text-foreground-400 mt-0.5">{hint}</p>}
      {error && <p className="text-xs text-accent-600 mt-0.5">{error.message}</p>}
    </div>
  );
}