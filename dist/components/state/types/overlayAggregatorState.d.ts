/**
 * overlayAggregatorState.ts
 *
 * Defines the global aggregator state, holding multiple channels
 * and tracking which channel is currently active or displayed.
 */
import { Channel } from './channelTypes';
export interface OverlayAggregatorState {
    /**
     * A dictionary of all registered channels keyed by channelId.
     */
    channels: Record<string, Channel>;
    /**
     * The channelId currently in focus/visible. Null if nothing is visible.
     */
    activeChannelId: string | null;
}
//# sourceMappingURL=overlayAggregatorState.d.ts.map