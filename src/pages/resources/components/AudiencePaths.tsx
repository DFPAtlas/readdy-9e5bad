import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { audiencePaths, resourceCategories } from "@/data/resources";

export default function AudiencePaths() {
  const navigate = useNavigate();
  const [activeAudience, setActiveAudience] = useState(0);

  const currentAudience = audiencePaths[activeAudience];
  const guideDetails = currentAudience.guides
    .map((slug) => resourceCategories.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Choose your path
          </h2>
          <p className="mt-3 text-sm text-foreground-400">
            Guided entry points tailored to your role.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {audiencePaths.map((audience, i) => (
              <button
                key={audience.slug}
                type="button"
                onClick={() => setActiveAudience(i)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  i === activeAudience
                    ? "bg-primary-500 text-background-950"
                    : "border border-foreground-200/20 bg-background-50 text-foreground-400 hover:border-foreground-200/40 hover:text-foreground-200"
                }`}
              >
                {audience.title}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-foreground-200/10 bg-background-50 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground-200">{currentAudience.title}</h3>
            <p className="mt-2 text-sm text-foreground-400">{currentAudience.description}</p>

            <div className="mt-6">
              <p className="text-xs font-medium text-foreground-500 uppercase tracking-wide mb-3">
                Recommended guides
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {guideDetails.map((guide) =>
                  guide ? (
                    <button
                      key={guide.slug}
                      type="button"
                      onClick={() => navigate(`/resources/${guide.slug}`)}
                      className="flex items-center gap-3 rounded-lg border border-foreground-200/10 p-3 text-left transition hover:border-primary-400/20 cursor-pointer"
                    >
                      <i className="ri-arrow-right-circle-line text-primary-400" />
                      <div>
                        <span className="text-sm font-medium text-foreground-200">{guide.title}</span>
                        <p className="text-xs text-foreground-500 mt-0.5">{guide.audience}</p>
                      </div>
                    </button>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}