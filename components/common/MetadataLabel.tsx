import React from 'react';

interface MetadataLabelProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm';
  className?: string;
}

const MetadataLabel: React.FC<MetadataLabelProps> = ({ 
  children, 
  size = 'xs',
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'text-[9px]',
    sm: 'text-[10px]'
  };
  
  const baseClasses = 'text-slate-500 font-black uppercase tracking-widest';
  
  return (
    <p className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  );
};

export default MetadataLabel;
