#!/bin/bash

# Deployment script for Vercel Monorepo
# This script helps deploy all apps to Vercel using the CLI

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Please install it with: npm i -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    print_warn "Not logged in to Vercel. Please run: vercel login"
    exit 1
fi

# Get the root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Function to deploy a single app
deploy_app() {
    local APP_NAME=$1
    local APP_DIR="apps/$APP_NAME"
    
    print_info "Deploying $APP_NAME..."
    
    if [ ! -d "$APP_DIR" ]; then
        print_error "App directory $APP_DIR does not exist"
        return 1
    fi
    
    cd "$APP_DIR"
    
    # Deploy to Vercel
    vercel --yes
    
    cd "$ROOT_DIR"
    print_info "$APP_NAME deployed successfully!"
    echo ""
}

# Function to build using Turbo
build_with_turbo() {
    print_info "Building all apps and packages with Turborepo..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_info "Build completed successfully!"
    else
        print_error "Build failed!"
        exit 1
    fi
}

# Main deployment flow
main() {
    print_info "Starting deployment process..."
    echo ""
    
    # Option to build first
    read -p "Do you want to build all apps first? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        build_with_turbo
        echo ""
    fi
    
    # Deploy all apps
    print_info "Deploying all apps to Vercel..."
    echo ""
    
    deploy_app "feature-flags"
    deploy_app "onboarding"
    deploy_app "approvals"
    deploy_app "release"
    
    print_info "All apps deployed successfully! 🎉"
}

# Check if script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
