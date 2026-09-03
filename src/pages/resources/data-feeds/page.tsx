import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import CodeBlock from "@/pages/resources/components/CodeBlock";
import type { FeedFormat } from "@/data/resources";

const feedFormats: FeedFormat[] = [
  { name: "Full refresh", description: "A complete replacement of all records in the dataset. Suitable for datasets where most or all records may change between deliveries.", typicalUse: "Annual demographic estimates, quarterly business registries.", deliveryNote: "Delivered as a compressed CSV or JSON file with a manifest." },
  { name: "Incremental feed", description: "Only records that have been added, updated or deleted since the last delivery. More efficient for large datasets with partial changes.", typicalUse: "Daily business-address changes, weekly risk-score updates.", deliveryNote: "Includes change type (created, updated, deleted) per record." },
  { name: "Snapshot", description: "A point-in-time copy of the full dataset as it existed at a specific moment. Not designed for ongoing synchronisation.", typicalUse: "Quarterly market snapshots, annual compliance reports.", deliveryNote: "Delivered as a single file with a snapshot timestamp." },
  { name: "Delta file", description: "A file containing only the differences between two versions of a dataset. Smaller than a full refresh and more self-contained than an incremental feed.", typicalUse: "Weekly schema changes, monthly reference-data patches.", deliveryNote: "May require both previous and current versions to reconstruct." },
  { name: "Scheduled delivery", description: "A feed delivered on a fixed schedule — daily, weekly, monthly or quarterly — via secure download or planned SFTP/storage integration.", typicalUse: "Regularly updating datasets with predictable refresh cycles.", deliveryNote: "Delivery windows would be defined in the product terms. Late deliveries would trigger notifications." },
  { name: "Secure download", description: "A one-off or periodic file made available through a time-limited, authenticated download URL.", typicalUse: "Report purchases, one-off data extracts.", deliveryNote: "Download URLs would expire. Checksums would be provided for integrity verification." },
];

