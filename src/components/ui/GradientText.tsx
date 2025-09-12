import { cn } from '@/lib/utils';
import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors: string[];
  animationSpeed?: number;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  colors,
  animationSpeed = 5,
}) => {
  const gradientStyle = {
    '--gradient-colors': colors.join(', '),
    '--animation-speed': `${animationSpeed}s`,
  } as React.CSSProperties;

  return (
    <span
      className={cn('gradient-text', className)}
      style={gradientStyle}
    >
      {children}
    </span>
  );
};

export default GradientText;
