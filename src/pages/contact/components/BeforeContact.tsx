import { BEFORE_CONTACT_ITEMS } from "@/data/contactTypes";

export default function BeforeContact() {
  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-2 text-center text-2xl text-foreground-50 md:text-3xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Before you contact us
          </h2>
          <p className="mb-8 text-center text-sm text-foreground-400">
            Please review these guidelines to help direct your enquiry correctly.
          </p>

          <div className="rounded-xl border border-foreground-200/10 bg-background-50 p-5 space-y-3">
            {BEFORE_CONTACT_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground-200/5">
                  <i className={`${item.icon} text-xs text-foreground-400`} aria-hidden="true" />
                </div>
                <p className="text-xs leading-relaxed text-foreground-400 pt-0.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}