import React, { useState, useEffect } from 'react';
import { Floatify, useAggregator } from 'floatify'; // Importing Floatify
import './index.css';
import { Sun, Moon } from 'lucide-react';

function AppContent() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });

    // 1) Access aggregator actions to register a channel & add/remove cards
    const { registerChannel, addCard, removeCard } = useAggregator();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // 2) On mount, set up a test channel and schedule timed actions
    useEffect(() => {
        // Register a couple of channels (priority=1)
        registerChannel('testChannel', 1);
        registerChannel('infoChannel', 1);

        // After 5 seconds, add a first card
        const timer1 = setTimeout(() => {
            addCard('testChannel', {
                id: 'card-1',
                title: 'Hello from Card 1',
                content: 'This card appears after 5 seconds',
                // iconUrl: '...' if you want an icon
            });
            console.log('Added card-1 to testChannel');
        }, 5000);

        // After 8 seconds, add a second card
        const timer2 = setTimeout(() => {
            addCard('testChannel', {
                id: 'card-2',
                title: 'Another Card',
                content: 'Second card in the channel, at 8 seconds',
            });
            console.log('Added card-2 to testChannel');
        }, 8000);

        // After 6 seconds, add a card to the secondary channel
        const timerInfo = setTimeout(() => {
            addCard('infoChannel', {
                id: 'info-1',
                title: 'Secondary Channel',
                content: 'Card from another channel',
            });
            console.log('Added info-1 to infoChannel');
        }, 6000);

        // After 13 seconds, remove the first card
        const timer3 = setTimeout(() => {
            removeCard('testChannel', 'card-1');
            console.log('Removed card-1 from testChannel');
        }, 13000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timerInfo);
            clearTimeout(timer3);
        };
    }, [registerChannel, addCard, removeCard]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    const isDark = theme === 'dark';

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '120px 20px 40px',
                backgroundColor: isDark ? '#000' : '#f5f5f5',
                color: isDark ? '#fff' : '#1a1a1a',
                gap: '2rem',
                transition: 'background-color 0.3s, color 0.3s',
            }}
        >
            <button
                onClick={toggleTheme}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '12px',
                    background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    color: isDark ? '#fff' : '#000',
                    transition: 'all 0.3s ease',
                }}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div
                style={{
                    maxWidth: '600px',
                    margin: '2rem auto',
                    padding: '2rem',
                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}
            >
                <h2
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                    }}
                >
                    Overlay Test
                </h2>
                <p>
                    This demo automatically registers a <strong>testChannel</strong> and adds cards at timed intervals (5s, 8s, and removes one at
                    13s).
                </p>
                <p>
                    Check the console for logs, or watch for overlay pop-ups if you have an
                    <strong> OverlayPortal</strong> rendering them.
                </p>
            </div>
        </div>
    );
}

// Main App wraps everything in the aggregator provider
function App() {
    return (
        <Floatify concurrencyMode="multiple" debug>
            <AppContent />
            {/* If you have a portal component, add it here:
            <OverlayPortal concurrencyMode="multiple" />
        */}
        </Floatify>
    );
}

export default App;
