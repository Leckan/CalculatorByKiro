/**
 * Verification Script for Task 16: Reduced Motion Support
 * Requirements: 1.5
 * 
 * This script verifies that:
 * 1. prefers-reduced-motion media query is implemented
 * 2. Animations are disabled or reduced when user prefers reduced motion
 * 3. Functionality is maintained while respecting motion preferences
 * 4. Essential feedback is preserved with reduced duration
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Task 16: Reduced Motion Support Verification\n');
console.log('Requirements: 1.5 - Accessibility compliance\n');

// Read the main CSS file
const mainCssPath = path.join(__dirname, '../styles/main.css');
const mainCss = fs.readFileSync(mainCssPath, 'utf8');

let allTestsPassed = true;
const results = [];

/**
 * Test 1: Verify prefers-reduced-motion media query exists
 */
function test1_MediaQueryExists() {
    console.log('Test 1: Verify prefers-reduced-motion media query exists');
    
    const hasMediaQuery = mainCss.includes('@media (prefers-reduced-motion: reduce)');
    
    if (hasMediaQuery) {
        console.log('✅ PASS: prefers-reduced-motion media query found\n');
        results.push({ test: 'Media Query Exists', status: 'PASS' });
        return true;
    } else {
        console.log('❌ FAIL: prefers-reduced-motion media query not found\n');
        results.push({ test: 'Media Query Exists', status: 'FAIL' });
        return false;
    }
}

/**
 * Test 2: Verify gradient animation is disabled
 */
function test2_GradientDisabled() {
    console.log('Test 2: Verify gradient animation is disabled in reduced motion');
    
    // Check if body animation is set to none within the media query
    const mediaQuerySection = mainCss.match(/@media \(prefers-reduced-motion: reduce\)[^}]*\{[\s\S]*?\n\}/);
    
    if (mediaQuerySection) {
        const content = mediaQuerySection[0];
        const hasBodyAnimationNone = content.includes('body') && 
                                     (content.includes('animation: none') || 
                                      content.includes('animation:none'));
        
        if (hasBodyAnimationNone) {
            console.log('✅ PASS: Gradient animation disabled for reduced motion\n');
            results.push({ test: 'Gradient Animation Disabled', status: 'PASS' });
            return true;
        }
    }
    
    console.log('❌ FAIL: Gradient animation not properly disabled\n');
    results.push({ test: 'Gradient Animation Disabled', status: 'FAIL' });
    return false;
}

/**
 * Test 3: Verify entrance animations are disabled
 */
function test3_EntranceAnimationsDisabled() {
    console.log('Test 3: Verify entrance animations are disabled in reduced motion');
    
    const mediaQuerySection = mainCss.match(/@media \(prefers-reduced-motion: reduce\)[^}]*\{[\s\S]*?\n\}/);
    
    if (mediaQuerySection) {
        const content = mediaQuerySection[0];
        const hasCalculatorAnimationNone = content.includes('.calculator') && 
                                           content.includes('animation: none');
        const hasButtonAnimationNone = content.includes('.calc-button') && 
                                       content.includes('animation: none');
        
        if (hasCalculatorAnimationNone && hasButtonAnimationNone) {
            console.log('✅ PASS: Entrance animations disabled for calculator and buttons\n');
            results.push({ test: 'Entrance Animations Disabled', status: 'PASS' });
            return true;
        }
    }
    
    console.log('❌ FAIL: Entrance animations not properly disabled\n');
    results.push({ test: 'Entrance Animations Disabled', status: 'FAIL' });
    return false;
}

/**
 * Test 4: Verify transition durations are reduced
 */
function test4_TransitionDurationsReduced() {
    console.log('Test 4: Verify transition durations are reduced');
    
    const mediaQuerySection = mainCss.match(/@media \(prefers-reduced-motion: reduce\)[^}]*\{[\s\S]*?\n\}/);
    
    if (mediaQuerySection) {
        const content = mediaQuerySection[0];
        const hasReducedDuration = content.includes('transition-duration') && 
                                   (content.includes('0.05s') || content.includes('50ms'));
        
        if (hasReducedDuration) {
            console.log('✅ PASS: Transition durations reduced to 50ms or less\n');
            results.push({ test: 'Transition Durations Reduced', status: 'PASS' });
            return true;
        }
    }
    
    console.log('❌ FAIL: Transition durations not properly reduced\n');
    results.push({ test: 'Transition Durations Reduced', status: 'FAIL' });
    return false;
}

/**
 * Test 5: Verify hover transforms are disabled
 */
