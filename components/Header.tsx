import React from 'react';
import { Map, BarChart3, BookOpen, ThermometerSun, Users, Moon, Sun } from 'lucide-react';
import { Section } from '../types';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, darkMode, onToggleDarkMode }) => {
  const navItems = [
    { id: Section.HOME, label: 'Visão Geral', icon: Map },
    { id: Section.DASHBOARD, label: 'Mapa de Risco', icon: BarChart3 },
    { id: Section.METHODOLOGY, label: 'Metodologia', icon: BookOpen },
    { id: Section.ABOUT, label: 'Sobre o Projeto', icon: Users },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-gray-200'} backdrop-blur-md border-b transition-all duration-300 shadow-sm`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <a 
              href="https://setec.ufmt.br/ava/bct-ead/login/index.php" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:scale-105 transition-transform duration-200"
              title="Acessar AVA UFMT"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6e/UFMT_logo.png" 
                alt="Logo UFMT" 
                className={`h-10 w-auto ${darkMode ? 'bg-slate-200' : 'bg-gray-100'} rounded-lg p-1 shadow-sm border ${darkMode ? 'border-slate-600' : 'border-gray-300'}`}
              />
            </a>
            <div className={`h-8 w-px ${darkMode ? 'bg-slate-700' : 'bg-gray-300'} hidden sm:block`}></div>
            <div 
              className="flex items-center space-x-2 cursor-pointer group" 
              onClick={() => onNavigate(Section.HOME)}
            >
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-1.5 rounded-lg group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all">
                <ThermometerSun className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent hidden sm:block hover:from-orange-600 hover:to-red-700">
                AlbedoMaps
              </span>
            </div>
        </div>

        <nav className="hidden md:flex space-x-1 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full transition-all text-sm font-medium ${
                activeSection === item.id
                  ? darkMode ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-orange-100 text-orange-700 border border-orange-300'
                  : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <item.icon size={16} />
              <span className="hidden lg:inline">{item.label}</span>
              <span className="lg:hidden">{item.label.split(' ')[0]}</span>
            </button>
          ))}
          
          <button
            onClick={onToggleDarkMode}
            className={`ml-2 p-2 rounded-lg transition-all ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-200 text-orange-600 hover:bg-gray-300'}`}
            title={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
        
        <div className="md:hidden flex gap-2 items-center">
           <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-200 text-orange-600 hover:bg-gray-300'}`}
            title={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
           >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
           </button>
           {navItems.map(item => (
             <button 
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`p-2 rounded-lg transition-all ${activeSection === item.id ? 'bg-orange-600 text-white' : darkMode ? 'text-slate-400' : 'text-gray-600'}`}
                title={item.label}
                aria-label={item.label}
             >
                <item.icon size={20} />
             </button>
           ))}
        </div>
      </div>
    </header>
  );
};

export default Header;