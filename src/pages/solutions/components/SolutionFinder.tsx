import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { solutionFinderMapping } from "@/data/solutions";

const finderOptions = [
  { id: "understand-a-market", label: "Understand a market", icon: "ri-line-chart-line" },
  { id: "verify-a-business", label: "Verify a business", icon: "ri-building-line" },
  { id: "enrich-business-or-customer-records", label: "Enrich business or customer records", icon: "ri-database-2-line" },
  { id: "identify-fraud-signals", label: "Identify fraud signals", icon: "ri-shield-flash-line" },
  { id: "evaluate-a-location", label: "Evaluate a location", icon: "ri-map-pin-line" },
  { id: "plan-an-audience", label: "Plan an audience", icon: "ri-user-heart-line" },
  { id: "assess-commercial-risk", label: "Assess commercial risk", icon: "ri-alert-line" },
  { id: "access-research-and-trends", label: "Access research and trends", icon: "ri-bar-chart-grouped-line" },
];

export default function SolutionFinder() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSelect = (id: string) => {
    setSelected(id);
    const slug = solutionFinderMapping[id];
    const el = cardRefs.current[slug];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus({ preventScroll: true });
    }
  };

  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => setSelected(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  return (
    <section id="solution-finder" className="bg-background-50" aria-labelledby="finder-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="finder-heading"
            className="mb-2 text-2xl text-foreground-50 md:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            What are you trying to achieve?
          </h2>
          <p className="mb-8 text-sm text-foreground-400">Select your business objective and we&apos;ll point you to the relevant solution.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {finderOptions.map((opt) => {
            const isActive = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition cursor-pointer ${
                  isActive
                    ? "border-accent-400/40 bg-accent-500/5 text-accent-400"
                    : "border-foreground-200/10 bg-background-100/60 text-foreground-300 hover:border-foreground-200/20 hover:text-foreground-100"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full transition ${isActive ? "bg-accent-500/10" : "bg-background-200/40"}`}>
                  <i className={`${opt.icon} text-lg`} aria-hidden="true" />
                </div>
                <span className="text-xs font-medium leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-6 mx-auto max-w-lg rounded-lg border border-accent-400/20 bg-accent-500/5 px-5 py-3.5 text-center">
            <p className="text-sm text-accent-300">
              <span className="font-medium">Recommended solution highlighted below</span> — scroll down to explore it in detail.
            </p>
          </div>
        )}
      </div>

      {/* Hidden refs for scroll targets */}
      {Object.keys(solutionFinderMapping).map((key) => {
        const slug = solutionFinderMapping[key];
        return (
          <div
            key={slug}
            ref={(el) => { cardRefs.current[slug] = el; }}
            className="sr-only"
            aria-hidden="true"
          />
        );
      })}
    </section>
  );
}