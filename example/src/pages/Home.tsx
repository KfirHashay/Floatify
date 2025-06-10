import React from 'react';

export default function Home() {
  return (
    <section>
      <h2>Overview</h2>
      <p>
        Floatify lets you display transient UI like toasts or guided cards using a
        global provider.
      </p>
      <p>
        The example app now uses theme tokens defined in <code>theme.css</code>
        and supports light or dark mode via a toggle in the header.
      </p>
      <h2>Installation</h2>
      <pre>
        <code>npm install floatify</code>
      </pre>
      <p>Run the docs locally with:</p>
      <pre>
        <code>cd example &amp;&amp; npm run dev</code>
      </pre>
    </section>
  );
}
