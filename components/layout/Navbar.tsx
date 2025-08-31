'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, Search, Github, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse APIs' },
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold group">
            <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center
                          group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300
                          group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Code2 className="h-5 w-5 text-white/80 group-hover:text-white transition-colors relative z-10" />
            </div>
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent
                           group-hover:from-gray-200 group-hover:via-white group-hover:to-gray-200 transition-all duration-300">
              CodeBoiler
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-300 relative group py-2 ${
                    pathname === item.href 
                      ? 'text-white' 
                      : 'text-white/70 hover:text-white/90'
                  }`}
                >
                  <span>{item.label}</span>
                  <div className={`absolute bottom-0 left-0 h-px bg-white/50 transition-all duration-300 ${
                    pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/shivas1432/Boilerplate-codes-Web-App"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white/90 transition-all duration-300
                         px-3 py-2 rounded-lg hover:bg-white/5 group relative overflow-hidden
                         hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Github className="h-4 w-4 relative z-10" />
                <Star className="h-3 w-3 relative z-10" />
                <span className="text-sm relative z-10">Star</span>
              </Link>
              
              <Link 
                href="/browse" 
                className="relative px-6 py-2 bg-white/10 border border-white/20 rounded-lg 
                         text-white/90 hover:text-white transition-all duration-300 group overflow-hidden
                         hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]
                         hover:bg-white/20 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">Get Started</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white/90 transition-all duration-300
                     rounded-lg hover:bg-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="relative z-10">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 relative overflow-hidden"
          >
            {/* Background effect */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-48 h-48 bg-white/[0.01] rounded-full blur-3xl" />
            </div>
            
            <div className="container mx-auto px-4 py-4 space-y-4 relative z-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-all duration-300 relative group overflow-hidden ${
                    pathname === item.href 
                      ? 'text-white bg-white/10 border border-white/20' 
                      : 'text-white/70 hover:text-white/90 hover:bg-white/5'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link
                  href="https://github.com/shivas1432/Boilerplate-codes-Web-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-3 px-4 text-white/70 hover:text-white/90 
                           transition-all duration-300 rounded-lg hover:bg-white/5 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Github className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">Star on GitHub</span>
                </Link>
                
                <Link 
                  href="/browse" 
                  className="block w-full py-3 px-4 bg-white/10 border border-white/20 rounded-lg 
                           text-center text-white/90 hover:text-white transition-all duration-300
                           hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
                           hover:bg-white/20 relative overflow-hidden group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">Get Started</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}