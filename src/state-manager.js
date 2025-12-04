/**
 * StateManager Class
 * Manages calculator state including input buffer, angle mode, and last result
 */
class StateManager {
  constructor() {
    this.inputBuffer = '';
    this.expression = '';
    this.lastResult = null;
    this.angleMode = 'deg'; // 'deg' or 'rad'
    this.parenthesisLevel = 0;
    this.error = null;
  }

  /**
   * Set the input buffer value
   * Requirements: 1.5
   * @param {string} value - The value to set
   */
  setInputBuffer(value) {
    try {
      this.inputBuffer = String(value);
      this.error = null;
    } catch (error) {
      console.error('Error setting input buffer:', error);
      this.error = error.message;
    }
  }

  /**
   * Get the current input buffer value
   * @returns {string} The current input buffer
   */
  getInputBuffer() {
    return this.inputBuffer;
  }

  /**
   * Clear the input buffer while preserving other state
   * Requirement 5.1: Clear entry functionality
   */
  clearInputBuffer() {
    this.inputBuffer = '';
    this.error = null;
  }

  /**
   * Remove the last character from the input buffer
   * Requirement 5.3: Backspace functionality
   */
  backspace() {
    if (this.inputBuffer.length > 0) {
      this.inputBuffer = this.inputBuffer.slice(0, -1);
    }
  }

  /**
   * Set the last calculated result
   * Requirements: 1.5
   * @param {number} value - The result value to store
   */
  setLastResult(value) {
    try {
      if (typeof value === 'number' && isFinite(value)) {
        this.lastResult = value;
      } else {
        throw new Error('Invalid result value');
      }
    } catch (error) {
      console.error('Error setting last result:', error);
      this.error = error.message;
    }
  }

  /**
   * Get the last calculated result
   * @returns {number|null} The last result or null if none exists
   */
  getLastResult() {
    return this.lastResult;
  }

  /**
   * Set the angle mode for trigonometric calculations
   * Requirement 2.4: Angle mode toggle functionality
   * @param {string} mode - Either 'deg' or 'rad'
   */
  setAngleMode(mode) {
    if (mode === 'deg' || mode === 'rad') {
      this.angleMode = mode;
    } else {
      throw new Error('Invalid angle mode. Must be "deg" or "rad"');
    }
  }

  /**
   * Get the current angle mode
   * Requirement 2.5: Apply current angle mode to calculations
   * @returns {string} The current angle mode ('deg' or 'rad')
   */
  getAngleMode() {
    return this.angleMode;
  }

  /**
   * Toggle between degree and radian modes
   * Requirement 2.4: Angle mode toggle functionality
   * @returns {string} The new angle mode after toggling
   */
  toggleAngleMode() {
    this.angleMode = this.angleMode === 'deg' ? 'rad' : 'deg';
    return this.angleMode;
  }

  /**
   * Set the current expression being built
   * Requirements: 1.5
   * @param {string} expr - The expression string
   */
  setExpression(expr) {
    try {
      this.expression = String(expr);
    } catch (error) {
      console.error('Error setting expression:', error);
      this.error = error.message;
    }
  }

  /**
   * Get the current expression
   * @returns {string} The current expression
   */
  getExpression() {
    return this.expression;
  }

  /**
   * Set the parenthesis nesting level
   * Requirements: 8.3, 1.5
   * @param {number} level - The nesting level
   */
  setParenthesisLevel(level) {
    try {
      if (typeof level === 'number' && level >= 0 && level <= 10) {
        this.parenthesisLevel = level;
      } else {
        throw new Error('Invalid parenthesis level');
      }
    } catch (error) {
      console.error('Error setting parenthesis level:', error);
      this.error = error.message;
    }
  }

  /**
   * Get the current parenthesis nesting level
   * @returns {number} The current nesting level
   */
  getParenthesisLevel() {
    return this.parenthesisLevel;
  }

  /**
   * Set an error message
   * @param {string} message - The error message
   */
  setError(message) {
    this.error = message;
  }

  /**
   * Get the current error message
   * @returns {string|null} The error message or null
   */
  getError() {
    return this.error;
  }

  /**
   * Clear the error state
   */
  clearError() {
    this.error = null;
  }

  /**
   * Reset all state to initial values
   * Requirement 5.2: All clear functionality
   */
  reset() {
    this.inputBuffer = '';
    this.expression = '';
    this.lastResult = null;
    this.angleMode = 'deg';
    this.parenthesisLevel = 0;
    this.error = null;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StateManager;
}
