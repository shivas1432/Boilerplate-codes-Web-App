// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { motion } from 'framer-motion'
import {
   Code2,
   Copy,
   Download,
   Smartphone,
   Zap,
   Shield,
  Palette,
  Search
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Code2,
      title: '6 Programming Languages',
      description: 'Generate code in JavaScript, TypeScript, Python, PHP, Go, and Rust with framework-specific implementations.'
    },
    {
      icon: Copy,
      title: 'One-Click Copy',
      description: 'Copy generated code to your clipboard instantly with syntax highlighting and proper formatting.'
    },
    {
      icon: Download,
      title: 'Download as Files',
      description: 'Download complete integration files ready to use in your project with proper file extensions.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Full mobile experience with touch-optimized interface and responsive code editor.'
    },
    {
      icon: Zap,
      title: 'Production Ready',
      description: 'All templates include error handling, best practices, and security considerations built-in.'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Every template follows security best practices with proper authentication and data validation.'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Advanced fuzzy search across APIs, categories, and features to find exactly what you need.'
    },
    {
      icon: Palette,
      title: 'Multiple Frameworks',
      description: 'Support for React, Vue, Angular, Next.js, Express, Django, and many more frameworks.'
    }
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-white/[0.008] rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-white/[0.012] rounded-full blur-3xl animate-pulse-slow delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.005] rounded-full blur-3xl" />
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
            Everything You Need to
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"> Ship Faster</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto hover:text-white/80 transition-colors duration-300">
            CodeBoiler provides all the tools and features you need to integrate APIs quickly and efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black/60 border border-white/10 rounded-2xl p-6 group 
                       hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]
                       backdrop-blur-sm relative overflow-hidden hover:bg-black/80"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-white/3 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
              
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 
                            group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-300
                            group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] relative z-10">
                <feature.icon className="h-6 w-6 text-white/70 group-hover:text-white/90 transition-colors" />
              </div>
                             
              <h3 className="text-lg font-semibold mb-3 group-hover:text-white transition-colors text-white/90 relative z-10">
                {feature.title}
              </h3>
                             
              <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors relative z-10">
                {feature.description}
              </p>
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
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
