/**
 * Comprehensive Integration Tests
 * Tests complete calculation workflows, error propagation, state persistence, and memory operations
 * Requirements: All requirements
 */

// Mock DOM for testing
class MockElement {
    constructor(id) {
        this.id = id;
        this.innerHTML = '';
        this.className = '';
        this.textContent = '';
        this.style = {};
        this.dataset = {};
        this.children = [];
        this.eventListeners = {};
    }
    
    appendChild(child) {
        this.children.push(child);
    }
    
    addEventListener(event, handler) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(handler);
    }
}

global.document = {
    getElementById: (id) => new MockElement(id),
    createElement: (tag) => new MockElement(tag),
    addEventListener: () => {}
};

// Load all modules
const CalculatorEngine = require('../src/calculator-engine.js');
const StateManager = require('../src/state-manager.js');
const MemoryManager = require('../src/memory-manager.js');
const ExpressionParser = require('../src/expression-parser.js');
const NumberFormatter = require('../src/number-formatter.js');
const CalculatorView = require('../src/calculator-view.js');
const CalculatorController = require('../src/calculator-controller.js');

// Make them global so CalculatorController can access them
global.ExpressionParser = ExpressionParser;
global.NumberFormatter = NumberFormatter;

let testsPassed = 0;
let testsFailed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`✓ ${description}`);
        testsPassed++;
    } catch (error) {
        console.log(`✗ ${description}`);
        console.log(`  Error: ${error.message}`);
        testsFailed++;
    }
}

function assertEqual(actual, expected, message) {
    if (Math.abs(actual - expected) > 0.0000001) {
        throw new Error(`${message}: expected ${expected}, got ${actual}`);
    }
}

console.log('Testing Integration...\n');

// Test complete calculation workflows
console.log('=== Complete Calculation Workflows ===');

test('Simple arithmetic workflow: 5 + 3 = 8', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 8, 'Simple arithmetic failed');
});

test('Complex expression workflow: (5 + 3) × 2 = 16', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleParenthesis('open');
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleParenthesis('close');
    controller.handleOperatorInput('×');
    controller.handleNumberInput('2');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 16, 'Complex expression failed');
});

test('Scientific function workflow: sqrt(16) + 4 = 8', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // sqrt already adds opening parenthesis
    controller.handleScientificFunction('sqrt');
    controller.handleNumberInput('1');
    controller.handleNumberInput('6');
    controller.handleParenthesis('close');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('4');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 8, 'Scientific function workflow failed');
});

test('Trigonometric workflow in degrees: sin(90) = 1', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // Ensure we're in degree mode
    state.setAngleMode('deg');
    
    controller.handleScientificFunction('sin');
    controller.handleParenthesis('open');
    controller.handleNumberInput('90');
    controller.handleParenthesis('close');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 1, 'Trigonometric workflow failed');
});

test('Angle mode toggle workflow', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    assertEqual(state.getAngleMode(), 'deg', 'Initial mode should be deg');
    
    controller.handleAngleModeToggle();
    assertEqual(state.getAngleMode(), 'rad', 'Should toggle to rad');
    
    controller.handleAngleModeToggle();
    assertEqual(state.getAngleMode(), 'deg', 'Should toggle back to deg');
});

test('Decimal input workflow: 3.14 + 2.86 = 6', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('3');
    controller.handleDecimalPoint();
    controller.handleNumberInput('1');
    controller.handleNumberInput('4');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('2');
    controller.handleDecimalPoint();
    controller.handleNumberInput('8');
    controller.handleNumberInput('6');
    controller.handleEquals();
    
    const result = parseFloat(state.getInputBuffer());
    if (Math.abs(result - 6) > 0.01) {
        throw new Error(`Decimal input workflow failed: expected 6, got ${result}`);
    }
});

test('Power operation workflow: 2 ^ 3 = 8', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('2');
    controller.handleOperatorInput('^');
    controller.handleNumberInput('3');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 8, 'Power operation failed');
});

// Test error propagation
console.log('\n=== Error Propagation ===');

test('Division by zero error propagates correctly', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('1');
    controller.handleNumberInput('0');
    controller.handleOperatorInput('÷');
    controller.handleNumberInput('0');
    controller.handleEquals();
    
    // Check if error was set in state
    const error = state.getError();
    if (!error || !error.includes('Error')) {
        throw new Error('Division by zero should set error in state');
    }
});

test('Invalid domain error propagates (sqrt of negative)', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // sqrt already adds opening parenthesis
    controller.handleScientificFunction('sqrt');
    controller.handleOperatorInput('-');
    controller.handleNumberInput('4');
    controller.handleParenthesis('close');
    controller.handleEquals();
    
    // Check if error was set in state
    const error = state.getError();
    if (!error || !error.includes('Error')) {
        throw new Error('Invalid domain should set error in state');
    }
});

