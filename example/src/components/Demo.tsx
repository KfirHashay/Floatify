import React, { useEffect } from 'react';
import { useAggregator } from 'floatify';
import { CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  sticky: boolean;
  position: string;
  onStickyChange: (value: boolean) => void;
  onPositionChange: (value: string) => void;
}

export default function Demo({ sticky, position, onStickyChange, onPositionChange }: Props) {
  const { registerChannel, addCard, removeCard } = useAggregator();

  useEffect(() => {
    registerChannel('demo', 1);
  }, [registerChannel]);

  const handleShow = () => {
    addCard('demo', {
      id: Date.now().toString(),
      title: 'Hello from Floatify',
      content: 'This card was triggered by a button click.',
    });
  };

  const handleLoading = () => {
    const id = Date.now().toString();
    addCard('demo', {
      id,
      title: 'Loading…',
      content: 'Please wait',
      icon: <Loader2 className="spin" />,
    });

    setTimeout(() => {
      removeCard('demo', id);
      addCard('demo', {
        id: id + '-done',
        title: 'Complete',
        content: 'Operation successful',
        icon: <CheckCircle />,
      });
    }, 1500);
  };

  return (
    <div className="demo">
      <div className="demo-controls">
        <label>
          <input
            type="checkbox"
            checked={sticky}
            onChange={(e) => onStickyChange(e.target.checked)}
          />{' '}
          Sticky
        </label>
        <select
          value={position}
          onChange={(e) => onPositionChange(e.target.value)}
        >
          <option value="top">top</option>
          <option value="bottom">bottom</option>
          <option value="center">center</option>
          <option value="top-left">top-left</option>
          <option value="top-right">top-right</option>
          <option value="bottom-left">bottom-left</option>
          <option value="bottom-right">bottom-right</option>
        </select>
      </div>
      <button onClick={handleShow}>Show Card</button>
      <button onClick={handleLoading}>Loading Example</button>
    </div>
  );
}
