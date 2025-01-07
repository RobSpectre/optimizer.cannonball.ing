import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true, // Allows using Jest-like global APIs
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './vitest.setup.js', // Path to setup file (optional)
    coverage: {
      provider: 'istanbul', // Coverage provider
      reporter: ['text', 'json', 'html'], // Coverage reports
      exclude: ['node_modules/', 'tests/'], // Exclude files from coverage
    }
  },
  plugins: [vue()],
})
