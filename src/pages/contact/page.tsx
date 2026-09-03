import ContactHero from "@/pages/contact/components/ContactHero";
import ContactRouteGrid from "@/pages/contact/components/ContactRouteGrid";
import ContactRouteFinder from "@/pages/contact/components/ContactRouteFinder";
import BeforeContact from "@/pages/contact/components/BeforeContact";
import SectionHeading from "@/components/base/SectionHeading";
import FaqAccordion from "@/components/base/FaqAccordion";
import { CONTACT_FAQ_ITEMS } from "@/data/contactTypes";
import { useNavigate } from "react-router-dom";

export default function ContactHub() {
  const navigate = useNavigate();

  return (
    <>
      <ContactHero />
      <ContactRouteFinder />
      <ContactRouteGrid />
      <BeforeContact />

      {/* FAQ */}
      <section id="contact-faq" className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <SectionHeading
            label="Common Questions"
            heading="Frequently asked about contacting DataHarbour"
            supporting="Find quick answers about enquiry routes, form status and what to expect."
          />
          <div className="mt-8">
            <FaqAccordion items={CONTACT_FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18 text-center">
          <h2 className="text-2xl text-foreground-50 md:text-3xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Still not sure which route to take?
          </h2>
          <p className="mt-3 text-sm text-foreground-400">
            Use the General Contact form for anything that does not fit the other categories.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/contact/general")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              General Contact
              <i className="ri-arrow-right-line" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              Browse Marketplace
            </button>
          </div>
        </div>
      </section>
    </>
  );
}