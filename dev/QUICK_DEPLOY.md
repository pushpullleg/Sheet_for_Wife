# Quick GitHub Pages Deployment

## Files to Deploy

✅ **Upload these files:**
- `index.html`
- `style.css`
- `script.js`
- `README.md` (optional)

❌ **DO NOT upload:**
- `Code.gs` (only for Google Apps Script)
- `GOOGLE_SHEETS_SETUP.md`
- `DEPLOYMENT_GUIDE.md`
- `test-locally.md`
- `sampleindexcode.md`

---

## Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name**: `budget-tracker` (or any name you like)
3. **Visibility**: Select **Public** (required for free GitHub Pages)
4. **DO NOT** check "Initialize with README" (we're uploading our own files)
5. Click **"Create repository"**

### Step 2: Upload Files

You have 3 options - choose the easiest for you:

#### Option A: Drag & Drop (Easiest!)

1. On the new repository page, scroll down to "uploading an existing file"
2. Click **"uploading an existing file"** link
3. Drag and drop these 4 files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md` (optional)
4. Scroll down and click **"Commit changes"**

#### Option B: GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com/) if you don't have it
2. File → Clone Repository → Choose your new repo
3. Copy the 4 files into the cloned folder
4. Commit and push

#### Option C: Git Command Line

```bash
cd /path/to/your/project
git init
git add index.html style.css script.js README.md
git commit -m "Initial commit - Budget Tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/budget-tracker.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
6. Click **"Save"**

### Step 4: Wait & Access

1. Wait 1-2 minutes for GitHub to build your site
2. Your site will be live at:
   - `https://YOUR_USERNAME.github.io/budget-tracker/`
3. You'll see the URL in the Pages settings after it's ready

---

## Verify It Works

1. Open your GitHub Pages URL
2. The budget should load automatically
3. Try adding a test expense
4. Check your Google Sheet - the entry should appear!

---

## Troubleshooting

**Site not loading?**
- Wait 2-3 minutes (first deployment takes time)
- Check Settings → Pages for any errors
- Make sure repository is Public

**Still getting network errors?**
- Verify API key is in both Code.gs and script.js
- Check browser console (F12) for specific errors
- Make sure Google Apps Script is deployed correctly

---

## You're Done! 🎉

Bookmark the GitHub Pages URL on your phone for easy access!

