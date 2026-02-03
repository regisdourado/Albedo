
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import { ThermalDataPoint, RegionRisk } from '../types';
import { fetchNasaHeatData } from '../services/arcgis';
import { AlertCircle, Thermometer, Map as MapIcon, BarChart3, Filter, Loader2, Navigation, MapPin, X, Globe, Share2, Check, Users, Activity, TrendingUp, ExternalLink, Maximize2, Layers, Search, Info, Plus, Minus, Compass, Eye, EyeOff, Map as MapAlt } from 'lucide-react';

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
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [manualZoom, setManualZoom] = useState<number>(1);
  const [basemap, setBasemap] = useState<Basemap>('satellite');
  const [showHeatLayer, setShowHeatLayer] = useState(true);
  const [showRoadsLayer, setShowRoadsLayer] = useState(true);

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

          {/* ArcGIS WIDGET: BASEMAP GALLERY */}
          <div className="absolute bottom-10 left-10 z-50 flex flex-col gap-3">
             <div className="bg-[#0f172a]/95 border border-slate-700 p-2 rounded-3xl backdrop-blur-2xl shadow-2xl flex flex-col gap-2">
                <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] px-3 pt-1">Basemaps</p>
                <div className="flex gap-2 p-1">
                   <button 
                    onClick={() => setBasemap('satellite')}
                    className={`p-1 rounded-xl border-2 transition-all ${basemap === 'satellite' ? 'border-blue-500' : 'border-transparent'}`}
                   >
                     <div className="w-16 h-12 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=300')] bg-cover rounded-lg border border-slate-700"></div>
                     <span className="text-[8px] font-bold text-white mt-1 block">Imagery</span>
                   </button>
                   <button 
                    onClick={() => setBasemap('vector')}
                    className={`p-1 rounded-xl border-2 transition-all ${basemap === 'vector' ? 'border-blue-500' : 'border-transparent'}`}
                   >
                     <div className="w-16 h-12 bg-[#020617] rounded-lg flex items-center justify-center border border-slate-700 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=300')] bg-cover"></div>
                        <Navigation size={14} className="text-slate-600 relative z-10" />
                     </div>
                     <span className="text-[8px] font-bold text-white mt-1 block">Vector</span>
                   </button>
                </div>
             </div>
          </div>

          {/* ArcGIS WIDGET: LAYER LIST */}
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
                        <button 
                          key={s} 
                          onClick={() => {setGeoScale(s as GeoScale); setManualZoom(1); setSelectedRegion(null);}}
                          className={`text-left px-3 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${geoScale === s ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-800'}`}
                        >
                          {s === 'cuiaba' ? 'Cuiabá Urban' : s === 'baixada' ? 'Metropolitan' : 'State View'}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* ArcGIS WIDGET: COORDINATE DISPLAY */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
             <div className="bg-[#0f172a]/80 border border-slate-700/50 px-6 py-2 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-6 text-[10px] font-mono text-slate-400">
                <div className="flex gap-2">
                   <span className="text-blue-500">LAT:</span> 15.5961° S
                </div>
                <div className="h-3 w-px bg-slate-800"></div>
                <div className="flex gap-2">
                   <span className="text-blue-500">LON:</span> 56.0967° W
                </div>
                <div className="h-3 w-px bg-slate-800"></div>
                <div className="flex gap-2">
                   <span className="text-blue-500">ZOOM:</span> {(manualZoom * (geoScale === 'cuiaba' ? 14 : geoScale === 'baixada' ? 10 : 6)).toFixed(1)}z
                </div>
             </div>
          </div>

          {/* ArcGIS WIDGET: NAVIGATION TOOLS */}
          <div className="absolute bottom-10 right-10 z-50 flex flex-col gap-3">
             <div className="bg-[#0f172a]/95 border border-slate-700 p-2 rounded-3xl backdrop-blur-2xl shadow-2xl flex flex-col gap-2">
                <button onClick={zoomIn} className="p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl border border-slate-800 transition-all shadow-lg active:scale-95"><Plus size={20} /></button>
                <button onClick={zoomOut} className="p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl border border-slate-800 transition-all shadow-lg active:scale-95"><Minus size={20} /></button>
                <div className="h-px bg-slate-800 my-1 mx-2"></div>
                <button onClick={resetZoom} className="p-4 bg-slate-900 hover:bg-slate-800 text-blue-500 rounded-2xl border border-slate-800 transition-all shadow-lg active:rotate-180"><Compass size={20} className={manualZoom !== 1 ? "animate-pulse" : ""} /></button>
             </div>
          </div>

          {/* MAP CANVAS */}
          <div 
            className="w-full h-full relative transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center"
            style={{ transform: getMapTransform() }}
            onClick={() => setSelectedRegion(null)}
          >
             {/* REAL BASEMAP LAYER */}
             <div className="absolute inset-0 bg-[#020617] overflow-hidden">
                {/* SATELLITE IMAGE (High-Detail Real Map Simulation) */}
                <div className={`absolute inset-0 transition-all duration-1000 ${basemap === 'satellite' ? 'opacity-50 scale-100' : 'opacity-0 scale-110 grayscale pointer-events-none'}`}>
                   {/* Using a high-detail urban fabric image from Unsplash to simulate real satellite view of a city */}
                   <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Satellite Imagery" />
                   
                   {/* Secondary overlay for more "texture" */}
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover mix-blend-overlay opacity-30"></div>
                </div>

                {/* VECTOR IMAGE (Technical Map Simulation) */}
                <div className={`absolute inset-0 transition-all duration-1000 ${basemap === 'vector' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                   <div className="absolute inset-0 bg-[#020617]"></div>
                   <div className="absolute inset-0 opacity-[0.15] bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover grayscale invert"></div>
                   
                   {/* Technical Grid for Vector Mode */}
                   <div className="absolute inset-0 opacity-[0.3]">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="vectorGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                           <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#vectorGrid)" />
                      </svg>
                   </div>
                </div>
                
                {/* GEOGRAPHIC GRID (SIMULATED FOR ALL VIEWS) */}
                <div className="absolute inset-0 opacity-[0.25] pointer-events-none">
                   <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="gisGrid" width="120" height="120" patternUnits="userSpaceOnUse">
                         <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.5"/>
                         <text x="5" y="15" fill="#3b82f6" fontSize="8" fontWeight="bold" opacity="0.4">15°35'S</text>
                         <text x="85" y="115" fill="#3b82f6" fontSize="8" fontWeight="bold" opacity="0.4">56°05'W</text>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#gisGrid)" />
                   </svg>
                </div>

                {/* ROADS LAYER (REAL-TIME OVERLAY FEEL) */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${showRoadsLayer ? 'opacity-30' : 'opacity-0'}`}>
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
                      {/* Major Urban Arteries */}
                      <path d="M 500 0 L 500 1000 M 0 500 L 1000 500" stroke="#fff" strokeWidth="1.5" strokeDasharray="10,10" fill="none" />
                      <path d="M 500 500 L 750 250 M 250 750 L 500 500" stroke="#fff" strokeWidth="2" fill="none" />
                      <path d="M 500 500 L 850 650 M 150 350 L 500 500" stroke="#fff" strokeWidth="2" fill="none" />
                      
                      {/* Secondary Grid Lines */}
                      <path d="M 300 0 L 300 1000 M 700 0 L 700 1000 M 0 300 L 1000 300 M 0 700 L 1000 700" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
                   </svg>
                </div>
                
                {/* THERMAL GLOW (HEATMAP OVERLAY) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[180px] transition-opacity duration-1000 ${showHeatLayer ? 'opacity-100' : 'opacity-0'}`}></div>
             </div>
             
             {/* MARKERS LAYER */}
             <div className="relative w-[1000px] h-[1000px] flex items-center justify-center">
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
                      className={`absolute cursor-pointer transition-all duration-700 ${isActive && isVisible && showHeatLayer ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
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
                         {/* ARC STYLE SYMBOLOLOGY */}
                         <div className={`absolute -inset-10 rounded-full transition-all duration-500 ${isSelected ? 'bg-blue-500/20 opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
                         
                         {(region.riskLevel === 'Crítico' || isSelected) && (
                           <span className={`absolute -inset-6 rounded-full opacity-40 animate-ping ${isSelected ? 'bg-blue-500' : 'bg-red-500'}`}></span>
                         )}
                         
                         <div className={`absolute -inset-4 bg-[#0f172a] rounded-full blur-sm shadow-2xl transition-opacity ${hoveredRegion === region.id || isSelected ? 'opacity-100' : 'opacity-0'}`}></div>
                         
                         <div className="relative">
                            <MapPin 
                                size={isSelected ? 48 : 32} 
                                fill={getRiskColorHex(region.riskLevel)} 
                                className={`text-slate-950 transition-all duration-500 ${hoveredRegion === region.id || isSelected ? 'scale-110 translate-y-[-5px]' : ''}`} 
                            />
                            {isSelected && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>}
                         </div>
                         
                         {/* DYNAMIC LABELS */}
                         {(geoScale === 'cuiaba' || isSelected) && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-slate-950/90 border border-slate-800 rounded-md backdrop-blur-sm pointer-events-none whitespace-nowrap overflow-hidden shadow-2xl">
                               <p className="text-[9px] text-white font-black uppercase tracking-widest">{region.name}</p>
                               <div className="flex items-center gap-2 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: getRiskColorHex(region.riskLevel)}}></div>
                                  <p className="text-[7px] text-slate-400 font-bold uppercase">{region.temperature}°C • {region.riskLevel}</p>
                               </div>
                            </div>
                         )}
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>

          {/* ArcGIS INFO PANEL (Sidebar) */}
          <div className={`absolute top-10 right-10 bottom-10 w-[440px] z-[120] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${selectedRegion ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0 pointer-events-none'}`}>
              <div className="h-full bg-[#0f172a]/98 border border-slate-700/50 rounded-[40px] shadow-3xl flex flex-col overflow-hidden backdrop-blur-3xl">
                
                <div className="p-10 border-b border-slate-800 flex justify-between items-start bg-gradient-to-b from-blue-500/5 to-transparent">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-600/20">
                          <Search size={18} />
                       </div>
                       <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Geospatial Diagnosis</span>
                    </div>
                    <h3 className="text-4xl font-black text-white leading-tight tracking-tighter uppercase italic">{selectedRegion?.name}</h3>
                  </div>
                  <button onClick={() => setSelectedRegion(null)} className="p-4 bg-slate-800/80 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all shadow-xl">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
                  
                  <div className="flex items-center justify-between p-10 bg-slate-900 border border-slate-800 rounded-[35px] relative overflow-hidden group shadow-inner">
                    <div className="absolute top-0 left-0 w-full h-1" style={{backgroundColor: getRiskColorHex(selectedRegion?.riskLevel || '')}}></div>
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">NASA Power TS Sensor</p>
                      <p className="text-7xl font-black text-white tracking-tighter">{selectedRegion?.temperature}°<span className="text-blue-500">C</span></p>
                    </div>
                    <div className="flex flex-col items-center">
                       <Thermometer size={48} className="text-blue-500 opacity-50 mb-2" />
                       <span className="text-[10px] font-black px-4 py-1 rounded-full uppercase border shadow-sm" style={{color: getRiskColorHex(selectedRegion?.riskLevel || ''), borderColor: getRiskColorHex(selectedRegion?.riskLevel || '')}}>{selectedRegion?.riskLevel}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="bg-slate-800/20 p-8 rounded-[30px] border border-slate-700/50 shadow-sm hover:bg-slate-800/40 transition-colors">
                        <Users size={20} className="text-slate-500 mb-4" />
                        <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Exposure Pop.</p>
                        <p className="text-2xl font-black text-white tracking-tighter">{selectedRegion?.totalPopulation?.toLocaleString('pt-BR')}</p>
                     </div>
                     <div className="bg-slate-800/20 p-8 rounded-[30px] border border-slate-700/50 shadow-sm hover:bg-slate-800/40 transition-colors">
                        <Layers size={20} className="text-slate-500 mb-4" />
                        <p className="text-[9px] text-slate-500 font-black uppercase mb-1">NDVI Index</p>
                        <p className="text-2xl font-black text-white tracking-tighter">{selectedRegion?.vegetationCoverage}%</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <AlertCircle size={18} className="text-orange-500" />
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Intervention Protocol</h4>
                    </div>
                    <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[35px] shadow-sm">
                      <p className="text-base text-slate-200 leading-relaxed font-medium italic">
                        "{selectedRegion?.recommendation}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-slate-800/50 border-t border-slate-800/50 flex gap-4">
                   <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-4 py-6 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-[24px] border border-slate-700 text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-md active:scale-95">
                      {isCopied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                      Share Atlas
                   </button>
                   <button className="flex-1 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 active:scale-95">
                      Export GeoJSON
                   </button>
                </div>
              </div>
          </div>

          {/* ArcGIS FOOTER STATUS */}
          <div className={`absolute bottom-10 right-28 z-40 bg-[#0f172a]/95 border border-slate-700 p-3 rounded-2xl backdrop-blur-md flex items-center gap-4 transition-all shadow-2xl ${selectedRegion ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Engine: ArcObjects Core v4</span>
             </div>
             <div className="h-3 w-px bg-slate-800"></div>
             <span className="text-[9px] text-slate-600 font-mono tracking-tighter">EPSG:31981 - SIRGAS 2000 / UTM zone 21S</span>
          </div>

        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-[#0f172a] border border-slate-700 p-12 rounded-[56px] shadow-3xl">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="p-6 bg-blue-500/10 rounded-3xl text-blue-500 shadow-inner"><TrendingUp size={32} /></div>
                    <div>
                       <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">Time Series <span className="text-blue-500">2026</span></h4>
                       <p className="text-[11px] text-slate-500 uppercase tracking-widest font-black">LST Multispectral Trend (Landsat 8/9)</p>
                    </div>
                 </div>
                 <div className="h-80 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={mockHistoricalData}>
                       <defs>
                         <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                       <XAxis dataKey="month" stroke="#475569" fontSize={12} axisLine={false} tickLine={false} />
                       <YAxis stroke="#475569" fontSize={12} unit="°" axisLine={false} tickLine={false} />
                       <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '28px', padding: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }} />
                       <Area type="monotone" dataKey="maxTemp" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorTemp)" />
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>
              </div>

              <div className="bg-[#0f172a] border border-slate-700 p-12 rounded-[56px] shadow-3xl">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="p-6 bg-purple-500/10 rounded-3xl text-purple-400 shadow-inner"><Users size={32} /></div>
                    <div>
                       <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">Socio-Spatial <span className="text-purple-500">Overlay</span></h4>
                       <p className="text-[11px] text-slate-500 uppercase tracking-widest font-black">LST Index vs. Population Density</p>
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
                               <div className="bg-[#0f172a] border border-slate-700 p-8 rounded-[32px] shadow-3xl backdrop-blur-3xl border-white/5">
                                 <p className="text-white font-black text-lg mb-4 border-b border-slate-800 pb-4 uppercase tracking-tighter">{data.name}</p>
                                 <div className="space-y-4">
                                   <div className="flex justify-between items-center gap-10">
                                      <span className="text-[11px] text-slate-500 font-black uppercase">Sensor Data</span>
                                      <span className="text-blue-400 font-black text-xl">{data.temperature}°C</span>
                                   </div>
                                   <div className="flex justify-between items-center gap-10">
                                      <span className="text-[11px] text-slate-500 font-black uppercase">Vulnerability</span>
                                      <span className="font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-widest border shadow-sm" style={{ color: getRiskColorHex(data.riskLevel), borderColor: getRiskColorHex(data.riskLevel) + '40' }}>{data.riskLevel}</span>
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
                    <span className="text-[11px] text-slate-500 font-black uppercase tracking-widest block mb-2">ArcGIS Desktop Node 2026</span>
                    <span className="text-base text-slate-200 font-bold tracking-tight italic">Protocolo de Monitoramento Geoespacial Operacional v4</span>
                 </div>
              </div>
              <div className="flex flex-wrap justify-center gap-10">
                 {[
                   { label: 'Esri ArcGIS Online', url: 'https://www.arcgis.com' },
                   { label: 'NASA POWER Project', url: 'https://power.larc.nasa.gov/' },
                   { label: 'USGS Landsat 9 Mission', url: 'https://landsat.gsfc.nasa.gov/' }
                 ].map(source => (
                   <a 
                    key={source.label}
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[11px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.2em] group border-b border-transparent hover:border-slate-500 pb-1"
                   >
                      <span>{source.label}</span>
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
