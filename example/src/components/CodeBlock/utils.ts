/**
 * CodeBlock Utilities
 * 
 * Helper functions for language detection, theme management, and formatting
 */

import type { Language, LanguageInfo } from './types';

/**
 * Language configuration with Prism.js mapping
 */
export const LANGUAGE_CONFIG: Record<Language, LanguageInfo> = {
  javascript: { label: 'JavaScript', color: '#f7df1e', prismKey: 'javascript' },
  typescript: { label: 'TypeScript', color: '#3178c6', prismKey: 'typescript' },
  jsx: { label: 'JSX', color: '#61dafb', prismKey: 'jsx' },
  tsx: { label: 'TSX', color: '#61dafb', prismKey: 'tsx' },
  css: { label: 'CSS', color: '#1572b6', prismKey: 'css' },
  scss: { label: 'SCSS', color: '#cf649a', prismKey: 'scss' },
  html: { label: 'HTML', color: '#e34f26', prismKey: 'markup' },
  json: { label: 'JSON', color: '#5d4e75', prismKey: 'json' },
  yaml: { label: 'YAML', color: '#cb171e', prismKey: 'yaml' },
  bash: { label: 'Bash', color: '#4eaa25', prismKey: 'bash' },
  shell: { label: 'Shell', color: '#4eaa25', prismKey: 'shell' },
  python: { label: 'Python', color: '#3776ab', prismKey: 'python' },
  sql: { label: 'SQL', color: '#336791', prismKey: 'sql' },
  markdown: { label: 'Markdown', color: '#083fa1', prismKey: 'markdown' },
  text: { label: 'Text', color: '#858585', prismKey: 'text' },
  plaintext: { label: 'Plain Text', color: '#858585', prismKey: 'text' }
};

/**
 * Get language information for display and highlighting
 */
export const getLanguageInfo = (language: Language): LanguageInfo => {
  return LANGUAGE_CONFIG[language] || LANGUAGE_CONFIG.text;
};

/**
 * Normalize maxHeight prop to CSS value
 */
export const normalizeMaxHeight = (maxHeight: number | string): string => {
  if (typeof maxHeight === 'number') {
    return `${maxHeight}px`;
  }
  return maxHeight;
};

/**
 * Generate unique ID for accessibility
 */
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if code is likely to be long (for performance optimizations)
 */
export const isLongCode = (code: string): boolean => {
  return code.length > 5000 || code.split('\n').length > 200;
};

/**
 * Sanitize code for safe display
 */
export const sanitizeCode = (code: string): string => {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};