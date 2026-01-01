# Blockchain Voting System - Start Local Development
# This script starts all services for local development

Write-Host "🚀 Starting Blockchain Voting System (Local Development)" -ForegroundColor Cyan
Write-Host ""

# Function to check if a port is in use
function Test-Port {
    param($Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    return $connection.TcpTestSucceeded
}

# Check if ports are available
Write-Host "Checking ports..." -ForegroundColor Yellow
if (Test-Port 8545) {
    Write-Host "⚠️  Port 8545 is already in use. Please stop the service using it." -ForegroundColor Yellow
}
if (Test-Port 5000) {
    Write-Host "⚠️  Port 5000 is already in use. Please stop the service using it." -ForegroundColor Yellow
}
if (Test-Port 3000) {
    Write-Host "⚠️  Port 3000 is already in use. Please stop the service using it." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Starting services in order..." -ForegroundColor Cyan
Write-Host ""

# Instructions
Write-Host "This will open 4 terminal windows:" -ForegroundColor Yellow
Write-Host "  1️⃣  Hardhat Network (port 8545)" -ForegroundColor White
Write-Host "  2️⃣  Contract Deployment" -ForegroundColor White
Write-Host "  3️⃣  Backend Server (port 5000)" -ForegroundColor White
Write-Host "  4️⃣  Frontend App (port 3000)" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Start Hardhat Network
Write-Host ""
Write-Host "Starting Hardhat Network..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'contracts'; Write-Host '🔗 Starting Hardhat Network...' -ForegroundColor Cyan; npx hardhat node"

Write-Host "⏳ Waiting for Hardhat network to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Deploy Contracts
Write-Host ""
Write-Host "Deploying Smart Contracts..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'contracts'; Write-Host '📝 Deploying contracts...' -ForegroundColor Cyan; Start-Sleep -Seconds 2; npx hardhat run scripts/deploy.js --network localhost; Write-Host ''; Write-Host '✅ Contracts deployed! Copy the contract address above.' -ForegroundColor Green; Write-Host '📋 Update backend/.env with CONTRACT_ADDRESS' -ForegroundColor Yellow"

Write-Host "⏳ Waiting for contract deployment..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Start Backend
Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend'; Write-Host '🖥️  Starting Backend Server...' -ForegroundColor Cyan; npm run dev"

Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Frontend
Write-Host ""
Write-Host "Starting Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'frontend'; Write-Host '⚛️  Starting Frontend...' -ForegroundColor Cyan; npm start"

Write-Host ""
Write-Host "✅ All services are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Access your application at:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   Blockchain: http://localhost:8545" -ForegroundColor White
Write-Host ""
Write-Host "📝 Important:" -ForegroundColor Yellow
Write-Host "   1. Check the deployment window for the CONTRACT_ADDRESS" -ForegroundColor White
Write-Host "   2. Update backend/.env with the CONTRACT_ADDRESS" -ForegroundColor White
Write-Host "   3. Restart the backend if you update the .env file" -ForegroundColor White
Write-Host ""
Write-Host "To stop all services, close the terminal windows." -ForegroundColor Cyan
