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
     * Keep the overlay fixed to the viewport when scrolling.
     */
    sticky?: boolean;

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
    autoDismiss = false,
    autoDismissTimeout = 3000,
    debug = false,
    portalRoot,
    unstyled = false,
    sticky = false,
    position = 'top',
}: AggregatorProviderProps) {
    const [state, baseDispatch] = useReducer(aggregatorReducer, initialAggregatorState);

    // Keep a ref to the latest state so the debug logger can read
    // the state before dispatch updates it
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

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
                sticky={sticky}
                position={position}
                // autoDismissTimeout={autoDismissTimeout}
            />
        </AggregatorContext.Provider>
    );
}
