import React from 'react';
import { CheckCircle, Clock, Lightbulb, Zap, Users, Globe, ArrowRight, Calendar, Target, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';

interface RoadmapItem {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'core' | 'features' | 'dx' | 'community';
  version?: string;
  quarter?: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: 'Core Overlay System',
    description: 'Basic overlay management with channels, cards, and state management',
    status: 'completed',
    category: 'core',
    version: 'v0.1.0',
    quarter: 'Q1 2024'
  },
  {
    title: 'Touch Gestures & Mobile Support',
    description: 'Swipe gestures, responsive design, and mobile-optimized interactions',
    status: 'completed',
    category: 'core',
    version: 'v0.2.0',
    quarter: 'Q1 2024'
  },
  {
    title: 'TypeScript Support',
    description: 'Full TypeScript coverage with comprehensive type definitions',
    status: 'completed',
    category: 'dx',
    version: 'v0.3.0',
    quarter: 'Q2 2024'
  },
  {
    title: 'Theme System & Dark Mode',
    description: 'CSS custom properties, dark/light themes, and customization options',
    status: 'completed',
    category: 'features',
    version: 'v0.4.0',
    quarter: 'Q2 2024'
  },
  {
    title: 'Accessibility Improvements',
    description: 'WCAG compliance, screen reader support, and keyboard navigation',
    status: 'in-progress',
    category: 'core',
    version: 'v0.5.0',
    quarter: 'Q3 2024'
  },
  {
    title: 'Animation System',
    description: 'Smooth transitions, micro-interactions, and customizable animations',
    status: 'in-progress',
    category: 'features',
    version: 'v0.5.0',
    quarter: 'Q3 2024'
  },
  {
    title: 'Notification History Panel',
    description: 'Persistent history of notifications with search and filtering',
    status: 'planned',
    category: 'features',
    version: 'v0.6.0',
    quarter: 'Q4 2024'
  },
  {
    title: 'Plugin System',
    description: 'Extensible architecture for custom overlay types and behaviors',
    status: 'planned',
    category: 'core',
    version: 'v0.7.0',
    quarter: 'Q1 2025'
  },
  {
    title: 'Advanced Positioning',
    description: 'Smart positioning, collision detection, and viewport awareness',
    status: 'planned',
    category: 'features',
    version: 'v0.8.0',
    quarter: 'Q1 2025'
  },
  {
    title: 'Performance Optimizations',
    description: 'Bundle size reduction, lazy loading, and rendering optimizations',
    status: 'planned',
    category: 'core',
    version: 'v0.9.0',
    quarter: 'Q2 2025'
  },
  {
    title: 'Web Notifications Integration',
    description: 'Browser notification API integration for background notifications',
    status: 'planned',
    category: 'features',
    version: 'v1.0.0',
    quarter: 'Q2 2025'
  },
  {
    title: 'Framework Adapters',
    description: 'Vue, Svelte, and Angular adapters for broader ecosystem support',
    status: 'planned',
    category: 'community',
    version: 'v1.1.0',
    quarter: 'Q3 2025'
  }
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    color: 'var(--success)',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)'
  },
  'in-progress': {
    icon: Clock,
    label: 'In Progress',
    color: 'var(--warning)',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)'
  },
  planned: {
    icon: Lightbulb,
    label: 'Planned',
    color: 'var(--text-tertiary)',
    bgColor: 'var(--bg-secondary)',
    borderColor: 'var(--border-primary)'
  }
};

const categoryConfig = {
  core: {
    icon: Zap,
    label: 'Core',
    color: 'var(--accent-primary)',
    bgColor: 'var(--accent-light)'
  },
  features: {
    icon: Globe,
    label: 'Features',
    color: 'var(--success)',
    bgColor: 'rgba(16, 185, 129, 0.1)'
  },
  dx: {
    icon: Target,
    label: 'Developer Experience',
    color: 'var(--warning)',
    bgColor: 'rgba(245, 158, 11, 0.1)'
  },
  community: {
    icon: Users,
    label: 'Community',
    color: 'var(--error)',
    bgColor: 'rgba(239, 68, 68, 0.1)'
  }
};

