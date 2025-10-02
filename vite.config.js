import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/hello/',  // IMPORTANT: Must match Caddy path
  server: {
    port: 3000
  }
})
