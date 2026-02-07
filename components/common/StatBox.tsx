import React from 'react';

interface StatBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  iconColor?: string;
  className?: string;
}

const StatBox: React.FC<StatBoxProps> = ({ 
  icon, 
  label, 
  value, 
  description,
  iconColor = 'text-orange-400',
  className = '' 
}) => {
  return (
    <div className={`bg-slate-800/50 p-4 rounded-2xl border border-slate-700 ${className}`}>
      <div className={`flex items-center gap-2 mb-2 ${iconColor}`}>
        {icon}
        <span className="text-xs font-bold uppercase">{label}</span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-[10px] text-slate-500">{description}</p>
    </div>
  );
};

export default StatBox;
