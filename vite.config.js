import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for our product dashboard
// Using Vite because it's blazing fast and great for modern React development
export default defineConfig({
  plugins: [react()],
  test: {
    // Setting up testing environment with jsdom for React component testing
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
  server: {
    // Dev server runs on port 3000, just like create-react-app
    port: 3000,
    open: true
  },
  build: {
    // Optimizing build output for production
    outDir: 'dist',
    sourcemap: true,
  }
})