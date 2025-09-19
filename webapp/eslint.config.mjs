import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const tsRecommended = Array.isArray(tseslint.configs.recommendedTypeChecked)
  ? tseslint.configs.recommendedTypeChecked
  : [tseslint.configs.recommendedTypeChecked];

const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  fetch: 'readonly',
  RequestInit: 'readonly',
  JSX: 'readonly',
};

export default [
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'coverage/**',
      'public/**',
      'src/ai.ts',
      'src/src/**',
      '**/.vite/**'
    ],
  },
  {
    ...js.configs.recommended,
    files: ['src/pages/Pacientes.tsx', 'src/stores/patientStore.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: browserGlobals,
    },
    rules: {
      ...(js.configs.recommended.rules ?? {}),
      'no-console': 'warn',
    },
  },
  ...tsRecommended.map((config) => ({
    ...config,
    files: ['src/pages/Pacientes.tsx', 'src/stores/patientStore.ts'],
    languageOptions: {
      ...(config.languageOptions ?? {}),
      globals: {
        ...(config.languageOptions?.globals ?? {}),
        ...browserGlobals,
      },
      parserOptions: {
        ...(config.languageOptions?.parserOptions ?? {}),
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...(config.rules ?? {}),
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  })),
];
