import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validateSharingStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

interface Stage7SharingProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Stage7Sharing({ draft, onUpdate, onNext, onPrev }: Stage7SharingProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [warnings, setWarnings] = useState<{ field: string; message: string }[]>([]);

  function handleContinue() {
    const result = validateSharingStage(draft);
    setErrors(result.errors);
    setWarnings(result.warnings);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function errorFor(f: string) { return errors.find((e) => e.field === f); }
  function update(f: string, v: string | boolean) { onUpdate({ ...draft, [f]: v }); }
  const ic = (f: string) => `w-full px-3 py-2 text-sm rounded-lg border outline-none bg-background-50 text-foreground-950 ${errorFor(f) ? 'border-accent-400' : 'border-background-200/70 focus:border-primary-400'}`;

  return (
    <div>
      <div className="space-y-4 mb-6">
        <F label="Internal departments with access"><input type="text" value={draft.internalDepartments} onChange={(e) => update('internalDepartments', e.target.value)} placeholder="E.g. Compliance, Risk, Procurement" className={ic('internalDepartments')} /></F>
        <F label="External organisations or processors"><input type="text" value={draft.externalOrganisations} onChange={(e) => update('externalOrganisations', e.target.value)} placeholder="List any external organisations that will receive the data" className={ic('externalOrganisations')} /></F>
        <F label="Contractors and group companies"><input type="text" value={draft.contractorsGroupCompanies} onChange={(e) => update('contractorsGroupCompanies', e.target.value)} className={ic('contractorsGroupCompanies')} /></F>
        <F label="Countries involved"><input type="text" value={draft.countriesInvolved} onChange={(e) => update('countriesInvolved', e.target.value)} placeholder="E.g. United Kingdom only" className={ic('countriesInvolved')} /></F>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CheckBox checked={draft.rawDataSharing} onChange={(v) => update('rawDataSharing', v)} label="Raw data will be shared" />
          <CheckBox checked={draft.derivedOutputSharing} onChange={(v) => update('derivedOutputSharing', v)} label="Derived outputs will be shared" />
          <CheckBox checked={draft.publicationIntent} onChange={(v) => update('publicationIntent', v)} label="Data or outputs may be published" />
          <CheckBox checked={draft.resaleOrSublicensing} onChange={(v) => update('resaleOrSublicensing', v)} label="Resale or sublicensing intended" />
          <CheckBox checked={draft.modelTrainingUse} onChange={(v) => update('modelTrainingUse', v)} label="Data will be used for model training" />
        </div>

        {draft.resaleOrSublicensing && (
          <div className="p-3 rounded-lg border border-accent-200/60 bg-accent-50/30">
            <p className="text-sm font-semibold text-accent-800 flex items-center gap-1"><i className="ri-error-warning-line"></i> Warning</p>
            <p className="text-xs text-accent-700 mt-0.5">Resale or sublicensing may not be permitted. Review the package licence terms carefully before proceeding.</p>
          </div>
        )}

        <F label="Recipient controls"><textarea value={draft.recipientControls} onChange={(e) => update('recipientControls', e.target.value)} rows={2} placeholder="What controls govern recipients of this data?" className={ic('recipientControls')} /></F>
        <F label="Sharing justification" required error={errorFor('sharingJustification')}><textarea value={draft.sharingJustification} onChange={(e) => update('sharingJustification', e.target.value)} rows={2} placeholder="Justify why this sharing arrangement is necessary and proportionate" className={ic('sharingJustification')} /></F>
      </div>

      {warnings.length > 0 && (
        <div className="mb-3 p-3 rounded-lg bg-secondary-50 border border-secondary-200/60">
          <p className="text-sm font-semibold text-secondary-800 mb-1">Warnings:</p>
          <ul className="space-y-0.5">{warnings.map((w) => (<li key={w.field} className="text-xs text-secondary-700">{w.message}</li>))}</ul>
        </div>
      )}
      {errors.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-accent-50 border border-accent-200/60" role="alert">
          <p className="text-sm font-semibold text-accent-900 mb-1">Please fix:</p>
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

function CheckBox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 w-4 h-4 rounded text-primary-500 cursor-pointer" />
      <span className="text-sm text-foreground-700">{label}</span>
    </label>
  );
}