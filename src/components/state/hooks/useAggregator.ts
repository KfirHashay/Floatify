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

import { useContext, useCallback } from 'react';
// Importing the context directly avoids pulling in the provider
// which would create a circular dependency during the build.
import { AggregatorContext } from '../context/aggregatorContext';
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
export default function useAggregator() {
    const context = useContext(AggregatorContext);

    if (!context) {
        throw new Error('useAggregator must be used within an AggregatorProvider');
    }

    const { state, dispatch } = context;

    // ----- CHANNEL LIFECYCLE -----

    /**
     * Registers a new channel in the aggregator if it doesn't already exist.
     * @param channelId Unique identifier for the channel.
     * @param priority Higher priority channels may override others if concurrency logic is used.
     */
    const registerChannel = useCallback(
        (channelId: string, priority: number) => {
            dispatch({ type: 'REGISTER_CHANNEL', payload: { channelId, priority } });
        },
        [dispatch]
    );

    /**
     * Unregisters an existing channel, removing it from the aggregator.
     * If it was active, activeChannelId becomes null.
     * @param channelId The channel to remove.
     */
    const unregisterChannel = useCallback(
        (channelId: string) => {
            dispatch({ type: 'UNREGISTER_CHANNEL', payload: { channelId } });
        },
        [dispatch]
    );

    /**
     * Sets which channel should be active in the aggregator.
     * @param channelId The channel to focus.
     */
    const setActiveChannel = useCallback(
        (channelId: string) => {
            dispatch({ type: 'SET_ACTIVE_CHANNEL', payload: { channelId } });
        },
        [dispatch]
    );

    // ----- CHANNEL STATE -----

    /**
     * Updates a channel's overlay state (e.g., 'collapsed', 'expanded', 'alert').
     * @param channelId Channel to update.
     * @param newState The new overlay state.
     */
    const updateChannelState = useCallback(
        (channelId: string, newState: OverlayState) => {
            dispatch({
                type: 'UPDATE_CHANNEL_STATE',
                payload: { channelId, newState },
            });
        },
        [dispatch]
    );

    // ----- CARD MANAGEMENT -----

    /**
     * Adds a new card to the specified channel.
     * @param channelId Which channel to add the card to.
     * @param card The overlay card object to add.
     */
    const addCard = useCallback(
        (channelId: string, card: OverlayCard) => {
            dispatch({ type: 'ADD_CARD', payload: { channelId, card } });
        },
        [dispatch]
    );

    /**
     * Removes a card from a channel.
     * @param channelId The channel whose card is to be removed.
     * @param cardId The unique card ID to remove.
     */
    const removeCard = useCallback(
        (channelId: string, cardId: string) => {
            dispatch({ type: 'REMOVE_CARD', payload: { channelId, cardId } });
        },
        [dispatch]
    );

    /**
     * Clears all cards in a given channel.
     * @param channelId The channel to clear.
     */
    const clearChannelCards = useCallback(
        (channelId: string) => {
            dispatch({ type: 'CLEAR_CHANNEL_CARDS', payload: { channelId } });
        },
        [dispatch]
    );

    // ----- SWIPING / NAVIGATION -----

    /**
     * Moves to the next card in the channel's queue (if any).
     * @param channelId The channel in which we navigate.
     */
    const swipeNextCard = useCallback(
        (channelId: string) => {
            dispatch({ type: 'SWIPE_NEXT_CARD', payload: { channelId } });
        },
        [dispatch]
    );

    /**
     * Moves to the previous card in the channel's queue (if any).
     * @param channelId The channel in which we navigate.
     */
    const swipePrevCard = useCallback(
        (channelId: string) => {
            dispatch({ type: 'SWIPE_PREV_CARD', payload: { channelId } });
        },
        [dispatch]
    );

    // ----- HELPER GETTERS -----

    /**
     * Returns the channel object for the given channelId, or undefined if not found.
     * @param channelId The channel to retrieve.
     */
    const getChannel = useCallback(
        (channelId: string): Channel | undefined => {
            return state.channels[channelId];
        },
        [state]
    );

    /**
     * Returns the currently active channel (if any), or null if none is active.
     */
    const getActiveChannel = useCallback((): Channel | null => {
        const activeId = state.activeChannelId;
        if (!activeId) return null;
        return state.channels[activeId] || null;
    }, [state]);

    /**
     * Gets the currently displayed card in a given channel, if any.
     * @param channelId The channel whose active card we want.
     */
    const getActiveCard = useCallback(
        (channelId: string): OverlayCard | null => {
            const ch = state.channels[channelId];
            if (!ch || ch.cards.length === 0) return null;
            return ch.cards[ch.activeCardIndex] || null;
        },
        [state]
    );

    // Return everything needed for aggregator usage.
    return {
        // Raw aggregator state
        state,

        // Low-level dispatch (if needed)
        dispatch,

        // Channel lifecycle
        registerChannel,
        unregisterChannel,

        // Active channel
        setActiveChannel,
        updateChannelState,

        // Cards
        addCard,
        removeCard,
        clearChannelCards,

        // Swiping
        swipeNextCard,
        swipePrevCard,

        // Helper getters
        getChannel,
        getActiveChannel,
        getActiveCard,
    };
}
