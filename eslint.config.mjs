import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

const jsConfigs = [
  js.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
];

const tsConfigs = [
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './webapp/tsconfig.json'].filter(Boolean),
        tsconfigRootDir: import.meta.dirname ?? process.cwd(),
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
];

const reactConfigs = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.recommended,
  jsxA11yPlugin.flatConfigs.recommended,
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  }
];

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      'coverage/**',
      '*.min.js',
      'public/**',
      'scripts/**',
      'medical-terms.js',
      'drc-calculator.js',
      'app.js',
      'server-full.cjs',
      'server-lite.cjs',
      'server-one.cjs',
      'src/**',
      'webapp/vite.config.ts',
      'webapp/postcss.config.cjs',
      'webapp/prettier.config.cjs',
      'webapp/src/ai.ts',
      '**/.vite/**',
      '**/logs/**',
      'webapp/data/logs-*',
      'webapp/src/src/**'
    ],
  },
  ...jsConfigs,
  ...tsConfigs,
];
