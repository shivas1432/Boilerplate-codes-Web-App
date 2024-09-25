// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Code2, Zap, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SearchBox from '@/components/search/SearchBox'
import { getAllAPIs } from '@/lib/api-data'
import { searchAPIs } from '@/lib/search'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const apis = getAllAPIs()
      const results = searchAPIs(apis, query).slice(0, 5)
      setSearchResults(results)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects with subtle matte finish */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          {/* Badge with matte black theme and hover glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-black/80 border border-white/10 rounded-full px-4 py-2 text-sm
                     hover:border-white/30 transition-all duration-300 hover:bg-black/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
                     backdrop-blur-sm group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <Star className="h-4 w-4 text-white/80 fill-current group-hover:text-white transition-colors" />
            <span className="text-white/70 group-hover:text-white/90 transition-colors">Production-Ready API Boilerplates</span>
          </motion.div>

          {/* Main Heading with enhanced text effects */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
              Generate{' '}
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent 
                             hover:from-gray-200 hover:via-white hover:to-gray-200 transition-all duration-500
                             relative inline-block group">
                API Code
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 blur-sm" />
              </span>
              <br />
              in Seconds
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed hover:text-white/80 transition-colors duration-300">
              Skip the boilerplate. Get production-ready integration code for 150+ APIs 
              across payments, auth, storage, AI, and more.
            </p>
          </div>

          {/* Enhanced Search with matte black styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="relative overflow-hidden rounded-2xl bg-black/60 border border-white/10 
                          hover:border-white/30 transition-all duration-300 backdrop-blur-md
                          hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
              <SearchBox
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for Stripe, Auth0, OpenAI, and more..."
                className="text-lg py-4 bg-transparent text-white placeholder:text-white/50 border-none 
                         focus:ring-0 focus:outline-none relative z-10"
              />
            </div>
            
            {/* Enhanced Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 w-full bg-black/90 border border-white/20 rounded-xl 
                         shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 backdrop-blur-lg overflow-hidden"
              >
                {searchResults.map((api, index) => (
                  <Link
                    key={api.id}
                    href={`/api/${api.slug}`}
                    onClick={() => setShowResults(false)}
                    className={`flex items-center gap-3 p-4 hover:bg-white/5 transition-all duration-300 
                              group relative overflow-hidden border-b border-white/5
                              ${index === 0 ? 'rounded-t-xl' : ''} 
                              ${index === searchResults.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-white/3 
                                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="text-2xl relative z-10">{api.icon}</div>
                    <div className="flex-1 relative z-10">
                      <div className="font-medium text-white/90 group-hover:text-white transition-colors">{api.name}</div>
                      <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors">{api.category}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white/80 transition-colors relative z-10" />
                  </Link>
                ))}
                <div className="p-3 bg-black/80 rounded-b-xl border-t border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/2 via-transparent to-white/2 
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Link
                    href={`/browse?search=${encodeURIComponent(searchQuery)}`}
                    className="text-sm text-white/60 hover:text-white/90 transition-colors relative z-10"
                  >
                    View all results for "{searchQuery}" →
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced CTA Buttons with matte black theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/browse" 
              className="relative text-lg px-8 py-4 flex items-center gap-2 bg-black/70 border border-white/20 
                       rounded-2xl text-white/90 hover:text-white transition-all duration-300 group overflow-hidden
                       hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Code2 className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Browse All APIs</span>
            </Link>
            
            <Link 
              href="/browse?category=payment" 
              className="relative text-lg px-8 py-4 flex items-center gap-2 bg-black/50 border border-white/10 
                       rounded-2xl text-white/70 hover:text-white/90 transition-all duration-300 group overflow-hidden
                       hover:border-white/30 hover:bg-black/70 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Zap className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Start with Payments</span>
            </Link>
          </motion.div>

          {/* Enhanced Quick Stats with hover effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-16 max-w-lg mx-auto"
          >
            {[
              { number: '150+', label: 'API Templates' },
              { number: '12', label: 'Categories' },
              { number: '6', label: 'Languages' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center group cursor-default relative overflow-hidden rounded-xl p-4
                         hover:bg-white/[0.02] transition-all duration-300 border border-transparent
                         hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 
                              translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-1000" />
                <div className="text-3xl font-bold text-white/90 group-hover:text-white transition-colors duration-300 relative z-10">
                  {stat.number}
                </div>
                <div className="text-sm text-white/40 group-hover:text-white/70 transition-colors duration-300 relative z-10">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}
