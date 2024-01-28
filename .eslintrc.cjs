// If you want to use Eslint, change the module type to commonjs in package.json

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    'jquery',
  ],
  rules: {
    'jquery/no-ajax': 2,
    'jquery/no-animate': 2,

    // Additional ES6 rules
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-const-assign': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'always'],
  },
};


