/**
 * Unit tests for ExpressionParser
 * Tests simple expressions, operator precedence, parentheses matching, nested parentheses, and invalid expressions
 * Requirements: 8.1, 8.2, 8.3, 8.4
 */

const CalculatorEngine = require('../src/calculator-engine.js');
const ExpressionParser = require('../src/expression-parser.js');

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

console.log('Testing ExpressionParser...\n');

const engine = new CalculatorEngine();
const parser = new ExpressionParser(engine);

// Test simple expressions (Requirement 8.1)
console.log('=== Simple Expressions ===');

test('Simple addition: 2 + 3 = 5', () => {
    assertEqual(parser.evaluate('2 + 3'), 5, 'Simple addition failed');
});

test('Simple subtraction: 10 - 4 = 6', () => {
    assertEqual(parser.evaluate('10 - 4'), 6, 'Simple subtraction failed');
});

test('Simple multiplication: 6 × 7 = 42', () => {
    assertEqual(parser.evaluate('6 × 7'), 42, 'Simple multiplication failed');
});

test('Simple division: 20 ÷ 4 = 5', () => {
    assertEqual(parser.evaluate('20 ÷ 4'), 5, 'Simple division failed');
});

test('Simple power: 2 ^ 3 = 8', () => {
    assertEqual(parser.evaluate('2 ^ 3'), 8, 'Simple power failed');
});

test('Expression with spaces: 5 + 3 = 8', () => {
    assertEqual(parser.evaluate('5 + 3'), 8, 'Expression with spaces failed');
});

test('Expression without spaces: 5+3 = 8', () => {
    assertEqual(parser.evaluate('5+3'), 8, 'Expression without spaces failed');
});

test('Decimal numbers: 3.5 + 2.5 = 6', () => {
    assertEqual(parser.evaluate('3.5 + 2.5'), 6, 'Decimal numbers failed');
});

// Test operator precedence (Requirement 8.2)
console.log('\n=== Operator Precedence ===');

test('Multiplication before addition: 2 + 3 × 4 = 14', () => {
    assertEqual(parser.evaluate('2 + 3 × 4'), 14, 'Multiplication precedence failed');
});

test('Division before subtraction: 10 - 6 ÷ 2 = 7', () => {
    assertEqual(parser.evaluate('10 - 6 ÷ 2'), 7, 'Division precedence failed');
});

test('Power before multiplication: 2 × 3 ^ 2 = 18', () => {
    assertEqual(parser.evaluate('2 × 3 ^ 2'), 18, 'Power precedence failed');
});

test('Complex precedence: 2 + 3 × 4 - 1 = 13', () => {
    assertEqual(parser.evaluate('2 + 3 × 4 - 1'), 13, 'Complex precedence failed');
});

test('Left associativity: 10 - 5 - 2 = 3', () => {
    assertEqual(parser.evaluate('10 - 5 - 2'), 3, 'Left associativity failed');
});

test('Right associativity of power: 2 ^ 3 ^ 2 = 512', () => {
    assertEqual(parser.evaluate('2 ^ 3 ^ 2'), 512, 'Right associativity failed');
});

test('Multiple operations: 5 + 3 × 2 - 4 ÷ 2 = 9', () => {
    assertEqual(parser.evaluate('5 + 3 × 2 - 4 ÷ 2'), 9, 'Multiple operations failed');
});

// Test parentheses matching (Requirements 8.1, 8.3)
console.log('\n=== Parentheses Matching ===');

test('Simple parentheses: (2 + 3) × 4 = 20', () => {
    assertEqual(parser.evaluate('(2 + 3) × 4'), 20, 'Simple parentheses failed');
});

test('Parentheses override precedence: (2 + 3) × (4 - 1) = 15', () => {
    assertEqual(parser.evaluate('(2 + 3) × (4 - 1)'), 15, 'Parentheses override failed');
});

test('Multiple parentheses: (5 + 3) × (2 + 1) = 24', () => {
    assertEqual(parser.evaluate('(5 + 3) × (2 + 1)'), 24, 'Multiple parentheses failed');
});

test('Parentheses with division: (10 + 5) ÷ (2 + 1) = 5', () => {
    assertEqual(parser.evaluate('(10 + 5) ÷ (2 + 1)'), 5, 'Parentheses with division failed');
});

// Test nested parentheses (Requirements 8.2, 8.4)
console.log('\n=== Nested Parentheses ===');

test('Nested parentheses: ((2 + 3) × 4) - 1 = 19', () => {
    assertEqual(parser.evaluate('((2 + 3) × 4) - 1'), 19, 'Nested parentheses failed');
});

test('Deep nesting: (((5 + 3) × 2) - 4) ÷ 2 = 6', () => {
    assertEqual(parser.evaluate('(((5 + 3) × 2) - 4) ÷ 2'), 6, 'Deep nesting failed');
});

