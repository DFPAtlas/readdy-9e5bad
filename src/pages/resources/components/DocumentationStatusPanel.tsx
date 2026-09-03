import { documentationStatusPanels } from "@/data/resources";

export default function DocumentationStatusPanel() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl text-foreground-50 text-center mb-8" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            About this documentation
          </h2>
          <div className="rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 p-6 md:p-8">
            <ul className="space-y-3">
              {documentationStatusPanels.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs leading-relaxed text-foreground-400">
                  <i className="ri-information-line mt-0.5 shrink-0 text-[#ff2e88]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}