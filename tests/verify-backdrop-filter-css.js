/**
 * Task 19: CSS Verification for Backdrop Filter Fallbacks
 * Requirements: 8.1, 8.5
 * 
 * This script verifies that the CSS contains proper @supports queries
 * and fallback styles for backdrop-filter.
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

function logTest(testName, passed, details) {
    const symbol = passed ? '✓' : '✗';
    const color = passed ? 'green' : 'red';
    log(`${symbol} ${testName}`, color);
    if (details) {
        log(`  ${details}`, 'cyan');
    }
}

// Read the calculator CSS file
function readCalculatorCSS() {
    const cssPath = path.join(__dirname, '..', 'styles', 'components', 'calculator.css');
    try {
        return fs.readFileSync(cssPath, 'utf8');
    } catch (error) {
        log(`Error reading CSS file: ${error.message}`, 'red');
        return null;
    }
}

// Test 1: Verify @supports query exists
function testSupportsQueryExists(css) {
    const hasSupportsQuery = css.includes('@supports not (backdrop-filter: blur(10px))');
    logTest(
        'CSS contains @supports query for backdrop-filter',
        hasSupportsQuery,
        hasSupportsQuery ? 'Found @supports not (backdrop-filter: blur(10px))' : 'Missing @supports query'
    );
    return hasSupportsQuery;
}

// Test 2: Verify fallback background is more opaque
function testFallbackBackground(css) {
    const fallbackBgMatch = css.match(/@supports not \(backdrop-filter: blur\(10px\)\)[^}]*background:\s*rgba\(15,\s*23,\s*42,\s*([\d.]+)\)/s);
    
    if (!fallbackBgMatch) {
        logTest('Fallback background opacity', false, 'Could not find fallback background');
        return false;
    }
    
    const opacity = parseFloat(fallbackBgMatch[1]);
    const isMoreOpaque = opacity >= 0.9;
    
    logTest(
        'Fallback background is more opaque',
        isMoreOpaque,
        `Opacity: ${opacity} (should be >= 0.9)`
    );
    return isMoreOpaque;
}

// Test 3: Verify enhanced border in fallback
function testFallbackBorder(css) {
    const fallbackBorderMatch = css.match(/@supports not \(backdrop-filter: blur\(10px\)\)[^}]*border:\s*1px solid rgba\(255,\s*255,\s*255,\s*([\d.]+)\)/s);
    
    if (!fallbackBorderMatch) {
        logTest('Fallback border enhancement', false, 'Could not find fallback border');
        return false;
    }
    
    const opacity = parseFloat(fallbackBorderMatch[1]);
    const isEnhanced = opacity >= 0.15;
    
    logTest(
        'Fallback border is enhanced',
        isEnhanced,
        `Border opacity: ${opacity} (should be >= 0.15)`
    );
    return isEnhanced;
}

// Test 4: Verify enhanced shadow in fallback
function testFallbackShadow(css) {
    const hasFallbackShadow = css.match(/@supports not \(backdrop-filter: blur\(10px\)\)[^}]*box-shadow:[^;]+/s);
    
    logTest(
        'Fallback shadow is defined',
        !!hasFallbackShadow,
        hasFallbackShadow ? 'Shadow enhancement found' : 'Missing shadow enhancement'
    );
    return !!hasFallbackShadow;
}

// Test 5: Verify display area fallback
function testDisplayAreaFallback(css) {
    // Check if .display-area is mentioned within any @supports block
    const supportsBlocks = css.match(/@supports[^{]*\{[^@]*\}/gs);
    let hasDisplayFallback = false;
    
    if (supportsBlocks) {
        hasDisplayFallback = supportsBlocks.some(block => 
            block.includes('.display-area') && block.includes('background')
        );
    }
    
    logTest(
        'Display area has fallback styling',
        hasDisplayFallback,
        hasDisplayFallback ? 'Display area fallback found' : 'Missing display area fallback'
    );
    return hasDisplayFallback;
}

// Test 6: Verify modern glass effect is defined
function testModernGlassEffect(css) {
    const hasBackdropFilter = css.includes('backdrop-filter: blur(var(--glass-blur))');
    const hasWebkitBackdropFilter = css.includes('-webkit-backdrop-filter: blur(var(--glass-blur))');
    const hasGlassBackground = css.includes('background: var(--glass-bg)');
    
    const allPresent = hasBackdropFilter && hasWebkitBackdropFilter && hasGlassBackground;
    
    logTest(
        'Modern glass-morphism effect is defined',
        allPresent,
        allPresent ? 'All glass effect properties found' : 'Missing some glass effect properties'
    );
    return allPresent;
}

// Test 7: Verify documentation comments
function testDocumentation(css) {
    const hasTaskComment = css.includes('Task 19');
    const hasRequirementsComment = css.includes('8.1') && css.includes('8.5');
    const hasStrategyComment = css.includes('Strategy:') || css.includes('Provides solid background fallback');
    
    const wellDocumented = hasTaskComment && hasRequirementsComment && hasStrategyComment;
    
    logTest(
        'Implementation is well documented',
        wellDocumented,
        wellDocumented ? 'Task, requirements, and strategy documented' : 'Missing documentation'
    );
    return wellDocumented;
}

// Main test runner
function runTests() {
    log('\n========================================', 'blue');
    log('Task 19: Backdrop Filter Fallback Tests', 'blue');
    log('========================================\n', 'blue');
    
    const css = readCalculatorCSS();
    if (!css) {
        log('Failed to read CSS file. Exiting.', 'red');
        process.exit(1);
    }
    
    const results = [];
    
    // Run all tests
    results.push(testSupportsQueryExists(css));
    results.push(testFallbackBackground(css));
    results.push(testFallbackBorder(css));
    results.push(testFallbackShadow(css));
    results.push(testDisplayAreaFallback(css));
    results.push(testModernGlassEffect(css));
    results.push(testDocumentation(css));
    
    // Summary
    const passCount = results.filter(r => r).length;
    const totalCount = results.length;
    const allPassed = passCount === totalCount;
    
    log('\n========================================', 'blue');
    log(`Results: ${passCount}/${totalCount} tests passed`, allPassed ? 'green' : 'yellow');
    log('========================================\n', 'blue');
    
    if (allPassed) {
        log('✓ All tests passed! Backdrop filter fallbacks are properly implemented.', 'green');
        log('  - @supports query is present', 'cyan');
        log('  - Fallback styles ensure readability', 'cyan');
        log('  - Modern glass effect is defined', 'cyan');
        log('  - Implementation is well documented', 'cyan');
    } else {
        log('✗ Some tests failed. Please review the implementation.', 'red');
    }
    
    process.exit(allPassed ? 0 : 1);
}

// Run tests
runTests();
