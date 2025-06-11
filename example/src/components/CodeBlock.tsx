import React, { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'
import Prism from 'prismjs'


export interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  enableCopy?: boolean
  maxHeight?: string | number
  className?: string
  showLanguage?: boolean
  wordWrap?: boolean
}

export default function CodeBlock({
  code,
  language = 'text',
  title,
  showLineNumbers = true,
  enableCopy = true,
  maxHeight = 400,
  showLanguage = true,
  wordWrap = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const highlighted = useMemo(
    () =>
      typeof window !== 'undefined'
        ? Prism.highlight(code, Prism.languages[language] ?? Prism.languages.text, language)
        : code,
    [code, language]
  )

  const lineCount = useMemo(() => code.split('\n').length, [code])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* silent fail */
    }
  }

  return (
    <div
      className={'code-block'}
      style={{ '--cb-max-h': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } as React.CSSProperties}
    >
      {(title || showLanguage || enableCopy) && (
        <header className='cb-header'>
          <div className='cb-left'>
            {title && <span className='cb-title'>{title}</span>}
            {showLanguage && <span className='cb-lang'>{language.toUpperCase()}</span>}
          </div>

          {enableCopy && (
            <button
              className={'cb-copy', copied && 'is-copied'}
              onClick={handleCopy}
              aria-label='Copy code'
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {/* accessible live region */}
              <span className='sr-only' aria-live='polite'>
                {copied ? 'Copied' : ''}
              </span>
            </button>
          )}
        </header>
      )}

      <div className='cb-scroll'>
        {showLineNumbers && (
          <code aria-hidden className='cb-lines'>
            {Array.from({ length: lineCount }, (_, i) => i + 1).map(n => (
              <span key={n}>{n}</span>
            ))}
          </code>
        )}

        <pre
          className={'cb-pre', wordWrap && 'wrap'}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  )
}
