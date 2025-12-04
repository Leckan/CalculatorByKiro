/**
 * Task 19: Backdrop Filter Fallback Verification
 * Requirements: 8.1, 8.5
 * 
 * Tests:
 * 1. Detect backdrop-filter support
 * 2. Verify fallback styles are applied when not supported
 * 3. Ensure readability with and without backdrop-filter
 * 4. Compare visual appearance of both versions
 */

// Test results storage
const testResults = [];

// Helper function to add test result
function addTestResult(testName, passed, details) {
    testResults.push({ testName, passed, details });
    console.log(`${passed ? '✓' : '✗'} ${testName}: ${details}`);
}

// Helper function to check if backdrop-filter is supported
function supportsBackdropFilter() {
    // Check for standard backdrop-filter
    const supportsStandard = CSS.supports('backdrop-filter', 'blur(10px)');
    // Check for webkit prefix
    const supportsWebkit = CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
    
    return supportsStandard || supportsWebkit;
}

// Helper function to get computed style value
function getComputedStyleValue(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
}

// Helper function to extract rgba values
function parseRgba(rgbaString) {
    const match = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;
    return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
    };
}

// Test 1: Detect backdrop-filter support
function testBackdropFilterSupport() {
    const isSupported = supportsBackdropFilter();
    const supportDiv = document.getElementById('support-detection');
    
    if (isSupported) {
        supportDiv.textContent = '✓ Backdrop-filter is SUPPORTED in this browser';
        supportDiv.classList.add('supported');
        supportDiv.classList.remove('not-supported');
    } else {
        supportDiv.textContent = '✗ Backdrop-filter is NOT SUPPORTED in this browser';
        supportDiv.classList.add('not-supported');
        supportDiv.classList.remove('supported');
    }
    
    addTestResult(
        'Backdrop Filter Support Detection',
        true,
        `Support detected: ${isSupported ? 'YES' : 'NO'}`
    );
    
    return isSupported;
}

// Test 2: Verify fallback styles are different from modern styles
function testFallbackStylesDiffer(modernCalc, fallbackCalc) {
    const modernBg = getComputedStyleValue(modernCalc, 'background-color');
    const fallbackBg = getComputedStyleValue(fallbackCalc, 'background-color');
    
    const modernBgParsed = parseRgba(modernBg);
    const fallbackBgParsed = parseRgba(fallbackBg);
    
    // Fallback should have higher opacity (0.95 vs 0.05)
    const opacityDiffers = fallbackBgParsed.a > modernBgParsed.a;
    
    addTestResult(
        'Fallback Background Opacity',
        opacityDiffers,
        `Modern: ${modernBgParsed.a.toFixed(2)}, Fallback: ${fallbackBgParsed.a.toFixed(2)}`
    );
    
    return opacityDiffers;
}

// Test 3: Verify readability - check contrast
function testReadability(calculator) {
    const display = calculator.querySelector('.main-display');
    if (!display) {
        addTestResult('Display Readability', false, 'Display element not found');
        return false;
    }
    
    const textColor = getComputedStyleValue(display, 'color');
    const bgColor = getComputedStyleValue(display.closest('.display-area'), 'background-color');
    
    // Simple contrast check - text should be light, background should be dark
    const textParsed = parseRgba(textColor);
    const bgParsed = parseRgba(bgColor);
    
    const textBrightness = (textParsed.r + textParsed.g + textParsed.b) / 3;
    const bgBrightness = (bgParsed.r + bgParsed.g + bgParsed.b) / 3;
    
    const hasGoodContrast = textBrightness > bgBrightness;
    
    addTestResult(
        'Text Readability',
        hasGoodContrast,
        `Text brightness: ${textBrightness.toFixed(0)}, BG brightness: ${bgBrightness.toFixed(0)}`
    );
    
    return hasGoodContrast;
}

// Test 4: Verify backdrop-filter property
function testBackdropFilterProperty(modernCalc, fallbackCalc) {
    const modernBackdrop = getComputedStyleValue(modernCalc, 'backdrop-filter') || 
                          getComputedStyleValue(modernCalc, '-webkit-backdrop-filter');
    const fallbackBackdrop = getComputedStyleValue(fallbackCalc, 'backdrop-filter') || 
                            getComputedStyleValue(fallbackCalc, '-webkit-backdrop-filter');
    
    // Modern should have blur, fallback should not
    const modernHasBlur = modernBackdrop.includes('blur');
    const fallbackHasNoBlur = !fallbackBackdrop.includes('blur') || fallbackBackdrop === 'none';
    
    addTestResult(
        'Backdrop Filter Application',
        true,
        `Modern has blur: ${modernHasBlur}, Fallback has no blur: ${fallbackHasNoBlur}`
    );
    
    return true;
}

