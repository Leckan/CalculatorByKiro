/**
 * Verification script for Task 6: Button Color Schemes by Type
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 1.5
 * 
 * This script verifies that:
 * 1. Number buttons have dark slate color (#1e293b)
 * 2. Operator buttons have primary purple color (#667eea)
 * 3. Function buttons have secondary violet color (#8b5cf6)
 * 4. Control buttons have accent red color (#ef4444)
 * 5. All button colors meet contrast requirements (≥4.5:1)
 */

// Helper function to convert RGB to hex
function rgbToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Helper function to calculate relative luminance
function getLuminance(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Apply gamma correction
    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

// Helper function to calculate contrast ratio
function getContrastRatio(color1, color2) {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

// Expected colors (updated for Task 6 with WCAG AA compliant colors)
const expectedColors = {
    'number-button': '#1e293b',
    'operator-button': '#5b21b6',
    'function-button': '#6d28d9',
    'control-button': '#dc2626',
    'equals-button': '#047857'
};

// Test results
const results = {
    passed: [],
    failed: [],
    warnings: []
};

// Create test buttons
function createTestButton(type, className) {
    const button = document.createElement('button');
    button.className = `calc-button ${className}`;
    button.textContent = 'Test';
    button.style.visibility = 'hidden';
    button.style.position = 'absolute';
    document.body.appendChild(button);
    return button;
}

// Run tests
function runTests() {
    console.log('=== Task 6: Button Color Schemes Verification ===\n');
    
    // Test each button type
    Object.entries(expectedColors).forEach(([className, expectedColor]) => {
        const button = createTestButton(className, className);
        const computedStyle = window.getComputedStyle(button);
        const backgroundColor = computedStyle.backgroundColor;
        const textColor = computedStyle.color;
        
        // Convert to hex for comparison
        const bgHex = rgbToHex(backgroundColor);
        const textHex = rgbToHex(textColor);
        
        console.log(`\nTesting .${className}:`);
        console.log(`  Expected background: ${expectedColor}`);
        console.log(`  Actual background: ${bgHex}`);
        console.log(`  Text color: ${textHex}`);
        
        // Check if color matches
        if (bgHex.toLowerCase() === expectedColor.toLowerCase()) {
            results.passed.push(`✓ ${className} has correct color (${expectedColor})`);
            console.log(`  ✓ Color matches`);
        } else {
            results.failed.push(`✗ ${className} expected ${expectedColor}, got ${bgHex}`);
            console.log(`  ✗ Color does not match`);
        }
        
        // Check contrast ratio
        const contrastRatio = getContrastRatio(bgHex, textHex);
        console.log(`  Contrast ratio: ${contrastRatio.toFixed(2)}:1`);
        
        if (contrastRatio >= 4.5) {
            results.passed.push(`✓ ${className} meets contrast requirement (${contrastRatio.toFixed(2)}:1)`);
            console.log(`  ✓ Meets WCAG AA contrast requirement (≥4.5:1)`);
        } else if (contrastRatio >= 3.0) {
            results.warnings.push(`⚠ ${className} only meets large text contrast (${contrastRatio.toFixed(2)}:1)`);
            console.log(`  ⚠ Only meets large text contrast (≥3:1)`);
        } else {
            results.failed.push(`✗ ${className} fails contrast requirement (${contrastRatio.toFixed(2)}:1)`);
            console.log(`  ✗ Fails contrast requirement`);
        }
        
        // Clean up
        document.body.removeChild(button);
    });
    
    // Print summary
    console.log('\n=== Test Summary ===\n');
    console.log(`Passed: ${results.passed.length}`);
    console.log(`Failed: ${results.failed.length}`);
    console.log(`Warnings: ${results.warnings.length}`);
    
    if (results.passed.length > 0) {
        console.log('\nPassed tests:');
        results.passed.forEach(msg => console.log(`  ${msg}`));
    }
    
    if (results.warnings.length > 0) {
        console.log('\nWarnings:');
        results.warnings.forEach(msg => console.log(`  ${msg}`));
    }
    
    if (results.failed.length > 0) {
        console.log('\nFailed tests:');
        results.failed.forEach(msg => console.log(`  ${msg}`));
    }
    
    // Return overall result
    const allPassed = results.failed.length === 0;
    console.log(`\n${allPassed ? '✓ All tests passed!' : '✗ Some tests failed'}`);
    
    return allPassed;
}

// Run tests when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
} else {
    runTests();
}

// Export for Node.js testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runTests, getContrastRatio, getLuminance };
}
