import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Github, Sun, Moon } from 'lucide-react';

interface Props {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  children: React.ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/' },
  { name: 'Examples', href: '/examples' },
  { name: 'API Reference', href: '/api' },
  { name: 'Roadmap', href: '/roadmap' },
];

export default function Layout({ theme, onToggleTheme, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <NavLink to="/" className="logo">
              <span className="logo-text">Floatify</span>
              <span className="logo-badge">Beta</span>
            </NavLink>
          </div>

          <nav className="desktop-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
                end={item.href === '/'}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="header-right">
            <a
              href="https://github.com/yourusername/floatify"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label="View on GitHub"
            >
              <Github size={18} />
            </a>
            <button
              onClick={onToggleTheme}
              className="btn btn-ghost"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                }
                end={item.href === '/'}
                onClick={() => setSidebarOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <a
              href="https://github.com/yourusername/floatify"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-link"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}