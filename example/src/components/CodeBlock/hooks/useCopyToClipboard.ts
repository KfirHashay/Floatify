/**
 * Copy to Clipboard Hook
 * 
 * Enhanced clipboard functionality with state management and accessibility
 */

import { useState, useCallback, useRef } from 'react';
import type { CopyState } from '../types';

interface UseCopyToClipboardReturn {
  copyState: CopyState;
  copyToClipboard: (text: string) => Promise<boolean>;
  resetCopyState: () => void;
}

/**
 * Custom hook for clipboard operations with enhanced state management
 */
export const useCopyToClipboard = (
  onCopy?: (success: boolean) => void,
  resetDelay: number = 2000
): UseCopyToClipboardReturn => {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetCopyState = useCallback(() => {
    setCopyState('idle');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    setCopyState('copying');
    
    try {
      // Modern clipboard API with fallback
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('Fallback copy failed');
        }
      }
      
      setCopyState('success');
      onCopy?.(true);
      
      // Reset state after delay
      timeoutRef.current = setTimeout(() => {
        setCopyState('idle');
      }, resetDelay);
      
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopyState('error');
      onCopy?.(false);
      
      // Reset state after shorter delay for errors
      timeoutRef.current = setTimeout(() => {
        setCopyState('idle');
      }, 1000);
      
      return false;
    }
  }, [onCopy, resetDelay]);

  return {
    copyState,
    copyToClipboard,
    resetCopyState
  };
};