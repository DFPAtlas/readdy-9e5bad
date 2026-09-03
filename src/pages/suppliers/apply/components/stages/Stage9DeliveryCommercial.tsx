import type { SupplierApplicationDraft, DeliveryFormat, PricingModel } from "@/data/supplierApplicationTypes";
import { DELIVERY_FORMAT_LABELS, PRICING_MODEL_LABELS } from "@/data/supplierApplicationTypes";

interface Stage9Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const deliveryFormats: DeliveryFormat[] = ["api_rest", "api_graphql", "secure_download", "sftp", "email_feed", "dashboard", "report_pdf", "clean_room", "other"];
const pricingModels: PricingModel[] = ["subscription", "per_record", "per_request", "usage_based", "package_licence", "project_based", "enterprise", "revenue_share", "fixed_distribution", "bespoke"];

const inputCls = "w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20";
const labelCls = "mb-1.5 block text-xs font-medium text-foreground-300";

export default function Stage9DeliveryCommercial({ draft, setDraft }: Stage9Props) {
  const d = draft.deliveryCommercial;

  const update = (field: keyof typeof d, value: string | boolean) => {
    setDraft({ ...draft, deliveryCommercial: { ...d, [field]: value } });
  };

  const updateArray = (field: keyof typeof d, values: string[]) => {
    setDraft({ ...draft, deliveryCommercial: { ...d, [field]: values } });
  };

  const toggleFormat = (fmt: DeliveryFormat) => {
    const current = [...d.deliveryFormats];
    const idx = current.indexOf(fmt);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(fmt);
    updateArray("deliveryFormats", current);
  };

  const togglePricing = (pm: PricingModel) => {
    const current = [...d.preferredPricingModels];
    const idx = current.indexOf(pm);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(pm);
    updateArray("preferredPricingModels", current);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-foreground-200/10 bg-background-100 p-4">
        <p className="text-xs leading-relaxed text-foreground-500">
          Commercial preferences are non-binding and subject to review and agreement.
        </p>
      </div>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Delivery formats</legend>
        <p className="mb-3 text-[11px] leading-relaxed text-foreground-500">Select all delivery formats you can support.</p>
        <div id="field-deliveryFormats" className="flex flex-wrap gap-2">
          {deliveryFormats.map((fmt) => {
            const selected = d.deliveryFormats.includes(fmt);
            return (
              <button
                key={fmt}
                type="button"
                onClick={() => toggleFormat(fmt)}
                className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  selected ? "border-primary-400/40 bg-primary-500/10 text-primary-400" : "border-foreground-200/15 bg-background-50 text-foreground-500 hover:border-foreground-200/30"
                }`}
              >
                {DELIVERY_FORMAT_LABELS[fmt]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Delivery details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            { field: "apiStyle" as const, label: "API style" },
            { field: "apiAuth" as const, label: "API authentication" },
            { field: "secureDownloadMethod" as const, label: "Secure download method" },
            { field: "feedFrequency" as const, label: "Feed frequency" },
            { field: "fileFormats" as const, label: "File formats" },
            { field: "typicalVolume" as const, label: "Typical volume / file size" },
            { field: "integrationSupport" as const, label: "Integration support" },
            { field: "onboardingRequirements" as const, label: "Onboarding requirements" },
            { field: "deliveryRegions" as const, label: "Delivery regions" },
            { field: "usageMeasurement" as const, label: "Usage measurement" },
            { field: "supportHours" as const, label: "Support hours", required: true },
            { field: "maintenanceCommunication" as const, label: "Maintenance communication" },
          ]).map(({ field, label: fLabel, required }) => (
            <div key={field} id={required ? `field-${field}` : undefined}>
              <label htmlFor={field} className={labelCls}>{fLabel} {required ? <span className="text-[#ff2e88]">*</span> : ""}</label>
              <input id={field} type="text" value={d[field]} onChange={(e) => update(field, e.target.value)} className={inputCls} placeholder={required ? "Required" : ""} />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3 rounded-md bg-background-50 p-4">
          {[
            { field: "schemaDocsAvailable" as const, label: "Schema documentation available" },
            { field: "sandboxAvailable" as const, label: "Sandbox available" },
          ].map(({ field, label }) => (
            <label key={field} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={d[field]} onChange={(e) => update(field, e.target.checked)} className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500" />
              <span className="text-xs text-foreground-400">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Commercial preferences</legend>
        <p className="mb-3 text-[11px] leading-relaxed text-foreground-500">Select your preferred pricing models.</p>
        <div id="field-preferredPricingModels" className="flex flex-wrap gap-2 mb-4">
          {pricingModels.map((pm) => {
            const selected = d.preferredPricingModels.includes(pm);
            return (
              <button
                key={pm}
                type="button"
                onClick={() => togglePricing(pm)}
                className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  selected ? "border-primary-400/40 bg-primary-500/10 text-primary-400" : "border-foreground-200/15 bg-background-50 text-foreground-500 hover:border-foreground-200/30"
                }`}
              >
                {PRICING_MODEL_LABELS[pm]}
              </button>
            );
          })}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            { field: "indicativePriceRange" as const, label: "Indicative price range" },
            { field: "minimumTerm" as const, label: "Minimum term" },
            { field: "setupFee" as const, label: "Setup fee" },
            { field: "usageAllowance" as const, label: "Usage allowance" },
            { field: "overageApproach" as const, label: "Overage approach" },
            { field: "enterprisePricing" as const, label: "Enterprise pricing" },
            { field: "currency" as const, label: "Currency" },
          ]).map(({ field, label }) => (
            <div key={field}>
              <label htmlFor={field} className={labelCls}>{label}</label>
              <input id={field} type="text" value={d[field]} onChange={(e) => update(field, e.target.value)} className={inputCls} />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3 rounded-md bg-background-50 p-4">
          {[
            { field: "bespokeAvailable" as const, label: "Bespoke project available" },
            { field: "taxRegistered" as const, label: "Tax registered" },
            { field: "commercialDiscussionRequired" as const, label: "Commercial discussion required before pricing" },
          ].map(({ field, label }) => (
            <label key={field} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={d[field]} onChange={(e) => update(field, e.target.checked)} className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500" />
              <span className="text-xs text-foreground-400">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}