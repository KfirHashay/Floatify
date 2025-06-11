import React, { useEffect, useReducer, useMemo } from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react/pure';
import { describe, it, expect, afterEach } from 'vitest';
import { aggregatorReducer } from '../src/components/state/reducers/aggregatorReducer';
import { AggregatorContext } from '../src/components/state/context/aggregatorContext';
import useAggregator from '../src/components/state/hooks/useAggregator';
import { OverlayCard as OverlayCardComponent } from '../src/components/core/card/OverlayCard';
import { messageIcon, spinnerIcon, alertIcon } from '../src/components/core/utils/defaultIcons';

afterEach(() => {
    cleanup();
});

function TestProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(aggregatorReducer, {
        channels: {},
        activeChannelId: null,
    });
    const value = useMemo(
        () => ({
            state,
            dispatch,
            config: {
                splitLoading: true,
                defaultBubbleIcons: {
                    message: messageIcon,
                    loading: spinnerIcon,
                    alert: alertIcon,
                },
            },
        }),
        [state, dispatch]
    );
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
        const card = screen.getByRole('button', { name: /Overlay Card/ });
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
        const card = screen.getByRole('button', { name: /Overlay Card/ });
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

    function SplitSetup() {
        const { registerChannel, addCard, updateChannelState, state } =
            useAggregator();
        useEffect(() => {
            registerChannel('ch', 1);
            addCard('ch', { id: 'a', title: 'A', content: 'A' });
            addCard('ch', { id: 'b', title: 'B', content: 'B' });
            updateChannelState('ch', 'split');
        }, [registerChannel, addCard, updateChannelState]);

        const channel = state.channels['ch'];
        if (!channel) return null;
        const card = channel.cards[channel.activeCardIndex];
        return <OverlayCardComponent channelId="ch" card={card} />;
    }

    function BubbleSetup({ indexRef }: { indexRef: { current: number } }) {
        const { registerChannel, addCard, updateChannelState, state } =
            useAggregator();
        useEffect(() => {
            registerChannel('ch', 1);
            addCard('ch', { id: 'a', title: 'A', content: 'A' });
            addCard('ch', { id: 'b', title: 'B', content: 'B' });
            updateChannelState('ch', 'bubble');
        }, [registerChannel, addCard, updateChannelState]);

        useEffect(() => {
            const idx = state.channels['ch']?.activeCardIndex ?? 0;
            indexRef.current = idx;
        }, [state]);

        const channel = state.channels['ch'];
        if (!channel) return null;
        const card = channel.cards[channel.activeCardIndex];
        return (
            <>
                <OverlayCardComponent channelId="ch" card={card} />
            </>
        );
    }

    it('allows swiping in split state', () => {
        render(
            <TestProvider>
                <SplitSetup />
            </TestProvider>
        );
        const card = screen.getByRole('button', { name: /Overlay Card/ });
        expect(card.classList.contains('overlay-card--split')).toBe(true);
        expect(card.textContent).toContain('A');
        fireEvent.touchStart(card, { touches: [{ clientX: 100 }] });
        fireEvent.touchMove(card, { touches: [{ clientX: 30 }] });
        fireEvent.touchEnd(card, { changedTouches: [{ clientX: 30 }] });
        expect(card.textContent).toContain('B');
        const bubble = screen.getByLabelText(/Show/);
        expect(bubble).toBeTruthy();
    });

    it('ignores swipes in bubble state', () => {
        const indexRef = { current: 0 };
        render(
            <TestProvider>
                <BubbleSetup indexRef={indexRef} />
            </TestProvider>
        );
        const card = screen.getByRole('button', { name: /Overlay Card/ });
        expect(card.classList.contains('overlay-card--bubble')).toBe(true);
        fireEvent.touchStart(card, { touches: [{ clientX: 100 }] });
        fireEvent.touchMove(card, { touches: [{ clientX: 30 }] });
        fireEvent.touchEnd(card, { changedTouches: [{ clientX: 30 }] });
        expect(indexRef.current).toBe(0);
    });
});
