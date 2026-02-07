import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'gradient' | 'solid' | 'outline';
  className?: string;
  icon?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'solid',
  className = '',
  icon
}) => {
  const baseClasses = 'inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold transition-all';
  
  const variantClasses = {
    gradient: 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:scale-105 shadow-[0_0_40px_-10px_rgba(234,88,12,0.4)] group',
    solid: 'bg-white text-slate-900 hover:bg-orange-500 hover:text-white transform hover:scale-105 shadow-xl',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
      {icon && icon}
    </button>
  );
};

export default PrimaryButton;
