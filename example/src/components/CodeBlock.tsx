import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';

// Import Prism.js core and languages
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

// Language metadata for enhanced display
const LANGUAGE_META: Record<string, { label: string; family: string; color: string }> = {
  typescript: { label: 'TypeScript', family: 'JavaScript', color: '#3178c6' },
  javascript: { label: 'JavaScript', family: 'JavaScript', color: '#f7df1e' },
  jsx: { label: 'JSX', family: 'React', color: '#61dafb' },
  tsx: { label: 'TSX', family: 'React', color: '#61dafb' },
  bash: { label: 'Bash', family: 'Shell', color: '#4eaa25' },
  json: { label: 'JSON', family: 'Data', color: '#000000' },
  css: { label: 'CSS', family: 'Stylesheet', color: '#1572b6' },
  scss: { label: 'SCSS', family: 'Stylesheet', color: '#cf649a' },
  yaml: { label: 'YAML', family: 'Config', color: '#cb171e' },
  markdown: { label: 'Markdown', family: 'Markup', color: '#083fa1' },
  text: { label: 'Plain Text', family: 'Text', color: '#6b7280' },
};

export interface CodeBlockProps {
  /** The code content to display */
  code: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Optional title displayed in the header */
  title?: string;
  /** Show line numbers on the left side */
  showLineNumbers?: boolean;
  /** Enable copy-to-clipboard functionality */
  enableCopy?: boolean;
  /** Maximum height before scrolling kicks in */
  maxHeight?: number | string;
  /** Additional CSS class names */
  className?: string;
  /** Show language badge in header */
  showLanguage?: boolean;
  /** Enable word wrapping for long lines */
  wordWrap?: boolean;
  /** Theme override (auto-detects from data-theme by default) */
  theme?: 'dark' | 'light' | 'auto';
}

/**
 * Professional CodeBlock component with Prism.js syntax highlighting
 * 
 * Features:
 * - Prism.js integration for robust syntax highlighting
 * - VSCode Dark Modern theme authenticity
 * - Responsive design with mobile optimizations
 * - Copy-to-clipboard with animated feedback
 * - Accessibility with ARIA live regions
 * - Performance optimized with memoization
 * - CSS custom properties for easy theming
 * - Type-safe language validation
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
  theme = 'auto'
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Memoized syntax highlighting - prevents recalculation on every render
  const highlightedCode = useMemo(() => {
    try {
      // Validate language exists in Prism
      const prismLanguage = Prism.languages[language];
      if (!prismLanguage) {
        console.warn(`[CodeBlock] Language "${language}" not supported, falling back to plain text`);
        return escapeHtml(code);
      }
      
      // Safe highlighting with Prism.js
      return Prism.highlight(code, prismLanguage, language);
    } catch (error) {
      console.error('[CodeBlock] Highlighting failed:', error);
      return escapeHtml(code);
    }
  }, [code, language]);

  // Memoized line count calculation
  const lineCount = useMemo(() => code.split('\n').length, [code]);

  // Get language metadata
  const languageMeta = LANGUAGE_META[language] || LANGUAGE_META.text;

  // Normalize maxHeight to CSS value
  const normalizedMaxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

  // Copy to clipboard with error handling and accessibility
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('[CodeBlock] Copy failed:', error);
      // Fallback for older browsers
      fallbackCopy(code);
    }
  };

  // Build CSS classes
  const containerClasses = [
    'code-block',
    `code-block--${theme}`,
    wordWrap && 'code-block--wrap',
    className
  ].filter(Boolean).join(' ');

  const copyButtonClasses = [
    'code-block__copy',
    copied && 'code-block__copy--success'
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses}
      style={{ 
        '--code-max-height': normalizedMaxHeight,
        '--code-lang-color': languageMeta.color 
      } as React.CSSProperties}
      role="region"
      aria-label={`Code block${title ? `: ${title}` : ''}`}
    >
      {/* Header with title, language badge, and copy button */}
      {(title || showLanguage || enableCopy) && (
        <header className="code-block__header">
          <div className="code-block__meta">
            {title && (
              <h3 className="code-block__title">{title}</h3>
            )}
            {showLanguage && (
              <span 
                className="code-block__language"
                style={{ '--lang-color': languageMeta.color } as React.CSSProperties}
              >
                {languageMeta.label}
              </span>
            )}
          </div>

          {enableCopy && (
            <button
              className={copyButtonClasses}
              onClick={handleCopy}
              aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
              disabled={copied}
            >
              <span className="code-block__copy-icon">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </span>
              
              {/* Accessible feedback */}
              <span className="code-block__copy-feedback" aria-live="polite">
                {copied ? 'Copied!' : ''}
              </span>
            </button>
          )}
        </header>
      )}

      {/* Code content area */}
      <div className="code-block__content">
        {/* Line numbers */}
        {showLineNumbers && (
          <div className="code-block__lines" aria-hidden="true">
            {Array.from({ length: lineCount }, (_, i) => (
              <span key={i + 1} className="code-block__line-number">
                {i + 1}
              </span>
            ))}
          </div>
        )}

        {/* Code content with syntax highlighting */}
        <pre className="code-block__pre">
          <code 
            className={`code-block__code language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}

// Utility functions
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function fallbackCopy(text: string): void {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
  } catch (error) {
    console.error('[CodeBlock] Fallback copy failed:', error);
  } finally {
    document.body.removeChild(textArea);
  }
}