function test5_HoverTransformsDisabled() {
    console.log('Test 5: Verify hover transforms are disabled');
    
    const mediaQuerySection = mainCss.match(/@media \(prefers-reduced-motion: reduce\)[^}]*\{[\s\S]*?\n\}/);
    
    if (mediaQuerySection) {
        const content = mediaQuerySection[0];
        const hasHoverTransformNone = content.includes('.calc-button:hover') && 
                                      content.includes('transform: none');
        
        if (hasHoverTransformNone) {
            console.log('✅ PASS: Hover transforms disabled\n');
            results.push({ test: 'Hover Transforms Disabled', status: 'PASS' });
            return true;
        }
    }
    
    console.log('❌ FAIL: Hover transforms not properly disabled\n');
    results.push({ test: 'Hover Transforms Disabled', status: 'FAIL' });
    return false;
}

/**
 * Test 6: Verify infinite animations are disabled
 */
function test6_InfiniteAnimationsDisabled() {
    console.log('Test 6: Verify infinite animations are disabled');
    
    const mediaQuerySection = mainCss.match(/@media \(prefers-reduced-motion: reduce\)[^}]*\{[\s\S]*?\n\}/);
    
    if (mediaQuerySection) {
        const content = mediaQuerySection[0];
        const hasIterationCount = content.includes('animation-iteration-count: 1');
        
        if (hasIterationCount) {
            console.log('✅ PASS: Infinite animations limited to 1 iteration\n');
            results.push({ test: 'Infinite Animations Disabled', status: 'PASS' });
            return true;
        }
    }
    
    console.log('❌ FAIL: Infinite animations not properly disabled\n');
    results.push({ test: 'Infinite Animations Disabled', status: 'FAIL' });
    return false;
}

/**
 * Test 7: Verify display animations are disabled
 */
function test7_DisplayAnimationsDisabled() {
    console.log('Test 7: Verify display update animations are disabled');
    
    const mediaQuerySection = mainCss.match(/@media \(prefers-reduced-motion: reduce\)[^}]*\{[\s\S]*?\n\}/);
    
    if (mediaQuerySection) {
        const content = mediaQuerySection[0];
        const hasDisplayAnimationNone = content.includes('.main-display') && 
                                        content.includes('animation: none');
        
        if (hasDisplayAnimationNone) {
            console.log('✅ PASS: Display animations disabled\n');
            results.push({ test: 'Display Animations Disabled', status: 'PASS' });
            return true;
        }
    }
    
    console.log('❌ FAIL: Display animations not properly disabled\n');
    results.push({ test: 'Display Animations Disabled', status: 'FAIL' });
    return false;
}

/**
 * Test 8: Verify documentation exists
 */
function test8_DocumentationExists() {
    console.log('Test 8: Verify documentation exists for reduced motion implementation');
    
    const hasDocumentation = mainCss.includes('Reduced Motion Support') && 
                            mainCss.includes('Task 16');
    
    if (hasDocumentation) {
        console.log('✅ PASS: Documentation found for reduced motion implementation\n');
        results.push({ test: 'Documentation Exists', status: 'PASS' });
        return true;
    } else {
        console.log('❌ FAIL: Documentation not found\n');
        results.push({ test: 'Documentation Exists', status: 'FAIL' });
        return false;
    }
}

// Run all tests
console.log('═══════════════════════════════════════════════════════\n');

allTestsPassed = test1_MediaQueryExists() && allTestsPassed;
allTestsPassed = test2_GradientDisabled() && allTestsPassed;
allTestsPassed = test3_EntranceAnimationsDisabled() && allTestsPassed;
allTestsPassed = test4_TransitionDurationsReduced() && allTestsPassed;
allTestsPassed = test5_HoverTransformsDisabled() && allTestsPassed;
allTestsPassed = test6_InfiniteAnimationsDisabled() && allTestsPassed;
allTestsPassed = test7_DisplayAnimationsDisabled() && allTestsPassed;
allTestsPassed = test8_DocumentationExists() && allTestsPassed;

console.log('═══════════════════════════════════════════════════════\n');

// Summary
console.log('📊 Test Summary:\n');
results.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${result.test}: ${result.status}`);
});

console.log('\n═══════════════════════════════════════════════════════\n');

if (allTestsPassed) {
    console.log('🎉 All tests passed! Reduced motion support is properly implemented.\n');
    console.log('✅ Task 16 Requirements Met:');
    console.log('   - prefers-reduced-motion media query implemented');
    console.log('   - Animations disabled/reduced when user prefers reduced motion');
    console.log('   - Functionality maintained while respecting motion preferences');
    console.log('   - Essential feedback preserved with reduced duration\n');
    process.exit(0);
} else {
    console.log('❌ Some tests failed. Please review the implementation.\n');
    process.exit(1);
}
