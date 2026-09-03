export interface ResourceArticle {
  slug: string;
  title: string;
  eyebrow?: string;
  summary: string;
  category: string;
  audience: string[];
  status: "Demonstration documentation" | "Planned" | "Draft" | "Concept preview";
  lastUpdatedDisplay: string;
  sections: ResourceSection[];
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface ResourceSection {
  id: string;
  heading: string;
  content: string;
  contentType?: "text" | "steps" | "checklist" | "code" | "endpoint" | "table" | "glossary" | "faq" | "callout" | "webhook" | "feed";
  items?: ResourceSectionItem[];
  code?: CodeExample;
  endpoint?: ApiEndpointDef;
  table?: ResourceTable;
  glossaryTerms?: GlossaryTerm[];
  events?: WebhookEvent[];
  feedFormats?: FeedFormat[];
  calloutType?: "info" | "warning" | "tip" | "demonstration" | "planned";
  checklistItems?: string[];
  steps?: ResourceStep[];
}

export interface ResourceStep {
  label: string;
  description: string;
  planned?: boolean;
}

export interface ResourceSectionItem {
  term?: string;
  description: string;
  children?: ResourceSectionItem[];
}

export interface CodeExample {
  language: string;
  code: string;
  label?: string;
}

export interface ApiEndpointDef {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  purpose: string;
  accessRequirement: string;
  parameters: ApiParameter[];
  exampleRequest: string;
  exampleResponse: string;
  possibleErrors: ApiErrorDef[];
  rateLimitNote: string;
  dataRetentionNote: string;
}

export interface ApiParameter {
  name: string;
  type: string;
  location: "path" | "query" | "header" | "body";
  required: boolean;
  description: string;
}

export interface ApiErrorDef {
  code: string;
  description: string;
}

export interface ResourceTable {
  headers: string[];
  rows: string[][];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface WebhookEvent {
  name: string;
  description: string;
  payloadExample: string;
}

export interface FeedFormat {
  name: string;
  description: string;
  typicalUse: string;
  deliveryNote: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  type: "Added" | "Changed" | "Deprecated" | "Fixed" | "Security notice" | "Documentation";
  description: string;
  relatedSlug?: string;
}

export interface ServiceStatusItem {
  name: string;
  status: "Demonstration only" | "Planned" | "Operational preview" | "Maintenance example" | "Incident example";
  description: string;
}

export interface ResourceCategory {
  slug: string;
  title: string;
  description: string;
  audience: string;
  status: string;
}

export interface FeaturedGuide {
  slug: string;
  title: string;
  description: string;
  audience: string;
  iconClass: string;
}

export interface AudiencePath {
  slug: string;
  title: string;
  description: string;
  guides: string[];
}

export interface ResourceFaq {
  question: string;
  answer: string;
}

// ─── Resource Categories ───────────────────────────────────────────────

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Understand the platform, prerequisites, organisation verification and your first integration.",
    audience: "All audiences",
    status: "Demonstration documentation",
  },
  {
    slug: "api-overview",
    title: "API Concepts",
    description: "REST-style API design, versioning, pagination, filtering, rate limits and error handling.",
    audience: "Developers, Data engineers",
    status: "Concept preview",
  },
  {
    slug: "authentication",
    title: "Authentication",
    description: "API keys, bearer tokens, key rotation, revocation, least privilege and secret storage.",
    audience: "Developers, Security teams",
    status: "Demonstration documentation",
  },
  {
    slug: "api-reference",
    title: "API Reference",
    description: "Fictional endpoint documentation with request and response examples for planned endpoints.",
    audience: "Developers",
    status: "Demonstration documentation",
  },
  {
    slug: "webhooks",
    title: "Webhooks",
    description: "Event-driven integration concepts, signing secrets, retry behaviour and idempotency.",
    audience: "Developers, Data engineers",
    status: "Concept preview",
  },
  {
    slug: "data-feeds",
    title: "Data Feeds",
    description: "Full refresh, incremental, snapshot, delta, scheduling, secure delivery and manifest formats.",
    audience: "Data engineers, Analysts",
    status: "Concept preview",
  },
  {
    slug: "package-schemas",
    title: "Schemas",
    description: "Data dictionaries, field types, sensitivity classification, versioning and deprecation.",
    audience: "Developers, Data engineers, Analysts",
    status: "Demonstration documentation",
  },
  {
    slug: "permitted-use",
    title: "Governance",
    description: "Permitted use, prohibited use, retention, derived outputs and buyer responsibility.",
    audience: "Compliance teams, Procurement, All audiences",
    status: "Demonstration documentation",
  },
  {
    slug: "integration-examples",
    title: "Integration Examples",
    description: "Fictional server-side JavaScript, Python, cURL, webhook receiver and CSV-validation examples.",
    audience: "Developers, Data engineers",
    status: "Demonstration documentation",
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "Fictional release notes grouped by version and date with type filters.",
    audience: "Developers, All audiences",
    status: "Demonstration documentation",
  },
  {
    slug: "status",
    title: "Service Status",
    description: "Design preview of the planned service-status page. Not a live operational service.",
    audience: "All audiences",
    status: "Demonstration documentation",
  },
];

// ─── Featured Guides ───────────────────────────────────────────────────

export const featuredGuides: FeaturedGuide[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "A demonstration walkthrough from organisation verification to your first fictional API request.",
    audience: "All audiences",
    iconClass: "ri-rocket-line",
  },
  {
    slug: "authentication",
    title: "API Authentication",
    description: "Understand the planned credential model — API keys, bearer tokens, rotation and secure storage.",
    audience: "Developers",
    iconClass: "ri-key-2-line",
  },
  {
    slug: "package-schemas",
    title: "Understanding Package Schemas",
    description: "How DataHarbour packages use data dictionaries, field-level metadata and versioned schemas.",
    audience: "Data engineers",
    iconClass: "ri-database-2-line",
  },
  {
    slug: "data-feeds",
    title: "Scheduled Data Feeds",
    description: "Full refresh, incremental, snapshot and delta feed concepts with manifest examples.",
    audience: "Data engineers",
    iconClass: "ri-download-cloud-2-line",
  },
  {
    slug: "webhooks",
    title: "Webhook Events",
    description: "Event-driven notification concepts — access updates, delivery readiness, licence reminders.",
    audience: "Developers",
    iconClass: "ri-webhook-line",
  },
  {
    slug: "permitted-use",
    title: "Permitted Use and Retention",
    description: "Declared purpose, package-specific terms, prohibited uses and buyer obligations.",
    audience: "Compliance teams",
    iconClass: "ri-shield-check-line",
  },
];

