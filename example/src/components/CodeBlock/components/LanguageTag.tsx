/**
 * Language Tag Component
 * 
 * Displays programming language with color coding
 */

import React from 'react';
import { getLanguageInfo } from '../utils';
import type { LanguageTagProps } from '../types';

const LanguageTag: React.FC<LanguageTagProps> = ({
  language,
  className = ''
}) => {
  const languageInfo = getLanguageInfo(language);

  return (
    <div 
      className={`code-language-tag ${className}`}
      style={{ '--lang-color': languageInfo.color } as React.CSSProperties}
    >
      <span>{languageInfo.label}</span>
    </div>
  );
};

export default LanguageTag;