/**
 * ExpressionParser - Parses and evaluates mathematical expressions
 * Uses the Shunting Yard algorithm to convert infix notation to postfix (RPN)
 * and then evaluates the postfix expression
 */
class ExpressionParser {
    constructor(calculatorEngine) {
        this.engine = calculatorEngine;
        
        // Operator precedence (higher number = higher precedence)
        this.precedence = {
            '+': 1,
            '-': 1,
            '×': 2,
            '÷': 2,
            '*': 2,  // Alternative multiplication symbol
            '/': 2,  // Alternative division symbol
            '^': 3
        };
        
        // Right-associative operators
        this.rightAssociative = new Set(['^']);
        
        // Supported functions
        this.functions = new Set([
            'sin', 'cos', 'tan', 'ln', 'log', 'sqrt', 'exp', 'factorial'
        ]);
    }

    /**
     * Validate parentheses in an expression
     * @param {string} expression - The expression to validate
     * @returns {boolean} True if parentheses are balanced and within depth limit
     * @throws {Error} If parentheses are mismatched or exceed nesting limit
     */
    validateParentheses(expression) {
        let level = 0;
        const maxLevel = 10;
        
        for (let char of expression) {
            if (char === '(') {
                level++;
                if (level > maxLevel) {
                    throw new Error('Mismatched parentheses');
                }
            } else if (char === ')') {
                level--;
                if (level < 0) {
                    throw new Error('Mismatched parentheses');
                }
            }
        }
        
        if (level !== 0) {
            throw new Error('Mismatched parentheses');
        }
        
        return true;
    }

    /**
     * Parse expression string into tokens
     * @param {string} expression - The expression to parse
     * @returns {Array} Array of token objects
     */
    parse(expression) {
        // First validate parentheses
        this.validateParentheses(expression);
        
        const tokens = [];
        let i = 0;
        
        while (i < expression.length) {
            const char = expression[i];
            
            // Skip whitespace
            if (char === ' ') {
                i++;
                continue;
            }
            
            // Handle numbers (including decimals and negative numbers)
            if (this.isDigit(char) || (char === '.' && i + 1 < expression.length && this.isDigit(expression[i + 1]))) {
                let numStr = '';
                while (i < expression.length && (this.isDigit(expression[i]) || expression[i] === '.')) {
                    numStr += expression[i];
                    i++;
                }
                tokens.push({
                    type: 'number',
                    value: parseFloat(numStr)
                });
                continue;
            }
            
            // Handle operators (including unary minus)
            if (this.isOperator(char)) {
                // Check if this is a unary minus (negative number)
                // Unary minus occurs:
                // 1. At the start of expression
                // 2. After an opening parenthesis
                // 3. After another operator
                // 4. After a function
                const isUnaryMinus = char === '-' && (
                    tokens.length === 0 ||
                    tokens[tokens.length - 1].type === 'parenthesis' && tokens[tokens.length - 1].value === '(' ||
                    tokens[tokens.length - 1].type === 'operator' ||
                    tokens[tokens.length - 1].type === 'function'
                );
                
                if (isUnaryMinus) {
                    // Parse the negative number
                    i++; // Skip the minus sign
                    
                    // Skip whitespace after minus
                    while (i < expression.length && expression[i] === ' ') {
                        i++;
                    }
                    
                    // Now parse the number
                    if (i < expression.length && (this.isDigit(expression[i]) || expression[i] === '.')) {
                        let numStr = '-';
                        while (i < expression.length && (this.isDigit(expression[i]) || expression[i] === '.')) {
                            numStr += expression[i];
                            i++;
                        }
                        tokens.push({
                            type: 'number',
                            value: parseFloat(numStr)
                        });
                        continue;
                    } else {
                        // If no number follows, treat as regular operator
                        tokens.push({
                            type: 'operator',
                            value: '-',
                            precedence: this.precedence['-']
                        });
                        continue;
                    }
                } else {
                    // Regular binary operator
                    tokens.push({
                        type: 'operator',
                        value: char,
                        precedence: this.precedence[char]
                    });
                    i++;
                    continue;
                }
            }
            
            // Handle parentheses
            if (char === '(' || char === ')') {
                tokens.push({
                    type: 'parenthesis',
                    value: char
                });
                i++;
                continue;
            }
            
            // Handle functions
            if (this.isLetter(char)) {
                let funcName = '';
                while (i < expression.length && this.isLetter(expression[i])) {
                    funcName += expression[i];
                    i++;
                }
                
                if (this.functions.has(funcName)) {
                    tokens.push({
                        type: 'function',
                        value: funcName
                    });
                } else {
                    throw new Error(`Unknown function: ${funcName}`);
                }
                continue;
            }
            
            throw new Error(`Invalid character: ${char}`);
        }
        
        return tokens;
    }

