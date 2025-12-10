# Security Notice

## ⚠️ Important: Credentials in Git History

**Current Status**: The production API key and Google Apps Script URL are currently committed in `script.js` in the git history. This is a security risk.

## What You Should Do

### Option 1: Rotate Your Credentials (Recommended)

Since the credentials are already in git history, the best practice is to rotate them:

1. **Generate a new API key:**
   - Go to https://www.random.org/strings/
   - Generate a new 32-character alphanumeric string

2. **Update Google Apps Script:**
   - Open `Code.gs` in Google Apps Script
   - Update `API_KEY` with your new key
   - Save and redeploy

3. **Update your local `script.js`:**
   - Copy `script.js.example` to `script.js`
   - Fill in your new API key and URL
   - **DO NOT commit `script.js`** (it's now in `.gitignore`)

4. **Deploy the new `script.js`:**
   - Since `script.js` is now gitignored, you'll need to manually upload it to GitHub
   - Or temporarily remove it from `.gitignore`, commit, then add it back

### Option 2: Make Repository Private

If you don't want to rotate credentials:
- Make your GitHub repository private
- This prevents public access to the credentials

## Going Forward

1. **Use the template**: `script.js.example` contains placeholders
2. **Never commit `script.js`**: It's now in `.gitignore`
3. **For deployment**: You'll need to manually manage `script.js` since it's gitignored

## Why This Matters

- API keys in public repositories can be discovered by bots
- Even if credentials are "client-side visible," they shouldn't be in version control
- Git history is permanent - even if you remove files later, they remain in history

## Note About Client-Side Credentials

While these credentials are visible in the browser (they're in JavaScript), committing them to version control:
- Makes them searchable in GitHub
- Exposes them to anyone who clones the repository
- Makes it harder to rotate credentials later
- Violates security best practices

## Current Deployment

The current deployment at https://pushpullleg.github.io/budget-tracker/ uses the committed credentials. To secure it:
1. Rotate the API key (recommended)
2. Or make the repository private

