import { useNavigate } from "react-router-dom";

const escalationRoutes = [
  {
    label: "General compliance enquiry",
    icon: "ri-mail-line",
    href: "/contact?type=compliance&topic=general",
    description: "Questions about governance, standards or policies.",
  },
  {
    label: "Report a security concern",
    icon: "ri-shield-flash-line",
    href: "/contact?type=compliance&topic=security",
    description: "Vulnerability reports or security incidents.",
  },
  {
    label: "Data-subject request",
    icon: "ri-user-voice-line",
    href: "/data-subject-request",
    description: "Access, correction, deletion or objection requests.",
  },
  {
    label: "Submit a complaint",
    icon: "ri-error-warning-line",
    href: "/contact?type=compliance&topic=complaint",
    description: "Concerns about data misuse or compliance issues.",
  },
  {
    label: "Supplier provenance question",
    icon: "ri-draft-line",
    href: "/contact?type=compliance&topic=provenance",
    description: "Questions about a supplier's provenance documentation.",
  },
];

export default function ContactEscalation() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50" id="contact" aria-labelledby="esc-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="esc-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Contact and escalation
        </h2>
        <p className="mb-10 text-sm text-foreground-400 max-w-2xl">
          Use the appropriate route below to raise a compliance question, report a concern, submit a data-subject request or contact the DataHarbour governance team.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {escalationRoutes.map((route) => (
            <button
              key={route.label}
              type="button"
              onClick={() => navigate(route.href)}
              className="group rounded-lg border border-foreground-200/10 bg-background-100/60 p-5 text-left transition hover:border-foreground-200/20 cursor-pointer"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-background-200/60">
                <i className={`${route.icon} text-sm text-foreground-400`} aria-hidden="true" />
              </div>
              <h3 className="mb-1 text-sm font-medium text-foreground-100">{route.label}</h3>
              <p className="text-xs text-foreground-500">{route.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}