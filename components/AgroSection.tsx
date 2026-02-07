import React from 'react';
import { Sprout, TrendingUp, Droplet, AlertTriangle, BookOpen, Users, Award } from 'lucide-react';

const AgroSection: React.FC = () => {
  const useCases = [
    {
      title: 'Otimização de Plantios',
      description: 'Identifique zonas microclimáticas ideais para diferentes culturas e maximize produtividade',
      icon: Sprout,
      benefits: ['Rendimento +15%', 'Redução de custos', 'Sustentabilidade']
    },
    {
      title: 'Gestão Hídrica',
      description: 'Planeje irrigação eficiente baseado em dados de evapotranspiração em tempo real',
      icon: Droplet,
      benefits: ['Economia de água', 'Eficiência energética', 'Qualidade do solo']
    },
    {
      title: 'Prevenção de Secas e Pragas',
      description: 'Antecipe condições climáticas adversas com alertas automáticos e recomendações',
      icon: AlertTriangle,
      benefits: ['Reduz perdas', 'Planejamento proativo', 'Rentabilidade']
    },
    {
      title: 'Certificação Ambiental',
      description: 'Comprove práticas agrícolas sustentáveis com dados geoespaciais validados',
      icon: Award,
      benefits: ['Prêmio verde', 'Acesso premium', 'Diferencial mercado']
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transformar o Agronegócio com Dados
          </h2>
          <p className="text-xl text-gray-600">
            Decisões agrícolas baseadas em ciência dos satélites NASA e análise geoespacial avançada
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {useCases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-xl border border-green-200">
                    <Icon size={32} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {useCase.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="inline-block px-3 py-1 bg-white border border-green-200 rounded-full text-sm font-semibold text-green-600"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Business Benefits */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">ROI Comprovado</h3>
              <p className="text-green-100">
                Retorno sobre investimento em 6-12 meses com otimização de recursos
              </p>
            </div>
            <div className="text-center">
              <Users size={48} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Suporte Especializado</h3>
              <p className="text-green-100">
                Time de agrônomos e geógrafos disponível para consultoria técnica
              </p>
            </div>
            <div className="text-center">
              <BookOpen size={48} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Dados Contínuos</h3>
              <p className="text-green-100">
                Acesso histórico a 10+ anos de dados de satélite processados
              </p>
            </div>
          </div>
        </div>

        {/* Industries */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">
            Segmentos que Usam AlbedoMaps
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {['Agricultura', 'Pecuária', 'Silvicultura', 'Horticultura'].map((industry, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all"
              >
                <p className="text-lg font-semibold text-gray-900">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgroSection;
