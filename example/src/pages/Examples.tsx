import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Zap, MessageCircle, Loader2, Bell, AlertCircle, ChevronRight } from 'lucide-react';
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

const demoExamples = [
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
  const [activeExample, setActiveExample] = useState('basic');
  const [demoMode, setDemoMode] = useState<'interactive' | 'split' | 'bubble'>('interactive');
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
      {/* Header */}
      <motion.section 
        className="examples-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Examples & Demos</h1>
        <p>
          Explore Floatify's overlay system with interactive demos and ready-to-use code examples.
        </p>
      </motion.section>

      {/* Demo Mode Navigation */}
      <motion.section 
        className="demo-modes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="demo-modes-header">
          <h2>Interactive Demos</h2>
          <p>Try different overlay modes and see them in action</p>
        </div>
        
        <div className="demo-modes-nav">
          {[
            { key: 'interactive', label: 'Interactive Demo', icon: <Play size={16} /> },
            { key: 'split', label: 'Split Layout', icon: <RotateCcw size={16} /> },
            { key: 'bubble', label: 'Bubble Mode', icon: <MessageCircle size={16} /> }
          ].map((mode) => (
            <motion.button
              key={mode.key}
              className={`demo-mode-btn ${demoMode === mode.key ? 'demo-mode-btn--active' : ''}`}
              onClick={() => setDemoMode(mode.key as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={demoMode}
            className="demo-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {demoMode === 'interactive' && (
              <div className="demo-interactive">
                <Demo
                  fixedToViewport={fixedToViewport}
                  position={position}
                  onFixedToViewportChange={onFixedToViewportChange}
                  onPositionChange={onPositionChange}
                />
              </div>
            )}

            {demoMode === 'split' && (
              <div className="demo-split">
                <div className="demo-description">
                  <h3>Split Layout Demo</h3>
                  <p>The split layout shows content alongside a bubble icon, perfect for loading states and ongoing processes.</p>
                </div>
                <div className="demo-actions">
                  <Button variant="primary" onClick={runSplitDemo} leftIcon={<RotateCcw size={16} />}>
                    Run Split Demo
                  </Button>
                  <Button variant="secondary" onClick={runLoadingDemo} leftIcon={<Loader2 size={16} />}>
                    Loading State
                  </Button>
                </div>
              </div>
            )}

            {demoMode === 'bubble' && (
              <div className="demo-bubble">
                <div className="demo-description">
                  <h3>Bubble Mode Demo</h3>
                  <p>Bubble mode displays notifications as compact, unobtrusive icons that can be expanded when needed.</p>
                </div>
                <div className="demo-actions">
                  <Button variant="primary" onClick={runBubbleDemo} leftIcon={<MessageCircle size={16} />}>
                    Show Bubble
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Code Examples */}
      <motion.section 
        className="code-examples"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="code-examples-header">
          <h2>Code Examples</h2>
          <p>Copy-paste ready code for common use cases</p>
        </div>

        <div className="examples-layout">
          <div className="examples-nav">
            {demoExamples.map((example, index) => (
              <motion.button
                key={example.key}
                className={`example-tab ${activeExample === example.key ? 'example-tab--active' : ''}`}
                onClick={() => setActiveExample(example.key)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--example-color': example.color } as React.CSSProperties}
              >
                <div className="example-tab-icon" style={{ color: example.color }}>
                  {example.icon}
                </div>
                <div className="example-tab-content">
                  <div className="example-tab-title">{example.title}</div>
                  <div className="example-tab-description">{example.description}</div>
                </div>
                <ChevronRight size={16} className="example-tab-arrow" />
              </motion.button>
            ))}
          </div>

          <motion.div 
            className="code-display"
            key={activeExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CodeBlock
              code={codeExamples[activeExample as keyof typeof codeExamples]}
              language="typescript"
              title={demoExamples.find(e => e.key === activeExample)?.title}
              showLineNumbers={true}
              enableCopy={true}
              maxHeight="500px"
              showLanguage={true}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Use Cases */}
      <motion.section 
        className="use-cases"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="use-cases-header">
          <h2>Common Use Cases</h2>
          <p>Real-world scenarios where Floatify shines</p>
        </div>
        
        <div className="use-cases-grid">
          {[
            {
              icon: <Bell size={24} />,
              title: 'Real-time Notifications',
              description: 'Live updates, chat messages, and system alerts with bubble mode for minimal disruption.',
              color: 'var(--accent-primary)'
            },
            {
              icon: <Loader2 size={24} />,
              title: 'Loading & Progress',
              description: 'Split layout for file uploads, data processing, and long-running operations.',
              color: 'var(--warning)'
            },
            {
              icon: <AlertCircle size={24} />,
              title: 'Error Handling',
              description: 'User-friendly error messages with actionable next steps and retry options.',
              color: 'var(--error)'
            },
            {
              icon: <MessageCircle size={24} />,
              title: 'User Feedback',
              description: 'Success confirmations, form validation, and interactive user guidance.',
              color: 'var(--success)'
            }
          ].map((useCase, index) => (
            <motion.div
              key={useCase.title}
              className="use-case-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="use-case-icon" style={{ color: useCase.color }}>
                {useCase.icon}
              </div>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}