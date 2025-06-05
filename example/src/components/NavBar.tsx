import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface Props {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function NavBar({ theme, onToggleTheme }: Props) {
  return (
    <nav>
      <NavLink to="/" end>
        Overview
      </NavLink>
      <NavLink to="/examples">Examples</NavLink>
      <NavLink to="/roadmap">Roadmap</NavLink>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </nav>
  );
}
