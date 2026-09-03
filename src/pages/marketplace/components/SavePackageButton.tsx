import { useState, useCallback } from "react";

interface SavePackageButtonProps {
  packageId: string;
  isSaved: boolean;
  onToggle: (id: string) => void;
}

export default function SavePackageButton({ packageId, isSaved, onToggle }: SavePackageButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleClick = useCallback(() => {
    onToggle(packageId);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  }, [packageId, onToggle]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition cursor-pointer ${
          isSaved
            ? "border-accent-400/40 bg-accent-500/20 text-accent-400"
            : "border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40 hover:text-foreground-200"
        }`}
        aria-label={isSaved ? "Remove from saved" : "Save package"}
        aria-pressed={isSaved}
      >
        <i className={`text-sm ${isSaved ? "ri-bookmark-fill" : "ri-bookmark-line"}`} />
      </button>
      {showToast && (
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] whitespace-nowrap text-accent-400 pointer-events-none">
          {isSaved ? "Saved" : "Removed"}
        </span>
      )}
    </div>
  );
}