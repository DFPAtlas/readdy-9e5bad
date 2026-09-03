import { useState, useEffect } from 'react';
import { validateRetentionStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

interface Stage6RetentionProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Stage6Retention({ draft, onUpdate, onNext, onPrev }: Stage6RetentionProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);

  function handleContinue() {
    const result = validateRetentionStage(draft);
    setErrors(result.errors);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function errorFor(f: string) { return errors.find((e) => e.field === f); }
  function update(f: string, v: string | boolean) { onUpdate({ ...draft, [f]: v }); }
  const ic = (f: string) => `w-full px-3 py-2 text-sm rounded-lg border outline-none bg-background-50 text-foreground-950 ${errorFor(f) ? 'border-accent-400' : 'border-background-200/70 focus:border-primary-400'}`;

  return (
    <div>
      {/* Retention lifecycle diagram */}
      <div className="mb-5 p-4 rounded-lg border border-background-200/70 bg-background-50">
        <h3 className="text-sm font-semibold text-foreground-900 mb-3">Data lifecycle</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-600">
          {['Receive', 'Active use', 'Review', 'Purpose or licence ends', 'Secure deletion', 'Record action'].map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-secondary-50 text-secondary-800 font-medium whitespace-nowrap">{step}</span>
              {i < 5 && <i className="ri-arrow-right-line text-foreground-400"></i>}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <F label="Proposed retention period" required error={errorFor('retentionPeriod')}>
          <input type="text" value={draft.proposedRetentionPeriod} onChange={(e) => update('proposedRetentionPeriod', e.target.value)} placeholder="E.g. 7 years for regulatory compliance" className={ic('proposedRetentionPeriod')} />
        </F>
        <F label="Retention reason" required error={errorFor('retentionReason')}>
          <textarea value={draft.retentionReason} onChange={(e) => update('retentionReason', e.target.value)} rows={2} placeholder="Legal, regulatory or business reason for the proposed period" className={ic('retentionReason')} />
        </F>
        <F label="Review frequency"><input type="text" value={draft.reviewFrequency} onChange={(e) => update('reviewFrequency', e.target.value)} placeholder="E.g. Annually, at licence renewal" className={ic('reviewFrequency')} /></F>
        <F label="Deletion method" required error={errorFor('deletionMethod')}><input type="text" value={draft.deletionMethod} onChange={(e) => update('deletionMethod', e.target.value)} placeholder="E.g. Secure deletion from all systems, backup purge within 90 days" className={ic('deletionMethod')} /></F>
        <F label="Backup treatment"><input type="text" value={draft.backupTreatment} onChange={(e) => update('backupTreatment', e.target.value)} placeholder="How will backups containing this data be handled?" className={ic('backupTreatment')} /></F>
        <F label="Archive use"><input type="text" value={draft.archiveUse} onChange={(e) => update('archiveUse', e.target.value)} placeholder="Will data be archived after active use?" className={ic('archiveUse')} /></F>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={draft.legalHoldPossibility} onChange={(e) => update('legalHoldPossibility', e.target.checked)} className="w-4 h-4 rounded text-primary-500 cursor-pointer" />
          <label className="text-sm text-foreground-700">Legal hold is a possibility</label>
        </div>
        <F label="Derived-output retention"><input type="text" value={draft.derivedOutputRetention} onChange={(e) => update('derivedOutputRetention', e.target.value)} placeholder="How long will derived outputs or reports be kept?" className={ic('derivedOutputRetention')} /></F>
        <F label="Responsible owner" required error={errorFor('retentionOwner')}><input type="text" value={draft.retentionOwner} onChange={(e) => update('retentionOwner', e.target.value)} placeholder="Name or role responsible for data retention" className={ic('retentionOwner')} /></F>
        <F label="End-of-licence process"><input type="text" value={draft.endOfLicenceProcess} onChange={(e) => update('endOfLicenceProcess', e.target.value)} placeholder="What process ensures deletion when the licence ends?" className={ic('endOfLicenceProcess')} /></F>
        <div className="flex items-start gap-2">
          <input type="checkbox" checked={draft.supplierLimitsOverrideLonger} onChange={(e) => update('supplierLimitsOverrideLonger', e.target.checked)} className="mt-0.5 w-4 h-4 rounded text-primary-500 cursor-pointer" />
          <label className="text-sm text-foreground-700">I confirm that supplier retention limits override any longer preference stated here</label>
        </div>
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