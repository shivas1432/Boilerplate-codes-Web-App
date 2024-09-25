// Component optimized for CodeBoiler UI - Enhanced Sept 2024
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Language } from '@/types/api'

interface CodeEditorProps {
  code: string
  language: Language
  theme?: string
  onChange?: (value: string) => void
  readOnly?: boolean
}

export default function CodeEditor({ 
  code, 
  language, 
  theme = 'vs-dark', 
  onChange,
  readOnly = true 
}: CodeEditorProps) {
  const [Editor, setEditor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMonaco = async () => {
      try {
        const { Editor: MonacoEditor } = await import('@monaco-editor/react')
        setEditor(() => MonacoEditor)
      } catch (error) {
        console.error('Failed to load Monaco Editor:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMonaco()
  }, [])

  const getMonacoLanguage = (lang: Language): string => {
    switch (lang) {
      case 'javascript': return 'javascript'
      case 'typescript': return 'typescript'
      case 'python': return 'python'
      case 'php': return 'php'
      case 'go': return 'go'
      case 'rust': return 'rust'
      default: return 'javascript'
    }
  }

  if (isLoading) {
    return (
      <div className="h-full bg-dark-900 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">Loading editor...</p>
        </div>
      </div>
    )
  }

  if (!Editor) {
    return (
      <div className="h-full bg-dark-900 rounded-lg p-4 overflow-auto">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
          {code}
        </pre>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Editor
        value={code}
        language={getMonacoLanguage(language)}
        theme={theme}
        onChange={onChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineHeight: 20,
          fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
          automaticLayout: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'line',
          selectOnLineNumbers: true,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
        }}
        loading={
          <div className="h-full bg-dark-900 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      />
    </motion.div>
  )
}
