import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'path';
export default defineConfig({
  base: '/app/',
  plugins: [react()],
  resolve: { alias: { '@': resolve(__dirname, 'src'), '@contracts': path.resolve(__dirname, '../contracts/src') } },
  build: { outDir: '../public/app', emptyOutDir: true },
});
