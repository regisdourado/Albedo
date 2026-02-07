# 🚀 Guia de Deploy - GitHub Pages

## ✅ Status Atual

Todas as configurações necessárias para o GitHub Pages foram implementadas! O repositório está pronto para ser publicado.

## 📍 URL do Aplicativo

**Endereço**: https://regisdourado.github.io/Albedo/

## 🎯 Próximos Passos para Ativar

### 1. Fazer Merge do Pull Request

Faça o merge deste Pull Request para a branch `main`:
- Acesse: https://github.com/regisdourado/Albedo/pulls
- Clique no PR "Preparar repositório para publicação e compartilhamento"
- Clique em "Merge pull request"
- Confirme o merge

### 2. Configurar GitHub Pages (Importante!)

Após o merge, você precisa ativar o GitHub Pages nas configurações do repositório:

1. Vá em: https://github.com/regisdourado/Albedo/settings/pages
2. Em "Source", selecione: **GitHub Actions**
3. Salve as alterações

### 3. Aguardar o Deploy

- O GitHub Actions será executado automaticamente
- Acompanhe em: https://github.com/regisdourado/Albedo/actions
- O deploy leva aproximadamente 2-3 minutos
- Quando concluído, você verá um ✅ verde

### 4. Acessar o Aplicativo

Após o deploy ser concluído, acesse:
**https://regisdourado.github.io/Albedo/**

## 🔧 O que foi Configurado

### 1. Vite Configuration (`vite.config.ts`)
```typescript
base: '/Albedo/' // Caminho correto para GitHub Pages
```

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Deploy automático em push para `main`
- Build com Node.js 18
- Upload para GitHub Pages
- Suporte a deploy manual

### 3. Package.json
```json
"deploy": "npm run build && echo 'Build completed. Push to main branch to deploy to GitHub Pages.'"
```

### 4. Documentação
- README atualizado com link e badge
- Instruções de deploy documentadas

## 🔄 Deploys Futuros

Após a configuração inicial, todo push para a branch `main` fará deploy automaticamente:

```bash
git add .
git commit -m "suas alterações"
git push origin main
```

O GitHub Actions cuidará do resto!

## 📝 Observações Importantes

1. **API Key do Gemini**: Usuários precisarão configurar sua própria chave (arquivo `.env.local`)
2. **Build Time**: O build leva ~3 minutos para completar
3. **Cache**: Pode levar alguns minutos para o browser atualizar o cache
4. **HTTPS**: O GitHub Pages usa HTTPS automaticamente

## 🐛 Troubleshooting

### Deploy falhou?
- Verifique os logs em Actions: https://github.com/regisdourado/Albedo/actions
- Certifique-se de que "GitHub Actions" está selecionado em Settings > Pages

### Página não carrega?
- Aguarde 5 minutos após o primeiro deploy
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se o deploy está completo (✅ verde no Actions)

### Assets não carregam?
- Verifique se `base: '/Albedo/'` está correto no vite.config.ts
- O nome do repositório mudou? Atualize o base path

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs do GitHub Actions
2. Consulte a documentação do GitHub Pages: https://docs.github.com/pages
3. Abra uma issue no repositório

---

**🎉 Parabéns! Seu aplicativo estará online em breve!**
