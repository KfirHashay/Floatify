/**
 * aggregatorReducer.ts
 *
 * The main reducer that manages OverlayAggregatorState.
 * Delegates channel-level actions to channelReducer.
 */

import { OverlayAggregatorState, OverlayAggregatorAction, Channel } from '../types';
import { channelReducer } from './channelReducer';

export function aggregatorReducer(state: OverlayAggregatorState, action: OverlayAggregatorAction): OverlayAggregatorState {
    switch (action.type) {
        // 1. CHANNEL LIFECYCLE
        case 'REGISTER_CHANNEL': {
            const { channelId, priority } = action.payload;

            // If the channel already exists, do nothing or update it
            if (state.channels[channelId]) {
                return state;
            }

            // Create a new channel with default values
            const newChannel: Channel = {
                channelId,
                priority,
                cards: [],
                activeCardIndex: 0,
                state: 'hidden', // default overlay state
            };

            return {
                ...state,
                channels: {
                    ...state.channels,
                    [channelId]: newChannel,
                },
            };
        }

        case 'UNREGISTER_CHANNEL': {
            const { channelId } = action.payload;
            if (!state.channels[channelId]) {
                return state; // channel doesn't exist
            }

            // Shallow copy channels, remove target
            const updatedChannels = { ...state.channels };
            delete updatedChannels[channelId];

            // If we were displaying that channel, clear activeChannelId
            const isActive = state.activeChannelId === channelId;

            return {
                ...state,
                channels: updatedChannels,
                activeChannelId: isActive ? null : state.activeChannelId,
            };
        }

        // 2. ACTIVE CHANNEL MANAGEMENT
        case 'SET_ACTIVE_CHANNEL': {
            const { channelId } = action.payload;

            // Optional concurrency logic: check if channelId is valid, priority rules, etc.
            if (!state.channels[channelId]) return state;

            return {
                ...state,
                activeChannelId: channelId,
            };
        }

        // 3. DELEGATE CHANNEL-LEVEL ACTIONS
        case 'UPDATE_CHANNEL_STATE':
        case 'ADD_CARD':
        case 'REMOVE_CARD':
        case 'SWIPE_NEXT_CARD':
        case 'SWIPE_PREV_CARD':
        case 'CLEAR_CHANNEL_CARDS': {
            const channelId = 'channelId' in action.payload ? action.payload.channelId : null;
            if (!channelId || !state.channels[channelId]) {
                return state; // channel doesn't exist or invalid
            }

            // Delegate to sub-reducer for channel
            const oldChannel = state.channels[channelId];
            const updatedChannel = channelReducer(oldChannel, action);

            let nextState = {
                ...state,
                channels: {
                    ...state.channels,
                    [channelId]: updatedChannel,
                },
            };

            // FIXED: When adding a card, automatically show the channel with proper immutability
            if (action.type === 'ADD_CARD') {
                // Create a new channel object with proper state transition
                const visibleChannel: Channel = {
                    ...updatedChannel,
                    // If channel is hidden, show it as collapsed
                    state: updatedChannel.state === 'hidden' ? 'collapsed' : updatedChannel.state,
                };

                nextState = {
                    ...nextState,
                    channels: {
                        ...nextState.channels,
                        [channelId]: visibleChannel,
                    },
                };

                // Set as active channel if higher priority or no active channel
                const newChannelPriority = visibleChannel.priority;
                const currentActive = nextState.activeChannelId ? nextState.channels[nextState.activeChannelId] : null;
                const isHigherPriority = !currentActive || newChannelPriority > currentActive.priority;

                if (isHigherPriority) {
                    nextState = {
                        ...nextState,
                        activeChannelId: channelId,
                    };
                }
            }

            if (action.type === 'UPDATE_CHANNEL_STATE') {
                const { newState } = action.payload;
                if (newState !== 'hidden') {
                    const currentActive = nextState.activeChannelId ? nextState.channels[nextState.activeChannelId] : null;
                    const isHigherPriority =
                        !currentActive || updatedChannel.priority > currentActive.priority;
                    if (isHigherPriority) {
                        nextState = { ...nextState, activeChannelId: channelId };
                    }
                } else if (nextState.activeChannelId === channelId) {
                    nextState = { ...nextState, activeChannelId: null };
                }
            }

            return nextState;
        }

        default:
            return state;
    }
}