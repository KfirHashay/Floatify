/**
 * Code Content Component
 * 
 * Main code display with syntax highlighting and line numbers
 */

import React from 'react';
import LineNumbers from './LineNumbers';
import { normalizeMaxHeight, isLongCode } from '../utils';
import type { CodeContentProps } from '../types';

const CodeContent: React.FC<CodeContentProps> = ({
  code,
  language,
  showLineNumbers,
  maxHeight,
  wordWrap,
  highlightedCode
}) => {
  const lines = code.split('\n');
  const normalizedMaxHeight = normalizeMaxHeight(maxHeight);
  const isLong = isLongCode(code);

  return (
    <div 
      className="code-content"
      style={{ maxHeight: normalizedMaxHeight }}
    >
      <div className="code-inner">
        {showLineNumbers && (
          <LineNumbers lines={lines} />
        )}

        <pre 
          className={`code-pre ${wordWrap ? 'code-word-wrap' : ''}`}
          style={{
            // Performance optimization for long code
            contentVisibility: isLong ? 'auto' : 'visible'
          }}
        >
          <code 
            className={`code-syntax language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeContent;