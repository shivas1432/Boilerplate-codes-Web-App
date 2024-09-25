// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { motion } from 'framer-motion'
import { Star, ExternalLink, Code2 } from 'lucide-react'
import Link from 'next/link'
import type { APITemplate } from '@/types/api'

interface APICardProps {
  api: APITemplate
  viewMode?: 'grid' | 'list'
  searchQuery?: string
}

export default function APICard({ api, viewMode = 'grid', searchQuery = '' }: APICardProps) {
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="search-highlight">
          {part}
        </span>
      ) : part
    )
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group"
      >
        <Link href={`/api/${api.slug}`} className="block">
          <div className="card hover:scale-[1.02] transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary-500/10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-dark-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {api.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary-400 transition-colors">
                      {highlightText(api.name, searchQuery)}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {highlightText(api.category, searchQuery)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{api.popularity || 0}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-400 transition-colors" />
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {highlightText(api.description, searchQuery)}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {api.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary-600/20 text-primary-300 px-2 py-1 rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                  {api.features.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{api.features.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Code2 className="h-3 w-3" />
                    6 languages
                  </span>
                  <span>Production ready</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group"
    >
      <Link href={`/api/${api.slug}`} className="block h-full">
        <div className="card hover:scale-105 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary-500/10 h-full flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-dark-700 rounded-xl flex items-center justify-center text-2xl">
                {api.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary-400 transition-colors">
                  {highlightText(api.name, searchQuery)}
                </h3>
                <span className="text-sm text-gray-400">
                  {highlightText(api.category, searchQuery)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm">{api.popularity || 0}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
            {highlightText(api.description, searchQuery)}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {api.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-primary-600/20 text-primary-300 px-2 py-1 rounded-md"
              >
                {feature}
              </span>
            ))}
            {api.features.length > 2 && (
              <span className="text-xs text-gray-400">
                +{api.features.length - 2} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
            <span className="flex items-center gap-1">
              <Code2 className="h-3 w-3" />
              6 languages
            </span>
            <ExternalLink className="h-4 w-4 group-hover:text-primary-400 transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
