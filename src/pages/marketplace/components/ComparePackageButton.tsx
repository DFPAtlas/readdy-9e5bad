import { useCallback } from "react";

interface ComparePackageButtonProps {
  packageId: string;
  isComparing: boolean;
  isAtLimit: boolean;
  onToggle: (id: string) => void;
}

export default function ComparePackageButton({
  packageId,
  isComparing,
  isAtLimit,
  onToggle,
}: ComparePackageButtonProps) {
  const handleClick = useCallback(() => {
    onToggle(packageId);
  }, [packageId, onToggle]);

  return (
    <label className="flex items-center gap-1.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={isComparing}
        onChange={handleClick}
        disabled={!isComparing && isAtLimit}
        className="h-3.5 w-3.5 rounded border-foreground-200/30 bg-transparent text-accent-500 focus:ring-accent-500/30 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      />
      <span className="text-[11px] text-foreground-400 whitespace-nowrap">
        {isComparing ? "Added" : "Compare"}
      </span>
      {!isComparing && isAtLimit && (
        <span className="text-[10px] text-foreground-500 whitespace-nowrap">(max 4)</span>
      )}
    </label>
  );
}