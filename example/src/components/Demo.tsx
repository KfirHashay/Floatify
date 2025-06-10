import React, { useEffect } from 'react'
import { useAggregator } from 'floatify'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Position, POSITIONS } from '../types'

interface Props {
  sticky: boolean
  position: Position
  onStickyChange: (value: boolean) => void
  onPositionChange: (value: Position) => void
}

export default function Demo({
  sticky,
  position,
  onStickyChange,
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
            checked={sticky}
            onChange={(e) => onStickyChange(e.target.checked)}
          />
          <span>Sticky</span>
        </label>
        <select 
          value={position} 
          onChange={(e) => handlePositionChange(e.target.value)}
          aria-label="Select overlay position"
        >
          {POSITIONS.map((pos) => (
            <option key={pos} value={pos}>
              {pos.charAt(0).toUpperCase() + pos.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>
      <div className="demo-buttons">
        <button 
          onClick={handleShow}
          className="btn btn-primary"
          aria-label="Show notification card"
        >
          Show Card
        </button>
        <button 
          onClick={handleLoading}
          className="btn btn-secondary"
          aria-label="Show loading example"
        >
          Loading Example
        </button>
      </div>
    </div>
  )
}