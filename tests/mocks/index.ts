import { vi } from 'vitest'

export const createMockPayload = () => ({
  auth: {
    login: vi.fn(),
    logout: vi.fn(),
  },
  collections: {
    create: vi.fn(),
    delete: vi.fn(),
    find: vi.fn(),
    update: vi.fn(),
  },
  config: {
    collections: [],
    globals: [],
  },
  globals: {
    find: vi.fn(),
    update: vi.fn(),
  },
})

export const createMockConfig = (overrides = {}) => ({
  collections: [
    {
      slug: 'posts',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  globals: [],
  ...overrides,
})

export const mockPayloadUser = {
  id: '123',
  email: 'test@example.com',
  password: 'password123',
}

export const mockPayloadDocument = {
  id: 'doc-123',
  content: 'Test content',
  createdAt: '2024-01-01T00:00:00.000Z',
  title: 'Test Document',
  updatedAt: '2024-01-01T00:00:00.000Z',
}
