import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/pages/auth/components/AuthLayout";
import PasswordRequirements from "@/pages/auth/components/PasswordRequirements";
import { useAuth } from "@/contexts/AuthContext";

export default function ResetPassword() {
  const { user, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setErrors({});
    setGeneralError('');
  }, [password, confirmPassword]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    const errs: Record<string, string> = {};

    if (!password) {
      errs.password = 'New password is required';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    const { error } = await resetPassword(password);

    setSubmitting(false);

    if (error) {
      setGeneralError(error);
      return;
    }

    setPassword('');
    setConfirmPassword('');
    setSubmitted(true);
  }, [password, confirmPassword, resetPassword]);

  const errorList = Object.entries(errors).filter(([, msg]) => msg);

  if (submitted) {
    return (
      <AuthLayout showBackLink={false}>
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/10">
            <i className="ri-shield-check-line text-xl text-accent-500" />
          </div>
          <h1 className="mb-2 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Password reset successful
          </h1>
          <p className="mb-2 text-xs text-foreground-400">
            Your password has been changed. You can now sign in with your new password.
          </p>
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="w-full whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            Sign In with new password
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout backTo="/forgot-password" backLabel="Back">
      <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8">
        <h1 className="mb-1 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Create a new password
        </h1>
        <p className="mb-6 text-xs leading-relaxed text-foreground-400">
          Choose a strong password for your DataHarbour account.
        </p>

        {(generalError || errorList.length > 0) && (
          <div className="mb-4 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
            {generalError && <p className="text-xs text-[#ff2e88]">{generalError}</p>}
            {errorList.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {errorList.map(([field, msg]) => (
                  <li key={field}>
                    <a href={`#reset-${field}`} className="text-xs text-[#ff2e88] underline">{msg}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="reset-password" className="mb-1 block text-xs font-medium text-foreground-300">
              New password <span className="text-[#ff2e88]">*</span>
            </label>
            <div className="relative">
              <input
                id="reset-password"
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
          </div>

          <div className="mb-5">
            <label htmlFor="reset-confirmPassword" className="mb-1 block text-xs font-medium text-foreground-300">
              Confirm new password <span className="text-[#ff2e88]">*</span>
            </label>
            <input
              id="reset-confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className={`w-full rounded-lg border ${errors.confirmPassword ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
              placeholder="Re-enter your new password"
            />
            <PasswordRequirements password={password} confirmPassword={confirmPassword} />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin" />
                Resetting...
              </span>
            ) : (
              'Reset password'
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}