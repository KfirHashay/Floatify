/**
 * CodeBlock Type Definitions
 * 
 * Comprehensive typing for all CodeBlock components
 */

export type Theme = 'dark' | 'light' | 'auto';

export type Language = 
  | 'javascript' | 'typescript' | 'jsx' | 'tsx'
  | 'css' | 'scss' | 'html' | 'json' | 'yaml'
  | 'bash' | 'shell' | 'python' | 'sql'
  | 'markdown' | 'text' | 'plaintext';

export type CopyState = 'idle' | 'copying' | 'success' | 'error';

export interface CodeBlockProps {
  /**
   * The code content to display
   */
  code: string;
  
  /**
   * Programming language for syntax highlighting
   */
  language?: Language;
  
  /**
   * Optional title for the code block
   */
  title?: string;
  
  /**
   * Show line numbers
   * @default true
   */
  showLineNumbers?: boolean;
  
  /**
   * Enable copy functionality
   * @default true
   */
  enableCopy?: boolean;
  
  /**
   * Maximum height before scrolling (number in px or string with units)
   */
  maxHeight?: number | string;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Show language badge
   * @default true
   */
  showLanguage?: boolean;
  
  /**
   * Enable word wrap
   * @default false
   */
  wordWrap?: boolean;
  
  /**
   * Theme preference
   * @default 'dark'
   */
  theme?: Theme;
  
  /**
   * Custom aria label for accessibility
   */
  ariaLabel?: string;
}

export interface LanguageInfo {
  label: string;
  color: string;
  prismKey: string;
}

export interface CopyButtonProps {
  code: string;
  onCopy?: (success: boolean) => void;
  className?: string;
  ariaLabel?: string;
}

export interface CodeHeaderProps {
  title?: string;
  language?: Language;
  showLanguage: boolean;
  enableCopy: boolean;
  code: string;
  onCopy?: (success: boolean) => void;
}

export interface CodeContentProps {
  code: string;
  language: Language;
  showLineNumbers: boolean;
  maxHeight: number | string;
  wordWrap: boolean;
  highlightedCode: string;
}

export interface LineNumbersProps {
  lines: string[];
  startLine?: number;
}

export interface LanguageTagProps {
  language: Language;
  className?: string;
}