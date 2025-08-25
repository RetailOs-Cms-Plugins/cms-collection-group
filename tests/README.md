# Plugin Template Tests

This directory contains comprehensive tests for the plugin template. The tests are organized into different categories to make it easy to understand and extend.

## Test Structure

```
tests/
├── e2e/                    # End-to-end tests
├── examples/               # Simple example tests
├── fixtures/               # Test data and configurations
├── integration/            # Integration tests
├── mocks/                  # Mock objects and utilities
├── setup/                  # Test setup and configuration
├── unit/                   # Unit tests
└── utils/                  # Test utilities and helpers
```

## Test Categories

### Unit Tests (`tests/unit/`)
- Test individual functions and components in isolation
- Fast execution
- No external dependencies

### Integration Tests (`tests/integration/`)
- Test how the plugin integrates with Payload CMS
- Test configuration merging and validation
- Mock external dependencies

### End-to-End Tests (`tests/e2e/`)
- Test complete workflows
- Simulate real-world usage scenarios
- Test error handling and edge cases

### Example Tests (`tests/examples/`)
- Simple tests that demonstrate basic functionality
- Good starting point for new developers
- Show how to mock and test plugin features

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Run specific test categories
pnpm test:unit
pnpm test:integration
pnpm test:e2e

# Run tests with UI
pnpm test:ui
```

## Test Utilities

### Fixtures (`tests/fixtures/`)
Contains sample data and configurations:
- `sampleConfig`: Basic Payload configuration
- `samplePluginOptions`: Plugin options for testing
- `sampleUser`, `sampleDocument`, `sampleCollection`: Test data

### Mocks (`tests/mocks/`)
Provides mock implementations:
- `createMockPayload()`: Mock Payload instance
- `createMockConfig()`: Mock configuration generator

### Utils (`tests/utils/`)
Helper functions for testing:
- `deepClone()`: Deep copy objects for isolation
- `assertDefined()`: Assert values are not null/undefined
- `createTestId()`: Generate unique test IDs
- `wait()`: Async delay helper

## Writing New Tests

### 1. Unit Tests
```typescript
import { describe, expect, it } from 'vitest'
import { pluginTamplate } from '../../../src/index.js'

describe('My Feature', () => {
  it('should do something', () => {
    const plugin = pluginTamplate()
    expect(plugin).toBeDefined()
  })
})
```

### 2. Integration Tests
```typescript
import { describe, expect, it } from 'vitest'
import { pluginTamplate } from '../../src/index.js'
import { sampleConfig } from '../fixtures/index.js'

describe('Plugin Integration', () => {
  it('should integrate with config', () => {
    const plugin = pluginTamplate()
    const result = plugin(sampleConfig)
    expect(result).toBeDefined()
  })
})
```

### 3. E2E Tests
```typescript
import { describe, expect, it, beforeAll } from 'vitest'
import { createMockPayload } from '../mocks/index.js'

describe('E2E Workflow', () => {
  let mockPayload: any

  beforeAll(() => {
    mockPayload = createMockPayload()
  })

  it('should handle complete workflow', async () => {
    // Test complete user workflow
  })
})
```

## Test Best Practices

### 1. Test Isolation
- Each test should be independent
- Use `beforeEach` and `afterEach` for setup/cleanup
- Use `deepClone` for test data isolation

### 2. Descriptive Names
- Test descriptions should be clear and specific
- Use "should" statements: "should return valid config"
- Group related tests with `describe` blocks

### 3. Mock External Dependencies
- Mock Payload CMS APIs
- Mock file system operations
- Mock network requests

### 4. Test Edge Cases
- Test with empty/null/undefined inputs
- Test error conditions
- Test boundary values

### 5. Coverage Goals
- Aim for 80%+ coverage on critical paths
- Test both success and failure scenarios
- Test public APIs thoroughly

## Modifying Tests for Your Plugin

When adapting these tests for your specific plugin:

1. **Update fixtures** in `tests/fixtures/index.ts`:
   - Modify `sampleConfig` to include your collections/globals
   - Update `samplePluginOptions` with your plugin's options
   - Add any custom test data your plugin needs

2. **Update mocks** in `tests/mocks/index.ts`:
   - Add mocks for any APIs your plugin uses
   - Mock any external services or dependencies

3. **Customize unit tests**:
   - Test your plugin's specific functionality
   - Test configuration transformations
   - Test field additions/modifications

4. **Add integration tests**:
   - Test how your plugin modifies the Payload config
   - Test interactions with other plugins
   - Test database operations if applicable

5. **Create relevant E2E tests**:
   - Test user workflows specific to your plugin
   - Test admin UI interactions if your plugin has UI components
   - Test data flow from creation to retrieval

## Debugging Tests

### View Test Output
```bash
# Run tests with verbose output
pnpm test --reporter=verbose

# Run a specific test file
pnpm test tests/unit/plugin/plugin.test.ts

# Run tests matching a pattern
pnpm test --grep "Plugin Function"
```

### Debug with Browser
```bash
# Open test UI for interactive debugging
pnpm test:ui
```

### Coverage Reports
```bash
# Generate coverage report
pnpm test:coverage

# View coverage in browser
open coverage/index.html
```

This test structure provides a solid foundation that you can extend based on your plugin's specific requirements while maintaining good testing practices and clear organization.
