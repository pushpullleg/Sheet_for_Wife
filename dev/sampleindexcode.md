<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Budget Tracker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
            background: #F5F5F7;
            min-height: 100vh;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-font-smoothing: antialiased;
        }

        .container {
            background: white;
            border-radius: 18px;
            padding: 32px 28px;
            max-width: 480px;
            width: 100%;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        h1 {
            text-align: center;
            color: #1D1D1F;
            margin-bottom: 8px;
            font-size: 32px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }

        .budget-info {
            text-align: center;
            color: #86868B;
            margin-bottom: 32px;
            font-size: 15px;
        }

        .budget-remaining {
            font-size: 28px;
            font-weight: 600;
            color: #1D1D1F;
            margin-top: 4px;
            letter-spacing: -0.5px;
        }

        .amount-section {
            margin-bottom: 28px;
        }

        .amount-section label {
            display: block;
            margin-bottom: 12px;
            color: #1D1D1F;
            font-weight: 600;
            font-size: 17px;
            letter-spacing: -0.3px;
        }

        .amount-input-wrapper {
            position: relative;
            margin-bottom: 16px;
        }

        .dollar-sign {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 28px;
            color: #1D1D1F;
            font-weight: 600;
        }

        #amount {
            width: 100%;
            padding: 16px 20px 16px 50px;
            font-size: 28px;
            border: 1.5px solid #D2D2D7;
            border-radius: 12px;
            outline: none;
            transition: all 0.2s ease;
            font-weight: 600;
            background: white;
            color: #1D1D1F;
        }

        #amount:focus {
            border-color: #007AFF;
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .quick-amounts {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }

        .quick-btn {
            padding: 12px;
            background: #F5F5F7;
            border: none;
            border-radius: 10px;
            font-size: 17px;
            font-weight: 600;
            color: #1D1D1F;
            cursor: pointer;
            transition: all 0.15s ease;
            letter-spacing: -0.3px;
        }

        .quick-btn:active {
            transform: scale(0.96);
            background: #E8E8ED;
        }

        .category-section {
            margin-bottom: 28px;
        }

        .category-section label {
            display: block;
            margin-bottom: 16px;
            color: #1D1D1F;
            font-weight: 600;
            font-size: 17px;
            letter-spacing: -0.3px;
        }

        .categories {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }

        .category-btn {
            padding: 18px 16px;
            background: #F5F5F7;
            border: 1.5px solid transparent;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.15s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }

        .category-btn:active {
            transform: scale(0.97);
        }

        .category-btn.selected {
            background: #007AFF;
            border-color: #007AFF;
            color: white;
        }

        .category-icon {
            font-size: 32px;
            filter: grayscale(0);
        }

        .category-name {
            font-size: 15px;
            font-weight: 600;
            color: #1D1D1F;
            letter-spacing: -0.2px;
        }

        .category-btn.selected .category-name {
            color: white;
        }

        .notes-section {
            margin-bottom: 28px;
        }

        .notes-toggle {
            background: none;
            border: none;
            color: #007AFF;
            cursor: pointer;
            font-size: 15px;
            padding: 12px 0;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 4px;
            letter-spacing: -0.2px;
        }

        .notes-toggle:active {
            opacity: 0.6;
        }

        .notes-input-wrapper {
            display: none;
            margin-top: 12px;
        }

        .notes-input-wrapper.show {
            display: block;
        }

        #notes {
            width: 100%;
            padding: 14px;
            border: 1.5px solid #D2D2D7;
            border-radius: 12px;
            font-size: 15px;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
            resize: vertical;
            min-height: 88px;
            outline: none;
            transition: all 0.2s ease;
            background: white;
            color: #1D1D1F;
        }

        #notes:focus {
            border-color: #007AFF;
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .actions {
            display: flex;
            gap: 10px;
        }

        .submit-btn, .undo-btn {
            flex: 1;
            padding: 16px;
            border: none;
            border-radius: 12px;
            font-size: 17px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
            letter-spacing: -0.3px;
        }

        .submit-btn {
            background: #007AFF;
            color: white;
        }

        .submit-btn:active:not(:disabled) {
            transform: scale(0.97);
            background: #0051D5;
        }

        .submit-btn:disabled {
            background: #D2D2D7;
            cursor: not-allowed;
            opacity: 0.6;
        }

        .undo-btn {
            background: #F5F5F7;
            color: #1D1D1F;
            flex: 0.35;
        }

        .undo-btn:active:not(:disabled) {
            transform: scale(0.97);
            background: #E8E8ED;
        }

        .undo-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .feedback {
            margin-top: 20px;
            padding: 14px 16px;
            border-radius: 12px;
            text-align: center;
            font-weight: 500;
            display: none;
            font-size: 15px;
            letter-spacing: -0.2px;
        }

        .feedback.show {
            display: block;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .feedback.success {
            background: #D1F4E0;
            color: #1D6F42;
        }

        .feedback.error {
            background: #FFE5E5;
            color: #D32F2F;
        }

        .loading {
            display: none;
            text-align: center;
            margin-top: 24px;
        }

        .loading.show {
            display: block;
        }

        .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #F5F5F7;
            border-top: 3px solid #007AFF;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading-text {
            margin-top: 12px;
            color: #86868B;
            font-size: 15px;
            font-weight: 500;
            letter-spacing: -0.2px;
        }

        .error-text {
            color: #D32F2F;
            font-size: 13px;
            margin-top: 8px;
            display: none;
            font-weight: 500;
        }

        .error-text.show {
            display: block;
        }

        @media (max-width: 480px) {
            .container {
                padding: 28px 20px;
            }

            h1 {
                font-size: 28px;
            }

            .budget-remaining {
                font-size: 24px;
            }

            .categories {
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
            }

            .category-btn {
                padding: 16px 12px;
            }

            .category-icon {
                font-size: 28px;
            }

            .quick-amounts {
                grid-template-columns: repeat(4, 1fr);
                gap: 6px;
            }

            .quick-btn {
                padding: 10px;
                font-size: 15px;
            }
        }

        @media (prefers-color-scheme: dark) {
            body {
                background: #000000;
            }

            .container {
                background: #1C1C1E;
            }

            h1, .budget-remaining, .category-name, #amount, #notes, .undo-btn {
                color: #F5F5F7;
            }

            .budget-info {
                color: #98989D;
            }

            #amount, #notes {
                background: #1C1C1E;
                border-color: #38383A;
            }

            #amount:focus, #notes:focus {
                border-color: #0A84FF;
                box-shadow: 0 0 0 4px rgba(10, 132, 255, 0.2);
            }

            .quick-btn {
                background: #2C2C2E;
                color: #F5F5F7;
            }

            .quick-btn:active {
                background: #3A3A3C;
            }

            .category-btn {
                background: #2C2C2E;
                border-color: transparent;
            }

            .category-btn.selected {
                background: #0A84FF;
            }

            .undo-btn {
                background: #2C2C2E;
            }

            .undo-btn:active:not(:disabled) {
                background: #3A3A3C;
            }

            .submit-btn {
                background: #0A84FF;
            }

            .submit-btn:active:not(:disabled) {
                background: #0077ED;
            }

            .submit-btn:disabled {
                background: #3A3A3C;
            }

            .spinner {
                border-color: #2C2C2E;
                border-top-color: #0A84FF;
            }

            .loading-text {
                color: #98989D;
            }

            .notes-toggle {
                color: #0A84FF;
            }

            .dollar-sign {
                color: #F5F5F7;
            }

            .feedback.success {
                background: #1D4123;
                color: #60D875;
            }

            .feedback.error {
                background: #3F1515;
                color: #FF6B6B;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Budget Tracker</h1>
        <div class="budget-info">
            <div>Budget Remaining</div>
            <div class="budget-remaining">$2,500.00</div>
        </div>

        <form id="expenseForm">
            <!-- Amount Section -->
            <div class="amount-section">
                <label for="amount">Amount</label>
                <div class="amount-input-wrapper">
                    <span class="dollar-sign">$</span>
                    <input type="text" id="amount" placeholder="0.00" inputmode="decimal" autocomplete="off">
                </div>
                <div class="error-text" id="amountError">Please enter a valid amount</div>
                
                <div class="quick-amounts">
                    <button type="button" class="quick-btn" data-amount="5">$5</button>
                    <button type="button" class="quick-btn" data-amount="10">$10</button>
                    <button type="button" class="quick-btn" data-amount="20">$20</button>
                    <button type="button" class="quick-btn" data-amount="50">$50</button>
                </div>
            </div>

            <!-- Category Section -->
            <div class="category-section">
                <label>Category</label>
                <div class="categories">
                    <div class="category-btn" data-category="Groceries">
                        <div class="category-icon">🛒</div>
                        <div class="category-name">Groceries</div>
                    </div>
                    <div class="category-btn" data-category="Dining">
                        <div class="category-icon">🍽️</div>
                        <div class="category-name">Dining</div>
                    </div>
                    <div class="category-btn" data-category="Shopping">
                        <div class="category-icon">🛍️</div>
                        <div class="category-name">Shopping</div>
                    </div>
                    <div class="category-btn" data-category="Travel">
                        <div class="category-icon">✈️</div>
                        <div class="category-name">Travel</div>
                    </div>
                    <div class="category-btn" data-category="Health">
                        <div class="category-icon">⚕️</div>
                        <div class="category-name">Health</div>
                    </div>
                    <div class="category-btn" data-category="Personal">
                        <div class="category-icon">👤</div>
                        <div class="category-name">Personal</div>
                    </div>
                    <div class="category-btn" data-category="Gifts">
                        <div class="category-icon">🎁</div>
                        <div class="category-name">Gifts</div>
                    </div>
                    <div class="category-btn" data-category="Misc">
                        <div class="category-icon">📦</div>
                        <div class="category-name">Misc</div>
                    </div>
                </div>
                <div class="error-text" id="categoryError">Please select a category</div>
            </div>

            <!-- Notes Section (Collapsible) -->
            <div class="notes-section">
                <button type="button" class="notes-toggle" id="notesToggle">
                    <span>Add notes</span>
                </button>
                <div class="notes-input-wrapper" id="notesWrapper">
                    <textarea id="notes" placeholder="Optional notes..."></textarea>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="actions">
                <button type="button" class="undo-btn" id="undoBtn">Undo</button>
                <button type="submit" class="submit-btn" id="submitBtn">Add Expense</button>
            </div>
        </form>

        <!-- Loading Spinner -->
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p class="loading-text">Processing...</p>
        </div>

        <!-- Feedback Message -->
        <div class="feedback" id="feedback"></div>
    </div>

    <script>
        // Configuration
        const CONFIG = {
            GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
            API_KEY: 'YOUR_SECRET_API_KEY_HERE'
        };

        // State
        let selectedCategory = null;

        // Elements
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

        // Validate amount
        function validateAmount(value) {
            const amount = parseFloat(value);
            if (isNaN(amount) || amount <= 0) {
                return false;
            }
            return true;
        }

        // Show feedback
        function showFeedback(message, type) {
            feedback.textContent = message;
            feedback.className = `feedback show ${type}`;
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 3000);
        }

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Reset errors
            amountError.classList.remove('show');
            categoryError.classList.remove('show');

            // Validate
            const amount = amountInput.value.trim();
            let hasError = false;

            if (!validateAmount(amount)) {
                amountError.classList.add('show');
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
                amount: parseFloat(amount),
                category: selectedCategory,
                notes: notesInput.value.trim()
            };

            try {
                const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    showFeedback('Expense added successfully', 'success');
                    // Reset form
                    amountInput.value = '';
                    notesInput.value = '';
                    categoryButtons.forEach(b => b.classList.remove('selected'));
                    selectedCategory = null;
                    notesWrapper.classList.remove('show');
                    notesToggle.innerHTML = '<span>Add notes</span>';
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
        });

        // Undo last entry
        undoBtn.addEventListener('click', async () => {
            if (!confirm('Delete the last expense entry?')) return;

            loading.classList.add('show');
            undoBtn.disabled = true;

            try {
                const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiKey: CONFIG.API_KEY,
                        action: 'undo'
                    })
                });

                const result = await response.json();

                if (result.success) {
                    showFeedback('Last expense deleted', 'success');
                } else {
                    showFeedback(result.error || 'Failed to undo', 'error');
                }
            } catch (error) {
                showFeedback('Network error. Please try again.', 'error');
                console.error('Error:', error);
            } finally {
                loading.classList.remove('show');
                undoBtn.disabled = false;
            }
        });

        // Format amount input on blur
        amountInput.addEventListener('blur', () => {
            const value = amountInput.value.trim();
            if (validateAmount(value)) {
                amountInput.value = parseFloat(value).toFixed(2);
            }
        });
    </script>
</body>
</html>