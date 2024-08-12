module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Possible Errors
    'no-console': 'warn', // Warn when console statements are used
    'no-debugger': 'error', // Disallow debugger statements

    // Best Practices
    eqeqeq: ['error', 'always'], // Enforce strict equality (=== and !==)
    curly: ['error', 'all'], // Enforce consistent brace style for all control statements
    'no-eval': 'error', // Disallow the use of eval()

    // Variables
    'no-unused-vars': 'warn', // Warn when variables are declared but not used
    'no-undef': 'error', // Disallow the use of undeclared variables

    // Stylistic Issues
    semi: ['error', 'always'], // Require semicolons at the end of statements
    quotes: ['error', 'single'], // Enforce single quotes for strings
    indent: ['error', 2], // Enforce 2-space indentation
    'no-trailing-spaces': 'error', // Disallow trailing whitespace at the end of lines
    'comma-dangle': ['error', 'always-multiline'], // Enforce trailing commas in multiline object literals

    // ES6
    'prefer-const': 'error', // Prefer const over let for variables that are not reassigned
    'no-var': 'error', // Disallow var declarations; use let or const instead
    'arrow-spacing': ['error', { before: true, after: true }], // Enforce consistent spacing before/after arrow functions
  },
};
