import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

const SHAPES = {
  circular: 'rounded-full',
  text: 'rounded-md',
  rectangular: 'rounded-xl',
};

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular', width, height }) => (
  <div
    className={`animate-pulse bg-line ${SHAPES[variant]} ${className}`}
    style={{
      width: width || (variant === 'text' ? '100%' : undefined),
      height: height || (variant === 'text' ? '1.2em' : undefined),
    }}
  />
);
