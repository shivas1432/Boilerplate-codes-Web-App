// CodeBoiler component enhanced for better boilerplate generation - Sept 2024
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List, Filter } from 'lucide-react'
import Link from 'next/link'
import { getAllAPIs, getCategories } from '@/lib/api-data'
import { searchAPIs } from '@/lib/search'
import APICard from '@/components/api/APICard'
import SearchBox from '@/components/search/SearchBox'
import CategoryFilter from '@/components/filters/CategoryFilter'
import type { APITemplate } from '@/types/api'

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredAPIs, setFilteredAPIs] = useState<APITemplate[]>([])

  const allAPIs = getAllAPIs()
  const categories = getCategories()

  useEffect(() => {
    let results = allAPIs

    // Apply category filter
    if (selectedCategory !== 'all') {
      results = results.filter(api => api.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      results = searchAPIs(results, searchQuery)
    }

    setFilteredAPIs(results)
  }, [searchQuery, selectedCategory, allAPIs])

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CB</span>
              </div>
              <span className="text-xl font-bold text-gradient">
                CodeBoiler
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Browse API Templates
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover and generate code for {allAPIs.length}+ API integrations across {categories.length} categories
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="w-full lg:w-1/2">
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search APIs, categories, or features..."
              />
            </div>
            
            <div className="flex items-center gap-4">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              <div className="flex items-center gap-2 bg-dark-800 border border-gray-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              {filteredAPIs.length} API{filteredAPIs.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </p>
          </div>

          {/* API Grid/List */}
          <AnimatePresence mode="wait">
            {filteredAPIs.length > 0 ? (
              <motion.div
                key={`${viewMode}-${selectedCategory}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredAPIs.map((api) => (
                  <APICard
                    key={api.id}
                    api={api}
                    viewMode={viewMode}
                    searchQuery={searchQuery}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No APIs Found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or category filter
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
