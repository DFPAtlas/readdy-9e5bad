import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthGuard from "@/components/feature/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";

export default function AccountDemo() {
  return (
    <AuthGuard>
      <AccountContent />
    </AuthGuard>
  );
}

function AccountContent() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate('/sign-in');
  }, [signOut, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background-50">
        <PublicHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-sm text-foreground-400">No session found.</p>
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="mt-4 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            Sign In
          </button>
        </main>
        <PublicFooter />
      </div>
    );
  }

  const displayName = profile?.display_name || profile?.full_name || user.email?.split('@')[0] || 'User';
  const orgName = profile?.company_name || 'Not set';
  const jobTitle = profile?.role || 'Not set';
  const email = user.email || profile?.email || 'Unknown';

  return (
    <div className="min-h-screen bg-background-50">
      <PublicHeader />

      <main className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <h1
          className="mb-6 text-3xl text-foreground-50 md:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Your Account
        </h1>

        {/* Account details */}
        <div className="mb-6 rounded-xl border border-foreground-200/10 bg-background-100/50 p-5">
          <h2 className="mb-4 text-sm font-medium text-foreground-200">Account details</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-foreground-500">Display name</span>
              <span className="font-medium text-foreground-100">{displayName}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-foreground-500">Email</span>
              <span className="font-medium text-foreground-100">{email}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-foreground-500">Organisation</span>
              <span className="font-medium text-foreground-100">{orgName}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-foreground-500">Job title</span>
              <span className="font-medium text-foreground-100">{jobTitle}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-foreground-500">Status</span>
              <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] text-primary-400">
                {user.email_confirmed_at ? 'Verified' : 'Unverified'}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-foreground-500">Member since</span>
              <span className="text-foreground-200">
                {new Date(user.created_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Auth Provider info */}
        <div className="mb-6 rounded-xl border border-foreground-200/10 bg-background-100/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-shield-check-line text-sm text-accent-500" />
            <p className="text-xs font-medium text-foreground-300">Authentication</p>
          </div>
          <p className="text-xs text-foreground-400">
            Your account is authenticated through Supabase Auth. User ID: <code className="rounded bg-background-200/30 px-1 py-0.5 text-[10px] font-mono">{user.id.slice(0, 12)}...</code>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => navigate('/marketplace')}
            className="whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            Browse Marketplace
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/buyer/dashboard')}
            className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 cursor-pointer"
          >
            Buyer Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate('/suppliers/apply')}
            className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 cursor-pointer"
          >
            Supplier Application
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-400 transition hover:text-[#ff2e88] hover:border-[#ff2e88]/30 cursor-pointer"
          >
            <i className="ri-logout-box-line mr-1 align-middle" />
            Sign Out
          </button>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}