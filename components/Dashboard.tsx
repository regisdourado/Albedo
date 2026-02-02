
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import { ThermalDataPoint, RegionRisk } from '../types';
import { fetchNasaHeatData } from '../services/arcgis';
import { AlertCircle, Thermometer, Map as MapIcon, BarChart3, Filter, Loader2, Navigation, MapPin, X, Globe, Share2, Check, Users, Activity, TrendingUp, ExternalLink, Maximize2, Layers, Search, Info, ZoomIn, Map as MapAlt } from 'lucide-react';

const mockHistoricalData: ThermalDataPoint[] = [
  { month: 'Jan', avgTemp: 32, maxTemp: 36, ndvi: 0.6 },
  { month: 'Fev', avgTemp: 31, maxTemp: 35, ndvi: 0.65 },
  { month: 'Mar', avgTemp: 31, maxTemp: 35, ndvi: 0.7 },
  { month: 'Abr', avgTemp: 30, maxTemp: 34, ndvi: 0.68 },
  { month: 'Mai', avgTemp: 28, maxTemp: 33, ndvi: 0.55 },
  { month: 'Jun', avgTemp: 27, maxTemp: 32, ndvi: 0.45 },
  { month: 'Jul', avgTemp: 28, maxTemp: 34, ndvi: 0.35 },
  { month: 'Ago', avgTemp: 33, maxTemp: 39, ndvi: 0.25 },
  { month: 'Set', avgTemp: 36, maxTemp: 42, ndvi: 0.2 },
  { month: 'Out', avgTemp: 35, maxTemp: 41, ndvi: 0.25 },
  { month: 'Nov', avgTemp: 33, maxTemp: 38, ndvi: 0.4 },
  { month: 'Dez', avgTemp: 32, maxTemp: 36, ndvi: 0.55 },
];

interface VisualRegionRisk extends RegionRisk {
  x: string;
  y: string;
  type: 'local' | 'regional' | 'state';
}

