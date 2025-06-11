import React, { useEffect } from 'react'
import { useAggregator } from 'floatify'
import { CheckCircle, Loader2 } from 'lucide-react'
import Button from './Button'
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
      content: 'This card was triggered by a button click.',
      autoDismiss: true,
      autoDismissDuration: 3000
    })
  }

  const handleLoading = () => {
    const id = Date.now().toString()
    addCard('demo', {
      id,
      title: 'Loading…',
      content: 'Please wait',
      icon: <Loader2 className="spin" />,
      autoDismiss: false // Don't auto-dismiss loading states
    })

    setTimeout(() => {
      removeCard('demo', id)
      addCard('demo', {
        id: `${id}-done`,
        title: 'Complete',
        content: 'Operation successful',
        icon: <CheckCircle />,
        autoDismiss: true,
        autoDismissDuration: 2000 // Shorter duration for success messages
      })
    }, 1500)
  }

  const handlePersistent = () => {
    addCard('demo', {
      id: Date.now().toString(),
      title: 'Persistent Message',
      content: 'This message will not auto-dismiss. Click to expand and dismiss manually.',
      autoDismiss: false // This card won't auto-dismiss
    })
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
      
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" onClick={handleShow}>
          Auto-Dismiss (3s)
        </Button>
        <Button variant="secondary" onClick={handleLoading}>
          Loading Example
        </Button>
        <Button variant="ghost" onClick={handlePersistent}>
          Persistent Message
        </Button>
      </div>
    </div>
  )
}