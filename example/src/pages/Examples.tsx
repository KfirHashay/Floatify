import React from 'react';
import Demo from '../components/Demo';

interface Props {
  sticky: boolean;
  position: string;
  onStickyChange: (value: boolean) => void;
  onPositionChange: (value: string) => void;
}

const quickStart = `import { Floatify, useAggregator } from 'floatify';

function App() {
  const { registerChannel, addCard } = useAggregator();

  useEffect(() => {
    registerChannel('alerts', 1);
    addCard('alerts', { id: 'welcome', title: 'Hello', content: 'Welcome!' });
  }, []);

  return <Floatify concurrencyMode="multiple">{/* app */}</Floatify>;
}`;

export default function Examples({ sticky, position, onStickyChange, onPositionChange }: Props) {
  return (
    <section>
      <h2>Quick Start</h2>
      <pre>
        <code>{quickStart}</code>
      </pre>
      <h2>Demo</h2>
      <Demo
        sticky={sticky}
        position={position}
        onStickyChange={onStickyChange}
        onPositionChange={onPositionChange}
      />
      <p>
        Use the controls to change <code>sticky</code> and{' '}
        <code>position</code> props passed to <code>Floatify</code>.
      </p>
    </section>
  );
}
