/**
 * Verification script for Task 10: Error Shake Animation
 * Requirements: 2.4
 * 
 * This script verifies:
 * 1. errorShake keyframe animation exists with horizontal shake
 * 2. Error class styling with red tint background
 * 3. Animation duration is 500ms
 * 4. Error class is properly applied and removed in view
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
    const status = passed ? '✓ PASS' : '✗ FAIL';
    const color = passed ? 'green' : 'red';
    log(`${status}: ${testName}`, color);
    if (details) {
        log(`  ${details}`, 'cyan');
    }
}

// Read file contents
function readFile(filePath) {
    try {
        return fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
    } catch (error) {
        log(`Error reading file ${filePath}: ${error.message}`, 'red');
        return null;
    }
}

// Test results
const results = {
    passed: 0,
    failed: 0,
    tests: []
};

function runTest(name, testFn) {
    try {
        const result = testFn();
        results.tests.push({ name, passed: result.passed, details: result.details });
        if (result.passed) {
            results.passed++;
        } else {
            results.failed++;
        }
        logTest(name, result.passed, result.details);
    } catch (error) {
        results.failed++;
        results.tests.push({ name, passed: false, details: error.message });
        logTest(name, false, error.message);
    }
}

log('\n========================================', 'blue');
log('Task 10: Error Shake Animation Verification', 'blue');
log('Requirements: 2.4', 'blue');
log('========================================\n', 'blue');

// Test 1: Check errorShake keyframe animation exists
runTest('errorShake keyframe animation exists', () => {
    const css = readFile('styles/animations/interactions.css');
    if (!css) return { passed: false, details: 'Could not read interactions.css' };
    
    const hasKeyframe = /@keyframes\s+errorShake/.test(css);
    return {
        passed: hasKeyframe,
        details: hasKeyframe ? 'errorShake keyframe found' : 'errorShake keyframe not found'
    };
});

// Test 2: Check errorShake has horizontal shake (translateX)
runTest('errorShake uses horizontal shake (translateX)', () => {
    const css = readFile('styles/animations/interactions.css');
    if (!css) return { passed: false, details: 'Could not read interactions.css' };
    
    // Match the entire keyframe block including nested rules
    const keyframeMatch = css.match(/@keyframes\s+errorShake\s*\{([\s\S]*?)\n\}/);
    if (!keyframeMatch) return { passed: false, details: 'errorShake keyframe not found' };
    
    const keyframeContent = keyframeMatch[1];
    const hasTranslateX = /translateX\s*\(/.test(keyframeContent);
    const hasMultipleSteps = (keyframeContent.match(/\d+%/g) || []).length >= 5;
    
    return {
        passed: hasTranslateX && hasMultipleSteps,
        details: hasTranslateX && hasMultipleSteps ? 'Uses translateX with multiple steps' : 'Missing translateX or insufficient steps'
    };
});

// Test 3: Check error class styling exists
runTest('Error class styling exists with animation', () => {
    const css = readFile('styles/animations/interactions.css');
    if (!css) return { passed: false, details: 'Could not read interactions.css' };
    
    const hasErrorClass = /\.display-area\.error\s*{/.test(css);
    return {
        passed: hasErrorClass,
        details: hasErrorClass ? '.display-area.error class found' : '.display-area.error class not found'
    };
});

// Test 4: Check error class has animation property
runTest('Error class applies errorShake animation', () => {
    const css = readFile('styles/animations/interactions.css');
    if (!css) return { passed: false, details: 'Could not read interactions.css' };
    
    const errorClassMatch = css.match(/\.display-area\.error\s*{([^}]+)}/s);
    if (!errorClassMatch) return { passed: false, details: '.display-area.error class not found' };
    
    const classContent = errorClassMatch[1];
    const hasAnimation = /animation\s*:\s*errorShake/.test(classContent);
    
    return {
        passed: hasAnimation,
        details: hasAnimation ? 'errorShake animation applied' : 'errorShake animation not applied'
    };
});

// Test 5: Check animation duration is 500ms
runTest('Animation duration is 500ms', () => {
    const css = readFile('styles/animations/interactions.css');
    if (!css) return { passed: false, details: 'Could not read interactions.css' };
    
    const errorClassMatch = css.match(/\.display-area\.error\s*{([^}]+)}/s);
    if (!errorClassMatch) return { passed: false, details: '.display-area.error class not found' };
    
    const classContent = errorClassMatch[1];
    const has500ms = /500ms/.test(classContent);
    
    return {
        passed: has500ms,
        details: has500ms ? 'Duration is 500ms' : 'Duration is not 500ms'
    };
});

// Test 6: Check red tint background color
runTest('Error class has red tint background', () => {
    const css = readFile('styles/animations/interactions.css');
    if (!css) return { passed: false, details: 'Could not read interactions.css' };
    
    const errorClassMatch = css.match(/\.display-area\.error\s*{([^}]+)}/s);
    if (!errorClassMatch) return { passed: false, details: '.display-area.error class not found' };
    
    const classContent = errorClassMatch[1];
    const hasRedBackground = /background\s*:\s*rgba\s*\(\s*239\s*,\s*68\s*,\s*68/.test(classContent);
    
    return {
        passed: hasRedBackground,
        details: hasRedBackground ? 'Red tint background found' : 'Red tint background not found'
    };
});

// Test 7: Check view has error shake trigger method
runTest('View has _triggerErrorShakeAnimation method', () => {
    const js = readFile('src/calculator-view.js');
    if (!js) return { passed: false, details: 'Could not read calculator-view.js' };
    
    const hasMethod = /_triggerErrorShakeAnimation/.test(js);
    return {
        passed: hasMethod,
        details: hasMethod ? '_triggerErrorShakeAnimation method found' : '_triggerErrorShakeAnimation method not found'
    };
});

// Test 8: Check error shake method adds error class
runTest('Error shake method adds error class to display area', () => {
    const js = readFile('src/calculator-view.js');
    if (!js) return { passed: false, details: 'Could not read calculator-view.js' };
    
    const methodMatch = js.match(/_triggerErrorShakeAnimation\s*\([^)]*\)\s*{([^}]+)}/s);
    if (!methodMatch) return { passed: false, details: '_triggerErrorShakeAnimation method not found' };
    
    const methodContent = methodMatch[1];
    const addsErrorClass = /classList\.add\s*\(\s*['"]error['"]\s*\)/.test(methodContent);
    
    return {
        passed: addsErrorClass,
        details: addsErrorClass ? 'Adds error class' : 'Does not add error class'
    };
});

// Test 9: Check error shake method removes error class after timeout
runTest('Error shake method removes error class after 500ms', () => {
    const js = readFile('src/calculator-view.js');
    if (!js) return { passed: false, details: 'Could not read calculator-view.js' };
    
    const methodMatch = js.match(/_triggerErrorShakeAnimation\s*\([^)]*\)\s*{([^}]+)}/s);
    if (!methodMatch) return { passed: false, details: '_triggerErrorShakeAnimation method not found' };
    
    const methodContent = methodMatch[1];
    const hasTimeout = /setTimeout/.test(methodContent);
    const removesErrorClass = /classList\.remove\s*\(\s*['"]error['"]\s*\)/.test(methodContent);
    const has500msTimeout = /500/.test(methodContent);
    
    return {
        passed: hasTimeout && removesErrorClass && has500msTimeout,
        details: (hasTimeout && removesErrorClass && has500msTimeout) 
            ? 'Removes error class after 500ms timeout' 
            : 'Missing timeout, remove call, or incorrect duration'
    };
});

// Test 10: Check showError method calls error shake animation
runTest('showError method triggers error shake animation', () => {
    const js = readFile('src/calculator-view.js');
    if (!js) return { passed: false, details: 'Could not read calculator-view.js' };
    
    const showErrorMatch = js.match(/showError\s*\([^)]*\)\s*{([^}]+)}/s);
    if (!showErrorMatch) return { passed: false, details: 'showError method not found' };
    
    const methodContent = showErrorMatch[1];
    const callsErrorShake = /_triggerErrorShakeAnimation/.test(methodContent);
    
    return {
        passed: callsErrorShake,
        details: callsErrorShake ? 'Calls _triggerErrorShakeAnimation' : 'Does not call _triggerErrorShakeAnimation'
    };
});

// Print summary
log('\n========================================', 'blue');
log('Test Summary', 'blue');
log('========================================', 'blue');
log(`Total Tests: ${results.passed + results.failed}`, 'cyan');
log(`Passed: ${results.passed}`, 'green');
log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
log(`Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`, 
    results.failed === 0 ? 'green' : 'yellow');
log('========================================\n', 'blue');

// Exit with appropriate code
process.exit(results.failed > 0 ? 1 : 0);
