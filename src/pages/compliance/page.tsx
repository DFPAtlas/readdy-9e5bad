import ComplianceHero from "./components/ComplianceHero";
import TrustModel from "./components/TrustModel";
import CompliancePrincipleGrid from "./components/CompliancePrincipleGrid";
import BuyerSupplierOverview from "./components/BuyerSupplierOverview";
import AccessReviewLevels from "./components/AccessReviewLevels";
import GovernanceTopicsGrid from "./components/GovernanceTopicsGrid";
import HigherRiskUsePanel from "./components/HigherRiskUsePanel";
import PolicyStatusList from "./components/PolicyStatusList";
import ComplianceHubFaq from "./components/ComplianceHubFaq";
import ContactEscalation from "./components/ContactEscalation";
import ComplianceWarning from "./detail/components/ComplianceWarning";

export default function ComplianceHub() {
  return (
    <>
      <ComplianceHero />
      <TrustModel />
      <CompliancePrincipleGrid />
      <BuyerSupplierOverview />
      <AccessReviewLevels />
      <GovernanceTopicsGrid />
      <HigherRiskUsePanel />
      <PolicyStatusList />
      <ComplianceHubFaq />
      <ContactEscalation />
      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 pb-14 md:px-6 md:pb-18">
          <ComplianceWarning />
        </div>
      </section>
    </>
  );
}