/**
 * channelReducer.ts
 *
 * A sub-reducer that updates a single channel based on actions
 * targeting that channel (ADD_CARD, REMOVE_CARD, SWIPE_NEXT_CARD, etc.).
 */

import { Channel, OverlayAggregatorAction } from '../types';

export function channelReducer(channel: Channel, action: OverlayAggregatorAction): Channel {
    switch (action.type) {
        case 'ADD_CARD': {
            // Ensure action.payload.channelId matches this channel
            if (action.payload.channelId !== channel.channelId) return channel;

            const { card } = action.payload;
            return {
                ...channel,
                cards: [...channel.cards, card],
            };
        }

        case 'REMOVE_CARD': {
            if (action.payload.channelId !== channel.channelId) return channel;

            const { cardId } = action.payload;
            return {
                ...channel,
                cards: channel.cards.filter((c) => c.id !== cardId),
            };
        }

        case 'SWIPE_NEXT_CARD': {
            if (action.payload.channelId !== channel.channelId) return channel;
            if (channel.cards.length === 0) return channel; // nothing to swipe

            const nextIndex = Math.min(channel.activeCardIndex + 1, channel.cards.length - 1);
            return {
                ...channel,
                activeCardIndex: nextIndex,
            };
        }

        case 'SWIPE_PREV_CARD': {
            if (action.payload.channelId !== channel.channelId) return channel;
            if (channel.cards.length === 0) return channel; // nothing to swipe

            const prevIndex = Math.max(channel.activeCardIndex - 1, 0);
            return {
                ...channel,
                activeCardIndex: prevIndex,
            };
        }

        case 'UPDATE_CHANNEL_STATE': {
            if (action.payload.channelId !== channel.channelId) return channel;
            const { newState } = action.payload;
            return {
                ...channel,
                state: newState,
            };
        }

        case 'CLEAR_CHANNEL_CARDS': {
            if (action.payload.channelId !== channel.channelId) return channel;
            return {
                ...channel,
                cards: [],
                activeCardIndex: 0,
            };
        }

        default:
            // If the action doesn't match, return channel unchanged
            return channel;
    }
}
