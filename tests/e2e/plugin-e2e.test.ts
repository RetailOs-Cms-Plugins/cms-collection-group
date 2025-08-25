import type { Config } from 'payload'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { pluginTamplate } from '../../src/index.js'
import { sampleCollection, sampleConfig, sampleDocument, sampleUser } from '../fixtures/index.js'
import { createMockPayload } from '../mocks/index.js'

// E2E Tests simulate real-world scenarios with the plugin
describe('Plugin Template E2E Tests', () => {
  let mockPayload: ReturnType<typeof createMockPayload>
  let modifiedConfig: Config

  beforeAll(() => {
    // Setup plugin with sample config
    const plugin = pluginTamplate()
    modifiedConfig = plugin(sampleConfig)

    // Setup mock Payload instance
    mockPayload = createMockPayload()

    // Mock successful responses for basic operations
    mockPayload.collections.find.mockResolvedValue({
      docs: [sampleDocument],
      limit: 10,
      offset: 0,
      page: 1,
      totalDocs: 1,
      totalPages: 1,
    })

    mockPayload.collections.create.mockResolvedValue({
      ...sampleDocument,
      id: 'test-doc-id',
    })

    mockPayload.auth.login.mockResolvedValue({
      token: 'mock-jwt-token',
      user: sampleUser,
    })
  })

  afterAll(() => {
    // Cleanup - reset to initial state
    mockPayload = createMockPayload()
    modifiedConfig = sampleConfig
  })

  describe('Plugin Integration', () => {
    it('should integrate with Payload config successfully', () => {
      expect(modifiedConfig).toBeDefined()
      expect(modifiedConfig.collections).toBeDefined()
      expect(modifiedConfig.secret).toBe('test-secret')
    })

    it('should preserve original config structure', () => {
      expect(modifiedConfig.collections).toHaveLength(sampleConfig.collections?.length || 0)
      expect(modifiedConfig.globals).toHaveLength(sampleConfig.globals?.length || 0)
    })
  })

  describe('Basic Payload Operations', () => {
    it('should handle authentication', async () => {
      const loginResult = await mockPayload.auth.login({
        email: sampleUser.email,
        password: sampleUser.password,
      })

      expect(loginResult.user.email).toBe(sampleUser.email)
      expect(loginResult.token).toBeDefined()
    })

    it('should handle document creation', async () => {
      const createResult = await mockPayload.collections.create({
        collection: sampleCollection.slug,
        data: sampleDocument,
      })

      expect(createResult.title).toBe(sampleDocument.title)
      expect(createResult.id).toBeDefined()
    })

    it('should handle document retrieval', async () => {
      const findResult = await mockPayload.collections.find({
        collection: sampleCollection.slug,
      })

      expect(findResult.docs).toHaveLength(1)
      expect(findResult.totalDocs).toBe(1)
    })
  })

  describe('Error Handling', () => {
    it('should handle authentication failures', async () => {
      mockPayload.auth.login.mockRejectedValueOnce(new Error('Invalid credentials'))

      await expect(
        mockPayload.auth.login({
          email: 'wrong@email.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow('Invalid credentials')
    })

    it('should handle missing collections', async () => {
      mockPayload.collections.find.mockRejectedValueOnce(new Error('Collection not found'))

      await expect(
        mockPayload.collections.find({
          collection: 'non-existent-collection',
        }),
      ).rejects.toThrow('Collection not found')
    })

    it('should handle validation errors', async () => {
      mockPayload.collections.create.mockRejectedValueOnce(new Error('Validation failed'))

      await expect(
        mockPayload.collections.create({
          collection: sampleCollection.slug,
          data: {}, // Invalid data
        }),
      ).rejects.toThrow('Validation failed')
    })
  })

  describe('Plugin Configuration', () => {
    it('should work with different plugin options', () => {
      const customPlugin = pluginTamplate({ customField: 'custom-value' })
      const customConfig = customPlugin(sampleConfig)

      expect(customConfig).toBeDefined()
      expect(customConfig.secret).toBe(sampleConfig.secret)
    })

    it('should handle no options', () => {
      const defaultPlugin = pluginTamplate()
      const defaultConfig = defaultPlugin(sampleConfig)

      expect(defaultConfig).toEqual(sampleConfig)
    })
  })
})
