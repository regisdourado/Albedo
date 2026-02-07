
import { RegionRisk } from '../types';
import { calculateRiskLevel, getRiskRecommendation } from '../utils/riskUtils';

/**
 * CONFIGURAÇÕES DE VALIDAÇÃO TÉCNICA
 * Calibradas para o clima tropical continental da Baixada Cuiabana.
 */
const VALIDATION_RULES = {
  TEMP_MIN: 15,       // Mínima para solo exposto em Cuiabá
  TEMP_MAX: 68,       // Máxima para asfalto/telha em Cuiabá (LST)
  NDVI_MIN: 0,        
  NDVI_MAX: 100,      
  FALLBACK_TEMP: 39.2 // Média térmica de "Hot Day" em Cuiabá
};

/**
 * NASA POWER API - Bounding Box Baixada Cuiabana
 */
const NASA_POWER_BASE_URL = "https://power.larc.nasa.gov/api/temporal/daily/point";

const isValidThermalData = (temp: number): boolean => {
  return !isNaN(temp) && temp >= VALIDATION_RULES.TEMP_MIN && temp <= VALIDATION_RULES.TEMP_MAX;
};

export const fetchNasaPowerSurfaceTemp = async (): Promise<number> => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 4);
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
    if (!response.ok) throw new Error("API Offline");
    
    const data = await response.json();
    const tempValue = data?.properties?.parameter?.TS?.[dateStr];
    
    if (tempValue === undefined || tempValue === -999 || !isValidThermalData(tempValue)) {
      return VALIDATION_RULES.FALLBACK_TEMP;
    }
    
    return Math.round(tempValue * 10) / 10;
  } catch (error) {
    return VALIDATION_RULES.FALLBACK_TEMP;
  }
};

/**
 * REGIONS_METADATA - Posicionamento Cartográfico Relativo (Cuiabá/VG)
 * O layout assume o Centro de Cuiabá em 50,50.
 * Várzea Grande fica à esquerda (Oeste) do Rio Cuiabá.
 */
const REGIONS_METADATA = [
  // CUIABÁ - Malha Urbana
  { id: 'centro', name: 'Centro Norte', x: '50%', y: '48%', density: 8500, pop: 12000, baseOffset: 5.2, ndviBase: 0.04, type: 'local' },
  { id: 'cpa', name: 'Grande CPA (I a IV)', x: '72%', y: '32%', density: 5200, pop: 110000, baseOffset: 3.1, ndviBase: 0.14, type: 'local' },
  { id: 'porto', name: 'Porto / Orla', x: '42%', y: '52%', density: 2800, pop: 15000, baseOffset: 4.8, ndviBase: 0.08, type: 'local' },
  { id: 'coxipo', name: 'Coxipó / Fernando Corrêa', x: '58%', y: '75%', density: 4100, pop: 98000, baseOffset: 2.4, ndviBase: 0.20, type: 'local' },
  { id: 'ufmt', name: 'Campus UFMT', x: '58%', y: '65%', density: 800, pop: 30000, baseOffset: -4.2, ndviBase: 0.78, type: 'local' },
  { id: 'bosque', name: 'Bosque da Saúde', x: '56%', y: '42%', density: 3200, pop: 14000, baseOffset: 3.8, ndviBase: 0.22, type: 'local' },
  { id: 'tijucal', name: 'Tijucal / Osmar Cabral', x: '70%', y: '85%', density: 4500, pop: 45000, baseOffset: 2.1, ndviBase: 0.16, type: 'local' },
  { id: 'parquecuiaba', name: 'Parque Cuiabá', x: '45%', y: '90%', density: 3800, pop: 22000, baseOffset: 1.5, ndviBase: 0.28, type: 'local' },
  
  // VÁRZEA GRANDE (Oeste do Rio)
  { id: 'vg_centro', name: 'VG Centro', x: '25%', y: '55%', density: 2100, pop: 85000, baseOffset: 3.2, ndviBase: 0.09, type: 'local' },
  { id: 'vg_cristorei', name: 'Cristo Rei (VG)', x: '35%', y: '68%', density: 1800, pop: 60000, baseOffset: 2.8, ndviBase: 0.12, type: 'local' },
  
  // BAIXADA CUIABANA - Regional
  { id: 'chapada', name: 'Chapada dos Guimarães', x: '92%', y: '12%', density: 12, pop: 22000, baseOffset: -7.5, ndviBase: 0.92, type: 'regional' },
  { id: 'leverger', name: 'Santo Antônio do Leverger', x: '55%', y: '96%', density: 10, pop: 19000, baseOffset: -1.2, ndviBase: 0.65, type: 'regional' }
];

export const fetchNasaHeatData = async (): Promise<RegionRisk[]> => {
  const referenceTemp = await fetchNasaPowerSurfaceTemp();
  
  return REGIONS_METADATA.map(region => {
    let localTemp = Math.round((referenceTemp + region.baseOffset) * 10) / 10;
    if (!isValidThermalData(localTemp)) localTemp = VALIDATION_RULES.FALLBACK_TEMP;

    let vegetationCoverage = Math.round(region.ndviBase * 100);
    vegetationCoverage = Math.max(VALIDATION_RULES.NDVI_MIN, Math.min(VALIDATION_RULES.NDVI_MAX, vegetationCoverage));

    const risk = calculateRiskLevel(localTemp);
    const recommendation = getRiskRecommendation(risk);

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
    };
  });
};
