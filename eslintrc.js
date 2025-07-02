module.exports = {
  root: true,  // Ensures the configuration is applied to the root directory
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Example rule: turn off "any"
    // Add more custom rules below
  },
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
};
