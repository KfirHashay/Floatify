import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Zap, MessageCircle, Loader2, Bell, AlertCircle, ChevronRight, Sparkles, Code2, Layers, Palette } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Demo from '../components/Demo';
import Button from '../components/Button';
import CodeBlock from '../components/CodeBlock';
import { Position } from '../types';
import { useAggregator } from 'floatify';

interface Props {
  fixedToViewport: boolean;
  position: Position;
  onFixedToViewportChange: (value: boolean) => void;
  onPositionChange: (value: Position) => void;
}

const codeExamples = {
  basic: `import { Floatify, useAggregator } from 'floatify';

function App() {
  const { registerChannel, addCard } = useAggregator();

  const showNotification = () => {
    addCard('notifications', {
      id: Date.now().toString(),
      title: 'Success!',
      content: 'Your action was completed successfully.',
      autoDismiss: true,
      autoDismissDuration: 3000
    });
  };

  useEffect(() => {
    registerChannel('notifications', 1);
  }, []);

  return (
    <Floatify>
      <button onClick={showNotification}>
        Show Notification
      </button>
    </Floatify>
  );
}`,
  
  loading: `const { addCard, removeCard, updateChannelState } = useAggregator();

const handleAsyncAction = async () => {
  const loadingId = Date.now().toString();
  
  // Show loading state with split layout
  addCard('status', {
    id: loadingId,
    title: 'Processing...',
    content: 'Please wait while we process your request',
    bubbleIcon: <Loader2 className="animate-spin" />
  });
  updateChannelState('status', 'split');

  try {
    await performAsyncOperation();
    
    // Switch to bubble with success icon
    removeCard('status', loadingId);
    addCard('status', {
      id: \`\${loadingId}-success\`,
      title: 'Complete!',
      content: 'Operation completed successfully',
      bubbleIcon: <CheckCircle />,
      autoDismiss: true,
      autoDismissDuration: 2000
    });
    updateChannelState('status', 'bubble');
  } catch (error) {
    // Show error in expanded state
    removeCard('status', loadingId);
    addCard('status', {
      id: \`\${loadingId}-error\`,
      title: 'Error',
      content: 'Something went wrong. Please try again.',
      bubbleIcon: <AlertCircle />
    });
    updateChannelState('status', 'expanded');
  }
};`,

  splitBubble: `import { MessageCircle, Loader2, Bell, AlertCircle } from 'lucide-react';

<Floatify
  splitLoading
  defaultBubbleIcons={{
    message: <MessageCircle />,
    loading: <Loader2 className="animate-spin" />,
    alert: <AlertCircle />
  }}
>
  {/* app */}
</Floatify>

// Split layout during processing
const showSplitExample = () => {
  addCard('demo', {
    id: Date.now().toString(),
    title: 'Processing...',
    content: 'Demonstrating the split layout during loading.',
    bubbleIcon: <Bell />
  });
  updateChannelState('demo', 'split');
};

// Bubble for quick notifications
const showBubbleExample = () => {
  addCard('demo', {
    id: Date.now().toString(),
    title: 'New Message',
    content: 'This card is displayed as a bubble.',
    bubbleIcon: <MessageCircle />
  });
  updateChannelState('demo', 'bubble');
};`,

  advanced: `// Advanced configuration with positioning
<Floatify 
  position="top"
  fixedToViewport={true}
  concurrencyMode="multiple"
  autoDismiss={true}
  autoDismissTimeout={5000}
  splitLoading={true}
>
  {/* app */}
</Floatify>

// Multiple channels with priorities
const { registerChannel, addCard } = useAggregator();

useEffect(() => {
  registerChannel('alerts', 3);     // High priority
  registerChannel('messages', 2);   // Medium priority  
  registerChannel('updates', 1);    // Low priority
}, []);

// Cards with custom auto-dismiss
addCard('alerts', {
  id: 'urgent',
  title: 'Urgent Alert',
  content: 'This requires immediate attention',
  autoDismiss: false, // Never auto-dismiss
  bubbleIcon: <AlertCircle />
});`
};

const demoModes = [
  {
    key: 'interactive',
    title: 'Interactive Demo',
    description: 'Try different overlay modes and see them in action',
    icon: <Play size={20} />,
    color: 'var(--accent-primary)',
    gradient: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
  },
  {
    key: 'split',
    title: 'Split Layout',
    description: 'Content alongside bubble icon for ongoing processes',
    icon: <Layers size={20} />,
    color: 'var(--warning)',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
  },
  {
    key: 'bubble',
    title: 'Bubble Mode',
    description: 'Compact, unobtrusive icons that expand when needed',
    icon: <MessageCircle size={20} />,
    color: 'var(--success)',
    gradient: 'linear-gradient(135deg, #10b981, #059669)'
  }
];

