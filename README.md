<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AlbedoMaps: Cuiabá Heat Atlas

[![Deploy to GitHub Pages](https://github.com/regisdourado/Albedo/actions/workflows/deploy.yml/badge.svg)](https://github.com/regisdourado/Albedo/actions/workflows/deploy.yml)

Atlas Digital de Calor para a Baixada Cuiabana. Diagnóstico de risco térmico com dados Landsat e NASA POWER.

**🌐 Live Demo:** [https://regisdourado.github.io/Albedo/](https://regisdourado.github.io/Albedo/)

View your app in AI Studio: https://ai.studio/apps/drive/16u1wJI0rJkbUMUeoXCP9yYM70Y3QTmTa

## Run Locally

**Prerequisites:**  Node.js (v18 or higher)


1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set your Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your `GEMINI_API_KEY` from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to GitHub Pages

### Automatic Deployment

This repository is configured with GitHub Actions for automatic deployment. Every push to the `main` branch will automatically build and deploy the application to GitHub Pages.

**Setup:**

1. Go to your repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Go to Settings → Secrets and variables → Actions
4. Add a new repository secret named `GEMINI_API_KEY` with your Google Gemini API key
5. Push to the `main` branch to trigger deployment

The app will be available at: `https://regisdourado.github.io/Albedo/`

### Manual Deployment

You can also manually trigger deployment:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Build for Production

To build the app locally:

```bash
npm run build
```

The production build will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [REFACTORING.md](REFACTORING.md) - Code refactoring documentation

## License

GNU General Public License v3.0 (GPL) - Software Livre de utilidade pública.


