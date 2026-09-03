import type { SupplierApplicationDraft } from "@/data/supplierApplicationTypes";

interface Stage3Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

export default function Stage3Representative({ draft, setDraft }: Stage3Props) {
  const r = draft.representative;

  const update = (field: keyof typeof r, value: string | boolean) => {
    setDraft({ ...draft, representative: { ...r, [field]: value } });
  };

  const inputCls = "w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20";
  const labelCls = "mb-1.5 block text-xs font-medium text-foreground-300";

  return (
    <div className="space-y-5">
      {/* Primary contact */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Authorised representative</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div id="field-fullName">
            <label htmlFor="fullName" className={labelCls}>Full name <span className="text-[#ff2e88]">*</span></label>
            <input id="fullName" type="text" value={r.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputCls} />
          </div>
          <div id="field-jobTitle">
            <label htmlFor="jobTitle" className={labelCls}>Job title <span className="text-[#ff2e88]">*</span></label>
            <input id="jobTitle" type="text" value={r.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} className={inputCls} />
          </div>
          <div id="field-workEmail">
            <label htmlFor="workEmail" className={labelCls}>Work email <span className="text-[#ff2e88]">*</span></label>
            <input id="workEmail" type="email" value={r.workEmail} onChange={(e) => update("workEmail", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="workPhone" className={labelCls}>Work telephone</label>
            <input id="workPhone" type="tel" value={r.workPhone} onChange={(e) => update("workPhone", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="department" className={labelCls}>Department</label>
            <input id="department" type="text" value={r.department} onChange={(e) => update("department", e.target.value)} className={inputCls} placeholder="e.g. Data Operations" />
          </div>
        </div>

        <div id="field-authorityToSubmit" className="mt-5 rounded-md bg-background-50 p-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={r.authorityToSubmit}
              onChange={(e) => update("authorityToSubmit", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500"
            />
            <div>
              <span className="text-xs font-medium text-foreground-300">I confirm I am authorised to submit this application on behalf of the organisation.</span>
              {!r.authorityToSubmit && (
                <p className="mt-1 text-[11px] text-[#ff2e88]">This confirmation is required.</p>
              )}
            </div>
          </label>
        </div>
      </fieldset>

      {/* Additional contacts */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Additional contacts</legend>

        {/* Compliance */}
        <div className="mb-4 rounded-md bg-background-50 p-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={r.sameAsPrimaryCompliance}
              onChange={(e) => update("sameAsPrimaryCompliance", e.target.checked)}
              className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500"
            />
            <span className="text-xs text-foreground-400">Same as primary contact</span>
          </label>
          {!r.sameAsPrimaryCompliance && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div id="field-complianceContactName">
                <label htmlFor="complianceContactName" className={labelCls}>Compliance contact name <span className="text-[#ff2e88]">*</span></label>
                <input id="complianceContactName" type="text" value={r.complianceContactName} onChange={(e) => update("complianceContactName", e.target.value)} className={inputCls} />
              </div>
              <div id="field-complianceContactEmail">
                <label htmlFor="complianceContactEmail" className={labelCls}>Compliance contact email</label>
                <input id="complianceContactEmail" type="email" value={r.complianceContactEmail} onChange={(e) => update("complianceContactEmail", e.target.value)} className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* Technical */}
        <div className="mb-4 rounded-md bg-background-50 p-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={r.sameAsPrimaryTechnical}
              onChange={(e) => update("sameAsPrimaryTechnical", e.target.checked)}
              className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500"
            />
            <span className="text-xs text-foreground-400">Same as primary contact</span>
          </label>
          {!r.sameAsPrimaryTechnical && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div id="field-technicalContactName">
                <label htmlFor="technicalContactName" className={labelCls}>Technical contact name <span className="text-[#ff2e88]">*</span></label>
                <input id="technicalContactName" type="text" value={r.technicalContactName} onChange={(e) => update("technicalContactName", e.target.value)} className={inputCls} />
              </div>
              <div id="field-technicalContactEmail">
                <label htmlFor="technicalContactEmail" className={labelCls}>Technical contact email</label>
                <input id="technicalContactEmail" type="email" value={r.technicalContactEmail} onChange={(e) => update("technicalContactEmail", e.target.value)} className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* Commercial */}
        <div className="mb-4 rounded-md bg-background-50 p-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={r.sameAsPrimaryCommercial}
              onChange={(e) => update("sameAsPrimaryCommercial", e.target.checked)}
              className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500"
            />
            <span className="text-xs text-foreground-400">Same as primary contact</span>
          </label>
          {!r.sameAsPrimaryCommercial && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div id="field-commercialContactName">
                <label htmlFor="commercialContactName" className={labelCls}>Commercial contact name <span className="text-[#ff2e88]">*</span></label>
                <input id="commercialContactName" type="text" value={r.commercialContactName} onChange={(e) => update("commercialContactName", e.target.value)} className={inputCls} />
              </div>
              <div id="field-commercialContactEmail">
                <label htmlFor="commercialContactEmail" className={labelCls}>Commercial contact email</label>
                <input id="commercialContactEmail" type="email" value={r.commercialContactEmail} onChange={(e) => update("commercialContactEmail", e.target.value)} className={inputCls} />
              </div>
            </div>
          )}
        </div>
      </fieldset>

      <p className="text-[11px] leading-relaxed text-foreground-500">
        Do not enter home addresses or unnecessary personal details. All information is stored only in this browser.
      </p>
    </div>
  );
}