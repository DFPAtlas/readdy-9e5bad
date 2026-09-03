import type { SupplierApplicationDraft, YesNoOption } from "@/data/supplierApplicationTypes";
import { YES_NO_LABELS } from "@/data/supplierApplicationTypes";

interface Stage1EligibilityProps {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const questions: { field: keyof SupplierApplicationDraft["eligibility"]; label: string; critical?: boolean }[] = [
  { field: "registeredOrganisation", label: "Do you represent a registered organisation or established business?" },
  { field: "authorisedRepresentative", label: "Do you have an authorised representative who can submit this application?" },
  { field: "canExplainOrigin", label: "Can you explain where the data in your product comes from?" },
  { field: "canDemonstrateRights", label: "Can you demonstrate rights to supply or license the data?" },
  { field: "canDocumentQuality", label: "Can you document quality, refresh processes and known limitations?" },
  { field: "canSupportSecurity", label: "Can you support security and incident enquiries?" },
  { field: "notStolenOrLeaked", label: "Do you confirm the product does not contain stolen, leaked or unlawfully obtained data?", critical: true },
  { field: "legitimateBusinessUse", label: "Is the product intended for legitimate business use?", critical: true },
];

const yesNoOptions: YesNoOption[] = ["yes", "no", "needs_discussion"];

export default function Stage1Eligibility({ draft, setDraft }: Stage1EligibilityProps) {
  const e = draft.eligibility;

  const handleChange = (field: keyof typeof e, value: YesNoOption) => {
    setDraft({
      ...draft,
      eligibility: { ...e, [field]: value },
    });
  };

  return (
    <fieldset>
      <legend className="sr-only">Eligibility questions</legend>
      <div className="space-y-5">
        {questions.map((q) => (
          <div key={q.field} id={`field-${q.field}`} className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
            <p className={`mb-3 text-sm ${q.critical ? "font-semibold" : ""} text-foreground-200`}>
              {q.label}
              {q.critical && <span className="ml-1.5 inline-block rounded-full bg-[#ff2e88]/10 px-2 py-0.5 text-[10px] font-semibold text-[#ff2e88]">Critical</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {yesNoOptions.map((opt) => {
                const isSelected = e[q.field] === opt;
                let btnStyle = "border-foreground-200/15 bg-background-50 text-foreground-500 hover:border-foreground-200/30";
                if (isSelected) {
                  if (opt === "yes") btnStyle = "border-primary-400/40 bg-primary-500/10 text-primary-400";
                  else if (opt === "no") btnStyle = "border-[#ff2e88]/40 bg-[#ff2e88]/10 text-[#ff2e88]";
                  else btnStyle = "border-amber-500/40 bg-amber-500/10 text-amber-400";
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChange(q.field, opt)}
                    className={`whitespace-nowrap rounded-lg border px-4 py-2 text-xs font-medium transition cursor-pointer ${btnStyle}`}
                  >
                    {YES_NO_LABELS[opt]}
                  </button>
                );
              })}
            </div>
            {q.field === "notStolenOrLeaked" && e[q.field] === "no" && (
              <p className="mt-3 text-xs leading-relaxed text-[#ff2e88]">
                A clearly incompatible declaration will prevent progression. DataHarbour cannot accept products containing stolen or unlawfully obtained data.
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-foreground-500">
        Eligibility does not guarantee acceptance. All applications are subject to review against DataHarbour supplier standards.
        If you have questions, contact the{" "}
        <a href="/contact?type=supplier" className="text-primary-400 underline transition hover:text-primary-300">
          Supplier Team
        </a>
        .
      </p>
    </fieldset>
  );
}