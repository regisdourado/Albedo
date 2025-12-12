import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';
import { ThermalDataPoint, RegionRisk } from '../types';
import { fetchNasaHeatData } from '../services/arcgis';
import { AlertCircle, Thermometer, Map as MapIcon, BarChart3, Layers, Filter, Leaf, Signal, Loader2, Navigation, Compass, MapPin, Info, X, Download, ZoomIn, ArrowRight, Globe, RefreshCw } from 'lucide-react';

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

// Enhanced mock data with visual coordinates for the map simulation
interface VisualRegionRisk extends RegionRisk {
  x: string;
  y: string;
  isExternal?: boolean;
}

// Mapeamento recalibrado para a geografia real de Cuiabá (Vista Norte para Cima)
const initialMockRiskRegions: VisualRegionRisk[] = [
  // ZONA NORTE / NORDESTE (CPAs) - Topo Direito
  { id: '3', name: 'Grande CPA', riskLevel: 'Alto', temperature: 39.5, vegetationCoverage: 15, recommendation: 'Reforço Verde em Vias', x: '75%', y: '15%' },
  { id: '6', name: 'Morada da Serra', riskLevel: 'Alto', temperature: 38.8, vegetationCoverage: 18, recommendation: 'Arborização de Praças', x: '60%', y: '20%' },

  // ZONA OESTE / CENTRO - Centro Esquerda
  { id: '11', name: 'Santa Rosa', riskLevel: 'Médio', temperature: 34.2, vegetationCoverage: 40, recommendation: 'Manutenção', x: '35%', y: '25%' },
  { id: '5', name: 'Mãe Bonifácia', riskLevel: 'Baixo', temperature: 29.8, vegetationCoverage: 85, recommendation: 'Área de Controle (Preservação)', x: '42%', y: '35%' },
  { id: '1', name: 'Centro Histórico', riskLevel: 'Crítico', temperature: 43.2, vegetationCoverage: 5, recommendation: 'Arborização Imediata', x: '45%', y: '45%' },
  { id: '7', name: 'Porto', riskLevel: 'Crítico', temperature: 42.5, vegetationCoverage: 8, recommendation: 'Corredores Verdes', x: '38%', y: '48%' },

  // ZONA LESTE
  { id: '4', name: 'Jd. Imperial', riskLevel: 'Médio', temperature: 35.0, vegetationCoverage: 30, recommendation: 'Expansão de Bosques', x: '80%', y: '50%' },
  { id: '8', name: 'Campus UFMT', riskLevel: 'Baixo', temperature: 30.5, vegetationCoverage: 75, recommendation: 'Monitoramento', x: '60%', y: '55%' },

  // ZONA SUL (Coxipó / Industrial) - Base
  { id: '10', name: 'Coxipó', riskLevel: 'Alto', temperature: 38.2, vegetationCoverage: 20, recommendation: 'Recuperação Ciliar', x: '65%', y: '70%' },
  { id: '9', name: 'Tijucal', riskLevel: 'Crítico', temperature: 41.8, vegetationCoverage: 10, recommendation: 'Plantio Massivo', x: '75%', y: '75%' },
  { id: '2', name: 'Dist. Industrial', riskLevel: 'Crítico', temperature: 44.1, vegetationCoverage: 2, recommendation: 'Barreiras Verdes', x: '70%', y: '85%' },
  { id: '12', name: 'Pedra 90', riskLevel: 'Crítico', temperature: 42.1, vegetationCoverage: 5, recommendation: 'Intervenção Urgente', x: '85%', y: '85%' },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'analytics'>('map');
  const [riskRegions, setRiskRegions] = useState<VisualRegionRisk[]>(initialMockRiskRegions);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<VisualRegionRisk | null>(null); // State for click/zoom
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string | null>(null);
  const [showRiskGuide, setShowRiskGuide] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNasaData, setIsNasaData] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Simulate initial data fetching
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleNasaData = async () => {
    if (isNasaData) {
      // Reverter para dados locais
      setRiskRegions(initialMockRiskRegions);
      setIsNasaData(false);
      setSelectedRegion(null);
    } else {
      // Buscar dados da API
      setIsSyncing(true);
      try {
        const nasaData = await fetchNasaHeatData();
        if (nasaData.length > 0) {
          // Cast the returned type to include VisualRegionRisk properties (x, y are added in service)
          setRiskRegions(nasaData as VisualRegionRisk[]);
          setIsNasaData(true);
          setSelectedRegion(null);
        } else {
          alert("Não foi possível carregar dados da API da NASA no momento. Tentando novamente mais tarde.");
        }
      } catch (error) {
        console.error(error);
        alert("Erro de conexão com o servidor ArcGIS da NASA.");
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleDownloadCSV = () => {
    const headers = ['Mês,Temperatura Média (°C),Temperatura Máxima (°C),Índice de Vegetação (NDVI)'];
    const rows = mockHistoricalData.map(row =>
      `${row.month},${row.avgTemp},${row.maxTemp},${row.ndvi}`
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dados_climaticos_projeto_integrador_vi.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegionClick = (region: VisualRegionRisk, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRegion(region);
    setHoveredRegion(null); // Clear hover to avoid double tooltip
    setShowRiskGuide(false); // Close generic guide to focus on specific
  };

  const handleMapBackgroundClick = () => {
    if (selectedRegion) {
      setSelectedRegion(null);
    }
  };

  const getRegionStyle = (region: VisualRegionRisk) => {
    const isSelected = selectedRegion?.id === region.id;
    const isHovered = hoveredRegion === region.id;
    const isFiltered = selectedRiskFilter && region.riskLevel !== selectedRiskFilter;

    // If we are zoomed in on a region, fade others out strongly
    if (selectedRegion && !isSelected) {
      return { opacity: 0.1, transform: 'scale(0.8)', filter: 'blur(4px)' };
    }

    // If a filter is active and this region doesn't match, dim it
    if (isFiltered) {
      return { opacity: 0.1, transform: 'scale(0.8)', filter: 'grayscale(100%) blur(2px)' };
    }

    // Default or Hover state
    return {
      opacity: isHovered || isSelected ? 1 : 0.9,
      transform: isHovered || isSelected ? 'scale(1.2)' : 'scale(1)',
      zIndex: isHovered || isSelected ? 30 : 10,
    };
  };

  const getRiskColorHex = (level: string) => {
    switch (level) {
      case 'Crítico': return '#ef4444'; // red-500
      case 'Alto': return '#f97316'; // orange-500
      case 'Médio': return '#eab308'; // yellow-500
      case 'Baixo': return '#22c55e'; // green-500
      default: return '#94a3b8';
    }
  };

  const riskGuideDetails = [
    {
      level: 'Crítico',
      color: '#ef4444',
      temp: '> 40°C',
      desc: 'Ilha de Calor Extrema. Solo impermeável exposto.',
      action: 'Intervenção Urgente (Florestas Urbanas)'
    },
    {
      level: 'Alto',
      color: '#f97316',
      temp: '35°C - 40°C',
      desc: 'Alta densidade construtiva. Baixa umidade.',
      action: 'Arborização Viária e Parques'
    },
    {
      level: 'Médio',
      color: '#eab308',
      temp: '30°C - 35°C',
      desc: 'Zona de transição ou urbanização moderada.',
      action: 'Manutenção e Expansão Verde'
    },
    {
      level: 'Baixo',
      color: '#22c55e',
      temp: '< 30°C',
      desc: 'Microclima equilibrado. Vegetação densa.',
      action: 'Preservação e Monitoramento'
    }
  ];

  // Smart Positioning Logic for Tooltip
  const getTooltipPositionClasses = (xStr: string, yStr: string) => {
    const x = parseInt(xStr);
    const y = parseInt(yStr);

    // Vertical decision: if in top half, show below. If in bottom half, show above.
    let verticalClass = y < 50 ? 'top-full pt-4' : 'bottom-full pb-4';

    // Horizontal decision: prevent clipping on edges
    let horizontalClass = '-translate-x-1/2'; // default center
    if (x < 20) horizontalClass = '-translate-x-[20%]';
    if (x > 80) horizontalClass = '-translate-x-[80%]';

    return `${verticalClass} ${horizontalClass}`;
  };

  const SkeletonCard = () => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-3 w-full">
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-8 bg-slate-700 rounded w-3/4"></div>
        </div>
        <div className="bg-slate-700 h-10 w-10 rounded-lg"></div>
      </div>
      <div className="mt-4 h-3 bg-slate-700 rounded w-2/3"></div>
    </div>
  );

  const SkeletonChart = () => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
      <div className="h-6 bg-slate-700 rounded w-1/3 mb-6 animate-pulse"></div>
      <div className="h-64 w-full bg-slate-700/20 rounded-lg animate-pulse flex items-end justify-between p-4 gap-2">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-700/40 rounded-t w-full"
            style={{ height: `${Math.random() * 60 + 20}%` }}
          ></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-24 space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-end mb-4 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Painel de Diagnóstico MVP</h2>
          <p className="text-slate-400">Visualização de Risco Térmico para suporte ao planejamento urbano</p>
        </div>

        <div className="flex flex-wrap gap-3 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
          <button
            onClick={toggleNasaData}
            disabled={isSyncing}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all border border-transparent ${isNasaData
              ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            title="Conectar API ArcGIS (NASA)"
          >
            {isSyncing ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
            <span>{isNasaData ? 'Dados NASA Ativos' : 'Sincronizar NASA'}</span>
          </button>

          <div className="w-px bg-slate-700 mx-1 hidden md:block"></div>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${activeTab === 'map' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <MapIcon size={16} />
            <span>Mapa de Calor</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${activeTab === 'analytics' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <BarChart3 size={16} />
            <span>Dados Analíticos</span>
          </button>
        </div>
      </div>

      {activeTab === 'map' && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          {/* Interactive Map Interface */}
          <div
            className="relative w-full h-[700px] bg-slate-950 rounded-xl border border-slate-700 overflow-hidden group select-none shadow-2xl"
            onClick={handleMapBackgroundClick}
          >

            {/* Loading Overlay for Map */}
            {isLoading && (
              <div className="absolute inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Loader2 size={48} className="text-orange-500 animate-spin relative z-10" />
                </div>
                <div className="mt-4 text-orange-400 font-mono text-sm flex items-center gap-2">
                  <Signal size={14} className="animate-pulse" />
                  CALIBRATING SENSORS...
                </div>
                <div className="mt-2 text-slate-500 text-xs font-mono">
                  CARREGANDO GEOMETRIA LANDSAT 8
                </div>
              </div>
            )}

            {/* Zoomable Container */}
            <div
              className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: selectedRegion ? 'scale(1.8)' : 'scale(1)',
                transformOrigin: selectedRegion ? `${selectedRegion.x} ${selectedRegion.y}` : 'center center'
              }}
            >
              {/* Base Map Layers */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>

                {/* 1. Base City Grid Texture - Higher Contrast / Lighter */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundColor: '#0f172a', // Slate 900 base
                    backgroundImage: `
                              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)
                            `,
                    backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
                  }}
                ></div>

                {/* 1.5 Cuiabá River Simulation (Abstract Curve) */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,40 Q30,45 40,50 T60,60 T100,70" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="5,5" />
                  <text x="5" y="38" className="text-[4px] fill-blue-400 font-bold font-mono uppercase tracking-widest">Rio Cuiabá</text>
                </svg>

                {/* 2. Technical Overlay (Vignette) - lighter to allow more visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 opacity-40"></div>

                {/* Map Labels (Cardinal Points) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-slate-500 text-xs font-mono border border-slate-700 px-2 py-1 rounded bg-slate-900/50 scale-[0.5] origin-top md:scale-100">N (Chapada dos Guimarães)</div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 text-xs font-mono border border-slate-700 px-2 py-1 rounded bg-slate-900/50 scale-[0.5] origin-bottom md:scale-100">S (Santo Antônio)</div>

                {/* Dynamic Heat Zones */}
                {riskRegions.map((region) => {
                  const regionColor = getRiskColorHex(region.riskLevel);
                  const isHighRisk = ['Crítico', 'Alto'].includes(region.riskLevel);

                  return (
                    <div
                      key={region.id}
                      className="absolute transition-all duration-500 ease-out cursor-pointer flex items-center justify-center"
                      style={{
                        top: region.y,
                        left: region.x,
                        width: '0', // Position wrapper
                        height: '0',
                        ...getRegionStyle(region)
                      }}
                      onClick={(e) => handleRegionClick(region, e)}
                      onMouseEnter={() => !selectedRegion && setHoveredRegion(region.id)}
                      onMouseLeave={() => !selectedRegion && setHoveredRegion(null)}
                    >
                      {/* 3. The Heat Blob */}
                      <div
                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full mix-blend-screen transition-all duration-700 ${isHighRisk ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''}`}
                        style={{
                          background: `radial-gradient(circle at center, ${regionColor} 20%, ${regionColor}88 50%, transparent 70%)`,
                          filter: 'blur(20px)',
                          opacity: hoveredRegion === region.id || selectedRegion?.id === region.id ? 0.9 : 0.6
                        }}
                      ></div>

                      {/* 5. Region Marker Icon (PIN) */}
                      <div className="relative z-20 flex flex-col items-center gap-1 group">
                        {/* Text Label */}
                        <div className={`text-[10px] font-bold text-white whitespace-nowrap bg-slate-900/60 backdrop-blur px-2 py-0.5 rounded border border-slate-700/50 shadow-sm mb-1 transition-all duration-300 ${hoveredRegion === region.id || selectedRegion?.id === region.id ? '-translate-y-2 text-orange-300 border-orange-500/50' : ''
                          }`}>
                          {region.name}
                        </div>

                        <div className={`transition-all duration-300 ${hoveredRegion === region.id || selectedRegion?.id === region.id ? 'scale-125 text-white' : 'scale-100 text-slate-200'} drop-shadow-md`}>
                          <MapPin
                            size={24}
                            fill={regionColor}
                            className="stroke-slate-900 stroke-[1.5px]"
                          />
                        </div>
                      </div>

                      {/* 6. Hover Target Ring */}
                      {(hoveredRegion === region.id || selectedRegion?.id === region.id) && (
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/40 rounded-full animate-[spin_4s_linear_infinite] pointer-events-none border-dashed"></div>
                      )}

                      {/* 7. Dynamic Tooltip - Only show on hover IF no region is selected */}
                      {hoveredRegion === region.id && !selectedRegion && (
                        <div
                          className={`absolute z-50 pointer-events-none w-72 ${getTooltipPositionClasses(region.x, region.y)}`}
                        >
                          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-600/50 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10 text-left relative">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-500/50 animate-[scan_2s_linear_infinite]"></div>
                            <div className="bg-slate-800/80 p-3 border-b border-slate-700 flex justify-between items-center">
                              <span className="text-xs font-mono text-slate-300 font-bold flex items-center gap-2">
                                <Navigation size={12} className="text-orange-500" />
                                {region.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono italic">
                                Clique para detalhes
                              </span>
                            </div>
                            <div className="p-4 flex items-end justify-between">
                              <div className="text-3xl font-bold text-white leading-none">{region.temperature}<span className="text-lg text-slate-500">°C</span></div>
                              <ZoomIn size={16} className="text-slate-500 mb-1" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map UI Overlay (Static elements not affected by zoom) */}
            {!isLoading && (
              <>
                {/* Selected Region Detail Panel (Side Panel) */}
                {selectedRegion && (
                  <div className="absolute top-4 left-4 bottom-4 w-80 z-40 animate-in slide-in-from-left-4 duration-500">
                    <div className="h-full bg-slate-900/95 backdrop-blur-xl border border-slate-600/50 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden">

                      {/* Panel Header */}
                      <div className="p-6 border-b border-slate-700 bg-slate-800/30">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider border px-2 py-0.5 rounded-full ${isNasaData ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' : 'text-orange-500 border-orange-500/20 bg-orange-500/10'}`}>
                            {isNasaData ? <Globe size={12} /> : <Signal size={12} className="animate-pulse" />}
                            {isNasaData ? 'API NASA (ArcGIS)' : 'Local Data'}
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedRegion(null); }}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{selectedRegion.name}</h3>
                        <p className="text-slate-400 text-sm">
                          {isNasaData ? 'Ponto de coleta citizen science.' : 'Coordenadas da zona de análise Landsat.'}
                        </p>
                      </div>

                      {/* Panel Content */}
                      <div className="flex-1 p-6 space-y-6 overflow-y-auto">

                        {/* Temperature Block */}
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between">
                          <div>
                            <p className="text-slate-400 text-xs uppercase mb-1">Temperatura (LST)</p>
                            <div className="text-4xl font-bold text-white">{selectedRegion.temperature}°C</div>
                          </div>
                          <div className="h-10 w-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                            <Thermometer size={20} />
                          </div>
                        </div>

                        {/* Risk Level Block */}
                        <div className="space-y-2">
                          <p className="text-slate-400 text-xs uppercase">Classificação de Risco</p>
                          <div className={`p-4 rounded-xl border flex items-center gap-3 ${selectedRegion.riskLevel === 'Crítico' ? 'bg-red-500/10 border-red-500/30 text-red-200' :
                            selectedRegion.riskLevel === 'Alto' ? 'bg-orange-500/10 border-orange-500/30 text-orange-200' :
                              selectedRegion.riskLevel === 'Baixo' ? 'bg-green-500/10 border-green-500/30 text-green-200' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200'
                            }`}>
                            <AlertCircle size={24} />
                            <div>
                              <div className="font-bold text-lg">{selectedRegion.riskLevel}</div>
                            </div>
                          </div>
                        </div>

                        {/* NDVI Block - Conditional Render for NASA data since it might not have NDVI */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Índice Vegetativo (NDVI)</span>
                            <span className={selectedRegion.vegetationCoverage < 30 ? "text-red-400 font-bold" : "text-green-400 font-bold"}>
                              {selectedRegion.vegetationCoverage}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${selectedRegion.vegetationCoverage < 30 ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{ width: `${selectedRegion.vegetationCoverage}%` }}
                            ></div>
                          </div>
                          {isNasaData && <p className="text-[10px] text-slate-500 mt-1 italic">* NDVI estimado para dataset global.</p>}
                        </div>

                        {/* Action Plan */}
                        <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-orange-500">
                          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Leaf size={16} className="text-orange-500" />
                            Ação Recomendada
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {selectedRegion.recommendation}. Prioridade baseada no gradiente térmico da região e densidade populacional.
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-4 border-t border-slate-700 bg-slate-800/30">
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveTab('analytics'); }}
                          className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                        >
                          Ver Gráficos Detalhados
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Detailed Risk Guide Panel (Floating) */}
                {showRiskGuide && !selectedRegion && (
                  <div className="absolute top-4 right-64 w-80 bg-slate-900/95 backdrop-blur-xl p-4 rounded-lg border border-slate-600 shadow-2xl z-30 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <AlertCircle size={14} className="text-orange-500" />
                        Guia de Classificação Térmica
                      </h4>
                      <button onClick={() => setShowRiskGuide(false)} className="text-slate-500 hover:text-white">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {riskGuideDetails.map((detail, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: detail.color }}></div>
                          <div>
                            <div className="flex justify-between items-center mb-0.5">
                              <span className="text-sm font-bold text-white" style={{ color: detail.color }}>{detail.level}</span>
                              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">{detail.temp}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-tight mb-1">{detail.desc}</p>
                            <p className="text-[10px] text-slate-300 italic">Rec: {detail.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Standard Controls (hidden when selectedRegion is active to reduce clutter) */}
                <div className={`absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-lg border border-slate-700 w-56 shadow-2xl z-20 transition-all duration-500 ${selectedRegion ? 'opacity-0 pointer-events-none translate-x-10' : 'opacity-100'}`}>
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-700">
                    <h4 className="font-semibold flex items-center gap-2 text-xs text-white uppercase tracking-wider">
                      <Filter size={14} className="text-orange-500" /> Camadas de Risco
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowRiskGuide(!showRiskGuide)}
                        className={`p-1 rounded hover:bg-slate-700 transition-colors ${showRiskGuide ? 'text-white bg-slate-700' : 'text-slate-500'}`}
                        title="Guia de Legendas"
                      >
                        <Info size={14} />
                      </button>
                      {selectedRiskFilter && (
                        <button
                          onClick={() => setSelectedRiskFilter(null)}
                          className="text-[10px] text-slate-400 hover:text-white underline"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    {[
                      { label: 'Crítico', color: '#ef4444', count: 4 },
                      { label: 'Alto', color: '#f97316', count: 3 },
                      { label: 'Médio', color: '#eab308', count: 2 },
                      { label: 'Baixo', color: '#22c55e', count: 3 },
                    ].map((risk) => (
                      <button
                        key={risk.label}
                        onClick={() => setSelectedRiskFilter(selectedRiskFilter === risk.label ? null : risk.label)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded transition-all text-sm border border-transparent group ${selectedRiskFilter === risk.label
                          ? 'bg-slate-800 border-slate-500 ring-1 ring-slate-500'
                          : 'hover:bg-slate-800/50'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: risk.color }}></span>
                          <span className={selectedRiskFilter === risk.label ? 'text-white font-medium' : 'text-slate-300 group-hover:text-white'}>
                            {risk.label}
                          </span>
                        </div>
                        <span className="text-xs text-slate-600 font-mono group-hover:text-slate-400">{risk.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compass / Scale Indicator */}
                <div className="absolute bottom-16 right-4 flex flex-col items-center gap-1 z-10 opacity-60 pointer-events-none">
                  <Compass size={32} className="text-slate-500" />
                  <span className="text-[10px] text-slate-500 font-mono">1:50.000</span>
                </div>
              </>
            )}

            {/* Data Source Badge */}
            <div className={`absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur px-3 py-2 rounded border border-slate-700 text-[10px] text-slate-400 flex items-center gap-3 z-10 transition-opacity duration-700 ${isLoading || selectedRegion ? 'opacity-0' : 'opacity-100'}`}>
              <div className={`flex items-center gap-1.5 font-bold ${isNasaData ? 'text-blue-400' : 'text-green-400'}`}>
                <Leaf size={12} />
                <span>{isNasaData ? 'API LIVE' : 'LST/NDVI'}</span>
              </div>
              <div className="h-3 w-px bg-slate-700"></div>
              <span>Dados: {isNasaData ? 'ArcGIS/NASA' : 'Landsat 8/9 (USGS)'}</span>
              <div className="h-3 w-px bg-slate-700"></div>
              <span>{isNasaData ? 'Global' : 'NASA POWER'}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              // Skeleton Loaders for Stats
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                <div className="glass-card p-6 rounded-2xl hover:bg-slate-800/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-forwards group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Temp. Máxima</p>
                      <h3 className="text-4xl font-display font-bold text-white group-hover:text-glow transition-all">
                        {isNasaData ? `${Math.max(...riskRegions.map(r => r.temperature))}°C` : '44.1°C'}
                      </h3>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-xl text-orange-500 group-hover:scale-110 transition-transform">
                      <Thermometer size={24} />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-slate-500 font-mono">
                    {isNasaData ? 'Pico registrado na amostra' : 'Pico no Distrito Industrial'}
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl hover:bg-slate-800/50 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-forwards group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Áreas Críticas</p>
                      <h3 className="text-4xl font-display font-bold text-white">
                        {riskRegions.filter(r => r.riskLevel === 'Crítico').length}
                      </h3>
                    </div>
                    <div className="bg-red-500/10 p-3 rounded-xl text-red-500 group-hover:scale-110 transition-transform">
                      <AlertCircle size={24} />
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500 font-mono">Zona Vermelha</p>
                </div>

                <div className="glass-card p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Correlação NDVI</p>
                      <h3 className="text-4xl font-display font-bold text-white">-0.85</h3>
                    </div>
                    <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500 group-hover:scale-110 transition-transform">
                      <BarChart3 size={24} />
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500 font-mono">Forte inverção térmica</p>
                </div>

                <div className="glass-card p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-forwards group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Fonte de Dados</p>
                      <h3 className="text-xl font-display font-bold text-indigo-400 truncate mt-1">
                        {isNasaData ? 'ArcGIS Feature' : 'TIRS 10/11'}
                      </h3>
                    </div>
                    <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                      <Layers size={24} />
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500 font-mono">
                    {isNasaData ? 'API Externa Conectada' : 'Sensor Landsat Ativo'}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-80 w-full">
              {isLoading ? (
                <SkeletonChart />
              ) : (
                <div className="glass-card p-8 rounded-2xl h-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-forwards">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Ciclo Térmico Anual</h3>
                      <p className="text-xs text-slate-500 mt-1 font-mono">Dados: NASA POWER + Landsat (Projeto Integrador VI)</p>
                    </div>
                    <button
                      onClick={handleDownloadCSV}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md text-xs transition-all border border-slate-600 hover:border-slate-500"
                      title="Baixar CSV para análise"
                    >
                      <Download size={14} />
                      <span className="hidden sm:inline">Exportar CSV</span>
                    </button>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockHistoricalData}>
                        <defs>
                          <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}°C`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                          itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Area type="monotone" dataKey="maxTemp" stroke="#ef4444" fillOpacity={1} fill="url(#colorMax)" name="Máxima" />
                        <Area type="monotone" dataKey="avgTemp" stroke="#f97316" fillOpacity={1} fill="url(#colorAvg)" name="Média" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            <div className="h-80 w-full">
              {isLoading ? (
                <SkeletonChart />
              ) : (
                <div className="glass-card p-8 rounded-2xl h-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards">
                  <h3 className="text-xl font-semibold mb-6 text-white">Top 5 Regiões Críticas</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[...riskRegions].sort((a, b) => b.temperature - a.temperature).slice(0, 5)} layout="vertical" margin={{ left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} vertical={true} />
                        <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} hide />
                        <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={100} tickLine={false} axisLine={false} />
                        <Tooltip
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                        />
                        <Bar dataKey="temperature" name="Temp. Superfície" radius={[0, 4, 4, 0]} barSize={20}>
                          {riskRegions.slice(0, 5).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getRiskColorHex(entry.riskLevel)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;