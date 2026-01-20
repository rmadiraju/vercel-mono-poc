# Vercel Monorepo POC

This is a Turborepo monorepo containing 4 Next.js applications with the following dependency structure:

- **feature-flags**: Shared package that all apps depend on
- **onboarding**: For onboarding clients (depends on feature-flags)
- **approvals**: For approvals (depends on onboarding and feature-flags)
- **release**: For feature releases (depends on approvals and feature-flags)

## Getting Started

Install dependencies:

```bash
npm install
```

Run all apps in development mode:

```bash
npm run dev
```

Build all apps:

```bash
npm run build
```

## Apps

- `apps/onboarding` - Onboarding application
- `apps/approvals` - Approvals application
- `apps/release` - Release application
- `apps/feature-flags` - Feature flags application

## Packages

- `packages/feature-flags` - Shared feature flags package

## Deployment

This monorepo is configured for Vercel deployment. Each app can be deployed independently.
