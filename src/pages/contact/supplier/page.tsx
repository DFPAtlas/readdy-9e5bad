import { useState, type FormEvent, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import ContactFormShell from "@/pages/contact/components/ContactFormShell";
import ContactConfirmation from "@/pages/contact/components/ContactConfirmation";
import type { SupplierEnquiryDraft } from "@/data/contactTypes";
import { SUPPLIER_ENQUIRY_DEFAULTS, SUPPLIER_ENQUIRY_TOPIC_OPTIONS } from "@/data/contactTypes";
import { saveSubmission, generateReference, buildSummary } from "@/utils/contactStorage";

export default function SupplierEnquiry() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<SupplierEnquiryDraft>(() => ({
    ...SUPPLIER_ENQUIRY_DEFAULTS,
    enquiryTopic: searchParams.get("topic") || "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof SupplierEnquiryDraft, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [demoRef, setDemoRef] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof SupplierEnquiryDraft]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SupplierEnquiryDraft, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
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

    const ref = generateReference("DH-DEMO-SUP");
    const submission = buildSummary({ enquiryType: "supplier", data: formData }, ref);
    saveSubmission(submission);
    setDemoRef(ref);
    setSubmittedDate(submission.submittedDate);
    setSummary(submission.summary);
    setSubmitted(true);
  };

  if (submitted) {
    return <ContactConfirmation enquiryType="supplier" reference={demoRef} submittedDate={submittedDate} summary={summary} />;
  }

  return (
    <ContactFormShell
      enquiryType="supplier"
      title="Supplier Enquiry"
      description="Ask about product suitability, standards, guidelines or the application process. No application decision is implied."
      onSubmit={handleSubmit}
      guidance={
        <div className="space-y-2 text-xs text-foreground-500">
          <p>Related: <a href="/suppliers/standards" className="text-primary-400 hover:text-primary-300 underline">Supplier Standards</a> · <a href="/suppliers/package-guidelines" className="text-primary-400 hover:text-primary-300 underline">Package Guidelines</a> · <a href="/suppliers/apply" className="text-primary-400 hover:text-primary-300 underline">Apply</a></p>
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
          <label htmlFor="sup-fullName" className="mb-1.5 block text-xs font-medium text-foreground-300">Full Name <span className="text-red-400">*</span></label>
          <input id="sup-fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Your full name" className={inputClass(errors.fullName)} />
          {errors.fullName && <p className="mt-1 text-[10px] text-red-400">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="sup-email" className="mb-1.5 block text-xs font-medium text-foreground-300">Work Email <span className="text-red-400">*</span></label>
          <input id="sup-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@organisation.com" autoComplete="email" className={inputClass(errors.email)} />
          {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="sup-organisation" className="mb-1.5 block text-xs font-medium text-foreground-300">Organisation</label>
          <input id="sup-organisation" name="organisation" type="text" value={formData.organisation} onChange={handleChange} placeholder="Your organisation name" className={inputClass()} />
        </div>
        <div>
          <label htmlFor="sup-jobTitle" className="mb-1.5 block text-xs font-medium text-foreground-300">Job Title</label>
          <input id="sup-jobTitle" name="jobTitle" type="text" value={formData.jobTitle} onChange={handleChange} placeholder="Your role" className={inputClass()} />
        </div>
        <div>
          <label htmlFor="sup-website" className="mb-1.5 block text-xs font-medium text-foreground-300">Website</label>
          <input id="sup-website" name="website" type="text" value={formData.website} onChange={handleChange} placeholder="https://" className={inputClass()} />
        </div>
        <div>
          <label htmlFor="sup-topic" className="mb-1.5 block text-xs font-medium text-foreground-300">Enquiry Topic</label>
          <select id="sup-topic" name="enquiryTopic" value={formData.enquiryTopic} onChange={handleChange} className={selectClass()}>
            {SUPPLIER_ENQUIRY_TOPIC_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sup-productType" className="mb-1.5 block text-xs font-medium text-foreground-300">Proposed Product Type</label>
          <input id="sup-productType" name="proposedProductType" type="text" value={formData.proposedProductType} onChange={handleChange} placeholder="e.g. API, dataset" className={inputClass()} />
        </div>
        <div>
          <label htmlFor="sup-appRef" className="mb-1.5 block text-xs font-medium text-foreground-300">Local Application Reference</label>
          <input id="sup-appRef" name="applicationReference" type="text" value={formData.applicationReference} onChange={handleChange} placeholder="e.g. DH-DEMO-SUP-ABC123" className={inputClass()} />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="sup-productSummary" className="mb-1.5 block text-xs font-medium text-foreground-300">Product Summary</label>
        <textarea id="sup-productSummary" name="productSummary" rows={2} maxLength={500} value={formData.productSummary} onChange={handleChange} placeholder="Brief summary of your proposed product..." className={inputClass() + " resize-y"} />
      </div>
      <div className="mt-4">
        <label htmlFor="sup-question" className="mb-1.5 block text-xs font-medium text-foreground-300">Commercial or Standards Question</label>
        <textarea id="sup-question" name="detailedQuestion" rows={2} maxLength={500} value={formData.detailedQuestion} onChange={handleChange} placeholder="Your specific question..." className={inputClass() + " resize-y"} />
      </div>
      <div className="mt-4">
        <label htmlFor="sup-message" className="mb-1.5 block text-xs font-medium text-foreground-300">Message</label>
        <textarea id="sup-message" name="message" rows={3} maxLength={500} value={formData.message} onChange={handleChange} placeholder="Additional details..." className={inputClass(errors.message) + " resize-y"} />
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