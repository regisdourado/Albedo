import React from 'react';

export type BadgeVariant = 'blue' | 'orange' | 'green' | 'purple' | 'slate';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-500',
  green: 'bg-green-500/10 border-green-500/20 text-green-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  slate: 'bg-slate-800 border-slate-700 text-slate-400'
};

const Badge: React.FC<BadgeProps> = ({ children, variant = 'slate', className = '' }) => {
  const baseClasses = 'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest';
  const variantClass = variantStyles[variant];
  
  return (
    <div className={`${baseClasses} ${variantClass} ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
