/**
 * Node.js test for NumberFormatter
 */

// Simple NumberFormatter implementation for testing
class NumberFormatter {
    static MAX_SIGNIFICANT_DIGITS = 10;
    static LARGE_NUMBER_THRESHOLD = 1e10;
    static SMALL_NUMBER_THRESHOLD = 1e-7;

    static format(value) {
        if (!isFinite(value)) {
            if (isNaN(value)) {
                return 'Error';
            }
            return value > 0 ? 'Infinity' : '-Infinity';
        }

        if (value === 0) {
            return '0';
        }

        const absValue = Math.abs(value);

        if (absValue >= this.LARGE_NUMBER_THRESHOLD || 
            (absValue < this.SMALL_NUMBER_THRESHOLD && absValue !== 0)) {
            return this.formatScientific(value);
        }

        const rounded = this.roundToPrecision(value, this.MAX_SIGNIFICANT_DIGITS);
        let str = rounded.toString();
        str = this.formatDecimal(str);

        return str;
    }

    static formatScientific(value) {
        const mantissaDigits = Math.min(this.MAX_SIGNIFICANT_DIGITS - 1, 9);
        let formatted = value.toExponential(mantissaDigits);
        formatted = formatted.replace(/(\.\d*?)0+(e[+-]?\d+)$/, '$1$2');
        formatted = formatted.replace(/\.(e[+-]?\d+)$/, '$1');
        return formatted;
    }

    static roundToPrecision(value, significantDigits) {
        if (value === 0) {
            return 0;
        }

        const precision = parseFloat(value.toPrecision(significantDigits));
        const magnitude = Math.floor(Math.log10(Math.abs(value)));
        const scale = Math.pow(10, significantDigits - magnitude - 1);
        
        return Math.round(precision * scale) / scale;
    }

    static formatDecimal(str) {
        if (!str.includes('.')) {
            return str;
        }

        const parts = str.split('.');
        let integerPart = parts[0];
        let decimalPart = parts[1];

        decimalPart = decimalPart.replace(/0+$/, '');

        if (decimalPart === '') {
            return integerPart;
        }

        const maxDecimalPlaces = Math.max(0, this.MAX_SIGNIFICANT_DIGITS - integerPart.replace('-', '').length);
        if (decimalPart.length > maxDecimalPlaces) {
            decimalPart = decimalPart.substring(0, maxDecimalPlaces);
            decimalPart = decimalPart.replace(/0+$/, '');
        }

        return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
    }
}

// Run tests
console.log('Testing NumberFormatter...\n');

const tests = [
    { name: 'Zero', input: 0, expected: '0' },
    { name: 'Positive integer', input: 42, expected: '42' },
    { name: 'Negative integer', input: -42, expected: '-42' },
    { name: 'Decimal', input: 3.14, expected: '3.14' },
    { name: 'Floating-point artifact (0.1 + 0.2)', input: 0.1 + 0.2, expected: '0.3' },
    { name: 'Floating-point artifact (0.07 * 100)', input: 0.07 * 100, expected: '7' },
    { name: 'Pi', input: Math.PI, startsWith: '3.14159' },
    { name: 'e', input: Math.E, startsWith: '2.71828' },
    { name: 'sqrt(2)', input: Math.sqrt(2), startsWith: '1.41421' },
    { name: 'Large number', input: 12345678901, contains: 'e' },
    { name: 'Small number', input: 0.00000001, contains: 'e' },
    { name: 'Infinity', input: Infinity, expected: 'Infinity' },
    { name: 'Negative Infinity', input: -Infinity, expected: '-Infinity' },
    { name: 'NaN', input: NaN, expected: 'Error' },
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
    const result = NumberFormatter.format(test.input);
    let success = false;
    
    if (test.expected !== undefined) {
        success = result === test.expected;
    } else if (test.startsWith !== undefined) {
        success = result.startsWith(test.startsWith);
    } else if (test.contains !== undefined) {
        success = result.includes(test.contains);
    }
    
    if (success) {
        console.log(`✓ ${test.name}: ${result}`);
        passed++;
    } else {
        console.log(`✗ ${test.name}: got "${result}", expected "${test.expected || test.startsWith || test.contains}"`);
        failed++;
    }
});

console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}/${tests.length}`);
console.log(`Failed: ${failed}/${tests.length}`);

if (failed === 0) {
    console.log('\n✓ All tests passed!');
    process.exit(0);
} else {
    console.log(`\n✗ ${failed} test(s) failed`);
    process.exit(1);
}
