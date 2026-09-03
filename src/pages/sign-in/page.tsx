import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import AuthLayout from "@/pages/auth/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function SignIn() {
  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>();
  const [generalError, setGeneralError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'ok' | 'error'>('checking');

  // Test Supabase connection on mount
  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.from('data_packages').select('id', { count: 'exact', head: true });
        if (error) {
          console.error('Supabase connection check failed:', error.message);
          setConnectionStatus('error');
        } else {
          setConnectionStatus('ok');
        }
      } catch (err) {
        console.error('Supabase connection check error:', err);
        setConnectionStatus('error');
      }
    }
    checkConnection();
  }, []);

  useEffect(() => {
    setErrors({});
    setGeneralError('');
  }, [email, password]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    setCapsLock(e.getModifierState('CapsLock'));
  }, []);

  const validate = useCallback((): boolean => {
    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate()) return;

    if (capsLock) {
      setGeneralError('Caps Lock is on. This may cause sign-in issues.');
      return;
    }

    setSubmitting(true);

    const { error } = await signIn(email, password);

    setSubmitting(false);

    if (error) {
      setGeneralError(error);
      return;
    }

    // Clear password from memory
    setPassword('');

    // Navigate to return path or default
    if (returnTo) {
      navigate(decodeURIComponent(returnTo));
    } else {
      navigate('/');
    }
  }, [validate, capsLock, signIn, email, password, navigate, returnTo]);

  // If already authenticated, redirect
  if (!authLoading && user) {
    if (returnTo) {
      return <Navigate to={decodeURIComponent(returnTo)} replace />;
    }
    return <Navigate to="/" replace />;
  }

  const errorList = Object.entries(errors).filter(([, msg]) => msg);

  return (
    <AuthLayout showBackLink={false}>
      <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8">
        <h1 className="mb-1 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Sign in to your organisation workspace
        </h1>
        <p className="mb-6 text-xs leading-relaxed text-foreground-400">
          Access your DataHarbour account to discover, evaluate and license governed data products.
        </p>

        {/* Connection status */}
        {connectionStatus === 'error' && (
          <div className="mb-4 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
            <p className="text-xs text-[#ff2e88]">
              <i className="ri-wifi-off-line mr-1" />
              Cannot connect to the authentication service. Please check your internet connection and try again.
            </p>
          </div>
        )}

        {/* Error summary */}
        {(generalError || errorList.length > 0) && (
          <div className="mb-4 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
            {generalError && <p className="text-xs text-[#ff2e88]">{generalError}</p>}
            {errorList.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {errorList.map(([field, msg]) => (
                  <li key={field}>
                    <a href={`#signin-${field}`} className="text-xs text-[#ff2e88] underline">
                      {msg}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="signin-email" className="mb-1 block text-xs font-medium text-foreground-300">
              Work email <span className="text-[#ff2e88]">*</span>
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="email"
              className={`w-full rounded-lg border ${errors.email ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
              placeholder="you@organisation.com"
            />
            {errors.email && <p className="mt-1 text-xs text-[#ff2e88]">{errors.email}</p>}
          </div>

          <div className="mb-1">
            <label htmlFor="signin-password" className="mb-1 block text-xs font-medium text-foreground-300">
              Password <span className="text-[#ff2e88]">*</span>
            </label>
            <div className="relative">
              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
                className={`w-full rounded-lg border ${errors.password ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 pr-10 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
                placeholder="Enter your password"
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
            {errors.password && <p className="mt-1 text-xs text-[#ff2e88]">{errors.password}</p>}
          </div>

          {capsLock && (
            <p className="mb-3 text-xs text-accent-500">
              <i className="ri-alert-line mr-1 align-middle" />
              Caps Lock is on
            </p>
          )}

          <div className="mb-5 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
              />
              <span className="text-xs text-foreground-400">Remember this browser</span>
            </label>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-xs text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
            >
              Forgotten password?
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting || authLoading || connectionStatus === 'error'}
            className="w-full whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin" />
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-5 border-t border-foreground-200/10 pt-4">
          <p className="mb-3 text-center text-xs text-foreground-400">
            Don&apos;t have an account yet?
          </p>
          <button
            type="button"
            onClick={() => navigate('/create-account')}
            className="w-full whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-200 transition hover:border-foreground-200/40 cursor-pointer"
          >
            Create an account
          </button>
          <p className="mt-3 text-center">
            <button
              type="button"
              onClick={() => navigate('/suppliers/apply')}
              className="text-xs text-foreground-400 transition hover:text-foreground-200 cursor-pointer underline"
            >
              Apply as a supplier
            </button>
          </p>
        </div>
      </div>

      {/* Security guidance */}
      <div className="mt-4 rounded-lg border border-foreground-200/10 bg-background-100/50 p-3">
        <p className="text-xs text-foreground-500">
          <i className="ri-shield-check-line mr-1 align-middle text-accent-500" />
          Never share your password. DataHarbour will never ask for your credentials by email.
        </p>
      </div>
    </AuthLayout>
  );
}