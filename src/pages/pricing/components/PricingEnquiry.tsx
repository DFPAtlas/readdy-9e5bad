import { useState, type FormEvent, type ChangeEvent } from "react";
import { enquiryTypes, teamSizeRanges, procurementTimingOptions } from "@/data/pricing";
import SectionHeading from "@/components/base/SectionHeading";

interface EnquiryFormData {
  fullName: string;
  email: string;
  organisation: string;
  enquiryType: string;
  teamSize: string;
  categoryInterest: string;
  estimatedUsage: string;
  preferredModel: string;
  procurementTiming: string;
  message: string;
  privacyAck: boolean;
}

const initialFormData: EnquiryFormData = {
  fullName: "",
  email: "",
  organisation: "",
  enquiryType: "",
  teamSize: "",
  categoryInterest: "",
  estimatedUsage: "",
  preferredModel: "",
  procurementTiming: "",
  message: "",
  privacyAck: false,
};

export default function PricingEnquiry() {
  const [formData, setFormData] = useState<EnquiryFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [demoRef, setDemoRef] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.organisation.trim()) newErrors.organisation = "Organisation is required";
    if (!formData.enquiryType) newErrors.enquiryType = "Select an enquiry type";
    if (formData.message.length > 500) newErrors.message = "Message must be 500 characters or fewer";
    if (!formData.privacyAck) newErrors.privacyAck = "Privacy acknowledgement is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ref = `DH-DEMO-ENQ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setDemoRef(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <div className="mx-auto max-w-xl rounded-xl border border-accent-300/20 bg-background-50 p-7 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-100/60">
              <i className="ri-information-line text-xl text-accent-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-foreground-100">Demonstration enquiry created</h3>
            <p className="mb-4 text-xs leading-relaxed text-foreground-500">
              Your reference: <span className="font-mono text-foreground-300">{demoRef}</span>
            </p>
            <p className="mb-6 text-xs leading-relaxed text-foreground-500">
              This is a demonstration only. No live enquiry was sent to DataHarbour. The information you entered exists only in this browser session and will be lost when you navigate away.
            </p>
            <div className="rounded-lg border border-foreground-200/10 bg-background-100/40 px-4 py-3 mb-6">
              <p className="text-[11px] leading-relaxed text-foreground-500">
                <strong className="text-foreground-400">Development note:</strong> When Supabase and n8n are connected in a future phase, this form will store enquiries and trigger notification workflows.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData(initialFormData);
                  setErrors({});
                }}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 cursor-pointer"
              >
                Submit another enquiry
              </button>
              <a
                href="/contact/enterprise?topic=pricing"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
              >
                Go to Enterprise Contact
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Pricing Enquiry"
          heading="Ask about pricing and commercial models"
          supporting="Complete this form to explore a demonstration enquiry. No live request is sent in this phase."
        />

        <form onSubmit={handleSubmit} noValidate className="mx-auto mt-10 max-w-2xl rounded-xl border border-foreground-200/10 bg-background-50 p-5 md:p-7">
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pricing-fullName" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Full name <span className="text-red-400">*</span>
              </label>
              <input
                id="pricing-fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:outline-none focus:ring-1 ${
                  errors.fullName
                    ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30"
                    : "border-foreground-200/20 focus:border-accent-400/50 focus:ring-accent-400/30"
                }`}
              />
            </div>

            <div>
              <label htmlFor="pricing-email" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Work email <span className="text-red-400">*</span>
              </label>
              <input
                id="pricing-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:outline-none focus:ring-1 ${
                  errors.email
                    ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30"
                    : "border-foreground-200/20 focus:border-accent-400/50 focus:ring-accent-400/30"
                }`}
              />
            </div>

            <div>
              <label htmlFor="pricing-organisation" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Organisation <span className="text-red-400">*</span>
              </label>
              <input
                id="pricing-organisation"
                name="organisation"
                type="text"
                value={formData.organisation}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:outline-none focus:ring-1 ${
                  errors.organisation
                    ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30"
                    : "border-foreground-200/20 focus:border-accent-400/50 focus:ring-accent-400/30"
                }`}
              />
            </div>

            <div>
              <label htmlFor="pricing-enquiryType" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Enquiry type <span className="text-red-400">*</span>
              </label>
              <select
                id="pricing-enquiryType"
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:outline-none focus:ring-1 cursor-pointer ${
                  errors.enquiryType
                    ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30"
                    : "border-foreground-200/20 focus:border-accent-400/50 focus:ring-accent-400/30"
                }`}
              >
                <option value="">Select enquiry type</option>
                {enquiryTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pricing-teamSize" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Team size
              </label>
              <select
                id="pricing-teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30 cursor-pointer"
              >
                <option value="">Select team size</option>
                {teamSizeRanges.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pricing-categoryInterest" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Product or category of interest
              </label>
              <input
                id="pricing-categoryInterest"
                name="categoryInterest"
                type="text"
                value={formData.categoryInterest}
                onChange={handleChange}
                placeholder="e.g. Business intelligence, location data"
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30"
              />
            </div>

            <div>
              <label htmlFor="pricing-estimatedUsage" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Estimated usage
              </label>
              <input
                id="pricing-estimatedUsage"
                name="estimatedUsage"
                type="text"
                value={formData.estimatedUsage}
                onChange={handleChange}
                placeholder="e.g. 50,000 API calls/month"
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30"
              />
            </div>

            <div>
              <label htmlFor="pricing-preferredModel" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Preferred commercial model
              </label>
              <input
                id="pricing-preferredModel"
                name="preferredModel"
                type="text"
                value={formData.preferredModel}
                onChange={handleChange}
                placeholder="e.g. Subscription, pay-per-use"
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30"
              />
            </div>

            <div>
              <label htmlFor="pricing-procurementTiming" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Procurement timing
              </label>
              <select
                id="pricing-procurementTiming"
                name="procurementTiming"
                value={formData.procurementTiming}
                onChange={handleChange}
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30 cursor-pointer"
              >
                <option value="">Select timing</option>
                {procurementTimingOptions.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="pricing-message" className="mb-1.5 block text-xs font-medium text-foreground-300">
              Message
            </label>
            <textarea
              id="pricing-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
              placeholder="Describe your requirements, questions or context..."
              className={`w-full resize-y rounded-lg border bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:outline-none focus:ring-1 ${
                errors.message
                  ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30"
                  : "border-foreground-200/20 focus:border-accent-400/50 focus:ring-accent-400/30"
              }`}
            />
            <p className="mt-1 text-right text-[10px] text-foreground-600">{formData.message.length}/500</p>
          </div>

          <div className="mt-5 flex items-start gap-2.5">
            <input
              id="pricing-privacyAck"
              name="privacyAck"
              type="checkbox"
              checked={formData.privacyAck}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-foreground-400/30 bg-background-50 text-accent-500 focus:ring-accent-400/30 cursor-pointer"
            />
            <label htmlFor="pricing-privacyAck" className={`text-xs leading-relaxed cursor-pointer ${errors.privacyAck ? "text-red-400" : "text-foreground-500"}`}>
              I understand this is a demonstration and no live enquiry will be sent. <span className="text-red-400">*</span>
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 cursor-pointer"
            >
              Submit demonstration enquiry
              <i className="ri-send-plane-line" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}