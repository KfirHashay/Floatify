# Floatify

A flexible overlay and notification library for React.

## Overview

Floatify helps you display transient UI elements like toasts, alerts or walkthrough cards without cluttering your component tree. It manages multiple overlay channels through a central **AggregatorProvider** so that cards can be queued, swiped or dismissed from anywhere in your app.

## Key Features

- **Aggregator provider** for global overlay state management and concurrency modes.
- **Overlay portal** that renders active cards via React Portal.
- **Touch gestures** to swipe cards forward or backward and dismiss them.
- **Built‑in theming** with dark and light styles that can be extended.

## Installation

The library is published to npm as `floatify`.

```bash
npm install floatify@^1.0.0
```

### Linking the local build

If you want to play with the source locally, build the package and use the example app:

```bash
# from the project root
npm install
npm run build
cd example
npm install       # installs and links "floatify": "file:.."
npm run dev
```

## Quick Start

```tsx
import { Floatify, useAggregator } from 'floatify';

function App() {
  const { registerChannel, addCard } = useAggregator();

  useEffect(() => {
    registerChannel('alerts', 1);
    registerChannel('updates', 1);
    addCard('alerts', { id: 'welcome', title: 'Hello', content: 'Welcome!' });
    addCard('updates', {
      id: 'news',
      title: 'FYI',
      content: 'Another channel',
    });
  }, []);

  return (
    <Floatify concurrencyMode="multiple">
      {/* rest of your app */}
    </Floatify>
  );
}
```

## Debug Mode

Enable debug logging by passing the `debug` prop to `Floatify` or
`AggregatorProvider`:

```tsx
<Floatify debug>
  {/* rest of your app */}
</Floatify>
```

The console will group each dispatched action with the previous state,
the action object and the next state, helping you trace overlay updates.

## Running the Example Project

The `example` folder contains a small React app that demonstrates Floatify in action. After running the steps in the *Linking the local build* section above, visit `http://localhost:5173` to see overlays appear on timed intervals.

## Contributing

Pull requests and issues are welcome! The project is released under the ISC license as defined in `package.json`. Please open issues or feature requests in the repository's issue tracker.

## Community & Support

Check the project repository on GitHub for documentation updates and to report bugs or suggest enhancements.
