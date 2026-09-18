import type { SVGProps } from "react";

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function BrandMark({ title = "ReadRush", ...props }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} {...props}>
      <defs>
        <linearGradient id="readrush-mark" x1="5" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3978FF" />
          <stop offset="1" stopColor="#154ED8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#readrush-mark)" />
      <path
        d="M14.5 35V13h10.25c5.55 0 9.25 3.2 9.25 8 0 3.48-2.02 6.12-5.38 7.3L35 35h-7.08l-5.43-6.05h-1.93V35H14.5Zm6.06-11.14h3.7c2.3 0 3.68-1 3.68-2.76 0-1.8-1.38-2.82-3.68-2.82h-3.7v5.58Z"
        fill="white"
      />
      <circle cx="24.3" cy="26.4" r="2.6" fill="#FF6B4A" />
      <path d="M7.5 17.5h4M6 24h5.5M7.5 30.5h4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".72" />
    </svg>
  );
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5" aria-label="ReadRush home">
      <BrandMark className="h-9 w-9 shrink-0" />
      {!compact && (
        <span className="text-xl font-bold tracking-[-0.04em] text-foreground">
          Read<span className="text-accent">Rush</span>
        </span>
      )}
    </div>
  );
}
