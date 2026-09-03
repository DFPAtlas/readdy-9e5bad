import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/base/PrimaryButton";
import SecondaryButton from "@/components/base/SecondaryButton";

export default function ContactHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 md:px-6 md:pb-14 md:pt-18">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
            Contact DataHarbour
          </p>
          <h1 className="text-3xl text-foreground-50 md:text-4xl lg:text-5xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Direct your enquiry to the right team
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-foreground-400 md:text-base">
            Choose the route that best matches your data, supplier, technical, compliance or commercial question.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton onClick={() => {
              const el = document.getElementById("contact-routes");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>
              Choose an enquiry type
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/contact#contact-faq")}>
              Browse common questions
            </SecondaryButton>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3 flex items-start gap-3">
            <i className="ri-information-line mt-0.5 shrink-0 text-sm text-[#ff2e88]" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-foreground-400">
              Forms in this build are demonstrations. Information is stored only in this browser and is not sent to DataHarbour.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}