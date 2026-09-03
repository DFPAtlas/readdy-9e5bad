import { useState, useCallback, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import AccessRequestWorkflow from '@/pages/buyer/access-requests/components/AccessRequestWorkflow';
import AccessRequestReview from '@/pages/buyer/access-requests/components/AccessRequestReview';
import Stage1Product from '@/pages/buyer/access-requests/components/stages/Stage1Product';
import Stage2BusinessPurpose from '@/pages/buyer/access-requests/components/stages/Stage2BusinessPurpose';
import Stage3UsersSystems from '@/pages/buyer/access-requests/components/stages/Stage3UsersSystems';
import Stage4DataScope from '@/pages/buyer/access-requests/components/stages/Stage4DataScope';
import Stage5Delivery from '@/pages/buyer/access-requests/components/stages/Stage5Delivery';
import Stage6Retention from '@/pages/buyer/access-requests/components/stages/Stage6Retention';
import Stage7Sharing from '@/pages/buyer/access-requests/components/stages/Stage7Sharing';
import Stage8Risk from '@/pages/buyer/access-requests/components/stages/Stage8Risk';
import Stage9Security from '@/pages/buyer/access-requests/components/stages/Stage9Security';
import Stage10Declarations from '@/pages/buyer/access-requests/components/stages/Stage10Declarations';
import { marketplacePackages } from '@/data/marketplacePackages';
import { createDraft, getDraft, saveDraft, getPrevStage, getNextStage } from '@/utils/accessRequestStorage';
import { WORKFLOW_STAGES } from '@/data/accessRequestTypes';
import type { AccessRequestDraft, WorkflowStage } from '@/data/accessRequestTypes';

// This page handles both /new (create from scratch) and /:requestId/edit (edit existing draft)
export default function AccessRequestWorkflowPage() {
  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <WorkflowContent />
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function WorkflowContent() {
  const { requestId } = useParams<{ requestId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [draft, setDraft] = useState<AccessRequestDraft | null>(null);
  const [currentStage, setCurrentStage] = useState<WorkflowStage>('product');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load or create draft
  useEffect(() => {
    if (requestId) {
      // Edit existing
      const existing = getDraft(requestId);
      if (!existing) {
        setError('Draft not found. It may have been deleted.');
        setLoading(false);
        return;
      }
      if (existing.status !== 'draft') {
        setError('This request has already been submitted and cannot be edited. Create a revised draft instead.');
        setLoading(false);
        return;
      }
      setDraft(existing);
      setCurrentStage(existing.currentStage);
    } else {
      // New from package context
      const packageSlug = searchParams.get('package');
      if (!packageSlug) {
        setError('No package selected. Please start from the marketplace.');
        setLoading(false);
        return;
      }
      const pkg = marketplacePackages.find((p) => p.slug === packageSlug);
      if (!pkg) {
        setError('Package not found.');
        setLoading(false);
        return;
      }
      const newDraft = createDraft(pkg.slug, pkg.name, pkg.supplier);
      setDraft(newDraft);
      setCurrentStage('product');
    }
    setLoading(false);
  }, [requestId, searchParams]);

  const handleStageChange = useCallback((stage: WorkflowStage) => {
    setCurrentStage(stage);
    if (draft) {
      const updated = { ...draft, currentStage: stage };
      setDraft(updated);
    }
    window.scrollTo(0, 0);
  }, [draft]);

  const handleDraftUpdate = useCallback((updated: AccessRequestDraft) => {
    setDraft(updated);
  }, []);

  const handleNext = useCallback(() => {
    const next = getNextStage(currentStage);
    if (next) handleStageChange(next);
  }, [currentStage, handleStageChange]);

  const handlePrev = useCallback(() => {
    const prev = getPrevStage(currentStage);
    if (prev) handleStageChange(prev);
  }, [currentStage, handleStageChange]);

  const handleBackToStage = useCallback((stage: WorkflowStage) => {
    handleStageChange(stage);
  }, [handleStageChange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <i className="ri-loader-4-line animate-spin text-2xl text-foreground-400"></i>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <i className="ri-error-warning-line text-3xl text-foreground-300 mb-3 block"></i>
        <p className="text-foreground-700 font-medium">{error}</p>
        <button onClick={() => navigate('/app/buyer/access-requests')} className="mt-4 inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
          <i className="ri-arrow-left-line"></i> Back to requests
        </button>
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <p className="text-foreground-700">Initialising...</p>
      </div>
    );
  }

  const stageComponents: Record<WorkflowStage, React.ReactNode> = {
    product: <Stage1Product draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={null} />,
    business_purpose: <Stage2BusinessPurpose draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    users_systems: <Stage3UsersSystems draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    data_scope: <Stage4DataScope draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    delivery: <Stage5Delivery draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    retention: <Stage6Retention draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    sharing: <Stage7Sharing draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    risk: <Stage8Risk draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    security_documents: <Stage9Security draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    declarations: <Stage10Declarations draft={draft} onUpdate={handleDraftUpdate} onNext={handleNext} onPrev={handlePrev} />,
    review: <AccessRequestReview draft={draft} onUpdate={handleDraftUpdate} onBackToStage={handleBackToStage} />,
  };

  return (
    <AccessRequestWorkflow
      draft={draft}
      currentStage={currentStage}
      onStageChange={handleStageChange}
      onDraftUpdate={handleDraftUpdate}
    >
      {stageComponents[currentStage]}
    </AccessRequestWorkflow>
  );
}