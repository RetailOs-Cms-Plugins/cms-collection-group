import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { afterEach, beforeAll, expect, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock globals for testing environment
beforeAll(() => {
  // Mock window object if needed for browser environment tests
  Object.defineProperty(window, 'PayloadConfig', {
    value: {},
    writable: true,
  })
})

// Mock fetch globally for network requests
global.fetch = vi.fn()

// Mock Payload modules to avoid dependency issues in tests
vi.mock('payload', () => ({
  getPayload: vi.fn(),
  Payload: vi.fn(),
}))

// Custom matchers for better test assertions
expect.extend({
  toBeValidPayloadConfig(received) {
    const hasRequiredProps =
      received &&
      typeof received.secret === 'string' &&
      received.db !== undefined &&
      Array.isArray(received.collections)

    return {
      message: () => `expected ${received} to be a valid Payload config`,
      pass: hasRequiredProps,
    }
  },
})
