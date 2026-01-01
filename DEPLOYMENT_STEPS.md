# 🚀 Quick Deployment Steps

Follow these steps in order. Most are automated!

## Step 1: Deploy Frontend (AUTOMATED) ✅

Run the automated script:
```powershell
.\deploy.ps1
```

This will:
- ✅ Install Vercel CLI
- ✅ Open browser for Vercel login (you just click "Continue")
- ✅ Build your frontend
- ✅ Deploy to Vercel
- ✅ Give you a live URL

**Save the Vercel URL** - you'll need it!

---

## Step 2: Set Up MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google (fastest)
3. Click "Build a Database"
4. Choose **FREE M0** cluster
5. Click "Create"
6. Create a database user:
   - Username: `votingadmin`
   - Password: Click "Autogenerate" and **SAVE IT**
7. Click "Choose a connection method" → "Drivers"
8. Copy the connection string (looks like: `mongodb+srv://votingadmin:password@cluster0.xxxxx.mongodb.net/`)
9. **SAVE THIS CONNECTION STRING**

---

## Step 3: Set Up Infura (2 minutes)

1. Go to https://infura.io
2. Sign up (free)
3. Create New Project → Name: "Voting System"
4. Click on your project
5. Under "ETHEREUM", select **Sepolia**
6. Copy the API endpoint URL
7. Extract just the API KEY (last part after `/v3/`)
8. **SAVE THE API KEY**

---

## Step 4: Get Sepolia Test ETH (2 minutes)

1. Open MetaMask
2. Switch to Sepolia Test Network
   - If you don't see it, go to Settings → Advanced → Show test networks
3. Copy your wallet address
4. Go to https://sepoliafaucet.com
5. Paste your address and request ETH
6. Wait 1-2 minutes for it to arrive
7. Also get your MetaMask private key:
   - Click 3 dots → Account Details → Export Private Key
   - **SAVE THIS SECURELY** (needed for contract deployment)

---

## Step 5: Deploy Smart Contracts (AUTOMATED)

Create `contracts/.env` file with:
```env
INFURA_API_KEY=your_infura_api_key_here
PRIVATE_KEY=your_metamask_private_key_here
```

Then run:
```powershell
cd contracts
npx hardhat run scripts/deploy.js --network sepolia
```

**SAVE THE CONTRACT ADDRESS** shown in the output!

---

## Step 6: Deploy Backend to Railway (10 minutes)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `Blockchain-Voting-System` repo
5. Click "Add variables" and paste these:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<your MongoDB connection string from Step 2>
JWT_SECRET=super_secret_key_change_this_to_something_random_and_long_at_least_32_chars
JWT_EXPIRE=7d
BLOCKCHAIN_NETWORK_URL=https://sepolia.infura.io/v3/<your Infura API key>
CONTRACT_ADDRESS=<contract address from Step 5>
FRONTEND_URL=<your Vercel URL from Step 1>
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

6. In Settings → Set "Root Directory" to `backend`
7. Railway will auto-deploy
8. Go to Settings → Networking → Generate Domain
9. **SAVE YOUR RAILWAY URL**

---

## Step 7: Update Frontend Environment

1. Go back to Vercel dashboard
2. Click on your project → Settings → Environment Variables
3. Add:
```
REACT_APP_API_URL=<your Railway backend URL>
REACT_APP_BLOCKCHAIN_NETWORK_ID=11155111
```
4. Redeploy: Deployments → Click "..." → Redeploy

---

## Step 8: Create Admin Account

1. Go to your live Vercel URL
2. Register a new account with email `admin@example.com`
3. Go to MongoDB Atlas → Browse Collections → Find the `users` collection
4. Click "Update" on your user and set:
```json
{ "role": "admin", "isVerified": true }
```
5. Refresh and login - you're now admin!

---

## ✅ Done! Your app is live!

**Live URLs:**
- Frontend: `<your-vercel-url>`
- Backend: `<your-railway-url>`
- Contract: `https://sepolia.etherscan.io/address/<contract-address>`

**To Use:**
1. Make sure MetaMask is on **Sepolia** network
2. Go to your Vercel URL
3. Create elections as admin
4. Vote and test!

---

## Troubleshooting

**Frontend shows "Cannot connect to backend":**
- Check REACT_APP_API_URL in Vercel settings
- Make sure Railway backend is running

**MetaMask transaction fails:**
- Make sure you're on Sepolia network
- Make sure you have test ETH
- Try resetting MetaMask: Settings → Advanced → Reset Account

**Need help?** Check the detailed DEPLOYMENT.md file!
