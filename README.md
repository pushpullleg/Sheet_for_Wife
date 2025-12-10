# Gift Budget Tracker

A simple, elegant web application for tracking expenses from an **allocated gift budget**. Built with vanilla JavaScript, hosted on GitHub Pages, and powered by Google Sheets for data storage.

## What Is This?

This is a **gift budget tracking tool** designed for a specific use case: when you give someone a **gift budget** (a fixed amount they can spend), and you want to track how that allocated amount is being used.

**The Specific Use Case:**
- You gift someone (e.g., your spouse) a budget of $2,500 to spend
- This is not a recurring monthly budget—it's a **one-time allocated gift amount**
- The recipient needs to track every expense from this gift budget
- You want visibility into how the gift budget is being spent
- The goal is to track spending until the allocated amount is exhausted

**Why This Exists:**
- Traditional budget apps are designed for recurring monthly budgets
- This is for tracking a **gifted allocation**—a fixed pool of money to spend
- The recipient needs a simple, frictionless way to log expenses
- You need transparency into how the gift budget is being used
- It's personal—between giver and recipient

**The Solution:**
- A beautiful, mobile-first web interface for quick expense entry
- Real-time tracking of remaining gift budget
- Automatic data sync to Google Sheets for transparency
- Simple enough that logging expenses becomes a habit, not a chore
- Designed for the recipient to use daily without friction

## Features

- **Ultra-Simple Interface**: Just amount, category, and optional notes
- **Mobile-Optimized**: Large touch-friendly buttons, designed for phone use
- **Quick Entry Buttons**: $5, $10, $20, $50 for common purchases
- **Real-Time Budget Tracking**: Gift budget remaining updates automatically
- **Undo Functionality**: Remove the last entry with one click
- **Smart Validation**: Prevents errors before submission
- **Auto-Timestamping**: Date added automatically
- **Category-Based Tracking**: 8 predefined categories for easy organization

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌──────────────┐
│  GitHub Pages   │  ────►  │  Google Apps     │  ────►  │ Google Sheets│
│  (Frontend)     │  POST   │  Script (API)    │  Write  │  (Database)  │
└─────────────────┘         └──────────────────┘         └──────────────┘
```

**Frontend**: Static HTML/CSS/JavaScript hosted on GitHub Pages  
**Backend**: Google Apps Script web app (serverless)  
**Storage**: Google Sheets (single "Transactions" tab)

## Quick Start

### For the Recipient (Person Spending the Gift Budget)

1. **Bookmark the app** on your phone
2. **Add expenses** as you spend from your gift budget:
   - Enter amount (or tap quick buttons)
   - Select category
   - Optionally add notes
   - Tap "Add Expense"
3. **Monitor your remaining budget** at the top of the screen
4. **View all expenses**: Check your Google Sheet anytime for a complete record

### For the Giver (Person Who Gifted the Budget)

1. **Set up the system** (see Setup Guide below)
2. **Share the app URL** with the recipient
3. **Monitor spending** by checking the Google Sheet
4. **Track remaining budget** in real-time

### For Developers / Self-Hosting

See [Complete Setup Guide](docs/SETUP.md) for step-by-step installation instructions.

## Project Structure

```
gift-budget-tracker/
├── index.html              # Main application page
├── style.css               # Application styles
├── script.js               # Application logic
├── script.js.example       # Configuration template
├── README.md               # This file
├── docs/                   # User-facing documentation
│   ├── SETUP.md           # Complete setup guide
│   ├── SECURITY.md        # Security considerations
│   └── ARCHITECTURE.md    # Technical architecture
├── backend/                # Google Apps Script code
│   └── Code.gs            # Server-side API (gitignored)
└── dev/                    # Development notes (personal reference)
    ├── DEPLOYMENT_GUIDE.md
    ├── TROUBLESHOOTING.md
    └── ...
```

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend**: Google Apps Script (JavaScript runtime)
- **Storage**: Google Sheets API
- **Hosting**: GitHub Pages (static hosting)
- **Design**: Inspired by Anthropic Academy (clean, minimal aesthetic)

## Key Design Decisions

1. **Single Tab in Sheets**: Simplicity over complexity. One tab with all transactions.
2. **No Monthly Reset**: This is a **gift allocation**, not a recurring budget. The budget is a fixed pool that decreases as expenses are logged.
3. **Client-Side Validation**: Immediate feedback, better UX.
4. **API Key Security**: Simple but effective for personal use.
5. **Mobile-First**: Optimized for the primary use case (phone logging by recipient).

## Categories

The app supports 8 expense categories:
- Groceries
- Dining
- Shopping
- Travel
- Health
- Personal
- Gifts
- Misc

Categories are validated on both client and server side.

## Configuration

The app requires configuration in two places:

1. **Google Apps Script** (`backend/Code.gs`):
   - Spreadsheet ID
   - API Key
   - Starting Budget (your gift amount, e.g., 2500)

2. **Frontend** (`script.js`):
   - Google Apps Script Web App URL
   - API Key (must match backend)

See `script.js.example` for the template.

## Documentation

- **[Setup Guide](docs/SETUP.md)**: Complete installation and configuration
- **[Security Notes](docs/SECURITY.md)**: Security considerations and best practices
- **[Architecture](docs/ARCHITECTURE.md)**: Technical architecture and design decisions

## Development

This project follows clean code principles:
- **Modular functions**: Each function has a single responsibility
- **Clear naming**: Functions and variables are self-documenting
- **Comments**: Complex logic is explained
- **Separation of concerns**: UI, validation, and API calls are separated

## Browser Support

- Chrome/Edge (recommended)
- Safari
- Firefox
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Free to use for personal projects.

## Contributing

This is a personal project, but suggestions and improvements are welcome. Please open an issue or pull request.

## Acknowledgments

- Design inspiration from Anthropic Academy
- Built with simplicity and maintainability in mind
- Designed for the specific use case of tracking a gifted budget allocation
