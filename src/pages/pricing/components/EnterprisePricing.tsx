import { enterpriseCapabilities } from "@/data/pricing";
import SectionHeading from "@/components/base/SectionHeading";

const statusStyles: Record<string, string> = {
  "Contact sales": "border-foreground-200/15 text-foreground-500",
  Planned: "border-foreground-200/15 text-foreground-500",
  Available: "border-accent-300/40 text-accent-600",
};

export default function EnterprisePricing() {
  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Enterprise"
          heading="Enterprise and bespoke pricing"
          supporting="For organisations with procurement, governance, custom integration or multi-product needs."
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enterpriseCapabilities.map((cap) => (
            <div
              key={cap.name}
              className="rounded-lg border border-foreground-200/10 bg-background-50 p-4 transition hover:border-foreground-200/20"
            >
              <div className="mb-2 flex items-center gap-2">
                <h4 className="text-sm font-medium text-foreground-200">{cap.name}</h4>
                <span
                  className={`shrink-0 rounded border px-1.5 py-px text-[10px] ${
                    statusStyles[cap.status] || "border-foreground-200/15 text-foreground-500"
                  }`}
                >
                  {cap.status}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-foreground-500">{cap.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-xl text-center">
          <a
            href="/contact?type=enterprise&topic=pricing"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 cursor-pointer"
          >
            Request enterprise discussion
            <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}