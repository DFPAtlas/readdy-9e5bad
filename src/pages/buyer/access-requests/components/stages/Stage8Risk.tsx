import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validateRiskStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

interface Stage8RiskProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Stage8Risk({ draft, onUpdate, onNext, onPrev }: Stage8RiskProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [warnings, setWarnings] = useState<{ field: string; message: string }[]>([]);

  function handleContinue() {
    const result = validateRiskStage(draft);
    setErrors(result.errors);
    setWarnings(result.warnings);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function errorFor(f: string) { return errors.find((e) => e.field === f); }
  function update(f: string, v: string | boolean) { onUpdate({ ...draft, [f]: v }); }
  const ic = (f: string) => `w-full px-3 py-2 text-sm rounded-lg border outline-none bg-background-50 text-foreground-950 ${errorFor(f) ? 'border-accent-400' : 'border-background-200/70 focus:border-primary-400'}`;

  const riskFlags: [string, keyof AccessRequestDraft, boolean][] = [
    ['Personal data', 'involvesPersonalData', draft.involvesPersonalData],
    ['Sensitive or inferred attributes', 'involvesSensitiveAttributes', draft.involvesSensitiveAttributes],
    ['Children or vulnerable people', 'involvesChildrenOrVulnerable', draft.involvesChildrenOrVulnerable],
    ['Location or movement data', 'involvesLocationMovementData', draft.involvesLocationMovementData],
    ['Large-scale profiling', 'involvesLargeScaleProfiling', draft.involvesLargeScaleProfiling],
    ['Dataset matching with other sources', 'involvesDatasetMatching', draft.involvesDatasetMatching],
    ['Re-identification risk', 'involvesReidentificationRisk', draft.involvesReidentificationRisk],
    ['Solely automated decisions', 'involvesAutomatedDecisions', draft.involvesAutomatedDecisions],
    ['Employment, housing, credit or insurance', 'involvesEmploymentHousingCreditInsurance', draft.involvesEmploymentHousingCreditInsurance],
    ['Fraud, identity or risk scoring', 'involvesFraudRiskScoring', draft.involvesFraudRiskScoring],
    ['Marketing or audience activation', 'involvesMarketingActivation', draft.involvesMarketingActivation],
    ['Monitoring or surveillance', 'involvesMonitoringSurveillance', draft.involvesMonitoringSurveillance],
    ['International access', 'involvesInternationalAccess', draft.involvesInternationalAccess],
    ['Significant effects on individuals', 'involvesSignificantEffects', draft.involvesSignificantEffects],
  ];

  return (
    <div>
      {/* Risk flags */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground-900 mb-3">Does the use involve any of the following?</h3>
        <p className="text-xs text-foreground-500 mb-3">Each Yes answer requires you to describe safeguards below.</p>

        {draft.involvesReidentificationRisk && (
          <div className="mb-3 p-3 rounded-lg border border-accent-300 bg-accent-50" role="alert">
            <p className="text-sm font-bold text-accent-800 flex items-center gap-1"><i className="ri-error-warning-line"></i> Prohibited purpose</p>
            <p className="text-xs text-accent-700 mt-0.5">Intent to re-identify individuals is prohibited under the Acceptable Use Policy. You cannot proceed with this purpose.</p>
            <Link to="/compliance/prohibited-uses" className="text-xs text-accent-600 underline mt-1 inline-block">View prohibited uses</Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {riskFlags.map(([label, key, value]) => (
            <label key={key} className="flex items-start gap-2 p-2 rounded-lg border border-background-200/70 hover:bg-background-50 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => update(key, e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-primary-500 cursor-pointer"
              />
              <span className="text-sm text-foreground-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Safeguards */}
      <div className="space-y-4 mb-6">
        <F label="Safeguards" error={errorFor('safeguards')} hint="Required when any risk factor above is selected. Describe what measures are in place to manage the identified risks.">
          <textarea value={draft.safeguards} onChange={(e) => update('safeguards', e.target.value)} rows={3} placeholder="Describe the safeguards, controls and governance measures..." className={ic('safeguards')} />
        </F>

        <F label="Internal compliance owner" required error={errorFor('complianceOwner')}>
          <input type="text" value={draft.complianceOwner} onChange={(e) => update('complianceOwner', e.target.value)} placeholder="Name and role of compliance owner" className={ic('complianceOwner')} />
        </F>
        <F label="DPIA or assessment status"><input type="text" value={draft.dpiaStatus} onChange={(e) => update('dpiaStatus', e.target.value)} placeholder="E.g. Completed, in progress, not required" className={ic('dpiaStatus')} /></F>
        <F label="Human-review process"><textarea value={draft.humanReviewProcess} onChange={(e) => update('humanReviewProcess', e.target.value)} rows={2} placeholder="Describe any human review of automated outputs" className={ic('humanReviewProcess')} /></F>
        <F label="Fairness or bias controls"><input type="text" value={draft.fairnessControls} onChange={(e) => update('fairnessControls', e.target.value)} placeholder="How are fairness or bias addressed?" className={ic('fairnessControls')} /></F>
        <F label="Complaint route"><input type="text" value={draft.complaintRoute} onChange={(e) => update('complaintRoute', e.target.value)} placeholder="How can individuals raise concerns?" className={ic('complaintRoute')} /></F>
        <F label="Accuracy-challenge process"><input type="text" value={draft.accuracyChallengeProcess} onChange={(e) => update('accuracyChallengeProcess', e.target.value)} placeholder="How can data accuracy be challenged?" className={ic('accuracyChallengeProcess')} /></F>
        <F label="Purpose-change review"><input type="text" value={draft.purposeChangeReview} onChange={(e) => update('purposeChangeReview', e.target.value)} placeholder="Process for reviewing changes to the declared purpose" className={ic('purposeChangeReview')} /></F>
        <F label="Audit-record approach"><input type="text" value={draft.auditRecordApproach} onChange={(e) => update('auditRecordApproach', e.target.value)} placeholder="How will audit records be maintained?" className={ic('auditRecordApproach')} /></F>

        {draft.involvesMonitoringSurveillance && draft.involvesPersonalData && (
          <div className="p-3 rounded-lg border border-secondary-200/60 bg-secondary-50">
            <p className="text-sm font-semibold text-secondary-800 flex items-center gap-1"><i className="ri-error-warning-line"></i> Important</p>
            <p className="text-xs text-secondary-700 mt-0.5">Monitoring or surveillance involving personal data requires additional safeguards and may be subject to enhanced compliance review. Ensure you have a valid lawful basis.</p>
            <Link to="/compliance" className="text-xs text-secondary-600 underline mt-1 inline-block">Review compliance requirements</Link>
          </div>
        )}
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