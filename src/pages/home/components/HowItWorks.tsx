import SectionHeading from "@/components/base/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Search packages by category, industry, geography, delivery method and update frequency.",
    icon: "ri-search-line",
  },
  {
    number: "02",
    title: "Verify",
    description: "Create an organisation account and complete required business checks.",
    icon: "ri-shield-check-line",
  },
  {
    number: "03",
    title: "Declare",
    description: "Explain the intended use and answer package-specific access questions.",
    icon: "ri-file-text-line",
  },
  {
    number: "04",
    title: "Access",
    description: "Receive approved access through an API, dashboard, secure feed or controlled download.",
    icon: "ri-key-2-line",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          heading="How DataHarbour Works"
          supporting="A structured process designed around verification, transparency and controlled access."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center rounded-lg border border-foreground-200/10 bg-background-100/50 p-6 text-center backdrop-blur-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/10">
                <i className={`${step.icon} text-2xl text-accent-400`} />
              </div>
              <span className="mb-2 text-[10px] font-bold tracking-[0.2em] text-accent-400">{step.number}</span>
              <h3 className="mb-2 text-sm font-semibold text-foreground-100">{step.title}</h3>
              <p className="text-xs leading-relaxed text-foreground-400">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-accent-400/20 bg-accent-500/5 px-6 py-4 text-center">
          <p className="text-xs leading-relaxed text-foreground-400">
            <i className="ri-information-line mr-1.5 align-middle text-accent-400" />
            <strong className="text-foreground-300">Package access is not automatically granted</strong> simply because a product is listed.
          </p>
        </div>
      </div>
    </section>
  );
}