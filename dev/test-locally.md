# Testing Locally - Quick Fix

## The Problem

When you open `index.html` directly in Chrome (double-click), it uses the `file://` protocol. Browsers block cross-origin requests from `file://` for security reasons, which causes the "network error."

## Solution 1: Use a Simple Local Server (Recommended for Testing)

### Option A: Python (if you have Python installed)

1. Open Terminal/Command Prompt in your project folder
2. Run:
   ```bash
   python -m http.server 8000
   ```
   (or `python3 -m http.server 8000` on Mac/Linux)

3. Open browser and go to: `http://localhost:8000`

### Option B: Node.js (if you have Node.js installed)

1. Install a simple server:
   ```bash
   npx http-server
   ```

2. It will show you a URL like `http://localhost:8080`

### Option C: VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## Solution 2: Just Deploy to GitHub Pages

**Yes, it will work on GitHub Pages!** The CORS issue only happens with `file://` protocol. Once deployed to GitHub Pages (or any web server), it will work perfectly.

## Before Testing - Verify These:

1. **API Key in Code.gs**: Make sure you updated the API key in Google Apps Script
   - Go to Google Apps Script
   - Find: `API_KEY: 'YOUR_API_KEY_HERE',`
   - Replace with: `API_KEY: '43619930614212440190980972744666',`
   - **Save the project**

2. **Check Browser Console** (F12 → Console tab):
   - Look for specific error messages
   - This will tell us if it's CORS, API key, or something else

## Quick Test Without Local Server

If you don't want to set up a local server, you can:
1. Deploy to GitHub Pages (it will work there)
2. Or use an online HTML preview service temporarily

The network error you're seeing is **normal** when opening files directly. Once it's on a real web server (GitHub Pages), it will work!

