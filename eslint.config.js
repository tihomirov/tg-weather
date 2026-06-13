import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2], // 2-space indentation
      '@stylistic/semi': ['error', 'always'], // Require semicolons
      '@stylistic/space-before-function-paren': ['error', 'never'], // e.g., function myFunc() {}
      '@stylistic/object-curly-spacing': ['error', 'always'], // e.g., { foo: 'bar' }
      '@stylistic/quotes': ['error', 'single', {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    }
  },
])
