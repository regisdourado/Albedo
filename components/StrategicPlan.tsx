import React from 'react';
import { Briefcase, Zap, Building2, ShoppingBag, Target, ArrowRight, GraduationCap, CheckCircle2, TrendingUp, Presentation } from 'lucide-react';
import Badge from './common/Badge';
import PrimaryButton from './common/PrimaryButton';

const StrategicPlan: React.FC = () => {
  const sectors = [
    {
      icon: <Briefcase className="text-emerald-400" />,
      name: "Agronegócio",
      partners: "Amaggi, Scheffer, Bom Futuro",
      pain: "Provar sustentabilidade da soja regenerativa.",
      solution: "Monitoramento de albedo do solo e impacto microclimático.",
      pitch: "Dados invisíveis transformados em evidência científica de regeneração."
    },
    {
      icon: <Zap className="text-yellow-400" />,
      name: "Energia & Logística",
      partners: "Energisa, Rumo, Águas Cuiabá",
      pain: "Picos de demanda por calor e licença social para trilhos.",
      solution: "Diagnóstico Energético Territorial e Mapas de Calor Colaborativos.",
      pitch: "Otimização de rede e mitigação de estresse térmico em ativos físicos."
    },
    {
      icon: <Building2 className="text-blue-400" />,
      name: "Imobiliário",
      partners: "Plaenge, São Benedito",
      pain: "Valorização do m² e conforto térmico em cidades quentes.",
      solution: "Selo de Bairro Climaticamente Inteligente validado pela UFMT.",
      pitch: "Não plante árvores às cegas. Use inteligência para criar bairros frescos."
    },
    {
      icon: <ShoppingBag className="text-purple-400" />,
      name: "Varejo & Serviços",
      partners: "Grupo Pereira, Sicredi",
      pain: "Engajamento do consumidor e destinação de troco.",
      solution: "Marketing Solidário: Transformar o mapa na causa do mês.",
      pitch: "Mostre ao cliente exatamente como o troco dele melhorou o bairro onde ele mora."
    }
  ];

  const roadmap = [
    { phase: "01", title: "Institucionalização", desc: "Formalizar como Projeto de Extensão no BCT/UFMT para obter chancela jurídica." },
    { phase: "02", title: "Prova de Conceito", desc: "Mapeamento piloto com Teoria Verde para gerar o primeiro portfólio real." },
    { phase: "03", title: "Captação Descentralizada", desc: "Mobilizar polos do interior (Sorriso, Sinop) via Fundos Sociais Sicredi." },
    { phase: "04", title: "Abordagem Corporativa", desc: "Apresentação do modelo 'Guardião do Clima' para diretorias de ESG." }
  ];

  return (
    <div className="container mx-auto px-4 py-24 space-y-20 max-w-7xl">
      
      {/* Hero: The Vision */}
      <div className="relative bg-slate-800/50 border border-slate-700 rounded-[40px] p-8 md:p-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-600/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <Badge variant="blue">
            Visão de Mercado 2026
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Do Acadêmico ao <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Impacto Mensurável</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            O AlbedoMaps não virá da caridade, mas da <strong>troca de valor</strong>. Oferecemos inteligência territorial para corporações que precisam de indicadores auditáveis de ESG e marketing de impacto real para 2026.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
               <CheckCircle2 size={18} className="text-green-500" />
               <span>Dados Auditáveis</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 font-bold">
               <CheckCircle2 size={18} className="text-green-500" />
               <span>Engajamento Genuíno</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Pillars of Value */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <TrendingUp />, title: "Inteligência de Dados", desc: "Evidências para relatórios de sustentabilidade (GRI) e cumprimento de ODS atualizados para o cenário de 2026." },
          { icon: <Presentation />, title: "Marketing Solidário", desc: "Transformar o monitoramento climático em um veículo de visibilidade positiva para marcas parceiras." },
          { icon: <GraduationCap />, title: "Capital Humano", desc: "Acesso a jovens talentos do BCT/UFMT capacitados em tecnologia e ciência de dados aplicada ao clima." }
        ].map((p, i) => (
          <div key={i} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 hover:border-slate-600 transition-colors">
            <div className="text-orange-500 mb-4">{p.icon}</div>
            <h4 className="text-xl font-bold text-white">{p.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Sector Mapping Table */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
           <Target className="text-orange-500" />
           <h3 className="text-2xl font-bold text-white uppercase tracking-wider text-sm">Matriz de Aderência Setorial 2026</h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((s, i) => (
            <div key={i} className="flex flex-col bg-slate-800/40 border border-slate-700 p-6 rounded-2xl group hover:bg-slate-800 transition-all">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-900 rounded-lg">{s.icon}</div>
                  <span className="font-bold text-slate-200">{s.name}</span>
               </div>
               <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Parceiros Foco</p>
                    <p className="text-xs text-slate-300 font-medium">{s.partners}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">A "Dor" do Parceiro</p>
                    <p className="text-xs text-slate-400 italic">"{s.pain}"</p>
                  </div>
                  <div className="pt-4 border-t border-slate-700/50">
                    <p className="text-[10px] text-orange-400 font-bold uppercase mb-1">Argumento de Venda (Pitch)</p>
                    <p className="text-xs text-slate-200 leading-relaxed">{s.pitch}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Phase Section */}
      <div className="bg-slate-950 rounded-[40px] p-8 md:p-12 border border-slate-800">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white">Roteiro de Implementação 2026</h3>
          <p className="text-slate-500 text-sm">Do Seminário à Realidade Territorial</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-slate-800"></div>
          {roadmap.map((r, i) => (
            <div key={i} className="relative z-10 space-y-4 group">
               <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-orange-500 font-black text-xl group-hover:bg-orange-600 group-hover:text-white transition-all shadow-xl">
                  {r.phase}
               </div>
               <div>
                  <h5 className="font-bold text-white mb-2">{r.title}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA: Final Vision */}
      <div className="text-center space-y-8 py-12">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-3xl font-bold text-white">O futuro 2026 é colaborativo.</h3>
          <p className="text-slate-400">
            A grande inovação não está apenas no mapeamento, mas na <strong>engenharia institucional</strong> que une a UFMT, o cooperativismo e as grandes corporações da região para um 2026 resiliente.
          </p>
        </div>
        <PrimaryButton variant="gradient" icon={<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}>
           Solicitar Apresentação Executiva 2026
        </PrimaryButton>
      </div>
    </div>
  );
};

export default StrategicPlan;