// ─── Audience Paths ────────────────────────────────────────────────────

export const audiencePaths: AudiencePath[] = [
  {
    slug: "data-engineers",
    title: "Data Engineers",
    description: "Pipeline integration, feed ingestion, schema validation and delivery automation.",
    guides: ["getting-started", "api-overview", "data-feeds", "package-schemas", "webhooks", "integration-examples"],
  },
  {
    slug: "developers",
    title: "Developers",
    description: "API integration, authentication, webhook handling and code examples.",
    guides: ["getting-started", "api-overview", "authentication", "api-reference", "webhooks", "integration-examples"],
  },
  {
    slug: "analysts",
    title: "Analysts",
    description: "Package discovery, schema understanding, sample review and use-case evaluation.",
    guides: ["getting-started", "package-schemas", "permitted-use", "provenance-glossary"],
  },
  {
    slug: "compliance-teams",
    title: "Compliance Teams",
    description: "Provenance, permitted use, retention, data-subject obligations and access controls.",
    guides: ["permitted-use", "provenance-glossary", "getting-started"],
  },
  {
    slug: "procurement-teams",
    title: "Procurement Teams",
    description: "Commercial models, licence terms, enterprise agreements and billing principles.",
    guides: ["getting-started", "permitted-use", "api-overview"],
  },
  {
    slug: "supplier-technical",
    title: "Supplier Technical Teams",
    description: "Package preparation, schema documentation, delivery configuration and webhook setup.",
    guides: ["package-schemas", "data-feeds", "webhooks", "api-reference", "integration-examples"],
  },
];

// ─── Resource FAQs ─────────────────────────────────────────────────────

export const resourceFaqs: ResourceFaq[] = [
  {
    question: "Are these documentation pages describing a live platform?",
    answer: "No. All technical documentation, endpoints, credentials and examples are fictional demonstration content. They describe the planned DataHarbour platform and do not provide access to live data, APIs or services.",
  },
  {
    question: "Can I use the example code in production?",
    answer: "No. All code examples use fictional, non-operational endpoints and fake credentials. They are illustrative demonstrations only. Production code would require real credentials, proper error handling, security review and compliance with DataHarbour licence terms.",
  },
  {
    question: "When will real API access be available?",
    answer: "DataHarbour is in active design and development. Real API access, credentials and live marketplace services will be announced when available. No launch date has been confirmed.",
  },
  {
    question: "Do I need to be a verified organisation to access the API?",
    answer: "In the planned platform, yes. Every organisation accessing governed data products would need to complete a verification process. This includes identity confirmation, purpose declaration and acceptance of product-specific licence terms.",
  },
  {
    question: "What happens if I lose or expose my API key?",
    answer: "In the planned platform, you should immediately revoke the exposed key through your organisation workspace and generate a replacement. You should also review access logs and report any suspected unauthorised use. Keys should never be committed to version control or stored in frontend code.",
  },
  {
    question: "Are rate limits fixed or negotiable?",
    answer: "Planned rate limits would vary by product, membership tier and agreed terms. Enterprise agreements may include tailored limits. The API would return 429 responses when limits are approached or exceeded.",
  },
];

// ─── Quick Start Journey ──────────────────────────────────────────────

export const quickStartSteps: ResourceStep[] = [
  {
    label: "Create or verify your organisation",
    description: "Register your organisation and complete identity verification. This planned step would confirm your organisation's legal status, industry and authorised representatives before you can request data access.",
    planned: true,
  },
  {
    label: "Discover a suitable package",
    description: "Browse the Marketplace to find a data product that matches your use case. Review the package description, coverage, schema, provenance, permitted uses and commercial terms before proceeding.",
  },
  {
    label: "Submit a declared-purpose access request",
    description: "Describe your intended use, the data fields you need, your delivery preference and your estimated usage. This declaration would be reviewed against the package's permitted-use policy.",
    planned: true,
  },
  {
    label: "Agree licence and delivery conditions",
    description: "Review and accept the product-specific licence terms, including permitted and prohibited uses, retention limits, sharing restrictions and delivery obligations. Enterprise agreements may require additional negotiation.",
    planned: true,
  },
  {
    label: "Receive credentials or secure-delivery instructions",
    description: "Once approved, you would receive API keys, bearer tokens or secure-delivery configuration details. Credentials would be scoped to specific packages and environments.",
    planned: true,
  },
  {
    label: "Integrate, monitor usage and manage renewal",
    description: "Use the provided endpoints or delivery channels. Monitor your usage against allowances, track licence expiry dates and renew or adjust terms before access lapses. Report any incidents promptly.",
    planned: true,
  },
];

// ─── Changelog Entries ─────────────────────────────────────────────────

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "v0.9.0-demo",
    date: "2026-07-15",
    type: "Added",
    description: "Demonstration API reference published with fictional endpoint documentation for GET /packages, GET /packages/{package_id}/schema, POST /access-requests and related endpoints.",
    relatedSlug: "api-reference",
  },
  {
    version: "v0.9.0-demo",
    date: "2026-07-15",
    type: "Documentation",
    description: "Resources and Developer Centre launched with getting-started guide, API overview, authentication concepts, webhook documentation and integration examples.",
    relatedSlug: "getting-started",
  },
  {
    version: "v0.8.0-demo",
    date: "2026-07-01",
    type: "Added",
    description: "Package schema documentation published — covering data dictionaries, field types, sensitivity classification, versioning and deprecation policies.",
    relatedSlug: "package-schemas",
  },
  {
    version: "v0.8.0-demo",
    date: "2026-07-01",
    type: "Added",
    description: "Data feeds documentation published — full refresh, incremental, snapshot and delta feed concepts with manifest examples.",
    relatedSlug: "data-feeds",
  },
  {
    version: "v0.7.0-demo",
    date: "2026-06-15",
    type: "Changed",
    description: "Authentication guide updated to include key rotation, revocation procedures and environment-separation recommendations.",
    relatedSlug: "authentication",
  },
  {
    version: "v0.7.0-demo",
    date: "2026-06-15",
    type: "Added",
    description: "Permitted-use guide published — covering declared purpose, prohibited uses, retention, derived outputs and buyer integration checklist.",
    relatedSlug: "permitted-use",
  },
  {
    version: "v0.6.0-demo",
    date: "2026-06-01",
    type: "Added",
    description: "Provenance glossary published with 20 terms covering first-party data, licensed third-party data, lawful purpose, data minimisation and related concepts.",
    relatedSlug: "provenance-glossary",
  },
  {
    version: "v0.6.0-demo",
    date: "2026-06-01",
    type: "Security notice",
    description: "Demonstration security notice: all code examples updated to reinforce that credentials must never be placed in frontend code or committed to version control.",
    relatedSlug: "authentication",
  },
  {
    version: "v0.5.0-demo",
    date: "2026-05-15",
    type: "Added",
    description: "Webhook event documentation published — access_request.updated, package.version_published, delivery.ready, licence.renewal_due and related events.",
    relatedSlug: "webhooks",
  },
  {
    version: "v0.5.0-demo",
    date: "2026-05-15",
    type: "Fixed",
    description: "Demonstration fix: API error response examples corrected to consistently return RFC 7807-style problem details.",
    relatedSlug: "api-reference",
  },
  {
    version: "v0.4.0-demo",
    date: "2026-05-01",
    type: "Added",
    description: "Integration examples published — fictional server-side JavaScript, Python, cURL, webhook receiver and CSV-validation examples.",
    relatedSlug: "integration-examples",
  },
  {
    version: "v0.4.0-demo",
    date: "2026-05-01",
    type: "Deprecated",
    description: "Demonstration deprecation notice: the fictional /v0/datasets endpoint examples have been replaced by /v1/datasets/{dataset_id}/records in reference documentation.",
    relatedSlug: "api-reference",
  },
];

