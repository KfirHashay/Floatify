# Floatify

A flexible overlay and notification library for React.

## Overview

Floatify helps you display transient UI elements like toasts, alerts or walkthrough cards without cluttering your component tree. It manages multiple overlay channels through a central **AggregatorProvider** so that cards can be queued, swiped or dismissed from anywhere in your app.

For a full guide with code snippets and live demos, open the React docs app under [`example/`](example/index.html). It showcases all mods and links to the roadmap.

## Key Features

- **Aggregator provider** for global overlay state management and concurrency modes.
- **Overlay portal** that renders active cards via React Portal.
- **Touch gestures** to swipe cards forward or backward and dismiss them.
- **Built‑in theming** with dark and light styles that can be extended.
- **Accessible overlays** announced via a polite live region and operable with the keyboard.

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

### Custom Portal Root

Use the `portalRoot` prop on `AggregatorProvider` or `Floatify` when you want the overlay portal to render into a specific DOM node. When omitted, overlays are mounted to `document.body`.

```tsx
const overlayRoot = document.getElementById('overlay-root') as HTMLElement;

<Floatify portalRoot={overlayRoot}>
  {/* rest of your app */}
</Floatify>
```

### Sticky & Positioning

The overlay portal can stick to the viewport and be positioned around the screen.
On mobile devices only `top` or `bottom` positions are recommended.

```tsx
<Floatify sticky position="bottom">
  {/* rest of your app */}
</Floatify>
```

### Loading & Icon States

Set a channel to `'loading'` to show a spinner or `'icon'` to display just the icon.
A typical pattern is to drive this from a loading boolean:

```tsx
const { registerChannel, updateChannelState } = useAggregator();
const [loading, setLoading] = useState(true);

useEffect(() => {
  registerChannel('playback', 1);
}, [registerChannel]);

useEffect(() => {
  updateChannelState('playback', loading ? 'loading' : 'collapsed');
}, [loading, updateChannelState]);

// later: setLoading(false); updateChannelState('playback', 'icon');
```

### Split Loading & Bubble Icons

Use the `splitLoading` prop to show the split layout while a channel is loading.
Provide bubble icons globally through `defaultBubbleIcons` or per card via the
`bubbleIcon` field.

```tsx
import { MessageCircle, Loader2, Bell, AlertCircle } from 'lucide-react';

<Floatify
  splitLoading
  defaultBubbleIcons={{
    message: <MessageCircle />,
    loading: <Loader2 className="animate-spin" />,
    alert: <AlertCircle />
  }}
>
  {/* rest of your app */}
</Floatify>

addCard('updates', {
  id: 'done',
  title: 'Complete',
  content: 'Process finished',
  bubbleIcon: <Bell />
});
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

The `example` folder doubles as the documentation site. After running the steps in the *Linking the local build* section above, run `npm run dev` inside `example` and visit `http://localhost:5173` to explore the docs and interactive demos.

## Accessibility

Overlay updates are announced to assistive technologies using a polite live region. Overlay cards are focusable and respond to **Enter** or **Space** so keyboard users can toggle or dismiss them.

## Running Tests

Install dependencies and execute the test suite with:

```bash
npm install
npm test
```

The `test` script runs `vitest` in single-run mode so it exits after completing all tests.

## Roadmap

Upcoming development plans are tracked in [ROADMAP.md](ROADMAP.md). Highlights include:

- Bringing the package to a stable 1.0 release
- Adding a notification history panel
- Improved default styles and themes
- Different ways to open the history panel via icons or links
- More dynamic-island style interactions

## Contributing

Pull requests and issues are welcome! The project is released under the ISC license as defined in `package.json`. Please open issues or feature requests in the repository's issue tracker.

## Community & Support

Check the project repository on GitHub for documentation updates and to report bugs or suggest enhancements.
