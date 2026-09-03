import { useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import CodeBlock from "@/pages/resources/components/CodeBlock";
import type { ResourceArticle, ResourceSection, ResourceTable } from "@/data/resources";

interface ResourceArticleLayoutProps {
  article: ResourceArticle;
  children?: ReactNode;
}

const statusColors: Record<string, string> = {
  "Demonstration documentation": "bg-foreground-200/10 text-foreground-400",
  Planned: "bg-secondary-100 text-secondary-700",
  Draft: "bg-foreground-200/10 text-foreground-500",
  "Concept preview": "bg-accent-100 text-accent-700",
};

export default function ResourceArticleLayout({ article, children }: ResourceArticleLayoutProps) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  const sectionIds = useMemo(
    () => article.sections.map((s) => s.id),
    [article.sections],
  );

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      setActiveSection(sectionIds[0] || "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return (
    <>
      <PublicHeader />

      {/* Breadcrumb */}
      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li>
              <button type="button" onClick={() => navigate("/resources")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">
                Resources
              </button>
            </li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            {article.category !== article.title && (
              <>
                <li className="text-foreground-600">{article.category}</li>
                <li className="text-foreground-600" aria-hidden="true">/</li>
              </>
            )}
            <li className="text-foreground-300">{article.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-3xl">
            {article.eyebrow && (
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
                {article.eyebrow}
              </p>
            )}
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              {article.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground-400">{article.summary}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusColors[article.status] || "bg-foreground-200/10 text-foreground-500"}`}>
                {article.status}
              </span>
              {article.audience.map((a) => (
                <span key={a} className="rounded-full bg-foreground-200/10 px-2.5 py-0.5 text-[11px] font-medium text-foreground-500">
                  {a}
                </span>
              ))}
              <span className="text-[11px] text-foreground-600">
                Last updated: {article.lastUpdatedDisplay}
              </span>
            </div>

            {/* Demonstration notice */}
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3 flex items-start gap-3">
              <i className="ri-information-line mt-0.5 shrink-0 text-sm text-[#ff2e88]" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-foreground-400">
                This article contains demonstration content. Endpoints, credentials and examples are fictional and non-operational.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content area */}
      <div className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex gap-10">
            {/* Sidebar nav */}
            <aside className="hidden w-56 shrink-0 lg:block">
              <div className="sticky top-24">
                <p className="text-[11px] font-semibold text-foreground-500 uppercase tracking-wider mb-3">On this page</p>
                <nav aria-label="Section navigation">
                  <ul className="space-y-1">
                    {article.sections.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(s.id)}
                          className={`w-full text-left text-xs py-1.5 px-2 rounded transition cursor-pointer ${
                            activeSection === s.id
                              ? "text-primary-300 bg-primary-400/10 font-medium"
                              : "text-foreground-500 hover:text-foreground-300"
                          }`}
                        >
                          {s.heading}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <main className="min-w-0 flex-1">
              <div className="mx-auto max-w-3xl space-y-12">
                {article.sections.map((section) => (
                  <article key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                      {section.heading}
                    </h2>

                    {section.content && section.contentType !== "code" && section.contentType !== "callout" && section.contentType !== "faq" && (
                      <div
                        className="prose-custom text-sm leading-relaxed text-foreground-400"
                        dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
                      />
                    )}

                    {renderSectionContent(section)}
                  </article>
                ))}

                {/* Previous / Next navigation */}
                {article.relatedSlugs.length > 0 && (
                  <div className="pt-8 border-t border-foreground-200/10">
                    <h3 className="text-sm font-semibold text-foreground-300 mb-4">Related resources</h3>
                    <div className="flex flex-wrap gap-3">
                      {article.relatedSlugs.map((slug) => (
                        <button
                          key={slug}
                          type="button"
                          onClick={() => navigate(`/resources/${slug}`)}
                          className="rounded-lg border border-foreground-200/10 bg-background-50 px-4 py-2.5 text-sm text-foreground-300 transition hover:border-primary-400/30 hover:text-foreground-100 cursor-pointer"
                        >
                          {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          <i className="ri-arrow-right-line ml-1.5 text-xs text-foreground-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact support */}
                <div className="rounded-lg border border-foreground-200/10 bg-background-50 p-6">
                  <h3 className="text-sm font-semibold text-foreground-200">Need help?</h3>
                  <p className="mt-1 text-xs text-foreground-500">
                    Have a technical question, integration-planning query or security concern?
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(`/contact?type=technical&topic=${article.slug}`)}
                      className="whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
                    >
                      Contact support
                      <i className="ri-arrow-right-line ml-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {children}

      <PublicFooter />
    </>
  );
}

function renderSectionContent(section: ResourceSection): ReactNode {
  const ct = section.contentType;

  if (ct === "code" && section.code) {
    return <CodeBlock language={section.code.language} code={section.code.code} label={section.code.label} />;
  }

  if (ct === "callout") {
    const isDemo = section.calloutType === "demonstration";
    const isWarn = section.calloutType === "warning";
    const isPlanned = section.calloutType === "planned";

    return (
      <div
        className={`rounded-lg border px-4 py-3 mt-3 ${
          isDemo ? "border-[#ff2e88]/15 bg-[#ff2e88]/5" :
          isWarn ? "border-secondary-200 bg-secondary-50" :
          isPlanned ? "border-accent-200 bg-accent-50" :
          "border-primary-400/15 bg-primary-400/5"
        }`}
      >
        <div className="flex items-start gap-3">
          <i
            className={`mt-0.5 shrink-0 text-sm ${
              isWarn ? "ri-error-warning-line text-secondary-600" :
              isPlanned ? "ri-time-line text-accent-600" :
              "ri-information-line text-[#ff2e88]"
            }`}
            aria-hidden="true"
          />
          <p className="text-xs leading-relaxed text-foreground-400">{section.content}</p>
        </div>
        {section.checklistItems && (
          <ul className="mt-3 space-y-1.5">
            {section.checklistItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground-500">
                <i className={`ri-close-circle-line mt-0.5 shrink-0 ${isWarn ? "text-secondary-500" : "text-[#ff2e88]"}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (ct === "checklist" && section.checklistItems) {
    return (
      <ul className="mt-3 space-y-2">
        {section.checklistItems.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-foreground-400">
            <i className="ri-checkbox-circle-line mt-0.5 shrink-0 text-primary-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (ct === "table" && section.table) {
    return <ResourceTableDisplay table={section.table} />;
  }

  if (ct === "faq" && section.items) {
    return (
      <div className="mt-3 space-y-4">
        {section.items.map((item, i) => (
          <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
            <p className="text-sm font-medium text-foreground-200">{item.term}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground-500">{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  if (ct === "glossary" && section.glossaryTerms) {
    return (
      <div className="mt-3 space-y-3">
        {section.glossaryTerms.map((term, i) => (
          <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
            <p className="text-sm font-semibold text-foreground-200">{term.term}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground-500">{term.definition}</p>
          </div>
        ))}
      </div>
    );
  }

  if (ct === "steps" && section.steps) {
    return (
      <div className="mt-3 space-y-4">
        {section.steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/10">
              <span className="text-xs font-semibold text-primary-400">{i + 1}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground-200">{step.label}</p>
              <p className="text-xs text-foreground-500 mt-0.5">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Items without a special content type
  if (section.items) {
    return (
      <div className="mt-3 space-y-3">
        {section.items.map((item, i) => (
          <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
            {item.term && <p className="text-sm font-semibold text-foreground-200 mb-1">{item.term}</p>}
            <p className="text-xs leading-relaxed text-foreground-500">{item.description}</p>
            {item.children && (
              <ul className="mt-2 space-y-1 ml-4">
                {item.children.map((child, j) => (
                  <li key={j} className="text-xs text-foreground-500 flex items-start gap-2">
                    <span className="text-foreground-600">&mdash;</span>
                    {child.term && <span className="font-medium text-foreground-400">{child.term}:</span>}
                    <span>{child.description}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function ResourceTableDisplay({ table }: { table: ResourceTable }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-foreground-200/10">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-foreground-200/10 bg-foreground-200/5">
            {table.headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-medium text-foreground-300 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-b border-foreground-200/10 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-foreground-400">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatContent(content: string): string {
  return content
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    .replace(/<p><\/p>/g, "");
}