import React from 'react';
import { Map, BarChart3, BookOpen, MessageSquare, ThermometerSun, Users } from 'lucide-react';
import { Section } from '../types';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: Section.HOME, label: 'Visão Geral', icon: Map },
    { id: Section.DASHBOARD, label: 'Mapa de Risco', icon: BarChart3 },
    { id: Section.METHODOLOGY, label: 'Metodologia', icon: BookOpen },
    { id: Section.ABOUT, label: 'Sobre o Projeto', icon: Users },
    { id: Section.CHAT, label: 'Assistente IA', icon: MessageSquare },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
            {/* UFMT Institutional Logo */}
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
                className="h-10 w-auto bg-slate-200 rounded-lg p-1 shadow-sm border border-slate-600"
              />
            </a>

            {/* Divider (Hidden on mobile) */}
            <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>

            {/* App Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group" 
              onClick={() => onNavigate(Section.HOME)}
            >
              <div className="bg-orange-500 p-1.5 rounded-lg group-hover:bg-orange-600 transition-colors">
                <ThermometerSun className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent hidden sm:block">
                AlbedoMaps
              </span>
            </div>
        </div>

        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full transition-all text-sm font-medium ${
                activeSection === item.id
                  ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <item.icon size={16} />
              <span className="hidden lg:inline">{item.label}</span>
              <span className="lg:hidden">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
        
        {/* Mobile menu button placeholder */}
        <div className="md:hidden flex gap-2">
           {navItems.slice(1, 4).map(item => (
             <button 
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`p-2 rounded-lg ${activeSection === item.id ? 'bg-orange-600 text-white' : 'text-slate-400'}`}
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