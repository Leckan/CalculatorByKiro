/**
 * CalculatorView - Handles the user interface rendering and updates
 * Manages display, buttons, and mode indicators
 */
class CalculatorView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }

        this.mainDisplay = null;
        this.secondaryDisplay = null;
        this.angleModeIndicator = null;
        this.memoryIndicator = null;
        this.parenthesisIndicator = null;
        this.errorDisplay = null;

        // Event handler storage
        this.handlers = {
            number: null,
            operator: null,
            function: null,
            control: null
        };
    }

    /**
     * Renders the complete calculator UI structure
     */
    render() {
        this.container.innerHTML = '';
        this.container.className = 'calculator';

        // Create display area
        const displayArea = this._createDisplayArea();
        this.container.appendChild(displayArea);

        // Create button grid
        const buttonGrid = this._createButtonGrid();
        this.container.appendChild(buttonGrid);
    }

    /**
     * Creates the display area with main/secondary displays and indicators
     */
    _createDisplayArea() {
        const displayArea = document.createElement('div');
        displayArea.className = 'display-area';

        // Secondary display (expression)
        this.secondaryDisplay = document.createElement('div');
        this.secondaryDisplay.className = 'secondary-display';
        this.secondaryDisplay.textContent = '';
        displayArea.appendChild(this.secondaryDisplay);

        // Main display (current value/result)
        this.mainDisplay = document.createElement('div');
        this.mainDisplay.className = 'main-display';
        this.mainDisplay.textContent = '0';
        displayArea.appendChild(this.mainDisplay);

        // Mode indicators row
        const indicatorsRow = document.createElement('div');
        indicatorsRow.className = 'indicators-row';

        // Angle mode indicator
        this.angleModeIndicator = document.createElement('span');
        this.angleModeIndicator.className = 'indicator angle-mode';
        this.angleModeIndicator.textContent = 'DEG';
        indicatorsRow.appendChild(this.angleModeIndicator);

        // Memory indicator
        this.memoryIndicator = document.createElement('span');
        this.memoryIndicator.className = 'indicator memory';
        this.memoryIndicator.textContent = '';
        indicatorsRow.appendChild(this.memoryIndicator);

        // Parenthesis level indicator
        this.parenthesisIndicator = document.createElement('span');
        this.parenthesisIndicator.className = 'indicator parenthesis';
        this.parenthesisIndicator.textContent = '(0)';
        indicatorsRow.appendChild(this.parenthesisIndicator);

        displayArea.appendChild(indicatorsRow);

        // Error display
        this.errorDisplay = document.createElement('div');
        this.errorDisplay.className = 'error-display';
        this.errorDisplay.style.display = 'none';
        displayArea.appendChild(this.errorDisplay);

        return displayArea;
    }

    /**
     * Creates the button grid with all calculator buttons
     */
    _createButtonGrid() {
        const buttonGrid = document.createElement('div');
        buttonGrid.className = 'button-grid';

        // Button layout definition - compact 4-column layout
        // Maximum 4 buttons per row for clean, organized appearance
        const buttonLayout = [
            // Row 1: Memory functions
            [
                { text: 'MC', type: 'control', action: 'memory-clear' },
                { text: 'MR', type: 'control', action: 'memory-recall' },
                { text: 'M+', type: 'control', action: 'memory-add' },
                { text: 'MS', type: 'control', action: 'memory-store' }
            ],
            // Row 2: Clear functions
            [
                { text: 'AC', type: 'control', action: 'all-clear' },
                { text: 'C', type: 'control', action: 'clear' },
                { text: '⌫', type: 'control', action: 'backspace' },
                { text: '÷', type: 'operator', action: '/' }
            ],
            // Row 3: Trigonometric functions
            [
                { text: 'sin', type: 'function', action: 'sin' },
                { text: 'cos', type: 'function', action: 'cos' },
                { text: 'tan', type: 'function', action: 'tan' },
                { text: 'DEG/RAD', type: 'control', action: 'angle-mode' }
            ],
            // Row 4: Logarithmic and constants
            [
                { text: 'ln', type: 'function', action: 'ln' },
                { text: 'log', type: 'function', action: 'log' },
                { text: 'e', type: 'function', action: 'e' },
                { text: 'π', type: 'function', action: 'pi' }
            ],
            // Row 5: Root, power, factorial, exp
            [
                { text: '√', type: 'function', action: 'sqrt' },
                { text: '^', type: 'operator', action: '^' },
                { text: '!', type: 'function', action: 'factorial' },
                { text: 'exp', type: 'function', action: 'exp' }
            ],
            // Row 6: Parentheses and number pad row 1
            [
                { text: '(', type: 'control', action: 'open-paren' },
                { text: ')', type: 'control', action: 'close-paren' },
                { text: '7', type: 'number', action: '7' },
                { text: '×', type: 'operator', action: '*' }
            ],
            // Row 7: Number pad row 2
            [
                { text: '±', type: 'control', action: 'negate' },
                { text: '8', type: 'number', action: '8' },
                { text: '9', type: 'number', action: '9' },
                { text: '-', type: 'operator', action: '-' }
            ],
            // Row 8: Number pad row 3
            [
                { text: '4', type: 'number', action: '4' },
                { text: '5', type: 'number', action: '5' },
                { text: '6', type: 'number', action: '6' },
                { text: '+', type: 'operator', action: '+' }
            ],
            // Row 9: Number pad row 4
            [
                { text: '1', type: 'number', action: '1' },
                { text: '2', type: 'number', action: '2' },
                { text: '3', type: 'number', action: '3' },
                { text: '=', type: 'control', action: 'equals', className: 'equals-button' }
            ],
            // Row 10: Bottom row with 0 spanning 2 columns
            [
                { text: '0', type: 'number', action: '0', className: 'zero-button' },
                { text: '.', type: 'control', action: 'decimal' }
            ]
        ];

        // Create buttons
        buttonLayout.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'button-row';

            row.forEach(buttonDef => {
                // Skip empty buttons (spacers)
                if (buttonDef.type === 'empty') {
                    const spacer = document.createElement('div');
                    spacer.className = 'button-spacer';
                    rowDiv.appendChild(spacer);
                    return;
                }

                const button = document.createElement('button');
                button.className = `calc-button ${buttonDef.type}-button`;
                if (buttonDef.className) {
                    button.className += ` ${buttonDef.className}`;
                }
                button.textContent = buttonDef.text;
                button.dataset.type = buttonDef.type;
                button.dataset.action = buttonDef.action;

                // Add click event listener
                button.addEventListener('click', () => {
                    // Add button press animation (Task 8: Requirements 2.1, 2.5)
                    this._triggerButtonPressAnimation(button);
                    this._handleButtonClick(buttonDef.type, buttonDef.action);
                });

                rowDiv.appendChild(button);
            });

            buttonGrid.appendChild(rowDiv);
        });

        return buttonGrid;
    }

    /**
     * Triggers button press animation
     * Task 8: Requirements 2.1, 2.5
     * @param {HTMLElement} button - The button element to animate
     */
    _triggerButtonPressAnimation(button) {
        // Add 'pressed' class to trigger animation
        button.classList.add('pressed');
        
        // Remove 'pressed' class after animation completes (150ms)
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 150);
    }

    /**
     * Triggers display update animation
     * Task 9: Requirements 2.3, 9.3
     */
    _triggerDisplayUpdateAnimation() {
        if (this.mainDisplay) {
            // Add 'updating' class to trigger animation
            this.mainDisplay.classList.add('updating');
            
            // Remove 'updating' class after animation completes (250ms)
            setTimeout(() => {
                this.mainDisplay.classList.remove('updating');
            }, 250);
        }
    }

    /**
     * Triggers result highlight animation on calculation completion
     * Task 14: Requirements 9.1, 9.4
     */
    _triggerResultHighlightAnimation() {
        if (this.mainDisplay) {
            // Add 'result-highlight' class to trigger animation
            this.mainDisplay.classList.add('result-highlight');
            
            // Remove 'result-highlight' class after animation completes (250ms)
            setTimeout(() => {
                this.mainDisplay.classList.remove('result-highlight');
            }, 250);
        }
    }

    /**
     * Triggers equals button feedback animation
     * Task 14: Requirements 9.2, 9.4
     */
    _triggerEqualsButtonAnimation() {
        // Find the equals button
        const equalsButton = this.container.querySelector('.equals-button');
        if (equalsButton) {
            // Add 'calculating' class to trigger animation
            equalsButton.classList.add('calculating');
            
            // Remove 'calculating' class after animation completes (250ms)
            setTimeout(() => {
                equalsButton.classList.remove('calculating');
            }, 250);
        }
    }

    /**
     * Triggers result fade-in animation for long calculations
     * Task 14: Requirements 9.3, 9.4
     */
    _triggerResultFadeInAnimation() {
        if (this.mainDisplay) {
            // Add 'result-fade-in' class to trigger animation
            this.mainDisplay.classList.add('result-fade-in');
            
            // Remove 'result-fade-in' class after animation completes (250ms)
            setTimeout(() => {
                this.mainDisplay.classList.remove('result-fade-in');
            }, 250);
        }
    }

    /**
     * Triggers error shake animation on display area
     * Task 10: Requirements 2.4
     */
    _triggerErrorShakeAnimation() {
        const displayArea = this.mainDisplay?.parentElement;
        if (displayArea && displayArea.classList.contains('display-area')) {
            // Add 'error' class to trigger animation and red tint
            displayArea.classList.add('error');
            
            // Remove 'error' class after animation completes (500ms)
            setTimeout(() => {
                displayArea.classList.remove('error');
            }, 500);
        }
    }

    /**
     * Handles button click events and dispatches to appropriate handler
     */
    _handleButtonClick(type, action) {
        switch (type) {
            case 'number':
                if (this.handlers.number) {
                    this.handlers.number(action);
                }
                break;
            case 'operator':
                if (this.handlers.operator) {
                    this.handlers.operator(action);
                }
                break;
            case 'function':
                if (this.handlers.function) {
                    this.handlers.function(action);
                }
                break;
            case 'control':
                if (this.handlers.control) {
                    this.handlers.control(action);
                }
                break;
        }
    }

    /**
     * Updates the main display with a value
     * Requirements: 7.2, 7.3, 7.4, 1.5
     * Task 9: Triggers display update animation - Requirements 2.3, 9.3
     */
    updateDisplay(value) {
        try {
            if (this.mainDisplay) {
                // Validate input
                if (value === null || value === undefined) {
                    value = '0';
                }
                // Ensure value fits in display, truncate if necessary
                const displayValue = this._formatForDisplay(String(value));
                
                // Only trigger animation if the value actually changed
                if (this.mainDisplay.textContent !== displayValue) {
                    this._triggerDisplayUpdateAnimation();
                }
                
                this.mainDisplay.textContent = displayValue;
            }
        } catch (error) {
            console.error('Error updating display:', error);
            if (this.mainDisplay) {
                this.mainDisplay.textContent = 'Error';
            }
        }
    }

    /**
     * Format value to fit in display area
     * Requirements: 7.2, 7.3, 7.4
     * @param {string} value - Value to format
     * @returns {string} Formatted value
     */
    _formatForDisplay(value) {
        // If value is too long, it will be handled by CSS overflow
        // But we can add ellipsis for very long numbers
        const maxLength = 15;
        if (value.length > maxLength && !value.includes('e')) {
            // If it's a very long number without scientific notation,
            // the formatter should have already handled it
            return value;
        }
        return value;
    }

    /**
     * Updates the secondary display (expression)
     * Requirements: 1.5
     */
    updateSecondaryDisplay(expression) {
        try {
            if (this.secondaryDisplay) {
                this.secondaryDisplay.textContent = expression || '';
            }
        } catch (error) {
            console.error('Error updating secondary display:', error);
        }
    }

    /**
     * Updates the angle mode indicator (DEG or RAD)
     * Requirements: 1.5
     * Task 11: Adds smooth transitions and active state - Requirements 6.1
     */
    updateAngleModeIndicator(mode) {
        try {
            if (this.angleModeIndicator && mode) {
                const modeText = String(mode).toUpperCase();
                this.angleModeIndicator.textContent = modeText;
                
                // Add active class for visual feedback (always active to show current mode)
                // The active class provides scale and glow effect
                this.angleModeIndicator.classList.add('active');
            }
        } catch (error) {
            console.error('Error updating angle mode indicator:', error);
        }
    }

    /**
     * Updates the memory indicator
     * Requirements: 1.5
     * Task 11: Adds pulse animation when memory has value - Requirements 6.2
     */
    updateMemoryIndicator(hasValue) {
        try {
            if (this.memoryIndicator) {
                this.memoryIndicator.textContent = hasValue ? 'M' : '';
                
                // Add/remove active class to trigger pulse animation
                if (hasValue) {
                    this.memoryIndicator.classList.add('active');
                } else {
                    this.memoryIndicator.classList.remove('active');
                }
            }
        } catch (error) {
            console.error('Error updating memory indicator:', error);
        }
    }

    /**
     * Updates the parenthesis level indicator
     * Requirements: 8.3, 1.5
     * Task 11: Adds smooth transitions for level changes - Requirements 6.3
     */
    updateParenthesisLevel(level) {
        try {
            if (this.parenthesisIndicator) {
                const validLevel = (typeof level === 'number' && level >= 0) ? level : 0;
                this.parenthesisIndicator.textContent = `(${validLevel})`;
                
                // Add active class when parenthesis level > 0
                if (validLevel > 0) {
                    this.parenthesisIndicator.classList.add('active');
                } else {
                    this.parenthesisIndicator.classList.remove('active');
                }
            }
        } catch (error) {
            console.error('Error updating parenthesis level:', error);
        }
    }

    /**
     * Shows an error message
     * Requirements: 1.5, 3.5, 4.3, 4.4, 8.3
     * Task 10: Triggers error shake animation - Requirements 2.4
     */
    showError(message) {
        try {
            if (this.errorDisplay) {
                this.errorDisplay.textContent = message || 'Error';
                this.errorDisplay.style.display = 'block';
                
                // Trigger error shake animation (Task 10: Requirements 2.4)
                this._triggerErrorShakeAnimation();
            }
        } catch (error) {
            console.error('Error showing error message:', error);
        }
    }

    /**
     * Clears the error display
     * Requirements: 1.5
     */
    clearError() {
        try {
            if (this.errorDisplay) {
                this.errorDisplay.textContent = '';
                this.errorDisplay.style.display = 'none';
            }
        } catch (error) {
            console.error('Error clearing error display:', error);
        }
    }

    /**
     * Binds a handler for number button clicks
     */
    bindNumberButton(handler) {
        this.handlers.number = handler;
    }

    /**
     * Binds a handler for operator button clicks
     */
    bindOperatorButton(handler) {
        this.handlers.operator = handler;
    }

    /**
     * Binds a handler for function button clicks
     */
    bindFunctionButton(handler) {
        this.handlers.function = handler;
    }

    /**
     * Binds a handler for control button clicks
     */
    bindControlButton(handler) {
        this.handlers.control = handler;
    }

    /**
     * Triggers calculation completion feedback animations
     * Task 14: Requirements 9.1, 9.2, 9.3, 9.4, 9.5
     * @param {boolean} isLongCalculation - Whether this was a long/complex calculation
     */
    triggerCalculationFeedback(isLongCalculation = false) {
        // Trigger equals button animation (Requirements 9.2, 9.4)
        this._triggerEqualsButtonAnimation();
        
        // Trigger appropriate result animation based on calculation complexity
        if (isLongCalculation) {
            // For long calculations, use fade-in effect (Requirements 9.3, 9.4)
            this._triggerResultFadeInAnimation();
        } else {
            // For normal calculations, use highlight effect (Requirements 9.1, 9.4)
            this._triggerResultHighlightAnimation();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculatorView;
}
