# Scientific Calculator Design Document

## Overview

The Scientific Calculator will be implemented as a web-based application using HTML, CSS, and JavaScript. The architecture follows a Model-View-Controller (MVC) pattern to separate concerns between calculation logic, user interface, and application control flow. The calculator will provide a responsive interface with buttons for all operations and a display area for input and results.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│           User Interface (View)          │
│  - Display Component                     │
│  - Button Grid                           │
│  - Mode Indicators                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│        Controller                        │
│  - Input Handler                         │
│  - Operation Dispatcher                  │
│  - Display Formatter                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│        Calculator Engine (Model)         │
│  - Arithmetic Operations                 │
│  - Scientific Functions                  │
│  - Expression Parser                     │
│  - Memory Manager                        │
│  - State Manager                         │
└─────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **No external dependencies**: Pure JavaScript implementation
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Components and Interfaces

### 1. Calculator Engine (Model)

The core calculation logic component.

#### CalculatorEngine Class

```javascript
class CalculatorEngine {
  constructor()
  
  // Arithmetic operations
  add(a, b): number
  subtract(a, b): number
  multiply(a, b): number
  divide(a, b): number | Error
  power(base, exponent): number
  
  // Scientific functions
  sin(angle, angleMode): number
  cos(angle, angleMode): number
  tan(angle, angleMode): number
  ln(value): number | Error
  log10(value): number | Error
  exp(value): number
  sqrt(value): number | Error
  factorial(n): number | Error
  
  // Utility functions
  toRadians(degrees): number
  toDegrees(radians): number
}
```

#### ExpressionParser Class

Handles parsing and evaluating mathematical expressions with proper operator precedence.

```javascript
class ExpressionParser {
  constructor(calculatorEngine)
  
  parse(expression): Token[]
  evaluate(tokens): number | Error
  validateParentheses(expression): boolean
}
```

#### MemoryManager Class

Manages calculator memory operations.

```javascript
class MemoryManager {
  constructor()
  
  store(value): void
  recall(): number
  clear(): void
  add(value): void
  hasValue(): boolean
}
```

#### StateManager Class

Manages calculator state including current input, last result, and operation history.

```javascript
class StateManager {
  constructor()
  
  setInputBuffer(value): void
  getInputBuffer(): string
  clearInputBuffer(): void
  backspace(): void
  
  setLastResult(value): number
  getLastResult(): number
  
  setAngleMode(mode): void  // 'deg' or 'rad'
  getAngleMode(): string
  
  reset(): void
}
```

### 2. Controller

Coordinates between the view and model, handling user interactions.

#### CalculatorController Class

```javascript
class CalculatorController {
  constructor(engine, stateManager, memoryManager, view)
  
  handleNumberInput(digit): void
  handleOperatorInput(operator): void
  handleScientificFunction(functionName): void
  handleEquals(): void
  handleClear(): void
  handleAllClear(): void
  handleBackspace(): void
  handleMemoryStore(): void
  handleMemoryRecall(): void
  handleMemoryClear(): void
  handleMemoryAdd(): void
  handleAngleModeToggle(): void
  handleDecimalPoint(): void
  handleParenthesis(type): void  // 'open' or 'close'
  
  updateDisplay(): void
  showError(message): void
}
```

### 3. View (User Interface)

Renders the calculator interface and captures user input.

#### CalculatorView Class

```javascript
class CalculatorView {
  constructor(containerId)
  
  render(): void
  updateDisplay(value): void
  updateAngleModeIndicator(mode): void
  updateMemoryIndicator(hasValue): void
  updateParenthesisLevel(level): void
  showError(message): void
  clearError(): void
  
  bindNumberButton(handler): void
  bindOperatorButton(handler): void
  bindFunctionButton(handler): void
  bindControlButton(handler): void
}
```

## Data Models

### Calculator State

```javascript
{
  inputBuffer: string,           // Current input being typed
  expression: string,            // Full expression being built
  lastResult: number | null,     // Last calculated result
  angleMode: 'deg' | 'rad',      // Current angle mode
  memory: number,                // Memory value
  parenthesisLevel: number,      // Current nesting level
  error: string | null           // Current error message
}
```

### Operation Token

