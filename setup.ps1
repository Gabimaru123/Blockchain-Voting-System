# ============================================
# 🚀 Blockchain Voting System - Setup Script
# ============================================
# This script sets up the entire project with all dependencies

Write-Host ""
Write-Host "🗳️  Blockchain Voting System - Automated Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command {
    param($Command)
    try {
        if (Get-Command $Command -ErrorAction Stop) {
            return $true
        }
    } catch {
        return $false
    }
}

# Function to print status messages
function Write-Status {
    param($Message, $Type = "Info")
    $timestamp = Get-Date -Format "HH:mm:ss"
    switch ($Type) {
        "Success" { Write-Host "[$timestamp] ✅ $Message" -ForegroundColor Green }
        "Error"   { Write-Host "[$timestamp] ❌ $Message" -ForegroundColor Red }
        "Warning" { Write-Host "[$timestamp] ⚠️  $Message" -ForegroundColor Yellow }
        "Info"    { Write-Host "[$timestamp] ℹ️  $Message" -ForegroundColor Cyan }
    }
}

# Step 1: Check Prerequisites
Write-Host "Step 1: Checking Prerequisites..." -ForegroundColor Yellow
Write-Host ""

# Check Node.js
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Status "Node.js is installed: $nodeVersion" "Success"
} else {
    Write-Status "Node.js is NOT installed!" "Error"
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Recommended version: v16 or higher" -ForegroundColor Yellow
    exit 1
}

# Check npm
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Status "npm is installed: v$npmVersion" "Success"
} else {
    Write-Status "npm is NOT installed (should come with Node.js)" "Error"
    exit 1
}

Write-Host ""

# Step 2: Check MongoDB (optional)
Write-Host "Step 2: Checking MongoDB..." -ForegroundColor Yellow
Write-Host ""

$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService) {
    if ($mongoService.Status -eq "Running") {
        Write-Status "MongoDB service is running" "Success"
    } else {
        Write-Status "MongoDB service exists but is not running" "Warning"
        Write-Host "  You can start it with: net start MongoDB" -ForegroundColor Gray
    }
} else {
    Write-Status "MongoDB not found locally" "Warning"
    Write-Host "  No problem! You can use MongoDB Atlas (cloud) instead" -ForegroundColor Gray
    Write-Host "  Or install MongoDB from: https://www.mongodb.com/try/download/community" -ForegroundColor Gray
}

Write-Host ""

# Step 3: Install Dependencies
Write-Host "Step 3: Installing Dependencies..." -ForegroundColor Yellow
Write-Host ""

Write-Status "Installing root dependencies..." "Info"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Status "Root dependencies installed" "Success"
} else {
    Write-Status "Failed to install root dependencies" "Error"
    exit 1
}

Write-Status "Installing contract dependencies..." "Info"
cd contracts
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Status "Contract dependencies installed" "Success"
} else {
    Write-Status "Failed to install contract dependencies" "Error"
    cd ..
    exit 1
}
cd ..

Write-Status "Installing backend dependencies..." "Info"
cd backend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Status "Backend dependencies installed" "Success"
} else {
    Write-Status "Failed to install backend dependencies" "Error"
    cd ..
    exit 1
}
cd ..

Write-Status "Installing frontend dependencies..." "Info"
cd frontend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Status "Frontend dependencies installed" "Success"
} else {
    Write-Status "Failed to install frontend dependencies" "Error"
    cd ..
    exit 1
}
cd ..

Write-Host ""

# Step 4: Create Environment Files
Write-Host "Step 4: Setting Up Environment Files..." -ForegroundColor Yellow
Write-Host ""

# Check and create backend .env
if (!(Test-Path "backend\.env")) {
    Write-Status "Creating backend .env file..." "Info"
    Copy-Item "backend\.env.example" "backend\.env" -ErrorAction SilentlyContinue
    if (Test-Path "backend\.env") {
        Write-Status "Backend .env created (please review and update if needed)" "Success"
    } else {
        Write-Status "Could not create backend .env file" "Warning"
    }
} else {
    Write-Status "Backend .env already exists" "Success"
}

# Check and create frontend .env
if (!(Test-Path "frontend\.env")) {
    Write-Status "Creating frontend .env file..." "Info"
    Copy-Item "frontend\.env.example" "frontend\.env" -ErrorAction SilentlyContinue
    if (Test-Path "frontend\.env") {
        Write-Status "Frontend .env created" "Success"
    } else {
        Write-Status "Could not create frontend .env file" "Warning"
    }
} else {
    Write-Status "Frontend .env already exists" "Success"
}

Write-Host ""

# Step 5: Compile Smart Contracts
Write-Host "Step 5: Compiling Smart Contracts..." -ForegroundColor Yellow
Write-Host ""

cd contracts
Write-Status "Compiling Solidity contracts..." "Info"
npx hardhat compile
if ($LASTEXITCODE -eq 0) {
    Write-Status "Smart contracts compiled successfully" "Success"
} else {
    Write-Status "Failed to compile smart contracts" "Error"
    cd ..
    exit 1
}
cd ..

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Review environment files:" -ForegroundColor White
Write-Host "     - backend\.env" -ForegroundColor Gray
Write-Host "     - frontend\.env" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Start the system:" -ForegroundColor White
Write-Host "     .\start-local.ps1" -ForegroundColor Green
Write-Host ""
Write-Host "  3. Or start services manually:" -ForegroundColor White
Write-Host "     Terminal 1: cd contracts && npx hardhat node" -ForegroundColor Gray
Write-Host "     Terminal 2: cd contracts && npx hardhat run scripts/deploy.js --network localhost" -ForegroundColor Gray
Write-Host "     Terminal 3: cd backend && npm run dev" -ForegroundColor Gray
Write-Host "     Terminal 4: cd frontend && npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "Need help? Check START_SYSTEM.md" -ForegroundColor Yellow
Write-Host ""
