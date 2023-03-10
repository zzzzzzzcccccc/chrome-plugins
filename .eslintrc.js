const IGNORE = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier', 'jest', 'react', 'react-hooks'],
  rules: {
    semi: ERROR,
    'max-len': ['error', { code: 160 }],
    'react/jsx-filename-extension': [ERROR, { extensions: ['.ts', '.tsx', '.json', '.js', 'jsx'] }],
    'import/extensions': IGNORE,
    'import/prefer-default-export': IGNORE,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARN,
    'react/display-name': IGNORE,
    '@typescript-eslint/no-explicit-any': IGNORE,
  },
};
