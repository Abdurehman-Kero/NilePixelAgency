import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  /** Use on dark backgrounds */
  inverted?: boolean;
  className?: string;
}

const SIZES = { sm: 'h-7', md: 'h-9', lg: 'h-12' };

/** The N monogram: orange diagonal and pixels, ink (or white on dark) stems. */
const Mark: React.FC<{ inverted: boolean; className?: string }> = ({ inverted, className }) => (
  <svg viewBox="130 90 395 445" className={className} fill="none" aria-hidden="true">
    <path d="M150 128H232L508 392V468Q508 476 500 476H445L150 205Q143 199 143 190V136Q143 128 150 128Z" fill="var(--color-accent)" />
    <path d="M147 290C185 305 215 325 233 350V458Q233 467 224 467H155Q147 467 147 458Z" fill={inverted ? '#ffffff' : 'var(--color-ink)'} />
    <path d="M388 165H470V280Q470 290 460 286C425 270 400 250 388 232Z" fill={inverted ? '#ffffff' : 'var(--color-ink)'} />
    <rect x="460" y="100" width="53" height="53" rx="7" fill="var(--color-accent)" />
    <rect x="250" y="464" width="61" height="61" rx="7" fill="var(--color-accent)" />
  </svg>
);

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
