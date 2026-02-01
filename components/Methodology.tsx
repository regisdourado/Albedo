import React from 'react';
import { Database, Satellite, Cpu, FileCheck, ExternalLink } from 'lucide-react';

interface MethodologyProps {
  darkMode: boolean;
}

const Methodology: React.FC<MethodologyProps> = ({ darkMode }) => {
  const steps = [
    {
      icon: <Database size={32} />,
      title: "1. Coleta de Dados",
      description: "Aquisição de séries históricas de imagens dos satélites Landsat 8 e 9 (Sensor TIRS) via USGS EarthExplorer. Integração de dados meteorológicos regionais via API NASA POWER e estações do INMET para compensar a falta de sensores IoT locais.",
      color: "blue"
    },
    {
      icon: <Cpu size={32} />,
      title: "2. Processamento (Split-Window)",
      description: "Aplicação do algoritmo Split-Window para converter a radiância espectral em Temperatura de Superfície (LST). Este método é essencial para corrigir a absorção atmosférica (vapor d'água) típica do clima de Cuiabá.",
      color: "orange"
    },
    {
      icon: <Satellite size={32} />,
      title: "3. Índices de Vegetação",
      description: "Cálculo do NDVI (Normalized Difference Vegetation Index) para mapear a densidade de biomassa. Cruzamento desses dados com os mapas de calor para comprovar a correlação entre falta de árvores e picos térmicos.",
      color: "green"
    },
    {
      icon: <FileCheck size={32} />,
      title: "4. Análise & Conformidade",
      description: "Geração de relatórios técnicos que identificam 'Hotspots' prioritários para intervenção, fornecendo base técnica para estratégias de Mitigação Térmica Urbana.",
      color: "purple"
    }
  ];

  const links = [
    { title: "NASA POWER API Project", url: "https://power.larc.nasa.gov/" },
    { title: "USGS Earth Explorer", url: "https://earthexplorer.usgs.gov/" },
    { title: "NASA EarthData", url: "https://www.earthdata.nasa.gov/" },
    { title: "DataGeo - Ambiente SP", url: "https://datageo.ambiente.sp.gov.br/" },
    { title: "GeoSampa - Metadados", url: "https://metadados.geosampa.prefeitura.sp.gov.br/" }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-sm font-medium mb-4">
            Ciência de Dados Espaciais
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-500">
            Do Satélite à Política Pública
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Como o AlbedoMaps transforma imagens brutas do Landsat em inteligência territorial para combater o calor extremo.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-orange-500/30 transition-all hover:bg-slate-800">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-${step.color}-500/10 text-${step.color}-400`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-100">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Deep Dive */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Por que Landsat + Split-Window?</h3>
              <div className="space-y-4 text-slate-400">
                <p>
                  A resolução espacial de 30m do Landsat 8/9 é ideal para escalas urbanas. No entanto, sensores térmicos sofrem interferência da atmosfera.
                </p>
                <p>
                  O algoritmo <strong>Split-Window</strong> utiliza a diferença de absorção entre duas bandas térmicas adjacentes (Bandas 10 e 11) para estimar a temperatura da superfície (LST) com precisão, sem depender de medições in-situ constantes.
                </p>
                <p className="text-orange-400 font-medium pt-2">
                  Resultado: Um mapa contínuo de temperatura, impossível de obter com termômetros fixos isolados.
                </p>
              </div>
            </div>
            <div className="relative">
               <div className="aspect-square bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden relative">
                  {/* Conceptual Algorithm Viz */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="flex gap-4 justify-center text-xs font-mono text-slate-500">
                         <div className="bg-slate-900 p-2 rounded border border-slate-700">Band 10 (10.6µm)</div>
                         <div className="bg-slate-900 p-2 rounded border border-slate-700">Band 11 (12.5µm)</div>
                      </div>
                      <div className="w-0.5 h-8 bg-slate-600 mx-auto"></div>
                      <div className="bg-orange-600/20 text-orange-400 p-3 rounded-lg border border-orange-500/30 font-bold">
                        LST = T10 + c1(T10-T11) + c2
                      </div>
                      <div className="w-0.5 h-8 bg-slate-600 mx-auto"></div>
                      <div className="text-white font-bold">Mapa de Calor (LST)</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* References Section */}
        <div className="border-t border-slate-800 pt-12">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <ExternalLink size={20} className="text-orange-500"/>
            Fontes de Dados e Referências
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-orange-500 hover:text-orange-400 transition-colors group"
              >
                <span className="font-medium text-slate-300 group-hover:text-orange-400">{link.title}</span>
                <ExternalLink size={16} className="opacity-50 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;