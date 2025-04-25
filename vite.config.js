import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: '_site/assets',
    rollupOptions: {
      input: {
        styles: './tailwind.css',
      },
      output: {
        assetFileNames: '[name][extname]',
      },
    },
  },
});