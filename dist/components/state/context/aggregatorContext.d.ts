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
export declare const AggregatorContext: React.Context<AggregatorContextValue | undefined>;
//# sourceMappingURL=aggregatorContext.d.ts.map