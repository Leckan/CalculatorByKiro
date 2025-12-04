/**
 * Test Error Handling Implementation
 * Tests comprehensive error handling for Task 14
 * Requirements: 1.5, 3.5, 4.3, 4.4, 8.3
 */

// Load required modules
const CalculatorEngine = require('../src/calculator-engine.js');
const StateManager = require('../src/state-manager.js');
const MemoryManager = require('../src/memory-manager.js');
const ExpressionParser = require('../src/expression-parser.js');

console.log('Testing Error Handling Implementation...\n');

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

// Test 1: Division by zero error handling
test('CalculatorEngine handles division by zero', () => {
    const engine = new CalculatorEngine();
    try {
        engine.divide(10, 0);
        throw new Error('Should have thrown division by zero error');
    } catch (error) {
        if (error.message !== 'Division by zero') {
            throw new Error(`Expected "Division by zero", got "${error.message}"`);
        }
    }
});

// Test 2: Invalid domain for logarithm
test('CalculatorEngine handles invalid domain for ln', () => {
    const engine = new CalculatorEngine();
    try {
        engine.ln(-5);
        throw new Error('Should have thrown invalid domain error');
    } catch (error) {
        if (error.message !== 'Invalid domain') {
            throw new Error(`Expected "Invalid domain", got "${error.message}"`);
        }
    }
});

// Test 3: Invalid domain for log10
test('CalculatorEngine handles invalid domain for log10', () => {
    const engine = new CalculatorEngine();
    try {
        engine.log10(0);
        throw new Error('Should have thrown invalid domain error');
    } catch (error) {
        if (error.message !== 'Invalid domain') {
            throw new Error(`Expected "Invalid domain", got "${error.message}"`);
        }
    }
});

// Test 4: Invalid domain for sqrt
test('CalculatorEngine handles invalid domain for sqrt', () => {
    const engine = new CalculatorEngine();
    try {
        engine.sqrt(-4);
        throw new Error('Should have thrown invalid domain error');
    } catch (error) {
        if (error.message !== 'Invalid domain') {
            throw new Error(`Expected "Invalid domain", got "${error.message}"`);
        }
    }
});

// Test 5: Invalid factorial input (negative)
test('CalculatorEngine handles negative factorial', () => {
    const engine = new CalculatorEngine();
    try {
        engine.factorial(-3);
        throw new Error('Should have thrown invalid factorial error');
    } catch (error) {
        if (error.message !== 'Invalid factorial input') {
            throw new Error(`Expected "Invalid factorial input", got "${error.message}"`);
        }
    }
});

// Test 6: Invalid factorial input (non-integer)
test('CalculatorEngine handles non-integer factorial', () => {
    const engine = new CalculatorEngine();
    try {
        engine.factorial(3.5);
        throw new Error('Should have thrown invalid factorial error');
    } catch (error) {
        if (error.message !== 'Invalid factorial input') {
            throw new Error(`Expected "Invalid factorial input", got "${error.message}"`);
        }
    }
});

// Test 7: Mismatched parentheses detection
test('ExpressionParser detects mismatched parentheses (extra closing)', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    try {
        parser.evaluate('(2+3))', 'deg');
        throw new Error('Should have thrown mismatched parentheses error');
    } catch (error) {
        if (error.message !== 'Mismatched parentheses') {
            throw new Error(`Expected "Mismatched parentheses", got "${error.message}"`);
        }
    }
});

// Test 8: Mismatched parentheses detection (extra opening)
test('ExpressionParser detects mismatched parentheses (extra opening)', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    try {
        parser.evaluate('((2+3)', 'deg');
        throw new Error('Should have thrown mismatched parentheses error');
    } catch (error) {
        if (error.message !== 'Mismatched parentheses') {
            throw new Error(`Expected "Mismatched parentheses", got "${error.message}"`);
        }
    }
});

// Test 9: StateManager validates parenthesis level
test('StateManager validates parenthesis level (negative)', () => {
    const stateManager = new StateManager();
    stateManager.setParenthesisLevel(-1);
    // Should not set invalid level
    if (stateManager.getParenthesisLevel() !== 0) {
        throw new Error('StateManager should reject negative parenthesis level');
    }
});

// Test 10: StateManager validates parenthesis level (exceeds max)
test('StateManager validates parenthesis level (exceeds max)', () => {
    const stateManager = new StateManager();
    stateManager.setParenthesisLevel(11);
    // Should not set invalid level
    if (stateManager.getParenthesisLevel() !== 0) {
        throw new Error('StateManager should reject parenthesis level > 10');
    }
});

// Test 11: StateManager validates last result
test('StateManager validates last result (NaN)', () => {
    const stateManager = new StateManager();
    stateManager.setLastResult(NaN);
    // Should not set invalid result
    if (stateManager.getLastResult() !== null) {
        throw new Error('StateManager should reject NaN as last result');
    }
});

