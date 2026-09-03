import FeatureCard from "@/components/base/FeatureCard";
import SectionHeading from "@/components/base/SectionHeading";

const formats = [
  {
    icon: "ri-group-line",
    title: "Audience Segments",
    description: "Pre-built interest and demographic segments for responsible campaign targeting and audience planning.",
  },
  {
    icon: "ri-terminal-box-line",
    title: "Secure APIs",
    description: "RESTful APIs with key-based authentication, rate limiting and request logging for controlled integration.",
  },
  {
    icon: "ri-check-double-line",
    title: "Verification Scores",
    description: "Structured confidence indicators and verification results for business identity and compliance checks.",
  },
  {
    icon: "ri-download-cloud-line",
    title: "Scheduled Data Feeds",
    description: "Automated recurring deliveries through secure channels with configurable refresh schedules.",
  },
  {
    icon: "ri-file-chart-line",
    title: "Aggregated Reports",
    description: "Summarised analytical outputs combining multiple data sources for strategic decision-making.",
  },
  {
    icon: "ri-notification-3-line",
    title: "Event Notifications",
    description: "Real-time alerts and webhook-based notifications for key data changes and update events.",
  },
  {
    icon: "ri-fingerprint-line",
    title: "Identity Resolution",
    description: "Structured matching capabilities for linking records across permitted datasets with controlled key usage.",
  },
  {
    icon: "ri-shield-flash-line",
    title: "Clean-Room Analytics",
    description: "Available for approved enterprise arrangements. Enables analysis across datasets with controlled output.",
  },
];

export default function ProductFormats() {
  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Flexible Delivery"
          heading="Intelligence delivered in the format your team needs."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((format) => (
            <FeatureCard key={format.title} icon={format.icon} title={format.title} description={format.description} />
          ))}
        </div>
      </div>
    </section>
  );
}