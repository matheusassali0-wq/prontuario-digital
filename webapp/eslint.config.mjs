import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const recommendedTypeChecked = Array.isArray(
  tsPlugin.configs['flat/recommended-type-checked'],
)
  ? tsPlugin.configs['flat/recommended-type-checked']
  : [tsPlugin.configs['flat/recommended-type-checked']];

const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  fetch: 'readonly',
  RequestInit: 'readonly',
  JSX: 'readonly',
};

const targetFiles = ['src/pages/Pacientes.tsx', 'src/stores/patientStore.ts'];

export default [
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'coverage/**',
      'public/**',
      'src/ai.ts',
      'src/src/**',
      '**/.vite/**',
    ],
  },
  {
    ...js.configs.recommended,
    files: targetFiles,
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
  ...recommendedTypeChecked.map((config) => ({
    ...config,
    files: targetFiles,
    languageOptions: {
      ...(config.languageOptions ?? {}),
      globals: {
        ...(config.languageOptions?.globals ?? {}),
        ...browserGlobals,
      },
      parser: tsParser,
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