// ─── Service Status ────────────────────────────────────────────────────

export const serviceStatusItems: ServiceStatusItem[] = [
  {
    name: "Marketplace Website",
    status: "Operational preview",
    description: "The public marketplace catalogue, package pages and comparison tools are available for demonstration browsing.",
  },
  {
    name: "Demonstration API",
    status: "Demonstration only",
    description: "All API endpoints shown in the reference documentation are fictional and non-operational. No live data access is available.",
  },
  {
    name: "Authentication Concept",
    status: "Planned",
    description: "API key management, bearer token issuance and OAuth flows are planned for a future platform phase.",
  },
  {
    name: "Data Delivery Concept",
    status: "Planned",
    description: "Secure download, scheduled feed delivery and SFTP/storage integration are planned for a future platform phase.",
  },
  {
    name: "Webhooks Concept",
    status: "Planned",
    description: "Webhook registration, signature verification and event delivery are planned for a future platform phase.",
  },
  {
    name: "Documentation",
    status: "Demonstration only",
    description: "All technical documentation is for demonstration and planning purposes. It does not describe an operational service.",
  },
];

export const fictionalIncidents = [
  {
    date: "2026-04-12",
    title: "Demonstration: API latency increase (fictional example)",
    status: "Resolved",
    description: "This is a fictional incident example showing how incident history would appear. A simulated increase in response latency was detected and resolved within 45 minutes.",
  },
  {
    date: "2026-03-28",
    title: "Demonstration: Scheduled maintenance window (fictional example)",
    status: "Completed",
    description: "This is a fictional maintenance example. In a live service, planned maintenance would be announced at least 72 hours in advance.",
  },
];

// ─── Resource Hub Hero ─────────────────────────────────────────────────

export const resourceHubContent = {
  eyebrow: "Resources and Developer Centre",
  title: "Plan secure integrations with governed data products",
  supporting: "Explore demonstration API guides, feed patterns, package schemas, provenance terms and responsible-use documentation for the planned DataHarbour platform.",
  notice: "Technical examples are fictional and non-operational. They do not provide access to live data or services.",
  primaryAction: { label: "Start with the quick guide", route: "/resources/getting-started" },
  secondaryAction: { label: "Browse API concepts", route: "/resources/api-overview" },
};

export const documentationStatusPanels = [
  "Documentation describes the planned DataHarbour platform.",
  "Endpoints, parameters and responses may change before launch.",
  "No live credentials, API keys or access tokens exist in this phase.",
  "Demonstration responses contain fictional, non-realistic values.",
  "Final availability depends on package and access approval.",
  "Security and licence conditions may vary by product.",
];

// ─── Getting Started ──────────────────────────────────────────────────

