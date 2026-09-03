import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_PURPOSE_OPTIONS, validateBusinessPurposeStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

interface Stage2BusinessPurposeProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Stage2BusinessPurpose({ draft, onUpdate, onNext, onPrev }: Stage2BusinessPurposeProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);

  function handleContinue() {
    const result = validateBusinessPurposeStage(draft);
    setErrors(result.errors);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function errorFor(field: string) {
    return errors.find((e) => e.field === field);
  }

  function update(field: string, value: string | boolean) {
    onUpdate({ ...draft, [field]: value });
  }

  const inputClass = (field: string) =>
    `w-full px-3 py-2 text-sm rounded-lg border outline-none bg-background-50 text-foreground-950 ${errorFor(field) ? 'border-accent-400 focus:border-accent-500' : 'border-background-200/70 focus:border-primary-400'}`;

  return (
    <div>
      <div className="space-y-4 mb-6">
        {/* Request title */}
        <Field label="Request title" required error={errorFor('requestTitle')}>
          <input type="text" value={draft.requestTitle} onChange={(e) => update('requestTitle', e.target.value)} placeholder="E.g. Customer due diligence — business banking KYC" className={inputClass('requestTitle')} />
        </Field>

        {/* Primary purpose */}
        <Field label="Primary business purpose" required error={errorFor('primaryPurpose')}>
          <select value={draft.primaryPurpose} onChange={(e) => update('primaryPurpose', e.target.value)} className={`${inputClass('primaryPurpose')} cursor-pointer`}>
            <option value="">— Select purpose —</option>
            {BUSINESS_PURPOSE_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </Field>

        {/* Detailed intended use */}
        <Field label="Detailed intended use" required error={errorFor('detailedIntendedUse')} hint="Explain your specific intended use in detail. Use 'support' and 'inform' language — do not claim to make final automated decisions.">
          <textarea value={draft.detailedIntendedUse} onChange={(e) => update('detailedIntendedUse', e.target.value)} rows={4} placeholder="Describe how you intend to use this data product, including the specific business processes, decisions it will inform, and the outputs you expect to generate." className={inputClass('detailedIntendedUse')} />
          <CharCount current={draft.detailedIntendedUse.length} min={50} />
        </Field>

        {/* Business problem */}
        <Field label="Business problem" required error={errorFor('businessProblem')}>
          <textarea value={draft.businessProblem} onChange={(e) => update('businessProblem', e.target.value)} rows={3} placeholder="What business problem does this data product help you solve?" className={inputClass('businessProblem')} />
        </Field>

        {/* Expected output */}
        <Field label="Expected operational output" required error={errorFor('expectedOutput')}>
          <textarea value={draft.expectedOutput} onChange={(e) => update('expectedOutput', e.target.value)} rows={2} placeholder="What operational outputs, reports or decisions will result from using this data?" className={inputClass('expectedOutput')} />
        </Field>

        {/* Why this package */}
        <Field label="Why this package is required" required error={errorFor('whyThisPackage')}>
          <textarea value={draft.whyThisPackage} onChange={(e) => update('whyThisPackage', e.target.value)} rows={2} placeholder="Why is this specific package necessary rather than alternatives?" className={inputClass('whyThisPackage')} />
        </Field>

        {/* Alternatives */}
        <Field label="Alternatives considered">
          <textarea value={draft.alternativesConsidered} onChange={(e) => update('alternativesConsidered', e.target.value)} rows={2} placeholder="What alternative data sources or approaches were considered?" className={inputClass('alternativesConsidered')} />
        </Field>

        {/* Legal review */}
        <Field label="Internal legal or compliance review">
          <div className="flex gap-2">
            {(['yes', 'no', 'not_sure'] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="legalReview" checked={draft.legalReviewStatus === opt} onChange={() => update('legalReviewStatus', opt)} className="text-primary-500 cursor-pointer" />
                <span className="text-sm text-foreground-700">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : 'Not sure'}</span>
              </label>
            ))}
          </div>
        </Field>

        {/* Department + date + duration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Field label="Department or project" required error={errorFor('department')}>
            <input type="text" value={draft.department} onChange={(e) => update('department', e.target.value)} placeholder="E.g. Compliance — KYC Programme" className={inputClass('department')} />
          </Field>
          <Field label="Planned start date">
            <input type="date" value={draft.plannedStartDate} onChange={(e) => update('plannedStartDate', e.target.value)} className={inputClass('plannedStartDate')} />
          </Field>
          <Field label="Expected duration">
            <input type="text" value={draft.expectedDuration} onChange={(e) => update('expectedDuration', e.target.value)} placeholder="E.g. Ongoing, 12 months" className={inputClass('expectedDuration')} />
          </Field>
        </div>

        {/* Purpose may change */}
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={draft.purposeMayChange} onChange={(e) => update('purposeMayChange', e.target.checked)} id="purposeMayChange" className="w-4 h-4 rounded text-primary-500 cursor-pointer" />
          <label htmlFor="purposeMayChange" className="text-sm text-foreground-700 cursor-pointer">The purpose may change over time</label>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-accent-50 border border-accent-200/60" role="alert">
          <p className="text-sm font-semibold text-accent-900 mb-1">Please fix the following:</p>
          <ul className="space-y-0.5">
            {errors.map((e) => (
              <li key={e.field} className="text-xs text-accent-800">{e.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-background-100">
        <button onClick={onPrev} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
          <i className="ri-arrow-left-line"></i> Previous
        </button>
        <button onClick={handleContinue} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
          Continue <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}

function Field({ label, required, error, hint, children }: { label: string; required?: boolean; error?: { field: string; message: string }; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground-700 mb-1">
        {label}{required && <span className="text-accent-600 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-foreground-400 mt-0.5">{hint}</p>}
      {error && <p className="text-xs text-accent-600 mt-0.5">{error.message}</p>}
    </div>
  );
}

function CharCount({ current, min }: { current: number; min: number }) {
  return (
    <p className={`text-[11px] mt-0.5 ${current >= min ? 'text-foreground-400' : 'text-accent-600'}`}>
      {current}/{min} characters minimum
    </p>
  );
}