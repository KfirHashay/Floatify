import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, CheckCircle, Book, Code, Zap, Settings, Database, ArrowRight } from 'lucide-react';

interface APISection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'components' | 'hooks' | 'types' | 'utilities';
  items: APIItem[];
}

interface APIItem {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
  example?: string;
  since?: string;
}

const apiSections: APISection[] = [
  {
    id: 'floatify-component',
    title: 'Floatify Component',
    description: 'Main provider component that wraps your application and manages overlay state',
    icon: <Zap size={20} />,
    category: 'components',
    items: [
      {
        name: 'concurrencyMode',
        type: "'single' | 'multiple'",
        description: 'Controls how many overlays can be shown simultaneously',
        defaultValue: "'single'",
        example: `<Floatify concurrencyMode="multiple">`,
        since: 'v0.1.0'
      },
      {
        name: 'debug',
        type: 'boolean',
        description: 'Enables debug logging in development mode',
        defaultValue: 'false',
        example: `<Floatify debug>`,
        since: 'v0.1.0'
      },
      {
        name: 'sticky',
        type: 'boolean',
        description: 'Makes overlays stick to viewport when scrolling',
        defaultValue: 'false',
        example: `<Floatify sticky>`,
        since: 'v0.2.0'
      },
      {
        name: 'position',
        type: "'top' | 'bottom' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
        description: 'Controls overlay positioning on screen',
        defaultValue: "'top'",
        example: `<Floatify position="bottom">`,
        since: 'v0.2.0'
      },
      {
        name: 'portalRoot',
        type: 'HTMLElement',
        description: 'Custom DOM element to render overlays into',
        example: `<Floatify portalRoot={document.getElementById('overlays')}>`,
        since: 'v0.1.0'
      }
    ]
  },
  {
    id: 'use-aggregator-hook',
    title: 'useAggregator Hook',
    description: 'Primary hook for managing overlay state and performing actions',
    icon: <Code size={20} />,
    category: 'hooks',
    items: [
      {
        name: 'registerChannel',
        type: '(channelId: string, priority: number) => void',
        description: 'Register a new overlay channel with priority level',
        required: true,
        example: `const { registerChannel } = useAggregator();
registerChannel('notifications', 1);`,
        since: 'v0.1.0'
      },
      {
        name: 'addCard',
        type: '(channelId: string, card: OverlayCard) => void',
        description: 'Add a new overlay card to a specific channel',
        required: true,
        example: `addCard('notifications', {
  id: '1',
  title: 'Success!',
  content: 'Operation completed'
});`,
        since: 'v0.1.0'
      },
      {
        name: 'removeCard',
        type: '(channelId: string, cardId: string) => void',
        description: 'Remove a specific card from a channel',
        example: `removeCard('notifications', '1');`,
        since: 'v0.1.0'
      },
      {
        name: 'updateChannelState',
        type: "(channelId: string, state: OverlayState) => void",
        description: 'Update the display state of a channel',
        example: `updateChannelState('notifications', 'expanded');`,
        since: 'v0.1.0'
      },
      {
        name: 'swipeNextCard',
        type: '(channelId: string) => void',
        description: 'Navigate to the next card in a channel',
        example: `swipeNextCard('notifications');`,
        since: 'v0.2.0'
      },
      {
        name: 'swipePrevCard',
        type: '(channelId: string) => void',
        description: 'Navigate to the previous card in a channel',
        example: `swipePrevCard('notifications');`,
        since: 'v0.2.0'
      }
    ]
  },
  {
    id: 'overlay-card-interface',
    title: 'OverlayCard Interface',
    description: 'TypeScript interface defining the structure of overlay cards',
    icon: <Database size={20} />,
    category: 'types',
    items: [
      {
        name: 'id',
        type: 'string',
        description: 'Unique identifier for the card',
        required: true,
        example: `id: 'notification-1'`,
        since: 'v0.1.0'
      },
      {
        name: 'title',
        type: 'string',
        description: 'Optional heading text for the card',
        example: `title: 'Success!'`,
        since: 'v0.1.0'
      },
      {
        name: 'content',
        type: 'string',
        description: 'Main message content',
        required: true,
        example: `content: 'Your action was completed successfully'`,
        since: 'v0.1.0'
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Optional icon element to display',
        example: `icon: <CheckCircle />`,
        since: 'v0.1.0'
      },
      {
        name: 'autoDismiss',
        type: 'boolean',
        description: 'Whether the card should auto-dismiss',
        defaultValue: 'false',
        example: `autoDismiss: true`,
        since: 'v0.3.0'
      },
      {
        name: 'timestamp',
        type: 'number',
        description: 'Optional timestamp for sorting and analytics',
        example: `timestamp: Date.now()`,
        since: 'v0.1.0'
      }
    ]
  },
  {
    id: 'overlay-state-types',
    title: 'OverlayState Types',
    description: 'Available states for overlay channels and their behaviors',
    icon: <Settings size={20} />,
    category: 'types',
    items: [
      {
        name: 'hidden',
        type: 'OverlayState',
        description: 'Channel is not visible to users',
        since: 'v0.1.0'
      },
      {
        name: 'collapsed',
        type: 'OverlayState',
        description: 'Channel is visible but minimized',
        since: 'v0.1.0'
      },
      {
        name: 'expanded',
        type: 'OverlayState',
        description: 'Channel is fully expanded showing all content',
        since: 'v0.1.0'
      },
      {
        name: 'loading',
        type: 'OverlayState',
        description: 'Channel shows a loading spinner',
        since: 'v0.2.0'
      },
      {
        name: 'icon',
        type: 'OverlayState',
        description: 'Channel shows only an icon',
        since: 'v0.2.0'
      },
      {
        name: 'alert',
        type: 'OverlayState',
        description: 'Channel is in alert mode with special styling',
        since: 'v0.3.0'
      }
    ]
  }
];

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

