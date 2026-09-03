import { useState, type FormEvent, type ChangeEvent } from "react";
import ContactFormShell from "@/pages/contact/components/ContactFormShell";
import ContactConfirmation from "@/pages/contact/components/ContactConfirmation";
import type { GeneralContactDraft } from "@/data/contactTypes";
import { GENERAL_CONTACT_DEFAULTS, GENERAL_TOPIC_OPTIONS } from "@/data/contactTypes";
import { saveSubmission, generateReference, buildSummary } from "@/utils/contactStorage";

export default function GeneralContact() {
  const [formData, setFormData] = useState<GeneralContactDraft>(GENERAL_CONTACT_DEFAULTS);
  const [errors, setErrors] = useState<Partial<Record<keyof GeneralContactDraft, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [demoRef, setDemoRef] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof GeneralContactDraft]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof GeneralContactDraft, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Please provide at least 10 characters";
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

    const ref = generateReference("DH-DEMO-GEN");
    const submission = buildSummary({ enquiryType: "general", data: formData }, ref);
    saveSubmission(submission);
    setDemoRef(ref);
    setSubmittedDate(submission.submittedDate);
    setSummary(submission.summary);
    setSubmitted(true);
  };

  if (submitted) {
    return <ContactConfirmation enquiryType="general" reference={demoRef} submittedDate={submittedDate} summary={summary} />;
  }

  return (
    <ContactFormShell
      enquiryType="general"
      title="General Contact"
      description="Partnerships, media, careers, website feedback or anything not covered by the other enquiry routes."
      onSubmit={handleSubmit}
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
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Email <span className="text-red-400">*</span></label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass(errors.email)} placeholder="you@organisation.com" autoComplete="email" />
          {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Organisation (optional)</label>
          <input name="organisation" type="text" value={formData.organisation} onChange={handleChange} className={inputClass()} placeholder="Your organisation name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground-300">Topic</label>
          <select name="topic" value={formData.topic} onChange={handleChange} className={selectClass()}>
            {GENERAL_TOPIC_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">Subject <span className="text-red-400">*</span></label>
        <input name="subject" type="text" value={formData.subject} onChange={handleChange} className={inputClass(errors.subject)} placeholder="Brief subject for your message" />
        {errors.subject && <p className="mt-1 text-[10px] text-red-400">{errors.subject}</p>}
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-foreground-300">Message <span className="text-red-400">*</span></label>
        <textarea name="message" rows={5} maxLength={500} value={formData.message} onChange={handleChange} className={inputClass(errors.message) + " resize-y"} placeholder="Your message..." />
        <p className="mt-1 text-right text-[10px] text-foreground-600">{formData.message.length}/500</p>
        {errors.message && <p className="mt-1 text-[10px] text-red-400">{errors.message}</p>}
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
          <span className="text-xs leading-relaxed text-foreground-500">I understand this is a demonstration only. No live message has been sent. I have read the <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>. <span className="text-red-400">*</span></span>
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