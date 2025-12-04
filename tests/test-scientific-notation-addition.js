/**
 * Test: Scientific notation addition
 * Test case: 2.9989206906525162e-9 + 66
 * Expected: 66.000000002998921 (with full precision)
 */

const CalculatorEngine = require('../src/calculator-engine.js');

console.log('Testing: 2.9989206906525162e-9 + 66');
console.log('═'.repeat(60));

const engine = new CalculatorEngine();

try {
    // Test the calculation using the add method
    const a = 2.9989206906525162e-9;
    const b = 66;
    const result = engine.add(a, b);
    
    console.log('\n📊 Calculation Result:');
    console.log(`Input:    ${a} + ${b}`);
    console.log(`Output:   ${result}`);
    console.log(`Type:     ${typeof result}`);
    
    // Expected result
    const expected = a + b;
    console.log(`Expected: ${expected}`);
    
    // Check if result is correct
    const isCorrect = Math.abs(result - expected) < 1e-15;
    
    console.log('\n' + '═'.repeat(60));
    
    if (isCorrect) {
        console.log('✅ Test PASSED');
        console.log('✅ Calculator correctly handles scientific notation addition');
        console.log('✅ Result matches expected value');
    } else {
        console.log('❌ Test FAILED');
        console.log(`❌ Expected: ${expected}`);
        console.log(`❌ Got: ${result}`);
        console.log(`❌ Difference: ${Math.abs(result - expected)}`);
    }
    
    // Additional tests with scientific notation
    console.log('\n📋 Additional Scientific Notation Tests:\n');
    
    const tests = [
        { a: 1e-10, b: 1, expected: 1.0000000001, desc: '1e-10 + 1' },
        { a: 5e-5, b: 0.1, expected: 0.10005, desc: '5e-5 + 0.1' },
        { a: 1.5e2, b: 50, expected: 200, desc: '1.5e2 + 50' },
        { a: 3e-9, b: 3e-9, expected: 6e-9, desc: '3e-9 + 3e-9' },
        { a: 1e10, b: 1e10, expected: 2e10, desc: '1e10 + 1e10' },
        { a: 9.999e-15, b: 100, expected: 100.000000000000009999, desc: '9.999e-15 + 100' }
    ];
    
    let allPassed = true;
    
    tests.forEach((test, index) => {
        try {
            const result = engine.add(test.a, test.b);
            const isCorrect = Math.abs(result - test.expected) < 1e-10;
            const status = isCorrect ? '✅' : '❌';
            
            console.log(`${status} Test ${index + 1}: ${test.desc}`);
            console.log(`   Result: ${result}, Expected: ${test.expected}`);
            
            if (!isCorrect) {
                allPassed = false;
            }
        } catch (error) {
            console.log(`❌ Test ${index + 1}: ${test.desc}`);
            console.log(`   Error: ${error.message}`);
            allPassed = false;
        }
    });
    
    console.log('\n' + '═'.repeat(60));
    
    if (allPassed && isCorrect) {
        console.log('✅ All tests passed!');
        console.log('✅ Calculator engine correctly handles scientific notation');
        process.exit(0);
    } else {
        console.log('❌ Some tests failed');
        process.exit(1);
    }
    
} catch (error) {
    console.log('\n❌ Error during calculation:');
    console.log(`   ${error.message}`);
    console.log(`   Stack: ${error.stack}`);
    process.exit(1);
}
