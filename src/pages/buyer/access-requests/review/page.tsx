import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import AccessRequestReview from '@/pages/buyer/access-requests/components/AccessRequestReview';
import { getDraft, saveDraft } from '@/utils/accessRequestStorage';
import type { AccessRequestDraft, WorkflowStage } from '@/data/accessRequestTypes';

export default function AccessRequestReviewPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<AccessRequestDraft | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (requestId) {
      const d = getDraft(requestId);
      if (d && d.status !== 'draft') {
        navigate(`/app/buyer/access-requests/${requestId}`, { replace: true });
        return;
      }
      setDraft(d);
    }
    setLoading(false);
  }, [requestId, navigate]);

  function handleUpdate(updated: AccessRequestDraft) {
    setDraft(updated);
  }

  function handleBackToStage(stage: WorkflowStage) {
    if (draft) navigate(`/app/buyer/access-requests/${draft.id}/edit`);
  }

  if (loading) {
    return <BuyerRouteGuard><BuyerPortalLayout><div className="flex items-center justify-center min-h-[400px]"><i className="ri-loader-4-line animate-spin text-2xl text-foreground-400"></i></div></BuyerPortalLayout></BuyerRouteGuard>;
  }

  if (!draft) {
    return <BuyerRouteGuard><BuyerPortalLayout><div className="p-6 max-w-lg mx-auto text-center"><p className="text-foreground-700 font-medium">Request not found.</p><Link to="/app/buyer/access-requests" className="mt-4 inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">Back to requests</Link></div></BuyerPortalLayout></BuyerRouteGuard>;
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
          <Link to={`/app/buyer/access-requests/${draft.id}`} className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700 mb-4 cursor-pointer whitespace-nowrap">
            <i className="ri-arrow-left-line"></i> Back to request
          </Link>
          <AccessRequestReview draft={draft} onUpdate={handleUpdate} onBackToStage={handleBackToStage} />
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}