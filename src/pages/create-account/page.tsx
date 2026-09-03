import { useState, useCallback, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import AuthLayout from "@/pages/auth/components/AuthLayout";
import PasswordRequirements from "@/pages/auth/components/PasswordRequirements";
import { useAuth } from "@/contexts/AuthContext";

type AccountType = 'buyer' | 'supplier';

export default function CreateAccount() {
  const { user, loading: authLoading, signUp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  // Step 2 fields
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 3 agreements
  const [marketplaceTerms, setMarketplaceTerms] = useState(false);
  const [privacyAck, setPrivacyAck] = useState(false);
  const [acceptableUse, setAcceptableUse] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  useEffect(() => {
    setErrors({});
    setGeneralError('');
  }, [step]);

  const validateStep1 = useCallback((): boolean => {
    if (!accountType) {
      setErrors({ accountType: 'Select an account type' });
      return false;
    }
    return true;
  }, [accountType]);

  const validateStep2 = useCallback((): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!workEmail.trim()) {
      errs.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      errs.workEmail = 'Enter a valid email address';
    }
    if (!jobTitle.trim()) errs.jobTitle = 'Job title is required';
    if (!organisationName.trim()) errs.organisationName = 'Organisation name is required';
    if (!country.trim()) errs.country = 'Country is required';
    if (!password) {
      errs.password = 'Password is required';
    } else {
      const pwValid = password.length >= 8;
      if (!pwValid) errs.password = 'Password must be at least 8 characters';
    }
    if (password && confirmPassword && password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [fullName, workEmail, jobTitle, organisationName, country, password, confirmPassword]);

  const validateStep3 = useCallback((): boolean => {
    const errs: Record<string, string> = {};
    if (!marketplaceTerms) errs.marketplaceTerms = 'You must accept the Marketplace Terms';
    if (!privacyAck) errs.privacyAck = 'You must acknowledge the Privacy Policy';
    if (!acceptableUse) errs.acceptableUse = 'You must accept the Acceptable Use Policy';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [marketplaceTerms, privacyAck, acceptableUse]);

  const handleContinue = useCallback(() => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  }, [step, validateStep1, validateStep2]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setSubmitting(true);
    setGeneralError('');

    const { error } = await signUp(workEmail, password, fullName, organisationName, jobTitle);

    setSubmitting(false);

    if (error) {
      setGeneralError(error);
      return;
    }

    setSignUpSuccess(true);
    // Clear passwords
    setPassword('');
    setConfirmPassword('');
  }, [validateStep3, signUp, workEmail, password, fullName, organisationName, jobTitle]);

  // If already authenticated, redirect
  if (!authLoading && user) {
    return <Navigate to="/" replace />;
  }

  const errorList = Object.entries(errors).filter(([, msg]) => msg);

  // Success state
  if (signUpSuccess) {
    return (
      <AuthLayout showBackLink={false}>
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/10">
            <i className="ri-mail-check-line text-xl text-accent-500" />
          </div>
          <h1 className="mb-2 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Check your email
          </h1>
          <p className="mb-6 text-xs text-foreground-400">
            We&apos;ve sent a verification link to <strong className="text-foreground-300">{workEmail}</strong>.
            Please check your inbox and click the link to verify your account.
          </p>
          <div className="rounded-lg border border-accent-500/20 bg-accent-500/5 p-3 mb-4">
            <p className="text-xs text-foreground-400">
              <i className="ri-information-line mr-1 align-middle text-accent-500" />
              If you don&apos;t see the email, check your spam folder or contact support.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="w-full whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            Go to Sign In
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout showBackLink={false}>
      <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8">
        <h1 className="mb-1 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Create your DataHarbour account
        </h1>
        <p className="mb-6 text-xs leading-relaxed text-foreground-400">
          Join the UK&apos;s governed data marketplace. Your account will be created with Supabase Auth.
        </p>

        {/* Step indicator */}
        <div className="mb-6 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                  s <= step ? 'bg-primary-500 text-background-950' : 'bg-background-200/50 text-foreground-500'
                }`}
              >
                {s < step ? <i className="ri-check-line" /> : s}
              </div>
              {s < 3 && <div className={`h-px w-4 ${s < step ? 'bg-primary-500' : 'bg-foreground-200/20'}`} />}
            </div>
          ))}
          <span className="ml-2 text-xs text-foreground-400">
            {step === 1 && 'Account type'}
            {step === 2 && 'Your details'}
            {step === 3 && 'Agreements'}
          </span>
        </div>

        {/* Error summary */}
        {(generalError || errorList.length > 0) && (
          <div className="mb-4 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
            {generalError && <p className="text-xs text-[#ff2e88]">{generalError}</p>}
            {errorList.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {errorList.map(([field, msg]) => (
                  <li key={field}>
                    <a href={`#create-${field}`} className="text-xs text-[#ff2e88] underline">{msg}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form onSubmit={step === 3 ? handleSubmit : undefined} noValidate>
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-foreground-300">Select your account type <span className="text-[#ff2e88]">*</span></p>
              {errors.accountType && <p className="text-xs text-[#ff2e88]">{errors.accountType}</p>}

              <button
                type="button"
                onClick={() => setAccountType('buyer')}
                className={`w-full rounded-lg border p-4 text-left transition cursor-pointer ${
                  accountType === 'buyer' ? 'border-accent-500/60 bg-accent-500/10' : 'border-foreground-200/20 bg-background-50 hover:border-foreground-200/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accountType === 'buyer' ? 'bg-accent-500/20' : 'bg-background-200/50'}`}>
                    <i className="ri-shopping-bag-3-line text-sm text-foreground-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground-200">Buyer organisation</p>
                    <p className="text-xs text-foreground-400">Discover, evaluate and license governed data products for your organisation</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('supplier')}
                className={`w-full rounded-lg border p-4 text-left transition cursor-pointer ${
                  accountType === 'supplier' ? 'border-accent-500/60 bg-accent-500/10' : 'border-foreground-200/20 bg-background-50 hover:border-foreground-200/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accountType === 'supplier' ? 'bg-accent-500/20' : 'bg-background-200/50'}`}>
                    <i className="ri-database-2-line text-sm text-foreground-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground-200">Supplier organisation</p>
                    <p className="text-xs text-foreground-400">Apply to supply governed data products through the DataHarbour marketplace</p>
                  </div>
                </div>
              </button>

              {accountType === 'supplier' && (
                <p className="rounded-lg border border-accent-500/20 bg-accent-500/5 p-3 text-xs text-foreground-400">
                  <i className="ri-information-line mr-1 align-middle text-accent-500" />
                  Creating a supplier account does not replace or accelerate the supplier review process.
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Field id="create-fullName" label="Full name" required error={errors.fullName}>
                <Input id="create-fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" placeholder="Jane Smith" error={!!errors.fullName} />
              </Field>
              <Field id="create-workEmail" label="Work email" required error={errors.workEmail}>
                <Input id="create-workEmail" type="email" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} autoComplete="email" placeholder="jane.smith@organisation.com" error={!!errors.workEmail} />
                <p className="mt-1 text-[11px] text-foreground-500">Use your work email. Personal email addresses may be rejected.</p>
              </Field>
              <Field id="create-jobTitle" label="Job title" required error={errors.jobTitle}>
                <Input id="create-jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} autoComplete="organization-title" placeholder="Data Analyst" error={!!errors.jobTitle} />
              </Field>
              <Field id="create-organisationName" label="Organisation name" required error={errors.organisationName}>
                <Input id="create-organisationName" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} autoComplete="organization" placeholder="Acme Analytics Ltd" error={!!errors.organisationName} />
              </Field>
              <Field id="create-country" label="Country" required error={errors.country}>
                <Input id="create-country" value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" error={!!errors.country} />
              </Field>

              <Field id="create-password" label="Password" required error={errors.password}>
                <div className="relative">
                  <input
                    id="create-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className={`w-full rounded-lg border ${errors.password ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 pr-10 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded text-foreground-400 hover:text-foreground-200 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={showPassword ? 'ri-eye-off-line text-sm' : 'ri-eye-line text-sm'} />
                  </button>
                </div>
                <PasswordRequirements password={password} />
              </Field>

              <Field id="create-confirmPassword" label="Confirm password" required error={errors.confirmPassword}>
                <input
                  id="create-confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className={`w-full rounded-lg border ${errors.confirmPassword ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
                  placeholder="Re-enter your password"
                />
                <PasswordRequirements password={password} confirmPassword={confirmPassword} />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs font-medium text-foreground-300">
                Required agreements <span className="text-[#ff2e88]">*</span>
              </p>

              <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${errors.marketplaceTerms ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'}`}>
                <input
                  id="create-marketplaceTerms"
                  type="checkbox"
                  checked={marketplaceTerms}
                  onChange={(e) => setMarketplaceTerms(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
                />
                <span className="text-xs text-foreground-300">
                  I accept the{" "}
                  <a href="/marketplace-terms" target="_blank" className="text-foreground-200 underline" rel="noopener noreferrer">Marketplace Terms</a>
                </span>
              </label>

              <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${errors.privacyAck ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'}`}>
                <input
                  id="create-privacyAck"
                  type="checkbox"
                  checked={privacyAck}
                  onChange={(e) => setPrivacyAck(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
                />
                <span className="text-xs text-foreground-300">
                  I acknowledge the{" "}
                  <a href="/privacy" target="_blank" className="text-foreground-200 underline" rel="noopener noreferrer">Privacy Policy</a>
                </span>
              </label>

              <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${errors.acceptableUse ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'}`}>
                <input
                  id="create-acceptableUse"
                  type="checkbox"
                  checked={acceptableUse}
                  onChange={(e) => setAcceptableUse(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
                />
                <span className="text-xs text-foreground-300">
                  I accept the{" "}
                  <a href="/acceptable-use" target="_blank" className="text-foreground-200 underline" rel="noopener noreferrer">Acceptable Use Policy</a>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-foreground-200/20 p-3">
                <input
                  id="create-marketingConsent"
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
                />
                <span className="text-xs text-foreground-400">
                  Optional: I would like to receive occasional updates about DataHarbour products, services and events.
                </span>
              </label>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 cursor-pointer"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleContinue}
                className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  'Create account'
                )}
              </button>
            )}
          </div>
        </form>

        <div className="mt-4 border-t border-foreground-200/10 pt-4 text-center">
          <p className="text-xs text-foreground-400">
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/sign-in')} className="text-foreground-200 underline cursor-pointer">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

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

function Input({ id, type = 'text', value, onChange, autoComplete, placeholder, error }: {
  id: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; autoComplete?: string; placeholder?: string; error?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className={`w-full rounded-lg border ${error ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
    />
  );
}