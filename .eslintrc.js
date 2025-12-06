module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '**/test/**', '**/dist/**', '*.bak'],
  reportUnusedDisableDirectives: true,
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_[^_].*$|^_$',
        varsIgnorePattern: '^_[^_].*$|^_$',
        caughtErrorsIgnorePattern: '^_[^_].*$|^_$',
      },
    ],
    'max-len': ['warn', { code: 100, tabWidth: 2 }],
    'max-lines-per-function': ['warn', { max: 80, skipBlankLines: true, skipComments: true }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extraneous-class': 'off',
  },
};
