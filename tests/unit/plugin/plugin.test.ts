import { describe, expect, it } from 'vitest'

import { pluginTamplate } from '../../../src/index.js'
import { sampleConfig, samplePluginOptions } from '../../fixtures/index.js'

describe('Plugin Template Unit Tests', () => {
  describe('Plugin Function', () => {
    it('should export a function', () => {
      expect(pluginTamplate).toBeDefined()
      expect(typeof pluginTamplate).toBe('function')
    })

    it('should return a function when called', () => {
      const plugin = pluginTamplate()
      expect(typeof plugin).toBe('function')
    })

    it('should accept plugin options', () => {
      const plugin = pluginTamplate(samplePluginOptions)
      expect(typeof plugin).toBe('function')
    })
  })

  describe('Config Modification', () => {
    it('should return the same config when no modifications are made', () => {
      const plugin = pluginTamplate()
      const result = plugin(sampleConfig)

      expect(result).toEqual(sampleConfig)
      expect(result.collections).toBeDefined()
      expect(Array.isArray(result.collections)).toBe(true)
    })

    it('should preserve existing collections', () => {
      const plugin = pluginTamplate(samplePluginOptions)
      const result = plugin(sampleConfig)

      expect(result.collections).toBeDefined()
      if (result.collections && result.collections.length > 0) {
        expect(result.collections[0]).toBeDefined()
      }
    })

    it('should preserve existing globals', () => {
      const plugin = pluginTamplate(samplePluginOptions)
      const result = plugin(sampleConfig)

      expect(result.globals).toBeDefined()
      expect(Array.isArray(result.globals)).toBe(true)
    })

    it('should preserve db and secret', () => {
      const plugin = pluginTamplate()
      const result = plugin(sampleConfig)

      expect(result.db).toBeDefined()
      expect(result.secret).toBe('test-secret')
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined options', () => {
      const plugin = pluginTamplate(undefined)
      const result = plugin(sampleConfig)

      expect(result).toEqual(sampleConfig)
    })

    it('should handle null options', () => {
      const plugin = pluginTamplate(null)
      const result = plugin(sampleConfig)

      expect(result).toEqual(sampleConfig)
    })

    it('should handle minimal config', () => {
      const minimalConfig = {
        collections: [],
        db: sampleConfig.db,
        globals: [],
        secret: 'test',
      }

      const plugin = pluginTamplate()
      const result = plugin(minimalConfig)

      expect(result.collections).toHaveLength(0)
      expect(result.globals).toHaveLength(0)
      expect(result.secret).toBe('test')
    })
  })
})
