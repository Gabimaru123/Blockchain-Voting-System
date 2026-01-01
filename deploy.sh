#!/bin/bash
# Automated Deployment Script for Blockchain Voting System
# This script automates as much of the deployment as possible

echo "🚀 Starting Automated Deployment for Blockchain Voting System"
echo "=============================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "${YELLOW}📋 Step 1: Prerequisites Check${NC}"
echo "Checking if required tools are installed..."

# Check Node.js
if command -v node &> /dev/null; then
    echo "${GREEN}✓${NC} Node.js installed: $(node --version)"
else
    echo "${RED}✗${NC} Node.js not found. Please install from https://nodejs.org"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "${GREEN}✓${NC} npm installed: $(npm --version)"
else
    echo "${RED}✗${NC} npm not found"
    exit 1
fi

# Check Vercel CLI
if command -v vercel &> /dev/null; then
    echo "${GREEN}✓${NC} Vercel CLI installed"
else
    echo "${YELLOW}!${NC} Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "${YELLOW}📋 Step 2: Frontend Deployment to Vercel${NC}"
echo "==========================================="

cd frontend

echo "Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "${GREEN}✓${NC} Frontend build successful"
else
    echo "${RED}✗${NC} Frontend build failed"
    exit 1
fi

echo ""
echo "Deploying to Vercel..."
echo "${YELLOW}Note: You'll need to login to Vercel in the browser${NC}"

vercel --prod

if [ $? -eq 0 ]; then
    echo "${GREEN}✓${NC} Frontend deployed to Vercel successfully!"
    echo "Please save your Vercel URL for environment configuration"
else
    echo "${RED}✗${NC} Vercel deployment failed"
    exit 1
fi

cd ..

echo ""
echo "${GREEN}✓${NC} Automated deployment script completed!"
echo ""
echo "${YELLOW}Next Steps (Manual):${NC}"
echo "1. Save your Vercel frontend URL"
echo "2. Create MongoDB Atlas account and get connection string"
echo "3. Create Infura account and get API key"
echo "4. Deploy smart contracts to Sepolia testnet"
echo "5. Deploy backend to Railway"
echo ""
echo "See DEPLOYMENT_STEPS.md for detailed instructions"
