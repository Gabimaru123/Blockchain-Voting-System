# Automated Deployment Script for Blockchain Voting System (PowerShell)
# This script helps automate the deployment process

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("frontend", "backend", "both", "cancel")]
    [string]$Target = "both"
)

Write-Host "🚀 Starting deployment process..." -ForegroundColor Blue

# Function to check if command exists
function Test-Command {
    param([string]$Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Blue

if (-not (Test-Command "git")) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Prerequisites check passed" -ForegroundColor Green

# Get current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $currentBranch" -ForegroundColor Blue

# Deploy based on target
switch ($Target) {
    "frontend" {
        Write-Host "Deploying Frontend..." -ForegroundColor Blue
        Set-Location frontend
        npm install --legacy-peer-deps
        npm run build
        Write-Host "✅ Frontend build completed" -ForegroundColor Green
        Write-Host "Note: If using Vercel GitHub integration, push to main branch to auto-deploy" -ForegroundColor Yellow
    }
    "backend" {
        Write-Host "Deploying Backend..." -ForegroundColor Blue
        Set-Location backend
        npm install
        Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
        Write-Host "Note: If using Railway GitHub integration, push to main branch to auto-deploy" -ForegroundColor Yellow
    }
    "both" {
        Write-Host "Deploying both Frontend and Backend..." -ForegroundColor Blue
        
        Write-Host "Building Frontend..." -ForegroundColor Blue
        Set-Location frontend
        npm install --legacy-peer-deps
        npm run build
        Write-Host "✅ Frontend build completed" -ForegroundColor Green
        
        Set-Location ../backend
        npm install
        Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
        
        Write-Host "Note: Push to main branch to trigger automated deployments" -ForegroundColor Yellow
    }
    "cancel" {
        Write-Host "Deployment cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "✅ Deployment process completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Blue
Write-Host "1. Commit your changes: git add . ; git commit -m 'Your message'"
Write-Host "2. Push to main branch: git push origin main"
Write-Host "3. Check deployment status in Vercel/Railway dashboards"

