# 🤝 Guia de Contribuição

Obrigado por seu interesse em contribuir com o **AlbedoMaps**! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Como Posso Contribuir?

Existem várias maneiras de contribuir:

### 🐛 Reportar Bugs

Se você encontrar um bug:

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/regisdourado/Albedo/issues)
2. Se não encontrar, crie uma nova issue com:
   - Título claro e descritivo
   - Descrição detalhada do problema
   - Passos para reproduzir o bug
   - Comportamento esperado vs. comportamento atual
   - Screenshots (se aplicável)
   - Informações do ambiente (navegador, SO, versão do Node.js)

### 💡 Sugerir Melhorias

Para sugerir novas funcionalidades:

1. Verifique se a sugestão já existe nas Issues
2. Crie uma nova issue descrevendo:
   - O problema que a funcionalidade resolveria
   - Como você imagina que funcionaria
   - Possíveis alternativas consideradas

### 🔧 Contribuir com Código

#### Preparando o Ambiente

1. **Fork** o repositório
2. **Clone** seu fork:
   ```bash
   git clone https://github.com/SEU_USUARIO/Albedo.git
   cd Albedo
   ```
3. **Instale** as dependências:
   ```bash
   npm install
   ```
4. **Configure** o arquivo `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
5. **Crie** uma branch para sua feature:
   ```bash
   git checkout -b feature/minha-feature
   ```

#### Desenvolvendo

- **Siga o estilo de código** do projeto (TypeScript, React, TailwindCSS)
- **Teste suas alterações** localmente antes de commitar
- **Escreva commits claros** seguindo o padrão:
  - `feat: adiciona nova funcionalidade`
  - `fix: corrige bug específico`
  - `docs: atualiza documentação`
  - `style: ajustes de formatação`
  - `refactor: refatoração de código`
  - `test: adiciona ou modifica testes`

#### Enviando suas Alterações

1. **Commit** suas mudanças:
   ```bash
   git add .
   git commit -m "feat: descrição da sua feature"
   ```
2. **Push** para seu fork:
   ```bash
   git push origin feature/minha-feature
   ```
3. Abra um **Pull Request** no repositório original

### 📖 Melhorar Documentação

A documentação é tão importante quanto o código! Você pode:

- Corrigir erros de digitação
- Melhorar explicações
- Adicionar exemplos
- Traduzir documentação

## 🎨 Padrões de Código

### TypeScript

- Use **tipagem estrita** sempre que possível
- Evite usar `any`
- Documente interfaces e tipos complexos

### React

- Use **componentes funcionais** com hooks
- Mantenha componentes pequenos e focados
- Use TypeScript para props

### CSS/TailwindCSS

- Prefira classes utilitárias do Tailwind
- Mantenha consistência visual com o design existente
- Use variáveis do tema quando possível

### Nomenclatura

- **Componentes**: PascalCase (ex: `Dashboard.tsx`)
- **Funções**: camelCase (ex: `fetchData`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_KEY`)
- **Arquivos**: kebab-case para não-componentes

## ✅ Checklist do Pull Request

Antes de submeter um PR, certifique-se de que:

- [ ] O código segue os padrões do projeto
- [ ] A build está funcionando (`npm run build`)
- [ ] Não há erros de TypeScript
- [ ] A documentação foi atualizada (se necessário)
- [ ] Os commits têm mensagens descritivas
- [ ] O PR tem um título claro
- [ ] A descrição do PR explica o que foi feito e por quê

## 🚀 Processo de Review

1. Mantenedores do projeto revisarão seu PR
2. Podem solicitar mudanças ou esclarecimentos
3. Após aprovação, seu PR será mesclado
4. Seu nome será adicionado aos contribuidores!

## 📞 Precisa de Ajuda?

- Abra uma [Issue](https://github.com/regisdourado/Albedo/issues) com suas dúvidas
- Marque com a label `question`

## 🙏 Reconhecimento

Todos os contribuidores serão reconhecidos no projeto. Obrigado por ajudar a tornar o AlbedoMaps melhor!

---

**Código de Conduta**: Seja respeitoso e construtivo em todas as interações. Este é um projeto educacional e todos estão aprendendo.
