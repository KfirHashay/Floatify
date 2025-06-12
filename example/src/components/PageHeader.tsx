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
   * Icon to display alongside the badge
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
    badgeColor: 'var(--accent-primary)',
    badgeBg: 'var(--accent-light)'
  },
  secondary: {
    badgeColor: 'var(--success)',
    badgeBg: 'rgba(3, 218, 198, 0.1)'
  },
  accent: {
    badgeColor: 'var(--warning)',
    badgeBg: 'rgba(255, 193, 7, 0.1)'
  },
  success: {
    badgeColor: 'var(--success)',
    badgeBg: 'rgba(3, 218, 198, 0.1)'
  },
  warning: {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        '--badge-color': config.badgeColor,
        '--badge-bg': config.badgeBg
      } as React.CSSProperties}
    >
      <div className="page-header-content">
        <div className="page-header-main">
          {/* Badge */}
          {badge && (
            <motion.div 
              className="page-header-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1,
                ease: "easeOut"
              }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="page-header-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Actions */}
        {actions && (
          <motion.div 
            className="page-header-actions"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {actions}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}