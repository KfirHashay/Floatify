import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

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
 * Professional CodeBlock component with VSCode Dark Modern theme,
 * enhanced syntax highlighting, animated copy button, and responsive design.
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
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  // Enhanced copy functionality with animation
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

  // Enhanced language detection with better colors
  const getLanguageInfo = (lang: string) => {
    const languages: Record<string, { label: string; color: string }> = {
      javascript: { label: 'JavaScript', color: '#f7df1e' },
      typescript: { label: 'TypeScript', color: '#3178c6' },
      jsx: { label: 'JSX', color: '#61dafb' },
      tsx: { label: 'TSX', color: '#61dafb' },
      css: { label: 'CSS', color: '#1572b6' },
      html: { label: 'HTML', color: '#e34f26' },
      json: { label: 'JSON', color: '#5d4e75' },
      bash: { label: 'Bash', color: '#4eaa25' },
      shell: { label: 'Shell', color: '#4eaa25' },
      python: { label: 'Python', color: '#3776ab' },
      sql: { label: 'SQL', color: '#336791' },
      yaml: { label: 'YAML', color: '#cb171e' },
      markdown: { label: 'Markdown', color: '#083fa1' },
      text: { label: 'Text', color: '#858585' }
    };
    return languages[lang.toLowerCase()] || { label: lang.toUpperCase(), color: '#858585' };
  };

  // Enhanced syntax highlighting with VSCode Dark Modern colors
  const highlightSyntax = (code: string, lang: string) => {
    if (lang === 'javascript' || lang === 'typescript' || lang === 'jsx' || lang === 'tsx') {
      return code
        .replace(/\b(const|let|var|function|class|import|export|from|default|return|if|else|for|while|try|catch|async|await|new|this|super|extends|implements|interface|type|enum|namespace)\b/g, '<span class="syntax-keyword">$1</span>')
        .replace(/\b(true|false|null|undefined|void)\b/g, '<span class="syntax-boolean">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="syntax-number">$1</span>')
        .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="syntax-string">$1$2$1</span>')
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '<span class="syntax-comment">$&</span>')
        .replace(/\b(React|useState|useEffect|useCallback|useMemo|Component|Fragment|Props|FC|ReactNode)\b/g, '<span class="syntax-react">$1</span>')
        .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="syntax-type">$1</span>');
    }
    
    if (lang === 'css') {
      return code
        .replace(/([.#]?[a-zA-Z-]+)\s*\{/g, '<span class="syntax-selector">$1</span> {')
        .replace(/([a-zA-Z-]+)\s*:/g, '<span class="syntax-property">$1</span>:')
        .replace(/:\s*([^;]+);/g, ': <span class="syntax-value">$1</span>;')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="syntax-comment">$&</span>')
        .replace(/@[a-zA-Z-]+/g, '<span class="syntax-at-rule">$&</span>');
    }

    if (lang === 'html') {
      return code
        .replace(/(<\/?)([a-zA-Z][a-zA-Z0-9]*)/g, '$1<span class="syntax-tag">$2</span>')
        .replace(/([a-zA-Z-]+)=("[^"]*")/g, '<span class="syntax-attribute">$1</span>=<span class="syntax-string">$2</span>')
        .replace(/<!--[\s\S]*?-->/g, '<span class="syntax-comment">$&</span>');
    }

    if (lang === 'bash' || lang === 'shell') {
      return code
        .replace(/^(\$|#)\s*/gm, '<span class="syntax-prompt">$&</span>')
        .replace(/\b(npm|yarn|git|cd|ls|mkdir|rm|cp|mv|chmod|sudo|echo|cat|grep|find|curl|wget)\b/g, '<span class="syntax-command">$1</span>')
        .replace(/(--?[a-zA-Z-]+)/g, '<span class="syntax-flag">$1</span>')
        .replace(/#.*$/gm, '<span class="syntax-comment">$&</span>');
    }

    return code;
  };

  const highlightedCode = highlightSyntax(code, language);
  const languageInfo = getLanguageInfo(language);

  return (
    <div className={`code-block ${className}`}>
      {/* Enhanced Header */}
      {(title || showLanguage || enableCopy) && (
        <div className="code-header">
          <div className="code-header-left">
            {title && (
              <div className="code-title">
                <span>{title}</span>
              </div>
            )}
            
            {showLanguage && (
              <div 
                className="code-language-tag"
                style={{ '--lang-color': languageInfo.color } as React.CSSProperties}
              >
                <span>{languageInfo.label}</span>
              </div>
            )}
          </div>
          
          <div className="code-header-right">
            {enableCopy && (
              <button
                className={`code-copy-btn ${copied ? 'code-copy-success' : ''}`}
                onClick={handleCopy}
                aria-label="Copy code to clipboard"
                title="Copy code"
              >
                <div className="code-copy-icon">
                  {copied ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </div>
                {copied && <div className="code-copy-ripple"></div>}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Code Content */}
      <div 
        className="code-content"
        style={{ maxHeight }}
      >
        <div className="code-inner">
          {/* Enhanced Line Numbers */}
          {showLineNumbers && (
            <div className="code-line-numbers">
              {lineNumbers.map((num) => (
                <div 
                  key={num} 
                  className={`code-line-number ${hoveredLine === num ? 'code-line-hover' : ''}`}
                  onMouseEnter={() => setHoveredLine(num)}
                  onMouseLeave={() => setHoveredLine(null)}
                >
                  <span className="code-line-number-text">{num}</span>
                  <div className="code-line-indicator"></div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Code */}
          <pre 
            ref={codeRef}
            className={`code-pre ${wordWrap ? 'code-word-wrap' : ''}`}
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