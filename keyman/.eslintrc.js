module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eol-last': 'off',
    'space-before-function-paren': 'off',
    'eqeqeq': 'off',
    'vue/require-v-for-key': 'off',
    'vue/no-parsing-error': 'off',
    'no-undef': 'off',
    'spaced-comment': 'off',
    'no-redeclare': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'standard/no-callback-literal': 'off',
    'no-unused-expressions': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
