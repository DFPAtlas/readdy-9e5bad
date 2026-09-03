import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/pages/auth/components/AuthLayout";
import { getCurrentDemoUser, saveDemoUser, saveDemoSession } from "@/utils/authStorage";
import type { DemoAuthUser } from "@/data/authTypes";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const user = getCurrentDemoUser();
  const [simulated, setSimulated] = useState(false);

  const handleSimulate = useCallback(() => {
    if (!user) return;
    const updated: DemoAuthUser = {
      ...user,
      emailStatus: 'demo_verified',
      emailVerifiedAt: new Date().toISOString(),
    };
    saveDemoUser(updated);
    setSimulated(true);

    setTimeout(() => {
      // Create session if not already created
      saveDemoSession({
        userId: user.id,
        createdAt: new Date().toISOString(),
        returnTo: null,
      });
      navigate('/onboarding/organisation');
    }, 800);
  }, [user, navigate]);

  const handleChangeEmail = useCallback(() => {
    navigate('/create-account');
  }, [navigate]);

  if (!user) {
    return (
      <AuthLayout backTo="/sign-in">
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8 text-center">
          <h1 className="mb-3 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            No demonstration session found
          </h1>
          <p className="mb-4 text-xs text-foreground-400">Sign in or create an account first.</p>
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            Go to Sign In
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout backTo="/sign-in">
      <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/10">
            <i className="ri-mail-line text-xl text-accent-500" />
          </div>
          <h1 className="mb-2 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Verify your email
          </h1>
          <p className="text-xs text-foreground-400">
            We sent a verification link to <strong className="text-foreground-200">{user.workEmail}</strong>
          </p>
        </div>

        {/* Demo notice */}
        <div className="mb-6 rounded-lg border border-accent-500/20 bg-accent-500/5 p-3 text-center">
          <p className="text-xs text-foreground-400">
            <i className="ri-information-line mr-1 align-middle text-accent-500" />
            No email has been sent. This page demonstrates the future verification step.
          </p>
        </div>

        {/* Simulate button */}
        <button
          type="button"
          onClick={handleSimulate}
          disabled={simulated}
          className="mb-4 w-full whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 disabled:opacity-50 cursor-pointer"
        >
          {simulated ? (
            <span className="flex items-center justify-center gap-2">
              <i className="ri-check-line" />
              Verification simulated
            </span>
          ) : (
            'Simulate verification'
          )}
        </button>

        {/* Resend — marked Planned */}
        <button
          type="button"
          disabled
          className="mb-4 w-full whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm text-foreground-500 cursor-not-allowed"
        >
          Resend verification (planned)
        </button>

        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleChangeEmail}
            className="text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
          >
            Change email
          </button>
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-1" />
            Return to Sign In
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}