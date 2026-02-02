import React from 'react';
import { Map as MapIcon, Layers, Leaf } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900 pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Gradients */}
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          
          {/* Technical Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* Institutional Header Block (Logo acima da página do Albedo) */}
            <div className="flex items-center gap-4 mb-2 opacity-90 hover:opacity-100 transition-opacity">
               <a 
                 href="https://setec.ufmt.br/ava/bct-ead/login/index.php" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-slate-100 p-2 rounded-lg hover:scale-105 transition-transform shadow-lg border border-slate-700"
                 title="Acessar AVA UFMT BCT"
               >
                 <img 
                   src="https://setec.ufmt.br/ava/bct-ead/pluginfile.php/1/theme_moove/logo/1769526764/logo-masters%20%281%29.png" 
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

            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-slate-300 text-xs font-semibold tracking-wide uppercase">Planejamento Urbano Sustentável</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Mapeamento de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-500">
                Calor na Baixada Cuiabana
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed border-l-4 border-orange-500/50 pl-6">
              A região enfrenta temperaturas acima de <strong>41°C</strong>.
              Nosso Atlas Digital utiliza inteligência de satélite para transformar dados climáticos em 
              <strong> estratégias de arborização urbana</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onNavigate(Section.DASHBOARD)}
                className="group relative px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition-all shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)] hover:shadow-[0_0_60px_-15px_rgba(234,88,12,0.6)] flex items-center justify-center space-x-3 overflow-hidden"
              >
                <MapIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Acessar Mapa de Risco</span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
              </button>
              
              <button 
                onClick={() => onNavigate(Section.METHODOLOGY)}
                className="px-8 py-4 bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 hover:text-white rounded-xl font-semibold transition-all border border-slate-700 hover:border-slate-500 backdrop-blur-md flex items-center justify-center space-x-3"
              >
                <Layers className="w-5 h-5" />
                <span>Metodologia</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-slate-800/50 pt-8 mt-8">
              <div>
                <div className="text-3xl font-bold text-white font-mono">L8/L9</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Satélites Landsat</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white font-mono">MVP</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Produto Viável</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white font-mono">NASA</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Power API</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Interface Preview */}
          <div className="relative hidden lg:block group perspective-[2000px]">
            <div className="relative transform transition-all duration-700 ease-out preserve-3d group-hover:rotate-x-2 group-hover:rotate-y-2 rotate-x-6 -rotate-y-6">
              
              {/* Back Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              {/* Main Card */}
              <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Browser-like Header */}
                <div className="h-12 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="flex-1 bg-slate-900/50 h-6 rounded-md border border-slate-700/30 flex items-center px-3 text-[10px] text-slate-500 font-mono">
                    albedomaps.app/dashboard/heat-risk
                  </div>
                </div>

                {/* Dashboard Preview Content */}
                <div className="relative h-[500px] w-full bg-slate-950 p-6 flex flex-col gap-4">
                   
                   {/* Top Stats Row Simulation */}
                   <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                        <div className="h-1 w-8 bg-orange-500 rounded mb-2"></div>
                        <div className="h-2 w-16 bg-slate-700 rounded"></div>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                        <div className="h-1 w-8 bg-red-500 rounded mb-2"></div>
                        <div className="h-2 w-16 bg-slate-700 rounded"></div>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                        <div className="h-1 w-8 bg-green-500 rounded mb-2"></div>
                        <div className="h-2 w-16 bg-slate-700 rounded"></div>
                      </div>
                   </div>

                   {/* Map Area */}
                   <div className="flex-1 bg-slate-900 rounded-lg border border-slate-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-5 grayscale invert"></div>
                      
                      {/* Heatmap Simulation */}
                      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-600 rounded-full blur-[50px] opacity-60 mix-blend-screen animate-pulse"></div>
                      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-orange-600 rounded-full blur-[60px] opacity-40 mix-blend-screen"></div>

                      {/* Floating UI Elements on Map */}
                      <div className="absolute top-8 left-8 bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-slate-700 shadow-xl w-48">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400 font-mono">Split-Window LST</span>
                            <span className="text-red-400 text-xs font-bold">LIVE</span>
                          </div>
                          <div className="text-2xl font-bold text-white">43.2°C</div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500 to-red-600 w-[85%] h-full"></div>
                          </div>
                      </div>

                      <div className="absolute bottom-8 right-8 bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-slate-700 shadow-xl flex items-center gap-3">
                         <div className="bg-green-500/20 p-2 rounded-md text-green-400">
                           <Leaf size={16} />
                         </div>
                         <div>
                           <div className="text-[10px] text-slate-400">Recomendação</div>
                           <div className="text-xs font-semibold text-slate-200">Reflorestamento: Alto</div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;