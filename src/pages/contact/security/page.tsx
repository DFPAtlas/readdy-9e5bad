import { useState, type FormEvent, type ChangeEvent } from "react";
import ContactFormShell from "@/pages/contact/components/ContactFormShell";
import ContactConfirmation from "@/pages/contact/components/ContactConfirmation";
import type { SecurityEnquiryDraft } from "@/data/contactTypes";
import { SECURITY_ENQUIRY_DEFAULTS, SECURITY_ISSUE_TYPE_OPTIONS, DISCLOSURE_PREFERENCE_OPTIONS } from "@/data/contactTypes";
import { saveSubmission, generateReference, buildSummary } from "@/utils/contactStorage";

export default function SecurityReport() {
  const [formData, setFormData] = useState<SecurityEnquiryDraft>(SECURITY_ENQUIRY_DEFAULTS);
  const [errors, setErrors] = useState<Partial<Record<keyof SecurityEnquiryDraft, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [demoRef, setDemoRef] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof SecurityEnquiryDraft]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SecurityEnquiryDraft, string>> = {};
    if (!formData.reporterName.trim()) newErrors.reporterName = "Reporter name or 'Anonymous' is required";
    if (formData.reporterEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reporterEmail)) {
      newErrors.reporterEmail = "Enter a valid email address";
    }
    if (!formData.description.trim()) {
      newErrors.description = "A description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Please provide at least 10 characters";
    }
    if (formData.description.length > 1000) newErrors.description = "Description must be 1,000 characters or fewer";
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

    const ref = generateReference("DH-DEMO-SEC");
    const submission = buildSummary({ enquiryType: "security", data: formData }, ref);
    saveSubmission(submission);
    setDemoRef(ref);
    setSubmittedDate(submission.submittedDate);
    setSummary(submission.summary);
    setSubmitted(true);
  };

  if (submitted) {
    return <ContactConfirmation enquiryType="security" reference={demoRef} submittedDate={submittedDate} summary={summary} />;
  }

  return (
    <ContactFormShell
      enquiryType="security"
      title="Security Report"
      description="Report a security concern, vulnerability or suspicious activity. This demonstration form is not monitored."
      onSubmit={handleSubmit}
      guidance={
        <div className="space-y-2 text-xs text-foreground-500">
          <p className="text-[#ff2e88]">
            <strong>Do not exploit or access data unnecessarily.</strong> Do not upload malware. Do not include secrets. Do not publish unresolved issues through this form.
          </p>
          <p>This demonstration form is not monitored. In a future phase, reports will be triaged securely.</p>
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
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Reporter Name (or "Anonymous") <span className="text-red-400">*</span></label>
          <input name="reporterName" type="text" value={formData.reporterName} onChange={handleChange} className={inputClass(errors.reporterName)} placeholder="Your name or Anonymous" />
          {errors.reporterName && <p className="mt-1 text-[10px] text-red-400">{errors.reporterName}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Contact Email (if follow-up wanted)</label>
          <input name="reporterEmail" type="email" value={formData.reporterEmail} onChange={handleChange} className={inputClass(errors.reporterEmail)} placeholder="you@organisation.com" autoComplete="email" />
          {errors.reporterEmail && <p className="mt-1 text-[10px] text-red-400">{errors.reporterEmail}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Organisation</label>
          <input name="organisation" type="text" value={formData.organisation} onChange={handleChange} className={inputClass()} placeholder="Your organisation name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Issue Type</label>
          <select name="issueType" value={formData.issueType} onChange={handleChange} className={selectClass()}>
            {SECURITY_ISSUE_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Affected Public Page or Feature</label>
          <input name="affectedPage" type="text" value={formData.affectedPage} onChange={handleChange} className={inputClass()} placeholder="e.g. /suppliers/apply" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Discovery Date</label>
          <input name="discoveryDate" type="date" value={formData.discoveryDate} onChange={handleChange} className={inputClass()} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Disclosure Preference</label>
          <select name="disclosurePreference" value={formData.disclosurePreference} onChange={handleChange} className={selectClass()}>
            {DISCLOSURE_PREFERENCE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Is This Ongoing?</label>
          <select name="isOngoing" value={formData.isOngoing} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">High-Level Description <span className="text-red-400">*</span></label>
        <textarea name="description" rows={4} maxLength={1000} value={formData.description} onChange={handleChange} className={inputClass(errors.description) + " resize-y"} placeholder="Describe the issue. Do not include credentials, stolen data or malware." />
        <p className="mt-1 text-right text-[10px] text-foreground-600">{formData.description.length}/1000</p>
        {errors.description && <p className="mt-1 text-[10px] text-red-400">{errors.description}</p>}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Potential Impact</label>
          <textarea name="potentialImpact" rows={2} value={formData.potentialImpact} onChange={handleChange} className={inputClass() + " resize-y"} placeholder="What could the impact be?" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Safe Reproduction Summary</label>
          <textarea name="safeReproduction" rows={2} value={formData.safeReproduction} onChange={handleChange} className={inputClass() + " resize-y"} placeholder="How can this be safely reproduced?" />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">Could Sensitive Information Be Involved?</label>
        <select name="sensitiveInvolved" value={formData.sensitiveInvolved} onChange={handleChange} className={selectClass()}>
          <option value="">Select...</option>
          <option value="yes">Yes — but not detailed here</option>
          <option value="no">No</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="mt-5 space-y-3">
        <label className={`flex items-start gap-2.5 cursor-pointer ${errors.privacyAck ? "text-red-400" : ""}`}>
          <input type="checkbox" name="privacyAck" checked={formData.privacyAck} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">I understand this is a demonstration only. This form is not monitored. I have read the <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>. <span className="text-red-400">*</span></span>
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