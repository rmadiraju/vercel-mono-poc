# Vercel Dashboard Configuration Guide

This guide explains how to configure each app in the Vercel dashboard for proper monorepo deployment.

## Important: Vercel Dashboard Settings

For each app, you need to configure the following in the Vercel Dashboard:

### 1. Feature Flags App

**Project Settings → General:**
- **Root Directory**: `apps/feature-flags`
- **Framework Preset**: Next.js (auto-detected)

**Project Settings → Build & Development Settings:**
- **Install Command**: `cd ../.. && npm install` (or leave empty, Vercel will use the vercel.json)
- **Build Command**: Leave empty (Vercel will use vercel.json or auto-detect)
- **Output Directory**: `.next` (auto-detected)

The `vercel.json` in the app directory will handle the build command automatically.

### 2. Onboarding App

**Project Settings → General:**
- **Root Directory**: `apps/onboarding`
- **Framework Preset**: Next.js

**Project Settings → Build & Development Settings:**
- **Install Command**: `cd ../.. && npm install`
- **Build Command**: Leave empty
- **Output Directory**: `.next`

### 3. Approvals App

**Project Settings → General:**
- **Root Directory**: `apps/approvals`
- **Framework Preset**: Next.js

**Project Settings → Build & Development Settings:**
- **Install Command**: `cd ../.. && npm install`
- **Build Command**: Leave empty
- **Output Directory**: `.next`

### 4. Release App

**Project Settings → General:**
- **Root Directory**: `apps/release`
- **Framework Preset**: Next.js

**Project Settings → Build & Development Settings:**
- **Install Command**: `cd ../.. && npm install`
- **Build Command**: Leave empty
- **Output Directory**: `.next`

## How It Works

1. **Vercel detects Turborepo**: When Vercel sees a `turbo.json` file, it automatically adjusts settings for monorepo builds.

2. **vercel.json in each app**: Each app has a `vercel.json` that specifies:
   - `installCommand`: Runs from root to install all dependencies
   - `buildCommand`: Uses Turbo to build only the specific app and its dependencies
   - `framework`: Tells Vercel this is a Next.js app

3. **Turborepo handles dependencies**: Turbo automatically builds dependencies in the correct order:
   - First: Shared packages (`@repo/feature-flags`, etc.)
   - Then: The app itself

## Troubleshooting

### Build Fails with "Cannot find module"

If you see module resolution errors:
1. Ensure **Root Directory** is set correctly in Vercel dashboard
2. Ensure **Install Command** runs from root: `cd ../.. && npm install`
3. Check that the `vercel.json` build command uses the correct filter

### Build Takes Too Long

Turborepo caches builds. If builds are slow:
1. Ensure Turbo cache is working (check build logs)
2. Consider using Vercel's build cache
3. Make sure dependencies are built in the correct order

### "Previous build caches not available"

This is normal for the first build. Subsequent builds will use cache.

## Alternative: Configure via Vercel CLI

You can also configure these settings via CLI:

```bash
# Link project and configure
cd apps/feature-flags
vercel link

# This will prompt you to set:
# - Root Directory: apps/feature-flags
# - Build settings will be read from vercel.json
```

## Verification

After deployment, verify:
1. ✅ Build completes successfully
2. ✅ All dependencies are installed
3. ✅ App is accessible at the deployment URL
4. ✅ No module resolution errors in logs