export const gettingStartedArticle: ResourceArticle = {
  slug: "getting-started",
  title: "Getting started with DataHarbour",
  eyebrow: "Quick Start Guide",
  summary: "A demonstration walkthrough from organisation verification to your first fictional API request. Covers prerequisites, access requests, delivery options and renewal concepts.",
  category: "Getting Started",
  audience: ["All audiences", "Developers", "Data engineers"],
  status: "Demonstration documentation",
  lastUpdatedDisplay: "15 July 2026",
  seoTitle: "Getting Started with DataHarbour — Integration Quick Start Guide",
  seoDescription: "A demonstration walkthrough of the planned DataHarbour platform integration journey. Covers organisation verification, access requests, delivery options and your first fictional API request.",
  relatedSlugs: ["api-overview", "authentication", "permitted-use"],
  sections: [
    {
      id: "platform-overview",
      heading: "Platform overview",
      content: "DataHarbour is a UK-focused, compliance-led Data Trust and Intelligence marketplace being designed to connect verified organisations with governed data products. The platform would support APIs, scheduled feeds, secure downloads, dashboards, reports and clean-room workflows — each with defined provenance, permitted-use rules and access controls.",
      contentType: "text",
    },
    {
      id: "prerequisites",
      heading: "Prerequisites",
      content: "Before you could integrate with DataHarbour, you would need to meet the following prerequisites. These are planned requirements and are not yet operational.",
      contentType: "text",
      checklistItems: [
        "A registered organisation or established business",
        "An authorised representative to manage the account",
        "A clear use case and declared purpose for the data",
        "Acceptance of product-specific licence terms",
        "Technical capability to consume APIs, feeds or downloads securely",
        "Ability to store credentials securely (environment variables, secret managers)",
      ],
    },
    {
      id: "organisation-verification",
      heading: "Organisation verification concept",
      content: "In the planned platform, every organisation accessing governed data products would complete a verification process. This is designed to confirm legal identity, business activity, authorised representatives and the organisation's commitment to compliance obligations. Verification would not guarantee acceptance of every access request and would be subject to review.",
      contentType: "text",
      calloutType: "planned",
    },
    {
      id: "choosing-package",
      heading: "Choosing a package",
      content: "You would browse the Marketplace to find a data product matching your use case. Each package listing would include a description, coverage details, a data dictionary or schema preview, provenance and quality information, permitted and prohibited uses, commercial terms and delivery options. Comparison tools would help you evaluate multiple packages side by side.",
      contentType: "text",
    },
    {
      id: "access-request",
      heading: "Access-request concept",
      content: "To request access, you would submit a declared-purpose access request through the package page. This would describe your intended use, the data fields you need, your delivery preference and your estimated usage volume. The request would be reviewed against the package's permitted-use policy and your organisation's verification status.",
      contentType: "text",
      calloutType: "planned",
    },
    {
      id: "delivery-options",
      heading: "Delivery options",
      content: "DataHarbour plans to support several delivery models depending on the product:",
      contentType: "text",
      items: [
        { term: "REST API", description: "Versioned, package-specific endpoints with JSON responses, pagination, filtering and rate limits." },
        { term: "Scheduled data feed", description: "Full refresh, incremental, snapshot or delta files delivered on a defined schedule via secure download or planned SFTP/storage integration." },
        { term: "Secure download", description: "One-off or periodic secure file delivery with checksums and manifest files." },
        { term: "Dashboard", description: "Interactive analytical interfaces for products designed for exploration rather than programmatic consumption." },
        { term: "Report", description: "Structured research reports delivered as PDF or similar formats." },
        { term: "Clean-room analysis", description: "Controlled environments for analysis where data cannot be extracted, only aggregated results." },
      ],
    },
    {
      id: "credential-concept",
      heading: "Credential concept",
      content: "Once an access request is approved, you would receive credentials scoped to specific packages and environments. The planned model supports API keys for server-side use and bearer tokens for service-to-service communication. All credentials must be stored securely using environment variables or a secret manager. They must never appear in frontend code, client-side JavaScript, mobile applications or version control.",
      contentType: "text",
      calloutType: "warning",
    },
    {
      id: "first-request",
      heading: "Your first fictional request",
      content: "The following example shows how a fictional API request might look once the platform is operational. All URLs, credentials and response data are illustrative and non-functional.",
      contentType: "code",
      code: {
        language: "bash",
        label: "Fictional cURL example",
        code: `# Non-operational demonstration example
# Base URL is fictional — not a real endpoint
curl -H "Authorization: Bearer dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  -H "Accept: application/json" \\
  "https://api.demo.dataharbour.example/v1/packages/dh-pkg-demographics-uk-2026"`,
      },
    },
    {
      id: "usage-monitoring",
      heading: "Usage monitoring",
      content: "The planned platform would provide usage records showing API calls, data volume, delivery history and licence consumption against your agreed allowance. This information would be available through your organisation workspace (a planned feature) and through the GET /usage API endpoint.",
      contentType: "text",
    },
    {
      id: "renewal-expiry",
      heading: "Renewal and expiry",
      content: "Licences would have defined start and end dates. You would receive renewal reminders before expiry. If a licence expires without renewal, access to the associated data product would end. You must also comply with any post-termination data-deletion or return requirements specified in the licence terms.",
      contentType: "text",
    },
    {
      id: "troubleshooting",
      heading: "Troubleshooting",
      content: "",
      contentType: "faq",
      items: [
        { term: "Why am I receiving a 401 Unauthorised error?", description: "In the planned platform, a 401 response would indicate an invalid or expired credential. Check that your API key or bearer token is correct, has not been revoked and is being sent in the Authorization header." },
        { term: "Why am I receiving a 403 Forbidden error?", description: "A 403 response would mean your organisation does not have an approved access request for the requested package, or the requested operation is outside your permitted use." },
        { term: "Why am I receiving a 429 Too Many Requests error?", description: "You have exceeded the rate limit for this endpoint. Check the Retry-After header for guidance and implement exponential back-off in your client." },
        { term: "Can I test without a real access request?", description: "At present, all documentation and examples are for demonstration only. A sandbox or test environment may be introduced as part of a future platform phase. No timeline has been confirmed." },
      ],
    },
  ],
};

// ─── API Overview ─────────────────────────────────────────────────────

