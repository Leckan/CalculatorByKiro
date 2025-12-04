/**
 * Test expression parser with unary minus support
 */

const CalculatorEngine = require('../src/calculator-engine.js');
const ExpressionParser = require('../src/expression-parser.js');

const engine = new CalculatorEngine();
const parser = new ExpressionParser(engine);

let testsPassed = 0;
let testsFailed = 0;

function test(description, expression, expected) {
    try {
        const result = parser.evaluate(expression);
        if (Math.abs(result - expected) < 0.0000001) {
            console.log(`✓ ${description}: ${expression} = ${result}`);
            testsPassed++;
        } else {
            console.log(`✗ ${description}: ${expression}`);
            console.log(`  Expected: ${expected}, Got: ${result}`);
            testsFailed++;
        }
    } catch (error) {
        console.log(`✗ ${description}: ${expression}`);
        console.log(`  Error: ${error.message}`);
        testsFailed++;
    }
}

console.log('Testing Expression Parser with Unary Minus...\n');

// Basic negative numbers
test('Leading negative', '-5', -5);
test('Leading negative with addition', '-5+3', -2);
test('Leading negative with subtraction', '-5-3', -8);
test('Leading negative with multiplication', '-5*2', -10);
test('Leading negative with division', '-10/2', -5);

// Negative numbers in parentheses
test('Negative in parentheses', '(-5)', -5);
test('Negative in parentheses with addition', '(-5)+3', -2);
test('Negative in parentheses with multiplication', '(-3)*4', -12);

// Negative numbers after operators
test('Subtraction with negative', '10-(-5)', 15);
test('Addition with negative', '10+(-5)', 5);
test('Multiplication with negative', '5*(-2)', -10);
test('Division with negative', '10/(-2)', -5);

// Multiple negative numbers
test('Two negatives', '-5+-3', -8);
test('Negative minus negative', '-5-(-3)', -2);
test('Multiple negatives in expression', '-5+(-3)*(-2)', 1);

// Negative numbers with functions
test('Sin of negative (radians)', 'sin(-1.5708)', -1); // -π/2 radians
test('Sqrt after negative', '(-4)+sqrt(16)', 0);
test('Negative with power', '(-2)^2', 4);
test('Negative with power (odd)', '(-2)^3', -8);

// Complex expressions
test('Complex with negatives', '(-5+3)*(-2)', 4);
test('Nested negatives', '((-5)+(-3))*2', -16);
test('Mixed operations', '10-(-5)*2', 20);

// Edge cases
test('Just negative zero', '-0', 0);
test('Negative decimal', '-3.14', -3.14);
test('Negative decimal in expression', '-3.14+6.28', 3.14);

// Note: Double negative like (-(-5)) is not supported as it requires
// recursive unary operator handling, which is complex and rarely needed

console.log('\n═══════════════════════════════════════');
if (testsFailed === 0) {
    console.log(`All ${testsPassed} tests passed! ✓`);
} else {
    console.log(`${testsPassed} tests passed, ${testsFailed} tests failed`);
}
console.log('═══════════════════════════════════════\n');

process.exit(testsFailed > 0 ? 1 : 0);
