import { RegionRisk } from '../types';

/**
 * NASA POWER API - Cuiabá Coordinates
 * Latitude: -15.5961, Longitude: -56.0967
 */
const NASA_POWER_BASE_URL = "https://power.larc.nasa.gov/api/temporal/daily/point";

export const fetchNasaPowerSurfaceTemp = async (): Promise<number> => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2);
    const dateStr = yesterday.toISOString().split('T')[0].replace(/-/g, '');

    const params = new URLSearchParams({
      parameters: "TS",
      community: "AG",
      longitude: "-56.0967",
      latitude: "-15.5961",
      format: "JSON",
      start: dateStr,
      end: dateStr
    });

    const response = await fetch(`${NASA_POWER_BASE_URL}?${params.toString()}`);
    if (!response.ok) throw new Error("NASA POWER API Offline");
    
    const data = await response.json();
    const tempValue = data.properties.parameter.TS[dateStr];
    
    return Math.round(tempValue * 10) / 10;
  } catch (error) {
    console.error("Erro ao buscar dados NASA POWER:", error);
    return 38.5;
  }
};

/**
 * Mapeamento das regiões com metadados para geolocalização visual calibrada.
 * X e Y representam a posição percentual no canvas do mapa urbano/estadual.
 */
const REGIONS_METADATA = [
  // CUIABÁ - Foco Urbano (Malha de Ruas)
  { id: 'centro', name: 'Centro Histórico (Cuiabá)', x: '50%', y: '50%', density: 1200, pop: 5000, baseOffset: 4.8, ndviBase: 0.05, type: 'local' },
  { id: 'cpa', name: 'Grande CPA (Cuiabá)', x: '68%', y: '38%', density: 5200, pop: 120000, baseOffset: 2.5, ndviBase: 0.12, type: 'local' },
  { id: 'porto', name: 'Porto (Cuiabá)', x: '45%', y: '52%', density: 2800, pop: 18000, baseOffset: 4.1, ndviBase: 0.08, type: 'local' },
  { id: 'coxipo', name: 'Coxipó (Cuiabá)', x: '55%', y: '72%', density: 4100, pop: 95000, baseOffset: 1.8, ndviBase: 0.22, type: 'local' },
  { id: 'ufmt', name: 'Campus UFMT', x: '58%', y: '62%', density: 800, pop: 25000, baseOffset: -3.5, ndviBase: 0.72, type: 'local' },
  { id: 'bosque', name: 'Bosque da Saúde', x: '55%', y: '45%', density: 3200, pop: 12000, baseOffset: 3.2, ndviBase: 0.25, type: 'local' },
  { id: 'tijucal', name: 'Tijucal', x: '65%', y: '78%', density: 4500, pop: 40000, baseOffset: 2.1, ndviBase: 0.18, type: 'local' },
  
  // BAIXADA CUIABANA - Nível Regional
  { id: 'vg', name: 'Várzea Grande (Centro)', x: '30%', y: '55%', density: 2100, pop: 290000, baseOffset: 2.8, ndviBase: 0.10, type: 'regional' },
  { id: 'chapada', name: 'Chapada dos Guimarães', x: '88%', y: '20%', density: 15, pop: 20000, baseOffset: -6.5, ndviBase: 0.90, type: 'regional' },
  { id: 'santoantonio', name: 'Santo Antônio do Leverger', x: '52%', y: '92%', density: 10, pop: 18000, baseOffset: -0.5, ndviBase: 0.60, type: 'regional' },
  
  // MATO GROSSO - Pólos de Expansão
  { id: 'sinop', name: 'Sinop (Polo Norte)', x: '45%', y: '8%', density: 150, pop: 160000, baseOffset: 1.5, ndviBase: 0.45, type: 'state' },
  { id: 'sorriso', name: 'Sorriso (Agro Capital)', x: '42%', y: '18%', density: 120, pop: 110000, baseOffset: 0.8, ndviBase: 0.38, type: 'state' },
  { id: 'rondonopolis', name: 'Rondonópolis (Sul)', x: '82%', y: '85%', density: 180, pop: 250000, baseOffset: 2.2, ndviBase: 0.32, type: 'state' }
];

export const fetchNasaHeatData = async (): Promise<RegionRisk[]> => {
  const referenceTemp = await fetchNasaPowerSurfaceTemp();
  
  return REGIONS_METADATA.map(region => {
    const localTemp = Math.round((referenceTemp + region.baseOffset) * 10) / 10;
    const vegetationCoverage = Math.round(region.ndviBase * 100);

    let risk: 'Baixo' | 'Médio' | 'Alto' | 'Crítico' = 'Baixo';
    if (localTemp >= 41) risk = 'Crítico';
    else if (localTemp >= 36) risk = 'Alto';
    else if (localTemp >= 31) risk = 'Médio';

    let recommendation = "Manutenção e monitoramento de áreas verdes.";
    if (risk === 'Crítico') recommendation = "Urgente: Implementação de corredores verdes e pavimentação permeável.";
    else if (risk === 'Alto') recommendation = "Priorizar arborização viária e proteção de nascentes urbanas.";

    return {
      id: region.id,
      name: region.name,
      riskLevel: risk,
      temperature: localTemp,
      vegetationCoverage: vegetationCoverage,
      recommendation: recommendation,
      populationDensity: region.density,
      totalPopulation: region.pop,
      x: region.x,
      y: region.y,
      type: region.type
    } as any;
  });
};