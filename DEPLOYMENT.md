# Deployment Guide - AlbedoMaps

This document provides detailed information about deploying the AlbedoMaps application to GitHub Pages.

## Overview

AlbedoMaps is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow is triggered on every push to the `main` branch.

## Prerequisites

1. **GitHub Repository Settings**:
   - Enable GitHub Pages in repository settings
   - Set source to "GitHub Actions"

2. **Secrets Configuration**:
   - Add `GEMINI_API_KEY` secret in repository settings
   - Navigate to: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key

## Deployment Workflow

The deployment process consists of two jobs:

### 1. Build Job
- Checks out the code
- Sets up Node.js v20
- Installs dependencies with `npm ci`
- Builds the application with `npm run build`
- Uploads the build artifacts to GitHub Pages

### 2. Deploy Job
- Deploys the built artifacts to GitHub Pages
- Runs after the build job completes successfully

## Manual Deployment

To manually trigger a deployment:

1. Go to the "Actions" tab in GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the branch (main)
5. Click "Run workflow"

## Local Testing

Before deploying, you can test the production build locally:

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The preview server will start at `http://localhost:4173`

## Deployment URL

Once deployed, the application will be available at:
```
https://regisdourado.github.io/Albedo/
```

## Troubleshooting

### Build Fails in GitHub Actions

1. Check that all dependencies are properly listed in `package.json`
2. Verify that `GEMINI_API_KEY` secret is properly configured
3. Check the Actions logs for specific error messages

### 404 Error on Deployed Site

1. Verify GitHub Pages is enabled in repository settings
2. Check that the source is set to "GitHub Actions"
3. Ensure the base path in `vite.config.ts` matches the repository name
4. Wait a few minutes for DNS propagation

### Blank Page After Deployment

1. Check browser console for errors
2. Verify that the base path is correctly set in `vite.config.ts`
3. Check that all assets are loading with correct paths

## Environment Variables

The application uses the following environment variables:

- `GEMINI_API_KEY`: Google Gemini API key for AI features
  - Required for: AI chat functionality
  - Get your key from: https://makersuite.google.com/app/apikey

## Build Configuration

The build process uses:
- **Vite**: Build tool and development server
- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework

Build output directory: `dist/`

## Maintenance

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update a specific package
npm install package-name@latest
```

### Monitoring Deployments

1. Check the "Actions" tab for deployment status
2. View deployment history in "Environments" → "github-pages"
3. Check the deployment URL to verify the update

## Security

- Never commit API keys or secrets to the repository
- Always use GitHub Secrets for sensitive data
- Keep dependencies updated to patch security vulnerabilities
- Run `npm audit` regularly to check for security issues

## Support

For issues or questions:
1. Check the GitHub Actions logs
2. Review this deployment guide
3. Check the main README.md for general setup instructions
4. Open an issue in the GitHub repository
