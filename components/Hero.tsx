import React from 'react';
import { ArrowRight, TrendingUp, Globe, Zap, Leaf, Cloud, MapPin } from 'lucide-react';
import { Section } from '../types';
import Features from './Features';
import StatsSection from './StatsSection';
import AgroSection from './AgroSection';
import CTASection from './CTASection';
import UFMTLogo from './common/UFMTLogo';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <>
      <div className="pt-20 bg-gradient-to-b from-slate-50 via-white to-blue-50">
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              
              {/* Breadcrumb Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-semibold text-blue-600">Monitoramento Ambiental em Tempo Real</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Atlas de Calor da <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                    Baixada Cuiabana
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Utilize dados geoespaciais de satélite para transformar conhecimento climático em decisões estratégicas para agronegócio, planejamento urbano e gestão ambiental.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">41°C</div>
                  <div className="text-sm text-gray-600 mt-1">Temperatura Máxima</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">2000+</div>
                  <div className="text-sm text-gray-600 mt-1">Pontos de Dados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">L8/L9</div>
                  <div className="text-sm text-gray-600 mt-1">Satélites Landsat</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate(Section.DASHBOARD)}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Globe size={20} />
                  Explorar Mapa Interativo
                  <ArrowRight size={20} />
                </button>
                
                <button 
                  onClick={() => onNavigate(Section.SOCIO_ENVIRONMENTAL)}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <Leaf size={20} />
                  Impacto Ambiental
                </button>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-3xl blur-3xl"></div>
                
                {/* Main Card */}
                <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                  
                  {/* Header */}
                  <div className="h-16 bg-gradient-to-r from-blue-600 to-green-600 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-white" />
                      <span className="text-white font-semibold">Mapa de Calor Urbano</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    
                    {/* Map Preview */}
                    <div className="h-64 rounded-xl bg-gradient-to-br from-blue-100 via-white to-green-100 border border-gray-200 relative overflow-hidden">
                      {/* Grid */}
                      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                      </svg>
                      
                      {/* Heat Points */}
                      <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-red-500 rounded-full blur-xl opacity-40"></div>
                      <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-orange-400 rounded-full blur-lg opacity-50"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-40"></div>
                      
                      {/* Marker */}
                      <div className="absolute top-40 left-32">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg animated-ping"></div>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp size={16} className="text-blue-600" />
                          <span className="text-xs font-semibold text-gray-600">LST Index</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">+34%</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Cloud size={16} className="text-green-600" />
                          <span className="text-xs font-semibold text-gray-600">Cobertura Vegetal</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">+24%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-56 animate-bounce">
                <div className="flex items-center gap-3 mb-2">
                  <Zap size={20} className="text-yellow-500" />
                  <span className="font-semibold text-gray-900">Análise em Tempo Real</span>
                </div>
                <p className="text-sm text-gray-600">Dados atualizados a cada 16 dias</p>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-56">
                <div className="flex items-center gap-3 mb-2">
                  <Leaf size={20} className="text-green-600" />
                  <span className="font-semibold text-gray-900">Sustentabilidade</span>
                </div>
                <p className="text-sm text-gray-600">Soluções baseadas em natureza</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-12">
            <p className="text-center text-sm font-semibold text-gray-600 mb-8">CONFIADO POR INSTITUIÇÕES LÍDERES</p>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              <UFMTLogo variant="trust" />
              <div className="text-gray-400">+</div>
              <div className="text-gray-900 font-bold">NASA POWER API</div>
              <div className="text-gray-400">+</div>
              <div className="text-gray-900 font-bold">LANDSAT 8/9</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <StatsSection />

      {/* Agronegócio Section */}
      <AgroSection />

      {/* CTA Section */}
      <CTASection onNavigate={onNavigate} />
    </>
  );
};

export default Hero;