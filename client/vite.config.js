// frontend/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // This is the proxy configuration
    proxy: {
      // Any request starting with /api will be forwarded
      '/api': {
        // The target is your backend server's address
        target: 'http://localhost:5000', // <-- Make sure this is the port your backend runs on!
        changeOrigin: true, // Recommended for this setup
      },
    },
  },
})