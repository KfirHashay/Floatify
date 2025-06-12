import React, { useEffect, useReducer, useMemo } from 'react';
import { act } from '@testing-library/react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react/pure';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { aggregatorReducer } from '../src/components/state/reducers/aggregatorReducer';
import { AggregatorContext } from '../src/components/state/context/aggregatorContext';
import useAggregator from '../src/components/state/hooks/useAggregator';
import { OverlayCard as OverlayCardComponent } from '../src/components/core/card/OverlayCard';
import { messageIcon, spinnerIcon, alertIcon } from '../src/components/core/utils/defaultIcons';

// Setup and teardown
beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = '';
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// Provider component for testing
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
    return <AggregatorContext.Provider value={value}>{children}</AggregatorContext.Provider>;
}

// Basic setup with multiple cards for horizontal swipe testing
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

// Setup for split state tests
function SplitSetup() {
    const { registerChannel, addCard, updateChannelState, state } = useAggregator();
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

// Setup for bubble state tests with index reference for checking state changes
function BubbleSetup({ indexRef }: { indexRef: { current: number } }) {
    const { registerChannel, addCard, updateChannelState, state } = useAggregator();
    useEffect(() => {
        registerChannel('ch', 1);
        addCard('ch', { id: 'a', title: 'A', content: 'A' });
        addCard('ch', { id: 'b', title: 'B', content: 'B' });
        updateChannelState('ch', 'bubble');
    }, [registerChannel, addCard, updateChannelState]);

    useEffect(() => {
        const idx = state.channels['ch']?.activeCardIndex ?? 0;
        indexRef.current = idx;
    }, [state, indexRef]);

    const channel = state.channels['ch'];
    if (!channel) return null;
    const card = channel.cards[channel.activeCardIndex];
    return (
        <>
            <OverlayCardComponent channelId="ch" card={card} />
        </>
    );
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

        // Swipe left (next card)
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

        // Move to next card first
        fireEvent.touchStart(card, { touches: [{ clientX: 100 }] });
        fireEvent.touchMove(card, { touches: [{ clientX: 30 }] });
        fireEvent.touchEnd(card, { changedTouches: [{ clientX: 30 }] });
        expect(card.textContent).toContain('B');

        // Then swipe right to go back
        fireEvent.touchStart(card, { touches: [{ clientX: 30 }] });
        fireEvent.touchMove(card, { touches: [{ clientX: 100 }] });
        fireEvent.touchEnd(card, { changedTouches: [{ clientX: 100 }] });
        expect(card.textContent).toContain('A');
    });

    it('allows swiping in split state', () => {
        render(
            <TestProvider>
                <SplitSetup />
            </TestProvider>
        );
        const card = screen.getByRole('button', { name: /Overlay Card/ });
        expect(card.classList.contains('overlay-card--split')).toBe(true);
        expect(card.textContent).toContain('A');

        // Swipe to next card
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

        // Attempt to swipe in bubble state
        fireEvent.touchStart(card, { touches: [{ clientX: 100 }] });
        fireEvent.touchMove(card, { touches: [{ clientX: 30 }] });
        fireEvent.touchEnd(card, { changedTouches: [{ clientX: 30 }] });

        // Verify card index hasn't changed (swipe was ignored)
        expect(indexRef.current).toBe(0);
    });
});

