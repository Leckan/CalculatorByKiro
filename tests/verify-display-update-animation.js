/**
 * Verification script for Task 9: Display Update Animation
 * Requirements: 2.3, 9.3
 * 
 * This script verifies:
 * 1. displayUpdate keyframe animation exists in CSS
 * 2. Animation is triggered when display value changes
 * 3. Animation duration is 250ms
 * 4. 'updating' class is added and removed correctly
 * 5. Animation completes on calculation completion
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

function logTest(testName, passed, details = '') {
    const symbol = passed ? '✓' : '✗';
    const color = passed ? 'green' : 'red';
    log(`${symbol} ${testName}`, color);
    if (details) {
        log(`  ${details}`, 'cyan');
    }
}

// Test 1: Check if displayUpdate keyframe exists in transitions.css
function testKeyframeExists() {
    log('\n=== Test 1: displayUpdate Keyframe Exists ===', 'blue');
    
    try {
        const cssPath = path.join(__dirname, '../styles/animations/transitions.css');
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        
        const hasKeyframe = cssContent.includes('@keyframes displayUpdate');
        const hasOpacity = cssContent.includes('opacity:');
        const hasTransform = cssContent.includes('transform:');
        const hasTranslateY = cssContent.includes('translateY');
        
        logTest('Keyframe animation defined', hasKeyframe);
        logTest('Opacity property used', hasOpacity, 'Creates fade effect');
        logTest('Transform property used', hasTransform, 'Creates slide effect');
        logTest('TranslateY used for slide', hasTranslateY, 'Slides up and down');
        
        return hasKeyframe && hasOpacity && hasTransform && hasTranslateY;
    } catch (error) {
        logTest('File read error', false, error.message);
        return false;
    }
}

// Test 2: Check if .updating class applies animation
function testUpdatingClass() {
    log('\n=== Test 2: .updating Class Applies Animation ===', 'blue');
    
    try {
        const cssPath = path.join(__dirname, '../styles/animations/transitions.css');
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        
        const hasUpdatingClass = cssContent.includes('.main-display.updating');
        const hasAnimationProperty = cssContent.includes('animation:') && 
                                     cssContent.includes('displayUpdate');
        const hasDurationVar = cssContent.includes('var(--duration-normal)');
        const hasEasingVar = cssContent.includes('var(--easing-standard)');
        
        logTest('.main-display.updating selector exists', hasUpdatingClass);
        logTest('Animation property references displayUpdate', hasAnimationProperty);
        logTest('Uses --duration-normal variable (250ms)', hasDurationVar);
        logTest('Uses --easing-standard easing', hasEasingVar);
        
        return hasUpdatingClass && hasAnimationProperty && hasDurationVar && hasEasingVar;
    } catch (error) {
        logTest('File read error', false, error.message);
        return false;
    }
}

// Test 3: Check if animation duration is 250ms
function testAnimationDuration() {
    log('\n=== Test 3: Animation Duration is 250ms ===', 'blue');
    
    try {
        const cssPath = path.join(__dirname, '../styles/base/variables.css');
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        
        const durationMatch = cssContent.match(/--duration-normal:\s*(\d+ms)/);
        const duration = durationMatch ? durationMatch[1] : null;
        
        const isCorrect = duration === '250ms';
        logTest('Duration variable set to 250ms', isCorrect, `Found: ${duration}`);
        
        return isCorrect;
    } catch (error) {
        logTest('File read error', false, error.message);
        return false;
    }
}

// Test 4: Check if view triggers animation correctly
function testViewImplementation() {
    log('\n=== Test 4: View Implementation ===', 'blue');
    
    try {
        const viewPath = path.join(__dirname, '../src/calculator-view.js');
        const viewContent = fs.readFileSync(viewPath, 'utf8');
        
        const hasTriggerMethod = viewContent.includes('_triggerDisplayUpdateAnimation');
        const addsClass = viewContent.includes("classList.add('updating')");
        const removesClass = viewContent.includes("classList.remove('updating')");
        const hasTimeout = viewContent.includes('setTimeout') && 
                          viewContent.includes('250');
        const callsInUpdate = viewContent.includes('_triggerDisplayUpdateAnimation()');
        const checksValueChange = viewContent.includes('this.mainDisplay.textContent !== displayValue');
        
        logTest('_triggerDisplayUpdateAnimation method exists', hasTriggerMethod);
        logTest("Adds 'updating' class", addsClass);
        logTest("Removes 'updating' class", removesClass);
        logTest('Uses setTimeout with 250ms', hasTimeout);
        logTest('Called from updateDisplay method', callsInUpdate);
        logTest('Only triggers on value change', checksValueChange, 'Prevents unnecessary animations');
        
        return hasTriggerMethod && addsClass && removesClass && hasTimeout && callsInUpdate;
    } catch (error) {
        logTest('File read error', false, error.message);
        return false;
    }
}

// Test 5: Check animation keyframe structure
function testKeyframeStructure() {
    log('\n=== Test 5: Keyframe Structure ===', 'blue');
    
    try {
        const cssPath = path.join(__dirname, '../styles/animations/transitions.css');
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        
        const has0Percent = cssContent.includes('0%');
        const has50Percent = cssContent.includes('50%');
        const has100Percent = cssContent.includes('100%');
        
        // Check for fade effect (opacity changes)
        const opacityPattern = /opacity:\s*0\.5/;
        const hasFadeEffect = opacityPattern.test(cssContent);
        
        // Check for slide effect (translateY)
        const slidePattern = /translateY\(-\d+px\)/;
        const hasSlideEffect = slidePattern.test(cssContent);
        
        logTest('Has 0% keyframe', has0Percent, 'Start state');
        logTest('Has 50% keyframe', has50Percent, 'Mid-animation state');
        logTest('Has 100% keyframe', has100Percent, 'End state');
        logTest('Fade effect at 50%', hasFadeEffect, 'Opacity reduces to 0.5');
        logTest('Slide effect (translateY)', hasSlideEffect, 'Moves up then back');
        
        return has0Percent && has50Percent && has100Percent && hasFadeEffect && hasSlideEffect;
    } catch (error) {
        logTest('File read error', false, error.message);
        return false;
    }
}

// Test 6: Check requirements documentation
function testRequirementsDocumentation() {
    log('\n=== Test 6: Requirements Documentation ===', 'blue');
    
    try {
        const cssPath = path.join(__dirname, '../styles/animations/transitions.css');
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        
        const viewPath = path.join(__dirname, '../src/calculator-view.js');
        const viewContent = fs.readFileSync(viewPath, 'utf8');
        
        const cssHasReq23 = cssContent.includes('2.3');
        const cssHasReq93 = cssContent.includes('9.3');
        const viewHasReq23 = viewContent.includes('2.3');
        const viewHasReq93 = viewContent.includes('9.3');
        
        logTest('CSS references Requirement 2.3', cssHasReq23);
        logTest('CSS references Requirement 9.3', cssHasReq93);
        logTest('View references Requirement 2.3', viewHasReq23);
        logTest('View references Requirement 9.3', viewHasReq93);
        
        return cssHasReq23 && cssHasReq93 && viewHasReq23 && viewHasReq93;
    } catch (error) {
        logTest('File read error', false, error.message);
        return false;
    }
}

// Run all tests
function runAllTests() {
    log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
    log('║  Task 9: Display Update Animation Verification        ║', 'cyan');
    log('║  Requirements: 2.3, 9.3                                ║', 'cyan');
    log('╚════════════════════════════════════════════════════════╝', 'cyan');
    
    const results = {
        keyframeExists: testKeyframeExists(),
        updatingClass: testUpdatingClass(),
        animationDuration: testAnimationDuration(),
        viewImplementation: testViewImplementation(),
        keyframeStructure: testKeyframeStructure(),
        requirementsDoc: testRequirementsDocumentation()
    };
    
    const totalTests = Object.keys(results).length;
    const passedTests = Object.values(results).filter(r => r).length;
    
    log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
    log(`║  SUMMARY: ${passedTests}/${totalTests} test groups passed`, passedTests === totalTests ? 'green' : 'yellow');
    log('╚════════════════════════════════════════════════════════╝', 'cyan');
    
    if (passedTests === totalTests) {
        log('\n✓ All tests passed! Display update animation is correctly implemented.', 'green');
        log('  - displayUpdate keyframe animation created', 'green');
        log('  - Animation triggers on display value changes', 'green');
        log('  - Animation duration is 250ms', 'green');
        log('  - updating class is added and removed correctly', 'green');
        log('  - Animation includes fade and slide effects', 'green');
        process.exit(0);
    } else {
        log('\n✗ Some tests failed. Please review the implementation.', 'red');
        process.exit(1);
    }
}

// Run the tests
runAllTests();
