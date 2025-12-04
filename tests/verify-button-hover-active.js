/**
 * Test: Button Hover and Active State Animations
 * Task 7: Requirements 2.2, 2.5
 * 
 * Verifies that:
 * 1. Hover state applies translateY(-2px) transform
 * 2. Hover state applies enhanced shadow (--shadow-lg)
 * 3. Active state applies scale(0.95) transform
 * 4. Active state applies reduced shadow (--shadow-sm)
 * 5. Transition timing is 150ms with standard easing
 * 6. All button types have consistent hover/active behavior
 */

const fs = require('fs');
const path = require('path');

// Read the buttons.css file
const buttonsCSS = fs.readFileSync(
    path.join(__dirname, '../styles/components/buttons.css'),
    'utf8'
);

console.log('=== Task 7: Button Hover and Active State Animations Test ===\n');

// Test 1: Check base button has transition property
console.log('Test 1: Base button transition property');
const hasTransition = /\.calc-button\s*{[^}]*transition:\s*all\s+var\(--duration-fast\)\s+var\(--easing-standard\)/s.test(buttonsCSS);
console.log(`✓ Base button has transition: ${hasTransition ? 'PASS' : 'FAIL'}`);
if (!hasTransition) {
    console.log('  Expected: transition: all var(--duration-fast) var(--easing-standard)');
}

// Test 2: Check hover state has translateY transform
console.log('\nTest 2: Hover state transform');
const hoverTransform = /\.calc-button:hover:not\(:disabled\)\s*{[^}]*transform:\s*translateY\(-2px\)/s.test(buttonsCSS);
console.log(`✓ Hover state has translateY(-2px): ${hoverTransform ? 'PASS' : 'FAIL'}`);
if (!hoverTransform) {
    console.log('  Expected: transform: translateY(-2px)');
}

// Test 3: Check hover state has enhanced shadow
console.log('\nTest 3: Hover state shadow');
const hoverShadow = /\.calc-button:hover:not\(:disabled\)\s*{[^}]*box-shadow:\s*var\(--shadow-lg\)/s.test(buttonsCSS);
console.log(`✓ Hover state has enhanced shadow: ${hoverShadow ? 'PASS' : 'FAIL'}`);
if (!hoverShadow) {
    console.log('  Expected: box-shadow: var(--shadow-lg)');
}

// Test 4: Check active state has scale transform
console.log('\nTest 4: Active state transform');
const activeTransform = /\.calc-button:active:not\(:disabled\)\s*{[^}]*transform:\s*scale\(0\.95\)/s.test(buttonsCSS);
console.log(`✓ Active state has scale(0.95): ${activeTransform ? 'PASS' : 'FAIL'}`);
if (!activeTransform) {
    console.log('  Expected: transform: scale(0.95)');
}

// Test 5: Check active state has reduced shadow
console.log('\nTest 5: Active state shadow');
const activeShadow = /\.calc-button:active:not\(:disabled\)\s*{[^}]*box-shadow:\s*var\(--shadow-sm\)/s.test(buttonsCSS);
console.log(`✓ Active state has reduced shadow: ${activeShadow ? 'PASS' : 'FAIL'}`);
if (!activeShadow) {
    console.log('  Expected: box-shadow: var(--shadow-sm)');
}

// Test 6: Check that hover and active states use :not(:disabled)
console.log('\nTest 6: Disabled state exclusion');
const hoverNotDisabled = /\.calc-button:hover:not\(:disabled\)/.test(buttonsCSS);
const activeNotDisabled = /\.calc-button:active:not\(:disabled\)/.test(buttonsCSS);
console.log(`✓ Hover excludes disabled buttons: ${hoverNotDisabled ? 'PASS' : 'FAIL'}`);
console.log(`✓ Active excludes disabled buttons: ${activeNotDisabled ? 'PASS' : 'FAIL'}`);

// Test 7: Verify timing values in variables.css
console.log('\nTest 7: Animation timing variables');
const variablesCSS = fs.readFileSync(
    path.join(__dirname, '../styles/base/variables.css'),
    'utf8'
);
const hasFastDuration = /--duration-fast:\s*150ms/.test(variablesCSS);
const hasStandardEasing = /--easing-standard:\s*cubic-bezier\(0\.4,\s*0\.0,\s*0\.2,\s*1\)/.test(variablesCSS);
console.log(`✓ --duration-fast is 150ms: ${hasFastDuration ? 'PASS' : 'FAIL'}`);
console.log(`✓ --easing-standard is correct: ${hasStandardEasing ? 'PASS' : 'FAIL'}`);

// Summary
console.log('\n=== Test Summary ===');
const allTests = [
    hasTransition,
    hoverTransform,
    hoverShadow,
    activeTransform,
    activeShadow,
    hoverNotDisabled,
    activeNotDisabled,
    hasFastDuration,
    hasStandardEasing
];
const passedTests = allTests.filter(t => t).length;
const totalTests = allTests.length;

console.log(`Passed: ${passedTests}/${totalTests}`);

if (passedTests === totalTests) {
    console.log('\n✅ All tests passed! Task 7 requirements met.');
    console.log('\nRequirements validated:');
    console.log('  - 2.2: Smooth hover effect with translateY and shadow');
    console.log('  - 2.2: Active state with scale transform');
    console.log('  - 2.5: Transition timing is 150ms with standard easing');
    console.log('  - Hover states are smooth and responsive');
    console.log('  - Disabled buttons excluded from hover/active effects');
    process.exit(0);
} else {
    console.log('\n❌ Some tests failed. Please review the implementation.');
    process.exit(1);
}
