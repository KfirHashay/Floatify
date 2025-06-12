import React, { useEffect } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act, cleanup } from '@testing-library/react/pure';
import AggregatorProvider from '../src/components/state/context/aggregatorProvider';
import useAggregator from '../src/components/state/hooks/useAggregator';
import { OverlayAggregatorAction } from '../src/components/state/types';

// Component that performs multiple actions to test debug logging
function TestComponent() {
    const { registerChannel, addCard, updateChannelState, removeCard } = useAggregator();
    
    useEffect(() => {
        // Register a test channel
        registerChannel('debug-test', 1);
        
        // Add cards to the channel
        addCard('debug-test', { 
            id: 'card-1',
            title: 'Debug Test Card 1', 
            content: 'Testing debug logging with this card'
        });
        
        addCard('debug-test', { 
            id: 'card-2',
            title: 'Debug Test Card 2', 
            content: 'Another test card for debug logging'
        });
        
        // Update channel state
        updateChannelState('debug-test', 'split');
        
        // Remove a card (after a short delay)
        setTimeout(() => {
            removeCard('debug-test', 'card-1');
        }, 100);
        
    }, [registerChannel, addCard, updateChannelState, removeCard]);
    
    return <div>Debug Test Component</div>;
}

describe('AggregatorProvider debug logging', () => {
    // Spy on console methods
    let groupCollapsedSpy: ReturnType<typeof vi.spyOn>;
    let groupEndSpy: ReturnType<typeof vi.spyOn>;
    let logSpy: ReturnType<typeof vi.spyOn>;
    let errorSpy: ReturnType<typeof vi.spyOn>;
    
    beforeEach(() => {
        // Mock all console methods to avoid cluttering the test output
        groupCollapsedSpy = vi.spyOn(console, 'groupCollapsed').mockImplementation(() => {});
        groupEndSpy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {});
        logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        // Reset the mocks before each test
        vi.useFakeTimers();
    });
    
    afterEach(() => {
        cleanup();
        // Restore all mocks
        groupCollapsedSpy.mockRestore();
        groupEndSpy.mockRestore();
        logSpy.mockRestore();
        errorSpy.mockRestore();
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    it('logs action and state transitions when debug is enabled', () => {
        render(
            <AggregatorProvider debug>
                <TestComponent />
            </AggregatorProvider>
        );
        
        // Verify logs for REGISTER_CHANNEL action
        expect(groupCollapsedSpy).toHaveBeenCalledWith('[Floatify] REGISTER_CHANNEL');
        
        // Logs should contain state transitions and setup messages
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('prev state'), expect.anything());
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('action'), expect.anything());
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('next state'), expect.anything());
        
        // Logs for auto-dismiss setup
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[Floatify] Setting up auto-dismiss timers'));
    });
    
    it('logs multiple actions in sequence', async () => {
        render(
            <AggregatorProvider debug>
                <TestComponent />
            </AggregatorProvider>
        );
        
        // Check for multiple action types logged
        expect(groupCollapsedSpy).toHaveBeenCalledWith('[Floatify] REGISTER_CHANNEL');
        expect(groupCollapsedSpy).toHaveBeenCalledWith('[Floatify] ADD_CARD');
        expect(groupCollapsedSpy).toHaveBeenCalledWith('[Floatify] UPDATE_CHANNEL_STATE');
        
        // Fast-forward timeout to trigger the removeCard action
        act(() => {
            vi.advanceTimersByTime(150);
        });
        
        // Check if the REMOVE_CARD action was logged
        expect(groupCollapsedSpy).toHaveBeenCalledWith('[Floatify] REMOVE_CARD');
    });
    
    it('does not log when debug is disabled', () => {
        render(
            <AggregatorProvider debug={false}>
                <TestComponent />
            </AggregatorProvider>
        );
        
        // No action logging should occur
        expect(groupCollapsedSpy).not.toHaveBeenCalledWith(expect.stringMatching(/\[Floatify\] [A-Z_]+/));
        
        // Should not log state transitions
        expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining('prev state'), expect.anything());
        expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining('action'), expect.anything());
        expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining('next state'), expect.anything());
    });
    
    it('logs auto-dismiss timer operations', () => {
        render(
            <AggregatorProvider debug autoDismiss={true} autoDismissTimeout={1000}>
                <TestComponent />
            </AggregatorProvider>
        );
        
        // Check for auto-dismiss timer logs
        expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/\[Floatify\] Setting auto-dismiss timer for card/));
    });
});

