import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/pages/auth/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function ForgotPassword() {
  const { sendPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [email]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Work email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address');
      return;
    }

    setSending(true);
    const { error: resetError } = await sendPasswordReset(email);
    setSending(false);

    // Privacy-safe — show success regardless of whether account exists
    if (resetError) {
      console.error('Password reset error:', resetError);
    }
    setSubmitted(true);
  }, [email, sendPasswordReset]);

  return (
    <AuthLayout>
      <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8">
        <h1 className="mb-1 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Reset your password
        </h1>
        <p className="mb-6 text-xs leading-relaxed text-foreground-400">
          Enter your work email and we&apos;ll send you a link to reset your password.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="mb-4 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
                <a href="#forgot-email" className="text-xs text-[#ff2e88] underline">{error}</a>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="forgot-email" className="mb-1 block text-xs font-medium text-foreground-300">
                Work email <span className="text-[#ff2e88]">*</span>
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={`w-full rounded-lg border ${error ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
                placeholder="you@organisation.com"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 disabled:opacity-50 cursor-pointer"
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin" />
                  Sending...
                </span>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/10">
              <i className="ri-check-line text-xl text-accent-500" />
            </div>
            <p className="mb-2 text-sm text-foreground-200">Check your email</p>
            <p className="mb-6 text-xs text-foreground-400">
              If an account exists for <strong className="text-foreground-300">{email}</strong>, we&apos;ve sent a password reset link to that address.
            </p>
            <div className="mb-6 rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
              <p className="text-xs text-foreground-400">
                <i className="ri-information-line mr-1 align-middle text-accent-500" />
                The link expires after 1 hour. If you don&apos;t receive it, check your spam folder.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mb-3 w-full text-xs text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
            >
              Try a different email
            </button>
            <button
              type="button"
              onClick={() => navigate('/sign-in')}
              className="w-full whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Return to Sign In
            </button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}