import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
  base: '/app/',
  plugins: [react()],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  build: { outDir: '../public/app', emptyOutDir: true },
});
