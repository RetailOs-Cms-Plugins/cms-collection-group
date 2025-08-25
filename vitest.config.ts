import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/tests': resolve(__dirname, './tests'),
    },
  },
  test: {
    coverage: {
      exclude: ['src/**/*.d.ts', 'src/**/*.test.{ts,tsx}', 'src/**/index.ts'],
      include: ['src/**/*'],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    environment: 'jsdom',
    exclude: ['node_modules', 'dist', 'build'],
    globals: true,
    hookTimeout: 10000,
    include: ['tests/**/*.{test,spec}.{js,ts,tsx}'],
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    testTimeout: 10000,
  },
})
