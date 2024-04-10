import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
})

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue']
      }
    }
  },
  ...compat.extends(
    'standard-with-typescript',
    'plugin:vue/vue3-strongly-recommended'
  ),
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      camelcase: 'off',
      '@typescript-eslint/camelcase': 'off',
      'vue/no-unused-vars': [
        'error',
        {
          ignorePattern: '^_'
        }
      ],
      // '@typescript-eslint/no-unused-vars': [
      //   'error',
      //   { varsIgnorePattern: '.*', args: 'none' }
      // ]
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
]
