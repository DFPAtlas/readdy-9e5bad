import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/base/SectionHeading";

const demoResponse = `{
  "package_id": "dh_business_verify_uk",
  "request_id": "demo_req_1024",
  "result": {
    "organisation_status": "active",
    "verification_level": "standard",
    "confidence": 0.94
  },
  "provenance": [
    "publicly_sourced",
    "derived"
  ],
  "permitted_purpose": "business_onboarding",
  "demo": true
}`;

const tabs = [
  { key: "response", label: "Response" },
  { key: "provenance", label: "Provenance" },
  { key: "usage", label: "Usage" },
  { key: "docs", label: "Documentation" },
];

const tabContent: Record<string, { title: string; text: string }> = {
  response: {
    title: "Sample API Response",
    text: demoResponse,
  },
  provenance: {
    title: "Provenance Fields",
    text: `Each API response includes a provenance array that classifies the origin of each data field:

- publicly_sourced — information obtained from official public records
- derived — computed or inferred from one or more source fields
- licensed — obtained under a data licence agreement
- aggregated — combined from multiple records or sources`,
  },
  usage: {
    title: "Permitted Use",
    text: `API responses include a permitted_purpose field indicating the approved context for the data:

- business_onboarding — verifying company identity during registration
- fraud_review — supporting fraud investigation workflows
- market_analysis — commercial research and planning

The permitted_purpose is set at the package level and enforced through access controls.`,
  },
  docs: {
    title: "API Documentation",
    text: `DataHarbour APIs follow RESTful conventions with JSON responses.

Authentication: API key passed via X-API-Key header
Rate Limiting: Configurable per-organisation limits
Versioning: URL-based versioning (/v1/, /v2/)
Content Type: application/json

Full documentation is available to registered organisations.`,
  },
};

export default function ApiPreview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("response");

  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          heading="Built for controlled integration."
          supporting="DataHarbour APIs are designed with structured responses, provenance metadata and permitted-use context built into every delivery."
        />

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-lg border border-foreground-200/10 bg-background-50">
          {/* Tabs */}
          <div className="flex border-b border-foreground-200/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-xs font-medium transition cursor-pointer ${
                  activeTab === tab.key
                    ? "border-b-2 border-accent-400 text-accent-400"
                    : "text-foreground-500 hover:text-foreground-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-5">
            <h4 className="mb-3 text-xs font-semibold text-foreground-400 uppercase tracking-wide">
              {tabContent[activeTab].title}
            </h4>
            <pre className="overflow-x-auto rounded-md bg-background-950/80 p-4 text-xs text-foreground-200 font-mono leading-relaxed">
              <code>{tabContent[activeTab].text}</code>
            </pre>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/solutions")}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            View API Solutions
          </button>
          <button
            type="button"
            onClick={() => navigate("/resources")}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
          >
            Read Documentation
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}