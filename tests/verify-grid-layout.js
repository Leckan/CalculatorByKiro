/**
 * Verification script for Task 18: CSS Grid Layout
 * Tests CSS Grid implementation with 4 columns, consistent spacing,
 * special button spans, and responsive behavior
 * Requirements: 7.4
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('Task 18: CSS Grid Layout Verification');
console.log('Requirements: 7.4');
console.log('='.repeat(60));

let allTestsPassed = true;
const results = [];

/**
 * Test 1: Verify CSS Grid is defined in buttons.css
 */
function testGridDefinition() {
    console.log('\n📋 Test 1: CSS Grid Definition');
    console.log('-'.repeat(60));
    
    const buttonsCSS = fs.readFileSync(
        path.join(__dirname, '../styles/components/buttons.css'),
        'utf8'
    );
    
    // Check for grid display
    const hasGridDisplay = /\.button-grid\s*{[^}]*display:\s*grid/s.test(buttonsCSS);
    console.log(`  ✓ Grid display property: ${hasGridDisplay ? 'FOUND' : 'NOT FOUND'}`);
    if (!hasGridDisplay) allTestsPassed = false;
    
    // Check for 4 columns
    const has4Columns = /grid-template-columns:\s*repeat\(4,\s*1fr\)/i.test(buttonsCSS);
    console.log(`  ✓ 4-column grid template: ${has4Columns ? 'FOUND' : 'NOT FOUND'}`);
    if (!has4Columns) allTestsPassed = false;
    
    // Check for gap property
    const hasGap = /\.button-grid\s*{[^}]*gap:/s.test(buttonsCSS);
    console.log(`  ✓ Gap spacing property: ${hasGap ? 'FOUND' : 'NOT FOUND'}`);
    if (!hasGap) allTestsPassed = false;
    
    results.push({
        test: 'CSS Grid Definition',
        passed: hasGridDisplay && has4Columns && hasGap
    });
}

/**
 * Test 2: Verify special button spans (equals button)
 */
function testSpecialButtonSpans() {
    console.log('\n📋 Test 2: Special Button Spans');
    console.log('-'.repeat(60));
    
    const buttonsCSS = fs.readFileSync(
        path.join(__dirname, '../styles/components/buttons.css'),
        'utf8'
    );
    
    // Check for equals button spanning 2 columns
    const equalsSpans2 = /\.equals-button\s*{[^}]*grid-column:\s*span\s*2/s.test(buttonsCSS);
    console.log(`  ✓ Equals button spans 2 columns: ${equalsSpans2 ? 'YES' : 'NO'}`);
    if (!equalsSpans2) allTestsPassed = false;
    
    results.push({
        test: 'Special Button Spans',
        passed: equalsSpans2
    });
}

/**
 * Test 3: Verify button-row uses display: contents
 */
function testButtonRowContents() {
    console.log('\n📋 Test 3: Button Row Display Contents');
    console.log('-'.repeat(60));
    
    const buttonsCSS = fs.readFileSync(
        path.join(__dirname, '../styles/components/buttons.css'),
        'utf8'
    );
    
    // Check for display: contents on button-row
    const hasDisplayContents = /\.button-row\s*{[^}]*display:\s*contents/s.test(buttonsCSS);
    console.log(`  ✓ Button rows use display: contents: ${hasDisplayContents ? 'YES' : 'NO'}`);
    if (!hasDisplayContents) allTestsPassed = false;
    
    results.push({
        test: 'Button Row Display Contents',
        passed: hasDisplayContents
    });
}

/**
 * Test 4: Verify responsive grid across breakpoints
 */
