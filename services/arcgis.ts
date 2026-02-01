import { RegionRisk } from '../types';

// URL do FeatureServer baseado no ID do item fornecido (Urban Heat Island Mapping Campaign)
// Normalmente hospedado em services1.arcgis.com para campanhas de ciência cidadã
const ARCGIS_FEATURE_SERVICE = "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Urban_Heat_Island_Mapping_Campaign_Points/FeatureServer/0/query";

export const fetchNasaHeatData = async (): Promise<RegionRisk[]> => {
  try {
    // Parâmetros da query para API REST do ArcGIS
    const params = new URLSearchParams({
      where: "1=1", // Pega tudo (em produção, filtraríamos por lat/long de Cuiabá)
      outFields: "*", // Trazer todos os campos (Temp_F, Time, etc)
      resultRecordCount: "10", // Limite para o MVP não ficar pesado
      orderByFields: "ObjectId DESC", // Pegar os mais recentes
      f: "json" // Formato de resposta
    });

    const response = await fetch(`${ARCGIS_FEATURE_SERVICE}?${params.toString()}`);

    if (!response.ok) {
      console.error(`ArcGIS API Error: ${response.status} ${response.statusText}`);
      throw new Error(`Serviço NOAA/NASA indisponível (Status: ${response.status})`);
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      console.warn("Nenhum dado encontrado na API da NASA para a query atual.");
      return [];
    }

    // Mapear os dados brutos do ArcGIS para o formato da nossa aplicação
    return data.features.map((feature: any, index: number) => {
      const attr = feature.attributes;

      // Tentar encontrar campos comuns de temperatura nessas camadas
      // As campanhas variam, mas geralmente usam 'temp_f', 'temperature', 'heat_index'
      const tempF = attr.Temp_F || attr.Temperature || attr.Heat_Index || 95; // 95F fallback
      const tempC = Math.round((tempF - 32) * 5 / 9); // Conversão para Celsius

      // Determinar risco baseado na temperatura convertida
      let risk: 'Baixo' | 'Médio' | 'Alto' | 'Crítico' = 'Baixo';
      if (tempC > 40) risk = 'Crítico';
      else if (tempC > 35) risk = 'Alto';
      else if (tempC > 30) risk = 'Médio';

      // Simular coordenadas X/Y para o mapa estático já que não temos um mapa base georreferenciado real (Leaflet/Mapbox)
      // Distribui os pontos aleatoriamente em áreas "urbanas" do SVG
      const randomX = Math.floor(Math.random() * 60 + 20); // 20-80%
      const randomY = Math.floor(Math.random() * 60 + 20); // 20-80%

      return {
        id: `nasa-${attr.OBJECTID || index}`,
        name: attr.Location_Name || `Ponto Coleta #${attr.OBJECTID}`,
        riskLevel: risk,
        temperature: tempC,
        vegetationCoverage: Math.floor(Math.random() * 40) + 10, // Simulado, pois essa layer foca em Temp
        recommendation: "Dados importados da NASA. Validar in-situ.",
        // Propriedades extras para o mapa visual
        x: `${randomX}%`,
        y: `${randomY}%`,
        lat: feature.geometry?.y || (-15.6 + (Math.random() * 0.1 - 0.05)),
        lng: feature.geometry?.x || (-56.1 + (Math.random() * 0.1 - 0.05)),
        isExternal: true // Flag para identificar origem
      };
    });

  } catch (error) {
    console.error("Falha ao buscar dados do ArcGIS:", error);
    throw error;
  }
};