// Scientific Calculator - Main Entry Point

/**
 * Main application initialization
 * Instantiates all components and wires up event handlers
 * Requirements: All requirements
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Scientific Calculator initialized');
    
    // Instantiate all classes
    const engine = new CalculatorEngine();
    const stateManager = new StateManager();
    const memoryManager = new MemoryManager();
    const view = new CalculatorView('calculator-container');
    const controller = new CalculatorController(engine, stateManager, memoryManager, view);
    
    // Render the calculator UI
    view.render();
    
    // Bind view button events to controller methods
    view.bindNumberButton((digit) => {
        controller.handleNumberInput(digit);
    });
    
    view.bindOperatorButton((operator) => {
        controller.handleOperatorInput(operator);
    });
    
    view.bindFunctionButton((functionName) => {
        controller.handleScientificFunction(functionName);
    });
    
    view.bindControlButton((action) => {
        switch (action) {
            case 'clear':
                controller.handleClear();
                break;
            case 'all-clear':
                controller.handleAllClear();
                break;
            case 'backspace':
                controller.handleBackspace();
                break;
            case 'equals':
                controller.handleEquals();
                break;
            case 'decimal':
                controller.handleDecimalPoint();
                break;
            case 'angle-mode':
                controller.handleAngleModeToggle();
                break;
            case 'open-paren':
                controller.handleParenthesis('open');
                break;
            case 'close-paren':
                controller.handleParenthesis('close');
                break;
            case 'memory-store':
                controller.handleMemoryStore();
                break;
            case 'memory-recall':
                controller.handleMemoryRecall();
                break;
            case 'memory-clear':
                controller.handleMemoryClear();
                break;
            case 'memory-add':
                controller.handleMemoryAdd();
                break;
            case 'negate':
                controller.handleNegate();
                break;
            default:
                console.warn('Unknown control action:', action);
        }
    });
    
    // Implement keyboard support for calculator operations
    document.addEventListener('keydown', (event) => {
        // Prevent default behavior for calculator keys
        const calculatorKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                                '+', '-', '*', '/', '.', 'Enter', 'Escape', 'Backspace',
                                '(', ')'];
        
        if (calculatorKeys.includes(event.key)) {
            event.preventDefault();
        }
        
        // Handle number keys (0-9)
        if (event.key >= '0' && event.key <= '9') {
            controller.handleNumberInput(event.key);
        }
        
        // Handle operator keys (+, -, *, /)
        else if (event.key === '+') {
            controller.handleOperatorInput('+');
        }
        else if (event.key === '-') {
            controller.handleOperatorInput('-');
        }
        else if (event.key === '*') {
            controller.handleOperatorInput('*');
        }
        else if (event.key === '/') {
            controller.handleOperatorInput('/');
        }
        
        // Handle decimal point
        else if (event.key === '.') {
            controller.handleDecimalPoint();
        }
        
        // Handle Enter (equals)
        else if (event.key === 'Enter') {
            controller.handleEquals();
        }
        
        // Handle Escape (clear)
        else if (event.key === 'Escape') {
            controller.handleAllClear();
        }
        
        // Handle Backspace
        else if (event.key === 'Backspace') {
            controller.handleBackspace();
        }
        
        // Handle parentheses keys
        else if (event.key === '(') {
            controller.handleParenthesis('open');
        }
        else if (event.key === ')') {
            controller.handleParenthesis('close');
        }
        
        // Handle power operator (^)
        else if (event.key === '^') {
            controller.handleOperatorInput('^');
        }
    });
    
    // Initialize calculator with default state
    controller.updateDisplay();
    
    console.log('Calculator ready - all components initialized and event handlers bound');
});
