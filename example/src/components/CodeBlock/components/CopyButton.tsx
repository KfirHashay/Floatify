/**
 * Copy Button Component
 * 
 * Animated copy button with accessibility and state management
 */

import React from 'react';
import { Copy, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import type { CopyButtonProps } from '../types';

const CopyButton: React.FC<CopyButtonProps> = ({
  code,
  onCopy,
  className = '',
  ariaLabel = 'Copy code to clipboard'
}) => {
  const { copyState, copyToClipboard } = useCopyToClipboard(onCopy);

  const handleCopy = async () => {
    await copyToClipboard(code);
  };

  const getIcon = () => {
    switch (copyState) {
      case 'copying':
        return <Loader2 size={16} className="animate-spin" />;
      case 'success':
        return <Check size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return <Copy size={16} />;
    }
  };

  const getAriaLabel = () => {
    switch (copyState) {
      case 'copying':
        return 'Copying...';
      case 'success':
        return 'Copied successfully';
      case 'error':
        return 'Copy failed';
      default:
        return ariaLabel;
    }
  };

  return (
    <button
      className={`code-copy-btn code-copy-btn--${copyState} ${className}`}
      onClick={handleCopy}
      disabled={copyState === 'copying'}
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
    >
      <div className="code-copy-icon">
        {getIcon()}
      </div>
      
      {copyState === 'success' && (
        <div className="code-copy-ripple" />
      )}
      
      {/* Accessibility announcement */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {copyState === 'success' && 'Code copied to clipboard'}
        {copyState === 'error' && 'Failed to copy code'}
      </div>
    </button>
  );
};

export default CopyButton;