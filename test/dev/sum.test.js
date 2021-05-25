// Example test for CI/CD pipeline
// Source: https://jestjs.io/docs/getting-started
const sum = require('../../source/sum')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
