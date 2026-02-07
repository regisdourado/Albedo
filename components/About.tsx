import React from 'react';
import { GraduationCap, Users, Award, Lightbulb, Target, Globe } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    { name: "Luiz Carlos de Almeida", role: "Orientador" },
    { name: "Mario Marcos Morel", role: "Pesquisador" },
    { name: "Matheus Nunes Dos Santos", role: "Desenvolvedor" },
    { name: "Nayara Gomes de Oliveira", role: "Analista de Dados" },
    { name: "Olivia Fernandes Boretti", role: "Geógrafa" },
    { name: "Paulo Ricardo Dos Santos Silva", role: "Engenheiro" },
    { name: "Phelipe Matheus Sales Kinack", role: "DevOps" },
    { name: "Quedna Brito Dos Reis", role: "Representante" },
    { name: "Rander Teixeira Barros", role: "Pesquisador" },
    { name: "Regis Alves Dourado", role: "Arquiteto de Software" }
  ];

  const values = [
    { icon: Lightbulb, title: "Inovação", description: "Aplicar tecnologia de satélite para resolver desafios urbanos reais" },
    { icon: Target, title: "Precisão", description: "Dados científicos validados e metodologia rigorosa" },
    { icon: Globe, title: "Sustentabilidade", description: "Contribuir para cidades mais verdes e resilientes" },
  ];

  return (
    <div className="pt-20 bg-white">
      <div className="container mx-auto px-4 py-20">
        
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-blue-100 rounded-xl">
              <GraduationCap size={32} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">Projeto Integrador VI</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Sobre AlbedoMaps
              </h1>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              AlbedoMaps é uma plataforma web de inteligência geoespacial desenvolvida pela <strong>Universidade Federal de Mato Grosso (UFMT)</strong> para diagnóstico e mitigação das ilhas de calor urbanas na Baixada Cuiabana.
            </p>
            <p className="text-gray-600">
              Utilizamos dados de satélite de alta precisão (Landsat 8/9) e inteligência artificial para oferecer insights profundos sobre clima urbano, impacto agrícola e estratégias de sustentabilidade ambiental.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all">
                  <Icon size={32} className="text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-4">
            <Users size={32} className="text-blue-600" />
            Equipe Executora
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Context */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contexto Acadêmico</h3>
              <p className="text-blue-100 leading-relaxed mb-6">
                Desenvolvido no contexto do Bacharelado Interdisciplinar em Ciência e Tecnologia (BICTa) da UFMT, com professores de diferentes áreas como Computação, Geografia e Engenharia.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-blue-200">Program</p>
                  <p className="font-bold">Bacharelado Interdisciplinar em Ciência e Tecnologia</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Licença</p>
                  <p className="font-bold">GNU General Public License v3.0 (Software Livre)</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Áreas Temáticas</h3>
              <div className="flex flex-wrap gap-3">
                {['Geoinformática', 'Clima Urbano', 'Sensoriamento Remoto', 'Desenvolvimento Web', 'Sustentabilidade'].map((area, i) => (
                  <span key={i} className="px-4 py-2 bg-white/20 border border-white/30 rounded-full text-sm font-semibold">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
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