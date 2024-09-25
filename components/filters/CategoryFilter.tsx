// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { getCategoryIcon } from '@/lib/api-data'
import type { Category } from '@/types/api'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || 
    { id: 'all', name: 'All Categories', count: 0 }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-dark-800 border border-gray-600 rounded-lg px-4 py-2 text-white hover:border-primary-500 transition-colors min-w-[180px] justify-between"
      >
        <div className="flex items-center gap-2">
          {selectedCategory !== 'all' && (
            <span className="text-lg">{getCategoryIcon(selectedCategory)}</span>
          )}
          <span>{selectedCategoryData.name}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 w-64 bg-dark-800 border border-gray-700 rounded-xl shadow-2xl z-20 max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              <button
                onClick={() => {
                  onCategoryChange('all')
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'hover:bg-dark-700 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>All Categories</span>
                  <span className="text-sm text-gray-400">
                    {categories.reduce((sum, cat) => sum + cat.count, 0)}
                  </span>
                </div>
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-primary-600 text-white' 
                      : 'hover:bg-dark-700 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getCategoryIcon(category.id)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-400">{category.count}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
