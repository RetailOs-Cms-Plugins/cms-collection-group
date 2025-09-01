import type { CollectionConfig } from 'payload'

export const CollectionGroup: CollectionConfig = {
  slug: 'collection-group',
  access: {
    create: () => true,
    delete: () => true,
    read: () => true,
    update: () => true,
  },
  admin: {
    description: 'Organize and group collections together',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'The name of this collection group',
      },
      label: 'Collection Group Name',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description for this collection group',
      },
      label: 'Description',
    },
    {
      name: 'selectedCollection',
      type: 'select',
      admin: {
        description: 'Choose which collection to select items from',
      },
      label: 'Collection Type',
      options: [], // Will be populated by plugin with all available collections
      required: true,
      validate: (
        value: null | string | string[] | undefined,
        { data }: { data: any;},
      ) => {
        // If trying to change collection type and there are items selected
        if (
          data?.selectedCollection !== data?.collectionItems[0].relationTo &&
          data?.collectionItems &&
          Array.isArray(data.collectionItems) &&
          data.collectionItems.length > 0
        ) {
          return 'You must clear all collection items before changing the collection type'
        }

        return true
      },
    },
    {
      name: 'collectionItems',
      type: 'relationship',
      admin: {
        condition: (data) => {
          return data.selectedCollection && data.selectedCollection !== ''
        },
        description: 'Select items from the chosen collection',
      },
      filterOptions: ({ relationTo, siblingData }) => {
        const data = siblingData as { selectedCollection?: string }
        if (!data?.selectedCollection) {
          return false
        }
        return relationTo === data.selectedCollection
      },
      hasMany: true,
      label: 'Collection Items',
      relationTo: [],
      required: false,
      validate: (value, { siblingData }) => {
        const data = siblingData as { selectedCollection?: string }
        // If collection type changed, clear the  collectionItems
        if (value && Array.isArray(value) && value.length > 0 && data?.selectedCollection) {
          return true
        }
        return true
      },
    },
  ],
}
