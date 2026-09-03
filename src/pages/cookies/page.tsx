import { DOCUMENT_BY_SLUG, cookieDefinitions } from "@/data/legalDocuments";
import LegalDocumentLayout from "@/pages/legal/components/LegalDocumentLayout";

export default function CookiesPage() {
  const categoryColors: Record<string, string> = {
    "Strictly necessary": "bg-secondary-100 text-secondary-800",
    "Preferences": "bg-accent-100 text-accent-800",
    "Analytics": "bg-secondary-100/60 text-secondary-700",
    "Marketing": "bg-accent-100/60 text-accent-700",
  };

  return (
    <LegalDocumentLayout document={DOCUMENT_BY_SLUG.cookies}>
      <section className="mt-12 scroll-mt-24" id="cookie-table">
        <h2 className="mb-4 text-lg font-medium text-foreground-100" style={{ fontFamily: "'Instrument Serif', serif" }}>Cookie and Storage Table</h2>
        <div className="overflow-x-auto rounded-lg border border-foreground-200/10">
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-foreground-200/10 bg-background-100">
                <th className="px-3 py-2.5 font-medium text-foreground-300">Name</th>
                <th className="px-3 py-2.5 font-medium text-foreground-300">Provider</th>
                <th className="px-3 py-2.5 font-medium text-foreground-300">Category</th>
                <th className="px-3 py-2.5 font-medium text-foreground-300">Purpose</th>
                <th className="px-3 py-2.5 font-medium text-foreground-300">Duration</th>
                <th className="px-3 py-2.5 font-medium text-foreground-300">Type</th>
                <th className="px-3 py-2.5 font-medium text-foreground-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {cookieDefinitions.map((c) => (
                <tr key={c.name} className="border-b border-foreground-200/5">
                  <td className="px-3 py-2.5 font-mono text-[11px] text-foreground-200">{c.name}</td>
                  <td className="px-3 py-2.5 text-foreground-400">{c.provider}</td>
                  <td className="px-3 py-2.5"><span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[c.category] || ""}`}>{c.category}</span></td>
                  <td className="px-3 py-2.5 text-foreground-500">{c.purpose}</td>
                  <td className="px-3 py-2.5 text-foreground-500">{c.duration}</td>
                  <td className="px-3 py-2.5 text-foreground-500">{c.type}</td>
                  <td className="px-3 py-2.5"><span className={`text-[11px] ${c.status === "Active" ? "text-accent-500" : "text-foreground-600"}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </LegalDocumentLayout>
  );
}