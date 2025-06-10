import React from 'react';
import { CheckCircle, Clock, Lightbulb, Zap, Users, Globe } from 'lucide-react';

interface RoadmapItem {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'core' | 'features' | 'dx' | 'community';
  version?: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: 'Core Overlay System',
    description: 'Basic overlay management with channels, cards, and state management',
    status: 'completed',
    category: 'core',
    version: 'v0.1.0'
  },
  {
    title: 'Touch Gestures & Mobile Support',
    description: 'Swipe gestures, responsive design, and mobile-optimized interactions',
    status: 'completed',
    category: 'core',
    version: 'v0.2.0'
  },
  {
    title: 'TypeScript Support',
    description: 'Full TypeScript coverage with comprehensive type definitions',
    status: 'completed',
    category: 'dx',
    version: 'v0.3.0'
  },
  {
    title: 'Theme System & Dark Mode',
    description: 'CSS custom properties, dark/light themes, and customization options',
    status: 'completed',
    category: 'features',
    version: 'v0.4.0'
  },
  {
    title: 'Accessibility Improvements',
    description: 'WCAG compliance, screen reader support, and keyboard navigation',
    status: 'in-progress',
    category: 'core',
    version: 'v0.5.0'
  },
  {
    title: 'Animation System',
    description: 'Smooth transitions, micro-interactions, and customizable animations',
    status: 'in-progress',
    category: 'features',
    version: 'v0.5.0'
  },
  {
    title: 'Notification History Panel',
    description: 'Persistent history of notifications with search and filtering',
    status: 'planned',
    category: 'features',
    version: 'v0.6.0'
  },
  {
    title: 'Plugin System',
    description: 'Extensible architecture for custom overlay types and behaviors',
    status: 'planned',
    category: 'core',
    version: 'v0.7.0'
  },
  {
    title: 'Advanced Positioning',
    description: 'Smart positioning, collision detection, and viewport awareness',
    status: 'planned',
    category: 'features',
    version: 'v0.8.0'
  },
  {
    title: 'Performance Optimizations',
    description: 'Bundle size reduction, lazy loading, and rendering optimizations',
    status: 'planned',
    category: 'core',
    version: 'v0.9.0'
  },
  {
    title: 'Web Notifications Integration',
    description: 'Browser notification API integration for background notifications',
    status: 'planned',
    category: 'features',
    version: 'v1.0.0'
  },
  {
    title: 'Framework Adapters',
    description: 'Vue, Svelte, and Angular adapters for broader ecosystem support',
    status: 'planned',
    category: 'community',
    version: 'v1.1.0'
  }
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    color: 'var(--success)',
    bgColor: 'rgba(16, 185, 129, 0.1)'
  },
  'in-progress': {
    icon: Clock,
    label: 'In Progress',
    color: 'var(--warning)',
    bgColor: 'rgba(245, 158, 11, 0.1)'
  },
  planned: {
    icon: Lightbulb,
    label: 'Planned',
    color: 'var(--text-tertiary)',
    bgColor: 'var(--bg-secondary)'
  }
};

const categoryConfig = {
  core: {
    icon: Zap,
    label: 'Core',
    color: 'var(--accent-primary)'
  },
  features: {
    icon: Globe,
    label: 'Features',
    color: 'var(--success)'
  },
  dx: {
    icon: Users,
    label: 'Developer Experience',
    color: 'var(--warning)'
  },
  community: {
    icon: Users,
    label: 'Community',
    color: 'var(--error)'
  }
};

export default function Roadmap() {
  const groupedItems = roadmapItems.reduce((acc, item) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    acc[item.status].push(item);
    return acc;
  }, {} as Record<string, RoadmapItem[]>);

  return (
    <div className="roadmap">
      {/* Header */}
      <section className="roadmap-header">
        <h1>Development Roadmap</h1>
        <p>
          Our journey to build the most developer-friendly overlay library for React.
          Track our progress and see what's coming next.
        </p>
      </section>

      {/* Stats */}
      <section className="roadmap-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{roadmapItems.filter(item => item.status === 'completed').length}</div>
            <div className="stat-label">Completed</div>
            <div className="stat-icon" style={{ color: statusConfig.completed.color }}>
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{roadmapItems.filter(item => item.status === 'in-progress').length}</div>
            <div className="stat-label">In Progress</div>
            <div className="stat-icon" style={{ color: statusConfig['in-progress'].color }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{roadmapItems.filter(item => item.status === 'planned').length}</div>
            <div className="stat-label">Planned</div>
            <div className="stat-icon" style={{ color: statusConfig.planned.color }}>
              <Lightbulb size={20} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">v1.0</div>
            <div className="stat-label">Target Release</div>
            <div className="stat-icon" style={{ color: 'var(--accent-primary)' }}>
              <Zap size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="roadmap-timeline">
        {Object.entries(groupedItems).map(([status, items]) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const Icon = config.icon;
          
          return (
            <div key={status} className="timeline-section">
              <div className="timeline-header">
                <div className="timeline-status">
                  <Icon size={24} style={{ color: config.color }} />
                  <h2>{config.label}</h2>
                  <span className="timeline-count">({items.length})</span>
                </div>
              </div>
              
              <div className="timeline-items">
                {items.map((item, index) => {
                  const CategoryIcon = categoryConfig[item.category].icon;
                  
                  return (
                    <div key={`${item.title}-${index}`} className="roadmap-item">
                      <div className="roadmap-item-header">
                        <div className="roadmap-item-title">
                          <h3>{item.title}</h3>
                          {item.version && (
                            <span className="roadmap-version">{item.version}</span>
                          )}
                        </div>
                        <div className="roadmap-item-category">
                          <CategoryIcon size={16} style={{ color: categoryConfig[item.category].color }} />
                          <span>{categoryConfig[item.category].label}</span>
                        </div>
                      </div>
                      <p className="roadmap-item-description">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Contributing */}
      <section className="contributing-section">
        <div className="contributing-content">
          <h2>Want to Contribute?</h2>
          <p>
            Floatify is open source and we welcome contributions from the community.
            Whether it's bug reports, feature requests, or code contributions, every bit helps!
          </p>
          <div className="contributing-actions">
            <a
              href="https://github.com/yourusername/floatify"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/yourusername/floatify/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Report Issues
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}