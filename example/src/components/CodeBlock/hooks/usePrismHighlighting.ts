/**
 * Prism.js Syntax Highlighting Hook
 * 
 * Memoized syntax highlighting with Prism.js for performance and safety
 */

import { useMemo } from 'react';
import Prism from 'prismjs';

// Import core Prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markdown';

import type { Language } from '../types';
import { getLanguageInfo, sanitizeCode } from '../utils';

/**
 * Custom hook for Prism.js syntax highlighting with memoization
 */
export const usePrismHighlighting = (code: string, language: Language) => {
  return useMemo(() => {
    try {
      const languageInfo = getLanguageInfo(language);
      const prismLanguage = Prism.languages[languageInfo.prismKey];
      
      if (!prismLanguage) {
        // Fallback to sanitized plain text if language not supported
        return sanitizeCode(code);
      }
      
      // Use Prism.js for safe syntax highlighting
      return Prism.highlight(code, prismLanguage, languageInfo.prismKey);
    } catch (error) {
      console.warn(`Failed to highlight code with language "${language}":`, error);
      // Fallback to sanitized plain text on error
      return sanitizeCode(code);
    }
  }, [code, language]);
};