# Renaming Instructions

This guide will help you rename the project from `Sheet_for_Wife` to `gift-budget-tracker` both locally and on GitHub.

## Step 1: Rename Local Folder

### Option A: Using File Explorer (Windows)

1. Close any programs using the folder (VS Code, terminal, etc.)
2. Navigate to `C:\Users\50380788\Documents\`
3. Right-click on `Sheet_for_Wife` folder
4. Select "Rename"
5. Type: `gift-budget-tracker`
6. Press Enter

### Option B: Using PowerShell

```powershell
cd "C:\Users\50380788\Documents"
Rename-Item -Path "Sheet_for_Wife" -NewName "gift-budget-tracker"
```

## Step 2: Update Git Remote (After Renaming GitHub Repo)

After renaming the GitHub repository (Step 3), update your local git remote:

```powershell
cd "C:\Users\50380788\Documents\gift-budget-tracker"
git remote set-url origin https://github.com/pushpullleg/gift-budget-tracker.git
```

Verify the remote:
```powershell
git remote -v
```

## Step 3: Rename GitHub Repository

1. Go to your repository on GitHub: https://github.com/pushpullleg/Sheet_for_Wife
2. Click on **"Settings"** tab (top menu)
3. Scroll down to **"Repository name"** section
4. Change the name from `Sheet_for_Wife` to `gift-budget-tracker`
5. Click **"Rename"** button
6. GitHub will automatically redirect to the new URL

**New repository URL will be:**
`https://github.com/pushpullleg/gift-budget-tracker`

**New GitHub Pages URL will be:**
`https://pushpullleg.github.io/gift-budget-tracker/`

## Step 4: Update GitHub Pages URL (If Needed)

If you have the app bookmarked or shared:
- Old URL: `https://pushpullleg.github.io/Sheet_for_Wife/`
- New URL: `https://pushpullleg.github.io/gift-budget-tracker/`

GitHub will automatically redirect the old URL, but it's better to update bookmarks.

## Step 5: Verify Everything Works

1. Open the new local folder in your editor
2. Check that git still works:
   ```powershell
   git status
   ```
3. Visit the new GitHub Pages URL
4. Test that the app still works

## Important Notes

- **GitHub Pages**: The new URL will be active immediately after renaming
- **Old URL**: GitHub will redirect the old URL to the new one automatically
- **Local Git**: You'll need to update the remote URL (Step 2)
- **Bookmarks**: Update any bookmarks to the new URL

## Troubleshooting

### "Repository not found" error
- Make sure you updated the git remote URL (Step 2)
- Verify the repository name on GitHub matches `gift-budget-tracker`

### GitHub Pages not loading
- Wait 1-2 minutes after renaming
- Check Settings → Pages to verify it's still enabled
- Clear browser cache

### Local folder issues
- Make sure VS Code/editor is closed before renaming
- If git doesn't work, reinitialize: `git init` (but you'll lose remote connection - use Step 2 instead)