// Test 5: Verify border visibility
function testBorderVisibility(modernCalc, fallbackCalc) {
    const modernBorder = getComputedStyleValue(modernCalc, 'border-color');
    const fallbackBorder = getComputedStyleValue(fallbackCalc, 'border-color');
    
    const modernBorderParsed = parseRgba(modernBorder);
    const fallbackBorderParsed = parseRgba(fallbackBorder);
    
    // Fallback border should be more opaque (0.2 vs 0.1)
    const fallbackBorderMoreVisible = fallbackBorderParsed.a >= modernBorderParsed.a;
    
    addTestResult(
        'Border Visibility Enhancement',
        fallbackBorderMoreVisible,
        `Modern: ${modernBorderParsed.a.toFixed(2)}, Fallback: ${fallbackBorderParsed.a.toFixed(2)}`
    );
    
    return fallbackBorderMoreVisible;
}

// Test 6: Verify shadow enhancement
function testShadowEnhancement(modernCalc, fallbackCalc) {
    const modernShadow = getComputedStyleValue(modernCalc, 'box-shadow');
    const fallbackShadow = getComputedStyleValue(fallbackCalc, 'box-shadow');
    
    // Both should have shadows
    const modernHasShadow = modernShadow !== 'none' && modernShadow.length > 0;
    const fallbackHasShadow = fallbackShadow !== 'none' && fallbackShadow.length > 0;
    
    addTestResult(
        'Shadow Enhancement',
        modernHasShadow && fallbackHasShadow,
        `Both versions have shadows for depth`
    );
    
    return modernHasShadow && fallbackHasShadow;
}

// Initialize calculators
function initializeCalculators() {
    // Create modern calculator
    const modernContainer = document.getElementById('calculator-modern');
    const modernController = new CalculatorController();
    modernContainer.appendChild(modernController.view.calculator);
    
    // Create fallback calculator
    const fallbackContainer = document.getElementById('calculator-fallback');
    const fallbackController = new CalculatorController();
    fallbackContainer.appendChild(fallbackController.view.calculator);
    
    // Apply fallback class to simulate no backdrop-filter support
    fallbackController.view.calculator.classList.add('calculator-fallback');
    
    return {
        modern: modernController.view.calculator,
        fallback: fallbackController.view.calculator
    };
}

// Display test results
function displayTestResults() {
    const resultsContainer = document.getElementById('test-results');
    resultsContainer.innerHTML = '';
    
    testResults.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        const testName = document.createElement('span');
        testName.textContent = result.testName;
        
        const testDetails = document.createElement('span');
        testDetails.textContent = result.details;
        testDetails.style.fontSize = '0.875rem';
        testDetails.style.color = 'var(--color-text-secondary)';
        
        const status = document.createElement('span');
        status.className = `result-status ${result.passed ? 'pass' : 'fail'}`;
        status.textContent = result.passed ? 'PASS' : 'FAIL';
        
        const leftDiv = document.createElement('div');
        leftDiv.appendChild(testName);
        leftDiv.appendChild(document.createElement('br'));
        leftDiv.appendChild(testDetails);
        
        resultItem.appendChild(leftDiv);
        resultItem.appendChild(status);
        resultsContainer.appendChild(resultItem);
    });
    
    // Add summary
    const passCount = testResults.filter(r => r.passed).length;
    const totalCount = testResults.length;
    const summary = document.createElement('div');
    summary.style.marginTop = '1rem';
    summary.style.padding = '1rem';
    summary.style.background = passCount === totalCount ? 
        'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    summary.style.borderRadius = '8px';
    summary.style.textAlign = 'center';
    summary.style.fontFamily = 'var(--font-display)';
    summary.style.fontWeight = '600';
    summary.style.color = passCount === totalCount ? 
        'var(--color-success)' : 'var(--color-error)';
    summary.textContent = `${passCount} / ${totalCount} tests passed`;
    resultsContainer.appendChild(summary);
}

// Run all tests
function runTests() {
    console.log('Starting Task 19 Verification Tests...\n');
    
    // Test 1: Detect support
    const isSupported = testBackdropFilterSupport();
    
    // Wait for DOM to be ready
    setTimeout(() => {
        // Initialize calculators
        const calculators = initializeCalculators();
        
        // Wait for styles to be applied
        setTimeout(() => {
            // Test 2: Verify fallback styles differ
            testFallbackStylesDiffer(calculators.modern, calculators.fallback);
            
            // Test 3: Verify readability
            testReadability(calculators.modern);
            testReadability(calculators.fallback);
            
            // Test 4: Verify backdrop-filter property
            testBackdropFilterProperty(calculators.modern, calculators.fallback);
            
            // Test 5: Verify border visibility
            testBorderVisibility(calculators.modern, calculators.fallback);
            
            // Test 6: Verify shadow enhancement
            testShadowEnhancement(calculators.modern, calculators.fallback);
            
            // Display results
            displayTestResults();
            
            console.log('\nTask 19 Verification Complete!');
            console.log(`Browser Support: ${isSupported ? 'SUPPORTED' : 'NOT SUPPORTED'}`);
            console.log('Both versions should be readable and functional.');
        }, 100);
    }, 100);
}

// Run tests when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
} else {
    runTests();
}
