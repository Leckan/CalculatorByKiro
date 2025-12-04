/**
 * Verification Script for Task 12: Calculator Entrance Animation
 * Requirements: 10.1, 10.3, 10.4, 10.5
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('Task 12: Calculator Entrance Animation Verification');
console.log('='.repeat(60));
console.log();

const results = [];

/**
 * Test 1: Verify fadeInScale keyframe exists in entrance.css
 */
function testKeyframeExists() {
    const entranceCssPath = path.join(__dirname, '../styles/animations/entrance.css');
    const content = fs.readFileSync(entranceCssPath, 'utf8');
    
    const hasKeyframes = content.includes('@keyframes fadeInScale');
    const hasFromState = content.includes('0%') && content.includes('opacity: 0');
    const hasToState = content.includes('100%') && content.includes('opacity: 1');
    const hasScale = content.includes('scale(0.9)') && content.includes('scale(1)');
    const hasTranslate = content.includes('translateY(20px)') && content.includes('translateY(0)');
    
    const pass = hasKeyframes && hasFromState && hasToState && hasScale && hasTranslate;
    
    return {
        name: 'fadeInScale Keyframe Definition',
        pass,
        details: {
            hasKeyframes,
            hasFromState,
            hasToState,
            hasScale,
            hasTranslate
        },
        message: pass 
            ? 'fadeInScale keyframe properly defined with fade, scale, and translate'
            : 'fadeInScale keyframe missing or incomplete'
    };
}

/**
 * Test 2: Verify animation is applied to calculator with correct properties
 */
function testAnimationApplication() {
    const calculatorCssPath = path.join(__dirname, '../styles/components/calculator.css');
    const content = fs.readFileSync(calculatorCssPath, 'utf8');
    
    const hasAnimation = content.includes('animation:') && content.includes('fadeInScale');
    const hasDuration = content.includes('var(--duration-entrance)') || content.includes('600ms');
    const hasEasing = content.includes('var(--easing-decelerate)');
    
    const pass = hasAnimation && hasDuration && hasEasing;
    
    return {
        name: 'Animation Applied to Calculator',
        pass,
        details: {
            hasAnimation,
            hasDuration,
            hasEasing
        },
        message: pass
            ? 'Animation applied with correct duration (600ms) and easing (decelerate)'
            : 'Animation not properly applied to calculator'
    };
}

/**
 * Test 3: Verify duration variable is set to 600ms
 */
function testDurationVariable() {
    const variablesCssPath = path.join(__dirname, '../styles/base/variables.css');
    const content = fs.readFileSync(variablesCssPath, 'utf8');
    
    const hasDurationEntrance = content.includes('--duration-entrance');
    const is600ms = content.includes('--duration-entrance: 600ms');
    
    const pass = hasDurationEntrance && is600ms;
    
    return {
        name: 'Duration Variable (600ms)',
        pass,
        details: {
            hasDurationEntrance,
            is600ms
        },
        message: pass
            ? '--duration-entrance is set to 600ms'
            : '--duration-entrance not set to 600ms'
    };
}

/**
 * Test 4: Verify decelerate easing is defined
 */
function testDecelerateEasing() {
    const variablesCssPath = path.join(__dirname, '../styles/base/variables.css');
    const content = fs.readFileSync(variablesCssPath, 'utf8');
    
    const hasEasingDecelerate = content.includes('--easing-decelerate');
    const correctEasing = content.includes('--easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1)');
    
    const pass = hasEasingDecelerate && correctEasing;
    
    return {
        name: 'Decelerate Easing Function',
        pass,
        details: {
            hasEasingDecelerate,
            correctEasing
        },
        message: pass
            ? 'Decelerate easing properly defined as cubic-bezier(0.0, 0.0, 0.2, 1)'
            : 'Decelerate easing not properly defined'
    };
}

/**
 * Test 5: Verify no pointer-events blocking (interactivity maintained)
 */
