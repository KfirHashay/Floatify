import React, { useState, useRef, useEffect } from 'react';
import { Copy, CheckCircle, Code2, Terminal, FileText } from 'lucide-react';

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
 * Professional CodeBlock component with VSCode-inspired dark theme,
 * syntax highlighting, line numbers, copy functionality, and full responsive design.
 * 
 * Features:
 * - VSCode dark theme colors and styling
 * - Enhanced syntax highlighting for multiple languages
 * - Animated line numbers with hover effects
 * - Smooth copy animation with success feedback
 * - Professional header with language tags
 * - Responsive design for all screen sizes
 * - Always dark theme for consistency
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
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
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

  // Enhanced copy functionality with animation
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Generate line numbers
  const lines = code.split('\n');
  const lineNumbers = lines.map((_, index) => index + 1);

  // Enhanced language detection with icons
  const getLanguageInfo = (lang: string) => {
    const languages: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
      javascript: { label: 'JavaScript', icon: <Code2 size={12} />, color: '#f7df1e' },
      typescript: { label: 'TypeScript', icon: <Code2 size={12} />, color: '#3178c6' },
      jsx: { label: 'JSX', icon: <Code2 size={12} />, color: '#61dafb' },
      tsx: { label: 'TSX', icon: <Code2 size={12} />, color: '#61dafb' },
      css: { label: 'CSS', icon: <FileText size={12} />, color: '#1572b6' },
      html: { label: 'HTML', icon: <FileText size={12} />, color: '#e34f26' },
      json: { label: 'JSON', icon: <FileText size={12} />, color: '#000000' },
      bash: { label: 'Bash', icon: <Terminal size={12} />, color: '#4eaa25' },
      shell: { label: 'Shell', icon: <Terminal size={12} />, color: '#4eaa25' },
      python: { label: 'Python', icon: <Code2 size={12} />, color: '#3776ab' },
      sql: { label: 'SQL', icon: <FileText size={12} />, color: '#336791' },
      yaml: { label: 'YAML', icon: <FileText size={12} />, color: '#cb171e' },
      markdown: { label: 'Markdown', icon: <FileText size={12} />, color: '#083fa1' },
      text: { label: 'Text', icon: <FileText size={12} />, color: '#6a737d' }
    };
    return languages[lang.toLowerCase()] || { label: lang.toUpperCase(), icon: <Code2 size={12} />, color: '#6a737d' };
  };

  // Enhanced syntax highlighting with VSCode colors
  const highlightSyntax = (code: string, lang: string) => {
    if (lang === 'javascript' || lang === 'typescript' || lang === 'jsx' || lang === 'tsx') {
      return code
        .replace(/\b(const|let|var|function|class|import|export|from|default|return|if|else|for|while|try|catch|async|await|new|this|super|extends|implements|interface|type|enum|namespace)\b/g, '<span class="vscode-keyword">$1</span>')
        .replace(/\b(true|false|null|undefined|void)\b/g, '<span class="vscode-boolean">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="vscode-number">$1</span>')
        .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="vscode-string">$1$2$1</span>')
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '<span class="vscode-comment">$&</span>')
        .replace(/\b(React|useState|useEffect|useCallback|useMemo|Component|Fragment|Props|FC|ReactNode)\b/g, '<span class="vscode-react">$1</span>')
        .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="vscode-type">$1</span>');
    }
    
    if (lang === 'css') {
      return code
        .replace(/([.#]?[a-zA-Z-]+)\s*\{/g, '<span class="vscode-selector">$1</span> {')
        .replace(/([a-zA-Z-]+)\s*:/g, '<span class="vscode-property">$1</span>:')
        .replace(/:\s*([^;]+);/g, ': <span class="vscode-value">$1</span>;')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="vscode-comment">$&</span>')
        .replace(/@[a-zA-Z-]+/g, '<span class="vscode-at-rule">$&</span>');
    }

    if (lang === 'html') {
      return code
        .replace(/(<\/?)([a-zA-Z][a-zA-Z0-9]*)/g, '$1<span class="vscode-tag">$2</span>')
        .replace(/([a-zA-Z-]+)=("[^"]*")/g, '<span class="vscode-attribute">$1</span>=<span class="vscode-string">$2</span>')
        .replace(/<!--[\s\S]*?-->/g, '<span class="vscode-comment">$&</span>');
    }

    if (lang === 'bash' || lang === 'shell') {
      return code
        .replace(/^(\$|#)\s*/gm, '<span class="vscode-prompt">$&</span>')
        .replace(/\b(npm|yarn|git|cd|ls|mkdir|rm|cp|mv|chmod|sudo|echo|cat|grep|find|curl|wget)\b/g, '<span class="vscode-command">$1</span>')
        .replace(/(--?[a-zA-Z-]+)/g, '<span class="vscode-flag">$1</span>')
        .replace(/#.*$/gm, '<span class="vscode-comment">$&</span>');
    }

    return code;
  };

  const highlightedCode = highlightSyntax(code, language);
  const languageInfo = getLanguageInfo(language);

  return (
    <div className={`vscode-code-block ${className}`}>
      {/* Enhanced Header */}
      {(title || showLanguage || enableCopy) && (
        <div className="vscode-header">
          <div className="vscode-header-left">
            <div className="vscode-window-controls">
              <div className="vscode-control vscode-control-close"></div>
              <div className="vscode-control vscode-control-minimize"></div>
              <div className="vscode-control vscode-control-maximize"></div>
            </div>
            
            {title && (
              <div className="vscode-title">
                <Code2 size={14} />
                <span>{title}</span>
              </div>
            )}
          </div>
          
          <div className="vscode-header-right">
            {showLanguage && (
              <div 
                className="vscode-language-tag"
                style={{ '--lang-color': languageInfo.color } as React.CSSProperties}
              >
                {languageInfo.icon}
                <span>{languageInfo.label}</span>
              </div>
            )}
            
            {enableCopy && (
              <button
                className={`vscode-copy-btn ${copied ? 'vscode-copy-success' : ''}`}
                onClick={handleCopy}
                aria-label="Copy code to clipboard"
                title="Copy code"
              >
                <div className="vscode-copy-icon">
                  {copied ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                </div>
                <span className="vscode-copy-text">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
                {copied && <div className="vscode-copy-ripple"></div>}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Code Content */}
      <div 
        ref={containerRef}
        className={`vscode-content ${isOverflowing ? 'vscode-scrollable' : ''}`}
        style={{ maxHeight }}
      >
        <div className="vscode-inner">
          {/* Enhanced Line Numbers */}
          {showLineNumbers && (
            <div className="vscode-line-numbers">
              {lineNumbers.map((num) => (
                <div 
                  key={num} 
                  className={`vscode-line-number ${hoveredLine === num ? 'vscode-line-hover' : ''}`}
                  onMouseEnter={() => setHoveredLine(num)}
                  onMouseLeave={() => setHoveredLine(null)}
                >
                  <span className="vscode-line-number-text">{num}</span>
                  <div className="vscode-line-indicator"></div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Code */}
          <pre 
            ref={codeRef}
            className={`vscode-pre ${wordWrap ? 'vscode-word-wrap' : ''}`}
          >
            <code 
              className={`vscode-code language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      {isOverflowing && (
        <div className="vscode-scroll-indicator">
          <div className="vscode-scroll-hint">
            <div className="vscode-scroll-icon">⌄</div>
            <span>Scroll for more</span>
          </div>
        </div>
      )}
    </div>
  );
}