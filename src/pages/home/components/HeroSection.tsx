import CyberpunkTunnel from "@/components/feature/CyberpunkTunnel";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-[#01010a] text-white">
      <CyberpunkTunnel
        params={{
          lightIntensity: 1.4,
          bloomStrength: 1.5,
          bloomRadius: 0.5,
          bloomThreshold: 0.1,
          reflectionStrength: 0.45,
          ghostIntensity: 1.2,
          matrixIntensity: 0.3,
        }}
      />

      {/* dark vignette overlay for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.55)_75%,_rgba(0,0,0,0.85)_100%)]" />
      {/* scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* top nav */}
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#ff2e88]/60 bg-black/30 backdrop-blur-sm">
            <i className="ri-flashlight-fill text-[#ff2e88]" />
          </div>
          <span
            className="text-lg tracking-[0.35em] text-white/90"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            DataHarbour
          </span>
        </div>
        <nav className="hidden items-center gap-9 text-xs tracking-[0.3em] text-white/70 md:flex">
          <button type="button" className="transition hover:text-white cursor-pointer" onClick={() => window.REACT_APP_NAVIGATE("/marketplace")}>
            Marketplace
          </button>
          <button type="button" className="transition hover:text-white cursor-pointer" onClick={() => window.REACT_APP_NAVIGATE("/solutions")}>
            Solutions
          </button>
          <button type="button" className="transition hover:text-white cursor-pointer" onClick={() => window.REACT_APP_NAVIGATE("/compliance")}>
            Compliance
          </button>
          <button type="button" className="transition hover:text-white cursor-pointer" onClick={() => window.REACT_APP_NAVIGATE("/suppliers")}>
            Suppliers
          </button>
          <button type="button" className="transition hover:text-white cursor-pointer" onClick={() => window.REACT_APP_NAVIGATE("/resources")}>
            Resources
          </button>
        </nav>
        <button
          type="button"
          className="group relative flex items-center gap-2 whitespace-nowrap rounded-md border border-cyan-400/50 bg-black/30 px-4 py-2 text-xs tracking-[0.25em] text-cyan-300 backdrop-blur-sm transition hover:border-cyan-300 hover:text-white cursor-pointer"
          onClick={() => window.REACT_APP_NAVIGATE("/sign-in")}
        >
          <i className="ri-shield-keyhole-line" />
          Sign In
        </button>
      </header>

      {/* corner brackets */}
      <div className="pointer-events-none absolute left-6 top-24 z-10 hidden md:block">
        <div className="text-[10px] tracking-[0.35em] text-cyan-300/70">
          SECURE B2B DATA INTELLIGENCE
        </div>
        <div className="mt-2 h-12 w-px bg-gradient-to-b from-cyan-300/80 to-transparent" />
      </div>
      <div className="pointer-events-none absolute right-6 top-24 z-10 hidden text-right md:block">
        <div className="text-[10px] tracking-[0.35em] text-[#ff2e88]/80">
          VERIFIED • PROVENANCE • TRUST
        </div>
        <div className="mt-2 ml-auto h-12 w-px bg-gradient-to-b from-[#ff2e88]/80 to-transparent" />
      </div>

      {/* main content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center" style={{ transform: "translateY(110px)" }}>
        <h1
          className="max-w-5xl text-5xl leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[88px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
          }}
        >
          <span className="block">
            Welcome to the Data World
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          Discover verified data packages, intelligence products and secure APIs with
          transparent sourcing, controlled access and responsible data use built into
          every transaction.
        </p>

        <div className="mt-10">
          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition hover:bg-white/90 cursor-pointer"
            onClick={() => window.REACT_APP_NAVIGATE("/marketplace")}
          >
            Explore the Marketplace
          </button>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
        <div className="text-[10px] tracking-[0.5em] text-white/50">Explore DataHarbour</div>
        <div className="mx-auto mt-2 h-8 w-px animate-pulse bg-gradient-to-b from-white/80 to-transparent" />
      </div>
    </section>
  );
}