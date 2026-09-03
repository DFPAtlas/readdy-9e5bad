export default function FinalCta() {
  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Find the right commercial route for your data requirement
          </h2>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
            <a
              href="/marketplace"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 cursor-pointer"
            >
              Browse Marketplace
              <i className="ri-arrow-right-line" />
            </a>
            <a
              href="/contact?type=pricing"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
            >
              Contact Sales
            </a>
            <a
              href="/pricing#enterprise"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
            >
              Explore Enterprise
            </a>
            <a
              href="/suppliers"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
            >
              Become a Supplier
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}