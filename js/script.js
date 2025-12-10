/**
 * Gift Budget Tracker - Client-Side Application
 * 
 * This file handles all client-side logic including:
 * - Form validation and user input handling
 * - API communication with Google Apps Script
 * - UI updates and feedback
 * - Gift budget display and formatting
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Application configuration
 * 
 * IMPORTANT: Update these values before deployment
 * - GOOGLE_SCRIPT_URL: Your Google Apps Script Web App URL
 * - API_KEY: Must match the API key in backend/Code.gs
 */
const CONFIG = {
    // Replace with your Google Apps Script Web App URL after deployment
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyNel64mjqFn1PeAQYXzUT6_JIhUNqPGk2GQEP69hDpOyMZjh8VUjNgxQiYJdDaIdE3tw/exec',
    // Replace with your API key (generate a random string)
    API_KEY: '43619930614212440190980972744666'
};

// ============================================================================
// APPLICATION STATE
// ============================================================================

/**
 * Currently selected expense category
 * @type {string|null}
 */
let selectedCategory = null;

// ============================================================================
// DOM ELEMENTS
// ============================================================================

/**
 * Cache all DOM elements for better performance
 * These are initialized once and reused throughout the application
 */
const amountInput = document.getElementById('amount');
const notesToggle = document.getElementById('notesToggle');
const notesWrapper = document.getElementById('notesWrapper');
const notesInput = document.getElementById('notes');
const categoryButtons = document.querySelectorAll('.category-btn');
const quickButtons = document.querySelectorAll('.quick-btn');
const submitBtn = document.getElementById('submitBtn');
const undoBtn = document.getElementById('undoBtn');
const form = document.getElementById('expenseForm');
const loading = document.getElementById('loading');
const feedback = document.getElementById('feedback');
const amountError = document.getElementById('amountError');
const categoryError = document.getElementById('categoryError');
const budgetRemaining = document.getElementById('budgetRemaining');

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize application when DOM is ready
 * Sets up event listeners, validates configuration, and loads budget
 */
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkConfig();
    // Enable undo button by default (will be disabled later only if we're certain there are no expenses)
    undoBtn.disabled = false;
    fetchBudget(); // Load budget on page load
    // Update undo button state after budget loads (non-blocking, doesn't block UI)
    setTimeout(() => updateUndoButtonState(), 500);
});

// ============================================================================
// CONFIGURATION VALIDATION
// ============================================================================

/**
 * Validates that configuration has been set up correctly
 * Shows error message if placeholders are still present
 */
function checkConfig() {
    if (CONFIG.GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' || CONFIG.API_KEY === 'YOUR_SECRET_API_KEY_HERE') {
        showFeedback('Please configure GOOGLE_SCRIPT_URL and API_KEY in js/script.js', 'error');
    }
}

// ============================================================================
// EVENT LISTENER SETUP
// ============================================================================

/**
 * Sets up all event listeners for user interactions
 * Called once during initialization
 */
function setupEventListeners() {
    // Toggle notes section
    notesToggle.addEventListener('click', () => {
        notesWrapper.classList.toggle('show');
        const isShowing = notesWrapper.classList.contains('show');
        notesToggle.innerHTML = isShowing 
            ? '<span>Hide notes</span>' 
            : '<span>Add notes</span>';
    });

    // Quick amount buttons
    quickButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = btn.dataset.amount;
            amountInput.value = amount;
            amountError.classList.remove('show');
            amountInput.classList.remove('error');
        });
    });

    // Category selection
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedCategory = btn.dataset.category;
            categoryError.classList.remove('show');
        });
    });

    // Amount input validation
    amountInput.addEventListener('input', validateAmount);
    amountInput.addEventListener('blur', formatAmount);

    // Form submission
    form.addEventListener('submit', handleSubmit);

    // Undo button
    undoBtn.addEventListener('click', handleUndo);
}

// ============================================================================
// INPUT VALIDATION
// ============================================================================

/**
 * Validates amount input in real-time as user types
 * Allows only numbers and one decimal point
 * 
 * @param {Event} e - Input event
 */
function validateAmount(e) {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    const cleaned = value.replace(/[^\d.]/g, '');
    
    // Prevent multiple decimal points
    const parts = cleaned.split('.');
    if (parts.length > 2) {
        e.target.value = parts[0] + '.' + parts.slice(1).join('');
    } else {
        e.target.value = cleaned;
    }

    // Remove error styling if valid
    if (isValidAmount(e.target.value)) {
        e.target.classList.remove('error');
        amountError.classList.remove('show');
    }
}