test('Multiple nested groups: ((2 + 3) × (4 - 1)) + 5 = 20', () => {
    assertEqual(parser.evaluate('((2 + 3) × (4 - 1)) + 5'), 20, 'Multiple nested groups failed');
});

test('Maximum nesting (10 levels): ((((((((((1))))))))))= 1', () => {
    assertEqual(parser.evaluate('((((((((((1))))))))))'), 1, 'Maximum nesting failed');
});

test('Maximum nesting with operations: ((((((((((2 + 3))))))))))= 5', () => {
    assertEqual(parser.evaluate('((((((((((2 + 3))))))))))'), 5, 'Maximum nesting with operations failed');
});

// Test invalid expressions (Requirement 8.3)
console.log('\n=== Invalid Expressions ===');

test('Mismatched parentheses (extra closing) throws error', () => {
    assertThrows(() => parser.evaluate('(2 + 3))'), 'Mismatched parentheses');
});

test('Mismatched parentheses (extra opening) throws error', () => {
    assertThrows(() => parser.evaluate('((2 + 3)'), 'Mismatched parentheses');
});

test('Mismatched parentheses (wrong order) throws error', () => {
    assertThrows(() => parser.evaluate(')2 + 3('), 'Mismatched parentheses');
});

test('Exceeds nesting limit (11 levels) throws error', () => {
    assertThrows(() => parser.evaluate('(((((((((((1)))))))))))'), 'Mismatched parentheses');
});

test('Invalid character throws error', () => {
    assertThrows(() => parser.evaluate('2 + @ 3'), 'Invalid character');
});

test('Unknown function throws error', () => {
    assertThrows(() => parser.evaluate('unknown(5)'), 'Unknown function');
});

test('Empty expression after operator throws error', () => {
    assertThrows(() => parser.evaluate('2 +'), 'Invalid expression');
});

test('Double operator throws error', () => {
    assertThrows(() => parser.evaluate('2 + + 3'), 'Invalid');
});

// Test functions with parentheses (Requirements 8.1, 8.2)
console.log('\n=== Functions with Parentheses ===');

test('sqrt with parentheses: sqrt(16) = 4', () => {
    assertEqual(parser.evaluate('sqrt(16)'), 4, 'sqrt with parentheses failed');
});

test('sqrt with expression: sqrt(9 + 16) = 5', () => {
    assertEqual(parser.evaluate('sqrt(9 + 16)'), 5, 'sqrt with expression failed');
});

test('ln with parentheses: ln(2.718281828) ≈ 1', () => {
    const result = parser.evaluate('ln(2.718281828)');
    if (Math.abs(result - 1) > 0.001) {
        throw new Error(`ln(e) failed: expected ~1, got ${result}`);
    }
});

test('Nested functions: sqrt(sqrt(256)) = 4', () => {
    assertEqual(parser.evaluate('sqrt(sqrt(256))'), 4, 'Nested functions failed');
});

test('Function with operation: sqrt(16) + 2 ^ 3 = 12', () => {
    assertEqual(parser.evaluate('sqrt(16) + 2 ^ 3'), 12, 'Function with operation failed');
});

test('Multiple functions: sqrt(16) + sqrt(9) = 7', () => {
    assertEqual(parser.evaluate('sqrt(16) + sqrt(9)'), 7, 'Multiple functions failed');
});

test('Function in parentheses: (sqrt(16) + 2) × 3 = 18', () => {
    assertEqual(parser.evaluate('(sqrt(16) + 2) × 3'), 18, 'Function in parentheses failed');
});

// Test trigonometric functions with angle modes
console.log('\n=== Trigonometric Functions ===');

test('sin(0) in radians = 0', () => {
    assertEqual(parser.evaluate('sin(0)', 'rad'), 0, 'sin(0) in radians failed');
});

test('sin(90) in degrees = 1', () => {
    assertEqual(parser.evaluate('sin(90)', 'deg'), 1, 'sin(90) in degrees failed');
});

test('cos(0) in radians = 1', () => {
    assertEqual(parser.evaluate('cos(0)', 'rad'), 1, 'cos(0) in radians failed');
});

test('tan(45) in degrees = 1', () => {
    assertEqual(parser.evaluate('tan(45)', 'deg'), 1, 'tan(45) in degrees failed');
});

// Test complex expressions
console.log('\n=== Complex Expressions ===');

test('Complex: (2 + 3) × 4 - sqrt(16) ÷ 2 = 18', () => {
    assertEqual(parser.evaluate('(2 + 3) × 4 - sqrt(16) ÷ 2'), 18, 'Complex expression failed');
});

test('Complex with power: 2 ^ (3 + 1) = 16', () => {
    assertEqual(parser.evaluate('2 ^ (3 + 1)'), 16, 'Complex with power failed');
});

test('Complex nested: ((5 + 3) × 2 - sqrt(16)) ÷ 2 = 6', () => {
    assertEqual(parser.evaluate('((5 + 3) × 2 - sqrt(16)) ÷ 2'), 6, 'Complex nested failed');
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
