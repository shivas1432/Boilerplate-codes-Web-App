import { Code2, Github, Twitter, Heart, Linkedin, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-24 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/[0.015] rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold group">
              <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center
                            group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300
                            group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Code2 className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
              </div>
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent
                             group-hover:from-gray-200 group-hover:via-white group-hover:to-gray-200 transition-all duration-300">
                CodeBoiler
              </span>
            </Link>
            <p className="text-white/50 text-sm hover:text-white/70 transition-colors duration-300">
              Generate production-ready API integration code for 150+ services. 
              Copy, download, and deploy instantly.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white/90 hover:text-white transition-colors">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="text-white/50 hover:text-white/80 transition-all duration-300 
                                                relative group inline-block">
                  <span>Browse APIs</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/browse?category=payment" className="text-white/50 hover:text-white/80 transition-all duration-300
                                                                relative group inline-block">
                  <span>Payment APIs</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/browse?category=auth" className="text-white/50 hover:text-white/80 transition-all duration-300
                                                            relative group inline-block">
                  <span>Authentication</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/browse?category=ai" className="text-white/50 hover:text-white/80 transition-all duration-300
                                                          relative group inline-block">
                  <span>AI/ML APIs</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white/90 hover:text-white transition-colors">Developers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/shivas1432/Boilerplate-codes-Web-App" target="_blank" rel="noopener noreferrer" 
                   className="text-white/50 hover:text-white/80 transition-all duration-300 relative group inline-block">
                  <span>GitHub</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a href="https://github.com/shivas1432/Boilerplate-codes-Web-App/blob/main/API.md" target="_blank" rel="noopener noreferrer" 
                   className="text-white/50 hover:text-white/80 transition-all duration-300 relative group inline-block">
                  <span>API Reference</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a href="https://github.com/shivas1432/Boilerplate-codes-Web-App/discussions" target="_blank" rel="noopener noreferrer" 
                   className="text-white/50 hover:text-white/80 transition-all duration-300 relative group inline-block">
                  <span>Community</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a href="https://github.com/shivas1432/Boilerplate-codes-Web-App/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" 
                   className="text-white/50 hover:text-white/80 transition-all duration-300 relative group inline-block">
                  <span>Contribute</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white/90 hover:text-white transition-colors">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/shivas1432/Boilerplate-codes-Web-App/blob/main/README.md" target="_blank" rel="noopener noreferrer" 
                   className="text-white/50 hover:text-white/80 transition-all duration-300 relative group inline-block">
                  <span>Documentation</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a href="https://github.com/shivas1432/Boilerplate-codes-Web-App/issues" target="_blank" rel="noopener noreferrer" 
                   className="text-white/50 hover:text-white/80 transition-all duration-300 relative group inline-block">
                  <span>Report Issues</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a href="https://github.com/shivas1432/Boilerplate-codes-Web-App/blob/main/FAQ.md" target="_blank" rel="noopener noreferrer" 
                   className="text-white/50 hover:text-white/80 transition-all duration-300 relative group inline-block">
                  <span>FAQ</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a href="mailto:hello@shivashanker.com" 
                   className="text-white/50 hover:text-white/80 transition-all duration-300 relative group inline-block">
                  <span>Contact</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="hover:text-white/70 transition-colors">© 2024 CodeBoiler by Shivashanker. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-sm text-white/50 hover:text-white/70 transition-colors">
              Made with <Heart className="h-4 w-4 text-red-500/80 fill-current hover:text-red-400 transition-colors" /> for developers
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/shivas1432/Boilerplate-codes-Web-App"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/90 transition-all duration-300 p-2 rounded-lg
                         hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
                title="GitHub Repository"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/shivashanker-kanugula-51a519252"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/90 transition-all duration-300 p-2 rounded-lg
                         hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              
              <a
                href="https://www.shivashanker.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/90 transition-all duration-300 p-2 rounded-lg
                         hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
                title="Portfolio Website"
              >
                <Globe className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}