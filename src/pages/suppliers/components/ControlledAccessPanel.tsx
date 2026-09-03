import { useNavigate } from "react-router-dom";

const accessControls = [
  "Access levels — from verified-buyer access through to enterprise-agreement requirements, set by you for each product.",
  "Buyer or supplier approval — you decide whether you want to review individual buyers before granting access.",
  "Compliance review — DataHarbour may require additional review for higher-risk purposes, regardless of the product's standard access level.",
  "Enterprise terms — for large-scale or multi-product engagements, custom commercial and access terms may be agreed.",
  "Permitted and prohibited use — define what buyers may and may not do with your data. Restrictions are visible on the product detail page.",
  "Retention limits — specify how long buyers may retain your data and the deletion expectation.",
  "Sharing restrictions — define whether and how buyers may share data with affiliates, contractors or clients.",
  "Geographic restrictions — limit access to buyers in specific regions if your rights or commercial model require it.",
  "Volume and rate limits — set usage caps to prevent excessive consumption and protect service quality for all buyers.",
  "Delivery restrictions — define which delivery methods are available and any conditions on their use.",
];

export default function ControlledAccessPanel() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-center text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
            Controlled access
          </p>
          <h2 className="text-center text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            You define the access terms. DataHarbour enforces the governance layer.
          </h2>
          <p className="mt-5 text-center text-sm leading-relaxed text-foreground-400">
            Suppliers control who can access their products and under what conditions. DataHarbour adds an independent governance layer that verifies buyers, reviews declared purposes and enforces the marketplace&apos;s prohibited-use policy.
          </p>
          <div className="mt-10 rounded-lg border border-foreground-200/10 bg-background-50 p-6 md:p-8">
            <ul className="space-y-4">
              {accessControls.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/10 mt-0.5">
                    <i className="ri-check-line text-xs text-primary-400" />
                  </div>
                  <span className="text-xs leading-relaxed text-foreground-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-center text-xs text-foreground-500">
            DataHarbour may add further conditions or decline a proposed use even if you, as the supplier, would approve it. The governance layer operates independently and protects the integrity of the marketplace for all participants.
          </p>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("/compliance/supplier-standards")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 cursor-pointer"
            >
              Review full supplier standards
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}