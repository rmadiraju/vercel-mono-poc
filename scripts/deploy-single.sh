#!/bin/bash

# Script to deploy a single app to Vercel

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if app name is provided
if [ -z "$1" ]; then
    print_error "Usage: ./scripts/deploy-single.sh <app-name>"
    print_error "Available apps: feature-flags, onboarding, approvals, release"
    exit 1
fi

APP_NAME=$1
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/apps/$APP_NAME"

# Validate app name
if [ ! -d "$APP_DIR" ]; then
    print_error "App '$APP_NAME' does not exist in apps directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Please install it with: npm i -g vercel"
    exit 1
fi

print_info "Deploying $APP_NAME to Vercel..."
cd "$APP_DIR"

# Deploy to Vercel
vercel --yes

print_info "$APP_NAME deployed successfully! 🎉"
