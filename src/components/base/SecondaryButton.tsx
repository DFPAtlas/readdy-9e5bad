import type { ReactNode, ButtonHTMLAttributes } from "react";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
}

export default function SecondaryButton({ children, href, className = "", ...props }: SecondaryButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer";

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}