function testResponsiveGrid() {
    console.log('\n📋 Test 4: Responsive Grid Across Breakpoints');
    console.log('-'.repeat(60));
    
    const breakpointsCSS = fs.readFileSync(
        path.join(__dirname, '../styles/responsive/breakpoints.css'),
        'utf8'
    );
    
    // Extract mobile media query section
    const mobileSection = breakpointsCSS.match(/@media\s*\(max-width:\s*639px\)\s*{[\s\S]*?(?=@media|$)/);
    const mobileHas4Cols = mobileSection && /\.button-grid\s*{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/s.test(mobileSection[0]);
    console.log(`  ✓ Mobile maintains 4 columns: ${mobileHas4Cols ? 'YES' : 'NO'}`);
    if (!mobileHas4Cols) allTestsPassed = false;
    
    // Extract tablet media query section
    const tabletSection = breakpointsCSS.match(/@media\s*\(min-width:\s*640px\)\s*and\s*\(max-width:\s*1023px\)\s*{[\s\S]*?(?=@media|$)/);
    const tabletHas4Cols = tabletSection && /\.button-grid\s*{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/s.test(tabletSection[0]);
    console.log(`  ✓ Tablet maintains 4 columns: ${tabletHas4Cols ? 'YES' : 'NO'}`);
    if (!tabletHas4Cols) allTestsPassed = false;
    
    // Extract desktop media query section
    const desktopSection = breakpointsCSS.match(/@media\s*\(min-width:\s*1024px\)\s*{[\s\S]*?(?=@media|$)/);
    const desktopHas4Cols = desktopSection && /\.button-grid\s*{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/s.test(desktopSection[0]);
    console.log(`  ✓ Desktop maintains 4 columns: ${desktopHas4Cols ? 'YES' : 'NO'}`);
    if (!desktopHas4Cols) allTestsPassed = false;
    
    results.push({
        test: 'Responsive Grid',
        passed: mobileHas4Cols && tabletHas4Cols && desktopHas4Cols
    });
}

/**
 * Test 5: Verify consistent gap spacing across breakpoints
 */
function testConsistentGapSpacing() {
    console.log('\n📋 Test 5: Consistent Gap Spacing');
    console.log('-'.repeat(60));
    
    const breakpointsCSS = fs.readFileSync(
        path.join(__dirname, '../styles/responsive/breakpoints.css'),
        'utf8'
    );
    
    // Extract mobile media query section
    const mobileSection = breakpointsCSS.match(/@media\s*\(max-width:\s*639px\)\s*{[\s\S]*?(?=@media|$)/);
    const mobileHasGap = mobileSection && /\.button-grid\s*{[^}]*gap:/s.test(mobileSection[0]);
    console.log(`  ✓ Mobile has gap spacing: ${mobileHasGap ? 'YES' : 'NO'}`);
    if (!mobileHasGap) allTestsPassed = false;
    
    // Extract tablet media query section
    const tabletSection = breakpointsCSS.match(/@media\s*\(min-width:\s*640px\)\s*and\s*\(max-width:\s*1023px\)\s*{[\s\S]*?(?=@media|$)/);
    const tabletHasGap = tabletSection && /\.button-grid\s*{[^}]*gap:/s.test(tabletSection[0]);
    console.log(`  ✓ Tablet has gap spacing: ${tabletHasGap ? 'YES' : 'NO'}`);
    if (!tabletHasGap) allTestsPassed = false;
    
    // Extract desktop media query section
    const desktopSection = breakpointsCSS.match(/@media\s*\(min-width:\s*1024px\)\s*{[\s\S]*?(?=@media|$)/);
    const desktopHasGap = desktopSection && /\.button-grid\s*{[^}]*gap:/s.test(desktopSection[0]);
    console.log(`  ✓ Desktop has gap spacing: ${desktopHasGap ? 'YES' : 'NO'}`);
    if (!desktopHasGap) allTestsPassed = false;
    
    results.push({
        test: 'Consistent Gap Spacing',
        passed: mobileHasGap && tabletHasGap && desktopHasGap
    });
}

/**
 * Test 6: Verify grid layout documentation
 */
function testDocumentation() {
    console.log('\n📋 Test 6: Grid Layout Documentation');
    console.log('-'.repeat(60));
    
    const buttonsCSS = fs.readFileSync(
        path.join(__dirname, '../styles/components/buttons.css'),
        'utf8'
    );
    
    // Check for Task 18 reference
    const hasTask18Ref = /Task 18/i.test(buttonsCSS);
    console.log(`  ✓ Task 18 reference in comments: ${hasTask18Ref ? 'YES' : 'NO'}`);
    
    // Check for Requirements 7.4 reference
    const hasReqRef = /Requirements?:\s*7\.4/i.test(buttonsCSS);
    console.log(`  ✓ Requirements 7.4 reference: ${hasReqRef ? 'YES' : 'NO'}`);
    
    results.push({
        test: 'Grid Layout Documentation',
        passed: hasTask18Ref && hasReqRef
    });
}

// Run all tests
testGridDefinition();
testSpecialButtonSpans();
testButtonRowContents();
testResponsiveGrid();
testConsistentGapSpacing();
testDocumentation();

// Summary
console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));

results.forEach(result => {
    const status = result.passed ? '✓ PASS' : '✗ FAIL';
    const color = result.passed ? '\x1b[32m' : '\x1b[31m';
    console.log(`${color}${status}\x1b[0m - ${result.test}`);
});

const passedCount = results.filter(r => r.passed).length;
const totalCount = results.length;

console.log('\n' + '='.repeat(60));
if (allTestsPassed) {
    console.log('\x1b[32m✓ ALL TESTS PASSED\x1b[0m');
    console.log(`${passedCount}/${totalCount} tests passed`);
    console.log('\nTask 18 implementation is complete and correct!');
    console.log('CSS Grid layout with 4 columns has been successfully implemented.');
} else {
    console.log('\x1b[31m✗ SOME TESTS FAILED\x1b[0m');
    console.log(`${passedCount}/${totalCount} tests passed`);
    console.log('\nPlease review the failed tests above.');
}
console.log('='.repeat(60));

process.exit(allTestsPassed ? 0 : 1);
