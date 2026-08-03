import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height 
}) => {
  const { isDarkMode } = useTheme();

  const baseClasses = 'animate-pulse bg-opacity-20';
  const colorClasses = isDarkMode ? 'bg-gray-700' : 'bg-gray-300';
  
  let variantClasses = '';
  if (variant === 'circular') {
    variantClasses = 'rounded-full';
  } else if (variant === 'text') {
    variantClasses = 'rounded-md';
  } else {
    variantClasses = 'rounded-xl';
  }

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1.2em' : undefined)
  };

  return (
    <div 
      className={`${baseClasses} ${colorClasses} ${variantClasses} ${className}`}
      style={style}
    />
  );
};
