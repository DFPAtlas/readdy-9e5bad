import type { ReactNode } from "react";

interface SectionHeadingProps {
  label?: string;
  heading: string;
  supporting?: string;
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({ label, heading, supporting, className = "", children }: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {label && (
        <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
          {label}
        </p>
      )}
      <h2 className="text-3xl text-foreground-50 md:text-4xl lg:text-5xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
        {heading}
      </h2>
      {supporting && (
        <p className="mt-5 text-sm leading-relaxed text-foreground-400 md:text-base">
          {supporting}
        </p>
      )}
      {children}
    </div>
  );
}