'use client'

import { motion } from 'framer-motion'
import type { Language } from '@/types/api'

interface LanguageSelectorProps {
  selectedLanguage: Language
  onLanguageChange: (language: Language) => void
}

const languages: { id: Language; name: string; icon: string }[] = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'php', name: 'PHP', icon: '🐘' },
  { id: 'go', name: 'Go', icon: '🐹' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
]

export default function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((language) => (
        <motion.button
          key={language.id}
          onClick={() => onLanguageChange(language.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedLanguage === language.id
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
          }`}
        >
          <span>{language.icon}</span>
          <span>{language.name}</span>
        </motion.button>
      ))}
    </div>
  )
}