function testInteractivity() {
    const calculatorCssPath = path.join(__dirname, '../styles/components/calculator.css');
    const content = fs.readFileSync(calculatorCssPath, 'utf8');
    
    // Check that pointer-events: none is NOT set on .calculator
    const calculatorSection = content.match(/\.calculator\s*{[^}]*}/s);
    const hasPointerEventsNone = calculatorSection && calculatorSection[0].includes('pointer-events: none');
    
    const pass = !hasPointerEventsNone;
    
    return {
        name: 'Calculator Interactive During Animation',
        pass,
        details: {
            noPointerEventsBlock: !hasPointerEventsNone
        },
        message: pass
            ? 'Calculator remains interactive (no pointer-events: none)'
            : 'Calculator may be blocked during animation (pointer-events: none found)'
    };
}

/**
 * Test 6: Verify entrance.css is imported in main.css
 */
function testImportExists() {
    const mainCssPath = path.join(__dirname, '../styles/main.css');
    const content = fs.readFileSync(mainCssPath, 'utf8');
    
    const hasImport = content.includes("@import './animations/entrance.css'") || 
                      content.includes('@import "./animations/entrance.css"');
    
    const pass = hasImport;
    
    return {
        name: 'Entrance CSS Imported',
        pass,
        details: {
            hasImport
        },
        message: pass
            ? 'entrance.css is imported in main.css'
            : 'entrance.css is not imported in main.css'
    };
}

/**
 * Test 7: Verify requirements are documented
 */
function testRequirementsDocumented() {
    const calculatorCssPath = path.join(__dirname, '../styles/components/calculator.css');
    const entranceCssPath = path.join(__dirname, '../styles/animations/entrance.css');
    
    const calculatorContent = fs.readFileSync(calculatorCssPath, 'utf8');
    const entranceContent = fs.readFileSync(entranceCssPath, 'utf8');
    
    const hasReq101 = entranceContent.includes('10.1') || calculatorContent.includes('10.1');
    const hasReq103 = entranceContent.includes('10.3') || calculatorContent.includes('10.3');
    const hasReq104 = entranceContent.includes('10.4') || calculatorContent.includes('10.4');
    const hasReq105 = entranceContent.includes('10.5') || calculatorContent.includes('10.5');
    
    const pass = hasReq101 && hasReq103 && hasReq104 && hasReq105;
    
    return {
        name: 'Requirements Documented',
        pass,
        details: {
            hasReq101,
            hasReq103,
            hasReq104,
            hasReq105
        },
        message: pass
            ? 'All requirements (10.1, 10.3, 10.4, 10.5) are documented'
            : 'Some requirements are not documented in comments'
    };
}

// Run all tests
console.log('Running verification tests...\n');

results.push(testKeyframeExists());
results.push(testAnimationApplication());
results.push(testDurationVariable());
results.push(testDecelerateEasing());
results.push(testInteractivity());
results.push(testImportExists());
results.push(testRequirementsDocumented());

// Display results
results.forEach((result, index) => {
    const icon = result.pass ? '✓' : '✗';
    const status = result.pass ? 'PASS' : 'FAIL';
    
    console.log(`${index + 1}. ${result.name}`);
    console.log(`   ${icon} ${status}: ${result.message}`);
    
    if (!result.pass && result.details) {
        console.log('   Details:', JSON.stringify(result.details, null, 2));
    }
    console.log();
});

// Summary
const passCount = results.filter(r => r.pass).length;
const totalCount = results.length;
const successRate = Math.round((passCount / totalCount) * 100);

console.log('='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
console.log(`Tests Passed: ${passCount} / ${totalCount}`);
console.log(`Success Rate: ${successRate}%`);
console.log();

if (passCount === totalCount) {
    console.log('✓ All tests passed! Task 12 implementation is complete.');
    process.exit(0);
} else {
    console.log('✗ Some tests failed. Please review the implementation.');
    process.exit(1);
}
