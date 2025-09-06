import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';

  return {
    plugins: [react()],
    base: '/', // Netlify için root path
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
