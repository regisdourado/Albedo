
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import { ThermalDataPoint, RegionRisk } from '../types';
import { fetchNasaHeatData } from '../services/arcgis';
import { getRiskColorHex } from '../utils/riskUtils';
import { AlertCircle, Thermometer, Map as MapIcon, BarChart3, Filter, Loader2, Navigation, MapPin, X, Globe, Share2, Check, Users, Activity, TrendingUp, ExternalLink, Maximize2, Layers, Search, Info, Plus, Minus, Compass, Eye, EyeOff, Map as MapAlt, ShieldCheck, Waves } from 'lucide-react';

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
type Basemap = 'satellite' | 'vector';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'analytics'>('map');
  const [geoScale, setGeoScale] = useState<GeoScale>('cuiaba');
  const [riskRegions, setRiskRegions] = useState<VisualRegionRisk[]>([]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<VisualRegionRisk | null>(null);
  const [activeRiskFilters, setActiveRiskFilters] = useState<string[]>(['Baixo', 'Médio', 'Alto', 'Crítico']);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [manualZoom, setManualZoom] = useState<number>(1);
  const [basemap, setBasemap] = useState<Basemap>('satellite');
  const [showHeatLayer, setShowHeatLayer] = useState(true);
  const [showRoadsLayer, setShowRoadsLayer] = useState(true);

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

  const zoomIn = () => setManualZoom(prev => Math.min(prev + 0.2, 4));
  const zoomOut = () => setManualZoom(prev => Math.max(prev - 0.2, 0.4));
  const resetZoom = () => { setManualZoom(1); setSelectedRegion(null); };

  const getMapTransform = () => {
    let baseScale = 1;
    let translateX = 0;
    let translateY = 0;

    if (geoScale === 'cuiaba') baseScale = 2.4;
    else if (geoScale === 'baixada') baseScale = 1.4;
    else if (geoScale === 'matogrosso') baseScale = 0.6;

    let finalScale = baseScale * manualZoom;

    if (selectedRegion) {
      finalScale = finalScale * 1.3;
      const xPercent = parseFloat(selectedRegion.x);
      const yPercent = parseFloat(selectedRegion.y);
      translateX = (50 - xPercent) * (8 * manualZoom); 
      translateY = (50 - yPercent) * (8 * manualZoom);
      return `scale(${finalScale}) translate(${translateX}px, ${translateY}px)`;
    }

    return `scale(${finalScale}) translate(0px, 0px)`;
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-end mb-4 gap-4">
        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 italic">ArcGIS <span className="text-blue-500">Professional</span> <span className="text-slate-500 text-sm font-normal">v4.2</span></h2>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sincronizado: Landsat 9</span>
             </div>
             <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">Scale: <span className="text-white font-bold">{getScaleLabel()}</span></span>
          </div>
        </div>
        
        <div className="flex gap-2 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-700 backdrop-blur-md">
          <button onClick={() => setActiveTab('map')} className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-[0.1em] ${activeTab === 'map' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}><Globe size={16} /><span>Geospatial Map</span></button>
          <button onClick={() => setActiveTab('analytics')} className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-[0.1em] ${activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}><BarChart3 size={16} /><span>Analytics</span></button>
        </div>
      </div>

      {activeTab === 'map' && (
        <div className="relative w-full h-[820px] bg-[#020617] rounded-[48px] border-8 border-slate-800 overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)]">
          
          {isLoading && (
            <div className="absolute inset-0 z-[100] bg-[#020617]/95 backdrop-blur-xl flex flex-col items-center justify-center">
              <Loader2 size={64} className="text-blue-500 animate-spin mb-6" />
              <p className="text-blue-400 font-black text-sm uppercase tracking-[0.5em] animate-pulse">Rendering Map Engine...</p>
            </div>
          )}

          {/* ArcGIS WIDGETS */}
          <div className="absolute top-10 left-10 z-50 flex flex-col gap-4">
             <div className="bg-[#0f172a]/95 border border-slate-700 p-5 rounded-3xl backdrop-blur-2xl shadow-2xl min-w-[240px]">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                   <p className="text-[10px] text-white font-black uppercase tracking-[0.1em] flex items-center gap-2">
                      <Layers size={14} className="text-blue-500" /> Operational Layers
                   </p>
                   <Info size={14} className="text-slate-600 cursor-help" />
                </div>
                <div className="space-y-4">
                   <button onClick={() => setShowHeatLayer(!showHeatLayer)} className="flex items-center justify-between w-full group">
                      <div className="flex items-center gap-3">
                         {showHeatLayer ? <Eye size={16} className="text-blue-500" /> : <EyeOff size={16} className="text-slate-600" />}
                         <span className={`text-[11px] font-bold uppercase tracking-wider ${showHeatLayer ? 'text-slate-200' : 'text-slate-600'}`}>LST Thermal Index</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_orange]"></div>
                   </button>
                   <button onClick={() => setShowRoadsLayer(!showRoadsLayer)} className="flex items-center justify-between w-full group">
                      <div className="flex items-center gap-3">
                         {showRoadsLayer ? <Eye size={16} className="text-blue-500" /> : <EyeOff size={16} className="text-slate-600" />}
                         <span className={`text-[11px] font-bold uppercase tracking-wider ${showRoadsLayer ? 'text-slate-200' : 'text-slate-600'}`}>Urban Mesh (OSM)</span>
                      </div>
                      <div className="w-2 h-2 bg-white/40 rounded-sm"></div>
                   </button>
                </div>
                <div className="mt-8">
                   <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3">Scale Presets</p>
                   <div className="flex flex-col gap-1">
                      {['cuiaba', 'baixada', 'matogrosso'].map(s => (
                        <button key={s} onClick={() => {setGeoScale(s as GeoScale); setManualZoom(1); setSelectedRegion(null);}} className={`text-left px-3 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${geoScale === s ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-800'}`}>
                          {s === 'cuiaba' ? 'Cuiabá Urban' : s === 'baixada' ? 'Metropolitan' : 'State View'}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
             <div className="bg-[#0f172a]/80 border border-slate-700/50 px-6 py-2 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-6 text-[10px] font-mono text-slate-400">
                <div className="flex gap-2"><span className="text-blue-500">LAT:</span> 15.5961° S</div>
                <div className="h-3 w-px bg-slate-800"></div>
                <div className="flex gap-2"><span className="text-blue-500">LON:</span> 56.0967° W</div>
             </div>
          </div>

          {/* MAP CANVAS */}
          <div className="w-full h-full relative transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center" style={{ transform: getMapTransform() }}>
             
             {/* SIMULATED GEOGRAPHIC ENGINE: CUIABÁ MAP */}
             <div className="absolute inset-0 bg-[#020617] overflow-hidden">
                {/* VECTOR LAYER: CUIABÁ RIVER & MAIN AVENUES */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1000 1000">
                   {/* Rio Cuiabá (S-shape separating Cuiabá and VG) */}
                   <path d="M 400 0 C 380 200, 350 400, 420 500 S 480 800, 450 1000" stroke="#1d4ed8" strokeWidth="25" fill="none" strokeOpacity="0.6" filter="blur(2px)" />
                   
                   {/* Major Avenues (Cuiabá Side) */}
                   <g stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4">
                      {/* Av. do CPA (Rubens de Mendonça) - North East */}
                      <path d="M 500 500 L 900 100" />
                      {/* Av. Fernando Corrêa - South East */}
                      <path d="M 500 500 L 800 950" />
                      {/* Av. Beira Rio */}
                      <path d="M 420 500 L 550 750" />
                      {/* Av. Miguel Sutil (Perimetral) */}
                      <path d="M 200 300 L 800 300 M 800 300 L 850 800" fill="none" />
                   </g>

                   {/* Major Avenues (Várzea Grande Side) */}
                   <g stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3">
                      <path d="M 380 500 L 0 500" /> {/* Av. FEB */}
                      <path d="M 350 550 L 100 800" />
                   </g>
                </svg>

                {/* Satellite Imagery Simulation (Static Texture) */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-20 mix-blend-screen grayscale"></div>

                {/* ArcGIS Grid */}
                <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
                   <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="gisGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                         <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#gisGrid)" />
                   </svg>
                </div>
             </div>
             
             {/* MARKERS LAYER (Positioned precisely on the vector map) */}
             <div className="relative w-[1000px] h-[1000px] flex items-center justify-center">
                {riskRegions.map(region => {
                  const isVisible = geoScale === 'cuiaba' ? region.type === 'local' : true;
                  const isSelected = selectedRegion?.id === region.id;
                  if (!isVisible) return null;

                  return (
                    <div key={region.id} className="absolute cursor-pointer transition-all duration-700" style={{ left: region.x, top: region.y, zIndex: isSelected ? 100 : 20 }} onClick={(e) => { e.stopPropagation(); handleRegionClick(region); }}>
                      <div className="relative group">
                         {showHeatLayer && (
                           <span className={`absolute -inset-6 rounded-full opacity-40 animate-ping ${region.riskLevel === 'Crítico' ? 'bg-red-500' : 'bg-orange-500'}`}></span>
                         )}
                         <MapPin size={isSelected ? 48 : 32} fill={getRiskColorHex(region.riskLevel)} className="text-slate-950 shadow-2xl transition-transform group-hover:scale-125" />
                         <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-slate-950/90 rounded text-[8px] font-black text-white uppercase tracking-tighter shadow-xl whitespace-nowrap">
                            {region.name}
                         </div>
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>

          {/* ArcGIS INFO PANEL */}
          <div className={`absolute top-10 right-10 bottom-10 w-[420px] z-[120] transition-all duration-700 ${selectedRegion ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}>
              <div className="h-full bg-[#0f172a]/98 border border-slate-700 rounded-[40px] shadow-3xl flex flex-col backdrop-blur-xl overflow-hidden">
                <div className="p-10 border-b border-slate-800 flex justify-between">
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">{selectedRegion?.name}</h3>
                    <p className="text-[10px] text-blue-500 font-black uppercase mt-1">Sincronizado via Landsat 9</p>
                  </div>
                  <button onClick={() => setSelectedRegion(null)} className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all"><X size={20} /></button>
                </div>
                <div className="p-10 space-y-10 flex-1 overflow-y-auto custom-scrollbar">
                   <div className="bg-slate-900 border border-slate-800 p-8 rounded-[30px] flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-2 tracking-widest">Superfície (LST)</p>
                        <p className="text-6xl font-black text-white">{selectedRegion?.temperature}°C</p>
                      </div>
                      <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase border" style={{color: getRiskColorHex(selectedRegion?.riskLevel || ''), borderColor: getRiskColorHex(selectedRegion?.riskLevel || '')}}>{selectedRegion?.riskLevel}</div>
                   </div>
                   <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[30px]"><p className="text-sm text-slate-300 italic leading-relaxed font-medium">"{selectedRegion?.recommendation}"</p></div>
                </div>
                <div className="p-10 bg-slate-800/50 border-t border-slate-700/50 flex gap-4">
                   <button onClick={handleShare} className="flex-1 py-4 bg-slate-900 text-slate-300 rounded-2xl border border-slate-700 text-[10px] font-black uppercase">{isCopied ? 'Copiado!' : 'Compartilhar'}</button>
                   <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-blue-600/20">Exportar Camada</button>
                </div>
              </div>
          </div>

          <div className="absolute bottom-10 right-10 z-50 bg-[#0f172a]/95 border border-slate-700 p-3 rounded-2xl flex items-center gap-4 shadow-2xl">
             <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500" /><span className="text-[9px] text-slate-400 font-black uppercase">SIRGAS 2000 / UTM 21S</span></div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-[#0f172a] border border-slate-700 p-12 rounded-[56px] shadow-3xl">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="p-6 bg-blue-500/10 rounded-3xl text-blue-500"><TrendingUp size={32} /></div>
                    <div><h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">Time Series <span className="text-blue-500">Cuiabá</span></h4><p className="text-[11px] text-slate-500 uppercase tracking-widest font-black">Tendência LST Regional 2026</p></div>
                 </div>
                 <div className="h-80 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={mockHistoricalData}>
                       <defs><linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} /><XAxis dataKey="month" stroke="#475569" fontSize={12} axisLine={false} tickLine={false} /><YAxis stroke="#475569" fontSize={12} unit="°" axisLine={false} tickLine={false} /><RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '28px', padding: '16px' }} /><Area type="monotone" dataKey="maxTemp" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorTemp)" />
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>
              </div>
              <div className="bg-[#0f172a] border border-slate-700 p-12 rounded-[56px] shadow-3xl">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="p-6 bg-purple-500/10 rounded-3xl text-purple-400"><Users size={32} /></div>
                    <div><h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">Impacto <span className="text-purple-500">Socioambiental</span></h4><p className="text-[11px] text-slate-500 uppercase tracking-widest font-black">LST vs. Vulnerabilidade em Cuiabá/VG</p></div>
                 </div>
                 <div className="h-80 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" /><XAxis type="number" dataKey="temperature" name="Temp" unit="°C" stroke="#475569" fontSize={12} domain={[25, 45]} /><YAxis type="number" dataKey="populationDensity" name="Densidade" unit=" hab" stroke="#475569" fontSize={12} /><ZAxis type="number" dataKey="totalPopulation" range={[100, 1000]} />
                       <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => { 
                         if (active && payload && payload.length) { 
                           const data = payload[0].payload; 
                           return ( 
                             <div className="bg-[#0f172a] border border-slate-700 p-8 rounded-[32px] shadow-3xl backdrop-blur-3xl"><p className="text-white font-black text-lg mb-4 border-b border-slate-800 pb-4 uppercase tracking-tighter">{data.name}</p>
                             <div className="space-y-4"><div className="flex justify-between items-center gap-10"><span className="text-[11px] text-slate-500 font-black uppercase">Sensor LST</span><span className="text-blue-400 font-black text-xl">{data.temperature}°C</span></div></div></div> 
                           ); 
                         } return null; 
                       }} />
                       <Scatter name="Regiões" data={riskRegions}>{riskRegions.map((entry, index) => ( <Cell key={`cell-${index}`} fill={getRiskColorHex(entry.riskLevel)} /> ))}</Scatter>
                     </ScatterChart>
                   </ResponsiveContainer>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
