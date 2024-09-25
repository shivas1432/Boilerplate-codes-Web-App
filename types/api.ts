// Type definitions enhanced for CodeBoiler - Better type safety Sept 2024
export type Language = 'javascript' | 'typescript' | 'python' | 'php' | 'go' | 'rust'

export type Framework = 'vanilla' | 'react' | 'vue' | 'angular' | 'nextjs' | 'express' | 
  'django' | 'flask' | 'fastapi' | 'laravel' | 'symfony' | 'gin' | 'echo' | 'actix' | 'warp'

export interface APITemplate {
  id: string
  slug: string
  name: string
  category: string
  description: string
  icon: string
  features: string[]
  popularity?: number
  documentation?: string
  codeTemplates: Partial<Record<Language, Partial<Record<Framework, string>>>>
}

export interface Category {
  id: string
  name: string
  description: string
  count: number
  popularAPIs?: string[]
}

