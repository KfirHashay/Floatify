import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, CheckCircle } from 'lucide-react';

interface APISection {
  title: string;
  description: string;
  items: APIItem[];
}

interface APIItem {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
  example?: string;
}

const apiSections: APISection[] = [
  {
    title: 'Floatify Component',
    description: 'Main provider component that wraps your application',
    items: [
      {
        name: 'concurrencyMode',
        type: "'single' | 'multiple'",
        description: 'Controls how many overlays can be shown simultaneously',
        defaultValue: "'single'",
        example: `<Floatify concurrencyMode="multiple">`
      },
      {
        name: 'debug',
        type: 'boolean',
        description: 'Enables debug logging in development',
        defaultValue: 'false',
        example: `<Floatify debug>`
      },
      {
        name: 'sticky',
        type: 'boolean',
        description: 'Makes overlays stick to viewport when scrolling',
        defaultValue: 'false',
        example: `<Floatify sticky>`
      },
      {
        name: 'position',
        type: "'top' | 'bottom' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
        description: 'Controls overlay positioning on screen',
        defaultValue: "'top'",
        example: `<Floatify position="bottom">`
      },
      {
        name: 'portalRoot',
        type: 'HTMLElement',
        description: 'Custom DOM element to render overlays into',
        example: `<Floatify portalRoot={document.getElementById('overlays')}>`
      }
    ]
  },
  {
    title: 'useAggregator Hook',
    description: 'Hook for managing overlay state and actions',
    items: [
      {
        name: 'registerChannel',
        type: '(channelId: string, priority: number) => void',
        description: 'Register a new overlay channel with priority',
        required: true,
        example: `registerChannel('notifications', 1)`
      },
      {
        name: 'addCard',
        type: '(channelId: string, card: OverlayCard) => void',
        description: 'Add a new overlay card to a channel',
        required: true,
        example: `addCard('notifications', { id: '1', title: 'Hello', content: 'World' })`
      },
      {
        name: 'removeCard',
        type: '(channelId: string, cardId: string) => void',
        description: 'Remove a specific card from a channel',
        example: `removeCard('notifications', '1')`
      },
      {
        name: 'updateChannelState',
        type: "(channelId: string, state: OverlayState) => void",
        description: 'Update the display state of a channel',
        example: `updateChannelState('notifications', 'expanded')`
      },
      {
        name: 'swipeNextCard',
        type: '(channelId: string) => void',
        description: 'Navigate to the next card in a channel',
        example: `swipeNextCard('notifications')`
      },
      {
        name: 'swipePrevCard',
        type: '(channelId: string) => void',
        description: 'Navigate to the previous card in a channel',
        example: `swipePrevCard('notifications')`
      }
    ]
  },
  {
    title: 'OverlayCard Interface',
    description: 'Structure for overlay card data',
    items: [
      {
        name: 'id',
        type: 'string',
        description: 'Unique identifier for the card',
        required: true,
        example: `id: 'notification-1'`
      },
      {
        name: 'title',
        type: 'string',
        description: 'Optional heading text for the card',
        example: `title: 'Success!'`
      },
      {
        name: 'content',
        type: 'string',
        description: 'Main message content',
        required: true,
        example: `content: 'Your action was completed successfully'`
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Optional icon element to display',
        example: `icon: <CheckCircle />`
      },
      {
        name: 'autoDismiss',
        type: 'boolean',
        description: 'Whether the card should auto-dismiss',
        defaultValue: 'false',
        example: `autoDismiss: true`
      },
      {
        name: 'timestamp',
        type: 'number',
        description: 'Optional timestamp for sorting/analytics',
        example: `timestamp: Date.now()`
      }
    ]
  },
  {
    title: 'OverlayState Types',
    description: 'Available states for overlay channels',
    items: [
      {
        name: 'hidden',
        type: 'OverlayState',
        description: 'Channel is not visible'
      },
      {
        name: 'collapsed',
        type: 'OverlayState',
        description: 'Channel is visible but minimized'
      },
      {
        name: 'expanded',
        type: 'OverlayState',
        description: 'Channel is fully expanded showing all content'
      },
      {
        name: 'loading',
        type: 'OverlayState',
        description: 'Channel shows a loading spinner'
      },
      {
        name: 'icon',
        type: 'OverlayState',
        description: 'Channel shows only an icon'
      },
      {
        name: 'alert',
        type: 'OverlayState',
        description: 'Channel is in alert mode with special styling'
      }
    ]
  }
];

export default function APIReference() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Floatify Component']));
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const copyExample = (example: string, itemName: string) => {
    navigator.clipboard.writeText(example);
    setCopiedExample(itemName);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <div className="api-reference">
      {/* Header */}
      <section className="api-header">
        <h1>API Reference</h1>
        <p>
          Complete reference for all Floatify components, hooks, and TypeScript interfaces.
          All examples are copy-paste ready.
        </p>
      </section>

      {/* Quick Navigation */}
      <section className="api-nav">
        <h2>Quick Navigation</h2>
        <div className="api-nav-grid">
          {apiSections.map((section) => (
            <button
              key={section.title}
              className="api-nav-item"
              onClick={() => {
                const element = document.getElementById(section.title.toLowerCase().replace(/\s+/g, '-'));
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section.title}
            </button>
          ))}
        </div>
      </section>

      {/* API Sections */}
      <section className="api-sections">
        {apiSections.map((section) => (
          <div
            key={section.title}
            id={section.title.toLowerCase().replace(/\s+/g, '-')}
            className="api-section"
          >
            <button
              className="api-section-header"
              onClick={() => toggleSection(section.title)}
            >
              <div className="api-section-title">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
              {expandedSections.has(section.title) ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>

            {expandedSections.has(section.title) && (
              <div className="api-section-content">
                <div className="api-items">
                  {section.items.map((item) => (
                    <div key={item.name} className="api-item">
                      <div className="api-item-header">
                        <div className="api-item-name">
                          <code>{item.name}</code>
                          {item.required && <span className="api-required">required</span>}
                        </div>
                        <div className="api-item-type">
                          <code>{item.type}</code>
                        </div>
                      </div>
                      
                      <div className="api-item-description">
                        {item.description}
                      </div>
                      
                      {item.defaultValue && (
                        <div className="api-item-default">
                          <strong>Default:</strong> <code>{item.defaultValue}</code>
                        </div>
                      )}
                      
                      {item.example && (
                        <div className="api-item-example">
                          <div className="api-example-header">
                            <span>Example:</span>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => copyExample(item.example!, item.name)}
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
                          <pre><code>{item.example}</code></pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* TypeScript Usage */}
      <section className="typescript-section">
        <h2>TypeScript Usage</h2>
        <p>Floatify is built with TypeScript and provides full type safety out of the box.</p>
        
        <div className="typescript-example">
          <div className="code-header">
            <h3>Import Types</h3>
            <button
              className="btn btn-ghost"
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
          <pre><code>{`import { 
  Floatify, 
  useAggregator, 
  type OverlayCard, 
  type OverlayState 
} from 'floatify';`}</code></pre>
        </div>
      </section>
    </div>
  );
}