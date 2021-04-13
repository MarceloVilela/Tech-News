module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.native.js'],
      },
    },
  },
  rules: {
    'no-use-before-define': ['off', { functions: true, classes: true }],
    '@typescript-eslint': 'error',
    'prettier/prettier': 'error',
    'import/extensions': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'no-console': ['error', { allow: ['tron'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': ['error', { argsIgnorePattern: '_', varsIgnorePattern: '_' }],
    'comma-dangle': ['off', 'always'],
    indent: ['off', 2],
    'object-curly-newline': 'off',
  },
};
