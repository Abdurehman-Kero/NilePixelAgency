import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12'
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`}>
      <div className={`aspect-square ${sizeMap[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0F6FFF] to-[#00A3FF] p-2 shadow-lg shadow-[#0F6FFF]/20 transition group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
          <rect x="70" y="5" width="22" height="22" rx="4" fill="currentColor" />
          <rect x="8" y="73" width="22" height="22" rx="4" fill="currentColor" />
          <rect x="8" y="8" width="22" height="52" rx="5" fill="currentColor" />
          <rect x="70" y="38" width="22" height="54" rx="5" fill="currentColor" />
          <path d="M 28 8 C 36 28, 56 62, 72 88 L 88 88 C 72 62, 52 28, 38 8 Z" fill="white" opacity="0.9" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-extrabold tracking-tight text-white text-base font-sans">
          NILE<span className="text-[#00A3FF]">PIXEL</span>
        </span>
        <span className="text-[10px] font-mono tracking-widest text-[#A9B4C5] uppercase mt-0.5">
          TECHNOLOGIES
        </span>
      </div>
    </Link>
  );
};
