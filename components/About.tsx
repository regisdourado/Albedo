import React from 'react';
import { GraduationCap, Users, FileText, Scale, Award, Code2 } from 'lucide-react';
import InfoCard from './common/InfoCard';

const About: React.FC = () => {
  const teamMembers = [
    "Luiz Carlos de Almeida",
    "Mario Marcos Morel",
    "Matheus Nunes Dos Santos",
    "Nayara Gomes de Oliveira",
    "Olivia Fernandes Boretti",
    "Paulo Ricardo Dos Santos Silva",
    "Phelipe Matheus Sales Kinack",
    "Quedna Brito Dos Reis (Representante)",
    "Rander Teixeira Barros",
    "Regis Alves Dourado"
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Academic Context Header */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <GraduationCap size={150} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            AlbedoMaps: Diagnóstico Espacial
          </h1>
          <div className="inline-block bg-orange-600/20 text-orange-400 px-4 py-1.5 rounded-full text-sm font-semibold border border-orange-500/30 mb-6">
            Projeto Integrador VI
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Bacharelado Interdisciplinar em Ciência e Tecnologia<br/>
            <span className="font-bold text-slate-100">Universidade Federal de Mato Grosso (UFMT)</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Team List */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
               <Users className="text-orange-500" />
               <h3 className="text-xl font-bold text-white">Equipe Executora</h3>
            </div>
            <ul className="space-y-3">
              {teamMembers.map((member, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                  {member}
                </li>
              ))}
            </ul>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
             <InfoCard
               icon={<FileText size={20} />}
               title="Resumo do Projeto"
               iconColor="text-blue-400"
               content={
                 <p>
                   Desenvolvimento de plataforma web de inteligência geográfica para diagnóstico das Ilhas de Calor Urbanas na Baixada Cuiabana. Utiliza séries históricas de imagens de satélite (Landsat 8/9) e dados climatológicos (NASA POWER) para subsidiar o cumprimento da legislação municipal e diretrizes de conforto térmico.
                 </p>
               }
             />

             <InfoCard
               icon={<Code2 size={20} />}
               title="Licenciamento"
               iconColor="text-purple-400"
               content={
                 <p>
                   GNU General Public License v3.0 (GPL) - Software Livre de utilidade pública.
                 </p>
               }
             />

             <InfoCard
               icon={<Scale size={20} />}
               title="Áreas Temáticas"
               iconColor="text-green-400"
               content={
                 <div className="flex flex-wrap gap-2">
                   <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">TI & Ciência de Dados</span>
                   <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">Física Térmica</span>
                   <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">Geografia Urbana</span>
                   <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">Ciência, Tecnologia e Sociedade</span>
                 </div>
               }
             />
          </div>

        </div>

        {/* Detailed Description */}
        <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700">
           <div className="flex items-center gap-3 mb-6">
              <Award className="text-yellow-500" />
              <h3 className="text-xl font-bold text-white">Objetivo & Impacto</h3>
           </div>
           <div className="prose prose-invert max-w-none text-slate-400">
             <p>
               O objetivo principal é implementar um dashboard interativo (AlbedoMaps) que centralize dados históricos de temperatura de superfície (LST) e índices de vegetação (NDVI).
               A ferramenta visa evidenciar a correlação direta entre a escassez de vegetação e os picos de calor, servindo como suporte técnico para a priorização do plantio de árvores em conformidade com o Plano Diretor e estratégias de sustentabilidade urbana.
             </p>
             <p className="mt-4">
               <strong>Público-Alvo:</strong> Gestores da Prefeitura de Cuiabá, Defesa Civil, pesquisadores e cidadãos interessados no microclima urbano.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;