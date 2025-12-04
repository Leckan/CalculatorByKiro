/**
 * Unit tests for CalculatorEngine
 * Tests all arithmetic operations and scientific functions
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.5, 4.1, 4.2, 4.3, 4.4
 */

const CalculatorEngine = require('../src/calculator-engine.js');

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

function assertThrows(fn, expectedMessage) {
    try {
        fn();
        throw new Error('Expected function to throw an error');
    } catch (error) {
        if (!error.message.includes(expectedMessage)) {
            throw new Error(`Expected error message to include "${expectedMessage}", got "${error.message}"`);
        }
    }
}

console.log('Testing CalculatorEngine...\n');

const engine = new CalculatorEngine();

// Test arithmetic operations (Requirements 1.1, 1.2, 1.3, 1.4)
console.log('=== Arithmetic Operations ===');

test('Addition: 5 + 3 = 8', () => {
    assertEqual(engine.add(5, 3), 8, 'Addition failed');
});

test('Addition with negative numbers: -5 + 3 = -2', () => {
    assertEqual(engine.add(-5, 3), -2, 'Addition with negatives failed');
});

test('Addition with decimals: 0.1 + 0.2', () => {
    const result = engine.add(0.1, 0.2);
    assertEqual(result, 0.3, 'Addition with decimals failed');
});

test('Subtraction: 10 - 4 = 6', () => {
    assertEqual(engine.subtract(10, 4), 6, 'Subtraction failed');
});

test('Subtraction with negative result: 3 - 7 = -4', () => {
    assertEqual(engine.subtract(3, 7), -4, 'Subtraction with negative result failed');
});

test('Multiplication: 6 × 7 = 42', () => {
    assertEqual(engine.multiply(6, 7), 42, 'Multiplication failed');
});

test('Multiplication with zero: 5 × 0 = 0', () => {
    assertEqual(engine.multiply(5, 0), 0, 'Multiplication with zero failed');
});

test('Multiplication with negative: -3 × 4 = -12', () => {
    assertEqual(engine.multiply(-3, 4), -12, 'Multiplication with negative failed');
});

test('Division: 20 ÷ 4 = 5', () => {
    assertEqual(engine.divide(20, 4), 5, 'Division failed');
});

test('Division with decimals: 7 ÷ 2 = 3.5', () => {
    assertEqual(engine.divide(7, 2), 3.5, 'Division with decimals failed');
});

// Test division by zero (Requirement 1.5)
test('Division by zero throws error', () => {
    assertThrows(() => engine.divide(10, 0), 'Division by zero');
});

test('Power: 2 ^ 3 = 8', () => {
    assertEqual(engine.power(2, 3), 8, 'Power failed');
});

test('Power with zero exponent: 5 ^ 0 = 1', () => {
    assertEqual(engine.power(5, 0), 1, 'Power with zero exponent failed');
});

test('Power with negative exponent: 2 ^ -2 = 0.25', () => {
    assertEqual(engine.power(2, -2), 0.25, 'Power with negative exponent failed');
});

// Test trigonometric functions (Requirements 2.1, 2.2, 2.3)
console.log('\n=== Trigonometric Functions ===');

test('sin(0) in radians = 0', () => {
    assertEqual(engine.sin(0, 'rad'), 0, 'sin(0) failed');
});

test('sin(90) in degrees = 1', () => {
    assertEqual(engine.sin(90, 'deg'), 1, 'sin(90°) failed');
});

test('sin(π/2) in radians = 1', () => {
    assertEqual(engine.sin(Math.PI / 2, 'rad'), 1, 'sin(π/2) failed');
});

test('cos(0) in radians = 1', () => {
    assertEqual(engine.cos(0, 'rad'), 1, 'cos(0) failed');
});

test('cos(90) in degrees = 0', () => {
    assertEqual(engine.cos(90, 'deg'), 0, 'cos(90°) failed');
});

test('cos(π) in radians = -1', () => {
    assertEqual(engine.cos(Math.PI, 'rad'), -1, 'cos(π) failed');
});

test('tan(0) in radians = 0', () => {
    assertEqual(engine.tan(0, 'rad'), 0, 'tan(0) failed');
});

test('tan(45) in degrees = 1', () => {
    assertEqual(engine.tan(45, 'deg'), 1, 'tan(45°) failed');
});

test('tan(π/4) in radians = 1', () => {
    assertEqual(engine.tan(Math.PI / 4, 'rad'), 1, 'tan(π/4) failed');
});

// Test angle conversion
test('toRadians: 180° = π', () => {
    assertEqual(engine.toRadians(180), Math.PI, 'toRadians failed');
});

