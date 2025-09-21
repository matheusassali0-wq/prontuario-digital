import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const jsConfigs = [
  {
    ...js.configs.recommended,
    files: ['server/server-pro.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      ...(js.configs.recommended.rules ?? {}),
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];

const tsRecommended = Array.isArray(tseslint.configs.recommendedTypeChecked)
  ? tseslint.configs.recommendedTypeChecked
  : [tseslint.configs.recommendedTypeChecked];

const tsConfigs = tsRecommended.map((config) => ({
  ...config,
  files: ['webapp/src/pages/**/*.tsx', 'webapp/src/stores/**/*.ts'],
  languageOptions: {
    ...(config.languageOptions ?? {}),
    parserOptions: {
      ...(config.languageOptions?.parserOptions ?? {}),
      project: ['./webapp/tsconfig.json'],
      tsconfigRootDir: import.meta.dirname ?? process.cwd(),
    },
  },
  rules: {
    ...(config.rules ?? {}),
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',

  },
}));

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
