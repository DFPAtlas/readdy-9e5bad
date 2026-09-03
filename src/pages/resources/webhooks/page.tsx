import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import CodeBlock from "@/pages/resources/components/CodeBlock";
import type { WebhookEvent } from "@/data/resources";

const webhookEvents: WebhookEvent[] = [
  {
    name: "access_request.updated",
    description: "Triggered when an access request changes status — submitted, under review, approved, declined, or conditionally approved.",
    payloadExample: `{
  "id": "evt_7f3a2b_001",
  "type": "access_request.updated",
  "created_at": "2026-07-17T10:30:00Z",
  "data": {
    "request_id": "ar_7f3a2b_2026",
    "package_id": "dh-pkg-demographics-uk-2026",
    "old_status": "submitted",
    "new_status": "approved"
  }
}`,
  },
  {
    name: "package.version_published",
    description: "Triggered when a new schema version is published for a package you have an active licence for.",
    payloadExample: `{
  "id": "evt_7f3a2b_002",
  "type": "package.version_published",
  "created_at": "2026-07-17T06:00:00Z",
  "data": {
    "package_id": "dh-pkg-demographics-uk-2026",
    "old_version": "2.0.0",
    "new_version": "2.1.0",
    "change_summary": "Added household_estimate field. No breaking changes.",
    "is_breaking": false
  }
}`,
  },
  {
    name: "delivery.ready",
    description: "Triggered when a scheduled data delivery is ready for download.",
    payloadExample: `{
  "id": "evt_7f3a2b_003",
  "type": "delivery.ready",
  "created_at": "2026-07-01T06:00:00Z",
  "data": {
    "delivery_id": "del_7f3a2b_2026_07",
    "package_id": "dh-pkg-demographics-uk-2026",
    "delivery_type": "scheduled_feed",
    "file_name": "dh-pkg-demographics-uk-2026_2026-07-01_full.csv.gz",
    "record_count": 2800,
    "checksum_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}`,
  },
  {
    name: "delivery.expiring",
    description: "Triggered when a download URL or delivery access is approaching expiry.",
    payloadExample: `{
  "id": "evt_7f3a2b_004",
  "type": "delivery.expiring",
  "created_at": "2026-07-17T11:00:00Z",
  "data": {
    "delivery_id": "del_7f3a2b_2026_07",
    "package_id": "dh-pkg-demographics-uk-2026",
    "expires_at": "2026-07-17T12:00:00Z"
  }
}`,
  },
  {
    name: "licence.renewal_due",
    description: "Triggered when a product licence is approaching its renewal date.",
    payloadExample: `{
  "id": "evt_7f3a2b_005",
  "type": "licence.renewal_due",
  "created_at": "2026-07-17T00:00:00Z",
  "data": {
    "licence_id": "lic_7f3a2b_demo",
    "package_id": "dh-pkg-demographics-uk-2026",
    "expiry_date": "2026-08-17",
    "days_remaining": 30
  }
}`,
  },
  {
    name: "usage.threshold_reached",
    description: "Triggered when usage reaches a defined percentage of the allowance (e.g. 80%, 90%, 100%).",
    payloadExample: `{
  "id": "evt_7f3a2b_006",
  "type": "usage.threshold_reached",
  "created_at": "2026-07-17T14:00:00Z",
  "data": {
    "package_id": "dh-pkg-demographics-uk-2026",
    "threshold_pct": 90,
    "current_usage": 900,
    "allowance": 1000
  }
}`,
  },
  {
    name: "api_key.revoked",
    description: "Triggered when an API key associated with the organisation is revoked.",
    payloadExample: `{
  "id": "evt_7f3a2b_007",
  "type": "api_key.revoked",
  "created_at": "2026-07-17T09:00:00Z",
  "data": {
    "key_prefix": "dh_demo_key_NOT_REAL",
    "revoked_at": "2026-07-17T09:00:00Z",
    "reason": "manual_rotation"
  }
}`,
  },
  {
    name: "security.notice_created",
    description: "Triggered when DataHarbour publishes a security notice relevant to your organisation or licensed packages.",
    payloadExample: `{
  "id": "evt_7f3a2b_008",
  "type": "security.notice_created",
  "created_at": "2026-07-17T08:00:00Z",
  "data": {
    "notice_id": "sn_7f3a2b_001",
    "severity": "informational",
    "title": "Planned credential-rotation guidance update",
    "summary": "Updated best-practice guidance for API key rotation ..."
  }
}`,
  },
];