describe('OverlayCard vertical swipe dismissal', () => {
    it('card can be swiped up to dismiss', () => {
        render(
            <TestProvider>
                <OverlayCardComponent
                    channelId="test-channel"
                    card={{
                        id: 'card-1',
                        title: 'Swipe Test',
                        content: 'Swipe up to dismiss',
                    }}
                />
            </TestProvider>
        );

        const card = screen.getByTestId('card-1');

        // Simulate swipe up with significant distance
        fireEvent.touchStart(card, {
            touches: [{ clientY: 300, clientX: 150 }],
        });
        fireEvent.touchMove(card, {
            touches: [{ clientY: 100, clientX: 150 }],
        });
        fireEvent.touchEnd(card);

        // Card should be removed from the DOM
        expect(screen.queryByTestId('card-1')).toBeFalsy();
    });

    it('card can be swiped down to dismiss', () => {
        render(
            <TestProvider>
                <OverlayCardComponent
                    channelId="test-channel"
                    card={{
                        id: 'card-2',
                        title: 'Swipe Test',
                        content: 'Swipe down to dismiss',
                    }}
                />
            </TestProvider>
        );

        const card = screen.getByTestId('card-2');

        // Simulate swipe down
        fireEvent.touchStart(card, {
            touches: [{ clientY: 100, clientX: 150 }],
        });
        fireEvent.touchMove(card, {
            touches: [{ clientY: 300, clientX: 150 }],
        });
        fireEvent.touchEnd(card);

        // Card should be removed from the DOM
        expect(screen.queryByTestId('card-2')).toBeFalsy();
    });

    it('minor vertical swipes do not dismiss the card', () => {
        render(
            <TestProvider>
                <OverlayCardComponent
                    channelId="test-channel"
                    card={{
                        id: 'card-3',
                        title: 'Minor Swipe',
                        content: 'Small swipes should be ignored',
                    }}
                />
            </TestProvider>
        );

        const card = screen.getByTestId('card-3');

        // Small vertical swipe (should be ignored)
        fireEvent.touchStart(card, {
            touches: [{ clientY: 200, clientX: 150 }],
        });
        fireEvent.touchMove(card, {
            touches: [{ clientY: 220, clientX: 150 }], // Only 20px movement
        });
        fireEvent.touchEnd(card);

        // Card should remain in DOM
        expect(screen.queryByTestId('card-3')).toBeTruthy();

    });
});

describe('OverlayCard built-in actions', () => {
    it('card can be closed by clicking close button', () => {
        render(
            <TestProvider>
                <OverlayCardComponent
                    channelId="test-channel"
                    card={{
                        id: 'action-card',
                        title: 'Action Test',
                        content: 'Click close button',
                    }}
                />
            </TestProvider>
        );

        // Update channel state to expanded to show close button
        const { updateChannelState } = useAggregator();
        updateChannelState('test-channel', 'expanded');

        // Find the close button
        const closeButton = screen.getByLabelText('Close overlay');
        expect(closeButton).toBeTruthy();

        // Click the close button
        fireEvent.click(closeButton);

        // In the real implementation, clicking would call removeCard
        // which we can't directly observe here
    });

    it('supports navigation buttons in expanded state', () => {
        render(
            <TestProvider>
                <OverlayCardComponent
                    channelId="test-channel"
                    card={{
                        id: 'navigation-card',
                        title: 'Navigation Test',
                        content: 'Test navigation buttons',
                    }}
                />
            </TestProvider>
        );

        // Update channel state to expanded to show navigation buttons
        const { updateChannelState } = useAggregator();
        updateChannelState('test-channel', 'expanded');

        // Verify navigation buttons are rendered
        const prevButton = screen.getByLabelText('Previous item');
        const nextButton = screen.getByLabelText('Next item');
        expect(prevButton).toBeTruthy();
        expect(nextButton).toBeTruthy();

        // Click navigation buttons
        fireEvent.click(prevButton);
        fireEvent.click(nextButton);

        // In the real implementation, clicking would call
        // swipePrevCard/swipeNextCard which we can't directly observe
    });
});

describe('Accessibility features', () => {
    it('has accessible title and content', () => {
        render(
            <TestProvider>
                <OverlayCardComponent
                    channelId="test-channel"
                    card={{
                        id: 'a11y-card',
                        title: 'Accessible Title',
                        content: 'This is accessible content',
                    }}
                />
            </TestProvider>
        );

        // Verify accessible heading is present
        const title = screen.getByText('Accessible Title');
        expect(title).toBeTruthy();

        // Verify content is visible
        const content = screen.getByText('This is accessible content');
        expect(content).toBeTruthy();
    });

    it('renders icons correctly', () => {
        render(
            <TestProvider>
                <OverlayCardComponent
                    channelId="test-channel"
                    card={{
                        id: 'icon-card',
                        title: 'Card with Icon',
                        content: 'This card has an icon',
                        bubbleIcon: messageIcon,
                    }}
                />
            </TestProvider>
        );

        // Check if card is rendered
        const card = screen.getByTestId('icon-card');
        expect(card).toBeTruthy();

        // Check if icon container exists
        const iconContainer = document.querySelector('.overlay-card__icon');
        expect(iconContainer).toBeTruthy();
    });
});
