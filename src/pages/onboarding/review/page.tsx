import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/pages/onboarding/components/OnboardingLayout";
import {
  getCurrentDemoUser,
  getOrganisationDraft,
  getIntendedUseDraft,
  getTeamMembers,
  getOnboardingCompletion,
  saveOnboardingStage,
  saveOnboardingCompletion,
} from "@/utils/authStorage";
import { generateRefId } from "@/data/authTypes";
import { ORGANISATION_TYPES, ORGANISATION_SIZES, ORG_ROLES, REQUIRED_TERMS } from "@/data/authTypes";
import type { DemoAuthUser } from "@/data/authTypes";

export default function OnboardingReview() {
  const navigate = useNavigate();
  const user = getCurrentDemoUser();
  const orgDraft = getOrganisationDraft();
  const intendedUse = getIntendedUseDraft();
  const team = getTeamMembers();
  const existingCompletion = getOnboardingCompletion();

  const [confirming, setConfirming] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const hasMissingOrg = !orgDraft.legalName || !orgDraft.organisationType || !orgDraft.businessActivity;
  const hasMissingIntended = (user?.accountType === 'buyer' && (!intendedUse.primaryPurpose || intendedUse.dataCategories.length === 0))
    || (user?.accountType === 'supplier' && (!intendedUse.proposedProductCategories || !intendedUse.provenanceReadiness));
  const hasOwner = team.some((m) => m.role === 'organisation_owner');
  const hasMissingTeam = team.length === 0 || !hasOwner;

  const blockingErrors: string[] = [];
  if (hasMissingOrg) blockingErrors.push('Organisation details are incomplete — legal name, type and business activity are required');
  if (hasMissingIntended) blockingErrors.push('Intended use information is incomplete');
  if (hasMissingTeam) blockingErrors.push('At least one team member with the Organisation Owner role is required');

  const handleConfirm = useCallback(() => {
    if (blockingErrors.length > 0) {
      setErrors(blockingErrors);
      return;
    }
    if (existingCompletion) {
      setErrors(['Onboarding has already been completed. See the Complete stage for your reference.']);
      return;
    }

    setConfirming(true);

    setTimeout(() => {
      const ref = `DH-DEMO-ORG-${generateRefId()}`;
      saveOnboardingCompletion({
        organisationRef: ref,
        completedAt: new Date().toISOString(),
        accountType: user?.accountType || 'buyer',
        organisationName: orgDraft.legalName || user?.organisationName || '',
      });
      saveOnboardingStage('complete');
      setConfirming(false);
      navigate('/onboarding/complete');
    }, 600);
  }, [blockingErrors, existingCompletion, user, orgDraft, navigate]);

  const handleBack = useCallback(() => {
    navigate('/onboarding/team');
  }, [navigate]);

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <OnboardingLayout
      currentStage="review"
      title="Review your onboarding"
      description="Check all information before completing. You can edit any section by selecting its Edit button."
      onBack={handleBack}
      continueLabel={confirming ? 'Completing...' : 'Confirm Demonstration Onboarding'}
      continueDisabled={confirming}
      onContinue={handleConfirm}
    >
      {errors.length > 0 && (
        <div className="mb-6 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
          <p className="mb-1 text-xs font-medium text-[#ff2e88]">Please resolve the following before continuing:</p>
          <ul className="space-y-0.5">
            {errors.map((msg, i) => (
              <li key={i} className="text-xs text-[#ff2e88]">{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {existingCompletion && (
        <div className="mb-6 rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
          <p className="text-xs text-foreground-400">
            <i className="ri-information-line mr-1 align-middle text-accent-500" />
            Onboarding was previously completed. Reference: <span className="font-mono text-foreground-200">{existingCompletion.organisationRef}</span>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Account summary */}
        <SummaryCard title="Account" onEdit={() => { /* Account editing not part of onboarding */ }}>
          <div className="space-y-1 text-xs">
            <Row label="Name" value={user.fullName} />
            <Row label="Email" value={user.workEmail} />
            <Row label="Account type" value={user.accountType === 'buyer' ? 'Buyer organisation' : 'Supplier organisation'} />
            <Row label="Email status" value={user.emailStatus === 'demo_verified' ? 'Demonstration verified' : 'Unverified demonstration'} />
          </div>
        </SummaryCard>

        {/* Organisation summary */}
        <SummaryCard title="Organisation" onEdit={() => navigate('/onboarding/organisation')}>
          <div className="space-y-1 text-xs">
            <Row label="Legal name" value={orgDraft.legalName} missing={!orgDraft.legalName} />
            <Row label="Trading name" value={orgDraft.tradingName} />
            <Row label="Type" value={ORGANISATION_TYPES.find((t) => t.value === orgDraft.organisationType)?.label || orgDraft.organisationType} missing={!orgDraft.organisationType} />
            <Row label="Size" value={ORGANISATION_SIZES.find((s) => s.value === orgDraft.organisationSize)?.label || orgDraft.organisationSize} missing={!orgDraft.organisationSize} />
            <Row label="Country" value={orgDraft.countryOfRegistration} />
            <Row label="Business activity" value={orgDraft.businessActivity} missing={!orgDraft.businessActivity} />
            <Row label="Authorised rep" value={orgDraft.authorisedRepConfirmed ? 'Confirmed' : 'Not confirmed'} missing={!orgDraft.authorisedRepConfirmed} />
          </div>
        </SummaryCard>

        {/* Intended use summary */}
        <SummaryCard title={user.accountType === 'buyer' ? 'Intended use' : 'Products and delivery'} onEdit={() => navigate('/onboarding/intended-use')}>
          <div className="space-y-1 text-xs">
            {user.accountType === 'buyer' ? (
              <>
                <Row label="Primary purpose" value={intendedUse.primaryPurpose} missing={!intendedUse.primaryPurpose} truncate />
                <Row label="Data categories" value={intendedUse.dataCategories.length > 0 ? `${intendedUse.dataCategories.length} selected` : ''} missing={intendedUse.dataCategories.length === 0} />
                <Row label="Geographic scope" value={intendedUse.geographicScope} />
                <Row label="Volume" value={intendedUse.estimatedVolume} />
              </>
            ) : (
              <>
                <Row label="Product categories" value={intendedUse.proposedProductCategories} missing={!intendedUse.proposedProductCategories} truncate />
                <Row label="Provenance readiness" value={intendedUse.provenanceReadiness} missing={!intendedUse.provenanceReadiness} truncate />
              </>
            )}
          </div>
        </SummaryCard>

        {/* Team summary */}
        <SummaryCard title={`Team (${team.length})`} onEdit={() => navigate('/onboarding/team')}>
          {team.length === 0 ? (
            <p className="text-xs italic text-foreground-500">No team members added</p>
          ) : (
            <div className="space-y-2">
              {team.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded border border-foreground-200/10 bg-background-50 px-3 py-2">
                  <div>
                    <p className="text-xs font-medium text-foreground-200">{m.fullName}</p>
                    <p className="text-[11px] text-foreground-400">{m.workEmail}</p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] text-primary-400">
                    {ORG_ROLES.find((r) => r.value === m.role)?.label || m.role}
                  </span>
                </div>
              ))}
            </div>
          )}
          {!hasOwner && team.length > 0 && (
            <p className="mt-2 text-xs text-[#ff2e88]">No organisation owner assigned</p>
          )}
        </SummaryCard>

        {/* Terms summary */}
        <SummaryCard title="Required agreements">
          <div className="space-y-1 text-xs">
            {REQUIRED_TERMS.map((t) => (
              <Row key={t.slug} label={t.title} value={`Accepted at account creation (${t.version})`} />
            ))}
          </div>
        </SummaryCard>
      </div>

      {/* Print button */}
      <div className="mt-4 text-right">
        <button
          type="button"
          onClick={() => window.print()}
          className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2 text-xs text-foreground-400 transition hover:border-foreground-200/40 cursor-pointer"
        >
          <i className="ri-printer-line mr-1" />
          Print summary
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
        <p className="text-xs text-foreground-400">
          <i className="ri-information-line mr-1 align-middle text-accent-500" />
          Confirming creates a local reference only. No data is transmitted, no organisation is verified, and no marketplace access is granted.
        </p>
      </div>
    </OnboardingLayout>
  );
}

// ── Summary card ──
function SummaryCard({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="rounded-lg border border-foreground-200/10 bg-background-100/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground-200">{title}</h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
          >
            <i className="ri-edit-line mr-1" />
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Row ──
function Row({ label, value, missing, truncate }: { label: string; value?: string; missing?: boolean; truncate?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-foreground-500 shrink-0">{label}</span>
      <span className={`text-right ${missing ? 'italic text-[#ff2e88]' : 'text-foreground-200'} ${truncate ? 'max-w-[200px] truncate' : ''}`}>
        {value || (missing ? 'Not provided' : '—')}
      </span>
    </div>
  );
}