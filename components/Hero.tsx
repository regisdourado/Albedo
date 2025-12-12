import React from 'react';
import { Map as MapIcon, Layers, ArrowRight, Activity } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950 pt-20">

      {/* Dynamic Background Elements - Premium Blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-slate-900/80 blur-[100px] z-0" /> {/* Contrast spacer */}

        {/* Technical Grid Pattern - Subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text Content */}
          <div className="space-y-8 animate-fade-in relative">

            {/* UFMT Badge */}
            <div className="inline-flex items-center gap-3 pl-1 pr-4 py-1 rounded-full border border-slate-700/50 bg-slate-900/50 backdrop-blur-md hover:border-orange-500/30 transition-colors group cursor-default">
              <div className="bg-slate-800 p-1.5 rounded-full group-hover:bg-orange-500/20 transition-colors">
                <Activity size={14} className="text-orange-400" />
              </div>
              <span className="text-xs font-medium text-slate-300 tracking-wide">
                PROJETO INTEGRADOR VI <span className="text-slate-600 mx-2">|</span> UFMT
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-white">
              Atlas Térmico <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-amber-500 text-glow">
                Cuiabá Digital
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-light">
              Uma plataforma de inteligência geográfica que transforma dados de satélite Landsat em estratégias reais de arborização urbana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onNavigate(Section.DASHBOARD)}
                className="group relative px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition-all shadow-[0_0_40px_-10px_rgba(234,88,12,0.4)] hover:shadow-[0_0_60px_-15px_rgba(234,88,12,0.6)] flex items-center justify-center space-x-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                <MapIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Explorar Mapa</span>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => onNavigate(Section.METHODOLOGY)}
                className="px-8 py-4 bg-slate-800/20 hover:bg-slate-800/40 text-slate-300 hover:text-white rounded-xl font-semibold transition-all border border-slate-700/50 hover:border-slate-500 backdrop-blur-md flex items-center justify-center space-x-3"
              >
                <Layers className="w-5 h-5" />
                <span>Entender Método</span>
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-800/50">
              <div>
                <div className="text-2xl font-display font-bold text-white">44°C</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Pico Registrado</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">30m</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Resolução Landsat</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">12+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Bairros Monitorados</div>
              </div>
            </div>
          </div>

          {/* Right: Premium Glass Card Visualization */}
          <div className="relative hidden lg:block perspective-[2000px] group">
            {/* Floating Elements/Parallax Effect */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl rotate-12 blur-xl opacity-40 animate-pulse"></div>

            <div className="relative transform transition-all duration-700 ease-out preserve-3d group-hover:rotate-x-2 group-hover:rotate-y-2 rotate-x-6 -rotate-y-12">

              {/* Glass Card Container */}
              <div className="relative glass-card rounded-2xl overflow-hidden p-1">
                {/* Browser UI Header */}
                <div className="h-10 bg-slate-900/80 border-b border-slate-700/50 flex items-center px-4 gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="flex-1 text-[10px] text-center font-mono text-slate-500 bg-slate-950/50 rounded py-0.5">albedo.ufmt.br/live-view</div>
                </div>

                {/* Dashboard Preview */}
                <div className="relative h-[480px] bg-slate-900 overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/12/1350/2280.png')] bg-cover opacity-40 grayscale mix-blend-luminosity"></div>

                  {/* Heatmap Overlay Simulation */}
                  <div className="absolute inset-0 opacity-80 mix-blend-overlay" style={{
                    background: 'radial-gradient(circle at 60% 40%, rgba(249, 115, 22, 0.8) 0%, transparent 40%), radial-gradient(circle at 30% 70%, rgba(239, 68, 68, 0.6) 0%, transparent 35%)'
                  }}></div>

                  {/* Floating Stats - Glass Panels */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between">
                    <div className="glass-panel p-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top duration-700">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Temperatura Atual</div>
                        <div className="text-xl font-display font-bold text-white">41.8°C</div>
                      </div>
                    </div>
                  </div>

                  {/* Central Chart Simulation */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent p-6">
                    <div className="flex items-end justify-between h-20 gap-2 opacity-50">
                      {[40, 65, 45, 80, 55, 70, 40, 60].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="w-full bg-orange-500/20 rounded-t-sm border-t border-orange-500/50"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;