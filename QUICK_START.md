# Quick Start Guide

## Setup

```bash
# Install dependencies
npm install

# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login
```

## Development

```bash
# Run all apps in development mode
npm run dev

# Apps will be available at:
# - Feature Flags: http://localhost:3000
# - Onboarding: http://localhost:3001
# - Approvals: http://localhost:3002
# - Release: http://localhost:3003
```

## Building

```bash
# Build all apps and packages
npm run build

# Build specific app
npm run build:feature-flags
npm run build:onboarding
npm run build:approvals
npm run build:release
```

## Deployment

### Deploy All Apps

```bash
# Using npm script
npm run deploy:all

# Or using shell script
./scripts/deploy.sh
```

### Deploy Individual Apps

```bash
# Using npm scripts
npm run deploy:feature-flags
npm run deploy:onboarding
npm run deploy:approvals
npm run deploy:release

# Or using shell script
./scripts/deploy-single.sh feature-flags
./scripts/deploy-single.sh onboarding
./scripts/deploy-single.sh approvals
./scripts/deploy-single.sh release
```

### Deploy to Production

```bash
# Deploy specific app to production
vercel --cwd apps/feature-flags --prod --yes
vercel --cwd apps/onboarding --prod --yes
vercel --cwd apps/approvals --prod --yes
vercel --cwd apps/release --prod --yes
```

## Common Commands

```bash
# Lint all apps
npm run lint

# Format code
npm run format

# Clear Turbo cache and rebuild
npx turbo run build --force

# Check Vercel login status
vercel whoami

# View Vercel deployment logs
vercel logs
```
