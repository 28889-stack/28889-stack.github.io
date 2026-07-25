import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

function pagesBase(repository?: string, githubActions = false) {
  if (!githubActions || !repository) return '/'
  const repo = repository.split('/')[1] ?? ''
  return repo.endsWith('.github.io') ? '/' : `/${repo}/`
}

export default defineConfig({
  base: pagesBase(
    process.env.GITHUB_REPOSITORY,
    process.env.GITHUB_ACTIONS === 'true',
  ),
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
