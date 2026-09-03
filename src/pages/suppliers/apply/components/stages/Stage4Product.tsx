import type { SupplierApplicationDraft, ProductType, ProductStatus, ExclusivityOption } from "@/data/supplierApplicationTypes";
import { PRODUCT_TYPE_LABELS } from "@/data/supplierApplicationTypes";

interface Stage4Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const productTypes: ProductType[] = [
  "api", "scheduled_feed", "secure_download", "dataset", "dashboard",
  "research_report", "audience_segment", "aggregated_intelligence",
  "verification_product", "clean_room_analysis", "bespoke_analysis", "other",
];

const productStatuses: ProductStatus[] = [
  "in_development", "existing_internal", "existing_commercial",
  "existing_other_marketplace", "existing_direct",
];

const exclusivityOptions: ExclusivityOption[] = ["none", "limited", "discussion_required"];

const inputCls = "w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20";
const labelCls = "mb-1.5 block text-xs font-medium text-foreground-300";

export default function Stage4Product({ draft, setDraft }: Stage4Props) {
  const p = draft.product;

  const update = (field: keyof typeof p, value: string) => {
    setDraft({ ...draft, product: { ...p, [field]: value } });
  };

  return (
    <div className="space-y-5">
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Product identity</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div id="field-productName">
            <label htmlFor="productName" className={labelCls}>Product name <span className="text-[#ff2e88]">*</span></label>
            <input id="productName" type="text" value={p.productName} onChange={(e) => update("productName", e.target.value)} className={inputCls} />
          </div>

          <div id="field-productType">
            <label htmlFor="productType" className={labelCls}>Product type <span className="text-[#ff2e88]">*</span></label>
            <select id="productType" value={p.productType} onChange={(e) => update("productType", e.target.value)} className={inputCls}>
              <option value="">Select product type</option>
              {productTypes.map((t) => (
                <option key={t} value={t}>{PRODUCT_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>

          <div id="field-primaryCategory">
            <label htmlFor="primaryCategory" className={labelCls}>Primary category <span className="text-[#ff2e88]">*</span></label>
            <input id="primaryCategory" type="text" value={p.primaryCategory} onChange={(e) => update("primaryCategory", e.target.value)} className={inputCls} placeholder="e.g. Business Verification" />
          </div>

          <div>
            <label htmlFor="secondaryCategory" className={labelCls}>Secondary category</label>
            <input id="secondaryCategory" type="text" value={p.secondaryCategory} onChange={(e) => update("secondaryCategory", e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="mt-4" id="field-shortDescription">
          <label htmlFor="shortDescription" className={labelCls}>Short description <span className="text-[#ff2e88]">*</span></label>
          <p className="mb-1.5 text-[11px] leading-relaxed text-foreground-500">A concise summary for marketplace cards.</p>
          <input id="shortDescription" type="text" value={p.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} maxLength={300} className={inputCls} />
          <p className="mt-1 text-right text-[10px] text-foreground-600">{p.shortDescription.length}/300</p>
        </div>

        <div className="mt-4" id="field-fullDescription">
          <label htmlFor="fullDescription" className={labelCls}>Full description <span className="text-[#ff2e88]">*</span></label>
          <p className="mb-1.5 text-[11px] leading-relaxed text-foreground-500">A complete overview of the product, its purpose and its value.</p>
          <textarea id="fullDescription" rows={5} value={p.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} maxLength={2000} className={`${inputCls} resize-y`} />
          <p className="mt-1 text-right text-[10px] text-foreground-600">{p.fullDescription.length}/2,000</p>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Business context</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div id="field-businessProblem">
            <label htmlFor="businessProblem" className={labelCls}>Business problem addressed <span className="text-[#ff2e88]">*</span></label>
            <input id="businessProblem" type="text" value={p.businessProblem} onChange={(e) => update("businessProblem", e.target.value)} className={inputCls} placeholder="What problem does this product solve?" />
          </div>
          <div>
            <label htmlFor="intendedBuyers" className={labelCls}>Intended buyer types</label>
            <input id="intendedBuyers" type="text" value={p.intendedBuyers} onChange={(e) => update("intendedBuyers", e.target.value)} className={inputCls} placeholder="e.g. Marketing teams, risk analysts" />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="typicalUseCases" className={labelCls}>Typical use cases</label>
          <textarea id="typicalUseCases" rows={3} value={p.typicalUseCases} onChange={(e) => update("typicalUseCases", e.target.value)} className={`${inputCls} resize-y`} />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Coverage &amp; status</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div id="field-geographicCoverage">
            <label htmlFor="geographicCoverage" className={labelCls}>Geographic coverage <span className="text-[#ff2e88]">*</span></label>
            <input id="geographicCoverage" type="text" value={p.geographicCoverage} onChange={(e) => update("geographicCoverage", e.target.value)} className={inputCls} placeholder="e.g. United Kingdom" />
          </div>
          <div>
            <label htmlFor="coverageNotes" className={labelCls}>Coverage notes</label>
            <input id="coverageNotes" type="text" value={p.coverageNotes} onChange={(e) => update("coverageNotes", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="estimatedCoverage" className={labelCls}>Estimated coverage</label>
            <input id="estimatedCoverage" type="text" value={p.estimatedCoverage} onChange={(e) => update("estimatedCoverage", e.target.value)} className={inputCls} placeholder="e.g. 5 million records" />
          </div>
          <div>
            <label htmlFor="historicalDepth" className={labelCls}>Historical depth</label>
            <input id="historicalDepth" type="text" value={p.historicalDepth} onChange={(e) => update("historicalDepth", e.target.value)} className={inputCls} placeholder="e.g. 5 years" />
          </div>

          <div id="field-productStatus">
            <label htmlFor="productStatus" className={labelCls}>Current product status</label>
            <select id="productStatus" value={p.productStatus} onChange={(e) => update("productStatus", e.target.value)} className={inputCls}>
              <option value="">Select status</option>
              {productStatuses.map((s) => (
                <option key={s} value={s}>
                  {s === "in_development" ? "In development" : s === "existing_internal" ? "Existing (internal use)" : s === "existing_commercial" ? "Existing (commercial)" : s === "existing_other_marketplace" ? "Existing on another marketplace" : "Existing direct to customers"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="existingAvailability" className={labelCls}>Existing market availability</label>
            <input id="existingAvailability" type="text" value={p.existingAvailability} onChange={(e) => update("existingAvailability", e.target.value)} className={inputCls} />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Restrictions &amp; limitations</legend>
        <div className="space-y-4">
          <div>
            <label htmlFor="exclusivity" className={labelCls}>Proposed exclusivity</label>
            <div className="flex flex-wrap gap-2">
              {exclusivityOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("exclusivity", opt)}
                  className={`whitespace-nowrap rounded-lg border px-4 py-2 text-xs font-medium transition cursor-pointer ${
                    p.exclusivity === opt
                      ? "border-primary-400/40 bg-primary-500/10 text-primary-400"
                      : "border-foreground-200/15 bg-background-50 text-foreground-500 hover:border-foreground-200/30"
                  }`}
                >
                  {opt === "none" ? "None" : opt === "limited" ? "Limited" : "Discussion required"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="knownLimitations" className={labelCls}>Known limitations</label>
            <textarea id="knownLimitations" rows={3} value={p.knownLimitations} onChange={(e) => update("knownLimitations", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="restrictedUses" className={labelCls}>Restricted or unsuitable uses</label>
            <textarea id="restrictedUses" rows={3} value={p.restrictedUses} onChange={(e) => update("restrictedUses", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
        </div>
      </fieldset>
    </div>
  );
}