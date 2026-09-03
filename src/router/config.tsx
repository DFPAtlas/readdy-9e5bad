import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Marketplace from "../pages/marketplace/page";
import PackageDetail from "../pages/marketplace/detail/page";
import Compare from "../pages/marketplace/compare/page";
import Solutions from "../pages/solutions/page";
import SolutionDetail from "../pages/solutions/detail/page";
import Compliance from "../pages/compliance/page";
import ComplianceDetail from "../pages/compliance/detail/page";
import Suppliers from "../pages/suppliers/page";
import SupplierStandards from "../pages/suppliers/standards/page";
import SupplierPackageGuidelines from "../pages/suppliers/package-guidelines/page";
import SupplierApply from "../pages/suppliers/apply/page";
import SupplierApplyReview from "../pages/suppliers/apply/review/page";
import SupplierApplyConfirmation from "../pages/suppliers/apply/confirmation/page";
import ApplicationStatus from "../pages/suppliers/application-status/page";
import Resources from "../pages/resources/page";
import GettingStarted from "../pages/resources/getting-started/page";
import ApiOverview from "../pages/resources/api-overview/page";
import Authentication from "../pages/resources/authentication/page";
import ApiReference from "../pages/resources/api-reference/page";
import Webhooks from "../pages/resources/webhooks/page";
import DataFeeds from "../pages/resources/data-feeds/page";
import PackageSchemas from "../pages/resources/package-schemas/page";
import ProvenanceGlossary from "../pages/resources/provenance-glossary/page";
import PermittedUse from "../pages/resources/permitted-use/page";
import IntegrationExamples from "../pages/resources/integration-examples/page";
import Changelog from "../pages/resources/changelog/page";
import Status from "../pages/resources/status/page";
import Pricing from "../pages/pricing/page";
import SignIn from "../pages/sign-in/page";
import CreateAccount from "../pages/create-account/page";
import VerifyEmail from "../pages/verify-email/page";
import ForgotPassword from "../pages/forgot-password/page";
import ResetPassword from "../pages/reset-password/page";
import AcceptInvite from "../pages/accept-invite/page";
import SignOut from "../pages/sign-out/page";
import OnboardingEntry from "../pages/onboarding/page";
import OrganisationStage from "../pages/onboarding/organisation/page";
import IntendedUseStage from "../pages/onboarding/intended-use/page";
import TeamStage from "../pages/onboarding/team/page";
import OnboardingReview from "../pages/onboarding/review/page";
import OnboardingComplete from "../pages/onboarding/complete/page";
import AccountDemo from "../pages/account-demo/page";
import Contact from "../pages/contact/page";
import BuyerEnquiry from "../pages/contact/buyer/page";
import SupplierEnquiry from "../pages/contact/supplier/page";
import EnterpriseEnquiry from "../pages/contact/enterprise/page";
import TechnicalSupport from "../pages/contact/technical-support/page";
import ComplianceEnquiry from "../pages/contact/compliance/page";
import SecurityReport from "../pages/contact/security/page";
import GeneralContact from "../pages/contact/general/page";
import Privacy from "../pages/privacy/page";
import Cookies from "../pages/cookies/page";
import CookieSettings from "../pages/cookie-settings/page";
import AcceptableUse from "../pages/acceptable-use/page";
import BuyerTerms from "../pages/buyer-terms/page";
import SupplierTerms from "../pages/supplier-terms/page";
import MarketplaceTerms from "../pages/marketplace-terms/page";
import DataProcessingTerms from "../pages/data-processing-terms/page";
import DataRetentionPolicy from "../pages/data-retention-policy/page";
import SecurityStatement from "../pages/security-statement/page";
import Subprocessors from "../pages/subprocessors/page";
import Complaints from "../pages/complaints/page";
import LegalCentre from "../pages/legal/page";
import DataSubjectRequest from "../pages/data-subject-request/page";
import BuyerDashboard from "../pages/buyer/dashboard/page";
import BuyerMarketplace from "../pages/buyer/marketplace/page";
import BuyerSaved from "../pages/buyer/saved/page";
import BuyerComparisons from "../pages/buyer/comparisons/page";
import BuyerAccessRequests from "../pages/buyer/access-requests/page";
import BuyerAccessRequestNew from "../pages/buyer/access-requests/new/page";
import BuyerAccessRequestDetail from "../pages/buyer/access-requests/detail/page";
import BuyerAccessRequestEdit from "../pages/buyer/access-requests/edit/page";
import BuyerAccessRequestReview from "../pages/buyer/access-requests/review/page";
import BuyerAccessRequestConfirmation from "../pages/buyer/access-requests/confirmation/page";
import BuyerAccessRequestMessages from "../pages/buyer/access-requests/messages/page";
import BuyerAccessRequestDocuments from "../pages/buyer/access-requests/documents/page";
import BuyerAccessRequestHistory from "../pages/buyer/access-requests/history/page";
import BuyerSubscriptions from "../pages/buyer/subscriptions/page";
import BuyerDeliveries from "../pages/buyer/deliveries/page";
import BuyerApiKeys from "../pages/buyer/api-keys/page";
import BuyerUsage from "../pages/buyer/usage/page";
import BuyerBilling from "../pages/buyer/billing/page";
import BuyerTeam from "../pages/buyer/team/page";
import BuyerCompliance from "../pages/buyer/compliance/page";
import BuyerNotifications from "../pages/buyer/notifications/page";
import BuyerSettings from "../pages/buyer/settings/page";
import AdminDashboard from "../pages/admin/dashboard/page";
import AdminOrganisations from "../pages/admin/organisations/page";
import AdminOrganisationDetail from "../pages/admin/organisations/detail/page";
import AdminBuyers from "../pages/admin/buyers/page";
import AdminSuppliers from "../pages/admin/suppliers/page";
import AdminSupplierApplications from "../pages/admin/supplier-applications/page";
import AdminSupplierApplicationDetail from "../pages/admin/supplier-applications/detail/page";
import AdminPackages from "../pages/admin/packages/page";
import AdminPackageDetail from "../pages/admin/packages/detail/page";
import AdminAccessRequests from "../pages/admin/access-requests/page";
import AdminAccessRequestDetail from "../pages/admin/access-requests/detail/page";
import AdminCompliance from "../pages/admin/compliance/page";
import AdminDataSubjectRequests from "../pages/admin/data-subject-requests/page";
import AdminSecurityReports from "../pages/admin/security-reports/page";
import AdminSupport from "../pages/admin/support/page";
import AdminContracts from "../pages/admin/contracts/page";
import AdminBilling from "../pages/admin/billing/page";
import AdminDeliveries from "../pages/admin/deliveries/page";
import AdminApiUsage from "../pages/admin/api-usage/page";
import AdminAuditLog from "../pages/admin/audit-log/page";
import AdminContent from "../pages/admin/content/page";
import AdminUsers from "../pages/admin/users/page";
import AdminRoles from "../pages/admin/roles/page";
import AdminSystemSettings from "../pages/admin/system-settings/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/marketplace/compare",
    element: <Compare />,
  },
  {
    path: "/marketplace/:packageSlug",
    element: <PackageDetail />,
  },
  {
    path: "/solutions",
    element: <Solutions />,
  },
  {
    path: "/solutions/:solutionSlug",
    element: <SolutionDetail />,
  },
  {
    path: "/compliance",
    element: <Compliance />,
  },
  {
    path: "/compliance/:complianceSlug",
    element: <ComplianceDetail />,
  },
  {
    path: "/suppliers",
    element: <Suppliers />,
  },
  {
    path: "/suppliers/standards",
    element: <SupplierStandards />,
  },
  {
    path: "/suppliers/package-guidelines",
    element: <SupplierPackageGuidelines />,
  },
  {
    path: "/suppliers/apply",
    element: <SupplierApply />,
  },
  {
    path: "/suppliers/apply/review",
    element: <SupplierApplyReview />,
  },
  {
    path: "/suppliers/apply/confirmation",
    element: <SupplierApplyConfirmation />,
  },
  {
    path: "/suppliers/application-status",
    element: <ApplicationStatus />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/resources/getting-started",
    element: <GettingStarted />,
  },
  {
    path: "/resources/api-overview",
    element: <ApiOverview />,
  },
  {
    path: "/resources/authentication",
    element: <Authentication />,
  },
  {
    path: "/resources/api-reference",
    element: <ApiReference />,
  },
  {
    path: "/resources/webhooks",
    element: <Webhooks />,
  },
  {
    path: "/resources/data-feeds",
    element: <DataFeeds />,
  },
  {
    path: "/resources/package-schemas",
    element: <PackageSchemas />,
  },
  {
    path: "/resources/provenance-glossary",
    element: <ProvenanceGlossary />,
  },
  {
    path: "/resources/permitted-use",
    element: <PermittedUse />,
  },
  {
    path: "/resources/integration-examples",
    element: <IntegrationExamples />,
  },
  {
    path: "/resources/changelog",
    element: <Changelog />,
  },
  {
    path: "/resources/status",
    element: <Status />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/accept-invite",
    element: <AcceptInvite />,
  },
  {
    path: "/sign-out",
    element: <SignOut />,
  },
  {
    path: "/onboarding",
    element: <OnboardingEntry />,
  },
  {
    path: "/onboarding/organisation",
    element: <OrganisationStage />,
  },
  {
    path: "/onboarding/intended-use",
    element: <IntendedUseStage />,
  },
  {
    path: "/onboarding/team",
    element: <TeamStage />,
  },
  {
    path: "/onboarding/review",
    element: <OnboardingReview />,
  },
  {
    path: "/onboarding/complete",
    element: <OnboardingComplete />,
  },
  {
    path: "/account-demo",
    element: <AccountDemo />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/contact/buyer",
    element: <BuyerEnquiry />,
  },
  {
    path: "/contact/supplier",
    element: <SupplierEnquiry />,
  },
  {
    path: "/contact/enterprise",
    element: <EnterpriseEnquiry />,
  },
  {
    path: "/contact/technical-support",
    element: <TechnicalSupport />,
  },
  {
    path: "/contact/compliance",
    element: <ComplianceEnquiry />,
  },
  {
    path: "/contact/security",
    element: <SecurityReport />,
  },
  {
    path: "/contact/general",
    element: <GeneralContact />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/cookies",
    element: <Cookies />,
  },
  {
    path: "/cookie-settings",
    element: <CookieSettings />,
  },
  {
    path: "/acceptable-use",
    element: <AcceptableUse />,
  },
  {
    path: "/buyer-terms",
    element: <BuyerTerms />,
  },
  {
    path: "/supplier-terms",
    element: <SupplierTerms />,
  },
  {
    path: "/marketplace-terms",
    element: <MarketplaceTerms />,
  },
  {
    path: "/data-processing-terms",
    element: <DataProcessingTerms />,
  },
  {
    path: "/data-retention-policy",
    element: <DataRetentionPolicy />,
  },
  {
    path: "/security-statement",
    element: <SecurityStatement />,
  },
  {
    path: "/subprocessors",
    element: <Subprocessors />,
  },
  {
    path: "/complaints",
    element: <Complaints />,
  },
  {
    path: "/legal",
    element: <LegalCentre />,
  },
  {
    path: "/data-subject-request",
    element: <DataSubjectRequest />,
  },
  {
    path: "/app/buyer/dashboard",
    element: <BuyerDashboard />,
  },
  {
    path: "/app/buyer/marketplace",
    element: <BuyerMarketplace />,
  },
  {
    path: "/app/buyer/saved",
    element: <BuyerSaved />,
  },
  {
    path: "/app/buyer/comparisons",
    element: <BuyerComparisons />,
  },
  {
    path: "/app/buyer/access-requests",
    element: <BuyerAccessRequests />,
  },
  {
    path: "/app/buyer/access-requests/new",
    element: <BuyerAccessRequestNew />,
  },
  {
    path: "/app/buyer/access-requests/:requestId/confirmation",
    element: <BuyerAccessRequestConfirmation />,
  },
  {
    path: "/app/buyer/access-requests/:requestId/edit",
    element: <BuyerAccessRequestEdit />,
  },
  {
    path: "/app/buyer/access-requests/:requestId/review",
    element: <BuyerAccessRequestReview />,
  },
  {
    path: "/app/buyer/access-requests/:requestId/messages",
    element: <BuyerAccessRequestMessages />,
  },
  {
    path: "/app/buyer/access-requests/:requestId/documents",
    element: <BuyerAccessRequestDocuments />,
  },
  {
    path: "/app/buyer/access-requests/:requestId/history",
    element: <BuyerAccessRequestHistory />,
  },
  {
    path: "/app/buyer/access-requests/:requestId",
    element: <BuyerAccessRequestDetail />,
  },
  {
    path: "/app/buyer/subscriptions",
    element: <BuyerSubscriptions />,
  },
  {
    path: "/app/buyer/deliveries",
    element: <BuyerDeliveries />,
  },
  {
    path: "/app/buyer/api-keys",
    element: <BuyerApiKeys />,
  },
  {
    path: "/app/buyer/usage",
    element: <BuyerUsage />,
  },
  {
    path: "/app/buyer/billing",
    element: <BuyerBilling />,
  },
  {
    path: "/app/buyer/team",
    element: <BuyerTeam />,
  },
  {
    path: "/app/buyer/compliance",
    element: <BuyerCompliance />,
  },
  {
    path: "/app/buyer/notifications",
    element: <BuyerNotifications />,
  },
  {
    path: "/app/buyer/settings",
    element: <BuyerSettings />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/organisations",
    element: <AdminOrganisations />,
  },
  {
    path: "/admin/organisations/:organisationId",
    element: <AdminOrganisationDetail />,
  },
  {
    path: "/admin/buyers",
    element: <AdminBuyers />,
  },
  {
    path: "/admin/suppliers",
    element: <AdminSuppliers />,
  },
  {
    path: "/admin/supplier-applications",
    element: <AdminSupplierApplications />,
  },
  {
    path: "/admin/supplier-applications/:applicationId",
    element: <AdminSupplierApplicationDetail />,
  },
  {
    path: "/admin/packages",
    element: <AdminPackages />,
  },
  {
    path: "/admin/packages/:packageId",
    element: <AdminPackageDetail />,
  },
  {
    path: "/admin/access-requests",
    element: <AdminAccessRequests />,
  },
  {
    path: "/admin/access-requests/:requestId",
    element: <AdminAccessRequestDetail />,
  },
  {
    path: "/admin/compliance",
    element: <AdminCompliance />,
  },
  {
    path: "/admin/data-subject-requests",
    element: <AdminDataSubjectRequests />,
  },
  {
    path: "/admin/security-reports",
    element: <AdminSecurityReports />,
  },
  {
    path: "/admin/support",
    element: <AdminSupport />,
  },
  {
    path: "/admin/contracts",
    element: <AdminContracts />,
  },
  {
    path: "/admin/billing",
    element: <AdminBilling />,
  },
  {
    path: "/admin/deliveries",
    element: <AdminDeliveries />,
  },
  {
    path: "/admin/api-usage",
    element: <AdminApiUsage />,
  },
  {
    path: "/admin/audit-log",
    element: <AdminAuditLog />,
  },
  {
    path: "/admin/content",
    element: <AdminContent />,
  },
  {
    path: "/admin/users",
    element: <AdminUsers />,
  },
  {
    path: "/admin/roles",
    element: <AdminRoles />,
  },
  {
    path: "/admin/system-settings",
    element: <AdminSystemSettings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;