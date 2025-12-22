import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';
import { ThermalDataPoint, RegionRisk } from '../types';
import { fetchNasaHeatData } from '../services/arcgis';
import { AlertCircle, Thermometer, Map as MapIcon, BarChart3, Layers, Filter, Leaf, Signal, Loader2, Navigation, Compass, MapPin, Info, X, Download, ZoomIn, ArrowRight, Globe, Share2, Check, Users, Activity, ChevronDown } from 'lucide-react';

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
  isExternal?: boolean;
}

const initialMockRiskRegions: VisualRegionRisk[] = [
  { id: '3', name: 'Grande CPA', riskLevel: 'Alto', temperature: 39.5, vegetationCoverage: 15, recommendation: 'Reforço Verde em Vias', x: '75%', y: '15%', populationDensity: 5200, totalPopulation: 120000 },
  { id: '6', name: 'Morada da Serra', riskLevel: 'Alto', temperature: 38.8, vegetationCoverage: 18, recommendation: 'Arborização de Praças', x: '60%', y: '20%', populationDensity: 4800, totalPopulation: 85000 },
  { id: '11', name: 'Santa Rosa', riskLevel: 'Médio', temperature: 34.2, vegetationCoverage: 40, recommendation: 'Manutenção', x: '35%', y: '25%', populationDensity: 3100, totalPopulation: 42000 },
  { id: '5', name: 'Mãe Bonifácia', riskLevel: 'Baixo', temperature: 29.8, vegetationCoverage: 85, recommendation: 'Área de Controle (Preservação)', x: '42%', y: '35%', populationDensity: 150, totalPopulation: 1200 },
  { id: '1', name: 'Centro Histórico', riskLevel: 'Crítico', temperature: 43.2, vegetationCoverage: 5, recommendation: 'Arborização Imediata', x: '45%', y: '45%', populationDensity: 1200, totalPopulation: 5000 },
  { id: '7', name: 'Porto', riskLevel: 'Crítico', temperature: 42.5, vegetationCoverage: 8, recommendation: 'Corredores Verdes', x: '38%', y: '48%', populationDensity: 2800, totalPopulation: 18000 },
  { id: '4', name: 'Jd. Imperial', riskLevel: 'Médio', temperature: 35.0, vegetationCoverage: 30, recommendation: 'Expansão de Bosques', x: '80%', y: '50%', populationDensity: 3500, totalPopulation: 55000 },
  { id: '8', name: 'Campus UFMT', riskLevel: 'Baixo', temperature: 30.5, vegetationCoverage: 75, recommendation: 'Monitoramento', x: '60%', y: '55%', populationDensity: 800, totalPopulation: 25000 },
  { id: '10', name: 'Coxipó', riskLevel: 'Alto', temperature: 38.2, vegetationCoverage: 20, recommendation: 'Recuperação Ciliar', x: '65%', y: '70%', populationDensity: 4100, totalPopulation: 95000 },
  { id: '9', name: 'Tijucal', riskLevel: 'Crítico', temperature: 41.8, vegetationCoverage: 10, recommendation: 'Plantio Massivo', x: '75%', y: '75%', populationDensity: 4600, totalPopulation: 110000 },
  { id: '2', name: 'Dist. Industrial', riskLevel: 'Crítico', temperature: 44.1, vegetationCoverage: 2, recommendation: 'Barreiras Verdes', x: '70%', y: '85%', populationDensity: 200, totalPopulation: 1500 },
  { id: '12', name: 'Pedra 90', riskLevel: 'Crítico', temperature: 42.1, vegetationCoverage: 5, recommendation: 'Intervenção Urgente', x: '85%', y: '85%', populationDensity: 5800, totalPopulation: 135000 },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'analytics'>('map');
  const [riskRegions, setRiskRegions] = useState<VisualRegionRisk[]>(initialMockRiskRegions);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<VisualRegionRisk | null>(null);
  const [activeRiskFilters, setActiveRiskFilters] = useState<string[]>(['Baixo', 'Médio', 'Alto', 'Crítico']);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNasaData, setIsNasaData] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setIsFilterMenuOpen(false);
      }
    }

    if (isFilterMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterMenuOpen]);

  useEffect(() => {
    if (activeTab === 'analytics') {
      setIsFilterMenuOpen(false);
    }
  }, [activeTab]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const regionId = params.get('region');
      const filters = params.get('filters');

      if (filters) {
        setActiveRiskFilters(filters.split(','));
      }

      if (regionId) {
        const region = initialMockRiskRegions.find(r => r.id === regionId);
        if (region) setSelectedRegion(region);
      }

      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    if (selectedRegion) url.searchParams.set('region', selectedRegion.id);
    url.searchParams.set('filters', activeRiskFilters.join(','));
    
    navigator.clipboard.writeText(url.toString());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleRiskFilter = (level: string) => {
    setActiveRiskFilters(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };

  const toggleNasaData = async () => {
    if (isNasaData) {
      setRiskRegions(initialMockRiskRegions);
      setIsNasaData(false);
      setSelectedRegion(null);
    } else {
      setIsSyncing(true);
      try {
        const nasaData = await fetchNasaHeatData();
        if (nasaData.length > 0) {
          setRiskRegions(nasaData as VisualRegionRisk[]);
          setIsNasaData(true);
          setSelectedRegion(null);
        } else {
          alert("Nenhum dado encontrado na API da NASA.");
        }
      } catch (error) {
        console.error(error);
        alert("Não foi possível carregar dados da API da NASA.");
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleDownloadCSV = () => {
    const headers = ['Mês,Temperatura Média (°C),Temperatura Máxima (°C),NDVI'];
    const rows = mockHistoricalData.map(row => `${row.month},${row.avgTemp},${row.maxTemp},${row.ndvi}`);
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'albedomaps_dados_cuiaba.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const SkeletonCard = () => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-pulse">
      <div className="h-4 bg-slate-700 rounded w-1/2 mb-3"></div>
      <div className="h-8 bg-slate-700 rounded w-3/4"></div>
    </div>
  );

  const SkeletonChart = () => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <div className="h-6 bg-slate-700 rounded w-1/3 mb-8 animate-pulse"></div>
      <div className="flex-1 w-full bg-slate-700/10 rounded-lg flex items-end justify-between p-6 gap-3">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="bg-slate-700/30 rounded-t w-full animate-pulse" 
            style={{ height: `${20 + (i * 10)}%`, opacity: 0.5 + (i * 0.05) }}
          ></div>
        ))}
      </div>
    </div>
  );

  const visibleRegions = riskRegions.filter(region => activeRiskFilters.includes(region.riskLevel));

  return (
    <div className="container mx-auto px-4 py-24 space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-end mb-4 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Painel de Diagnóstico MVP</h2>
          <p className="text-slate-400">Visualização de Risco Térmico baseada em dados Landsat 8/9 e NASA</p>
        </div>
        
        <div className="flex flex-wrap gap-3 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
          <button
            onClick={toggleNasaData}
            disabled={isSyncing}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all border border-transparent ${
              isNasaData ? 'bg-blue-600/20 text-blue-300 border-blue-500/50' : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
             {isSyncing ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
             <span>{isNasaData ? 'Dados NASA' : 'Sincronizar NASA'}</span>
          </button>
          <div className="w-px bg-slate-700 mx-1 hidden md:block"></div>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'map' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapIcon size={16} />
            <span>Mapa de Calor</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'analytics' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 size={16} />
            <span>Dados Analíticos</span>
          </button>
        </div>
      </div>

      {activeTab === 'map' && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
           <div className="relative w-full h-[700px] bg-slate-950 rounded-xl border border-slate-700 overflow-hidden group select-none shadow-2xl" onClick={() => setSelectedRegion(null)}>
              
              {isLoading && (
                <div className="absolute inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center">
                  <Loader2 size={48} className="text-orange-500 animate-spin mb-4" />
                  <div className="text-orange-400 font-mono text-sm animate-pulse uppercase tracking-widest">Processando Camadas Geográficas...</div>
                </div>
              )}

              {!isLoading && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsFilterMenuOpen(!isFilterMenuOpen); }}
                    className={`absolute top-4 right-4 z-40 p-3 rounded-full border shadow-2xl transition-all hover:scale-110 active:scale-95 ${
                      isFilterMenuOpen 
                      ? 'bg-orange-600 border-orange-400 text-white' 
                      : 'bg-slate-900/90 border-slate-700 text-slate-400 hover:text-white backdrop-blur-md'
                    }`}
                    title="Filtros de Risco"
                  >
                    <Filter size={20} />
                  </button>

                  {isFilterMenuOpen && (
                    <div 
                      ref={filterMenuRef}
                      className="absolute top-16 right-4 bg-slate-900/95 backdrop-blur-xl p-5 rounded-xl border border-slate-700 w-64 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                        <h4 className="font-bold flex items-center gap-2 text-xs text-white uppercase tracking-widest">
                           Níveis de Risco
                        </h4>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                          {activeRiskFilters.length}/4
                        </span>
                      </div>
                      <div className="space-y-3">
                        {['Crítico', 'Alto', 'Médio', 'Baixo'].map((level) => {
                          const isActive = activeRiskFilters.includes(level);
                          const riskColor = getRiskColorHex(level);
                          
                          return (
                            <button
                              key={level}
                              onClick={() => toggleRiskFilter(level)}
                              style={{ 
                                borderColor: isActive ? riskColor : 'transparent',
                                backgroundColor: isActive ? `${riskColor}15` : 'rgba(30, 41, 59, 0.3)'
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm border-2 group ${
                                isActive 
                                  ? 'text-white font-bold shadow-inner' 
                                  : 'border-transparent text-slate-500 opacity-40 hover:opacity-100 hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span 
                                  className={`w-2 h-2 rounded-full transition-transform group-hover:scale-125 ${isActive ? 'ring-4 ring-opacity-20' : ''}`} 
                                  style={{ backgroundColor: riskColor, boxShadow: isActive ? `0 0 8px ${riskColor}` : 'none', '--tw-ring-color': riskColor } as any}
                                ></span>
                                <span>{level}</span>
                              </div>
                              <div 
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                  isActive ? 'border-transparent' : 'border-slate-700'
                                }`}
                                style={{ backgroundColor: isActive ? riskColor : 'transparent' }}
                              >
                                {isActive && <Check size={14} className="text-slate-950 stroke-[3px]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-800">
                        <button 
                          onClick={() => handleShare()}
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 text-xs font-semibold transition-all"
                        >
                          {isCopied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                          {isCopied ? 'Link Copiado!' : 'Compartilhar Mapa'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="w-full h-full relative transition-transform duration-700" style={{ transform: selectedRegion ? 'scale(1.8)' : 'scale(1)', transformOrigin: selectedRegion ? `${selectedRegion.x} ${selectedRegion.y}` : 'center center' }}>
                  <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: '#0f172a', backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    
                    {riskRegions.map((region) => {
                      const isActive = activeRiskFilters.includes(region.riskLevel);
                      const regionColor = getRiskColorHex(region.riskLevel);
                      
                      return (
                        <div 
                          key={region.id} 
                          className={`absolute transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
                          style={{ top: region.y, left: region.x, width: '0', height: '0', zIndex: hoveredRegion === region.id ? 50 : 10 }} 
                          onClick={(e) => { e.stopPropagation(); setSelectedRegion(region); }} 
                          onMouseEnter={() => !selectedRegion && setHoveredRegion(region.id)} 
                          onMouseLeave={() => setHoveredRegion(null)}
                        >
                          <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full mix-blend-screen blur-xl opacity-40 transition-all duration-500`} style={{ background: `radial-gradient(circle, ${regionColor} 0%, transparent 70%)`, transform: hoveredRegion === region.id ? 'scale(1.5)' : 'scale(1)' }}></div>
                          <div className="relative z-20 flex flex-col items-center">
                            <MapPin size={24} fill={regionColor} className="text-slate-900 stroke-[1.5px] transition-transform hover:scale-125" />
                          </div>

                          {hoveredRegion === region.id && !selectedRegion && (
                            <div className="absolute z-[100] w-64 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200 bottom-full pb-4 -translate-x-1/2">
                              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-600/50 rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10 p-4 text-left">
                                <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                                  <Navigation size={12} className="text-orange-500" />
                                  <span className="text-xs font-bold text-white font-mono uppercase truncate">{region.name}</span>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-end">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Temperatura</span>
                                    <span className="text-xl font-bold text-white leading-none">{region.temperature}°C</span>
                                  </div>
                                  <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Nível de Risco</span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border uppercase" style={{ backgroundColor: `${regionColor}20`, color: regionColor, borderColor: `${regionColor}40` }}>
                                      {region.riskLevel}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
              </div>

              {!isLoading && selectedRegion && (
                <div className="absolute top-4 left-4 bottom-4 w-80 z-40 animate-in slide-in-from-left-4 duration-500">
                  <div className="h-full bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-800">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleShare(); }}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition-colors"
                            title="Compartilhar esta região"
                          >
                            {isCopied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
                          </button>
                          <span className="text-[10px] font-mono font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded uppercase tracking-widest">Relatório Local</span>
                        </div>
                        <X size={20} className="text-slate-500 cursor-pointer hover:text-white" onClick={() => setSelectedRegion(null)} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{selectedRegion.name}</h3>
                    </div>
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Temp. Superfície</p>
                          <p className="text-4xl font-bold text-white">{selectedRegion.temperature}°C</p>
                        </div>
                        <Thermometer className="text-red-500" size={32} />
                      </div>

                      <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 space-y-4">
                         <div className="flex items-center gap-2 text-blue-400">
                            <Users size={16} />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Dados Demográficos (Est. IBGE)</span>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <p className="text-[10px] text-slate-500 font-bold mb-0.5 uppercase">População</p>
                               <p className="text-lg font-bold text-white leading-tight">{selectedRegion.totalPopulation?.toLocaleString('pt-BR')}</p>
                            </div>
                            <div>
                               <p className="text-[10px] text-slate-500 font-bold mb-0.5 uppercase">Densidade</p>
                               <p className="text-lg font-bold text-white leading-tight">{selectedRegion.populationDensity} <span className="text-[8px] text-slate-400">hab/km²</span></p>
                            </div>
                         </div>
                         <div className="pt-2 border-t border-slate-700 flex items-center gap-2">
                            <Activity size={14} className="text-orange-500" />
                            <span className="text-[10px] text-slate-400">Exposição Social: <span className="text-slate-200 font-bold">ALTA</span></span>
                         </div>
                      </div>

                      <div>
                         <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Vulnerabilidade de Risco</p>
                         <div className="p-3 rounded-lg border flex items-center gap-3" style={{ backgroundColor: `${getRiskColorHex(selectedRegion.riskLevel)}15`, borderColor: `${getRiskColorHex(selectedRegion.riskLevel)}30` }}>
                            <AlertCircle style={{ color: getRiskColorHex(selectedRegion.riskLevel) }} />
                            <span className="font-bold text-white uppercase">{selectedRegion.riskLevel}</span>
                         </div>
                      </div>

                      <div>
                         <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Priorização de Intervenção</p>
                         <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">{selectedRegion.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
           </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? <><SkeletonCard/><SkeletonCard/><SkeletonCard/><SkeletonCard/></> : (
              <>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Temp. Máxima</p>
                  <h3 className="text-3xl font-bold text-red-500">44.1°C</h3>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Hotspots Críticos</p>
                  <h3 className="text-3xl font-bold text-orange-500">{riskRegions.filter(r => r.riskLevel === 'Crítico').length}</h3>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Densidade Média</p>
                  <h3 className="text-3xl font-bold text-blue-500">3.400 <span className="text-sm font-normal text-slate-500">hab/km²</span></h3>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Sincronização</p>
                  <h3 className="text-3xl font-bold text-green-500">L8/L9 NASA</h3>
                </div>
              </>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-[450px]">
               {isLoading ? (
                  <SkeletonChart />
               ) : (
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full animate-in fade-in duration-700">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Ciclo Térmico Anual</h3>
                        <p className="text-xs text-slate-500 font-mono mt-1">Integração Landsat LST / NASA POWER</p>
                      </div>
                      <button onClick={handleDownloadCSV} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-all"><Download size={18} /></button>
                    </div>
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockHistoricalData}>
                          <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}°C`} />
                          <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                          <Area type="monotone" dataKey="maxTemp" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
               )}
            </div>

            <div className="h-[450px]">
               {isLoading ? (
                  <SkeletonChart />
               ) : (
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full animate-in fade-in duration-1000">
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white">Ranking de Hotspots</h3>
                      <p className="text-xs text-slate-500 font-mono mt-1">Áreas priorizadas para Mitigação Térmica</p>
                    </div>
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[...riskRegions].sort((a,b) => b.temperature - a.temperature).slice(0, 5)} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={100} axisLine={false} tickLine={false} />
                          <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                          <Bar dataKey="temperature" radius={[0, 4, 4, 0]} barSize={24}>
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