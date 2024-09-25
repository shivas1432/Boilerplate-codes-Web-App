// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { motion } from 'framer-motion'
import type { Language, Framework } from '@/types/api'

interface FrameworkSelectorProps {
  selectedFramework: Framework
  onFrameworkChange: (framework: Framework) => void
  language: Language
}

const frameworksByLanguage: Record<Language, { id: Framework; name: string }[]> = {
  javascript: [
    { id: 'vanilla', name: 'Vanilla JS' },
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue.js' },
    { id: 'angular', name: 'Angular' },
    { id: 'nextjs', name: 'Next.js' },
    { id: 'express', name: 'Express.js' },
  ],
  typescript: [
    { id: 'vanilla', name: 'TypeScript' },
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue.js' },
    { id: 'angular', name: 'Angular' },
    { id: 'nextjs', name: 'Next.js' },
    { id: 'express', name: 'Express.js' },
  ],
  python: [
    { id: 'vanilla', name: 'Python' },
    { id: 'django', name: 'Django' },
    { id: 'flask', name: 'Flask' },
    { id: 'fastapi', name: 'FastAPI' },
  ],
  php: [
    { id: 'vanilla', name: 'PHP' },
    { id: 'laravel', name: 'Laravel' },
    { id: 'symfony', name: 'Symfony' },
  ],
  go: [
    { id: 'vanilla', name: 'Go' },
    { id: 'gin', name: 'Gin' },
    { id: 'echo', name: 'Echo' },
  ],
  rust: [
    { id: 'vanilla', name: 'Rust' },
    { id: 'actix', name: 'Actix Web' },
    { id: 'warp', name: 'Warp' },
  ],
}

export default function FrameworkSelector({ selectedFramework, onFrameworkChange, language }: FrameworkSelectorProps) {
  const frameworks = frameworksByLanguage[language] || []

  return (
    <div className="flex flex-wrap gap-2">
      {frameworks.map((framework) => (
        <motion.button
          key={framework.id}
          onClick={() => onFrameworkChange(framework.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedFramework === framework.id
              ? 'bg-secondary-600 text-white shadow-lg'
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
          }`}
        >
          {framework.name}
        </motion.button>
      ))}
    </div>
  )
}
