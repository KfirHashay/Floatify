import React, { useState, useRef, useEffect } from 'react';
import { Copy, CheckCircle, Code } from 'lucide-react';

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
   * Maximum height before scrolling
   */
  maxHeight?: string;
  
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
}

/**
 * Professional CodeBlock component with syntax highlighting, line numbers, 
 * copy functionality, and full responsive design.
 * 
 * Features:
 * - Syntax highlighting for multiple languages
 * - Line numbers with proper alignment
 * - One-click copy with visual feedback
 * - Responsive design for all screen sizes
 * - Dark/light theme support
 * - Smooth animations and micro-interactions
 * - Accessibility compliant
 */
export default function CodeBlock({
  code,
  language = 'text',
  title,
  showLineNumbers = true,
  enableCopy = true,
  maxHeight = '400px',
  className = '',
  showLanguage = true,
  wordWrap = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if content is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (codeRef.current && containerRef.current) {
        const isOverflow = codeRef.current.scrollHeight > containerRef.current.clientHeight;
        setIsOverflowing(isOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [code]);

  // Copy functionality with feedback
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Generate line numbers
  const lines = code.split('\n');
  const lineNumbers = lines.map((_, index) => index + 1);

  // Language detection and formatting
  const getLanguageLabel = (lang: string) => {
    const languages: Record<string, string> = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      jsx: 'JSX',
      tsx: 'TSX',
      css: 'CSS',
      html: 'HTML',
      json: 'JSON',
      bash: 'Bash',
      shell: 'Shell',
      python: 'Python',
      sql: 'SQL',
      yaml: 'YAML',
      markdown: 'Markdown',
      text: 'Text'
    };
    return languages[lang.toLowerCase()] || lang.toUpperCase();
  };

  // Syntax highlighting (basic implementation)
  const highlightSyntax = (code: string, lang: string) => {
    if (lang === 'javascript' || lang === 'typescript' || lang === 'jsx' || lang === 'tsx') {
      return code
        .replace(/\b(const|let|var|function|class|import|export|from|default|return|if|else|for|while|try|catch|async|await)\b/g, '<span class="code-keyword">$1</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="code-boolean">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
        .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="code-string">$1$2$1</span>')
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '<span class="code-comment">$&</span>')
        .replace(/\b(React|useState|useEffect|useCallback|useMemo|Component)\b/g, '<span class="code-react">$1</span>');
    }
    
    if (lang === 'css') {
      return code
        .replace(/([.#]?[a-zA-Z-]+)\s*{/g, '<span class="code-selector">$1</span> {')
        .replace(/([a-zA-Z-]+)\s*:/g, '<span class="code-property">$1</span>:')
        .replace(/:\s*([^;]+);/g, ': <span class="code-value">$1</span>;')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="code-comment">$&</span>');
    }

    if (lang === 'html') {
      return code
        .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)/g, '$1<span class="code-tag">$2</span>')
        .replace(/([a-zA-Z-]+)=("[^"]*")/g, '<span class="code-attribute">$1</span>=<span class="code-string">$2</span>')
        .replace(/&lt;!--[\s\S]*?--&gt;/g, '<span class="code-comment">$&</span>');
    }

    return code;
  };

  const highlightedCode = highlightSyntax(code, language);

  return (
    <div className={`code-block ${className}`}>
      {/* Header */}
      {(title || showLanguage || enableCopy) && (
        <div className="code-block-header">
          <div className="code-block-info">
            {title && (
              <div className="code-block-title">
                <Code size={16} />
                <span>{title}</span>
              </div>
            )}
            {showLanguage && (
              <div className="code-block-language">
                {getLanguageLabel(language)}
              </div>
            )}
          </div>
          
          {enableCopy && (
            <button
              className="code-block-copy"
              onClick={handleCopy}
              aria-label="Copy code to clipboard"
              title="Copy code"
            >
              {copied ? (
                <>
                  <CheckCircle size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code Content */}
      <div 
        ref={containerRef}
        className={`code-block-content ${isOverflowing ? 'code-block-scrollable' : ''}`}
        style={{ maxHeight }}
      >
        <div className="code-block-inner">
          {/* Line Numbers */}
          {showLineNumbers && (
            <div className="code-block-line-numbers" aria-hidden="true">
              {lineNumbers.map((num) => (
                <div key={num} className="code-line-number">
                  {num}
                </div>
              ))}
            </div>
          )}

          {/* Code */}
          <pre 
            ref={codeRef}
            className={`code-block-pre ${wordWrap ? 'code-word-wrap' : ''}`}
          >
            <code 
              className={`code-block-code language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
      </div>

      {/* Scroll Indicator */}
      {isOverflowing && (
        <div className="code-block-scroll-indicator">
          <div className="scroll-hint">Scroll to see more</div>
        </div>
      )}
    </div>
  );
}