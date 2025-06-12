import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  
  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: ReactNode;
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether the button should take full width of its container
   */
  fullWidth?: boolean;

  /**
   * Whether the button should have a glass effect
   */
  glass?: boolean;

  /**
   * Whether the button should have enhanced hover effects
   */
  enhanced?: boolean;
}

/**
 * Modern Button component with glassmorphism design and smooth interactions
 * 
 * Features:
 * - Multiple variants (primary, secondary, ghost, danger, success)
 * - Different sizes (sm, md, lg)
 * - Loading state with spinner
 * - Icon support (left/right)
 * - Full width option
 * - Glassmorphism effects
 * - Enhanced hover animations
 * - WCAG 2.1 AA compliant
 * - Keyboard accessible
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      glass = false,
      enhanced = true,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      fullWidth && 'btn-full-width',
      loading && 'btn-loading',
      glass && 'btn-glass',
      enhanced && 'btn-enhanced',
      className
    ].filter(Boolean).join(' ');

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Ripple effect container */}
        <span className="btn-ripple" aria-hidden="true" />
        
        {/* Shine effect */}
        <span className="btn-shine" aria-hidden="true" />
        
        {/* Content container */}
        <span className="btn-content-wrapper">
          {loading && (
            <span className="btn-spinner" aria-hidden="true">
              <svg
                className="btn-spinner-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="31.416"
                  strokeDashoffset="31.416"
                />
              </svg>
            </span>
          )}
          
          {!loading && leftIcon && (
            <span className="btn-icon btn-icon-left" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          
          <span className={`btn-content ${loading ? 'btn-content-loading' : ''}`}>
            {children}
          </span>
          
          {!loading && rightIcon && (
            <span className="btn-icon btn-icon-right" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;