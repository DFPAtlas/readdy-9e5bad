import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/base/PrimaryButton";
import SecondaryButton from "@/components/base/SecondaryButton";
import { resourceHubContent } from "@/data/resources";

export default function ResourcesHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 md:px-6 md:pb-16 md:pt-18">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
            {resourceHubContent.eyebrow}
          </p>
          <h1 className="text-3xl text-foreground-50 md:text-4xl lg:text-5xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            {resourceHubContent.title}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-foreground-400 md:text-base">
            {resourceHubContent.supporting}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton onClick={() => navigate(resourceHubContent.primaryAction.route)}>
              {resourceHubContent.primaryAction.label}
              <i className="ri-arrow-right-line" />
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate(resourceHubContent.secondaryAction.route)}>
              {resourceHubContent.secondaryAction.label}
              <i className="ri-code-line" />
            </SecondaryButton>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3 flex items-start gap-3">
            <i className="ri-information-line mt-0.5 shrink-0 text-sm text-[#ff2e88]" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-foreground-400">
              {resourceHubContent.notice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}