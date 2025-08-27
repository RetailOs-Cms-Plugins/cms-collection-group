import type { Config, Field, RelationshipField, SelectField } from 'payload'

import { CollectionGroup } from './collections/CollectionGroup.js'

/**
 * This plugin is used to create a collection group with a select
 * field to select a collection and a relationship field to select
 * items from the selected collection.
 * The collection group will have a relationship field to select items from the selected collection.
 *
*/
export const collectionGroupPlugin = (config: Config): Config => {
  const existingCollections: string[] =
    config.collections?.map((collection) => collection.slug) || []//gets all collections from payload.config [posts,media,...]

  // Create options for the select field
  const collectionOptions: { label: string; value: string }[] = existingCollections.map((slug) => ({
    label: slug,
    value: slug,
  }))

  // Update the collection group with dynamic options
  const collectionGroupWithRelations = {
    ...CollectionGroup,
    fields: CollectionGroup.fields.map((field: Field): Field => {
      if ('name' in field && field.name === 'selectedCollection') {
        return {
          ...field,
          options: collectionOptions,
        } as SelectField
      }
      if ('name' in field && field.name === 'collectionItems') {
        return {
          ...field,
          relationTo: existingCollections,
        } as RelationshipField
      }
      return field
    }),
  }

  return {
    ...config,
    collections: [...(config.collections || []), collectionGroupWithRelations],
  }
}

export const pluginTamplate = collectionGroupPlugin
