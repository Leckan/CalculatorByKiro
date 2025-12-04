/**
 * NumberFormatter - Utility class for formatting numbers for display
 * Handles precision, significant digits, scientific notation, and rounding
 * Requirements: 7.2, 7.3, 7.4
 */
class NumberFormatter {
    /**
     * Maximum number of significant digits to display
     */
    static MAX_SIGNIFICANT_DIGITS = 10;

    /**
     * Threshold for switching to scientific notation (large numbers)
     */
    static LARGE_NUMBER_THRESHOLD = 1e10;

    /**
     * Threshold for switching to scientific notation (small numbers)
     */
    static SMALL_NUMBER_THRESHOLD = 1e-7;

    /**
     * Format a number for display with proper precision and notation
     * Requirements: 7.2, 7.3, 7.4
     * @param {number} value - The number to format
     * @returns {string} Formatted number string
     */
    static format(value) {
        // Handle special cases
        if (!isFinite(value)) {
            if (isNaN(value)) {
                return 'Error';
            }
            return value > 0 ? 'Infinity' : '-Infinity';
        }

        // Handle zero
        if (value === 0) {
            return '0';
        }

        const absValue = Math.abs(value);

        // Use scientific notation for very large or very small numbers
        if (absValue >= this.LARGE_NUMBER_THRESHOLD || 
            (absValue < this.SMALL_NUMBER_THRESHOLD && absValue !== 0)) {
            return this.formatScientific(value);
        }

        // Round to avoid floating-point artifacts
        // Use toPrecision to get up to MAX_SIGNIFICANT_DIGITS significant digits
        const rounded = this.roundToPrecision(value, this.MAX_SIGNIFICANT_DIGITS);

        // Convert to string
        let str = rounded.toString();

        // Handle decimal formatting
        str = this.formatDecimal(str);

        return str;
    }

    /**
     * Format a number in scientific notation
     * Requirements: 7.4
     * @param {number} value - The number to format
     * @returns {string} Number in scientific notation
     */
    static formatScientific(value) {
        // Use exponential notation with appropriate precision
        const mantissaDigits = Math.min(this.MAX_SIGNIFICANT_DIGITS - 1, 9);
        
        let formatted = value.toExponential(mantissaDigits);
        
        // Remove trailing zeros from mantissa
        formatted = formatted.replace(/(\.\d*?)0+(e[+-]?\d+)$/, '$1$2');
        
        // Remove decimal point if no fractional part
        formatted = formatted.replace(/\.(e[+-]?\d+)$/, '$1');
        
        return formatted;
    }

    /**
     * Round a number to a specified number of significant digits
     * Requirements: 7.3
     * @param {number} value - The number to round
     * @param {number} significantDigits - Number of significant digits
     * @returns {number} Rounded number
     */
    static roundToPrecision(value, significantDigits) {
        if (value === 0) {
            return 0;
        }

        // Use toPrecision and parse back to number to avoid floating-point artifacts
        const precision = parseFloat(value.toPrecision(significantDigits));
        
        // Additional rounding to clean up floating-point errors
        // Find the magnitude of the number
        const magnitude = Math.floor(Math.log10(Math.abs(value)));
        const scale = Math.pow(10, significantDigits - magnitude - 1);
        
        return Math.round(precision * scale) / scale;
    }

    /**
     * Format decimal representation to remove trailing zeros and limit length
     * Requirements: 7.2, 7.3
     * @param {string} str - Number string to format
     * @returns {string} Formatted decimal string
     */
    static formatDecimal(str) {
        // If no decimal point, return as is
        if (!str.includes('.')) {
            return str;
        }

        // Split into integer and decimal parts
        const parts = str.split('.');
        let integerPart = parts[0];
        let decimalPart = parts[1];

        // Remove trailing zeros from decimal part
        decimalPart = decimalPart.replace(/0+$/, '');

        // If no decimal part remains, return just integer
        if (decimalPart === '') {
            return integerPart;
        }

        // Limit total length to prevent display overflow
        const maxDecimalPlaces = Math.max(0, this.MAX_SIGNIFICANT_DIGITS - integerPart.replace('-', '').length);
        if (decimalPart.length > maxDecimalPlaces) {
            decimalPart = decimalPart.substring(0, maxDecimalPlaces);
            // Remove trailing zeros again after truncation
            decimalPart = decimalPart.replace(/0+$/, '');
        }

        // Return formatted number
        return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
    }

    /**
     * Format a number for input display (preserves trailing zeros and decimal point)
     * Requirements: 7.2
     * @param {string} inputStr - Input string to format
     * @returns {string} Formatted input string
     */
    static formatInput(inputStr) {
        // For input, preserve the string as-is to maintain user's typing
        // Only validate that it's a valid number format
        if (inputStr === '' || inputStr === '-' || inputStr === '.') {
            return inputStr;
        }

        // Check if it's a valid number in progress
        if (/^-?\d*\.?\d*$/.test(inputStr)) {
            return inputStr;
        }

        // If not valid, try to parse and format
        const num = parseFloat(inputStr);
        if (isNaN(num)) {
            return '0';
        }

        return this.format(num);
    }

    /**
     * Check if a string represents a valid number input
     * @param {string} str - String to validate
     * @returns {boolean} True if valid number input
     */
    static isValidInput(str) {
        // Allow empty, minus sign, decimal point, or valid number
        return str === '' || 
               str === '-' || 
               str === '.' || 
               str === '-.' ||
               /^-?\d*\.?\d*$/.test(str);
    }

    /**
     * Get the number of significant digits in a number
     * @param {number} value - The number to analyze
     * @returns {number} Number of significant digits
     */
    static getSignificantDigits(value) {
        if (value === 0) {
            return 1;
        }

        const str = Math.abs(value).toExponential().split('e')[0].replace('.', '');
        return str.length;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NumberFormatter;
}
