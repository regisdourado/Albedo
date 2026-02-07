<div align="center">
<img width="1200" height="475" alt="AlbedoMaps Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🌡️ AlbedoMaps: Atlas Digital de Calor da Baixada Cuiabana

**Mapeamento Térmico Urbano com Inteligência Artificial e Dados de Satélite**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)

</div>

---

## 📋 Sobre o Projeto

**AlbedoMaps** é um Atlas Digital de Calor desenvolvido para a Baixada Cuiabana, utilizando dados de satélite Landsat 8/9 e NASA POWER para diagnóstico de risco térmico urbano. O projeto faz parte do curso de **Bacharelado em Ciência e Tecnologia (EAD)** da **Universidade Federal de Mato Grosso (UFMT)**.

### 🎯 Objetivos

- 🗺️ **Mapear** zonas de risco térmico na região metropolitana de Cuiabá
- 🌡️ **Monitorar** temperaturas urbanas que ultrapassam 41°C
- 🌳 **Propor** estratégias de arborização urbana baseadas em dados
- 📊 **Visualizar** índices NDVI (Normalized Difference Vegetation Index)
- 🤖 **Utilizar** IA para análise e recomendações ambientais

### ✨ Funcionalidades

- **Dashboard Interativo**: Visualização de mapas de risco térmico em tempo real
- **Análise de Dados**: Processamento de dados climáticos da NASA POWER
- **Índice NDVI**: Monitoramento da cobertura vegetal
- **IA Gemini**: Análise inteligente e recomendações personalizadas
- **Metodologia**: Documentação completa sobre a base científica do projeto
- **Plano Estratégico**: Propostas de intervenção urbana sustentável

---

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia |
|-----------|-----------|
| **Frontend** | React 18, TypeScript, TailwindCSS |
| **Build Tool** | Vite |
| **IA** | Google Gemini API |
| **Dados** | Landsat 8/9, NASA POWER API |
| **Visualização** | Recharts, Lucide Icons |
| **Mapas** | ArcGIS Services |

---

## 📦 Instalação e Uso

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Chave API do Google Gemini** ([obter aqui](https://ai.google.dev/))

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/regisdourado/Albedo.git
   cd Albedo
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure a chave API**
   
   Copie o arquivo de exemplo e adicione sua chave:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edite o arquivo `.env.local` e adicione sua chave do Gemini:
   ```env
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```

4. **Execute o projeto localmente**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador**
   
   Abra [http://localhost:5173](http://localhost:5173)

### Build para Produção

```bash
npm run build
npm run preview
```

---

## 🗂️ Estrutura do Projeto

```
Albedo/
├── components/          # Componentes React
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Dashboard.tsx
│   ├── Methodology.tsx
│   ├── About.tsx
│   ├── SocioEnvironmental.tsx
│   └── StrategicPlan.tsx
├── services/            # Serviços de API
│   ├── geminiService.ts
│   └── arcgis.ts
├── App.tsx             # Componente principal
├── index.tsx           # Ponto de entrada
├── types.ts            # Definições TypeScript
├── metadata.json       # Metadados do projeto
├── package.json        # Dependências
└── vite.config.ts      # Configuração Vite
```

---

## 🌍 Fontes de Dados

### Satélites Landsat 8/9
- **Banda Térmica**: Temperatura de superfície (LST)
- **NDVI**: Índice de vegetação normalizado
- **Resolução**: 30m (visível/NIR), 100m (termal)

### NASA POWER
- **API**: Prediction Of Worldwide Energy Resources
- **Dados**: Temperatura, radiação solar, precipitação
- **Cobertura**: Dados históricos de 1981 até o presente

---

## 📊 Metodologia

O projeto utiliza uma metodologia baseada em:

1. **Aquisição de Dados**: Download automático de imagens Landsat
2. **Processamento**: Cálculo de LST (Land Surface Temperature) e NDVI
3. **Análise**: Classificação de zonas de risco térmico
4. **Validação**: Comparação com dados da NASA POWER
5. **Visualização**: Apresentação em mapas interativos
6. **IA**: Análise preditiva e recomendações com Gemini

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Para contribuir:

1. Faça um **Fork** do projeto
2. Crie uma **Branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Faça **Push** para a Branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### Diretrizes

- Mantenha o código limpo e bem documentado
- Siga os padrões TypeScript do projeto
- Adicione testes quando apropriado
- Atualize a documentação conforme necessário

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

**Regis Dourado**
- GitHub: [@regisdourado](https://github.com/regisdourado)

### Instituição

**Universidade Federal de Mato Grosso (UFMT)**  
Bacharelado em Ciência e Tecnologia - EAD

---

## 📞 Contato e Links

- 🌐 **AI Studio**: [Ver aplicação](https://ai.studio/apps/drive/16u1wJI0rJkbUMUeoXCP9yYM70Y3QTmTa)
- 🎓 **UFMT BCT**: [Acessar AVA](https://setec.ufmt.br/ava/bct-ead/login/index.php)

---

## 🙏 Agradecimentos

- **UFMT** - Universidade Federal de Mato Grosso
- **NASA** - Pelos dados abertos do POWER API
- **USGS** - Pelas imagens Landsat
- **Google** - Pela API Gemini

---

<div align="center">

**Feito com ❤️ para um futuro urbano mais sustentável**

</div>
