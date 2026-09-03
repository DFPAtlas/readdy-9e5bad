import { useCallback } from "react";

interface ClearComparisonDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  packageCount: number;
}

export default function ClearComparisonDialog({ isOpen, onConfirm, onCancel, packageCount }: ClearComparisonDialogProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Clear comparison confirmation"
      onKeyDown={handleKeyDown}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} aria-hidden="true" />
      <div className="relative w-full max-w-sm rounded-lg border border-foreground-200/10 bg-background-100 p-6 shadow-2xl">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff2e88]/10">
          <i className="ri-error-warning-line text-lg text-[#ff2e88]" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-base font-semibold text-foreground-50">Clear comparison?</h3>
        <p className="mb-5 text-xs leading-relaxed text-foreground-400">
          This will remove all {packageCount} package{packageCount !== 1 ? "s" : ""} from your comparison. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2.5 text-sm text-foreground-300 transition hover:border-foreground-200/40 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 whitespace-nowrap rounded-lg bg-[#ff2e88] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#ff2e88]/80 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}