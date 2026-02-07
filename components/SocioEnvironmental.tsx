import React from 'react';
import { HeartPulse, Sprout, ShieldAlert, Users2, CloudRain, Sun, Info } from 'lucide-react';
import Badge from './common/Badge';
import InfoCard from './common/InfoCard';
import PrimaryButton from './common/PrimaryButton';
import StatBox from './common/StatBox';

const SocioEnvironmental: React.FC = () => {
  const themes = [
    {
      icon: <HeartPulse className="text-rose-400" size={32} />,
      title: "Saúde e Bem-estar",
      description: "Temperaturas acima de 40°C aumentam em 20% os riscos de doenças cardiorrespiratórias e exaustão térmica em idosos e trabalhadores ao ar livre em Cuiabá.",
      impact: "Alta Vulnerabilidade",
      color: "from-rose-500/20 to-transparent"
    },
    {
      icon: <Users2 className="text-blue-400" size={32} />,
      title: "Justiça Climática",
      description: "Bairros periféricos possuem, em média, 60% menos cobertura arbórea que áreas centrais, expondo populações carentes a ilhas de calor severas.",
      impact: "Desigualdade Espacial",
      color: "from-blue-500/20 to-transparent"
    },
    {
      icon: <Sprout className="text-emerald-400" size={32} />,
      title: "Ecossistema Urbano",
      description: "A falta de albedo favorável e o excesso de asfalto impermeável dificultam o ciclo natural de resfriamento noturno na Baixada Cuiabana.",
      impact: "Degradação Térmica",
      color: "from-emerald-500/20 to-transparent"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24 space-y-16 max-w-6xl">
      {/* Header Section */}
      <div className="text-center space-y-4 animate-in fade-in duration-700">
        <Badge variant="orange">
           Contexto Socioambiental
        </Badge>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          O Calor que <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">não é Igual</span> para Todos
        </h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Mais do que números em um gráfico, a temperatura em Cuiabá é um fator de segregação e risco social. O AlbedoMaps busca dar visibilidade a essa "cegueira térmica".
        </p>
      </div>

      {/* Main Impact Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {themes.map((theme, index) => (
          <div 
            key={index} 
            className={`relative p-8 rounded-3xl border border-slate-700 bg-slate-800/30 backdrop-blur-sm overflow-hidden group hover:border-slate-500 transition-all duration-500 hover:-translate-y-2 shadow-2xl`}
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${theme.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="relative z-10 space-y-6">
              <div className="p-3 bg-slate-900 w-fit rounded-2xl shadow-inner">{theme.icon}</div>
              <h3 className="text-2xl font-bold text-white">{theme.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{theme.description}</p>
              <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                 <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter">Indicador Crítico</span>
                 <span className="text-xs font-bold text-slate-200">{theme.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Narrative Section - Engaging Storytelling */}
      <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              A urgência de uma Cuiabá <br/>
              <span className="text-green-400 underline decoration-green-500/30">mais resiliente e humana.</span>
            </h3>
            
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p>
                Cuiabá enfrenta um desafio único: o clima semiárido tropical, somado ao crescimento urbano desordenado, criou um cenário onde o asfalto atinge temperaturas de até <strong>60°C</strong> ao meio-dia.
              </p>
              <p>
                O AlbedoMaps não é apenas um projeto técnico; é uma ferramenta de <strong>advocacy</strong>. Queremos que cada cidadão e gestor entenda que a árvore plantada na porta de casa não é apenas estética, é um equipamento de saúde pública e segurança climática.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <StatBox
                 icon={<Sun size={18} />}
                 label="Meta 2030"
                 value="-3°C"
                 description="Redução almejada em ilhas de calor"
                 iconColor="text-orange-400"
               />
               <StatBox
                 icon={<CloudRain size={18} />}
                 label="Retenção"
                 value="+40%"
                 description="Aumento da umidade relativa local"
                 iconColor="text-blue-400"
               />
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-[30px] border border-slate-700 shadow-3xl">
             <div className="flex items-start gap-4 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Info size={24} /></div>
                <div>
                   <h4 className="text-white font-bold">Por que Socioambiental?</h4>
                   <p className="text-xs text-slate-500">O conceito de Albedo e Equidade</p>
                </div>
             </div>
             
             <div className="space-y-4">
                <InfoCard
                  icon={null}
                  title="Cegueira Térmica"
                  iconColor=""
                  content="Ignorar as diferenças de temperatura entre bairros é ignorar a qualidade de vida do trabalhador."
                  className="bg-slate-900 p-4 rounded-2xl border border-slate-700 hover:border-orange-500/50 transition-colors"
                />
                <InfoCard
                  icon={null}
                  title="Efeito Albedo"
                  iconColor=""
                  content="Superfícies claras refletem calor. Em Cuiabá, precisamos repensar as cores de nossa infraestrutura urbana."
                  className="bg-slate-900 p-4 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-colors"
                />
                <InfoCard
                  icon={null}
                  title="Patrimônio Biocultural"
                  iconColor=""
                  content="A arborização com espécies nativas (Cerrado/Pantanal) reconecta a cidade à sua identidade ecológica."
                  className="bg-slate-900 p-4 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-colors"
                />
             </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action Footer */}
      <div className="text-center pb-12">
         <div className="flex flex-col items-center gap-6">
            <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-slate-400">
                    <Users2 size={16} />
                 </div>
               ))}
               <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
                 +10
               </div>
            </div>
            <p className="text-slate-400 font-medium">Junte-se à nossa rede de monitoramento e defesa térmica de Cuiabá.</p>
            <PrimaryButton variant="solid">
               Baixar Relatório Completo
            </PrimaryButton>
         </div>
      </div>
    </div>
  );
};

export default SocioEnvironmental;