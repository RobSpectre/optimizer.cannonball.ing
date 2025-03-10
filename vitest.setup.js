// vitest.setup.js
import { beforeEach, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/vue'

// Runs before each test
beforeEach(() => {
  // Reset or initialize things here if needed
})

// Runs after each test
afterEach(() => {
  vi.resetAllMocks()
  cleanup()
})
