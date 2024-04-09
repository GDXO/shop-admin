module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'standard-with-typescript'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/triple-slash-reference': 0
  }
}
