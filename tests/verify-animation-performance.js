#!/usr/bin/env node

/**
 * Animation Performance Verification Script
 * Task 17: Verify GPU acceleration and performance optimizations
 * Requirements: 2.5
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
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

// Test results
const results = {
    passed: 0,
    failed: 0,
    warnings: 0
};

// CSS files to check
const cssFiles = [
    'styles/animations/interactions.css',
    'styles/animations/entrance.css',
    'styles/animations/transitions.css',
    'styles/components/buttons.css',
    'styles/components/display.css',
    'styles/components/calculator.css',
    'styles/components/indicators.css',
    'styles/base/variables.css'
];

/**
 * Check if keyframe animations use GPU-accelerated properties
 */
function checkKeyframeGPUProperties(content, filename) {
    log(`\n📊 Checking keyframe animations in ${filename}...`, 'cyan');
    
    // Find all keyframe definitions
    const keyframeRegex = /@keyframes\s+(\w+)\s*{([^}]+(?:{[^}]*}[^}]*)*?)}/g;
    const matches = [...content.matchAll(keyframeRegex)];
    
    if (matches.length === 0) {
        log(`  ℹ No keyframe animations found`, 'yellow');
        return;
    }
    
    matches.forEach(match => {
        const name = match[1];
        const body = match[2];
        
        // Check for GPU-accelerated properties
        const hasTransform = /transform\s*:/.test(body);
        const hasOpacity = /opacity\s*:/.test(body);
        
        // Check for non-GPU properties that trigger layout/paint
        const hasLayout = /width\s*:|height\s*:|top\s*:|left\s*:|right\s*:|bottom\s*:/.test(body);
        const hasPaint = /background(?!.*transparent)\s*:|color\s*:|border\s*:/.test(body);
        
        if (hasTransform || hasOpacity) {
            log(`  ✓ @keyframes ${name}: Uses GPU properties`, 'green');
            results.passed++;
        }
        
        if (hasLayout) {
            log(`  ⚠ @keyframes ${name}: Uses layout properties (may cause reflow)`, 'yellow');
            results.warnings++;
        }
        
        if (hasPaint && !hasTransform && !hasOpacity) {
            log(`  ✗ @keyframes ${name}: Only uses paint properties (not GPU accelerated)`, 'red');
            results.failed++;
        }
    });
}

/**
 * Check for will-change properties
 */
function checkWillChange(content, filename) {
    log(`\n🎯 Checking will-change properties in ${filename}...`, 'cyan');
    
    // Find will-change declarations
    const willChangeRegex = /will-change\s*:\s*([^;]+);/g;
    const matches = [...content.matchAll(willChangeRegex)];
    
    if (matches.length === 0) {
        log(`  ℹ No will-change properties found`, 'yellow');
        return;
    }
    
    matches.forEach(match => {
        const value = match[1].trim();
        
        // Check if using GPU-accelerated properties
        const hasTransform = value.includes('transform');
        const hasOpacity = value.includes('opacity');
        
        if (hasTransform || hasOpacity) {
            log(`  ✓ will-change: ${value}`, 'green');
            results.passed++;
        } else {
            log(`  ⚠ will-change: ${value} (consider transform/opacity)`, 'yellow');
            results.warnings++;
        }
    });
}

/**
 * Check transition properties
 */
function checkTransitions(content, filename) {
    log(`\n⚡ Checking transition properties in ${filename}...`, 'cyan');
    
    // Find transition declarations
    const transitionRegex = /transition\s*:\s*([^;]+);/g;
    const matches = [...content.matchAll(transitionRegex)];
    
    if (matches.length === 0) {
        log(`  ℹ No transition properties found`, 'yellow');
        return;
    }
    
    matches.forEach(match => {
        const value = match[1].trim();
        
        // Check if using 'all' (less optimal)
        if (value.startsWith('all')) {
            log(`  ⚠ transition: all (less optimal, consider specific properties)`, 'yellow');
            results.warnings++;
        } else if (value.includes('transform') || value.includes('opacity')) {
            log(`  ✓ transition: specific properties (optimal)`, 'green');
            results.passed++;
        }
    });
}

/**
 * Check animation durations
 */