const codeExampleTabs = [
  {
    key: 'basic',
    title: 'Basic Notifications',
    description: 'Simple notifications with auto-dismiss',
    icon: <Play size={16} />,
    color: 'var(--accent-primary)'
  },
  {
    key: 'loading',
    title: 'Loading States',
    description: 'Split layout for loading with state transitions',
    icon: <RotateCcw size={16} />,
    color: 'var(--warning)'
  },
  {
    key: 'splitBubble',
    title: 'Split & Bubble',
    description: 'Advanced layouts with custom bubble icons',
    icon: <MessageCircle size={16} />,
    color: 'var(--success)'
  },
  {
    key: 'advanced',
    title: 'Advanced Config',
    description: 'Multiple channels and positioning options',
    icon: <Zap size={16} />,
    color: 'var(--error)'
  }
];

export default function Examples({
  fixedToViewport,
  position,
  onFixedToViewportChange,
  onPositionChange
}: Props) {
  const [activeDemo, setActiveDemo] = useState('interactive');
  const [activeExample, setActiveExample] = useState('basic');
  const { registerChannel, addCard, updateChannelState, removeCard } = useAggregator();

  useEffect(() => {
    registerChannel('examples-demo', 1);
  }, [registerChannel]);

  const runSplitDemo = () => {
    const id = Date.now().toString();
    addCard('examples-demo', {
      id,
      title: 'Processing...',
      content: 'Demonstrating split layout with loading state.',
      bubbleIcon: <Loader2 className="animate-spin" />
    });
    updateChannelState('examples-demo', 'split');

    // Simulate completion
    setTimeout(() => {
      removeCard('examples-demo', id);
      addCard('examples-demo', {
        id: `${id}-done`,
        title: 'Complete!',
        content: 'Split demo finished successfully.',
        bubbleIcon: <Bell />,
        autoDismiss: true,
        autoDismissDuration: 3000
      });
      updateChannelState('examples-demo', 'bubble');
    }, 2000);
  };

  const runBubbleDemo = () => {
    addCard('examples-demo', {
      id: Date.now().toString(),
      title: 'Bubble Message',
      content: 'This notification appears as a compact bubble.',
      bubbleIcon: <MessageCircle />,
      autoDismiss: true,
      autoDismissDuration: 4000
    });
    updateChannelState('examples-demo', 'bubble');
  };

  const runLoadingDemo = () => {
    const id = Date.now().toString();
    addCard('examples-demo', {
      id,
      title: 'Loading...',
      content: 'Please wait while we process your request.',
      bubbleIcon: <Loader2 className="animate-spin" />
    });
    updateChannelState('examples-demo', 'loading');

    setTimeout(() => {
      removeCard('examples-demo', id);
      addCard('examples-demo', {
        id: `${id}-success`,
        title: 'Success!',
        content: 'Your request has been processed.',
        bubbleIcon: <Bell />,
        autoDismiss: true,
        autoDismissDuration: 3000
      });
      updateChannelState('examples-demo', 'expanded');
    }, 1500);
  };

  return (
    <div className="examples">
      {/* Page Header */}
      <PageHeader
        title="Interactive Examples"
        subtitle="Explore Floatify's overlay system with live demos and ready-to-use code examples."
        badge="Live Demos"
        icon={<Sparkles size={16} />}
        theme="primary"
      />

      {/* Interactive Demos Section */}
      <motion.section 
        className="interactive-demos"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Interactive Demos</h2>
            <p>Experience different overlay modes with live interactions</p>
          </motion.div>
        </div>
        
        {/* Demo Mode Navigation */}
        <motion.div 
          className="demo-nav"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {demoModes.map((mode, index) => (
            <motion.button
              key={mode.key}
              className={`demo-nav-item ${activeDemo === mode.key ? 'demo-nav-item--active' : ''}`}
              onClick={() => setActiveDemo(mode.key)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                '--demo-color': mode.color,
                '--demo-gradient': mode.gradient
              } as React.CSSProperties}
            >
              <div className="demo-nav-icon">
                {mode.icon}
              </div>
              <div className="demo-nav-content">
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
              </div>
              <div className="demo-nav-indicator" />
            </motion.button>
          ))}
        </motion.div>

        {/* Demo Content */}
        <motion.div 
          className="demo-showcase"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              className="demo-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeDemo === 'interactive' && (
                <div className="demo-interactive">
                  <div className="demo-description">
                    <h3>Try the Interactive Demo</h3>
                    <p>Test different overlay configurations and see how they behave in real-time.</p>
                  </div>
                  <div className="demo-container">
                    <Demo
                      fixedToViewport={fixedToViewport}
                      position={position}
                      onFixedToViewportChange={onFixedToViewportChange}
                      onPositionChange={onPositionChange}
                    />
                  </div>
                </div>
              )}

              {activeDemo === 'split' && (
                <div className="demo-split">
                  <div className="demo-description">
                    <h3>Split Layout Demo</h3>
                    <p>The split layout shows content alongside a bubble icon, perfect for loading states and ongoing processes.</p>
                  </div>
                  <div className="demo-actions">
                    <Button 
                      variant="primary" 
                      onClick={runSplitDemo} 
                      leftIcon={<Layers size={16} />}
                      enhanced
                    >
                      Run Split Demo
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={runLoadingDemo} 
                      leftIcon={<Loader2 size={16} />}
                      enhanced
                    >
                      Loading State
                    </Button>
                  </div>
                </div>
              )}

              {activeDemo === 'bubble' && (
                <div className="demo-bubble">
                  <div className="demo-description">
                    <h3>Bubble Mode Demo</h3>
                    <p>Bubble mode displays notifications as compact, unobtrusive icons that can be expanded when needed.</p>
                  </div>
                  <div className="demo-actions">
                    <Button 
                      variant="primary" 
                      onClick={runBubbleDemo} 
                      leftIcon={<MessageCircle size={16} />}
                      enhanced
                    >
                      Show Bubble
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Code Examples Section */}
      <motion.section 
        className="code-examples"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2>Code Examples</h2>
            <p>Copy-paste ready code for common use cases</p>
          </motion.div>
        </div>

        <div className="examples-layout">
          {/* Code Navigation */}
          <motion.div 
            className="examples-nav"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {codeExampleTabs.map((example, index) => (
              <motion.button
                key={example.key}
                className={`example-tab ${activeExample === example.key ? 'example-tab--active' : ''}`}
                onClick={() => setActiveExample(example.key)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--example-color': example.color } as React.CSSProperties}
              >
                <div className="example-tab-icon">
                  {example.icon}
                </div>
                <div className="example-tab-content">
                  <div className="example-tab-title">{example.title}</div>
                  <div className="example-tab-description">{example.description}</div>
                </div>
                <ChevronRight size={16} className="example-tab-arrow" />
                <div className="example-tab-indicator" />
              </motion.button>
            ))}
          </motion.div>

          {/* Code Display */}
          <motion.div 
            className="code-display"
            layout
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExample}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CodeBlock
                  code={codeExamples[activeExample as keyof typeof codeExamples]}
                  language="typescript"
                  title={codeExampleTabs.find(e => e.key === activeExample)?.title}
                  showLineNumbers={true}
                  enableCopy={true}
                  maxHeight="500px"
                  showLanguage={true}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Use Cases Section */}
      <motion.section 
        className="use-cases"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2>Common Use Cases</h2>
            <p>Real-world scenarios where Floatify excels</p>
          </motion.div>
        </div>
        
        <div className="use-cases-grid">
          {[
            {
              icon: <Bell size={24} />,
              title: 'Real-time Notifications',
              description: 'Live updates, chat messages, and system alerts with bubble mode for minimal disruption.',
              color: 'var(--accent-primary)',
              gradient: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
            },
            {
              icon: <Loader2 size={24} />,
              title: 'Loading & Progress',
              description: 'Split layout for file uploads, data processing, and long-running operations.',
              color: 'var(--warning)',
              gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
            },
            {
              icon: <AlertCircle size={24} />,
              title: 'Error Handling',
              description: 'User-friendly error messages with actionable next steps and retry options.',
              color: 'var(--error)',
              gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
            },
            {
              icon: <MessageCircle size={24} />,
              title: 'User Feedback',
              description: 'Success confirmations, form validation, and interactive user guidance.',
              color: 'var(--success)',
              gradient: 'linear-gradient(135deg, #10b981, #059669)'
            }
          ].map((useCase, index) => (
            <motion.div
              key={useCase.title}
              className="use-case-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                '--use-case-color': useCase.color,
                '--use-case-gradient': useCase.gradient
              } as React.CSSProperties}
            >
              <div className="use-case-icon">
                {useCase.icon}
              </div>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
              <div className="use-case-glow" />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}