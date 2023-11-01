import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // e.g., 'mywebsite.local'
    port: 3000, // e.g., 8080
    proxy: {
      '/api': 'http://localhost:5500', // Forward requests under /api to the API endpoint
    },
  },
})
