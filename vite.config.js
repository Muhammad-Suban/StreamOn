import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   server:{
    proxy: {
      '/api': 'https://backend-mega-stream-production.up.railway.app',
      '/api': 'http://localhost:8000',
    },
  },
  plugins: [react()],
})
