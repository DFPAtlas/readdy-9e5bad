import type { ReactNode } from "react";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";

interface PlaceholderLayoutProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function PlaceholderLayout({ title, description, children }: PlaceholderLayoutProps) {
  return (
    <div className="min-h-screen bg-background-50">
      <PublicHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
        <h1
          className="mb-6 text-4xl text-foreground-50 md:text-5xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {title}
        </h1>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-foreground-400">
          {description}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </main>
      <PublicFooter />
    </div>
  );
}