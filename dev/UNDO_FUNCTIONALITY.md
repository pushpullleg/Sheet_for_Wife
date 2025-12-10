# Undo Functionality - How It Works

## Technical Overview

The undo feature deletes the **most recent expense entry** from Google Sheets. Here's how it works:

### How It Works

1. **User clicks "Undo Last" button**
2. **Frontend fetches last entry** - Shows user what will be deleted
3. **Confirmation dialog** - Displays entry details (amount, category, date, notes)
4. **User confirms** - Sends delete request to backend
5. **Backend deletes last row** - Removes the most recent entry from Google Sheets
6. **Budget updates** - Recalculates remaining budget
7. **UI updates** - Shows success message and updates budget display

### What Happens on Multiple Clicks

If you press undo multiple times:
- **First click**: Deletes the most recent entry (e.g., Entry #3)
- **Second click**: Deletes the now-most-recent entry (e.g., Entry #2)
- **Third click**: Deletes the now-most-recent entry (e.g., Entry #1)
- **Fourth click**: Error message "No expenses to undo" (only header row remains)

**Example:**
```
Initial state: Entry1, Entry2, Entry3
Click undo → Deletes Entry3 (now: Entry1, Entry2)
Click undo → Deletes Entry2 (now: Entry1)
Click undo → Deletes Entry1 (now: only header)
Click undo → Error: "No expenses to undo"
```

### Safety Features

1. **Button disabled when no entries exist** - Prevents accidental clicks
2. **Shows what will be deleted** - Confirmation dialog displays entry details
3. **Tooltip on hover** - Shows last entry amount and category
4. **Error handling** - Clear error messages if something goes wrong

### Backend Logic

```javascript
// Checks if any expenses exist
if (lastRow <= 1) {
  // Only header row exists
  return error: "No expenses to undo"
}

// Gets last row data before deleting
const lastRowData = sheet.getRange(lastRow, 1, 1, 4).getValues()[0];

// Deletes the last row
sheet.deleteRow(lastRow);
```

### User Experience Improvements

**Before:**
- Button always enabled
- Generic confirmation: "Delete the last expense entry?"
- No indication of what will be deleted

**After:**
- Button disabled when no entries exist
- Detailed confirmation showing:
  - Amount
  - Category
  - Date/time
  - Notes (if any)
- Tooltip shows last entry on hover
- Button label: "Undo Last" (more descriptive)

### Edge Cases Handled

1. **No entries exist** - Button disabled, shows error if clicked
2. **Only header row** - Backend returns "No expenses to undo"
3. **Network error** - Shows error message, re-enables button
4. **Concurrent deletions** - Each undo deletes the current last entry

### Important Notes

- **Undo is irreversible** - Once deleted, the entry is permanently removed
- **Always deletes the LAST entry** - Not the entry you just added, but the most recent one in the sheet
- **Budget recalculates automatically** - After undo, budget reflects the deletion
- **Works chronologically** - Deletes in reverse order of entry (newest first)