test('toRadians: 90° = π/2', () => {
    assertEqual(engine.toRadians(90), Math.PI / 2, 'toRadians failed');
});

test('toDegrees: π = 180°', () => {
    assertEqual(engine.toDegrees(Math.PI), 180, 'toDegrees failed');
});

test('toDegrees: π/2 = 90°', () => {
    assertEqual(engine.toDegrees(Math.PI / 2), 90, 'toDegrees failed');
});

// Test logarithmic and exponential functions (Requirements 3.1, 3.2, 3.3)
console.log('\n=== Logarithmic and Exponential Functions ===');

test('ln(e) = 1', () => {
    assertEqual(engine.ln(Math.E), 1, 'ln(e) failed');
});

test('ln(1) = 0', () => {
    assertEqual(engine.ln(1), 0, 'ln(1) failed');
});

test('ln(10) ≈ 2.302585', () => {
    assertEqual(engine.ln(10), 2.302585, 'ln(10) failed');
});

// Test ln domain errors (Requirement 3.5)
test('ln(0) throws error', () => {
    assertThrows(() => engine.ln(0), 'Invalid domain');
});

test('ln(-5) throws error', () => {
    assertThrows(() => engine.ln(-5), 'Invalid domain');
});

test('log10(10) = 1', () => {
    assertEqual(engine.log10(10), 1, 'log10(10) failed');
});

test('log10(100) = 2', () => {
    assertEqual(engine.log10(100), 2, 'log10(100) failed');
});

test('log10(1) = 0', () => {
    assertEqual(engine.log10(1), 0, 'log10(1) failed');
});

// Test log10 domain errors (Requirement 3.5)
test('log10(0) throws error', () => {
    assertThrows(() => engine.log10(0), 'Invalid domain');
});

test('log10(-10) throws error', () => {
    assertThrows(() => engine.log10(-10), 'Invalid domain');
});

test('exp(0) = 1', () => {
    assertEqual(engine.exp(0), 1, 'exp(0) failed');
});

test('exp(1) = e', () => {
    assertEqual(engine.exp(1), Math.E, 'exp(1) failed');
});

test('exp(2) ≈ 7.389056', () => {
    assertEqual(engine.exp(2), 7.389056, 'exp(2) failed');
});

// Test square root (Requirements 4.1, 4.3)
console.log('\n=== Square Root ===');

test('sqrt(0) = 0', () => {
    assertEqual(engine.sqrt(0), 0, 'sqrt(0) failed');
});

test('sqrt(1) = 1', () => {
    assertEqual(engine.sqrt(1), 1, 'sqrt(1) failed');
});

test('sqrt(4) = 2', () => {
    assertEqual(engine.sqrt(4), 2, 'sqrt(4) failed');
});

test('sqrt(16) = 4', () => {
    assertEqual(engine.sqrt(16), 4, 'sqrt(16) failed');
});

test('sqrt(2) ≈ 1.414214', () => {
    const result = engine.sqrt(2);
    if (Math.abs(result - 1.414214) > 0.001) {
        throw new Error(`sqrt(2) failed: expected ~1.414214, got ${result}`);
    }
});

// Test sqrt domain errors (Requirement 4.3)
test('sqrt(-1) throws error', () => {
    assertThrows(() => engine.sqrt(-1), 'Invalid domain');
});

test('sqrt(-100) throws error', () => {
    assertThrows(() => engine.sqrt(-100), 'Invalid domain');
});

// Test factorial (Requirements 4.2, 4.4)
console.log('\n=== Factorial ===');

test('factorial(0) = 1', () => {
    assertEqual(engine.factorial(0), 1, 'factorial(0) failed');
});

test('factorial(1) = 1', () => {
    assertEqual(engine.factorial(1), 1, 'factorial(1) failed');
});

test('factorial(5) = 120', () => {
    assertEqual(engine.factorial(5), 120, 'factorial(5) failed');
});

test('factorial(10) = 3628800', () => {
    assertEqual(engine.factorial(10), 3628800, 'factorial(10) failed');
});

// Test factorial edge cases (Requirement 4.4)
test('factorial(-1) throws error', () => {
    assertThrows(() => engine.factorial(-1), 'Invalid factorial input');
});

test('factorial(-5) throws error', () => {
    assertThrows(() => engine.factorial(-5), 'Invalid factorial input');
});

test('factorial(3.5) throws error', () => {
    assertThrows(() => engine.factorial(3.5), 'Invalid factorial input');
});

test('factorial(2.1) throws error', () => {
    assertThrows(() => engine.factorial(2.1), 'Invalid factorial input');
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
