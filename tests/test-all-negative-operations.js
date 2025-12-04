/**
 * Comprehensive tests for all operations with negative numbers
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

console.log('Testing All Operations with Negative Numbers...\n');

// Arithmetic operations with negatives
console.log('=== Arithmetic Operations ===');

test('Negative + Positive: -5 + 8 = 3', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-5+8'), 3, 'Failed');
});

test('Negative + Negative: -5 + (-3) = -8', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-5+(-3)'), -8, 'Failed');
});

test('Negative - Positive: -5 - 3 = -8', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-5-3'), -8, 'Failed');
});

test('Negative - Negative: -5 - (-3) = -2', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-5-(-3)'), -2, 'Failed');
});

test('Negative × Positive: -5 × 3 = -15', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-5*3'), -15, 'Failed');
});

test('Negative × Negative: -5 × (-3) = 15', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-5*(-3)'), 15, 'Failed');
});

test('Negative ÷ Positive: -10 ÷ 2 = -5', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-10/2'), -5, 'Failed');
});

test('Negative ÷ Negative: -10 ÷ (-2) = 5', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-10/(-2)'), 5, 'Failed');
});

test('Negative ^ Even: (-2) ^ 2 = 4', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('(-2)^2'), 4, 'Failed');
});

test('Negative ^ Odd: (-2) ^ 3 = -8', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('(-2)^3'), -8, 'Failed');
});

// Scientific functions with negatives
console.log('\n=== Scientific Functions ===');

test('sqrt of result with negative: sqrt((-4) + 20) = 4', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('sqrt((-4)+20)'), 4, 'Failed');
});

test('ln of expression with negative: ln((-5) + 10) ≈ 1.609', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    const result = parser.evaluate('ln((-5)+10)');
    if (Math.abs(result - 1.609) > 0.01) {
        throw new Error(`Failed: expected ~1.609, got ${result}`);
    }
});

test('exp with negative: exp(-1) ≈ 0.368', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    const result = parser.evaluate('exp(-1)');
    if (Math.abs(result - 0.368) > 0.01) {
        throw new Error(`Failed: expected ~0.368, got ${result}`);
    }
});

// Complex expressions with negatives
console.log('\n=== Complex Expressions ===');

test('Mixed: (-5 + 3) × (-2) = 4', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('(-5+3)*(-2)'), 4, 'Failed');
});

test('Nested: ((-5) + (-3)) × 2 = -16', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('((-5)+(-3))*2'), -16, 'Failed');
});

test('Multiple operations: -5 + 3 × (-2) = -11', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-5+3*(-2)'), -11, 'Failed');
});

test('With parentheses: (-5 + 3) × 4 - (-2) = -6', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('(-5+3)*4-(-2)'), -6, 'Failed');
});

// Memory operations with negatives
console.log('\n=== Memory Operations ===');

test('Store negative in memory', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    controller.handleNumberInput('5');
    controller.handleNegate();
    controller.handleMemoryStore();
    
    assertEqual(memory.recall(), -5, 'Memory store failed');
});

test('Add negative to memory', () => {
    const engine = new CalculatorEngine();
    const state = new StateManager();
    const memory = new MemoryManager();
    const view = new CalculatorView('test');
    const controller = new CalculatorController(engine, state, memory, view);
    
    memory.store(10);
    controller.handleNumberInput('5');
    controller.handleNegate();
    controller.handleMemoryAdd();
    
    assertEqual(memory.recall(), 5, 'Memory add failed');
});

// Parentheses with negatives
console.log('\n=== Parentheses with Negatives ===');

test('Negative before parentheses: -1 × (5 + 3) = -8', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-1*(5+3)'), -8, 'Failed');
});

test('Negative in nested parentheses: ((- 5) + 3) = -2', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('((-5)+3)'), -2, 'Failed');
});

test('Multiple negatives in parentheses: ((-5) × (-2)) + (-3) = 7', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('((-5)*(-2))+(-3)'), 7, 'Failed');
});

// Edge cases
console.log('\n=== Edge Cases ===');

test('Negative decimal: -3.14 + 6.28 = 3.14', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    const result = parser.evaluate('-3.14+6.28');
    if (Math.abs(result - 3.14) > 0.01) {
        throw new Error(`Failed: expected 3.14, got ${result}`);
    }
});

test('Very small negative: -0.001 × 1000 = -1', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-0.001*1000'), -1, 'Failed');
});

test('Negative zero: -0 + 5 = 5', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    assertEqual(parser.evaluate('-0+5'), 5, 'Failed');
});

// Print summary
console.log('\n═══════════════════════════════════════');
if (testsFailed === 0) {
    console.log(`All ${testsPassed} tests passed! ✓`);
} else {
    console.log(`${testsPassed} tests passed, ${testsFailed} tests failed`);
}
console.log('═══════════════════════════════════════\n');

process.exit(testsFailed > 0 ? 1 : 0);
