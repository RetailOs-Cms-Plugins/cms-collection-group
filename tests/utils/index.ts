import { vi } from 'vitest'

// Test utility functions for plugin template tests

/**
 * Waits for a specified number of milliseconds
 * Useful for testing async operations
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Creates a mock function that resolves after a delay
 */
export const createAsyncMock = <T>(returnValue: T, delay = 0) => {
  return vi
    .fn()
    .mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(returnValue), delay)),
    )
}

/**
 * Validates that an object has required Payload config properties
 */
export const isValidPayloadConfig = (config: unknown): boolean => {
  return !!(
    config &&
    typeof config === 'object' &&
    'secret' in config &&
    typeof config.secret === 'string' &&
    'db' in config &&
    config.db !== undefined &&
    'collections' in config &&
    Array.isArray(config.collections)
  )
}

// Re-export from testHelpers
export {
  assertDefined,
  createTestId,
  deepClone,
  hasRequiredProps,
  mockAsync,
} from './testHelpers.js'
