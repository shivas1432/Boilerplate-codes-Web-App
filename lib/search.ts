import Fuse from 'fuse.js'
import type { APITemplate } from '@/types/api'

const searchOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'category', weight: 0.2 },
    { name: 'features', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
}

export function searchAPIs(apis: APITemplate[], query: string): APITemplate[] {
  if (!query.trim()) {
    return apis
  }

  const fuse = new Fuse(apis, searchOptions)
  const results = fuse.search(query)
  
  return results.map(result => result.item)
}