export default function DataFeeds() {
  const navigate = useNavigate();

  return (
    <>
      <PublicHeader />

      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/resources")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Resources</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Data Feeds</li>
          </ol>
        </div>
      </nav>

      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Data Feeds</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Scheduled data feed concepts
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground-400">
              Understand planned data-feed models, manifest formats, naming conventions and delivery expectations. All examples are fictional demonstration content.
            </p>
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3">
              <p className="text-xs text-foreground-400">Feed formats and examples are fictional. No live data-feed delivery or SFTP/storage integration is operational.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* Feed formats */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Feed formats</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {feedFormats.map((f) => (
                  <div key={f.name} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
                    <p className="text-sm font-semibold text-foreground-200">{f.name}</p>
                    <p className="mt-2 text-xs leading-relaxed text-foreground-500">{f.description}</p>
                    <div className="mt-3 space-y-1.5">
                      <p className="text-[11px] text-foreground-600"><span className="font-medium text-foreground-400">Typical use: </span>{f.typicalUse}</p>
                      <p className="text-[11px] text-foreground-600"><span className="font-medium text-foreground-400">Delivery: </span>{f.deliveryNote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SFTP / Storage concepts */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>SFTP and object-storage concepts</h2>
              <p className="text-sm leading-relaxed text-foreground-400 mb-4">
                The planned platform would support secure file delivery through SFTP and cloud object storage (e.g. AWS S3, Google Cloud Storage). These delivery channels are planned for a future platform phase and are not currently operational.
              </p>
              <div className="space-y-3">
                {[
                  { term: "SFTP", desc: "Secure File Transfer Protocol delivery to a DataHarbour-managed or customer-provided SFTP server. Files would be delivered with checksums and manifests." },
                  { term: "Object storage", desc: "Delivery to an S3-compatible bucket. DataHarbour would write files to a designated prefix and notify your system via webhook when delivery is complete." },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
                    <p className="text-sm font-semibold text-foreground-200">{item.term}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Checksums and manifests */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Checksums and manifests</h2>
              <p className="text-sm text-foreground-400 mb-4">
                Every delivered data file would be accompanied by a checksum (SHA-256) and a manifest file describing the delivery contents.
              </p>

              <p className="text-xs font-semibold text-foreground-300 mb-2">Fictional manifest example</p>
              <CodeBlock
                language="json"
                label="manifest.json"
                code={`{
  "delivery_id": "del_7f3a2b_2026_07",
  "package_id": "dh-pkg-demographics-uk-2026",
  "delivery_type": "scheduled_feed",
  "feed_type": "full_refresh",
  "schema_version": "2.1.0",
  "delivered_at": "2026-07-01T06:00:00Z",
  "period": "2026-07",
  "files": [
    {
      "name": "dh-pkg-demographics-uk-2026_2026-07-01_full.csv.gz",
      "format": "csv",
      "compression": "gzip",
      "size_bytes": 245760,
      "record_count": 2800,
      "checksum_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ]
}`}
              />
            </div>

            {/* Naming conventions */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>File naming conventions</h2>
              <p className="text-sm text-foreground-400 mb-4">
                Data files would follow a consistent naming convention for automated pipeline consumption:
              </p>
              <div className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
                <code className="text-xs font-mono text-foreground-200 break-all">
                  {"{package_id}_{delivery_date}_{feed_type}.{format}.{compression}"}
                </code>
                <p className="mt-3 text-xs text-foreground-500">
                  Example: <code className="bg-foreground-200/10 px-1 rounded text-foreground-300 text-[11px]">dh-pkg-demographics-uk-2026_2026-07-01_full.csv.gz</code>
                </p>
              </div>
            </div>

            {/* Late or failed delivery */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Late or failed delivery handling</h2>
              <div className="space-y-3">
                {[
                  { term: "Late delivery", desc: "If a scheduled delivery is delayed, you would receive a notification through the planned webhook system. The delivery record status would show 'delayed' and include an estimated delivery time." },
                  { term: "Failed delivery", desc: "If a delivery fails (e.g. corrupt file, network error), the status would be set to 'failed'. DataHarbour would attempt to re-deliver automatically. After multiple failures, manual intervention may be required." },
                  { term: "Retention and deletion", desc: "Delivered files would be available for download for a defined period (typically 30 days). After this period, files would be automatically removed. You are responsible for downloading and storing files within the availability window." },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
                    <p className="text-sm font-semibold text-foreground-200">{item.term}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery timeline */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Fictional delivery timeline</h2>
              <div className="rounded-lg border border-foreground-200/10 bg-background-50 p-6">
                <div className="relative pl-8 border-l-2 border-foreground-200/10 space-y-6">
                  {[
                    { time: "T-24h", label: "Delivery window notification", desc: "You receive a notification that a scheduled delivery is approaching." },
                    { time: "T-6h", label: "Data preparation", desc: "The supplier prepares the latest dataset according to the agreed schema and feed type." },
                    { time: "T", label: "File delivery", desc: "The file is uploaded, checksums are computed and a manifest is generated." },
                    { time: "T+5min", label: "Webhook: delivery.ready", desc: "You receive a delivery.ready webhook event with the delivery ID and file details." },
                    { time: "T+30 days", label: "File expiry", desc: "The download URL expires. You should have retrieved the file by this point." },
                  ].map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background-50 border-foreground-200/20">
                        <span className="text-[10px] font-semibold text-foreground-400">{i + 1}</span>
                      </div>
                      <p className="text-[11px] font-medium text-primary-400">{step.time}</p>
                      <p className="text-sm font-semibold text-foreground-200">{step.label}</p>
                      <p className="text-xs text-foreground-500 mt-0.5">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related */}
            <div className="pt-8 border-t border-foreground-200/10">
              <h3 className="text-sm font-semibold text-foreground-300 mb-4">Related resources</h3>
              <div className="flex flex-wrap gap-3">
                {["getting-started", "package-schemas", "webhooks"].map((slug) => (
                  <button key={slug} type="button" onClick={() => navigate(`/resources/${slug}`)} className="rounded-lg border border-foreground-200/10 bg-background-50 px-4 py-2.5 text-sm text-foreground-300 transition hover:border-primary-400/30 hover:text-foreground-100 cursor-pointer">
                    {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    <i className="ri-arrow-right-line ml-1.5 text-xs text-foreground-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}