export const apiOverviewArticle: ResourceArticle = {
  slug: "api-overview",
  title: "API concepts and design",
  eyebrow: "API Overview",
  summary: "Understand the planned REST-style API design including versioning, pagination, filtering, rate limits, idempotency, error handling and data retention.",
  category: "API Concepts",
  audience: ["Developers", "Data engineers"],
  status: "Concept preview",
  lastUpdatedDisplay: "15 July 2026",
  seoTitle: "DataHarbour API Concepts — Versioning, Pagination and Rate Limits",
  seoDescription: "Understand the planned DataHarbour REST-style API design. Covers versioning, pagination, filtering, rate limits, idempotency, error responses and data retention policies.",
  relatedSlugs: ["getting-started", "authentication", "api-reference"],
  sections: [
    {
      id: "api-design",
      heading: "REST-style API design",
      content: "The planned DataHarbour API would follow REST conventions with JSON request and response bodies. All endpoints would be served over HTTPS only. The fictional base URL for demonstration purposes is:",
      calloutType: "demonstration",
    },
    {
      id: "base-url",
      heading: "Base URL",
      content: "https://api.demo.dataharbour.example/v1",
      contentType: "code",
      code: {
        language: "text",
        label: "Fictional base URL — not operational",
        code: "https://api.demo.dataharbour.example/v1",
      },
    },
    {
      id: "versioning",
      heading: "Versioning",
      content: "The API would use URL-path versioning (e.g. /v1/). Major version increments would indicate breaking changes. Minor, non-breaking additions may not change the version. Deprecated endpoints would remain available for a notice period before removal.",
      items: [
        { term: "Breaking change", description: "Removing a field, changing a field type, removing an endpoint or changing authentication requirements." },
        { term: "Non-breaking change", description: "Adding a new optional field, adding a new endpoint or extending an enum." },
        { term: "Deprecation notice", description: "Deprecated endpoints would return a Sunset header with the planned removal date. The changelog and documentation would reflect deprecation." },
      ],
    },
    {
      id: "authentication-header",
      heading: "Authentication",
      content: "All API requests would require authentication. The planned model uses Bearer tokens in the Authorization header. See the Authentication guide for full details.",
      calloutType: "info",
    },
    {
      id: "requests-responses",
      heading: "Requests and responses",
      content: "Requests and responses would use JSON (application/json). Request bodies for POST and PATCH endpoints must include a Content-Type: application/json header. Successful responses return a 2xx status code with a JSON body. Error responses return a 4xx or 5xx status code with an RFC 7807-style problem details body.",
    },
    {
      id: "pagination",
      heading: "Pagination",
      content: "List endpoints would support cursor-based pagination. Responses would include a cursor for the next page and a has_more boolean. Page-size parameters would be bounded by a maximum to prevent excessive loads.",
      code: {
        language: "json",
        label: "Fictional paginated response structure",
        code: `{
  "data": [ /* ... results ... */ ],
  "pagination": {
    "cursor": "cur_abc123def456",
    "has_more": true,
    "total_available": 1250
  }
}`,
      },
    },
    {
      id: "filtering",
      heading: "Filtering",
      content: "List endpoints would support query-parameter filtering where appropriate. Filters would vary by resource. Common patterns may include date ranges, categories, status values and geographic scopes. Filter values would be validated and invalid combinations would return 422 Unprocessable Entity.",
    },
    {
      id: "rate-limits",
      heading: "Rate limits",
      content: "Rate limits would apply per organisation, per endpoint, based on your membership tier and product-specific terms. When a limit is approached, the API would return a 429 Too Many Requests response with a Retry-After header. Clients should implement exponential back-off and respect the retry guidance.",
      items: [
        { term: "Rate-limit headers", description: "Responses would include X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers for transparency." },
        { term: "Burst allowances", description: "Some endpoints may support short bursts above the steady rate, subject to product terms." },
      ],
    },
    {
      id: "idempotency",
      heading: "Idempotency",
      content: "State-changing endpoints (POST, PATCH) that support idempotency would accept an Idempotency-Key header. Sending the same key with the same request body would return the original response rather than creating a duplicate resource. Idempotency keys would have a defined expiry window, after which reuse would be treated as a new request.",
    },
    {
      id: "request-ids",
      heading: "Request IDs",
      content: "Every API response would include an X-Request-Id header with a unique identifier. You should log this value for troubleshooting and include it when contacting DataHarbour about a specific request.",
    },
    {
      id: "error-responses",
      heading: "Error responses",
      content: "Error responses would follow an RFC 7807 Problem Details structure:",
      table: {
        headers: ["Status", "Code", "Meaning"],
        rows: [
          ["400", "invalid_request", "The request is malformed or missing required parameters."],
          ["401", "unauthorised", "Authentication is missing, invalid or expired."],
          ["403", "forbidden", "Authenticated but not permitted for this resource or action."],
          ["404", "not_found", "The requested resource does not exist."],
          ["409", "conflict", "The request conflicts with the current resource state."],
          ["422", "validation_failed", "Request parameters failed validation."],
          ["429", "rate_limited", "Too many requests. Retry after the indicated period."],
          ["500", "server_error", "An unexpected server error occurred. Retry with back-off."],
        ],
      },
    },
    {
      id: "retention",
      heading: "Data retention",
      content: "Data obtained through the API must be handled in accordance with the product's licence terms, including any retention limits, deletion requirements and restrictions on derived outputs. Access logs and usage records would be retained by DataHarbour for audit and compliance purposes.",
    },
    {
      id: "deprecation",
      heading: "Deprecation policy",
      content: "When an endpoint, parameter or response field is deprecated, the API would return a Sunset header indicating the planned removal date. Deprecated features would be documented in the changelog and API reference. Clients should migrate before the sunset date to avoid disruption.",
    },
  ],
};

// ─── Authentication ───────────────────────────────────────────────────

export const authenticationArticle: ResourceArticle = {
  slug: "authentication",
  title: "API authentication",
  eyebrow: "Authentication Guide",
  summary: "Understand the planned credential model — API keys, bearer tokens, key rotation, revocation, environment separation and secret storage best practices.",
  category: "Authentication",
  audience: ["Developers", "Security teams"],
  status: "Demonstration documentation",
  lastUpdatedDisplay: "15 July 2026",
  seoTitle: "DataHarbour API Authentication — Keys, Tokens and Security",
  seoDescription: "Understand the planned DataHarbour authentication model. Covers API keys, bearer tokens, key rotation, revocation, least privilege and secure credential storage.",
  relatedSlugs: ["api-overview", "api-reference", "integration-examples"],
  sections: [
    {
      id: "auth-overview",
      heading: "Authentication overview",
      content: "All DataHarbour API requests would require authentication. The planned platform supports two primary methods: API keys for server-side integrations and bearer tokens for service-to-service communication. An OAuth 2.0 flow may be introduced in a future phase for delegated access scenarios.",
      calloutType: "info",
    },
    {
      id: "organisation-account",
      heading: "Organisation account",
      content: "Authentication would be tied to a verified organisation account. Each organisation would manage its own credentials through the organisation workspace. Credentials would be scoped to specific packages and environments. An organisation may hold multiple credentials for different services or teams.",
    },
    {
      id: "api-keys",
      heading: "API keys",
      content: "API keys would be long-lived credentials suitable for server-side use. They would be generated through the organisation workspace and displayed only once at creation time. Keys would be prefixed with dh_ for identification and would not be retrievable after initial display.",
      code: {
        language: "text",
        label: "Fictional API key format — not a real credential",
        code: "dh_demo_key_NOT_A_REAL_CREDENTIAL_v1_abc123def456",
      },
    },
    {
      id: "bearer-tokens",
      heading: "Bearer tokens",
      content: "Bearer tokens would be short-lived tokens obtained by exchanging an API key or through a service-account flow. They would have configurable expiry (typically 1 hour) and would be used in the Authorization header.",
      code: {
        language: "bash",
        label: "Fictional token request — not operational",
        code: `# Non-operational demonstration only
curl -X POST "https://api.demo.dataharbour.example/v1/auth/token" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: dh_demo_key_NOT_A_REAL_CREDENTIAL" \\
  -d '{"scope": "packages:dh-pkg-demographics-uk-2026"}'`,
      },
    },
    {
      id: "oauth",
      heading: "OAuth concept (future phase)",
      content: "An OAuth 2.0 flow may be introduced for third-party applications that need delegated access on behalf of an organisation. This would use the authorization-code grant with PKCE. No timeline has been confirmed for OAuth support.",
      calloutType: "planned",
    },
    {
      id: "key-rotation",
      heading: "Key rotation",
      content: "API keys should be rotated regularly. The planned platform would support overlapping key validity, allowing you to generate a new key, deploy it and revoke the old key without downtime. Automated rotation reminders would be configurable in the organisation workspace.",
    },
    {
      id: "revocation",
      heading: "Revocation",
      content: "Keys and tokens can be revoked immediately through the organisation workspace or via a planned management API endpoint. Revocation is irreversible. If a credential is suspected of being exposed, revoke it immediately, generate a replacement and review access logs.",
    },
    {
      id: "environment-separation",
      heading: "Environment separation",
      content: "The planned platform would support separate credentials for demonstration, testing and production environments. Never use a production credential in a development or testing context. Each environment should have its own scoped key or token.",
    },
    {
      id: "least-privilege",
      heading: "Least privilege",
      content: "Credentials should be scoped to the minimum required packages, endpoints and environments. A credential that only needs read access should not be given write access. A credential for one package should not be usable for another unless explicitly configured.",
    },
    {
      id: "secret-storage",
      heading: "Secret storage",
      content: "Credentials must be stored securely. Never place API keys or tokens in:",
      contentType: "callout",
      calloutType: "warning",
      checklistItems: [
        "Frontend JavaScript or client-side code",
        "Mobile application binaries",
        "Public repositories or version control",
        "Configuration files included in deployments",
        "Log files or error-tracking output",
        "Email, chat messages or support tickets",
      ],
    },
    {
      id: "storage-practices",
      heading: "Recommended storage practices",
      content: "",
      items: [
        { term: "Environment variables", description: "Store credentials in environment variables (e.g. DATAHARBOUR_API_KEY) and reference them in your application at runtime." },
        { term: "Secret managers", description: "Use AWS Secrets Manager, Google Secret Manager, HashiCorp Vault or similar for production deployments." },
        { term: ".env files", description: "For local development only. Ensure .env is listed in .gitignore and never committed." },
      ],
    },
    {
      id: "incident-response",
      heading: "Incident response",
      content: "If you suspect a credential has been exposed, revoke it immediately and generate a replacement. Review access logs for unusual activity. Notify DataHarbour through the contact page if the exposure may affect compliance obligations or if you need assistance investigating. Credential incidents should be treated as security incidents and handled through your organisation's incident-response process.",
    },
    {
      id: "code-examples",
      heading: "Fictional code examples",
      content: "The following examples show how authentication might be used in practice. All credentials and endpoints are fictional.",
      contentType: "code",
      code: {
        language: "javascript",
        label: "Fictional JavaScript example",
        code: `// Non-operational demonstration only
// Store credentials in environment variables — never hard-code
const apiKey = process.env.DATAHARBOUR_API_KEY;

// Fictional endpoint — not a real URL
const response = await fetch(
  "https://api.demo.dataharbour.example/v1/packages/dh-pkg-demographics-uk-2026",
  {
    headers: {
      Authorization: \`Bearer \${apiKey}\`,
      Accept: "application/json",
    },
  },
);

if (!response.ok) {
  console.error("Request failed:", response.status);
}`,
      },
    },
  ],
};

