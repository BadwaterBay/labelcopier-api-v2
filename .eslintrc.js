module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['mocha', 'chai-friendly', 'prettier'],
  rules: {
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    'prettier/prettier': 2,
  },
};
