import { useState, type FormEvent, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import ContactFormShell from "@/pages/contact/components/ContactFormShell";
import ContactConfirmation from "@/pages/contact/components/ContactConfirmation";
import type { EnterpriseEnquiryDraft } from "@/data/contactTypes";
import { ENTERPRISE_ENQUIRY_DEFAULTS, ENTERPRISE_ENQUIRY_TYPE_OPTIONS, PROCUREMENT_STAGE_OPTIONS } from "@/data/contactTypes";
import { saveSubmission, generateReference, buildSummary } from "@/utils/contactStorage";

export default function EnterpriseEnquiry() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<EnterpriseEnquiryDraft>(() => ({
    ...ENTERPRISE_ENQUIRY_DEFAULTS,
    enquiryType: searchParams.get("topic") || "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof EnterpriseEnquiryDraft, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [demoRef, setDemoRef] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof EnterpriseEnquiryDraft]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnterpriseEnquiryDraft, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.organisation.trim()) newErrors.organisation = "Organisation is required";
    if (formData.message.length > 500) newErrors.message = "Message must be 500 characters or fewer";
    if (!formData.privacyAck) newErrors.privacyAck = "Privacy acknowledgement is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phoneAlt = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value?.trim() || "";
    if (phoneAlt) { setSubmitted(true); return; }
    if (!validate()) return;

    const ref = generateReference("DH-DEMO-ENT");
    const submission = buildSummary({ enquiryType: "enterprise", data: formData }, ref);
    saveSubmission(submission);
    setDemoRef(ref);
    setSubmittedDate(submission.submittedDate);
    setSummary(submission.summary);
    setSubmitted(true);
  };

  if (submitted) {
    return <ContactConfirmation enquiryType="enterprise" reference={demoRef} submittedDate={submittedDate} summary={summary} />;
  }

  return (
    <ContactFormShell
      enquiryType="enterprise"
      title="Enterprise and Commercial Enquiry"
      description="Multi-product licensing, procurement, bespoke analysis or commercial arrangements. This form does not produce a quote or contract."
      onSubmit={handleSubmit}
      guidance={
        <div className="space-y-2 text-xs text-foreground-500">
          <p>Related: <a href="/pricing" className="text-primary-400 hover:text-primary-300 underline">Pricing</a> · <a href="/marketplace" className="text-primary-400 hover:text-primary-300 underline">Marketplace</a></p>
        </div>
      }
    >
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 rounded-lg border border-red-400/30 bg-red-50/50 px-4 py-3" role="alert">
          <p className="mb-2 text-xs font-medium text-red-700">Please correct the following:</p>
          <ul className="space-y-1">{Object.entries(errors).map(([key, msg]) => <li key={key} className="text-xs text-red-600">{msg}</li>)}</ul>
        </div>
      )}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
        <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" readOnly />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ent-fullName" className="mb-1.5 block text-xs font-medium text-foreground-300">Full Name <span className="text-red-400">*</span></label>
          <input id="ent-fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} className={inputClass(errors.fullName)} placeholder="Your full name" />
          {errors.fullName && <p className="mt-1 text-[10px] text-red-400">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="ent-email" className="mb-1.5 block text-xs font-medium text-foreground-300">Work Email <span className="text-red-400">*</span></label>
          <input id="ent-email" name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass(errors.email)} placeholder="you@organisation.com" autoComplete="email" />
          {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="ent-organisation" className="mb-1.5 block text-xs font-medium text-foreground-300">Organisation <span className="text-red-400">*</span></label>
          <input id="ent-organisation" name="organisation" type="text" value={formData.organisation} onChange={handleChange} className={inputClass(errors.organisation)} placeholder="Your organisation name" />
          {errors.organisation && <p className="mt-1 text-[10px] text-red-400">{errors.organisation}</p>}
        </div>
        <div>
          <label htmlFor="ent-jobTitle" className="mb-1.5 block text-xs font-medium text-foreground-300">Job Title</label>
          <input id="ent-jobTitle" name="jobTitle" type="text" value={formData.jobTitle} onChange={handleChange} className={inputClass()} placeholder="Your role" />
        </div>
        <div>
          <label htmlFor="ent-orgSize" className="mb-1.5 block text-xs font-medium text-foreground-300">Organisation Size</label>
          <select id="ent-orgSize" name="orgSize" value={formData.orgSize} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="1-10">1–10</option>
            <option value="11-50">11–50</option>
            <option value="51-200">51–200</option>
            <option value="201-1000">201–1,000</option>
            <option value="1001+">1,001+</option>
          </select>
        </div>
        <div>
          <label htmlFor="ent-orgCountry" className="mb-1.5 block text-xs font-medium text-foreground-300">Country</label>
          <input id="ent-orgCountry" name="orgCountry" type="text" value={formData.orgCountry} onChange={handleChange} className={inputClass()} placeholder="e.g. United Kingdom" />
        </div>
        <div>
          <label htmlFor="ent-enquiryType" className="mb-1.5 block text-xs font-medium text-foreground-300">Enquiry Type</label>
          <select id="ent-enquiryType" name="enquiryType" value={formData.enquiryType} onChange={handleChange} className={selectClass()}>
            {ENTERPRISE_ENQUIRY_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ent-expectedUsers" className="mb-1.5 block text-xs font-medium text-foreground-300">Expected Users</label>
          <input id="ent-expectedUsers" name="expectedUsers" type="text" value={formData.expectedUsers} onChange={handleChange} className={inputClass()} placeholder="e.g. 15 team members" />
        </div>
        <div>
          <label htmlFor="ent-products" className="mb-1.5 block text-xs font-medium text-foreground-300">Products or Categories of Interest</label>
          <input id="ent-products" name="productsOfInterest" type="text" value={formData.productsOfInterest} onChange={handleChange} className={inputClass()} placeholder="e.g. Business intelligence" />
        </div>
        <div>
          <label htmlFor="ent-usage" className="mb-1.5 block text-xs font-medium text-foreground-300">Estimated Usage</label>
          <input id="ent-usage" name="estimatedUsage" type="text" value={formData.estimatedUsage} onChange={handleChange} className={inputClass()} placeholder="e.g. 500,000 API calls/month" />
        </div>
        <div>
          <label htmlFor="ent-procurement" className="mb-1.5 block text-xs font-medium text-foreground-300">Procurement Stage</label>
          <select id="ent-procurement" name="procurementStage" value={formData.procurementStage} onChange={handleChange} className={selectClass()}>
            {PROCUREMENT_STAGE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ent-security" className="mb-1.5 block text-xs font-medium text-foreground-300">Security Review Required?</label>
          <select id="ent-security" name="securityReviewRequired" value={formData.securityReviewRequired} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not-sure">Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="ent-timing" className="mb-1.5 block text-xs font-medium text-foreground-300">Preferred Timing</label>
          <select id="ent-timing" name="preferredTiming" value={formData.preferredTiming} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="immediately">Immediately</option>
            <option value="this-quarter">This quarter</option>
            <option value="next-quarter">Next quarter</option>
            <option value="this-year">This year</option>
            <option value="exploring">Exploring only</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="ent-message" className="mb-1.5 block text-xs font-medium text-foreground-300">Message</label>
        <textarea id="ent-message" name="message" rows={4} maxLength={500} value={formData.message} onChange={handleChange} className={inputClass(errors.message) + " resize-y"} placeholder="Describe your requirements..." />
        <p className="mt-1 text-right text-[10px] text-foreground-600">{formData.message.length}/500</p>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">Preferred Contact Method</label>
        <div className="flex gap-4">
          {(["email", "phone", "either"] as const).map((v) => (
            <label key={v} className="flex items-center gap-2 text-xs text-foreground-400 cursor-pointer">
              <input type="radio" name="preferredContact" value={v} checked={formData.preferredContact === v} onChange={handleChange} className="h-3.5 w-3.5 border-foreground-200/30 text-accent-500 focus:ring-accent-500/30 cursor-pointer" />
              {v === "either" ? "Either" : v.charAt(0).toUpperCase() + v.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div className="mt-5 space-y-3">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">I would like to receive occasional updates about DataHarbour (optional).</span>
        </label>
        <label className={`flex items-start gap-2.5 cursor-pointer ${errors.privacyAck ? "text-red-400" : ""}`}>
          <input type="checkbox" name="privacyAck" checked={formData.privacyAck} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">I understand this is a demonstration only. No live enquiry will be sent. I have read the <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>. <span className="text-red-400">*</span></span>
        </label>
      </div>
    </ContactFormShell>
  );
}

function inputClass(error?: string): string {
  return `w-full rounded-lg border bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:outline-none focus:ring-1 ${error ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30" : "border-foreground-200/20 focus:border-accent-400/50 focus:ring-accent-400/30"}`;
}

function selectClass(): string {
  return "w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30 cursor-pointer";
}