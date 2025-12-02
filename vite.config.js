import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { execSync } from 'child_process'

// Read version from package.json
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// Get git commit SHA (short version)
let gitCommit = 'unknown'
try {
  gitCommit = execSync('git rev-parse --short HEAD').toString().trim()
} catch (e) {
  console.warn('Could not get git commit SHA')
}

// Combine version with git commit
const version = `${pkg.version} (${gitCommit})`

export default defineConfig({
  plugins: [react()],
  base: '/',  // IMPORTANT: Must match Caddy path
  server: {
    port: 3000
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(version)
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  }
})
