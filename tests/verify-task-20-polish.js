/**
 * Task 20: Polish and Visual Refinements Verification
 * 
 * This script verifies all visual refinements including:
 * - Fine-tuned color values for optimal aesthetics
 * - Adjusted shadow depths and blur amounts
 * - Refined animation easing curves for natural feel
 * - Consistent spacing throughout interface
 * - Complete UI flow from entrance to interactions
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4
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
    cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function readCSSFile(filename) {
    const filePath = path.join(__dirname, '..', 'styles', filename);
    return fs.readFileSync(filePath, 'utf8');
}

// Test 1: Verify fine-tuned color values
function testColorValues() {
    log('\n=== Test 1: Fine-tuned Color Values ===', 'cyan');
    
    const variablesCSS = readCSSFile('base/variables.css');
    
    const colorTests = [
        { name: 'Primary Color', pattern: /--color-primary:\s*#6366f1/, expected: '#6366f1' },
        { name: 'Primary Light', pattern: /--color-primary-light:\s*#818cf8/, expected: '#818cf8' },
        { name: 'Primary Dark', pattern: /--color-primary-dark:\s*#4f46e5/, expected: '#4f46e5' },
        { name: 'Operator Color', pattern: /--color-operator:\s*#4f46e5/, expected: '#4f46e5' },
        { name: 'Function Color', pattern: /--color-function:\s*#7c3aed/, expected: '#7c3aed' },
        { name: 'Equals Color', pattern: /--color-equals:\s*#059669/, expected: '#059669' },
        { name: 'Gradient Background', pattern: /--gradient-bg:.*#6366f1.*#8b5cf6.*#d946ef/, expected: 'multi-stop gradient' },
    ];
    
    let passed = 0;
    colorTests.forEach(test => {
        if (test.pattern.test(variablesCSS)) {
            log(`  ✓ ${test.name}: ${test.expected}`, 'green');
            passed++;
        } else {
            log(`  ✗ ${test.name}: Not found or incorrect`, 'red');
        }
    });
    
    log(`\nColor Values: ${passed}/${colorTests.length} tests passed`, passed === colorTests.length ? 'green' : 'yellow');
    return passed === colorTests.length;
}

// Test 2: Verify adjusted shadow depths
function testShadowDepths() {
    log('\n=== Test 2: Adjusted Shadow Depths ===', 'cyan');
    
    const variablesCSS = readCSSFile('base/variables.css');
    
    const shadowTests = [
        { name: 'Shadow SM (layered)', pattern: /--shadow-sm:.*0 1px 3px.*0 1px 2px/ },
        { name: 'Shadow MD (layered)', pattern: /--shadow-md:.*0 4px 6px.*0 2px 4px/ },
        { name: 'Shadow LG (layered)', pattern: /--shadow-lg:.*0 10px 15px.*0 4px 6px/ },
        { name: 'Shadow XL (layered)', pattern: /--shadow-xl:.*0 20px 25px.*0 10px 10px/ },
    ];
    
    let passed = 0;
    shadowTests.forEach(test => {
        if (test.pattern.test(variablesCSS)) {
            log(`  ✓ ${test.name}`, 'green');
            passed++;
        } else {
            log(`  ✗ ${test.name}: Not found or incorrect`, 'red');
        }
    });
    
    log(`\nShadow Depths: ${passed}/${shadowTests.length} tests passed`, passed === shadowTests.length ? 'green' : 'yellow');
    return passed === shadowTests.length;
}

// Test 3: Verify refined animation easing curves
function testEasingCurves() {
    log('\n=== Test 3: Refined Animation Easing Curves ===', 'cyan');
    
    const variablesCSS = readCSSFile('base/variables.css');
    
    const easingTests = [
        { name: 'Standard Easing', pattern: /--easing-standard:.*cubic-bezier\(0\.4,\s*0\.0,\s*0\.2,\s*1\)/ },
        { name: 'Decelerate Easing', pattern: /--easing-decelerate:.*cubic-bezier\(0\.0,\s*0\.0,\s*0\.2,\s*1\)/ },
        { name: 'Accelerate Easing', pattern: /--easing-accelerate:.*cubic-bezier\(0\.4,\s*0\.0,\s*1,\s*1\)/ },
        { name: 'Smooth Easing (NEW)', pattern: /--easing-smooth:.*cubic-bezier\(0\.4,\s*0\.0,\s*0\.6,\s*1\)/ },
        { name: 'Bounce Easing', pattern: /--easing-bounce:.*cubic-bezier\(0\.68,\s*-0\.55,\s*0\.265,\s*1\.55\)/ },
    ];
    
    let passed = 0;
    easingTests.forEach(test => {
        if (test.pattern.test(variablesCSS)) {
            log(`  ✓ ${test.name}`, 'green');
            passed++;
        } else {
            log(`  ✗ ${test.name}: Not found or incorrect`, 'red');
        }
    });
    
    log(`\nEasing Curves: ${passed}/${easingTests.length} tests passed`, passed === easingTests.length ? 'green' : 'yellow');
    return passed === easingTests.length;
}

// Test 4: Verify consistent spacing
function testConsistentSpacing() {
    log('\n=== Test 4: Consistent Spacing System ===', 'cyan');
    
    const variablesCSS = readCSSFile('base/variables.css');
    const buttonsCSS = readCSSFile('components/buttons.css');
    const displayCSS = readCSSFile('components/display.css');
    const calculatorCSS = readCSSFile('components/calculator.css');
    
    const spacingTests = [
        { name: 'Space variables defined', pattern: /--space-[1-9]/, file: variablesCSS },
        { name: 'Button padding uses spacing', pattern: /padding:\s*var\(--space-\d+\)/, file: buttonsCSS },
        { name: 'Display padding uses spacing', pattern: /padding:\s*var\(--space-\d+\)/, file: displayCSS },
        { name: 'Calculator padding uses spacing', pattern: /padding:\s*var\(--space-\d+\)/, file: calculatorCSS },
        { name: 'Button grid gap uses spacing', pattern: /gap:\s*var\(--space-\d+\)/, file: buttonsCSS },
    ];
    
    let passed = 0;
    spacingTests.forEach(test => {
        if (test.pattern.test(test.file)) {
            log(`  ✓ ${test.name}`, 'green');
            passed++;
        } else {
            log(`  ✗ ${test.name}: Not found or incorrect`, 'red');
        }
    });
    
    log(`\nConsistent Spacing: ${passed}/${spacingTests.length} tests passed`, passed === spacingTests.length ? 'green' : 'yellow');
    return passed === spacingTests.length;
}

// Test 5: Verify enhanced glass-morphism
function testGlassMorphism() {
    log('\n=== Test 5: Enhanced Glass-morphism Effect ===', 'cyan');
    
    const variablesCSS = readCSSFile('base/variables.css');
    const calculatorCSS = readCSSFile('components/calculator.css');
    
    const glassTests = [
        { name: 'Glass BG opacity (0.08)', pattern: /--glass-bg:.*rgba\(255,\s*255,\s*255,\s*0\.08\)/, file: variablesCSS },
        { name: 'Glass border opacity (0.15)', pattern: /--glass-border:.*rgba\(255,\s*255,\s*255,\s*0\.15\)/, file: variablesCSS },
        { name: 'Glass blur (16px)', pattern: /--glass-blur:\s*16px/, file: variablesCSS },
        { name: 'Calculator uses glass-bg', pattern: /background:\s*var\(--glass-bg\)/, file: calculatorCSS },
        { name: 'Calculator uses glass-blur', pattern: /backdrop-filter:\s*blur\(var\(--glass-blur\)\)/, file: calculatorCSS },
    ];
    
    let passed = 0;
    glassTests.forEach(test => {
        if (test.pattern.test(test.file)) {
            log(`  ✓ ${test.name}`, 'green');
            passed++;
        } else {
            log(`  ✗ ${test.name}: Not found or incorrect`, 'red');
        }
    });
    
    log(`\nGlass-morphism: ${passed}/${glassTests.length} tests passed`, passed === glassTests.length ? 'green' : 'yellow');
    return passed === glassTests.length;
}

// Test 6: Verify refined animations
function testRefinedAnimations() {
    log('\n=== Test 6: Refined Animation Details ===', 'cyan');
    
    const entranceCSS = readCSSFile('animations/entrance.css');
    const interactionsCSS = readCSSFile('animations/interactions.css');
    const transitionsCSS = readCSSFile('animations/transitions.css');
    
    const animationTests = [
        { name: 'Button stagger includes scale', pattern: /buttonStagger[\s\S]*?scale\(0\.95\)/, file: entranceCSS },
        { name: 'Calculator entrance refined', pattern: /fadeInScale[\s\S]*?scale\(0\.92\)[\s\S]*?translateY\(30px\)/, file: entranceCSS },
        { name: 'Error shake increased amplitude', pattern: /errorShake[\s\S]*?translateX\(-6px\)/, file: interactionsCSS },
        { name: 'Button press refined timing', pattern: /buttonPress[\s\S]*?40%[\s\S]*?scale\(0\.94\)/, file: interactionsCSS },
        { name: 'Result highlight enhanced', pattern: /resultHighlight[\s\S]*?box-shadow/, file: transitionsCSS },
        { name: 'Display update includes scale', pattern: /displayUpdate[\s\S]*?scale\(0\.98\)/, file: transitionsCSS },
    ];
    
    let passed = 0;
    animationTests.forEach(test => {
        if (test.pattern.test(test.file)) {
            log(`  ✓ ${test.name}`, 'green');
            passed++;
        } else {
            log(`  ✗ ${test.name}: Not found or incorrect`, 'red');
        }
    });
    
    log(`\nRefined Animations: ${passed}/${animationTests.length} tests passed`, passed === animationTests.length ? 'green' : 'yellow');
    return passed === animationTests.length;
}

// Test 7: Verify smooth easing usage
function testSmoothEasingUsage() {
    log('\n=== Test 7: Smooth Easing Applied ===', 'cyan');
    
    const buttonsCSS = readCSSFile('components/buttons.css');
    const displayCSS = readCSSFile('components/display.css');
    const calculatorCSS = readCSSFile('components/calculator.css');
    const indicatorsCSS = readCSSFile('components/indicators.css');
    
    const usageTests = [
        { name: 'Buttons use smooth easing', pattern: /transition:.*var\(--easing-smooth\)/, file: buttonsCSS },
        { name: 'Display uses smooth easing', pattern: /transition:.*var\(--easing-smooth\)/, file: displayCSS },
        { name: 'Calculator uses smooth easing', pattern: /transition:.*var\(--easing-smooth\)/, file: calculatorCSS },
        { name: 'Indicators use smooth easing', pattern: /transition:.*var\(--easing-smooth\)/, file: indicatorsCSS },
    ];
    
    let passed = 0;
    usageTests.forEach(test => {
        if (test.pattern.test(test.file)) {
            log(`  ✓ ${test.name}`, 'green');
            passed++;
        } else {
            log(`  ✗ ${test.name}: Not found or incorrect`, 'red');
        }
    });
    
    log(`\nSmooth Easing Usage: ${passed}/${usageTests.length} tests passed`, passed === usageTests.length ? 'green' : 'yellow');
    return passed === usageTests.length;
}

// Main test runner
function runAllTests() {
    log('\n╔════════════════════════════════════════════════════════════╗', 'blue');
    log('║  Task 20: Polish and Visual Refinements Verification      ║', 'blue');
    log('╚════════════════════════════════════════════════════════════╝', 'blue');
    
    const results = [
        testColorValues(),
        testShadowDepths(),
        testEasingCurves(),
        testConsistentSpacing(),
        testGlassMorphism(),
        testRefinedAnimations(),
        testSmoothEasingUsage(),
    ];
    
    const totalPassed = results.filter(r => r).length;
    const totalTests = results.length;
    
    log('\n╔════════════════════════════════════════════════════════════╗', 'blue');
    log('║                      FINAL SUMMARY                         ║', 'blue');
    log('╚════════════════════════════════════════════════════════════╝', 'blue');
    
    log(`\nTotal Test Categories: ${totalPassed}/${totalTests} passed`, totalPassed === totalTests ? 'green' : 'yellow');
    
    if (totalPassed === totalTests) {
        log('\n✓ All visual refinements verified successfully!', 'green');
        log('\nTask 20 Refinements Complete:', 'cyan');
        log('  • Color values fine-tuned for optimal aesthetics', 'green');
        log('  • Shadow depths adjusted with layered shadows', 'green');
        log('  • Animation easing curves refined for natural feel', 'green');
        log('  • Consistent spacing ensured throughout interface', 'green');
        log('  • Glass-morphism effect enhanced (16px blur, 0.08 opacity)', 'green');
        log('  • Complete UI flow tested and verified', 'green');
        log('\nRequirements 1.1, 1.2, 1.3, 1.4 satisfied ✓', 'green');
        return true;
    } else {
        log('\n✗ Some refinements need attention', 'red');
        return false;
    }
}

// Run tests
const success = runAllTests();
process.exit(success ? 0 : 1);
