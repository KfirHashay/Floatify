import React, { useEffect, useReducer, useMemo } from 'react';
import { render, fireEvent, screen } from '@testing-library/react/pure';
import { describe, it, expect } from 'vitest';
import { aggregatorReducer } from '../src/components/state/reducers/aggregatorReducer';
import { AggregatorContext } from '../src/components/state/context/aggregatorContext';
import useAggregator from '../src/components/state/hooks/useAggregator';
import { OverlayCard as OverlayCardComponent } from '../src/components/core/card/OverlayCard';

function TestProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(aggregatorReducer, {
        channels: {},
        activeChannelId: null,
    });
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return (
        <AggregatorContext.Provider value={value}>{children}</AggregatorContext.Provider>
    );
}

function Setup() {
    const { registerChannel, addCard, state } = useAggregator();
    useEffect(() => {
        registerChannel('ch', 1);
        addCard('ch', { id: 'a', content: 'A' });
        addCard('ch', { id: 'b', content: 'B' });
    }, [registerChannel, addCard]);

    const channel = state.channels['ch'];
    if (!channel) return null;
    const card = channel.cards[channel.activeCardIndex];
    return <OverlayCardComponent channelId="ch" card={card} />;
}

describe('OverlayCard mobile swipes', () => {
    it('swipe left shows next card', () => {
        render(
            <TestProvider>
                <Setup />
            </TestProvider>
        );
        const card = screen.getAllByRole('button')[0];
        expect(card.textContent).toContain('A');
        fireEvent.touchStart(card, { touches: [{ clientX: 100 }] });
        fireEvent.touchMove(card, { touches: [{ clientX: 30 }] });
        fireEvent.touchEnd(card, { changedTouches: [{ clientX: 30 }] });
        expect(card.textContent).toContain('B');
    });

    it('swipe right shows previous card', () => {
        render(
            <TestProvider>
                <Setup />
            </TestProvider>
        );
        const card = screen.getAllByRole('button')[0];
        // move to next first
        fireEvent.touchStart(card, { touches: [{ clientX: 100 }] });
        fireEvent.touchMove(card, { touches: [{ clientX: 30 }] });
        fireEvent.touchEnd(card, { changedTouches: [{ clientX: 30 }] });
        expect(card.textContent).toContain('B');
        // swipe right back
        fireEvent.touchStart(card, { touches: [{ clientX: 30 }] });
        fireEvent.touchMove(card, { touches: [{ clientX: 100 }] });
        fireEvent.touchEnd(card, { changedTouches: [{ clientX: 100 }] });
        expect(card.textContent).toContain('A');
    });
});
