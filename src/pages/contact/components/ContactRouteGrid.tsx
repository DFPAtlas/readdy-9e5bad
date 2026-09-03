import { useNavigate } from "react-router-dom";
import { CONTACT_FORM_CONFIGS } from "@/data/contactTypes";
import type { EnquiryType } from "@/data/contactTypes";

const routeOrder: EnquiryType[] = ["buyer", "supplier", "enterprise", "technical", "compliance", "security", "data-subject", "general"];

export default function ContactRouteGrid() {
  const navigate = useNavigate();

  return (
    <section id="contact-routes" className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2 className="mb-2 text-center text-2xl text-foreground-50 md:text-3xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
          Choose your enquiry route
        </h2>
        <p className="mb-10 text-center text-sm text-foreground-400">
          Select the option that best matches what you need help with.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {routeOrder.map((type) => {
            const config = CONTACT_FORM_CONFIGS[type];
            return (
              <div
                key={type}
                className="group flex flex-col rounded-xl border border-foreground-200/10 bg-background-50 p-5 transition hover:border-foreground-200/20 cursor-pointer"
                onClick={() => navigate(config.route)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(config.route);
                  }
                }}
                role="link"
                tabIndex={0}
                aria-label={`${config.label} — ${config.audience}`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/10">
                  <i className={`${config.iconName} text-lg text-accent-400`} aria-hidden="true" />
                </div>
                <h3 className="mb-1 text-sm font-medium text-foreground-100">{config.label}</h3>
                <p className="mb-3 text-xs leading-relaxed text-foreground-500">{config.audience}</p>
                <div className="mb-2 space-y-1">
                  {config.typicalTopics.map((t) => (
                    <span key={t} className="inline-block mr-1 mb-1 rounded-full border border-foreground-200/10 bg-background-100 px-2 py-0.5 text-[10px] text-foreground-400">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-auto text-[10px] text-foreground-600">
                  <strong className="text-foreground-400">Prepare:</strong> {config.prepareInfo}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}