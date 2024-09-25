// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Code2, Users, Download, Clock } from 'lucide-react'

export default function Statistics() {
  const [counters, setCounters] = useState({
    apis: 0,
    developers: 0,
    downloads: 0,
    timesSaved: 0
  })

  const finalValues = {
    apis: 150,
    developers: 15000,
    downloads: 45000,
    timesSaved: 25000
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounters({
        apis: Math.floor(finalValues.apis * progress),
        developers: Math.floor(finalValues.developers * progress),
        downloads: Math.floor(finalValues.downloads * progress),
        timesSaved: Math.floor(finalValues.timesSaved * progress)
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounters(finalValues)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      icon: Code2,
      label: 'API Templates',
      value: counters.apis,
      suffix: '+'
    },
    {
      icon: Users,
      label: 'Developers',
      value: counters.developers,
      suffix: '+'
    },
    {
      icon: Download,
      label: 'Code Downloads',
      value: counters.downloads,
      suffix: '+'
    },
    {
      icon: Clock,
      label: 'Hours Saved',
      value: counters.timesSaved,
      suffix: '+'
    }
  ]

  return (
    <section className="py-24 bg-black/95 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.005] rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
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
            Trusted by Developers
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"> Worldwide</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto hover:text-white/80 transition-colors duration-300">
            Join thousands of developers who have accelerated their projects with CodeBoiler
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group cursor-default"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 
                            group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-300
                            group-hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
                <stat.icon className="h-8 w-8 text-white/70 group-hover:text-white/90 transition-colors relative z-10" />
              </div>
                             
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
                             
              <div className="text-white/50 font-medium group-hover:text-white/70 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional content section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-black/60 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto
                        hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]
                        backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/2 via-transparent to-white/2 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000" />
            <p className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors relative z-10">
              "CodeBoiler has revolutionized how we integrate APIs in our projects. What used to take hours 
              of research and implementation now takes minutes. The generated code is production-ready and 
              follows best practices."
            </p>
            <div className="mt-4 text-white/50 group-hover:text-white/70 transition-colors relative z-10">
              — Sarah Chen, Senior Developer at TechCorp
            </div>
          </div>
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
