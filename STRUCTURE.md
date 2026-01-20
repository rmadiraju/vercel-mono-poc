# Monorepo Structure

## Overview

This is a Turborepo monorepo with 4 Next.js applications and shared packages.

## Dependency Graph

```
feature-flags (package) ──┐
                          ├──> onboarding (app)
                          │
                          ├──> approvals (app) ──> depends on onboarding-shared
                          │
                          └──> release (app) ──> depends on approvals-shared
```

## Apps

### 1. Feature Flags (`apps/feature-flags`)
- **Port**: 3000
- **Dependencies**: `@repo/feature-flags` (package)
- **Purpose**: Display and manage feature flags
- **URL**: http://localhost:3000

### 2. Onboarding (`apps/onboarding`)
- **Port**: 3001
- **Dependencies**: 
  - `@repo/feature-flags` (package)
  - `@repo/onboarding-shared` (package)
- **Purpose**: Onboard new clients
- **URL**: http://localhost:3001

### 3. Approvals (`apps/approvals`)
- **Port**: 3002
- **Dependencies**: 
  - `@repo/feature-flags` (package)
  - `@repo/onboarding-shared` (package)
- **Purpose**: Manage approvals for onboarded clients
- **URL**: http://localhost:3002

### 4. Release (`apps/release`)
- **Port**: 3003
- **Dependencies**: 
  - `@repo/feature-flags` (package)
  - `@repo/approvals-shared` (package)
- **Purpose**: Release features for approved clients
- **URL**: http://localhost:3003

## Packages

### 1. Feature Flags (`packages/feature-flags`)
- Shared feature flags utilities
- Used by all apps
- Exports: `isFeatureEnabled`, `getFeatureFlag`, `getAllFeatureFlags`

### 2. Onboarding Shared (`packages/onboarding`)
- Shared onboarding data and utilities
- Used by onboarding and approvals apps
- Exports: `getOnboardingClients`, `getClientById`

### 3. Approvals Shared (`packages/approvals`)
- Shared approvals data and utilities
- Used by approvals and release apps
- Exports: `getApprovals`, `getApprovedItems`, `getApprovalById`

## Commands

From the root directory:

- `npm install` - Install all dependencies
- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps and packages
- `npm run lint` - Lint all apps and packages
- `npm run format` - Format code with Prettier

## Technology Stack

- **Monorepo Tool**: Turborepo
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Package Manager**: npm (workspaces)
- **Deployment**: Vercel
