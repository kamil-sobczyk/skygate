module.exports = {
  extends: [
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ], 
  parser: '@typescript-eslint/parser',
  'env': {
    'browser': true,
    'node': true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*'],
      rules: {
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
        'import/no-cycle': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
        'no-param-reassign': 'off',
        'class-methods-use-this': 'off',
      //   'no-extra-semi': 'error',
      //   'react/no-array-index-key': 'warn',
      //   'newline-before-return': 'error',
      //   'no-unused-vars': 'warn',
      //   quotes: 'error',
      //   'linebreak-style': 'off',
      //   'no-restricted-globals': 'off',
      //   'object-curly-spacing': ['error', 'never'],
      }
    }
  ]
}