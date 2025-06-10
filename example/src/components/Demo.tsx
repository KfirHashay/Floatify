import React, { useEffect } from 'react'
import { useAggregator } from 'floatify'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Position, POSITIONS } from '../types'

interface Props {
  fixedToViewport: boolean
  position: Position
  onFixedToViewportChange: (value: boolean) => void
  onPositionChange: (value: Position) => void
}

export default function Demo({
  fixedToViewport,
  position,
  onFixedToViewportChange,
  onPositionChange
}: Props) {
  const { registerChannel, addCard, removeCard } = useAggregator()

  useEffect(() => {
    registerChannel('demo', 1)
  }, [registerChannel])

  const handleShow = () => {
    addCard('demo', {
      id: Date.now().toString(),
      title: 'Hello from Floatify',
      content: 'This card was triggered by a button click.'
    })
  }

  const handleLoading = () => {
    const id = Date.now().toString()
    addCard('demo', {
      id,
      title: 'Loading…',
      content: 'Please wait',
      icon: <Loader2 className="spin" />
    })

    setTimeout(() => {
      removeCard('demo', id)
      addCard('demo', {
        id: `${id}-done`,
        title: 'Complete',
        content: 'Operation successful',
        icon: <CheckCircle />
      })
    }, 1500)
  }

  const handlePositionChange = (value: string) => {
    if (POSITIONS.includes(value as Position)) {
      onPositionChange(value as Position)
    }
  }

  return (
    <div className="demo">
      <div className="demo-controls">
        <label>
          <input
            type="checkbox"
            checked={fixedToViewport}
            onChange={(e) => onFixedToViewportChange(e.target.checked)}
          />
          Fixed to viewport
        </label>
        <select value={position} onChange={(e) => handlePositionChange(e.target.value)}>
          {POSITIONS.map((pos) => (
            <option key={pos} value={pos}>
              {pos.charAt(0).toUpperCase() + pos.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={handleShow}>
          Show Notification
        </button>
        <button className="btn btn-secondary" onClick={handleLoading}>
          Loading Example
        </button>
      </div>
    </div>
  )
}