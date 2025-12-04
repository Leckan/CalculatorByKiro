/**
 * Button Press Animation Verification Test
 * Task 8: Requirements 2.1, 2.5
 * 
 * Verifies:
 * 1. buttonPress keyframe animation exists in CSS
 * 2. Animation timing is 150ms
 * 3. 'pressed' class triggers the animation
 * 4. Animation uses scale effect
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function testButtonPressAnimation() {
    log('\n=== Button Press Animation Verification ===', 'blue');
    log('Task 8: Requirements 2.1, 2.5\n', 'blue');
    
    let allTestsPassed = true;
    
    // Test 1: Check if interactions.css file exists and contains buttonPress keyframe
    log('Test 1: Verify buttonPress keyframe exists in CSS', 'yellow');
    try {
        const interactionsCssPath = path.join(__dirname, '../styles/animations/interactions.css');
        const interactionsCss = fs.readFileSync(interactionsCssPath, 'utf8');
        
        if (interactionsCss.includes('@keyframes buttonPress')) {
            log('  ✓ PASS: buttonPress keyframe found in interactions.css', 'green');
        } else {
            log('  ✗ FAIL: buttonPress keyframe not found in interactions.css', 'red');
            allTestsPassed = false;
        }
        
        // Check for scale transform in keyframe
        if (interactionsCss.includes('transform: scale(0.95)')) {
            log('  ✓ PASS: Scale effect (0.95) found in buttonPress keyframe', 'green');
        } else {
            log('  ✗ FAIL: Scale effect not found in buttonPress keyframe', 'red');
            allTestsPassed = false;
        }
        
        // Check for pressed class selector
        if (interactionsCss.includes('.calc-button.pressed')) {
            log('  ✓ PASS: .calc-button.pressed selector found', 'green');
        } else {
            log('  ✗ FAIL: .calc-button.pressed selector not found', 'red');
            allTestsPassed = false;
        }
    } catch (error) {
        log(`  ✗ FAIL: Error reading interactions.css: ${error.message}`, 'red');
        allTestsPassed = false;
    }
    
    // Test 2: Check if animation timing is 150ms (var(--duration-fast))
    log('\nTest 2: Verify animation timing is 150ms', 'yellow');
    try {
        const variablesCssPath = path.join(__dirname, '../styles/base/variables.css');
        const variablesCss = fs.readFileSync(variablesCssPath, 'utf8');
        
        if (variablesCss.includes('--duration-fast: 150ms')) {
            log('  ✓ PASS: --duration-fast is set to 150ms', 'green');
        } else {
            log('  ✗ FAIL: --duration-fast is not set to 150ms', 'red');
            allTestsPassed = false;
        }
        
        const interactionsCssPath = path.join(__dirname, '../styles/animations/interactions.css');
        const interactionsCss = fs.readFileSync(interactionsCssPath, 'utf8');
        
        if (interactionsCss.includes('var(--duration-fast)')) {
            log('  ✓ PASS: buttonPress animation uses var(--duration-fast)', 'green');
        } else {
            log('  ✗ FAIL: buttonPress animation does not use var(--duration-fast)', 'red');
            allTestsPassed = false;
        }
    } catch (error) {
        log(`  ✗ FAIL: Error reading CSS files: ${error.message}`, 'red');
        allTestsPassed = false;
    }
    
    // Test 3: Check if JavaScript adds/removes 'pressed' class
    log('\nTest 3: Verify JavaScript implementation', 'yellow');
    try {
        const viewJsPath = path.join(__dirname, '../src/calculator-view.js');
        const viewJs = fs.readFileSync(viewJsPath, 'utf8');
        
        if (viewJs.includes('_triggerButtonPressAnimation')) {
            log('  ✓ PASS: _triggerButtonPressAnimation method found', 'green');
        } else {
            log('  ✗ FAIL: _triggerButtonPressAnimation method not found', 'red');
            allTestsPassed = false;
        }
        
        if (viewJs.includes("classList.add('pressed')")) {
            log('  ✓ PASS: Code adds "pressed" class to button', 'green');
        } else {
            log('  ✗ FAIL: Code does not add "pressed" class', 'red');
            allTestsPassed = false;
        }
        
        if (viewJs.includes("classList.remove('pressed')")) {
            log('  ✓ PASS: Code removes "pressed" class from button', 'green');
        } else {
            log('  ✗ FAIL: Code does not remove "pressed" class', 'red');
            allTestsPassed = false;
        }
        
        if (viewJs.includes('setTimeout') && viewJs.includes('150')) {
            log('  ✓ PASS: setTimeout with 150ms delay found', 'green');
        } else {
            log('  ✗ FAIL: setTimeout with 150ms delay not found', 'red');
            allTestsPassed = false;
        }
        
        if (viewJs.includes('this._triggerButtonPressAnimation(button)')) {
            log('  ✓ PASS: Animation is triggered on button click', 'green');
        } else {
            log('  ✗ FAIL: Animation is not triggered on button click', 'red');
            allTestsPassed = false;
        }
    } catch (error) {
        log(`  ✗ FAIL: Error reading calculator-view.js: ${error.message}`, 'red');
        allTestsPassed = false;
    }
    
    // Test 4: Check keyframe structure
    log('\nTest 4: Verify keyframe animation structure', 'yellow');
    try {
        const interactionsCssPath = path.join(__dirname, '../styles/animations/interactions.css');
        const interactionsCss = fs.readFileSync(interactionsCssPath, 'utf8');
        
        // Check for 0%, 50%, 100% keyframe stops
        if (interactionsCss.includes('0%') && 
            interactionsCss.includes('50%') && 
            interactionsCss.includes('100%')) {
            log('  ✓ PASS: Keyframe has 0%, 50%, 100% stops', 'green');
        } else {
            log('  ✗ FAIL: Keyframe missing proper stops', 'red');
            allTestsPassed = false;
        }
        
        // Check for scale(1) at start and end
        const scaleOneMatches = (interactionsCss.match(/transform:\s*scale\(1\)/g) || []).length;
        if (scaleOneMatches >= 2) {
            log('  ✓ PASS: Animation returns to scale(1) at start and end', 'green');
        } else {
            log('  ✗ FAIL: Animation does not properly return to original scale', 'red');
            allTestsPassed = false;
        }
    } catch (error) {
        log(`  ✗ FAIL: Error verifying keyframe structure: ${error.message}`, 'red');
        allTestsPassed = false;
    }
    
    // Final summary
    log('\n=== Test Summary ===', 'blue');
    if (allTestsPassed) {
        log('✓ ALL TESTS PASSED', 'green');
        log('Button press animation is correctly implemented.', 'green');
        return 0;
    } else {
        log('✗ SOME TESTS FAILED', 'red');
        log('Please review the implementation.', 'red');
        return 1;
    }
}

// Run tests
const exitCode = testButtonPressAnimation();
process.exit(exitCode);
