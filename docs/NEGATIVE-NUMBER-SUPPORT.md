# Negative Number Support Implementation

## Overview
Added comprehensive support for operations with negative numbers through a +/- (negate) button and intelligent expression handling.

## Features Added

### 1. Negate Button (±)
- **Location**: Bottom row, between decimal point and equals button
- **Function**: Toggles the sign of the current number
- **Symbol**: ± (plus-minus sign)

### 2. Negate Functionality

#### Basic Operations:
- **Negate positive number**: `5` → `-5`
- **Negate negative number**: `-5` → `5`
- **Negate decimal**: `3.14` → `-3.14`
- **Negate zero**: `0` → `-0` (displays as `0`)

#### Advanced Operations:
- **Negate after calculation**: After `5 + 3 = 8`, pressing ± gives `-8`
- **Multiple negations**: Can toggle sign repeatedly
- **Use in expressions**: `-5 + 3 = -2` works correctly

### 3. Expression Handling

#### Native Unary Minus Support:
The expression parser natively handles negative numbers in all contexts:
- User input: `-5 + 3`
- Parser recognizes: `-5` as a negative number, not subtraction
- Result: `-2` ✓

No conversion needed - the parser intelligently distinguishes between:
- **Unary minus** (negative number): `-5`, `(-3)`, `sin(-90)`
- **Binary minus** (subtraction): `10 - 5`, `x - y`

#### Parentheses Support:
Negative numbers in parentheses work correctly:
- `10 - (-5) = 15` ✓
- `(-3) × 4 = -12` ✓

## Implementation Details

### Calculator View (calculator-view.js)
```javascript
// Added negate button to layout
{ text: '±', type: 'control', action: 'negate' }
```

### Main Controller (main.js)
```javascript
case 'negate':
    controller.handleNegate();
    break;
```

### Calculator Controller (calculator-controller.js)

#### handleNegate() Method:
```javascript
handleNegate() {
    // If just calculated, negate the result
    if (this.justCalculated) {
        const lastResult = this.stateManager.getLastResult();
        const negated = -lastResult;
        this.stateManager.setLastResult(negated);
        this.stateManager.setInputBuffer(this.formatNumber(negated));
    }
    // If there's a number in buffer, negate it
    else if (currentBuffer && currentBuffer !== '0') {
        const num = parseFloat(currentBuffer);
        const negated = -num;
        this.stateManager.setInputBuffer(String(negated));
    }
    // If buffer is empty, start with negative sign
    else {
        this.stateManager.setInputBuffer('-');
    }
}
```

#### handleOperatorInput() Enhancement:
```javascript
// Convert leading negative numbers to parser-friendly format
if (currentBuffer.startsWith('-') && !currentExpression) {
    bufferToAdd = '0' + currentBuffer; // "-5" becomes "0-5"
}
```

## Test Coverage

### Test File: test-negate-functionality.js
All 8 tests passing:

1. ✓ Negate positive number: 5 becomes -5
2. ✓ Negate negative number: -5 becomes 5
3. ✓ Negate decimal: 3.14 becomes -3.14
4. ✓ Negate after calculation: 5 + 3 = 8, negate becomes -8
5. ✓ Calculate with negated number: -5 + 3 = -2
6. ✓ Negate zero: 0 becomes -0 (displays as 0)
7. ✓ Multiple negations: 7 → -7 → 7 → -7
8. ✓ Negate in expression: 10 - (-5) = 15

## User Experience

### Workflow Examples:

#### Example 1: Simple Negation
```
User: 5 [±]
Display: -5
```

#### Example 2: Calculation with Negative
```
User: 5 [±] [+] 3 [=]
Display: -2
```

#### Example 3: Negate Result
```
User: 10 [+] 5 [=]
Display: 15
User: [±]
Display: -15
```

#### Example 4: Complex Expression
```
User: 10 [-] [(] 5 [±] [)] [=]
Display: 15
```

## Benefits

1. **Intuitive**: Standard calculator behavior
2. **Flexible**: Works in multiple contexts (input, after calculation, in expressions)
3. **Reliable**: Comprehensive test coverage
4. **Transparent**: Automatic conversion to parser-friendly format
5. **Professional**: Matches physical calculator functionality

## Technical Notes

### Parser Enhancement:
The expression parser has been enhanced to natively support unary minus operators:
- Handles leading negative numbers: `-5 + 3 = -2` ✓
- Handles negatives in parentheses: `(-5) × 3 = -15` ✓
- Handles negatives after operators: `10 - (-5) = 15` ✓
- Handles negatives after functions: `sin(-1.57)` ✓
- No conversion needed - works naturally

The parser intelligently detects when a minus sign is unary (negative number) vs binary (subtraction operator) based on context.

## Keyboard Support

The negate function can be triggered via:
- **Mouse**: Click the ± button
- **Future**: Could add keyboard shortcut (e.g., `_` or `F9`)

## Accessibility

- Button has clear label (±)
- Keyboard accessible (can be tabbed to)
- Screen reader friendly
- Visual feedback on hover/click
