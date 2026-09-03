import { Link } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoComplianceItems } from '@/data/buyerData';
import { getCurrentDemoUser, getOnboardingCompletion, getTermsAcceptances } from '@/utils/authStorage';

export default function BuyerCompliance() {
  const user = getCurrentDemoUser();
  const completion = getOnboardingCompletion();
  const acceptances = getTermsAcceptances();

  const statusColor = (status: string) => {
    switch (status) {
      case 'complete_demo': return 'bg-accent-100 text-accent-800';
      case 'action_needed': return 'bg-secondary-100 text-secondary-800';
      case 'planned_review': return 'bg-foreground-100 text-foreground-600';
      case 'expired_demo': return 'bg-foreground-200 text-foreground-700';
      default: return 'bg-foreground-100 text-foreground-500';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'complete_demo': return 'Complete';
      case 'action_needed': return 'Action needed';
      case 'planned_review': return 'Planned review';
      case 'expired_demo': return 'Expired';
      default: return 'Not started';
    }
  };

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-foreground-950 mb-6">Compliance workspace</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Organisation profile */}
            <div className="p-4 rounded-lg border border-background-200/70">
              <h2 className="text-base font-semibold text-foreground-950 mb-3">Organisation profile</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground-500">Name</span>
                  <span className="text-foreground-800">{user?.organisationName || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Reference</span>
                  <span className="text-foreground-800 font-mono text-xs">{completion?.organisationRef || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Account type</span>
                  <span className="text-foreground-800 capitalize">{user?.accountType || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Status</span>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800">Demonstration complete</span>
                </div>
              </div>
            </div>

            {/* Policy acceptances */}
            <div className="p-4 rounded-lg border border-background-200/70">
              <h2 className="text-base font-semibold text-foreground-950 mb-3">Policy acceptances</h2>
              {acceptances.length === 0 ? (
                <p className="text-sm text-foreground-500">No policies accepted yet.</p>
              ) : (
                <div className="space-y-2">
                  {acceptances.map((a) => (
                    <div key={a.documentSlug} className="flex items-center justify-between text-sm">
                      <Link to={`/${a.documentSlug}`} className="text-foreground-700 hover:text-primary-600 capitalize whitespace-nowrap">{a.documentSlug.replace(/-/g, ' ')}</Link>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground-400">v{a.displayVersion}</span>
                        <span className="text-xs text-accent-700 whitespace-nowrap">{formatDate(a.acceptedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Compliance actions */}
          <div className="mt-8">
            <h2 className="text-base font-semibold text-foreground-950 mb-4">Compliance actions</h2>
            <div className="space-y-3">
              {demoComplianceItems.map((item) => (
                <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border ${item.status === 'action_needed' ? 'border-accent-200/60 bg-accent-50/30' : 'border-background-200/70'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-medium text-foreground-500 bg-background-100 px-2 py-0.5 rounded whitespace-nowrap">{item.category}</span>
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${statusColor(item.status)}`}>{statusLabel(item.status)}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground-900">{item.title}</h3>
                    <p className="text-xs text-foreground-500 mt-0.5">{item.description}</p>
                    {item.lastReviewed && (
                      <p className="text-[11px] text-foreground-400 mt-1">Last reviewed: {formatDate(item.lastReviewed)} · Next: {item.nextReviewDue ? formatDate(item.nextReviewDue) : '—'}</p>
                    )}
                  </div>
                  {item.actionRoute && item.status === 'action_needed' && (
                    <Link to={item.actionRoute} className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 whitespace-nowrap">
                      {item.actionLabel || 'Review'}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/contact/compliance" className="flex items-center gap-3 p-3 rounded-lg border border-background-200/70 hover:bg-background-100 transition-colors">
              <i className="ri-mail-line text-foreground-500"></i>
              <span className="text-sm text-foreground-700">Contact compliance</span>
            </Link>
            <Link to="/data-subject-request" className="flex items-center gap-3 p-3 rounded-lg border border-background-200/70 hover:bg-background-100 transition-colors">
              <i className="ri-user-voice-line text-foreground-500"></i>
              <span className="text-sm text-foreground-700">Data-subject request</span>
            </Link>
            <Link to="/contact/security" className="flex items-center gap-3 p-3 rounded-lg border border-background-200/70 hover:bg-background-100 transition-colors">
              <i className="ri-shield-line text-foreground-500"></i>
              <span className="text-sm text-foreground-700">Report security concern</span>
            </Link>
          </div>
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; }
}