import type { Config } from 'payload'

// Test fixtures for the plugin template
export const sampleConfig: Config = {
  collections: [
    {
      slug: 'posts',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
        },
      ],
    },
  ],
  db: {} as Config['db'], // Mock DB for testing
  globals: [
    {
      slug: 'settings',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          defaultValue: 'My Site',
        },
      ],
    },
  ],
  secret: 'test-secret',
}

export const samplePluginOptions = {
  customField: 'test-value',
  enabled: true,
}

export const sampleUser = {
  id: 'user-123',
  email: 'test@example.com',
  password: 'password123',
}

export const sampleDocument = {
  id: 'doc-123',
  content: 'This is test content',
  createdAt: new Date().toISOString(),
  title: 'Test Document',
  updatedAt: new Date().toISOString(),
}

export const sampleCollection = {
  slug: 'posts',
  labels: {
    plural: 'Posts',
    singular: 'Post',
  },
}
