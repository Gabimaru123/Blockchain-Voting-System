# 🤖 Automated Deployment Guide

This guide explains how to set up fully automated deployments for your Blockchain Voting System.

## 🎯 Overview

Your project now has automated CI/CD pipelines that will:
- ✅ Automatically test your code on every push
- ✅ Automatically deploy frontend to Vercel when frontend code changes
- ✅ Automatically deploy backend to Railway when backend code changes
- ✅ Run tests and linting before deployment
- ✅ Provide deployment status updates

## 📋 Setup Instructions

### Step 1: Configure GitHub Secrets

You need to add secrets to your GitHub repository for automated deployments.

#### For Vercel (Frontend):

1. **Get Vercel Token:**
   - Go to https://vercel.com/account/tokens
   - Create a new token
   - Copy the token

2. **Get Vercel Project IDs:**
   - Go to your Vercel project settings
   - Go to "General" tab
   - Copy "Project ID" and "Organization ID"

3. **Add GitHub Secrets:**
   - Go to your GitHub repository
   - Click "Settings" → "Secrets and variables" → "Actions"
   - Click "New repository secret" and add:
     - `VERCEL_TOKEN` - Your Vercel token
     - `VERCEL_ORG_ID` - Your Vercel organization ID
     - `VERCEL_PROJECT_ID` - Your Vercel project ID
     - `REACT_APP_API_URL` - Your backend API URL (e.g., `https://your-backend.railway.app`)
     - `REACT_APP_BLOCKCHAIN_NETWORK_ID` - Your blockchain network ID (e.g., `31337`)

#### For Railway (Backend):

1. **Get Railway Token:**
   - Go to https://railway.app/account
   - Click "New Token"
   - Copy the token

2. **Get Railway Service ID:**
   - Go to your Railway project
   - Click on your backend service
   - Copy the Service ID from the URL or settings

3. **Add GitHub Secrets:**
   - Add to GitHub Secrets:
     - `RAILWAY_TOKEN` - Your Railway token
     - `RAILWAY_SERVICE_ID` - Your Railway service ID

### Step 2: Enable GitHub Actions

GitHub Actions are automatically enabled when you push the workflow files. No additional setup needed!

### Step 3: Test the Automation

1. **Make a small change** to your frontend or backend code
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. **Check GitHub Actions:**
   - Go to your GitHub repository
   - Click "Actions" tab
   - You should see workflows running
4. **Monitor deployments:**
   - Frontend: Check Vercel dashboard
   - Backend: Check Railway dashboard

## 🔄 How It Works

### Frontend Deployment (`deploy-frontend.yml`)

**Triggers:**
- Push to `main` or `master` branch with changes in `frontend/` directory
- Pull requests to `main` or `master` branch
- Manual trigger via GitHub Actions UI

**Process:**
1. Checks out code
2. Sets up Node.js 18
3. Installs dependencies with `--legacy-peer-deps`
4. Runs tests (if any)
5. Builds the React app
6. Deploys to Vercel
7. Comments on PR with deployment status (if PR)

### Backend Deployment (`deploy-backend.yml`)

**Triggers:**
- Push to `main` or `master` branch with changes in `backend/` directory
- Manual trigger via GitHub Actions UI

**Process:**
1. Checks out code
2. Sets up Node.js 18
3. Installs dependencies
4. Runs tests (if any)
5. Deploys to Railway

### CI Pipeline (`ci.yml`)

**Triggers:**
- Every push to `main`, `master`, or `develop`
- Every pull request

**Process:**
- Runs tests for both frontend and backend
- Runs linters
- Builds applications to verify they compile
- Does NOT deploy (only tests)

## 🛠️ Manual Deployment Scripts

If you prefer manual deployment, use the provided scripts:

### Windows (PowerShell):
```powershell
.\scripts\deploy.ps1 -Target frontend
.\scripts\deploy.ps1 -Target backend
.\scripts\deploy.ps1 -Target both
```

### Linux/Mac (Bash):
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## 📊 Monitoring Deployments

### GitHub Actions Dashboard
- Go to your repository → "Actions" tab
- See all workflow runs and their status
- Click on a run to see detailed logs

### Vercel Dashboard
- Go to https://vercel.com/dashboard
- See deployment history and logs
- View preview URLs for each deployment

### Railway Dashboard
- Go to https://railway.app/dashboard
- See deployment logs and status
- Monitor service health

## 🔧 Troubleshooting

### Deployment Fails

1. **Check GitHub Actions logs:**
   - Go to Actions → Failed workflow → Click on failed job
   - Review error messages

2. **Verify Secrets:**
   - Ensure all required secrets are set correctly
   - Check token expiration dates

3. **Check Build Logs:**
   - Frontend: Check Vercel build logs
   - Backend: Check Railway deployment logs

### Secrets Not Working

- Ensure secret names match exactly (case-sensitive)
- Verify tokens are valid and not expired
- Check that tokens have correct permissions

### Tests Failing

- Tests are set to pass even if no tests exist (`--passWithNoTests`)
- If you have tests, ensure they pass locally first
- Check test configuration in `package.json`

## 🚀 Quick Start

1. **Add all GitHub secrets** (see Step 1 above)
2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Add automated deployment workflows"
   git push origin main
   ```
3. **Watch the magic happen!** 🎉

## 📝 Workflow Files

- `.github/workflows/deploy-frontend.yml` - Frontend deployment
- `.github/workflows/deploy-backend.yml` - Backend deployment
- `.github/workflows/ci.yml` - Continuous Integration (testing)

## 🎓 Best Practices

1. **Always test locally** before pushing
2. **Use feature branches** for development
3. **Create pull requests** to trigger CI checks
4. **Monitor deployment logs** for issues
5. **Keep secrets secure** - never commit them to git

## 🔐 Security Notes

- All secrets are encrypted by GitHub
- Secrets are only available to GitHub Actions workflows
- Never commit secrets or tokens to your repository
- Rotate tokens periodically for security

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Check Vercel/Railway deployment logs
3. Verify all secrets are configured correctly
4. Ensure your code builds successfully locally

---

**Happy Deploying! 🚀**

