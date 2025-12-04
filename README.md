# Scientific Calculator

A fully-featured scientific calculator web application with support for basic arithmetic, trigonometric functions, logarithms, and advanced operations with negative numbers.

## Features

### Basic Operations
- ✅ Addition, Subtraction, Multiplication, Division
- ✅ Power operations (x^y)
- ✅ Decimal number support
- ✅ Negative number support with ± button

### Scientific Functions
- ✅ Trigonometric: sin, cos, tan
- ✅ Logarithmic: ln (natural log), log (base-10)
- ✅ Exponential: exp (e^x)
- ✅ Square root
- ✅ Factorial
- ✅ Mathematical constants: π, e

### Advanced Features
- ✅ Angle mode toggle (Degrees/Radians)
- ✅ Memory operations (MC, MR, M+, MS)
- ✅ Parentheses support (up to 10 levels deep)
- ✅ Expression evaluation with proper operator precedence
- ✅ Native unary minus operator support
- ✅ Error handling and validation
- ✅ Keyboard support

### Display
- ✅ Up to 10 significant digits
- ✅ Scientific notation for large/small numbers
- ✅ Expression preview
- ✅ Mode indicators (angle mode, memory, parenthesis level)

## Project Structure

```
.
├── index.html              # Main HTML file
├── main.js                 # Application entry point
├── styles.css              # Calculator styling
├── src/                    # Source code
│   ├── calculator-controller.js
│   ├── calculator-engine.js
│   ├── calculator-view.js
│   ├── expression-parser.js
│   ├── memory-manager.js
│   ├── number-formatter.js
│   └── state-manager.js
├── tests/                  # Test files
│   ├── test-calculator-engine.js
│   ├── test-expression-parser-unit.js
│   ├── test-memory-manager.js
│   ├── test-state-manager.js
│   ├── test-integration-comprehensive.js
│   ├── test-negate-functionality.js
│   ├── test-all-negative-operations.js
│   ├── test-parser-unary-minus.js
│   └── test-error-handling.js
├── docs/                   # Documentation
│   ├── BUTTON-LAYOUT-IMPROVEMENTS.md
│   ├── NEGATIVE-NUMBER-SUPPORT.md
│   ├── COMPLETE-NEGATIVE-NUMBER-SUPPORT.md
│   ├── TASK-13-SUMMARY.md
│   └── TASK-14-SUMMARY.md
└── .kiro/                  # Kiro specs
    └── specs/
        └── scientific-calculator/
            ├── requirements.md
            ├── design.md
            └── tasks.md
```

## Getting Started

### Running the Calculator

1. Open `index.html` in a modern web browser
2. The calculator will load automatically

### Running Tests

All tests use Node.js. Run from the project root:

```bash
# Run all tests
node tests/test-calculator-engine.js
node tests/test-expression-parser-unit.js
node tests/test-memory-manager.js
node tests/test-state-manager.js
node tests/test-integration-comprehensive.js
node tests/test-negate-functionality.js
node tests/test-all-negative-operations.js
node tests/test-parser-unary-minus.js
node tests/test-error-handling.js

# Or run a specific test
node tests/test-calculator-engine.js
```

### Test Coverage

- **199 total tests** across all test files
- **100% pass rate**
- Coverage includes:
  - Unit tests for all components
  - Integration tests
  - Error handling tests
  - Negative number operation tests
  - Expression parser tests

## Architecture

### MVC Pattern

The calculator follows the Model-View-Controller (MVC) architectural pattern:

- **Model**: `CalculatorEngine`, `StateManager`, `MemoryManager`, `ExpressionParser`
- **View**: `CalculatorView`
- **Controller**: `CalculatorController`

### Components

#### CalculatorEngine
Core calculation logic for arithmetic and scientific functions.

#### ExpressionParser
Parses and evaluates mathematical expressions using the Shunting Yard algorithm. Supports:
- Operator precedence
- Parentheses
- Functions
- Unary minus (negative numbers)

#### StateManager
Manages calculator state including input buffer, expression, angle mode, and error state.

#### MemoryManager
Handles memory operations (store, recall, clear, add).

#### NumberFormatter
Formats numbers for display with proper precision and scientific notation.

#### CalculatorView
Renders the UI and handles user interactions.

#### CalculatorController
Coordinates between the view and model components.

## Key Features

### Negative Number Support

The calculator has comprehensive support for negative numbers:

- **Unary minus operator**: Native parser support for expressions like `-5 + 3`
- **Negate button (±)**: Toggle sign of current number
- **All operations**: Works with arithmetic, scientific functions, parentheses, and memory

Examples:
```
-5 + 3 = -2
(-5) × (-3) = 15
10 - (-5) = 15
sin(-1.5708) ≈ -1
sqrt((-4) + 20) = 4
```

### Expression Evaluation

The expression parser uses the Shunting Yard algorithm to:
1. Parse infix notation to tokens
2. Convert to postfix (Reverse Polish Notation)
3. Evaluate the postfix expression

Operator precedence (highest to lowest):
1. Parentheses and Functions
2. Exponentiation (^)
3. Multiplication and Division (×, ÷)
4. Addition and Subtraction (+, -)

### Error Handling

Comprehensive error handling for:
- Division by zero
- Invalid domains (sqrt of negative, log of non-positive)
- Mismatched parentheses
- Invalid factorial inputs
- Memory overflow

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Keyboard Shortcuts

- **Numbers**: 0-9
- **Operators**: +, -, *, /
- **Decimal**: .
- **Equals**: Enter
- **Clear**: Escape
- **Backspace**: Backspace
- **Parentheses**: (, )
- **Power**: ^

## Development

### Code Style

- ES6+ JavaScript
- Modular architecture
- Comprehensive JSDoc comments
- Error handling in all methods
- Input validation

### Testing Philosophy

- Unit tests for individual components
- Integration tests for component interactions
- Property-based testing concepts
- Error condition testing
- Edge case coverage

## Documentation

See the `docs/` folder for detailed documentation:

- **BUTTON-LAYOUT-IMPROVEMENTS.md**: Button layout redesign details
- **NEGATIVE-NUMBER-SUPPORT.md**: Negative number implementation
- **COMPLETE-NEGATIVE-NUMBER-SUPPORT.md**: Comprehensive negative number guide
- **TASK-13-SUMMARY.md**: Task 13 implementation summary
- **TASK-14-SUMMARY.md**: Task 14 implementation summary

## Requirements

See `.kiro/specs/scientific-calculator/requirements.md` for detailed requirements.

## Design

See `.kiro/specs/scientific-calculator/design.md` for architecture and design decisions.

## License

This project was created as part of a software development exercise.

## Acknowledgments

Built using:
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- No external dependencies
