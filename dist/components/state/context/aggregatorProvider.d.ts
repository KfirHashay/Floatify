import { PropsWithChildren } from 'react';
import '../../style/index.css';
type ConcurrencyMode = 'single' | 'multiple';
export interface AggregatorProviderConfig {
    /**
     * Enable debug logging to see actions and state changes in the console.
     * Pass `<AggregatorProvider debug>` or `<Floatify debug>` when rendering
     * the provider.
     */
    debug?: boolean;
    concurrencyMode?: ConcurrencyMode;
    autoDismiss?: boolean;
    autoDismissTimeout?: number;
    portalRoot?: HTMLElement;
    unstyled?: boolean;
}
export interface AggregatorProviderProps extends PropsWithChildren<AggregatorProviderConfig> {
}
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
export default function AggregatorProvider({ children, concurrencyMode, autoDismiss, autoDismissTimeout, debug, portalRoot, unstyled, }: AggregatorProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=aggregatorProvider.d.ts.map