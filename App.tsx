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
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-orange-500/30">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main>
        {activeSection === Section.HOME && <Hero onNavigate={handleNavigate} />}
        {activeSection === Section.DASHBOARD && <Dashboard />}
        {activeSection === Section.METHODOLOGY && <Methodology />}
        {activeSection === Section.SOCIO_ENVIRONMENTAL && <SocioEnvironmental />}
        {activeSection === Section.STRATEGIC_PLAN && <StrategicPlan />}
        {activeSection === Section.ABOUT && <About />}
      </main>
    </div>
  );
};

export default App;