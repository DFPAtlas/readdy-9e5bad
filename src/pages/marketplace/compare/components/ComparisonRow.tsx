interface ComparisonRowProps {
  label: string;
  displayValues: string[];
  hasDiff: boolean;
  highlightDiffs: boolean;
  important?: boolean;
}

export default function ComparisonRow({
  label,
  displayValues,
  hasDiff,
  highlightDiffs,
  important,
}: ComparisonRowProps) {
  const showDiff = highlightDiffs && hasDiff;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-start ${
        showDiff
          ? "bg-accent-500/5 border-l-2 border-accent-400/40"
          : important
            ? "bg-background-200/20"
            : ""
      }`}
    >
      {/* Label column */}
      <div className="flex-shrink-0 sm:w-44 px-5 py-2.5">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[11px] font-medium ${
              important ? "text-foreground-200" : "text-foreground-400"
            }`}
          >
            {label}
          </span>
          {showDiff && (
            <span className="text-[10px] text-accent-400 whitespace-nowrap" aria-label="Value differs between packages">
              <i className="ri-contrast-drop-fill" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>

      {/* Value columns */}
      <div className="flex-1 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {displayValues.map((val, i) => (
          <div
            key={i}
            className={`px-5 py-2.5 text-[11px] leading-relaxed ${
              showDiff
                ? "text-foreground-200 font-medium"
                : "text-foreground-400"
            }`}
            style={{ wordBreak: "break-word" }}
          >
            {val || "—"}
          </div>
        ))}
      </div>
    </div>
  );
}