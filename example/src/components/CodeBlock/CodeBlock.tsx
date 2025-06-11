/**
 * Main CodeBlock Component
 * 
 * Professional code display with Prism.js highlighting, theming, and accessibility
 */

import React, { useMemo } from 'react';
import CodeHeader from './components/CodeHeader';
import CodeContent from './components/CodeContent';
import { usePrismHighlighting } from './hooks/usePrismHighlighting';
import { generateId } from './utils';
import type { CodeBlockProps } from './types';

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  title,
  showLineNumbers = true,
  enableCopy = true,
  maxHeight = 400,
  className = '',
  showLanguage = true,
  wordWrap = false,
  theme = 'dark',
  ariaLabel
}) => {
  // Memoized syntax highlighting with Prism.js
  const highlightedCode = usePrismHighlighting(code, language);
  
  // Memoized component ID for accessibility
  const componentId = useMemo(() => generateId('codeblock'), []);
  
  // Memoized copy handler
  const handleCopy = useMemo(() => (success: boolean) => {
    // Optional: Add analytics or custom copy handling
    if (success) {
      console.debug('Code copied successfully');
    }
  }, []);

  const blockClasses = [
    'code-block',
    `code-block--theme-${theme}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={blockClasses}
      data-theme={theme}
      data-language={language}
      id={componentId}
      role="region"
      aria-label={ariaLabel || `Code block${title ? `: ${title}` : ''}`}
    >
      <CodeHeader
        title={title}
        language={language}
        showLanguage={showLanguage}
        enableCopy={enableCopy}
        code={code}
        onCopy={handleCopy}
      />
      
      <CodeContent
        code={code}
        language={language}
        showLineNumbers={showLineNumbers}
        maxHeight={maxHeight}
        wordWrap={wordWrap}
        highlightedCode={highlightedCode}
      />
    </div>
  );
};

export default CodeBlock;