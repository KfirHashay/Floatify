import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface APIItem {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
  example?: string;
  since?: string;
}

interface APISectionProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'components' | 'hooks' | 'types' | 'utilities';
  items: APIItem[];
  isExpanded: boolean;
  onToggle: () => void;
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

export default function APISection({ 
  id, 
  title, 
  description, 
  icon, 
  category, 
  items, 
  isExpanded, 
  onToggle 
}: APISectionProps) {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyExample = (example: string, itemName: string) => {
    navigator.clipboard.writeText(example);
    setCopiedExample(itemName);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <section id={id} className="api-section">
      <div className="api-section-header" onClick={onToggle}>
        <div className="api-section-meta">
          <div className="api-section-icon">
            {icon}
          </div>
          <div className="api-section-info">
            <div className="api-section-title-row">
              <h2>{title}</h2>
              <span 
                className="api-section-category"
                style={{
                  color: categoryConfig[category].color,
                  backgroundColor: categoryConfig[category].bgColor
                }}
              >
                {categoryConfig[category].label}
              </span>
            </div>
            <p className="api-section-description">{description}</p>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="api-section-content">
          <div className="api-items">
            {items.map((item) => (
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
  );
}