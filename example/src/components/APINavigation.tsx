import React from 'react';
import { Book, Code, Database, Settings, Zap, ArrowRight } from 'lucide-react';

interface APISection {
  id: string;
  title: string;
  icon: React.ReactNode;
  category: 'components' | 'hooks' | 'types' | 'utilities';
}

interface APINavigationProps {
  sections: APISection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const categoryConfig = {
  components: {
    label: 'Components',
    color: 'var(--accent-primary)',
    bgColor: 'var(--accent-light)'
  },
  hooks: {
    label: 'Hooks',
    color: 'var(--success)',
    bgColor: 'rgba(16, 185, 129, 0.1)'
  },
  types: {
    label: 'Types',
    color: 'var(--warning)',
    bgColor: 'rgba(245, 158, 11, 0.1)'
  },
  utilities: {
    label: 'Utilities',
    color: 'var(--error)',
    bgColor: 'rgba(239, 68, 68, 0.1)'
  }
};

export default function APINavigation({ sections, activeSection, onSectionClick }: APINavigationProps) {
  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, APISection[]>);

  return (
    <aside className="api-sidebar">
      <div className="api-sidebar-content">
        <div className="api-sidebar-header">
          <h3>Quick Navigation</h3>
        </div>
        
        {Object.entries(groupedSections).map(([category, categorySections]) => (
          <div key={category} className="api-nav-group">
            <div className="api-nav-group-header">
              <span 
                className="api-nav-category"
                style={{
                  color: categoryConfig[category as keyof typeof categoryConfig].color,
                  backgroundColor: categoryConfig[category as keyof typeof categoryConfig].bgColor
                }}
              >
                {categoryConfig[category as keyof typeof categoryConfig].label}
              </span>
            </div>
            <div className="api-nav-items">
              {categorySections.map((section) => (
                <button
                  key={section.id}
                  className={`api-nav-item ${activeSection === section.id ? 'api-nav-item--active' : ''}`}
                  onClick={() => onSectionClick(section.id)}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="api-sidebar-footer">
          <a href="/examples" className="api-quick-start-link">
            <ArrowRight size={16} />
            View Examples
          </a>
        </div>
      </div>
    </aside>
  );
}