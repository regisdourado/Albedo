export interface ThermalDataPoint {
  month: string;
  avgTemp: number;
  maxTemp: number;
  ndvi: number; // Normalized Difference Vegetation Index (-1 to 1)
}

export interface RegionRisk {
  id: string;
  name: string;
  riskLevel: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  temperature: number;
  vegetationCoverage: number; // Percentage
  recommendation: string;
  populationDensity?: number; // hab/km²
  totalPopulation?: number; // Estimated population
  lat?: number;
  lng?: number;
}

export enum Section {
  HOME = 'home',
  DASHBOARD = 'dashboard',
  METHODOLOGY = 'methodology',
  ABOUT = 'about'
}