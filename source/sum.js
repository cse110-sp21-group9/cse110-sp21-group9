/**
 * Example function to test CI/CD pipeline
 * @param {number} a - operand 1 to sum
 * @param {number} b - operand 2 to sum
 * @returns {number} Sum of a and b 
 */
function sum(a, b) {
    return a + b;
}

let a = 1;
let b = 2;
let c = sum(a, b); 
console.log(c);
module.exports = sum;