// ─── Provenance Glossary ──────────────────────────────────────────────

export const provenanceGlossaryTerms: GlossaryTerm[] = [
  { term: "First-party data", definition: "Data that an organisation collects directly from its own operations, customers, users or systems, where it acts as the data controller or originator. The collecting organisation can explain the collection method, consent or lawful basis and any processing applied." },
  { term: "Licensed third-party data", definition: "Data obtained from another organisation under a licence agreement that specifies permitted uses, restrictions, territories, duration and onward-distribution rights. The supplier must hold the right to relicense the data for marketplace distribution." },
  { term: "Public-record data", definition: "Data sourced from official public registers, government publications, statutory notices or open-government datasets. The supplier must identify the specific register or publication, confirm the data has not been unlawfully enriched and explain any transformation applied." },
  { term: "Derived data", definition: "Data created through computation, modelling, aggregation or transformation of one or more source datasets. The supplier must explain the source data, the derivation methodology and any assumptions or limitations introduced by the process." },
  { term: "Aggregated data", definition: "Data that has been combined, summarised or grouped so that individual records, entities or persons cannot be identified. The aggregation method, minimum group size and any risk of re-identification must be documented." },
  { term: "Modelled signal", definition: "A prediction, score, indicator or classification produced by a statistical or machine-learning model. The supplier must explain the model's purpose, training data, known biases, validation methodology and limitations." },
  { term: "Provenance", definition: "The documented history of a dataset's origin, collection or acquisition, ownership, licensing, transformation, refresh and chain of custody. Strong provenance allows buyers to assess reliability, rights and compliance before purchase." },
  { term: "Lawful purpose", definition: "A use of data that is consistent with applicable law, the data subject's reasonable expectations, the supplier's licence terms and DataHarbour's acceptable-use policy. Unlawful purposes include discrimination, harassment, unlawful surveillance and deceptive practices." },
  { term: "Data minimisation", definition: "The principle that only data necessary for the declared purpose should be accessed, processed or retained. Buyers should not request full datasets when a subset or aggregate would satisfy their use case." },
  { term: "Retention", definition: "The period for which a buyer may store data obtained through DataHarbour. Retention limits are set in the product licence and may depend on the data type, purpose and jurisdiction. Data must be deleted or returned when the retention period ends or the licence expires." },
  { term: "Re-identification", definition: "The process of linking anonymised or de-identified data back to specific individuals, households or organisations. Attempted re-identification is generally prohibited unless explicitly permitted in the product licence and compliant with applicable law." },
  { term: "Refresh frequency", definition: "How often a dataset is updated: real-time, daily, weekly, monthly, quarterly, annually or ad hoc. The stated frequency should be treated as a target; actual refresh may vary and suppliers should communicate delays." },
  { term: "Coverage", definition: "The scope of a dataset described in terms of geography, entity count, record count, time period, industry coverage or population segment. Coverage statements should be verifiable and should note known gaps or exclusions." },
  { term: "Data controller", definition: "An organisation that determines the purposes and means of processing personal data. In the DataHarbour context, the supplier is typically the controller for its product data, while the buyer becomes a controller for the specific use it declares." },
  { term: "Data processor", definition: "An organisation that processes personal data on behalf of a controller. Some DataHarbour products may include processor relationships where the buyer acts as a processor for the supplier's data." },
  { term: "Supplier restriction", definition: "A limitation placed by the data supplier on how the data may be used, by whom, in which territories, for which purposes or for how long. Restrictions are part of the product licence and are enforceable." },
  { term: "Licence", definition: "The legal agreement between supplier and buyer governing data access, use, retention, sharing, derived outputs, termination and dispute resolution. Every DataHarbour product would have a defined licence that buyers must accept before accessing data." },
  { term: "Secure delivery", definition: "The method by which data is transferred from supplier to buyer, such as HTTPS API, SFTP, encrypted download or clean-room access. Delivery methods must protect data in transit and at rest." },
  { term: "Audit trail", definition: "A record of access requests, approvals, data deliveries, usage events and licence changes maintained by DataHarbour for compliance, dispute resolution and supplier reporting purposes." },
  { term: "Data-subject request", definition: "A request from an individual to exercise rights under data-protection law, such as access, rectification, erasure or objection. Suppliers and buyers must have processes to handle these requests and must cooperate where a product contains personal data." },
];

