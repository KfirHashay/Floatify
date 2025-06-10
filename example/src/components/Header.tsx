import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface Props {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: Props) {
  return (
    <header className="app-header">
      <h1 className="logo">Floatify</h1>
      <nav className="nav-links">
        <NavLink to="/" end>
          Overview
        </NavLink>
        <NavLink to="/examples">Examples</NavLink>
        <NavLink to="/roadmap">Roadmap</NavLink>
        <a href="https://github.com/owner/repo" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}
