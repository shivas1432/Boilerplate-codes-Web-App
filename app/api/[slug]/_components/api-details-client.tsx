'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { generateCode } from '@/lib/code-generator'
import type { APITemplate, Language, Framework } from '@/types/api'

interface APIDetailsClientProps {
  api: APITemplate
}

export default function APIDetailsClient({ api }: APIDetailsClientProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript')
  const [selectedFramework, setSelectedFramework] = useState<Framework>('vanilla')
  const [copied, setCopied] = useState(false)

  const code = generateCode(api, selectedLanguage, selectedFramework)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{api.icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{api.name}</h1>
              <p className="text-xl text-gray-300">{api.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full">
              {api.category}
            </span>
            <span className="flex items-center gap-1">
              ⭐ {api.popularity}% popularity
            </span>
            <a 
              href={api.documentation} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Documentation
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {api.features.map((feature, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-3">
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Section */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white">Code Example</h2>
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                className="bg-slate-700 text-white rounded px-3 py-1 border border-slate-600"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
              </select>

              {/* Framework Selector */}
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value as Framework)}
                className="bg-slate-700 text-white rounded px-3 py-1 border border-slate-600"
              >
                <option value="vanilla">Vanilla</option>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="angular">Angular</option>
              </select>

              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="relative">
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}