import { legalDocuments } from "@/data/legalDocumentContent";
import { REVIEW_NOTICE } from "@/data/legalDocuments";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { useNavigate } from "react-router-dom";

const statusBadgeClasses: Record<string, string> = {
  "Draft for legal review": "bg-accent-100 text-accent-800",
  "Planned terms": "bg-secondary-100 text-secondary-800",
  "Under review": "bg-accent-100/80 text-accent-700",
  "Public guidance": "bg-accent-100 text-accent-800",
};

const groups = [
  {
    title: "Privacy and Data Protection",
    icon: "ri-shield-check-line",
    slugs: ["privacy", "cookies", "data-processing-terms", "data-retention-policy", "subprocessors"],
  },
  {
    title: "Marketplace and Commercial",
    icon: "ri-store-2-line",
    slugs: ["marketplace-terms", "buyer-terms", "supplier-terms"],
  },
  {
    title: "Use and Security",
    icon: "ri-lock-line",
    slugs: ["acceptable-use", "security-statement", "complaints"],
  },
];

const docBySlug = Object.fromEntries(legalDocuments.map((d) => [d.slug, d]));

export default function LegalCentre() {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Privacy Question", path: "/contact/compliance?topic=privacy" },
    { label: "Compliance Question", path: "/contact/compliance" },
    { label: "Security Concern", path: "/contact/security" },
    { label: "Make a Complaint", path: "/complaints" },
    { label: "Data-Subject Request", path: "/data-subject-request" },
  ];

  return (
    <div className="min-h-screen bg-background-50">
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] uppercase text-primary-400">Legal and Policy Centre</p>
          <h1 className="mb-4 text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Clear rules for a governed data marketplace
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-foreground-400">
            Review DataHarbour&rsquo;s draft privacy, marketplace, buyer, supplier, security, retention and responsible-use documents.
          </p>
        </div>

        <div className="mb-10 rounded-lg border border-accent-300/40 bg-accent-100/50 px-5 py-4">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-accent-800">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
              <i className="ri-information-line text-sm" />
            </span>
            <span>{REVIEW_NOTICE}</span>
          </p>
        </div>

        <div className="mb-10 rounded-lg border border-foreground-200/10 bg-background-100 px-5 py-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-300">Document Statuses</h2>
          <div className="flex flex-wrap gap-4 text-[11px] text-foreground-500">
            <span><span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-accent-100 text-accent-800">Draft for legal review</span> &mdash; Content drafted, awaiting solicitor review</span>
            <span><span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-secondary-100 text-secondary-800">Planned terms</span> &mdash; Structure defined, full content pending</span>
            <span><span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-accent-100/80 text-accent-700">Under review</span> &mdash; Content under revision</span>
          </div>
        </div>

        {groups.map((group) => (
          <section key={group.title} className="mb-10">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-medium text-foreground-100" style={{ fontFamily: "'Instrument Serif', serif" }}>
              <span className="flex h-6 w-6 items-center justify-center">
                <i className={`${group.icon} text-lg text-accent-500`} />
              </span>
              {group.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.slugs.map((slug) => {
                const doc = docBySlug[slug];
                if (!doc) return null;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => navigate(`/${slug === "acceptable-use" ? "acceptable-use" : slug}`)}
                    className="flex flex-col items-start gap-2 rounded-lg border border-foreground-200/10 bg-background-100 p-5 text-left transition hover:border-foreground-300/30 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-foreground-200">{doc.shortTitle}</span>
                    <p className="text-[12px] leading-relaxed text-foreground-500">{doc.summary}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadgeClasses[doc.status] || statusBadgeClasses["Draft for legal review"]}`}>{doc.status}</span>
                      <span className="text-[10px] text-foreground-500">v{doc.version}</span>
                      <span className="text-[10px] text-foreground-500">Updated {doc.lastReviewedDisplay}</span>
                    </div>
                    <span className="text-[11px] text-foreground-500">For: {doc.audience}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        <hr className="mb-10 border-foreground-200/10" />

        <div className="text-center">
          <h2 className="mb-4 text-lg font-medium text-foreground-100" style={{ fontFamily: "'Instrument Serif', serif" }}>Need Help?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => navigate(link.path)}
                className="whitespace-nowrap rounded-md border border-foreground-200/10 bg-background-100 px-4 py-2 text-xs text-foreground-500 transition hover:text-foreground-300 hover:border-foreground-300/30 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}