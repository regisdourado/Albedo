import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Section } from '../types';
import UFMTLogo from './common/UFMTLogo';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { 
      id: Section.HOME, 
      label: 'Início', 
      submenu: [
        { id: 'overview', label: 'Visão Geral' },
        { id: 'features', label: 'Recursos' },
      ]
    },
    { 
      id: Section.DASHBOARD, 
      label: 'Mapa de Calor', 
      submenu: [
        { id: 'interactive', label: 'Mapa Interativo' },
        { id: 'analysis', label: 'Análise Térmica' },
      ]
    },
    { 
      id: Section.SOCIO_ENVIRONMENTAL, 
      label: 'Impacto Ambiental', 
      submenu: [
        { id: 'climate', label: 'Clima & Biodiversidade' },
        { id: 'health', label: 'Saúde Pública' },
      ]
    },
    { 
      id: Section.STRATEGIC_PLAN, 
      label: 'Agronegócio', 
      submenu: [
        { id: 'agriculture', label: 'Produtividade Agrícola' },
        { id: 'sustainable', label: 'Práticas Sustentáveis' },
      ]
    },
    { 
      id: Section.METHODOLOGY, 
      label: 'Metodologia' 
    },
    { 
      id: Section.ABOUT, 
      label: 'Sobre' 
    },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div onClick={() => onNavigate(Section.HOME)} className="cursor-pointer">
            <UFMTLogo variant="header" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="group relative">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50 font-semibold'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={16} />}
                </button>
                
                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                    {item.submenu.map((sub) => (
                      <button
                        key={sub.id}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Explorar Dados
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-700">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;