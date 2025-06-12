import React, { useEffect } from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react/pure';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import AggregatorProvider from '../src/components/state/context/aggregatorProvider';
import useAggregator from '../src/components/state/hooks/useAggregator';

// Setup and teardown
beforeEach(() => {
    // Reset any mocks or environment before each test
    document.body.innerHTML = '';
});

afterEach(() => {
    cleanup();
});

// Test components that set up different states
function LoadingSetup() {
    const { registerChannel, updateChannelState } = useAggregator();
    useEffect(() => {
        registerChannel('load', 1);
        updateChannelState('load', 'loading');
    }, [registerChannel, updateChannelState]);
    return null;
}

function PositionSetup({ onChannelReady }: { onChannelReady?: () => void }) {
    const { registerChannel, addCard } = useAggregator();
    useEffect(() => {
        registerChannel('ch', 1);
        addCard('ch', { id: 'a', content: 'A' });
        if (onChannelReady) onChannelReady();
    }, [registerChannel, addCard, onChannelReady]);
    return null;
}

function SplitStateSetup() {
    const { registerChannel, addCard, updateChannelState } = useAggregator();
    useEffect(() => {
        registerChannel('split', 1);
        addCard('split', { id: 'a', title: 'A', content: 'A' });
        updateChannelState('split', 'split');
    }, [registerChannel, addCard, updateChannelState]);
    return null;
}

function BubbleStateSetup() {
    const { registerChannel, addCard, updateChannelState } = useAggregator();
    useEffect(() => {
        registerChannel('bubble', 1);
        addCard('bubble', { id: 'a', title: 'A', content: 'A' });
        updateChannelState('bubble', 'bubble');
    }, [registerChannel, addCard, updateChannelState]);
    return null;
}

// Component that allows testing state transitions
function StateTransitionSetup() {
    const { registerChannel, addCard, updateChannelState, state } = useAggregator();
    
    useEffect(() => {
        registerChannel('transition', 1);
        addCard('transition', { id: 'trans-1', title: 'Transition Test', content: 'Testing state transitions' });
    }, [registerChannel, addCard]);
    
    return (
        <div>
            <button 
                onClick={() => updateChannelState('transition', 'expanded' as any)}
                data-testid="set-default"
            >
                Default
            </button>
            <button 
                onClick={() => updateChannelState('transition', 'split')}
                data-testid="set-split"
            >
                Split
            </button>
            <button 
                onClick={() => updateChannelState('transition', 'bubble')}
                data-testid="set-bubble"
            >
                Bubble
            </button>
            <button 
                onClick={() => updateChannelState('transition', 'loading')}
                data-testid="set-loading"
            >
                Loading
            </button>
            <div data-testid="current-state">
                {state.channels.transition?.state || 'none'}
            </div>
        </div>
    );
}

