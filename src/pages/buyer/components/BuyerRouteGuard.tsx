import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { hasDemoSession, getCurrentDemoUser, getOnboardingStage } from '@/utils/authStorage';

interface BuyerRouteGuardProps {
  children: ReactNode;
}

// ── IMPORTANT ──
// This is a lightweight frontend demonstration guard only.
// It does NOT provide security. Production authentication and authorisation
// MUST be enforced server-side through Supabase Auth, Row Level Security
// (RLS) policies and database-level permission checks.
// Do not rely on frontend route guards as security controls.

export default function BuyerRouteGuard({ children }: BuyerRouteGuardProps) {
  if (!hasDemoSession()) {
    const currentPath = window.location.pathname + window.location.search;
    const safeReturn = encodeURIComponent(currentPath);
    return <Navigate to={`/sign-in?returnTo=${safeReturn}`} replace />;
  }

  const user = getCurrentDemoUser();

  // Supplier accounts cannot enter buyer portal
  if (user?.accountType === 'supplier') {
    return <Navigate to="/account-demo" replace />;
  }

  // Check onboarding + email verification
  const emailVerified = user?.emailStatus === 'demo_verified';
  const stage = getOnboardingStage();

  if (!emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (stage !== 'complete') {
    const stageRoutes: Record<string, string> = {
      organisation: '/onboarding/organisation',
      intended_use: '/onboarding/intended-use',
      team: '/onboarding/team',
      review: '/onboarding/review',
    };
    const target = stageRoutes[stage] || '/onboarding/organisation';
    return <Navigate to={target} replace />;
  }

  return <>{children}</>;
}