/**
 * Formats amount input when user leaves the field (on blur)
 * Validates and formats to 2 decimal places
 * Shows error if invalid
 * 
 * @param {Event} e - Blur event
 */
function formatAmount(e) {
    const value = e.target.value.trim();
    if (!value) return;

    if (!isValidAmount(value)) {
        e.target.classList.add('error');
        amountError.classList.add('show');
        return;
    }

    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
        e.target.classList.add('error');
        amountError.classList.add('show');
        return;
    }

    // Format to 2 decimal places
    e.target.value = num.toFixed(2);
    e.target.classList.remove('error');
    amountError.classList.remove('show');
}

/**
 * Validates if a value is a valid positive number
 * 
 * @param {string} value - The value to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidAmount(value) {
    if (!value || value.trim() === '') return false;
    
    // Check for invalid patterns like "20.5.3" or "twenty"
    if (value.match(/[^\d.]/) && !value.match(/^\d+\.?\d*$/)) return false;
    
    const num = parseFloat(value);
    return !isNaN(num) && num > 0 && isFinite(num);
}

// ============================================================================
// UI FEEDBACK
// ============================================================================

/**
 * Displays feedback message to user
 * Automatically hides success messages after 3 seconds
 * 
 * @param {string} message - Message to display
 * @param {string} type - Type of feedback: 'success' or 'error'
 */
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback show ${type}`;
    if (type === 'success') {
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 3000);
    }
}

// ============================================================================
// FORM SUBMISSION
// ============================================================================

/**
 * Handles form submission when user clicks "Add Expense"
 * Validates input, sends data to API, and updates UI
 * 
 * @param {Event} e - Submit event
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    // Reset errors
    amountError.classList.remove('show');
    categoryError.classList.remove('show');
    amountInput.classList.remove('error');

    // Validate
    const amount = amountInput.value.trim();
    let hasError = false;

    if (!isValidAmount(amount)) {
        amountError.classList.add('show');
        amountInput.classList.add('error');
        hasError = true;
    }

    if (!selectedCategory) {
        categoryError.classList.add('show');
        hasError = true;
    }

    if (hasError) return;

    // Show loading
    loading.classList.add('show');
    submitBtn.disabled = true;

    // Prepare data
    const data = {
        apiKey: CONFIG.API_KEY,
        amount: parseFloat(amount).toFixed(2),
        category: selectedCategory,
        notes: notesInput.value.trim()
    };

    try {
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showFeedback('Expense added successfully', 'success');
            // Update budget if returned
            if (result.budget) {
                updateBudgetDisplay(result.budget);
            } else {
                fetchBudget(); // Fetch budget if not returned
            }
            // Update undo button state after adding expense
            await updateUndoButtonState();
            // Reset form
            resetForm();
        } else {
            showFeedback(result.error || 'Failed to add expense', 'error');
        }
    } catch (error) {
        showFeedback('Network error. Please try again.', 'error');
        console.error('Error:', error);
    } finally {
        loading.classList.remove('show');
        submitBtn.disabled = false;
    }
}

// ============================================================================
// UNDO FUNCTIONALITY
// ============================================================================

/**
 * Fetches the last expense entry to show user what will be deleted
 * 
 * @returns {Object|null} Last entry details or null if none exists
 */
async function getLastEntry() {
    try {
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                apiKey: CONFIG.API_KEY,
                action: 'getLastEntry'
            })
        });

        if (!response.ok) {
            // If backend doesn't support getLastEntry yet, return null gracefully
            return null;
        }

        // Get response text first to check if it's valid JSON
        const responseText = await response.text();
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            // If not JSON, backend probably doesn't support this action
            return null;
        }
        return result.success ? result.entry : null;
    } catch (error) {
        // Silently fail - backend might not have getLastEntry function yet
        // This is okay, we'll use fallback confirmation
        return null;
    }
}

/**
 * Updates the undo button state and tooltip
 * Button is always enabled - backend safely handles the case when no entries exist
 * (Backend checks if lastRow <= 1 and returns error without deleting header)
 */
async function updateUndoButtonState() {
    // Button is always enabled - backend protects against deleting header row
    undoBtn.disabled = false;
    
    try {
        // Try to get last entry to show helpful tooltip (if backend supports it)
        const lastEntry = await getLastEntry();
        if (lastEntry) {
            undoBtn.title = `Undo last entry: ${formatCurrency(lastEntry.amount)} - ${lastEntry.category}`;
        } else {
            undoBtn.title = 'Undo last expense entry';
        }
    } catch (error) {
        // If check fails, just use default tooltip
        undoBtn.title = 'Undo last expense entry';
    }
}

/**
 * Removes the last expense entry from Google Sheets
 * Shows what will be deleted and confirms with user before deletion
 */
async function handleUndo() {
    // First, try to get the last entry to show user what will be deleted
    let lastEntry = await getLastEntry();
    
    // If getLastEntry fails (backend not updated), use simpler confirmation
    let confirmMessage;
    if (lastEntry) {
        // Format the date for display
        const entryDate = new Date(lastEntry.date);
        const dateStr = entryDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });

        // Show detailed confirmation
        confirmMessage = `Delete the last expense?\n\n` +
            `Amount: ${formatCurrency(lastEntry.amount)}\n` +
            `Category: ${lastEntry.category}\n` +
            `Date: ${dateStr}` +
            (lastEntry.notes ? `\nNotes: ${lastEntry.notes}` : '');
    } else {
        // Fallback to simple confirmation if we can't get entry details
        confirmMessage = 'Delete the last expense entry?';
    }

    if (!confirm(confirmMessage)) return;

    loading.classList.add('show');
    undoBtn.disabled = true;

    try {
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                apiKey: CONFIG.API_KEY,
                action: 'undo'
            })
        });

        // Check response status before parsing
        if (!response.ok) {
            const errorText = await response.text();
            console.error('HTTP error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get response text first to check if it's valid JSON
        const responseText = await response.text();
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse JSON response:', responseText);
            throw new Error('Invalid JSON response from server');
        }

        if (result.success) {
            const deletedEntry = result.deletedEntry || lastEntry;
            showFeedback(
                `Deleted: ${formatCurrency(deletedEntry.amount)} - ${deletedEntry.category}`, 
                'success'
            );
            // Update budget if returned
            if (result.budget) {
                updateBudgetDisplay(result.budget);
            } else {
                fetchBudget(); // Fetch budget if not returned
            }
            // Update undo button state after deletion
            await updateUndoButtonState();
        } else {
            showFeedback(result.error || 'Failed to undo', 'error');
            // Update button state in case of error
            await updateUndoButtonState();
        }
    } catch (error) {
        // Show more specific error message
        const errorMsg = error.message || 'Network error. Please try again.';
        showFeedback(errorMsg, 'error');
        console.error('Undo error details:', error);
        console.error('Error stack:', error.stack);
        // Re-enable button on error
        undoBtn.disabled = false;
        await updateUndoButtonState();
    } finally {
        loading.classList.remove('show');
    }
}

// ============================================================================
// FORM MANAGEMENT
// ============================================================================

/**
 * Resets the form to its initial state
 * Clears all inputs, removes selections, and hides notes
 */
function resetForm() {
    amountInput.value = '';
    amountInput.classList.remove('error');
    notesInput.value = '';
    categoryButtons.forEach(b => b.classList.remove('selected'));
    selectedCategory = null;
    notesWrapper.classList.remove('show');
    notesToggle.innerHTML = '<span>Add notes</span>';
    amountError.classList.remove('show');
    categoryError.classList.remove('show');
    amountInput.focus();
}

// ============================================================================
// BUDGET MANAGEMENT
// ============================================================================

/**
 * Fetches current budget information from Google Sheets
 * Called on page load and after expense operations
 */
async function fetchBudget() {
    try {
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                apiKey: CONFIG.API_KEY,
                action: 'getBudget'
            })
        });

        const result = await response.json();

        if (result.success && result.budget) {
            updateBudgetDisplay(result.budget);
        } else {
            budgetRemaining.textContent = '$0.00';
        }
    } catch (error) {
        console.error('Error fetching budget:', error);
        budgetRemaining.textContent = 'Error';
    }
}

/**
 * Updates the budget display with current values
 * Applies color coding based on budget status:
 * - Red: Negative (over budget)
 * - Orange: Low (less than 20% remaining)
 * - Default: Normal
 * 
 * @param {Object} budget - Budget object with startingBudget, totalSpent, remaining
 */
function updateBudgetDisplay(budget) {
    const remaining = budget.remaining || 0;
    budgetRemaining.textContent = formatCurrency(remaining);
    
    // Optional: Change color if budget is low
    if (remaining < 0) {
        budgetRemaining.style.color = '#B71C1C';
    } else if (remaining < budget.startingBudget * 0.2) {
        budgetRemaining.style.color = '#D97706';
    } else {
        budgetRemaining.style.color = '#1A1A1A';
    }
}

/**
 * Formats a number as currency with commas and dollar sign
 * Example: 1234.56 -> "$1,234.56"
 * 
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
