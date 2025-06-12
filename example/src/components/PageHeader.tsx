import React from 'react';
import { motion } from 'motion/react';

interface PageHeaderProps {
  /**
   * Main page title
   */
  title: string;
  
  /**
   * Subtitle or description
   */
  subtitle: string;
  
  /**
   * Optional badge text (e.g., "Beta", "New", "Updated")
   */
  badge?: string;
  
  /**
   * Icon to display alongside the title
   */
  icon?: React.ReactNode;
  
  /**
   * Background gradient theme
   */
  theme?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Optional action buttons or elements
   */
  actions?: React.ReactNode;
}

const themeConfig = {
  primary: {
    gradient: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
    glowColor: 'rgba(187, 134, 252, 0.15)',
    badgeColor: 'var(--accent-primary)',
    badgeBg: 'var(--accent-light)'
  },
  secondary: {
    gradient: 'linear-gradient(135deg, var(--success) 0%, #00A693 100%)',
    glowColor: 'rgba(3, 218, 198, 0.15)',
    badgeColor: 'var(--success)',
    badgeBg: 'rgba(3, 218, 198, 0.1)'
  },
  accent: {
    gradient: 'linear-gradient(135deg, var(--warning) 0%, #E68900 100%)',
    glowColor: 'rgba(255, 193, 7, 0.15)',
    badgeColor: 'var(--warning)',
    badgeBg: 'rgba(255, 193, 7, 0.1)'
  },
  success: {
    gradient: 'linear-gradient(135deg, var(--success) 0%, #16A085 100%)',
    glowColor: 'rgba(3, 218, 198, 0.15)',
    badgeColor: 'var(--success)',
    badgeBg: 'rgba(3, 218, 198, 0.1)'
  },
  warning: {
    gradient: 'linear-gradient(135deg, var(--error) 0%, #D32F2F 100%)',
    glowColor: 'rgba(207, 102, 121, 0.15)',
    badgeColor: 'var(--error)',
    badgeBg: 'rgba(207, 102, 121, 0.1)'
  }
};

export default function PageHeader({
  title,
  subtitle,
  badge,
  icon,
  theme = 'primary',
  className = '',
  actions
}: PageHeaderProps) {
  const config = themeConfig[theme];

  return (
    <motion.header 
      className={`page-header ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        '--header-gradient': config.gradient,
        '--header-glow': config.glowColor,
        '--badge-color': config.badgeColor,
        '--badge-bg': config.badgeBg
      } as React.CSSProperties}
    >
      {/* Animated background elements */}
      <div className="page-header-bg">
        <motion.div 
          className="page-header-glow page-header-glow--1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="page-header-glow page-header-glow--2"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="page-header-content">
        <motion.div 
          className="page-header-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Badge */}
          {badge && (
            <motion.div 
              className="page-header-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05 }}
            >
              {icon && (
                <span className="page-header-badge-icon">
                  {icon}
                </span>
              )}
              <span>{badge}</span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            className="page-header-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {title.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className="page-header-title-word"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4 + index * 0.1 
                }}
              >
                {word}
                {index < title.split(' ').length - 1 && ' '}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="page-header-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Actions */}
        {actions && (
          <motion.div 
            className="page-header-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {actions}
          </motion.div>
        )}
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="page-header-decoration"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="page-header-decoration-line" />
        <div className="page-header-decoration-dots">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="page-header-decoration-dot"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}