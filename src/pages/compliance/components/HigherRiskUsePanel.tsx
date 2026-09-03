import { higherRiskUses } from "@/data/compliancePages";

export default function HigherRiskUsePanel() {
  return (
    <section className="bg-background-100" id="higher-risk" aria-labelledby="hr-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="rounded-lg border border-[#ff2e88]/20 bg-[#ff2e88]/5 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff2e88]/10">
              <i className="ri-alert-line text-lg text-[#ff2e88]" aria-hidden="true" />
            </div>
            <h2
              className="text-2xl text-foreground-50 md:text-3xl"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Higher-risk uses
            </h2>
          </div>
          <p className="mb-5 text-sm text-foreground-300 max-w-2xl">
            Some proposed uses of data carry inherently higher risk to individuals, organisations or the public interest. DataHarbour may require additional review, enhanced safeguards or a more detailed justification before granting access for these uses. In some cases, the proposed use may be declined.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {higherRiskUses.map((use) => (
              <li key={use} className="flex items-start gap-2 text-sm text-foreground-300">
                <i className="ri-arrow-right-s-line mt-0.5 shrink-0 text-[#ff2e88]" aria-hidden="true" />
                {use}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}