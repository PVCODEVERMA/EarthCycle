import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Use @ for src
    },
  },
  server: {
    port: 5173, // Optional: set frontend dev server port
    proxy: {
      // Proxy API requests to your backend server (Node.js)
      '/api': {
        target: 'http://localhost:5000', // Change this to your backend port
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
