/**
 * CalculatorController - Coordinates between view and model
 * Handles user interactions and updates the display
 * Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 7.1, 7.2
 */
class CalculatorController {
    /**
     * Initialize the controller with all dependencies
     * @param {CalculatorEngine} engine - The calculation engine
     * @param {StateManager} stateManager - The state manager
     * @param {MemoryManager} memoryManager - The memory manager
     * @param {CalculatorView} view - The view component
     */
    constructor(engine, stateManager, memoryManager, view) {
        this.engine = engine;
        this.stateManager = stateManager;
        this.memoryManager = memoryManager;
        this.view = view;
        this.parser = new ExpressionParser(engine);

        // Flag to track if we just calculated a result
        this.justCalculated = false;
    }

    /**
     * Handle number input from user
     * Requirements: 1.1, 7.1, 1.5
     * @param {string} digit - The digit pressed (0-9)
     */
    handleNumberInput(digit) {
        try {
            // Validate input
            if (typeof digit !== 'string' || !/^[0-9]$/.test(digit)) {
                throw new Error('Invalid input');
            }

            this.view.clearError();

            // If we just calculated, start fresh with new number
            if (this.justCalculated) {
                this.stateManager.setExpression('');
                this.stateManager.setInputBuffer('');
                this.justCalculated = false;
            }

            const currentBuffer = this.stateManager.getInputBuffer();

            // Prevent multiple leading zeros
            if (currentBuffer === '0' && digit === '0') {
                return;
            }

            // Replace leading zero with new digit
            if (currentBuffer === '0' && digit !== '.') {
                this.stateManager.setInputBuffer(digit);
            } else {
                this.stateManager.setInputBuffer(currentBuffer + digit);
            }

            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle operator input from user
     * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
     * @param {string} operator - The operator (+, -, *, /, ^)
     */
    handleOperatorInput(operator) {
        try {
            // Validate input
            if (typeof operator !== 'string' || !this.isOperator(operator)) {
                throw new Error('Invalid input');
            }

            this.view.clearError();

            const currentBuffer = this.stateManager.getInputBuffer();
            const currentExpression = this.stateManager.getExpression();

            // If we just calculated, use the result as the start of new expression
            if (this.justCalculated) {
                const lastResult = this.stateManager.getLastResult();
                if (lastResult !== null && isFinite(lastResult)) {
                    this.stateManager.setExpression(String(lastResult) + operator);
                    this.stateManager.setInputBuffer('');
                    this.justCalculated = false;
                    this.updateDisplay();
                    return;
                }
            }

            // If there's a number in the buffer, add it to the expression
            if (currentBuffer) {
                this.stateManager.setExpression(currentExpression + currentBuffer + operator);
                this.stateManager.setInputBuffer('');
            } else if (currentExpression) {
                // Replace the last operator if expression ends with an operator
                const lastChar = currentExpression[currentExpression.length - 1];
                if (this.isOperator(lastChar)) {
                    this.stateManager.setExpression(
                        currentExpression.slice(0, -1) + operator
                    );
                } else {
                    this.stateManager.setExpression(currentExpression + operator);
                }
            }

            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle scientific function input from user
     * Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 3.5, 4.3, 4.4
     * @param {string} functionName - The function name (sin, cos, tan, ln, log, sqrt, etc.)
     */
    handleScientificFunction(functionName) {
        try {
            // Validate input
            const validFunctions = ['sin', 'cos', 'tan', 'ln', 'log', 'sqrt', 'exp', 'factorial', 'pi', 'e'];
            if (typeof functionName !== 'string' || !validFunctions.includes(functionName)) {
                throw new Error('Invalid input');
            }

            this.view.clearError();

            const currentBuffer = this.stateManager.getInputBuffer();
            const currentExpression = this.stateManager.getExpression();

            // Handle special constants
            if (functionName === 'pi') {
                const piValue = Math.PI.toString();
                if (this.justCalculated) {
                    this.stateManager.setExpression('');
                    this.justCalculated = false;
                }
                this.stateManager.setInputBuffer(piValue);
                this.updateDisplay();
                return;
            }

            if (functionName === 'e') {
                const eValue = Math.E.toString();
                if (this.justCalculated) {
                    this.stateManager.setExpression('');
                    this.justCalculated = false;
                }
                this.stateManager.setInputBuffer(eValue);
                this.updateDisplay();
                return;
            }

            // For functions, add them to the expression with opening parenthesis
            if (this.justCalculated) {
                this.stateManager.setExpression('');
                this.justCalculated = false;
            }

            // If there's a number in buffer, add it to expression first
            let newExpression = currentExpression;
            if (currentBuffer) {
                newExpression += currentBuffer;
            }

            // Add function with opening parenthesis
            newExpression += functionName + '(';
            this.stateManager.setExpression(newExpression);
            this.stateManager.setInputBuffer('');

            // Update parenthesis level
            const parenLevel = this.stateManager.getParenthesisLevel();
            if (parenLevel >= 10) {
                throw new Error('Maximum parenthesis depth reached');
            }
            this.stateManager.setParenthesisLevel(parenLevel + 1);

            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle equals button - evaluate the expression
     * Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1
     * Task 14: Added calculation completion feedback - Requirements 9.1, 9.2, 9.3, 9.4, 9.5
     */
    handleEquals() {
        try {
            this.view.clearError();

            const currentBuffer = this.stateManager.getInputBuffer();
            const currentExpression = this.stateManager.getExpression();

            // Build complete expression
            let fullExpression = currentExpression + currentBuffer;

            // If expression is empty or just a number, nothing to calculate
            if (!fullExpression || !this.containsOperation(fullExpression)) {
                return;
            }

            // Determine if this is a long/complex calculation
            // Consider it long if it has multiple operations, functions, or parentheses
            const isLongCalculation = this._isComplexExpression(fullExpression);

            // Evaluate the expression
            const angleMode = this.stateManager.getAngleMode();
            const result = this.parser.evaluate(fullExpression, angleMode);

            // Store result and update display
            this.stateManager.setLastResult(result);
            this.stateManager.setInputBuffer(this.formatNumber(result));
            this.stateManager.setExpression('');
            this.stateManager.setParenthesisLevel(0);
            this.justCalculated = true;

            this.updateDisplay();

            // Trigger calculation completion feedback (Task 14: Requirements 9.1, 9.2, 9.3, 9.4, 9.5)
            this.view.triggerCalculationFeedback(isLongCalculation);
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle decimal point input
     * Requirements: 7.1, 7.2, 1.5
     */
    handleDecimalPoint() {
        try {
            this.view.clearError();

            if (this.justCalculated) {
                this.stateManager.setExpression('');
                this.stateManager.setInputBuffer('0.');
                this.justCalculated = false;
            } else {
                const currentBuffer = this.stateManager.getInputBuffer();

                // Only add decimal if there isn't one already
                if (!currentBuffer.includes('.')) {
                    // If buffer is empty, start with "0."
                    if (!currentBuffer) {
                        this.stateManager.setInputBuffer('0.');
                    } else {
                        this.stateManager.setInputBuffer(currentBuffer + '.');
                    }
                }
            }

            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Update the display with current state
     * Requirements: 7.1, 7.2, 7.3, 7.4, 1.5
     */
    updateDisplay() {
        try {
            const currentBuffer = this.stateManager.getInputBuffer();
            const currentExpression = this.stateManager.getExpression();

            // Update main display with formatted value
            if (currentBuffer) {
                // For input buffer, check if it's a complete number that should be formatted
                // or if it's still being typed (preserve trailing decimal point, etc.)
                const displayValue = this.formatDisplayValue(currentBuffer);
                this.view.updateDisplay(displayValue);
            } else if (!currentExpression) {
                this.view.updateDisplay('0');
            } else {
                this.view.updateDisplay('0');
            }

            // Update secondary display (expression)
            this.view.updateSecondaryDisplay(currentExpression);

            // Update indicators
            this.view.updateAngleModeIndicator(this.stateManager.getAngleMode());
            this.view.updateMemoryIndicator(this.memoryManager.hasValue());
            this.view.updateParenthesisLevel(this.stateManager.getParenthesisLevel());
        } catch (error) {
            // If display update fails, show error but don't throw
            console.error('Display update error:', error);
            this.showError('Error: Display update failed');
        }
    }

    /**
     * Format a value for display, preserving input state when appropriate
     * Requirements: 7.2, 7.3, 7.4, 1.5
     * @param {string} value - The value to format
     * @returns {string} Formatted display value
     */
    formatDisplayValue(value) {
        try {
            // Validate input
            if (typeof value !== 'string') {
                return '0';
            }

            // If the value ends with a decimal point or is being typed, preserve it
            if (value.endsWith('.') || value.endsWith('.0')) {
                return value;
            }

            // If it's a valid number, format it
            const num = parseFloat(value);
            if (!isNaN(num) && isFinite(num)) {
                // Only format if it's not actively being typed (has many digits)
                if (value.length > 10 || value.includes('e')) {
                    return NumberFormatter.format(num);
                }
                // Otherwise preserve the input as-is for better UX
                return value;
            }

            return value;
        } catch (error) {
            console.error('Format display value error:', error);
            return '0';
        }
    }

    /**
     * Format a number for display
     * Requirements: 7.2, 7.3, 7.4, 1.5
     * @param {number} value - The number to format
     * @returns {string} Formatted number string
     */
    formatNumber(value) {
        try {
            // Validate input
            if (typeof value !== 'number' || !isFinite(value)) {
                throw new Error('Invalid number');
            }
            return NumberFormatter.format(value);
        } catch (error) {
            console.error('Format number error:', error);
            return '0';
        }
    }

    /**
     * Handle clear entry (CE) - clears input buffer but preserves expression
     * Requirements: 5.1, 1.5
     */
    handleClear() {
        try {
            this.view.clearError();
            this.stateManager.clearInputBuffer();
            this.stateManager.clearError();
            this.justCalculated = false;
            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle all clear (AC) - resets calculator to initial state
     * Requirements: 5.2, 1.5
     */
    handleAllClear() {
        try {
            this.view.clearError();
            this.stateManager.reset();
            this.justCalculated = false;
            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle backspace - removes last character from input buffer
     * Requirements: 5.3, 1.5
     */
    handleBackspace() {
        try {
            this.view.clearError();

            // If we just calculated, backspace should clear the result
            if (this.justCalculated) {
                this.stateManager.setInputBuffer('');
                this.justCalculated = false;
            } else {
                this.stateManager.backspace();
            }

            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle angle mode toggle between degrees and radians
     * Requirements: 2.4, 1.5
     */
    handleAngleModeToggle() {
        try {
            this.view.clearError();
            const newMode = this.stateManager.toggleAngleMode();
            this.updateDisplay();
            return newMode;
        } catch (error) {
            this.showError('Error: ' + error.message);
            return this.stateManager.getAngleMode();
        }
    }

    /**
     * Handle parenthesis input (open or close)
     * Requirements: 8.1, 8.3, 1.5
     * @param {string} type - Either 'open' or 'close'
     */
    handleParenthesis(type) {
        try {
            // Validate input
            if (type !== 'open' && type !== 'close') {
                throw new Error('Invalid input');
            }

            this.view.clearError();

            const currentBuffer = this.stateManager.getInputBuffer();
            const currentExpression = this.stateManager.getExpression();
            const parenLevel = this.stateManager.getParenthesisLevel();

            if (type === 'open') {
                // If we just calculated, start fresh
                if (this.justCalculated) {
                    this.stateManager.setExpression('');
                    this.justCalculated = false;
                }

                // If there's a number in buffer, add it to expression first
                let newExpression = currentExpression;
                if (currentBuffer) {
                    newExpression += currentBuffer;
                    this.stateManager.setInputBuffer('');
                }

                // Add opening parenthesis
                newExpression += '(';
                this.stateManager.setExpression(newExpression);

                // Increment parenthesis level (max 10 levels)
                if (parenLevel < 10) {
                    this.stateManager.setParenthesisLevel(parenLevel + 1);
                } else {
                    throw new Error('Maximum parenthesis depth reached');
                }
            } else if (type === 'close') {
                // Can only close if we have open parentheses
                if (parenLevel > 0) {
                    // If there's a number in buffer, add it to expression first
                    let newExpression = currentExpression;
                    if (currentBuffer) {
                        newExpression += currentBuffer;
                        this.stateManager.setInputBuffer('');
                    }

                    // Add closing parenthesis
                    newExpression += ')';
                    this.stateManager.setExpression(newExpression);

                    // Decrement parenthesis level
                    this.stateManager.setParenthesisLevel(parenLevel - 1);
                } else {
                    throw new Error('No matching opening parenthesis');
                }
            }

            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle memory store - saves current display value to memory
     * Requirements: 6.1, 1.5
     */
    handleMemoryStore() {
        try {
            this.view.clearError();

            const currentBuffer = this.stateManager.getInputBuffer();

            // Get the value to store (either from buffer or last result)
            let valueToStore;
            if (currentBuffer) {
                valueToStore = parseFloat(currentBuffer);
            } else {
                const lastResult = this.stateManager.getLastResult();
                if (lastResult !== null) {
                    valueToStore = lastResult;
                } else {
                    valueToStore = 0;
                }
            }

            // Validate value
            if (!isNaN(valueToStore) && isFinite(valueToStore)) {
                this.memoryManager.store(valueToStore);
                this.updateDisplay();
            } else {
                throw new Error('Invalid value for memory');
            }
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle memory recall - displays the value stored in memory
     * Requirements: 6.2, 1.5
     */
    handleMemoryRecall() {
        try {
            this.view.clearError();

            const memoryValue = this.memoryManager.recall();

            // Validate memory value
            if (!isFinite(memoryValue)) {
                throw new Error('Invalid memory value');
            }

            // If we just calculated, start fresh
            if (this.justCalculated) {
                this.stateManager.setExpression('');
                this.justCalculated = false;
            }

            // Put memory value in input buffer
            this.stateManager.setInputBuffer(this.formatNumber(memoryValue));
            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle memory clear - resets memory to zero
     * Requirements: 6.3, 1.5
     */
    handleMemoryClear() {
        try {
            this.view.clearError();

            this.memoryManager.clear();
            this.updateDisplay();
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle memory add - adds current display value to memory
     * Requirements: 6.4, 1.5
     */
    handleMemoryAdd() {
        try {
            this.view.clearError();

            const currentBuffer = this.stateManager.getInputBuffer();

            // Get the value to add (either from buffer or last result)
            let valueToAdd;
            if (currentBuffer) {
                valueToAdd = parseFloat(currentBuffer);
            } else {
                const lastResult = this.stateManager.getLastResult();
                if (lastResult !== null) {
                    valueToAdd = lastResult;
                } else {
                    valueToAdd = 0;
                }
            }

            // Validate and add to memory
            if (!isNaN(valueToAdd) && isFinite(valueToAdd)) {
                this.memoryManager.add(valueToAdd);
                this.updateDisplay();
            } else {
                throw new Error('Invalid value for memory');
            }
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Handle negate (+/-) - toggles the sign of the current number
     * Requirements: 1.5
     */
    handleNegate() {
        try {
            this.view.clearError();

            const currentBuffer = this.stateManager.getInputBuffer();

            // If we just calculated, negate the result
            if (this.justCalculated) {
                const lastResult = this.stateManager.getLastResult();
                if (lastResult !== null && isFinite(lastResult)) {
                    const negated = -lastResult;
                    this.stateManager.setLastResult(negated);
                    this.stateManager.setInputBuffer(this.formatNumber(negated));
                    this.updateDisplay();
                }
                return;
            }

            // If there's a number in the buffer, negate it
            if (currentBuffer && currentBuffer !== '0') {
                const num = parseFloat(currentBuffer);
                if (!isNaN(num) && isFinite(num)) {
                    const negated = -num;
                    this.stateManager.setInputBuffer(String(negated));
                    this.updateDisplay();
                }
            } else if (!currentBuffer || currentBuffer === '0') {
                // If buffer is empty or zero, start with negative sign
                this.stateManager.setInputBuffer('-');
                this.updateDisplay();
            }
        } catch (error) {
            this.showError('Error: ' + error.message);
        }
    }

    /**
     * Show an error message
     * @param {string} message - The error message to display
     */
    showError(message) {
        this.view.showError(message);
        this.stateManager.setError(message);
    }

    /**
     * Helper method to check if a character is an operator
     * @param {string} char - Character to check
     * @returns {boolean} True if character is an operator
     */
    isOperator(char) {
        return ['+', '-', '*', '/', '×', '÷', '^'].includes(char);
    }

    /**
     * Helper method to check if expression contains an operation
     * @param {string} expression - Expression to check
     * @returns {boolean} True if expression contains operators or functions
     */
    containsOperation(expression) {
        return /[+\-*/×÷^()]|sin|cos|tan|ln|log|sqrt|exp|factorial/.test(expression);
    }

    /**
     * Helper method to determine if an expression is complex/long
     * Task 14: Requirements 9.3, 9.5
     * @param {string} expression - Expression to check
     * @returns {boolean} True if expression is complex (multiple operations, functions, or parentheses)
     */
    _isComplexExpression(expression) {
        // Count operators
        const operatorCount = (expression.match(/[+\-*/×÷^]/g) || []).length;
        
        // Count functions
        const functionCount = (expression.match(/sin|cos|tan|ln|log|sqrt|exp|factorial/g) || []).length;
        
        // Count parentheses pairs
        const parenCount = (expression.match(/\(/g) || []).length;
        
        // Consider it complex if it has:
        // - More than 2 operators, OR
        // - Any functions, OR
        // - Any parentheses (nested operations)
        return operatorCount > 2 || functionCount > 0 || parenCount > 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculatorController;
}
