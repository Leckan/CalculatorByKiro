# Scientific Notation Parser Fix

## Issue

The expression parser was throwing an error when parsing numbers in scientific notation:

```
Error: Unknown function: e when calculating 1.0168850428141299e-20+6
```

## Root Cause

The parser's number tokenization logic didn't recognize scientific notation (e.g., `1.23e-10`). When it encountered the "e" or "E" in scientific notation, it treated it as a function name rather than part of the number.

## Solution

Updated the `parse()` method in `ExpressionParser` to properly handle scientific notation:

### Changes Made

1. **Extended number parsing** to recognize scientific notation format:
   - Supports both lowercase `e` and uppercase `E`
   - Handles optional `+` or `-` sign after the exponent marker
   - Parses exponent digits correctly

2. **Updated both number parsing paths**:
   - Regular number parsing (positive numbers)
   - Unary minus parsing (negative numbers)

### Supported Formats

The parser now correctly handles:
- `1.23e-10` - Standard scientific notation
- `1.23E-10` - Capital E notation
- `1.23e+10` - Explicit positive exponent
- `1.23e10` - Implicit positive exponent
- `-1.23e-10` - Negative scientific notation
- `1e-10` - Without decimal point
- `1.5e2` - Positive exponents

## Test Results

All 10 test cases passed:

✅ `1.0168850428141299e-20+6` → `6`  
✅ `2.9989206906525162e-9 + 66` → `66.00000000299892`  
✅ `1e-10 + 1` → `1.0000000001`  
✅ `1.5e2 + 50` → `200`  
✅ `3e-9 * 2` → `6e-9`  
✅ `1E10 + 1E10` → `20000000000`  
✅ `-5e-3 + 1` → `0.995`  
✅ `2.5e+3 - 100` → `2400`  
✅ `(1e-5 + 2e-5) * 3` → `0.00009`  
✅ `sqrt(4e4)` → `200`  

## Files Modified

- `src/expression-parser.js` - Added scientific notation support to number parsing logic

## Files Created

- `tests/test-parser-scientific-notation.js` - Comprehensive test suite for scientific notation
- `tests/test-scientific-notation-addition.js` - Basic engine-level tests
- `docs/SCIENTIFIC-NOTATION-FIX.md` - This documentation

## Impact

This fix enables the calculator to:
- Accept user input with scientific notation
- Handle very large and very small numbers correctly
- Support calculations mixing scientific and standard notation
- Work with results from scientific functions that return values in scientific notation

## Verification

Run the test suite:
```bash
node tests/test-parser-scientific-notation.js
```

Expected output: All 10 tests pass ✅

---

**Status**: ✅ FIXED  
**Date**: December 3, 2025  
**Priority**: High - Critical bug fix
