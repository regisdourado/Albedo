import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Methodology from './components/Methodology';
import About from './components/About';
import { Section } from './types';
import { createChatSession, sendMessage } from './services/geminiService';
import { MessageSquare, X, Send } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Chat state
  const [chatSession] = useState(() => createChatSession());

  const handleNavigate = (section: Section) => {
    if (section === Section.CHAT) {
      setIsChatOpen(true);
    } else {
      setActiveSection(section);
      window.scrollTo(0, 0);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(chatSession, userMsg);
      setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: 'model', text: "Erro ao conectar com o assistente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-orange-500/30">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main>
        {activeSection === Section.HOME && <Hero onNavigate={handleNavigate} />}
        {activeSection === Section.DASHBOARD && <Dashboard />}
        {activeSection === Section.METHODOLOGY && <Methodology />}
        {activeSection === Section.ABOUT && <About />}
      </main>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-all z-50 hover:scale-110"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="p-4 bg-slate-900 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Assistente AlbedoMaps
            </h3>
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center text-slate-500 text-sm mt-8">
                <p>Olá! Sou o assistente do projeto.</p>
                <p>Pergunte sobre as Ilhas de Calor, a metodologia Landsat ou a Lei 7.195/2024.</p>
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-orange-600 text-white rounded-tr-none' 
                    : 'bg-slate-700 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-3 rounded-2xl rounded-tl-none">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua pergunta..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;