export default function Webhooks() {
  const navigate = useNavigate();

  return (
    <>
      <PublicHeader />

      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/resources")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Resources</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Webhooks</li>
          </ol>
        </div>
      </nav>

      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Webhooks</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Event-driven integration concepts
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground-400">
              Understand how webhook events would work in the planned DataHarbour platform. All event types, payloads and examples are fictional demonstration content.
            </p>
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3">
              <p className="text-xs text-foreground-400">All webhook examples are fictional. No live webhook registration or delivery is available.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* Concepts */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Webhook concepts</h2>
              <div className="space-y-4">
                {[
                  { term: "Endpoint registration", desc: "In the planned platform, you would register one or more HTTPS URLs to receive webhook events. Each endpoint would be associated with specific event types and would receive a unique signing secret." },
                  { term: "HTTPS requirement", desc: "All webhook endpoints must use HTTPS. Unencrypted HTTP endpoints would be rejected. Self-signed certificates would not be accepted for production endpoints." },
                  { term: "Signing secret", desc: "Each registered endpoint would receive a unique signing secret (prefixed dh_whsec_). This secret is used to verify that incoming webhook payloads originated from DataHarbour and have not been tampered with." },
                  { term: "Signature verification", desc: "Every webhook request would include an X-DataHarbour-Signature header containing an HMAC-SHA256 signature of the request body. Your receiver should compute the expected signature using the signing secret and compare it using a timing-safe comparison." },
                  { term: "Retry behaviour", desc: "If your endpoint returns a non-2xx response or times out, DataHarbour would retry delivery with exponential back-off. After several failed attempts, the event would be marked as failed and the endpoint may be temporarily disabled." },
                  { term: "Duplicate handling", desc: "Webhook delivery is at-least-once. Your receiver should use the event id field for idempotency to handle potential duplicate deliveries safely." },
                  { term: "Event ordering", desc: "Events are not guaranteed to be delivered in the order they were created. Your integration should not depend on sequential processing of webhook events." },
                  { term: "Logging", desc: "Webhook delivery logs would be available through the GET /webhook-events API endpoint and retained for 90 days." },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
                    <p className="text-sm font-semibold text-foreground-200">{item.term}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature verification example */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Signature verification (pseudocode)</h2>
              <CodeBlock
                language="javascript"
                label="Fictional signature verification"
                code={`// Non-operational demonstration only
const crypto = require("crypto");

function verifySignature(payload, signatureHeader, secret) {
  const computed = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signatureHeader || ""),
    Buffer.from(computed),
  );
}

// Usage in a webhook receiver
app.post("/webhooks/dataharbour", (req, res) => {
  const sig = req.headers["x-dataharbour-signature"];
  if (!verifySignature(req.body, sig, process.env.DATAHARBOUR_WEBHOOK_SECRET)) {
    return res.status(401).send("Invalid signature");
  }
  // Process event...
  res.status(200).send("Accepted");
});`}
              />
            </div>

            {/* Events */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Fictional event types</h2>
              <div className="space-y-4">
                {webhookEvents.map((evt, i) => (
                  <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 overflow-hidden">
                    <div className="p-4">
                      <p className="text-sm font-semibold text-foreground-200 font-mono">{evt.name}</p>
                      <p className="mt-1 text-xs text-foreground-500">{evt.description}</p>
                    </div>
                    <div className="border-t border-foreground-200/10">
                      <CodeBlock language="json" label="Fictional payload example" code={evt.payloadExample} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            <div className="pt-8 border-t border-foreground-200/10">
              <h3 className="text-sm font-semibold text-foreground-300 mb-4">Related resources</h3>
              <div className="flex flex-wrap gap-3">
                {["api-reference", "integration-examples", "data-feeds"].map((slug) => (
                  <button key={slug} type="button" onClick={() => navigate(`/resources/${slug}`)} className="rounded-lg border border-foreground-200/10 bg-background-50 px-4 py-2.5 text-sm text-foreground-300 transition hover:border-primary-400/30 hover:text-foreground-100 cursor-pointer">
                    {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    <i className="ri-arrow-right-line ml-1.5 text-xs text-foreground-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}