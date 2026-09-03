import { useState } from "react";
import type { DataField } from "@/data/marketplacePackages";

interface PackageSamplePreviewProps {
  schema: DataField[];
  sampleData: Record<string, unknown>[];
  schemaAvailable: boolean;
  sampleAvailable: boolean;
}

export default function PackageSamplePreview({
  schema,
  sampleData,
  schemaAvailable,
  sampleAvailable,
}: PackageSamplePreviewProps) {
  const [activeTab, setActiveTab] = useState<"table" | "json">("table");
  const [copied, setCopied] = useState(false);

  if (!sampleAvailable && !schemaAvailable) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleData, null, 2)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSchemaDownload = () => {
    const json = JSON.stringify(schema, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data-package-schema.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="sample" className="mb-10 scroll-mt-28">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2
          className="text-xl text-foreground-50"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Sample Preview
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSchemaDownload}
            className="whitespace-nowrap rounded-md border border-foreground-200/20 px-3 py-1.5 text-[11px] text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
          >
            <i className="ri-download-line mr-1" aria-hidden="true" />
            Download Schema
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="whitespace-nowrap rounded-md border border-foreground-200/20 px-3 py-1.5 text-[11px] text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
          >
            <i className={copied ? "ri-check-line text-accent-400" : "ri-file-copy-line"} aria-hidden="true" />
            <span className="ml-1">{copied ? "Copied" : "Copy JSON"}</span>
          </button>
        </div>
      </div>

      {sampleAvailable && (
        <>
          <div className="mb-3 flex items-center gap-1 rounded-lg border border-foreground-200/10 bg-background-100/60 p-1 w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("table")}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-medium transition cursor-pointer ${
                activeTab === "table"
                  ? "bg-background-50 text-foreground-100 shadow-sm"
                  : "text-foreground-400 hover:text-foreground-200"
              }`}
            >
              Table Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("json")}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-medium transition cursor-pointer ${
                activeTab === "json"
                  ? "bg-background-50 text-foreground-100 shadow-sm"
                  : "text-foreground-400 hover:text-foreground-200"
              }`}
            >
              JSON Preview
            </button>
          </div>

          {activeTab === "table" && sampleData.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-foreground-200/10">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr className="border-b border-foreground-200/10 bg-background-100/60">
                    {Object.keys(sampleData[0]).map((key) => (
                      <th key={key} className="px-3 py-2.5 text-left text-[10px] font-semibold tracking-wide text-foreground-200 uppercase whitespace-nowrap">
                        {key.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground-200/10">
                  {sampleData.map((row, i) => (
                    <tr key={i} className="hover:bg-background-100/40 transition">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-3 py-2 text-[11px] text-foreground-400 font-mono whitespace-nowrap">
                          {typeof val === "object" ? JSON.stringify(val) : String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "json" && (
            <pre className="overflow-x-auto rounded-lg border border-foreground-200/10 bg-background-200/40 p-4 text-[11px] text-foreground-300 font-mono leading-relaxed max-h-[400px] overflow-y-auto">
              {JSON.stringify(sampleData, null, 2)}
            </pre>
          )}
        </>
      )}

      {!sampleAvailable && schemaAvailable && (
        <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-6 text-center">
          <i className="ri-file-list-3-line mb-3 block text-2xl text-foreground-400" aria-hidden="true" />
          <p className="text-sm text-foreground-400">No sample data available for this package, but a schema is available for download.</p>
        </div>
      )}

      <p className="mt-3 text-[10px] text-foreground-500">
        All values shown are fictional demonstration data. No real personal, company or sensitive information is displayed.
      </p>
    </section>
  );
}