import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  /** Use on dark backgrounds */
  inverted?: boolean;
  className?: string;
}

const SIZES = { sm: 'h-7', md: 'h-9', lg: 'h-12' };

export const Logo: React.FC<LogoProps> = ({ size = 'md', inverted = false, className = '' }) => (
  <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="NilePixel Technologies home">
    <img
      src="/image.png"
      alt=""
      className={`${SIZES[size]} aspect-square rounded-lg object-contain transition-transform duration-300 group-hover:scale-105`}
    />
    <span className="flex flex-col leading-none">
      <span className={`text-[17px] font-semibold tracking-tight ${inverted ? 'text-white' : 'text-ink'}`}>
        Nile<span className="text-brand">Pixel</span>
      </span>
      <span className={`mt-1 text-[9px] font-medium uppercase tracking-[0.28em] ${inverted ? 'text-white/60' : 'text-muted'}`}>
        Technologies
      </span>
    </span>
  </Link>
);
