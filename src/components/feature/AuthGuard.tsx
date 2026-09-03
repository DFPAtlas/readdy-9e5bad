import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  /** If true, only allow authenticated users */
  requireAuth?: boolean;
  /** If set, only allow users with this role (from profile.role) */
  requireRole?: string;
  /** Redirect path for unauthenticated users. Default: /sign-in */
  redirectTo?: string;
}

export default function AuthGuard({ children, requireAuth = true, requireRole, redirectTo = "/sign-in" }: AuthGuardProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  // Wait for auth to initialise before rendering anything
  useEffect(() => {
    if (!loading) {
      setReady(true);
    }
  }, [loading]);

  // Loading state — show a clean spinner while auth initialises
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center">
            <i className="ri-loader-4-line animate-spin text-xl text-accent-500" />
          </div>
          <p className="text-xs text-foreground-500">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // Not authenticated but route requires auth
  if (requireAuth && !user) {
    const returnTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${redirectTo}?returnTo=${returnTo}`} replace />;
  }

  // Authenticated but missing required role
  if (requireRole && profile?.role !== requireRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-50">
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 text-center max-w-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff2e88]/10">
            <i className="ri-lock-line text-xl text-[#ff2e88]" />
          </div>
          <h1 className="mb-2 text-xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Access Restricted
          </h1>
          <p className="mb-6 text-xs text-foreground-400">
            This area requires <strong className="text-foreground-300">{requireRole}</strong> access.
            Your account does not have the required permissions.
          </p>
          <a
            href="/"
            className="inline-block whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  // All good
  return <>{children}</>;
}