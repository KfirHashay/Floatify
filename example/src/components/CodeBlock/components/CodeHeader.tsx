/**
 * Code Header Component
 * 
 * Header section with title, language tag, and copy button
 */

import React from 'react';
import CopyButton from './CopyButton';
import LanguageTag from './LanguageTag';
import type { CodeHeaderProps } from '../types';

const CodeHeader: React.FC<CodeHeaderProps> = ({
  title,
  language = 'text',
  showLanguage,
  enableCopy,
  code,
  onCopy
}) => {
  // Don't render header if no content to show
  if (!title && !showLanguage && !enableCopy) {
    return null;
  }

  return (
    <div className="code-header">
      <div className="code-header-left">
        {title && (
          <div className="code-title">
            <span>{title}</span>
          </div>
        )}
        
        {showLanguage && (
          <LanguageTag language={language} />
        )}
      </div>
      
      <div className="code-header-right">
        {enableCopy && (
          <CopyButton 
            code={code}
            onCopy={onCopy}
          />
        )}
      </div>
    </div>
  );
};

export default CodeHeader;