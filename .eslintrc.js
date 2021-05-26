module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
	"ignorePatterns": [".eslintrc.js"],
  rules: {
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'no-var': 'error',
    'prefer-const': 'warn',
		'no-unused-vars': 'warn',
  }
}
