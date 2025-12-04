/**
 * CalculatorEngine - Core calculation logic for the scientific calculator
 * Handles basic arithmetic operations and scientific functions
 */
class CalculatorEngine {
    constructor() {
        // No initialization needed for stateless operations
    }

    /**
     * Add two numbers
     * @param {number} a - First operand
     * @param {number} b - Second operand
     * @returns {number} Sum of a and b
     */
    add(a, b) {
        return a + b;
    }

    /**
     * Subtract second number from first
     * @param {number} a - First operand
     * @param {number} b - Second operand
     * @returns {number} Difference of a and b
     */
    subtract(a, b) {
        return a - b;
    }

    /**
     * Multiply two numbers
     * @param {number} a - First operand
     * @param {number} b - Second operand
     * @returns {number} Product of a and b
     */
    multiply(a, b) {
        return a * b;
    }

    /**
     * Divide first number by second
     * @param {number} a - Dividend
     * @param {number} b - Divisor
     * @returns {number} Quotient of a and b
     * @throws {Error} If divisor is zero
     */
    divide(a, b) {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }

    /**
     * Raise base to the power of exponent
     * @param {number} base - Base number
     * @param {number} exponent - Exponent
     * @returns {number} Base raised to the power of exponent
     */
    power(base, exponent) {
        return Math.pow(base, exponent);
    }

    /**
     * Convert degrees to radians
     * @param {number} degrees - Angle in degrees
     * @returns {number} Angle in radians
     */
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    /**
     * Convert radians to degrees
     * @param {number} radians - Angle in radians
     * @returns {number} Angle in degrees
     */
    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    /**
     * Calculate sine of an angle
     * @param {number} angle - Angle value
     * @param {string} angleMode - 'deg' for degrees or 'rad' for radians
     * @returns {number} Sine of the angle
     */
    sin(angle, angleMode = 'rad') {
        const radians = angleMode === 'deg' ? this.toRadians(angle) : angle;
        return Math.sin(radians);
    }

    /**
     * Calculate cosine of an angle
     * @param {number} angle - Angle value
     * @param {string} angleMode - 'deg' for degrees or 'rad' for radians
     * @returns {number} Cosine of the angle
     */
    cos(angle, angleMode = 'rad') {
        const radians = angleMode === 'deg' ? this.toRadians(angle) : angle;
        return Math.cos(radians);
    }

    /**
     * Calculate tangent of an angle
     * @param {number} angle - Angle value
     * @param {string} angleMode - 'deg' for degrees or 'rad' for radians
     * @returns {number} Tangent of the angle
     */
    tan(angle, angleMode = 'rad') {
        const radians = angleMode === 'deg' ? this.toRadians(angle) : angle;
        return Math.tan(radians);
    }

    /**
     * Calculate natural logarithm (base e)
     * @param {number} value - Input value
     * @returns {number} Natural logarithm of the value
     * @throws {Error} If value is not positive
     */
    ln(value) {
        if (value <= 0) {
            throw new Error('Invalid domain');
        }
        return Math.log(value);
    }

    /**
     * Calculate base-10 logarithm
     * @param {number} value - Input value
     * @returns {number} Base-10 logarithm of the value
     * @throws {Error} If value is not positive
     */
    log10(value) {
        if (value <= 0) {
            throw new Error('Invalid domain');
        }
        return Math.log10(value);
    }

    /**
     * Calculate exponential (e^x)
     * @param {number} value - Exponent value
     * @returns {number} e raised to the power of value
     */
    exp(value) {
        return Math.exp(value);
    }

    /**
     * Calculate square root
     * @param {number} value - Input value
     * @returns {number} Square root of the value
     * @throws {Error} If value is negative
     */
    sqrt(value) {
        if (value < 0) {
            throw new Error('Invalid domain');
        }
        return Math.sqrt(value);
    }

    /**
     * Calculate factorial
     * @param {number} n - Non-negative integer
     * @returns {number} Factorial of n
     * @throws {Error} If n is negative or not an integer
     */
    factorial(n) {
        if (n < 0) {
            throw new Error('Invalid factorial input');
        }
        if (!Number.isInteger(n)) {
            throw new Error('Invalid factorial input');
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculatorEngine;
}
