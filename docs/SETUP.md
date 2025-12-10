# Complete Setup Guide

This guide will walk you through setting up the **Gift Budget Tracker** from scratch. Follow these steps in order.

## Understanding the Use Case

This application is designed for tracking expenses from a **gifted budget allocation**. For example:
- You gift someone $2,500 to spend
- They track every expense from this allocated amount
- You both can see the remaining budget in real-time
- This is a **one-time gift budget**, not a recurring monthly budget

## Prerequisites

- Google account (for Sheets and Apps Script)
- GitHub account (for hosting)
- Basic familiarity with copy/paste

## Overview

The setup involves three main components:
1. **Google Sheet**: Where your expense data is stored
2. **Google Apps Script**: Backend API that processes requests
3. **GitHub Pages**: Frontend web application

---

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename the first tab to `Transactions`
4. In row 1, add these headers:
   - Column A: `Date`
   - Column B: `Amount`
   - Column C: `Category`
   - Column D: `Notes`
5. Copy the **Spreadsheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the part between `/d/` and `/edit`

**That's it for the sheet!** The script will handle everything else automatically.

---

## Step 2: Set Up Google Apps Script

### 2.1 Create the Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Delete the default `myFunction` code
4. Open `backend/Code.gs` from this repository
5. Copy the entire file contents
6. Paste into the Apps Script editor

### 2.2 Configure the Script

Update the `CONFIG` object at the top of `Code.gs`:

```javascript
const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',  // From Step 1
  API_KEY: 'YOUR_API_KEY_HERE',                // Generate below
  SHEET_NAME: 'Transactions',
  STARTING_BUDGET: 2500                         // Your budget amount
};
```

**Generate an API Key:**
1. Go to https://www.random.org/strings/
2. Generate: 1 string, 32 characters, Alphanumeric
3. Copy the result
4. Use this same key in both `Code.gs` and `script.js`

### 2.3 Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click the **gear icon ⚙️** → Choose **"Web app"**
3. Configure:
   - **Description**: `Gift Budget Tracker API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (required for CORS)
4. Click **"Deploy"**
5. **Copy the Web App URL** (you'll need this next)
6. Click **"Authorize access"** and grant permissions

---

## Step 3: Configure Frontend

1. Copy `script.js.example` to `script.js` (or edit existing `script.js`)
2. Update the `CONFIG` object:

```javascript
const CONFIG = {
    GOOGLE_SCRIPT_URL: 'YOUR_WEB_APP_URL_HERE',  // From Step 2.3
    API_KEY: 'YOUR_API_KEY_HERE'                 // Same as Code.gs
};
```

**Important**: The API key in `script.js` must **exactly match** the one in `Code.gs`.

---

## Step 4: Deploy to GitHub Pages

### Option A: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Make it **Public** (required for free GitHub Pages)
3. Upload these files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md` (optional)
4. Go to **Settings** → **Pages**
5. Select **"Deploy from a branch"**
6. Choose `main` branch, `/ (root)` folder
7. Click **"Save"**

### Option B: Using Git Command Line

```bash
git init
git add index.html style.css script.js README.md
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

Then enable GitHub Pages (Settings → Pages).

---

## Step 5: Test

1. Wait 1-2 minutes for GitHub Pages to build
2. Visit your GitHub Pages URL
3. The budget should load automatically
4. Try adding a test expense
5. Check your Google Sheet - the entry should appear!

---

## Verification Checklist

- [ ] Google Sheet created with "Transactions" tab
- [ ] Headers added: Date, Amount, Category, Notes
- [ ] Spreadsheet ID copied
- [ ] API key generated (32 characters)
- [ ] `Code.gs` configured with Spreadsheet ID and API key
- [ ] Google Apps Script deployed as web app
- [ ] Web App URL copied
- [ ] `script.js` configured with Web App URL and API key
- [ ] Files uploaded to GitHub
- [ ] GitHub Pages enabled
- [ ] Test expense added successfully
- [ ] Data appears in Google Sheet

---

## Troubleshooting

### "Invalid API key"
- Verify API key in `Code.gs` matches `script.js` exactly
- Check for extra spaces or typos
- Make sure you saved `Code.gs` after updating

### "Network error" or CORS errors
- Verify Google Apps Script is deployed as "Web app"
- Check "Who has access" is set to "Anyone"
- Ensure you're using `text/plain;charset=utf-8` Content-Type (already configured)

### Budget not loading
- Check browser console (F12) for errors
- Verify API key is correct
- Check Google Apps Script execution logs

### Data not appearing in sheet
- Verify Spreadsheet ID is correct
- Check sheet tab is named exactly "Transactions"
- Check Google Apps Script execution logs for errors

---

## Next Steps

- Bookmark the app on your phone
- Start tracking expenses!
- Check your Google Sheet periodically for insights

For more help, see the troubleshooting guides in the `dev/` folder.

