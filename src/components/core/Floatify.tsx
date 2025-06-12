import React from 'react';
import AggregatorProvider, { type AggregatorProviderProps } from '../state/context/aggregatorProvider';

// Update the props interface to use the new naming
export interface FloatifyProps extends Omit<AggregatorProviderProps, 'sticky'> {
    /**
     * @deprecated Use `fixedToViewport` instead. Will be removed in v2.0.0
     */
    sticky?: boolean;
    /**
     * Keep the overlay fixed to the viewport when scrolling.
     */
    fixedToViewport?: boolean;
}

export { default as AggregatorProvider } from '../state/context/aggregatorProvider';

export default function Floatify({ sticky, fixedToViewport, ...props }: FloatifyProps) {
    // Handle backward compatibility - default to true
    const actualFixedToViewport = fixedToViewport ?? sticky ?? true;
    
    if (sticky !== undefined && process.env.NODE_ENV === 'development') {
        console.warn('[Floatify] The `sticky` prop is deprecated. Use `fixedToViewport` instead.');
    }

    return <AggregatorProvider {...props} fixedToViewport={actualFixedToViewport} />;
}