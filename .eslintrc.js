const resolve = require('path').resolve;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  plugins: [
    'eslint-plugin-import',
    'eslint-plugin-node',
    'eslint-plugin-promise',
    'eslint-plugin-standard'
  ],
  // add your custom rules here
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never'
    }],
    'no-console': ['error', {
      allow: ['log', 'warn', 'error']
    }],
    'no-underscore-dangle': ['error', {
      allow: ['_parent']
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
