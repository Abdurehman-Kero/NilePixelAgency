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
      <img src="/image.png" alt="NilePixel Logo" className={`aspect-square ${sizeMap[size]} transition-transform duration-300 group-hover:scale-105 object-contain rounded-xl`} />
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
