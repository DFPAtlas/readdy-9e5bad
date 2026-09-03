import { useState, useEffect } from 'react';
import { validateDataScopeStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

interface StageProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Stage4DataScope({ draft, onUpdate, onNext, onPrev }: StageProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);

  function handleContinue() {
    const result = validateDataScopeStage(draft);
    setErrors(result.errors);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function errorFor(f: string) { return errors.find((e) => e.field === f); }
  function update(f: string, v: string | boolean) { onUpdate({ ...draft, [f]: v }); }
  const ic = (f: string) => `w-full px-3 py-2 text-sm rounded-lg border outline-none bg-background-50 text-foreground-950 ${errorFor(f) ? 'border-accent-400' : 'border-background-200/70 focus:border-primary-400'}`;

  return (
    <div>
      <div className="space-y-4 mb-6">
        <F label="Geography">{/* may differ from package coverage */}<input type="text" value={draft.dataGeography} onChange={(e) => update('dataGeography', e.target.value)} placeholder="E.g. United Kingdom, England only" className={ic('dataGeography')} /></F>
        <F label="Date range"><input type="text" value={draft.dateRange} onChange={(e) => update('dateRange', e.target.value)} placeholder="E.g. Last 3 years, rolling 12 months" className={ic('dateRange')} /></F>
        <F label="Required fields or schema areas"><textarea value={draft.requiredFields} onChange={(e) => update('requiredFields', e.target.value)} rows={2} placeholder="Which specific fields or schema areas do you need?" className={ic('requiredFields')} /></F>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <F label="Initial volume" required error={errorFor('initialVolume')}><input type="text" value={draft.initialVolume} onChange={(e) => update('initialVolume', e.target.value)} placeholder="E.g. 5,000 lookups" className={ic('initialVolume')} /></F>
          <F label="Monthly volume"><input type="text" value={draft.monthlyVolume} onChange={(e) => update('monthlyVolume', e.target.value)} placeholder="E.g. 5,000 lookups per month" className={ic('monthlyVolume')} /></F>
        </div>
        <F label="Peak volume"><input type="text" value={draft.peakVolume} onChange={(e) => update('peakVolume', e.target.value)} placeholder="E.g. 10,000 lookups during month-end" className={ic('peakVolume')} /></F>
        <F label="Refresh need"><input type="text" value={draft.refreshNeed} onChange={(e) => update('refreshNeed', e.target.value)} placeholder="E.g. Daily, weekly, real-time" className={ic('refreshNeed')} /></F>
        <F label="Historical depth"><input type="text" value={draft.historicalDepth} onChange={(e) => update('historicalDepth', e.target.value)} placeholder="E.g. 3 years of history" className={ic('historicalDepth')} /></F>
        <F label="Filtering or segmentation"><input type="text" value={draft.filteringSegmentation} onChange={(e) => update('filteringSegmentation', e.target.value)} placeholder="How will you filter or segment the data?" className={ic('filteringSegmentation')} /></F>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={draft.sampleSandboxRequired} onChange={(e) => update('sampleSandboxRequired', e.target.checked)} className="w-4 h-4 rounded text-primary-500 cursor-pointer" />
          <label className="text-sm text-foreground-700">Sample or sandbox required before full access</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={draft.fullPackageNecessary} onChange={(e) => update('fullPackageNecessary', e.target.checked)} className="w-4 h-4 rounded text-primary-500 cursor-pointer" />
          <label className="text-sm text-foreground-700">Full package is necessary</label>
        </div>
        <F label="Data-minimisation explanation" required error={errorFor('dataMinimisationExplanation')} hint="Explain why the requested scope is proportionate and no less data would meet your needs.">
          <textarea value={draft.dataMinimisationExplanation} onChange={(e) => update('dataMinimisationExplanation', e.target.value)} rows={3} placeholder="Explain why this scope is proportionate..." className={ic('dataMinimisationExplanation')} />
        </F>
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