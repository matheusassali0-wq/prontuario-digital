import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      'coverage/**',
      'exports/**',
      'data/**',
      'certs/**',
      '**/.vite/**',
      '**/logs/**',
      'webapp/data/logs-*'
    ],
  },
  js.configs.recommended,
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
