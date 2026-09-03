import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import SupplierHero from "./components/SupplierHero";
import SupplierProposition from "./components/SupplierProposition";
import SuitableSupplierGrid from "./components/SuitableSupplierGrid";
import AcceptedProductTypes from "./components/AcceptedProductTypes";
import SupplierProcess from "./components/SupplierProcess";
import CommercialModelGrid from "./components/CommercialModelGrid";
import SupplierDeliveryOptions from "./components/SupplierDeliveryOptions";
import SupplierEvidencePanel from "./components/SupplierEvidencePanel";
import SupplierQualityGrid from "./components/SupplierQualityGrid";
import ControlledAccessPanel from "./components/ControlledAccessPanel";
import SupplierWorkspacePreview from "./components/SupplierWorkspacePreview";
import SupplierFaq from "./components/SupplierFaq";

export default function SuppliersHub() {
  const navigate = useNavigate();

  return (
    <>
      <PublicHeader />
      <SupplierHero />
      <SupplierProposition />
      <SuitableSupplierGrid />
      <AcceptedProductTypes />
      <SupplierProcess />
      <CommercialModelGrid />
      <SupplierDeliveryOptions />
      <SupplierEvidencePanel />
      <SupplierQualityGrid />
      <ControlledAccessPanel />
      <SupplierWorkspacePreview />
      <SupplierFaq />

      {/* Final CTA */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl text-foreground-50 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Prepare your product for responsible distribution
            </h2>
            <p className="text-sm text-foreground-400 mb-8">
              DataHarbour is being built for suppliers that take provenance, quality and controlled access seriously. If that describes your organisation, we would like to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/suppliers/apply")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 cursor-pointer"
              >
                Start supplier application
                <i className="ri-arrow-right-line" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/suppliers/standards")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
              >
                Review standards
              </button>
              <button
                type="button"
                onClick={() => navigate("/contact?type=supplier")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
              >
                Ask a supplier question
              </button>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}