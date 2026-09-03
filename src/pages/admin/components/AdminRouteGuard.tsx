// ── Admin Route Guard ──
// Frontend-only navigation aid. Not production security.
// Production authorisation must be enforced server-side and through database policies.

import { Navigate, useLocation } from 'react-router-dom';
import { hasAdminSession } from '@/utils/adminStorage';
import { getCurrentDemoUser, parseSafeReturn } from '@/utils/authStorage';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const location = useLocation();

  // Check for admin session (created via the preview gate)
  const isAdmin = hasAdminSession();

  if (!isAdmin) {
    // Check if the user has a demo buyer/supplier session — block them
    const demoUser = getCurrentDemoUser();
    if (demoUser) {
      return <Navigate to={demoUser.accountType === 'buyer' ? '/app/buyer/dashboard' : '/onboarding'} replace />;
    }

    // Redirect to sign-in with safe return
    const returnTo = parseSafeReturn(location.pathname);
    const signInPath = returnTo ? `/sign-in?returnTo=${encodeURIComponent(returnTo)}` : '/sign-in';
    return <Navigate to={signInPath} replace />;
  }

  return <>{children}</>;
}