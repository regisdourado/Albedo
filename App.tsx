import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Methodology from './components/Methodology';
import About from './components/About';
import SocioEnvironmental from './components/SocioEnvironmental';
import StrategicPlan from './components/StrategicPlan';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main>
        {activeSection === Section.HOME && <Hero onNavigate={handleNavigate} />}
        {activeSection === Section.DASHBOARD && <Dashboard />}
        {activeSection === Section.METHODOLOGY && <Methodology />}
        {activeSection === Section.SOCIO_ENVIRONMENTAL && <SocioEnvironmental />}
        {activeSection === Section.STRATEGIC_PLAN && <StrategicPlan />}
        {activeSection === Section.ABOUT && <About />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-6">AlbedoMaps</h3>
              <p className="text-gray-400 text-sm">Atlas digital de calor para transformar dados climáticos em ação.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Plataforma</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => handleNavigate(Section.DASHBOARD)} className="hover:text-white transition">Mapa Interativo</button></li>
                <li><button onClick={() => handleNavigate(Section.METHODOLOGY)} className="hover:text-white transition">Metodologia</button></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Institucional</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => handleNavigate(Section.SOCIO_ENVIRONMENTAL)} className="hover:text-white transition">Impacto Ambiental</button></li>
                <li><button onClick={() => handleNavigate(Section.STRATEGIC_PLAN)} className="hover:text-white transition">Agronegócio</button></li>
                <li><button onClick={() => handleNavigate(Section.ABOUT)} className="hover:text-white transition">Sobre Nós</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Suporte</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="mailto:contato@albedomaps.com" className="hover:text-white transition">contato@albedomaps.com</a></li>
                <li><a href="#" className="hover:text-white transition">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 AlbedoMaps. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacidade</a>
              <a href="#" className="hover:text-white transition">Termos</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;