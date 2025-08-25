import type { Config } from 'payload'

export const pluginTamplate =
  (_pluginOptions?: unknown) =>
  (config: Config): Config => {
    return {
      ...config,
    }
  }
