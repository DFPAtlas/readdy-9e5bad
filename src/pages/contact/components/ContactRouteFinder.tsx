import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_FINDER_OPTIONS, CONTACT_FORM_CONFIGS } from "@/data/contactTypes";

export default function ContactRouteFinder() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const handleSelect = (answer: string) => {
    setSelected(answer);
    const option = ROUTE_FINDER_OPTIONS.find((o) => o.answer === answer);
    if (option) {
      const config = CONTACT_FORM_CONFIGS[option.mapsTo];
      navigate(config.route);
    }
  };

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-2 text-center text-2xl text-foreground-50 md:text-3xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            What do you need help with?
          </h2>
          <p className="mb-8 text-center text-sm text-foreground-400">
            Select the answer that best describes your enquiry, and we will direct you to the right form.
          </p>

          <div className="space-y-2" role="radiogroup" aria-label="Enquiry route finder">
            {ROUTE_FINDER_OPTIONS.map((option) => {
              const isSelected = selected === option.answer;
              const config = CONTACT_FORM_CONFIGS[option.mapsTo];
              return (
                <button
                  key={option.answer}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelect(option.answer)}
                  className={`w-full flex items-center gap-4 rounded-lg border px-4 py-3.5 text-left text-sm transition cursor-pointer ${
                    isSelected
                      ? "border-accent-400/50 bg-accent-500/5 text-foreground-100"
                      : "border-foreground-200/10 bg-background-100 text-foreground-300 hover:border-foreground-200/20 hover:text-foreground-100"
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-accent-500/15" : "bg-foreground-200/5"}`}>
                    <i className={`${config.iconName} text-sm ${isSelected ? "text-accent-400" : "text-foreground-400"}`} aria-hidden="true" />
                  </div>
                  <span className="flex-1">{option.answer}</span>
                  <i className={`ri-arrow-right-s-line text-lg ${isSelected ? "text-accent-400" : "text-foreground-600"}`} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}