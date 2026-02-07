/**
 * Shared utility functions for risk level calculations and styling
 */

export type RiskLevel = 'Baixo' | 'Médio' | 'Alto' | 'Crítico';

/**
 * Get hex color for a given risk level
 */
export const getRiskColorHex = (level: RiskLevel | string): string => {
  switch (level) {
    case 'Crítico':
      return '#ef4444';
    case 'Alto':
      return '#f97316';
    case 'Médio':
      return '#eab308';
    case 'Baixo':
      return '#22c55e';
    default:
      return '#94a3b8';
  }
};

/**
 * Calculate risk level based on temperature
 */
export const calculateRiskLevel = (temperature: number): RiskLevel => {
  if (temperature >= 41) return 'Crítico';
  if (temperature >= 36) return 'Alto';
  if (temperature >= 31) return 'Médio';
  return 'Baixo';
};

/**
 * Get risk level recommendations
 */
export const getRiskRecommendation = (risk: RiskLevel): string => {
  const recommendations: Record<RiskLevel, string> = {
    'Crítico': 'Emergência Térmica: Proibição de novos desmatamentos e plantio imediato de cinturões verdes.',
    'Alto': 'Arborização Prioritária: Implementar pavimentos claros (Albedo Alto) e corredores ecológicos.',
    'Médio': 'Monitoramento: Manutenção de parques e incentivo a telhados verdes.',
    'Baixo': 'Preservação: Área de resiliência. Manter densidade de biomassa atual.'
  };
  return recommendations[risk];
};
