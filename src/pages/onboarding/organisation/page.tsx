import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/pages/onboarding/components/OnboardingLayout";
import { getCurrentDemoUser, getOrganisationDraft, saveOrganisationDraft, saveOnboardingStage } from "@/utils/authStorage";
import { ORGANISATION_TYPES, ORGANISATION_SIZES, INDUSTRIES } from "@/data/authTypes";
import type { OrganisationOnboardingDraft } from "@/data/authTypes";

export default function OrganisationStage() {
  const navigate = useNavigate();
  const user = getCurrentDemoUser();

  const [draft, setDraft] = useState<OrganisationOnboardingDraft>(getOrganisationDraft());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    // Pre-fill from account metadata
    if (!draft.legalName && user.organisationName) {
      setDraft((prev) => ({ ...prev, legalName: user.organisationName }));
    }
  }, []);

  useEffect(() => {
    setErrors({});
  }, [draft]);

  const update = useCallback(<K extends keyof OrganisationOnboardingDraft>(field: K, value: OrganisationOnboardingDraft[K]) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveAndContinue = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!draft.legalName.trim()) errs.legalName = 'Legal organisation name is required';
    if (!draft.organisationType) errs.organisationType = 'Organisation type is required';
    if (!draft.countryOfRegistration.trim()) errs.countryOfRegistration = 'Country of registration is required';
    if (!draft.businessActivity.trim()) errs.businessActivity = 'Main business activity is required';
    if (!draft.organisationSize) errs.organisationSize = 'Organisation size is required';
    if (draft.website && !/^https?:\/\/.+\..+/.test(draft.website.trim())) {
      errs.website = 'Enter a valid website URL (e.g. https://example.com)';
    }
    if (draft.businessEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.businessEmail.trim())) {
      errs.businessEmail = 'Enter a valid email address';
    }
    if (!draft.authorisedRepConfirmed) {
      errs.authorisedRepConfirmed = 'You must confirm you are an authorised representative';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    saveOrganisationDraft(draft);
    saveOnboardingStage('intended_use');
    navigate('/onboarding/intended-use');
  }, [draft, navigate]);

  const handleBack = useCallback(() => {
    saveOrganisationDraft(draft);
    navigate('/account-demo');
  }, [draft, navigate]);

  const errorList = Object.entries(errors).filter(([, msg]) => msg);

  if (!user) return null;

  return (
    <OnboardingLayout
      currentStage="organisation"
      title="Organisation details"
      description="Tell us about your organisation. This information will be reviewed as part of future access processes."
      onBack={handleBack}
      onContinue={handleSaveAndContinue}
    >
      {/* Error summary */}
      {errorList.length > 0 && (
        <div className="mb-6 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
          <p className="mb-1 text-xs font-medium text-[#ff2e88]">Please fix the following:</p>
          <ul className="space-y-0.5">
            {errorList.map(([field, msg]) => (
              <li key={field}>
                <a href={`#org-${field}`} className="text-xs text-[#ff2e88] underline">{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="org-legalName" label="Legal organisation name" required error={errors.legalName}>
            <Input id="org-legalName" value={draft.legalName} onChange={(v) => update('legalName', v)} placeholder="Acme Analytics Ltd" error={!!errors.legalName} />
          </Field>
          <Field id="org-tradingName" label="Trading name (if different)">
            <Input id="org-tradingName" value={draft.tradingName} onChange={(v) => update('tradingName', v)} placeholder="Acme Analytics" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="org-organisationType" label="Organisation type" required error={errors.organisationType}>
            <Select id="org-organisationType" value={draft.organisationType} onChange={(v) => update('organisationType', v)} options={ORGANISATION_TYPES as unknown as { value: string; label: string }[]} placeholder="Select type" error={!!errors.organisationType} />
          </Field>
          <Field id="org-organisationSize" label="Organisation size" required error={errors.organisationSize}>
            <Select id="org-organisationSize" value={draft.organisationSize} onChange={(v) => update('organisationSize', v)} options={ORGANISATION_SIZES as unknown as { value: string; label: string }[]} placeholder="Select size" error={!!errors.organisationSize} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="org-countryOfRegistration" label="Country of registration" required error={errors.countryOfRegistration}>
            <Input id="org-countryOfRegistration" value={draft.countryOfRegistration} onChange={(v) => update('countryOfRegistration', v)} placeholder="United Kingdom" error={!!errors.countryOfRegistration} />
          </Field>
          <Field id="org-companyNumber" label="Company or registration number">
            <Input id="org-companyNumber" value={draft.companyNumber} onChange={(v) => update('companyNumber', v)} placeholder="e.g. 12345678" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="org-website" label="Public website" error={errors.website}>
            <Input id="org-website" value={draft.website} onChange={(v) => update('website', v)} placeholder="https://www.example.com" error={!!errors.website} />
          </Field>
          <Field id="org-industry" label="Industry">
            <Select id="org-industry" value={draft.industry} onChange={(v) => update('industry', v)} options={INDUSTRIES as unknown as { value: string; label: string }[]} placeholder="Select industry" />
          </Field>
        </div>

        <Field id="org-businessActivity" label="Main business activity" required error={errors.businessActivity}>
          <textarea
            id="org-businessActivity"
            value={draft.businessActivity}
            onChange={(e) => update('businessActivity', e.target.value)}
            placeholder="Briefly describe what your organisation does"
            rows={2}
            className={`w-full rounded-lg border ${errors.businessActivity ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none resize-none`}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="org-registeredCity" label="Registered city or region">
            <Input id="org-registeredCity" value={draft.registeredCity} onChange={(v) => update('registeredCity', v)} placeholder="London" />
          </Field>
          <Field id="org-businessEmail" label="General business email" error={errors.businessEmail}>
            <Input id="org-businessEmail" type="email" value={draft.businessEmail} onChange={(v) => update('businessEmail', v)} placeholder="contact@organisation.com" error={!!errors.businessEmail} />
          </Field>
        </div>

        {/* Authorised representative */}
        <div className="rounded-lg border border-foreground-200/10 bg-background-100/50 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              id="org-authorisedRepConfirmed"
              type="checkbox"
              checked={draft.authorisedRepConfirmed}
              onChange={(e) => update('authorisedRepConfirmed', e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
            />
            <span className="text-xs text-foreground-400">
              I confirm I am an authorised representative of this organisation and have the authority to create this account and agree to applicable terms.
            </span>
          </label>
          {errors.authorisedRepConfirmed && <p className="mt-2 text-xs text-[#ff2e88]">{errors.authorisedRepConfirmed}</p>}
        </div>

        {/* Demo notice */}
        <div className="rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
          <p className="text-xs text-foreground-400">
            <i className="ri-information-line mr-1 align-middle text-accent-500" />
            Organisation details captured locally — verification is not connected. No real company check is performed.
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

function Input({ id, type = 'text', value, onChange, placeholder, error }: {
  id: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; error?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-lg border ${error ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
    />
  );
}

function Select({ id, value, onChange, options, placeholder, error }: {
  id: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string; error?: boolean;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-lg border ${error ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 focus:border-foreground-200/50 focus:outline-none cursor-pointer`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}