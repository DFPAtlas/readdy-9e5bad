import type { SupplierApplicationDraft, OwnershipPosition } from "@/data/supplierApplicationTypes";

interface Stage6Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const positions: OwnershipPosition[] = ["owner", "exclusive_licensee", "non_exclusive_licensee", "authorised_distributor", "other"];

const inputCls = "w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20";
const labelCls = "mb-1.5 block text-xs font-medium text-foreground-300";

export default function Stage6Rights({ draft, setDraft }: Stage6Props) {
  const r = draft.rights;

  const update = (field: keyof typeof r, value: string | boolean) => {
    setDraft({ ...draft, rights: { ...r, [field]: value } });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 p-4">
        <p className="text-xs leading-relaxed text-foreground-500">
          <strong className="text-foreground-300">Important:</strong> Do not enter confidential contract text or personal information in this demonstration.
        </p>
      </div>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Ownership and distribution rights</legend>
        <div className="space-y-4">
          <div id="field-ownershipPosition">
            <label htmlFor="ownershipPosition" className={labelCls}>Ownership or licence position <span className="text-[#ff2e88]">*</span></label>
            <select id="ownershipPosition" value={r.ownershipPosition} onChange={(e) => update("ownershipPosition", e.target.value)} className={inputCls}>
              <option value="">Select position</option>
              {positions.map((p) => (
                <option key={p} value={p}>
                  {p === "owner" ? "Data owner" : p === "exclusive_licensee" ? "Exclusive licensee" : p === "non_exclusive_licensee" ? "Non-exclusive licensee" : p === "authorised_distributor" ? "Authorised distributor" : "Other"}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3 rounded-md bg-background-50 p-4">
            {[
              { field: "canDistributeMarketplace" as const, label: "Right to distribute through a marketplace" },
              { field: "canProvideSamples" as const, label: "Right to provide samples" },
              { field: "canSupportDelivery" as const, label: "Right to support API, feed or download delivery" },
              { field: "supplierApprovalPerBuyer" as const, label: "Supplier approval required per buyer" },
            ].map(({ field, label }) => (
              <label key={field} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={r[field]}
                  onChange={(e) => update(field, e.target.checked)}
                  className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500"
                />
                <span className="text-xs text-foreground-400">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Restrictions</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="upstreamRestrictions" className={labelCls}>Upstream restrictions</label>
            <textarea id="upstreamRestrictions" rows={2} value={r.upstreamRestrictions} onChange={(e) => update("upstreamRestrictions", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="geographicRestrictions" className={labelCls}>Geographic restrictions</label>
            <textarea id="geographicRestrictions" rows={2} value={r.geographicRestrictions} onChange={(e) => update("geographicRestrictions", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="industryRestrictions" className={labelCls}>Industry restrictions</label>
            <textarea id="industryRestrictions" rows={2} value={r.industryRestrictions} onChange={(e) => update("industryRestrictions", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="buyerRestrictions" className={labelCls}>Buyer restrictions</label>
            <textarea id="buyerRestrictions" rows={2} value={r.buyerRestrictions} onChange={(e) => update("buyerRestrictions", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Usage terms</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div id="field-permittedPurposes">
            <label htmlFor="permittedPurposes" className={labelCls}>Permitted purposes <span className="text-[#ff2e88]">*</span></label>
            <textarea id="permittedPurposes" rows={2} value={r.permittedPurposes} onChange={(e) => update("permittedPurposes", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div id="field-prohibitedPurposes">
            <label htmlFor="prohibitedPurposes" className={labelCls}>Prohibited purposes <span className="text-[#ff2e88]">*</span></label>
            <textarea id="prohibitedPurposes" rows={2} value={r.prohibitedPurposes} onChange={(e) => update("prohibitedPurposes", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="retentionLimits" className={labelCls}>Retention limits</label>
            <input id="retentionLimits" type="text" value={r.retentionLimits} onChange={(e) => update("retentionLimits", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="onwardSharingRestrictions" className={labelCls}>Onward-sharing restrictions</label>
            <input id="onwardSharingRestrictions" type="text" value={r.onwardSharingRestrictions} onChange={(e) => update("onwardSharingRestrictions", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="derivedOutputRestrictions" className={labelCls}>Derived-output restrictions</label>
            <input id="derivedOutputRestrictions" type="text" value={r.derivedOutputRestrictions} onChange={(e) => update("derivedOutputRestrictions", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="reIdentificationRestrictions" className={labelCls}>Re-identification restrictions</label>
            <input id="reIdentificationRestrictions" type="text" value={r.reIdentificationRestrictions} onChange={(e) => update("reIdentificationRestrictions", e.target.value)} className={inputCls} />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Evidence and duration</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="evidenceAvailable" className={labelCls}>Evidence available</label>
            <textarea id="evidenceAvailable" rows={2} value={r.evidenceAvailable} onChange={(e) => update("evidenceAvailable", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="licenceExpiryDate" className={labelCls}>Licence expiry date</label>
            <input id="licenceExpiryDate" type="text" value={r.licenceExpiryDate} onChange={(e) => update("licenceExpiryDate", e.target.value)} className={inputCls} placeholder="DD/MM/YYYY or ongoing" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="terminationRequirements" className={labelCls}>Termination or deletion requirements</label>
            <textarea id="terminationRequirements" rows={2} value={r.terminationRequirements} onChange={(e) => update("terminationRequirements", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
        </div>
      </fieldset>
    </div>
  );
}