// Simple test helpers for the plugin template

/**
 * Creates a deep copy of an object for test isolation
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Asserts that a value is defined (not null or undefined)
 */
export const assertDefined = <T>(value: null | T | undefined): T => {
  if (value === null || value === undefined) {
    throw new Error('Expected value to be defined')
  }
  return value
}

/**
 * Creates a test ID for consistent testing
 */
export const createTestId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validates that an object has required properties
 */
export const hasRequiredProps = (obj: unknown, props: string[]): boolean => {
  if (!obj || typeof obj !== 'object') {
    return false
  }

  return props.every((prop) => prop in obj)
}

/**
 * Simple mock for async operations
 */
export const mockAsync = <T>(value: T, delay = 0): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay))
}
