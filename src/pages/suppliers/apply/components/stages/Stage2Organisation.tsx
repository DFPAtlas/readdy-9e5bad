import type { SupplierApplicationDraft, OrganisationType, DataRelationship } from "@/data/supplierApplicationTypes";
import { ORGANISATION_TYPE_LABELS } from "@/data/supplierApplicationTypes";

interface Stage2Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const orgTypes: OrganisationType[] = ["limited_company", "plc", "partnership", "llp", "sole_trader", "charity", "public_body", "research_institution", "other"];
const dataRelations: DataRelationship[] = ["owner", "originator", "authorised_reseller", "processor", "other"];

function textInput(
  id: string,
  label: string,
  value: string,
  onChange: (v: string) => void,
  required = false,
  hint?: string,
  type = "text",
  maxLen?: number,
) {
  return (
    <div id={`field-${id}`}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-foreground-300">
        {label} {required && <span className="text-[#ff2e88]">*</span>}
      </label>
      {hint && <p className="mb-1.5 text-[11px] leading-relaxed text-foreground-500">{hint}</p>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20"
        maxLength={maxLen}
      />
      {maxLen && (
        <p className="mt-1 text-right text-[10px] text-foreground-600">{value.length}/{maxLen}</p>
      )}
    </div>
  );
}

export default function Stage2Organisation({ draft, setDraft }: Stage2Props) {
  const o = draft.organisation;

  const update = (field: keyof typeof o, value: string) => {
    setDraft({ ...draft, organisation: { ...o, [field]: value } });
  };

  return (
    <div className="space-y-5">
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Organisation identity</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {textInput("legalName", "Legal organisation name", o.legalName, (v) => update("legalName", v), true)}
          {textInput("tradingName", "Trading name (if different)", o.tradingName, (v) => update("tradingName", v))}

          <div id="field-organisationType">
            <label htmlFor="organisationType" className="mb-1.5 block text-xs font-medium text-foreground-300">
              Organisation type <span className="text-[#ff2e88]">*</span>
            </label>
            <select
              id="organisationType"
              value={o.organisationType}
              onChange={(e) => update("organisationType", e.target.value)}
              className="w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20"
            >
              <option value="">Select organisation type</option>
              {orgTypes.map((t) => (
                <option key={t} value={t}>{ORGANISATION_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>

          {textInput("registrationCountry", "Country of registration", o.registrationCountry, (v) => update("registrationCountry", v), true)}
          {textInput("registrationNumber", "Company or registration number", o.registrationNumber, (v) => update("registrationNumber", v))}
          {textInput("registeredCity", "Registered city or region", o.registeredCity, (v) => update("registeredCity", v))}
          {textInput("website", "Public website", o.website, (v) => update("website", v), false, "Enter a full URL starting with http:// or https://")}
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Business profile</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {textInput("mainActivity", "Main business activity", o.mainActivity, (v) => update("mainActivity", v), true)}
          {textInput("yearEstablished", "Year established", o.yearEstablished, (v) => update("yearEstablished", v), false, "e.g. 2010", "text")}
          {textInput("employeeRange", "Employee range", o.employeeRange, (v) => update("employeeRange", v), false, "e.g. 10-50")}
          {textInput("existingDataProducts", "Existing data products summary", o.existingDataProducts, (v) => update("existingDataProducts", v), false, "Briefly describe any data products you already offer")}

          <div id="field-dataRelationship">
            <label htmlFor="dataRelationship" className="mb-1.5 block text-xs font-medium text-foreground-300">
              Relationship to the data <span className="text-[#ff2e88]">*</span>
            </label>
            <select
              id="dataRelationship"
              value={o.dataRelationship}
              onChange={(e) => update("dataRelationship", e.target.value)}
              className="w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20"
            >
              <option value="">Select relationship</option>
              {dataRelations.map((r) => (
                <option key={r} value={r}>{r === "owner" ? "Data owner" : r === "originator" ? "Data originator" : r === "authorised_reseller" ? "Authorised reseller" : r === "processor" ? "Data processor" : "Other"}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Contact details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {textInput("generalEmail", "General business email", o.generalEmail, (v) => update("generalEmail", v), false, "", "email")}
          {textInput("generalPhone", "General telephone number", o.generalPhone, (v) => update("generalPhone", v), false, "", "tel")}
        </div>
      </fieldset>

      <p className="text-[11px] leading-relaxed text-foreground-500">
        No live company checks are performed. All information is stored only in this browser.
      </p>
    </div>
  );
}