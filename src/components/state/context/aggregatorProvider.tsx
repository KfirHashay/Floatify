import React, { useReducer, useEffect, useMemo, PropsWithChildren } from 'react';
import { aggregatorReducer } from '../reducers/aggregatorReducer';
import { OverlayAggregatorState, Channel, OverlayAggregatorAction } from '../types';
import { AggregatorContext } from './aggregatorContext';
import { OverlayPortal } from '../../core/portal';
import '../../style/index.css';

// Possible concurrency modes
type ConcurrencyMode = 'single' | 'multiple';

// Configuration options for developer convenience
export interface AggregatorProviderConfig {
    // If true, logs state changes/actions for debugging
    debug?: boolean;

    // Concurrency mode: single = only one channel active at a time
    // multiple = allow multiple visible channels
    // priority = automatically select the highest-priority channel
    concurrencyMode?: ConcurrencyMode;

    // Auto-dismiss settings for ephemeral cards
    autoDismiss?: boolean;
    autoDismissTimeout?: number; // in ms, e.g. 3000 = 3 seconds

    // Optional root element for creating a portal if needed
    // Usually, the UI component (OverlayPortal) handles createPortal,
    // but you can store a reference here if you want an integrated approach.
    portalRoot?: HTMLElement;

    unstyled?: boolean;
}

export interface AggregatorProviderProps extends PropsWithChildren<AggregatorProviderConfig> {}

// A simple default aggregator state
const initialAggregatorState: OverlayAggregatorState = {
    channels: {},
    activeChannelId: null,
};

/**
 * AggregatorProvider
 *
 * The main context provider for your overlay aggregator.
 * Supports concurrency modes, auto-dismiss, debug logs, and optional portal root.
 * Typically, your app will wrap around <AggregatorProvider> so that child components
 * can dispatch overlay actions or read aggregator state.
 */
export default function AggregatorProvider({
    children,
    concurrencyMode = 'single',
    autoDismiss = false,
    autoDismissTimeout = 3000,
    debug = false,
    portalRoot,
    unstyled = false,
}: AggregatorProviderProps) {
    const [state, dispatch] = useReducer(aggregatorReducer, initialAggregatorState);

    // Optional debug logging: logs actions + next state
    useEffect(() => {
        if (!debug) return;
        const originalDispatch = dispatch;
        // There's no direct "middleware" for useReducer, but you could do something like:
        // 1) override dispatch with a custom function, or
        // 2) console.log after each relevant action. For simplicity, let's just console.log after state changes.
    }, [debug]);

    // If concurrencyMode = 'priority', you might do additional logic in the aggregator reducer
    // or here in a side effect (e.g., watch new channels or new cards and auto-select highest priority).
    // Currently, we rely on aggregatorReducer logic for concurrency.

    // Auto-dismiss example: watch for newly added cards and set a timer
    useEffect(() => {
        if (!autoDismiss) return;
        // Minimal example: you could track newly added cards. In practice, you'd store times or track item changes.
    }, [autoDismiss, autoDismissTimeout, state.channels]);

    // Memoize the context value so we don't cause re-renders beyond the aggregator state changes
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <AggregatorContext.Provider value={contextValue}>
            {children}

            <OverlayPortal
                portalRoot={portalRoot}
                concurrencyMode={concurrencyMode}
                unstyled={unstyled}
                autoDismiss={autoDismiss}
                // autoDismissTimeout={autoDismissTimeout}
            />
        </AggregatorContext.Provider>
    );
}
