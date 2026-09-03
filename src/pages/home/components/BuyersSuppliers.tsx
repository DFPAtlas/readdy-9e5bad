import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/base/SectionHeading";

export default function BuyersSuppliers() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Buyers */}
          <div className="rounded-lg border border-foreground-200/10 bg-background-100/50 p-8 backdrop-blur-sm">
            <span className="mb-4 inline-block text-[10px] font-semibold tracking-[0.2em] text-primary-400 uppercase">For Buyers</span>
            <h3 className="mb-3 text-2xl text-foreground-50 md:text-3xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Find trusted intelligence.
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-foreground-400">
              Compare package coverage, provenance, refresh schedules, delivery methods and permitted uses before requesting access.
            </p>
            <ul className="mb-8 space-y-2.5">
              {[
                "Search structured products",
                "Compare package quality",
                "Review provenance",
                "Request controlled access",
                "Manage subscriptions",
                "Monitor usage",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-foreground-300">
                  <i className="ri-check-line text-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Explore as a Buyer
            </button>
          </div>

          {/* Suppliers */}
          <div className="rounded-lg border border-foreground-200/10 bg-background-100/50 p-8 backdrop-blur-sm">
            <span className="mb-4 inline-block text-[10px] font-semibold tracking-[0.2em] text-accent-400 uppercase">For Suppliers</span>
            <h3 className="mb-3 text-2xl text-foreground-50 md:text-3xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Turn responsible data products into commercial services.
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-foreground-400">
              Create structured listings, document source provenance, manage buyer requests and deliver approved products through controlled channels.
            </p>
            <ul className="mb-8 space-y-2.5">
              {[
                "Build package listings",
                "Document data sources",
                "Set permitted uses",
                "Review buyer applications",
                "Manage package versions",
                "Track package activity",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-foreground-300">
                  <i className="ri-check-line text-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate("/suppliers")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              Become a Supplier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}