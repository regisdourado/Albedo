import React from 'react';

interface UFMTLogoProps {
  variant?: 'header' | 'hero';
}

const UFMTLogo: React.FC<UFMTLogoProps> = ({ variant = 'header' }) => {
  const logoUrl = "https://setec.ufmt.br/ava/bct-ead/pluginfile.php/1/theme_moove/logo/1769526764/logo-masters%20%281%29.png";
  const avaUrl = "https://setec.ufmt.br/ava/bct-ead/login/index.php";
  
  if (variant === 'header') {
    return (
      <a 
        href={avaUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:scale-105 transition-transform duration-200"
        title="Acessar AVA UFMT"
      >
        <img 
          src={logoUrl} 
          alt="Logo UFMT BCT Masters" 
          className="h-10 w-auto bg-slate-100 rounded-lg p-1 shadow-sm border border-slate-600"
        />
      </a>
    );
  }
  
  // Hero variant with additional institutional info
  return (
    <div className="flex items-center gap-4 mb-2 opacity-90 hover:opacity-100 transition-opacity">
      <a 
        href={avaUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-slate-100 p-2 rounded-lg hover:scale-105 transition-transform shadow-lg border border-slate-700"
        title="Acessar AVA UFMT BCT"
      >
        <img 
          src={logoUrl} 
          alt="UFMT BCT Logo Masters" 
          className="h-12 w-auto"
        />
      </a>
      <div className="h-10 w-px bg-slate-700"></div>
      <div className="text-left">
        <div className="text-slate-300 text-xs font-bold uppercase tracking-widest">Universidade Federal de Mato Grosso</div>
        <div className="text-slate-500 text-[10px] font-mono">BCT - Ciência e Tecnologia (EAD)</div>
      </div>
    </div>
  );
};

export default UFMTLogo;
