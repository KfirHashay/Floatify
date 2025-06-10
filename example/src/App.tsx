import React, { useEffect, useState } from 'react';
import { Floatify } from 'floatify';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Examples from './pages/Examples';
import Roadmap from './pages/Roadmap';
import './index.css';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return (
      saved ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  });

  const [sticky, setSticky] = useState(false);
  const [position, setPosition] = useState<
    | 'top'
    | 'bottom'
    | 'center'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
  >('top');

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = theme;
    let meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'color-scheme');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Floatify
      concurrencyMode="multiple"
      debug
      sticky={sticky}
      position={position}
    >
      <Layout theme={theme} onToggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/examples"
            element={
              <Examples
                sticky={sticky}
                position={position}
                onStickyChange={setSticky}
                onPositionChange={setPosition}
              />
            }
          />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </Layout>
    </Floatify>
  );
}
