import React, { useEffect, useState } from 'react'
import { Floatify } from 'floatify'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Examples from './pages/Examples'
import APIReference from './pages/APIReference'
import Roadmap from './pages/Roadmap'
import { Position } from './types'

import './styles/globals.css'
import './styles/layout.css'
import './styles/pages.css'
import './styles/examples.css'
import './styles/api.css'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    return (
      saved ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    )
  })

  const [sticky, setSticky] = useState(false)
  const [position, setPosition] = useState<Position>('top')

  useEffect(() => {
    const html = document.documentElement
    html.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  const handleStickyChange = (value: boolean) => setSticky(value)
  const handlePositionChange = (value: Position) => setPosition(value)

  return (
    <Floatify concurrencyMode="multiple" debug sticky={sticky} position={position}>
      <Layout theme={theme} onToggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/examples"
            element={
              <Examples
                sticky={sticky}
                position={position}
                onStickyChange={handleStickyChange}
                onPositionChange={handlePositionChange}
              />
            }
          />
          <Route path="/api" element={<APIReference />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </Layout>
    </Floatify>
  )
}