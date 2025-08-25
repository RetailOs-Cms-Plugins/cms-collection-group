import { describe, expect, it } from 'vitest'

import { pluginTamplate } from '../../src/index.js'
import { sampleConfig, samplePluginOptions } from '../fixtures/index.js'
import { createMockPayload } from '../mocks/index.js'

describe('Plugin Template Integration Tests', () => {
  describe('Plugin Integration with Payload', () => {
    it('should integrate with basic Payload config', () => {
      const plugin = pluginTamplate()
      const result = plugin(sampleConfig)

      expect(result).toBeDefined()
      expect(result.secret).toBe(sampleConfig.secret)
      expect(result.collections).toEqual(sampleConfig.collections)
      expect(result.globals).toEqual(sampleConfig.globals)
    })

    it('should work with plugin options', () => {
      const plugin = pluginTamplate(samplePluginOptions)
      const result = plugin(sampleConfig)

      expect(result).toBeDefined()
      // Since the current implementation just returns the config as-is,
      // we expect the same structure
      expect(result).toEqual(sampleConfig)
    })

    it('should preserve config integrity', () => {
      const originalConfig = JSON.parse(JSON.stringify(sampleConfig))
      const plugin = pluginTamplate(samplePluginOptions)
      const result = plugin(sampleConfig)

      // The original config should remain unchanged
      expect(sampleConfig).toEqual(originalConfig)
      // The result should be a separate object
      expect(result).not.toBe(sampleConfig)
    })
  })

  describe('Mock Payload Integration', () => {
    it('should work with mocked Payload instance', () => {
      const mockPayload = createMockPayload()

      expect(mockPayload.collections).toBeDefined()
      expect(mockPayload.auth).toBeDefined()
      expect(mockPayload.globals).toBeDefined()

      expect(typeof mockPayload.collections.find).toBe('function')
      expect(typeof mockPayload.collections.create).toBe('function')
      expect(typeof mockPayload.auth.login).toBe('function')
    })

    it('should handle collection operations', async () => {
      const mockPayload = createMockPayload()

      // Mock a find operation
      mockPayload.collections.find.mockResolvedValue({
        docs: [],
        totalDocs: 0,
      })

      const result = await mockPayload.collections.find({
        collection: 'posts',
      })

      expect(result).toBeDefined()
      expect(result.docs).toEqual([])
      expect(result.totalDocs).toBe(0)
    })

    it('should handle auth operations', async () => {
      const mockPayload = createMockPayload()

      // Mock a login operation
      mockPayload.auth.login.mockResolvedValue({
        token: 'test-token',
        user: { id: '123', email: 'test@example.com' },
      })

      const result = await mockPayload.auth.login({
        email: 'test@example.com',
        password: 'password',
      })

      expect(result.token).toBe('test-token')
      expect(result.user.email).toBe('test@example.com')
    })
  })

  describe('Configuration Scenarios', () => {
    it('should handle empty collections', () => {
      const emptyConfig = {
        ...sampleConfig,
        collections: [],
      }

      const plugin = pluginTamplate()
      const result = plugin(emptyConfig)

      expect(result.collections).toEqual([])
      expect(result.secret).toBe(sampleConfig.secret)
    })

    it('should handle empty globals', () => {
      const emptyGlobalsConfig = {
        ...sampleConfig,
        globals: [],
      }

      const plugin = pluginTamplate()
      const result = plugin(emptyGlobalsConfig)

      expect(result.globals).toEqual([])
      expect(result.collections).toEqual(sampleConfig.collections)
    })

    it('should handle minimal config', () => {
      const minimalConfig = {
        collections: [],
        db: sampleConfig.db,
        globals: [],
        secret: 'minimal-secret',
      }

      const plugin = pluginTamplate()
      const result = plugin(minimalConfig)

      expect(result.secret).toBe('minimal-secret')
      expect(result.collections).toEqual([])
      expect(result.globals).toEqual([])
    })
  })
})
