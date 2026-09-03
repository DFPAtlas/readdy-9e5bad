import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AccessRequestProgress from '@/pages/buyer/access-requests/components/AccessRequestProgress';
import { debouncedSaveDraft, getDraft } from '@/utils/accessRequestStorage';
import { STAGE_LABELS } from '@/data/accessRequestTypes';
import type { AccessRequestDraft, WorkflowStage } from '@/data/accessRequestTypes';

interface AccessRequestWorkflowProps {
  draft: AccessRequestDraft;
  currentStage: WorkflowStage;
  onStageChange: (stage: WorkflowStage) => void;
  onDraftUpdate: (updated: AccessRequestDraft) => void;
  children: React.ReactNode;
}

export default function AccessRequestWorkflow({
  draft,
  currentStage,
  onStageChange,
  onDraftUpdate,
  children,
}: AccessRequestWorkflowProps) {
  const [saveIndicator, setSaveIndicator] = useState<'saved' | 'saving' | 'idle'>('idle');

  // Autosave on draft change
  useEffect(() => {
    if (draft.status === 'submitted_demo') return;
    setSaveIndicator('saving');
    debouncedSaveDraft(draft);
    const timer = setTimeout(() => {
      setSaveIndicator('saved');
      setTimeout(() => setSaveIndicator('idle'), 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [draft]);

  const handleStageClick = useCallback((stage: WorkflowStage) => {
    onStageChange(stage);
  }, [onStageChange]);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Top bar: back link + save state + demo notice */}
      <div className="flex items-center justify-between mb-4">
        <Link
          to="/app/buyer/access-requests"
          className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-arrow-left-line"></i> Back to requests
        </Link>
        <div className="flex items-center gap-3">
          {saveIndicator !== 'idle' && (
            <span className="text-xs text-foreground-400 whitespace-nowrap">
              {saveIndicator === 'saving' ? (
                <><i className="ri-loader-4-line animate-spin mr-1 inline-block"></i> Saving...</>
              ) : (
                <><i className="ri-check-line mr-1 inline-block"></i> Saved locally</>
              )}
            </span>
          )}
          {draft.status === 'draft' && (
            <Link
              to="/app/buyer/access-requests"
              className="text-xs text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap"
            >
              Save and exit
            </Link>
          )}
        </div>
      </div>

      {/* Demo notice */}
      <div className="mb-5 p-3 rounded-lg bg-accent-50 border border-accent-200/60 text-xs text-accent-900">
        <span className="font-semibold">Demonstration only — </span>
        This access request is stored only in this browser. It is not sent to DataHarbour or the supplier and cannot grant access.
      </div>

      {/* Package + org summary */}
      <div className="mb-5 p-4 rounded-lg border border-background-200/70 bg-background-50">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground-950 truncate">{draft.packageName}</h1>
            <p className="text-sm text-foreground-500">{draft.supplierName}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-accent-100 text-accent-800 whitespace-nowrap">
              Demonstration
            </span>
            {draft.reference && (
              <span className="text-xs font-mono text-foreground-500 whitespace-nowrap">{draft.reference}</span>
            )}
          </div>
        </div>
        {draft.requestTitle && (
          <p className="text-sm text-foreground-600 mt-2 border-t border-background-100 pt-2">{draft.requestTitle}</p>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <AccessRequestProgress
          draft={draft}
          currentStage={currentStage}
          onStageClick={handleStageClick}
        />
      </div>

      {/* Current stage heading */}
      <div className="mb-5">
        <h2 className="text-base font-semibold text-foreground-950">
          {STAGE_LABELS[currentStage]}
        </h2>
      </div>

      {/* Stage content (injected as children) */}
      {children}
    </div>
  );
}