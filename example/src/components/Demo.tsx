import React, { useEffect } from 'react';
import { useAggregator } from 'floatify';

export default function Demo() {
  const { registerChannel, addCard, removeCard } = useAggregator();

  useEffect(() => {
    registerChannel('test', 1);
    registerChannel('info', 1);

    const t1 = setTimeout(() => {
      addCard('test', {
        id: 'c1',
        title: 'Hello from Card 1',
        content: 'Appears after 3 seconds',
      });
    }, 3000);

    const t2 = setTimeout(() => {
      addCard('info', {
        id: 'i1',
        title: 'Another Channel',
        content: 'This one shows on the info channel',
      });
    }, 6000);

    const t3 = setTimeout(() => {
      removeCard('test', 'c1');
    }, 10000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [registerChannel, addCard, removeCard]);

  return <p>Watch for overlays appearing after a few seconds.</p>;
}
