# Push to GitHub from Command Line

## Step 1: Create GitHub Repository First

1. Go to: https://github.com/new
2. **Repository name**: `budget-tracker` (or any name)
3. **Visibility**: **Public** (required for free GitHub Pages)
4. **DO NOT** check "Initialize with README"
5. Click **"Create repository"**
6. **Copy the repository URL** (e.g., `https://github.com/YOUR_USERNAME/budget-tracker.git`)

---

## Step 2: Initialize Git and Push

Open **PowerShell** or **Command Prompt** in your project folder:

```powershell
# Navigate to your project folder (if not already there)
cd "C:\Users\50380788\Documents\budget-tracker"

# Initialize Git repository
git init

# Add files to staging (only the files we need)
git add index.html style.css script.js README.md

# Commit the files
git commit -m "Initial commit - Budget Tracker"

# Rename branch to main (if needed)
git branch -M main

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/budget-tracker.git

# Push to GitHub
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Pages"** in left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
6. Click **"Save"**

---

## Files We're Pushing

✅ **These files will be pushed:**
- `index.html`
- `style.css`
- `script.js`
- `README.md`

❌ **These files will NOT be pushed** (not added to git):
- `Code.gs` (only for Google Apps Script)
- `GOOGLE_SHEETS_SETUP.md`
- `DEPLOYMENT_GUIDE.md`
- `QUICK_DEPLOY.md`
- `GIT_PUSH_GUIDE.md`
- `test-locally.md`
- `sampleindexcode.md`

---

## If You Get Authentication Errors

If Git asks for username/password:

1. **Use a Personal Access Token** instead of password:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name like "Budget Tracker"
   - Select scope: `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)
   - Use this token as your password when Git asks

2. Or use **GitHub Desktop** (easier for beginners)

---

## Quick Commands Summary

```powershell
cd "C:\Users\50380788\Documents\budget-tracker"
git init
git add index.html style.css script.js README.md
git commit -m "Initial commit - Budget Tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/budget-tracker.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `budget-tracker` with your actual GitHub username and repository name!

