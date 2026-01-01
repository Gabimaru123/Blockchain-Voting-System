# 🚀 Local Development Setup Guide

This guide will help you set up and run the Blockchain Voting System on your local machine.

## Prerequisites

Before you begin, make sure you have:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org)
- ✅ **MetaMask** Browser Extension - [Install](https://metamask.io)
- ✅ **MongoDB** (Optional - can use MongoDB Atlas)
  - Local: [Install MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas/register)
- ✅ **Git** - [Download](https://git-scm.com/)

## Quick Start (5 Minutes)

### 1. Install Dependencies

Run the setup script to install all dependencies:

```powershell
.\setup.ps1
```

This automatically installs dependencies for:
- Root project (concurrently)
- Frontend (React)
- Backend (Express)
- Smart Contracts (Hardhat)

### 2. Configure MongoDB

**Option A: Local MongoDB**
1. Start MongoDB service:
   ```powershell
   mongod
   ```
2. The default connection string in `backend/.env` should work: `mongodb://localhost:27017/blockchain_voting`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `backend/.env`:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

### 3. Start All Services

Run the start script to launch everything:

```powershell
.\start-local.ps1
```

This opens 4 terminal windows:
1. **Hardhat Network** - Local blockchain (port 8545)
2. **Contract Deployment** - Deploys smart contracts
3. **Backend Server** - API server (port 5000)
4. **Frontend App** - React app (port 3000)

### 4. Configure MetaMask

1. Open MetaMask extension
2. Click network dropdown → "Add Network" → "Add a network manually"
3. Enter:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH
4. Click "Save"

### 5. Import Test Account

From the Hardhat Network terminal window, copy one of the private keys displayed.

In MetaMask:
1. Click account icon → "Import Account"
2. Paste the private key
3. You now have test ETH!

### 6. Access the Application

Open your browser and go to: **http://localhost:3000**

---

## Manual Setup (Step by Step)

If you prefer to set up manually or if the automated script doesn't work:

### Step 1: Install Dependencies

```powershell
# Root dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..

# Backend dependencies
cd backend
npm install
cd ..

# Contract dependencies
cd contracts
npm install
cd ..
```

### Step 2: Configure Environment Files

All `.env` files have been created from examples. Review and update if needed:

- `frontend/.env` - Frontend configuration
- `backend/.env` - Backend configuration  
- `contracts/.env` - Smart contract deployment

### Step 3: Start Hardhat Network

```powershell
cd contracts
npx hardhat node
```

Keep this terminal open. Note the test accounts and private keys displayed.

### Step 4: Deploy Smart Contracts

Open a new terminal:

```powershell
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

Copy the displayed contract address.

### Step 5: Update Backend Configuration

Update `backend/.env` with the contract address:

```
CONTRACT_ADDRESS=<paste_contract_address_here>
```

### Step 6: Start Backend Server

```powershell
cd backend
npm run dev
```

Server should start on http://localhost:5000

### Step 7: Start Frontend

```powershell
cd frontend
npm start
```

Application should open at http://localhost:3000

---

## 🔍 Troubleshooting

### MetaMask Not Connecting

**Issue**: "MetaMask not detected"
- **Solution**: Make sure MetaMask extension is installed and enabled
- **Solution**: Try refreshing the page after installing MetaMask

**Issue**: "Wrong network" error
- **Solution**: Switch MetaMask to "Hardhat Local" network (Chain ID: 31337)
- **Solution**: Make sure Hardhat node is running on port 8545

### Backend Errors

**Issue**: "MongoDB connection failed"
- **Solution**: Make sure MongoDB is running (`mongod` command)
- **Solution**: Check connection string in `backend/.env`
- **Solution**: For Atlas, make sure your IP is whitelisted

**Issue**: "Contract address not found"
- **Solution**: Make sure you've deployed contracts first
- **Solution**: Copy the contract address from deployment output
- **Solution**: Update `backend/.env` with `CONTRACT_ADDRESS`

### Frontend Errors

**Issue**: "Cannot connect to backend"
- **Solution**: Make sure backend is running on port 5000
- **Solution**: Check `REACT_APP_API_URL` in `frontend/.env`

**Issue**: "Contract not loaded"
- **Solution**: Make sure contracts are deployed
- **Solution**: Check `frontend/src/contracts/` folder has deployment files
- **Solution**: Redeploy contracts if files are missing

### Contract Deployment Errors

**Issue**: "Network connection error"
- **Solution**: Make sure Hardhat network is running first
- **Solution**: Check if port 8545 is available

**Issue**: "Insufficient funds"
- **Solution**: Use the default Hardhat accounts (they have test ETH)
- **Solution**: The private key in `contracts/.env` should be from Hardhat's test accounts

---

## 📝 Development Workflow

### Making Changes to Smart Contracts

1. Edit contracts in `contracts/contracts/`
2. Recompile: `npx hardhat compile`
3. Stop and restart Hardhat network
4. Redeploy: `npx hardhat run scripts/deploy.js --network localhost`
5. Update `backend/.env` with new contract address
6. Restart backend server

### Testing Smart Contracts

```powershell
cd contracts
npx hardhat test
```

### Creating an Admin Account

1. Register a new account on the frontend
2. Open MongoDB Compass or mongosh
3. Find your user in the `users` collection
4. Update the user document:
   ```json
   {
     "role": "admin",
     "isVerified": true
   }
   ```
5. Refresh the page - you now have admin access!

---

## 🎯 Next Steps

Once everything is running:

1. **Create Elections** - Use the admin dashboard to create elections
2. **Add Candidates** - Add candidates to your elections  
3. **Test Voting** - Try voting with different accounts
4. **View Results** - Check real-time results and blockchain verification
5. **Explore Features** - Test voter anonymity, real-time updates, etc.

---

## 💡 Tips

- **Multiple Accounts**: Import multiple Hardhat test accounts into MetaMask to simulate different voters
- **Network Issues**: If MetaMask shows "Nonce too high", go to Settings → Advanced → Reset Account
- **Fresh Start**: To reset everything, delete all `node_modules` folders and run `.\setup.ps1` again
- **Database Reset**: To start fresh, drop the MongoDB database or delete data manually

---

## 📚 Additional Resources

- **Hardhat Documentation**: https://hardhat.org/docs
- **Web3.js Documentation**: https://web3js.readthedocs.io
- **MetaMask Documentation**: https://docs.metamask.io
- **MongoDB Documentation**: https://docs.mongodb.com

---

## 🆘 Getting Help

If you encounter issues:

1. Check the terminal outputs for error messages
2. Review this troubleshooting section
3. Check browser console for frontend errors
4. Verify all services are running
5. Make sure all environment variables are set correctly

---

**Happy Voting! 🗳️**
