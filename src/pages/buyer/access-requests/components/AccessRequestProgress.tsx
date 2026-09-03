import { WORKFLOW_STAGES, STAGE_LABELS, STAGE_NUMBERS, getStageErrorCounts } from '@/data/accessRequestTypes';
import type { AccessRequestDraft, WorkflowStage } from '@/data/accessRequestTypes';

interface AccessRequestProgressProps {
  draft: AccessRequestDraft;
  currentStage: WorkflowStage;
  onStageClick: (stage: WorkflowStage) => void;
}

export default function AccessRequestProgress({ draft, currentStage, onStageClick }: AccessRequestProgressProps) {
  const errorCounts = getStageErrorCounts(draft);
  const currentIdx = WORKFLOW_STAGES.indexOf(currentStage);

  return (
    <div className="w-full">
      {/* Desktop progress bar */}
      <div className="hidden lg:flex items-center gap-0.5">
        {WORKFLOW_STAGES.map((stage, idx) => {
          const isActive = stage === currentStage;
          const isCompleted = idx < currentIdx;
          const isFuture = idx > currentIdx;
          const errors = errorCounts[stage] || 0;
          const stageNum = STAGE_NUMBERS[stage];

          return (
            <div key={stage} className="flex items-center flex-1 min-w-0">
              {idx > 0 && (
                <div className={`h-0.5 flex-1 min-w-[8px] ${isCompleted ? 'bg-primary-400' : 'bg-background-200'}`} />
              )}
              <button
                onClick={() => onStageClick(stage)}
                disabled={isFuture}
                className={`relative flex items-center justify-center shrink-0 w-7 h-7 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary-500 text-background-50 ring-2 ring-primary-200'
                    : isCompleted
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-background-100 text-foreground-400'
                } ${isFuture ? 'cursor-default' : 'hover:bg-primary-200'}`}
                title={`${STAGE_LABELS[stage]}${errors > 0 ? ` — ${errors} error${errors !== 1 ? 's' : ''}` : ''}`}
                aria-label={`Stage ${stageNum}: ${STAGE_LABELS[stage]}${isCompleted ? ' — completed' : ''}${isActive ? ' — current' : ''}`}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? (
                  <i className="ri-check-line text-xs"></i>
                ) : (
                  stageNum
                )}
                {errors > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent-500 text-background-50 text-[9px] font-bold flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile: "Step X of 11" indicator */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-foreground-500">
            Stage {STAGE_NUMBERS[currentStage]} of {WORKFLOW_STAGES.length}
          </span>
          <span className="text-xs text-foreground-400">
            {STAGE_LABELS[currentStage]}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-background-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / WORKFLOW_STAGES.length) * 100}%` }}
          />
        </div>
        {/* Mobile stage pills */}
        <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isActive = stage === currentStage;
            const isCompleted = idx < currentIdx;
            const errors = errorCounts[stage] || 0;
            return (
              <button
                key={stage}
                onClick={() => onStageClick(stage)}
                disabled={idx > currentIdx}
                className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-primary-500 text-background-50'
                    : isCompleted
                      ? 'bg-primary-50 text-primary-600'
                      : 'bg-background-100 text-foreground-400'
                } ${idx > currentIdx ? 'cursor-default' : ''}`}
              >
                {isCompleted && <i className="ri-check-line text-[10px]"></i>}
                {idx + 1}
                {errors > 0 && ` (${errors})`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}