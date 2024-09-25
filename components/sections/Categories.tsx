// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { getCategories, getCategoryIcon } from '@/lib/api-data'

export default function Categories() {
  const categories = getCategories()

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/[0.008] rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-white/[0.012] rounded-full blur-3xl animate-pulse-slow delay-1500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Explore API <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto hover:text-white/80 transition-colors duration-300">
            From payments to AI, find the perfect API integration for your project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/browse?category=${category.id}`}
                className="block group"
              >
                <div className="bg-black/60 border border-white/10 rounded-2xl p-6 
                             hover:border-white/30 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]
                             backdrop-blur-sm relative overflow-hidden hover:bg-black/80 h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-white/3 
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl
                                  group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-300
                                  group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-white transition-colors text-white/90">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                        {category.count} API{category.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                                 
                  <p className="text-white/60 text-sm mb-6 line-clamp-2 group-hover:text-white/80 transition-colors relative z-10">
                    {category.description}
                  </p>

                  {/* Popular APIs in category */}
                  <div className="space-y-3 relative z-10">
                    <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider group-hover:text-white/70 transition-colors">
                      Popular APIs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.popularAPIs?.slice(0, 3).map((api) => (
                        <span
                          key={api}
                          className="text-xs bg-white/5 text-white/60 px-2 py-1 rounded-md border border-white/10
                                   group-hover:bg-white/10 group-hover:text-white/80 group-hover:border-white/20 
                                   transition-all duration-300"
                        >
                          {api}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  )
}
