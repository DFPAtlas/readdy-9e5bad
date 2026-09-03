import type { MembershipPlan } from "@/data/pricing";

interface MembershipPlanCardProps {
  plan: MembershipPlan;
  isAnnual: boolean;
}

export default function MembershipPlanCard({ plan, isAnnual }: MembershipPlanCardProps) {
  const hasBothPrices = plan.monthlyDisplay !== null && plan.annualDisplay !== null;
  const displayPrice = isAnnual && plan.annualDisplay ? plan.annualDisplay : plan.monthlyDisplay;

  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 transition ${
        plan.featured
          ? "border-accent-300/40 bg-background-50 shadow-[0_0_40px_-12px_rgba(0,0,0,0.08)]"
          : "border-foreground-200/10 bg-background-100/60"
      }`}
    >
      {plan.featured && plan.featuredLabel && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-accent-100 px-4 py-1 text-[11px] font-semibold text-accent-700 whitespace-nowrap">
            {plan.featuredLabel}
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-medium text-foreground-100">{plan.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-foreground-500">{plan.audience}</p>
      </div>

      <div className="mb-4">
        {displayPrice ? (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-foreground-50">{displayPrice}</span>
            {isAnnual && hasBothPrices && (
              <span className="text-xs text-foreground-500">/year</span>
            )}
            {!isAnnual && plan.monthlyDisplay && plan.monthlyDisplay !== "£0" && (
              <span className="text-xs text-foreground-500">/month</span>
            )}
          </div>
        ) : (
          <div className="text-xl font-semibold text-foreground-200">Contact sales</div>
        )}
        <p className="mt-1 text-[11px] leading-relaxed text-foreground-500">{plan.billingNote}</p>
      </div>

      <p className="mb-5 text-xs leading-relaxed text-foreground-400">{plan.description}</p>

      <div className="mb-5 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <div key={f.name} className="flex items-start gap-2.5">
            {f.included ? (
              <i className="ri-check-line mt-0.5 shrink-0 text-xs text-accent-500" />
            ) : (
              <i className="ri-close-line mt-0.5 shrink-0 text-xs text-foreground-600" />
            )}
            <div className="flex-1">
              <span className={`text-xs ${f.included ? "text-foreground-300" : "text-foreground-600"}`}>
                {f.name}
              </span>
              {f.planned && (
                <span className="ml-1.5 rounded border border-foreground-200/15 px-1.5 py-px text-[10px] text-foreground-500">
                  Planned
                </span>
              )}
              {f.note && (
                <p className="mt-0.5 text-[10px] leading-relaxed text-foreground-600">{f.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {plan.limitations.length > 0 && (
        <div className="mb-5 rounded-lg border border-foreground-200/10 bg-background-100/40 px-3.5 py-3">
          <p className="mb-2 text-[11px] font-medium text-foreground-400">Limitations</p>
          <ul className="space-y-1">
            {plan.limitations.map((lim) => (
              <li key={lim} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-foreground-500">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-foreground-500" />
                {lim}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto flex items-center gap-2">
        <span className="rounded border border-foreground-200/15 px-2 py-0.5 text-[10px] text-foreground-500">
          {plan.status}
        </span>
      </div>

      <a
        href={plan.ctaRoute}
        className={`mt-4 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 cursor-pointer ${
          plan.featured
            ? "bg-primary-500 text-background-950 hover:bg-primary-400 focus:ring-primary-400/50"
            : "border border-foreground-300/30 bg-transparent text-foreground-300 hover:border-foreground-200 hover:text-foreground-100 focus:ring-foreground-300/20"
        }`}
      >
        {plan.ctaLabel}
        <i className="ri-arrow-right-line" />
      </a>
    </div>
  );
}