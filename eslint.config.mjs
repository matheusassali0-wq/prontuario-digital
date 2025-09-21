import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

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

const recommendedTypeChecked = Array.isArray(
  tsPlugin.configs['flat/recommended-type-checked'],
)
  ? tsPlugin.configs['flat/recommended-type-checked']
  : [tsPlugin.configs['flat/recommended-type-checked']];

const tsFiles = ['webapp/src/pages/**/*.tsx', 'webapp/src/stores/**/*.ts'];

const tsConfigs = recommendedTypeChecked.map((config) => ({
  ...config,
  files: tsFiles,
  languageOptions: {
    ...(config.languageOptions ?? {}),
    parser: tsParser,
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
      'webapp/src/src/**',
    ],
  },
  ...jsConfigs,
  ...tsConfigs,
];
