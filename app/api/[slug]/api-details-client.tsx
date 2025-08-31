'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Copy, Download, Star, ExternalLink, Code2, Zap } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import CodeEditor from '@/components/code-editor/CodeEditor'
import LanguageSelector from '@/components/code-editor/LanguageSelector'
import FrameworkSelector from '@/components/code-editor/FrameworkSelector'
import { generateCode } from '@/lib/code-generator'
import type { APITemplate, Language, Framework } from '@/types/api'

interface APIDetailsClientProps {
  initialApiData: APITemplate | null
}

export default function APIDetailsClient({ initialApiData }: APIDetailsClientProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('typescript')
  const [selectedFramework, setSelectedFramework] = useState<Framework>('vanilla')
  const [generatedCode, setGeneratedCode] = useState('')

  useEffect(() => {
    if (initialApiData) {
      const code = generateCode(initialApiData, selectedLanguage, selectedFramework)
      setGeneratedCode(code)
    }
  }, [initialApiData, selectedLanguage, selectedFramework])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      toast.success('Code copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy code')
    }
  }

  const handleDownload = () => {
    if (!initialApiData) return
    
    const fileExtension = selectedLanguage === 'javascript' ? 'js' : 
                         selectedLanguage === 'typescript' ? 'ts' :
                         selectedLanguage === 'python' ? 'py' :
                         selectedLanguage === 'php' ? 'php' :
                         selectedLanguage === 'go' ? 'go' : 'rs'
    
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${initialApiData.name.toLowerCase().replace(/\s+/g, '-')}-integration.${fileExtension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Code downloaded!')
  }

  if (!initialApiData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">API Not Found</h1>
        <p className="text-gray-400 mb-6">The API template you're looking for doesn't exist.</p>
        <Link href="/browse" className="btn-primary">
          Browse All APIs
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/browse" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Link>
          <div className="text-gray-600">/</div>
          <span className="text-primary-400">{initialApiData.category}</span>
        </div>

        {/* API Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-dark-800 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {initialApiData.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{initialApiData.name}</h1>
                <p className="text-xl text-gray-300 mb-4">{initialApiData.description}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                    {initialApiData.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">{initialApiData.popularity || 0}</span>
                  </div>
                  <span className="text-green-400 text-sm flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Production Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary-400" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {initialApiData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documentation Link */}
            {initialApiData.documentation && (
              <a
                href={initialApiData.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View Official Documentation
              </a>
            )}
          </div>

          {/* Code Generator */}
          <div className="w-full lg:w-2/3">
            <div className="card p-0 overflow-hidden">
              {/* Controls */}
              <div className="bg-dark-900/50 border-b border-gray-700 p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                  />
                  <FrameworkSelector
                    selectedFramework={selectedFramework}
                    onFrameworkChange={setSelectedFramework}
                    language={selectedLanguage}
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="btn-secondary flex items-center gap-2 flex-1 sm:flex-none"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </button>
                  <button
                    onClick={handleDownload}
                    className="btn-primary flex items-center gap-2 flex-1 sm:flex-none"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="h-96 lg:h-[600px]">
                <CodeEditor
                  code={generatedCode}
                  language={selectedLanguage}
                  theme="vs-dark"
                  onChange={() => {}} // Read-only
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}