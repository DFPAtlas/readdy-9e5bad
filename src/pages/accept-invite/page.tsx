import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "@/pages/auth/components/AuthLayout";
import PasswordRequirements from "@/pages/auth/components/PasswordRequirements";
import { REQUIRED_TERMS, ORG_ROLES } from "@/data/authTypes";
import type { InvitationPreview, OrganisationRole, InvitationStatus } from "@/data/authTypes";

// Fictional invitation data for demonstration
const DEMO_INVITATIONS: Record<string, InvitationPreview> = {
  'demo-invite-valid': {
    id: 'demo-invite-valid',
    organisationName: 'Acme Analytics Ltd',
    invitedEmail: 'analyst@acme.com',
    proposedRole: 'analyst_member',
    inviterName: 'Sarah Chen (Organisation Owner)',
    expiryDate: '2027-12-31',
    status: 'valid',
  },
  'demo-invite-expired': {
    id: 'demo-invite-expired',
    organisationName: 'Legacy Data Partners',
    invitedEmail: 'user@legacy.com',
    proposedRole: 'read_only_member',
    inviterName: 'James Wilson',
    expiryDate: '2025-06-01',
    status: 'expired',
  },
};

export default function AcceptInvite() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteId = searchParams.get('id') || '';

  const [invitation, setInvitation] = useState<InvitationPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    // Simulate invitation lookup
    setTimeout(() => {
      const invite = DEMO_INVITATIONS[inviteId];
      if (invite) {
        setInvitation(invite);
        if (invite.status === 'valid') {
          setInvalid(false);
        }
      } else if (inviteId) {
        setInvalid(true);
      }
      setLoading(false);
    }, 400);
  }, [inviteId]);

  useEffect(() => {
    setErrors({});
  }, [displayName, password]);

  const handleAccept = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!displayName.trim()) errs.displayName = 'Display name is required';
    if (!password) {
      errs.password = 'Password is required';
    } else {
      const pwValid = password.length >= 12
        && /[A-Z]/.test(password)
        && /[a-z]/.test(password)
        && /[0-9]/.test(password)
        && /[!@#$%^&*()_+\-=[\];':"\\|,.<>/?`~]/.test(password);
      if (!pwValid) errs.password = 'Password does not meet all requirements';
    }
    if (!termsAccepted) errs.termsAccepted = 'You must accept the required agreements';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Clear password immediately
    setPassword('');

    // Navigate to sign-in (or account creation in real flow)
    setTimeout(() => {
      navigate('/sign-in');
    }, 600);
  }, [displayName, password, termsAccepted, navigate]);

  const handleDecline = useCallback(() => {
    setDeclined(true);
  }, []);

  const errorList = Object.entries(errors).filter(([, msg]) => msg);

  // Loading state
  if (loading) {
    return (
      <AuthLayout>
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center">
            <i className="ri-loader-4-line animate-spin text-xl text-foreground-400" />
          </div>
          <p className="text-sm text-foreground-400">Checking invitation...</p>
        </div>
      </AuthLayout>
    );
  }

  // Invalid / no invitation
  if (invalid || (!invitation && inviteId)) {
    return (
      <AuthLayout>
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff2e88]/10">
            <i className="ri-error-warning-line text-xl text-[#ff2e88]" />
          </div>
          <h1 className="mb-2 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Invitation not found
          </h1>
          <p className="mb-4 text-xs text-foreground-400">
            This invitation link is invalid or may have expired. Please contact the person who invited you.
          </p>
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

  // No invite ID at all
  if (!inviteId) {
    return (
      <AuthLayout>
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff2e88]/10">
            <i className="ri-error-warning-line text-xl text-[#ff2e88]" />
          </div>
          <h1 className="mb-2 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            No invitation specified
          </h1>
          <p className="mb-4 text-xs text-foreground-400">
            Please use the link from your invitation email.
          </p>
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

  // Expired
  if (invitation?.status === 'expired') {
    return (
      <AuthLayout>
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8">
          <h1 className="mb-1 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Invitation expired
          </h1>
          <p className="mb-4 text-xs text-foreground-400">
            The invitation from <strong>{invitation.organisationName}</strong> expired on {invitation.expiryDate}.
          </p>
          <div className="mb-6 rounded-lg border border-foreground-200/10 bg-background-50 p-4">
            <p className="text-xs text-foreground-400">
              Organisation: <span className="text-foreground-200">{invitation.organisationName}</span>
            </p>
            <p className="text-xs text-foreground-400">
              Proposed role: <span className="text-foreground-200">{ORG_ROLES.find((r) => r.value === invitation.proposedRole)?.label || invitation.proposedRole}</span>
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

  // Declined
  if (declined) {
    return (
      <AuthLayout>
        <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-background-200/50">
            <i className="ri-close-line text-xl text-foreground-400" />
          </div>
          <h1 className="mb-2 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Invitation declined
          </h1>
          <p className="mb-4 text-xs text-foreground-400">
            You have declined the invitation from {invitation?.organisationName}. No further action is needed.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            Return to DataHarbour
          </button>
        </div>
      </AuthLayout>
    );
  }

  // Valid — render acceptance form
  return (
    <AuthLayout backTo="/sign-in">
      <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8">
        <h1 className="mb-1 text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Accept invitation
        </h1>
        <p className="mb-6 text-xs leading-relaxed text-foreground-400">
          This is a local demonstration. No real invitation email existed.
        </p>

        {/* Invitation preview */}
        <div className="mb-6 rounded-lg border border-foreground-200/10 bg-background-50 p-4">
          <p className="mb-2 text-xs font-medium text-foreground-200">{invitation?.organisationName}</p>
          <div className="space-y-1.5 text-xs text-foreground-400">
            <p>Invited: <span className="text-foreground-200">{invitation?.invitedEmail}</span></p>
            <p>Role: <span className="text-foreground-200">{ORG_ROLES.find((r) => r.value === invitation?.proposedRole)?.label || invitation?.proposedRole}</span></p>
            <p>Invited by: <span className="text-foreground-200">{invitation?.inviterName}</span></p>
            <p>Expires: <span className="text-foreground-200">{invitation?.expiryDate}</span></p>
          </div>
        </div>

        {errorList.length > 0 && (
          <div className="mb-4 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
            <ul className="space-y-0.5">
              {errorList.map(([field, msg]) => (
                <li key={field}>
                  <a href={`#invite-${field}`} className="text-xs text-[#ff2e88] underline">{msg}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleAccept} noValidate>
          <div className="mb-4">
            <label htmlFor="invite-displayName" className="mb-1 block text-xs font-medium text-foreground-300">
              Display name <span className="text-[#ff2e88]">*</span>
            </label>
            <input
              id="invite-displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
              className={`w-full rounded-lg border ${errors.displayName ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2.5 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`}
              placeholder="Your full name"
            />
            {errors.displayName && <p className="mt-1 text-xs text-[#ff2e88]">{errors.displayName}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="invite-password" className="mb-1 block text-xs font-medium text-foreground-300">
              Create a password <span className="text-[#ff2e88]">*</span>
            </label>
            <div className="relative">
              <input
                id="invite-password"
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
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-foreground-200/20 p-3">
              <input
                id="invite-termsAccepted"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-300/30 bg-background-50 accent-primary-500 cursor-pointer"
              />
              <span className="text-xs text-foreground-400">
                I accept the{" "}
                {REQUIRED_TERMS.map((t, i) => (
                  <span key={t.slug}>
                    {i > 0 && i === REQUIRED_TERMS.length - 1 ? ' and ' : i > 0 ? ', ' : ''}
                    <a href={`/${t.slug}`} target="_blank" className="text-foreground-300 underline" rel="noopener noreferrer">{t.title}</a>
                  </span>
                ))}
              </span>
            </label>
            {errors.termsAccepted && <p className="mt-1 text-xs text-[#ff2e88]">{errors.termsAccepted}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDecline}
              className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 cursor-pointer"
            >
              Decline
            </button>
            <button
              type="submit"
              className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Accept invitation
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}