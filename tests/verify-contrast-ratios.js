#!/usr/bin/env node

/**
 * Contrast Ratio Verification for Task 6
 * Requirements: 1.5, 4.5
 * 
 * Verifies that all button color combinations meet WCAG AA contrast requirements (≥4.5:1)
 */

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

// Button color definitions (updated for Task 6)
const buttonColors = {
    'Number buttons': { bg: '#1e293b', text: '#f8fafc' },
    'Operator buttons': { bg: '#5b21b6', text: '#ffffff' },
    'Function buttons': { bg: '#6d28d9', text: '#ffffff' },
    'Control buttons': { bg: '#dc2626', text: '#ffffff' },
    'Equals button': { bg: '#047857', text: '#ffffff' }
};

// WCAG contrast requirements
const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3.0;
const WCAG_AAA_NORMAL = 7.0;
const WCAG_AAA_LARGE = 4.5;

console.log('=== Task 6: Button Color Contrast Verification ===\n');
console.log('Requirements: 1.5, 4.5 - All button colors must meet WCAG AA contrast (≥4.5:1)\n');

let allPassed = true;
const results = [];

Object.entries(buttonColors).forEach(([name, colors]) => {
    const ratio = getContrastRatio(colors.bg, colors.text);
    const meetsAA = ratio >= WCAG_AA_NORMAL;
    const meetsAAA = ratio >= WCAG_AAA_NORMAL;
    
    console.log(`${name}:`);
    console.log(`  Background: ${colors.bg}`);
    console.log(`  Text: ${colors.text}`);
    console.log(`  Contrast ratio: ${ratio.toFixed(2)}:1`);
    
    if (meetsAAA) {
        console.log(`  ✓ Exceeds WCAG AAA (≥7:1)`);
        results.push({ name, ratio, level: 'AAA', passed: true });
    } else if (meetsAA) {
        console.log(`  ✓ Meets WCAG AA (≥4.5:1)`);
        results.push({ name, ratio, level: 'AA', passed: true });
    } else {
        console.log(`  ✗ FAILS WCAG AA requirement`);
        results.push({ name, ratio, level: 'FAIL', passed: false });
        allPassed = false;
    }
    console.log('');
});

// Summary
console.log('=== Summary ===\n');
const passed = results.filter(r => r.passed).length;
const failed = results.filter(r => !r.passed).length;

console.log(`Total button types: ${results.length}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log('');

if (allPassed) {
    console.log('✓ All button colors meet WCAG AA contrast requirements!');
    console.log('✓ Task 6 contrast requirement (1.5, 4.5) is satisfied.');
    process.exit(0);
} else {
    console.log('✗ Some button colors fail contrast requirements.');
    console.log('✗ Task 6 contrast requirement (1.5, 4.5) is NOT satisfied.');
    process.exit(1);
}
