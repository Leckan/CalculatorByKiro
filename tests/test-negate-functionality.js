/**
 * Test negate (+/-) functionality
 */

// Mock DOM
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

// Load modules
const CalculatorEngine = require('../src/calculator-engine.js');
const StateManager = require('../src/state-manager.js');
const MemoryManager = require('../src/memory-manager.js');
const ExpressionParser = require('../src/expression-parser.js');
const NumberFormatter = require('../src/number-formatter.js');
const CalculatorView = require('../src/calculator-view.js');
const CalculatorController = require('../src/calculator-controller.js');

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

console.log('Testing Negate Functionality...\n');

// Test negate on positive number
test('Negate positive number: 5 becomes -5', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('5');
    controller.handleNegate();
    
    assertEqual(parseFloat(state.getInputBuffer()), -5, 'Negate positive failed');
});

// Test negate on negative number
test('Negate negative number: -5 becomes 5', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('5');
    controller.handleNegate();
    controller.handleNegate();
    
    assertEqual(parseFloat(state.getInputBuffer()), 5, 'Negate negative failed');
});

// Test negate on decimal
test('Negate decimal: 3.14 becomes -3.14', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('3');
    controller.handleDecimalPoint();
    controller.handleNumberInput('1');
    controller.handleNumberInput('4');
    controller.handleNegate();
    
    const result = parseFloat(state.getInputBuffer());
    if (Math.abs(result - (-3.14)) > 0.01) {
        throw new Error(`Negate decimal failed: expected -3.14, got ${result}`);
    }
});

// Test negate after calculation
test('Negate after calculation: 5 + 3 = 8, negate becomes -8', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('5');
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleEquals();
    controller.handleNegate();
    
    assertEqual(parseFloat(state.getInputBuffer()), -8, 'Negate after calculation failed');
});

// Test using negated number in calculation
test('Calculate with negated number: -5 + 3 = -2', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('5');
    controller.handleNegate();
    controller.handleOperatorInput('+');
    controller.handleNumberInput('3');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), -2, 'Calculate with negated number failed');
});

// Test negate with zero
test('Negate zero: 0 becomes -0 (displays as 0)', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('0');
    controller.handleNegate();
    
    const result = parseFloat(state.getInputBuffer());
    // -0 and 0 are equal in JavaScript
    assertEqual(result, 0, 'Negate zero failed');
});

// Test multiple negations
test('Multiple negations: 7 -> -7 -> 7 -> -7', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('7');
    controller.handleNegate();
    assertEqual(parseFloat(state.getInputBuffer()), -7, 'First negate failed');
    
    controller.handleNegate();
    assertEqual(parseFloat(state.getInputBuffer()), 7, 'Second negate failed');
    
    controller.handleNegate();
    assertEqual(parseFloat(state.getInputBuffer()), -7, 'Third negate failed');
});

// Test negate in expression
test('Negate in expression: 10 - (-5) = 15', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('1');
    controller.handleNumberInput('0');
    controller.handleOperatorInput('-');
    controller.handleParenthesis('open');
    controller.handleNumberInput('5');
    controller.handleNegate();
    controller.handleParenthesis('close');
    controller.handleEquals();
    
    assertEqual(parseFloat(state.getInputBuffer()), 15, 'Negate in expression failed');
});

// Print summary
console.log('\n═══════════════════════════════════════');
if (testsFailed === 0) {
    console.log(`All ${testsPassed} negate tests passed! ✓`);
} else {
    console.log(`${testsPassed} tests passed, ${testsFailed} tests failed`);
}
console.log('═══════════════════════════════════════\n');

process.exit(testsFailed > 0 ? 1 : 0);
