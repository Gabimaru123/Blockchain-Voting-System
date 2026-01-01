# Quick Fix - Start Backend Server

## Problem
The backend server is not running, which prevents account registration.

## Solution

### Option 1: Use the automated script
```powershell
.\start-local.ps1
```

### Option 2: Start manually

**Step 1: Check if MongoDB is running**
```powershell
# Check MongoDB service status
Get-Service -Name MongoDB -ErrorAction SilentlyContinue
```

If MongoDB is not installed or not running, you have two options:

**Option A: Use MongoDB Atlas (Recommended - No installation needed)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string_here
   ```

**Option B: Install MongoDB locally**
1. Download: https://www.mongodb.com/try/download/community
2. Install and start the service
3. Keep default connection in `backend/.env`

**Step 2: Start the backend**
```powershell
cd backend
npm run dev
```

**Step 3: Start the frontend**
```powershell
cd frontend
npm start
```

**Step 4: Try registering again**
Go to http://localhost:3000 and create an account!

## What's happening
- Your frontend needs the backend API to create accounts
- Backend stores user data in MongoDB
- Neither service is running right now

## Quick Check
After starting backend, you should see:
```
🚀 Server started on port 5000
✅ MongoDB connected successfully
```

If you see connection errors, MongoDB isn't running/configured properly.
