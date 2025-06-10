import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Smartphone, Code, Palette, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} />
            <span>Modern React Overlay Library</span>
          </div>
          
          <h1 className="hero-title">
            Beautiful overlays for
            <span className="hero-gradient"> modern React apps</span>
          </h1>
          
          <p className="hero-description">
            Floatify provides a flexible, accessible overlay system for toasts, notifications, 
            and dynamic content. Built with TypeScript, designed for developers.
          </p>
          
          <div className="hero-actions">
            <Link to="/examples" className="btn btn-primary">
              View Examples
              <ArrowRight size={16} />
            </Link>
            <button 
              className="btn btn-secondary"
              onClick={() => navigator.clipboard.writeText('npm install floatify')}
            >
              <Code size={16} />
              Copy Install Command
            </button>
          </div>
          
          <div className="hero-code">
            <pre><code>{`npm install floatify`}</code></pre>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2>Why choose Floatify?</h2>
          <p>Built with modern React patterns and developer experience in mind</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Smartphone size={24} />
            </div>
            <h3>Mobile-First Design</h3>
            <p>Optimized for touch interactions with smooth gestures and responsive layouts that work perfectly on all devices.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={24} />
            </div>
            <h3>Accessibility Built-in</h3>
            <p>WCAG compliant with proper ARIA labels, keyboard navigation, and screen reader support out of the box.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Code size={24} />
            </div>
            <h3>TypeScript Native</h3>
            <p>Fully typed API with excellent IntelliSense support and compile-time safety for better developer experience.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Palette size={24} />
            </div>
            <h3>Themeable & Customizable</h3>
            <p>Dark/light mode support with CSS custom properties. Easy to customize and integrate with your design system.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={24} />
            </div>
            <h3>Performant & Lightweight</h3>
            <p>Minimal bundle size with tree-shaking support. Optimized animations using CSS transforms and GPU acceleration.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Globe size={24} />
            </div>
            <h3>Framework Agnostic</h3>
            <p>While built for React, the core concepts can be adapted to other frameworks. Clean separation of concerns.</p>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="quick-start">
        <div className="quick-start-content">
          <div className="quick-start-text">
            <h2>Get started in seconds</h2>
            <p>
              Add Floatify to your React app with just a few lines of code. 
              No complex configuration required.
            </p>
            <Link to="/examples" className="btn btn-primary">
              View Full Examples
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="quick-start-code">
            <pre><code>{`import { Floatify, useAggregator } from 'floatify';

function App() {
  const { registerChannel, addCard } = useAggregator();

  useEffect(() => {
    registerChannel('notifications', 1);
    addCard('notifications', {
      id: 'welcome',
      title: 'Welcome!',
      content: 'Thanks for trying Floatify'
    });
  }, []);

  return (
    <Floatify>
      {/* Your app content */}
    </Floatify>
  );
}`}</code></pre>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-number"> 5kb</div>
            <div className="stat-label">Gzipped Bundle Size</div>
          </div>
          <div className="stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">TypeScript Coverage</div>
          </div>
          <div className="stat">
            <div className="stat-number">0</div>
            <div className="stat-label">Runtime Dependencies</div>
          </div>
          <div className="stat">
            <div className="stat-number">A11Y</div>
            <div className="stat-label">WCAG Compliant</div>
          </div>
        </div>
      </section>
    </div>
  )
  );
}