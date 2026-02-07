import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  iconColor?: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  icon, 
  title, 
  content, 
  iconColor = 'text-blue-400',
  className = '' 
}) => {
  return (
    <div className={`bg-slate-900/80 rounded-xl p-6 border border-slate-700 ${className}`}>
      {icon && (
        <div className={`flex items-center gap-3 mb-4 ${iconColor}`}>
          {icon}
          <h3 className="font-bold">{title}</h3>
        </div>
      )}
      {!icon && (
        <p className="text-sm font-bold text-slate-200 mb-1">{title}</p>
      )}
      <div className="text-slate-400 text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );
};

export default InfoCard;
