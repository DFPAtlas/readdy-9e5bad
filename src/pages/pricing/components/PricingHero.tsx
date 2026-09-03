import { useNavigate } from "react-router-dom";

export default function PricingHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-6 md:pb-20 md:pt-18">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
            Pricing and Commercial Models
          </p>
          <h1 className="text-3xl text-foreground-50 md:text-4xl lg:text-5xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Flexible access for governed data products
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-foreground-400 md:text-base">
            DataHarbour is being designed to support organisation memberships, individual product licences, usage-based services and enterprise agreements.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/pricing#buyer-plans"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 cursor-pointer"
            >
              Explore buyer plans
              <i className="ri-arrow-down-line" />
            </a>
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
            >
              Browse marketplace products
            </button>
          </div>
          <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-foreground-200/10 bg-background-100/60 px-5 py-4">
            <p className="text-xs leading-relaxed text-foreground-500">
              <i className="ri-information-line mr-1.5 align-middle text-sm" />
              Prices and allowances shown on this page are illustrative demonstration figures. Final pricing, taxes, supplier charges and contract terms may differ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}