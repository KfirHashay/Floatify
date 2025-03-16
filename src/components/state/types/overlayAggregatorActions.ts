/**
 * overlayAggregatorActions.ts
 *
 * Defines the actions that mutate the global aggregator state.
 */

import { OverlayCard } from './overlayCardTypes';
import { OverlayState } from './channelTypes';

export type OverlayAggregatorAction =
    /**
     * Register a new channel in the aggregator.
     */
    | {
          type: 'REGISTER_CHANNEL';
          payload: {
              channelId: string;
              priority: number;
          };
      }

    /**
     * Unregister an existing channel (remove it from aggregator state).
     */
    | {
          type: 'UNREGISTER_CHANNEL';
          payload: {
              channelId: string;
          };
      }

    /**
     * Set which channel is currently visible or active.
     */
    | {
          type: 'SET_ACTIVE_CHANNEL';
          payload: {
              channelId: string;
          };
      }

    /**
     * Update the overlay state (collapsed, expanded, swiping, etc.) of a channel.
     */
    | {
          type: 'UPDATE_CHANNEL_STATE';
          payload: {
              channelId: string;
              newState: OverlayState;
          };
      }

    /**
     * Add a new card to a channel's queue.
     */
    | {
          type: 'ADD_CARD';
          payload: {
              channelId: string;
              card: OverlayCard;
          };
      }

    /**
     * Remove a specific card from a channel's queue (e.g., on dismiss).
     */
    | {
          type: 'REMOVE_CARD';
          payload: {
              channelId: string;
              cardId: string;
          };
      }

    /**
     * Swipe to the next or previous card in the active channel.
     */
    | {
          type: 'SWIPE_NEXT_CARD';
          payload: {
              channelId: string;
          };
      }
    | {
          type: 'SWIPE_PREV_CARD';
          payload: {
              channelId: string;
          };
      }

    /**
     * Clear all cards within a specific channel.
     */
    | {
          type: 'CLEAR_CHANNEL_CARDS';
          payload: {
              channelId: string;
          };
      };
