import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompliancePage } from "@/data/compliancePages";
import ComplianceBreadcrumb from "./components/ComplianceBreadcrumb";
import CompliancePageHeader from "./components/CompliancePageHeader";
import ComplianceSectionNav from "./components/ComplianceSectionNav";
import ComplianceWarning from "./components/ComplianceWarning";
import ComplianceProcess from "./components/ComplianceProcess";
import ComplianceChecklist from "./components/ComplianceChecklist";
import ComplianceRequirementsList from "./components/ComplianceRequirementsList";
import ComplianceFaqSection from "./components/ComplianceFaqSection";
import RelatedCompliancePages from "./components/RelatedCompliancePages";
import ProhibitedUseList from "./components/ProhibitedUseList";

export default function ComplianceDetail() {
  const { complianceSlug } = useParams<{ complianceSlug: string }>();
  const navigate = useNavigate();

  const page = useMemo(() => {
    if (!complianceSlug) return undefined;
    return getCompliancePage(complianceSlug);
  }, [complianceSlug]);

  // Not found state
  if (!page) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background-200/60">
          <i className="ri-file-unknow-line text-2xl text-foreground-400" aria-hidden="true" />
        </div>
        <h1
          className="mb-2 text-2xl text-foreground-50"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Page not found
        </h1>
        <p className="mb-6 text-sm text-foreground-400">
          We couldn&apos;t find a compliance page matching this reference. It may have been removed or the link may be incorrect.
        </p>
        <button
          type="button"
          onClick={() => navigate("/compliance")}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-5 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          <i className="ri-arrow-left-line" aria-hidden="true" />
          Back to Compliance Centre
        </button>
      </div>
    );
  }

  // Build section nav items from sections
  const sectionNavItems = (page.sections ?? []).map((s) => ({
    label: s.title,
    anchor: s.anchor,
  }));

  // Add extra nav items for other sections
  if (page.processSteps && page.processSteps.length > 0) {
    sectionNavItems.push({ label: "Provenance journey", anchor: "process" });
  }
  if (page.requirements && page.requirements.length > 0) {
    sectionNavItems.push({ label: "Requirements", anchor: "requirements" });
  }
  if (page.checklist && page.checklist.length > 0) {
    sectionNavItems.push({ label: "Checklist", anchor: "checklist" });
  }
  if (page.prohibitedUseGroups && page.prohibitedUseGroups.length > 0) {
    sectionNavItems.push({ label: "Prohibited uses", anchor: "prohibited-list" });
  }
  if (page.faqs && page.faqs.length > 0) {
    sectionNavItems.push({ label: "FAQs", anchor: "faqs" });
  }
  if (page.relatedPageSlugs.length > 0) {
    sectionNavItems.push({ label: "Related pages", anchor: "related" });
  }

  return (
    <>
      <ComplianceBreadcrumb page={page} />
      <CompliancePageHeader page={page} />
      {page.legalNotice && <ComplianceWarning />}

      {/* Introduction */}
      <section className="bg-background-50" id="intro">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <div className="max-w-3xl">
            <p className="text-sm leading-relaxed text-foreground-300">{page.intro}</p>
          </div>
        </div>
      </section>

      {/* Section navigation */}
      {sectionNavItems.length > 1 && <ComplianceSectionNav items={sectionNavItems} />}

      {/* Content sections */}
      {page.sections && page.sections.length > 0 && (
        <div className={page.sections.length % 2 === 0 ? "" : ""}>
          {page.sections.map((section, i) => (
            <section
              key={section.anchor}
              id={section.anchor}
              className={i % 2 === 0 ? "bg-background-100" : "bg-background-50"}
              aria-labelledby={`sec-${section.anchor}`}
            >
              <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
                <h3
                  id={`sec-${section.anchor}`}
                  className="mb-3 text-lg text-foreground-100"
                  style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                >
                  {section.title}
                </h3>
                <div className="max-w-3xl text-sm leading-relaxed text-foreground-300">
                  {section.content}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Process steps */}
      {page.processSteps && page.processSteps.length > 0 && (
        <ComplianceProcess steps={page.processSteps} />
      )}

      {/* Requirements */}
      {page.requirements && page.requirements.length > 0 && (
        <ComplianceRequirementsList requirements={page.requirements} />
      )}

      {/* Checklist */}
      {page.checklist && page.checklist.length > 0 && (
        <ComplianceChecklist items={page.checklist} />
      )}

      {/* Prohibited use groups */}
      {page.prohibitedUseGroups && page.prohibitedUseGroups.length > 0 && (
        <ProhibitedUseList groups={page.prohibitedUseGroups} />
      )}

      {/* FAQs */}
      {page.faqs && page.faqs.length > 0 && (
        <ComplianceFaqSection faqs={page.faqs} />
      )}

      {/* Related pages */}
      {page.relatedPageSlugs.length > 0 && (
        <RelatedCompliancePages relatedSlugs={page.relatedPageSlugs} />
      )}

      {/* Next step CTA */}
      {page.nextStepText && page.nextStepLink && (
        <section className="bg-background-100">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18 text-center">
            <h2
              className="mb-2 text-2xl text-foreground-50 md:text-3xl"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              {page.nextStepText}
            </h2>
            <button
              type="button"
              onClick={() => navigate(page.nextStepLink!)}
              className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              <i className="ri-arrow-right-line" aria-hidden="true" />
              Continue
            </button>
          </div>
        </section>
      )}

      {/* Bottom legal notice */}
      {page.legalNotice && (
        <section className="bg-background-50">
          <div className="mx-auto max-w-7xl px-4 pb-14 md:px-6 md:pb-18">
            <ComplianceWarning />
          </div>
        </section>
      )}
    </>
  );
}