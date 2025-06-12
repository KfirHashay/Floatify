import React, { useEffect, useState } from 'react'
import { Floatify } from 'floatify'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Examples from './pages/Examples'
import APIReference from './pages/APIReference'
import Roadmap from './pages/Roadmap'
import { Position } from './types'

// Centralized CSS imports
import './styles/index.css'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    return (
      saved ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    )
  })

  const [fixedToViewport, setFixedToViewport] = useState(false)
  const [position, setPosition] = useState<Position>('top')

  useEffect(() => {
    const html = document.documentElement
    html.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  const handleFixedToViewportChange = (value: boolean) => setFixedToViewport(value)
  const handlePositionChange = (value: Position) => setPosition(value)

  return (
    <Floatify concurrencyMode="multiple" debug fixedToViewport={fixedToViewport} position={position}>
      <Layout theme={theme} onToggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/examples"
            element={
              <Examples
                fixedToViewport={fixedToViewport}
                position={position}
                onFixedToViewportChange={handleFixedToViewportChange}
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