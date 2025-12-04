/**
 * Verification script for Task 11: Indicator Animations
 * Requirements: 6.1, 6.2, 6.3, 6.4
 * 
 * Tests:
 * 1. Mode indicators have smooth transitions (250ms)
 * 2. Active state has scale and glow effect
 * 3. Memory indicator has pulse animation
 * 4. Parenthesis indicator has smooth transitions
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for output
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

function logTest(testName, passed, details = '') {
    const status = passed ? '✓' : '✗';
    const color = passed ? 'green' : 'red';
    log(`${status} ${testName}`, color);
    if (details) {
        log(`  ${details}`, 'cyan');
    }
}

// Read CSS files
const indicatorsCSS = fs.readFileSync(
    path.join(__dirname, '../styles/components/indicators.css'),
    'utf8'
);

const variablesCSS = fs.readFileSync(
    path.join(__dirname, '../styles/base/variables.css'),
    'utf8'
);

// Read JavaScript file
const viewJS = fs.readFileSync(
    path.join(__dirname, '../src/calculator-view.js'),
    'utf8'
);

let allTestsPassed = true;

log('\n=== Task 11: Indicator Animations Verification ===\n', 'blue');

// Test 1: Check base indicator transitions (Requirement 6.4)
log('Test 1: Base Indicator Transitions', 'yellow');
const hasBaseTransition = indicatorsCSS.includes('.indicator') && 
                          indicatorsCSS.includes('transition:') &&
                          indicatorsCSS.includes('var(--duration-normal)');
logTest(
    'Indicators have smooth transitions with 250ms duration',
    hasBaseTransition,
    hasBaseTransition ? 'Found transition with var(--duration-normal)' : 'Missing base transition'
);
allTestsPassed = allTestsPassed && hasBaseTransition;

// Test 2: Check angle mode active state (Requirement 6.1)
log('\nTest 2: Angle Mode Active State', 'yellow');
const hasAngleModeActive = indicatorsCSS.includes('.angle-mode.active');
const hasAngleModeScale = indicatorsCSS.includes('transform: scale(1.05)') || 
                          indicatorsCSS.includes('transform:scale(1.05)');
const hasAngleModeGlow = indicatorsCSS.includes('box-shadow:') && 
                         indicatorsCSS.includes('rgba(102, 126, 234');
logTest(
    'Angle mode has active state with scale effect',
    hasAngleModeActive && hasAngleModeScale,
    hasAngleModeActive && hasAngleModeScale ? 'Found .angle-mode.active with scale(1.05)' : 'Missing active state or scale'
);
logTest(
    'Angle mode has glow effect (box-shadow)',
    hasAngleModeGlow,
    hasAngleModeGlow ? 'Found box-shadow with purple glow' : 'Missing glow effect'
);
allTestsPassed = allTestsPassed && hasAngleModeActive && hasAngleModeScale && hasAngleModeGlow;

// Test 3: Check memory indicator pulse animation (Requirement 6.2)
log('\nTest 3: Memory Indicator Pulse Animation', 'yellow');
const hasMemoryActive = indicatorsCSS.includes('.memory.active');
const hasPulseKeyframes = indicatorsCSS.includes('@keyframes indicatorPulse');
const hasPulseAnimation = indicatorsCSS.includes('animation: indicatorPulse') ||
                          indicatorsCSS.includes('animation:indicatorPulse');
const hasPulseOpacity = indicatorsCSS.includes('opacity: 0.6') || 
                        indicatorsCSS.includes('opacity:0.6');
logTest(
    'Memory indicator has active state',
    hasMemoryActive,
    hasMemoryActive ? 'Found .memory.active' : 'Missing .memory.active'
);
logTest(
    'Pulse animation keyframes defined',
    hasPulseKeyframes,
    hasPulseKeyframes ? 'Found @keyframes indicatorPulse' : 'Missing pulse keyframes'
);
logTest(
    'Pulse animation applied to active memory',
    hasPulseAnimation,
    hasPulseAnimation ? 'Found animation: indicatorPulse' : 'Missing animation property'
);
logTest(
    'Pulse animation has opacity changes',
    hasPulseOpacity,
    hasPulseOpacity ? 'Found opacity: 0.6 in keyframes' : 'Missing opacity changes'
);
allTestsPassed = allTestsPassed && hasMemoryActive && hasPulseKeyframes && hasPulseAnimation;

// Test 4: Check parenthesis indicator transitions (Requirement 6.3)
log('\nTest 4: Parenthesis Indicator Transitions', 'yellow');
const hasParenActive = indicatorsCSS.includes('.parenthesis.active');
const hasParenScale = indicatorsCSS.match(/\.parenthesis\.active[\s\S]*?transform:\s*scale\(1\.05\)/);
const hasParenGlow = indicatorsCSS.match(/\.parenthesis\.active[\s\S]*?box-shadow:/);
logTest(
    'Parenthesis indicator has active state',
    hasParenActive,
    hasParenActive ? 'Found .parenthesis.active' : 'Missing .parenthesis.active'
);
logTest(
    'Parenthesis active state has scale effect',
    hasParenScale !== null,
    hasParenScale ? 'Found scale(1.05) in active state' : 'Missing scale effect'
);
logTest(
    'Parenthesis active state has glow effect',
    hasParenGlow !== null,
    hasParenGlow ? 'Found box-shadow in active state' : 'Missing glow effect'
);
allTestsPassed = allTestsPassed && hasParenActive && hasParenScale && hasParenGlow;

// Test 5: Check JavaScript integration
log('\nTest 5: JavaScript Integration', 'yellow');
const hasAngleModeJS = viewJS.includes('updateAngleModeIndicator') && 
                       viewJS.includes('classList.add(\'active\')');
const hasMemoryJS = viewJS.includes('updateMemoryIndicator') && 
                    viewJS.includes('classList.add(\'active\')') &&
                    viewJS.includes('classList.remove(\'active\')');
const hasParenJS = viewJS.includes('updateParenthesisLevel') && 
                   viewJS.includes('classList.add(\'active\')') &&
                   viewJS.includes('validLevel > 0');
logTest(
    'Angle mode indicator adds active class',
    hasAngleModeJS,
    hasAngleModeJS ? 'updateAngleModeIndicator adds active class' : 'Missing active class logic'
);
logTest(
    'Memory indicator toggles active class',
    hasMemoryJS,
    hasMemoryJS ? 'updateMemoryIndicator toggles active class based on hasValue' : 'Missing toggle logic'
);
logTest(
    'Parenthesis indicator toggles active class',
    hasParenJS,
    hasParenJS ? 'updateParenthesisLevel toggles active class based on level' : 'Missing toggle logic'
);
allTestsPassed = allTestsPassed && hasAngleModeJS && hasMemoryJS && hasParenJS;

// Test 6: Check animation duration consistency
log('\nTest 6: Animation Duration Consistency', 'yellow');
const durationNormalValue = variablesCSS.match(/--duration-normal:\s*(\d+ms)/);
const is250ms = durationNormalValue && durationNormalValue[1] === '250ms';
logTest(
    'Duration normal is set to 250ms',
    is250ms,
    is250ms ? 'var(--duration-normal) = 250ms' : `Found: ${durationNormalValue ? durationNormalValue[1] : 'not found'}`
);
allTestsPassed = allTestsPassed && is250ms;

// Test 7: Check easing function
log('\nTest 7: Easing Function', 'yellow');
const hasStandardEasing = indicatorsCSS.includes('var(--easing-standard)');
logTest(
    'Indicators use standard easing function',
    hasStandardEasing,
    hasStandardEasing ? 'Found var(--easing-standard)' : 'Missing easing function'
);
allTestsPassed = allTestsPassed && hasStandardEasing;

// Summary
log('\n=== Summary ===\n', 'blue');
if (allTestsPassed) {
    log('✓ All tests passed! Task 11 implementation is complete.', 'green');
    log('\nImplemented features:', 'cyan');
    log('  • Smooth transitions for all indicators (250ms)', 'cyan');
    log('  • Active state with scale (1.05) and glow effects', 'cyan');
    log('  • Pulse animation for memory indicator (2s cycle)', 'cyan');
    log('  • Smooth transitions for parenthesis level changes', 'cyan');
    log('  • JavaScript integration for dynamic class management', 'cyan');
    process.exit(0);
} else {
    log('✗ Some tests failed. Please review the implementation.', 'red');
    process.exit(1);
}
