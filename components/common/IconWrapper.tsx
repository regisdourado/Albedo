import React from 'react';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';
type IconVariant = 'blue' | 'orange' | 'green' | 'purple' | 'rose' | 'emerald' | 'yellow' | 'slate';

interface IconWrapperProps {
  children: React.ReactNode;
  variant?: IconVariant;
  size?: IconSize;
  className?: string;
}

const variantStyles: Record<IconVariant, string> = {
  blue: 'bg-blue-500/10 text-blue-400',
  orange: 'bg-orange-500/10 text-orange-400',
  green: 'bg-green-500/10 text-green-400',
  purple: 'bg-purple-500/10 text-purple-400',
  rose: 'bg-rose-500/10 text-rose-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
  slate: 'bg-slate-900 text-slate-400'
};

const sizeStyles: Record<IconSize, string> = {
  sm: 'p-2 rounded-lg',
  md: 'p-3 rounded-xl',
  lg: 'p-4 rounded-2xl',
  xl: 'p-6 rounded-3xl'
};

const IconWrapper: React.FC<IconWrapperProps> = ({ 
  children, 
  variant = 'slate', 
  size = 'md',
  className = '' 
}) => {
  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];
  
  return (
    <div className={`${sizeClass} ${variantClass} ${className}`}>
      {children}
    </div>
  );
};

export default IconWrapper;
