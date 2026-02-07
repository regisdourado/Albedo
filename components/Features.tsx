import React from 'react';
import { TrendingUp, Globe, Leaf, AlertCircle, Cloud, Database, Zap, Shield } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Globe,
      title: 'Cobertura Geoespacial',
      description: 'Monitoramento abrangente de toda a região da Baixada Cuiabana com resolução de 100m',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Análise Tendencial',
      description: 'Visualize trends de temperatura e vegetação ao longo do tempo com dados históricos',
      color: 'orange'
    },
    {
      icon: Leaf,
      title: 'Índice de Vegetação',
      description: 'NDVI em tempo real para avaliação de impacto da cobertura vegetal urbana',
      color: 'green'
    },
    {
      icon: AlertCircle,
      title: 'Alertas Automáticos',
      description: 'Receba notificações quando anomalias térmicas forem detectadas em sua área',
      color: 'red'
    },
    {
      icon: Cloud,
      title: 'Dados em Nuvem',
      description: 'Acesso aos dados via API RESTful integrada com infraestrutura de nuvem escalável',
      color: 'cyan'
    },
    {
      icon: Database,
      title: 'Histórico Completo',
      description: 'Base de dados com 10+ anos de observações de satélite processadas e validadas',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'Performance Otimizada',
      description: 'Processamento em tempo real com latência <2s para análises geoespaciais',
      color: 'yellow'
    },
    {
      icon: Shield,
      title: 'Segurança Certificada',
      description: 'Conformidade com LGPD e padrões internacionais de proteção de dados',
      color: 'indigo'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { icon: string; bg: string; border: string }> = {
      blue: { icon: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
      orange: { icon: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
      green: { icon: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
      red: { icon: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
      cyan: { icon: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
      purple: { icon: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
      yellow: { icon: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
      indigo: { icon: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recursos Avançados de Monitoramento
          </h2>
          <p className="text-xl text-gray-600">
            Tecnologia geoespacial de ponta para transformar dados climáticos em decisões estratégicas
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const colors = getColorClasses(feature.color);
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`${colors.bg} border ${colors.border} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
              >
                <div className={`${colors.icon} mb-4`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
