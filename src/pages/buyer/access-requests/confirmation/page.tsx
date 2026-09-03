import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { getDraft, duplicateDraft } from '@/utils/accessRequestStorage';
import { FORM_STATUS_LABELS } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

export default function AccessRequestConfirmation() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<AccessRequestDraft | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (requestId) {
      const d = getDraft(requestId);
      setDraft(d);
    }
    setLoading(false);
  }, [requestId]);

  if (loading) {
    return (
      <BuyerRouteGuard>
        <BuyerPortalLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <i className="ri-loader-4-line animate-spin text-2xl text-foreground-400"></i>
          </div>
        </BuyerPortalLayout>
      </BuyerRouteGuard>
    );
  }

  if (!draft) {
    return (
      <BuyerRouteGuard>
        <BuyerPortalLayout>
          <div className="p-6 max-w-lg mx-auto text-center">
            <p className="text-foreground-700 font-medium">Request not found.</p>
            <Link to="/app/buyer/access-requests" className="mt-4 inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
              Back to requests
            </Link>
          </div>
        </BuyerPortalLayout>
      </BuyerRouteGuard>
    );
  }

  function handleDuplicate() {
    const dup = duplicateDraft(draft!.id);
    if (dup) navigate(`/app/buyer/access-requests/${dup.id}/edit`);
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-100 flex items-center justify-center">
              <i className="ri-check-line text-2xl text-accent-700"></i>
            </div>
            <h1 className="text-xl font-bold text-foreground-950">Demonstration access request created</h1>
            <p className="text-sm text-foreground-500 mt-1">Your request has been saved locally and assigned a demonstration reference.</p>
          </div>

          {/* Reference + summary */}
          <div className="p-5 rounded-xl border border-background-200/70 bg-background-50 mb-6">
            <div className="text-center mb-4">
              <p className="text-xs text-foreground-500 font-mono">Reference</p>
              <p className="text-lg font-mono font-bold text-foreground-950">{draft.reference}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-foreground-500">Package: </span><span className="text-foreground-700">{draft.packageName}</span></div>
              <div><span className="text-foreground-500">Supplier: </span><span className="text-foreground-700">{draft.supplierName}</span></div>
              <div><span className="text-foreground-500">Status: </span><span className="font-medium text-foreground-800">{FORM_STATUS_LABELS[draft.status]}</span></div>
              <div><span className="text-foreground-500">Submitted: </span><span className="text-foreground-700">{draft.submittedAt ? new Date(draft.submittedAt).toLocaleDateString('en-GB') : '—'}</span></div>
            </div>
          </div>

          {/* Demo notice */}
          <div className="p-4 rounded-lg border border-accent-200/60 bg-accent-50/30 mb-6">
            <p className="text-sm text-accent-900 text-center">
              <span className="font-semibold">This request exists only in this browser.</span><br />
              DataHarbour and the supplier have not received or reviewed it.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to={`/app/buyer/access-requests/${draft.id}`}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap"
            >
              View request
            </Link>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-printer-line mr-1"></i> Print summary
            </button>
            <button
              onClick={handleDuplicate}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap"
            >
              Duplicate as new draft
            </button>
            <Link
              to="/app/buyer/access-requests"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap"
            >
              Return to requests
            </Link>
            <Link
              to="/app/buyer/marketplace"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap"
            >
              Browse marketplace
            </Link>
          </div>
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}