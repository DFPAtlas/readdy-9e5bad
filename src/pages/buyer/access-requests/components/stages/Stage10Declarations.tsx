import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validateDeclarationsStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

interface Stage10DeclarationsProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DECLARATIONS: [string, string, string][] = [
  ['declarationAccurate', 'Information is accurate to the representative\'s knowledge', 'I confirm that the information provided in this request is accurate to the best of my knowledge.'],
  ['declarationAuthorised', 'The representative is authorised', 'I am authorised by my organisation to submit this access request.'],
  ['declarationGenuinePurpose', 'The purpose is genuine', 'The declared business purpose represents a genuine and lawful use of the requested data.'],
  ['declarationRestrictionsReviewed', 'Package restrictions were reviewed', 'I have reviewed and understood the package description, permitted-use summary and restrictions.'],
  ['declarationApprovedPurposeOnly', 'Data will be used only for an approved purpose', 'Data will be used only for the declared and approved purpose.'],
  ['declarationAuthorisedUsers', 'Access will be limited to authorised users', 'Access credentials will not be shared and access will be limited to named authorised users.'],
  ['declarationSecurityControls', 'Security and deletion controls will be maintained', 'Security controls and data-deletion procedures described in this request will be maintained.'],
  ['declarationReportChanges', 'Material changes will be reported', 'Any material change to the declared purpose, users, systems, retention or sharing arrangements will be reported.'],
  ['declarationNoHarassmentOrDiscrimination', 'No harassment, discrimination, unlawful surveillance or unauthorised people searching is intended', 'I confirm that this request does not involve harassment, unlawful discrimination, unlawful surveillance, doxxing or unauthorised people searching.'],
  ['declarationNoReidentification', 'No re-identification is intended', 'I confirm that this request does not involve any intent to re-identify individuals from aggregated or anonymised data.'],
  ['declarationNoGuaranteeOfApproval', 'Submission does not guarantee approval', 'I understand that submitting this request does not guarantee access and that additional information may be required.'],
  ['declarationMoreInfoMayBeRequested', 'More information may be requested', 'I understand that DataHarbour or the supplier may request additional information before granting access.'],
  ['declarationBrowserOnly', 'Data remains only in this browser', 'I understand this is a demonstration and the request data exists only in this browser — it has not been transmitted to DataHarbour or the supplier.'],
];

export default function Stage10Declarations({ draft, onUpdate, onNext, onPrev }: Stage10DeclarationsProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);

  function handleContinue() {
    const result = validateDeclarationsStage(draft);
    setErrors(result.errors);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function update(f: string, v: boolean) { onUpdate({ ...draft, [f]: v }); }

  function errorFor(f: string) { return errors.find((e) => e.field === f); }

  return (
    <div>
      <p className="text-sm text-foreground-600 mb-4">
        Please confirm each of the following declarations. You must accept all required declarations before proceeding to review.
      </p>

      <div className="space-y-2 mb-6">
        {DECLARATIONS.map(([field, label, description]) => (
          <label
            key={field}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer ${
              errorFor(field) ? 'border-accent-300 bg-accent-50/30' : 'border-background-200/70 hover:bg-background-50'
            }`}
          >
            <input
              type="checkbox"
              checked={draft[field as keyof AccessRequestDraft] as boolean}
              onChange={(e) => update(field, e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-primary-500 cursor-pointer"
            />
            <div>
              <p className="text-sm font-medium text-foreground-800">{label}</p>
              <p className="text-xs text-foreground-500 mt-0.5">{description}</p>
              {errorFor(field) && <p className="text-xs text-accent-600 mt-0.5">{errorFor(field)!.message}</p>}
            </div>
          </label>
        ))}
      </div>

      {/* Policy acceptance */}
      <div className="mb-6 p-4 rounded-lg border border-background-200/70 bg-background-50">
        <h3 className="text-sm font-semibold text-foreground-900 mb-3">Policy acceptance</h3>
        <p className="text-xs text-foreground-500 mb-3">
          These are recorded locally for this demonstration request. They are not binding e-signatures.
        </p>
        <div className="space-y-2">
          <label className="flex items-start gap-2 p-2 rounded-lg border border-background-200/70 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.buyerTermsAccepted}
              onChange={(e) => update('buyerTermsAccepted', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-primary-500 cursor-pointer"
            />
            <div>
              <span className="text-sm text-foreground-700">I accept the </span>
              <Link to="/buyer-terms" className="text-sm text-primary-600 underline">Buyer Terms</Link>
              <span className="text-sm text-foreground-700"> (draft version)</span>
              {errorFor('buyerTermsAccepted') && <p className="text-xs text-accent-600 mt-0.5">{errorFor('buyerTermsAccepted')!.message}</p>}
            </div>
          </label>
          <label className="flex items-start gap-2 p-2 rounded-lg border border-background-200/70 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.acceptableUseAccepted}
              onChange={(e) => update('acceptableUseAccepted', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-primary-500 cursor-pointer"
            />
            <div>
              <span className="text-sm text-foreground-700">I accept the </span>
              <Link to="/acceptable-use" className="text-sm text-primary-600 underline">Acceptable Use Policy</Link>
              {errorFor('acceptableUseAccepted') && <p className="text-xs text-accent-600 mt-0.5">{errorFor('acceptableUseAccepted')!.message}</p>}
            </div>
          </label>
          <label className="flex items-start gap-2 p-2 rounded-lg border border-background-200/70 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.privacyAccepted}
              onChange={(e) => update('privacyAccepted', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-primary-500 cursor-pointer"
            />
            <div>
              <span className="text-sm text-foreground-700">I acknowledge the </span>
              <Link to="/privacy" className="text-sm text-primary-600 underline">Privacy Policy</Link>
              {errorFor('privacyAccepted') && <p className="text-xs text-accent-600 mt-0.5">{errorFor('privacyAccepted')!.message}</p>}
            </div>
          </label>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-accent-50 border border-accent-200/60" role="alert">
          <p className="text-sm font-semibold text-accent-900 mb-1">Please complete all required declarations:</p>
          <ul className="space-y-0.5">{errors.map((e) => (<li key={e.field} className="text-xs text-accent-800">{e.message}</li>))}</ul>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-background-100">
        <button onClick={onPrev} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap"><i className="ri-arrow-left-line"></i> Previous</button>
        <button onClick={handleContinue} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
          Continue to review <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}