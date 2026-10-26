import React from 'react';

/** Curved white edge placed at the bottom of a dark section. */
export const WaveEdge: React.FC<{ className?: string; fill?: string }> = ({
  className = 'h-12 sm:h-20',
  fill = '#fff',
}) => (
  <svg
    className={`absolute inset-x-0 bottom-0 w-full ${className}`}
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    aria-hidden
  >
    <path d="M0 120V70C240 10 480 0 720 0s520 20 720 70v50H0Z" fill={fill} />
  </svg>
);