export default function APIReference() {
  const [activeSection, setActiveSection] = useState<string>('floatify-component');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['floatify-component']));
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedItems(newExpanded);
  };

  const copyExample = (example: string, itemName: string) => {
    navigator.clipboard.writeText(example);
    setCopiedExample(itemName);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const groupedSections = apiSections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, APISection[]>);

  return (
    <div className="api-reference">
      {/* Hero Section */}
      <section className="api-hero">
        <div className="api-hero-content">
          <div className="api-hero-badge">
            <Book size={16} />
            API Documentation
          </div>
          <h1>API Reference</h1>
          <p>
            Complete reference for all Floatify components, hooks, and TypeScript interfaces.
            Everything you need to build amazing overlay experiences.
          </p>
        </div>
      </section>

      <div className="api-layout">
        {/* Sidebar Navigation */}
        <aside className="api-sidebar">
          <div className="api-sidebar-content">
            <div className="api-sidebar-header">
              <h3>Quick Navigation</h3>
            </div>
            
            {Object.entries(groupedSections).map(([category, sections]) => (
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
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className={`api-nav-item ${activeSection === section.id ? 'api-nav-item--active' : ''}`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      {section.icon}
                      <span>{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Start Link */}
            <div className="api-sidebar-footer">
              <a href="#" className="api-quick-start-link">
                <ArrowRight size={16} />
                View Examples
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="api-main">
          {/* API Sections */}
          <div className="api-sections">
            {apiSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="api-section"
              >
                <div className="api-section-header">
                  <div className="api-section-meta">
                    <div className="api-section-icon">
                      {section.icon}
                    </div>
                    <div className="api-section-info">
                      <div className="api-section-title-row">
                        <h2>{section.title}</h2>
                        <span 
                          className="api-section-category"
                          style={{
                            color: categoryConfig[section.category].color,
                            backgroundColor: categoryConfig[section.category].bgColor
                          }}
                        >
                          {categoryConfig[section.category].label}
                        </span>
                      </div>
                      <p className="api-section-description">{section.description}</p>
                    </div>
                  </div>
                  
                  <button
                    className="api-section-toggle"
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={expandedItems.has(section.id)}
                  >
                    {expandedItems.has(section.id) ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </button>
                </div>

                {expandedItems.has(section.id) && (
                  <div className="api-section-content">
                    <div className="api-items">
                      {section.items.map((item) => (
                        <div key={item.name} className="api-item">
                          <div className="api-item-header">
                            <div className="api-item-signature">
                              <code className="api-item-name">{item.name}</code>
                              <div className="api-item-meta">
                                {item.required && (
                                  <span className="api-item-required">required</span>
                                )}
                                {item.since && (
                                  <span className="api-item-since">since {item.since}</span>
                                )}
                              </div>
                            </div>
                            <code className="api-item-type">{item.type}</code>
                          </div>
                          
                          <div className="api-item-body">
                            <p className="api-item-description">{item.description}</p>
                            
                            {item.defaultValue && (
                              <div className="api-item-default">
                                <span className="api-item-label">Default:</span>
                                <code>{item.defaultValue}</code>
                              </div>
                            )}
                            
                            {item.example && (
                              <div className="api-item-example">
                                <div className="api-example-header">
                                  <span className="api-item-label">Example:</span>
                                  <button
                                    className="api-copy-button"
                                    onClick={() => copyExample(item.example!, item.name)}
                                    title="Copy example"
                                  >
                                    {copiedExample === item.name ? (
                                      <>
                                        <CheckCircle size={14} />
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Copy size={14} />
                                        Copy
                                      </>
                                    )}
                                  </button>
                                </div>
                                <div className="api-code-block">
                                  <pre><code>{item.example}</code></pre>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* TypeScript Usage Guide */}
          <section className="api-typescript-guide">
            <div className="api-guide-header">
              <h2>TypeScript Usage</h2>
              <p>Floatify is built with TypeScript and provides full type safety out of the box.</p>
            </div>
            
            <div className="api-guide-content">
              <div className="api-guide-example">
                <div className="api-example-header">
                  <span className="api-item-label">Import Types:</span>
                  <button
                    className="api-copy-button"
                    onClick={() => copyExample(`import { Floatify, useAggregator, type OverlayCard, type OverlayState } from 'floatify';`, 'typescript-imports')}
                  >
                    {copiedExample === 'typescript-imports' ? (
                      <>
                        <CheckCircle size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="api-code-block">
                  <pre><code>{`import { 
  Floatify, 
  useAggregator, 
  type OverlayCard, 
  type OverlayState 
} from 'floatify';`}</code></pre>
                </div>
              </div>

              <div className="api-guide-tips">
                <h3>Pro Tips</h3>
                <ul>
                  <li>All interfaces are exported as types for better tree-shaking</li>
                  <li>Use TypeScript's strict mode for the best development experience</li>
                  <li>The library provides comprehensive JSDoc comments for IntelliSense</li>
                  <li>Generic types are available for custom card data structures</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}