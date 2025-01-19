import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';




// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1100, // In kilobytes, e.g., 1000 kB
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Point to your backend server
        changeOrigin: true,  // Ensures the origin of the host header is changed to the target URL // Optional: rewrite the /api prefix
      },
    },
  },
});
