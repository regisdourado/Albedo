import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'darker';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

const variantStyles = {
  default: 'bg-slate-800/50 border-slate-700',
  dark: 'bg-slate-900 border-slate-800',
  darker: 'bg-slate-900/80 border-slate-700'
};

const roundedStyles = {
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-3xl',
  '3xl': 'rounded-[40px]'
};

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12'
};

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  rounded = 'xl',
  padding = 'md',
  hover = false
}) => {
  const baseClasses = 'border';
  const variantClass = variantStyles[variant];
  const roundedClass = roundedStyles[rounded];
  const paddingClass = paddingStyles[padding];
  const hoverClass = hover ? 'hover:border-orange-500/30 transition-all hover:bg-slate-800' : '';
  
  return (
    <div className={`${baseClasses} ${variantClass} ${roundedClass} ${paddingClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
