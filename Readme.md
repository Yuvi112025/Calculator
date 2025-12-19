# CODSOFT Calculator

A modern, feature-rich web-based calculator built with HTML, CSS, and JavaScript. This calculator offers multiple functionalities including basic arithmetic, scientific calculations, unit conversions, and equation root finding.

## Features

### 🧮 Basic Calculator
- Standard arithmetic operations (+, -, ×, ÷)
- Percentage calculations
- Sign change (±)
- Clear all (AC) functionality
- Real-time display updates

### 🔬 Scientific Functions
- Trigonometric functions: sin, cos, tan (in degrees)
- Logarithmic function: log (base 10)
- Error handling for invalid inputs

### 🔄 Unit Converter
- **Weight**: kg ↔ g ↔ lb
- **Height**: cm ↔ m ↔ ft
- **Distance**: km ↔ m ↔ mile
- **Angle**: degrees ↔ radians
- **Time**: hours ↔ minutes ↔ seconds
- **Trigonometric Ratios**: Calculate sin, cos, tan for given angles

### 📐 Equation Solver
- **Linear Equations**: Solve ax + b = 0
- **Quadratic Equations**: Solve ax² + bx + c = 0
  - Real roots
  - Complex roots (with imaginary parts)

### 📜 History Panel
- Track all calculations
- Persistent history during session
- Scrollable history list

## Technologies Used

- **HTML5**: Structure and layout
- **CSS3**: Styling with modern design (dark theme, gradients, shadows)
- **JavaScript (ES6+)**: Functionality and interactivity

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Installation
1. Clone or download the project files
2. Navigate to the `Calculator` directory
3. Open `calculator.html` in your web browser

### Usage
1. **Calculator Mode**: Perform basic and scientific calculations
2. **Unit Converter Mode**: Select conversion type and enter values
3. **Find Roots Mode**: Enter coefficients and solve equations
4. **History Tab**: View calculation history

## File Structure

```
Calculator/
├── calculator.html    # Main HTML structure
├── calculator.css     # Styling and responsive design
├── calculator.js      # JavaScript functionality
└── Readme.md         # This file
```

## Key Features Explained

### Responsive Design
- Optimized for desktop and mobile devices
- Adaptive layout that adjusts to screen size
- Touch-friendly buttons on mobile

### Error Handling
- Invalid input detection
- Division by zero prevention
- NaN (Not a Number) checks

### User Interface
- Dark theme with blue accents
- Smooth animations and transitions
- Intuitive navigation between modes
- Visual feedback on button presses

## Browser Compatibility
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing
This is a CODSOFT task project. For improvements or modifications, feel free to fork and enhance.

## License
This project is created as part of CODSOFT's web development tasks.

---

**Note**: This calculator uses `eval()` for expression evaluation. While safe for this context, avoid using in production environments with untrusted input.
