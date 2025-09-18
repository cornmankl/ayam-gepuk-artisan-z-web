#!/bin/bash

# Ayam Gepuk Artisan - Vercel Deployment Script
# Usage: ./scripts/deploy.sh [preview|production]

set -e

DEPLOY_TYPE=${1:-preview}

echo "🚀 Starting Ayam Gepuk Artisan deployment..."
echo "📦 Deployment type: $DEPLOY_TYPE"

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔑 Please log in to Vercel:"
    vercel login
fi

echo "🔍 Checking project configuration..."

# Check if required files exist
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found!"
    exit 1
fi

if [ ! -f ".env.example" ]; then
    echo "❌ .env.example not found!"
    exit 1
fi

echo "✅ Configuration files found"

# Build the project locally first
echo "🏗️  Building project locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Local build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Local build successful"

# Deploy based on type
if [ "$DEPLOY_TYPE" = "production" ] || [ "$DEPLOY_TYPE" = "prod" ]; then
    echo "🚀 Deploying to production..."
    vercel --prod
else
    echo "🔍 Deploying preview..."
    vercel
fi

echo "✅ Deployment complete!"
echo ""
echo "📝 Post-deployment checklist:"
echo "  1. Set up environment variables in Vercel dashboard"
echo "  2. Configure production database"
echo "  3. Test all major functionality"
echo "  4. Update DNS settings (if using custom domain)"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"