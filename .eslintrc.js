module.exports = {
  root: true,

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },

  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],

  plugins: [
    // required to lint *.jsx files
    'react',
    'lodash'
  ],

  overrides: [
    {
      files: ['*.jsx'],
      rules: {
        'indent': 'off'
      }
    }
  ],

  rules: {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'always'],
    curly: ['error', 'all'],
    'no-var': 'error',
    'key-spacing': 'error',
    quotes: ['error', 'single'],
    'space-infix-ops': 'error',
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'brace-style': ['error', 'stroustrup'],
    'template-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'generator-star-spacing': ['error', 'after'],
    'no-return-assign': 0,
    'func-call-spacing': ['error', 'never'],
    'dot-location': ['error', 'property'],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0 }],
    'operator-linebreak': ['error', 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'react/prop-types': 'off',
    indent: ['error', 2, {
      'SwitchCase': 1,
      'VariableDeclarator': 1,
      'outerIIFEBody': 1,
      'MemberExpression': 1,
      'FunctionDeclaration': { 'parameters': 'first', 'body': 1 },
      'FunctionExpression': { 'parameters': 'first', 'body': 1 },
      'CallExpression': { 'arguments': 1 },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 1,
      'flatTernaryExpressions': false,
      'ignoreComments': false
    }],

    // requires or disallows trailing commas
    'comma-dangle': 'off',

    // enforces consistent spacing after the // or /* in a comment.
    'spaced-comment': 'error',
  }
};