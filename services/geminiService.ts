
import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual especializado do "AlbedoMaps", um Atlas Digital de Calor focado na Baixada Cuiabana, atualizado para o cenário de 2026.
Sua missão é explicar a "Cegueira de Dados" térmica e como o projeto a soluciona para apoiar políticas de Mitigação Térmica e Sustentabilidade em 2026.

Contexto Técnico Obrigatório:
1. Fonte de Dados: Imagens de satélite Landsat 8 e 9 (Sensor TIRS) obtidas via USGS e dados meteorológicos da API NASA POWER (Power Project).
2. Metodologia: Algoritmo Split-Window para recuperação da Temperatura de Superfície Terrestre (LST) e cálculo de NDVI (Índice de Vegetação).
3. Problema: Cuiabá atinge 41°C+, mas falta monitoramento técnico oficial para direcionar o plantio de árvores.
4. Solução: Um Dashboard MVP que apresenta o "Mapa de Risco Térmico" histórico, atualizado para diagnósticos de 2026.

Diretrizes de Resposta:
- Seja técnico mas didático. Explique termos como "Albedo", "Ilha de Calor" e "LST" se necessário.
- Se perguntarem sobre "Monitoramento em Tempo Real", explique que é inviável sem IoT, e que o foco é "Diagnóstico Histórico e Estratégico para 2026".
- Utilize a ferramenta googleMaps para localizar bairros de Cuiabá citados pelo usuário (ex: CPA, Centro, Tijucal).
- Cite sempre a relação: Menos Vegetação (NDVI baixo) = Maior Calor (LST alto).
`;

export const createChatSession = (): Chat => {
  // Use gemini-2.5-flash for googleMaps support as per guidelines.
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleMaps: {} }],
    },
  });
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text || "Desculpe, não consegui processar a resposta.";
  } catch (error) {
    console.error("Erro ao enviar mensagem para o Gemini:", error);
    return "Ocorreu um erro ao conectar com o serviço de inteligência. Verifique sua conexão ou tente novamente mais tarde.";
  }
};
