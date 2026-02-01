import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Methodology from './components/Methodology';
import About from './components/About';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    window.scrollTo(0, 0);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} font-sans transition-colors duration-300`}>
      <Header activeSection={activeSection} onNavigate={handleNavigate} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main>
        {activeSection === Section.HOME && <Hero onNavigate={handleNavigate} darkMode={darkMode} />}
        {activeSection === Section.DASHBOARD && <Dashboard darkMode={darkMode} />}
        {activeSection === Section.METHODOLOGY && <Methodology darkMode={darkMode} />}
        {activeSection === Section.ABOUT && <About darkMode={darkMode} />}
      </main>
    </div>
  );
};

export default App;