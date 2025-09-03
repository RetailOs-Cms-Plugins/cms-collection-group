import type { Config } from 'payload'

import { createCollectionGroup } from './collections/CollectionGroup.js'

export const collectionGroupPlugin = (config: Config): Config => {
  const existingCollections = config.collections?.map((collection) => collection.slug) || []
  
  return {
    ...config,
    collections: [...(config.collections || []), createCollectionGroup(existingCollections)],
  }
}

export const pluginTamplate = collectionGroupPlugin
