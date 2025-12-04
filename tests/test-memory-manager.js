/**
 * Unit tests for MemoryManager
 * Tests store, recall, clear, and add operations, and hasValue indicator
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

const MemoryManager = require('../src/memory-manager.js');

let testsPassed = 0;
let testsFailed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`✓ ${description}`);
        testsPassed++;
    } catch (error) {
        console.log(`✗ ${description}`);
        console.log(`  Error: ${error.message}`);
        testsFailed++;
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}: expected ${expected}, got ${actual}`);
    }
}

function assertThrows(fn, expectedMessage) {
    try {
        fn();
        throw new Error('Expected function to throw an error');
    } catch (error) {
        if (!error.message.includes(expectedMessage)) {
            throw new Error(`Expected error message to include "${expectedMessage}", got "${error.message}"`);
        }
    }
}

console.log('Testing MemoryManager...\n');

// Test initial state
console.log('=== Initial State ===');

test('Memory starts at zero', () => {
    const memory = new MemoryManager();
    assertEqual(memory.recall(), 0, 'Initial memory should be 0');
});

test('hasValue returns false initially', () => {
    const memory = new MemoryManager();
    assertEqual(memory.hasValue(), false, 'hasValue should be false initially');
});

// Test store operation (Requirement 6.1)
console.log('\n=== Store Operation ===');

test('Store positive number', () => {
    const memory = new MemoryManager();
    memory.store(42);
    assertEqual(memory.recall(), 42, 'Store positive number failed');
});

test('Store negative number', () => {
    const memory = new MemoryManager();
    memory.store(-15);
    assertEqual(memory.recall(), -15, 'Store negative number failed');
});

test('Store zero', () => {
    const memory = new MemoryManager();
    memory.store(0);
    assertEqual(memory.recall(), 0, 'Store zero failed');
});

test('Store decimal number', () => {
    const memory = new MemoryManager();
    memory.store(3.14159);
    assertEqual(memory.recall(), 3.14159, 'Store decimal failed');
});

test('Store overwrites previous value', () => {
    const memory = new MemoryManager();
    memory.store(10);
    memory.store(20);
    assertEqual(memory.recall(), 20, 'Store should overwrite previous value');
});

test('Store invalid value (NaN) throws error', () => {
    const memory = new MemoryManager();
    assertThrows(() => memory.store(NaN), 'Invalid value');
});

test('Store invalid value (Infinity) throws error', () => {
    const memory = new MemoryManager();
    assertThrows(() => memory.store(Infinity), 'Invalid value');
});

test('Store invalid value (string) throws error', () => {
    const memory = new MemoryManager();
    assertThrows(() => memory.store('42'), 'Invalid value');
});

// Test recall operation (Requirement 6.2)
console.log('\n=== Recall Operation ===');

test('Recall returns stored value', () => {
    const memory = new MemoryManager();
    memory.store(100);
    assertEqual(memory.recall(), 100, 'Recall should return stored value');
});

test('Recall multiple times returns same value', () => {
    const memory = new MemoryManager();
    memory.store(50);
    assertEqual(memory.recall(), 50, 'First recall failed');
    assertEqual(memory.recall(), 50, 'Second recall failed');
    assertEqual(memory.recall(), 50, 'Third recall failed');
});

test('Recall does not modify memory', () => {
    const memory = new MemoryManager();
    memory.store(75);
    memory.recall();
    memory.recall();
    assertEqual(memory.recall(), 75, 'Recall should not modify memory');
});

// Test clear operation (Requirement 6.3)
console.log('\n=== Clear Operation ===');

test('Clear resets memory to zero', () => {
    const memory = new MemoryManager();
    memory.store(100);
    memory.clear();
    assertEqual(memory.recall(), 0, 'Clear should reset to zero');
});

test('Clear after multiple operations', () => {
    const memory = new MemoryManager();
    memory.store(50);
    memory.add(25);
    memory.clear();
    assertEqual(memory.recall(), 0, 'Clear should reset to zero after operations');
});

test('Clear when already zero', () => {
    const memory = new MemoryManager();
    memory.clear();
    assertEqual(memory.recall(), 0, 'Clear on zero should remain zero');
});

// Test add operation (Requirement 6.4)
console.log('\n=== Add Operation ===');

test('Add to zero memory', () => {
    const memory = new MemoryManager();
    memory.add(10);
    assertEqual(memory.recall(), 10, 'Add to zero failed');
});

test('Add positive number', () => {
    const memory = new MemoryManager();
    memory.store(20);
    memory.add(15);
    assertEqual(memory.recall(), 35, 'Add positive number failed');
});

test('Add negative number', () => {
    const memory = new MemoryManager();
    memory.store(50);
    memory.add(-20);
    assertEqual(memory.recall(), 30, 'Add negative number failed');
});

test('Add multiple times', () => {
    const memory = new MemoryManager();
    memory.store(10);
    memory.add(5);
    memory.add(3);
    memory.add(2);
    assertEqual(memory.recall(), 20, 'Multiple adds failed');
});

test('Add decimal numbers', () => {
    const memory = new MemoryManager();
    memory.store(1.5);
    memory.add(2.3);
    const result = memory.recall();
    if (Math.abs(result - 3.8) > 0.0000001) {
        throw new Error(`Add decimal failed: expected 3.8, got ${result}`);
    }
});

test('Add zero', () => {
    const memory = new MemoryManager();
    memory.store(42);
    memory.add(0);
    assertEqual(memory.recall(), 42, 'Add zero should not change value');
});

test('Add invalid value (NaN) throws error', () => {
    const memory = new MemoryManager();
    assertThrows(() => memory.add(NaN), 'Invalid value');
});

test('Add invalid value (Infinity) throws error', () => {
    const memory = new MemoryManager();
    assertThrows(() => memory.add(Infinity), 'Invalid value');
});

test('Add causing overflow throws error', () => {
    const memory = new MemoryManager();
    memory.store(Number.MAX_VALUE);
    assertThrows(() => memory.add(Number.MAX_VALUE), 'overflow');
});

// Test hasValue indicator
console.log('\n=== hasValue Indicator ===');

test('hasValue returns true after store', () => {
    const memory = new MemoryManager();
    memory.store(42);
    assertEqual(memory.hasValue(), true, 'hasValue should be true after store');
});

test('hasValue returns false after clear', () => {
    const memory = new MemoryManager();
    memory.store(42);
    memory.clear();
    assertEqual(memory.hasValue(), false, 'hasValue should be false after clear');
});

test('hasValue returns false when memory is zero', () => {
    const memory = new MemoryManager();
    memory.store(0);
    assertEqual(memory.hasValue(), false, 'hasValue should be false for zero');
});

test('hasValue returns true for negative values', () => {
    const memory = new MemoryManager();
    memory.store(-10);
    assertEqual(memory.hasValue(), true, 'hasValue should be true for negative values');
});

test('hasValue returns true after add to non-zero', () => {
    const memory = new MemoryManager();
    memory.add(5);
    assertEqual(memory.hasValue(), true, 'hasValue should be true after add');
});

test('hasValue returns false after add results in zero', () => {
    const memory = new MemoryManager();
    memory.store(10);
    memory.add(-10);
    assertEqual(memory.hasValue(), false, 'hasValue should be false when result is zero');
});

// Test complex workflows
console.log('\n=== Complex Workflows ===');

test('Store, add, recall workflow', () => {
    const memory = new MemoryManager();
    memory.store(100);
    memory.add(50);
    memory.add(-25);
    assertEqual(memory.recall(), 125, 'Complex workflow failed');
});

test('Multiple store operations', () => {
    const memory = new MemoryManager();
    memory.store(10);
    memory.store(20);
    memory.store(30);
    assertEqual(memory.recall(), 30, 'Multiple stores should keep last value');
});

test('Store, clear, store workflow', () => {
    const memory = new MemoryManager();
    memory.store(50);
    memory.clear();
    memory.store(75);
    assertEqual(memory.recall(), 75, 'Store after clear failed');
});

test('Add, clear, add workflow', () => {
    const memory = new MemoryManager();
    memory.add(10);
    memory.clear();
    memory.add(20);
    assertEqual(memory.recall(), 20, 'Add after clear failed');
});

// Print summary
console.log('\n═══════════════════════════════════════');
if (testsFailed === 0) {
    console.log(`All ${testsPassed} tests passed! ✓`);
} else {
    console.log(`${testsPassed} tests passed, ${testsFailed} tests failed`);
}
console.log('═══════════════════════════════════════\n');

process.exit(testsFailed > 0 ? 1 : 0);