// Test 12: StateManager validates last result (Infinity)
test('StateManager validates last result (Infinity)', () => {
    const stateManager = new StateManager();
    stateManager.setLastResult(Infinity);
    // Should not set invalid result
    if (stateManager.getLastResult() !== null) {
        throw new Error('StateManager should reject Infinity as last result');
    }
});

// Test 13: MemoryManager validates store value
test('MemoryManager validates store value (NaN)', () => {
    const memoryManager = new MemoryManager();
    try {
        memoryManager.store(NaN);
        throw new Error('Should have thrown invalid value error');
    } catch (error) {
        if (!error.message.includes('Invalid value')) {
            throw new Error(`Expected "Invalid value" error, got "${error.message}"`);
        }
    }
});

// Test 14: MemoryManager validates store value (Infinity)
test('MemoryManager validates store value (Infinity)', () => {
    const memoryManager = new MemoryManager();
    try {
        memoryManager.store(Infinity);
        throw new Error('Should have thrown invalid value error');
    } catch (error) {
        if (!error.message.includes('Invalid value')) {
            throw new Error(`Expected "Invalid value" error, got "${error.message}"`);
        }
    }
});

// Test 15: MemoryManager validates add value
test('MemoryManager validates add value (NaN)', () => {
    const memoryManager = new MemoryManager();
    try {
        memoryManager.add(NaN);
        throw new Error('Should have thrown invalid value error');
    } catch (error) {
        if (!error.message.includes('Invalid value')) {
            throw new Error(`Expected "Invalid value" error, got "${error.message}"`);
        }
    }
});

// Test 16: MemoryManager detects overflow
test('MemoryManager detects overflow on add', () => {
    const memoryManager = new MemoryManager();
    memoryManager.store(Number.MAX_VALUE);
    try {
        memoryManager.add(Number.MAX_VALUE);
        throw new Error('Should have thrown overflow error');
    } catch (error) {
        if (!error.message.includes('overflow')) {
            throw new Error(`Expected "overflow" error, got "${error.message}"`);
        }
    }
});

// Test 17: Error state doesn't corrupt calculator state
test('Error state preservation in StateManager', () => {
    const stateManager = new StateManager();
    stateManager.setInputBuffer('123');
    stateManager.setExpression('5+');
    stateManager.setLastResult(42);
    
    // Try to set invalid values
    stateManager.setLastResult(NaN);
    stateManager.setParenthesisLevel(-1);
    
    // Original state should be preserved
    if (stateManager.getInputBuffer() !== '123') {
        throw new Error('Input buffer was corrupted');
    }
    if (stateManager.getExpression() !== '5+') {
        throw new Error('Expression was corrupted');
    }
    if (stateManager.getLastResult() !== 42) {
        throw new Error('Last result was corrupted');
    }
});

// Test 18: Expression parser handles invalid expressions
test('ExpressionParser handles invalid expressions', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    try {
        parser.evaluate('2++3', 'deg');
        throw new Error('Should have thrown invalid expression error');
    } catch (error) {
        if (!error.message.includes('Invalid')) {
            throw new Error(`Expected "Invalid" error, got "${error.message}"`);
        }
    }
});

// Test 19: Expression parser handles unknown functions
test('ExpressionParser handles unknown functions', () => {
    const engine = new CalculatorEngine();
    const parser = new ExpressionParser(engine);
    try {
        parser.evaluate('unknown(5)', 'deg');
        throw new Error('Should have thrown unknown function error');
    } catch (error) {
        if (!error.message.includes('Unknown function')) {
            throw new Error(`Expected "Unknown function" error, got "${error.message}"`);
        }
    }
});

// Test 20: Valid operations still work after error handling
test('Valid operations work correctly with error handling', () => {
    const engine = new CalculatorEngine();
    const result1 = engine.add(5, 3);
    if (result1 !== 8) {
        throw new Error(`Expected 8, got ${result1}`);
    }
    
    const result2 = engine.multiply(4, 7);
    if (result2 !== 28) {
        throw new Error(`Expected 28, got ${result2}`);
    }
    
    const result3 = engine.sqrt(16);
    if (result3 !== 4) {
        throw new Error(`Expected 4, got ${result3}`);
    }
});

// Print summary
console.log('\n═══════════════════════════════════════');
if (testsFailed === 0) {
    console.log(`All ${testsPassed} error handling tests passed! ✓`);
} else {
    console.log(`${testsPassed} tests passed, ${testsFailed} tests failed`);
}
console.log('═══════════════════════════════════════\n');

process.exit(testsFailed > 0 ? 1 : 0);
