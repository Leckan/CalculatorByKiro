/**
 * Test: Expression parser with scientific notation
 * Test case: 1.0168850428141299e-20+6
 */

const CalculatorEngine = require('../src/calculator-engine.js');
const ExpressionParser = require('../src/expression-parser.js');

console.log('Testing Expression Parser with Scientific Notation');
console.log('═'.repeat(60));

const engine = new CalculatorEngine();
const parser = new ExpressionParser(engine);

const tests = [
    {
        expr: '1.0168850428141299e-20+6',
        expected: 1.0168850428141299e-20 + 6,
        desc: 'Scientific notation + integer'
    },
    {
        expr: '2.9989206906525162e-9 + 66',
        expected: 2.9989206906525162e-9 + 66,
        desc: 'Scientific notation with spaces'
    },
    {
        expr: '1e-10 + 1',
        expected: 1e-10 + 1,
        desc: 'Simple scientific notation'
    },
    {
        expr: '1.5e2 + 50',
        expected: 1.5e2 + 50,
        desc: 'Positive exponent'
    },
    {
        expr: '3e-9 * 2',
        expected: 3e-9 * 2,
        desc: 'Scientific notation multiplication'
    },
    {
        expr: '1E10 + 1E10',
        expected: 1E10 + 1E10,
        desc: 'Capital E notation'
    },
    {
        expr: '-5e-3 + 1',
        expected: -5e-3 + 1,
        desc: 'Negative scientific notation'
    },
    {
        expr: '2.5e+3 - 100',
        expected: 2.5e+3 - 100,
        desc: 'Explicit positive exponent'
    },
    {
        expr: '(1e-5 + 2e-5) * 3',
        expected: (1e-5 + 2e-5) * 3,
        desc: 'Scientific notation in parentheses'
    },
    {
        expr: 'sqrt(4e4)',
        expected: Math.sqrt(4e4),
        desc: 'Scientific notation with function'
    }
];

let allPassed = true;
let passedCount = 0;

console.log('\n📊 Test Results:\n');

tests.forEach((test, index) => {
    try {
        const result = parser.evaluate(test.expr);
        const expected = test.expected;
        const isCorrect = Math.abs(result - expected) < 1e-10;
        const status = isCorrect ? '✅' : '❌';
        
        console.log(`${status} Test ${index + 1}: ${test.desc}`);
        console.log(`   Expression: ${test.expr}`);
        console.log(`   Result: ${result}`);
        console.log(`   Expected: ${expected}`);
        
        if (!isCorrect) {
            console.log(`   Difference: ${Math.abs(result - expected)}`);
            allPassed = false;
        } else {
            passedCount++;
        }
        console.log();
        
    } catch (error) {
        console.log(`❌ Test ${index + 1}: ${test.desc}`);
        console.log(`   Expression: ${test.expr}`);
        console.log(`   Error: ${error.message}`);
        console.log();
        allPassed = false;
    }
});

console.log('═'.repeat(60));
console.log(`\n📋 Summary: ${passedCount}/${tests.length} tests passed\n`);

if (allPassed) {
    console.log('✅ All tests passed!');
    console.log('✅ Expression parser correctly handles scientific notation');
    process.exit(0);
} else {
    console.log('❌ Some tests failed');
    process.exit(1);
}
