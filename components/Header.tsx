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
    <header className="fixed top-0 w-full z-50 glass-panel border-b-0 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* UFMT Institutional Logo */}
          <a
            href="https://setec.ufmt.br/ava/bct-ead/login/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform duration-200 opacity-80 hover:opacity-100"
            title="Acessar AVA UFMT"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6e/UFMT_logo.png"
              alt="Logo UFMT"
              className="h-8 w-auto filter grayscale hover:grayscale-0 transition-all"
            />
          </a>

          {/* App Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate(Section.HOME)}
          >
            <div className="bg-orange-500/10 p-2 rounded-xl group-hover:bg-orange-500/20 border border-orange-500/20 transition-colors">
              <ThermometerSun className="text-orange-500 w-5 h-5 shadow-lg shadow-orange-500/50" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tight hidden sm:block">
              Albedo<span className="text-orange-500">Maps</span>
            </span>
          </div>
        </div>

        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full transition-all text-sm font-medium ${activeSection === item.id
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