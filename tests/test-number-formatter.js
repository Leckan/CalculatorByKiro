/**
 * Test suite for NumberFormatter
 * Tests formatting, precision, scientific notation, and rounding
 */

// Test helper function
function test(description, fn) {
    try {
        fn();
        console.log(`✓ ${description}`);
        return true;
    } catch (error) {
        console.error(`✗ ${description}`);
        console.error(`  ${error.message}`);
        return false;
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}\n  Expected: ${expected}\n  Actual: ${actual}`);
    }
}

// Run tests
console.log('=== NumberFormatter Tests ===\n');

let passed = 0;
let failed = 0;

// Test basic formatting
if (test('formats zero correctly', () => {
    assertEqual(NumberFormatter.format(0), '0', 'Zero should be "0"');
})) passed++; else failed++;

if (test('formats positive integers', () => {
    assertEqual(NumberFormatter.format(42), '42', 'Integer should be formatted without decimals');
})) passed++; else failed++;

if (test('formats negative integers', () => {
    assertEqual(NumberFormatter.format(-42), '-42', 'Negative integer should preserve sign');
})) passed++; else failed++;

if (test('formats decimals with trailing zeros removed', () => {
    const result = NumberFormatter.format(3.14000);
    assertEqual(result, '3.14', 'Trailing zeros should be removed');
})) passed++; else failed++;

if (test('formats decimals with proper precision', () => {
    const result = NumberFormatter.format(1/3);
    // Should have at most 10 significant digits
    const sigDigits = result.replace('.', '').replace('-', '').length;
    if (sigDigits > 10) {
        throw new Error(`Too many significant digits: ${sigDigits}`);
    }
})) passed++; else failed++;

// Test scientific notation for large numbers
if (test('uses scientific notation for large numbers', () => {
    const result = NumberFormatter.format(12345678901);
    if (!result.includes('e')) {
        throw new Error('Large number should use scientific notation');
    }
})) passed++; else failed++;

if (test('uses scientific notation for small numbers', () => {
    const result = NumberFormatter.format(0.00000001);
    if (!result.includes('e')) {
        throw new Error('Small number should use scientific notation');
    }
})) passed++; else failed++;

// Test rounding to avoid floating-point artifacts
if (test('rounds to avoid floating-point artifacts', () => {
    const result = NumberFormatter.format(0.1 + 0.2);
    assertEqual(result, '0.3', 'Should round 0.30000000000000004 to 0.3');
})) passed++; else failed++;

if (test('handles floating-point multiplication artifacts', () => {
    const result = NumberFormatter.format(0.07 * 100);
    assertEqual(result, '7', 'Should round 6.999999999999999 to 7');
})) passed++; else failed++;

// Test significant digits limit
if (test('limits to 10 significant digits', () => {
    const result = NumberFormatter.format(1.234567890123456);
    const sigDigits = result.replace('.', '').replace('-', '').length;
    if (sigDigits > 10) {
        throw new Error(`Too many significant digits: ${sigDigits}`);
    }
})) passed++; else failed++;

// Test special values
if (test('handles Infinity', () => {
    const result = NumberFormatter.format(Infinity);
    assertEqual(result, 'Infinity', 'Should handle positive infinity');
})) passed++; else failed++;

if (test('handles negative Infinity', () => {
    const result = NumberFormatter.format(-Infinity);
    assertEqual(result, '-Infinity', 'Should handle negative infinity');
})) passed++; else failed++;

if (test('handles NaN', () => {
    const result = NumberFormatter.format(NaN);
    assertEqual(result, 'Error', 'Should handle NaN');
})) passed++; else failed++;

// Test scientific notation formatting
if (test('formats scientific notation without trailing zeros', () => {
    const result = NumberFormatter.formatScientific(1234567890);
    if (result.includes('0e')) {
        throw new Error('Should not have trailing zeros in mantissa');
    }
})) passed++; else failed++;

// Test precision rounding
if (test('rounds to specified precision', () => {
    const result = NumberFormatter.roundToPrecision(1.23456789, 5);
    const str = result.toString();
    const sigDigits = str.replace('.', '').replace('-', '').length;
    if (sigDigits > 5) {
        throw new Error(`Too many significant digits after rounding: ${sigDigits}`);
    }
})) passed++; else failed++;

// Test decimal formatting
if (test('removes trailing zeros from decimals', () => {
    const result = NumberFormatter.formatDecimal('3.14000');
    assertEqual(result, '3.14', 'Should remove trailing zeros');
})) passed++; else failed++;

if (test('removes decimal point if no fractional part', () => {
    const result = NumberFormatter.formatDecimal('42.0000');
    assertEqual(result, '42', 'Should remove decimal point');
})) passed++; else failed++;

// Test input validation
if (test('validates valid number input', () => {
    if (!NumberFormatter.isValidInput('123.45')) {
        throw new Error('Should accept valid number');
    }
})) passed++; else failed++;

if (test('validates partial input', () => {
    if (!NumberFormatter.isValidInput('123.')) {
        throw new Error('Should accept partial input with trailing decimal');
    }
})) passed++; else failed++;

// Test real-world calculator scenarios
if (test('formats calculator result: 2 + 2', () => {
    const result = NumberFormatter.format(2 + 2);
    assertEqual(result, '4', 'Simple addition');
})) passed++; else failed++;

if (test('formats calculator result: π', () => {
    const result = NumberFormatter.format(Math.PI);
    // Should be approximately 3.141592654
    if (!result.startsWith('3.14159')) {
        throw new Error(`Pi not formatted correctly: ${result}`);
    }
})) passed++; else failed++;

if (test('formats calculator result: e', () => {
    const result = NumberFormatter.format(Math.E);
    // Should be approximately 2.718281828
    if (!result.startsWith('2.71828')) {
        throw new Error(`e not formatted correctly: ${result}`);
    }
})) passed++; else failed++;

if (test('formats calculator result: sqrt(2)', () => {
    const result = NumberFormatter.format(Math.sqrt(2));
    // Should be approximately 1.414213562
    if (!result.startsWith('1.41421')) {
        throw new Error(`sqrt(2) not formatted correctly: ${result}`);
    }
})) passed++; else failed++;

console.log(`\n=== Test Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed === 0) {
    console.log('\n✓ All tests passed!');
} else {
    console.log(`\n✗ ${failed} test(s) failed`);
}
