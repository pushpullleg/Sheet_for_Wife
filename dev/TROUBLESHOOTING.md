# Troubleshooting Network Error

## Step 1: Check Browser Console

1. Open your live site: https://pushpullleg.github.io/budget-tracker/
2. Press **F12** (or right-click → Inspect)
3. Click **"Console"** tab
4. Try adding an expense
5. **Look for the exact error message** - this will tell us what's wrong

Common errors you might see:
- `CORS policy` → Deployment issue
- `Invalid API key` → API key mismatch
- `Failed to fetch` → Network/CORS issue
- `404 Not Found` → Wrong URL

---

## Step 2: Verify Google Apps Script Setup

### Check API Key in Code.gs

1. Go to [Google Apps Script](https://script.google.com)
2. Open your project
3. Check line 22 - it should say:
   ```javascript
   API_KEY: '43619930614212440190980972744666',
   ```
   **NOT** `'YOUR_API_KEY_HERE'`

4. If it's wrong, fix it and **SAVE** (Ctrl+S)

### Verify Deployment

1. In Google Apps Script, click **"Deploy"** → **"Manage deployments"**
2. Make sure there's a deployment with:
   - **Type**: Web app
   - **Execute as**: Me
   - **Who has access**: Anyone
3. If not, create a new deployment:
   - Click **"New deployment"**
   - Gear icon → **"Web app"**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **"Deploy"**
   - **Copy the new URL** if it's different

### Check Execution Logs

1. In Google Apps Script, click **"Executions"** (left sidebar)
2. Try adding an expense from your live site
3. Check if there are any execution logs
4. If you see errors, click on them to see details

---

## Step 3: Test the Google Apps Script URL Directly

Try accessing your Google Apps Script URL directly:
```
https://script.google.com/macros/s/AKfycbyNel64mjqFn1PeAQYXzUT6_JIhUNqPGk2GQEP69hDpOyMZjh8VUjNgxQiYJdDaIdE3tw/exec
```

**Expected**: You should see "Script function not found: doGet" (this is normal - it means the script is deployed)

**If you see**: "Script not found" or "404" → The deployment is wrong

---

## Step 4: Common Fixes

### Fix 1: Redeploy Google Apps Script

Sometimes you need to create a NEW deployment:

1. In Google Apps Script, click **"Deploy"** → **"Manage deployments"**
2. Click the **pencil icon** (edit) on your deployment
3. Click **"New version"**
4. Click **"Deploy"**
5. **Copy the new URL** (it might be the same or different)
6. Update `js/script.js` if the URL changed
7. Commit and push to GitHub

### Fix 2: Check Spreadsheet ID

1. In Google Apps Script, check line 19:
   ```javascript
   SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',
   ```
2. Make sure it has your actual Spreadsheet ID (not the placeholder)

### Fix 3: Verify Sheet Name

1. Make sure your Google Sheet has a tab named exactly **"Transactions"** (case-sensitive)
2. Make sure row 1 has headers: `Date`, `Amount`, `Category`, `Notes`

---

## Step 5: Test with Postman/curl (Advanced)

If you want to test the API directly:

**Using curl:**
```bash
curl -X POST "https://script.google.com/macros/s/AKfycbyNel64mjqFn1PeAQYXzUT6_JIhUNqPGk2GQEP69hDpOyMZjh8VUjNgxQiYJdDaIdE3tw/exec" \
  -H "Content-Type: application/json" \
  -d '{"apiKey":"43619930614212440190980972744666","action":"getBudget"}'
```

This should return JSON with budget info if everything is working.

---

## Most Likely Issues

1. **API key not set in Code.gs** (90% of issues)
2. **Deployment not set to "Anyone"** (CORS issue)
3. **Spreadsheet ID wrong** in Code.gs
4. **Sheet tab name wrong** (should be "Transactions")

---

## Quick Checklist

- [ ] API key in Code.gs matches js/script.js: `43619930614212440190980972744666`
- [ ] Spreadsheet ID is set in Code.gs (not placeholder)
- [ ] Google Apps Script is deployed as "Web app"
- [ ] "Who has access" is set to "Anyone"
- [ ] Sheet tab is named "Transactions"
- [ ] Sheet has headers: Date, Amount, Category, Notes
- [ ] Browser console shows specific error (check F12)

