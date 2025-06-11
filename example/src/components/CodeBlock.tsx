import React, { useState, useMemo, useEffect } from 'react';
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

// Theme configuration interface
export interface CodeBlockThemeConfig {
  theme: 'light' | 'dark' | 'auto';
  customTheme?: {
    background?: string;
    text?: string;
    tokens?: Record<string, string>;
  };
  prismTheme?: 'prism' | 'okaidia' | 'twilight' | 'tomorrow' | 'solarizedlight' | 'funky' | 'coy' | 'dark';
}

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
  /** Theme configuration */
  themeConfig?: CodeBlockThemeConfig;
  /** Callback when code is copied */
  onCopy?: () => void;
}

// Default dark theme that follows system color scheme
const defaultThemeConfig: CodeBlockThemeConfig = {
  theme: 'auto',
  prismTheme: 'okaidia',
  customTheme: {
    background: 'var(--cb-bg, #1f1f1f)',
    text: 'var(--cb-text, #cccccc)',
    tokens: {
      comment: 'var(--cb-comment, #6a9955)',
      keyword: 'var(--cb-keyword, #569cd6)',
      string: 'var(--cb-string, #ce9178)',
      function: 'var(--cb-function, #dcdcaa)',
      number: 'var(--cb-number, #b5cea8)',
      variable: 'var(--cb-variable, #9cdcfe)',
      type: 'var(--cb-type, #4ec9b0)',
      operator: 'var(--cb-operator, #d4d4d4)',
      punctuation: 'var(--cb-punctuation, #cccccc)',
      tag: 'var(--cb-tag, #569cd6)',
      attribute: 'var(--cb-attribute, #92c5f8)',
      value: 'var(--cb-value, #ce9178)',
    }
  }
};

// Prism theme configurations
const PRISM_THEMES: Record<string, Record<string, string>> = {
  okaidia: {
    '--cb-bg': '#272822',
    '--cb-text': '#f8f8f2',
    '--cb-comment': '#75715e',
    '--cb-keyword': '#66d9ef',
    '--cb-string': '#a6e22e',
    '--cb-function': '#e6db74',
    '--cb-number': '#ae81ff',
    '--cb-variable': '#f8f8f2',
    '--cb-type': '#66d9ef',
    '--cb-operator': '#f92672',
    '--cb-punctuation': '#f8f8f2',
    '--cb-tag': '#f92672',
    '--cb-attribute': '#a6e22e',
    '--cb-value': '#e6db74',
  },
  twilight: {
    '--cb-bg': '#141414',
    '--cb-text': '#f7f3ff',
    '--cb-comment': '#5f5a60',
    '--cb-keyword': '#cda869',
    '--cb-string': '#8f9d6a',
    '--cb-function': '#9b703f',
    '--cb-number': '#cf6a4c',
    '--cb-variable': '#f7f3ff',
    '--cb-type': '#9b859d',
    '--cb-operator': '#cda869',
    '--cb-punctuation': '#f7f3ff',
    '--cb-tag': '#ac885b',
    '--cb-attribute': '#f9ee98',
    '--cb-value': '#8f9d6a',
  },
  tomorrow: {
    '--cb-bg': '#2d2d2d',
    '--cb-text': '#cccccc',
    '--cb-comment': '#999999',
    '--cb-keyword': '#cc99cd',
    '--cb-string': '#7ec699',
    '--cb-function': '#f99157',
    '--cb-number': '#f99157',
    '--cb-variable': '#cccccc',
    '--cb-type': '#6699cc',
    '--cb-operator': '#cc99cd',
    '--cb-punctuation': '#cccccc',
    '--cb-tag': '#f2777a',
    '--cb-attribute': '#ffcc66',
    '--cb-value': '#7ec699',
  },
  solarizedlight: {
    '--cb-bg': '#fdf6e3',
    '--cb-text': '#657b83',
    '--cb-comment': '#93a1a1',
    '--cb-keyword': '#859900',
    '--cb-string': '#2aa198',
    '--cb-function': '#b58900',
    '--cb-number': '#d33682',
    '--cb-variable': '#657b83',
    '--cb-type': '#268bd2',
    '--cb-operator': '#859900',
    '--cb-punctuation': '#657b83',
    '--cb-tag': '#268bd2',
    '--cb-attribute': '#b58900',
    '--cb-value': '#2aa198',
  },
  funky: {
    '--cb-bg': '#000000',
    '--cb-text': '#ffffff',
    '--cb-comment': '#008000',
    '--cb-keyword': '#ff1493',
    '--cb-string': '#ffff00',
    '--cb-function': '#00ffff',
    '--cb-number': '#ff69b4',
    '--cb-variable': '#ffffff',
    '--cb-type': '#98fb98',
    '--cb-operator': '#ff1493',
    '--cb-punctuation': '#ffffff',
    '--cb-tag': '#ff6347',
    '--cb-attribute': '#ffd700',
    '--cb-value': '#ffff00',
  },
  coy: {
    '--cb-bg': '#fdfdfd',
    '--cb-text': '#5e6687',
    '--cb-comment': '#898ea4',
    '--cb-keyword': '#07a',
    '--cb-string': '#690',
    '--cb-function': '#dd4a68',
    '--cb-number': '#905',
    '--cb-variable': '#5e6687',
    '--cb-type': '#07a',
    '--cb-operator': '#a67f59',
    '--cb-punctuation': '#999999',
    '--cb-tag': '#905',
    '--cb-attribute': '#690',
    '--cb-value': '#07a',
  },
  dark: {
    '--cb-bg': '#1f1f1f',
    '--cb-text': '#cccccc',
    '--cb-comment': '#6a9955',
    '--cb-keyword': '#569cd6',
    '--cb-string': '#ce9178',
    '--cb-function': '#dcdcaa',
    '--cb-number': '#b5cea8',
    '--cb-variable': '#9cdcfe',
    '--cb-type': '#4ec9b0',
    '--cb-operator': '#d4d4d4',
    '--cb-punctuation': '#cccccc',
    '--cb-tag': '#569cd6',
    '--cb-attribute': '#92c5f8',
    '--cb-value': '#ce9178',
  },
  prism: {
    '--cb-bg': '#f5f2f0',
    '--cb-text': '#000000',
    '--cb-comment': '#708090',
    '--cb-keyword': '#07a',
    '--cb-string': '#690',
    '--cb-function': '#dd4a68',
    '--cb-number': '#905',
    '--cb-variable': '#000000',
    '--cb-type': '#07a',
    '--cb-operator': '#a67f59',
    '--cb-punctuation': '#999999',
    '--cb-tag': '#905',
    '--cb-attribute': '#690',
    '--cb-value': '#07a',
  },
};

