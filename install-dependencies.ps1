# =============================================
# 📦 Install All Dependencies  
# =============================================
# Quickly install all project dependencies

Write-Host ""
Write-Host "📦 Installing Dependencies for Blockchain Voting System" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"

function Write-Status {
    param($Message, $Type = "Info")
    switch ($Type) {
        "Success" { Write-Host "✅ $Message" -ForegroundColor Green }
        "Error"   { Write-Host "❌ $Message" -ForegroundColor Red }
        "Info"    { Write-Host "📦 $Message" -ForegroundColor Cyan }
    }
}

try {
    # Root dependencies
    Write-Status "Installing root dependencies..." "Info"
    npm install
    Write-Status "Root dependencies installed" "Success"
    Write-Host ""

    # Contracts
    Write-Status "Installing contract dependencies..." "Info"
    Set-Location contracts
    npm install
    Set-Location ..
    Write-Status "Contract dependencies installed" "Success"
    Write-Host ""

    # Backend
    Write-Status "Installing backend dependencies..." "Info"
    Set-Location backend
    npm install
    Set-Location ..
    Write-Status "Backend dependencies installed" "Success"
    Write-Host ""

    # Frontend
    Write-Status "Installing frontend dependencies..." "Info"
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Status "Frontend dependencies installed" "Success"
    Write-Host ""

    Write-Host "=======================================================" -ForegroundColor Green
    Write-Status "All dependencies installed successfully!" "Success"
    Write-Host "=======================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next: Run .\setup.ps1 to complete configuration" -ForegroundColor Yellow
    Write-Host ""

} catch {
    Write-Status "Error installing dependencies: $_" "Error"
    Set-Location $PSScriptRoot
    exit 1
}
