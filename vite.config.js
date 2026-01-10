import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/core/shared'),
      '@ui': path.resolve(__dirname, './src/core/ui'),
      '@components': path.resolve(__dirname, './src/core/ui/components'),
      '@componentsGlobales': path.resolve(__dirname, './src/core/ui/components/ComponentesGlobales'),
    },
  },
});