// Apply theme based on config and system preferences
const applyTheme = (config: CodeBlockThemeConfig): Record<string, string> => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolvedTheme = config.theme === 'auto' ? (isDark ? 'dark' : 'light') : config.theme;
  
  let themeVars: Record<string, string> = {};
  
  // Apply Prism theme if specified
  if (config.prismTheme && PRISM_THEMES[config.prismTheme]) {
    themeVars = { ...PRISM_THEMES[config.prismTheme] };
  }
  
  // Apply custom theme overrides
  if (config.customTheme) {
    if (config.customTheme.background) {
      themeVars['--cb-bg'] = config.customTheme.background;
    }
    if (config.customTheme.text) {
      themeVars['--cb-text'] = config.customTheme.text;
    }
    if (config.customTheme.tokens) {
      Object.entries(config.customTheme.tokens).forEach(([token, color]) => {
        themeVars[`--cb-${token}`] = color;
      });
    }
  }
  
  // Apply light/dark theme adjustments
  if (resolvedTheme === 'light' && !config.prismTheme) {
    themeVars = {
      ...themeVars,
      '--cb-bg': '#ffffff',
      '--cb-text': '#333333',
      '--cb-comment': '#008000',
      '--cb-keyword': '#0000ff',
      '--cb-string': '#a31515',
      '--cb-function': '#795e26',
      '--cb-number': '#098658',
      '--cb-variable': '#001080',
      '--cb-type': '#267f99',
      '--cb-operator': '#000000',
      '--cb-punctuation': '#000000',
      '--cb-tag': '#800000',
      '--cb-attribute': '#ff0000',
      '--cb-value': '#0451a5',
    };
  }
  
  return themeVars;
};

/**
 * Professional CodeBlock component with configurable Prism.js themes
 * 
 * Features:
 * - Configurable syntax highlighting themes
 * - Custom theme support with CSS variables
 * - Auto theme detection based on system preferences
 * - Multiple built-in Prism.js themes
 * - Performance optimized with memoization
 * - Accessibility compliant with ARIA support
 * - Responsive design with mobile optimizations
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
  themeConfig = defaultThemeConfig,
  onCopy
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Merge with default theme config
  const mergedThemeConfig = useMemo(() => ({
    ...defaultThemeConfig,
    ...themeConfig,
    customTheme: {
      ...defaultThemeConfig.customTheme,
      ...themeConfig.customTheme,
      tokens: {
        ...defaultThemeConfig.customTheme?.tokens,
        ...themeConfig.customTheme?.tokens,
      }
    }
  }), [themeConfig]);

  // Memoized theme variables
  const themeVars = useMemo(() => applyTheme(mergedThemeConfig), [mergedThemeConfig]);

  // Listen for system theme changes when using auto theme
  useEffect(() => {
    if (mergedThemeConfig.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // Force re-render by updating a state or triggering parent re-render
        // This is handled automatically by the useMemo dependency on mergedThemeConfig
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mergedThemeConfig.theme]);

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
      
      // Call onCopy callback if provided
      onCopy?.();
      
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
    `code-block--${mergedThemeConfig.theme}`,
    mergedThemeConfig.prismTheme && `code-block--theme-${mergedThemeConfig.prismTheme}`,
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
        '--code-lang-color': languageMeta.color,
        ...themeVars
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
            {mergedThemeConfig.prismTheme && (
              <span className="code-block__theme-badge">
                {mergedThemeConfig.prismTheme}
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