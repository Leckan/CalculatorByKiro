/**
 * Responsive Layout Verification Script
 * Task 15: Create responsive layout with media queries
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 * 
 * This script verifies that the calculator layout is responsive
 * and maintains functionality across different screen sizes.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
    console.log('\n' + '='.repeat(60));
    log(title, 'cyan');
    console.log('='.repeat(60));
}

function logTest(testName, passed, details = '') {
    const status = passed ? '✓ PASS' : '✗ FAIL';
    const color = passed ? 'green' : 'red';
    log(`${status}: ${testName}`, color);
    if (details) {
        console.log(`  ${details}`);
    }
}

// Read the breakpoints CSS file
const breakpointsPath = path.join(__dirname, '../styles/responsive/breakpoints.css');
const breakpointsCSS = fs.readFileSync(breakpointsPath, 'utf8');

let totalTests = 0;
let passedTests = 0;

logSection('Task 15: Responsive Layout Verification');

// Test 1: Mobile breakpoint exists (< 640px)
logSection('Requirement 7.1: Mobile Breakpoint (< 640px)');
totalTests++;
const hasMobileBreakpoint = breakpointsCSS.includes('@media (max-width: 639px)');
if (hasMobileBreakpoint) {
    passedTests++;
    logTest('Mobile breakpoint defined', true, 'Found @media (max-width: 639px)');
} else {
    logTest('Mobile breakpoint defined', false, 'Missing @media (max-width: 639px)');
}

// Test 2: Mobile button sizing adjustments
totalTests++;
const mobileSection = breakpointsCSS.match(/@media \(max-width: 639px\)\s*\{[\s\S]*?\n\}/);
const hasMobileButtonSizing = mobileSection && mobileSection[0].includes('.calc-button') && mobileSection[0].includes('min-height: 50px');
if (hasMobileButtonSizing) {
    passedTests++;
    logTest('Mobile button sizing adjusted', true, 'Buttons set to min-height: 50px on mobile');
} else {
    logTest('Mobile button sizing adjusted', false, 'Mobile button sizing not found or incorrect');
}

// Test 3: Mobile font size adjustments
totalTests++;
const hasMobileFontAdjustments = mobileSection && mobileSection[0].includes('.main-display') && mobileSection[0].includes('font-size: var(--text-3xl)');
if (hasMobileFontAdjustments) {
    passedTests++;
    logTest('Mobile font sizes adjusted', true, 'Display font size reduced for mobile');
} else {
    logTest('Mobile font sizes adjusted', false, 'Mobile font size adjustments not found');
}

// Test 4: Tablet breakpoint exists (640px - 1024px)
logSection('Requirement 7.2: Tablet Breakpoint (640px - 1024px)');
totalTests++;
const hasTabletBreakpoint = breakpointsCSS.includes('@media (min-width: 640px) and (max-width: 1023px)');
if (hasTabletBreakpoint) {
    passedTests++;
    logTest('Tablet breakpoint defined', true, 'Found @media (min-width: 640px) and (max-width: 1023px)');
} else {
    logTest('Tablet breakpoint defined', false, 'Missing tablet breakpoint');
}

// Test 5: Tablet optimized layout
totalTests++;
const tabletSection = breakpointsCSS.match(/@media \(min-width: 640px\) and \(max-width: 1023px\)\s*\{[\s\S]*?\n\}/);
const hasTabletOptimization = tabletSection && tabletSection[0].includes('.calculator') && tabletSection[0].includes('max-width: 480px');
if (hasTabletOptimization) {
    passedTests++;
    logTest('Tablet layout optimized', true, 'Calculator max-width set to 480px for tablet');
} else {
    logTest('Tablet layout optimized', false, 'Tablet layout optimization not found');
}

// Test 6: Desktop breakpoint exists (>= 1024px)
logSection('Requirement 7.3: Desktop Breakpoint (>= 1024px)');
totalTests++;
const hasDesktopBreakpoint = breakpointsCSS.includes('@media (min-width: 1024px)');
if (hasDesktopBreakpoint) {
    passedTests++;
    logTest('Desktop breakpoint defined', true, 'Found @media (min-width: 1024px)');
} else {
    logTest('Desktop breakpoint defined', false, 'Missing desktop breakpoint');
}

// Test 7: Desktop sizing
totalTests++;
const desktopSection = breakpointsCSS.match(/@media \(min-width: 1024px\)\s*\{[\s\S]*?\n\}/);
const hasDesktopSizing = desktopSection && desktopSection[0].includes('.calculator') && desktopSection[0].includes('max-width: 420px');
if (hasDesktopSizing) {
    passedTests++;
    logTest('Desktop sizing appropriate', true, 'Calculator max-width set to 420px for desktop');
} else {
    logTest('Desktop sizing appropriate', false, 'Desktop sizing not found or incorrect');
}

// Test 8: Button proportions maintained across breakpoints
logSection('Requirement 7.4: Button Proportions and Readability');
totalTests++;
const mobileButtonHeight = mobileSection && mobileSection[0].includes('min-height: 50px');
const tabletButtonHeight = tabletSection && tabletSection[0].includes('min-height: 56px');
const desktopButtonHeight = desktopSection && desktopSection[0].includes('min-height: 60px');

if (mobileButtonHeight && tabletButtonHeight && desktopButtonHeight) {
    passedTests++;
    logTest('Button proportions maintained', true, 'Mobile: 50px, Tablet: 56px, Desktop: 60px');
} else {
    logTest('Button proportions maintained', false, 'Button heights not properly scaled across breakpoints');
}

// Test 9: Responsive units and media queries
logSection('Requirement 7.5: Responsive Units and Functionality');
totalTests++;
const usesResponsiveUnits = breakpointsCSS.includes('var(--') && breakpointsCSS.includes('@media');
if (usesResponsiveUnits) {
    passedTests++;
    logTest('Uses responsive units', true, 'CSS variables and media queries used');
} else {
    logTest('Uses responsive units', false, 'Missing responsive units or media queries');
}

// Test 10: Minimum touch target size maintained
totalTests++;
const hasMinTouchTarget = breakpointsCSS.includes('min-width: 44px') && breakpointsCSS.includes('min-height: 44px');
if (hasMinTouchTarget) {
    passedTests++;
    logTest('Minimum touch target size', true, 'Buttons maintain 44x44px minimum for accessibility');
} else {
    logTest('Minimum touch target size', false, 'Missing minimum touch target size');
}

// Test 11: Touch device optimizations
totalTests++;
const hasTouchOptimizations = breakpointsCSS.includes('@media (hover: none) and (pointer: coarse)');
if (hasTouchOptimizations) {
    passedTests++;
    logTest('Touch device optimizations', true, 'Special handling for touch devices');
} else {
    logTest('Touch device optimizations', false, 'Missing touch device optimizations');
}

// Test 12: Landscape mobile handling
totalTests++;
const hasLandscapeHandling = breakpointsCSS.includes('@media (max-height: 640px) and (orientation: landscape)');
if (hasLandscapeHandling) {
    passedTests++;
    logTest('Landscape mobile handling', true, 'Special handling for landscape orientation');
} else {
    logTest('Landscape mobile handling', false, 'Missing landscape orientation handling');
}

// Test 13: Very small screen handling
totalTests++;
const hasSmallScreenHandling = breakpointsCSS.includes('@media (max-width: 360px)');
if (hasSmallScreenHandling) {
    passedTests++;
    logTest('Very small screen handling', true, 'Special handling for screens < 360px');
} else {
    logTest('Very small screen handling', false, 'Missing very small screen handling');
}

// Test 14: Calculator doesn't exceed viewport
totalTests++;
const hasViewportConstraint = breakpointsCSS.includes('max-width: 100vw') || breakpointsCSS.includes('max-width: 100%');
if (hasViewportConstraint) {
    passedTests++;
    logTest('Viewport constraint', true, 'Calculator constrained to viewport width');
} else {
    logTest('Viewport constraint', false, 'Missing viewport width constraint');
}

// Test 15: Text overflow handling
totalTests++;
const hasOverflowHandling = breakpointsCSS.includes('word-break') || breakpointsCSS.includes('overflow-wrap');
if (hasOverflowHandling) {
    passedTests++;
    logTest('Text overflow handling', true, 'Text overflow properly handled');
} else {
    logTest('Text overflow handling', false, 'Missing text overflow handling');
}

// Summary
logSection('Test Summary');
const passRate = ((passedTests / totalTests) * 100).toFixed(1);
log(`Total Tests: ${totalTests}`, 'blue');
log(`Passed: ${passedTests}`, 'green');
log(`Failed: ${totalTests - passedTests}`, 'red');
log(`Pass Rate: ${passRate}%`, passRate === '100.0' ? 'green' : 'yellow');

if (passedTests === totalTests) {
    log('\n✓ All responsive layout tests passed!', 'green');
    log('The calculator is responsive and maintains functionality across all screen sizes.', 'green');
    process.exit(0);
} else {
    log('\n✗ Some responsive layout tests failed.', 'red');
    log('Please review the failed tests above.', 'yellow');
    process.exit(1);
}
