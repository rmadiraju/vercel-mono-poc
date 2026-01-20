#!/bin/bash

# Script to build all apps and packages using Turborepo

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get the root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

print_info "Building all apps and packages with Turborepo..."
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_info "Installing dependencies..."
    npm install
    echo ""
fi

# Build with Turbo
print_info "Running Turborepo build..."
npm run build

if [ $? -eq 0 ]; then
    print_info "✅ Build completed successfully!"
    echo ""
    print_info "Build outputs:"
    echo "  - apps/feature-flags/.next"
    echo "  - apps/onboarding/.next"
    echo "  - apps/approvals/.next"
    echo "  - apps/release/.next"
else
    print_error "❌ Build failed!"
    exit 1
fi
