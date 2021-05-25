/**
 * Example function to test CI/CD pipeline
 * Source: https://jestjs.io/docs/getting-started
 * @param {number} a - operand 1 to sum
 * @param {number} b - operand 2 to sum
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
  return a + b;
}

const a = 1;
const b = 2;
const c = sum(a, b);

console.log(c);
module.exports = sum;
