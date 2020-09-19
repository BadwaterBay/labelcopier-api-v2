module.exports = {
  env: {
    browser: true,
    node: true,
    'shared-node-browser': true,
    es2020: true,
    mocha: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 2,
  },
  overrides: [
    {
      files: ['*.spec.js', '*.test.js'],
      rules: {
        'func-names': 0,
      },
    },
  ],
  plugins: ['mocha', 'chai-friendly', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:mocha/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
};
