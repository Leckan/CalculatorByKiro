/**
 * Unit tests for StateManager
 * Tests input buffer operations, angle mode switching, and backspace/clear operations
 * Requirements: 2.4, 2.5, 5.1, 5.2, 5.3
 */

const StateManager = require('../src/state-manager.js');

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

console.log('Testing StateManager...\n');

// Test initial state
console.log('=== Initial State ===');

test('Input buffer starts empty', () => {
    const state = new StateManager();
    assertEqual(state.getInputBuffer(), '', 'Initial input buffer should be empty');
});

test('Expression starts empty', () => {
    const state = new StateManager();
    assertEqual(state.getExpression(), '', 'Initial expression should be empty');
});

test('Last result starts null', () => {
    const state = new StateManager();
    assertEqual(state.getLastResult(), null, 'Initial last result should be null');
});

test('Angle mode starts as degrees', () => {
    const state = new StateManager();
    assertEqual(state.getAngleMode(), 'deg', 'Initial angle mode should be deg');
});

test('Parenthesis level starts at 0', () => {
    const state = new StateManager();
    assertEqual(state.getParenthesisLevel(), 0, 'Initial parenthesis level should be 0');
});

test('Error starts null', () => {
    const state = new StateManager();
    assertEqual(state.getError(), null, 'Initial error should be null');
});

// Test input buffer operations (Requirement 5.1)
console.log('\n=== Input Buffer Operations ===');

test('Set input buffer with string', () => {
    const state = new StateManager();
    state.setInputBuffer('123');
    assertEqual(state.getInputBuffer(), '123', 'Set input buffer failed');
});

test('Set input buffer with number', () => {
    const state = new StateManager();
    state.setInputBuffer(456);
    assertEqual(state.getInputBuffer(), '456', 'Set input buffer with number failed');
});

test('Set input buffer overwrites previous value', () => {
    const state = new StateManager();
    state.setInputBuffer('123');
    state.setInputBuffer('456');
    assertEqual(state.getInputBuffer(), '456', 'Overwrite input buffer failed');
});

test('Set input buffer with decimal', () => {
    const state = new StateManager();
    state.setInputBuffer('3.14');
    assertEqual(state.getInputBuffer(), '3.14', 'Set decimal input buffer failed');
});

test('Clear input buffer (Requirement 5.1)', () => {
    const state = new StateManager();
    state.setInputBuffer('123');
    state.clearInputBuffer();
    assertEqual(state.getInputBuffer(), '', 'Clear input buffer failed');
});

test('Clear input buffer when already empty', () => {
    const state = new StateManager();
    state.clearInputBuffer();
    assertEqual(state.getInputBuffer(), '', 'Clear empty buffer should remain empty');
});

test('Clear input buffer clears error', () => {
    const state = new StateManager();
    state.setError('Test error');
    state.clearInputBuffer();
    assertEqual(state.getError(), null, 'Clear should clear error');
});

// Test backspace operation (Requirement 5.3)
console.log('\n=== Backspace Operation ===');

test('Backspace removes last character', () => {
    const state = new StateManager();
    state.setInputBuffer('123');
    state.backspace();
    assertEqual(state.getInputBuffer(), '12', 'Backspace failed');
});

test('Backspace multiple times', () => {
    const state = new StateManager();
    state.setInputBuffer('12345');
    state.backspace();
    state.backspace();
    state.backspace();
    assertEqual(state.getInputBuffer(), '12', 'Multiple backspace failed');
});

test('Backspace on single character', () => {
    const state = new StateManager();
    state.setInputBuffer('5');
    state.backspace();
    assertEqual(state.getInputBuffer(), '', 'Backspace single character failed');
});

test('Backspace on empty buffer does nothing', () => {
    const state = new StateManager();
    state.backspace();
    assertEqual(state.getInputBuffer(), '', 'Backspace on empty should do nothing');
});

test('Backspace with decimal point', () => {
    const state = new StateManager();
    state.setInputBuffer('3.14');
    state.backspace();
    assertEqual(state.getInputBuffer(), '3.1', 'Backspace decimal failed');
});

// Test angle mode operations (Requirements 2.4, 2.5)
console.log('\n=== Angle Mode Operations ===');

test('Set angle mode to radians', () => {
    const state = new StateManager();
    state.setAngleMode('rad');
    assertEqual(state.getAngleMode(), 'rad', 'Set angle mode to rad failed');
});

test('Set angle mode to degrees', () => {
    const state = new StateManager();
    state.setAngleMode('rad');
    state.setAngleMode('deg');
    assertEqual(state.getAngleMode(), 'deg', 'Set angle mode to deg failed');
});

test('Toggle angle mode from deg to rad', () => {
    const state = new StateManager();
    const newMode = state.toggleAngleMode();
    assertEqual(newMode, 'rad', 'Toggle to rad failed');
    assertEqual(state.getAngleMode(), 'rad', 'Angle mode not updated');
});

test('Toggle angle mode from rad to deg', () => {
    const state = new StateManager();
    state.setAngleMode('rad');
    const newMode = state.toggleAngleMode();
    assertEqual(newMode, 'deg', 'Toggle to deg failed');
    assertEqual(state.getAngleMode(), 'deg', 'Angle mode not updated');
});

test('Toggle angle mode multiple times', () => {
    const state = new StateManager();
    state.toggleAngleMode(); // deg -> rad
    state.toggleAngleMode(); // rad -> deg
    state.toggleAngleMode(); // deg -> rad
    assertEqual(state.getAngleMode(), 'rad', 'Multiple toggles failed');
});

