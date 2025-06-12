import React from 'react';
import { Book, Code, Database, Settings } from 'lucide-react';

interface APISection {
  id: string;
  title: string;
  icon: React.ReactNode;
  category: 'components' | 'hooks' | 'types' | 'utilities';
}

interface APITopNavigationProps {
  sections: APISection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const categoryConfig = {
  components: {
    label: 'Components',
    color: 'var(--accent-primary)',
    bgColor: 'var(--accent-light)',
    icon: <Book size={16} />
  },
  hooks: {
    label: 'Hooks', 
    color: 'var(--success)',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    icon: <Code size={16} />
  },
  types: {
    label: 'Types',
    color: 'var(--warning)', 
    bgColor: 'rgba(245, 158, 11, 0.1)',
    icon: <Database size={16} />
  },
  utilities: {
    label: 'Utilities',
    color: 'var(--error)',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    icon: <Settings size={16} />
  }
};

export default function APITopNavigation({ sections, activeSection, onSectionClick }: APITopNavigationProps) {
  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, APISection[]>);

  return (
    <nav className="api-top-nav">
      <div className="api-nav-container">
        {Object.entries(groupedSections).map(([category, categorySections]) => (
          <div key={category} className="api-nav-category-group">
            <div className="api-nav-category-header">
              <span 
                className="api-nav-category-badge"
                style={{
                  color: categoryConfig[category as keyof typeof categoryConfig].color,
                  backgroundColor: categoryConfig[category as keyof typeof categoryConfig].bgColor
                }}
              >
                {categoryConfig[category as keyof typeof categoryConfig].icon}
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
      </div>
    </nav>
  );
}