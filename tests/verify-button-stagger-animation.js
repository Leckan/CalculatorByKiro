/**
 * Verification Script for Task 13: Button Stagger Animation
 * Requirements: 10.2, 10.3
 * 
 * This script verifies:
 * 1. buttonStagger keyframe animation exists
 * 2. Staggered animation delays are applied to buttons
 * 3. Stagger increment is 30ms per button
 * 4. Total stagger time fits within 800ms
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

function logTest(testName, passed, message = '') {
    const symbol = passed ? '✓' : '✗';
    const color = passed ? 'green' : 'red';
    log(`${symbol} ${testName}`, color);
    if (message) {
        log(`  ${message}`, 'cyan');
    }
}

// Read CSS files
const entranceCssPath = path.join(__dirname, '../styles/animations/entrance.css');
const buttonsCssPath = path.join(__dirname, '../styles/components/buttons.css');

let entranceCss = '';
let buttonsCss = '';

try {
    entranceCss = fs.readFileSync(entranceCssPath, 'utf8');
    buttonsCss = fs.readFileSync(buttonsCssPath, 'utf8');
} catch (error) {
    log('Error reading CSS files:', 'red');
    console.error(error);
    process.exit(1);
}

log('\n=== Task 13: Button Stagger Animation Verification ===\n', 'blue');
log('Requirements: 10.2, 10.3\n', 'yellow');

let allTestsPassed = true;

// Test 1: Check if buttonStagger keyframe exists
log('Test 1: buttonStagger keyframe animation exists', 'cyan');
// Match the entire keyframe block including nested braces
const buttonStaggerKeyframeRegex = /@keyframes\s+buttonStagger\s*\{[^}]*\{[^}]*\}[^}]*\{[^}]*\}[^}]*\}/;
const hasButtonStaggerKeyframe = buttonStaggerKeyframeRegex.test(entranceCss);
logTest('buttonStagger keyframe defined', hasButtonStaggerKeyframe);
if (!hasButtonStaggerKeyframe) allTestsPassed = false;

// Test 2: Check keyframe structure (0% and 100% states)
if (hasButtonStaggerKeyframe) {
    log('\nTest 2: buttonStagger keyframe structure', 'cyan');
    const keyframeMatch = entranceCss.match(buttonStaggerKeyframeRegex);
    const keyframeContent = keyframeMatch ? keyframeMatch[0] : '';
    
    const has0Percent = /0%\s*\{/.test(keyframeContent);
    const has100Percent = /100%\s*\{/.test(keyframeContent);
    const hasOpacity = /opacity\s*:\s*[01]/.test(keyframeContent);
    const hasTransform = /transform\s*:\s*translateY/.test(keyframeContent);
    
    logTest('Has 0% keyframe', has0Percent);
    logTest('Has 100% keyframe', has100Percent);
    logTest('Uses opacity property', hasOpacity);
    logTest('Uses translateY transform', hasTransform);
    
    if (!has0Percent || !has100Percent || !hasOpacity || !hasTransform) {
        allTestsPassed = false;
    }
}

// Test 3: Check if animation is applied to .calc-button
log('\nTest 3: Animation applied to buttons', 'cyan');
const buttonAnimationRegex = /\.calc-button\s*{[\s\S]*?animation\s*:\s*buttonStagger/;
const hasButtonAnimation = buttonAnimationRegex.test(buttonsCss);
logTest('buttonStagger animation applied to .calc-button', hasButtonAnimation);
if (!hasButtonAnimation) allTestsPassed = false;

// Test 4: Check animation duration (600ms)
log('\nTest 4: Animation duration', 'cyan');
const durationRegex = /animation\s*:\s*buttonStagger\s+var\(--duration-entrance\)/;
const hasCorrectDuration = durationRegex.test(buttonsCss);
logTest('Uses --duration-entrance variable (600ms)', hasCorrectDuration);
if (!hasCorrectDuration) allTestsPassed = false;

// Test 5: Check animation fill mode
log('\nTest 5: Animation fill mode', 'cyan');
const fillModeRegex = /animation-fill-mode\s*:\s*both/;
const hasCorrectFillMode = fillModeRegex.test(buttonsCss);
logTest('animation-fill-mode is "both"', hasCorrectFillMode);
if (!hasCorrectFillMode) allTestsPassed = false;

// Test 6: Check staggered delays with nth-child selectors
log('\nTest 6: Staggered animation delays', 'cyan');

// Check for nth-child delay patterns
const nthChildDelayRegex = /\.calc-button:nth-child\((\d+)\)\s*{\s*animation-delay\s*:\s*(\d+)ms\s*;?\s*}/g;
const delays = [];
let match;

while ((match = nthChildDelayRegex.exec(buttonsCss)) !== null) {
    const childIndex = parseInt(match[1]);
    const delay = parseInt(match[2]);
    delays.push({ index: childIndex, delay });
}

const hasDelays = delays.length > 0;
logTest('nth-child delay selectors found', hasDelays, `Found ${delays.length} delay rules`);
if (!hasDelays) allTestsPassed = false;

// Test 7: Check stagger increment is 30ms
if (delays.length > 1) {
    log('\nTest 7: Stagger increment is 30ms', 'cyan');
    
    // Sort delays by index
    delays.sort((a, b) => a.index - b.index);
    
    // Check first few increments
    let correctIncrement = true;
    const expectedIncrement = 30;
    
    for (let i = 1; i < Math.min(delays.length, 10); i++) {
        const increment = delays[i].delay - delays[i-1].delay;
        if (increment !== expectedIncrement) {
            correctIncrement = false;
            log(`  Incorrect increment between button ${delays[i-1].index} and ${delays[i].index}: ${increment}ms (expected ${expectedIncrement}ms)`, 'yellow');
        }
    }
    
    logTest('Stagger increment is 30ms', correctIncrement);
    if (!correctIncrement) allTestsPassed = false;
    
    // Show first 10 delays
    const firstTenDelays = delays.slice(0, 10).map(d => `${d.index}:${d.delay}ms`).join(', ');
    log(`  First delays: ${firstTenDelays}`, 'cyan');
}

// Test 8: Check total stagger time fits within 800ms
log('\nTest 8: Total stagger time fits within 800ms', 'cyan');

// Find maximum delay
const maxDelay = Math.max(...delays.map(d => d.delay));
const fitsWithin800 = maxDelay <= 800;

logTest('Maximum delay ≤ 800ms', fitsWithin800, `Max delay: ${maxDelay}ms`);
if (!fitsWithin800) allTestsPassed = false;

// Test 9: Check for nth-child(n+X) pattern for remaining buttons
log('\nTest 9: Capped delay for remaining buttons', 'cyan');
const cappedDelayRegex = /\.calc-button:nth-child\(n\+(\d+)\)\s*{\s*animation-delay\s*:\s*(\d+)ms\s*;?\s*}/;
const cappedMatch = buttonsCss.match(cappedDelayRegex);

if (cappedMatch) {
    const startIndex = parseInt(cappedMatch[1]);
    const cappedDelay = parseInt(cappedMatch[2]);
    const isCappedCorrectly = cappedDelay <= 800;
    
    logTest('Remaining buttons have capped delay', isCappedCorrectly, 
        `Buttons from ${startIndex} onwards: ${cappedDelay}ms`);
    
    if (!isCappedCorrectly) allTestsPassed = false;
} else {
    log('  No capped delay pattern found (optional)', 'yellow');
}

// Test 10: Check animation easing
log('\nTest 10: Animation easing', 'cyan');
const easingRegex = /animation\s*:\s*buttonStagger\s+var\(--duration-entrance\)\s+var\(--easing-decelerate\)/;
const hasCorrectEasing = easingRegex.test(buttonsCss);
logTest('Uses --easing-decelerate variable', hasCorrectEasing);
if (!hasCorrectEasing) allTestsPassed = false;

// Summary
log('\n=== Summary ===\n', 'blue');
if (allTestsPassed) {
    log('✓ All tests passed! Task 13 implementation is correct.', 'green');
    log('\nThe staggered button entrance animations are properly implemented:', 'cyan');
    log('  • buttonStagger keyframe animation created', 'cyan');
    log('  • Animation applied to all buttons with proper duration and easing', 'cyan');
    log('  • Staggered delays using nth-child selectors (30ms increment)', 'cyan');
    log('  • Total stagger time fits within 800ms', 'cyan');
    log('  • Animation fill mode set to "both" for proper state retention', 'cyan');
    process.exit(0);
} else {
    log('✗ Some tests failed. Please review the implementation.', 'red');
    process.exit(1);
}