test('Set invalid angle mode throws error', () => {
    const state = new StateManager();
    try {
        state.setAngleMode('invalid');
        throw new Error('Should have thrown error for invalid angle mode');
    } catch (error) {
        if (!error.message.includes('Invalid angle mode')) {
            throw new Error(`Expected "Invalid angle mode" error, got "${error.message}"`);
        }
    }
});

// Test last result operations
console.log('\n=== Last Result Operations ===');

test('Set last result with valid number', () => {
    const state = new StateManager();
    state.setLastResult(42);
    assertEqual(state.getLastResult(), 42, 'Set last result failed');
});

test('Set last result with decimal', () => {
    const state = new StateManager();
    state.setLastResult(3.14159);
    assertEqual(state.getLastResult(), 3.14159, 'Set decimal result failed');
});

test('Set last result with negative', () => {
    const state = new StateManager();
    state.setLastResult(-10);
    assertEqual(state.getLastResult(), -10, 'Set negative result failed');
});

test('Set last result with zero', () => {
    const state = new StateManager();
    state.setLastResult(0);
    assertEqual(state.getLastResult(), 0, 'Set zero result failed');
});

test('Set last result rejects NaN', () => {
    const state = new StateManager();
    state.setLastResult(42);
    state.setLastResult(NaN);
    assertEqual(state.getLastResult(), 42, 'Should reject NaN');
});

test('Set last result rejects Infinity', () => {
    const state = new StateManager();
    state.setLastResult(42);
    state.setLastResult(Infinity);
    assertEqual(state.getLastResult(), 42, 'Should reject Infinity');
});

// Test expression operations
console.log('\n=== Expression Operations ===');

test('Set expression', () => {
    const state = new StateManager();
    state.setExpression('2 + 3');
    assertEqual(state.getExpression(), '2 + 3', 'Set expression failed');
});

test('Set expression overwrites previous', () => {
    const state = new StateManager();
    state.setExpression('2 + 3');
    state.setExpression('5 × 7');
    assertEqual(state.getExpression(), '5 × 7', 'Overwrite expression failed');
});

// Test parenthesis level operations
console.log('\n=== Parenthesis Level Operations ===');

test('Set parenthesis level', () => {
    const state = new StateManager();
    state.setParenthesisLevel(3);
    assertEqual(state.getParenthesisLevel(), 3, 'Set parenthesis level failed');
});

test('Set parenthesis level to maximum (10)', () => {
    const state = new StateManager();
    state.setParenthesisLevel(10);
    assertEqual(state.getParenthesisLevel(), 10, 'Set max parenthesis level failed');
});

test('Set parenthesis level rejects negative', () => {
    const state = new StateManager();
    state.setParenthesisLevel(5);
    state.setParenthesisLevel(-1);
    assertEqual(state.getParenthesisLevel(), 5, 'Should reject negative level');
});

test('Set parenthesis level rejects > 10', () => {
    const state = new StateManager();
    state.setParenthesisLevel(5);
    state.setParenthesisLevel(11);
    assertEqual(state.getParenthesisLevel(), 5, 'Should reject level > 10');
});

// Test error operations
console.log('\n=== Error Operations ===');

test('Set error message', () => {
    const state = new StateManager();
    state.setError('Test error');
    assertEqual(state.getError(), 'Test error', 'Set error failed');
});

test('Clear error', () => {
    const state = new StateManager();
    state.setError('Test error');
    state.clearError();
    assertEqual(state.getError(), null, 'Clear error failed');
});

test('Set input buffer clears error', () => {
    const state = new StateManager();
    state.setError('Test error');
    state.setInputBuffer('123');
    assertEqual(state.getError(), null, 'Set input buffer should clear error');
});

// Test reset operation (Requirement 5.2)
console.log('\n=== Reset Operation ===');

test('Reset clears all state', () => {
    const state = new StateManager();
    state.setInputBuffer('123');
    state.setExpression('2 + 3');
    state.setLastResult(42);
    state.setAngleMode('rad');
    state.setParenthesisLevel(3);
    state.setError('Test error');
    
    state.reset();
    
    assertEqual(state.getInputBuffer(), '', 'Reset should clear input buffer');
    assertEqual(state.getExpression(), '', 'Reset should clear expression');
    assertEqual(state.getLastResult(), null, 'Reset should clear last result');
    assertEqual(state.getAngleMode(), 'deg', 'Reset should set angle mode to deg');
    assertEqual(state.getParenthesisLevel(), 0, 'Reset should clear parenthesis level');
    assertEqual(state.getError(), null, 'Reset should clear error');
});

test('Reset when already in initial state', () => {
    const state = new StateManager();
    state.reset();
    assertEqual(state.getInputBuffer(), '', 'Reset on initial state should work');
});

// Test state preservation
console.log('\n=== State Preservation ===');

test('Invalid operations preserve state', () => {
    const state = new StateManager();
    state.setInputBuffer('123');
    state.setExpression('2 + 3');
    state.setLastResult(42);
    state.setAngleMode('rad');
    
    // Try invalid operations
    state.setLastResult(NaN);
    state.setParenthesisLevel(-1);
    
    // State should be preserved
    assertEqual(state.getInputBuffer(), '123', 'Input buffer corrupted');
    assertEqual(state.getExpression(), '2 + 3', 'Expression corrupted');
    assertEqual(state.getLastResult(), 42, 'Last result corrupted');
    assertEqual(state.getAngleMode(), 'rad', 'Angle mode corrupted');
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
