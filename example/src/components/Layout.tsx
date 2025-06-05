import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface Props {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  children: React.ReactNode;
}

export default function Layout({ theme, onToggleTheme, children }: Props) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="logo">Floatify</h1>
        <NavLink to="/" end>
          Overview
        </NavLink>
        <NavLink to="/examples">Examples</NavLink>
        <NavLink to="/roadmap">Roadmap</NavLink>
        <a
          href="https://github.com/owner/repo"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </aside>
      <main>{children}</main>
    </div>
  );
}