export default function Roadmap() {
  const completedItems = roadmapItems.filter(item => item.status === 'completed');
  const inProgressItems = roadmapItems.filter(item => item.status === 'in-progress');
  const plannedItems = roadmapItems.filter(item => item.status === 'planned');

  return (
    <div className="roadmap">
      {/* Reusable Page Header */}
      <PageHeader
        title="Development Roadmap"
        subtitle="Our journey to build the most developer-friendly overlay library for React. Track our progress and see what's coming next."
        badge="Roadmap"
        icon={<Rocket size={16} />}
        theme="accent"
      />

      {/* Progress Overview */}
      <motion.section 
        className="roadmap-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="overview-grid">
          {[
            {
              icon: <CheckCircle size={24} />,
              number: completedItems.length,
              label: 'Completed',
              color: 'var(--success)',
              bgColor: 'rgba(16, 185, 129, 0.1)'
            },
            {
              icon: <Clock size={24} />,
              number: inProgressItems.length,
              label: 'In Progress',
              color: 'var(--warning)',
              bgColor: 'rgba(245, 158, 11, 0.1)'
            },
            {
              icon: <Lightbulb size={24} />,
              number: plannedItems.length,
              label: 'Planned',
              color: 'var(--accent-primary)',
              bgColor: 'var(--accent-light)'
            },
            {
              icon: <Target size={24} />,
              number: 'v1.0',
              label: 'Target Release',
              color: 'var(--error)',
              bgColor: 'rgba(239, 68, 68, 0.1)'
            }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="overview-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              style={{
                '--gradient': `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                '--bg-color': item.bgColor
              } as React.CSSProperties}
            >
              <div className="overview-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="overview-content">
                <div className="overview-number">{item.number}</div>
                <div className="overview-label">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Roadmap Timeline */}
      <motion.section 
        className="roadmap-timeline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Completed Section */}
        <div className="timeline-section">
          <motion.div 
            className="timeline-header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="timeline-status timeline-status--completed">
              <CheckCircle size={20} />
              <h2>Completed Features</h2>
              <span className="timeline-count">({completedItems.length})</span>
            </div>
          </motion.div>
          
          <div className="timeline-grid">
            {completedItems.map((item, index) => (
              <motion.div
                key={`completed-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <RoadmapCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* In Progress Section */}
        <div className="timeline-section">
          <motion.div 
            className="timeline-header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="timeline-status timeline-status--progress">
              <Clock size={20} />
              <h2>Currently Working On</h2>
              <span className="timeline-count">({inProgressItems.length})</span>
            </div>
          </motion.div>
          
          <div className="timeline-grid">
            {inProgressItems.map((item, index) => (
              <motion.div
                key={`progress-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <RoadmapCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Planned Section */}
        <div className="timeline-section">
          <motion.div 
            className="timeline-header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="timeline-status timeline-status--planned">
              <Lightbulb size={20} />
              <h2>Upcoming Features</h2>
              <span className="timeline-count">({plannedItems.length})</span>
            </div>
          </motion.div>
          
          <div className="timeline-grid">
            {plannedItems.map((item, index) => (
              <motion.div
                key={`planned-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                <RoadmapCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contributing Section */}
      <motion.section 
        className="roadmap-contribute"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="contribute-content">
          <div className="contribute-text">
            <h2>Want to Contribute?</h2>
            <p>
              Floatify is open source and we welcome contributions from the community.
              Whether it's bug reports, feature requests, or code contributions, every bit helps!
            </p>
          </div>
          
          <div className="contribute-actions">
            <Button
              as="a"
              href="https://github.com/yourusername/floatify"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              rightIcon={<ArrowRight size={16} />}
            >
              View on GitHub
            </Button>
            <Button
              as="a"
              href="https://github.com/yourusername/floatify/issues"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              Report Issues
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const statusInfo = statusConfig[item.status];
  const categoryInfo = categoryConfig[item.category];
  const StatusIcon = statusInfo.icon;
  const CategoryIcon = categoryInfo.icon;

  return (
    <motion.div 
      className={`roadmap-card roadmap-card--${item.status}`}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="roadmap-card-header">
        <div className="roadmap-card-title">
          <h3>{item.title}</h3>
          {item.version && (
            <span className="roadmap-version">{item.version}</span>
          )}
        </div>
        
        <div className="roadmap-card-meta">
          <div className="roadmap-status" style={{ color: statusInfo.color }}>
            <StatusIcon size={16} />
            <span>{statusInfo.label}</span>
          </div>
        </div>
      </div>
      
      <p className="roadmap-card-description">{item.description}</p>
      
      <div className="roadmap-card-footer">
        <div className="roadmap-category" style={{ 
          color: categoryInfo.color,
          backgroundColor: categoryInfo.bgColor 
        }}>
          <CategoryIcon size={14} />
          <span>{categoryInfo.label}</span>
        </div>
        
        {item.quarter && (
          <div className="roadmap-quarter">
            <Calendar size={14} />
            <span>{item.quarter}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}