module.exports = {
  root: true,
  ignorePatterns: ['.ref'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended',
    'prettier'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/no-anonymous-default-export': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}