    /**
     * Convert infix tokens to postfix notation using Shunting Yard algorithm
     * @param {Array} tokens - Array of token objects
     * @returns {Array} Array of tokens in postfix notation
     */
    infixToPostfix(tokens) {
        const output = [];
        const operatorStack = [];
        
        for (let token of tokens) {
            if (token.type === 'number') {
                output.push(token);
            } else if (token.type === 'function') {
                operatorStack.push(token);
            } else if (token.type === 'operator') {
                while (
                    operatorStack.length > 0 &&
                    operatorStack[operatorStack.length - 1].type !== 'parenthesis' &&
                    (
                        operatorStack[operatorStack.length - 1].type === 'function' ||
                        (
                            operatorStack[operatorStack.length - 1].precedence > token.precedence ||
                            (
                                operatorStack[operatorStack.length - 1].precedence === token.precedence &&
                                !this.rightAssociative.has(token.value)
                            )
                        )
                    )
                ) {
                    output.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else if (token.type === 'parenthesis') {
                if (token.value === '(') {
                    operatorStack.push(token);
                } else if (token.value === ')') {
                    while (
                        operatorStack.length > 0 &&
                        operatorStack[operatorStack.length - 1].value !== '('
                    ) {
                        output.push(operatorStack.pop());
                    }
                    
                    if (operatorStack.length === 0) {
                        throw new Error('Mismatched parentheses');
                    }
                    
                    operatorStack.pop(); // Remove the '('
                    
                    // If there's a function on top of the stack, pop it to output
                    if (
                        operatorStack.length > 0 &&
                        operatorStack[operatorStack.length - 1].type === 'function'
                    ) {
                        output.push(operatorStack.pop());
                    }
                }
            }
        }
        
        // Pop remaining operators
        while (operatorStack.length > 0) {
            const op = operatorStack.pop();
            if (op.type === 'parenthesis') {
                throw new Error('Mismatched parentheses');
            }
            output.push(op);
        }
        
        return output;
    }

    /**
     * Evaluate postfix expression
     * @param {Array} postfixTokens - Array of tokens in postfix notation
     * @param {string} angleMode - Angle mode for trigonometric functions ('deg' or 'rad')
     * @returns {number} Result of the evaluation
     */
    evaluatePostfix(postfixTokens, angleMode = 'rad') {
        const stack = [];
        
        for (let token of postfixTokens) {
            if (token.type === 'number') {
                stack.push(token.value);
            } else if (token.type === 'operator') {
                if (stack.length < 2) {
                    throw new Error('Invalid expression');
                }
                
                const b = stack.pop();
                const a = stack.pop();
                let result;
                
                switch (token.value) {
                    case '+':
                        result = this.engine.add(a, b);
                        break;
                    case '-':
                        result = this.engine.subtract(a, b);
                        break;
                    case '×':
                    case '*':
                        result = this.engine.multiply(a, b);
                        break;
                    case '÷':
                    case '/':
                        result = this.engine.divide(a, b);
                        break;
                    case '^':
                        result = this.engine.power(a, b);
                        break;
                    default:
                        throw new Error(`Unknown operator: ${token.value}`);
                }
                
                stack.push(result);
            } else if (token.type === 'function') {
                if (stack.length < 1) {
                    throw new Error('Invalid expression');
                }
                
                const arg = stack.pop();
                let result;
                
                switch (token.value) {
                    case 'sin':
                        result = this.engine.sin(arg, angleMode);
                        break;
                    case 'cos':
                        result = this.engine.cos(arg, angleMode);
                        break;
                    case 'tan':
                        result = this.engine.tan(arg, angleMode);
                        break;
                    case 'ln':
                        result = this.engine.ln(arg);
                        break;
                    case 'log':
                        result = this.engine.log10(arg);
                        break;
                    case 'sqrt':
                        result = this.engine.sqrt(arg);
                        break;
                    case 'exp':
                        result = this.engine.exp(arg);
                        break;
                    case 'factorial':
                        result = this.engine.factorial(arg);
                        break;
                    default:
                        throw new Error(`Unknown function: ${token.value}`);
                }
                
                stack.push(result);
            }
        }
        
        if (stack.length !== 1) {
            throw new Error('Invalid expression');
        }
        
        return stack[0];
    }

    /**
     * Evaluate a mathematical expression
     * @param {string} expression - The expression to evaluate
     * @param {string} angleMode - Angle mode for trigonometric functions ('deg' or 'rad')
     * @returns {number} Result of the evaluation
     */
    evaluate(expression, angleMode = 'rad') {
        const tokens = this.parse(expression);
        const postfixTokens = this.infixToPostfix(tokens);
        return this.evaluatePostfix(postfixTokens, angleMode);
    }

    /**
     * Helper method to check if a character is a digit
     * @param {string} char - Character to check
     * @returns {boolean} True if character is a digit
     */
    isDigit(char) {
        return char >= '0' && char <= '9';
    }

    /**
     * Helper method to check if a character is a letter
     * @param {string} char - Character to check
     * @returns {boolean} True if character is a letter
     */
    isLetter(char) {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
    }

    /**
     * Helper method to check if a character is an operator
     * @param {string} char - Character to check
     * @returns {boolean} True if character is an operator
     */
    isOperator(char) {
        return this.precedence.hasOwnProperty(char);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExpressionParser;
}
