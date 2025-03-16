import { PropsWithChildren } from 'react';
import '../../style/index.css';
type ConcurrencyMode = 'single' | 'multiple';
export interface AggregatorProviderConfig {
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
 * Supports concurrency modes, auto-dismiss, debug logs, and optional portal root.
 * Typically, your app will wrap around <AggregatorProvider> so that child components
 * can dispatch overlay actions or read aggregator state.
 */
export default function AggregatorProvider({ children, concurrencyMode, autoDismiss, autoDismissTimeout, debug, portalRoot, unstyled, }: AggregatorProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=aggregatorProvider.d.ts.map