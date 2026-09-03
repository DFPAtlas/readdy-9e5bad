import { useState, type FormEvent, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import ContactFormShell from "@/pages/contact/components/ContactFormShell";
import ContactConfirmation from "@/pages/contact/components/ContactConfirmation";
import type { TechnicalEnquiryDraft } from "@/data/contactTypes";
import { TECHNICAL_ENQUIRY_DEFAULTS, TECH_AREA_OPTIONS } from "@/data/contactTypes";
import { saveSubmission, generateReference, buildSummary } from "@/utils/contactStorage";

export default function TechnicalSupport() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<TechnicalEnquiryDraft>(() => ({
    ...TECHNICAL_ENQUIRY_DEFAULTS,
    relatedResource: searchParams.get("resource") || "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof TechnicalEnquiryDraft, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [demoRef, setDemoRef] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof TechnicalEnquiryDraft]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TechnicalEnquiryDraft, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please describe your issue or question";
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

    const ref = generateReference("DH-DEMO-TEC");
    const submission = buildSummary({ enquiryType: "technical", data: formData }, ref);
    saveSubmission(submission);
    setDemoRef(ref);
    setSubmittedDate(submission.submittedDate);
    setSummary(submission.summary);
    setSubmitted(true);
  };

  if (submitted) {
    return <ContactConfirmation enquiryType="technical" reference={demoRef} submittedDate={submittedDate} summary={summary} />;
  }

  return (
    <ContactFormShell
      enquiryType="technical"
      title="Technical Support"
      description="API, feed, webhook, schema or integration questions. This is a public pre-account form — it does not create a live support ticket."
      onSubmit={handleSubmit}
      guidance={
        <div className="space-y-2 text-xs text-foreground-500">
          <p className="text-[#ff2e88]"><strong>Never submit real credentials.</strong> Redact personal data. Do not paste complete datasets.</p>
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
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Work Email <span className="text-red-400">*</span></label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass(errors.email)} placeholder="you@organisation.com" autoComplete="email" />
          {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Organisation</label>
          <input name="organisation" type="text" value={formData.organisation} onChange={handleChange} className={inputClass()} placeholder="Your organisation name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Technical Area</label>
          <select name="technicalArea" value={formData.technicalArea} onChange={handleChange} className={selectClass()}>
            {TECH_AREA_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Related Resource</label>
          <input name="relatedResource" type="text" value={formData.relatedResource} onChange={handleChange} className={inputClass()} placeholder="e.g. /resources/webhooks" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Demo Package or Integration</label>
          <input name="demoPackage" type="text" value={formData.demoPackage} onChange={handleChange} className={inputClass()} placeholder="e.g. UK Business Registry API" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Environment</label>
          <select name="environment" value={formData.environment} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="demo">Demonstration only</option>
            <option value="concept">Planning / concept</option>
            <option value="integration">Integration planning</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Issue Category</label>
          <select name="issueCategory" value={formData.issueCategory} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="question">Question</option>
            <option value="bug">Bug</option>
            <option value="docs">Documentation</option>
            <option value="feature">Feature request</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Urgency</label>
          <select name="urgency" value={formData.urgency} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="low">Low — informational</option>
            <option value="medium">Medium — planning</option>
            <option value="high">High — blocking evaluation</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">Short Title</label>
        <input name="shortTitle" type="text" value={formData.shortTitle} onChange={handleChange} className={inputClass()} placeholder="Brief title for your issue..." />
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">Description <span className="text-red-400">*</span></label>
        <textarea name="description" rows={4} maxLength={1000} value={formData.description} onChange={handleChange} className={inputClass(errors.description) + " resize-y"} placeholder="Describe your issue or question in detail..." />
        <p className="mt-1 text-right text-[10px] text-foreground-600">{formData.description.length}/1000</p>
        {errors.description && <p className="mt-1 text-[10px] text-red-400">{errors.description}</p>}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Steps Tried</label>
          <textarea name="stepsTried" rows={2} value={formData.stepsTried} onChange={handleChange} className={inputClass() + " resize-y"} placeholder="Steps already taken..." />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Expected Behaviour</label>
          <textarea name="expectedBehaviour" rows={2} value={formData.expectedBehaviour} onChange={handleChange} className={inputClass() + " resize-y"} placeholder="What you expected to happen..." />
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Observed Behaviour</label>
          <textarea name="observedBehaviour" rows={2} value={formData.observedBehaviour} onChange={handleChange} className={inputClass() + " resize-y"} placeholder="What actually happened..." />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Browser / Runtime Info</label>
          <input name="runtimeInfo" type="text" value={formData.runtimeInfo} onChange={handleChange} className={inputClass()} placeholder="e.g. Chrome 120, Node 20" />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">Fictional or Redacted Error Code / Request ID</label>
        <input name="errorCode" type="text" value={formData.errorCode} onChange={handleChange} className={inputClass()} placeholder="e.g. dh_demo_err_NOT_REAL" />
      </div>
      <div className="mt-5 space-y-3">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">I would like to receive occasional updates about DataHarbour (optional).</span>
        </label>
        <label className={`flex items-start gap-2.5 cursor-pointer ${errors.privacyAck ? "text-red-400" : ""}`}>
          <input type="checkbox" name="privacyAck" checked={formData.privacyAck} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">I understand this is a demonstration only. No live ticket has been created. I have read the <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>. <span className="text-red-400">*</span></span>
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