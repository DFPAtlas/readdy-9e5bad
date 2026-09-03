import { membershipPlans } from "@/data/pricing";

const featureNames = [
  "Browse public catalogue",
  "Organisation workspace",
  "Team members",
  "Save and compare packages",
  "View public samples",
  "Access-request tracking",
  "Licence and delivery records",
  "API-usage view",
  "Billing and renewal centre",
  "Standard support",
  "Advanced role controls",
  "Procurement support",
  "Centralised compliance records",
  "Custom API arrangements",
  "Enhanced support",
  "Contract and renewal coordination",
  "Usage reporting",
  "Clean-room analysis",
];

function getFeatureStatus(planId: string, featureName: string) {
  const plan = membershipPlans.find((p) => p.id === planId);
  if (!plan) return { included: false, planned: false };
  const f = plan.features.find((feat) => feat.name === featureName);
  if (!f) return { included: false, planned: false };
  return { included: f.included, planned: !!f.planned };
}

export default function MembershipComparison() {
  return (
    <div className="mx-auto max-w-5xl">
      <h3 className="mb-6 text-center text-sm font-medium text-foreground-300">Feature comparison</h3>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-foreground-200/10 md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-foreground-200/10 bg-background-100/60">
              <th className="px-5 py-3.5 text-xs font-medium text-foreground-300">Feature</th>
              {membershipPlans.map((plan) => (
                <th key={plan.id} className="px-5 py-3.5 text-center text-xs font-medium text-foreground-300">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground-200/10">
            {featureNames.map((feat) => (
              <tr key={feat} className="hover:bg-background-100/30">
                <td className="px-5 py-3 text-xs text-foreground-400">{feat}</td>
                {membershipPlans.map((plan) => {
                  const { included, planned } = getFeatureStatus(plan.id, feat);
                  return (
                    <td key={plan.id} className="px-5 py-3 text-center">
                      {included ? (
                        <span className="inline-flex items-center gap-1">
                          <i className="ri-check-line text-xs text-accent-500" />
                          {planned && (
                            <span className="rounded border border-foreground-200/15 px-1.5 py-px text-[10px] text-foreground-500">
                              Planned
                            </span>
                          )}
                        </span>
                      ) : (
                        <i className="ri-close-line text-xs text-foreground-600" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="space-y-4 md:hidden">
        {membershipPlans.map((plan) => (
          <div key={plan.id} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
            <h4 className="mb-3 text-sm font-medium text-foreground-200">{plan.name}</h4>
            <div className="space-y-2">
              {featureNames.map((feat) => {
                const { included, planned } = getFeatureStatus(plan.id, feat);
                return (
                  <div key={feat} className="flex items-center justify-between gap-2 text-xs">
                    <span className={included ? "text-foreground-400" : "text-foreground-600"}>{feat}</span>
                    <span className="flex items-center gap-1 shrink-0">
                      {included ? (
                        <>
                          <i className="ri-check-line text-xs text-accent-500" />
                          {planned && (
                            <span className="rounded border border-foreground-200/15 px-1.5 py-px text-[10px] text-foreground-500">
                              Planned
                            </span>
                          )}
                        </>
                      ) : (
                        <i className="ri-close-line text-xs text-foreground-600" />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}