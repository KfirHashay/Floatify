import React, { useState } from 'react';
import { Copy, Play, RotateCcw, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';
import Demo from '../components/Demo';
import Button from '../components/Button';
import { Position } from '../types';

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
      content: 'Your action was completed successfully.'
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
  
  loading: `const { addCard, removeCard } = useAggregator();

const handleAsyncAction = async () => {
  const loadingId = Date.now().toString();
  
  // Show loading state
  addCard('status', {
    id: loadingId,
    title: 'Processing...',
    content: 'Please wait while we process your request',
    icon: <Loader2 className="animate-spin" />
  });

  try {
    await performAsyncOperation();
    
    // Remove loading and show success
    removeCard('status', loadingId);
    addCard('status', {
      id: \`\${loadingId}-success\`,
      title: 'Complete!',
      content: 'Operation completed successfully',
      icon: <CheckCircle />
    });
  } catch (error) {
    // Show error state
    removeCard('status', loadingId);
    addCard('status', {
      id: \`\${loadingId}-error\`,
      title: 'Error',
      content: 'Something went wrong. Please try again.',
      icon: <AlertCircle />
    });
  }
};`,

  positioning: `<Floatify 
  position="top"              // top, bottom, center, top-left, etc.
  fixedToViewport={true}      // Stick to viewport when scrolling
  concurrencyMode="single"    // single or multiple overlays
>
  {/* Your app */}
</Floatify>`
};

export default function Examples({
  fixedToViewport,
  position,
  onFixedToViewportChange,
  onPositionChange
}: Props) {
  const [activeExample, setActiveExample] = useState('basic');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const examples = [
    {
      key: 'basic',
      title: 'Basic Usage',
      description: 'Simple notification with title and content',
      icon: <Play size={16} />
    },
    {
      key: 'loading',
      title: 'Loading States',
      description: 'Show loading, success, and error states',
      icon: <RotateCcw size={16} />
    },
    {
      key: 'positioning',
      title: 'Positioning & Layout',
      description: 'Control overlay position and behavior',
      icon: <Zap size={16} />
    }
  ];

  return (
    <div className="examples">
      {/* Header */}
      <section className="examples-header">
        <h1>Examples & Demos</h1>
        <p>
          Explore different ways to use Floatify in your React applications. 
          All examples include copy-paste ready code.
        </p>
      </section>

      {/* Interactive Demo */}
      <section className="demo-section">
        <div className="demo-header">
          <h2>Interactive Demo</h2>
          <p>Try out the overlay system with different configurations</p>
        </div>
        
        <div className="demo-container">
          <Demo
            fixedToViewport={fixedToViewport}
            position={position}
            onFixedToViewportChange={onFixedToViewportChange}
            onPositionChange={onPositionChange}
          />
        </div>
      </section>

      {/* Code Examples */}
      <section className="code-examples">
        <div className="examples-nav">
          {examples.map((example) => (
            <button
              key={example.key}
              className={`example-tab ${activeExample === example.key ? 'example-tab-active' : ''}`}
              onClick={() => setActiveExample(example.key)}
            >
              {example.icon}
              <div className="example-tab-content">
                <div className="example-tab-title">{example.title}</div>
                <div className="example-tab-description">{example.description}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="code-display">
          <div className="code-header">
            <h3>{examples.find(e => e.key === activeExample)?.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={copiedCode === activeExample ? <CheckCircle size={16} /> : <Copy size={16} />}
              onClick={() => copyToClipboard(codeExamples[activeExample as keyof typeof codeExamples], activeExample)}
            >
              {copiedCode === activeExample ? 'Copied!' : 'Copy Code'}
            </Button>
          </div>
          
          <div className="code-content">
            <pre><code>{codeExamples[activeExample as keyof typeof codeExamples]}</code></pre>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases">
        <h2>Common Use Cases</h2>
        <div className="use-cases-grid">
          <div className="use-case-card">
            <div className="use-case-icon">
              <CheckCircle size={24} />
            </div>
            <h3>Success Messages</h3>
            <p>Confirm successful actions like form submissions, file uploads, or data saves.</p>
          </div>
          
          <div className="use-case-card">
            <div className="use-case-icon">
              <AlertCircle size={24} />
            </div>
            <h3>Error Handling</h3>
            <p>Display user-friendly error messages with actionable next steps.</p>
          </div>
          
          <div className="use-case-card">
            <div className="use-case-icon">
              <Info size={24} />
            </div>
            <h3>System Updates</h3>
            <p>Notify users about system maintenance, new features, or important announcements.</p>
          </div>
          
          <div className="use-case-card">
            <div className="use-case-icon">
              <RotateCcw size={24} />
            </div>
            <h3>Loading States</h3>
            <p>Show progress for long-running operations with clear status updates.</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="best-practices">
        <h2>Best Practices</h2>
        <div className="practices-grid">
          <div className="practice">
            <h4>Keep Messages Concise</h4>
            <p>Use clear, actionable language. Aim for 1-2 sentences maximum.</p>
          </div>
          
          <div className="practice">
            <h4>Provide Context</h4>
            <p>Include relevant details about what happened and what the user should do next.</p>
          </div>
          
          <div className="practice">
            <h4>Use Appropriate Timing</h4>
            <p>Auto-dismiss success messages, but let users manually dismiss errors.</p>
          </div>
          
          <div className="practice">
            <h4>Consider Accessibility</h4>
            <p>Ensure proper contrast ratios and screen reader compatibility.</p>
          </div>
        </div>
      </section>
    </div>
  );
}