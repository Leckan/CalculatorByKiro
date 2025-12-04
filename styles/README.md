# CSS Architecture Documentation

## Overview

This directory contains the modular CSS architecture for the Calculator UI Redesign. The structure follows a component-based approach with clear separation of concerns.

## Directory Structure

```
styles/
├── main.css                 # Main entry point - imports all modules
├── base/                    # Foundation styles
│   ├── reset.css           # CSS reset and normalization
│   ├── variables.css       # Design system tokens (colors, spacing, etc.)
│   └── typography.css      # Font imports and typography system
├── components/             # Component-specific styles
│   ├── calculator.css      # Calculator container styles
│   ├── display.css         # Display area styles
│   ├── buttons.css         # Button styles
│   └── indicators.css      # Mode and memory indicator styles
├── animations/             # Animation definitions
│   ├── entrance.css        # Page load animations
│   ├── interactions.css    # User interaction animations
│   └── transitions.css     # State transition animations
└── responsive/             # Responsive design
    └── breakpoints.css     # Media queries for different screen sizes
```

## Design System

### Colors
All colors are defined as CSS custom properties in `base/variables.css`:
- Primary colors: Purple/blue gradient theme
- Button colors: Distinct colors for numbers, operators, functions, and controls
- Semantic colors: Error, success, warning states

### Typography
- **Display Font**: Inter (UI elements, buttons)
- **Monospace Font**: JetBrains Mono (calculator display)
- Font sizes follow a consistent scale from xs (12px) to 4xl (36px)

### Spacing
Spacing follows a consistent scale based on 4px increments (space-1 through space-12)

### Animation Timings
- Fast: 150ms (button interactions)
- Normal: 250ms (display updates)
- Slow: 350ms (complex transitions)
- Entrance: 600ms (page load animations)

## Usage

Import the main stylesheet in your HTML:
```html
<link rel="stylesheet" href="styles/main.css">
```

The main.css file automatically imports all necessary modules in the correct order.

## Accessibility

- Supports `prefers-reduced-motion` for users who prefer minimal animations
- Supports `prefers-contrast: high` for enhanced visibility
- Includes focus-visible styles for keyboard navigation
- Print styles for better printing experience

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS Custom Properties (CSS Variables)
- Backdrop-filter with fallbacks for unsupported browsers
- CSS Animations and Transitions
