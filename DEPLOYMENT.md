# Vercel Deployment Guide

This monorepo contains 4 Next.js applications that can be deployed independently on Vercel using Turborepo and Vercel CLI.

## Prerequisites

1. **Install Vercel CLI globally:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Turborepo Commands

### Build All Apps and Packages

Build everything in the correct dependency order:

```bash
npm run build
```

Or using the build script:

```bash
./scripts/build.sh
```

### Build Specific App

Build a single app and its dependencies:

```bash
# Build feature-flags app
npm run build:feature-flags

# Build onboarding app
npm run build:onboarding

# Build approvals app
npm run build:approvals

# Build release app
npm run build:release
```

### Using Turbo CLI Directly

You can also use Turbo CLI directly for more control:

```bash
# Build all
npx turbo run build

# Build specific app
npx turbo run build --filter=@repo/feature-flags-app
npx turbo run build --filter=@repo/onboarding
npx turbo run build --filter=@repo/approvals
npx turbo run build --filter=@repo/release

# Build with dependencies
npx turbo run build --filter=@repo/approvals^...

# Build only changed apps
npx turbo run build --filter='[HEAD^1]'

# Clear cache and rebuild
npx turbo run build --force
```

### Development Mode

Run all apps in development mode:

```bash
npm run dev
```

Or run a specific app:

```bash
npx turbo run dev --filter=@repo/onboarding
```

## Vercel CLI Deployment

### Deploy All Apps

Deploy all apps at once using the deployment script:

```bash
npm run deploy:all
```

Or using the script directly:

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### Deploy Individual Apps

Deploy a single app using npm scripts:

```bash
# Deploy feature-flags app
npm run deploy:feature-flags

# Deploy onboarding app
npm run deploy:onboarding

# Deploy approvals app
npm run deploy:approvals

# Deploy release app
npm run deploy:release
```

Or using the single app deployment script:

```bash
chmod +x scripts/deploy-single.sh
./scripts/deploy-single.sh feature-flags
./scripts/deploy-single.sh onboarding
./scripts/deploy-single.sh approvals
./scripts/deploy-single.sh release
```

### Deploy Using Vercel CLI Directly

You can also use Vercel CLI commands directly:

```bash
# Deploy from app directory
cd apps/feature-flags
vercel --yes

# Deploy from root with --cwd flag
vercel --cwd apps/feature-flags --yes

# Deploy to production
vercel --cwd apps/feature-flags --prod --yes

# Deploy with specific environment
vercel --cwd apps/feature-flags --env NODE_ENV=production --yes
```

### First-Time Deployment

For first-time deployment, you'll need to link each app to a Vercel project:

```bash
# Navigate to app directory
cd apps/feature-flags

# Link to Vercel project (will prompt for project settings)
vercel link

# Deploy
vercel --yes
```

Or use the interactive mode:

```bash
vercel --cwd apps/feature-flags
```

## Deployment Workflow

### Recommended Workflow

1. **Build and test locally:**
   ```bash
   npm run build
   ```

2. **Deploy to preview:**
   ```bash
   npm run deploy:feature-flags
   npm run deploy:onboarding
   npm run deploy:approvals
   npm run deploy:release
   ```

3. **Deploy to production:**
   ```bash
   vercel --cwd apps/feature-flags --prod --yes
   vercel --cwd apps/onboarding --prod --yes
   vercel --cwd apps/approvals --prod --yes
   vercel --cwd apps/release --prod --yes
   ```

### Automated Deployment Script

Use the provided script for automated deployment:

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run full deployment
./scripts/deploy.sh
```

## Vercel Dashboard Configuration

### Option 1: Deploy Each App as Separate Vercel Projects (Recommended)

When setting up projects in Vercel Dashboard, configure the following:

**For each app (feature-flags, onboarding, approvals, release):**

1. **Project Settings → General:**
   - **Root Directory**: `apps/<app-name>` (e.g., `apps/feature-flags`)
   - **Framework Preset**: Next.js (auto-detected)

2. **Project Settings → Build & Development Settings:**
   - **Install Command**: `cd ../.. && npm install` (or leave empty - vercel.json handles it)
   - **Build Command**: Leave empty (vercel.json in each app handles this automatically)
   - **Output Directory**: `.next` (auto-detected)

**Note:** Each app has a `vercel.json` file that automatically configures:
- Install command to run from root
- Build command using Turborepo with the correct filter
- Framework detection

**See `VERCEL_SETUP.md` for detailed dashboard configuration instructions.**

## Environment Variables

### Setting Environment Variables

1. **Via Vercel Dashboard:**
   - Go to your project settings
   - Navigate to Environment Variables
   - Add your variables

2. **Via Vercel CLI:**
   ```bash
   vercel env add VARIABLE_NAME
   ```

3. **Via .env.local files:**
   - Create `.env.local` in each app directory
   - These files are gitignored and used for local development

## Turborepo Integration

Turborepo automatically handles:
- Building dependencies in the correct order
- Caching builds for faster deployments
- Parallel builds where possible
- Incremental builds (only rebuild what changed)

### Build Dependencies

The build order is automatically handled by Turborepo:
1. `@repo/feature-flags` package (shared)
2. `@repo/onboarding-shared` package
3. `@repo/approvals-shared` package
4. `apps/feature-flags` app
5. `apps/onboarding` app (depends on feature-flags)
6. `apps/approvals` app (depends on onboarding and feature-flags)
7. `apps/release` app (depends on approvals and feature-flags)

## Troubleshooting

### Build Failures

If builds fail, try:

```bash
# Clear Turbo cache
npx turbo run build --force

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Build with verbose output
npx turbo run build --verbose
```

### Deployment Issues

If deployment fails:

1. **Check Vercel CLI version:**
   ```bash
   vercel --version
   ```

2. **Verify you're logged in:**
   ```bash
   vercel whoami
   ```

3. **Check build locally first:**
   ```bash
   npm run build
   ```

4. **Deploy with debug output:**
   ```bash
   vercel --cwd apps/feature-flags --debug
   ```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./apps/feature-flags
```

## Useful Commands Reference

```bash
# Turborepo
npm run build                    # Build all
npx turbo run build              # Build all (direct)
npx turbo run build --filter=... # Build specific
npx turbo run build --force      # Force rebuild

# Vercel CLI
vercel login                     # Login
vercel whoami                    # Check login status
vercel link                      # Link project
vercel --yes                     # Deploy (non-interactive)
vercel --prod --yes              # Deploy to production
vercel --cwd <dir> --yes         # Deploy from specific directory
vercel env ls                    # List environment variables
vercel env add                   # Add environment variable
vercel logs                      # View deployment logs
```
