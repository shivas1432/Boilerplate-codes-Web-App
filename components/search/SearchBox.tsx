'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBox({ value, onChange, placeholder = "Search APIs...", className = "" }: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur()
        if (value) {
          onChange('')
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFocused, value, onChange])

  return (
    <div className="relative group">
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused ? '0 0 0 2px rgba(168, 85, 247, 0.2)' : '0 0 0 0px transparent'
        }}
        transition={{ duration: 0.2 }}
        className={`relative bg-dark-800 border border-gray-600 rounded-xl ${className}`}
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-20 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400">
          <span className="hidden sm:block">⌘K</span>
        </div>
      </motion.div>

      {!isFocused && !value && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
    </div>
  )
}