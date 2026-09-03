import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import CodeBlock from "@/pages/resources/components/CodeBlock";
import type { ApiEndpointDef, ApiParameter, ApiErrorDef } from "@/data/resources";

const methodColors: Record<string, string> = {
  GET: "bg-green-500/15 text-green-400",
  POST: "bg-primary-400/15 text-primary-400",
  PUT: "bg-amber-400/15 text-amber-400",
  PATCH: "bg-accent-400/15 text-accent-400",
  DELETE: "bg-red-400/15 text-red-400",
};

const endpoints: ApiEndpointDef[] = [
  {
    method: "GET",
    path: "/packages",
    purpose: "List accessible packages for the authenticated organisation. Returns basic package metadata with pagination.",
    accessRequirement: "Organisation API key or bearer token",
    parameters: [
      { name: "category", type: "string", location: "query", required: false, description: "Filter by package category slug" },
      { name: "product_type", type: "string", location: "query", required: false, description: "Filter by product type (api, feed, download, report, etc.)" },
      { name: "cursor", type: "string", location: "query", required: false, description: "Pagination cursor for the next page of results" },
      { name: "limit", type: "integer", location: "query", required: false, description: "Maximum results per page (default 20, max 100)" },
      { name: "status", type: "string", location: "query", required: false, description: "Filter by package status (active, deprecated, draft)" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/packages?category=demographics&limit=10"`,
    exampleResponse: `{
  "data": [
    {
      "id": "dh-pkg-demographics-uk-2026",
      "name": "UK Demographics Baseline 2026",
      "product_type": "feed",
      "category": "demographics",
      "supplier": {
        "id": "dh-sup-demo-analytics-ltd",
        "name": "Demo Analytics Ltd"
      },
      "status": "active",
      "created_at": "2026-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "cursor": "cur_nxt_7f3a2b",
    "has_more": true,
    "total_available": 48
  }
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "403", description: "Organisation not verified or access not approved" },
      { code: "422", description: "Invalid filter parameter or combination" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "120 requests per minute per organisation (demonstration tier limit).",
    dataRetentionNote: "Access logs retained for 24 months. No data is returned without an approved access request.",
  },
  {
    method: "GET",
    path: "/packages/{package_id}",
    purpose: "Retrieve full details for a single package, including description, coverage, schema summary, provenance, permitted uses, delivery options and commercial model.",
    accessRequirement: "Organisation API key or bearer token with package scope",
    parameters: [
      { name: "package_id", type: "string", location: "path", required: true, description: "Unique package identifier (e.g. dh-pkg-demographics-uk-2026)" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/packages/dh-pkg-demographics-uk-2026"`,
    exampleResponse: `{
  "id": "dh-pkg-demographics-uk-2026",
  "name": "UK Demographics Baseline 2026",
  "product_type": "feed",
  "category": "demographics",
  "description_short": "Annual demographic estimates for UK postcode areas.",
  "description_full": "Comprehensive demographic baseline ... [fictional content truncated]",
  "coverage": {
    "geography": "United Kingdom",
    "geography_granularity": "postcode_area",
    "record_count_estimate": 2800,
    "refresh_frequency": "annual"
  },
  "schema_version": "2.1.0",
  "status": "active",
  "deprecation_date": null,
  "created_at": "2026-01-15T10:00:00Z",
  "updated_at": "2026-06-01T14:30:00Z"
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "403", description: "Organisation not verified or package access not approved" },
      { code: "404", description: "Package not found or not accessible to this organisation" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "120 requests per minute per organisation.",
    dataRetentionNote: "Access logs retained for 24 months.",
  },
  {
    method: "GET",
    path: "/packages/{package_id}/schema",
    purpose: "Retrieve the full data dictionary for a package, including field names, types, descriptions, nullability, sensitivity classification and schema version.",
    accessRequirement: "Organisation API key or bearer token with package scope",
    parameters: [
      { name: "package_id", type: "string", location: "path", required: true, description: "Unique package identifier" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/packages/dh-pkg-demographics-uk-2026/schema"`,
    exampleResponse: `{
  "package_id": "dh-pkg-demographics-uk-2026",
  "schema_version": "2.1.0",
  "fields": [
    {
      "name": "postcode_area",
      "type": "string",
      "nullable": false,
      "description": "UK postcode area code (e.g. SW, EH, BT)",
      "examples": ["SW", "EH", "BT"],
      "sensitivity": "public",
      "allowed_values": null
    },
    {
      "name": "estimated_population",
      "type": "integer",
      "nullable": true,
      "description": "Estimated resident population for the postcode area",
      "examples": ["245000", "128000"],
      "sensitivity": "public",
      "allowed_values": null
    }
  ]
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "403", description: "Package access not approved" },
      { code: "404", description: "Package not found" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "60 requests per minute per organisation.",
    dataRetentionNote: "Schema data may be retained for documentation purposes.",
  },
  {
    method: "GET",
    path: "/datasets/{dataset_id}/records",
    purpose: "Retrieve data records from a specific dataset associated with an accessible package. Supports cursor-based pagination and optional field selection.",
    accessRequirement: "Organisation API key or bearer token with package scope and active access request",
    parameters: [
      { name: "dataset_id", type: "string", location: "path", required: true, description: "Dataset identifier from the package schema" },
      { name: "fields", type: "string", location: "query", required: false, description: "Comma-separated list of fields to return (default: all permitted fields)" },
      { name: "cursor", type: "string", location: "query", required: false, description: "Pagination cursor" },
      { name: "limit", type: "integer", location: "query", required: false, description: "Records per page (default 100, max 1000)" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/datasets/dh-ds-uk-postcode-demographics/records?limit=50"`,
    exampleResponse: `{
  "data": [
    {
      "record_id": "rec_7f3a2b_001",
      "postcode_area": "SW",
      "estimated_population": 245000,
      "household_estimate": 102000,
      "data_year": 2026
    }
  ],
  "pagination": {
    "cursor": "rec_7f3a2b_051",
    "has_more": true
  },
  "dataset_id": "dh-ds-uk-postcode-demographics",
  "retrieved_at": "2026-07-17T10:30:00Z"
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "403", description: "No active access request for this dataset" },
      { code: "404", description: "Dataset not found" },
      { code: "422", description: "Invalid field selection or limit" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "30 requests per minute per organisation. Additional record-based usage charges may apply.",
    dataRetentionNote: "Records must be deleted per licence terms. Access logs retained for 24 months.",
  },
  {
    method: "POST",
    path: "/access-requests",
    purpose: "Submit a new access request for a data package. Requires a declared purpose, delivery preference and estimated usage.",
    accessRequirement: "Organisation API key or bearer token",
    parameters: [
      { name: "package_id", type: "string", location: "body", required: true, description: "Package identifier to request access to" },
      { name: "declared_purpose", type: "string", location: "body", required: true, description: "Detailed description of intended use (50-2,000 characters)" },
      { name: "delivery_preference", type: "string", location: "body", required: true, description: "api, feed, download, or dashboard" },
      { name: "estimated_monthly_volume", type: "integer", location: "body", required: false, description: "Estimated monthly records or requests" },
      { name: "idempotency_key", type: "string", location: "header", required: false, description: "Idempotency key to prevent duplicate submission" },
    ],
    exampleRequest: `curl -X POST "https://api.demo.dataharbour.example/v1/access-requests" \\
  -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: idem-req-7f3a2b-001" \\
  -d '{
    "package_id": "dh-pkg-demographics-uk-2026",
    "declared_purpose": "Market analysis for UK retail site selection — evaluating postcode-level demographics to inform expansion strategy.",
    "delivery_preference": "api",
    "estimated_monthly_volume": 500
  }'`,
    exampleResponse: `{
  "id": "ar_7f3a2b_2026",
  "package_id": "dh-pkg-demographics-uk-2026",
  "status": "submitted",
  "declared_purpose": "Market analysis for UK retail site selection ...",
  "submitted_at": "2026-07-17T10:30:00Z",
  "next_step": "Your access request will be reviewed. You will be notified of the outcome."
}`,
    possibleErrors: [
      { code: "400", description: "Malformed request body" },
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "403", description: "Organisation not verified" },
      { code: "409", description: "Duplicate idempotency key with different request body" },
      { code: "422", description: "Validation failed — check declared_purpose length and required fields" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "10 access requests per organisation per hour.",
    dataRetentionNote: "Access requests retained for audit purposes per compliance policy.",
  },
  {
    method: "GET",
    path: "/access-requests/{request_id}",
    purpose: "Check the status of a submitted access request.",
    accessRequirement: "Organisation API key or bearer token",
    parameters: [
      { name: "request_id", type: "string", location: "path", required: true, description: "Access request identifier" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/access-requests/ar_7f3a2b_2026"`,
    exampleResponse: `{
  "id": "ar_7f3a2b_2026",
  "package_id": "dh-pkg-demographics-uk-2026",
  "status": "submitted",
  "declared_purpose": "Market analysis for UK retail site selection ...",
  "submitted_at": "2026-07-17T10:30:00Z",
  "reviewed_at": null,
  "outcome": null
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "404", description: "Access request not found" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "60 requests per minute per organisation.",
    dataRetentionNote: "Access request records retained per compliance policy.",
  },
  {
    method: "GET",
    path: "/usage",
    purpose: "Retrieve current usage summary across all active licences, including API call counts, data volume and delivery records.",
    accessRequirement: "Organisation API key or bearer token",
    parameters: [
      { name: "package_id", type: "string", location: "query", required: false, description: "Filter usage to a specific package" },
      { name: "period", type: "string", location: "query", required: false, description: "Billing period: current_month, previous_month, or custom (default: current_month)" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/usage?period=current_month"`,
    exampleResponse: `{
  "organisation_id": "dh-org-demo-retail-corp",
  "period": "2026-07",
  "licences": [
    {
      "package_id": "dh-pkg-demographics-uk-2026",
      "api_calls": 420,
      "records_retrieved": 2800,
      "allowance": 1000,
      "allowance_remaining": 580
    }
  ],
  "total_api_calls": 420,
  "generated_at": "2026-07-17T10:30:00Z"
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "422", description: "Invalid period parameter" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "30 requests per minute per organisation.",
    dataRetentionNote: "Usage records retained for 24 months.",
  },
  {
    method: "GET",
    path: "/deliveries",
    purpose: "List data deliveries for the organisation, including scheduled feeds, downloads and reports.",
    accessRequirement: "Organisation API key or bearer token",
    parameters: [
      { name: "package_id", type: "string", location: "query", required: false, description: "Filter by package" },
      { name: "status", type: "string", location: "query", required: false, description: "Filter by status: pending, delivering, completed, failed" },
      { name: "cursor", type: "string", location: "query", required: false, description: "Pagination cursor" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/deliveries?status=completed"`,
    exampleResponse: `{
  "data": [
    {
      "id": "del_7f3a2b_2026_07",
      "package_id": "dh-pkg-demographics-uk-2026",
      "delivery_type": "scheduled_feed",
      "status": "completed",
      "delivered_at": "2026-07-01T06:00:00Z",
      "file_name": "dh-pkg-demographics-uk-2026_2026-07-01_full.csv.gz",
      "checksum_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "record_count": 2800
    }
  ],
  "pagination": { "cursor": null, "has_more": false, "total_available": 1 }
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "422", description: "Invalid filter parameter" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "60 requests per minute per organisation.",
    dataRetentionNote: "Delivery records retained for 24 months.",
  },
  {
    method: "GET",
    path: "/deliveries/{delivery_id}",
    purpose: "Retrieve details for a specific delivery, including download URL (time-limited) where applicable.",
    accessRequirement: "Organisation API key or bearer token",
    parameters: [
      { name: "delivery_id", type: "string", location: "path", required: true, description: "Delivery identifier" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/deliveries/del_7f3a2b_2026_07"`,
    exampleResponse: `{
  "id": "del_7f3a2b_2026_07",
  "package_id": "dh-pkg-demographics-uk-2026",
  "delivery_type": "scheduled_feed",
  "status": "completed",
  "delivered_at": "2026-07-01T06:00:00Z",
  "file_name": "dh-pkg-demographics-uk-2026_2026-07-01_full.csv.gz",
  "size_bytes": 245760,
  "checksum_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "download_url": "https://delivery.demo.dataharbour.example/del_7f3a2b_2026_07?token=demo_expiring_token",
  "url_expires_at": "2026-07-17T11:30:00Z",
  "record_count": 2800
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "404", description: "Delivery not found" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "60 requests per minute per organisation.",
    dataRetentionNote: "Download URLs expire after 1 hour. Delivery records retained for 24 months.",
  },
  {
    method: "POST",
    path: "/webhook-endpoints",
    purpose: "Register a webhook endpoint URL for receiving event notifications from DataHarbour.",
    accessRequirement: "Organisation API key or bearer token",
    parameters: [
      { name: "url", type: "string", location: "body", required: true, description: "HTTPS URL to receive webhook events" },
      { name: "events", type: "array", location: "body", required: true, description: "List of event types to subscribe to" },
      { name: "description", type: "string", location: "body", required: false, description: "Human-readable label for this endpoint" },
    ],
    exampleRequest: `curl -X POST "https://api.demo.dataharbour.example/v1/webhook-endpoints" \\
  -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/webhooks/dataharbour",
    "events": ["delivery.ready", "licence.renewal_due"],
    "description": "Primary data pipeline webhook"
  }'`,
    exampleResponse: `{
  "id": "wh_7f3a2b_001",
  "url": "https://example.com/webhooks/dataharbour",
  "events": ["delivery.ready", "licence.renewal_due"],
  "signing_secret": "dh_whsec_demo_NOT_A_REAL_SECRET",
  "status": "active",
  "created_at": "2026-07-17T10:30:00Z"
}`,
    possibleErrors: [
      { code: "400", description: "Malformed request body" },
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "422", description: "URL must be HTTPS and reachable. Invalid event type." },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "5 webhook registrations per organisation.",
    dataRetentionNote: "Webhook delivery logs retained for 90 days.",
  },
  {
    method: "GET",
    path: "/webhook-events",
    purpose: "List webhook events delivered to the organisation's registered endpoints, with delivery status.",
    accessRequirement: "Organisation API key or bearer token",
    parameters: [
      { name: "endpoint_id", type: "string", location: "query", required: false, description: "Filter by webhook endpoint" },
      { name: "status", type: "string", location: "query", required: false, description: "Filter by delivery status: delivered, failed, pending" },
      { name: "cursor", type: "string", location: "query", required: false, description: "Pagination cursor" },
    ],
    exampleRequest: `curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  "https://api.demo.dataharbour.example/v1/webhook-events?status=failed"`,
    exampleResponse: `{
  "data": [],
  "pagination": { "cursor": null, "has_more": false, "total_available": 0 }
}`,
    possibleErrors: [
      { code: "401", description: "Authentication missing, invalid or expired" },
      { code: "422", description: "Invalid filter parameter" },
      { code: "429", description: "Rate limit exceeded" },
    ],
    rateLimitNote: "60 requests per minute per organisation.",
    dataRetentionNote: "Webhook event logs retained for 90 days.",
  },
];

export default function ApiReference() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("");

  const filteredEndpoints = useMemo(() => {
    return endpoints.filter((ep) => {
      const q = searchQuery.toLowerCase().trim();
      if (q && !ep.path.toLowerCase().includes(q) && !ep.purpose.toLowerCase().includes(q)) return false;
      if (methodFilter && ep.method !== methodFilter) return false;
      return true;
    });
  }, [searchQuery, methodFilter]);

  return (
    <>
      <PublicHeader />

      {/* Breadcrumb */}
      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/resources")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Resources</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">API Reference</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">API Reference</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Fictional endpoint catalogue
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground-400">
              A searchable reference of planned API endpoints. All endpoints, parameters and responses are fictional demonstration content.
            </p>
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3">
              <p className="text-xs text-foreground-400">
                All endpoints use the fictional base URL <code className="bg-foreground-200/10 px-1 rounded text-foreground-300 text-[11px]">https://api.demo.dataharbour.example/v1</code>. No real API access is available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1 max-w-md">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-500 text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search endpoints..."
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 py-2.5 pl-9 pr-3 text-sm text-foreground-200 placeholder:text-foreground-500 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20"
                aria-label="Search endpoints"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["", "GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethodFilter(m)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    methodFilter === m
                      ? "bg-primary-500 text-background-950"
                      : "border border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40"
                  }`}
                >
                  {m || "All methods"}
                </button>
              ))}
            </div>
          </div>

          {filteredEndpoints.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-foreground-400">No endpoints match your search.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEndpoints.map((ep, i) => (
                <EndpointCard key={i} endpoint={ep} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PublicFooter />
    </>
  );
}

function EndpointCard({ endpoint }: { endpoint: ApiEndpointDef }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-foreground-200/10 bg-background-50 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left transition hover:bg-background-100/50 cursor-pointer"
        aria-expanded={expanded}
      >
        <span className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-bold uppercase ${methodColors[endpoint.method] || "bg-foreground-200/10 text-foreground-400"}`}>
          {endpoint.method}
        </span>
        <div className="min-w-0 flex-1">
          <code className="text-sm font-mono text-foreground-200 break-all">{endpoint.path}</code>
          <p className="mt-1 text-xs text-foreground-500">{endpoint.purpose}</p>
        </div>
        <i className={`ri-arrow-down-s-line text-foreground-400 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="border-t border-foreground-200/10 p-4 space-y-5">
          <div>
            <p className="text-xs font-semibold text-foreground-300 mb-2">Access required</p>
            <p className="text-xs text-foreground-400">{endpoint.accessRequirement}</p>
          </div>

          {endpoint.parameters.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-foreground-300 mb-2">Parameters</p>
              <div className="overflow-x-auto rounded border border-foreground-200/10">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-foreground-200/10 bg-foreground-200/5">
                      <th className="px-3 py-2 text-left text-foreground-300">Name</th>
                      <th className="px-3 py-2 text-left text-foreground-300">Type</th>
                      <th className="px-3 py-2 text-left text-foreground-300">Location</th>
                      <th className="px-3 py-2 text-left text-foreground-300">Required</th>
                      <th className="px-3 py-2 text-left text-foreground-300">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((p) => (
                      <tr key={p.name} className="border-b border-foreground-200/10 last:border-0">
                        <td className="px-3 py-2 font-mono text-foreground-200">{p.name}</td>
                        <td className="px-3 py-2 text-foreground-400">{p.type}</td>
                        <td className="px-3 py-2 text-foreground-400">{p.location}</td>
                        <td className="px-3 py-2">{p.required ? <span className="text-secondary-400">Yes</span> : <span className="text-foreground-600">No</span>}</td>
                        <td className="px-3 py-2 text-foreground-500">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-foreground-300 mb-2">Example request</p>
            <CodeBlock language="bash" code={endpoint.exampleRequest} />
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground-300 mb-2">Example response</p>
            <CodeBlock language="json" code={endpoint.exampleResponse} />
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground-300 mb-2">Possible errors</p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {endpoint.possibleErrors.map((err) => (
                <div key={err.code} className="flex items-start gap-2 text-xs">
                  <span className="shrink-0 font-mono text-secondary-400">{err.code}</span>
                  <span className="text-foreground-500">{err.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded bg-foreground-200/5 p-3">
              <p className="text-[11px] font-semibold text-foreground-400 mb-1">Rate limits</p>
              <p className="text-xs text-foreground-500">{endpoint.rateLimitNote}</p>
            </div>
            <div className="rounded bg-foreground-200/5 p-3">
              <p className="text-[11px] font-semibold text-foreground-400 mb-1">Data retention</p>
              <p className="text-xs text-foreground-500">{endpoint.dataRetentionNote}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}