// ─── Permitted Use ────────────────────────────────────────────────────

export const permittedUseArticle: ResourceArticle = {
  slug: "permitted-use",
  title: "Permitted use and retention",
  eyebrow: "Responsible Use Guide",
  summary: "Understand declared purpose, package-specific permitted and prohibited uses, retention limits, derived-output rules and the buyer integration checklist.",
  category: "Governance",
  audience: ["Compliance teams", "Procurement", "All audiences"],
  status: "Demonstration documentation",
  lastUpdatedDisplay: "15 July 2026",
  seoTitle: "DataHarbour Permitted Use — Responsible Data Integration Guide",
  seoDescription: "Understand DataHarbour's planned permitted-use framework. Covers declared purpose, prohibited uses, retention limits, derived outputs, re-identification and buyer obligations.",
  relatedSlugs: ["getting-started", "provenance-glossary"],
  sections: [
    {
      id: "overview",
      heading: "Permitted-use overview",
      content: "Every data product on DataHarbour would include defined permitted and prohibited uses. Before accessing data, buyers must declare their intended purpose, which would be reviewed against the product's use policy. Using data outside the declared purpose or in a prohibited manner would constitute a licence breach.",
    },
    {
      id: "declared-purpose",
      heading: "Declared purpose",
      content: "Your declared purpose describes how you intend to use the data. This must be specific, honest and complete. Vague declarations such as 'business intelligence' may be insufficient. A strong declaration specifies the business problem, the planned analysis or integration, the data fields needed and any outputs or decisions the data would inform.",
    },
    {
      id: "permitted-uses",
      heading: "Permitted uses (typical examples)",
      content: "Each package defines its own permitted uses. The following are illustrative examples of what may be permitted depending on the product:",
      checklistItems: [
        "Market analysis and trend identification",
        "Customer or prospect enrichment (where lawful)",
        "Risk assessment and due diligence",
        "Site selection and geographic analysis",
        "Internal reporting and business planning",
        "Model training where not prohibited by the licence",
        "Regulatory compliance and audit support",
      ],
    },
    {
      id: "prohibited-uses",
      heading: "Prohibited uses",
      content: "The following are generally prohibited across DataHarbour products. Individual packages may add further restrictions:",
      calloutType: "warning",
      checklistItems: [
        "Unlawful discrimination or biased decision-making",
        "Harassment, stalking or intimidation",
        "Unlawful surveillance or monitoring",
        "Deceptive or misleading practices",
        "Re-identification of individuals without explicit permission",
        "Resale or redistribution without supplier authorisation",
        "Use in high-risk automated decisions without human review (where legally required)",
        "Creation of competing products using the supplier's data",
        "Use beyond the agreed retention period",
      ],
    },
    {
      id: "sharing",
      heading: "Sharing restrictions",
      content: "Data obtained through DataHarbour is licensed to your organisation, not to individuals within it. Sharing data with other organisations, affiliates, contractors or third parties requires explicit permission in the product licence. Onward sharing without authorisation is a licence breach.",
    },
    {
      id: "retention",
      heading: "Retention obligations",
      content: "You must delete or return data when the licence expires or when the retention period ends. Retention periods are set per product and may vary by data type. You should maintain records demonstrating compliance with deletion requirements. Some licences may permit retention of aggregated, non-identifiable outputs after the underlying data is deleted.",
    },
    {
      id: "derived-outputs",
      heading: "Derived outputs",
      content: "Derived outputs — such as reports, models, scores or visualisations — may be subject to different rules depending on the product licence. Generally, aggregated and non-re-identifiable outputs may be retained after the licence ends, while outputs that contain or could be reverse-engineered to reveal source data must be deleted. Check the specific product terms.",
    },
    {
      id: "re-identification-rule",
      heading: "Re-identification prohibition",
      content: "Attempting to re-identify individuals, households or organisations from de-identified or aggregated data is prohibited unless explicitly permitted in the product licence and compliant with applicable law. If you inadvertently re-identify a data subject, you must stop processing the data, secure it and notify DataHarbour promptly.",
    },
    {
      id: "purpose-changes",
      heading: "Purpose changes",
      content: "If your intended use changes after access is granted, you must submit a new or updated declared-purpose access request. Continuing to use data for a purpose not covered by your original declaration would be a licence breach, even if the new purpose would otherwise be permitted.",
    },
    {
      id: "buyer-checklist",
      heading: "Buyer integration checklist",
      content: "Before integrating with any DataHarbour product, confirm:",
      checklistItems: [
        "You have read and understood the package's permitted-use policy",
        "You have submitted an accurate declared-purpose access request",
        "You have accepted the product licence terms",
        "You have identified the retention period and have a deletion plan",
        "You understand which derived outputs may be retained after licence expiry",
        "You have processes to handle purpose changes and licence renewals",
        "Your team knows how to report a suspected data incident",
        "Credentials are stored securely and not in frontend code or version control",
        "You have reviewed the Compliance Centre for applicable obligations",
      ],
    },
    {
      id: "suspension",
      heading: "Access suspension",
      content: "DataHarbour may suspend access if a buyer is believed to be using data outside permitted terms, if a supplier raises a compliance concern or if required by law or regulatory action. Suspension may be immediate where the risk warrants. Buyers would be notified and given an opportunity to respond where appropriate.",
    },
  ],
};

// ─── Integration Examples ──────────────────────────────────────────

