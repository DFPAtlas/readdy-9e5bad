import { useNavigate } from "react-router-dom";
import { getOnboardingCompletion, getCurrentDemoUser, clearAllAccountData } from "@/utils/authStorage";
import OnboardingLayout from "@/pages/onboarding/components/OnboardingLayout";

export default function OnboardingComplete() {
  const navigate = useNavigate();
  const completion = getOnboardingCompletion();
  const user = getCurrentDemoUser();

  const handleClearAccount = () => {
    clearAllAccountData();
    navigate('/');
  };

  if (!completion) {
    return (
      <OnboardingLayout currentStage="complete" title="Onboarding not yet completed" hideContinue>
        <p className="text-sm text-foreground-400">
          No completion record found. Please complete the onboarding process first.
        </p>
        <button
          type="button"
          onClick={() => navigate('/onboarding/organisation')}
          className="mt-4 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          Start onboarding
        </button>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout currentStage="complete" title="Onboarding complete" hideContinue>
      <div className="rounded-xl border border-foreground-200/10 bg-background-100/50 p-6 md:p-8">
        {/* Success icon */}
        <div className="mb-5 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10">
            <i className="ri-check-double-line text-2xl text-accent-500" />
          </div>
          <h2 className="text-xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {completion.organisationName}
          </h2>
        </div>

        {/* Reference card */}
        <div className="mb-6 rounded-lg border border-foreground-200/10 bg-background-50 p-4 text-center">
          <p className="text-[11px] text-foreground-500">Local demonstration reference</p>
          <p className="text-lg font-mono font-semibold text-foreground-100">{completion.organisationRef}</p>
        </div>

        {/* Details */}
        <div className="mb-6 space-y-2 rounded-lg border border-foreground-200/10 bg-background-50 p-4">
          <div className="flex justify-between text-xs">
            <span className="text-foreground-500">Account type</span>
            <span className="text-foreground-200">{completion.accountType === 'buyer' ? 'Buyer organisation' : 'Supplier organisation'}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-foreground-500">Organisation</span>
            <span className="text-foreground-200">{completion.organisationName}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-foreground-500">Status</span>
            <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-[10px] text-accent-400">Demonstration complete</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-foreground-500">Completed</span>
            <span className="text-foreground-200">{new Date(completion.completedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Demo notice */}
        <div className="mb-6 rounded-lg border border-accent-500/20 bg-accent-500/5 p-4 text-center">
          <p className="text-xs text-foreground-400">
            <i className="ri-information-line mr-1 align-middle text-accent-500" />
            Your information remains only in this browser. DataHarbour has not received, verified or approved this organisation.
          </p>
        </div>

        {/* Next steps */}
        <div className="mb-6">
          <p className="mb-3 text-xs font-medium text-foreground-300">Next planned steps</p>
          <div className="space-y-2">
            {[
              'Organisation verification (planned for future phase)',
              'Access review and approval process',
              'API credential issuance',
              'Team member invitation delivery',
              user?.accountType === 'supplier' ? 'Supplier application review and onboarding' : 'Package discovery and access requests',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2 rounded border border-foreground-200/10 bg-background-50 px-3 py-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-background-200/50 text-[10px] text-foreground-500">
                  {i + 1}
                </div>
                <span className="text-xs text-foreground-400">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => navigate('/account-demo')}
            className="w-full whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            View demonstration account
          </button>
          <button
            type="button"
            onClick={() => navigate('/marketplace')}
            className="w-full whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 cursor-pointer"
          >
            Browse Marketplace
          </button>
          {user?.accountType === 'supplier' && (
            <button
              type="button"
              onClick={() => navigate('/suppliers/apply')}
              className="w-full whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 cursor-pointer"
            >
              Go to Supplier Application
            </button>
          )}
        </div>
      </div>

      {/* Clear account */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleClearAccount}
          className="text-xs text-foreground-500 transition hover:text-[#ff2e88] cursor-pointer underline"
        >
          Clear demonstration account
        </button>
      </div>
    </OnboardingLayout>
  );
}