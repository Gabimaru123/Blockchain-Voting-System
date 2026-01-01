# Automated Deployment Script for Windows (PowerShell)
# Blockchain Voting System

Write-Host "🚀 Starting Automated Deployment for Blockchain Voting System" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Cyan

Write-Host "`n📋 Step 1: Vercel CLI Installation" -ForegroundColor Yellow
Write-Host "Checking Vercel CLI..."

if (Get-Command vercel -ErrorAction SilentlyContinue) {
    Write-Host "✓ Vercel CLI already installed" -ForegroundColor Green
} else {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "`n📋 Step 2: Login to Vercel" -ForegroundColor Yellow
Write-Host "Opening browser for Vercel authentication..."
Write-Host "Please login to your Vercel account in the browser" -ForegroundColor Yellow

vercel login

Write-Host "`n📋 Step 3: Deploy Frontend to Vercel" -ForegroundColor Yellow
Write-Host "Building and deploying frontend..."

Set-Location frontend

# Build frontend
Write-Host "Building frontend..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend build successful" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend build failed" -ForegroundColor Red
    exit 1
}

# Deploy to Vercel
Write-Host "`nDeploying to Vercel..." -ForegroundColor Cyan
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend deployed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Deployment failed" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "`n✓ Automated deployment completed!" -ForegroundColor Green
Write-Host "`n📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Save your Vercel URL (shown above)"
Write-Host "2. Create MongoDB Atlas account: https://www.mongodb.com/cloud/atlas/register"
Write-Host "3. Create Infura account: https://infura.io"
Write-Host "4. Get Sepolia test ETH: https://sepoliafaucet.com"
Write-Host "5. Follow DEPLOYMENT_STEPS.md for backend deployment"
Write-Host "`nSee the complete guide in DEPLOYMENT_STEPS.md" -ForegroundColor Cyan