describe('Overlay States', () => {
    describe('Loading State', () => {
        it('renders spinner when loading state is active', () => {
            render(
                <AggregatorProvider>
                    <LoadingSetup />
                </AggregatorProvider>
            );
            expect(screen.getByLabelText('Loading')).toBeTruthy();
            
            // Verify loading indicator has appropriate styling
            const loadingIndicator = document.querySelector('.loading-indicator');
            expect(loadingIndicator).toBeTruthy();
        });
        
        it('supports split loading mode', () => {
            render(
                <AggregatorProvider splitLoading={true}>
                    <LoadingSetup />
                </AggregatorProvider>
            );
            const portal = document.querySelector('.overlay-portal');
            expect(portal?.getAttribute('data-state')).toBe('loading');
        });
        
        it('supports regular loading mode', () => {
            render(
                <AggregatorProvider splitLoading={false}>
                    <LoadingSetup />
                </AggregatorProvider>
            );
            const portal = document.querySelector('.overlay-portal');
            expect(portal?.getAttribute('data-state')).toBe('loading');
        });
    });

    describe('Position and Viewport Behavior', () => {
        it('applies correct position class based on position prop', () => {
            // Test each position option
            const positions = ['top', 'bottom', 'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
            
            positions.forEach(position => {
                render(
                    <AggregatorProvider position={position as any}>
                        <PositionSetup />
                    </AggregatorProvider>
                );
                const portal = document.querySelector('.overlay-portal');
                expect(portal?.classList.contains(`overlay-portal--${position}`)).toBe(true);
                cleanup();
            });
        });

        it('applies fixed viewport class when fixedToViewport is true', async () => {
            render(
                <AggregatorProvider fixedToViewport position="top">
                    <PositionSetup />
                </AggregatorProvider>
            );
            await waitFor(() => {
                const el = document.querySelector('.overlay-portal.overlay-portal--fixed');
                expect(el).toBeTruthy();
            });
            const portal = document.querySelector('.overlay-portal.overlay-portal--fixed');
            expect(portal?.classList.contains('overlay-portal--top')).toBe(true);
        });

        it('does not apply fixed viewport class when fixedToViewport is false', async () => {
            render(
                <AggregatorProvider fixedToViewport={false} position="top">
                    <PositionSetup />
                </AggregatorProvider>
            );
            await waitFor(() => {
                const el = document.querySelector('.overlay-portal');
                expect(el).toBeTruthy();
            });
            const portal = document.querySelector('.overlay-portal');
            expect(portal?.classList.contains('overlay-portal--fixed')).toBe(false);
        });
    });

    describe('Split and Bubble States', () => {
        it('correctly applies split state to portal and card', () => {
            render(
                <AggregatorProvider>
                    <SplitStateSetup />
                </AggregatorProvider>
            );
            const portal = document.querySelector('.overlay-portal');
            const card = document.querySelector('.overlay-card');
            
            expect(portal?.getAttribute('data-state')).toBe('split');
            expect(card?.classList.contains('overlay-card--split')).toBe(true);
            
            // Verify style properties specific to split state
            const style = getComputedStyle(portal as Element);
            expect(style.width).toBe('');
        });

        it('correctly applies bubble state to portal and card', () => {
            render(
                <AggregatorProvider>
                    <BubbleStateSetup />
                </AggregatorProvider>
            );
            const portal = document.querySelector('.overlay-portal');
            const card = document.querySelector('.overlay-card');
            
            expect(portal?.getAttribute('data-state')).toBe('bubble');
            expect(card?.classList.contains('overlay-card--bubble')).toBe(true);
            
            // Verify style properties specific to bubble state
            const style = getComputedStyle(portal as Element);
            expect(style.width).toBe('');
        });
        
        it('handles state transitions between different overlay states', () => {
            render(
                <AggregatorProvider>
                    <StateTransitionSetup />
                </AggregatorProvider>
            );
            
            // Default state initially
            let currentState = screen.getByTestId('current-state');
            expect(currentState.textContent).toBe('default');
            
            // Transition to split state
            fireEvent.click(screen.getByTestId('set-split'));
            expect(currentState.textContent).toBe('split');
            let portal = document.querySelector('.overlay-portal');
            expect(portal?.getAttribute('data-state')).toBe('split');
            
            // Transition to bubble state
            fireEvent.click(screen.getByTestId('set-bubble'));
            expect(currentState.textContent).toBe('bubble');
            portal = document.querySelector('.overlay-portal');
            expect(portal?.getAttribute('data-state')).toBe('bubble');
            
            // Transition to loading state
            fireEvent.click(screen.getByTestId('set-loading'));
            expect(currentState.textContent).toBe('loading');
            portal = document.querySelector('.overlay-portal');
            expect(portal?.getAttribute('data-state')).toBe('loading');
            
            // Back to default
            fireEvent.click(screen.getByTestId('set-default'));
            expect(currentState.textContent).toBe('default');
            portal = document.querySelector('.overlay-portal');
            expect(portal?.getAttribute('data-state')).toBe('default');
        });
    });
    
    describe('Unstyled Mode', () => {
        it('does not apply styling classes when unstyled is true', () => {
            render(
                <AggregatorProvider unstyled={true}>
                    <PositionSetup />
                </AggregatorProvider>
            );
            
            // Portal should still exist but without most styling classes
            const portal = document.querySelector('.overlay-portal');
            expect(portal).toBeTruthy();
            expect(portal?.classList.contains('overlay-styled')).toBe(false);
        });
        
        it('applies styling classes when unstyled is false (default)', () => {
            render(
                <AggregatorProvider>
                    <PositionSetup />
                </AggregatorProvider>
            );
            
            // Portal should have styling classes
            const portal = document.querySelector('.overlay-portal');
            expect(portal).toBeTruthy();
            expect(portal?.classList.contains('overlay-styled')).toBe(true);
        });
    });
});

