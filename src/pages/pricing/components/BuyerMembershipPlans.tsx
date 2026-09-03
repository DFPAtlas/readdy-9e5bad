import { useState } from "react";
import { membershipPlans } from "@/data/pricing";
import MembershipPlanCard from "./MembershipPlanCard";
import MembershipComparison from "./MembershipComparison";
import SectionHeading from "@/components/base/SectionHeading";

export default function BuyerMembershipPlans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const hasAnyAnnual = membershipPlans.some((p) => p.annualDisplay !== null);

  return (
    <section id="buyer-plans" className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Membership Plans"
          heading="Buyer membership plans"
          supporting="Organisation membership supports account, team and platform features. Data-product charges are separate."
        />

        {hasAnyAnnual && (
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-foreground-200/15 bg-background-100/60 p-1">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                  !isAnnual
                    ? "bg-background-50 text-foreground-200 shadow-sm"
                    : "text-foreground-500 hover:text-foreground-400"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                  isAnnual
                    ? "bg-background-50 text-foreground-200 shadow-sm"
                    : "text-foreground-500 hover:text-foreground-400"
                }`}
              >
                Annual
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {membershipPlans.map((plan) => (
            <MembershipPlanCard key={plan.id} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>

        <div className="mt-14">
          <MembershipComparison />
        </div>
      </div>
    </section>
  );
}