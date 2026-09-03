import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateAllStages, validateStage, STAGE_LABELS, WORKFLOW_STAGES, generateRequestRef, generateLocalId } from '@/data/accessRequestTypes';
import { submitDraft } from '@/utils/accessRequestStorage';
import { marketplacePackages } from '@/data/marketplacePackages';
import type { AccessRequestDraft, WorkflowStage } from '@/data/accessRequestTypes';

interface AccessRequestReviewProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onBackToStage: (stage: WorkflowStage) => void;
}

export default function AccessRequestReview({ draft, onUpdate, onBackToStage }: AccessRequestReviewProps) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const [expandedStages, setExpandedStages] = useState<Set<WorkflowStage>>(new Set(WORKFLOW_STAGES.slice(0, 10)));

  const validation = validateAllStages(draft);
  const allValid = validation.valid && !draft.involvesReidentificationRisk;
  const pkg = marketplacePackages.find((p) => p.slug === draft.packageSlug);

  function toggleStage(stage: WorkflowStage) {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(stage)) next.delete(stage); else next.add(stage);
      return next;
    });
  }

  function toggleAll() {
    if (expandAll) {
      setExpandedStages(new Set());
      setExpandAll(false);
    } else {
      setExpandedStages(new Set(WORKFLOW_STAGES.slice(0, 10)));
      setExpandAll(true);
    }
  }

  function handleSubmit() {
    if (!allValid || submitting) return;
    setSubmitting(true);
    submitDraft(draft.id);
    navigate(`/app/buyer/access-requests/${draft.id}/confirmation`);
  }

  const stageResults: Record<string, ReturnType<typeof validateStage>> = {};
  for (const s of WORKFLOW_STAGES.slice(0, 10)) {
    stageResults[s] = validateStage(draft, s);
  }

  return (
    <div>
      {/* Validation summary */}
      {!allValid && (
        <div className="mb-5 p-4 rounded-lg border border-accent-200/60 bg-accent-50/30" role="alert">
          <p className="text-sm font-semibold text-accent-900 mb-2">
            {draft.involvesReidentificationRisk
              ? 'Re-identification intent is a prohibited use. You must uncheck this in the Risk and Governance stage before proceeding.'
              : `${validation.errors.length} issue${validation.errors.length !== 1 ? 's' : ''} must be resolved before submission.`}
          </p>
          {validation.errors.length > 0 && (
            <ul className="space-y-0.5">
              {validation.errors.map((e, i) => (
                <li key={i} className="text-xs text-accent-800">{e.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Action bar */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground-900">Review your request</h3>
        <div className="flex items-center gap-2">
          <button onClick={toggleAll} className="text-xs text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
            {expandAll ? 'Collapse all' : 'Expand all'}
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-1 text-xs text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
            <i className="ri-printer-line"></i> Print
          </button>
        </div>
      </div>

      {/* Stage summaries */}
      <div className="space-y-3 mb-6">
        {WORKFLOW_STAGES.slice(0, 10).map((stage) => {
          const result = stageResults[stage];
          const hasErrors = !result.valid;
          const isExpanded = expandedStages.has(stage);

          return (
            <div key={stage} className={`rounded-lg border ${hasErrors ? 'border-accent-200/60' : 'border-background-200/70'}`}>
              <button
                onClick={() => toggleStage(stage)}
                className="w-full flex items-center justify-between p-3 text-left cursor-pointer hover:bg-background-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {result.valid ? (
                    <span className="w-5 h-5 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-xs"><i className="ri-check-line"></i></span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-xs font-bold">!</span>
                  )}
                  <span className="text-sm font-medium text-foreground-800">{STAGE_LABELS[stage]}</span>
                  {hasErrors && <span className="text-[11px] text-accent-600">{result.errors.length} issue{result.errors.length !== 1 ? 's' : ''}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onBackToStage(stage); }}
                    className="text-xs text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap"
                  >
                    Edit
                  </button>
                  <i className={`text-sm text-foreground-400 transition-transform ${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                </div>
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 border-t border-background-100 pt-2">
                  <StageSummary stage={stage} draft={draft} />
                  {hasErrors && (
                    <div className="mt-2">
                      {result.errors.map((e, i) => (
                        <p key={i} className="text-xs text-accent-700 flex items-center gap-1">
                          <i className="ri-error-warning-line text-[10px]"></i> {e.message}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final summary */}
      {allValid && (
        <div className="mb-6 p-4 rounded-lg border border-background-200/70 bg-background-50">
          <h3 className="text-sm font-semibold text-foreground-900 mb-3">Final summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div><span className="text-foreground-500">Package: </span><span className="text-foreground-800">{draft.packageName}</span></div>
            <div><span className="text-foreground-500">Supplier: </span><span className="text-foreground-800">{draft.supplierName}</span></div>
            <div><span className="text-foreground-500">Purpose: </span><span className="text-foreground-800">{draft.primaryPurpose}</span></div>
            <div><span className="text-foreground-500">Users: </span><span className="text-foreground-800">{draft.userGroups.length} group{draft.userGroups.length !== 1 ? 's' : ''}</span></div>
            <div><span className="text-foreground-500">Systems: </span><span className="text-foreground-800">{draft.systems.length} system{draft.systems.length !== 1 ? 's' : ''}</span></div>
            <div><span className="text-foreground-500">Delivery: </span><span className="text-foreground-800">{draft.preferredDeliveryFormat}</span></div>
            <div><span className="text-foreground-500">Retention: </span><span className="text-foreground-800">{draft.proposedRetentionPeriod}</span></div>
            <div><span className="text-foreground-500">Risk flags: </span><span className="text-foreground-800">{countRiskFlags(draft)} identified</span></div>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center justify-between pt-4 border-t border-background-100">
        <Link to="/app/buyer/access-requests" className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
          <i className="ri-arrow-left-line"></i> Return to requests
        </Link>
        <button
          onClick={handleSubmit}
          disabled={!allValid || submitting}
          className={`flex items-center gap-1 px-6 py-2 text-sm font-medium rounded-lg whitespace-nowrap cursor-pointer ${
            allValid && !submitting
              ? 'bg-primary-500 text-background-50 hover:bg-primary-600'
              : 'bg-foreground-200 text-foreground-500 cursor-default'
          }`}
        >
          {submitting ? (
            <><i className="ri-loader-4-line animate-spin"></i> Creating...</>
          ) : (
            <>Submit demonstration request <i className="ri-send-plane-line"></i></>
          )}
        </button>
      </div>

      {allValid && (
        <p className="text-xs text-foreground-400 mt-3 text-center">
          Submitting creates a local demonstration reference only. No data is sent to DataHarbour or the supplier.
        </p>
      )}
    </div>
  );
}

function countRiskFlags(draft: AccessRequestDraft): number {
  const flags = [
    draft.involvesPersonalData, draft.involvesSensitiveAttributes, draft.involvesChildrenOrVulnerable,
    draft.involvesLocationMovementData, draft.involvesLargeScaleProfiling, draft.involvesDatasetMatching,
    draft.involvesReidentificationRisk, draft.involvesAutomatedDecisions, draft.involvesEmploymentHousingCreditInsurance,
    draft.involvesFraudRiskScoring, draft.involvesMarketingActivation, draft.involvesMonitoringSurveillance,
    draft.involvesInternationalAccess, draft.involvesSignificantEffects,
  ];
  return flags.filter(Boolean).length;
}

function StageSummary({ stage, draft }: { stage: WorkflowStage; draft: AccessRequestDraft }) {
  switch (stage) {
    case 'product':
      return (
        <div className="text-xs space-y-1">
          <p><span className="text-foreground-500">Package: </span><span className="text-foreground-700">{draft.packageName}</span></p>
          <p><span className="text-foreground-500">Supplier: </span><span className="text-foreground-700">{draft.supplierName}</span></p>
          <p><span className="text-foreground-500">Acknowledged: </span><span className={draft.productAcknowledged ? 'text-accent-700' : 'text-accent-600'}>{draft.productAcknowledged ? 'Yes' : 'No'}</span></p>
        </div>
      );
    case 'business_purpose':
      return (
        <div className="text-xs space-y-1">
          <p><span className="text-foreground-500">Title: </span><span className="text-foreground-700">{draft.requestTitle || '—'}</span></p>
          <p><span className="text-foreground-500">Purpose: </span><span className="text-foreground-700">{draft.primaryPurpose || '—'}</span></p>
          <p className="text-foreground-600 max-h-20 overflow-y-auto">{draft.detailedIntendedUse.slice(0, 200)}{draft.detailedIntendedUse.length > 200 ? '...' : ''}</p>
        </div>
      );
    case 'users_systems':
      return (
        <div className="text-xs space-y-1">
          <p><span className="text-foreground-500">User groups: </span><span className="text-foreground-700">{draft.userGroups.length}</span></p>
          <p><span className="text-foreground-500">Systems: </span><span className="text-foreground-700">{draft.systems.length}</span></p>
        </div>
      );
    default:
      return <p className="text-xs text-foreground-500">Stage data captured</p>;
  }
}