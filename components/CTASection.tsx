import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Section } from '../types';

interface CTASectionProps {
  onNavigate: (section: Section) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transforme Dados em Ação
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Acesse ferramentas avançadas de análise para otimizar seu planejamento urbano, 
            estratégias agrícolas e programas de conservação ambiental.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate(Section.DASHBOARD)}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
            >
              Explorar Dashboard
              <ArrowRight size={20} />
            </button>

            <a
              href="mailto:contato@albedomaps.com"
              className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Solicitar Demonstração
              <ArrowRight size={20} />
            </a>
          </div>

          <p className="text-blue-100 text-sm mt-12">
            Gratuito para pesquisadores e instituições públicas. 
            <a href="#" className="font-semibold underline ml-1">Conheça nossos planos</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
