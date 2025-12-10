# Architecture Overview

This document explains the technical architecture and design decisions of the Gift Budget Tracker application.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Mobile Browser                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  index.html (UI)                                      │   │
│  │  ├── css/style.css (Styling)                        │   │
│  │  └── js/script.js (Logic)                           │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────┬───────────────────────────────────┘
                          │ HTTPS POST
                          │ (JSON payload)
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Apps Script (Web App)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Code.gs (Server-side API)                           │   │
│  │  ├── API Key Validation                              │   │
│  │  ├── Input Validation                                │   │
│  │  ├── Data Processing                                 │   │
│  │  └── Budget Calculation                              │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────┬───────────────────────────────────┘
                        │ Google Sheets API
                        │ (Write operations)
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Google Sheets                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Transactions Sheet                                    │   │
│  │  ├── Date (auto)                                       │   │
│  │  ├── Amount                                            │   │
│  │  ├── Category                                         │   │
│  │  └── Notes                                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

### Frontend (`index.html`, `css/style.css`, `js/script.js`)

**Responsibilities:**
- User interface rendering
- Input validation (client-side)
- User feedback and error handling
- API communication
- Budget display updates

**Key Functions:**
- `validateAmount()`: Real-time amount validation
- `handleSubmit()`: Form submission and API call
- `handleUndo()`: Delete last entry
- `fetchBudget()`: Get current budget from backend
- `updateBudgetDisplay()`: Update UI with budget info

### Backend (`backend/Code.gs`)

**Responsibilities:**
- API endpoint handling
- Server-side validation
- Data persistence to Google Sheets
- Budget calculation
- Security (API key validation)

**Key Functions:**
- `doPost()`: Main request handler
- `doOptions()`: CORS preflight handler
- `getBudgetInfo()`: Calculate budget from transactions
- `validateRequest()`: Security and input validation

### Storage (Google Sheets)

**Structure:**
- Single tab: "Transactions"
- Columns: Date, Amount, Category, Notes
- No formulas in data rows (handled by script)

## Data Flow

### Adding an Expense

1. User enters amount, selects category, optionally adds notes
2. Client validates input
3. Client sends POST request to Google Apps Script
4. Script validates API key and input
5. Script appends row to Google Sheets
6. Script calculates updated budget
7. Script returns success + budget info
8. Client updates UI with new budget

### Fetching Budget

1. Client sends POST request with `action: 'getBudget'`
2. Script reads all transactions from sheet
3. Script calculates: totalSpent, remaining
4. Script returns budget object
5. Client updates budget display

### Undoing Last Entry

1. User clicks "Undo" button
2. Client confirms action
3. Client sends POST request with `action: 'undo'`
4. Script finds last row in sheet
5. Script deletes last row
6. Script recalculates budget
7. Script returns success + updated budget
8. Client updates UI

## Security Model

### API Key Authentication

- **Purpose**: Prevent unauthorized access to the endpoint
- **Implementation**: Simple string comparison
- **Limitation**: Visible in client-side code (acceptable for personal use)
- **Protection**: Google Sheets still requires authentication

### CORS Handling

- **Challenge**: Browsers block cross-origin requests
- **Solution**: 
  - `doOptions()` handles preflight requests
  - `Content-Type: text/plain;charset=utf-8` bypasses preflight
  - `Access-Control-Allow-Origin: *` headers

### Input Validation

- **Client-side**: Immediate feedback, better UX
- **Server-side**: Security, prevents bad data
- **Both**: Amount must be positive number, category must be whitelisted

## Design Decisions

### Why Google Sheets?

- **Simplicity**: No database setup required
- **Accessibility**: Easy to view/edit data
- **Free**: No hosting costs
- **Familiar**: Most users understand spreadsheets

### Why Google Apps Script?

- **Serverless**: No server to maintain
- **Free**: Generous free tier
- **Integration**: Native Google Sheets API
- **JavaScript**: Same language as frontend

### Why GitHub Pages?

- **Free**: No hosting costs
- **Simple**: Just push files
- **Fast**: CDN-backed
- **Version Control**: Built-in Git

### Why Single Tab?

- **Simplicity**: Less confusion
- **Maintainability**: Easier to understand
- **Flexibility**: Can add formulas later if needed

### Why No Monthly Reset?

- **Flexibility**: Budget is a pool, not a cycle
- **Real-world**: Expenses don't reset monthly
- **Simplicity**: One budget, one calculation

## Technology Choices

### Frontend

- **Vanilla JavaScript**: No framework overhead
- **CSS3**: Modern styling, no preprocessors
- **HTML5**: Semantic markup

### Backend

- **Google Apps Script**: Serverless JavaScript runtime
- **Google Sheets API**: Native integration

### Communication

- **REST API**: Simple POST requests
- **JSON**: Standard data format
- **HTTPS**: Secure transport

## Performance Considerations

- **Caching**: DOM elements cached in variables
- **Minimal Requests**: Budget fetched only when needed
- **Client Validation**: Reduces unnecessary API calls
- **Single Tab**: Fast sheet operations

## Scalability

### Current Limits

- **Google Sheets**: ~10 million cells (plenty for expenses)
- **Apps Script**: 6-minute execution limit
- **GitHub Pages**: Unlimited bandwidth

### Future Considerations

- If transactions exceed 10,000, consider pagination
- If API calls become slow, add caching
- If multiple users needed, add authentication

## Error Handling

### Client-Side

- Input validation with immediate feedback
- Network error messages
- Loading states during API calls
- Disabled buttons to prevent duplicate submissions

### Server-Side

- API key validation
- Input sanitization
- Try-catch blocks around sheet operations
- Meaningful error messages returned to client

## Testing Strategy

### Manual Testing

- Add expense with valid data
- Add expense with invalid data
- Undo last entry
- Check budget calculation
- Test on mobile device

### Edge Cases

- Empty amount field
- Negative amounts
- Very large amounts
- Invalid categories
- Network failures
- Empty sheet

## Future Enhancements

Potential improvements (not currently implemented):

- Offline support (Service Workers)
- Data export (CSV download)
- Category filtering
- Date range views
- Charts/graphs
- Multiple budgets
- User authentication

