import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import { serviceStatusItems, fictionalIncidents, statusPageContent } from "@/data/resources";

const statusColors: Record<string, { dot: string; text: string }> = {
  "Demonstration only": { dot: "bg-foreground-400", text: "text-foreground-400" },
  "Planned": { dot: "bg-accent-400", text: "text-accent-400" },
  "Operational preview": { dot: "bg-green-400", text: "text-green-400" },
  "Maintenance example": { dot: "bg-amber-400", text: "text-amber-400" },
  "Incident example": { dot: "bg-red-400", text: "text-red-400" },
};

export default function ServiceStatus() {
  const navigate = useNavigate();

  return (
    <>
      <PublicHeader />

      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/resources")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Resources</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Service Status</li>
          </ol>
        </div>
      </nav>

      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Service Status</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Platform status preview
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground-400">
              A design preview of how the planned service-status page would look. This is not a live operational monitoring service.
            </p>

            {/* Overall status */}
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 shrink-0 rounded-full bg-foreground-400" aria-hidden="true" />
                <p className="text-sm font-semibold text-foreground-300">{statusPageContent.overallStatus}</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-foreground-200/10 bg-background-100 p-4">
              <p className="text-xs text-foreground-400">{statusPageContent.notice}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service items */}
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl text-foreground-100 mb-6" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Services</h2>
            <div className="space-y-3">
              {serviceStatusItems.map((item) => {
                const colors = statusColors[item.status] || statusColors["Demonstration only"];
                return (
                  <div key={item.name} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4 flex items-start gap-3">
                    <span className={`mt-1.5 flex h-2.5 w-2.5 shrink-0 rounded-full ${colors.dot}`} aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-foreground-200">{item.name}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${colors.dot}/20 ${colors.text}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-foreground-500">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Incident history */}
            <h2 className="text-xl text-foreground-100 mt-10 mb-6" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Incident history (fictional examples)
            </h2>
            <div className="space-y-4">
              {fictionalIncidents.map((incident, i) => (
                <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="text-sm font-medium text-foreground-200">{incident.title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${incident.status === "Resolved" ? "bg-green-500/15 text-green-400" : "bg-foreground-200/10 text-foreground-400"}`}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-xs text-foreground-500">{incident.description}</p>
                  <p className="mt-2 text-[11px] text-foreground-600">{incident.date}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-foreground-200/10">
              <p className="text-xs text-foreground-500 mb-4">
                This page is a design preview. In a live platform, it would show real-time service status, incident reports and maintenance schedules. No uptime guarantees, SLAs or real-time monitoring are implied.
              </p>
              <h3 className="text-sm font-semibold text-foreground-300 mb-4">Related resources</h3>
              <div className="flex flex-wrap gap-3">
                {["changelog", "getting-started", "api-reference"].map((slug) => (
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