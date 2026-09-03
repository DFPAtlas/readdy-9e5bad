import { useState, type FormEvent, type ChangeEvent, type ReactNode } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ContactFormShell from "@/pages/contact/components/ContactFormShell";
import ContactConfirmation from "@/pages/contact/components/ContactConfirmation";
import type { BuyerEnquiryDraft } from "@/data/contactTypes";
import { BUYER_ENQUIRY_DEFAULTS } from "@/data/contactTypes";
import { saveSubmission, generateReference, buildSummary } from "@/utils/contactStorage";

export default function BuyerEnquiry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<BuyerEnquiryDraft>(() => ({
    ...BUYER_ENQUIRY_DEFAULTS,
    packageInterest: searchParams.get("package") || "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof BuyerEnquiryDraft, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [demoRef, setDemoRef] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof BuyerEnquiryDraft]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BuyerEnquiryDraft, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.intendedUse.trim()) {
      newErrors.intendedUse = "Please describe your intended business use";
    } else if (formData.intendedUse.length < 10) {
      newErrors.intendedUse = "Please provide at least 10 characters";
    }
    if (formData.message.length > 500) newErrors.message = "Message must be 500 characters or fewer";
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) newErrors.website = "Enter a valid URL (starting with https://)";
    if (!formData.privacyAck) newErrors.privacyAck = "Privacy acknowledgement is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phoneAlt = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value?.trim() || "";
    if (phoneAlt) {
      setSubmitted(true);
      return;
    }

    if (!validate()) return;

    const ref = generateReference("DH-DEMO-BUY");
    const submission = buildSummary({ enquiryType: "buyer", data: formData }, ref);
    saveSubmission(submission);
    setDemoRef(ref);
    setSubmittedDate(submission.submittedDate);
    setSummary(submission.summary);
    setSubmitted(true);
  };

  if (submitted) {
    return <ContactConfirmation enquiryType="buyer" reference={demoRef} submittedDate={submittedDate} summary={summary} />;
  }

  return (
    <ContactFormShell
      enquiryType="buyer"
      title="Buyer and Product Enquiry"
      description="Ask about marketplace products, licensing, delivery or access requirements. This enquiry does not grant product access."
      onSubmit={handleSubmit}
      guidance={
        <div className="space-y-2 text-xs text-foreground-500">
          <p>This enquiry <strong className="text-foreground-300">does not grant access</strong> to products. Verified organisation onboarding and live access requests will be available in a future platform phase.</p>
          <p className="flex flex-wrap items-center gap-2">
            <span>Related:</span>
            <a href="/marketplace" className="text-primary-400 hover:text-primary-300 underline">Marketplace</a>
            <span>·</span>
            <a href="/compliance" className="text-primary-400 hover:text-primary-300 underline">Compliance Centre</a>
          </p>
        </div>
      }
    >
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 rounded-lg border border-red-400/30 bg-red-50/50 px-4 py-3" role="alert">
          <p className="mb-2 text-xs font-medium text-red-700">Please correct the following:</p>
          <ul className="space-y-1">
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key} className="text-xs text-red-600">{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
        <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" readOnly />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" required error={errors.fullName}>
          <input id="buyer-fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Your full name" className={inputClass(errors.fullName)} />
        </Field>
        <Field label="Work Email" name="email" required error={errors.email}>
          <input id="buyer-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@organisation.com" autoComplete="email" className={inputClass(errors.email)} />
        </Field>
        <Field label="Organisation" name="organisation">
          <input id="buyer-organisation" name="organisation" type="text" value={formData.organisation} onChange={handleChange} placeholder="Your organisation name" className={inputClass()} />
        </Field>
        <Field label="Job Title" name="jobTitle">
          <input id="buyer-jobTitle" name="jobTitle" type="text" value={formData.jobTitle} onChange={handleChange} placeholder="Your role" className={inputClass()} />
        </Field>
        <Field label="Organisation Website" name="website" error={errors.website}>
          <input id="buyer-website" name="website" type="text" value={formData.website} onChange={handleChange} placeholder="https://" className={inputClass(errors.website)} />
        </Field>
        <Field label="Product or Package of Interest" name="packageInterest">
          <input id="buyer-packageInterest" name="packageInterest" type="text" value={formData.packageInterest} onChange={handleChange} placeholder="e.g. UK Business Registry Enrichment" className={inputClass()} />
        </Field>
        <Field label="Data Category" name="dataCategory">
          <input id="buyer-dataCategory" name="dataCategory" type="text" value={formData.dataCategory} onChange={handleChange} placeholder="e.g. Business intelligence" className={inputClass()} />
        </Field>
        <Field label="Required Geography" name="requiredGeography">
          <input id="buyer-geography" name="requiredGeography" type="text" value={formData.requiredGeography} onChange={handleChange} placeholder="e.g. UK, EMEA" className={inputClass()} />
        </Field>
        <Field label="Preferred Delivery Format" name="preferredDelivery">
          <select id="buyer-delivery" name="preferredDelivery" value={formData.preferredDelivery} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="api">API</option>
            <option value="csv">CSV / File Download</option>
            <option value="feed">Scheduled Feed</option>
            <option value="dashboard">Dashboard</option>
            <option value="report">Research Report</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Estimated Volume" name="estimatedVolume">
          <input id="buyer-volume" name="estimatedVolume" type="text" value={formData.estimatedVolume} onChange={handleChange} placeholder="e.g. 10,000 records/month" className={inputClass()} />
        </Field>
        <Field label="Desired Timing" name="desiredTiming">
          <select id="buyer-timing" name="desiredTiming" value={formData.desiredTiming} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="immediately">Immediately</option>
            <option value="this-quarter">This quarter</option>
            <option value="next-quarter">Next quarter</option>
            <option value="this-year">This year</option>
            <option value="exploring">Exploring only</option>
          </select>
        </Field>
        <Field label="Existing Account" name="existingAccount">
          <select id="buyer-existing" name="existingAccount" value={formData.existingAccount} onChange={handleChange} className={selectClass()}>
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not-sure">Not sure</option>
          </select>
        </Field>
        <Field label="Procurement Requirements" name="procurementRequirements">
          <input id="buyer-procurement" name="procurementRequirements" type="text" value={formData.procurementRequirements} onChange={handleChange} placeholder="e.g. Standard procurement process" className={inputClass()} />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Intended Business Use" name="intendedUse" required error={errors.intendedUse}>
          <textarea id="buyer-intendedUse" name="intendedUse" rows={3} maxLength={500} value={formData.intendedUse} onChange={handleChange} placeholder="Describe how your organisation intends to use this data product..." className={inputClass(errors.intendedUse) + " resize-y"} />
          <p className="mt-1 text-right text-[10px] text-foreground-600">{formData.intendedUse.length}/500</p>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message" name="message" error={errors.message}>
          <textarea id="buyer-message" name="message" rows={3} maxLength={500} value={formData.message} onChange={handleChange} placeholder="Additional details or questions..." className={inputClass(errors.message) + " resize-y"} />
          <p className="mt-1 text-right text-[10px] text-foreground-600">{formData.message.length}/500</p>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Preferred Contact Method" name="preferredContact">
          <div className="flex gap-4">
            {(["email", "phone", "either"] as const).map((v) => (
              <label key={v} className="flex items-center gap-2 text-xs text-foreground-400 cursor-pointer">
                <input type="radio" name="preferredContact" value={v} checked={formData.preferredContact === v} onChange={handleChange} className="h-3.5 w-3.5 border-foreground-200/30 text-accent-500 focus:ring-accent-500/30 cursor-pointer" />
                {v === "either" ? "Either" : v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-5 space-y-3">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">I would like to receive occasional updates about DataHarbour (optional).</span>
        </label>
        <label className={`flex items-start gap-2.5 cursor-pointer ${errors.privacyAck ? "text-red-400" : ""}`}>
          <input type="checkbox" name="privacyAck" checked={formData.privacyAck} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer flex-shrink-0" />
          <span className="text-xs leading-relaxed text-foreground-500">
            I understand this is a demonstration only. No live enquiry will be sent to DataHarbour. I have read the <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>. <span className="text-red-400">*</span>
          </span>
        </label>
      </div>
    </ContactFormShell>
  );
}

// -- Inline helpers --

function Field({ label, name, required, error, children }: { label: string; name: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={`buyer-${name}`} className="mb-1.5 block text-xs font-medium text-foreground-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function inputClass(error?: string): string {
  return `w-full rounded-lg border bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:outline-none focus:ring-1 ${
    error ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30" : "border-foreground-200/20 focus:border-accent-400/50 focus:ring-accent-400/30"
  }`;
}

function selectClass(): string {
  return "w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30 cursor-pointer";
}