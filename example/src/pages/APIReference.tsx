import React, { useState, useEffect } from 'react';
import { Book, Code, Database, Settings, Github, ExternalLink, Sparkles, Zap, Users, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import PageHeader from '../components/PageHeader';
import APITopNavigation from '../components/APITopNavigation';
import APISection from '../components/APISection';
import CodeBlock from '../components/CodeBlock';
import Button from '../components/Button';

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
    icon: <Code size={20} />,
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
        name: 'fixedToViewport',
        type: 'boolean',
        description: 'Makes overlays stick to viewport when scrolling',
        defaultValue: 'true',
        example: `<Floatify fixedToViewport>`,
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
      },
      {
        name: 'splitLoading',
        type: 'boolean',
        description: 'Use split layout while a channel is loading',
        defaultValue: 'true',
        example: `<Floatify splitLoading>`,
        since: 'v0.4.0'
      },
      {
        name: 'defaultBubbleIcons',
        type: '{ message: ReactNode; loading: ReactNode; alert: ReactNode; }',
        description: 'Icons used when a card does not specify a bubble icon',
        example: `<Floatify defaultBubbleIcons={{ message: <MessageCircle />, loading: <Loader2 />, alert: <AlertCircle /> }}>`,
        since: 'v0.4.0'
      }
    ]
  },
  {
    id: 'use-aggregator-hook',
    title: 'useAggregator Hook',
    description: 'Primary hook for managing overlay state and performing actions',
    icon: <Settings size={20} />,
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
        name: 'bubbleIcon',
        type: 'ReactNode',
        description: 'Icon shown when the card is minimized to a bubble',
        example: `bubbleIcon: <MessageCircle />`,
        since: 'v0.4.0'
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
    icon: <Book size={20} />,
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
        name: 'split',
        type: 'OverlayState',
        description: 'Channel uses split layout with content and bubble',
        since: 'v0.4.0'
      },
      {
        name: 'bubble',
        type: 'OverlayState',
        description: 'Channel is minimized to a bubble icon',
        since: 'v0.4.0'
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

export default function APIReference() {
  const [activeSection, setActiveSection] = useState<string>('floatify-component');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Track scroll position for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = apiSections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sections.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="api-reference">
      {/* Enhanced Page Header */}
      <PageHeader
        title="API Reference"
        subtitle="Complete documentation for all Floatify components, hooks, and types with examples."
        badge="Documentation"
        icon={<Book size={16} />}
        theme="secondary"
        actions={
          <Button
            as="a"
            href="https://github.com/yourusername/floatify"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            leftIcon={<Github size={16} />}
            rightIcon={<ExternalLink size={16} />}
          >
            View on GitHub
          </Button>
        }
      />

      {/* API Overview Section */}
      <motion.section 
        className="api-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="api-overview-content">
          <div className="api-overview-text">
            <h2>Developer-First API Design</h2>
            <p>
              Floatify provides a clean, intuitive API that follows React best practices. 
              Built with TypeScript from the ground up for excellent developer experience.
            </p>
          </div>
          
          <div className="api-overview-stats">
            {[
              { icon: <Code size={20} />, label: 'Components', count: '4+', color: 'var(--accent-primary)' },
              { icon: <Settings size={20} />, label: 'Hooks', count: '6+', color: 'var(--success)' },
              { icon: <Database size={20} />, label: 'Types', count: '12+', color: 'var(--warning)' },
              { icon: <Zap size={20} />, label: 'Methods', count: '20+', color: 'var(--error)' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="api-stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                style={{ '--stat-color': stat.color } as React.CSSProperties}
              >
                <div className="api-stat-icon">
                  {stat.icon}
                </div>
                <div className="api-stat-content">
                  <div className="api-stat-count">{stat.count}</div>
                  <div className="api-stat-label">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <APITopNavigation 
          sections={apiSections}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />
      </motion.div>

      {/* Main Content */}
      <motion.main 
        className="api-main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="api-sections">
          {apiSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              <APISection
                id={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                category={section.category}
                items={section.items}
                isExpanded={true}
                onToggle={() => {}}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced TypeScript Guide */}
        <motion.section 
          className="api-typescript-guide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="api-guide-hero">
            <div className="api-guide-icon">
              <Sparkles size={32} />
            </div>
            <div className="api-guide-content">
              <h2>TypeScript First</h2>
              <p>
                Floatify is built with TypeScript and provides full type safety out of the box.
                Get IntelliSense, auto-completion, and compile-time error checking.
              </p>
            </div>
          </div>
          
          <div className="api-guide-features">
            {[
              {
                icon: <Zap size={20} />,
                title: 'Auto-completion',
                description: 'Full IntelliSense support in VS Code and other editors'
              },
              {
                icon: <Users size={20} />,
                title: 'Type Safety',
                description: 'Catch errors at compile time, not runtime'
              },
              {
                icon: <Globe size={20} />,
                title: 'Documentation',
                description: 'JSDoc comments provide inline documentation'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="api-guide-feature"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="api-guide-feature-icon">
                  {feature.icon}
                </div>
                <div className="api-guide-feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="api-guide-code">
            <CodeBlock
              code={`import { 
  Floatify, 
  useAggregator, 
  type OverlayCard, 
  type OverlayState 
} from 'floatify';

// Full type safety and IntelliSense
const { addCard } = useAggregator();

const card: OverlayCard = {
  id: 'welcome',
  title: 'Welcome!',
  content: 'Thanks for trying Floatify',
  autoDismiss: true,
  autoDismissDuration: 3000
};

addCard('notifications', card);`}
              language="typescript"
              title="TypeScript Example"
              showLineNumbers={true}
              enableCopy={true}
              showLanguage={true}
            />
          </div>
        </motion.section>

        {/* Getting Started Section */}
        <motion.section 
          className="api-getting-started"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="api-getting-started-content">
            <div className="api-getting-started-text">
              <h2>Ready to Get Started?</h2>
              <p>
                Jump into the examples to see Floatify in action, or check out the GitHub repository 
                for installation instructions and more detailed documentation.
              </p>
              
              <div className="api-getting-started-actions">
                <Button
                  as="a"
                  href="/examples"
                  variant="primary"
                  size="lg"
                  rightIcon={<Sparkles size={16} />}
                  enhanced
                >
                  View Examples
                </Button>
                <Button
                  as="a"
                  href="https://github.com/yourusername/floatify"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  leftIcon={<Github size={16} />}
                  enhanced
                >
                  GitHub Repository
                </Button>
              </div>
            </div>
            
            <div className="api-getting-started-quick">
              <h3>Quick Start</h3>
              <CodeBlock
                code={`npm install floatify

import { Floatify } from 'floatify';

function App() {
  return (
    <Floatify>
      {/* Your app */}
    </Floatify>
  );
}`}
                language="bash"
                showLineNumbers={false}
                enableCopy={true}
                showLanguage={false}
              />
            </div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}