/**
 * Integration test for display formatting
 * Tests that the calculator properly formats numbers in the display
 */

console.log('=== Display Formatting Integration Tests ===\n');

// Test cases for display formatting
const displayTests = [
    {
        name: 'Basic integer display',
        value: 42,
        expected: '42',
        requirement: '7.2'
    },
    {
        name: 'Decimal with trailing zeros removed',
        value: 3.14000,
        expected: '3.14',
        requirement: '7.2, 7.3'
    },
    {
        name: 'Floating-point artifact correction',
        value: 0.1 + 0.2,
        expected: '0.3',
        requirement: '7.3'
    },
    {
        name: 'Large number in scientific notation',
        value: 12345678901,
        shouldContain: 'e',
        requirement: '7.4'
    },
    {
        name: 'Small number in scientific notation',
        value: 0.00000001,
        shouldContain: 'e',
        requirement: '7.4'
    },
    {
        name: 'Pi with proper precision',
        value: Math.PI,
        shouldStartWith: '3.14159',
        maxDigits: 10,
        requirement: '7.2, 7.3'
    },
    {
        name: 'Euler\'s number with proper precision',
        value: Math.E,
        shouldStartWith: '2.71828',
        maxDigits: 10,
        requirement: '7.2, 7.3'
    },
    {
        name: 'Square root of 2',
        value: Math.sqrt(2),
        shouldStartWith: '1.41421',
        maxDigits: 10,
        requirement: '7.2, 7.3'
    },
    {
        name: 'Very precise calculation',
        value: 1/3,
        maxDigits: 10,
        requirement: '7.3'
    },
    {
        name: 'Negative number',
        value: -123.456,
        expected: '-123.456',
        requirement: '7.2'
    },
    {
        name: 'Zero',
        value: 0,
        expected: '0',
        requirement: '7.2'
    },
    {
        name: 'Infinity handling',
        value: Infinity,
        expected: 'Infinity',
        requirement: '7.2'
    },
    {
        name: 'NaN handling',
        value: NaN,
        expected: 'Error',
        requirement: '7.2'
    }
];

let passed = 0;
let failed = 0;

displayTests.forEach(test => {
    try {
        const formatted = NumberFormatter.format(test.value);
        let success = false;
        let message = '';

        if (test.expected !== undefined) {
            success = formatted === test.expected;
            message = success ? 
                `✓ ${test.name}: "${formatted}"` :
                `✗ ${test.name}: got "${formatted}", expected "${test.expected}"`;
        } else if (test.shouldContain !== undefined) {
            success = formatted.includes(test.shouldContain);
            message = success ?
                `✓ ${test.name}: "${formatted}" contains "${test.shouldContain}"` :
                `✗ ${test.name}: "${formatted}" should contain "${test.shouldContain}"`;
        } else if (test.shouldStartWith !== undefined) {
            success = formatted.startsWith(test.shouldStartWith);
            message = success ?
                `✓ ${test.name}: "${formatted}" starts with "${test.shouldStartWith}"` :
                `✗ ${test.name}: "${formatted}" should start with "${test.shouldStartWith}"`;
        }

        // Check max digits constraint
        if (test.maxDigits !== undefined) {
            const digits = formatted.replace(/[^0-9]/g, '').length;
            if (digits > test.maxDigits) {
                success = false;
                message = `✗ ${test.name}: "${formatted}" has ${digits} digits, max is ${test.maxDigits}`;
            }
        }

        console.log(`${message} (Req: ${test.requirement})`);
        
        if (success) {
            passed++;
        } else {
            failed++;
        }
    } catch (error) {
        console.log(`✗ ${test.name}: ${error.message}`);
        failed++;
    }
});

console.log(`\n=== Test Summary ===`);
console.log(`Passed: ${passed}/${displayTests.length}`);
console.log(`Failed: ${failed}/${displayTests.length}`);

if (failed === 0) {
    console.log('\n✓ All display formatting tests passed!');
    console.log('\nRequirements verified:');
    console.log('  7.2 - Display with appropriate precision ✓');
    console.log('  7.3 - Display with up to 10 significant digits ✓');
    console.log('  7.4 - Scientific notation for large/small numbers ✓');
} else {
    console.log(`\n✗ ${failed} test(s) failed`);
}
