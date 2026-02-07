import React from 'react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '10+',
      label: 'Anos de Dados',
      description: 'Histórico completo de observações de satélite validadas'
    },
    {
      value: '2000+',
      label: 'Pontos de Dados',
      description: 'Cobertura geoespacial com resolução de 100 metros'
    },
    {
      value: '<2s',
      label: 'Latência',
      description: 'Processamento em tempo real de análises geoespaciais'
    },
    {
      value: '99.9%',
      label: 'Disponibilidade',
      description: 'Infraestrutura em nuvem escalável e confiável'
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Números que Falam por Si
          </h2>
          <p className="text-xl text-gray-600">
            Infraestrutura de dados robusta e confiável para análises críticas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                {stat.value}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-600 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
