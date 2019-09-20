module.exports = {
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['sort-imports-es6-autofix', '@typescript-eslint', 'prettier'],
  rules: {
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'import/order': ['error', { 'groups': ['builtin', 'external', 'parent', 'sibling', 'index'] }],
    'import/no-extraneous-dependencies': ['error', {'devDependencies': ['**/*.test.ts', '**/*.spec.ts']}],

    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,

    'prettier/prettier': 'error',
    'sort-imports-es6-autofix/sort-imports-es6': [2, {
      'ignoreCase': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    }],
    '@typescript-eslint/explicit-function-return-type': ['error', { allowHigherOrderFunctions: true, allowExpressions: true }],
    '@typescript-eslint/no-explicit-any': 0
  },
};
