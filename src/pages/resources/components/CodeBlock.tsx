import { useState, useCallback } from "react";

interface CodeBlockProps {
  language: string;
  code: string;
  label?: string;
}

export default function CodeBlock({ language, code, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [code]);

  return (
    <div className="my-4 rounded-lg border border-foreground-200/10 overflow-hidden" role="region" aria-label={label || `Code example in ${language}`}>
      <div className="flex items-center justify-between bg-foreground-200/10 px-4 py-2">
        <span className="text-xs font-medium text-foreground-400">{label || language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] text-foreground-400 transition hover:bg-foreground-200/10 hover:text-foreground-200 cursor-pointer"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <i className="ri-check-line text-xs" aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <i className="ri-file-copy-line text-xs" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto bg-black/60 p-4">
        <pre className="text-xs leading-relaxed text-foreground-200 font-mono whitespace-pre">
          <code>{escapeHtml(code)}</code>
        </pre>
      </div>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}