export const integrationExamplesArticle: ResourceArticle = {
  slug: "integration-examples",
  title: "Integration examples",
  eyebrow: "Code Examples",
  summary: "Fictional code examples in JavaScript, Python and cURL showing server-side API access, webhook handling, feed ingestion, CSV validation and schema-version checks.",
  category: "Integration Examples",
  audience: ["Developers", "Data engineers"],
  status: "Demonstration documentation",
  lastUpdatedDisplay: "15 July 2026",
  seoTitle: "DataHarbour Integration Examples — JavaScript, Python and cURL",
  seoDescription: "Fictional code examples demonstrating planned DataHarbour API integration patterns in JavaScript, Python and cURL. All examples use non-operational endpoints and fake credentials.",
  relatedSlugs: ["api-reference", "authentication", "webhooks"],
  sections: [
    {
      id: "overview",
      heading: "About these examples",
      content: "All code on this page is illustrative and uses fictional, non-operational endpoints and credentials. These examples demonstrate planned integration patterns. They are not production-ready and must not be used with real data or credentials.",
      calloutType: "demonstration",
    },
    {
      id: "js-example",
      heading: "Server-side JavaScript (Node.js)",
      contentType: "code",
      code: {
        language: "javascript",
        label: "Fictional server-side JavaScript example",
        code: `// Non-operational demonstration only
// Store credentials in environment variables
const apiKey = process.env.DATAHARBOUR_API_KEY;
const baseUrl = "https://api.demo.dataharbour.example/v1";

async function getPackageDetails(packageId) {
  try {
    const response = await fetch(\`\${baseUrl}/packages/\${packageId}\`, {
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        console.warn(\`Rate limited. Retry after \${retryAfter} seconds.\`);
        return null;
      }
      console.error(\`Request failed: \${response.status}\`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network error:", error.message);
    return null;
  }
}`,
      },
    },
    {
      id: "python-example",
      heading: "Python",
      contentType: "code",
      code: {
        language: "python",
        label: "Fictional Python example",
        code: `# Non-operational demonstration only
import os
import requests
import time

API_KEY = os.environ.get("DATAHARBOUR_API_KEY")
BASE_URL = "https://api.demo.dataharbour.example/v1"

def get_package_details(package_id):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Accept": "application/json",
    }

    try:
        response = requests.get(
            f"{BASE_URL}/packages/{package_id}",
            headers=headers,
            timeout=30,
        )

        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", 60))
            print(f"Rate limited. Waiting {retry_after}s...")
            time.sleep(retry_after)
            return get_package_details(package_id)

        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None`,
      },
    },
    {
      id: "curl-example",
      heading: "cURL",
      contentType: "code",
      code: {
        language: "bash",
        label: "Fictional cURL example",
        code: `# Non-operational demonstration only
# Store the API key in an environment variable
export DATAHARBOUR_API_KEY="dh_demo_key_NOT_A_REAL_CREDENTIAL"

# Fictional endpoint — not a real URL
curl -H "Authorization: Bearer $DATAHARBOUR_API_KEY" \\
  -H "Accept: application/json" \\
  "https://api.demo.dataharbour.example/v1/packages/dh-pkg-demographics-uk-2026"

# Check rate-limit headers
curl -i -H "Authorization: Bearer $DATAHARBOUR_API_KEY" \\
  "https://api.demo.dataharbour.example/v1/packages/dh-pkg-demographics-uk-2026"`,
      },
    },
    {
      id: "webhook-example",
      heading: "Webhook receiver",
      contentType: "code",
      code: {
        language: "javascript",
        label: "Fictional webhook receiver example",
        code: `// Non-operational demonstration only
// Minimal webhook receiver using Express
const express = require("express");
const crypto = require("crypto");

const WEBHOOK_SECRET = process.env.DATAHARBOUR_WEBHOOK_SECRET;
const app = express();

app.post(
  "/webhooks/dataharbour",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.headers["x-dataharbour-signature"];

    const computed = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    if (!crypto.timingSafeEqual(
      Buffer.from(signature || ""),
      Buffer.from(computed),
    )) {
      console.warn("Invalid webhook signature");
      return res.status(401).send("Invalid signature");
    }

    const event = JSON.parse(req.body);
    console.log("Received event:", event.type, event.id);

    // Process event asynchronously
    res.status(200).send("Accepted");
  },
);`,
      },
    },
    {
      id: "csv-example",
      heading: "CSV validation",
      contentType: "code",
      code: {
        language: "javascript",
        label: "Fictional CSV validation example",
        code: `// Non-operational demonstration only
// Validate a downloaded CSV against an expected schema
function validateCsvHeaders(headers, expectedSchema) {
  const missing = expectedSchema.filter(
    (field) => !headers.includes(field.name),
  );
  const extra = headers.filter(
    (h) => !expectedSchema.find((f) => f.name === h),
  );

  if (missing.length > 0) {
    console.warn("Missing fields:", missing.map((f) => f.name));
  }
  if (extra.length > 0) {
    console.info("Extra fields present:", extra);
  }

  return { valid: missing.length === 0, missing, extra };
}

// Fictional schema reference
const expectedSchema = [
  { name: "record_id", type: "string" },
  { name: "entity_name", type: "string" },
  { name: "postcode_area", type: "string" },
  { name: "sector_code", type: "string" },
];`,
      },
    },
    {
      id: "schema-check",
      heading: "Schema-version check",
      contentType: "code",
      code: {
        language: "bash",
        label: "Fictional schema-version check example",
        code: `# Non-operational demonstration only
# Check the current schema version for a package
curl -H "Authorization: Bearer $DATAHARBOUR_API_KEY" \\
  "https://api.demo.dataharbour.example/v1/packages/dh-pkg-demographics-uk-2026/schema"

# Response includes schema_version field
# Compare against your stored version and handle changes`,
      },
    },
  ],
};

// ─── Changelog Page Content ───────────────────────────────────────────

export const changelogTypes = ["Added", "Changed", "Deprecated", "Fixed", "Security notice", "Documentation"] as const;

// ─── Service Status Page Content ──────────────────────────────────────

export const statusPageContent = {
  overallStatus: "Demonstration only — not a live operational service",
  notice: "This is a design preview and not a live operational status service. All status indicators, incident histories and service descriptions are fictional demonstration content.",
};

// ─── Resource Article list for hub ────────────────────────────────────

export const allResourceSlugs = [
  "getting-started",
  "api-overview",
  "authentication",
  "api-reference",
  "webhooks",
  "data-feeds",
  "package-schemas",
  "provenance-glossary",
  "permitted-use",
  "integration-examples",
  "changelog",
  "status",
];

export function getArticleBySlug(slug: string): ResourceArticle | undefined {
  const articles: Record<string, ResourceArticle> = {
    "getting-started": gettingStartedArticle,
    "api-overview": apiOverviewArticle,
    "authentication": authenticationArticle,
    "permitted-use": permittedUseArticle,
    "integration-examples": integrationExamplesArticle,
  };
  return articles[slug];
}