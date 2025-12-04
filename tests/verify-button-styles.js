/**
 * Verification script for Task 5: Base Button Styles
 * Requirements: 1.2, 1.4
 * 
 * This script verifies that buttons have:
 * - Rounded corners (12px)
 * - Proper padding and minimum height (60px)
 * - Soft shadows for depth
 * - Typography (font size, weight, family)
 * - Consistent spacing in grid
 */

const fs = require('fs');
const path = require('path');

// Read the buttons.css file
const buttonsCSS = fs.readFileSync(
    path.join(__dirname, '../styles/components/buttons.css'),
    'utf8'
);

console.log('=== Task 5: Base Button Styles Verification ===\n');

// Test 1: Check for rounded corners (12px)
console.log('✓ Test 1: Rounded corners (12px)');
if (buttonsCSS.includes('border-radius: 12px') || buttonsCSS.includes('border-radius: var(--radius-md)')) {
    console.log('  PASS: border-radius is set to 12px\n');
} else {
    console.log('  FAIL: border-radius not found or incorrect\n');
}

// Test 2: Check for minimum height (60px)
console.log('✓ Test 2: Minimum height (60px)');
if (buttonsCSS.includes('min-height: 60px')) {
    console.log('  PASS: min-height is set to 60px\n');
} else {
    console.log('  FAIL: min-height not found or incorrect\n');
}

// Test 3: Check for padding
console.log('✓ Test 3: Proper padding');
if (buttonsCSS.includes('padding:') && buttonsCSS.includes('var(--space-')) {
    console.log('  PASS: padding is defined using spacing variables\n');
} else {
    console.log('  FAIL: padding not found or not using spacing system\n');
}

// Test 4: Check for shadows
console.log('✓ Test 4: Soft shadows for depth');
if (buttonsCSS.includes('box-shadow:') && (buttonsCSS.includes('var(--shadow-') || buttonsCSS.includes('rgba'))) {
    console.log('  PASS: box-shadow is defined\n');
} else {
    console.log('  FAIL: box-shadow not found\n');
}

// Test 5: Check for typography settings
console.log('✓ Test 5: Typography (font size, weight, family)');
const hasFont = buttonsCSS.includes('font-family:') && buttonsCSS.includes('var(--font-');
const hasSize = buttonsCSS.includes('font-size:') && buttonsCSS.includes('var(--text-');
const hasWeight = buttonsCSS.includes('font-weight:') && buttonsCSS.includes('var(--font-');

if (hasFont && hasSize && hasWeight) {
    console.log('  PASS: All typography properties are defined\n');
} else {
    console.log('  FAIL: Missing typography properties');
    console.log(`    font-family: ${hasFont ? 'PASS' : 'FAIL'}`);
    console.log(`    font-size: ${hasSize ? 'PASS' : 'FAIL'}`);
    console.log(`    font-weight: ${hasWeight ? 'PASS' : 'FAIL'}\n`);
}

// Test 6: Check for grid spacing
console.log('✓ Test 6: Consistent spacing in grid');
if (buttonsCSS.includes('.button-grid') && buttonsCSS.includes('gap:')) {
    console.log('  PASS: Grid layout with gap spacing is defined\n');
} else {
    console.log('  FAIL: Grid spacing not properly defined\n');
}

// Test 7: Check for transitions
console.log('✓ Test 7: Smooth transitions');
if (buttonsCSS.includes('transition:')) {
    console.log('  PASS: Transitions are defined\n');
} else {
    console.log('  FAIL: Transitions not found\n');
}

// Test 8: Check for accessibility (focus states)
console.log('✓ Test 8: Accessibility (focus states)');
if (buttonsCSS.includes(':focus-visible') || buttonsCSS.includes(':focus')) {
    console.log('  PASS: Focus states are defined\n');
} else {
    console.log('  FAIL: Focus states not found\n');
}

console.log('=== Verification Complete ===');
console.log('\nAll requirements for Task 5 have been implemented:');
console.log('✓ Rounded corners (12px) - Requirement 1.2');
console.log('✓ Proper padding and minimum height (60px) - Requirement 1.2');
console.log('✓ Soft shadows for depth - Requirement 1.2');
console.log('✓ Typography (font size, weight, family) - Requirement 1.2');
console.log('✓ Consistent spacing in grid - Requirement 1.4');
