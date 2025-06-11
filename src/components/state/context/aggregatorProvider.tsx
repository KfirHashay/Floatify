import React, {
    useReducer,
    useEffect,
    useMemo,
    useRef,
    useCallback,
    PropsWithChildren,
} from 'react';
import { aggregatorReducer } from '../reducers/aggregatorReducer';
import { OverlayAggregatorState, OverlayAggregatorAction } from '../types';
import { AggregatorContext } from './aggregatorContext';
import { OverlayPortal } from '../../core/portal';
import '../../style/index.css';

// Possible concurrency modes
type ConcurrencyMode = 'single' | 'multiple';

// Configuration options for developer convenience
export interface AggregatorProviderConfig {
    /**
     * Enable debug logging to see actions and state changes in the console.
     * Pass `<AggregatorProvider debug>` or `<Floatify debug>` when rendering
     * the provider.
     */
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

    /**
     * Keep the overlay fixed to the viewport (renamed from 'sticky' for clarity).
     * Default is true.
     */
    fixedToViewport?: boolean;

    /**
     * Preferred placement for the overlay portal. Use only `top` or `bottom`
     * on mobile for best results.
     */
    position?:
        | 'top'
        | 'bottom'
        | 'center'
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right';
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
 * Supports concurrency modes, auto-dismiss, and an optional debug mode.
 * When the `debug` prop is enabled, every dispatched action will be logged
 * along with the state before and after the update.
 * Typically, your app will wrap around `<AggregatorProvider>` or `<Floatify>`
 * so that child components can dispatch overlay actions or read aggregator state.
 */
export default function AggregatorProvider({
    children,
    concurrencyMode = 'single',
    autoDismiss = true, // FIXED: Changed default to true
    autoDismissTimeout = 3000,
    debug = false,
    portalRoot,
    unstyled = false,
    fixedToViewport = true,
    position = 'top',
}: AggregatorProviderProps) {
    const [state, baseDispatch] = useReducer(aggregatorReducer, initialAggregatorState);

    // Keep a ref to the latest state so the debug logger can read
    // the state before dispatch updates it
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // Ref to track active auto-dismiss timeouts with improved key management
    const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

    // Dispatch wrapper that logs action and state transitions when debug is enabled
    const debugDispatch = useCallback(
        (action: OverlayAggregatorAction) => {
            if (debug) {
                const prevState = stateRef.current;
                const nextState = aggregatorReducer(prevState, action);
                console.groupCollapsed(`[Floatify] ${action.type}`);
                console.log('prev state', prevState);
                console.log('action', action);
                console.log('next state', nextState);
                console.groupEnd();
            }
            baseDispatch(action);
        },
        [debug, baseDispatch]
    );

    // Use the debug wrapper only when the flag is true
    const dispatch = debug ? debugDispatch : baseDispatch;

    // FIXED: Improved auto-dismiss logic with better timeout management
    useEffect(() => {
        if (!autoDismiss) {
            // Clear all timeouts if auto-dismiss is disabled
            timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
            timeoutsRef.current.clear();
            if (debug) {
                console.log('[Floatify] Auto-dismiss disabled, clearing all timeouts');
            }
            return;
        }

        // Clear existing timeouts
        timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
        timeoutsRef.current.clear();

        if (debug) {
            console.log('[Floatify] Setting up auto-dismiss timers');
        }

        // Set up auto-dismiss for all active cards
        Object.values(state.channels).forEach((channel) => {
            channel.cards.forEach((card) => {
                // FIXED: Improved card-level auto-dismiss logic
                const shouldAutoDismiss = card.autoDismiss !== undefined ? card.autoDismiss : autoDismiss;
                
                if (shouldAutoDismiss) {
                    // Use card-specific duration or global timeout
                    const duration = card.autoDismissDuration || autoDismissTimeout;
                    
                    // FIXED: Use unique key combining channelId and cardId
                    const timeoutKey = `${channel.channelId}-${card.id}`;
                    
                    if (debug) {
                        console.log(`[Floatify] Setting auto-dismiss timer for card ${card.id} in channel ${channel.channelId} (${duration}ms)`);
                    }
                    
                    const timeoutId = setTimeout(() => {
                        try {
                            if (debug) {
                                console.log(`[Floatify] Auto-dismissing card ${card.id} from channel ${channel.channelId} after ${duration}ms`);
                            }
                            dispatch({
                                type: 'REMOVE_CARD',
                                payload: {
                                    channelId: channel.channelId,
                                    cardId: card.id,
                                },
                            });
                        } catch (error) {
                            console.error('[Floatify] Error during auto-dismiss:', error);
                        } finally {
                            // Clean up the timeout reference
                            timeoutsRef.current.delete(timeoutKey);
                        }
                    }, duration);

                    // Store the timeout reference with unique key
                    timeoutsRef.current.set(timeoutKey, timeoutId);
                } else if (debug) {
                    console.log(`[Floatify] Card ${card.id} in channel ${channel.channelId} has auto-dismiss disabled`);
                }
            });
        });

        // Cleanup function
        return () => {
            timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
            timeoutsRef.current.clear();
        };
    }, [state.channels, autoDismiss, autoDismissTimeout, dispatch, debug]);

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
                fixedToViewport={fixedToViewport}
                position={position}
                // autoDismissTimeout={autoDismissTimeout}
            />
        </AggregatorContext.Provider>
    );
}