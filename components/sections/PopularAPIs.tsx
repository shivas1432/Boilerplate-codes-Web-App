// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { motion } from 'framer-motion'
import { Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { getPopularAPIs } from '@/lib/api-data'

export default function PopularAPIs() {
  const popularAPIs = getPopularAPIs()

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/[0.015] rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-black/80 border border-white/20 rounded-full px-4 py-2 text-sm mb-6
                        hover:border-white/40 transition-all duration-300 hover:bg-black/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                        backdrop-blur-sm group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <TrendingUp className="h-4 w-4 text-white/70 group-hover:text-white/90 transition-colors" />
            <span className="text-white/60 group-hover:text-white/80 transition-colors">Most Popular This Week</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Trending API <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">Templates</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto hover:text-white/80 transition-colors duration-300">
            The most requested and downloaded API integrations by developers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularAPIs.map((api, index) => (
            <motion.div
              key={api.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/api/${api.slug}`}
                className="block group"
              >
                <div className="bg-black/60 border border-white/10 rounded-2xl p-6 
                             hover:border-white/30 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]
                             backdrop-blur-sm relative overflow-hidden hover:bg-black/80">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-white/3 
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl
                                    group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                        {api.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-white transition-colors text-white/90">
                          {api.name}
                        </h3>
                        <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{api.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-yellow-400/80 group-hover:text-yellow-400 transition-colors">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{api.popularity}</span>
                    </div>
                  </div>
                  
                  <p className="text-white/60 text-sm mb-4 line-clamp-2 group-hover:text-white/80 transition-colors relative z-10">
                    {api.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {api.features.slice(0, 2).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-md border border-white/10
                                 group-hover:bg-white/15 group-hover:text-white/90 transition-all duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                    {api.features.length > 2 && (
                      <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                        +{api.features.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/50 group-hover:text-white/70 transition-colors relative z-10">
                    <span>6 languages</span>
                    <span>•</span>
                    <span>Production ready</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/browse" 
            className="inline-block text-lg px-8 py-4 bg-black/70 border border-white/20 
                     rounded-2xl text-white/90 hover:text-white transition-all duration-300 group overflow-hidden
                     hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10">View All APIs</span>
          </Link>
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
