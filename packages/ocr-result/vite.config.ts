import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    legacy({
      targets: ['> 0.5%', 'ie >= 11'],
    }),
    react(),
  ],
});
