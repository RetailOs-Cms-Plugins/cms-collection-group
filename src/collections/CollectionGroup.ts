import type { CollectionConfig } from 'payload'

import { shouldShowCollectionItems, validateCollectionTypeChange } from '../utils/ConfigUtils.js'

export const createCollectionGroup = (existingCollections: string[]): CollectionConfig => {
  const collectionOptions = existingCollections.map((slug) => ({
    label: slug,
    value: slug,
  }))

  return {
    slug: 'collection-groups',
    admin: {
      description: 'Organize and group collections together',
      useAsTitle: 'title',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        admin: {
          description: 'The title of this collection group',
        },
        label: 'Collection Group Title',
        required: true,
        unique: true,
      },
      {
        name: 'description',
        type: 'textarea',
        admin: {
          description: 'Optional description for this collection group',
        },
      },
      {
        name: 'selectedCollection',
        type: 'select',
        admin: {
          description: 'Choose which collection to select items from',
        },
        enumName: 'collection_group_selected_collection',
        label: 'Collection Type',
        options: collectionOptions,
        required: true,
        validate: validateCollectionTypeChange,
      },
      {
        name: 'collectionItems',
        type: 'relationship',
        admin: {
          condition: shouldShowCollectionItems,
          description: 'Select items from the chosen collection',
        },
        filterOptions: ({ relationTo, siblingData }) => {
          if (!(siblingData as { selectedCollection?: string })?.selectedCollection) {
            return false
          }
          return relationTo === (siblingData as { selectedCollection?: string })?.selectedCollection
        },
        hasMany: true,
        relationTo: existingCollections,
      },
    ],
  }
}
