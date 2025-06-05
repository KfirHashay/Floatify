import React, { useEffect } from 'react';
import { useAggregator } from 'floatify';

export default function Demo() {
  const { registerChannel, addCard } = useAggregator();

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

  return (
    <div>
      <button onClick={handleShow}>Show Card</button>
    </div>
  );
}
