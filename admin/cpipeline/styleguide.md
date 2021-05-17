# Powellmon JS Style Guide/JSDoc Conventions

## Style Guide
We are using the [JavaScript Standard Style Guide](https://standardjs.com/rules.html) with the following rule changes: 
- Semicolons required at the end of each statement
- No space before function parameters in function declarations
- No using ```var``` for variable declarations
- ```const``` is preferred for variables that aren't reassigned, but not required

## JSDoc conventions
Follow this example for JSDoc conventions
```
/** Class representing a point. */
class Point {
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        // ...
    }

    /**
     * Get the x value.
     * @return {number} The x value.
     */
    getX() {
        // ...
    }

    /**
     * Get the y value.
     * @return {number} The y value.
     */
    getY() {
        // ...
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {string} str - The string containing two comma-separated numbers.
     * @return {Point} A Point object.
     */
    static fromString(str) {
        // ...
    }
```