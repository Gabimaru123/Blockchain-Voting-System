#!/bin/bash

# Automated Deployment Script for Blockchain Voting System
# This script helps automate the deployment process

set -e

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command_exists git; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}Current branch: ${CURRENT_BRANCH}${NC}"

# Ask what to deploy
echo ""
echo "What would you like to deploy?"
echo "1) Frontend only (Vercel)"
echo "2) Backend only (Railway)"
echo "3) Both Frontend and Backend"
echo "4) Cancel"
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo -e "${BLUE}Deploying Frontend...${NC}"
        cd frontend
        npm install --legacy-peer-deps
        npm run build
        echo -e "${GREEN}✅ Frontend build completed${NC}"
        echo -e "${YELLOW}Note: If using Vercel GitHub integration, push to main branch to auto-deploy${NC}"
        ;;
    2)
        echo -e "${BLUE}Deploying Backend...${NC}"
        cd backend
        npm install
        echo -e "${GREEN}✅ Backend dependencies installed${NC}"
        echo -e "${YELLOW}Note: If using Railway GitHub integration, push to main branch to auto-deploy${NC}"
        ;;
    3)
        echo -e "${BLUE}Deploying both Frontend and Backend...${NC}"
        
        echo -e "${BLUE}Building Frontend...${NC}"
        cd frontend
        npm install --legacy-peer-deps
        npm run build
        echo -e "${GREEN}✅ Frontend build completed${NC}"
        
        cd ../backend
        npm install
        echo -e "${GREEN}✅ Backend dependencies installed${NC}"
        
        echo -e "${YELLOW}Note: Push to main branch to trigger automated deployments${NC}"
        ;;
    4)
        echo "Deployment cancelled."
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment process completed!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Commit your changes: git add . && git commit -m 'Your message'"
echo "2. Push to main branch: git push origin main"
echo "3. Check deployment status in Vercel/Railway dashboards"

