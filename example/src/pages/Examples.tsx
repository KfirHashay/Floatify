import React from 'react';
import Demo from '../components/Demo';

const quickStart = `import { Floatify, useAggregator } from 'floatify';

function App() {
  const { registerChannel, addCard } = useAggregator();

  useEffect(() => {
    registerChannel('alerts', 1);
    addCard('alerts', { id: 'welcome', title: 'Hello', content: 'Welcome!' });
  }, []);

  return <Floatify concurrencyMode="multiple">{/* app */}</Floatify>;
}`;

export default function Examples() {
  return (
    <section>
      <h2>Quick Start</h2>
      <pre>
        <code>{quickStart}</code>
      </pre>
      <h2>Demo</h2>
      <Demo />
      <p>Click the button above to push a card.</p>
    </section>
  );
}
