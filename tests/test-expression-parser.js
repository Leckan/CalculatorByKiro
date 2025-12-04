// Load the classes
const fs = require('fs');
eval(fs.readFileSync('calculator-engine.js', 'utf8'));
eval(fs.readFileSync('expression-parser.js', 'utf8'));

const engine = new CalculatorEngine();
const parser = new ExpressionParser(engine);

console.log('=== ExpressionParser Tests ===\n');

// Test basic arithmetic
console.log('Test 1 - Basic addition: 2 + 3 =', parser.evaluate('2 + 3'));
console.log('Test 2 - Order of operations: 2 + 3 × 4 =', parser.evaluate('2 + 3 × 4'));
console.log('Test 3 - Parentheses: (2 + 3) × 4 =', parser.evaluate('(2 + 3) × 4'));
console.log('Test 4 - Power: 2 ^ 3 =', parser.evaluate('2 ^ 3'));
console.log('Test 5 - Nested parentheses: ((2 + 3) × 4) - 1 =', parser.evaluate('((2 + 3) × 4) - 1'));
console.log('Test 6 - Division: 10 ÷ 2 =', parser.evaluate('10 ÷ 2'));

// Test functions
console.log('\nTest 7 - Square root: sqrt(16) =', parser.evaluate('sqrt(16)'));
console.log('Test 8 - Function with expression: sqrt(9 + 16) =', parser.evaluate('sqrt(9 + 16)'));
console.log('Test 9 - Natural log: ln(2.718281828) =', parser.evaluate('ln(2.718281828)'));
console.log('Test 10 - Exponential: exp(1) =', parser.evaluate('exp(1)'));

// Test parentheses validation
console.log('\n--- Error Handling Tests ---');
try {
    parser.evaluate('(2 + 3');
    console.log('Test 11 - Mismatched parentheses: FAILED (should throw error)');
} catch (e) {
    console.log('Test 11 - Mismatched parentheses:', e.message, '✓');
}

try {
    parser.evaluate('2 + 3)');
    console.log('Test 12 - Extra closing parenthesis: FAILED (should throw error)');
} catch (e) {
    console.log('Test 12 - Extra closing parenthesis:', e.message, '✓');
}

// Test nested parentheses limit
try {
    const deepNesting = '((((((((((1))))))))))'; // 10 levels
    const result = parser.evaluate(deepNesting);
    console.log('Test 13 - 10 levels of nesting: PASSED ✓ (result:', result + ')');
} catch (e) {
    console.log('Test 13 - 10 levels of nesting: FAILED -', e.message);
}

try {
    const tooDeep = '(((((((((((1)))))))))))'; // 11 levels
    parser.evaluate(tooDeep);
    console.log('Test 14 - 11 levels of nesting: FAILED (should throw error)');
} catch (e) {
    console.log('Test 14 - 11 levels of nesting:', e.message, '✓');
}

// Test complex expressions
console.log('\n--- Complex Expression Tests ---');
console.log('Test 15 - Complex: (2 + 3) × (4 - 1) =', parser.evaluate('(2 + 3) × (4 - 1)'));
console.log('Test 16 - With function: sqrt(16) + 2 ^ 3 =', parser.evaluate('sqrt(16) + 2 ^ 3'));
console.log('Test 17 - Nested functions: sqrt(sqrt(256)) =', parser.evaluate('sqrt(sqrt(256))'));

// Test operator precedence
console.log('\n--- Operator Precedence Tests ---');
console.log('Test 18 - 2 + 3 × 4 - 1 =', parser.evaluate('2 + 3 × 4 - 1'));
console.log('Test 19 - 2 ^ 3 ^ 2 =', parser.evaluate('2 ^ 3 ^ 2')); // Right associative
console.log('Test 20 - 10 - 5 - 2 =', parser.evaluate('10 - 5 - 2')); // Left associative

console.log('\n=== All tests completed! ===');
