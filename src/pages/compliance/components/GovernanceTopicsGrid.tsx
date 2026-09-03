import { useNavigate } from "react-router-dom";
import { governanceTopics } from "@/data/compliancePages";

export default function GovernanceTopicsGrid() {
  const navigate = useNavigate();

  const statusBadgeClass = (status: string) =>
    status === "Planned control"
      ? "bg-secondary-500/10 text-secondary-400 border-secondary-500/20"
      : "bg-accent-500/10 text-accent-400 border-accent-500/20";

  return (
    <section className="bg-background-50" id="topics" aria-labelledby="topics-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="topics-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Governance topics
        </h2>
        <p className="mb-10 text-sm text-foreground-400 max-w-2xl">
          Explore each area of the DataHarbour governance framework in detail. Every page includes the current status of controls, related pages and next-step actions.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {governanceTopics.map((topic) => (
            <button
              key={topic.slug}
              type="button"
              onClick={() => navigate(`/compliance/${topic.slug}`)}
              className="group rounded-lg border border-foreground-200/10 bg-background-100/60 p-5 text-left transition hover:border-accent-500/20 cursor-pointer"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-500/10">
                  <i className="ri-arrow-right-up-line text-sm text-accent-400" aria-hidden="true" />
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusBadgeClass(topic.status)}`}
                >
                  {topic.status}
                </span>
              </div>
              <h3 className="mb-1.5 text-sm font-medium text-foreground-100">{topic.title}</h3>
              <p className="mb-3 text-xs leading-relaxed text-foreground-400">{topic.description}</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent-400 group-hover:underline">
                Explore
                <i className="ri-arrow-right-line text-[10px]" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}