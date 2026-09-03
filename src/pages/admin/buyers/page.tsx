import AdminOrganisations from '@/pages/admin/organisations/page';

// Buyers view reuses the organisations list, pre-filtered for buyers.
// The organisations page has type and status filters built in.
export default function AdminBuyers() {
  return <AdminOrganisations />;
}