type GeoScale = 'cuiaba' | 'baixada' | 'matogrosso';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'analytics'>('map');
  const [geoScale, setGeoScale] = useState<GeoScale>('cuiaba');
  const [riskRegions, setRiskRegions] = useState<VisualRegionRisk[]>([]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<VisualRegionRisk | null>(null);
  const [activeRiskFilters, setActiveRiskFilters] = useState<string[]>(['Baixo', 'Médio', 'Alto', 'Crítico']);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const filterMenuRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('Falha ao copiar link:', err);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const realData = await fetchNasaHeatData();
        setRiskRegions(realData as VisualRegionRisk[]);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 1200);
      }
    };
    initializeData();
  }, [geoScale]);

  const toggleRiskFilter = (level: string) => {
    setActiveRiskFilters(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const getRiskColorHex = (level: string) => {
    switch (level) {
      case 'Crítico': return '#ef4444';
      case 'Alto': return '#f97316';
      case 'Médio': return '#eab308';
      case 'Baixo': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  const getScaleLabel = () => {
    switch(geoScale) {
      case 'baixada': return 'Baixada Cuiabana';
      case 'matogrosso': return 'Estado de Mato Grosso';
      default: return 'Cuiabá (Urbano)';
    }
  };

  const handleRegionClick = (region: VisualRegionRisk) => {
    setSelectedRegion(region);
  };

  // Calcula a transformação do mapa baseada no zoom e na região selecionada
  const getMapTransform = () => {
    let baseScale = 1;
    let translateX = 0;
    let translateY = 0;

    if (geoScale === 'cuiaba') baseScale = 2.4;
    else if (geoScale === 'baixada') baseScale = 1.4;
    else if (geoScale === 'matogrosso') baseScale = 0.6;

    if (selectedRegion) {
      const finalScale = baseScale * 1.3;
      const xPercent = parseFloat(selectedRegion.x);
      const yPercent = parseFloat(selectedRegion.y);
      
      // Ajusta o offset para centralizar o ponto selecionado
      translateX = (50 - xPercent) * 8; 
      translateY = (50 - yPercent) * 8;
      
      return `scale(${finalScale}) translate(${translateX}px, ${translateY}px)`;
    }

    return `scale(${baseScale}) translate(0px, 0px)`;
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-end mb-4 gap-4">
        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">Monitoramento Térmico Territorial</h2>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Live Satélite 2026</span>
             </div>
             <span className="text-slate-500 text-xs font-medium">Escala: <span className="text-orange-500 font-bold uppercase tracking-wider">{getScaleLabel()}</span></span>
          </div>
        </div>
        
        <div className="flex gap-2 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-700 backdrop-blur-md">
          <button onClick={() => setActiveTab('map')} className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-[0.1em] ${activeTab === 'map' ? 'bg-orange-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}><MapIcon size={16} /><span>Mapa de Calor</span></button>
          <button onClick={() => setActiveTab('analytics')} className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-[0.1em] ${activeTab === 'analytics' ? 'bg-orange-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}><BarChart3 size={16} /><span>Indicadores</span></button>
        </div>
      </div>

      {activeTab === 'map' && (
        <div className="relative w-full h-[780px] bg-[#020617] rounded-[48px] border-4 border-slate-800/50 overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)]">
          
          {isLoading && (
            <div className="absolute inset-0 z-[60] bg-[#020617]/95 backdrop-blur-xl flex flex-col items-center justify-center">
              <div className="relative">
                 <Loader2 size={80} className="text-orange-500 animate-spin opacity-20" />
                 <Search size={32} className="text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
              </div>
              <p className="mt-8 text-orange-400 font-black text-sm uppercase tracking-[0.5em] animate-pulse">Sincronizando Malha Urbana...</p>
            </div>
          )}

          {/* Seletor de Escopo com Design GIS */}
          <div className="absolute top-10 left-10 z-50 flex flex-col gap-4">
             <div className="bg-[#0f172a]/95 border border-slate-700 p-2 rounded-3xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-2 min-w-[220px]">
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] px-4 pt-2 mb-1">Nível de Zoom</p>
                {[
                  { id: 'cuiaba', label: 'Cuiabá (Ruas)', icon: <Navigation size={14} /> },
                  { id: 'baixada', label: 'Baixada Cuiabana', icon: <Layers size={14} /> },
                  { id: 'matogrosso', label: 'Mato Grosso', icon: <Maximize2 size={14} /> }
                ].map(scale => (
                  <button 
                    key={scale.id}
                    onClick={() => { setGeoScale(scale.id as GeoScale); setSelectedRegion(null); }}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all border ${geoScale === scale.id ? 'bg-orange-600 text-white border-orange-400 shadow-lg scale-[1.03]' : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/50'}`}
                  >
                    {scale.icon}
                    <span className="text-[11px] font-black uppercase tracking-widest">{scale.label}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* BOTÃO DE ALTERNÂNCIA RÁPIDA (CUIABÁ / BAIXADA) */}
          <div className="absolute top-10 right-28 z-50">
             <button 
               onClick={() => {
                 setGeoScale(geoScale === 'cuiaba' ? 'baixada' : 'cuiaba');
                 setSelectedRegion(null);
               }}
               className="flex items-center gap-3 bg-[#0f172a]/95 border border-slate-700 text-slate-300 px-6 py-4 rounded-3xl backdrop-blur-xl shadow-2xl hover:border-orange-500 hover:text-white transition-all group"
             >
                <div className="p-2 bg-orange-600/20 text-orange-500 rounded-xl group-hover:scale-110 transition-transform">
                   {geoScale === 'cuiaba' ? <Layers size={18} /> : <Navigation size={18} />}
                </div>
                <div className="text-left">
                   <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60">Visualização</p>
                   <p className="text-[10px] font-black uppercase tracking-widest">
                      {geoScale === 'cuiaba' ? 'Expandir para Regional' : 'Focar em Cuiabá'}
                   </p>
                </div>
             </button>
          </div>

          {/* Filtros de Risco Técnicos */}
          <div className="absolute top-10 right-10 z-50">
            <button 
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className={`p-5 rounded-full border transition-all shadow-2xl ${isFilterMenuOpen ? 'bg-white text-slate-900 border-white rotate-90' : 'bg-[#0f172a]/90 text-slate-400 border-slate-700 hover:border-slate-500'}`}
            >
              <Filter size={24} />
            </button>
            {isFilterMenuOpen && (
              <div ref={filterMenuRef} className="absolute top-full right-0 mt-5 bg-[#0f172a]/95 border border-slate-700 p-6 rounded-[32px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] w-64 animate-in zoom-in-95 duration-200 origin-top-right">
                <p className="text-[10px] text-slate-500 font-black mb-6 uppercase tracking-[0.3em]">Legenda Térmica</p>
                {['Crítico', 'Alto', 'Médio', 'Baixo'].map(level => (
                  <button 
                    key={level} 
                    onClick={() => toggleRiskFilter(level)}
                    className={`w-full flex items-center justify-between py-4 px-5 rounded-2xl transition-all mb-2 ${activeRiskFilters.includes(level) ? 'bg-slate-800/80 border border-slate-700 shadow-inner' : 'opacity-20 border border-transparent'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getRiskColorHex(level), boxShadow: `0 0 20px ${getRiskColorHex(level)}80` }}></div>
                      <span className="text-xs font-black text-slate-100 uppercase tracking-tighter">{level}</span>
                    </div>
                    {activeRiskFilters.includes(level) && <Check size={18} className="text-orange-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MAP CANVAS - COM ZOOM DINÂMICO BASEADO EM SELEÇÃO */}
          <div 
            className="w-full h-full relative transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center"
            style={{ transform: getMapTransform() }}
            onClick={() => setSelectedRegion(null)}
          >
             {/* CAMADA DE FUNDO: SATÉLITE DARK */}
             <div className="absolute inset-0 bg-[#020617] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 grayscale mix-blend-screen scale-110"></div>
                
                {/* MALHA URBANA (SIMULADOR DE RUAS) */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
                   <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                         <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
                         <path d="M 30 0 L 30 60 M 0 30 L 60 30" fill="none" stroke="white" strokeWidth="0.2" strokeOpacity="0.3"/>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                   </svg>
                </div>

                {/* REPRESENTAÇÃO DAS AVENIDAS PRINCIPAIS */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 1000 1000">
                   <path d="M 500 500 L 700 300" stroke="white" strokeWidth="4" fill="none" />
                   <path d="M 500 500 L 650 800" stroke="white" strokeWidth="4" fill="none" />
                   <path d="M 400 600 Q 500 700 600 800" stroke="white" strokeWidth="3" fill="none" />
                   <path d="M 350 550 L 500 500" stroke="white" strokeWidth="3" fill="none" />
                </svg>
                
                {/* Glow Central em Cuiabá */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
             </div>
             
             {/* MARCADORES E INTERAÇÕES */}
             <div className="relative w-[1000px] h-[1000px] flex items-center justify-center">
                
                {geoScale === 'matogrosso' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center border-2 border-slate-700/20 rounded-[45%] border-dashed">
                     <span className="text-[180px] font-black text-slate-100/[0.03] uppercase tracking-[0.6em] select-none rotate-[-5deg]">MATO GROSSO</span>
                  </div>
                )}

                {riskRegions.map(region => {
                  const isActive = activeRiskFilters.includes(region.riskLevel);
                  
                  let isVisible = false;
                  if (geoScale === 'cuiaba') isVisible = region.type === 'local';
                  if (geoScale === 'baixada') isVisible = region.type === 'local' || region.type === 'regional';
                  if (geoScale === 'matogrosso') isVisible = true;

                  const isSelected = selectedRegion?.id === region.id;

                  return (
                    <div 
                      key={region.id}
                      className={`absolute cursor-pointer transition-all duration-700 ${isActive && isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
                      style={{ 
                        left: region.x, 
                        top: region.y, 
                        zIndex: isSelected ? 100 : hoveredRegion === region.id ? 90 : 20 
                      }}
                      onClick={(e) => { e.stopPropagation(); handleRegionClick(region); }}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    >
                      <div className="relative group">
                         {/* Efeito de Ondas Térmicas (Ping) */}
                         {(region.riskLevel === 'Crítico' || isSelected) && (
                           <span className={`absolute -inset-6 rounded-full opacity-40 animate-ping ${isSelected ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                         )}
                         
                         <div className={`absolute -inset-4 bg-slate-900/90 rounded-full blur-md transition-opacity duration-300 ${hoveredRegion === region.id || isSelected ? 'opacity-100' : 'opacity-0'}`}></div>
                         
                         <MapPin 
                            size={isSelected ? 52 : geoScale === 'matogrosso' ? 44 : 32} 
                            fill={getRiskColorHex(region.riskLevel)} 
                            className={`text-slate-950 transition-all duration-500 filter drop-shadow-2xl ${hoveredRegion === region.id || isSelected ? 'scale-125 translate-y-[-4px]' : ''}`} 
                         />
                         
                         {/* Rótulo de Nome do Bairro */}
                         {geoScale === 'cuiaba' && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-slate-950/80 border border-slate-700/50 rounded-full backdrop-blur-sm pointer-events-none">
                               <p className="text-[7px] text-slate-100 font-black uppercase tracking-widest whitespace-nowrap">{region.name}</p>
                            </div>
                         )}
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>

          {/* Painel Lateral de Detalhes (Sidebar Temporária) */}
          <div className={`absolute top-10 right-10 bottom-10 w-[420px] z-[70] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${selectedRegion ? 'translate-x-0 opacity-100' : 'translate-x-[110%] opacity-0 pointer-events-none'}`}>
              <div className="h-full bg-[#0f172a]/98 border border-white/10 rounded-[48px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden backdrop-blur-3xl">
                
                <div className="p-10 border-b border-slate-800 flex justify-between items-start bg-gradient-to-br from-slate-800/40 to-transparent">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="bg-orange-600/20 text-orange-500 p-2 rounded-xl border border-orange-500/30">
                          <Activity size={18} />
                       </div>
                       <span className="text-[10px] font-black bg-slate-800 text-slate-400 px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-slate-700">Diagnóstico 2026</span>
                    </div>
                    <h3 className="text-4xl font-black text-white leading-tight tracking-tighter uppercase">{selectedRegion?.name}</h3>
                  </div>
                  <button onClick={() => setSelectedRegion(null)} className="p-4 bg-slate-800/80 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all shadow-xl group">
                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-10 rounded-[40px] flex items-center justify-between shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-2 relative z-10">
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.3em]">Calor de Superfície</p>
                      <p className="text-7xl font-black text-white tracking-tighter">{selectedRegion?.temperature}°<span className="text-orange-500">C</span></p>
                    </div>
                    <div className="p-7 bg-red-600 text-white rounded-[32px] shadow-[0_20px_40px_-10px_rgba(220,38,38,0.5)] relative z-10">
                      <Thermometer size={48} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="bg-slate-800/30 p-8 rounded-[32px] border border-slate-700/50 space-y-4">
                        <Users size={20} className="text-blue-400" />
                        <div>
                           <p className="text-[9px] text-slate-500 font-black uppercase mb-1">População Atingida</p>
                           <p className="text-2xl font-black text-slate-100">{selectedRegion?.totalPopulation?.toLocaleString('pt-BR')}</p>
                        </div>
                     </div>
                     <div className="bg-slate-800/30 p-8 rounded-[32px] border border-slate-700/50 space-y-4">
                        <Layers size={20} className="text-green-400" />
                        <div>
                           <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Densidade Urbana</p>
                           <p className="text-2xl font-black text-slate-100">{selectedRegion?.populationDensity} <span className="text-[10px] opacity-40">/km²</span></p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                       <AlertCircle size={20} className="text-orange-500" />
                       <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Estratégia de Mitigação</h4>
                    </div>
                    <div className="p-8 bg-orange-600/10 border border-orange-500/20 rounded-[35px] relative">
                      <div className="absolute -top-4 -right-4 bg-orange-600 text-white p-2 rounded-xl text-[10px] font-black uppercase tracking-widest px-3 shadow-lg">Prioritário</div>
                      <p className="text-base text-slate-200 leading-relaxed font-bold italic">
                        "{selectedRegion?.recommendation}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-slate-800/50 border-t border-slate-800/50 flex gap-4">
                   <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-4 py-6 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-[28px] border border-slate-700 text-[11px] font-black transition-all uppercase tracking-[0.2em] shadow-lg">
                      {isCopied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                      {isCopied ? 'Link Gerado' : 'Laudo PDF'}
                   </button>
                   <button className="flex-1 py-6 bg-orange-600 hover:bg-orange-500 text-white rounded-[28px] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-600/20">
                      Plano Diretor
                   </button>
                </div>
              </div>
          </div>

          {/* Banner de Contexto Corporativo (Rodapé) */}
          <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl bg-[#0f172a]/95 border border-slate-700/80 p-8 rounded-[45px] backdrop-blur-3xl flex items-center justify-between gap-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-700 ${selectedRegion ? 'translate-y-[200%] opacity-0' : 'translate-y-0 opacity-100'}`}>
              <div className="flex items-center gap-8">
                 <div className="p-7 bg-orange-600/20 text-orange-500 rounded-[35px] border border-orange-500/30 shadow-2xl">
                    <Maximize2 size={36} />
                 </div>
                 <div className="space-y-2">
                    <h5 className="text-white font-black text-2xl tracking-tighter uppercase italic">Visão Estratégica <span className="text-orange-500">2026</span></h5>
                    <p className="text-[13px] text-slate-400 max-w-xl leading-relaxed font-medium">
                       Diagnóstico de alta precisão calibrado para o cenário térmico de 2026. Integração total entre os polos logísticos de Rondonópolis, Sorriso e a malha urbana de Cuiabá.
                    </p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right hidden md:block">
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Conformidade ESG</p>
                    <p className="text-sm text-white font-bold">Relatório ODS-11</p>
                 </div>
                 <button className="px-12 py-5 bg-orange-600 text-white text-[11px] font-black rounded-3xl transition-all uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] hover:scale-105 active:scale-95">
                    Consultar BI
                 </button>
              </div>
          </div>

        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-[#0f172a] border border-slate-700 p-12 rounded-[56px] shadow-3xl">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="p-6 bg-red-500/10 rounded-3xl text-red-500 shadow-inner"><TrendingUp size={32} /></div>
                    <div>
                       <h4 className="text-3xl font-black text-white tracking-tighter uppercase">Evolução de Temperatura</h4>
                       <p className="text-[11px] text-slate-500 uppercase tracking-widest font-black">Histórico Multiespectral Landsat 8/9</p>
                    </div>
                 </div>
                 <div className="h-80 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={mockHistoricalData}>
                       <defs>
                         <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                           <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                       <XAxis dataKey="month" stroke="#475569" fontSize={12} axisLine={false} tickLine={false} />
                       <YAxis stroke="#475569" fontSize={12} unit="°" axisLine={false} tickLine={false} />
                       <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '28px', padding: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }} />
                       <Area type="monotone" dataKey="maxTemp" stroke="#ef4444" strokeWidth={5} fillOpacity={1} fill="url(#colorTemp)" />
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>
              </div>

              <div className="bg-[#0f172a] border border-slate-700 p-12 rounded-[56px] shadow-3xl">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="p-6 bg-blue-500/10 rounded-3xl text-blue-400 shadow-inner"><Users size={32} /></div>
                    <div>
                       <h4 className="text-3xl font-black text-white tracking-tighter uppercase">Vulnerabilidade Social</h4>
                       <p className="text-[11px] text-slate-500 uppercase tracking-widest font-black">Correlação LST vs. Densidade Populacional</p>
                    </div>
                 </div>
                 <div className="h-80 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                       <XAxis type="number" dataKey="temperature" name="Temp" unit="°C" stroke="#475569" fontSize={12} domain={[25, 45]} />
                       <YAxis type="number" dataKey="populationDensity" name="Densidade" unit=" hab" stroke="#475569" fontSize={12} />
                       <ZAxis type="number" dataKey="totalPopulation" range={[100, 1000]} />
                       <RechartsTooltip 
                         cursor={{ strokeDasharray: '3 3' }} 
                         content={({ active, payload }) => {
                           if (active && payload && payload.length) {
                             const data = payload[0].payload;
                             return (
                               <div className="bg-[#0f172a] border border-slate-700 p-8 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl border-white/5">
                                 <p className="text-white font-black text-lg mb-4 border-b border-slate-800 pb-4 uppercase tracking-tighter">{data.name}</p>
                                 <div className="space-y-4">
                                   <div className="flex justify-between items-center gap-10">
                                      <span className="text-[11px] text-slate-500 font-black uppercase">Temperatura</span>
                                      <span className="text-orange-400 font-black text-xl">{data.temperature}°C</span>
                                   </div>
                                   <div className="flex justify-between items-center gap-10">
                                      <span className="text-[11px] text-slate-500 font-black uppercase">Densidade</span>
                                      <span className="text-blue-400 font-black text-xl">{data.populationDensity} hab/km²</span>
                                   </div>
                                   <div className="pt-2 flex items-center gap-4">
                                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Nível de Risco</span>
                                      <span className="font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-widest border" style={{ backgroundColor: getRiskColorHex(data.riskLevel) + '20', color: getRiskColorHex(data.riskLevel), borderColor: getRiskColorHex(data.riskLevel) + '40' }}>{data.riskLevel}</span>
                                   </div>
                                 </div>
                               </div>
                             );
                           }
                           return null;
                         }} 
                       />
                       <Scatter name="Regiões" data={riskRegions}>
                         {riskRegions.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={getRiskColorHex(entry.riskLevel)} />
                         ))}
                       </Scatter>
                     </ScatterChart>
                   </ResponsiveContainer>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                 <div className="p-5 bg-slate-900 rounded-3xl text-slate-500 border border-slate-800 shadow-2xl"><Globe size={32} /></div>
                 <div>
                    <span className="text-[11px] text-slate-500 font-black uppercase tracking-widest block mb-2">Engenharia de Dados UFMT 2026</span>
                    <span className="text-base text-slate-200 font-bold tracking-tight italic">Protocolo de Monitoramento Multiespectral Operacional</span>
                 </div>
              </div>
              <div className="flex flex-wrap justify-center gap-10">
                 {[
                   { label: 'NASA POWER Project', url: 'https://power.larc.nasa.gov/' },
                   { label: 'USGS TIRS Operational', url: 'https://earthexplorer.usgs.gov/' },
                   { label: 'IBGE MT Census', url: 'https://www.ibge.gov.br/' }
                 ].map(source => (
                   <a 
                    key={source.label}
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[11px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.2em] group"
                   >
                      <span className="border-b-2 border-transparent group-hover:border-slate-400 pb-1">{source.label}</span>
                      <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                   </a>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