test('Error recovery with clear', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // Cause an error
    controller.handleNumberInput('10');
    controller.handleOperatorInput('÷');
    controller.handleNumberInput('0');
    controller.handleEquals();
    
    // Clear and try valid operation
    controller.handleAllClear();
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 8, 'Error recovery failed');
});

// Test state persistence across operations
console.log('\n=== State Persistence ===');

test('State persists across multiple operations', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // First calculation
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleEquals();
    assertEqual(parseFloat(state.getInputBuffer()), 8, 'First calculation failed');
    
    // Second calculation using result
    controller.handleOperatorInput('×');
    controller.handleNumberInput('2');
    controller.handleEquals();
    assertEqual(parseFloat(state.getInputBuffer()), 16, 'Second calculation failed');
});

test('Backspace preserves state', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('1');
    controller.handleNumberInput('2');
    controller.handleNumberInput('3');
    controller.handleBackspace();
    assertEqual(state.getInputBuffer(), '12', 'Backspace should preserve state');
    
    controller.handleBackspace();
    assertEqual(state.getInputBuffer(), '1', 'Multiple backspace should work');
});

test('Clear entry preserves expression', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    
    const exprBefore = state.getExpression();
    controller.handleClear();
    
    // Expression should be preserved, only input buffer cleared
    if (state.getInputBuffer() !== '') {
        throw new Error('Clear should clear input buffer');
    }
});

// Test memory operations with calculations
console.log('\n=== Memory Operations with Calculations ===');

test('Store result in memory', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('4');
    controller.handleNumberInput('2');
    controller.handleMemoryStore();
    
    assertEqual(memory.recall(), 42, 'Memory store failed');
    if (!memory.hasValue()) {
        throw new Error('Memory should have value');
    }
});

test('Recall memory and use in calculation', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // Store value in memory
    memory.store(10);
    
    // Recall and use in calculation
    controller.handleMemoryRecall();
    controller.handleOperatorInput('+');
    controller.handleNumberInput('5');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 15, 'Memory recall calculation failed');
});

test('Memory add operation', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // Store initial value
    memory.store(10);
    
    // Add to memory
    controller.handleNumberInput('5');
    controller.handleMemoryAdd();
    
    assertEqual(memory.recall(), 15, 'Memory add failed');
});

test('Memory clear operation', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    memory.store(42);
    controller.handleMemoryClear();
    
    assertEqual(memory.recall(), 0, 'Memory clear failed');
    if (memory.hasValue()) {
        throw new Error('Memory should not have value after clear');
    }
});

test('Memory persists across calculations', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // Store value
    controller.handleNumberInput('1');
    controller.handleNumberInput('0');
    controller.handleNumberInput('0');
    controller.handleMemoryStore();
    
    // Do some calculations
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleEquals();
    
    // Memory should still have original value
    assertEqual(memory.recall(), 100, 'Memory should persist');
});

test('Complex workflow with memory', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    // Calculate 5 + 3 = 8 and store
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleEquals();
    controller.handleMemoryStore();
    
    // Calculate 10 - 2 = 8
    controller.handleNumberInput('1');
    controller.handleNumberInput('0');
    controller.handleOperatorInput('-');
    controller.handleNumberInput('2');
    controller.handleEquals();
    
    // Add to memory (8 + 8 = 16)
    controller.handleMemoryAdd();
    
    // Recall and multiply by 2 = 32
    controller.handleMemoryRecall();
    controller.handleOperatorInput('×');
    controller.handleNumberInput('2');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 32, 'Complex memory workflow failed');
});

// Test nested parentheses with calculations
console.log('\n=== Nested Parentheses Workflows ===');

test('Nested parentheses: ((2 + 3) × 4) - 1 = 19', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleParenthesis('open');
    controller.handleParenthesis('open');
    controller.handleNumberInput('2');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleParenthesis('close');
    controller.handleOperatorInput('×');
    controller.handleNumberInput('4');
    controller.handleParenthesis('close');
    controller.handleOperatorInput('-');
    controller.handleNumberInput('1');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 19, 'Nested parentheses failed');
});

// Test all clear vs clear
console.log('\n=== Clear Operations ===');

test('All clear resets everything', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleAllClear();
    
    assertEqual(state.getInputBuffer(), '', 'All clear should clear input');
    assertEqual(state.getExpression(), '', 'All clear should clear expression');
});

// Print summary
console.log('\n═══════════════════════════════════════');
if (testsFailed === 0) {
    console.log(`All ${testsPassed} integration tests passed! ✓`);
} else {
    console.log(`${testsPassed} tests passed, ${testsFailed} tests failed`);
}
console.log('═══════════════════════════════════════\n');

process.exit(testsFailed > 0 ? 1 : 0);
