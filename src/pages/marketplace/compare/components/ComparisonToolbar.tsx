interface ComparisonToolbarProps {
  highlightDiffs: boolean;
  hideIdentical: boolean;
  allExpanded: boolean;
  onToggleHighlight: () => void;
  onToggleHideIdentical: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onReset: () => void;
  onPrint: () => void;
}

export default function ComparisonToolbar({
  highlightDiffs,
  hideIdentical,
  allExpanded,
  onToggleHighlight,
  onToggleHideIdentical,
  onExpandAll,
  onCollapseAll,
  onReset,
  onPrint,
}: ComparisonToolbarProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 rounded-lg border border-foreground-200/10 bg-background-100/60 px-4 py-2.5">
      <span className="text-[11px] font-medium text-foreground-500 whitespace-nowrap mr-1">View:</span>

      <button
        type="button"
        onClick={onToggleHighlight}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition cursor-pointer whitespace-nowrap ${
          highlightDiffs
            ? "bg-accent-500/20 text-accent-400"
            : "bg-background-200/60 text-foreground-400 hover:text-foreground-200"
        }`}
        aria-pressed={highlightDiffs}
      >
        <i className={`text-xs ${highlightDiffs ? "ri-contrast-drop-fill" : "ri-contrast-drop-line"}`} aria-hidden="true" />
        Differences
        {highlightDiffs && (
          <span className="ml-0.5 text-[10px] text-accent-400/60">on</span>
        )}
      </button>

      <button
        type="button"
        onClick={onToggleHideIdentical}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition cursor-pointer whitespace-nowrap ${
          hideIdentical
            ? "bg-accent-500/20 text-accent-400"
            : "bg-background-200/60 text-foreground-400 hover:text-foreground-200"
        }`}
        aria-pressed={hideIdentical}
      >
        <i className={`text-xs ${hideIdentical ? "ri-eye-off-fill" : "ri-eye-off-line"}`} aria-hidden="true" />
        Hide identical
      </button>

      <span className="mx-1 h-4 w-px bg-foreground-200/20" aria-hidden="true" />

      {allExpanded ? (
        <button
          type="button"
          onClick={onCollapseAll}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium bg-background-200/60 text-foreground-400 transition hover:text-foreground-200 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-arrow-up-s-line text-xs" aria-hidden="true" />
          Collapse all
        </button>
      ) : (
        <button
          type="button"
          onClick={onExpandAll}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium bg-background-200/60 text-foreground-400 transition hover:text-foreground-200 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-arrow-down-s-line text-xs" aria-hidden="true" />
          Expand all
        </button>
      )}

      <span className="mx-1 h-4 w-px bg-foreground-200/20" aria-hidden="true" />

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] text-foreground-400 transition hover:text-foreground-200 cursor-pointer whitespace-nowrap"
      >
        <i className="ri-refresh-line text-xs" aria-hidden="true" />
        Reset view
      </button>

      <button
        type="button"
        onClick={onPrint}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] text-foreground-400 transition hover:text-foreground-200 cursor-pointer whitespace-nowrap ml-auto"
      >
        <i className="ri-printer-line text-xs" aria-hidden="true" />
        Print
      </button>
    </div>
  );
}