import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  /** Use on dark backgrounds */
  inverted?: boolean;
  className?: string;
}

const SIZES = { sm: 'h-6', md: 'h-8', lg: 'h-10' };

/** The NP monogram: ink (or white on dark) letters with an orange pixel. */
const Mark: React.FC<{ inverted: boolean; className?: string }> = ({ inverted, className }) => {
  const letters = inverted ? '#ffffff' : 'var(--color-ink)';
  return (
    <svg viewBox="250 380 785 515" className={className} fill="none" aria-hidden="true">
      <path d="M275 391H458Q474 391 486 404L735 662Q750 678 750 700V880H725Q700 880 683 860L318 465 268 420Q258 408 275 391Z" fill={letters} />
      <path d="M262 525Q262 515 272 523L432 681Q447 696 447 715V870Q447 881 436 881H325Q262 881 262 822Z" fill={letters} />
      <path d="M625 391H855C950 391 1025 465 1025 560C1025 660 950 727 860 727H790Q775 727 775 712V630Q775 618 790 618H840C865 618 880 595 880 568C880 545 865 526 840 526H755Q750 526 745 521L630 403Q620 394 625 391Z" fill={letters} />
      <rect x="775" y="754" width="123" height="127" rx="8" fill="var(--color-accent)" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ size = 'md', inverted = false, className = '' }) => (
  <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="NilePixel Technologies home">
    <Mark
      inverted={inverted}
      className={`${SIZES[size]} w-auto transition-transform duration-300 group-hover:scale-105`}
    />
    <span className="flex flex-col leading-none">
      <span className={`text-[17px] font-semibold tracking-tight ${inverted ? 'text-white' : 'text-ink'}`}>
        Nile<span className="text-accent">Pixel</span>
      </span>
      <span className={`mt-1 text-[9px] font-medium uppercase tracking-[0.28em] ${inverted ? 'text-white/60' : 'text-muted'}`}>
        Technologies
      </span>
    </span>
  </Link>
);
