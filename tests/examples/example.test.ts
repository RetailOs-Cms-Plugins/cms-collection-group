import { describe, expect, it, vi } from 'vitest'

import { pluginTamplate } from '../../src/index.js'
import { sampleConfig, samplePluginOptions } from '../fixtures/index.js'

describe('Plugin Template Examples', () => {
  it('should export the plugin function', () => {
    expect(pluginTamplate).toBeDefined()
    expect(typeof pluginTamplate).toBe('function')
  })

  it('should return a function when called with options', () => {
    const plugin = pluginTamplate(samplePluginOptions)
    expect(typeof plugin).toBe('function')
  })

  it('should return modified config when applied', () => {
    const plugin = pluginTamplate(samplePluginOptions)
    const modifiedConfig = plugin(sampleConfig)

    expect(modifiedConfig).toBeDefined()
    expect(modifiedConfig.collections).toBeDefined()
  })

  it('should work with no options', () => {
    const plugin = pluginTamplate()
    const modifiedConfig = plugin(sampleConfig)

    expect(modifiedConfig).toEqual(sampleConfig)
  })

  it('should mock functions properly', () => {
    const mockFn = vi.fn()
    mockFn('test')

    expect(mockFn).toHaveBeenCalledWith('test')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