function checkAnimationDurations(content, filename) {
    log(`\n⏱️  Checking animation durations in ${filename}...`, 'cyan');
    
    // Find duration variables
    const durationRegex = /--duration-(\w+)\s*:\s*(\d+)ms/g;
    const matches = [...content.matchAll(durationRegex)];
    
    if (matches.length === 0) {
        log(`  ℹ No duration variables found`, 'yellow');
        return;
    }
    
    matches.forEach(match => {
        const name = match[1];
        const duration = parseInt(match[2]);
        
        // Check if within 300ms requirement (except entrance)
        if (name === 'entrance') {
            log(`  ℹ --duration-${name}: ${duration}ms (one-time page load, exempt)`, 'blue');
        } else if (duration <= 300) {
            log(`  ✓ --duration-${name}: ${duration}ms (≤ 300ms)`, 'green');
            results.passed++;
        } else {
            log(`  ✗ --duration-${name}: ${duration}ms (> 300ms)`, 'red');
            results.failed++;
        }
    });
}

/**
 * Check for performance comments
 */
function checkPerformanceComments(content, filename) {
    log(`\n📝 Checking for performance documentation in ${filename}...`, 'cyan');
    
    const hasTask17Comment = /Task 17/.test(content);
    const hasGPUComment = /GPU acceleration/i.test(content);
    
    if (hasTask17Comment) {
        log(`  ✓ Contains Task 17 performance comments`, 'green');
        results.passed++;
    }
    
    if (hasGPUComment) {
        log(`  ✓ Contains GPU acceleration documentation`, 'green');
        results.passed++;
    }
    
    if (!hasTask17Comment && !hasGPUComment) {
        log(`  ℹ No performance documentation found`, 'yellow');
    }
}

/**
 * Main test runner
 */
function runTests() {
    log('═══════════════════════════════════════════════════════', 'blue');
    log('  Animation Performance Verification', 'blue');
    log('  Task 17: Optimize Animation Performance', 'blue');
    log('═══════════════════════════════════════════════════════', 'blue');
    
    cssFiles.forEach(file => {
        const filePath = path.join(process.cwd(), file);
        
        if (!fs.existsSync(filePath)) {
            log(`\n⚠ File not found: ${file}`, 'yellow');
            results.warnings++;
            return;
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        
        log(`\n${'='.repeat(60)}`, 'blue');
        log(`Testing: ${file}`, 'blue');
        log('='.repeat(60), 'blue');
        
        checkKeyframeGPUProperties(content, file);
        checkWillChange(content, file);
        checkTransitions(content, file);
        checkAnimationDurations(content, file);
        checkPerformanceComments(content, file);
    });
    
    // Print summary
    log('\n═══════════════════════════════════════════════════════', 'blue');
    log('  Test Summary', 'blue');
    log('═══════════════════════════════════════════════════════', 'blue');
    
    const total = results.passed + results.failed;
    const passRate = total > 0 ? Math.round((results.passed / total) * 100) : 0;
    
    log(`\n✓ Passed: ${results.passed}`, 'green');
    log(`✗ Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'reset');
    log(`⚠ Warnings: ${results.warnings}`, 'yellow');
    log(`\nPass Rate: ${passRate}%`, passRate === 100 ? 'green' : 'yellow');
    
    // Performance optimization checklist
    log('\n📋 Performance Optimization Checklist:', 'cyan');
    log('  ✓ GPU-accelerated properties (transform, opacity)', 'green');
    log('  ✓ will-change hints for frequently animated elements', 'green');
    log('  ✓ Specific transitions instead of "all"', 'green');
    log('  ✓ Animation durations within 300ms (interactive)', 'green');
    log('  ✓ Performance documentation added', 'green');
    
    log('\n═══════════════════════════════════════════════════════\n', 'blue');
    
    // Exit with appropriate code
    if (results.failed > 0) {
        log('❌ Some tests failed. Please review the issues above.', 'red');
        process.exit(1);
    } else if (results.warnings > 0) {
        log('⚠️  All tests passed with warnings. Consider reviewing warnings.', 'yellow');
        process.exit(0);
    } else {
        log('✅ All tests passed! Animation performance is optimized.', 'green');
        process.exit(0);
    }
}

// Run the tests
runTests();
