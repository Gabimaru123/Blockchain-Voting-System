# 🔍 Setup Verification Guide

This guide helps you verify that all components of the Blockchain Voting System are properly configured and ready to run.

## Quick Verification

Run the automated verification script:

```powershell
.\test-setup.ps1
```

This script will check:
- ✅ Node.js and npm installation
- ✅ All npm dependencies
- ✅ Environment files
- ✅ MongoDB availability
- ✅ Smart contract compilation
- ✅ Configuration files

## Manual Verification Checklist

### 1. Prerequisites

**Node.js** (v16 or higher)
```powershell
node --version
# Should output: v16.x.x or higher
```

**npm**
```powershell
npm --version
# Should output: 8.x.x or higher
```

### 2. Dependencies

Check if `node_modules` folders exist in:
- Root directory: `./node_modules`
- Contracts: `./contracts/node_modules`
- Backend: `./backend/node_modules`
- Frontend: `./frontend/node_modules`

If any are missing, run:
```powershell
.\install-dependencies.ps1
```

### 3. Environment Files

**Backend** (`backend/.env`):
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blockchain_voting
JWT_SECRET=your_secret_key
BLOCKCHAIN_NETWORK_URL=http://127.0.0.1:8545
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_BLOCKCHAIN_NETWORK_ID=31337
```

### 4. MongoDB

**Option A: Local MongoDB**
```powershell
# Check if MongoDB service exists
Get-Service -Name MongoDB

# Start MongoDB
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `backend/.env` with your Atlas connection string

### 5. Smart Contracts

Compile the contracts:
```powershell
cd contracts
npx hardhat compile
```

Should create `artifacts/` folder with compiled contracts.

## Component Testing

### Test 1: Blockchain Network

```powershell
cd contracts
npx hardhat node
```

**Expected Output:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

Leave this running in a terminal.

### Test 2: Contract Deployment

In a new terminal:
```powershell
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

**Expected Output:**
```
VotingSystem deployed to: 0x...
```

Copy the contract address for later use.

### Test 3: Backend Server

```powershell
cd backend
npm run dev
```

**Expected Output:**
```
🚀 Server started on port 5000
✅ MongoDB connected successfully
```

### Test 4: Frontend Application

```powershell
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view frontend in the browser.
  Local:            http://localhost:3000
```

## Full Workflow Test

### 1. User Registration

1. Open http://localhost:3000
2. Click "Register"
3. Fill in details and create account
4. Verify account is created in MongoDB

**Check MongoDB:**
```powershell
mongosh
use blockchain_voting
db.users.find()
```

### 2. Admin Login

Default admin credentials (if configured):
- Email: `admin@firstvote.com`
- Password: `admin123`

### 3. Create Election

1. Login as admin
2. Go to Admin Dashboard
3. Click "Create Election"
4. Add election details and candidates
5. Deploy to blockchain (MetaMask required)

### 4. Vote

1. Go to voting URL (e.g., http://localhost:3000/vote/:electionId)
2. Fill in voter details
3. Select a candidate
4. Connect MetaMask
5. Submit vote

### 5. View Results

1. Go to results page
2. Verify real-time vote counts
3. Check transaction hashes

## Common Issues & Solutions

### Issue: MongoDB Connection Error

**Solution 1:** Start MongoDB service
```powershell
net start MongoDB
```

**Solution 2:** Use MongoDB Atlas
Update `backend/.env` with Atlas connection string

### Issue: Port Already in Use

**Check which process is using a port:**
```powershell
netstat -ano | findstr :3000
```

**Kill the process:**
```powershell
Stop-Process -Id <PID> -Force
```

### Issue: MetaMask Transaction Failed

**Solution:**
1. Go to MetaMask Settings → Advanced → Reset Account
2. Ensure you're connected to "Localhost 8545"
3. Make sure Hardhat node is running

### Issue: Smart Contract Not Found

**Solution:**
```powershell
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

Copy the new contract address and update `frontend/src/config/contracts.js`

### Issue: CORS Errors

**Solution:**
Verify `backend/.env` has:
```
FRONTEND_URL=http://localhost:3000
```

Restart backend server after changing.

## Performance Checks

### Backend Response Time

```powershell
curl http://localhost:5000/api/health
```

Should respond in < 100ms

### Frontend Load Time

Open http://localhost:3000 and check browser dev tools:
- Initial load: < 2 seconds
- Page transitions: < 500ms

### Blockchain Response

```powershell
curl -X POST http://localhost:8545 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

Should respond immediately.

## Ready to Go!

If all tests pass, your system is fully operational! 🎉

Start everything with:
```powershell
.\start-local.ps1
```

Access your application at: **http://localhost:3000**

---

**Need Help?**
- Check [START_SYSTEM.md](./START_SYSTEM.md) for step-by-step guide
- Check [README.md](./README.md) for comprehensive documentation
- Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for production deployment
