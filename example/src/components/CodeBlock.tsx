import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import Prism from 'prismjs';

// Import core Prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

export interface CodeBlockProps {
  /**
   * The code content to display
   */
  code: string;
  
  /**
   * Programming language for syntax highlighting
   */
  language?: string;
  
  /**
   * Optional title for the code block
   */
  title?: string;
  
  /**
   * Show line numbers
   */
  showLineNumbers?: boolean;
  
  /**
   * Enable copy functionality
   */
  enableCopy?: boolean;
  
  /**
   * Maximum height before scrolling (accepts number in px or string)
   */
  maxHeight?: number | string;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Show language badge
   */
  showLanguage?: boolean;
  
  /**
   * Enable word wrap
   */
  wordWrap?: boolean;
  
  /**
   * Theme variant (always dark for consistency)
   */
  theme?: 'dark' | 'light';
}

/**
 * Professional CodeBlock component with Prism.js syntax highlighting,
 * CSS variable theming, enhanced accessibility, and performance optimizations.
 * 
 * Features:
 * - Prism.js integration for robust syntax highlighting
 * - CSS custom properties for flexible theming
 * - Memoized highlighting for performance
 * - ARIA live region for copy feedback
 * - Content visibility optimization
 * - Type-safe props with proper defaults
 */
export default function CodeBlock({
  code,
  language = 'text',
  title,
  showLineNumbers = true,
  enableCopy = true,
  maxHeight = 400,
  className = '',
  showLanguage = true,
  wordWrap = false,
  theme = 'dark'
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  // Normalize maxHeight to string with px unit
  const normalizedMaxHeight = useMemo(() => {
    if (typeof maxHeight === 'number') {
      return `${maxHeight}px`;
    }
    return maxHeight;
  }, [maxHeight]);

  // Memoized Prism highlighting for performance
  const highlightedCode = useMemo(() => {
    // Validate language exists in Prism
    const validLanguage = Prism.languages[language] ? language : 'text';
    
    try {
      if (validLanguage === 'text') {
        // For plain text, escape HTML but don't highlight
        return code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }
      
      // Use Prism for syntax highlighting
      return Prism.highlight(code, Prism.languages[validLanguage], validLanguage);
    } catch (error) {
      console.warn(`Prism highlighting failed for language "${language}":`, error);
      // Fallback to escaped plain text
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
  }, [code, language]);

  // Enhanced copy functionality with accessibility
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyFeedback('Code copied to clipboard');
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback('');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      setCopyFeedback('Failed to copy code');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  // Generate line numbers efficiently
  const lineNumbers = useMemo(() => {
    return code.split('\n').map((_, index) => index + 1);
  }, [code]);

  // Enhanced language detection with better metadata
  const getLanguageInfo = (lang: string) => {
    const languages: Record<string, { label: string; color: string; family: string }> = {
      javascript: { label: 'JavaScript', color: '#f7df1e', family: 'script' },
      typescript: { label: 'TypeScript', color: '#3178c6', family: 'script' },
      jsx: { label: 'JSX', color: '#61dafb', family: 'script' },
      tsx: { label: 'TSX', color: '#61dafb', family: 'script' },
      css: { label: 'CSS', color: '#1572b6', family: 'style' },
      scss: { label: 'SCSS', color: '#cf649a', family: 'style' },
      html: { label: 'HTML', color: '#e34f26', family: 'markup' },
      json: { label: 'JSON', color: '#5d4e75', family: 'data' },
      bash: { label: 'Bash', color: '#4eaa25', family: 'shell' },
      shell: { label: 'Shell', color: '#4eaa25', family: 'shell' },
      python: { label: 'Python', color: '#3776ab', family: 'script' },
      sql: { label: 'SQL', color: '#336791', family: 'data' },
      yaml: { label: 'YAML', color: '#cb171e', family: 'data' },
      markdown: { label: 'Markdown', color: '#083fa1', family: 'markup' },
      text: { label: 'Text', color: '#858585', family: 'plain' }
    };
    return languages[lang.toLowerCase()] || { label: lang.toUpperCase(), color: '#858585', family: 'unknown' };
  };

  const languageInfo = getLanguageInfo(language);

  return (
    <div 
      className={`code-block ${className}`}
      data-theme={theme}
      data-language={language}
      data-family={languageInfo.family}
    >
      {/* ARIA live region for copy feedback */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {copyFeedback}
      </div>

      {/* Enhanced Header */}
      {(title || showLanguage || enableCopy) && (
        <div className="code-header">
          <div className="code-header-content">
            {title && (
              <h3 className="code-title">{title}</h3>
            )}
            
            {showLanguage && (
              <div 
                className="code-language-badge"
                style={{ 
                  '--lang-color': languageInfo.color,
                  '--lang-family': languageInfo.family
                } as React.CSSProperties}
              >
                <span className="code-language-label">{languageInfo.label}</span>
              </div>
            )}
          </div>
          
          {enableCopy && (
            <button
              className={`code-copy-button ${copied ? 'code-copy-success' : ''}`}
              onClick={handleCopy}
              aria-label={copied ? 'Code copied!' : 'Copy code to clipboard'}
              title={copied ? 'Copied!' : 'Copy code'}
              type="button"
            >
              <span className="code-copy-icon">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </span>
              <span className="code-copy-ripple" aria-hidden="true"></span>
            </button>
          )}
        </div>
      )}

      {/* Code Content with Performance Optimization */}
      <div 
        className="code-content"
        style={{ 
          maxHeight: normalizedMaxHeight,
          contentVisibility: 'auto',
          containIntrinsicSize: '0 400px'
        }}
      >
        <div className="code-viewport">
          {/* Line Numbers */}
          {showLineNumbers && (
            <div className="code-line-numbers" aria-hidden="true">
              {lineNumbers.map((num) => (
                <div key={num} className="code-line-number">
                  {num}
                </div>
              ))}
            </div>
          )}

          {/* Code Content */}
          <pre 
            className={`code-pre ${wordWrap ? 'code-word-wrap' : ''}`}
            tabIndex={0}
            role="region"
            aria-label={`Code block${title ? `: ${title}` : ''}`}
          >
            <code 
              className={`code-syntax language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}