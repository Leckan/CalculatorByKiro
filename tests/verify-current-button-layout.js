/**
 * Verification script for current button layout
 * Checks that the layout matches the standard calculator pattern
 */

const fs = require('fs');
const path = require('path');

// Read the calculator-view.js file
const viewFilePath = path.join(__dirname, '..', 'src', 'calculator-view.js');
const viewContent = fs.readFileSync(viewFilePath, 'utf8');

// Extract button layout from the file
const layoutMatch = viewContent.match(/const buttonLayout = \[([\s\S]*?)\];/);

if (!layoutMatch) {
    console.error('❌ Could not find buttonLayout in calculator-view.js');
    process.exit(1);
}

console.log('✅ Button Layout Verification\n');
console.log('═'.repeat(60));

// Parse and display the layout
const layoutText = layoutMatch[1];
const rows = layoutText.split(/\/\/ Row \d+:/);

// Expected layout structure
const expectedLayout = {
    row7: ['7', '8', '9', '-'],
    row8: ['4', '5', '6', '+'],
    row9: ['1', '2', '3', '='],
    row10: ['0', '.']
};

console.log('\n📊 Current Button Layout:\n');
console.log('Column:    1        2        3        4');
console.log('─'.repeat(60));

// Extract actual button texts from each row
const extractButtons = (rowText) => {
    const buttons = [];
    const buttonMatches = rowText.matchAll(/text: '([^']+)'/g);
    for (const match of buttonMatches) {
        buttons.push(match[1]);
    }
    return buttons;
};

let allTestsPassed = true;

// Check rows 1-6 (scientific functions)
for (let i = 1; i <= 6; i++) {
    const rowText = rows[i] || '';
    const buttons = extractButtons(rowText);
    if (buttons.length > 0 && buttons.length <= 4) {
        console.log(`Row ${i}:   ${buttons.map(b => `[${b.padEnd(4)}]`).join('  ')}`);
    }
}

// Check row 7 (7, 8, 9, -)
const row7Text = rows[7] || '';
const row7Buttons = extractButtons(row7Text);
console.log(`Row 7:   ${row7Buttons.map(b => `[${b.padEnd(4)}]`).join('  ')}`);

const row7Expected = ['7', '8', '9', '-'];
const row7Pass = JSON.stringify(row7Buttons) === JSON.stringify(row7Expected);
if (!row7Pass) {
    console.log(`  ❌ Expected: ${row7Expected.join(', ')}`);
    console.log(`  ❌ Got: ${row7Buttons.join(', ')}`);
    allTestsPassed = false;
} else {
    console.log('  ✅ Standard number pad row 1');
}

// Check row 8 (4, 5, 6, +)
const row8Text = rows[8] || '';
const row8Buttons = extractButtons(row8Text);
console.log(`Row 8:   ${row8Buttons.map(b => `[${b.padEnd(4)}]`).join('  ')}`);

const row8Expected = ['4', '5', '6', '+'];
const row8Pass = JSON.stringify(row8Buttons) === JSON.stringify(row8Expected);
if (!row8Pass) {
    console.log(`  ❌ Expected: ${row8Expected.join(', ')}`);
    console.log(`  ❌ Got: ${row8Buttons.join(', ')}`);
    allTestsPassed = false;
} else {
    console.log('  ✅ Standard number pad row 2');
}

// Check row 9 (1, 2, 3, =)
const row9Text = rows[9] || '';
const row9Buttons = extractButtons(row9Text);
console.log(`Row 9:   ${row9Buttons.map(b => `[${b.padEnd(4)}]`).join('  ')}`);

const row9Expected = ['1', '2', '3', '='];
const row9Pass = JSON.stringify(row9Buttons) === JSON.stringify(row9Expected);
if (!row9Pass) {
    console.log(`  ❌ Expected: ${row9Expected.join(', ')}`);
    console.log(`  ❌ Got: ${row9Buttons.join(', ')}`);
    allTestsPassed = false;
} else {
    console.log('  ✅ Standard number pad row 3');
}

// Check row 10 (0, .)
const row10Text = rows[10] || '';
const row10Buttons = extractButtons(row10Text);
console.log(`Row 10:  ${row10Buttons.map(b => `[${b.padEnd(4)}]`).join('  ')}`);
console.log('         └─────────┘');
console.log('       (0 spans 2 cols)');

const row10Expected = ['0', '.'];
const row10Pass = JSON.stringify(row10Buttons) === JSON.stringify(row10Expected);
if (!row10Pass) {
    console.log(`  ❌ Expected: ${row10Expected.join(', ')}`);
    console.log(`  ❌ Got: ${row10Buttons.join(', ')}`);
    allTestsPassed = false;
} else {
    console.log('  ✅ Standard number pad row 4');
}

console.log('\n' + '═'.repeat(60));

// Check for maximum 4 buttons per row
console.log('\n📏 Row Length Verification:\n');
let maxButtonsPass = true;
for (let i = 1; i <= 10; i++) {
    const rowText = rows[i] || '';
    const buttons = extractButtons(rowText);
    const pass = buttons.length <= 4;
    const status = pass ? '✅' : '❌';
    console.log(`${status} Row ${i}: ${buttons.length} buttons ${pass ? '' : '(exceeds maximum of 4)'}`);
    if (!pass) {
        maxButtonsPass = false;
        allTestsPassed = false;
    }
}

console.log('\n' + '═'.repeat(60));
console.log('\n📋 Summary:\n');

if (allTestsPassed && maxButtonsPass) {
    console.log('✅ All tests passed!');
    console.log('✅ Standard calculator number pad layout (789, 456, 123, 0)');
    console.log('✅ All rows have maximum 4 buttons');
    console.log('✅ Operators in rightmost column');
    process.exit(0);
} else {
    console.log('❌ Some tests failed');
    if (!allTestsPassed) {
        console.log('❌ Number pad layout does not match standard pattern');
    }
    if (!maxButtonsPass) {
        console.log('❌ Some rows exceed maximum of 4 buttons');
    }
    process.exit(1);
}