```javascript
{
  type: 'number' | 'operator' | 'function' | 'parenthesis',
  value: string | number,
  precedence: number  // For operator precedence
}
```

## User Interface Layout

### Display Area
- Main display: Shows current input or result (right-aligned)
- Secondary display: Shows full expression being built
- Mode indicators: Angle mode (DEG/RAD), Memory (M), Parenthesis level

### Button Layout

```
┌─────────────────────────────────────────────────┐
│  Expression: [                                ] │
│  Display:    [                          0     ] │
│  [DEG] [M] [(0)]                                │
├─────────────────────────────────────────────────┤
│  [MC]  [MR]  [M+]  [MS]  [AC]  [C]   [⌫]  [÷]  │
│  [sin] [cos] [tan] [(]   [)]   [^]   [7]  [8]  │
│  [ln]  [log] [√]   [!]   [π]   [e]   [4]  [5]  │
│  [9]   [×]   [6]   [-]   [3]   [+]   [1]  [2]  │
│  [0]   [.]   [=]                                │
└─────────────────────────────────────────────────┘
```

## Error Handling

### Error Types

1. **Division by Zero**: Display "Error: Division by zero"
2. **Invalid Input**: Display "Error: Invalid input"
3. **Domain Error**: Display "Error: Invalid domain" (e.g., sqrt of negative, log of non-positive)
4. **Overflow**: Display "Error: Overflow"
5. **Mismatched Parentheses**: Display "Error: Mismatched parentheses"
6. **Factorial Error**: Display "Error: Invalid factorial input"

### Error Recovery

- Errors clear the current operation but preserve memory
- User can press AC to fully reset
- User can press C to clear error and start new calculation
- Invalid operations do not modify the calculator state

## Expression Evaluation Strategy

### Operator Precedence (highest to lowest)

1. Parentheses: `( )`
2. Functions: `sin`, `cos`, `tan`, `ln`, `log`, `√`, `!`
3. Exponentiation: `^`
4. Multiplication and Division: `×`, `÷`
5. Addition and Subtraction: `+`, `-`

### Evaluation Algorithm

The calculator uses the Shunting Yard algorithm to convert infix notation to postfix (Reverse Polish Notation), then evaluates the postfix expression:

1. Parse input into tokens
2. Convert to postfix using operator precedence
3. Evaluate postfix expression using a stack
4. Return result or error

## Testing Strategy

### Unit Testing

Test each component in isolation:

- **CalculatorEngine**: Test each mathematical function with valid inputs, boundary cases, and invalid inputs
- **ExpressionParser**: Test parsing and evaluation with various expressions, operator precedence, and parentheses
- **MemoryManager**: Test all memory operations
- **StateManager**: Test state transitions and data integrity

### Integration Testing

Test component interactions:

- Controller coordinating between engine and view
- Expression evaluation with multiple operations
- Error propagation through the system
- State persistence across operations

### User Interface Testing

- Button click handling
- Display updates
- Mode indicator updates
- Error message display
- Responsive layout on different screen sizes

### Test Cases by Requirement

- **Requirement 1**: Test all basic arithmetic operations including division by zero
- **Requirement 2**: Test trigonometric functions in both degree and radian modes
- **Requirement 3**: Test logarithmic and exponential functions with valid and invalid inputs
- **Requirement 4**: Test square root and factorial with valid and invalid inputs
- **Requirement 5**: Test clear, all clear, and backspace operations
- **Requirement 6**: Test all memory operations
- **Requirement 7**: Test display formatting, precision, and scientific notation
- **Requirement 8**: Test parentheses matching and nested expressions

## Implementation Considerations

### Precision and Rounding

- Use JavaScript's native number type (IEEE 754 double precision)
- Display up to 10 significant digits
- Round results to avoid floating-point artifacts
- Switch to scientific notation for very large or very small numbers

### Performance

- All operations should complete in under 10ms
- Expression parsing should handle expressions up to 1000 characters
- No blocking operations in the UI thread

### Accessibility

- Keyboard support for all operations
- ARIA labels for screen readers
- High contrast mode support
- Focus indicators for keyboard navigation

### Browser Compatibility

- Use standard JavaScript features (ES6+)
- Avoid experimental APIs
- Test on major browsers
- Provide fallbacks for older browsers if needed
