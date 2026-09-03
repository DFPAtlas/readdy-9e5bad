import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/pages/onboarding/components/OnboardingLayout";
import { getCurrentDemoUser, getIntendedUseDraft, saveIntendedUseDraft, saveOnboardingStage } from "@/utils/authStorage";
import { DATA_CATEGORIES, DELIVERY_FORMATS, USE_CASES, BUYER_VOLUME_OPTIONS } from "@/data/authTypes";
import type { IntendedUseDraft, PublicAccountType } from "@/data/authTypes";

export default function IntendedUseStage() {
  const navigate = useNavigate();
  const user = getCurrentDemoUser();
  const accountType: PublicAccountType = user?.accountType || 'buyer';

  const [draft, setDraft] = useState<IntendedUseDraft>(getIntendedUseDraft());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, []);

  useEffect(() => {
    setErrors({});
  }, [draft]);

  const update = useCallback(<K extends keyof IntendedUseDraft>(field: K, value: IntendedUseDraft[K]) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleArray = useCallback((field: keyof IntendedUseDraft, value: string) => {
    setDraft((prev) => {
      const arr = (prev[field] as string[]) || [];
      const exists = arr.includes(value);
      return { ...prev, [field]: exists ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  }, []);

  const handleSaveAndContinue = useCallback(() => {
    const errs: Record<string, string> = {};

    if (accountType === 'buyer') {
      if (!draft.primaryPurpose.trim()) errs.primaryPurpose = 'Primary business purpose is required';
      if (draft.dataCategories.length === 0) errs.dataCategories = 'Select at least one data category';
      if (!draft.geographicScope.trim()) errs.geographicScope = 'Geographic scope is required';
    } else {
      if (!draft.proposedProductCategories.trim()) errs.proposedProductCategories = 'Proposed product categories are required';
      if (!draft.provenanceReadiness.trim()) errs.provenanceReadiness = 'Provenance readiness is required';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    saveIntendedUseDraft(draft);
    saveOnboardingStage('team');
    navigate('/onboarding/team');
  }, [draft, accountType, navigate]);

  const handleBack = useCallback(() => {
    saveIntendedUseDraft(draft);
    navigate('/onboarding/organisation');
  }, [draft, navigate]);

  const errorList = Object.entries(errors).filter(([, msg]) => msg);

  if (!user) return null;

  return (
    <OnboardingLayout
      currentStage="intended_use"
      title={accountType === 'buyer' ? 'Intended use of data products' : 'Products and delivery'}
      description={accountType === 'buyer'
        ? 'Help us understand how your organisation plans to use governed data products.'
        : 'Describe the data products you plan to supply through DataHarbour.'}
      onBack={handleBack}
      onContinue={handleSaveAndContinue}
    >
      {errorList.length > 0 && (
        <div className="mb-6 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
          <p className="mb-1 text-xs font-medium text-[#ff2e88]">Please fix the following:</p>
          <ul className="space-y-0.5">
            {errorList.map(([field, msg]) => (
              <li key={field}>
                <a href={`#use-${field}`} className="text-xs text-[#ff2e88] underline">{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-5">
        {accountType === 'buyer' ? (
          <>
            {/* Buyer fields */}
            <Field id="use-primaryPurpose" label="Primary business purpose" required error={errors.primaryPurpose}>
              <textarea
                id="use-primaryPurpose"
                value={draft.primaryPurpose}
                onChange={(e) => update('primaryPurpose', e.target.value)}
                placeholder="Describe how your organisation intends to use governed data products"
                rows={3}
                maxLength={500}
                className={`w-full rounded-lg border ${errors.primaryPurpose ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none resize-none`}
              />
              <p className="mt-1 text-[11px] text-foreground-500">{draft.primaryPurpose.length}/500</p>
            </Field>

            <Field id="use-dataCategories" label="Data categories of interest" required error={errors.dataCategories}>
              <div className="flex flex-wrap gap-2">
                {DATA_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => toggleArray('dataCategories', cat.value)}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition cursor-pointer ${
                      draft.dataCategories.includes(cat.value)
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'bg-background-100 text-foreground-400 border border-foreground-200/20 hover:border-foreground-200/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field id="use-useCases" label="Expected use cases">
              <div className="flex flex-wrap gap-2">
                {USE_CASES.map((uc) => (
                  <button
                    key={uc.value}
                    type="button"
                    onClick={() => toggleArray('useCases', uc.value)}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition cursor-pointer ${
                      draft.useCases.includes(uc.value)
                        ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                        : 'bg-background-100 text-foreground-400 border border-foreground-200/20 hover:border-foreground-200/40'
                    }`}
                  >
                    {uc.label}
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="use-geographicScope" label="Geographic scope" required error={errors.geographicScope}>
                <Input id="use-geographicScope" value={draft.geographicScope} onChange={(v) => update('geographicScope', v)} placeholder="e.g. United Kingdom, EEA" error={!!errors.geographicScope} />
              </Field>
              <Field id="use-estimatedVolume" label="Estimated volume">
                <select
                  id="use-estimatedVolume"
                  value={draft.estimatedVolume}
                  onChange={(e) => update('estimatedVolume', e.target.value)}
                  className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3 py-2.5 text-sm text-foreground-100 focus:border-foreground-200/50 focus:outline-none cursor-pointer"
                >
                  <option value="">Select volume</option>
                  {BUYER_VOLUME_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id="use-deliveryFormats" label="Preferred delivery formats">
              <div className="flex flex-wrap gap-2">
                {DELIVERY_FORMATS.map((df) => (
                  <button
                    key={df.value}
                    type="button"
                    onClick={() => toggleArray('deliveryFormats', df.value)}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition cursor-pointer ${
                      draft.deliveryFormats.includes(df.value)
                        ? 'bg-secondary-500/20 text-secondary-400 border border-secondary-500/30'
                        : 'bg-background-100 text-foreground-400 border border-foreground-200/20 hover:border-foreground-200/40'
                    }`}
                  >
                    {df.label}
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="use-personalDataInvolved" label="May personal data be involved?">
                <div className="flex gap-3">
                  {[
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                  ].map((opt) => (
                    <label key={String(opt.value)} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="personalData"
                        checked={draft.personalDataInvolved === opt.value}
                        onChange={() => update('personalDataInvolved', opt.value)}
                        className="h-3.5 w-3.5 border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
                      />
                      <span className="text-xs text-foreground-400">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field id="use-significantDecisions" label="Will decisions significantly affect people?">
                <div className="flex gap-3">
                  {[
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                  ].map((opt) => (
                    <label key={String(opt.value)} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="significantDecisions"
                        checked={draft.significantDecisions === opt.value}
                        onChange={() => update('significantDecisions', opt.value)}
                        className="h-3.5 w-3.5 border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
                      />
                      <span className="text-xs text-foreground-400">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </Field>
            </div>

            {(draft.personalDataInvolved || draft.significantDecisions) && (
              <div className="rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
                <p className="text-xs text-foreground-400">
                  <i className="ri-information-line mr-1 align-middle text-accent-500" />
                  Answers that indicate personal data or significant decision-making may require additional review. See{" "}
                  <a href="/compliance" className="underline">Compliance Centre</a> for guidance.
                </p>
              </div>
            )}

            <Field id="use-retentionApproach" label="Data retention approach">
              <Input id="use-retentionApproach" value={draft.retentionApproach} onChange={(v) => update('retentionApproach', v)} placeholder="How long data will be retained and why" />
            </Field>

            <Field id="use-complianceContact" label="Compliance contact">
              <Input id="use-complianceContact" value={draft.complianceContact} onChange={(v) => update('complianceContact', v)} placeholder="Name or email for compliance queries" />
            </Field>
          </>
        ) : (
          <>
            {/* Supplier fields */}
            <Field id="use-proposedProductCategories" label="Proposed product categories and formats" required error={errors.proposedProductCategories}>
              <textarea
                id="use-proposedProductCategories"
                value={draft.proposedProductCategories}
                onChange={(e) => update('proposedProductCategories', e.target.value)}
                placeholder="Describe the data products you plan to supply"
                rows={3}
                maxLength={500}
                className={`w-full rounded-lg border ${errors.proposedProductCategories ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none resize-none`}
              />
              <p className="mt-1 text-[11px] text-foreground-500">{draft.proposedProductCategories.length}/500</p>
            </Field>

            <Field id="use-provenanceReadiness" label="Provenance readiness" required error={errors.provenanceReadiness}>
              <textarea
                id="use-provenanceReadiness"
                value={draft.provenanceReadiness}
                onChange={(e) => update('provenanceReadiness', e.target.value)}
                placeholder="Describe how you can evidence source, rights and authority for your data"
                rows={2}
                maxLength={500}
                className={`w-full rounded-lg border ${errors.provenanceReadiness ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none resize-none`}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="use-rightsEvidenceReadiness" label="Rights evidence readiness">
                <Input id="use-rightsEvidenceReadiness" value={draft.rightsEvidenceReadiness} onChange={(v) => update('rightsEvidenceReadiness', v)} placeholder="How you evidence data rights" />
              </Field>
              <Field id="use-supplierSecurityContact" label="Security contact">
                <Input id="use-supplierSecurityContact" value={draft.supplierSecurityContact} onChange={(v) => update('supplierSecurityContact', v)} placeholder="Name or email" />
              </Field>
            </div>

            <Field id="use-intendedBuyerTypes" label="Intended buyer types">
              <Input id="use-intendedBuyerTypes" value={draft.intendedBuyerTypes} onChange={(v) => update('intendedBuyerTypes', v)} placeholder="What types of organisation would use your products?" />
            </Field>

            <Field id="use-supplierAppRef" label="Existing supplier application reference">
              <Input id="use-supplierAppRef" value={draft.supplierAppRef} onChange={(v) => update('supplierAppRef', v)} placeholder="DH-APP-XXXXXX if you have one" />
            </Field>

            <div className="rounded-lg border border-foreground-200/10 bg-background-100/50 p-3">
              <p className="text-xs text-foreground-400">
                <i className="ri-link mr-1 align-middle" />
                Supplier onboarding information supplements — but does not replace — the full supplier application at{" "}
                <a href="/suppliers/apply" className="underline">/suppliers/apply</a>.
              </p>
            </div>
          </>
        )}

        <div className="rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
          <p className="text-xs text-foreground-400">
            <i className="ri-information-line mr-1 align-middle text-accent-500" />
            This information is saved locally. Your answers do not pre-approve access, score your application or predict acceptance.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}

// ── Form helpers ──
function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-foreground-300">
        {label} {required && <span className="text-[#ff2e88]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-[#ff2e88]">{error}</p>}
    </div>
  );
}

function Input({ id, value, onChange, placeholder, error }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string; error?: boolean }) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-lg border ${error ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
    />
  );
}