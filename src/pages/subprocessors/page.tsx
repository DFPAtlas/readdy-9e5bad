import { DOCUMENT_BY_SLUG, subprocessorEntries } from "@/data/legalDocuments";
import LegalDocumentLayout from "@/pages/legal/components/LegalDocumentLayout";

export default function SubprocessorsPage() {
  return (
    <LegalDocumentLayout document={DOCUMENT_BY_SLUG.subprocessors}>
      <section className="mt-12 scroll-mt-24" id="subprocessor-table">
        <h2 className="mb-4 text-lg font-medium text-foreground-100" style={{ fontFamily: "'Instrument Serif', serif" }}>Subprocessor Table</h2>
        {subprocessorEntries.length === 0 ? (
          <div className="rounded-lg border border-foreground-200/10 bg-background-100 px-6 py-10 text-center">
            <div className="mb-3 flex justify-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100">
                <i className="ri-database-2-line text-lg text-secondary-600" />
              </span>
            </div>
            <p className="text-sm font-medium text-foreground-300">No subprocessors confirmed</p>
            <p className="mt-1 text-[12px] text-foreground-500">Subprocessor engagements have not yet been confirmed at this stage of development. This table will be updated as the platform infrastructure is established.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-foreground-200/10">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-foreground-200/10 bg-background-100">
                  <th className="px-3 py-2.5 font-medium text-foreground-300">Provider</th>
                  <th className="px-3 py-2.5 font-medium text-foreground-300">Purpose</th>
                  <th className="px-3 py-2.5 font-medium text-foreground-300">Data Categories</th>
                  <th className="px-3 py-2.5 font-medium text-foreground-300">Location</th>
                  <th className="px-3 py-2.5 font-medium text-foreground-300">Transfer Mechanism</th>
                  <th className="px-3 py-2.5 font-medium text-foreground-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {subprocessorEntries.map((entry) => (
                  <tr key={entry.provider} className="border-b border-foreground-200/5">
                    <td className="px-3 py-2.5 text-foreground-200">{entry.provider}</td>
                    <td className="px-3 py-2.5 text-foreground-500">{entry.purpose}</td>
                    <td className="px-3 py-2.5 text-foreground-500">{entry.dataCategories}</td>
                    <td className="px-3 py-2.5 text-foreground-500">{entry.processingLocation}</td>
                    <td className="px-3 py-2.5 text-foreground-500">{entry.transferMechanism}</td>
                    <td className="px-3 py-2.5"><span className="text-[11px] text-foreground-500">{entry.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </LegalDocumentLayout>
  );
}