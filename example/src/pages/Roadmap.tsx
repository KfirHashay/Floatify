import React from 'react';
import { CheckCircle, Clock, Lightbulb, Zap, Users, Globe, ArrowRight, Calendar, Target } from 'lucide-react';
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
      {/* Hero Section */}
      <section className="roadmap-hero">
        <div className="roadmap-hero-content">
          <h1>Development Roadmap</h1>
          <p>
            Our journey to build the most developer-friendly overlay library for React.
            Track our progress and see what's coming next.
          </p>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="roadmap-overview">
        <div className="overview-grid">
          <div className="overview-card overview-card--completed">
            <div className="overview-icon">
              <CheckCircle size={24} />
            </div>
            <div className="overview-content">
              <div className="overview-number">{completedItems.length}</div>
              <div className="overview-label">Completed</div>
            </div>
          </div>
          
          <div className="overview-card overview-card--progress">
            <div className="overview-icon">
              <Clock size={24} />
            </div>
            <div className="overview-content">
              <div className="overview-number">{inProgressItems.length}</div>
              <div className="overview-label">In Progress</div>
            </div>
          </div>
          
          <div className="overview-card overview-card--planned">
            <div className="overview-icon">
              <Lightbulb size={24} />
            </div>
            <div className="overview-content">
              <div className="overview-number">{plannedItems.length}</div>
              <div className="overview-label">Planned</div>
            </div>
          </div>
          
          <div className="overview-card overview-card--target">
            <div className="overview-icon">
              <Target size={24} />
            </div>
            <div className="overview-content">
              <div className="overview-number">v1.0</div>
              <div className="overview-label">Target Release</div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="roadmap-timeline">
        {/* Completed Section */}
        <div className="timeline-section">
          <div className="timeline-header">
            <div className="timeline-status timeline-status--completed">
              <CheckCircle size={20} />
              <h2>Completed Features</h2>
              <span className="timeline-count">({completedItems.length})</span>
            </div>
          </div>
          
          <div className="timeline-grid">
            {completedItems.map((item, index) => (
              <RoadmapCard key={`completed-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* In Progress Section */}
        <div className="timeline-section">
          <div className="timeline-header">
            <div className="timeline-status timeline-status--progress">
              <Clock size={20} />
              <h2>Currently Working On</h2>
              <span className="timeline-count">({inProgressItems.length})</span>
            </div>
          </div>
          
          <div className="timeline-grid">
            {inProgressItems.map((item, index) => (
              <RoadmapCard key={`progress-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* Planned Section */}
        <div className="timeline-section">
          <div className="timeline-header">
            <div className="timeline-status timeline-status--planned">
              <Lightbulb size={20} />
              <h2>Upcoming Features</h2>
              <span className="timeline-count">({plannedItems.length})</span>
            </div>
          </div>
          
          <div className="timeline-grid">
            {plannedItems.map((item, index) => (
              <RoadmapCard key={`planned-${index}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Contributing Section */}
      <section className="roadmap-contribute">
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
      </section>
    </div>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const statusInfo = statusConfig[item.status];
  const categoryInfo = categoryConfig[item.category];
  const StatusIcon = statusInfo.icon;
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className={`roadmap-card roadmap-card--${item.status}`}>
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
    </div>
  );
}