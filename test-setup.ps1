# =============================================
# 🔍 Setup Verification Script
# =============================================
# Verifies that all components are properly set up

Write-Host ""
Write-Host "🔍 Blockchain Voting System - Setup Verification" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

$ErrorCount = 0
$WarningCount = 0

function Write-Status {
    param($Message, $Type = "Info")
    switch ($Type) {
        "Success" { Write-Host "✅ $Message" -ForegroundColor Green }
        "Error"   { Write-Host "❌ $Message" -ForegroundColor Red; $script:ErrorCount++ }
        "Warning" { Write-Host "⚠️  $Message" -ForegroundColor Yellow; $script:WarningCount++ }
        "Info"    { Write-Host "ℹ️  $Message" -ForegroundColor Cyan }
    }
}

# Test 1: Node.js and npm
Write-Host "Test 1: Checking Node.js and npm..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Status "Node.js installed: $nodeVersion" "Success"
    
    $npmVersion = npm --version
    Write-Status "npm installed: v$npmVersion" "Success"
} catch {
    Write-Status "Node.js or npm not found" "Error"
}
Write-Host ""

# Test 2: Dependencies
Write-Host "Test 2: Checking npm dependencies..." -ForegroundColor Yellow

$folders = @(".", "contracts", "backend", "frontend")
foreach ($folder in $folders) {
    $nodePath = Join-Path $folder "node_modules"
    if (Test-Path $nodePath) {
        Write-Status "$folder dependencies installed" "Success"
    } else {
        Write-Status "$folder dependencies NOT installed - run .\setup.ps1" "Error"
    }
}
Write-Host ""

# Test 3: Environment Files
Write-Host "Test 3: Checking environment files..." -ForegroundColor Yellow

if (Test-Path "backend\.env") {
    Write-Status "Backend .env exists" "Success"
    
    # Check for required variables
    $envContent = Get-Content "backend\.env" -Raw
    $requiredVars = @("PORT", "MONGODB_URI", "JWT_SECRET", "BLOCKCHAIN_NETWORK_URL")
    foreach ($var in $requiredVars) {
        if ($envContent -match $var) {
            Write-Status "  $var found in backend .env" "Success"
        } else {
            Write-Status "  $var missing from backend .env" "Warning"
        }
    }
} else {
    Write-Status "Backend .env NOT found - run .\setup.ps1" "Error"
}

if (Test-Path "frontend\.env") {
    Write-Status "Frontend .env exists" "Success"
} else {
    Write-Status "Frontend .env NOT found - copy from .env.example" "Warning"
}
Write-Host ""

# Test 4: MongoDB
Write-Host "Test 4: Checking MongoDB..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService) {
    if ($mongoService.Status -eq "Running") {
        Write-Status "MongoDB service is running" "Success"
    } else {
        Write-Status "MongoDB installed but not running - start with: net start MongoDB" "Warning"
    }
} else {
    Write-Status "MongoDB not found locally (you can use MongoDB Atlas instead)" "Warning"
}
Write-Host ""

# Test 5: Smart Contracts
Write-Host "Test 5: Checking smart contracts..." -ForegroundColor Yellow
if (Test-Path "contracts\artifacts") {
    Write-Status "Smart contracts compiled (artifacts folder exists)" "Success"
} else {
    Write-Status "Smart contracts NOT compiled - run: npm run compile" "Warning"
}
Write-Host ""

# Test 6: Configuration Files
Write-Host "Test 6: Checking configuration files..." -ForegroundColor Yellow
$configFiles = @(
    "contracts\hardhat.config.js",
    "backend\package.json",
    "frontend\package.json"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Status "$file exists" "Success"
    } else {
        Write-Status "$file NOT found" "Error"
    }
}
Write-Host ""

# Summary
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Verification Summary" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

if ($ErrorCount -eq 0 -and $WarningCount -eq 0) {
    Write-Host ""
    Write-Host "🎉 Perfect! Everything is set up correctly!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now start the system with:" -ForegroundColor Cyan
    Write-Host "  .\start-local.ps1" -ForegroundColor White
    Write-Host ""
} elseif ($ErrorCount -eq 0) {
    Write-Host ""
    Write-Host "✅ Setup is mostly complete with $WarningCount warning(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can start the system, but review warnings above" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Setup incomplete: $ErrorCount error(s), $WarningCount warning(s)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run: .\setup.ps1" -ForegroundColor Yellow
    Write-Host ""
}
Write-Host ""
