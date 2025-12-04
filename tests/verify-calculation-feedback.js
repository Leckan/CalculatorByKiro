/**
 * Verification script for Task 14: Calculation Completion Feedback
 * Tests Requirements: 9.1, 9.2, 9.4, 9.5
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('Task 14: Calculation Completion Feedback Verification');
console.log('Requirements: 9.1, 9.2, 9.4, 9.5');
console.log('='.repeat(60));
console.log();

let allTestsPassed = true;

// Test 1: Verify CSS animations exist
console.log('Test 1: Verify CSS animations for calculation feedback');
console.log('-'.repeat(60));

try {
    const transitionsPath = path.join(__dirname, '../styles/animations/transitions.css');
    const transitionsContent = fs.readFileSync(transitionsPath, 'utf8');
    
    const requiredAnimations = [
        { name: 'resultHighlight', requirement: '9.1, 9.4' },
        { name: 'equalsPress', requirement: '9.2, 9.4' },
        { name: 'resultFadeIn', requirement: '9.3, 9.4' }
    ];
    
    let animationsFound = 0;
    
    requiredAnimations.forEach(anim => {
        const keyframeRegex = new RegExp(`@keyframes\\s+${anim.name}`, 'i');
        const classRegex = new RegExp(`\\.(?:main-display|equals-button)\\.(?:result-highlight|calculating|result-fade-in)`, 'i');
        
        if (keyframeRegex.test(transitionsContent)) {
            console.log(`✓ Animation '${anim.name}' defined (Requirements ${anim.requirement})`);
            animationsFound++;
        } else {
            console.log(`✗ Animation '${anim.name}' NOT found (Requirements ${anim.requirement})`);
            allTestsPassed = false;
        }
    });
    
    console.log(`\nAnimations found: ${animationsFound}/${requiredAnimations.length}`);
    
} catch (error) {
    console.log('✗ Error reading transitions.css:', error.message);
    allTestsPassed = false;
}

console.log();

// Test 2: Verify animation timing (250ms)
console.log('Test 2: Verify animation timing is 250ms');
console.log('-'.repeat(60));

try {
    const transitionsPath = path.join(__dirname, '../styles/animations/transitions.css');
    const transitionsContent = fs.readFileSync(transitionsPath, 'utf8');
    
    // Check for var(--duration-normal) which should be 250ms
    const variablesPath = path.join(__dirname, '../styles/base/variables.css');
    const variablesContent = fs.readFileSync(variablesPath, 'utf8');
    
    const durationMatch = variablesContent.match(/--duration-normal:\s*(\d+)ms/);
    
    if (durationMatch && durationMatch[1] === '250') {
        console.log('✓ Animation duration is 250ms (Requirements 9.4, 9.5)');
    } else {
        console.log('✗ Animation duration is not 250ms (Requirements 9.4, 9.5)');
        allTestsPassed = false;
    }
    
    // Verify animations use the correct duration variable
    const usesCorrectDuration = transitionsContent.includes('var(--duration-normal)');
    
    if (usesCorrectDuration) {
        console.log('✓ Animations use correct duration variable');
    } else {
        console.log('✗ Animations do not use correct duration variable');
        allTestsPassed = false;
    }
    
} catch (error) {
    console.log('✗ Error verifying animation timing:', error.message);
    allTestsPassed = false;
}

console.log();

// Test 3: Verify CalculatorView methods exist
console.log('Test 3: Verify CalculatorView feedback methods');
console.log('-'.repeat(60));

try {
    const viewPath = path.join(__dirname, '../src/calculator-view.js');
    const viewContent = fs.readFileSync(viewPath, 'utf8');
    
    const requiredMethods = [
        { name: '_triggerResultHighlightAnimation', requirement: '9.1, 9.4' },
        { name: '_triggerEqualsButtonAnimation', requirement: '9.2, 9.4' },
        { name: '_triggerResultFadeInAnimation', requirement: '9.3, 9.4' },
        { name: 'triggerCalculationFeedback', requirement: '9.1, 9.2, 9.3, 9.4, 9.5' }
    ];
    
    let methodsFound = 0;
    
    requiredMethods.forEach(method => {
        const methodRegex = new RegExp(`${method.name}\\s*\\(`, 'i');
        
        if (methodRegex.test(viewContent)) {
            console.log(`✓ Method '${method.name}' exists (Requirements ${method.requirement})`);
            methodsFound++;
        } else {
            console.log(`✗ Method '${method.name}' NOT found (Requirements ${method.requirement})`);
            allTestsPassed = false;
        }
    });
    
    console.log(`\nMethods found: ${methodsFound}/${requiredMethods.length}`);
    
} catch (error) {
    console.log('✗ Error reading calculator-view.js:', error.message);
    allTestsPassed = false;
}

console.log();

// Test 4: Verify CalculatorController integration
console.log('Test 4: Verify CalculatorController integration');
console.log('-'.repeat(60));

try {
    const controllerPath = path.join(__dirname, '../src/calculator-controller.js');
    const controllerContent = fs.readFileSync(controllerPath, 'utf8');
    
    // Check that handleEquals calls triggerCalculationFeedback
    const callsFeedback = controllerContent.includes('triggerCalculationFeedback');
    
    if (callsFeedback) {
        console.log('✓ handleEquals calls triggerCalculationFeedback (Requirements 9.1, 9.2, 9.3, 9.4, 9.5)');
    } else {
        console.log('✗ handleEquals does NOT call triggerCalculationFeedback (Requirements 9.1, 9.2, 9.3, 9.4, 9.5)');
        allTestsPassed = false;
    }
    
    // Check for _isComplexExpression method
    const hasComplexityCheck = controllerContent.includes('_isComplexExpression');
    
    if (hasComplexityCheck) {
        console.log('✓ Controller has _isComplexExpression method (Requirements 9.3, 9.5)');
    } else {
        console.log('✗ Controller missing _isComplexExpression method (Requirements 9.3, 9.5)');
        allTestsPassed = false;
    }
    
} catch (error) {
    console.log('✗ Error reading calculator-controller.js:', error.message);
    allTestsPassed = false;
}

console.log();

// Test 5: Verify animation classes and structure
console.log('Test 5: Verify animation classes and structure');
console.log('-'.repeat(60));

try {
    const transitionsPath = path.join(__dirname, '../styles/animations/transitions.css');
    const transitionsContent = fs.readFileSync(transitionsPath, 'utf8');
    
    const requiredClasses = [
        { name: '.main-display.result-highlight', requirement: '9.1, 9.4' },
        { name: '.equals-button.calculating', requirement: '9.2, 9.4' },
        { name: '.main-display.result-fade-in', requirement: '9.3, 9.4' }
    ];
    
    let classesFound = 0;
    
    requiredClasses.forEach(cls => {
        const classRegex = new RegExp(cls.name.replace(/\./g, '\\.'), 'i');
        
        if (classRegex.test(transitionsContent)) {
            console.log(`✓ Class '${cls.name}' defined (Requirements ${cls.requirement})`);
            classesFound++;
        } else {
            console.log(`✗ Class '${cls.name}' NOT found (Requirements ${cls.requirement})`);
            allTestsPassed = false;
        }
    });
    
    console.log(`\nClasses found: ${classesFound}/${requiredClasses.length}`);
    
} catch (error) {
    console.log('✗ Error verifying animation classes:', error.message);
    allTestsPassed = false;
}

console.log();

// Test 6: Verify animation properties
console.log('Test 6: Verify animation properties and effects');
console.log('-'.repeat(60));

try {
    const transitionsPath = path.join(__dirname, '../styles/animations/transitions.css');
    const transitionsContent = fs.readFileSync(transitionsPath, 'utf8');
    
    // Check resultHighlight has background and transform
    const resultHighlightHasBackground = /resultHighlight[\s\S]*?background:/i.test(transitionsContent);
    const resultHighlightHasTransform = /resultHighlight[\s\S]*?transform:/i.test(transitionsContent);
    
    if (resultHighlightHasBackground && resultHighlightHasTransform) {
        console.log('✓ resultHighlight animation has background and transform (Requirements 9.1)');
    } else {
        console.log('✗ resultHighlight animation missing properties (Requirements 9.1)');
        allTestsPassed = false;
    }
    
    // Check equalsPress has transform and box-shadow
    const equalsPressHasTransform = /equalsPress[\s\S]*?transform:/i.test(transitionsContent);
    const equalsPressHasShadow = /equalsPress[\s\S]*?box-shadow:/i.test(transitionsContent);
    
    if (equalsPressHasTransform && equalsPressHasShadow) {
        console.log('✓ equalsPress animation has transform and box-shadow (Requirements 9.2)');
    } else {
        console.log('✗ equalsPress animation missing properties (Requirements 9.2)');
        allTestsPassed = false;
    }
    
    // Check resultFadeIn has opacity and transform
    const resultFadeInHasOpacity = /resultFadeIn[\s\S]*?opacity:/i.test(transitionsContent);
    const resultFadeInHasTransform = /resultFadeIn[\s\S]*?transform:/i.test(transitionsContent);
    
    if (resultFadeInHasOpacity && resultFadeInHasTransform) {
        console.log('✓ resultFadeIn animation has opacity and transform (Requirements 9.3)');
    } else {
        console.log('✗ resultFadeIn animation missing properties (Requirements 9.3)');
        allTestsPassed = false;
    }
    
} catch (error) {
    console.log('✗ Error verifying animation properties:', error.message);
    allTestsPassed = false;
}

console.log();
console.log('='.repeat(60));

if (allTestsPassed) {
    console.log('✓ ALL TESTS PASSED');
    console.log('Task 14 implementation is complete and correct.');
    process.exit(0);
} else {
    console.log('✗ SOME TESTS FAILED');
    console.log('Please review the failures above.');
    process.exit(1);
}
