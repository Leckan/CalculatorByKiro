/**
 * MemoryManager Class
 * Manages calculator memory operations (store, recall, clear, add)
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */
class MemoryManager {
  /**
   * Initialize the MemoryManager with zero memory value
   */
  constructor() {
    this.memory = 0;
  }

  /**
   * Store a value in memory
   * Requirement 6.1: WHEN the User selects memory store with a displayed value,
   * THE Calculator System SHALL save the value to Memory
   * Requirements: 6.1, 1.5
   * @param {number} value - The value to store in memory
   */
  store(value) {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new Error('Invalid value for memory store');
    }
    this.memory = value;
  }

  /**
   * Recall the value stored in memory
   * Requirement 6.2: WHEN the User selects memory recall,
   * THE Calculator System SHALL display the value stored in Memory
   * @returns {number} The value stored in memory
   */
  recall() {
    return this.memory;
  }

  /**
   * Clear the memory (reset to zero)
   * Requirement 6.3: WHEN the User selects memory clear,
   * THE Calculator System SHALL reset the Memory to zero
   */
  clear() {
    this.memory = 0;
  }

  /**
   * Add a value to the current memory value
   * Requirement 6.4: WHEN the User selects memory add with a displayed value,
   * THE Calculator System SHALL add the value to the current Memory value
   * Requirements: 6.4, 1.5
   * @param {number} value - The value to add to memory
   */
  add(value) {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new Error('Invalid value for memory add');
    }
    const newValue = this.memory + value;
    if (!isFinite(newValue)) {
      throw new Error('Memory overflow');
    }
    this.memory = newValue;
  }

  /**
   * Check if memory has a non-zero value
   * Used to display memory indicator in the UI
   * @returns {boolean} True if memory contains a non-zero value
   */
  hasValue() {
    return this.memory !== 0;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MemoryManager;
}
