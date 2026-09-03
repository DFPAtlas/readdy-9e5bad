import { useState, type FormEvent, type ChangeEvent } from "react";
import ContactFormShell from "@/pages/contact/components/ContactFormShell";
import ContactConfirmation from "@/pages/contact/components/ContactConfirmation";
import type { DataSubjectRequestDraft } from "@/data/contactTypes";
import { DATA_SUBJECT_REQUEST_DEFAULTS, DSR_REQUEST_TYPE_OPTIONS } from "@/data/contactTypes";
import { saveSubmission, generateReference, buildSummary } from "@/utils/contactStorage";

export default function DataSubjectRequest() {
  const [formData, setFormData] = useState<DataSubjectRequestDraft>(DATA_SUBJECT_REQUEST_DEFAULTS);
  const [errors, setErrors] = useState<Partial<Record<keyof DataSubjectRequestDraft, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [demoRef, setDemoRef] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof DataSubjectRequestDraft]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DataSubjectRequestDraft, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.requestType) newErrors.requestType = "Select a request type";
    if (!formData.description.trim()) {
      newErrors.description = "Please describe your request";
    } else if (formData.description.length < 10) {
      newErrors.description = "Please provide at least 10 characters";
    }
    if (formData.description.length > 500) newErrors.description = "Description must be 500 characters or fewer";
    if (!formData.identityVerificationAck) newErrors.identityVerificationAck = "Identity-verification acknowledgement is required";
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

    const ref = generateReference("DH-DEMO-DSR");
    const submission = buildSummary({ enquiryType: "data-subject", data: formData }, ref);
    saveSubmission(submission);
    setDemoRef(ref);
    setSubmittedDate(submission.submittedDate);
    setSummary(submission.summary);
    setSubmitted(true);
  };

  if (submitted) {
    return <ContactConfirmation enquiryType="data-subject" reference={demoRef} submittedDate={submittedDate} summary={summary} />;
  }

  return (
    <ContactFormShell
      enquiryType="data-subject"
      title="Data-Subject Request"
      description="Exercise your data-subject rights: access, correction, deletion, restriction, objection or portability. This demonstration does not process your request."
      onSubmit={handleSubmit}
      guidance={
        <div className="space-y-2 text-xs text-foreground-500">
          <p><strong className="text-foreground-300">Do not upload identity documents.</strong> Identity verification may be required separately in a future phase. The responsible organisation (DataHarbour or specific supplier) may vary depending on the data concerned.</p>
          <p>Related: <a href="/compliance/data-subject-rights" className="text-primary-400 hover:text-primary-300 underline">Data-Subject Rights</a> · <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a></p>
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
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Full Name <span className="text-red-400">*</span></label>
          <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} className={inputClass(errors.fullName)} placeholder="Your full name" />
          {errors.fullName && <p className="mt-1 text-[10px] text-red-400">{errors.fullName}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Contact Email <span className="text-red-400">*</span></label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass(errors.email)} placeholder="you@example.com" autoComplete="email" />
          {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Request Type <span className="text-red-400">*</span></label>
          <select name="requestType" value={formData.requestType} onChange={handleChange} className={selectClass()}>
            <option value="">Select request type...</option>
            {DSR_REQUEST_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {errors.requestType && <p className="mt-1 text-[10px] text-red-400">{errors.requestType}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Relationship to DataHarbour or Supplier</label>
          <input name="relationship" type="text" value={formData.relationship} onChange={handleChange} className={inputClass()} placeholder="e.g. Customer, website visitor" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Relevant Organisation or Package</label>
          <input name="relevantOrg" type="text" value={formData.relevantOrg} onChange={handleChange} className={inputClass()} placeholder="e.g. DataHarbour, supplier name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Preferred Contact Method</label>
          <div className="flex gap-4 pt-1">
            {(["email", "phone", "either"] as const).map((v) => (
              <label key={v} className="flex items-center gap-2 text-xs text-foreground-400 cursor-pointer">
                <input type="radio" name="preferredContact" value={v} checked={formData.preferredContact === v} onChange={handleChange} className="h-3.5 w-3.5 border-foreground-200/30 text-accent-500 focus:ring-accent-500/30 cursor-pointer" />
                {v === "either" ? "Either" : v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">Description of Request <span className="text-red-400">*</span></label>
        <textarea name="description" rows={4} maxLength={500} value={formData.description} onChange={handleChange} className={inputClass(errors.description) + " resize-y"} placeholder="Describe what you are requesting and any relevant context..." />
        <p className="mt-1 text-right text-[10px] text-foreground-600">{formData.description.length}/500</p>
        {errors.description && <p className="mt-1 text-[10px] text-red-400">{errors.description}</p>}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Acting for Another Person?</label>
          <select name="actingForOther" value={formData.actingForOther} onChange={handleChange} className={selectClass()}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        {formData.actingForOther === "yes" && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground-300">Authority Explanation</label>
            <input name="authorityExplanation" type="text" value={formData.authorityExplanation} onChange={handleChange} className={inputClass()} placeholder="e.g. Legal representative, parent" />
          </div>
        )}
      </div>
      <div className="mt-5 space-y-3">
        <label className={`flex items-start gap-2.5 cursor-pointer ${errors.identityVerificationAck ? "text-red-400" : ""}`}>
          <input type="checkbox" name="identityVerificationAck" checked={formData.identityVerificationAck} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">I understand that identity verification may be required before this request can be processed. <span className="text-red-400">*</span></span>
        </label>
        {errors.identityVerificationAck && <p className="text-[10px] text-red-400">{errors.identityVerificationAck}</p>}
        <label className={`flex items-start gap-2.5 cursor-pointer ${errors.privacyAck ? "text-red-400" : ""}`}>
          <input type="checkbox" name="privacyAck" checked={formData.privacyAck} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">I understand this is a demonstration only. No request has been processed. I have read the <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>. <span className="text-red-400">*</span></span>
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