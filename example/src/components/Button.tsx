import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, MotionProps } from 'motion/react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /**
   * Visual style variant of the button
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
  
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
   * Whether the button should have enhanced hover effects
   */
  enhanced?: boolean;

  /**
   * Custom component to render as (e.g., 'a', Link, etc.)
   */
  as?: React.ElementType;

  /**
   * Motion animation props
   */
  motionProps?: MotionProps;
}

/**
 * Modern Button component with motion animations and enhanced theming
 * 
 * Features:
 * - Multiple variants with proper dark/light mode support
 * - Smooth motion animations and micro-interactions
 * - Loading state with spinner
 * - Icon support (left/right)
 * - Full width option
 * - Enhanced hover and press animations
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
      enhanced = true,
      disabled,
      children,
      className = '',
      as: Component = 'button',
      motionProps = {},
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth && 'btn--full-width',
      loading && 'btn--loading',
      enhanced && 'btn--enhanced',
      className
    ].filter(Boolean).join(' ');

    const isDisabled = disabled || loading;

    // Default motion props with satisfying animations
    const defaultMotionProps: MotionProps = {
      whileHover: enhanced && !isDisabled ? { 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      } : undefined,
      whileTap: enhanced && !isDisabled ? { 
        scale: 0.98,
        y: 0,
        transition: { duration: 0.1, ease: "easeInOut" }
      } : undefined,
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      },
      ...motionProps
    };

    const MotionComponent = motion(Component);

    return (
      <MotionComponent
        ref={ref}
        className={baseClasses}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...defaultMotionProps}
        {...props}
      >
        {/* Ripple effect container */}
        <span className="btn__ripple" aria-hidden="true" />
        
        {/* Shine effect */}
        <span className="btn__shine" aria-hidden="true" />
        
        {/* Content container */}
        <span className="btn__content">
          {loading && (
            <motion.span 
              className="btn__spinner" 
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                className="btn__spinner-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
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
                  style={{
                    animation: 'btn-dash 1.5s ease-in-out infinite'
                  }}
                />
              </motion.svg>
            </motion.span>
          )}
          
          {!loading && leftIcon && (
            <motion.span 
              className="btn__icon btn__icon--left" 
              aria-hidden="true"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {leftIcon}
            </motion.span>
          )}
          
          <motion.span 
            className={`btn__text ${loading ? 'btn__text--loading' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0.7 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
          
          {!loading && rightIcon && (
            <motion.span 
              className="btn__icon btn__icon--right" 
              aria-hidden="true"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {rightIcon}
            </motion.span>
          )}
        </span>
      </MotionComponent>
    );
  }
);

Button.displayName = 'Button';

export default Button;