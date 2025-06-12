import React, { useEffect } from 'react'
import { useAggregator } from 'floatify'
import { Bell, MessageCircle, Loader2, AlertCircle } from 'lucide-react'
import Button from './Button'

export default function SplitBubbleDemo() {
  const { registerChannel, addCard, updateChannelState } = useAggregator()

  useEffect(() => {
    registerChannel('demo-split', 1)
  }, [registerChannel])

  const showSplitExample = () => {
    addCard('demo-split', {
      id: Date.now().toString(),
      title: 'Processing...',
      content: 'Demonstrating the split layout during loading.',
      bubbleIcon: <Bell />
    })
    updateChannelState('demo-split', 'split')
  }

  const showBubbleExample = () => {
    addCard('demo-split', {
      id: Date.now().toString(),
      title: 'New Message',
      content: 'This card is displayed as a bubble.',
      bubbleIcon: <MessageCircle />
    })
    updateChannelState('demo-split', 'bubble')
  }

  return (
    <div className="split-bubble-demo">
      <div className="split-bubble-demo-buttons">
        <Button variant="primary" onClick={showSplitExample}>
          Show Split Loading
        </Button>
        <Button variant="secondary" onClick={showBubbleExample}>
          Show Bubble
        </Button>
      </div>
    </div>
  )
}
