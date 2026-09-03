import type { DeliveryMethodDetail } from "@/data/marketplacePackages";

interface PackageDeliveryMethodsProps {
  methods: DeliveryMethodDetail[];
}

export default function PackageDeliveryMethods({ methods }: PackageDeliveryMethodsProps) {
  if (methods.length === 0) return null;

  return (
    <section id="delivery" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Delivery and Integration
      </h2>

      <div className="space-y-3">
        {methods.map((m, i) => (
          <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent-500/10">
                <i className="ri-download-line text-sm text-accent-400" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-medium text-foreground-200">{m.method}</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <span className="block text-[10px] text-foreground-500 uppercase tracking-wide mb-0.5">Suitable For</span>
                <span className="text-[11px] text-foreground-300">{m.suitableUse}</span>
              </div>
              <div>
                <span className="block text-[10px] text-foreground-500 uppercase tracking-wide mb-0.5">Update Behaviour</span>
                <span className="text-[11px] text-foreground-300">{m.updateBehaviour}</span>
              </div>
              <div>
                <span className="block text-[10px] text-foreground-500 uppercase tracking-wide mb-0.5">Authentication</span>
                <span className="text-[11px] text-foreground-300">{m.authExpectation}</span>
              </div>
              <div>
                <span className="block text-[10px] text-foreground-500 uppercase tracking-wide mb-0.5">Frequency</span>
                <span className="text-[11px] text-foreground-300">{m.deliveryFrequency}</span>
              </div>
              <div>
                <span className="block text-[10px] text-foreground-500 uppercase tracking-wide mb-0.5">Format</span>
                <span className="text-[11px] text-foreground-300">{m.format}</span>
              </div>
              <div>
                <span className="block text-[10px] text-foreground-500 uppercase tracking-wide mb-0.5">Support</span>
                <span className="text-[11px] text-foreground-300">{m.supportLevel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Process illustration */}
      <div className="mt-6 rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
        <h3 className="mb-4 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Access Process</h3>
        <div className="flex flex-wrap items-center gap-2">
          {["Approved Organisation", "Access Granted", "Secure Delivery", "Usage Monitoring", "Renewal or Expiry"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-foreground-200/10 bg-background-200/40 px-3 py-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/20 text-[10px] font-medium text-accent-400">{i + 1}</span>
                <span className="text-[11px] text-foreground-300 whitespace-nowrap">{step}</span>
              </div>
              {i < 4 && (
                <i className="ri-arrow-right-line text-foreground-600 flex-shrink-0" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}