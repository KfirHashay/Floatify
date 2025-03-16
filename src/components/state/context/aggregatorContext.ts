/**
 * aggregatorContext.ts
 *
 * Creates and exports the aggregator context for your overlay system.
 * Other files, like aggregatorProvider.ts, will set its value.
 */

import React from 'react';
import { OverlayAggregatorState, OverlayAggregatorAction } from '../types';

export interface AggregatorContextValue {
    state: OverlayAggregatorState;
    dispatch: React.Dispatch<OverlayAggregatorAction>;
}

// Create the context but provide an undefined default, so we can
// throw an error if used outside a provider.
export const AggregatorContext = React.createContext<AggregatorContextValue | undefined>(undefined);
