/**
 * useAggregator.ts
 *
 * Provides a custom hook that consumes the aggregator context,
 * returning state, dispatch, and convenience action creators.
 * This hook covers all the main overlay aggregator features: register/unregister,
 * set active, update states, add/remove/swipe cards, etc.
 *
 * Now includes helper methods to demonstrate usage of all imported types.
 */
import { OverlayCard, Channel, OverlayState } from '../types';
/**
 * useAggregator
 *
 * A custom hook to access the overlay aggregator's state and dispatch.
 * It provides typed action creators for all major operations:
 * - registerChannel, unregisterChannel
 * - setActiveChannel, updateChannelState
 * - addCard, removeCard
 * - swipeNextCard, swipePrevCard
 * - clearChannelCards
 *
 * Additionally, we include helper getters to showcase usage of the Channel and OverlayCard types.
 */
export default function useAggregator(): {
    state: import("../types").OverlayAggregatorState;
    dispatch: import("react").Dispatch<import("../types").OverlayAggregatorAction>;
    registerChannel: (channelId: string, priority: number) => void;
    unregisterChannel: (channelId: string) => void;
    setActiveChannel: (channelId: string) => void;
    updateChannelState: (channelId: string, newState: OverlayState) => void;
    addCard: (channelId: string, card: OverlayCard) => void;
    removeCard: (channelId: string, cardId: string) => void;
    clearChannelCards: (channelId: string) => void;
    swipeNextCard: (channelId: string) => void;
    swipePrevCard: (channelId: string) => void;
    getChannel: (channelId: string) => Channel | undefined;
    getActiveChannel: () => Channel | null;
    getActiveCard: (channelId: string) => OverlayCard | null;
};
//# sourceMappingURL=useAggregator.d.ts.map